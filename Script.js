// ============================================================
// PART 1: save as booking.js (in your website folder)
// ============================================================

// ---- Studio settings: change these ----
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE"; // the link from PART 2
const CLOSED_DAYS = [0];                     // 0 = Sunday ... 6 = Saturday
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const BOOKED = {                             // example: "2026-11-05": [10, 14]
};
const SERVICES = [
  { name: "Manicure", icon: "💅" },
  { name: "Pedicure", icon: "🦶" },
  { name: "Nail Art", icon: "🎨" },
  { name: "Eyelash Extension", icon: "👁️" },
];

const $ = (id) => document.getElementById(id);
const today = new Date(); today.setHours(0, 0, 0, 0);
let view = new Date(today.getFullYear(), today.getMonth(), 1);
let service = null, date = null, hour = null, rating = 0, sent = false;

const key = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const fmtHour = (h) => (((h + 11) % 12) + 1) + ":00 " + (h < 12 ? "AM" : "PM");
const fmtDate = (d) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function renderServices() {
  $("services").innerHTML = "";
  SERVICES.forEach((s) => {
    const b = document.createElement("button");
    b.type = "button";
    const on = service === s.name;
    b.className = "rounded-xl border px-3 py-4 text-center text-sm transition " +
      (on ? "border-[hsl(14,100%,82%)] bg-[hsl(14,100%,82%)]/15 text-[hsl(14,100%,82%)]" : "border-white/15 hover:border-white/40");
    b.innerHTML = '<span class="block text-2xl">' + s.icon + '</span><span class="mt-1 block">' + s.name + "</span>";
    b.onclick = () => { service = s.name; renderServices(); update(); };
    $("services").appendChild(b);
  });
}

function renderCalendar() {
  $("monthTitle").textContent = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  $("prev").disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
  const box = $("days"); box.innerHTML = "";
  const offset = (view.getDay() + 6) % 7;
  const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  for (let i = 0; i < offset; i++) box.appendChild(document.createElement("span"));
  for (let n = 1; n <= count; n++) {
    const d = new Date(view.getFullYear(), view.getMonth(), n);
    const off = d < today || CLOSED_DAYS.includes(d.getDay());
    const sel = date && key(d) === key(date);
    const b = document.createElement("button");
    b.type = "button"; b.textContent = n; b.disabled = off;
    b.className = "h-10 rounded-full text-sm transition " +
      (sel ? "bg-[hsl(14,100%,82%)] font-semibold text-black" :
       off ? "cursor-not-allowed text-white/20" :
       "hover:bg-white/10 " + (key(d) === key(today) ? "ring-1 ring-[hsl(14,100%,82%)]/60" : ""));
    b.onclick = () => { date = d; hour = null; renderCalendar(); renderTimes(); update(); };
    box.appendChild(b);
  }
}

function renderTimes() {
  const box = $("times"); box.innerHTML = "";
  if (!date) { $("timeHint").textContent = "Select a date to see the times."; return; }
  $("timeTitle").textContent = "Times on " + date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const taken = BOOKED[key(date)] || [];
  const isToday = key(date) === key(today);
  const nowH = new Date().getHours();
  let free = 0;
  HOURS.forEach((h) => {
    const off = taken.includes(h) || (isToday && h <= nowH);
    if (!off) free++;
    const b = document.createElement("button");
    b.type = "button"; b.disabled = off; b.textContent = fmtHour(h);
    b.className = "rounded-lg border px-2 py-2.5 text-xs transition " +
      (hour === h ? "border-[hsl(14,100%,82%)] bg-[hsl(14,100%,82%)] font-semibold text-black" :
       off ? "cursor-not-allowed border-white/10 text-white/25 line-through" :
       "border-white/15 hover:border-[hsl(14,100%,82%)]");
    b.onclick = () => { hour = h; renderTimes(); update(); };
    box.appendChild(b);
  });
  $("timeHint").textContent = free ? "Tap a time to select it." : "No times left on this day. Please pick another date.";
}

function renderStars() {
  const box = $("stars"); box.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = "★"; b.setAttribute("aria-label", i + " star" + (i > 1 ? "s" : ""));
    b.className = "transition " + (i <= rating ? "text-yellow-400" : "text-white/20 hover:text-white/40");
    b.onclick = () => { rating = rating === i ? 0 : i; renderStars(); update(); };
    box.appendChild(b);
  }
}

function update() {
  const name = $("name").value.trim(), phone = $("phone").value.trim();
  $("sService").textContent = service || "Not chosen";
  $("sDate").textContent = date ? fmtDate(date) : "Not chosen";
  $("sTime").textContent = hour !== null ? fmtHour(hour) : "Not chosen";
  $("sName").textContent = name || "-";

  const ready = service && date && hour !== null && name && phone;
  $("confirm").classList.toggle("opacity-50", !ready);
  if (!sent) $("msg").textContent = ready ? "We will contact you to confirm your time." : "Complete the steps to enable booking.";
}

$("confirm").addEventListener("click", async () => {
  const name = $("name").value.trim(), phone = $("phone").value.trim();
  if (sent) return;
  if (!(service && date && hour !== null && name && phone)) {
    $("msg").textContent = "Please choose a service, date and time, and add your name and phone.";
    return;
  }
  if (SCRIPT_URL.includes("PASTE_YOUR")) {
    $("msg").textContent = "Demo: paste your Apps Script link into SCRIPT_URL at the top of booking.js to receive bookings.";
    return;
  }

  const btn = $("confirm");
  btn.disabled = true; btn.textContent = "Sending...";

  const data = {
    service, name, phone,
    date: fmtDate(date),
    time: fmtHour(hour),
    request: $("want").value.trim(),
    comment: $("comment").value.trim(),
    rating: rating || "none",
  };

  try {
    // No custom headers on purpose: this keeps it a "simple" request,
    // so the browser does not block it for CORS.
    const res = await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(data) });
    const out = await res.json();
    if (!out.ok) throw new Error("failed");
    sent = true;
    btn.textContent = "Booking sent ✓";
    $("msg").textContent = "Thank you " + name + "! We will contact you to confirm.";
  } catch (err) {
    btn.disabled = false; btn.textContent = "Confirm booking";
    $("msg").textContent = "Something went wrong. Please try again.";
  }
});

$("prev").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); };
$("next").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); };
["name", "phone", "want", "comment"].forEach((id) => $(id).addEventListener("input", update));

renderServices(); renderCalendar(); renderTimes(); renderStars(); update();


// ============================================================
// PART 2: paste into script.google.com (NOT in your website folder)
// ============================================================

const OWNER_EMAIL = "your-email@gmail.com"; // <-- change this

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.phone || !d.service || !d.date || !d.time) {
      throw new Error("Missing details");
    }

    const body = [
      "New booking request",
      "",
      "Service: " + d.service,
      "Date: " + d.date,
      "Time: " + d.time,
      "",
      "Name: " + d.name,
      "Phone: " + d.phone,
      "",
      "What they would like: " + (d.request || "-"),
      "Comments: " + (d.comment || "-"),
      "Rating: " + d.rating,
    ].join("\n");

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: "New booking: " + d.service + " - " + d.name + " (" + d.date + ", " + d.time + ")",
      body: body,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}









