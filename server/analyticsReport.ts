/**
 * Analytics Report Generator
 * Queries page_views table and generates a self-contained HTML report file.
 */
import { pool } from "./db";

interface ReportParams {
  from: string;   // YYYY-MM-DD
  to: string;     // YYYY-MM-DD
  country?: string; // e.g. "United States" or "" for all
}

interface ReportData {
  totalSessions: number;
  dateRange: string;
  countryFilter: string;
  topPage: { path: string; count: number };
  peakDay: { date: string; count: number };
  desktopPct: string;
  demoVisits: number;
  dailyTraffic: { label: string; count: number }[];
  topPages: { path: string; count: number }[];
  deviceBreakdown: { label: string; count: number }[];
  browserBreakdown: { label: string; count: number }[];
  osBreakdown: { label: string; count: number }[];
  topCities: { city: string; count: number }[];
  hourlyTraffic: number[];
  categoryBreakdown: { label: string; count: number }[];
  specialtyBreakdown: { label: string; count: number; color: string; icon: string }[];
}

function categorize(path: string): string {
  if (path.startsWith("/blog")) return "Blog";
  if (path === "/" || path === "") return "Homepage";
  if (path.startsWith("/specialties")) return "Specialties";
  if (path.startsWith("/ehr")) return "EHR Pages";
  if (path.startsWith("/rcm")) return "RCM";
  if (path.startsWith("/practice-management")) return "Practice Mgmt";
  if (path.startsWith("/patient-engagement")) return "Patient Engagement";
  if (path.startsWith("/telehealth")) return "Telehealth";
  if (path.startsWith("/book-demo") || path.startsWith("/demo")) return "Demo";
  if (path.startsWith("/contact")) return "Contact";
  if (path.startsWith("/about")) return "About";
  if (path.startsWith("/pricing")) return "Pricing";
  if (path.startsWith("/admin")) return "Admin";
  if (path.startsWith("/hipaa") || path.startsWith("/security")) return "Compliance";
  if (path.startsWith("/white-papers") || path.startsWith("/webinars") || path.startsWith("/case-studies")) return "Resources";
  return "Other";
}

export async function buildReportData(params: ReportParams): Promise<ReportData> {
  const { from, to, country } = params;
  const countryFilter = country && country !== "all" ? country : null;

  const baseWhere = countryFilter
    ? `created_at >= $1::date AND created_at < ($2::date + interval '1 day') AND country = $3`
    : `created_at >= $1::date AND created_at < ($2::date + interval '1 day')`;
  const baseArgs: (string | number)[] = countryFilter ? [from, to, countryFilter] : [from, to];

  // Total sessions
  const totalRes = await pool.query(`SELECT COUNT(*) FROM page_views WHERE ${baseWhere}`, baseArgs);
  const totalSessions = parseInt(totalRes.rows[0].count, 10);

  // Top page
  const topPageRes = await pool.query(
    `SELECT path, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY path ORDER BY cnt DESC LIMIT 1`,
    baseArgs
  );
  const topPage = topPageRes.rows[0]
    ? { path: topPageRes.rows[0].path, count: parseInt(topPageRes.rows[0].cnt, 10) }
    : { path: "/", count: 0 };

  // Peak day
  const peakDayRes = await pool.query(
    `SELECT DATE(created_at) as day, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY day ORDER BY cnt DESC LIMIT 1`,
    baseArgs
  );
  const peakDay = peakDayRes.rows[0]
    ? {
        date: new Date(peakDayRes.rows[0].day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: parseInt(peakDayRes.rows[0].cnt, 10),
      }
    : { date: "N/A", count: 0 };

  // Device breakdown
  const deviceRes = await pool.query(
    `SELECT COALESCE(device_type, 'Unknown') as label, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY label ORDER BY cnt DESC`,
    baseArgs
  );
  const deviceBreakdown = deviceRes.rows.map(r => ({ label: r.label, count: parseInt(r.cnt, 10) }));
  const desktopCount = deviceBreakdown.find(d => d.label.toLowerCase() === "desktop")?.count ?? 0;
  const desktopPct = totalSessions > 0 ? ((desktopCount / totalSessions) * 100).toFixed(1) : "0";

  // Demo visits
  const demoRes = await pool.query(
    `SELECT COUNT(*) FROM page_views WHERE ${baseWhere} AND (path LIKE '/book-demo%' OR path LIKE '/demo%')`,
    baseArgs
  );
  const demoVisits = parseInt(demoRes.rows[0].count, 10);

  // Daily traffic (all days in range)
  const dailyRes = await pool.query(
    `SELECT DATE(created_at) as day, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY day ORDER BY day`,
    baseArgs
  );
  const dailyTraffic = dailyRes.rows.map(r => ({
    label: new Date(r.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count: parseInt(r.cnt, 10),
  }));

  // Top 15 pages
  const topPagesRes = await pool.query(
    `SELECT path, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY path ORDER BY cnt DESC LIMIT 15`,
    baseArgs
  );
  const topPages = topPagesRes.rows.map(r => ({ path: r.path, count: parseInt(r.cnt, 10) }));

  // Browser breakdown
  const browserRes = await pool.query(
    `SELECT COALESCE(NULLIF(browser,''), 'Other') as label, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY label ORDER BY cnt DESC LIMIT 6`,
    baseArgs
  );
  const browserBreakdown = browserRes.rows.map(r => ({ label: r.label, count: parseInt(r.cnt, 10) }));

  // OS breakdown
  const osRes = await pool.query(
    `SELECT COALESCE(NULLIF(os,''), 'Other') as label, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY label ORDER BY cnt DESC LIMIT 6`,
    baseArgs
  );
  const osBreakdown = osRes.rows.map(r => ({ label: r.label, count: parseInt(r.cnt, 10) }));

  // Top 15 cities
  const cityRes = await pool.query(
    `SELECT COALESCE(NULLIF(city,''), 'Unknown') as city, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} AND city IS NOT NULL AND city != '' GROUP BY city ORDER BY cnt DESC LIMIT 15`,
    baseArgs
  );
  const topCities = cityRes.rows.map(r => ({ city: r.city, count: parseInt(r.cnt, 10) }));

  // Hourly (0–23 UTC)
  const hourlyRes = await pool.query(
    `SELECT EXTRACT(HOUR FROM created_at) as hr, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY hr ORDER BY hr`,
    baseArgs
  );
  const hourlyTraffic = Array(24).fill(0);
  for (const r of hourlyRes.rows) hourlyTraffic[parseInt(r.hr, 10)] = parseInt(r.cnt, 10);

  // Category breakdown
  const allPathsRes = await pool.query(
    `SELECT path, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} GROUP BY path`,
    baseArgs
  );
  const catMap = new Map<string, number>();
  for (const r of allPathsRes.rows) {
    const cat = categorize(r.path);
    catMap.set(cat, (catMap.get(cat) ?? 0) + parseInt(r.cnt, 10));
  }
  const categoryBreakdown = Array.from(catMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  // Specialty breakdown
  const specDefs = [
    { key: "dermatology", label: "Dermatology", color: "#3dd6c8", icon: "🔬" },
    { key: "obgyn",       label: "OB/GYN",       color: "#b89cff", icon: "🩺" },
    { key: "pediatrics",  label: "Pediatrics",   color: "#f6c90e", icon: "👶" },
    { key: "cardiology",  label: "Cardiology",   color: "#ff7c7c", icon: "🫀" },
    { key: "family-medicine", label: "Family Medicine", color: "#ffad60", icon: "🏥" },
    { key: "urology",     label: "Urology",      color: "#63b3ed", icon: "🔵" },
    { key: "orthopedics", label: "Orthopedics",  color: "#48cae4", icon: "🦴" },
    { key: "neurology",   label: "Neurology",    color: "#e63946", icon: "🧠" },
  ];
  const specRes = await pool.query(
    `SELECT path, COUNT(*) as cnt FROM page_views WHERE ${baseWhere} AND path LIKE '/specialties/%' GROUP BY path`,
    baseArgs
  );
  const specMap = new Map<string, number>();
  for (const r of specRes.rows) {
    for (const s of specDefs) {
      if (r.path.includes(s.key)) specMap.set(s.key, (specMap.get(s.key) ?? 0) + parseInt(r.cnt, 10));
    }
  }
  const specialtyBreakdown = specDefs
    .map(s => ({ label: s.label, color: s.color, icon: s.icon, count: specMap.get(s.key) ?? 0 }))
    .filter(s => s.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    totalSessions,
    dateRange: `${new Date(from).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – ${new Date(to).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
    countryFilter: countryFilter ?? "All Countries",
    topPage,
    peakDay,
    desktopPct,
    demoVisits,
    dailyTraffic,
    topPages,
    deviceBreakdown,
    browserBreakdown,
    osBreakdown,
    topCities,
    hourlyTraffic,
    categoryBreakdown,
    specialtyBreakdown,
  };
}

export function generateReportHtml(data: ReportData): string {
  const j = JSON.stringify;

  const specCardsHtml = data.specialtyBreakdown.length > 0
    ? data.specialtyBreakdown.map(s => {
        const maxCount = data.specialtyBreakdown[0].count;
        const pct = maxCount > 0 ? ((s.count / maxCount) * 100).toFixed(0) : "0";
        const specTotal = data.specialtyBreakdown.reduce((a, b) => a + b.count, 0);
        const share = specTotal > 0 ? ((s.count / specTotal) * 100).toFixed(1) : "0";
        return `<div class="spec-card" style="border-top-color:${s.color}">
          <div class="spec-icon">${s.icon}</div>
          <div class="spec-name">${s.label}</div>
          <div class="spec-count" style="color:${s.color}">${s.count}</div>
          <div class="spec-bar-wrap"><div class="spec-bar" style="width:${pct}%;background:${s.color}"></div></div>
          <div class="spec-pct">${share}% of specialty traffic</div>
        </div>`;
      }).join("")
    : `<div style="color:#6b7fa3;font-size:0.85rem;">No specialty page visits in this period.</div>`;

  const cityItemsHtml = data.topCities.map(c =>
    `<div class="city-item"><span class="city-name">${c.city}</span><span class="city-count">${c.count}</span></div>`
  ).join("");

  const topPagesHtml = data.topPages.map(([, ] as unknown as never, idx: never) => "").join(""); // placeholder

  const maxPageCount = data.topPages[0]?.count ?? 1;
  const pagesHtml = data.topPages.map((p, i) => {
    const pct = ((p.count / maxPageCount) * 100).toFixed(1);
    return `<tr>
      <td class="rank-num">${i + 1}</td>
      <td class="page-url">${p.path}</td>
      <td class="count-num">${p.count}</td>
      <td><div class="bar-cell">
        <div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div>
        <span style="font-size:0.68rem;color:#6b7fa3">${p.count}</span>
      </div></td>
    </tr>`;
  }).join("");

  const deviceLabels = data.deviceBreakdown.map(d => d.label);
  const deviceData = data.deviceBreakdown.map(d => d.count);
  const browserLabels = data.browserBreakdown.map(b => b.label);
  const browserData = data.browserBreakdown.map(b => b.count);
  const osLabels = data.osBreakdown.map(o => o.label);
  const osData = data.osBreakdown.map(o => o.count);
  const catLabels = data.categoryBreakdown.map(c => c.label);
  const catData = data.categoryBreakdown.map(c => c.count);
  const specLabels = data.specialtyBreakdown.map(s => s.label);
  const specData = data.specialtyBreakdown.map(s => s.count);
  const specColors = data.specialtyBreakdown.map(s => s.color);
  const dailyLabels = data.dailyTraffic.map(d => d.label);
  const dailyData = data.dailyTraffic.map(d => d.count);

  const catColors = ['#3dd6c8','#63b3ed','#f6c90e','#b89cff','#ff7c7c','#ffad60','#48cae4','#00b0f0','#e63946','#90e0ef','#023e8a','#ffd166','#0077b6','#3a4060'];
  const browserColors = ['#4285f4','#ff9f43','#00b0f0','#6b7fa3','#ff6b6b','#aaaaaa'];
  const osColors = ['#f6c90e','#b89cff','#63b3ed','#6b7fa3','#ff7c7c','#ffad60'];
  const deviceColors = ['#63b3ed','#b89cff','#3dd6c8','#ff7c7c'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>MDCharts Analytics – ${data.dateRange}</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
:root{--bg:#0c0f1a;--bg2:#111525;--card:#151929;--border:rgba(99,179,237,0.13);--gold:#f6c90e;--teal:#3dd6c8;--coral:#ff7c7c;--lavender:#b89cff;--sky:#63b3ed;--orange:#ffad60;--text:#e9eef8;--muted:#6b7fa3}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Figtree',sans-serif;font-weight:400;min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(circle,rgba(99,179,237,0.07) 1px,transparent 1px);background-size:32px 32px;pointer-events:none;z-index:0}
.wrap{position:relative;z-index:1;max-width:1380px;margin:0 auto;padding:36px 28px 60px}
header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:44px;flex-wrap:wrap;gap:20px;padding-bottom:28px;border-bottom:1px solid var(--border)}
.logo-zone h1{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:2.6rem;letter-spacing:-0.5px;color:var(--text);line-height:1.1}
.logo-zone h1 span{color:var(--gold)}
.logo-zone p{color:var(--muted);font-size:0.82rem;margin-top:6px}
.badge{display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(246,201,14,0.12),rgba(246,201,14,0.05));border:1px solid rgba(246,201,14,0.3);border-radius:10px;padding:10px 20px}
.badge-text{font-size:0.75rem;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;font-weight:600}
.kpi-row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:28px}
.kpi{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px 18px;position:relative;overflow:hidden;transition:transform 0.2s}
.kpi:hover{transform:translateY(-3px)}
.kpi::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px}
.kpi.k1::before{background:linear-gradient(90deg,var(--gold),transparent)}
.kpi.k2::before{background:linear-gradient(90deg,var(--teal),transparent)}
.kpi.k3::before{background:linear-gradient(90deg,var(--coral),transparent)}
.kpi.k4::before{background:linear-gradient(90deg,var(--lavender),transparent)}
.kpi.k5::before{background:linear-gradient(90deg,var(--sky),transparent)}
.kpi label{display:block;font-size:0.68rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:12px;font-weight:500}
.kpi .val{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:700;line-height:1}
.kpi.k1 .val{color:var(--gold)}.kpi.k2 .val{color:var(--teal)}.kpi.k3 .val{color:var(--coral)}.kpi.k4 .val{color:var(--lavender)}.kpi.k5 .val{color:var(--sky)}
.kpi .sub{font-size:0.72rem;color:var(--muted);margin-top:6px}
.spec-section{background:var(--card);border:1px solid rgba(61,214,200,0.2);border-radius:20px;padding:32px;margin-bottom:22px}
.spec-section h2{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:var(--teal);margin-bottom:20px}
.spec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px}
.spec-card{background:rgba(255,255,255,0.03);border-radius:14px;padding:20px 18px;border-top:3px solid transparent}
.spec-icon{font-size:1.4rem;margin-bottom:10px}
.spec-name{font-size:0.68rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:6px;font-weight:600}
.spec-count{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;line-height:1}
.spec-bar-wrap{margin-top:12px;background:rgba(255,255,255,0.07);border-radius:3px;height:3px}
.spec-bar{height:3px;border-radius:3px}
.spec-pct{font-size:0.7rem;color:var(--muted);margin-top:7px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.grid-3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:18px;margin-bottom:18px}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px}
.card h2{font-size:0.72rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:1.8px;margin-bottom:20px;display:flex;align-items:center;gap:8px}
.dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;display:inline-block}
.page-table{width:100%;border-collapse:collapse}
.page-table th{text-align:left;font-size:0.65rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);padding:6px 0 10px;border-bottom:1px solid var(--border);font-weight:600}
.page-table td{padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.8rem;vertical-align:middle}
.page-url{color:var(--sky);font-size:0.75rem}
.rank-num{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--muted);min-width:24px;padding-right:10px}
.bar-cell{display:flex;align-items:center;gap:10px}
.bar-bg{flex:1;background:rgba(255,255,255,0.06);border-radius:3px;height:4px;min-width:60px}
.bar-fill{height:4px;border-radius:3px;background:linear-gradient(90deg,var(--sky),var(--teal))}
.count-num{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--text);min-width:34px;text-align:right}
.city-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
.city-item{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;font-size:0.78rem}
.city-name{color:var(--text)}.city-count{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--sky)}
.footer{text-align:center;color:var(--muted);font-size:0.7rem;margin-top:48px;padding-top:24px;border-top:1px solid var(--border)}
</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="logo-zone">
    <h1>MDCharts <span>Analytics</span></h1>
    <p>${data.dateRange} &nbsp;|&nbsp; Filter: ${data.countryFilter} &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
  </div>
  <div class="badge">
    <div>
      <div class="badge-text">${data.countryFilter === "All Countries" ? "🌍 All Countries" : "🇺🇸 " + data.countryFilter}</div>
      <div style="font-size:0.68rem;color:#6b7fa3;margin-top:2px;">${data.totalSessions.toLocaleString()} total sessions</div>
    </div>
  </div>
</header>

<div class="kpi-row">
  <div class="kpi k1"><label>Sessions</label><div class="val">${data.totalSessions.toLocaleString()}</div><div class="sub">${data.dateRange}</div></div>
  <div class="kpi k2"><label>Top Page</label><div class="val" style="font-size:1.4rem">${data.topPage.path}</div><div class="sub">${data.topPage.count} visits</div></div>
  <div class="kpi k3"><label>Peak Day</label><div class="val">${data.peakDay.date}</div><div class="sub">${data.peakDay.count} sessions</div></div>
  <div class="kpi k4"><label>Desktop Share</label><div class="val">${data.desktopPct}%</div><div class="sub">of all sessions</div></div>
  <div class="kpi k5"><label>Demo Visits</label><div class="val">${data.demoVisits}</div><div class="sub">/book-demo + /demo</div></div>
</div>

${data.specialtyBreakdown.length > 0 ? `
<div class="spec-section">
  <h2>Specialty Page Visits</h2>
  <div class="spec-grid">${specCardsHtml}</div>
  <div style="max-width:600px"><canvas id="specChart" height="130"></canvas></div>
</div>` : ""}

<div class="grid-2">
  <div class="card"><h2><span class="dot" style="background:var(--sky)"></span>Daily Traffic</h2><canvas id="dailyChart" height="200"></canvas></div>
  <div class="card"><h2><span class="dot" style="background:var(--gold)"></span>Page Categories</h2><canvas id="catChart" height="200"></canvas></div>
</div>

<div class="grid-3">
  <div class="card"><h2><span class="dot" style="background:var(--teal)"></span>Hourly Traffic (UTC)</h2><canvas id="hourlyChart" height="180"></canvas></div>
  <div class="card"><h2><span class="dot" style="background:var(--lavender)"></span>Device</h2><canvas id="deviceChart" height="180"></canvas></div>
  <div class="card"><h2><span class="dot" style="background:var(--coral)"></span>Browser</h2><canvas id="browserChart" height="180"></canvas></div>
</div>

<div class="grid-2">
  <div class="card"><h2><span class="dot" style="background:var(--orange)"></span>Operating System</h2><canvas id="osChart" height="190"></canvas></div>
  <div class="card"><h2><span class="dot" style="background:var(--teal)"></span>Top Cities</h2><div class="city-grid">${cityItemsHtml}</div></div>
</div>

<div class="card" style="margin-bottom:20px">
  <h2><span class="dot" style="background:var(--sky)"></span>Top 15 Pages</h2>
  <table class="page-table">
    <thead><tr><th style="width:28px">#</th><th>Page</th><th style="width:50px">Visits</th><th style="width:40%">Volume</th></tr></thead>
    <tbody>${pagesHtml}</tbody>
  </table>
</div>

<div class="footer">MDCharts EHR &nbsp;|&nbsp; Analytics Report &nbsp;|&nbsp; ${data.totalSessions.toLocaleString()} Sessions &nbsp;|&nbsp; ${data.dateRange} &nbsp;|&nbsp; Filter: ${data.countryFilter}</div>
</div>

<script>
Chart.defaults.font={family:"'Figtree',sans-serif",size:11};
Chart.defaults.color='#6b7fa3';

${data.specialtyBreakdown.length > 0 ? `
new Chart(document.getElementById('specChart'),{type:'bar',data:{labels:${j(specLabels)},datasets:[{data:${j(specData)},backgroundColor:${j(specColors)},borderRadius:8,borderSkipped:false}]},options:{indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,0.05)'}},y:{grid:{display:false},ticks:{color:'#e9eef8'}}}}});
` : ""}

new Chart(document.getElementById('dailyChart'),{type:'line',data:{labels:${j(dailyLabels)},datasets:[{data:${j(dailyData)},borderColor:'#63b3ed',backgroundColor:'rgba(99,179,237,0.08)',tension:0.4,fill:true,pointBackgroundColor:'#63b3ed',pointRadius:3,pointHoverRadius:6}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{maxTicksLimit:10}},y:{grid:{color:'rgba(255,255,255,0.05)'},beginAtZero:true}}}});

new Chart(document.getElementById('catChart'),{type:'doughnut',data:{labels:${j(catLabels)},datasets:[{data:${j(catData)},backgroundColor:${j(catColors.slice(0, catLabels.length))},borderColor:'#151929',borderWidth:2}]},options:{plugins:{legend:{position:'right',labels:{boxWidth:9,padding:10,font:{size:9.5}}}},cutout:'62%'}});

new Chart(document.getElementById('hourlyChart'),{type:'bar',data:{labels:Array.from({length:24},(_,i)=>i+':00'),datasets:[{data:${j(data.hourlyTraffic)},backgroundColor:ctx=>{const v=ctx.raw;if(v>=${Math.max(...data.hourlyTraffic) * 0.85})return'#f6c90e';if(v>=${Math.max(...data.hourlyTraffic) * 0.6})return'#63b3ed';return'rgba(99,179,237,0.35)'},borderRadius:5,borderSkipped:false}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{maxTicksLimit:12}},y:{grid:{color:'rgba(255,255,255,0.05)'},beginAtZero:true}}}});

new Chart(document.getElementById('deviceChart'),{type:'doughnut',data:{labels:${j(deviceLabels)},datasets:[{data:${j(deviceData)},backgroundColor:${j(deviceColors.slice(0, deviceLabels.length))},borderColor:'#151929',borderWidth:3}]},options:{plugins:{legend:{position:'bottom',labels:{boxWidth:9,padding:9,font:{size:10}}}},cutout:'68%'}});

new Chart(document.getElementById('browserChart'),{type:'doughnut',data:{labels:${j(browserLabels)},datasets:[{data:${j(browserData)},backgroundColor:${j(browserColors.slice(0, browserLabels.length))},borderColor:'#151929',borderWidth:2}]},options:{plugins:{legend:{position:'bottom',labels:{boxWidth:9,padding:9,font:{size:10}}}},cutout:'58%'}});

new Chart(document.getElementById('osChart'),{type:'bar',data:{labels:${j(osLabels)},datasets:[{data:${j(osData)},backgroundColor:${j(osColors.slice(0, osLabels.length))},borderRadius:8,borderSkipped:false}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(255,255,255,0.05)'},beginAtZero:true}}}});
</script>
</body>
</html>`;
}
