import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession, useSessionEvidences, useSessionFindings } from "@/lib/queries";
import { BrainCircuit, Fingerprint, MapPin, Calendar, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { FINDINGS_TRANSLATIONS } from "@/routes/sessions.$sessionId";

export const Route = createFileRoute("/reports_/print/$sessionId")({
  head: () => ({ meta: [{ title: "Reporte Técnico — InfraInspect AI" }] }),
  component: PrintReport,
});

function PrintReport() {
  const { sessionId } = Route.useParams();
  const { data: session, isLoading: sessionLoading } = useSession(sessionId);
  const { data: evidence = [], isLoading: evidenceLoading } = useSessionEvidences(sessionId);
  const { data: findings = [], isLoading: findingsLoading } = useSessionFindings(sessionId);

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(true);

  // Gemini AI summary logic
  useEffect(() => {
    if (sessionLoading || evidenceLoading || findingsLoading) return;
    
    const saved = localStorage.getItem("infrainspect_settings");
    let geminiKey = "";
    if (saved) {
      try {
        geminiKey = JSON.parse(saved).geminiApiKey || "";
      } catch (e) {}
    }

    if (!geminiKey) {
      setAiSummary("No se configuró una API Key de Gemini. El resumen automático no está disponible.");
      setAiLoading(false);
      setTimeout(() => window.print(), 1000);
      return;
    }

    if (!session) return;

    const generateSummary = async () => {
      try {
        const counts = findings.reduce((acc, f) => {
          acc[f.category] = (acc[f.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const rejectedCount = findings.filter(f => f.status === "rejected").length;

        const prompt = `Actúa como un ingeniero estructural experto. Genera un resumen ejecutivo de máximo 2 párrafos para un reporte de inspección de la infraestructura "${session.title}" (Tipo: ${session.infrastructure.type}). 
        
Datos recolectados por IA:
- Total de evidencias revisadas: ${evidence.length}
- Total de hallazgos detectados: ${findings.length}
- Hallazgos rechazados/validados manualmente: ${rejectedCount} rechazados
- Tipos de defectos: ${JSON.stringify(counts)}

Escribe en español, empleando terminología técnica y rigurosa propia de la ingeniería civil y patología estructural. 
Tu respuesta debe contener exactamente dos partes:
1. Evaluación: Una evaluación objetiva y técnica basada en la cantidad y tipos de defectos encontrados.
2. Recomendaciones: Sugerencias técnicas de mitigación, reparación o mantenimiento basadas en las patologías detectadas.

NO devuelvas markdown ni asteriscos de negrita, usa texto plano estructurado.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setAiSummary(data.candidates[0].content.parts[0].text);
        } else {
          setAiSummary("No se pudo generar el resumen. Verifica la clave API.");
        }
      } catch (error) {
        setAiSummary("Error de conexión al generar el resumen de IA.");
      } finally {
        setAiLoading(false);
        // Wait for images to load before printing
        setTimeout(() => window.print(), 1500);
      }
    };

    generateSummary();
  }, [sessionLoading, evidenceLoading, findingsLoading, session, findings, evidence.length]);

  if (sessionLoading) return <div className="p-12 text-center">Cargando reporte...</div>;
  if (!session) return <div className="p-12 text-center text-red-500">Sesión no encontrada.</div>;

  const getCategoryName = (cat: string) => (FINDINGS_TRANSLATIONS as any)[cat] || cat;

  return (
    <div className="bg-white text-black min-h-screen w-full font-sans print-container">
      {/* Estilos específicos de impresión */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-container { padding: 0 !important; margin: 0 !important; width: 100% !important; }
          .page-break { page-break-before: always; }
          .no-break { page-break-inside: avoid; }
          @page { margin: 15mm; size: A4; }
        }
        body { background: white; } /* Force white background for this route */
      `}} />

      <div className="max-w-[210mm] mx-auto bg-white p-8 md:p-12">
        {/* Cabecera / Portada */}
        <header className="border-b-4 border-slate-900 pb-8 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Reporte de Inspección</h1>
            <h2 className="text-xl font-bold text-slate-600">{session.title}</h2>
          </div>
          <div className="text-right text-sm text-slate-500 font-mono">
            <p><strong>CÓDIGO:</strong> {session.code}</p>
            <p><strong>FECHA:</strong> {new Date().toLocaleDateString("es-PE")}</p>
            <p className="text-slate-400 mt-2">Generado por InfraInspect AI</p>
          </div>
        </header>

        {/* Metadatos del Activo */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 no-break">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <Fingerprint className="h-5 w-5 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Activo</p>
            <p className="font-semibold text-slate-800">{session.infrastructure.assetCode}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <MapPin className="h-5 w-5 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ubicación</p>
            <p className="font-semibold text-slate-800 text-sm">{session.infrastructure.location}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <Calendar className="h-5 w-5 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fecha Inspección</p>
            <p className="font-semibold text-slate-800">{new Date(session.createdAt).toLocaleDateString("es-PE")}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <CheckCircle2 className="h-5 w-5 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</p>
            <p className="font-semibold text-slate-800">{session.status}</p>
          </div>
        </section>

        {/* Resumen IA */}
        <section className="mb-12 no-break">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">Resumen Ejecutivo (AI)</h3>
          </div>
          <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-xl">
            {aiLoading ? (
              <p className="text-slate-500 animate-pulse font-mono text-sm">Generando insights estructurales con Gemini AI...</p>
            ) : (
              <p className="text-slate-700 leading-relaxed">{aiSummary}</p>
            )}
          </div>
        </section>

        {/* Resumen Estadístico */}
        <section className="mb-12 no-break">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Desglose de Hallazgos</h3>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 p-6 bg-slate-900 text-white rounded-xl">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total</p>
              <p className="text-5xl font-black">{findings.length}</p>
            </div>
          </div>
        </section>

        {/* Anexo Fotográfico */}
        {findings.length > 0 && (
          <section className="page-break">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-2">Anexo Fotográfico (Hallazgos Críticos o Rechazados)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {findings.map(f => {
                const ev = evidence.find(e => e.id === f.evidenceId);
                if (!ev || !f.bbox) return null;
                
                // Determinamos el color en el reporte igual que en la app
                const isRejected = f.status === "rejected";
                const color = isRejected ? "#ff073a" : "#39ff14";
                const labelColor = isRejected ? "bg-[#ff073a] text-white" : "bg-[#39ff14] text-black";

                return (
                  <div key={f.id} className="no-break border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <div className="relative aspect-[4/3] bg-slate-200">
                      <img src={ev.storageUrl || ev.thumbnailUrl} alt="evidence" className="w-full h-full object-cover" />
                      <div 
                        className="absolute border-[3px]"
                        style={{
                          borderColor: color,
                          backgroundColor: `${color}33`,
                          left: `${(f.bbox.x - f.bbox.w / 2) * 100}%`,
                          top: `${(f.bbox.y - f.bbox.h / 2) * 100}%`,
                          width: `${f.bbox.w * 100}%`,
                          height: `${f.bbox.h * 100}%`,
                        }}
                      />
                    </div>
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800 uppercase tracking-wide">{getCategoryName(f.category)}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">Evidencia: {ev.id.substring(0,8)}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded ${labelColor}`}>
                          {isRejected ? "RECHAZADO" : "VALIDADO"}
                        </span>
                        <p className="text-xs font-mono font-bold text-slate-500 mt-2">
                          Conf: {Math.round(f.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
