import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Radio } from "lucide-react";

export default function LiveStreamView({ sessionId }: { sessionId: string }) {
  const [isConnected, setIsConnected] = useState(false);
  const [frameData, setFrameData] = useState<string | null>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Determine WS URL based on current host or environment variable
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    let host = window.location.host;
    if (import.meta.env.VITE_API_URL) {
       const url = new URL(import.meta.env.VITE_API_URL);
       host = url.host;
    }
    const wsUrl = `${protocol}//${host}/api/v1/sessions/${sessionId}/stream`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.frame) {
          setFrameData(data.frame);
        }
        if (data.detections) {
          setDetections(data.detections);
        }
      } catch (e) {
        console.error("Failed to parse WS message", e);
      }
    };

    ws.onerror = (e) => {
      console.error("WebSocket error", e);
      setError("Error de conexión al stream. Verifique si el worker está corriendo.");
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [sessionId]);

  return (
    <Card className="border border-border bg-black/5 shadow-inner">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={`h-5 w-5 ${isConnected ? 'text-green-500 animate-pulse' : 'text-muted-foreground'}`} />
            <h3 className="font-semibold text-lg uppercase tracking-wider font-mono">Drone Live Feed</h3>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-500 hover:bg-green-600" : ""}>
            {isConnected ? "Live" : "Desconectado"}
          </Badge>
        </div>
        
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border flex items-center justify-center shadow-xl">
          {!isConnected && !error && (
            <div className="flex flex-col items-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
              <span className="font-mono text-xs uppercase tracking-wider">Conectando al stream RTMP...</span>
            </div>
          )}
          
          {error && (
            <div className="text-destructive font-mono text-sm font-semibold flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              {error}
            </div>
          )}

          {isConnected && frameData ? (
            <>
              <img src={frameData} alt="Live Stream" className="absolute w-full h-full object-contain" />
              {/* Draw bounding boxes using normalized coordinates */}
              {detections.map((det, i) => (
                <div
                  key={i}
                  className="absolute border-[3px] border-[#39ff14] bg-[#39ff14]/10 shadow-[0_0_8px_#39ff14] transition-all duration-75"
                  style={{
                    left: `${(det.bbox.x - det.bbox.w / 2) * 100}%`,
                    top: `${(det.bbox.y - det.bbox.h / 2) * 100}%`,
                    width: `${det.bbox.w * 100}%`,
                    height: `${det.bbox.h * 100}%`,
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-[#39ff14] text-black font-bold font-mono text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                    {det.class_name.toUpperCase()} {(det.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </>
          ) : (
             isConnected && <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest animate-pulse">Esperando señal de video...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
