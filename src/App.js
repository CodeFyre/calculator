import { useState, useEffect } from "react";

const C = {
  bg:"#FAFAFA", border:"#E6E6E6", section:"#FFFFFF",
  primary:"#546C4B", secondary:"#F0A901", radius:"4px",
  text:"#1f2937", textMuted:"#6b7280", textLight:"#9ca3af",
  bannerBg:"#EEF0ED", bannerBorder:"#546C4B",
  activeFill:"#EEF0ED", activeBorder:"#546C4B",
  sessionBg:"#FAFAFA", sessionBorder:"#E6E6E6",
};
const font = "'Cairo', sans-serif";

const inputStyle = {
  width:"100%", padding:"12px 16px", border:`1.5px solid ${C.border}`,
  borderRadius:C.radius, fontSize:16, color:C.text, outline:"none",
  boxSizing:"border-box", fontFamily:font, textAlign:"right",
  background:C.section, WebkitAppearance:"none", touchAction:"manipulation",
};
const selectStyle = {
  ...inputStyle, cursor:"pointer", appearance:"none", WebkitAppearance:"none",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat", backgroundPosition:"left 14px center", paddingLeft:36,
};
const labelStyle = { display:"block", fontSize:15, fontWeight:700, color:C.text, marginBottom:8, fontFamily:font };
const sectionStyle = {
  width:"100%", background:C.section, borderRadius:C.radius,
  border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
  padding:"20px", marginBottom:14, boxSizing:"border-box",
};

// ── Install Popup ──────────────────────────────────────────────────────────
function InstallPopup({ onClose }) {
  const [browser, setBrowser] = useState("other");
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) setBrowser("safari");
    else if (/Chrome/.test(ua)) setBrowser("chrome");
  }, []);

  const steps = browser === "safari"
    ? [
        { num:"1", text:"اضغط على أيقونة المشاركة في شريط المتصفح" },
        { num:"2", text:'مرر للأسفل واختر "إضافة إلى الشاشة الرئيسية"' },
        { num:"3", text:'اضغط "إضافة" لتثبيت التطبيق' },
      ]
    : browser === "chrome"
    ? [
        { num:"1", text:"اضغط على النقاط الثلاث في الزاوية العلوية" },
        { num:"2", text:'اختر "إضافة إلى الشاشة الرئيسية"' },
        { num:"3", text:'اضغط "إضافة" لتثبيت التطبيق' },
      ]
    : [
        { num:"1", text:"افتح قائمة المتصفح" },
        { num:"2", text:'اختر "إضافة إلى الشاشة الرئيسية"' },
        { num:"3", text:"أكّد الإضافة" },
      ];

  const browserLabel = browser === "safari" ? "Safari" : browser === "chrome" ? "Chrome" : "متصفحك";
  const browserColor = browser === "safari" ? "#007AFF" : browser === "chrome" ? "#4285F4" : C.primary;

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:1000,
        background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)",
        display:"flex", alignItems:"flex-end", justifyContent:"center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width:"100%", maxWidth:480,
          background:"#fff", borderRadius:"20px 20px 0 0",
          paddingBottom:32, fontFamily:font,
          boxShadow:"0 -8px 40px rgba(0,0,0,0.18)",
          animation:"slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          direction:"rtl",
        }}
      >
        {/* Handle */}
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 0" }}>
          <div style={{ width:40, height:4, borderRadius:2, background:"#e5e7eb" }} />
        </div>

        {/* Header card */}
        <div style={{
          margin:"16px 24px 0",
          background:`linear-gradient(135deg, ${C.primary} 0%, #3a4e34 100%)`,
          borderRadius:16, padding:"20px 22px",
          display:"flex", alignItems:"center", gap:16,
        }}>
          <div style={{
            width:56, height:56, borderRadius:14, flexShrink:0,
            background:"rgba(255,255,255,0.15)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:28,
          }}>🎓</div>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", fontFamily:font }}>الحاسبة الأكاديمية</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:3, fontFamily:font }}>أضف التطبيق إلى شاشتك الرئيسية</div>
          </div>
        </div>

        {/* Browser badge */}
        <div style={{ margin:"18px 24px 4px", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:browserColor }} />
          <span style={{ fontSize:13, fontWeight:700, color:C.textMuted, fontFamily:font }}>تعليمات {browserLabel}</span>
        </div>

        {/* Steps */}
        <div style={{ margin:"12px 24px 0", display:"flex", flexDirection:"column", gap:10 }}>
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:14,
                background:C.bg, borderRadius:12,
                border:`1px solid ${C.border}`, padding:"12px 16px",
              }}>
                <div style={{
                  width:42, height:42, borderRadius:10, flexShrink:0,
                  background: isLast ? C.primary : "#fff",
                  border:`1.5px solid ${isLast ? C.primary : C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:16, fontWeight:800,
                  color: isLast ? "#fff" : C.primary,
                  fontFamily:font,
                }}>
                  {isLast ? "✓" : s.num}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:C.textMuted, fontFamily:font, marginBottom:2 }}>الخطوة {s.num}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:C.text, fontFamily:font, lineHeight:1.5 }}>{s.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close button */}
        <div style={{ margin:"20px 24px 0" }}>
          <button onClick={onClose} style={{
            width:"100%", padding:"14px",
            background:C.primary, color:"white",
            border:"none", borderRadius:12,
            fontSize:16, fontWeight:800,
            cursor:"pointer", fontFamily:font,
            boxShadow:"0 4px 14px rgba(84,108,75,0.35)",
          }}>
            فهمت، شكراً!
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Absence Calculator ─────────────────────────────────────────────────────
const statusColor  = (st) => st==="safe"?"#546C4B":st==="warning"?"#F0A901":"#dc2626";
const statusBg     = (st) => st==="safe"?"#f0f4ee":st==="warning"?"#fef9ec":"#fef2f2";
const statusText   = (st) => st==="safe"?"#3a4e34":st==="warning"?"#9a6900":"#dc2626";
const statusBorder = (st) => st==="safe"?"#c3d4bd":st==="warning"?"#f8d97a":"#fecaca";
const statusLabel  = (st) => st==="safe"?"آمن":st==="warning"?"تحذير":"خطر";
const statusTitle  = (st) => st==="safe"?"وضعك آمن، استمر في الانتظام":st==="warning"?"تحذير: اقتربت من الحد المسموح":"تجاوزت حد الغياب المسموح!";

let absId = 1;
const newSession = () => ({ id: absId++, type:"نظري", duration:1, absenceCount:"" });

function SessionCard({ session, index, onUpdate, onRemove, canRemove }) {
  const tb = (sel) => ({
    flex:1, padding:"10px 0",
    border:`1.5px solid ${sel?C.activeBorder:C.border}`,
    borderRadius:C.radius,
    background:sel?C.activeFill:C.section,
    color:sel?C.primary:C.text,
    fontWeight:700, fontSize:15, cursor:"pointer",
    fontFamily:font, transition:"all 0.15s", touchAction:"manipulation",
  });
  return (
    <div style={{ background:C.section, borderRadius:C.radius, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.05)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 18px", background:C.sessionBg, borderBottom:`1.5px solid ${C.sessionBorder}` }}>
        <span style={{ fontSize:15, fontWeight:800, color:"#545454", fontFamily:font }}>لقاء {index+1}</span>
        {canRemove && (
          <button onClick={() => onRemove(session.id)} style={{ padding:"5px 14px", background:"#fff5f5", color:"#dc2626", border:"1px solid #fecaca", borderRadius:C.radius, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:font }}>حذف</button>
        )}
      </div>
      <div style={{ padding:"18px" }}>
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>نوع اللقاء</label>
          <div style={{ display:"flex", gap:10 }}>
            {["نظري","عملي"].map(t => <button key={t} onClick={() => onUpdate(session.id,"type",t)} style={tb(session.type===t)}>{t}</button>)}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>عدد الساعات الأسبوعية</label>
          <select value={session.duration} onChange={e => onUpdate(session.id,"duration",parseInt(e.target.value))} style={selectStyle}>
            <option value={1}>ساعة واحدة</option><option value={2}>ساعتان</option>
            <option value={3}>3 ساعات</option><option value={4}>4 ساعات</option><option value={5}>5 ساعات</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>عدد الغيابات</label>
          <input type="number" min="0" value={session.absenceCount} onChange={e => onUpdate(session.id,"absenceCount",e.target.value)} placeholder="مثال: 3" style={inputStyle}
            onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)} />
        </div>
      </div>
    </div>
  );
}

function AbsenceCalculator() {
  const [weeks, setWeeks] = useState("18");
  const [allowedPercent, setAllowedPercent] = useState("20");
  const [sessions, setSessions] = useState([newSession()]);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const addSession = () => { setSessions(p => [...p, newSession()]); setResult(null); };
  const removeSession = (id) => { if (sessions.length > 1) { setSessions(p => p.filter(s => s.id !== id)); setResult(null); } };
  const updateSession = (id, field, value) => { setSessions(p => p.map(s => s.id===id ? {...s,[field]:value} : s)); setResult(null); };

  const calculate = () => {
    const w = parseFloat(weeks), pct = parseFloat(allowedPercent);
    if (!w || w <= 0) return;
    let tA = 0, tB = 0;
    const details = sessions.map(s => {
      const th = s.duration*w, mah = (th*pct)/100, ah = (parseFloat(s.absenceCount)||0)*s.duration;
      tA += mah; tB += ah;
      return { ...s, th, maxAllowedH:+mah.toFixed(2), absentH:ah, remainingH:+(mah-ah).toFixed(2), maxAllowedLectures:+(mah/s.duration).toFixed(1), absentLectures:parseFloat(s.absenceCount)||0 };
    });
    const remaining = +(tA-tB).toFixed(2);
    const overallStatus = tB>=tA?"danger":tB>=tA*0.75?"warning":"safe";
    setAnimating(true);
    setTimeout(() => { setResult({ sessionDetails:details, totalAllowedHours:+tA.toFixed(2), totalAbsentHours:+tB.toFixed(2), remaining, overallStatus, weeks:w, allowedPercent:pct }); setAnimating(false); }, 280);
  };

  const reset = () => { setWeeks("18"); setAllowedPercent("20"); setSessions([newSession()]); setResult(null); };
  const canCalc = weeks !== "" && parseFloat(weeks) > 0 && sessions.every(s => s.absenceCount !== "");

  return (
    <div>
      <div style={{ width:"100%", background:C.bannerBg, borderRadius:C.radius, border:`1.5px solid ${C.bannerBorder}`, padding:"22px", marginBottom:14, boxShadow:"0 2px 10px rgba(84,108,75,0.1)" }}>
        <div style={{ fontSize:22, fontWeight:800, marginBottom:5, fontFamily:font, color:"#3C4D35" }}>حاسبة الغياب</div>
        <div style={{ fontSize:15, color:"#545454", fontFamily:font }}>اطلع على نسبة غياباتك باستمرار</div>
      </div>

      <div style={sectionStyle}>
        <div onClick={() => setSettingsOpen(p => !p)} style={{ fontSize:16, fontWeight:800, color:C.primary, fontFamily:font, cursor:"pointer", userSelect:"none", touchAction:"manipulation", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span>الإعدادات العامة</span>
          <span style={{ display:"inline-block", fontSize:12, color:C.primary, transform:settingsOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.25s" }}>▼</span>
        </div>
        {settingsOpen && (
          <div style={{ marginTop:18, borderTop:`2px solid ${C.border}`, paddingTop:18 }}>
            <div style={{ marginBottom:18 }}>
              <label style={labelStyle}>عدد أسابيع الدراسة</label>
              <input type="number" min="1" value={weeks} onChange={e => { setWeeks(e.target.value); setResult(null); }} placeholder="18" style={inputStyle}
                onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)} />
            </div>
            <div>
              <label style={labelStyle}>نسبة الغياب المسموحة ({allowedPercent}%)</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                {["10","15","20","25","30"].map(v => {
                  const sel = allowedPercent===v;
                  return <button key={v} onClick={() => { setAllowedPercent(v); setResult(null); }} style={{ padding:"9px 16px", border:`1.5px solid ${sel?C.activeBorder:C.border}`, borderRadius:C.radius, background:sel?C.activeFill:C.section, color:sel?C.primary:C.text, fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:font, touchAction:"manipulation" }}>{v}%</button>;
                })}
              </div>
              <input type="range" min="1" max="50" value={allowedPercent} onChange={e => { setAllowedPercent(e.target.value); setResult(null); }} style={{ width:"100%", accentColor:C.primary, height:6 }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ width:"100%", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:16, fontWeight:800, color:C.primary, fontFamily:font }}>اللقاءات الدراسية</span>
          <button onClick={addSession} style={{ padding:"10px 16px", background:C.secondary, color:"white", border:"none", borderRadius:C.radius, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font, boxShadow:"0 2px 8px rgba(240,169,1,0.35)", touchAction:"manipulation" }}>+ إضافة لقاء</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {sessions.map((s,idx) => <SessionCard key={s.id} session={s} index={idx} onUpdate={updateSession} onRemove={removeSession} canRemove={sessions.length>1} />)}
        </div>
      </div>

      <div style={{ width:"100%", display:"flex", gap:10, marginBottom:14 }}>
        <button onClick={calculate} disabled={!canCalc} style={{ flex:1, padding:"14px", background:canCalc?C.primary:C.border, color:canCalc?"white":C.textLight, border:"none", borderRadius:C.radius, fontSize:16, fontWeight:800, cursor:canCalc?"pointer":"not-allowed", fontFamily:font, boxShadow:canCalc?"0 2px 10px rgba(84,108,75,0.3)":"none", touchAction:"manipulation" }}>احسب الغياب</button>
        <button onClick={reset} style={{ padding:"14px 20px", background:C.section, color:C.primary, border:`1.5px solid ${C.primary}`, borderRadius:C.radius, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font, touchAction:"manipulation" }}>إعادة تعيين</button>
      </div>

      {result && (
        <div style={{ width:"100%", marginBottom:20, opacity:animating?0:1, transform:animating?"translateY(10px)":"translateY(0)", transition:"all 0.3s ease" }}>
          <div style={{ background:C.section, border:`1.5px solid ${statusBorder(result.overallStatus)}`, borderRadius:C.radius, boxShadow:`0 2px 12px ${statusColor(result.overallStatus)}18`, padding:"20px" }}>
            <div style={{ padding:"14px 16px", borderRadius:C.radius, background:statusBg(result.overallStatus), border:`1px solid ${statusBorder(result.overallStatus)}`, marginBottom:20 }}>
              <div style={{ fontSize:17, fontWeight:800, color:statusText(result.overallStatus), fontFamily:font }}>{statusTitle(result.overallStatus)}</div>
              <div style={{ fontSize:13, color:C.textMuted, marginTop:4, fontFamily:font }}>{result.weeks} أسبوع · نسبة مسموحة {result.allowedPercent}%</div>
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, color:C.textMuted, marginBottom:6, fontFamily:font }}>
                <span>نسبة استهلاك الغياب</span>
                <span style={{ fontWeight:800, color:statusColor(result.overallStatus) }}>{result.totalAllowedHours>0?((result.totalAbsentHours/result.totalAllowedHours)*100).toFixed(1):0}%</span>
              </div>
              <div style={{ height:12, background:"#f0f0f0", borderRadius:C.radius, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${Math.min((result.totalAbsentHours/result.totalAllowedHours)*100,100)}%`, background:statusColor(result.overallStatus), borderRadius:C.radius, transition:"width 0.9s cubic-bezier(0.34,1.56,0.64,1)" }} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
              {[
                { label:"حد الحرمان", value:result.totalAllowedHours, color:C.primary },
                { label:"الغياب الفعلي", value:result.totalAbsentHours, color:statusColor(result.overallStatus) },
                { label:result.remaining>=0?"المتبقي":"التجاوز", value:Math.abs(result.remaining), color:result.remaining>=0?C.primary:"#dc2626" },
              ].map((st,i) => (
                <div key={i} style={{ background:C.bg, borderRadius:C.radius, border:`1px solid ${C.border}`, padding:"12px 10px", textAlign:"center", borderBottom:`3px solid ${st.color}` }}>
                  <div style={{ fontSize:22, fontWeight:800, color:st.color, lineHeight:1, fontFamily:font }}>{st.value}</div>
                  <div style={{ fontSize:11, color:C.textLight, marginTop:2, fontFamily:font }}>ساعة</div>
                  <div style={{ fontSize:13, color:C.textMuted, marginTop:5, fontWeight:700, fontFamily:font }}>{st.label}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop:`1.5px dashed ${C.border}`, paddingTop:16, marginBottom:16 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.text, marginBottom:10, fontFamily:font }}>تفصيل اللقاءات:</div>
              {result.sessionDetails.map((s,i) => {
                const ss = s.absentH>=s.maxAllowedH?"danger":s.absentH>=s.maxAllowedH*0.75?"warning":"safe";
                return (
                  <div key={s.id} style={{ borderRadius:C.radius, marginBottom:8, border:`1.5px solid ${statusBorder(ss)}`, overflow:"hidden" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:C.sessionBg, borderBottom:`1.5px solid ${C.sessionBorder}` }}>
                      <div>
                        <span style={{ fontSize:15, fontWeight:800, color:"#545454", fontFamily:font }}>لقاء {i+1} — {s.type}</span>
                        <span style={{ fontSize:13, color:C.textMuted, marginRight:8, fontFamily:font }}>({s.duration} {s.duration===1?"ساعة":"ساعات"}/أسبوع)</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color:statusText(ss), background:C.section, borderRadius:C.radius, padding:"4px 12px", border:`1px solid ${statusBorder(ss)}`, fontFamily:font }}>{statusLabel(ss)}</span>
                    </div>
                    <div style={{ padding:"12px 16px", background:statusBg(ss) }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        {[{label:"غيابك الحالي",value:s.absentLectures,color:statusColor(ss)},{label:"حد الحرمان",value:s.maxAllowedLectures,color:C.primary}].map((item,j) => (
                          <div key={j} style={{ background:C.section, borderRadius:C.radius, border:`1px solid ${C.border}`, padding:"10px 14px", borderRight:`3px solid ${item.color}` }}>
                            <div style={{ fontSize:12, color:C.textMuted, marginBottom:4, fontFamily:font }}>{item.label}</div>
                            <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                              <span style={{ fontSize:24, fontWeight:800, color:item.color, fontFamily:font }}>{item.value}</span>
                              <span style={{ fontSize:12, color:C.textLight, fontFamily:font }}>محاضرة</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding:"13px 16px", background:statusBg(result.overallStatus), border:`1px solid ${statusBorder(result.overallStatus)}`, borderRadius:C.radius, fontSize:14, lineHeight:1.8, fontWeight:600, color:statusText(result.overallStatus), fontFamily:font }}>
              {result.overallStatus==="safe"?`وضعك ممتاز! تبقى لك ${result.remaining} ساعة قبل الوصول للحد الأقصى.`:result.overallStatus==="warning"?`تنبّه! تبقى لك ${result.remaining} ساعة فقط. تجنب الغياب غير الضروري.`:`تجاوزت الحد بـ ${Math.abs(result.remaining)} ساعة. تواصل مع إدارتك الأكاديمية فوراً.`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── GPA Calculator ─────────────────────────────────────────────────────────
const GRADES_4 = [{label:"A+ (4.0)",value:4.0},{label:"A  (4.0)",value:4.0},{label:"B+ (3.5)",value:3.5},{label:"B  (3.0)",value:3.0},{label:"C+ (2.5)",value:2.5},{label:"C  (2.0)",value:2.0},{label:"D+ (1.5)",value:1.5},{label:"D  (1.0)",value:1.0},{label:"F  (0.0)",value:0.0}];
const GRADES_5 = [{label:"A+ (5.0)",value:5.0},{label:"A  (4.75)",value:4.75},{label:"B+ (4.5)",value:4.5},{label:"B  (4.0)",value:4.0},{label:"C+ (3.5)",value:3.5},{label:"C  (3.0)",value:3.0},{label:"D+ (2.5)",value:2.5},{label:"D  (2.0)",value:2.0},{label:"F  (0.0)",value:0.0}];

let gpaId = 1;
const newCourse = () => ({ id: gpaId++, name:"", hours:"", grade:"" });

function GpaCalculator() {
  const [scale, setScale] = useState("4");
  const [courses, setCourses] = useState([newCourse()]);
  const [prevGpa, setPrevGpa] = useState("0");
  const [prevHours, setPrevHours] = useState("0");
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const gradeList = scale==="4" ? GRADES_4 : GRADES_5;
  const maxScale = parseFloat(scale);

  const addCourse = () => { setCourses(p => [...p, newCourse()]); setResult(null); };
  const removeCourse = (id) => { if (courses.length>1) { setCourses(p => p.filter(c => c.id!==id)); setResult(null); } };
  const updateCourse = (id,field,value) => { setCourses(p => p.map(c => c.id===id ? {...c,[field]:value} : c)); setResult(null); };

  const gpaColor  = (g,m) => { const p=g/m; return p>=0.8?C.primary:p>=0.6?"#F0A901":"#dc2626"; };
  const gpaBg     = (g,m) => { const p=g/m; return p>=0.8?"#f0f4ee":p>=0.6?"#fef9ec":"#fef2f2"; };
  const gpaBorder = (g,m) => { const p=g/m; return p>=0.8?"#c3d4bd":p>=0.6?"#f8d97a":"#fecaca"; };
  const gpaLabel  = (g,m) => { const p=g/m; return p>=0.9?"ممتاز":p>=0.8?"جيد جداً":p>=0.7?"جيد":p>=0.6?"مقبول":"ضعيف"; };

  const calculate = () => {
    const pG = parseFloat(prevGpa)||0, pH = parseFloat(prevHours)||0;
    let tPts = pG*pH, tHrs = pH;
    const details = courses.map(c => {
      const h=parseFloat(c.hours)||0, g=parseFloat(c.grade), pts=h*g;
      tPts+=pts; tHrs+=h;
      return {...c, h, g, pts:+pts.toFixed(2)};
    });
    const cumGpa = tHrs>0 ? +(tPts/tHrs).toFixed(2) : 0;
    let sP=0, sH=0;
    details.forEach(d => { sP+=d.pts; sH+=d.h; });
    const semGpa = sH>0 ? +(sP/sH).toFixed(2) : 0;
    setAnimating(true);
    setTimeout(() => { setResult({ details, cumGpa, semGpa, totalHours:+tHrs.toFixed(1), semHours:+sH.toFixed(1), maxScale }); setAnimating(false); }, 280);
  };

  const reset = () => { setScale("4"); setCourses([newCourse()]); setPrevGpa("0"); setPrevHours("0"); setResult(null); };
  const canCalc = courses.every(c => c.hours!=="" && c.grade!=="");

  return (
    <div>
      <div style={{ width:"100%", background:C.bannerBg, borderRadius:C.radius, border:`1.5px solid ${C.bannerBorder}`, padding:"22px", marginBottom:14, boxShadow:"0 2px 10px rgba(84,108,75,0.1)" }}>
        <div style={{ fontSize:22, fontWeight:800, marginBottom:5, fontFamily:font, color:"#3C4D35" }}>حاسبة المعدل</div>
        <div style={{ fontSize:15, color:"#545454", fontFamily:font }}>احسب معدلك الفصلي والتراكمي بدقة</div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>نوع المعدل</label>
        <div style={{ display:"flex", gap:10 }}>
          {["4","5"].map(s => {
            const sel = scale===s;
            return <button key={s} onClick={() => { setScale(s); setResult(null); }} style={{ flex:1, padding:"12px 0", border:`1.5px solid ${sel?C.activeBorder:C.border}`, borderRadius:C.radius, background:sel?C.activeFill:C.section, color:sel?C.primary:C.text, fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:font, transition:"all 0.15s", touchAction:"manipulation" }}>من {s}</button>;
          })}
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ fontSize:16, fontWeight:800, color:C.primary, fontFamily:font, marginBottom:16, borderBottom:`2px solid ${C.border}`, paddingBottom:10 }}>المعدل والساعات السابقة</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <label style={labelStyle}>المعدل السابق</label>
            <input type="number" min="0" step="0.01" max={maxScale} value={prevGpa} onChange={e => { setPrevGpa(e.target.value); setResult(null); }} placeholder="0" style={inputStyle}
              onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)} />
          </div>
          <div>
            <label style={labelStyle}>الساعات السابقة</label>
            <input type="number" min="0" value={prevHours} onChange={e => { setPrevHours(e.target.value); setResult(null); }} placeholder="0" style={inputStyle}
              onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)} />
          </div>
        </div>
      </div>

      <div style={{ width:"100%", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:16, fontWeight:800, color:C.primary, fontFamily:font }}>المواد الدراسية</span>
          <button onClick={addCourse} style={{ padding:"10px 16px", background:C.secondary, color:"white", border:"none", borderRadius:C.radius, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font, boxShadow:"0 2px 8px rgba(240,169,1,0.35)", touchAction:"manipulation" }}>+ إضافة مادة</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {courses.map((c,idx) => (
            <div key={c.id} style={{ background:C.section, borderRadius:C.radius, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.05)", overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 18px", background:C.sessionBg, borderBottom:`1.5px solid ${C.sessionBorder}` }}>
                <span style={{ fontSize:15, fontWeight:800, color:"#545454", fontFamily:font }}>مادة {idx+1}</span>
                {courses.length>1 && <button onClick={() => removeCourse(c.id)} style={{ padding:"5px 14px", background:"#fff5f5", color:"#dc2626", border:"1px solid #fecaca", borderRadius:C.radius, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:font, touchAction:"manipulation" }}>حذف</button>}
              </div>
              <div style={{ padding:"18px" }}>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>اسم المادة (اختياري)</label>
                  <input type="text" value={c.name} onChange={e => updateCourse(c.id,"name",e.target.value)} placeholder="مثال: رياضيات" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={labelStyle}>الساعات المعتمدة</label>
                    <select value={c.hours} onChange={e => updateCourse(c.id,"hours",e.target.value)} style={selectStyle}
                      onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)}>
                      <option value="">اختر</option>
                      {[1,2,3,4,5,6].map(h => <option key={h} value={h}>{h} ساعات</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>الدرجة</label>
                    <select value={c.grade} onChange={e => updateCourse(c.id,"grade",e.target.value)} style={selectStyle}
                      onFocus={e => (e.target.style.borderColor=C.primary)} onBlur={e => (e.target.style.borderColor=C.border)}>
                      <option value="">اختر</option>
                      {gradeList.map(g => <option key={g.label} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width:"100%", display:"flex", gap:10, marginBottom:14 }}>
        <button onClick={calculate} disabled={!canCalc} style={{ flex:1, padding:"14px", background:canCalc?C.primary:C.border, color:canCalc?"white":C.textLight, border:"none", borderRadius:C.radius, fontSize:16, fontWeight:800, cursor:canCalc?"pointer":"not-allowed", fontFamily:font, boxShadow:canCalc?"0 2px 10px rgba(84,108,75,0.3)":"none", touchAction:"manipulation" }}>احسب المعدل</button>
        <button onClick={reset} style={{ padding:"14px 20px", background:C.section, color:C.primary, border:`1.5px solid ${C.primary}`, borderRadius:C.radius, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font, touchAction:"manipulation" }}>إعادة تعيين</button>
      </div>

      {result && (
        <div style={{ width:"100%", marginBottom:20, opacity:animating?0:1, transform:animating?"translateY(10px)":"translateY(0)", transition:"all 0.3s ease" }}>
          <div style={{ background:C.section, border:`1.5px solid ${gpaBorder(result.cumGpa,result.maxScale)}`, borderRadius:C.radius, boxShadow:`0 2px 12px ${gpaColor(result.cumGpa,result.maxScale)}18`, padding:"20px" }}>
            <div style={{ padding:"14px 16px", borderRadius:C.radius, background:gpaBg(result.cumGpa,result.maxScale), border:`1px solid ${gpaBorder(result.cumGpa,result.maxScale)}`, marginBottom:20 }}>
              <div style={{ fontSize:17, fontWeight:800, color:gpaColor(result.cumGpa,result.maxScale), fontFamily:font }}>{gpaLabel(result.cumGpa,result.maxScale)}</div>
              <div style={{ fontSize:13, color:C.textMuted, marginTop:4, fontFamily:font }}>معدل من {result.maxScale} · إجمالي {result.totalHours} ساعة</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              {[
                { label:"المعدل الفصلي",   value:result.semGpa, sub:`${result.semHours} ساعة`,   color:C.primary },
                { label:"المعدل التراكمي", value:result.cumGpa, sub:`${result.totalHours} ساعة`, color:gpaColor(result.cumGpa,result.maxScale) },
              ].map((st,i) => (
                <div key={i} style={{ background:C.bg, borderRadius:C.radius, border:`1px solid ${C.border}`, padding:"16px 14px", textAlign:"center", borderBottom:`3px solid ${st.color}` }}>
                  <div style={{ fontSize:32, fontWeight:800, color:st.color, lineHeight:1, fontFamily:font }}>{st.value}</div>
                  <div style={{ fontSize:12, color:C.textLight, marginTop:4, fontFamily:font }}>{st.sub}</div>
                  <div style={{ fontSize:14, color:C.textMuted, marginTop:6, fontWeight:700, fontFamily:font }}>{st.label}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop:`1.5px dashed ${C.border}`, paddingTop:16 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.text, marginBottom:10, fontFamily:font }}>تفصيل المواد:</div>
              {result.details.map((d,i) => {
                const p=d.g/result.maxScale, dc=p>=0.8?C.primary:p>=0.6?"#F0A901":"#dc2626";
                return (
                  <div key={d.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:C.bg, borderRadius:C.radius, border:`1px solid ${C.border}`, marginBottom:8 }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.text, fontFamily:font }}>{d.name||`مادة ${i+1}`}</div>
                      <div style={{ fontSize:12, color:C.textMuted, marginTop:2, fontFamily:font }}>{d.h} ساعات · نقاط: {d.pts}</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:20, fontWeight:800, color:dc, fontFamily:font }}>{d.g}</div>
                      <div style={{ fontSize:11, color:C.textLight, fontFamily:font }}>/ {result.maxScale}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("absence");
  const [showInstall, setShowInstall] = useState(false);

  const tab = (key, label) => {
    const sel = activeTab===key;
    return (
      <button onClick={() => setActiveTab(key)} style={{ flex:1, padding:"13px 10px", background:sel?C.primary:C.section, color:sel?"white":C.textMuted, border:`1.5px solid ${sel?C.primary:C.border}`, borderRadius:C.radius, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:font, transition:"all 0.2s", touchAction:"manipulation", boxShadow:sel?"0 2px 8px rgba(84,108,75,0.25)":"none" }}>
        {label}
      </button>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        * { box-sizing:border-box; -webkit-text-size-adjust:100%; }
        body { margin:0; background:#FAFAFA; }
        html,body { overflow-x:hidden; width:100%; }
        .outer-wrap { display:flex; justify-content:center; width:100%; padding:16px 16px 0; }
        .inner-wrap { width:100%; max-width:100%; }
        @media(min-width:1024px){ .outer-wrap{ padding:24px 0 0; } .inner-wrap{ max-width:70%; } }
        select option { font-family:'Cairo',sans-serif; }
        @keyframes slideUp { from{transform:translateY(100%);opacity:0;} to{transform:translateY(0);opacity:1;} }
        @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
      `}</style>

      {showInstall && <InstallPopup onClose={() => setShowInstall(false)} />}

      <div dir="rtl" style={{ minHeight:"100vh", background:C.bg, fontFamily:font }}>
        <div className="outer-wrap">
          <div className="inner-wrap">

            {/* الهيدر */}
            <div style={{ textAlign:"center", marginBottom:18, position:"relative" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, justifyContent:"center" }}>
                <div style={{ fontSize:22, fontWeight:800, color:C.primary, fontFamily:font }}>الحاسبة الأكاديمية</div>
                <button
                  onClick={() => setShowInstall(true)}
                  title="أضف إلى الشاشة الرئيسية"
                  style={{
                    width:20, height:20, borderRadius:"50%",
                    background:C.primary, color:"white",
                    border:"none", cursor:"pointer",
                    fontSize:12, fontWeight:800,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 2px 6px rgba(84,108,75,0.4)",
                    flexShrink:0, touchAction:"manipulation",
                    animation:"pulse 2.5s ease-in-out infinite",
                    lineHeight:1, padding:0,
                  }}
                >
                  !
                </button>
              </div>
              <div style={{ fontSize:13, color:C.textMuted, marginTop:3, fontFamily:font }}>أدوات أكاديمية لمتابعة أدائك الدراسي</div>
            </div>

            {/* التبويبات */}
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {tab("absence","حاسبة الغياب")}
              {tab("gpa","حاسبة المعدل")}
            </div>

            {activeTab==="absence" ? <AbsenceCalculator /> : <GpaCalculator />}

            <footer style={{ width:"100%", borderTop:`1px solid ${C.border}`, paddingTop:14, paddingBottom:24, textAlign:"center" }}>
              <div style={{ fontSize:12, color:C.textLight, marginBottom:5, fontFamily:font }}>جميع الحسابات تقريبية · يُنصح بمراجعة الجهة الأكاديمية للتأكيد</div>
              <div style={{ fontSize:14, fontWeight:800, color:C.primary, fontFamily:font }}>تصميم وتطوير م. عبدالمجيد العتيبي</div>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
