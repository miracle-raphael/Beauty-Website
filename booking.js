// ============================================================
// booking.js  (website folder, loaded only by Booking.html)
// The Google script is NOT in this file. It lives in your Google Sheet.
// ============================================================

// ---- Studio settings: change these ----
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvneLkg3wNV8-j7-XX0S64NynCQjoEnD4IeTppiQm3XUky55VFD1DLBY6Sn9iVLPw/exec";
const CLOSED_DAYS = [0];                              // 0 = Sunday ... 6 = Saturday (same in the script)
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];    // same in the script
const SERVICES = [
  { name: "Manicure", icon: "💅" },
  { name: "Pedicure", icon: "🦶" },
  { name: "Nail Art", icon: "🎨" },
  { name: "Eyelash Extension", icon: "👁️" },
];

const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isDemo = SCRIPT_URL.includes("PASTE_YOUR");

const $ = (id) => document.getElementById(id);
const val = (id) => ($(id) ? $(id).value.trim() : "");
const pad = (n) => String(n).padStart(2, "0");
const key = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const fromKey = (k) => { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); };
const monthStart = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const fmtHour = (h) => (((h + 11) % 12) + 1) + ":00 " + (h < 12 ? "AM" : "PM");
const fmtDate = (d) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const makeId = () => (window.crypto && crypto.randomUUID)
  ? crypto.randomUUID()
  : Date.now().toString(36) + Math.random().toString(36).slice(2);

// "today" and "now" start from the visitor's device, then switch to the
// studio's own clock as soon as the Google script answers.
let todayKey = key(new Date());
let nowHour = new Date().getHours();
let booked = {};
let view = monthStart(fromKey(todayKey));
let chosen = [], date = null, hour = null, rating = 0; // chosen = the services picked
let sent = false, busy = false, requestId = null;

function renderServices() {
  const box = $("services"); box.innerHTML = "";
  SERVICES.forEach((s) => {
    const on = chosen.includes(s.name);
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-pressed", on);
    b.className = "rounded-xl border px-3 py-4 text-center text-sm transition " +
      (on ? "border-[hsl(14,100%,82%)] bg-[hsl(14,100%,82%)]/15 text-[hsl(14,100%,82%)]" : "border-white/15 hover:border-white/40");
    b.innerHTML = '<span class="block text-2xl">' + s.icon + '</span><span class="mt-1 block">' + s.name + "</span>";
    b.onclick = () => { chosen = SERVICES.map((x) => x.name).filter((n) => (n === s.name ? !on : chosen.includes(n))); renderServices(); update(); };
    box.appendChild(b);
  });
}

function renderCalendar() {
  $("monthTitle").textContent = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  $("prev").disabled = view <= monthStart(fromKey(todayKey));
  const box = $("days"); box.innerHTML = "";
  const offset = (view.getDay() + 6) % 7;
  const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  for (let i = 0; i < offset; i++) box.appendChild(document.createElement("span"));
  for (let n = 1; n <= count; n++) {
    const d = new Date(view.getFullYear(), view.getMonth(), n);
    const off = key(d) < todayKey || CLOSED_DAYS.includes(d.getDay());
    const sel = !!date && key(d) === key(date);
    const b = document.createElement("button");
    b.type = "button"; b.textContent = n; b.disabled = off;
    b.setAttribute("aria-label", d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }));
    b.setAttribute("aria-pressed", sel);
    b.className = "h-10 rounded-full text-sm transition " +
      (sel ? "bg-[hsl(14,100%,82%)] font-semibold text-black" :
       off ? "cursor-not-allowed text-white/20" :
       "hover:bg-white/10 " + (key(d) === todayKey ? "ring-1 ring-[hsl(14,100%,82%)]/60" : ""));
    b.onclick = () => { date = sel ? null : d; hour = null; renderCalendar(); renderTimes(); update(); };
    box.appendChild(b);
  }
}

function renderTimes() {
  const box = $("times"); box.innerHTML = "";
  if (!date) { $("timeTitle").textContent = "Available times"; $("timeHint").textContent = "Select a date to see the times."; return; }
  $("timeTitle").textContent = "Times on " + date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const taken = booked[key(date)] || [];
  const isToday = key(date) === todayKey;
  let free = 0;
  HOURS.forEach((h) => {
    const off = taken.includes(h) || (isToday && h <= nowHour);
    if (!off) free++;
    const b = document.createElement("button");
    b.type = "button"; b.disabled = off; b.textContent = fmtHour(h);
    b.setAttribute("aria-pressed", hour === h);
    b.className = "rounded-lg border px-2 py-2.5 text-xs transition " +
      (hour === h ? "border-[hsl(14,100%,82%)] bg-[hsl(14,100%,82%)] font-semibold text-black" :
       off ? "cursor-not-allowed border-white/10 text-white/25 line-through" :
       "border-white/15 hover:border-[hsl(14,100%,82%)]");
    b.onclick = () => { hour = hour === h ? null : h; renderTimes(); update(); };
    box.appendChild(b);
  });
  $("timeHint").textContent = free ? "Tap a time to select it." : "No times left on this day. Please pick another date.";
}

function renderStars() {
  const box = $("stars"); box.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = "★";
    b.setAttribute("aria-label", i + " star" + (i > 1 ? "s" : ""));
    b.setAttribute("aria-pressed", i <= rating);
    b.className = "transition " + (i <= rating ? "text-yellow-400" : "text-white/20 hover:text-white/40");
    b.onclick = () => { rating = rating === i ? i - 1 : i; renderStars(); update(); };
    box.appendChild(b);
  }
}

function problemWith(f) {
  if (!(chosen.length && date && hour !== null)) return "Please choose at least one service, a date and a time.";
  if (f.name.length < 2) return "Please enter your name.";
  if (!PHONE_RE.test(f.phone)) return "Please enter a valid phone number.";
  if (f.email && !EMAIL_RE.test(f.email)) return "That email address does not look right.";
  return "";
}

function update() {
  requestId = null; // any change means this is a new request
  const f = { name: val("name"), phone: val("phone"), email: val("email") };
  $("sService").textContent = chosen.length ? chosen.join(", ") : "Not chosen";
  $("sDate").textContent = date ? fmtDate(date) : "Not chosen";
  $("sTime").textContent = hour !== null ? fmtHour(hour) : "Not chosen";
  $("sName").textContent = f.name || "-";

  const ready = !problemWith(f);
  $("confirm").classList.toggle("opacity-50", !ready);
  if (!sent) $("msg").textContent = ready ? "We will contact you to confirm your time." : "Complete the steps to enable booking.";
}

// Ask the Google script which times are already taken, and for the studio clock.
async function loadAvailability(silent) {
  if (isDemo) return;
  try {
    const res = await fetch(SCRIPT_URL);
    const data = await res.json();
    if (!data.ok) throw new Error("bad answer");
    booked = data.booked || {};
    todayKey = data.today;
    nowHour = data.hour;
    const first = monthStart(fromKey(todayKey));
    if (view < first) view = first;
    if (date && key(date) < todayKey) { date = null; hour = null; }
    if (date && hour !== null && (booked[key(date)] || []).includes(hour)) hour = null;
  } catch (err) {
    // keep the device clock; the script still checks everything when you confirm
  }
  renderCalendar(); renderTimes();
  if (!silent) update();
}

// Wipes every choice and field, so the form is fresh for the next booking.
function clearForm() {
  chosen = []; date = null; hour = null; rating = 0; requestId = null;
  ["name", "phone", "email", "want", "comment", "website"].forEach((id) => { if ($(id)) $(id).value = ""; });
  renderServices(); renderCalendar(); renderTimes(); renderStars(); update();
}

const REASONS = {
  taken: "Sorry, that time was just taken. Please choose another time.",
  closed: "We are closed on that day. Please pick another date.",
  past: "That time has already passed. Please pick another time.",
  invalid: "Please check your details and try again.",
};

$("confirm").addEventListener("click", async () => {
  if (sent || busy) return;
  const f = { name: val("name"), phone: val("phone"), email: val("email"), want: val("want"), comment: val("comment") };
  const problem = problemWith(f);
  if (problem) { $("msg").textContent = problem; return; }
  if (isDemo) {
    $("msg").textContent = "Demo: paste your Google script link into SCRIPT_URL at the top of booking.js to receive bookings.";
    return;
  }

  busy = true;
  const btn = $("confirm");
  btn.disabled = true; btn.textContent = "Sending...";
  requestId = requestId || makeId(); // same id on a retry, so it can never book twice

  const payload = {
    requestId, services: chosen, dateKey: key(date), hour,
    name: f.name, phone: f.phone, email: f.email,
    request: f.want, comment: f.comment, rating,
    website: val("website"), // trap field: real people leave it empty
  };

  try {
    // No custom headers on purpose: this keeps it a "simple" request,
    // so the browser does not block it for CORS.
    const res = await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(payload) });
    const out = await res.json();

    if (out.ok) {
      (booked[payload.dateKey] = booked[payload.dateKey] || []).push(hour);
      sent = true; // pauses the form for a moment
      clearForm();
      btn.textContent = "Booking sent ✓";
      $("msg").textContent = "Thank you " + f.name + "! We will contact you to confirm.";
      $("msg").scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        sent = false;
        btn.disabled = false;
        btn.textContent = "Confirm booking";
      }, 5000);
    } else if (REASONS[out.reason] && out.reason !== "invalid") {
      if (out.reason === "taken") (booked[payload.dateKey] = booked[payload.dateKey] || []).push(hour);
      hour = null;
      renderTimes(); update();
      $("msg").textContent = REASONS[out.reason];
      loadAvailability(true);
    } else if (out.reason === "invalid") {
      $("msg").textContent = REASONS.invalid;
    } else {
      $("msg").textContent = "Something went wrong on our side. Please try again in a moment.";
    }
  } catch (err) {
    $("msg").textContent = "We could not confirm that your booking was sent. Please press Confirm again. You will not be booked twice.";
  } finally {
    busy = false;
    if (!sent) { btn.disabled = false; btn.textContent = "Confirm booking"; }
  }
});

$("prev").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); };
$("next").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); };
["name", "phone", "email", "want", "comment"].forEach((id) => { if ($(id)) $(id).addEventListener("input", update); });

// limits on what people can type
[["name", 80], ["phone", 20], ["email", 120], ["want", 500], ["comment", 500]].forEach(([id, max]) => { if ($(id)) $(id).maxLength = max; });
$("msg").setAttribute("aria-live", "polite");

renderServices(); renderCalendar(); renderTimes(); renderStars(); update();
loadAvailability();