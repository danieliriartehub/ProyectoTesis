import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Radio, Copy, Check, AlertCircle, HelpCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

export default function LiveStreamView({ sessionId }: { sessionId: string }) {
  const [isConnected, setIsConnected] = useState(false);
  const [frameData, setFrameData] = useState<string | null>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [reconnectTrigger, setReconnectTrigger] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  // Compute RTMP URL
  let rtmpHost = window.location.hostname;
  if (import.meta.env.VITE_API_URL) {
     try {
       rtmpHost = new URL(import.meta.env.VITE_API_URL).hostname;
     } catch (e) {}
  }
  const rtmpUrl = `rtmp://${rtmpHost}:1935/live/${sessionId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rtmpUrl);
    setCopied(true);
    toast.success("URL RTMP copiada al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

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
  }, [sessionId, reconnectTrigger]);

  const handleRestart = () => {
    setIsConnected(false);
    setError(null);
    setFrameData(null);
    setDetections([]);
    setReconnectTrigger(prev => prev + 1);
  };

  return (
    <Card className="border border-border bg-black/5 shadow-inner">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={`h-5 w-5 ${isConnected ? 'text-green-500 animate-pulse' : 'text-muted-foreground'}`} />
            <h3 className="font-semibold text-lg uppercase tracking-wider font-mono">Drone Live Feed</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRestart} className="h-7 px-2 text-xs">
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Reiniciar
            </Button>
            <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-500 hover:bg-green-600" : ""}>
              {isConnected ? "Live" : "Desconectado"}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md border border-border">
          <div className="flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">URL de Transmisión (Ingresar en el control DJI)</div>
            <Input 
              value={rtmpUrl} 
              readOnly 
              className="h-8 font-mono text-xs bg-background" 
            />
          </div>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 shrink-0 mt-5" 
            onClick={handleCopy}
            title="Copiar enlace RTMP"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
          </Button>
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

        <Accordion type="single" collapsible className="w-full mt-2">
          <AccordionItem value="troubleshooting" className="border-border">
            <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:text-foreground">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>¿Problemas de conexión con el dron? (Troubleshooting)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground space-y-3 p-2 bg-muted/30 rounded-md">
              <div className="space-y-1">
                <strong className="text-foreground">1. El dron no conecta al RTMP:</strong>
                <p>Si pruebas en una red local (WiFi), cambia "localhost" en la URL por la IP local de tu computadora (ej. 192.168.1.x). Asegúrate que el puerto 1935 no esté bloqueado por el Firewall.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-foreground">2. La web dice "Esperando señal..." pero el dron ya transmite:</strong>
                <p>Verifica que copiaste la URL completa incluyendo el ID al final. También asegúrate de que el contenedor de Docker 'nginx-rtmp' esté corriendo.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-foreground">3. El video se ve muy lento o trabado (Lag):</strong>
                <p>El procesamiento de Inteligencia Artificial consume recursos. Si no usas GPU, baja la resolución de transmisión del dron (ej. 720p) o reduce el bitrate en la app de DJI.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
