import { useState } from "react";

const C = {
  bg:        "#FAFAFA",
  border:    "#E6E6E6",
  section:   "#FFFFFF",
  primary:   "#546C4B",
  secondary: "#F0A901",
  radius:    "4px",
  text:      "#1f2937",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  // جديد
  bannerBg:     "#EEF0ED",
  bannerBorder: "#546C4B",
  activeFill:   "#EEF0ED",
  activeBorder: "#546C4B",
  sessionBg:    "#FAFAFA",
  sessionBorder:"#E6E6E6",
};

const statusColor  = (st) => st === "safe" ? "#546C4B" : st === "warning" ? "#F0A901" : "#dc2626";
const statusBg     = (st) => st === "safe" ? "#f0f4ee" : st === "warning" ? "#fef9ec" : "#fef2f2";
const statusText   = (st) => st === "safe" ? "#3a4e34" : st === "warning" ? "#9a6900" : "#dc2626";
const statusBorder = (st) => st === "safe" ? "#c3d4bd" : st === "warning" ? "#f8d97a" : "#fecaca";
const statusLabel  = (st) => st === "safe" ? "آمن" : st === "warning" ? "تحذير" : "خطر";
const statusTitle  = (st) =>
  st === "safe"    ? "وضعك آمن، استمر في الانتظام" :
  st === "warning" ? "تحذير: اقتربت من الحد المسموح" :
                     "تجاوزت حد الغياب المسموح!";

const font = "'Cairo', sans-serif";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: `1.5px solid ${C.border}`,
  borderRadius: "4px",
  fontSize: 16,
  color: C.text,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: font,
  textAlign: "right",
  background: C.section,
  WebkitAppearance: "none",
  touchAction: "manipulation",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left 14px center",
  paddingLeft: 36,
};

const labelStyle = {
  display: "block",
  fontSize: 15,
  fontWeight: 700,
  color: C.text,
  marginBottom: 8,
  fontFamily: font,
};

const sectionStyle = {
  width: "100%",
  background: C.section,
  borderRadius: "4px",
  border: `1px solid ${C.border}`,
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  padding: "20px",
  marginBottom: 14,
  boxSizing: "border-box",
};

let idCounter = 1;
const newSession = () => ({ id: idCounter++, type: "نظري", duration: 1, absenceCount: "" });

function SessionCard({ session, index, onUpdate, onRemove, canRemove }) {
  const typeBtn = (selected) => ({
    flex: 1, padding: "10px 0",
    border: `1.5px solid ${selected ? C.activeBorder : C.border}`,
    borderRadius: "4px",
    background: selected ? C.activeFill : C.section,
    color: selected ? C.primary : C.text,
    fontWeight: 700, fontSize: 15,
    cursor: "pointer", fontFamily: font,
    transition: "all 0.15s", touchAction: "manipulation",
  });

  return (
    <div style={{
      background: C.section, borderRadius: "4px",
      border: `1px solid ${C.border}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      {/* رأس البطاقة */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 18px",
        background: C.sessionBg,
        borderBottom: `1.5px solid ${C.sessionBorder}`,
      }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#545454", fontFamily: font }}>
          لقاء {index + 1}
        </span>
        {canRemove && (
          <button onClick={() => onRemove(session.id)} style={{
            padding: "5px 14px", background: "#fff5f5",
            color: "#dc2626", border: "1px solid #fecaca",
            borderRadius: "4px", fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: font, touchAction: "manipulation",
          }}>
            حذف
          </button>
        )}
      </div>

      <div style={{ padding: "18px" }}>
        {/* النوع */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>نوع اللقاء</label>
          <div style={{ display: "flex", gap: 10 }}>
            {["نظري", "عملي"].map((t) => (
              <button key={t} onClick={() => onUpdate(session.id, "type", t)} style={typeBtn(session.type === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* المدة - dropdown */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>عدد الساعات الأسبوعية</label>
          <div style={{ position: "relative" }}>
            <select
              value={session.duration}
              onChange={(e) => onUpdate(session.id, "duration", parseInt(e.target.value))}
              style={selectStyle}
            >
              <option value={1}>ساعة واحدة</option>
              <option value={2}>ساعتان</option>
              <option value={3}>3 ساعات</option>
              <option value={4}>4 ساعات</option>
              <option value={5}>5 ساعات</option>
            </select>
          </div>
        </div>

        {/* عدد الغيابات */}
        <div>
          <label style={labelStyle}>عدد الغيابات</label>
          <input
            type="number" min="0"
            value={session.absenceCount}
            onChange={(e) => onUpdate(session.id, "absenceCount", e.target.value)}
            placeholder="مثال: 3"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = C.border)}
          />
        </div>
      </div>
    </div>
  );
}

export default function AbsenceCalculator() {
  const [weeks, setWeeks]                   = useState("18");
  const [allowedPercent, setAllowedPercent] = useState("20");
  const [sessions, setSessions]             = useState([newSession()]);
  const [result, setResult]                 = useState(null);
  const [animating, setAnimating]           = useState(false);
  const [settingsOpen, setSettingsOpen]     = useState(false);

  const addSession    = () => { setSessions((p) => [...p, newSession()]); setResult(null); };
  const removeSession = (id) => { if (sessions.length > 1) { setSessions((p) => p.filter((s) => s.id !== id)); setResult(null); } };
  const updateSession = (id, field, value) => { setSessions((p) => p.map((s) => s.id === id ? { ...s, [field]: value } : s)); setResult(null); };

  const calculate = () => {
    const w = parseFloat(weeks), pct = parseFloat(allowedPercent);
    if (!w || w <= 0) return;
    let totalAllowedHours = 0, totalAbsentHours = 0;
    const sessionDetails = sessions.map((s) => {
      const totalHours  = s.duration * w;
      const maxAllowedH = (totalHours * pct) / 100;
      const absentH     = (parseFloat(s.absenceCount) || 0) * s.duration;
      totalAllowedHours += maxAllowedH;
      totalAbsentHours  += absentH;
      return {
        ...s, totalHours,
        maxAllowedH:        +maxAllowedH.toFixed(2),
        absentH,
        remainingH:         +(maxAllowedH - absentH).toFixed(2),
        maxAllowedLectures: +(maxAllowedH / s.duration).toFixed(1),
        absentLectures:     parseFloat(s.absenceCount) || 0,
        pct: totalHours > 0 ? ((absentH / totalHours) * 100).toFixed(1) : "0.0",
      };
    });
    const remaining = +(totalAllowedHours - totalAbsentHours).toFixed(2);
    const overallStatus = totalAbsentHours >= totalAllowedHours ? "danger"
      : totalAbsentHours >= totalAllowedHours * 0.75 ? "warning" : "safe";
    setAnimating(true);
    setTimeout(() => {
      setResult({
        sessionDetails,
        totalAllowedHours: +totalAllowedHours.toFixed(2),
        totalAbsentHours:  +totalAbsentHours.toFixed(2),
        remaining, overallStatus,
        weeks: w, allowedPercent: pct,
      });
      setAnimating(false);
    }, 280);
  };

  const reset = () => { setWeeks("18"); setAllowedPercent("20"); setSessions([newSession()]); setResult(null); };
  const canCalc = weeks !== "" && parseFloat(weeks) > 0 && sessions.every((s) => s.absenceCount !== "");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; -webkit-text-size-adjust: 100%; }
        body { margin: 0; background: #FAFAFA; }
        html, body { overflow-x: hidden; width: 100%; }
        .outer-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 16px 16px 0;
        }
        .inner-wrap {
          width: 100%;
          max-width: 100%;
        }
        @media (min-width: 1024px) {
          .outer-wrap { padding: 24px 0 0; }
          .inner-wrap { max-width: 70%; }
        }
        select option { font-family: 'Cairo', sans-serif; }
      `}</style>

      <div dir="rtl" style={{ minHeight: "100vh", background: C.bg, fontFamily: font }}>
        <div className="outer-wrap">
          <div className="inner-wrap">

            {/* البانر */}
            <div style={{
              width: "100%",
              background: C.bannerBg,
              borderRadius: "4px",
              border: `1.5px solid ${C.bannerBorder}`,
              padding: "22px",
              marginBottom: 14,
              boxShadow: "0 2px 10px rgba(59,130,246,0.15)",
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 5, fontFamily: font, color: "#3C4D35" }}>
                حاسبة الغياب
              </div>
              <div style={{ fontSize: 15, color: "#545454", fontFamily: font }}>
                اطلع على نسبة غياباتك باستمرار
              </div>
            </div>

            {/* الإعدادات العامة */}
            <div style={sectionStyle}>
              <div
                onClick={() => setSettingsOpen((prev) => !prev)}
                style={{
                  fontSize: 16, fontWeight: 800, color: C.primary, fontFamily: font,
                  cursor: "pointer", userSelect: "none", touchAction: "manipulation",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <span>الإعدادات العامة</span>
                <span style={{
                  display: "inline-block", fontSize: 12, color: C.primary,
                  transform: settingsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s",
                }}>▼</span>
              </div>

              {settingsOpen && (
                <div style={{ marginTop: 18, borderTop: `2px solid ${C.border}`, paddingTop: 18 }}>
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>عدد أسابيع الدراسة</label>
                    <input type="number" min="1" value={weeks}
                      onChange={(e) => { setWeeks(e.target.value); setResult(null); }}
                      placeholder="18" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = C.primary)}
                      onBlur={(e) => (e.target.style.borderColor = C.border)}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>نسبة الغياب المسموحة ({allowedPercent}%)</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      {["10", "15", "20", "25", "30"].map((v) => {
                        const sel = allowedPercent === v;
                        return (
                          <button key={v} onClick={() => { setAllowedPercent(v); setResult(null); }} style={{
                            padding: "9px 16px",
                            border: `1.5px solid ${sel ? C.activeBorder : C.border}`,
                            borderRadius: "4px",
                            background: sel ? C.activeFill : C.section,
                            color: sel ? C.primary : C.text,

                            fontWeight: 700, fontSize: 15,
                            cursor: "pointer", fontFamily: font,
                            touchAction: "manipulation",
                          }}>{v}%</button>
                        );
                      })}
                    </div>
                    <input type="range" min="1" max="50" value={allowedPercent}
                      onChange={(e) => { setAllowedPercent(e.target.value); setResult(null); }}
                      style={{ width: "100%", accentColor: C.primary, height: 6 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* اللقاءات */}
            <div style={{ width: "100%", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.primary, fontFamily: font }}>اللقاءات الدراسية</span>
                <button onClick={addSession} style={{
                  padding: "10px 16px", background: C.secondary, color: "white",
                  border: "none", borderRadius: "4px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: font,
                  boxShadow: "0 2px 8px rgba(240,169,1,0.35)", touchAction: "manipulation",
                }}>
                  + إضافة لقاء
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sessions.map((s, idx) => (
                  <SessionCard key={s.id} session={s} index={idx}
                    onUpdate={updateSession} onRemove={removeSession}
                    canRemove={sessions.length > 1}
                  />
                ))}
              </div>
            </div>

            {/* أزرار الحساب */}
            <div style={{ width: "100%", display: "flex", gap: 10, marginBottom: 14 }}>
              <button onClick={calculate} disabled={!canCalc} style={{
                flex: 1, padding: "14px",
                background: canCalc ? C.primary : C.border,
                color: canCalc ? "white" : C.textLight,
                border: "none", borderRadius: "4px",
                fontSize: 16, fontWeight: 800,
                cursor: canCalc ? "pointer" : "not-allowed",
                fontFamily: font,
                boxShadow: canCalc ? "0 2px 10px rgba(84,108,75,0.3)" : "none",
                touchAction: "manipulation",
              }}>
                احسب الغياب
              </button>
              <button onClick={reset} style={{
                padding: "14px 20px", background: C.section, color: C.primary,
                border: `1.5px solid ${C.primary}`, borderRadius: "4px",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: font, touchAction: "manipulation",
              }}>
                إعادة تعيين
              </button>
            </div>

            {/* النتيجة */}
            {result && (
              <div style={{
                width: "100%", marginBottom: 20,
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(10px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}>
                <div style={{
                  background: C.section,
                  border: `1.5px solid ${statusBorder(result.overallStatus)}`,
                  borderRadius: "4px",
                  boxShadow: `0 2px 12px ${statusColor(result.overallStatus)}18`,
                  padding: "20px",
                }}>
                  {/* الحالة الإجمالية */}
                  <div style={{
                    padding: "14px 16px", borderRadius: "4px",
                    background: statusBg(result.overallStatus),
                    border: `1px solid ${statusBorder(result.overallStatus)}`,
                    marginBottom: 20,
                  }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: statusText(result.overallStatus), fontFamily: font }}>
                      {statusTitle(result.overallStatus)}
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, fontFamily: font }}>
                      {result.weeks} أسبوع · نسبة مسموحة {result.allowedPercent}%
                    </div>
                  </div>

                  {/* شريط التقدم */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.textMuted, marginBottom: 6, fontFamily: font }}>
                      <span>نسبة استهلاك الغياب</span>
                      <span style={{ fontWeight: 800, color: statusColor(result.overallStatus) }}>
                        {result.totalAllowedHours > 0
                          ? ((result.totalAbsentHours / result.totalAllowedHours) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div style={{ height: 12, background: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${Math.min((result.totalAbsentHours / result.totalAllowedHours) * 100, 100)}%`,
                        background: statusColor(result.overallStatus),
                        borderRadius: "4px",
                        transition: "width 0.9s cubic-bezier(0.34,1.56,0.64,1)",
                      }} />
                    </div>
                  </div>

                  {/* الإحصائيات الكلية */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                    {[
                      { label: "حد الحرمان",    value: result.totalAllowedHours, color: C.primary },
                      { label: "الغياب الفعلي", value: result.totalAbsentHours,  color: statusColor(result.overallStatus) },
                      {
                        label: result.remaining >= 0 ? "المتبقي" : "التجاوز",
                        value: Math.abs(result.remaining),
                        color: result.remaining >= 0 ? C.primary : "#dc2626",
                      },
                    ].map((st, i) => (
                      <div key={i} style={{
                        background: C.bg, borderRadius: "4px",
                        border: `1px solid ${C.border}`,
                        padding: "12px 10px", textAlign: "center",
                        borderBottom: `3px solid ${st.color}`,
                      }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: st.color, lineHeight: 1, fontFamily: font }}>{st.value}</div>
                        <div style={{ fontSize: 11, color: C.textLight, marginTop: 2, fontFamily: font }}>ساعة</div>
                        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 5, fontWeight: 700, fontFamily: font }}>{st.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* تفصيل اللقاءات */}
                  <div style={{ borderTop: `1.5px dashed ${C.border}`, paddingTop: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 10, fontFamily: font }}>
                      تفصيل اللقاءات:
                    </div>
                    {result.sessionDetails.map((s, i) => {
                      const ss = s.absentH >= s.maxAllowedH ? "danger"
                        : s.absentH >= s.maxAllowedH * 0.75 ? "warning" : "safe";
                      return (
                        <div key={s.id} style={{
                          borderRadius: "4px", marginBottom: 8,
                          border: `1.5px solid ${statusBorder(ss)}`,
                          overflow: "hidden",
                        }}>
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "10px 16px",
                            background: C.sessionBg,
                            borderBottom: `1.5px solid ${C.sessionBorder}`,
                          }}>
                            <div>
                              <span style={{ fontSize: 15, fontWeight: 800, color: "#545454", fontFamily: font }}>
                                لقاء {i + 1} — {s.type}
                              </span>
                              <span style={{ fontSize: 13, color: C.textMuted, marginRight: 8, fontFamily: font }}>
                                ({s.duration} {s.duration === 1 ? "ساعة" : "ساعات"}/أسبوع)
                              </span>
                            </div>
                            <span style={{
                              fontSize: 13, fontWeight: 800, color: statusText(ss),
                              background: C.section, borderRadius: "4px",
                              padding: "4px 12px", border: `1px solid ${statusBorder(ss)}`,
                              fontFamily: font,
                            }}>
                              {statusLabel(ss)}
                            </span>
                          </div>

                          <div style={{ padding: "12px 16px", background: statusBg(ss) }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                              {[
                                { label: "غيابك الحالي", value: s.absentLectures,     color: statusColor(ss) },
                                { label: "حد الحرمان",   value: s.maxAllowedLectures, color: C.primary },
                              ].map((item, j) => (
                                <div key={j} style={{
                                  background: C.section, borderRadius: "4px",
                                  border: `1px solid ${C.border}`, padding: "10px 14px",
                                  borderRight: `3px solid ${item.color}`,
                                }}>
                                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4, fontFamily: font }}>{item.label}</div>
                                  <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                                    <span style={{ fontSize: 24, fontWeight: 800, color: item.color, fontFamily: font }}>{item.value}</span>
                                    <span style={{ fontSize: 12, color: C.textLight, fontFamily: font }}>محاضرة</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* النصيحة */}
                  <div style={{
                    padding: "13px 16px",
                    background: statusBg(result.overallStatus),
                    border: `1px solid ${statusBorder(result.overallStatus)}`,
                    borderRadius: "4px",
                    fontSize: 14, lineHeight: 1.8, fontWeight: 600,
                    color: statusText(result.overallStatus), fontFamily: font,
                  }}>
                    {result.overallStatus === "safe"
                      ? `وضعك ممتاز! تبقى لك ${result.remaining} ساعة قبل الوصول للحد الأقصى.`
                      : result.overallStatus === "warning"
                      ? `تنبّه! تبقى لك ${result.remaining} ساعة فقط. تجنب الغياب غير الضروري.`
                      : `تجاوزت الحد بـ ${Math.abs(result.remaining)} ساعة. تواصل مع إدارتك الأكاديمية فوراً.`}
                  </div>
                </div>
              </div>
            )}

            {/* الفوتر */}
            <footer style={{
              width: "100%", borderTop: `1px solid ${C.border}`,
              paddingTop: 14, paddingBottom: 24, textAlign: "center",
            }}>
              <div style={{ fontSize: 12, color: C.textLight, marginBottom: 5, fontFamily: font }}>
                جميع الحسابات تقريبية · يُنصح بمراجعة الجهة الأكاديمية للتأكيد
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.primary, fontFamily: font }}>
                تصميم وتطوير م. عبدالمجيد العتيبي
              </div>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
