/* ===== SINGLE SOURCE OF TRUTH: edit this CONFIG only. Items in [BRACKETS] are placeholders. ===== */
const CONFIG = {
  name: "Adarsh M", initials: "AM", title: "Cybersecurity Student / Trainee", location: "Kerala, India",
  intro: "[ADD YOUR SHORT INTRO]", targets: "Aiming for roles: SOC Analyst, Penetration Tester",
  summary: "[ADD YOUR PROFESSIONAL SUMMARY]", interests: ["[ADD INTEREST]", "[ADD INTEREST]"],
  goals: ["[ADD LEARNING GOAL]", "[ADD LEARNING GOAL]"], career: "[ADD CAREER DIRECTION]",
  email: "[ADD YOUR EMAIL]", github: "adarshkundil-byte",
  social: [{ label: "GitHub", url: "https://github.com/adarshkundil-byte" },
           { label: "LinkedIn", url: "[ADD LINKEDIN URL]" }, { label: "TryHackMe / HTB", url: "[ADD PROFILE URL]" }],
  skills: { "Security Operations / SOC": ["[Example: log analysis]", "[Example: alert triage]"],
    "Networking": ["[Example: TCP/IP basics]"], "Linux": ["[Example: command line]"],
    "Security Tools": ["[Example: Wireshark]", "[Example: Nmap]"], "Penetration Testing": ["[Example: web app basics]"],
    "Scripting / Programming": ["[Example: Python]", "[Example: Bash]"], "Other": ["[Example: documentation]"] },
  projects: [1, 2, 3].map(n => ({ title: `[Project ${n} title]`, problem: "[ADD PROBLEM]", approach: "[ADD APPROACH]",
    tools: ["[tool]"], outcome: "[ADD VERIFIED OUTCOME]", tags: ["[tag]"], github: "", demo: "" })),
  earned: ["[ADD VERIFIED CERTIFICATION, ISSUER, DATE]"], learning: ["[ADD CERTIFICATION YOU ARE STUDYING FOR]"],
  notes: [{ title: "[Sample note title]", category: "[Category]", date: "[YYYY-MM-DD]", url: "" }]
};
/* ===== Rendering (uses textContent, so config text can never inject HTML) ===== */
const $ = id => document.getElementById(id);
const el = (tag, text, cls) => { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; };
const isUrl = u => /^https?:\/\//.test(u);
const link = (text, url) => { if (!isUrl(url)) return el("span", `${text} (add link)`, "note"); const a = el("a", text); a.href = url; a.rel = "noopener"; a.target = "_blank"; return a; };
const fill = (id, arr) => arr.forEach(t => $(id).append(el("li", t)));

function renderStatic() {
  $("loc").textContent = CONFIG.location; $("name").textContent = CONFIG.name; $("title").textContent = CONFIG.title;
  $("intro").textContent = CONFIG.intro; $("targets").textContent = CONFIG.targets; $("summary").textContent = CONFIG.summary;
  $("career").textContent = CONFIG.career; fill("interests", CONFIG.interests); fill("goals", CONFIG.goals);
  fill("earned", CONFIG.earned); fill("learning", CONFIG.learning); $("year").textContent = new Date().getFullYear();
  Object.entries(CONFIG.skills).forEach(([g, items]) => { const c = el("div", "", "glass card"); c.append(el("h3", g));
    items.forEach(i => c.append(el("span", i, "tag"))); $("skillGrid").append(c); });
  CONFIG.projects.forEach(p => { const c = el("article", "", "glass card"); c.append(el("h3", p.title));
    [["Problem", p.problem], ["Approach", p.approach], ["Outcome", p.outcome]].forEach(([k, v]) => c.append(el("p", `${k}: ${v}`)));
    p.tools.concat(p.tags).forEach(t => c.append(el("span", t, "tag"))); const row = el("p");
    row.append(link("GitHub", p.github)); row.append(" · "); row.append(link("Live demo", p.demo)); c.append(row); $("projectGrid").append(c); });
  CONFIG.notes.forEach(n => { const c = el("article", "", "glass card"); c.append(el("h3", n.title), el("p", `${n.category} · ${n.date}`, "note"), link("Read", n.url)); $("noteGrid").append(c); });
  const gh = `https://github.com/${CONFIG.github}`; const a = $("ghLink"); a.href = gh; a.textContent = gh; a.target = "_blank";
  const m = $("mail"); if (CONFIG.email.includes("@")) { m.href = `mailto:${CONFIG.email}`; } m.textContent = CONFIG.email;
  CONFIG.social.forEach(s => { const li = el("li"); li.append(link(s.label, s.url)); $("social").append(li); });
}
function renderPhoto() {   /* tries assets/profile.jpg, falls back to initials */
  const box = $("photo"); box.textContent = CONFIG.initials; const img = new Image();
  img.alt = `Portrait of ${CONFIG.name}`; img.onload = () => { box.textContent = ""; box.append(img); }; img.src = "assets/profile.jpg";
}
function setupTheme() {
  const b = $("theme"), root = document.documentElement;
  const sync = () => { const light = root.dataset.theme === "light"; b.setAttribute("aria-pressed", light); b.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme"); };
  b.onclick = () => { root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light"; try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {} sync(); }; sync();
}
function setupMenu() {
  const b = $("burger"), m = $("menu");
  b.onclick = () => { const o = m.classList.toggle("open"); b.setAttribute("aria-expanded", o); };
  m.onclick = e => { if (e.target.tagName === "A") { m.classList.remove("open"); b.setAttribute("aria-expanded", false); } };
}
function setupResume() {   /* checks the file exists before downloading */
  $("resume").addEventListener("click", async e => {
    try { const r = await fetch("assets/resume.pdf", { method: "HEAD" });
      if (!r.ok) { e.preventDefault(); $("resumeMsg").textContent = "Resume not added yet. Put resume.pdf in the assets folder."; } } catch (err) { /* offline or file://: let the browser try */ }
  });
}
async function loadRepos() {   /* optional public GitHub API call; fails gracefully, no invented data */
  try { const r = await fetch(`https://api.github.com/users/${CONFIG.github}/repos?sort=updated&per_page=6`);
    if (!r.ok) throw new Error(r.status); const repos = await r.json();
    if (!repos.length) { $("repoMsg").textContent = "No public repositories found yet."; return; }
    repos.forEach(x => { const li = el("li"); li.append(link(x.name, x.html_url)); $("repos").append(li); });
  } catch (e) { $("repoMsg").textContent = "Repository list unavailable right now. Visit the profile link above."; }
}
function setupForm() {   /* mailto-based: honest, no backend. Never claims the message was sent. */
  $("form").addEventListener("submit", e => {
    e.preventDefault(); const n = $("fn").value.trim(), em = $("fe").value.trim(), msg = $("fm").value.trim(); let ok = true;
    const set = (id, t) => { $(id).textContent = t; if (t) ok = false; };
    set("e1", n ? "" : "Please enter your name."); set("e2", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em) ? "" : "Enter a valid email.");
    set("e3", msg.length >= 10 ? "" : "Message must be at least 10 characters.");
    if (!ok) return;
    if (!CONFIG.email.includes("@")) { $("formMsg").textContent = "The site owner has not added an email address yet."; return; }
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Portfolio contact from " + n)}&body=${encodeURIComponent(msg + "\n\nReply to: " + em)}`;
    $("formMsg").textContent = "Your email app should open with the message ready. It is not sent until you send it there.";
  });
}
document.addEventListener("DOMContentLoaded", () => { renderStatic(); renderPhoto(); setupTheme(); setupMenu(); setupResume(); setupForm(); loadRepos(); });
