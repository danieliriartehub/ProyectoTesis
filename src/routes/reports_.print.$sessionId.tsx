import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession, useSessionEvidences, useSessionFindings } from "@/lib/queries";
import { BrainCircuit, Fingerprint, MapPin, Calendar, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { FINDINGS_TRANSLATIONS } from "@/routes/sessions.$sessionId";
// @ts-ignore
import html2pdf from "html2pdf.js";

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

    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    const isDownload = urlParams.get('download') === 'true';

    if (!geminiKey) {
      setAiSummary("No se configuró una API Key de Gemini. El resumen automático no está disponible.");
      setAiLoading(false);
      if (isDownload) {
        setTimeout(() => triggerPdfDownload(), 1000);
      } else if (!isPreview) {
        setTimeout(() => window.print(), 1000);
      }
      window.parent.postMessage({ type: 'REPORT_READY' }, '*');
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

        const prompt = `Actúa como un ingeniero estructural experto. Genera un resumen ejecutivo de máximo 3 párrafos para un reporte de inspección de la infraestructura "${session.title}" (Tipo: ${session.infrastructure.type}). 
        
Datos recolectados por IA:
- Total de evidencias revisadas: ${evidence.length}
- Total de hallazgos detectados: ${findings.length}
- Hallazgos rechazados/validados manualmente: ${rejectedCount} rechazados
- Tipos de defectos: ${JSON.stringify(counts)}

Escribe en español, empleando terminología técnica y rigurosa propia de la ingeniería civil y patología estructural. 
Tu respuesta debe contener exactamente tres partes:
1. EVALUACIÓN: Una evaluación objetiva y técnica basada en la cantidad y tipos de defectos encontrados.
2. RECOMENDACIONES: Sugerencias técnicas de mitigación, reparación o mantenimiento.
3. MATERIALES Y ENSAYOS: Una lista de materiales estándar o ensayos normativos sugeridos para reparar estas patologías (Ej. Resina epóxica, Ensayo de ultrasonido).

NO devuelvas markdown ni asteriscos de negrita, usa texto plano estructurado con mayúsculas para los títulos.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey.trim()}`, {
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
        // Let parent window know the report is ready
        window.parent.postMessage({ type: 'REPORT_READY' }, '*');
        
        // Wait for images to load before printing or downloading
        if (isDownload) {
          setTimeout(() => triggerPdfDownload(), 1500);
        } else if (!isPreview) {
          setTimeout(() => window.print(), 1500);
        }
      }
    };

    generateSummary();
  }, [sessionLoading, evidenceLoading, findingsLoading, session, findings, evidence.length]);

  if (sessionLoading) return <div className="p-12 text-center">Cargando reporte...</div>;
  if (!session) return <div className="p-12 text-center text-red-500">Sesión no encontrada.</div>;

  const triggerPdfDownload = () => {
    const element = document.getElementById("report-content");
    if (!element) return;
    const opt = {
      margin:       10,
      filename:     `Reporte-${session.code}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const getCategoryName = (cat: string) => (FINDINGS_TRANSLATIONS as any)[cat] || cat;

  return (
    <div id="report-content" className="bg-white text-black min-h-screen w-full font-sans print-container">
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
        .cover-page { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 280mm; background: #0f172a; color: white; text-align: center; }
        .cover-logo { margin-bottom: 2rem; }
      `}} />

      {/* PORTADA (COVER PAGE) */}
      <div className="cover-page page-break relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black"></div>
        <div className="relative z-10 w-full max-w-[210mm] mx-auto text-left">
          <div className="flex items-center gap-3 mb-24">
            <div className="bg-primary text-primary-foreground p-3 rounded-xl">
              <BrainCircuit className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight leading-none uppercase">InfraInspect</h1>
              <p className="text-sm font-mono text-blue-400 tracking-widest uppercase">Intelligence</p>
            </div>
          </div>
          
          <h2 className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-4 border-b border-blue-400/30 pb-2 inline-block">Reporte Técnico Estructural</h2>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 text-white">{session.title}</h1>
          
          <div className="grid grid-cols-2 gap-8 border-t border-slate-700 pt-8 mt-auto w-3/4">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">CÓDIGO DE SESIÓN</p>
              <p className="text-lg font-semibold">{session.code}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">FECHA DE EMISIÓN</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString("es-PE")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-[210mm] mx-auto bg-white p-12 page-break">
        {/* Cabecera Interna */}
        <header className="border-b-2 border-slate-200 pb-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{session.title}</h2>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            <p><strong>CÓDIGO:</strong> {session.code}</p>
            <p className="text-slate-400">Pág. 2</p>
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
            <BrainCircuit className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-800">Resumen Experto (AI)</h3>
          </div>
          <div className="p-6 bg-slate-50 border-l-4 border-primary shadow-sm">
            {aiLoading ? (
              <p className="text-slate-500 animate-pulse font-mono text-sm">Generando insights estructurales con Gemini AI...</p>
            ) : (
              <div className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">{aiSummary}</div>
            )}
          </div>
        </section>

        {/* Resumen Estadístico y Matriz de Severidad */}
        <section className="mb-12 no-break">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 mb-6 border-b-2 border-slate-100 pb-2">Matriz de Severidad y Riesgos</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-center">
              <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Críticos</p>
              <p className="text-4xl font-black text-red-600">{findings.filter(f => f.severity === 'critical').length}</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-center">
              <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Altos</p>
              <p className="text-4xl font-black text-orange-600">{findings.filter(f => f.severity === 'high').length}</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-center">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Medios</p>
              <p className="text-4xl font-black text-amber-600">{findings.filter(f => f.severity === 'medium').length}</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-center">
              <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Bajos</p>
              <p className="text-4xl font-black text-green-600">{findings.filter(f => f.severity === 'low').length}</p>
            </div>
          </div>
          
          {/* Top Riesgos */}
          {findings.filter(f => f.severity === 'critical' || f.severity === 'high').length > 0 && (
            <div className="mb-6">
              <h4 className="font-bold text-sm text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Top Hallazgos de Atención Inmediata
              </h4>
              <ul className="space-y-2">
                {findings
                  .filter(f => f.severity === 'critical' || f.severity === 'high')
                  .sort((a, b) => (a.severity === 'critical' ? -1 : 1))
                  .slice(0, 5)
                  .map(f => (
                    <li key={f.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="font-semibold text-slate-800">{getCategoryName(f.category)}</span>
                      <span className="font-mono text-xs text-red-600">{f.severity.toUpperCase()}</span>
                    </li>
                ))}
              </ul>
            </div>
          )}
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
                    <div className="p-4 bg-white flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800 uppercase tracking-wide">{getCategoryName(f.category)}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">Evidencia: {ev.id.substring(0,8)}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded ${labelColor}`}>
                          {isRejected ? "RECHAZADO" : "VALIDADO"}
                        </span>
                        <p className={`text-xs font-mono font-bold mt-2 ${f.severity === 'critical' ? 'text-red-600' : 'text-slate-500'}`}>
                          SEV: {f.severity.toUpperCase()}
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
