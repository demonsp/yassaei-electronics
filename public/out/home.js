var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};

// public/js/lib/dom.mjs
function trusted(str) {
  return S1 + stripMarks(String(str ?? "")) + S2;
}
function esc(v) {
  if (v === null || v === void 0 || v === false) return trusted("");
  if (typeof v === "object" && v !== null && v[RAW] !== void 0) return v[RAW];
  const s = String(v);
  if (s.includes(S1) || s.includes(S2)) return stripMarks(s);
  return trusted(s.replace(/[&<>"'`]/g, (c) => ESC_MAP[c]));
}
function html(strings, ...vals) {
  let out = strings[0];
  for (let i = 0; i < vals.length; i++) {
    const v = vals[i];
    if (Array.isArray(v)) out += v.map((x) => esc(x)).join("");
    else out += esc(v);
    out += strings[i + 1];
  }
  return trusted(out);
}
function icon(name, cls = "") {
  return raw(`<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${name}"/></svg>`);
}
function fmtNum(n) {
  const v = Number(n) || 0;
  const s = new Intl.NumberFormat(LOCALE === "fa" ? "fa-IR" : "en-US").format(v);
  return s;
}
function fmtTel(v) {
  const s0 = String(v ?? "").trim();
  if (!s0) return "";
  const s = /^(0\d{2})(\d{4})(\d{4})$/.test(s0) ? s0.replace(/^(0\d{2})(\d{4})(\d{4})$/, "$1-$2-$3") : /^(09\d{2})(\d{3})(\d{4})$/.test(s0) ? s0.replace(/^(09\d{2})(\d{3})(\d{4})$/, "$1 $2 $3") : s0;
  if (LOCALE === "fa") return s.replace(/\d/g, (x) => FA_DIGITS[+x]);
  return s;
}
function fmtMoney(n, { withUnit = true } = {}) {
  const v = Math.round(Number(n) || 0);
  const s = new Intl.NumberFormat(LOCALE === "fa" ? "fa-IR" : "en-US").format(v);
  if (!withUnit) return s;
  return raw(`${s} <span class="pc-cur">${LOCALE === "fa" ? "\u062A\u0648\u0645\u0627\u0646" : "Toman"}</span>`);
}
function stars(rating, size = "") {
  const r = Math.round(Number(rating) || 0);
  let out = '<span class="pc-stars">';
  for (let i = 1; i <= 5; i++) out += `<svg class="ic ${i <= r ? "" : "off"} ${size}" aria-hidden="true"><use href="#i-star"/></svg>`;
  return raw(out + "</span>");
}
var RAW, S1, S2, stripMarks, raw, ESC_MAP, GLYPH_ICON, catIcon, FA_DIGITS, LOCALE;
var init_dom = __esm({
  "public/js/lib/dom.mjs"() {
    RAW = /* @__PURE__ */ Symbol("raw");
    S1 = "";
    S2 = "";
    stripMarks = (s) => s.replace(/[\u0001\u0002]/g, "");
    try {
      if (typeof Element !== "undefined") {
        const d = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
        if (d && d.set && d.configurable !== false) {
          Object.defineProperty(Element.prototype, "innerHTML", {
            configurable: true,
            enumerable: d.enumerable,
            get() {
              return d.get.call(this);
            },
            set(v) {
              d.set.call(this, typeof v === "string" && (v.includes(S1) || v.includes(S2)) ? stripMarks(v) : v);
            }
          });
        }
        const ia = Element.prototype.insertAdjacentHTML;
        if (ia) Element.prototype.insertAdjacentHTML = function(pos, v) {
          return ia.call(this, pos, typeof v === "string" && (v.includes(S1) || v.includes(S2)) ? stripMarks(v) : v);
        };
      }
    } catch {
    }
    raw = (s) => trusted(s);
    ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" };
    GLYPH_ICON = {
      cable: "cable",
      adapter: "plug",
      case: "shield",
      glass: "layers",
      powerbank: "battery",
      battery: "battery",
      dongle: "plug",
      speaker: "speaker",
      audio: "headset",
      wearable: "watch",
      content: "camera",
      gaming: "zap",
      car: "truck",
      light: "light",
      mics: "mic",
      misc: "box",
      watch: "watch",
      phone: "phone",
      chip: "chip",
      solder: "solder",
      tools: "wrench",
      fan: "fan",
      tv: "tv",
      keyboard: "keyboard",
      measure: "chart",
      network: "globe",
      parts: "chip"
    };
    catIcon = (glyph) => GLYPH_ICON[glyph] || "box";
    FA_DIGITS = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"];
    LOCALE = "fa";
  }
});

// public/js/views/home.mjs
init_dom();

// public/js/i18n.mjs
var fa = {
  "app.name": "\u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "app.tagline": "\u0644\u0648\u0627\u0632\u0645 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0648 \u0627\u0644\u06A9\u062A\u0631\u06CC\u06A9\u06CC",
  "common.loading": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026",
  "common.save": "\u0630\u062E\u06CC\u0631\u0647",
  "common.saving": "\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026",
  "common.cancel": "\u0627\u0646\u0635\u0631\u0627\u0641",
  "common.close": "\u0628\u0633\u062A\u0646",
  "common.confirm": "\u062A\u0623\u06CC\u06CC\u062F",
  "common.delete": "\u062D\u0630\u0641",
  "common.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634",
  "common.add": "\u0627\u0641\u0632\u0648\u062F\u0646",
  "common.create": "\u0627\u06CC\u062C\u0627\u062F",
  "common.update": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC",
  "common.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
  "common.filter": "\u0641\u06CC\u0644\u062A\u0631",
  "common.filters": "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  "common.sort": "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC",
  "common.all": "\u0647\u0645\u0647",
  "common.none": "\u0647\u06CC\u0686",
  "common.more": "\u0628\u06CC\u0634\u062A\u0631",
  "common.less": "\u06A9\u0645\u062A\u0631",
  "common.showAll": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647",
  "common.back": "\u0628\u0627\u0632\u06AF\u0634\u062A",
  "common.next": "\u0627\u062F\u0627\u0645\u0647",
  "common.prev": "\u0642\u0628\u0644\u06CC",
  "common.yes": "\u0628\u0644\u0647",
  "common.no": "\u062E\u06CC\u0631",
  "common.optional": "\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC",
  "common.required": "\u0627\u0644\u0632\u0627\u0645\u06CC",
  "common.copy": "\u06A9\u067E\u06CC",
  "common.copied": "\u06A9\u067E\u06CC \u0634\u062F",
  "common.share": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
  "common.download": "\u062F\u0627\u0646\u0644\u0648\u062F",
  "common.upload": "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
  "common.print": "\u0686\u0627\u067E",
  "common.refresh": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC",
  "common.retry": "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647",
  "common.send": "\u0627\u0631\u0633\u0627\u0644",
  "common.sent": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
  "common.submit": "\u062B\u0628\u062A",
  "common.reply": "\u067E\u0627\u0633\u062E",
  "common.view": "\u0645\u0634\u0627\u0647\u062F\u0647",
  "common.details": "\u062C\u0632\u0626\u06CC\u0627\u062A",
  "common.status": "\u0648\u0636\u0639\u06CC\u062A",
  "common.date": "\u062A\u0627\u0631\u06CC\u062E",
  "common.time": "\u0633\u0627\u0639\u062A",
  "common.amount": "\u0645\u0628\u0644\u063A",
  "common.count": "\u062A\u0639\u062F\u0627\u062F",
  "common.total": "\u0645\u062C\u0645\u0648\u0639",
  "common.price": "\u0642\u06CC\u0645\u062A",
  "price.inquire": "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u2014 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u063A\u0627\u0632\u0647",
  "price.inquireShort": "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A",
  "pdp.callStore": "\u0632\u0646\u06AF \u0628\u0632\u0646 \u0628\u0647 \u0645\u063A\u0627\u0632\u0647",
  "pdp.visitStore": "\u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u0622\u06CC\u0645",
  "pdp.serviceHint": "\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062E\u062F\u0645\u0627\u062A/\u0633\u0641\u0627\u0631\u0634\u06CC \u0627\u0633\u062A\u061B \u0642\u06CC\u0645\u062A \u0646\u0647\u0627\u06CC\u06CC \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0644\u0641\u0646\u06CC \u0627\u0639\u0644\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "home.partFinder": "\u0642\u0637\u0639\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u061F",
  "home.partFinderText": "\u0627\u0633\u0645\u0634 \u0631\u0627 \u062A\u0644\u0641\u0646\u06CC \u0628\u06AF\u0648 \u06CC\u0627 \u062F\u0631 \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u061B \u0627\u06AF\u0631 \u062F\u0631 \u0642\u0641\u0633\u0647\u200C\u0647\u0627 \u0628\u0627\u0634\u062F\u060C \u0647\u0645\u0627\u0646 \u0631\u0648\u0632 \u0628\u0631\u0627\u06CC\u062A \u06A9\u0646\u0627\u0631 \u0645\u06CC\u200C\u06AF\u0630\u0627\u0631\u06CC\u0645.",
  "home.partFinderCta": "\u062A\u0645\u0627\u0633 \u06CC\u0627 \u067E\u06CC\u0627\u0645",
  "common.stock": "\u0645\u0648\u062C\u0648\u062F\u06CC",
  "common.available": "\u0645\u0648\u062C\u0648\u062F",
  "common.unavailable": "\u0646\u0627\u0645\u0648\u062C\u0648\u062F",
  "common.inStock": "\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631",
  "common.lowStock": "\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647",
  "common.notifyMe": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646",
  "common.notified": "\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645",
  "common.category": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
  "common.brand": "\u0628\u0631\u0646\u062F",
  "common.product": "\u06A9\u0627\u0644\u0627",
  "common.products": "\u0645\u062D\u0635\u0648\u0644\u0627\u062A",
  "common.order": "\u0633\u0641\u0627\u0631\u0634",
  "common.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "common.user": "\u06A9\u0627\u0631\u0628\u0631",
  "common.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "common.result": "\u0646\u062A\u06CC\u062C\u0647",
  "common.results": "\u0646\u062A\u06CC\u062C\u0647",
  "common.noResult": "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
  "common.error": "\u062E\u0637\u0627",
  "common.success": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "common.warning": "\u062A\u0648\u062C\u0647",
  "common.note": "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A",
  "common.notes": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
  "common.description": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
  "common.specs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
  "common.actions": "\u0639\u0645\u0644\u06CC\u0627\u062A",
  "common.active": "\u0641\u0639\u0627\u0644",
  "common.inactive": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644",
  "common.enabled": "\u0631\u0648\u0634\u0646",
  "common.disabled": "\u062E\u0627\u0645\u0648\u0634",
  "common.on": "\u0631\u0648\u0634\u0646",
  "common.off": "\u062E\u0627\u0645\u0648\u0634",
  "common.from": "\u0627\u0632",
  "common.to": "\u062A\u0627",
  "common.and": "\u0648",
  "common.or": "\u06CC\u0627",
  "common.today": "\u0627\u0645\u0631\u0648\u0632",
  "common.yesterday": "\u062F\u06CC\u0631\u0648\u0632",
  "common.toman": "\u062A\u0648\u0645\u0627\u0646",
  "common.rial": "\u0631\u06CC\u0627\u0644",
  "common.page": "\u0635\u0641\u062D\u0647",
  "common.of": "\u0627\u0632",
  "common.items": "\u0642\u0644\u0645",
  "common.new": "\u062C\u062F\u06CC\u062F",
  "common.old": "\u0642\u062F\u06CC\u0645\u06CC",
  "common.apply": "\u0627\u0639\u0645\u0627\u0644",
  "common.reset": "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC",
  "common.clear": "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646",
  "common.select": "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
  "common.title": "\u0639\u0646\u0648\u0627\u0646",
  "common.body": "\u0645\u062A\u0646",
  "common.type": "\u0646\u0648\u0639",
  "common.priority": "\u0627\u0648\u0644\u0648\u06CC\u062A",
  "common.answer": "\u067E\u0627\u0633\u062E",
  "common.message": "\u067E\u06CC\u0627\u0645",
  "common.messages": "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627",
  "common.attach": "\u067E\u06CC\u0648\u0633\u062A",
  "common.image": "\u062A\u0635\u0648\u06CC\u0631",
  "common.images": "\u062A\u0635\u0627\u0648\u06CC\u0631",
  "common.phone": "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644",
  "common.email": "\u0627\u06CC\u0645\u06CC\u0644",
  "common.address": "\u0622\u062F\u0631\u0633",
  "common.city": "\u0634\u0647\u0631",
  "common.province": "\u0627\u0633\u062A\u0627\u0646",
  "common.postal": "\u06A9\u062F \u067E\u0633\u062A\u06CC",
  "common.name": "\u0646\u0627\u0645",
  "common.fullName": "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
  "common.username": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "common.password": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "common.passwordConfirm": "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "common.login": "\u0648\u0631\u0648\u062F",
  "common.logout": "\u062E\u0631\u0648\u062C",
  "common.register": "\u062B\u0628\u062A\u200C\u0646\u0627\u0645",
  "common.guest": "\u0645\u0647\u0645\u0627\u0646",
  "common.admin": "\u0645\u062F\u06CC\u0631",
  "common.settings": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
  "common.help": "\u0631\u0627\u0647\u0646\u0645\u0627",
  "common.home": "\u062E\u0627\u0646\u0647",
  "common.skip": "\u0631\u062F \u0634\u062F\u0646",
  "common.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "common.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
  "common.approved": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647",
  "common.rejected": "\u0631\u062F \u0634\u062F\u0647",
  "common.open": "\u0628\u0627\u0632",
  "common.closed": "\u0628\u0633\u062A\u0647",
  "common.all2": "\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F",
  "common.never": "\u0647\u0631\u06AF\u0632",
  "common.empty": "\u062E\u0627\u0644\u06CC",
  "common.secure": "\u0627\u0645\u0646",
  "common.free": "\u0631\u0627\u06CC\u06AF\u0627\u0646",
  "common.unit": "\u0639\u062F\u062F",
  "common.day": "\u0631\u0648\u0632",
  "common.hour": "\u0633\u0627\u0639\u062A",
  "common.minute": "\u062F\u0642\u06CC\u0642\u0647",
  "common.second": "\u062B\u0627\u0646\u06CC\u0647",
  "common.percent": "\u062F\u0631\u0635\u062F",
  "common.discount": "\u062A\u062E\u0641\u06CC\u0641",
  "common.discountCode": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641",
  "common.shipping": "\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644",
  "common.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
  "common.subtotal": "\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627",
  "common.payable": "\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A",
  "common.payment": "\u067E\u0631\u062F\u0627\u062E\u062A",
  "common.cart": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
  "common.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
  "common.compare": "\u0645\u0642\u0627\u06CC\u0633\u0647",
  "common.profile": "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644",
  "common.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "common.balance": "\u0645\u0648\u062C\u0648\u062F\u06CC",
  "common.transactions": "\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627",
  "common.deposit": "\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "common.points": "\u0627\u0645\u062A\u06CC\u0627\u0632",
  "common.ticket": "\u062A\u06CC\u06A9\u062A",
  "common.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
  "common.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "common.review": "\u0646\u0638\u0631",
  "common.reviews": "\u0646\u0638\u0631\u0627\u062A",
  "common.question": "\u0633\u0624\u0627\u0644",
  "common.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "common.rating": "\u0627\u0645\u062A\u06CC\u0627\u0632",
  "common.notification": "\u0627\u0639\u0644\u0627\u0646",
  "common.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "common.security": "\u0627\u0645\u0646\u06CC\u062A",
  "common.history": "\u062A\u0627\u0631\u06CC\u062E\u0686\u0647",
  "common.report": "\u06AF\u0632\u0627\u0631\u0634",
  "common.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "common.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
  "common.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
  "common.law": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A",
  "common.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
  "common.about": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
  "common.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
  "common.faq": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644",
  "common.guide": "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F",
  "common.services": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "common.stats": "\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "common.searchProducts": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026",
  "common.noData": "\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F",
  "common.tryAgain": "\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646",
  "common.showMore": "\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631",
  "common.perPage": "\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",
  "skip": "\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC",
  "boot.loading": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC\u2026",
  "boot.waking": "\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026",
  "boot.failed": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.",
  "update.available": "\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.",
  "update.reload": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647",
  "boot.failedHint": "\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.",
  "topbar.fastSend": "\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646",
  "nav.home": "\u062E\u0627\u0646\u0647",
  "nav.products": "\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
  "nav.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627",
  "nav.new": "\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
  "nav.stats": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647",
  "nav.about": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
  "nav.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
  "nav.login": "\u0648\u0631\u0648\u062F",
  "nav.register": "\u062B\u0628\u062A\u200C\u0646\u0627\u0645",
  "nav.cart": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
  "nav.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
  "nav.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "nav.menu": "\u0645\u0646\u0648",
  "nav.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "nav.admin": "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A",
  "nav.allCategories": "\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
  "theme.toggle": "\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)",
  "theme.dark": "\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9",
  "theme.light": "\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646",
  "theme.auto": "\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645",
  "search.placeholder": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026",
  "search.go": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
  "search.voice": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC",
  "search.byImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633",
  "search.listening": "\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646",
  "search.noVoice": "\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.",
  "search.micDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.",
  "search.voiceNetwork": "\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.",
  "search.noSpeech": "\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.",
  "search.noMic": "\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
  "pwd.show": "\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "pwd.hide": "\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "search.suggestions": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
  "search.trending": "\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627",
  "search.recent": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627",
  "search.resultsFor": "\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC",
  "search.inProducts": "\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
  "search.inCategories": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627",
  "search.inBrands": "\u0628\u0631\u0646\u062F\u0647\u0627",
  "search.inPages": "\u0635\u0641\u062D\u0647\u200C\u0647\u0627",
  "search.didYouMean": "\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F",
  "search.noResultTitle": "\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645",
  "search.noResultText": "\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.",
  "search.imageTitle": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633",
  "search.imageText": "\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.",
  "search.imageHint": "\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A",
  "search.imageIndexing": "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026",
  "search.imageNoIndex": "\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.",
  "search.imageNoMatch": "\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.",
  "search.dropHere": "\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646",
  "search.pickFile": "\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633",
  "search.takePhoto": "\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646",
  "mnav.home": "\u062E\u0627\u0646\u0647",
  "mnav.products": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627",
  "mnav.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
  "mnav.cart": "\u0633\u0628\u062F",
  "mnav.me": "\u062D\u0633\u0627\u0628 \u0645\u0646",
  "footer.shopping": "\u062E\u0631\u06CC\u062F",
  "footer.allProducts": "\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
  "footer.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
  "footer.inStock": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
  "footer.searchByImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
  "footer.myList": "\u0644\u06CC\u0633\u062A \u0645\u0646",
  "footer.stats": "\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "footer.services": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "footer.guide": "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F",
  "footer.service": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "footer.faq": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644",
  "footer.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
  "footer.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "footer.tickets": "\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "footer.about": "\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646",
  "footer.aboutUs": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
  "footer.terms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A",
  "footer.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
  "footer.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "footer.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
  "footer.suggest": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A",
  "footer.contactUs": "\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC",
  "footer.install": "\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646",
  "footer.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
  "footer.rights": "\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.",
  "footer.workingHours": "\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
  "home.heroKicker": "\u0628\u0648\u0631\u0633 \u0647\u0641\u062A\u200C\u062D\u0648\u0636\u061B \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A",
  "home.heroTitle": "\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u062A\u0627 \u06A9\u0646\u062A\u0627\u06A9\u062A\u0648\u0631\u061B \u0647\u0645\u0627\u0646 \u0644\u062D\u0638\u0647 \u0627\u0632 \u0642\u0641\u0633\u0647 \u0645\u06CC\u200C\u0622\u06CC\u062F",
  "home.heroText": "\u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u062E\u0627\u0632\u0646 \u0648 \u0622\u06CC\u200C\u0633\u06CC\u060C \u0647\u0648\u06CC\u0647 \u0648 \u0633\u06CC\u0645 \u0642\u0644\u0639\u060C \u06A9\u0627\u0628\u0644 \u0648 \u0633\u06CC\u0645 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0633\u0627\u06CC\u0632\u0647\u0627\u060C \u0631\u06CC\u0633\u0647 \u0648 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631\u060C \u0645\u0648\u062F\u0645 \u0648 \u0633\u0648\u06CC\u06CC\u0686\u060C \u067E\u0646\u06A9\u0647 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642 \u2014 \u0647\u0631 \u0622\u0646\u0686\u0647 \u0628\u0631\u0627\u06CC \u0628\u0631\u062F\u060C \u062E\u0627\u0646\u0647 \u0648 \u06A9\u0627\u0631\u06AF\u0627\u0647 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC\u060C \u06CC\u06A9\u200C\u062C\u0627 \u062F\u0631 \u0646\u0627\u0631\u0645\u06A9.",
  "home.ctaShop": "\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F",
  "home.ctaDeals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632",
  "home.point1": "\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
  "home.point2": "\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641",
  "home.point3": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646",
  "home.point4": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646",
  "home.categories": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627",
  "home.categoriesSub": "\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u0622\u06CC\u200C\u0633\u06CC \u062A\u0627 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642",
  "home.featured": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
  "home.featuredSub": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645",
  "home.bestSellers": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
  "home.bestSellersSub": "\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "home.newArrivals": "\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "home.newArrivalsSub": "\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647",
  "home.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644",
  "home.dealsSub": "\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631",
  "home.brands": "\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
  "home.whyUs": "\u0686\u0631\u0627 \u06CC\u0627\u0633\u0627\u06CC\u06CC\u061F",
  "home.whyUsSub": "\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F",
  "home.reviews": "\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "home.reviewsSub": "\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646",
  "home.visitStore": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "home.visitStoreText": "\u062A\u0647\u0631\u0627\u0646\u060C \u0646\u0627\u0631\u0645\u06A9\u060C \u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u062A\u0633\u062A \u06A9\u0627\u0644\u0627 \u0642\u0628\u0644 \u0627\u0632 \u062E\u0631\u06CC\u062F",
  "home.openMap": "\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647",
  "home.statsTitle": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647",
  "home.plusTitle": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "home.plusText": "\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
  "home.plusCta": "\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633",
  "home.appTitle": "\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "home.appText": "\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
  "home.installCta": "\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646",
  "home.appInstalled": "\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A",
  "home.liveStats": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "home.newsletter": "\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648",
  "home.newsletterText": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.",
  "home.subscribe": "\u0639\u0636\u0648\u06CC\u062A",
  "stats.products": "\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644",
  "stats.ordersTotal": "\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "stats.ordersToday": "\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632",
  "stats.visitsToday": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632",
  "stats.visitsTotal": "\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
  "stats.pendingOrders": "\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC",
  "stats.delivered": "\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642",
  "stats.customers": "\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647",
  "stats.plusMembers": "\u0639\u0636\u0648 \u067E\u0644\u0627\u0633",
  "stats.categories": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
  "stats.brands": "\u0628\u0631\u0646\u062F",
  "stats.outOfStock": "\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F",
  "stats.years": "\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A",
  "stats.title": "\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "stats.sub": "\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "stats.chartTitle": "\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
  "stats.topProducts": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627",
  "stats.transparency": "\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC",
  "stats.transparencyText": "\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.",
  "catalog.title": "\u0645\u062D\u0635\u0648\u0644\u0627\u062A",
  "catalog.filters": "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  "catalog.showFilters": "\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  "catalog.hideFilters": "\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  "catalog.sort.relevant": "\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646",
  "catalog.sort.newest": "\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646",
  "catalog.sort.oldest": "\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646",
  "catalog.sort.cheapest": "\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646",
  "catalog.sort.dearest": "\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646",
  "catalog.sort.popular": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646",
  "catalog.sort.rating": "\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632",
  "catalog.sort.discount": "\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641",
  "catalog.sort.name": "\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627",
  "catalog.f.category": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
  "catalog.f.brand": "\u0628\u0631\u0646\u062F",
  "catalog.f.price": "\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A",
  "catalog.f.availability": "\u0645\u0648\u062C\u0648\u062F\u06CC",
  "catalog.f.inStock": "\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
  "catalog.f.discountOnly": "\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631",
  "catalog.f.rating": "\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632",
  "catalog.f.authenticity": "\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
  "catalog.f.clear": "\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  "catalog.count": "\u06A9\u0627\u0644\u0627",
  "catalog.viewGrid": "\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC",
  "catalog.viewList": "\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC",
  "auth.original": "\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)",
  "auth.highcopy": "\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9",
  "auth.generic": "\u0645\u062A\u0641\u0631\u0642\u0647",
  "card.addToCart": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F",
  "card.added": "\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F",
  "card.quickView": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639",
  "card.wishlistAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646",
  "card.wishlistRemove": "\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646",
  "card.compareAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647",
  "card.outOfStock": "\u0646\u0627\u0645\u0648\u062C\u0648\u062F",
  "card.soldOut": "\u062A\u0645\u0627\u0645 \u0634\u062F",
  "pdp.addToCart": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
  "pdp.buyNow": "\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC",
  "pdp.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647",
  "pdp.warranty": "\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC",
  "pdp.warrantyMonths": "{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "pdp.noWarranty": "\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC",
  "pdp.sku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
  "pdp.barcode": "\u0628\u0627\u0631\u06A9\u062F",
  "pdp.weight": "\u0648\u0632\u0646",
  "pdp.gram": "\u06AF\u0631\u0645",
  "pdp.zoomIn": "\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC",
  "pdp.zoomOut": "\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC",
  "pdp.zoomReset": "\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC",
  "pdp.zoomHint": "\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647",
  "pdp.video": "\u0648\u06CC\u062F\u06CC\u0648",
  "pdp.share": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
  "pdp.specs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
  "pdp.description": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
  "pdp.reviews": "\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627",
  "pdp.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "pdp.related": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647",
  "pdp.compatibility": "\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC",
  "pdp.writeReview": "\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632",
  "pdp.askQuestion": "\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644",
  "pdp.loginToReview": "\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.",
  "pdp.reviewSubmitted": "\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "pdp.reviewPending": "\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "pdp.questionSubmitted": "\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.",
  "pdp.buyerBadge": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627",
  "pdp.visitorBadge": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647",
  "pdp.helpful": "\u0645\u0641\u06CC\u062F \u0628\u0648\u062F",
  "pdp.storeReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "pdp.noReviews": "\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!",
  "pdp.noQuestions": "\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.",
  "pdp.yourRating": "\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627",
  "pdp.viewed": "\u0628\u0627\u0632\u062F\u06CC\u062F",
  "pdp.sold": "\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647",
  "pdp.off": "\u062A\u062E\u0641\u06CC\u0641",
  "pdp.save": "\u0633\u0648\u062F \u0634\u0645\u0627",
  "pdp.lastPrice": "\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC",
  "pdp.stockCount": "\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F",
  "pdp.fastSend": "\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646",
  "pdp.installment": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637",
  "cart.title": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
  "cart.empty": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A",
  "cart.emptyText": "\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.",
  "cart.goShopping": "\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F",
  "cart.item": "\u06A9\u0627\u0644\u0627",
  "cart.qty": "\u062A\u0639\u062F\u0627\u062F",
  "cart.remove": "\u062D\u0630\u0641",
  "cart.clear": "\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F",
  "cart.clearConfirm": "\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F",
  "cart.summary": "\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634",
  "cart.continue": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F",
  "cart.freeShipHint": "\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "cart.freeShipDone": "\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!",
  "cart.couponApplied": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F",
  "cart.couponPlaceholder": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646",
  "cart.applyCoupon": "\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F",
  "cart.removeCoupon": "\u062D\u0630\u0641 \u06A9\u062F",
  "cart.updated": "\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
  "checkout.title": "\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634",
  "checkout.step1": "\u062A\u062D\u0648\u06CC\u0644",
  "checkout.step2": "\u067E\u0631\u062F\u0627\u062E\u062A",
  "checkout.step3": "\u062A\u0623\u06CC\u06CC\u062F",
  "checkout.delivery": "\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644",
  "checkout.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647",
  "checkout.pickupDesc": "\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
  "checkout.courier": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A",
  "checkout.courierDesc": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.",
  "checkout.zone": "\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644",
  "checkout.express": "\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)",
  "checkout.insuranceOpt": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
  "checkout.insuranceDesc": "\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "checkout.insuranceAuto": "\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.",
  "checkout.address": "\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644",
  "checkout.addAddress": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F",
  "checkout.noAddress": "\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.",
  "checkout.paymentMethod": "\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A",
  "checkout.useWallet": "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "checkout.walletBalance": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646",
  "checkout.note": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
  "checkout.notePlaceholder": "\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.",
  "checkout.acceptTerms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
  "checkout.placeOrder": "\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634",
  "checkout.placing": "\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026",
  "checkout.loginRequired": "\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.",
  "checkout.successTitle": "\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F",
  "checkout.successText": "\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.",
  "checkout.payNow": "\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646",
  "checkout.payLater": "\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645",
  "checkout.gatewayDemo": "\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.",
  "checkout.paymentSuccess": "\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
  "checkout.paymentFailed": "\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
  "checkout.simulateSuccess": "\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)",
  "checkout.simulateFail": "\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
  "checkout.concurrencyNote": "\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.",
  "checkout.pickupReady": "\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
  "auth.title": "\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645",
  "auth.loginTitle": "\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "auth.registerTitle": "\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "auth.methodPassword": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632",
  "auth.methodPhone": "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644",
  "auth.methodEmail": "\u0627\u06CC\u0645\u06CC\u0644",
  "auth.identifier": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644",
  "auth.remember": "\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631",
  "auth.forgot": "\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "auth.noAccount": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F",
  "auth.haveAccount": "\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F",
  "auth.sendCode": "\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F",
  "auth.codeSent": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
  "auth.codeSentTo": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.",
  "auth.enterCode": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646",
  "auth.otpCode": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F",
  "auth.resend": "\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F",
  "auth.resendIn": "\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647",
  "auth.demoCode": "\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}",
  "auth.2faTitle": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
  "auth.2faText": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.",
  "auth.2faTotp": "\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A",
  "auth.2faSms": "\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC",
  "auth.2faEmail": "\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC",
  "auth.2faBackup": "\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
  "auth.2faVerify": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F",
  "auth.acceptTerms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
  "auth.referral": "\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
  "auth.registerDone": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!",
  "auth.loginDone": "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC",
  "auth.logoutDone": "\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC",
  "auth.recoveryTitle": "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "auth.recoveryText": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.",
  "auth.newPassword": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F",
  "auth.resetDone": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F",
  "auth.passwordRules": "\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F",
  "auth.orContinue": "\u06CC\u0627",
  "auth.guestCheckout": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "acc.title": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "acc.dashboard": "\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646",
  "acc.badges": "\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646",
  "badge.got": "\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647",
  "badge.locked": "\u0647\u0646\u0648\u0632 \u0642\u0641\u0644",
  "badge.first-buy": "\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F",
  "badge.first-buy.d": "\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
  "badge.silver-buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC",
  "badge.silver-buyer.d": "\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06CC\u0627\u0633\u0627\u06CC\u06CC.",
  "badge.gold-buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC",
  "badge.gold-buyer.d": "\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06CC\u0627\u0633\u0627\u06CC\u06CC.",
  "badge.big-spender": "\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628",
  "badge.big-spender.d": "\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.",
  "badge.early-bird": "\u067E\u06CC\u0634\u06AF\u0627\u0645",
  "badge.early-bird.d": "\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.",
  "badge.veteran": "\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631",
  "badge.veteran.d": "\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.",
  "badge.reviewer": "\u0646\u0642\u062F\u0646\u0648\u06CC\u0633",
  "badge.reviewer.d": "\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.",
  "badge.plus-member": "\u0639\u0636\u0648 \u067E\u0644\u0627\u0633",
  "badge.plus-member.d": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.",
  "badge.wallet-user": "\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC",
  "badge.wallet-user.d": "\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
  "badge.supporter": "\u067E\u06CC\u06AF\u06CC\u0631",
  "badge.supporter.d": "\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
  "acc.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646",
  "acc.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
  "acc.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "acc.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "acc.addresses": "\u0622\u062F\u0631\u0633\u200C\u0647\u0627",
  "acc.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "acc.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646",
  "acc.support": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "acc.reviews": "\u0646\u0638\u0631\u0627\u062A \u0645\u0646",
  "acc.feedback": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A",
  "acc.profile": "\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644",
  "acc.security": "\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628",
  "acc.sessions": "\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644",
  "acc.prefs": "\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634",
  "acc.data": "\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646",
  "acc.hello": "\u0633\u0644\u0627\u0645 {name}",
  "acc.memberSince": "\u0639\u0636\u0648 \u0627\u0632 {date}",
  "acc.noOrders": "\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
  "acc.noOrdersText": "\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.",
  "acc.orderCode": "\u06A9\u062F \u0633\u0641\u0627\u0631\u0634",
  "acc.orderDate": "\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634",
  "acc.orderItems": "\u0627\u0642\u0644\u0627\u0645",
  "acc.orderTotal": "\u0645\u0628\u0644\u063A \u06A9\u0644",
  "acc.trackOrder": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634",
  "acc.cancelOrder": "\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634",
  "acc.cancelConfirm": "\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.",
  "acc.cancelReason": "\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
  "acc.orderCancelled": "\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F",
  "acc.reorder": "\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647",
  "acc.invoice": "\u0641\u0627\u06A9\u062A\u0648\u0631",
  "acc.printInvoice": "\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631",
  "acc.timeline": "\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634",
  "acc.walletEmpty": "\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
  "acc.walletDeposit": "\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "acc.walletAmount": "\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)",
  "acc.walletDeposited": "\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F",
  "acc.walletNote": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.",
  "acc.tx.deposit": "\u0634\u0627\u0631\u0698",
  "acc.tx.purchase": "\u062E\u0631\u06CC\u062F",
  "acc.tx.refund": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
  "acc.tx.adjust_in": "\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
  "acc.tx.adjust_out": "\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
  "acc.plusInactive": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC",
  "acc.plusActive": "\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}",
  "acc.plusSubscribe": "\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "acc.plusRenew": "\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9",
  "acc.plusPrice": "{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632",
  "acc.plusPerks": "\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "acc.plusSubscribed": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F",
  "acc.plusPayWallet": "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "acc.plusPayGateway": "\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646",
  "acc.addAddress": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633",
  "acc.editAddress": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633",
  "acc.addrTitle": "\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)",
  "acc.addrReceiver": "\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647",
  "acc.addrPhone": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647",
  "acc.addrStreet": "\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC",
  "acc.addrDefault": "\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
  "acc.addrNote": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9",
  "acc.addrSaved": "\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "acc.addrDeleted": "\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F",
  "acc.noAddress": "\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
  "acc.wishlistEmpty": "\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A",
  "acc.wishlistEmptyText": "\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.",
  "acc.notifEmpty": "\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC",
  "acc.markAllRead": "\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F",
  "acc.ticketNew": "\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F",
  "acc.ticketSubject": "\u0645\u0648\u0636\u0648\u0639",
  "acc.ticketCategory": "\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A",
  "acc.ticketPriority": "\u0627\u0648\u0644\u0648\u06CC\u062A",
  "acc.ticketBody": "\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A",
  "form.rulesRequired": "\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.",
  "form.termsRequired": "\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.",
  "page.statsTitle": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "page.aboutCta": "\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645",
  "page.stepsTitle": "\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F",
  "page.tipsTitle": "\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F",
  "page.hintsTitle": "\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631",
  "page.bugTitle": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "page.rulesTitle": "\u0642\u0648\u0627\u0646\u06CC\u0646",
  "faq.all": "\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A",
  "faq.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026",
  "faq.results": "{n} \u0633\u0624\u0627\u0644",
  "faq.notFound": "\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
  "faq.askText": "\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
  "faq.cat.orders": "\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
  "faq.cat.shipping": "\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644",
  "faq.cat.returns": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
  "faq.cat.product": "\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A",
  "faq.cat.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "faq.cat.security": "\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
  "faq.cat.store": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633",
  "faq.cat.other": "\u0633\u0627\u06CC\u0631",
  "acc.ticketCloseConfirm": "\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.",
  "acc.ticketClosedNote": "\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
  "acc.ticketBodyShort": "\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.",
  "acc.attachHint": "\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.",
  "err.tooLarge": "\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.",
  "acc.ticketRules": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
  "acc.ticketViewRules": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A",
  "acc.ticketCreated": "\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}",
  "acc.ticketWrite": "\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026",
  "acc.ticketClose": "\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A",
  "acc.ticketReopen": "\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC",
  "acc.ticketSla": "\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A",
  "acc.noTickets": "\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
  "acc.chatTitle": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
  "acc.chatPlaceholder": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026",
  "acc.chatWelcome": "\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.",
  "acc.chatOffline": "\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
  "acc.chatOpenTicket": "\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A",
  "acc.reviewEmpty": "\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
  "acc.feedbackNew": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "acc.feedbackType": "\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645",
  "acc.feedbackContact": "\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)",
  "acc.feedbackContactHint": "\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.",
  "acc.feedbackSent": "\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.",
  "acc.noFeedback": "\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
  "acc.profileSaved": "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "acc.passwordChange": "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "acc.currentPassword": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC",
  "acc.newPassword2": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F",
  "acc.passwordChanged": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F",
  "acc.2faSection": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)",
  "acc.2faOff": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.",
  "acc.2faOn": "\u0641\u0639\u0627\u0644",
  "acc.2faEnable": "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
  "acc.2faDisable": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC",
  "acc.2faScan": "\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.",
  "acc.2faKey": "\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC",
  "acc.2faEnterCode": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F",
  "acc.2faEnabled": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F",
  "acc.2faDisabled": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F",
  "acc.2faBackup": "\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)",
  "acc.2faBackupHint": "\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.",
  "acc.2faMethods": "\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F",
  "acc.sessionsText": "\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.",
  "acc.revokeAll": "\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627",
  "acc.revokeDone": "\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F",
  "acc.current": "\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647",
  "acc.prefsText": "\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "acc.prefTheme": "\u067E\u0648\u0633\u062A\u0647",
  "acc.prefLang": "\u0632\u0628\u0627\u0646",
  "acc.prefDensity": "\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634",
  "acc.prefMotion": "\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627",
  "acc.prefNotif": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "acc.notifMarketing": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
  "acc.notifOrders": "\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "acc.notifRestock": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646",
  "acc.notifSupport": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
  "acc.exportData": "\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646",
  "acc.exportHint": "\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.",
  "acc.deleteAccount": "\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "acc.deleteWarn": "\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "acc.deleteConfirm": "\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646",
  "acc.pointsText": "\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
  "acc.referralCode": "\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648",
  "acc.referralText": "\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.",
  "chat.title": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "chat.online": "\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645",
  "chat.open": "\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648",
  "chat.minimize": "\u0628\u0633\u062A\u0646",
  "chat.loginFirst": "\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.",
  "chat.sent": "\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
  "chat.typing": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026",
  "chat.quick": "\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631",
  "notif.new": "\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F",
  "notif.markRead": "\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F",
  "notif.viewAll": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "notif.empty": "\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC",
  "notif.type.announcement": "\u0627\u0637\u0644\u0627\u0639\u06CC\u0647",
  "notif.type.order": "\u0633\u0641\u0627\u0631\u0634",
  "notif.type.restock": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627",
  "notif.type.ticket": "\u062A\u06CC\u06A9\u062A",
  "notif.type.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "notif.type.review": "\u0646\u0638\u0631",
  "notif.type.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "notif.type.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "notif.type.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "notif.type.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F",
  "notif.type.admin_alert": "\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631",
  "notif.type.news": "\u062E\u0628\u0631",
  "notif.type.offer": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
  "notif.type.system": "\u0633\u0627\u0645\u0627\u0646\u0647",
  "notif.type.info": "\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC",
  "notif.type.welcome": "\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC",
  "consent.title": "\u0628\u0647 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC",
  "consent.text": "\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.",
  "consent.terms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
  "consent.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
  "consent.marketing": "\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).",
  "consent.accept": "\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645",
  "consent.readTerms": "\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646",
  "consent.readPrivacy": "\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
  "consent.thanks": "\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.",
  "consent.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
  "social.instagram": "\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645",
  "home.partnersTitle": "\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645",
  "stats.title": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u0654 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "stats.subtitle": "\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.",
  "stats.chartTitle": "\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
  "stats.chartHint": "\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.",
  "stats.topTitle": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
  "adm.sPartners": "\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627",
  "adm.ptFa": "\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC",
  "adm.ptEn": "Name (EN)",
  "adm.ptAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F",
  "adm.ptHint": "\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.",
  "feat.partners": "\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631",
  "auth.pwdLater": "\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645",
  "auth.pwdLaterToast": "\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.",
  "social.telegram": "\u062A\u0644\u06AF\u0631\u0627\u0645",
  "social.eitaa": "\u0627\u06CC\u062A\u0627",
  "social.whatsapp": "\u0648\u0627\u062A\u0633\u0627\u067E",
  "consent.rejectOptional": "\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC",
  "consent.ttlNote": "\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "contact.title": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
  "contact.mapTitle": "\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "contact.mapHint": "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646",
  "contact.mapAsk": "\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F",
  "contact.mapPermission": "\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.",
  "contact.allowLocation": "\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A",
  "contact.denyLocation": "\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A",
  "contact.openMaps": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647",
  "contact.copyAddress": "\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633",
  "contact.hours": "\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
  "contact.phone": "\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "contact.mobile": "\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E",
  "contact.emailUs": "\u0627\u06CC\u0645\u06CC\u0644",
  "contact.addressUs": "\u0622\u062F\u0631\u0633",
  "contact.callNow": "\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631",
  "contact.whatsapp": "\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E",
  "contact.locationOn": "\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F",
  "contact.locationDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "contact.formTitle": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639",
  "contact.formText": "\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
  "contact.neshan": "\u0646\u0634\u0627\u0646",
  "contact.balad": "\u0628\u0644\u062F",
  "contact.google": "\u06AF\u0648\u06AF\u0644 \u0645\u067E",
  "contact.osm": "\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E",
  "contact.tgBotTitle": "\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645",
  "contact.tgBotText": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.",
  "contact.tgBotBtn": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645",
  "compare.title": "\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
  "compare.empty": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647",
  "compare.emptyText": "\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).",
  "compare.add": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647",
  "compare.remove": "\u062D\u0630\u0641",
  "priceCheck.title": "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F",
  "priceCheck.sub": "\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.",
  "priceCheck.input": "\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627",
  "priceCheck.scanCamera": "\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646",
  "priceCheck.stopCamera": "\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646",
  "priceCheck.waiting": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026",
  "priceCheck.notFound": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
  "priceCheck.found": "\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F",
  "priceCheck.cameraUnsupported": "\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.",
  "priceCheck.cameraDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.",
  "priceCheck.deviceMode": "\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)",
  "priceCheck.lastScan": "\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646",
  "priceCheck.fullscreen": "\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647",
  "err.generic": "\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.",
  "err.network": "\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.",
  "err.notFound": "\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
  "err.notFoundText": "\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.",
  "err.goHome": "\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC",
  "err.offline": "\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "err.online": "\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC",
  "err.loginRequired": "\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.",
  "err.forbidden": "\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.",
  "adm.title": "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A",
  "adm.dashboard": "\u062F\u0627\u0634\u0628\u0648\u0631\u062F",
  "adm.products": "\u06A9\u0627\u0644\u0627\u0647\u0627",
  "adm.productNew": "\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627",
  "adm.productEdit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627",
  "adm.categories": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627",
  "adm.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "adm.reviews": "\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A",
  "adm.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
  "adm.supportChat": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "adm.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627",
  "adm.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
  "adm.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "adm.coupons": "\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
  "adm.ads": "\u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
  "adm.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "adm.settings": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "adm.theme": "\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646",
  "adm.features": "\u0627\u0645\u06A9\u0627\u0646\u0627\u062A",
  "adm.shipping": "\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647",
  "adm.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "adm.pages": "\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627",
  "adm.barcode": "\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628",
  "adm.imageSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
  "adm.audit": "\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
  "adm.stats": "\u0622\u0645\u0627\u0631",
  "adm.export": "\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
  "adm.maintenance": "\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC",
  "adm.backToSite": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A",
  "adm.kpi.ordersToday": "\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632",
  "adm.kpi.visits": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632",
  "adm.kpi.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
  "adm.kpi.revenueTotal": "\u062F\u0631\u0622\u0645\u062F \u06A9\u0644",
  "adm.kpi.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "adm.kpi.products": "\u06A9\u0627\u0644\u0627\u0647\u0627",
  "adm.kpi.lowStock": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645",
  "adm.awaiting": "\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645",
  "adm.awaiting.reviews": "\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F",
  "adm.awaiting.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632",
  "adm.awaiting.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
  "adm.awaiting.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F",
  "adm.awaiting.chat": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A",
  "adm.chart": "\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
  "adm.topSelling": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
  "adm.lowStockList": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645",
  "adm.recentAudit": "\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
  "adm.storage": "\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627",
  "adm.pName": "\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627",
  "adm.pNameEn": "\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC",
  "adm.pCat": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
  "adm.pBrand": "\u0628\u0631\u0646\u062F",
  "adm.pPrice": "\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)",
  "adm.pOldPrice": "\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641",
  "adm.pCost": "\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F",
  "adm.pStock": "\u0645\u0648\u062C\u0648\u062F\u06CC",
  "adm.pSku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
  "adm.pBarcode": "\u0628\u0627\u0631\u06A9\u062F",
  "adm.pWeight": "\u0648\u0632\u0646 (\u06AF\u0631\u0645)",
  "adm.pWarranty": "\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)",
  "adm.pAuth": "\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
  "adm.pTags": "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)",
  "adm.pSpecs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
  "adm.pSpecKey": "\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647",
  "adm.pSpecVal": "\u0645\u0642\u062F\u0627\u0631",
  "adm.pAddSpec": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647",
  "adm.pVideos": "\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)",
  "adm.pVideosHint": "\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "adm.pImages": "\u062A\u0635\u0627\u0648\u06CC\u0631",
  "adm.pFindImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631",
  "adm.pFindImageHint": "\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.",
  "adm.pFindSearching": "\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026",
  "adm.pFindEmpty": "\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.",
  "adm.pUpload": "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633",
  "adm.pUseImage": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631",
  "adm.pDefaultImage": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
  "adm.pFeatured": "\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
  "adm.pActive": "\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)",
  "adm.pSaved": "\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "adm.pCreated": "\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F",
  "adm.pDeleted": "\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F",
  "adm.pDeleteConfirm": "\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F",
  "adm.pQuickEdit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639",
  "adm.pBulkPrice": "\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A",
  "adm.catName": "\u0646\u0627\u0645 \u062F\u0633\u062A\u0647",
  "adm.catParent": "\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F",
  "adm.catGlyph": "\u0622\u06CC\u06A9\u0648\u0646",
  "adm.catOrder": "\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634",
  "adm.catNoParent": "\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)",
  "adm.brandName": "\u0646\u0627\u0645 \u0628\u0631\u0646\u062F",
  "adm.brandNameEn": "\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F",
  "adm.oStatus": "\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A",
  "adm.oTracking": "\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC",
  "adm.oNote": "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC",
  "adm.oCustomer": "\u0645\u0634\u062A\u0631\u06CC",
  "adm.oDelivery": "\u062A\u062D\u0648\u06CC\u0644",
  "adm.oPayment": "\u067E\u0631\u062F\u0627\u062E\u062A",
  "adm.oSaved": "\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
  "adm.rApprove": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631",
  "adm.rReject": "\u0631\u062F \u06A9\u0631\u062F\u0646",
  "adm.rReply": "\u067E\u0627\u0633\u062E",
  "adm.rReplySaved": "\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "adm.rModerated": "\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
  "adm.rFilter": "\u0641\u06CC\u0644\u062A\u0631",
  "adm.uRole": "\u0646\u0642\u0634",
  "adm.uPerms": "\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
  "adm.uPermsHint": "\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.uAll": "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647",
  "adm.uNone": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647",
  "adm.uWalletAdjust": "\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "adm.uWalletReason": "\u062F\u0644\u06CC\u0644",
  "adm.uPlusDays": "\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "adm.uResetPass": "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
  "adm.uStatus": "\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628",
  "adm.uBlocked": "\u0645\u0633\u062F\u0648\u062F",
  "adm.uSaved": "\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "adm.uMakeStaff": "\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646",
  "adm.cCode": "\u06A9\u062F",
  "adm.cType": "\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641",
  "adm.cValue": "\u0645\u0642\u062F\u0627\u0631",
  "adm.cMax": "\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641",
  "adm.cMin": "\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634",
  "adm.cLimit": "\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644",
  "adm.cPerUser": "\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631",
  "adm.cStart": "\u0634\u0631\u0648\u0639",
  "adm.cEnd": "\u067E\u0627\u06CC\u0627\u0646",
  "adm.cUsed": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647",
  "adm.aSlot": "\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634",
  "adm.aTitle": "\u0639\u0646\u0648\u0627\u0646",
  "adm.aText": "\u0645\u062A\u0646",
  "adm.aLink": "\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F",
  "adm.aCta": "\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647",
  "adm.aActive": "\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F",
  "adm.nTitle": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646",
  "adm.nBody": "\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646",
  "adm.nTarget": "\u06AF\u06CC\u0631\u0646\u062F\u0647",
  "adm.nAll": "\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "adm.nOne": "\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635",
  "adm.nLevel": "\u0633\u0637\u062D",
  "adm.nSent": "\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
  "adm.nOutbox": "\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)",
  "adm.sStore": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "adm.sTheme": "\u067E\u0648\u0633\u062A\u0647",
  "adm.sUi": "\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637",
  "adm.mailsms": "\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9",
  "adm.mailCfg": "\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)",
  "adm.mailEnabled": "\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644",
  "adm.mailFrom": "\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647",
  "adm.smsCfg": "\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)",
  "adm.smsEnabled": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644",
  "adm.smsKey": "\u06A9\u0644\u06CC\u062F API",
  "adm.smsSender": "\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647",
  "adm.console": "\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647",
  "adm.consoleHint": "\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.",
  "adm.sysRestart": "\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631",
  "adm.sysRestartWarn": "\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "adm.sysRestarting": "\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.sysResetLabel": "\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):",
  "adm.sysReset.audit": "\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC",
  "adm.sysReset.carts": "\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646",
  "adm.sysReset.visits": "\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
  "adm.sysReset.visitors": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
  "adm.secTitle": "\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F",
  "adm.secQueueEnabled": "\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC",
  "adm.secQueueDesc": "\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.",
  "adm.secMaxConc": "\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646",
  "adm.secTriggerRps": "\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647",
  "adm.secPassTtl": "\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)",
  "adm.secPoll": "\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)",
  "adm.secFloodBan": "\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)",
  "adm.secFloodMin": "\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)",
  "adm.secSaved": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.",
  "adm.secInflight": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644",
  "adm.secRps": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647",
  "adm.secQueued": "\u062F\u0631 \u0635\u0641",
  "adm.secAutoBans": "\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644",
  "adm.secTop": "\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)",
  "adm.secPerMin": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647",
  "adm.secTopEmpty": "\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
  "adm.secBusy": "\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644",
  "adm.secNormal": "\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC",
  "adm.banMinutes": "\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)",
  "adm.banUntil": "\u062A\u0627",
  "adm.banAuto": "\u062E\u0648\u062F\u06A9\u0627\u0631",
  "adm.resetAudit": "\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627",
  "adm.resetCarts": "\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646",
  "adm.resetVisitors": "\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
  "adm.resetDone": "\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.",
  "adm.resetWarn.audit": "\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F",
  "adm.resetWarn.carts": "\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F",
  "adm.resetWarn.visitors": "\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F",
  "adm.resetWarn.visits": "\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F",
  "adm.visitors": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
  "adm.uDevice": "\u062F\u0633\u062A\u06AF\u0627\u0647 / IP",
  "adm.uBrowser": "\u0645\u0631\u0648\u0631\u06AF\u0631",
  "adm.uRegion": "\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646",
  "adm.uPath": "\u0645\u0633\u06CC\u0631",
  "adm.guest": "\u0645\u0647\u0645\u0627\u0646",
  "adm.bans": "\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)",
  "adm.banType": "\u0646\u0648\u0639",
  "adm.banValue": "\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)",
  "adm.banReason": "\u062F\u0644\u06CC\u0644",
  "adm.ban": "\u0645\u0633\u062F\u0648\u062F \u06A9\u0646",
  "adm.unban": "\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC",
  "adm.banned": "\u0645\u0633\u062F\u0648\u062F",
  "adm.banDone": "\u0645\u0633\u062F\u0648\u062F \u0634\u062F.",
  "adm.unbanDone": "\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.",
  "adm.bansEmpty": "\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.",
  "adm.banByAdmin": "\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
  "adm.channels": "\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644",
  "adm.chSite": "\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A",
  "adm.chTelegram": "\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645",
  "adm.chEmail": "\u0627\u06CC\u0645\u06CC\u0644",
  "adm.chSms": "\u067E\u06CC\u0627\u0645\u06A9",
  "adm.channelsHint": "\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "adm.telegram": "\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645",
  "adm.tgHint": "\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.tgEnabled": "\u0628\u0627\u062A \u0631\u0648\u0634\u0646",
  "adm.tgToken": "\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A",
  "adm.tgTokenHint": "\u0645\u062B\u0644 123456:ABC-\u2026",
  "adm.tgWelcome": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start",
  "adm.tgTest": "\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC",
  "adm.tgInbox": "\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627",
  "adm.tgSubs": "\u0639\u0636\u0648\u0647\u0627",
  "adm.tgReplyPh": "\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026",
  "adm.tgInboxEmpty": "\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.",
  "adm.lottery": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
  "adm.lotteryNew": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F",
  "adm.lotPrize": "\u062C\u0627\u06CC\u0632\u0647",
  "adm.lotEnds": "\u067E\u0627\u06CC\u0627\u0646",
  "adm.lotWinners": "\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647",
  "adm.lotWinnersList": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627",
  "adm.lotMode": "\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A",
  "adm.lotModeOrders": "\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "adm.lotModeManual": "\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC",
  "adm.lotEntries": "\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
  "adm.lotRun": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646",
  "adm.lotRunWarn": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F",
  "adm.lotDone": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "adm.lotClose": "\u0628\u0633\u062A\u0646",
  "adm.lotClosed": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.",
  "adm.lotEmpty": "\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.",
  "lot.title": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC",
  "lot.nav": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
  "lot.soon": "\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!",
  "lot.done": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647",
  "lot.winners": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627",
  "lot.active": "\u0641\u0639\u0627\u0644",
  "lot.prize": "\u062C\u0627\u06CC\u0632\u0647",
  "lot.ends": "\u067E\u0627\u06CC\u0627\u0646",
  "lot.entries": "\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
  "lot.joined": "\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.",
  "lot.join": "\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
  "lot.joinDone": "\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!",
  "lot.autoEntry": "\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.",
  "contact.phone3": "\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645",
  "adm.sBackups": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E",
  "adm.backupNow": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627",
  "adm.backupsHint": "\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.backupsEmpty": "\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.",
  "adm.backupSize": "\u062D\u062C\u0645",
  "adm.backupRestore": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC",
  "adm.backupRestoreWarn": "\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F",
  "adm.backupDone": "\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.",
  "adm.backupRestored": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.dumpFull": "\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A",
  "adm.sFeatures": "\u0627\u0645\u06A9\u0627\u0646\u0627\u062A",
  "adm.sShipping": "\u0627\u0631\u0633\u0627\u0644",
  "adm.sPlus": "\u067E\u0644\u0627\u0633",
  "adm.sOrders": "\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
  "adm.sSeo": "\u0633\u0626\u0648",
  "adm.sAuth": "\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A",
  "adm.sSaved": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "adm.tAccent": "\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC",
  "adm.tVariant": "\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC",
  "adm.tVariantHint": "\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.",
  "hdr.refresh": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647",
  "adm.errTitle": "\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A",
  "adm.errEmpty": "\u0647\u06CC\u0686 \u062E\u0637\u0627\u06CC \u06A9\u0644\u0627\u06CC\u0646\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u2014 \u0633\u0627\u06CC\u062A \u0633\u0627\u0644\u0645 \u0627\u0633\u062A.",
  "adm.tVariant": "Visual skin",
  "adm.tVariantHint": "If you do not like the fresh skin, \u201CClassic\u201D is exactly the previous theme.",
  "hdr.refresh": "Refresh page",
  "adm.errTitle": "Live client errors",
  "adm.errEmpty": "No client errors recorded \u2014 the site is healthy.",
  "adm.tPort": "\u067E\u0648\u0633\u062A\u0647\u0654 \u0645\u0648\u062C \u0648 \u062F\u0631\u06CC\u0627 (\u0645\u0646\u0627\u0633\u0628 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0633\u0627\u062D\u0644\u06CC \u2014 \u0628\u0631\u0627\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A)",
  "adm.tPortHint": "\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.",
  "adm.tMode": "\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
  "adm.tRadius": "\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627",
  "adm.tDensity": "\u062A\u0631\u0627\u06A9\u0645",
  "adm.tBg": "\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647",
  "adm.tContrast": "\u06A9\u0646\u062A\u0631\u0627\u0633\u062A",
  "adm.tAnim": "\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627",
  "adm.uSearchPos": "\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648",
  "adm.uHeader": "\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF",
  "adm.uNav": "\u0633\u0628\u06A9 \u0645\u0646\u0648",
  "adm.uCards": "\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627",
  "adm.uSticky": "\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646",
  "adm.uTicker": "\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627",
  "adm.uTickerItems": "\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC",
  "adm.uTickerSpeed": "\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC",
  "adm.uQuick": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627",
  "adm.uChat": "\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "adm.uCrumb": "\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647",
  "adm.uCols": "\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627",
  "adm.uColsMobile": "\u0645\u0648\u0628\u0627\u06CC\u0644",
  "adm.uColsTablet": "\u062A\u0628\u0644\u062A",
  "adm.uColsDesktop": "\u062F\u0633\u06A9\u062A\u0627\u067E",
  "adm.uColsWide": "\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636",
  "adm.uCardInfo": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627",
  "adm.uPosStart": "\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)",
  "adm.uPosCenter": "\u0648\u0633\u0637",
  "adm.uPosEnd": "\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)",
  "adm.uLayoutLogoStart": "\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632",
  "adm.uLayoutSplit": "\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646",
  "adm.uLayoutCentered": "\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637",
  "adm.fHint": "\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.bLabel": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
  "adm.bSelect": "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627",
  "adm.bSize": "\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628",
  "adm.bCopies": "\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627",
  "adm.bShowName": "\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627",
  "adm.bShowPrice": "\u0642\u06CC\u0645\u062A",
  "adm.bShowBrand": "\u0628\u0631\u0646\u062F",
  "adm.bShowSku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
  "adm.bShowQr": "\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
  "adm.bType": "\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F",
  "adm.bPrint": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627",
  "adm.bGenerate": "\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F",
  "adm.igPack": "\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645",
  "adm.igCap": "\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)",
  "adm.igTags": "\u0647\u0634\u062A\u06AF\u200C\u0647\u0627",
  "adm.igImgHint": "\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.",
  "adm.igDl": "\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631",
  "adm.igNoImg": "\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.",
  "adm.igCopyCap": "\u06A9\u067E\u06CC \u0645\u062A\u0646",
  "adm.igCopyTags": "\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627",
  "adm.igCopyAll": "\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF",
  "adm.bGenerated": "\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F",
  "adm.bScan": "\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F",
  "adm.bScanMode": "\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)",
  "adm.bScanHint": "\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
  "adm.bConnected": "\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646",
  "adm.bSerial": "\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial",
  "adm.bSerialHint": "\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).",
  "adm.bSerialUnsupported": "\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.",
  "adm.bSerialConnected": "\u0645\u062A\u0635\u0644 \u0634\u062F",
  "adm.bSerialClosed": "\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F",
  "adm.bHistory": "\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
  "adm.isTitle": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
  "adm.isHint": "\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.",
  "adm.isBuild": "\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633",
  "adm.isBuilding": "\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026",
  "adm.isDone": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F",
  "adm.isCount": "\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647",
  "adm.auditAction": "\u0631\u0648\u06CC\u062F\u0627\u062F",
  "adm.auditActor": "\u06A9\u0627\u0631\u0628\u0631",
  "adm.auditTarget": "\u0645\u0648\u0636\u0648\u0639",
  "adm.auditMeta": "\u062C\u0632\u0626\u06CC\u0627\u062A",
  "adm.statsRevenue": "\u062F\u0631\u0622\u0645\u062F",
  "adm.statsVisits": "\u0628\u0627\u0632\u062F\u06CC\u062F",
  "adm.statsOrders": "\u0633\u0641\u0627\u0631\u0634",
  "adm.statsByCat": "\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
  "adm.statsByBrand": "\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F",
  "adm.statsStockValue": "\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC",
  "adm.statsAvgOrder": "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
  "adm.exportProducts": "\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
  "adm.exportOrders": "\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "adm.exportUsers": "\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "adm.exportReviews": "\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A",
  "adm.exportTickets": "\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
  "adm.exportAudit": "\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
  "adm.exportAll": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)",
  "adm.backup": "\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
  "adm.backupDone": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F",
  "adm.cleanup": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC",
  "adm.cleanupDone": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "adm.pageEditHint": "\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.noPermission": "\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.",
  "adm.liveView": "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A",
  "adm.saved": "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "st.pending_payment": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A",
  "st.pending_review": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
  "st.confirmed": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647",
  "st.preparing": "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC",
  "st.ready_pickup": "\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC",
  "st.shipped": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647",
  "st.delivered": "\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647",
  "st.cancelled": "\u0644\u063A\u0648 \u0634\u062F\u0647",
  "st.refunded": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
  "st.returned": "\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647",
  "dl.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC",
  "dl.courier": "\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC",
  "pm.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "pm.gateway": "\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",
  "pm.cod": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",
  "ps.unpaid": "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647",
  "ps.paid": "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647",
  "ps.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
  "ps.refunded": "\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F",
  "ps.failed": "\u0646\u0627\u0645\u0648\u0641\u0642",
  "ps.cancelled": "\u0644\u063A\u0648 \u0634\u062F\u0647",
  "tc.order": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634",
  "tc.return": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
  "tc.product": "\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
  "tc.technical": "\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A",
  "tc.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
  "tc.partnership": "\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
  "tc.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A",
  "tc.other": "\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F",
  "tp.critical": "\u0628\u062D\u0631\u0627\u0646\u06CC",
  "tp.high": "\u0632\u06CC\u0627\u062F",
  "tp.normal": "\u0645\u0639\u0645\u0648\u0644\u06CC",
  "tp.low": "\u06A9\u0645",
  "ft.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
  "ft.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
  "ft.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "fs.new": "\u062C\u062F\u06CC\u062F",
  "fs.seen": "\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647",
  "fs.in_progress": "\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
  "fs.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647",
  "fs.rejected": "\u0631\u062F \u0634\u062F\u0647",
  "tk.open": "\u0628\u0627\u0632",
  "tk.answered": "\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647",
  "tk.closed": "\u0628\u0633\u062A\u0647",
  "feat.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "feat.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "feat.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
  "feat.tickets": "\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A",
  "feat.reviews": "\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "feat.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
  "feat.ads": "\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A",
  "feat.imageSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
  "feat.barcode": "\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628",
  "feat.priceCheckDevice": "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
  "feat.publicStats": "\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC",
  "feat.coupons": "\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
  "feat.consent": "\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)",
  "feat.liveSupport": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
  "feat.announcements": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
  "feat.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
  "feat.compare": "\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
  "feat.recentlyViewed": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647",
  "feat.guestCheckout": "\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
  "feat.priceAlerts": "\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627",
  "feat.twoFactor": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
  "feat.referrals": "\u06A9\u062F \u0645\u0639\u0631\u0641",
  "feat.voiceSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC",
  "feat.offlineMode": "\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646",
  "feat.captcha": "\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)",
  "captcha.required": "\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.",
  "captcha.label": "\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645",
  "captcha.hint": "\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633",
  "captcha.placeholder": "\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A",
  "captcha.solved": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714",
  "captcha.refresh": "\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647",
  "perm.dashboard.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F",
  "perm.products.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
  "perm.products.create": "\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627",
  "perm.products.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627",
  "perm.products.delete": "\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627",
  "perm.products.price": "\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641",
  "perm.products.stock": "\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC",
  "perm.categories.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627",
  "perm.orders.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "perm.orders.manage": "\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634",
  "perm.refunds.manage": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634",
  "perm.reviews.moderate": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A",
  "perm.reviews.reply": "\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A",
  "perm.tickets.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
  "perm.feedback.manage": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627",
  "perm.users.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "perm.users.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "perm.users.permissions": "\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
  "perm.wallet.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  "perm.plus.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
  "perm.coupons.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
  "perm.ads.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
  "perm.notifications.send": "\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646",
  "perm.settings.edit": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "perm.theme.edit": "\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646",
  "perm.pages.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627",
  "perm.barcode.print": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
  "perm.barcode.scan": "\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
  "perm.imagesearch.index": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC",
  "perm.audit.view": "\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
  "perm.stats.view": "\u0622\u0645\u0627\u0631",
  "perm.data.export": "\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627",
  "misc.quickView": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639",
  "misc.addToHome": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC",
  "misc.installHint": "\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.",
  "misc.printBlocked": "\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.",
  "misc.saved": "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
  "misc.deleted": "\u062D\u0630\u0641 \u0634\u062F",
  "misc.updated": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
  "misc.confirmDelete": "\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F",
  "misc.loadingMore": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026",
  "misc.recentlyViewed": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647",
  "misc.uiSound": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637",
  "misc.uiSoundOn": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F",
  "misc.uiSoundOff": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F",
  "misc.shareDone": "\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F",
  "misc.shareNative": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
  "img.alt": "\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627",
  "adm.view": "\u0645\u0634\u0627\u0647\u062F\u0647",
  "adm.support": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "adm.supSelect": "\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646",
  "adm.supSelectHint": "\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.",
  "adm.tkReply": "\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  "adm.tkManage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A",
  "common.updated": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC",
  "common.link": "\u0644\u06CC\u0646\u06A9",
  "common.text": "\u0645\u062A\u0646",
  "cart.coupon": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641",
  "misc.sent": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
  "misc.copied": "\u06A9\u067E\u06CC \u0634\u062F",
  "adm.revPending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
  "adm.revApproved": "\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647",
  "adm.revRejected": "\u0631\u062F\u0634\u062F\u0647",
  "adm.revApprove": "\u0627\u0646\u062A\u0634\u0627\u0631",
  "adm.revReject": "\u0631\u062F",
  "adm.revReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "adm.revEmpty": "\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A",
  "adm.revEmptyHint": "\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.",
  "rev.buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631",
  "rev.visitor": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647",
  "rev.shopReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "fb.new": "\u062C\u062F\u06CC\u062F",
  "fb.seen": "\u062F\u06CC\u062F\u0647 \u0634\u062F",
  "fb.inProgress": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC",
  "fb.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "fb.rejected": "\u0631\u062F \u0634\u062F",
  "feedback.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
  "feedback.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
  "feedback.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
  "adm.fbEmptyHint": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
  "adm.cpNew": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F",
  "adm.cpPercent": "\u062F\u0631\u0635\u062F\u06CC",
  "adm.cpAmount": "\u0645\u0628\u0644\u063A\u06CC",
  "adm.cpValue": "\u0645\u0642\u062F\u0627\u0631",
  "adm.cpUsage": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647",
  "adm.cpDates": "\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631",
  "adm.cpStart": "\u0634\u0631\u0648\u0639",
  "adm.cpEnd": "\u067E\u0627\u06CC\u0627\u0646",
  "adm.cpExpired": "\u0645\u0646\u0642\u0636\u06CC",
  "adm.adNew": "\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F",
  "adm.adSlot": "\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634",
  "adm.adsHint": "\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.",
  "adm.notifNew": "\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F",
  "adm.notifHint": "\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.",
  "adm.notifLevel": "\u0633\u0637\u062D",
  "adm.notifRecent": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
  "notif.level.info": "\u0627\u0637\u0644\u0627\u0639",
  "notif.level.success": "\u0645\u0648\u0641\u0642",
  "notif.level.warning": "\u0647\u0634\u062F\u0627\u0631",
  "notif.level.error": "\u062E\u0637\u0627",
  "adm.pagesPick": "\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646",
  "adm.pagesPickHint": "\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.",
  "adm.pgHint": "\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "adm.bPrinter": "\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628",
  "adm.bPrinterHint": "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "adm.bScanner": "\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646",
  "adm.bLabels": "\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
  "adm.bPreview": "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628",
  "adm.bPriceMode": "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
  "adm.bFound": "\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F",
  "adm.bNotFound": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
  "adm.bPickFirst": "\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.",
  "adm.ixHint": "\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.",
  "adm.ixIndex": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647",
  "adm.ixReindex": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647",
  "adm.ixDone": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
  "adm.audActor": "\u06A9\u0627\u0631\u0628\u0631",
  "adm.audAction": "\u0631\u0648\u06CC\u062F\u0627\u062F",
  "adm.audTarget": "\u0647\u062F\u0641",
  "adm.audMeta": "\u062C\u0632\u0626\u06CC\u0627\u062A",
  "adm.stOrders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
  "adm.stRevenue": "\u062F\u0631\u0622\u0645\u062F",
  "adm.stVisits": "\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
  "adm.stUsers": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  "adm.stProducts": "\u06A9\u0627\u0644\u0627\u0647\u0627",
  "adm.stAvg": "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634",
  "adm.stByCat": "\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
  "adm.stByBrand": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627",
  "adm.data": "\u062F\u0627\u062F\u0647\u200C\u0647\u0627",
  "adm.dataHint": "\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.",
  "adm.dExport": "\u062E\u0631\u0648\u062C\u06CC",
  "adm.dBackup": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC",
  "adm.dBackupHint": "\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "adm.dCleanup": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC",
  "adm.dCleanupHint": "\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
  "sys.turnOn": "\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "sys.turnOff": "\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
  "sys.offConfirm": "\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.",
  "sys.autoWakeMins": "\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)",
  "sys.asleep": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.",
  "sys.asleepTimed": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
  "sys.awake": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.",
  "sys.sleepBanner": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.",
  "sys.keepAlive": "\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644",
  "checkout.guestInfo": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646",
  "checkout.guestHint": "\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.",
  "checkout.guestName": "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
  "checkout.guestPhone": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644",
  "checkout.guestPhoneHint": "\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",
  "checkout.guestNameRequired": "\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.",
  "checkout.guestPhoneInvalid": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.",
  "checkout.guestCodPickup": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.",
  "home.recent": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627",
  "home.recentSub": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC",
  "checkout.guestCourierNote": "\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"
};
var en = {
  "app.name": "Yassaei Electronics",
  "app.tagline": "Electronics & electrical supplies",
  "common.loading": "Loading\u2026",
  "common.save": "Save",
  "common.saving": "Saving\u2026",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.confirm": "Confirm",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.add": "Add",
  "common.create": "Create",
  "common.update": "Update",
  "common.search": "Search",
  "common.filter": "Filter",
  "common.filters": "Filters",
  "common.sort": "Sort",
  "common.all": "All",
  "common.none": "None",
  "common.more": "More",
  "common.less": "Less",
  "common.showAll": "View all",
  "common.back": "Back",
  "common.next": "Next",
  "common.prev": "Previous",
  "common.yes": "Yes",
  "common.no": "No",
  "common.optional": "Optional",
  "common.required": "Required",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.share": "Share",
  "common.download": "Download",
  "common.upload": "Upload",
  "common.print": "Print",
  "common.refresh": "Refresh",
  "common.retry": "Try again",
  "common.send": "Send",
  "common.sent": "Sent",
  "common.submit": "Submit",
  "common.reply": "Reply",
  "common.view": "View",
  "common.details": "Details",
  "common.status": "Status",
  "common.date": "Date",
  "common.time": "Time",
  "common.amount": "Amount",
  "common.count": "Quantity",
  "common.total": "Total",
  "common.price": "Price",
  "common.stock": "Stock",
  "common.available": "In stock",
  "common.unavailable": "Out of stock",
  "common.inStock": "Available in stock",
  "common.lowStock": "Fewer than 3 left",
  "common.notifyMe": "Notify me when available",
  "common.notified": "We will let you know as soon as it is back",
  "common.category": "Category",
  "common.brand": "Brand",
  "common.product": "Product",
  "common.products": "Products",
  "common.order": "Order",
  "common.orders": "Orders",
  "common.user": "User",
  "common.users": "Users",
  "common.result": "Result",
  "common.results": "Results",
  "common.noResult": "No results found",
  "common.error": "Error",
  "common.success": "Done",
  "common.warning": "Notice",
  "common.note": "Note",
  "common.notes": "Notes",
  "common.description": "Description",
  "common.specs": "Specifications",
  "common.actions": "Actions",
  "common.active": "Active",
  "common.inactive": "Inactive",
  "common.enabled": "On",
  "common.disabled": "Off",
  "common.on": "On",
  "common.off": "Off",
  "common.from": "From",
  "common.to": "To",
  "common.and": "and",
  "common.or": "or",
  "common.today": "Today",
  "common.yesterday": "Yesterday",
  "common.toman": "Toman",
  "common.rial": "Rial",
  "common.page": "Page",
  "common.of": "of",
  "common.items": "items",
  "common.new": "New",
  "common.old": "Old",
  "common.apply": "Apply",
  "common.reset": "Reset",
  "common.clear": "Clear",
  "common.select": "Please select",
  "common.title": "Title",
  "common.body": "Message",
  "common.type": "Type",
  "common.priority": "Priority",
  "common.answer": "Answer",
  "common.message": "Message",
  "common.messages": "Messages",
  "common.attach": "Attachment",
  "common.image": "Image",
  "common.images": "Images",
  "common.phone": "Mobile number",
  "common.email": "Email",
  "common.address": "Address",
  "common.city": "City",
  "common.province": "Province",
  "common.postal": "Postal code",
  "common.name": "Name",
  "common.fullName": "Full name",
  "common.username": "Username",
  "common.password": "Password",
  "common.passwordConfirm": "Repeat password",
  "common.login": "Sign in",
  "common.logout": "Sign out",
  "common.register": "Register",
  "common.guest": "Guest",
  "common.admin": "Admin",
  "common.settings": "Settings",
  "common.help": "Help",
  "common.home": "Home",
  "common.skip": "Skip",
  "common.done": "Done",
  "common.pending": "Pending",
  "common.approved": "Approved",
  "common.rejected": "Rejected",
  "common.open": "Open",
  "common.closed": "Closed",
  "common.all2": "All items",
  "common.never": "Never",
  "common.empty": "Empty",
  "common.secure": "Secure",
  "common.free": "Free",
  "common.unit": "pcs",
  "common.day": "day",
  "common.hour": "hour",
  "common.minute": "minute",
  "common.second": "second",
  "common.percent": "percent",
  "common.discount": "Discount",
  "common.discountCode": "Discount code",
  "common.shipping": "Shipping cost",
  "common.insurance": "Shipment insurance",
  "common.subtotal": "Items subtotal",
  "common.payable": "Amount payable",
  "common.payment": "Payment",
  "common.cart": "Cart",
  "common.wishlist": "My list",
  "common.compare": "Compare",
  "common.profile": "Profile",
  "common.wallet": "Wallet",
  "common.balance": "Balance",
  "common.transactions": "Transactions",
  "common.deposit": "Top up wallet",
  "common.points": "Points",
  "common.ticket": "Ticket",
  "common.tickets": "Tickets",
  "common.support": "Support",
  "common.review": "Review",
  "common.reviews": "Reviews",
  "common.question": "Question",
  "common.questions": "Customer questions",
  "common.rating": "Rating",
  "common.notification": "Notification",
  "common.notifications": "Notifications",
  "common.security": "Security",
  "common.history": "History",
  "common.report": "Report",
  "common.bug": "Bug report",
  "common.suggestion": "Suggestion",
  "common.complaint": "Complaint",
  "common.law": "Terms & conditions",
  "common.privacy": "Privacy policy",
  "common.about": "About us",
  "common.contact": "Contact us",
  "common.faq": "FAQ",
  "common.guide": "Buying guide",
  "common.services": "Customer services",
  "common.stats": "Store statistics",
  "common.searchProducts": "Search products\u2026",
  "common.noData": "Nothing to show",
  "common.tryAgain": "Try again",
  "common.showMore": "Show more",
  "common.perPage": "Per page",
  "skip": "Skip to main content",
  "boot.loading": "Loading Yassaei Electronics\u2026",
  "boot.waking": "The cloud server is waking up; we will retry automatically in a few seconds\u2026",
  "boot.failed": "Store unreachable; the cloud server is asleep or the network is down.",
  "update.available": "A new version is ready \u2014 tap to see the changes.",
  "update.reload": "Refresh now",
  "boot.failedHint": "Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.",
  "topbar.fastSend": "Shipping from Tehran to all of Iran",
  "nav.home": "Home",
  "nav.products": "All products",
  "nav.deals": "Deals",
  "nav.new": "New arrivals",
  "nav.stats": "Live stats",
  "nav.about": "About us",
  "price.inquire": "Price on request \u2014 call the store",
  "price.inquireShort": "Inquire",
  "pdp.callStore": "Call the store",
  "pdp.visitStore": "Visit in person",
  "pdp.serviceHint": "This is a service/custom item; final price is confirmed by phone.",
  "home.partFinder": "Can't find a part?",
  "home.partFinderText": "Tell us by phone or message; if it is on our shelves, we set it aside for you the same day.",
  "home.partFinderCta": "Call or message",
  "nav.contact": "Contact us",
  "nav.login": "Sign in",
  "nav.register": "Register",
  "nav.cart": "Cart",
  "nav.wishlist": "My list",
  "nav.notifications": "Notifications",
  "nav.menu": "Menu",
  "nav.account": "My account",
  "nav.admin": "Admin panel",
  "nav.allCategories": "All categories",
  "theme.toggle": "Toggle theme (light/dark)",
  "theme.dark": "Dark mode",
  "theme.light": "Light mode",
  "theme.auto": "Match system",
  "search.placeholder": "Search products, brands or categories\u2026",
  "search.go": "Search",
  "search.voice": "Voice search",
  "search.byImage": "Search by photo",
  "search.listening": "Listening\u2026 go ahead and speak",
  "search.noVoice": "Your browser does not support voice search.",
  "search.micDenied": "Microphone access is blocked. Allow microphone permission for this site in browser settings.",
  "search.voiceNetwork": "Speech service unreachable; check your internet connection.",
  "search.noSpeech": "I didn't catch that; try again and speak clearly.",
  "search.noMic": "No microphone found on this device.",
  "pwd.show": "Show password",
  "pwd.hide": "Hide password",
  "search.suggestions": "Suggestions",
  "search.trending": "Trending searches",
  "search.recent": "Your recent searches",
  "search.resultsFor": "Search results for",
  "search.inProducts": "In products",
  "search.inCategories": "Categories",
  "search.inBrands": "Brands",
  "search.inPages": "Pages",
  "search.didYouMean": "Did you mean?",
  "search.noResultTitle": "We found nothing",
  "search.noResultText": "Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.",
  "search.imageTitle": "Search by photo",
  "search.imageText": "Upload a photo of the product and we will find similar items in the store.",
  "search.imageHint": "JPG or PNG, up to 4 MB",
  "search.imageIndexing": "Preparing the visual search engine\u2026",
  "search.imageNoIndex": "Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.",
  "search.imageNoMatch": "No similar product found for this photo. You can search by product name instead.",
  "search.dropHere": "Drop the photo here",
  "search.pickFile": "Choose a photo",
  "search.takePhoto": "Take a photo with the camera",
  "mnav.home": "Home",
  "mnav.products": "Categories",
  "mnav.search": "Search",
  "mnav.cart": "Cart",
  "mnav.me": "Account",
  "footer.shopping": "Shopping",
  "footer.allProducts": "All products",
  "footer.deals": "Deals & offers",
  "footer.inStock": "In-stock items",
  "footer.searchByImage": "Visual search",
  "footer.myList": "My list",
  "footer.stats": "Store statistics",
  "footer.services": "Customer services",
  "footer.guide": "Buying guide",
  "footer.service": "Customer services",
  "footer.faq": "FAQ",
  "footer.insurance": "Shipment insurance",
  "footer.plus": "Plus membership",
  "footer.tickets": "Support tickets",
  "footer.about": "About & legal",
  "footer.aboutUs": "About us",
  "footer.terms": "Terms & conditions",
  "footer.privacy": "Privacy policy",
  "footer.bug": "Report a bug",
  "footer.contact": "Contact us",
  "footer.suggest": "Suggestions & complaints",
  "footer.contactUs": "Ways to reach us",
  "footer.install": "Install the app",
  "footer.support": "Live support",
  "footer.rights": "All rights reserved.",
  "footer.workingHours": "Working hours",
  "home.heroKicker": "Haft-Hoz bourse, with an authenticity guarantee",
  "home.heroTitle": "From resistors to contactors \u2014 on your bench the same day",
  "home.heroText": "Resistors, capacitors and ICs, soldering gear, cables and wires in every size, LED strips and projectors, modems and switches, fans and surge protectors \u2014 everything your board, home or workshop needs, under one roof in Narmak.",
  "home.ctaShop": "Start shopping",
  "home.ctaDeals": "Today's deals",
  "home.point1": "Authenticity guarantee",
  "home.point2": "7-day withdrawal right",
  "home.point3": "Shipping across Iran",
  "home.point4": "Free in-store pickup",
  "home.categories": "Categories",
  "home.categoriesSub": "From resistors and ICs to projectors and surge protectors",
  "home.featured": "Featured picks",
  "home.featuredSub": "Items we use and recommend ourselves",
  "home.bestSellers": "Best sellers",
  "home.bestSellersSub": "Chosen by Yassaei Electronics customers",
  "home.newArrivals": "New in store",
  "home.newArrivalsSub": "The latest items added to the shelf",
  "home.deals": "Active discounts",
  "home.dealsSub": "Limited-time offers at better prices",
  "home.brands": "Brands in stock",
  "home.whyUs": "Why Yassaei Electronics?",
  "home.whyUsSub": "The things that set us apart",
  "home.reviews": "Customer reviews",
  "home.reviewsSub": "Real buyer experiences",
  "home.visitStore": "Visit the store",
  "home.visitStoreText": "Tehran, Narmak, Haft-Hoz square \u2014 free in-person advice and on-the-spot product testing",
  "home.openMap": "See the sketch and map",
  "home.statsTitle": "The store at a glance",
  "home.plusTitle": "Yassaei Electronics Plus membership",
  "home.plusText": "With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.",
  "home.plusCta": "See Plus benefits",
  "home.appTitle": "The Yassaei Electronics app",
  "home.appText": "This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.",
  "home.installCta": "Install on my device",
  "home.appInstalled": "The app is installed",
  "home.liveStats": "Live store statistics",
  "home.newsletter": "Stay posted on deals",
  "home.newsletterText": "Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.",
  "home.subscribe": "Subscribe",
  "stats.products": "Active products",
  "stats.ordersTotal": "Total orders",
  "stats.ordersToday": "Orders today",
  "stats.visitsToday": "Visits today",
  "stats.visitsTotal": "Total visits",
  "stats.pendingOrders": "Orders under review",
  "stats.delivered": "Successful deliveries",
  "stats.customers": "Registered customers",
  "stats.plusMembers": "Plus members",
  "stats.categories": "Categories",
  "stats.brands": "Brands",
  "stats.outOfStock": "Out-of-stock items",
  "stats.years": "Years active",
  "stats.title": "Public store statistics",
  "stats.sub": "These figures are taken live from the site's real data.",
  "stats.chartTitle": "Visits over the last 14 days",
  "stats.topProducts": "Best-selling products",
  "stats.transparency": "Transparency for customers",
  "stats.transparencyText": "We show real stock and real prices, and we do not hide the store's statistics either.",
  "catalog.title": "Products",
  "catalog.filters": "Filters",
  "catalog.showFilters": "Show filters",
  "catalog.hideFilters": "Hide filters",
  "catalog.sort.relevant": "Most relevant",
  "catalog.sort.newest": "Newest",
  "catalog.sort.oldest": "Oldest",
  "catalog.sort.cheapest": "Cheapest",
  "catalog.sort.dearest": "Most expensive",
  "catalog.sort.popular": "Best selling",
  "catalog.sort.rating": "Highest rated",
  "catalog.sort.discount": "Biggest discount",
  "catalog.sort.name": "Alphabetical",
  "catalog.f.category": "Category",
  "catalog.f.brand": "Brand",
  "catalog.f.price": "Price range",
  "catalog.f.availability": "Availability",
  "catalog.f.inStock": "In-stock items only",
  "catalog.f.discountOnly": "Discounted only",
  "catalog.f.rating": "Minimum rating",
  "catalog.f.authenticity": "Authenticity",
  "catalog.f.clear": "Clear all filters",
  "catalog.count": "products",
  "catalog.viewGrid": "Grid view",
  "catalog.viewList": "List view",
  "auth.original": "Original",
  "auth.highcopy": "High copy (grade 1)",
  "auth.generic": "Generic",
  "card.addToCart": "Add to cart",
  "card.added": "Added to cart",
  "card.quickView": "Quick view",
  "card.wishlistAdd": "Add to my list",
  "card.wishlistRemove": "Remove from my list",
  "card.compareAdd": "Add to compare",
  "card.outOfStock": "Out of stock",
  "card.soldOut": "Sold out",
  "pdp.addToCart": "Add to cart",
  "pdp.buyNow": "Buy now",
  "pdp.pickup": "Free in-store pickup",
  "pdp.warranty": "Warranty",
  "pdp.warrantyMonths": "{n}-month store replacement warranty",
  "pdp.noWarranty": "No warranty",
  "pdp.sku": "Product code",
  "pdp.barcode": "Barcode",
  "pdp.weight": "Weight",
  "pdp.gram": "grams",
  "pdp.zoomIn": "Zoom in",
  "pdp.zoomOut": "Zoom out",
  "pdp.zoomReset": "Actual size",
  "pdp.zoomHint": "Hover for magnifier; click or double-tap for full zoom",
  "pdp.video": "Video",
  "pdp.share": "Share",
  "pdp.specs": "Specifications",
  "pdp.description": "Description",
  "pdp.reviews": "Reviews & ratings",
  "pdp.questions": "Customer questions",
  "pdp.related": "Similar products",
  "pdp.compatibility": "Compatibility",
  "pdp.writeReview": "Write a review & rating",
  "pdp.askQuestion": "Ask a question",
  "pdp.loginToReview": "Sign in to write a review.",
  "pdp.reviewSubmitted": "Your review was submitted and will appear once the admin approves it.",
  "pdp.reviewPending": "Your review will appear after the admin approves it.",
  "pdp.questionSubmitted": "Your question was submitted; once approved, the admin will answer it.",
  "pdp.buyerBadge": "Buyer of this product",
  "pdp.visitorBadge": "Visitor",
  "pdp.helpful": "Was helpful",
  "pdp.storeReply": "Store reply",
  "pdp.noReviews": "No reviews yet. Be the first!",
  "pdp.noQuestions": "No questions yet. Ask if you have one.",
  "pdp.yourRating": "Your rating",
  "pdp.viewed": "views",
  "pdp.sold": "sold",
  "pdp.off": "off",
  "pdp.save": "You save",
  "pdp.lastPrice": "Previous price",
  "pdp.stockCount": "In stock: {n}",
  "pdp.fastSend": "Fast shipping from Tehran",
  "pdp.installment": "Cash on delivery for eligible orders",
  "cart.title": "Cart",
  "cart.empty": "Your cart is empty",
  "cart.emptyText": "You have not picked anything yet. Start from the categories or the search box.",
  "cart.goShopping": "Let's go shopping",
  "cart.item": "Product",
  "cart.qty": "Quantity",
  "cart.remove": "Remove",
  "cart.clear": "Empty the cart",
  "cart.clearConfirm": "Remove all items from the cart?",
  "cart.summary": "Order summary",
  "cart.continue": "Continue to checkout",
  "cart.freeShipHint": "Spend {amount} Toman more to get free shipping.",
  "cart.freeShipDone": "Shipping is free for this order!",
  "cart.couponApplied": "Discount code applied",
  "cart.couponPlaceholder": "Have a discount code? Enter it",
  "cart.applyCoupon": "Apply code",
  "cart.removeCoupon": "Remove code",
  "cart.updated": "Cart updated",
  "checkout.title": "Checkout",
  "checkout.step1": "Delivery",
  "checkout.step2": "Payment",
  "checkout.step3": "Confirm",
  "checkout.delivery": "Delivery method",
  "checkout.pickup": "Pickup from the store",
  "checkout.pickupDesc": "Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.",
  "checkout.courier": "Courier / postal shipping",
  "checkout.courierDesc": "Shipped to a saved address, with optional shipment insurance.",
  "checkout.zone": "Shipping zone",
  "checkout.express": "Express shipping (same day)",
  "checkout.insuranceOpt": "Shipment insurance",
  "checkout.insuranceDesc": "If the parcel is damaged or lost in transit, the goods value is compensated.",
  "checkout.insuranceAuto": "Applied automatically and free for Plus members.",
  "checkout.address": "Delivery address",
  "checkout.addAddress": "Add a new address",
  "checkout.noAddress": "You must save at least one address for postal shipping.",
  "checkout.paymentMethod": "Payment method",
  "checkout.useWallet": "Pay from wallet",
  "checkout.walletBalance": "Wallet balance: {amount} Toman",
  "checkout.note": "Order note (optional)",
  "checkout.notePlaceholder": "e.g. please call before delivery.",
  "checkout.acceptTerms": "I have read and accept the Terms & Conditions and the Privacy Policy.",
  "checkout.placeOrder": "Place & pay for the order",
  "checkout.placing": "Placing your order\u2026",
  "checkout.loginRequired": "Sign in to complete your purchase.",
  "checkout.successTitle": "Order placed",
  "checkout.successText": "Your order code is {code}. Track its status under My Orders.",
  "checkout.payNow": "Pay online",
  "checkout.payLater": "I will pay later",
  "checkout.gatewayDemo": "The gateway is in demo mode; no real money is deducted.",
  "checkout.paymentSuccess": "Payment was successful",
  "checkout.paymentFailed": "Payment failed",
  "checkout.simulateSuccess": "Successful payment (gateway simulation)",
  "checkout.simulateFail": "Cancel payment",
  "checkout.concurrencyNote": "Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.",
  "checkout.pickupReady": "Preparation time: about {h} working hours",
  "auth.title": "Sign in or register",
  "auth.loginTitle": "Sign in to your account",
  "auth.registerTitle": "Create an account",
  "auth.methodPassword": "Username & password",
  "auth.methodPhone": "Mobile number",
  "auth.methodEmail": "Email",
  "auth.identifier": "Username, mobile or email",
  "auth.remember": "Remember me",
  "auth.forgot": "Forgot password",
  "auth.noAccount": "Do not have an account?",
  "auth.haveAccount": "Already registered?",
  "auth.sendCode": "Send verification code",
  "auth.codeSent": "Verification code sent",
  "auth.codeSentTo": "A 6-digit code was sent to {target}.",
  "auth.enterCode": "Enter the verification code",
  "auth.otpCode": "Verification code",
  "auth.resend": "Resend code",
  "auth.resendIn": "Resend in {s} seconds",
  "auth.demoCode": "Demo mode: verification code {code}",
  "auth.2faTitle": "Two-step sign-in",
  "auth.2faText": "Enter the 6-digit code from your authenticator app, SMS or email.",
  "auth.2faTotp": "Authenticator app",
  "auth.2faSms": "SMS code",
  "auth.2faEmail": "Email code",
  "auth.2faBackup": "Backup code",
  "auth.2faVerify": "Verify & sign in",
  "auth.acceptTerms": "I accept the Terms & Conditions and the Privacy Policy.",
  "auth.referral": "Referral code (optional)",
  "auth.registerDone": "Your account was created. Welcome!",
  "auth.loginDone": "Welcome",
  "auth.logoutDone": "You signed out successfully",
  "auth.recoveryTitle": "Password recovery",
  "auth.recoveryText": "Enter your registered mobile number or email and we will send a recovery code.",
  "auth.newPassword": "New password",
  "auth.resetDone": "Password changed successfully",
  "auth.passwordRules": "At least 8 characters including lowercase, uppercase, a digit and a symbol",
  "auth.orContinue": "or",
  "auth.guestCheckout": "Continue shopping without an account",
  "acc.title": "My account",
  "acc.dashboard": "My dashboard",
  "acc.badges": "My achievements",
  "badge.got": "Earned",
  "badge.locked": "Locked",
  "badge.first-buy": "First purchase",
  "badge.first-buy.d": "You placed your first successful order.",
  "badge.silver-buyer": "Silver buyer",
  "badge.silver-buyer.d": "5 successful orders at Yassaei Electronics.",
  "badge.gold-buyer": "Gold buyer",
  "badge.gold-buyer.d": "15 successful orders; a Yassaei Electronics VIP.",
  "badge.big-spender": "Big spender",
  "badge.big-spender.d": "Over 50,000,000 Toman in purchases.",
  "badge.early-bird": "Early bird",
  "badge.early-bird.d": "Among the first 100 Yassaei Electronics users.",
  "badge.veteran": "Veteran",
  "badge.veteran.d": "With us for more than a year.",
  "badge.reviewer": "Reviewer",
  "badge.reviewer.d": "3 posted reviews helping others choose.",
  "badge.plus-member": "Plus member",
  "badge.plus-member.d": "You have an active Plus subscription.",
  "badge.wallet-user": "Wallet user",
  "badge.wallet-user.d": "You have used the Yassaei Electronics wallet.",
  "badge.supporter": "Supporter",
  "badge.supporter.d": "You opened your first support ticket.",
  "acc.orders": "My orders",
  "acc.wishlist": "My list",
  "acc.wallet": "Wallet",
  "acc.plus": "Plus membership",
  "acc.addresses": "Addresses",
  "acc.notifications": "Notifications",
  "acc.tickets": "My tickets",
  "acc.support": "Support chat",
  "acc.reviews": "My reviews",
  "acc.feedback": "Suggestions & complaints",
  "acc.profile": "Profile details",
  "acc.security": "Account security",
  "acc.sessions": "Active sessions",
  "acc.prefs": "Display preferences",
  "acc.data": "My data",
  "acc.hello": "Hi {name}",
  "acc.memberSince": "Member since {date}",
  "acc.noOrders": "You have not placed an order yet",
  "acc.noOrdersText": "Make your first purchase with the welcome discount WELCOME10.",
  "acc.orderCode": "Order code",
  "acc.orderDate": "Order date",
  "acc.orderItems": "Items",
  "acc.orderTotal": "Total amount",
  "acc.trackOrder": "Track order",
  "acc.cancelOrder": "Cancel order",
  "acc.cancelConfirm": "Cancel this order? The paid amount returns to your wallet.",
  "acc.cancelReason": "Reason for cancellation (optional)",
  "acc.orderCancelled": "Order cancelled",
  "acc.reorder": "Buy again",
  "acc.invoice": "Invoice",
  "acc.printInvoice": "Print invoice",
  "acc.timeline": "Order progress",
  "acc.walletEmpty": "No transactions recorded yet",
  "acc.walletDeposit": "Top up wallet",
  "acc.walletAmount": "Top-up amount (Toman)",
  "acc.walletDeposited": "Wallet topped up",
  "acc.walletNote": "The wallet balance can only be used to buy from this store; no interest or fee applies to it.",
  "acc.tx.deposit": "Top-up",
  "acc.tx.purchase": "Purchase",
  "acc.tx.refund": "Refund",
  "acc.tx.adjust_in": "Increase by admin",
  "acc.tx.adjust_out": "Deduction by admin",
  "acc.plusInactive": "You do not have a Plus membership",
  "acc.plusActive": "Plus active until {date}",
  "acc.plusSubscribe": "Buy Plus membership",
  "acc.plusRenew": "Renew membership",
  "acc.plusPrice": "{price} Toman for {days} days",
  "acc.plusPerks": "Plus membership benefits",
  "acc.plusSubscribed": "Plus membership activated",
  "acc.plusPayWallet": "Pay from wallet",
  "acc.plusPayGateway": "Pay online",
  "acc.addAddress": "Add address",
  "acc.editAddress": "Edit address",
  "acc.addrTitle": "Label (e.g. home, work)",
  "acc.addrReceiver": "Recipient name",
  "acc.addrPhone": "Recipient phone number",
  "acc.addrStreet": "Full postal address",
  "acc.addrDefault": "Default address",
  "acc.addrNote": "Note for the courier",
  "acc.addrSaved": "Address saved",
  "acc.addrDeleted": "Address deleted",
  "acc.noAddress": "No address saved yet",
  "acc.wishlistEmpty": "Your list is empty",
  "acc.wishlistEmptyText": "Tap the heart icon on any product to save it here.",
  "acc.notifEmpty": "You have no notifications",
  "acc.markAllRead": "Mark all as read",
  "acc.ticketNew": "New ticket",
  "acc.ticketSubject": "Subject",
  "acc.ticketCategory": "Request category",
  "acc.ticketPriority": "Priority",
  "acc.ticketBody": "Request details",
  "form.rulesRequired": "You must accept the ticket rules first.",
  "form.termsRequired": "You must accept the terms and conditions first.",
  "page.statsTitle": "Live store stats",
  "page.aboutCta": "Come and see what we have in store for you",
  "page.stepsTitle": "How to buy",
  "page.tipsTitle": "Buying tips",
  "page.hintsTitle": "For a more precise report",
  "page.bugTitle": "Report a bug",
  "page.rulesTitle": "Rules",
  "faq.all": "All topics",
  "faq.search": "Search questions\u2026",
  "faq.results": "{n} questions",
  "faq.notFound": "No question matched your search.",
  "faq.askText": "Ask live support or open a ticket.",
  "faq.cat.orders": "Orders & tracking",
  "faq.cat.shipping": "Shipping & delivery",
  "faq.cat.returns": "Returns & refunds",
  "faq.cat.product": "Products & authenticity",
  "faq.cat.account": "Account",
  "faq.cat.security": "Security & payment",
  "faq.cat.store": "Store & contact",
  "faq.cat.other": "Other",
  "acc.ticketCloseConfirm": "Close this ticket? You can reopen it later by sending a message.",
  "acc.ticketClosedNote": "This ticket is closed. Sending a new message reopens it.",
  "acc.ticketBodyShort": "The message is too short.",
  "acc.attachHint": "Up to 4 images, each below 4 MB.",
  "err.tooLarge": "The file is larger than 4 MB.",
  "acc.ticketRules": "I have read and accept the ticket rules.",
  "acc.ticketViewRules": "Read ticket rules",
  "acc.ticketCreated": "Ticket created. Tracking code: {code}",
  "acc.ticketWrite": "Write your reply\u2026",
  "acc.ticketClose": "Close ticket",
  "acc.ticketReopen": "Reopen",
  "acc.ticketSla": "Estimated reply time: {h} hours",
  "acc.noTickets": "You have no tickets",
  "acc.chatTitle": "Live support",
  "acc.chatPlaceholder": "Write your message\u2026",
  "acc.chatWelcome": "Hi! Any question or issue? Write it here and we will answer.",
  "acc.chatOffline": "We are outside working hours right now; leave a message and we reply first thing, or open a ticket.",
  "acc.chatOpenTicket": "Open a ticket",
  "acc.reviewEmpty": "You have not posted a review or question",
  "acc.feedbackNew": "Send a suggestion, complaint or bug report",
  "acc.feedbackType": "Message type",
  "acc.feedbackContact": "Contact (email or mobile)",
  "acc.feedbackContactHint": "If provided, we will inform you of the outcome.",
  "acc.feedbackSent": "Your message was submitted. Thanks for helping us improve.",
  "acc.noFeedback": "You have not sent any message",
  "acc.profileSaved": "Profile saved",
  "acc.passwordChange": "Change password",
  "acc.currentPassword": "Current password",
  "acc.newPassword2": "New password",
  "acc.passwordChanged": "Password changed",
  "acc.2faSection": "Two-factor authentication (2FA)",
  "acc.2faOff": "Disabled \u2014 turn it on for extra security.",
  "acc.2faOn": "Enabled",
  "acc.2faEnable": "Enable two-factor",
  "acc.2faDisable": "Disable",
  "acc.2faScan": "Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.",
  "acc.2faKey": "Manual key",
  "acc.2faEnterCode": "Enter the 6-digit code from the app to enable",
  "acc.2faEnabled": "Two-factor enabled",
  "acc.2faDisabled": "Two-factor disabled",
  "acc.2faBackup": "Backup codes (keep them safe)",
  "acc.2faBackupHint": "If you lose access to the app, sign in with these. Each code works once.",
  "acc.2faMethods": "Verification methods",
  "acc.sessionsText": "Devices currently signed in to your account.",
  "acc.revokeAll": "Sign out everywhere",
  "acc.revokeDone": "Sessions revoked",
  "acc.current": "This device",
  "acc.prefsText": "These settings apply only to this device.",
  "acc.prefTheme": "Theme",
  "acc.prefLang": "Language",
  "acc.prefDensity": "Density",
  "acc.prefMotion": "Animations",
  "acc.prefNotif": "Notifications",
  "acc.notifMarketing": "Offers and discounts",
  "acc.notifOrders": "Order status",
  "acc.notifRestock": "Restock of my saved items",
  "acc.notifSupport": "Support and ticket replies",
  "acc.exportData": "Export my data",
  "acc.exportHint": "Download all your account info, orders, reviews and tickets as JSON.",
  "acc.deleteAccount": "Delete account",
  "acc.deleteWarn": "Deleting removes your personal data, while financial order records are kept as required by law.",
  "acc.deleteConfirm": "Enter your password to delete the account",
  "acc.pointsText": "You earn 1 point per 100,000 Toman of purchase.",
  "acc.referralCode": "Your referral code",
  "acc.referralText": "Share this code; you both get 50 points.",
  "chat.title": "Yassaei Electronics live support",
  "chat.online": "We usually reply within minutes",
  "chat.open": "Start chat",
  "chat.minimize": "Close",
  "chat.loginFirst": "Sign in to chat with support.",
  "chat.sent": "Message sent",
  "chat.typing": "Support is typing\u2026",
  "chat.quick": "Frequent questions",
  "notif.new": "New notification",
  "notif.markRead": "Mark as read",
  "notif.viewAll": "View all notifications",
  "notif.empty": "No notifications",
  "notif.type.announcement": "Announcement",
  "notif.type.order": "Order",
  "notif.type.restock": "Back in stock",
  "notif.type.ticket": "Ticket",
  "notif.type.support": "Support",
  "notif.type.review": "Review",
  "notif.type.plus": "Plus membership",
  "notif.type.wallet": "Wallet",
  "notif.type.account": "Account",
  "notif.type.feedback": "Feedback",
  "notif.type.admin_alert": "Admin alert",
  "notif.type.news": "News",
  "notif.type.offer": "Special offer",
  "notif.type.system": "System",
  "notif.type.info": "Info",
  "notif.type.welcome": "Welcome",
  "consent.title": "Welcome to Yassaei Electronics",
  "consent.text": "Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.",
  "consent.terms": "I have read and accept the Terms & Conditions.",
  "consent.privacy": "I accept the Privacy Policy.",
  "consent.marketing": "I would like to hear about deals and new arrivals (optional).",
  "consent.accept": "Accept & enter the site",
  "consent.readTerms": "Read terms",
  "consent.readPrivacy": "Read privacy",
  "consent.thanks": "Thanks! Your acceptance was recorded.",
  "consent.manage": "Cookie & privacy choices",
  "social.instagram": "Instagram",
  "home.partnersTitle": "Brands we work with",
  "stats.title": "Live store stats",
  "stats.subtitle": "Real store numbers, updated live.",
  "stats.chartTitle": "Visits \u2014 last 14 days",
  "stats.chartHint": "Each column height is that day visit count.",
  "stats.topTitle": "Recent best sellers",
  "adm.sPartners": "Partners & brands",
  "adm.ptFa": "Persian name",
  "adm.ptEn": "Name (EN)",
  "adm.ptAdd": "Add brand",
  "adm.ptHint": "These names scroll as a marquee on the home page; order is yours to set.",
  "feat.partners": "Partner brands strip",
  "auth.pwdLater": "I'll change it later",
  "auth.pwdLaterToast": "OK; you can change it anytime from Account \u2192 Change password.",
  "social.telegram": "Telegram",
  "social.eitaa": "Eitaa",
  "social.whatsapp": "WhatsApp",
  "consent.rejectOptional": "Accept necessary only",
  "consent.ttlNote": "Your choice stays valid for 180 days; after that we ask again.",
  "contact.title": "Contact us",
  "contact.mapTitle": "Shop location sketch",
  "contact.mapHint": "Click to open in a map app",
  "contact.mapAsk": "Which map would you like to open?",
  "contact.mapPermission": "If you allow location access, we will show the route from your current position to the shop.",
  "contact.allowLocation": "Allow location access",
  "contact.denyLocation": "Continue without location",
  "contact.openMaps": "Open in maps",
  "contact.copyAddress": "Copy address",
  "contact.hours": "Working hours",
  "contact.phone": "Store phone",
  "contact.mobile": "Mobile & WhatsApp",
  "contact.emailUs": "Email",
  "contact.addressUs": "Address",
  "contact.callNow": "Call now",
  "contact.whatsapp": "Message on WhatsApp",
  "contact.locationOn": "Your approximate location was found",
  "contact.locationDenied": "Location denied; the map opens without an origin.",
  "contact.formTitle": "Send a quick message",
  "contact.formText": "Prefer not to call? Leave a message or open a ticket.",
  "contact.neshan": "Neshan",
  "contact.balad": "Balad",
  "contact.google": "Google Maps",
  "contact.osm": "OpenStreetMap",
  "contact.tgBotTitle": "Telegram support bot",
  "contact.tgBotText": "Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.",
  "contact.tgBotBtn": "Open the bot on Telegram",
  "compare.title": "Compare products",
  "compare.empty": "No products selected for comparison",
  "compare.emptyText": "Use the Compare button on product cards (up to 4 items).",
  "compare.add": "Add to compare",
  "compare.remove": "Remove",
  "priceCheck.title": "Price check by barcode",
  "priceCheck.sub": "Scan the barcode with your device or type it manually.",
  "priceCheck.input": "Barcode or SKU",
  "priceCheck.scanCamera": "Scan with camera",
  "priceCheck.stopCamera": "Stop camera",
  "priceCheck.waiting": "Waiting for a scan\u2026",
  "priceCheck.notFound": "No product found for this barcode",
  "priceCheck.found": "Product found",
  "priceCheck.cameraUnsupported": "Camera unavailable. Use a barcode device or manual entry.",
  "priceCheck.cameraDenied": "Camera access denied.",
  "priceCheck.deviceMode": "Kiosk mode (full screen)",
  "priceCheck.lastScan": "Last scan",
  "priceCheck.fullscreen": "Full screen",
  "err.generic": "Something went wrong. Please try again.",
  "err.network": "Could not reach the server.",
  "err.notFound": "Page not found",
  "err.notFoundText": "The address may be wrong or the page has been removed.",
  "err.goHome": "Go to homepage",
  "err.offline": "You are offline. Cached data is shown.",
  "err.online": "Back online",
  "err.loginRequired": "You must sign in to view this section.",
  "err.forbidden": "You do not have access to this section.",
  "adm.title": "Admin panel",
  "adm.dashboard": "Dashboard",
  "adm.products": "Products",
  "adm.productNew": "Add product",
  "adm.productEdit": "Edit product",
  "adm.categories": "Categories & brands",
  "adm.orders": "Orders",
  "adm.reviews": "Reviews & questions",
  "adm.tickets": "Tickets",
  "adm.supportChat": "Support chat",
  "adm.feedback": "Feedback & bugs",
  "adm.users": "Users & permissions",
  "adm.wallet": "User wallets",
  "adm.coupons": "Coupons",
  "adm.ads": "Advertisements",
  "adm.notifications": "Notifications",
  "adm.settings": "Store settings",
  "adm.theme": "Theme & layout",
  "adm.features": "Features",
  "adm.shipping": "Shipping & insurance",
  "adm.plus": "Plus membership",
  "adm.pages": "Page content",
  "adm.barcode": "Barcode & labels",
  "adm.imageSearch": "Image search",
  "adm.audit": "Audit log",
  "adm.stats": "Statistics",
  "adm.export": "Export & backup",
  "adm.maintenance": "Maintenance",
  "adm.backToSite": "Back to site",
  "adm.kpi.ordersToday": "Orders today",
  "adm.kpi.visits": "Visits today",
  "adm.kpi.pending": "Pending review",
  "adm.kpi.revenueTotal": "Total revenue",
  "adm.kpi.users": "Users",
  "adm.kpi.products": "Products",
  "adm.kpi.lowStock": "Low stock",
  "adm.awaiting": "Tasks awaiting action",
  "adm.awaiting.reviews": "Reviews to approve",
  "adm.awaiting.tickets": "Open tickets",
  "adm.awaiting.orders": "Pending orders",
  "adm.awaiting.feedback": "New feedback",
  "adm.awaiting.chat": "Unread chat messages",
  "adm.chart": "Last 14 days trend",
  "adm.topSelling": "Best sellers",
  "adm.lowStockList": "Low-stock items",
  "adm.recentAudit": "Latest events",
  "adm.storage": "Data size",
  "adm.pName": "Product name",
  "adm.pNameEn": "English name",
  "adm.pCat": "Category",
  "adm.pBrand": "Brand",
  "adm.pPrice": "Price (Toman)",
  "adm.pOldPrice": "Price before discount",
  "adm.pCost": "Purchase cost",
  "adm.pStock": "Stock",
  "adm.pSku": "SKU",
  "adm.pBarcode": "Barcode",
  "adm.pWeight": "Weight (grams)",
  "adm.pWarranty": "Warranty (months)",
  "adm.pAuth": "Authenticity",
  "adm.pTags": "Tags (separate with Enter)",
  "adm.pSpecs": "Specifications",
  "adm.pSpecKey": "Spec name",
  "adm.pSpecVal": "Value",
  "adm.pAddSpec": "Add spec",
  "adm.pVideos": "Product videos (one https or /uploads URL per line)",
  "adm.pVideosHint": "Videos play in the product gallery and lightbox.",
  "adm.pImages": "Images",
  "adm.pFindImage": "Auto image search",
  "adm.pFindImageHint": "We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.",
  "adm.pFindSearching": "Searching for images\u2026",
  "adm.pFindEmpty": "No images found. You can upload your own photo.",
  "adm.pUpload": "Upload photo",
  "adm.pUseImage": "Use this image",
  "adm.pDefaultImage": "Restore default image",
  "adm.pFeatured": "Show in featured picks",
  "adm.pActive": "Active (visible on site)",
  "adm.pSaved": "Product saved",
  "adm.pCreated": "Product created",
  "adm.pDeleted": "Product deleted",
  "adm.pDeleteConfirm": "Delete this product permanently?",
  "adm.pQuickEdit": "Quick edit",
  "adm.pBulkPrice": "Bulk price change",
  "adm.catName": "Category name",
  "adm.catParent": "Parent category",
  "adm.catGlyph": "Icon",
  "adm.catOrder": "Display order",
  "adm.catNoParent": "No parent (top level)",
  "adm.brandName": "Brand name",
  "adm.brandNameEn": "Brand English name",
  "adm.oStatus": "Change status",
  "adm.oTracking": "Tracking code",
  "adm.oNote": "Internal note",
  "adm.oCustomer": "Customer",
  "adm.oDelivery": "Delivery",
  "adm.oPayment": "Payment",
  "adm.oSaved": "Order updated",
  "adm.rApprove": "Approve & publish",
  "adm.rReject": "Reject",
  "adm.rReply": "Reply",
  "adm.rReplySaved": "Reply saved",
  "adm.rModerated": "Review status updated",
  "adm.rFilter": "Filter",
  "adm.uRole": "Role",
  "adm.uPerms": "Permissions",
  "adm.uPermsHint": "Toggle each permission separately. Changes apply immediately.",
  "adm.uAll": "Enable all",
  "adm.uNone": "Disable all",
  "adm.uWalletAdjust": "Adjust wallet balance",
  "adm.uWalletReason": "Reason",
  "adm.uPlusDays": "Plus membership days",
  "adm.uResetPass": "Reset password",
  "adm.uStatus": "Account status",
  "adm.uBlocked": "Blocked",
  "adm.uSaved": "User changes saved",
  "adm.uMakeStaff": "Make staff",
  "adm.cCode": "Code",
  "adm.cType": "Discount type",
  "adm.cValue": "Value",
  "adm.cMax": "Max discount",
  "adm.cMin": "Minimum order",
  "adm.cLimit": "Total usage limit",
  "adm.cPerUser": "Per-user limit",
  "adm.cStart": "Starts",
  "adm.cEnd": "Ends",
  "adm.cUsed": "Used",
  "adm.aSlot": "Placement",
  "adm.aTitle": "Title",
  "adm.aText": "Text",
  "adm.aLink": "Target link",
  "adm.aCta": "Button text",
  "adm.aActive": "Visible",
  "adm.nTitle": "Notification title",
  "adm.nBody": "Notification body",
  "adm.nTarget": "Recipient",
  "adm.nAll": "All users",
  "adm.nOne": "A specific user",
  "adm.nLevel": "Level",
  "adm.nSent": "Notification sent",
  "adm.nOutbox": "SMS & email outbox (demo mode)",
  "adm.sStore": "Store information",
  "adm.sTheme": "Theme",
  "adm.sUi": "Interface layout",
  "adm.mailsms": "Email & SMS",
  "adm.mailCfg": "Mail server (SMTP)",
  "adm.mailEnabled": "Email sending on",
  "adm.mailFrom": "From address",
  "adm.smsCfg": "SMS panel (Kavenegar)",
  "adm.smsEnabled": "SMS sending on",
  "adm.smsKey": "API key",
  "adm.smsSender": "Sender number",
  "adm.console": "System console",
  "adm.consoleHint": "Restart takes a few seconds; the page reloads itself. Resets are irreversible.",
  "adm.sysRestart": "Restart server",
  "adm.sysRestartWarn": "Restart the server now? Users will be disconnected for a few seconds.",
  "adm.sysRestarting": "Restarting\u2026 the page will reload shortly.",
  "adm.sysResetLabel": "Reset sections (irreversible):",
  "adm.sysReset.audit": "Audit log",
  "adm.sysReset.carts": "Guest carts",
  "adm.sysReset.visits": "Visit counters",
  "adm.sysReset.visitors": "Visitors list",
  "adm.secTitle": "Defense & entry queue",
  "adm.secQueueEnabled": "Queue visitors when busy",
  "adm.secQueueDesc": "When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.",
  "adm.secMaxConc": "Max concurrent requests",
  "adm.secTriggerRps": "Requests-per-second trigger",
  "adm.secPassTtl": "Entry pass TTL (minutes)",
  "adm.secPoll": "Queue poll interval (seconds)",
  "adm.secFloodBan": "Auto-ban threshold (requests/minute)",
  "adm.secFloodMin": "Auto-ban duration (minutes)",
  "adm.secSaved": "Defense settings saved.",
  "adm.secInflight": "Active requests",
  "adm.secRps": "Req/sec",
  "adm.secQueued": "In queue",
  "adm.secAutoBans": "Active auto-bans",
  "adm.secTop": "Top talker IPs (last minute)",
  "adm.secPerMin": "Req/min",
  "adm.secTopEmpty": "No unusual traffic recorded.",
  "adm.secBusy": "Busy \u2014 queue active",
  "adm.secNormal": "Normal",
  "adm.banMinutes": "Duration (minutes, 0 = permanent)",
  "adm.banUntil": "Until",
  "adm.banAuto": "auto",
  "adm.resetAudit": "Clear audit logs",
  "adm.resetCarts": "Clear guest carts",
  "adm.resetVisitors": "Clear visitors",
  "adm.resetDone": "Reset done.",
  "adm.resetWarn.audit": "Delete all audit logs?",
  "adm.resetWarn.carts": "Empty all guest carts?",
  "adm.resetWarn.visitors": "Delete the visitors list?",
  "adm.resetWarn.visits": "Zero the visit counters?",
  "adm.visitors": "Visitors",
  "adm.uDevice": "Device / IP",
  "adm.uBrowser": "Browser",
  "adm.uRegion": "Region / time",
  "adm.uPath": "Path",
  "adm.guest": "Guest",
  "adm.bans": "Bans (block / unblock)",
  "adm.banType": "Type",
  "adm.banValue": "Value (IP / phone / email / username)",
  "adm.banReason": "Reason",
  "adm.ban": "Ban",
  "adm.unban": "Unban",
  "adm.banned": "Banned",
  "adm.banDone": "Banned.",
  "adm.unbanDone": "Unbanned.",
  "adm.bansEmpty": "Nobody is banned right now.",
  "adm.banByAdmin": "By admin",
  "adm.channels": "Channels",
  "adm.chSite": "In-site notification",
  "adm.chTelegram": "Telegram bot",
  "adm.chEmail": "Email",
  "adm.chSms": "SMS",
  "adm.channelsHint": "Email/SMS need settings below; without them only ready channels send.",
  "adm.telegram": "Telegram bot",
  "adm.tgHint": "Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.",
  "adm.tgEnabled": "Bot on",
  "adm.tgToken": "Bot token",
  "adm.tgTokenHint": "Like 123456:ABC-\u2026",
  "adm.tgWelcome": "/start welcome message",
  "adm.tgTest": "Test send",
  "adm.tgInbox": "Inbox",
  "adm.tgSubs": "Subscribers",
  "adm.tgReplyPh": "Reply to this user\u2026",
  "adm.tgInboxEmpty": "No messages yet.",
  "adm.lottery": "Lottery",
  "adm.lotteryNew": "New draw",
  "adm.lotPrize": "Prize",
  "adm.lotEnds": "Ends",
  "adm.lotWinners": "Winners count",
  "adm.lotWinnersList": "Winners",
  "adm.lotMode": "Entry mode",
  "adm.lotModeOrders": "Automatic from orders",
  "adm.lotModeManual": "Manual join button",
  "adm.lotEntries": "Entries",
  "adm.lotRun": "Draw now",
  "adm.lotRunWarn": "Winners are picked randomly and notified now. Continue?",
  "adm.lotDone": "Draw done",
  "adm.lotClose": "Close",
  "adm.lotClosed": "Draw closed.",
  "adm.lotEmpty": "No draws yet.",
  "lot.title": "Yassaei Electronics lottery",
  "lot.nav": "Lottery",
  "lot.soon": "Coming soon \u2014 stay tuned!",
  "lot.done": "Past draws",
  "lot.winners": "Winners",
  "lot.active": "Active",
  "lot.prize": "Prize",
  "lot.ends": "Ends",
  "lot.entries": "Entries",
  "lot.joined": "You are in this draw.",
  "lot.join": "Join draw",
  "lot.joinDone": "Entry recorded \u2014 good luck!",
  "lot.autoEntry": "Every valid order in the draw window counts automatically.",
  "contact.phone3": "Third phone",
  "adm.sBackups": "Backups & dump",
  "adm.backupNow": "Backup now",
  "adm.backupsHint": "A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.",
  "adm.backupsEmpty": 'No snapshot yet; hit "Backup now".',
  "adm.backupSize": "Size",
  "adm.backupRestore": "Restore",
  "adm.backupRestoreWarn": "All current data will be replaced by this snapshot. Sure?",
  "adm.backupDone": "Backup created.",
  "adm.backupRestored": "Restore done; reloading.",
  "adm.dumpFull": "Full site dump",
  "adm.sFeatures": "Features",
  "adm.sShipping": "Shipping",
  "adm.sPlus": "Plus",
  "adm.sOrders": "Orders & payment",
  "adm.sSeo": "SEO",
  "adm.sAuth": "Authentication",
  "adm.sSaved": "Settings saved",
  "adm.tAccent": "Primary colour",
  "adm.tPort": "Port theme (waves, boat and palm in the background)",
  "adm.tPortHint": "Turn it off for a plain neutral background.",
  "adm.tMode": "Default theme",
  "adm.tRadius": "Corner radius",
  "adm.tDensity": "Density",
  "adm.tBg": "Background style",
  "adm.tContrast": "Contrast",
  "adm.tAnim": "Animations",
  "adm.uSearchPos": "Search box position",
  "adm.uHeader": "Header layout",
  "adm.uNav": "Menu style",
  "adm.uCards": "Product card style",
  "adm.uSticky": "Sticky header",
  "adm.uTicker": "Top ticker bar",
  "adm.uTickerItems": "Ticker messages",
  "adm.uTickerSpeed": "Ticker speed",
  "adm.uQuick": "Product quick view",
  "adm.uChat": "Floating support button",
  "adm.uCrumb": "Show breadcrumbs",
  "adm.uCols": "Product columns",
  "adm.uColsMobile": "Mobile",
  "adm.uColsTablet": "Tablet",
  "adm.uColsDesktop": "Desktop",
  "adm.uColsWide": "Wide screen",
  "adm.uCardInfo": "Info shown on product cards",
  "adm.uPosStart": "Right (start)",
  "adm.uPosCenter": "Center",
  "adm.uPosEnd": "Left (end)",
  "adm.uLayoutLogoStart": "Logo at start",
  "adm.uLayoutSplit": "Logo start / search center / actions end",
  "adm.uLayoutCentered": "Logo centered",
  "adm.fHint": "Turn off any feature you do not need; its section disappears from the site and panel.",
  "adm.bLabel": "Label printing",
  "adm.bSelect": "Select products",
  "adm.bSize": "Label size",
  "adm.bCopies": "Copies per product",
  "adm.bShowName": "Product name",
  "adm.bShowPrice": "Price",
  "adm.bShowBrand": "Brand",
  "adm.bShowSku": "SKU",
  "adm.bShowQr": "Product page QR code",
  "adm.bType": "Barcode type",
  "adm.bPrint": "Print labels",
  "adm.bGenerate": "Generate new barcode",
  "adm.igPack": "Instagram post pack",
  "adm.igCap": "Caption (editable before copy)",
  "adm.igTags": "Hashtags",
  "adm.igImgHint": "Post image; download it and publish with the caption.",
  "adm.igDl": "Download image",
  "adm.igNoImg": "This product has no image yet; add one via upload or image search first.",
  "adm.igCopyCap": "Copy caption",
  "adm.igCopyTags": "Copy hashtags",
  "adm.igCopyAll": "Copy caption + tags",
  "adm.bGenerated": "Barcode generated and assigned",
  "adm.bScan": "Scan barcode",
  "adm.bScanMode": "Scanner mode (device sync)",
  "adm.bScanHint": "Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.",
  "adm.bConnected": "Device connected \u2014 ready to scan",
  "adm.bSerial": "Direct connection via Web Serial",
  "adm.bSerialHint": "If your device has a serial/USB port, connect here (desktop Chrome/Edge only).",
  "adm.bSerialUnsupported": "Your browser does not support Web Serial; use keyboard or camera mode.",
  "adm.bSerialConnected": "Connected",
  "adm.bSerialClosed": "Connection closed",
  "adm.bHistory": "Recent scans",
  "adm.isTitle": "Image index for visual search",
  "adm.isHint": "Build the index once so customers can search by photo. It runs in your browser and adds no server load.",
  "adm.isBuild": "Build index",
  "adm.isBuilding": "Indexing\u2026",
  "adm.isDone": "Index built",
  "adm.isCount": "Indexed images",
  "adm.auditAction": "Event",
  "adm.auditActor": "User",
  "adm.auditTarget": "Target",
  "adm.auditMeta": "Details",
  "adm.statsRevenue": "Revenue",
  "adm.statsVisits": "Visits",
  "adm.statsOrders": "Orders",
  "adm.statsByCat": "Category performance",
  "adm.statsByBrand": "Sales by brand",
  "adm.statsStockValue": "Inventory value",
  "adm.statsAvgOrder": "Average basket",
  "adm.exportProducts": "Export products",
  "adm.exportOrders": "Export orders",
  "adm.exportUsers": "Export users",
  "adm.exportReviews": "Export reviews",
  "adm.exportTickets": "Export tickets",
  "adm.exportAudit": "Export events",
  "adm.exportAll": "Full backup (JSON)",
  "adm.backup": "Create backup now",
  "adm.backupDone": "Backup created",
  "adm.cleanup": "Clean old data",
  "adm.cleanupDone": "Cleanup done",
  "adm.pageEditHint": "Edit page texts here; changes apply to the site immediately.",
  "adm.noPermission": "You do not have permission for this section. Ask the owner to grant it.",
  "adm.liveView": "Live preview of changes",
  "adm.saved": "Saved",
  "st.pending_payment": "Pending payment",
  "st.pending_review": "Pending review",
  "st.confirmed": "Confirmed",
  "st.preparing": "Preparing",
  "st.ready_pickup": "Ready for pickup",
  "st.shipped": "Shipped",
  "st.delivered": "Delivered",
  "st.cancelled": "Cancelled",
  "st.refunded": "Refunded",
  "st.returned": "Returned",
  "dl.pickup": "In-store pickup",
  "dl.courier": "Postal shipping",
  "pm.wallet": "Wallet",
  "pm.gateway": "Bank gateway",
  "pm.cod": "Cash on delivery",
  "ps.unpaid": "Unpaid",
  "ps.paid": "Paid",
  "ps.pending": "Pending",
  "ps.refunded": "Refunded",
  "ps.failed": "Failed",
  "ps.cancelled": "Cancelled",
  "tc.order": "Order tracking",
  "tc.return": "Return & refund",
  "tc.product": "Product question",
  "tc.technical": "Technical issue",
  "tc.complaint": "Complaint",
  "tc.partnership": "Partnership & advertising",
  "tc.account": "Account & security",
  "tc.other": "Other",
  "tp.critical": "Critical",
  "tp.high": "High",
  "tp.normal": "Normal",
  "tp.low": "Low",
  "ft.suggestion": "Suggestion",
  "ft.complaint": "Complaint",
  "ft.bug": "Bug report",
  "fs.new": "New",
  "fs.seen": "Seen",
  "fs.in_progress": "In progress",
  "fs.done": "Done",
  "fs.rejected": "Rejected",
  "tk.open": "Open",
  "tk.answered": "Answered",
  "tk.closed": "Closed",
  "feat.wallet": "Wallet",
  "feat.plus": "Plus membership",
  "feat.insurance": "Shipment insurance",
  "feat.tickets": "Ticket system",
  "feat.reviews": "Customer reviews",
  "feat.questions": "Customer questions",
  "feat.ads": "On-site ads",
  "feat.imageSearch": "Image search",
  "feat.barcode": "Barcode & labels",
  "feat.priceCheckDevice": "Price display mode",
  "feat.publicStats": "Public statistics",
  "feat.coupons": "Coupons",
  "feat.consent": "Cookie consent modal (first visit)",
  "feat.liveSupport": "Live chat support",
  "feat.announcements": "Notifications",
  "feat.wishlist": "My list",
  "feat.compare": "Product comparison",
  "feat.recentlyViewed": "Recently viewed",
  "feat.guestCheckout": "Guest checkout",
  "feat.priceAlerts": "Restock alerts",
  "feat.twoFactor": "Two-factor login",
  "feat.referrals": "Referral codes",
  "feat.voiceSearch": "Voice search",
  "feat.offlineMode": "Offline mode",
  "feat.captcha": "Captcha (I'm not a robot)",
  "captcha.required": "Prove you are human first: tick the box and solve the math.",
  "captcha.label": "I'm not a robot",
  "captcha.hint": "Tick it, then solve the tiny math image",
  "captcha.placeholder": "Answer",
  "captcha.solved": "Human verified \u2714",
  "captcha.refresh": "New challenge",
  "perm.dashboard.view": "View dashboard",
  "perm.products.view": "View products",
  "perm.products.create": "Create product",
  "perm.products.edit": "Edit product",
  "perm.products.delete": "Delete product",
  "perm.products.price": "Change price & discount",
  "perm.products.stock": "Change stock",
  "perm.categories.manage": "Manage categories & brands",
  "perm.orders.view": "View orders",
  "perm.orders.manage": "Change order status",
  "perm.refunds.manage": "Refunds & cancellation",
  "perm.reviews.moderate": "Moderate reviews",
  "perm.reviews.reply": "Reply to reviews",
  "perm.tickets.manage": "Manage tickets",
  "perm.feedback.manage": "Feedback & bugs",
  "perm.users.view": "View users",
  "perm.users.manage": "Manage users",
  "perm.users.permissions": "Assign permissions",
  "perm.wallet.manage": "Wallet management",
  "perm.plus.manage": "Plus membership",
  "perm.coupons.manage": "Coupons",
  "perm.ads.manage": "Manage ads",
  "perm.notifications.send": "Send notifications",
  "perm.settings.edit": "Store settings",
  "perm.theme.edit": "Theme & layout",
  "perm.pages.edit": "Edit page content",
  "perm.barcode.print": "Print labels",
  "perm.barcode.scan": "Scan & price display",
  "perm.imagesearch.index": "Image index",
  "perm.audit.view": "Audit log",
  "perm.stats.view": "Statistics",
  "perm.data.export": "Export data",
  "misc.quickView": "Quick view",
  "misc.addToHome": "Add to home screen",
  "misc.installHint": 'In your browser menu, choose "Add to Home screen" or "Install".',
  "misc.printBlocked": "The print dialog did not open; please allow pop-ups.",
  "misc.saved": "Saved",
  "misc.deleted": "Deleted",
  "misc.updated": "Updated",
  "misc.confirmDelete": "Delete this item?",
  "misc.loadingMore": "Loading\u2026",
  "misc.recentlyViewed": "Recently viewed",
  "misc.uiSound": "UI click sound",
  "misc.uiSoundOn": "Click sound on",
  "misc.uiSoundOff": "Click sound off",
  "misc.shareDone": "Link copied",
  "misc.shareNative": "Share",
  "img.alt": "Product image",
  "adm.view": "View",
  "adm.support": "Support chat",
  "adm.supSelect": "Select a conversation",
  "adm.supSelectHint": "Pick a thread from the list to reply.",
  "adm.tkReply": "Support reply",
  "adm.tkManage": "Ticket management",
  "common.updated": "Updated",
  "common.link": "Link",
  "common.text": "Text",
  "cart.coupon": "Coupon code",
  "misc.sent": "Sent",
  "misc.copied": "Copied",
  "adm.revPending": "Pending",
  "adm.revApproved": "Approved",
  "adm.revRejected": "Rejected",
  "adm.revApprove": "Approve",
  "adm.revReject": "Reject",
  "adm.revReply": "Shop reply",
  "adm.revEmpty": "Nothing in this state",
  "adm.revEmptyHint": "No new reviews or questions to moderate.",
  "rev.buyer": "Buyer",
  "rev.visitor": "Visitor",
  "rev.shopReply": "Shop reply",
  "fb.new": "New",
  "fb.seen": "Seen",
  "fb.inProgress": "In progress",
  "fb.done": "Done",
  "fb.rejected": "Rejected",
  "feedback.suggestion": "Suggestion",
  "feedback.complaint": "Complaint",
  "feedback.bug": "Bug report",
  "adm.fbEmptyHint": "No suggestions, complaints or bug reports yet.",
  "adm.cpNew": "New coupon",
  "adm.cpPercent": "Percent",
  "adm.cpAmount": "Fixed amount",
  "adm.cpValue": "Value",
  "adm.cpUsage": "Usage",
  "adm.cpDates": "Validity",
  "adm.cpStart": "Starts",
  "adm.cpEnd": "Ends",
  "adm.cpExpired": "Expired",
  "adm.adNew": "New banner",
  "adm.adSlot": "Placement slot",
  "adm.adsHint": "Schedule, enable or disable banners anywhere on the site.",
  "adm.notifNew": "New notification",
  "adm.notifHint": "Send a notification to everyone or to one user.",
  "adm.notifLevel": "Level",
  "adm.notifRecent": "Recent notifications",
  "notif.level.info": "Info",
  "notif.level.success": "Success",
  "notif.level.warning": "Warning",
  "notif.level.error": "Error",
  "adm.pagesPick": "Pick a page",
  "adm.pagesPickHint": "Choose a page from the list to edit its content.",
  "adm.pgHint": "Changes are text-only and apply immediately.",
  "adm.bPrinter": "Label printer",
  "adm.bPrinterHint": "Labels go to the printer through the browser print dialog.",
  "adm.bScanner": "Barcode scanner",
  "adm.bLabels": "Build & print labels",
  "adm.bPreview": "Label preview",
  "adm.bPriceMode": "Price display mode",
  "adm.bFound": "Product found",
  "adm.bNotFound": "No product with this barcode.",
  "adm.bPickFirst": "Select at least one product first.",
  "adm.ixHint": "Image fingerprints are computed in the browser so visual search works.",
  "adm.ixIndex": "Index remaining images",
  "adm.ixReindex": "Re-index all",
  "adm.ixDone": "Indexing done",
  "adm.audActor": "Actor",
  "adm.audAction": "Action",
  "adm.audTarget": "Target",
  "adm.audMeta": "Details",
  "adm.stOrders": "Orders",
  "adm.stRevenue": "Revenue",
  "adm.stVisits": "Visits",
  "adm.stUsers": "Users",
  "adm.stProducts": "Products",
  "adm.stAvg": "Average order",
  "adm.stByCat": "Category performance",
  "adm.stByBrand": "Top brands",
  "adm.data": "Data",
  "adm.dataHint": "Export, back up and clean up data.",
  "adm.dExport": "Export",
  "adm.dBackup": "Backup",
  "adm.dBackupHint": "A full copy of the database is saved in the data folder.",
  "adm.dCleanup": "Cleanup",
  "adm.dCleanupHint": "Audit entries older than 90 days and expired sessions are removed.",
  "sys.turnOn": "Turn the store on",
  "sys.turnOff": "Turn the store off",
  "sys.offConfirm": "Are you sure? Nobody can buy until you turn it back on.",
  "sys.autoWakeMins": "Auto turn-on after minutes (0 = never)",
  "sys.asleep": "The store is now off.",
  "sys.asleepTimed": "The store is off; it turns back on automatically in {n} minutes.",
  "sys.awake": "The store is on.",
  "sys.sleepBanner": "The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.",
  "sys.keepAlive": "Keep the service warm",
  "checkout.guestInfo": "Guest contact details",
  "checkout.guestHint": "You can buy without an account; we only need this to coordinate delivery.",
  "checkout.guestName": "Full name",
  "checkout.guestPhone": "Mobile number",
  "checkout.guestPhoneHint": "e.g. 09123456789",
  "checkout.guestNameRequired": "Please enter your name.",
  "checkout.guestPhoneInvalid": "Mobile number must be 11 digits starting with 09.",
  "checkout.guestCodPickup": "Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.",
  "home.recent": "Continue where you left off",
  "home.recentSub": "Products you viewed recently",
  "checkout.guestCourierNote": "Sign in for courier delivery"
};
var DICTS = { fa, en };
var LANG = "fa";
var missing = /* @__PURE__ */ new Set();
var lang = () => LANG;
var isFa = () => LANG === "fa";
function t(key, params) {
  const dict = DICTS[LANG] || fa;
  let s = dict[key];
  if (s === void 0) {
    s = fa[key];
    if (s === void 0) {
      if (!missing.has(key)) {
        missing.add(key);
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") console.warn("[i18n] missing key:", key);
      }
      s = key;
    }
  }
  if (params) for (const [k, v] of Object.entries(params)) s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  return s;
}

// public/js/lib/api.mjs
var ApiError = class extends Error {
  constructor(status, code, message, details) {
    super(message || code || "error");
    this.status = status;
    this.code = code;
    this.details = details;
  }
};
function getCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}
var EN_MESSAGES = {
  login_required: "Please sign in to continue.",
  store_asleep: "The store is temporarily turned off.",
  unauthorized: "Authentication failed.",
  forbidden: "You do not have access to this section.",
  csrf_failed: "Security token expired. Please refresh the page.",
  too_many_requests: "Too many requests. Please wait a moment.",
  not_found: "Not found.",
  product_not_found: "Product not found.",
  order_not_found: "Order not found.",
  invalid_credentials: "Incorrect username or password.",
  invalid_code: "The verification code is not valid.",
  invalid_phone: "Invalid mobile number.",
  invalid_email: "Invalid email address.",
  weak_password: "Password is too weak. Use upper/lower case letters, digits and symbols.",
  stock_limit: "Not enough stock for this quantity.",
  empty_cart: "Your cart is empty.",
  insufficient_balance: "Wallet balance is not enough.",
  account_exists: "This account already exists.",
  username_taken: "This username is taken.",
  phone_taken: "This phone number is already registered.",
  email_taken: "This email is already registered.",
  terms_required: "You must accept the terms and conditions.",
  rules_required: "You must accept the ticket rules.",
  address_required: "Please add a shipping address first.",
  already_submitted: "You have already submitted this.",
  payload_too_large: "The uploaded data is too large.",
  invalid_type: "Only image files are allowed.",
  server_error: "Internal server error. Please try again.",
  product_unavailable: "One of the items in your cart is no longer available.",
  cannot_cancel: "This order cannot be cancelled in its current state.",
  account_blocked: "This account is blocked. Please contact support.",
  disabled: "This feature is currently disabled.",
  queued: "The site is busy. You are in the entry queue\u2026",
  banned: "Access is blocked. Please contact support."
};
var qEl = null;
var qWaiting = null;
function showQueueOverlay(pos) {
  if (!qEl) {
    qEl = document.createElement("div");
    qEl.className = "bm-queue-overlay";
    qEl.setAttribute("role", "status");
    qEl.innerHTML = '<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>';
    document.documentElement.appendChild(qEl);
  }
  const en2 = document.documentElement.lang === "en";
  qEl.querySelector(".bm-q-title").textContent = en2 ? "Site is busy \u2014 you are in the queue" : "\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC";
  qEl.querySelector(".bm-q-pos").textContent = en2 ? `Your turn: ${pos > 0 ? pos : "\u2026"}` : `\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${pos > 0 ? pos : "\u2026"}`;
  qEl.querySelector(".bm-q-note").textContent = en2 ? "Continues automatically when it is your turn\u2026" : "\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026";
}
function hideQueueOverlay() {
  if (qEl) {
    qEl.remove();
    qEl = null;
  }
}
async function waitForQueuePass(info = {}) {
  if (!qWaiting) {
    qWaiting = (async () => {
      showQueueOverlay(Number(info.pos) || 0);
      const poll = Math.max(2, Math.min(20, Number(info.pollSec) || 4)) * 1e3;
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, poll));
        try {
          const res = await fetch("/api/queue/status", { credentials: "same-origin", headers: { Accept: "application/json" } });
          const d = await res.json();
          if (d?.state === "pass") {
            hideQueueOverlay();
            return true;
          }
          if (d?.state === "queued") showQueueOverlay(Number(d.pos) || 0);
        } catch {
        }
      }
      hideQueueOverlay();
      return false;
    })().finally(() => {
      qWaiting = null;
    });
  }
  return qWaiting;
}
var busy = 0;
var listeners = /* @__PURE__ */ new Set();
function setLoading(v) {
  busy = Math.max(0, busy + (v ? 1 : -1));
  for (const fn of listeners) {
    try {
      fn(busy > 0);
    } catch {
    }
  }
}
async function request(method, path, body, opts = {}) {
  if (typeof navigator !== "undefined" && !navigator.onLine && method !== "GET") {
    throw new ApiError(0, "offline", "\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.", "You are offline.");
  }
  setLoading(true);
  const headers = { ...opts.headers || {} };
  if (body !== void 0 && body !== null) headers["Content-Type"] = "application/json";
  if (method !== "GET") {
    const csrf = getCookie("bm_csrf");
    if (csrf) headers["X-CSRF-Token"] = csrf;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 25e3);
  try {
    const res = await fetch(path, {
      method,
      headers,
      signal: ctrl.signal,
      credentials: "same-origin",
      body: body === void 0 || body === null ? void 0 : JSON.stringify(body)
    });
    let data = null;
    const text = await res.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text.slice(0, 300) };
      }
    }
    if (res.status === 403 && data?.code === "csrf_failed" && !opts._retried) {
      await fetch("/api/bootstrap", { credentials: "same-origin" }).catch(() => {
      });
      return request(method, path, body, { ...opts, _retried: true });
    }
    if (res.status === 503 && data?.code === "queued" && !opts._queueRetried) {
      const passed = await waitForQueuePass(data?.details || {});
      if (passed) return request(method, path, body, { ...opts, _queueRetried: true });
    }
    if (!res.ok || data?.ok === false) {
      const code = data?.code || "error";
      throw new ApiError(res.status || 500, code, data?.message || EN_MESSAGES[code] || "\u062E\u0637\u0627", EN_MESSAGES[code]);
    }
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === "AbortError") throw new ApiError(408, "timeout", "\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.", "Request timed out.");
    throw new ApiError(0, "network", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.", "Network error.");
  } finally {
    clearTimeout(timer);
    setLoading(false);
  }
}
var withQuery = (path, params) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params || {})) {
    if (v === void 0 || v === null || v === "") continue;
    u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `${path}${path.includes("?") ? "&" : "?"}${s}` : path;
};
var api = {
  url: withQuery,
  get: (p, o) => request("GET", p, void 0, o),
  post: (p, b, o) => request("POST", p, b ?? {}, o),
  patch: (p, b, o) => request("PATCH", p, b ?? {}, o),
  del: (p, b, o) => request("DELETE", p, b, o),
  put: (p, b, o) => request("PUT", p, b ?? {}, o),
  upload: (dataUrl) => request("POST", "/api/upload", { data: dataUrl }, { timeout: 6e4 })
};

// public/js/state.mjs
init_dom();
var S = {
  ready: false,
  serverTime: null,
  sleeping: false,
  sleepSince: null,
  settings: null,
  categories: [],
  brands: [],
  me: null,
  stats: null,
  ads: [],
  ticker: [],
  orderStatuses: [],
  ticketCategories: [],
  ticketPriorities: [],
  cart: { items: [], count: 0, subtotal: 0, weight: 0, coupon: null },
  wishlist: [],
  compare: [],
  alerts: [],
  notifications: [],
  unread: 0,
  recent: [],
  searches: [],
  prefs: { theme: "dark", locale: "fa", density: "normal", reduceMotion: false, view: "grid" },
  consent: null,
  online: typeof navigator !== "undefined" ? navigator.onLine : true,
  installPrompt: null,
  installed: false
};
var store = () => S.settings?.store || {};
var ui = () => S.settings?.ui || {};
var feat = (k) => S.settings?.features?.[k] !== false;
var plusCfg = () => S.settings?.plus || {};
var isPlus = () => !!(S.me?.plus?.active && S.me?.plus?.until && new Date(S.me.plus.until) > /* @__PURE__ */ new Date());
var catName = (c) => lang() === "fa" ? c?.name || "" : c?.nameEn || c?.name || "";
var brandName = (b) => lang() === "fa" ? b?.name || "" : b?.nameEn || b?.name || "";
var prodName = (p) => lang() === "fa" ? p?.name || "" : p?.nameEn || p?.name || "";
var adInSlot = (slot) => feat("ads") ? S.ads.filter((a) => a.slot === slot && a.active !== false) : [];

// public/js/components.mjs
init_dom();
init_dom();

// public/js/ui.mjs
init_dom();
var layerStack = [];
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && layerStack.length) {
    const top = layerStack[layerStack.length - 1];
    if (top.dismissible !== false) {
      e.preventDefault();
      top.close(null);
    }
  }
});
function enhancePwd(root) {
  root.querySelectorAll?.('input[type="password"]')?.forEach((inp) => {
    if (inp.dataset.pwdDone) return;
    inp.dataset.pwdDone = "1";
    const wrap = document.createElement("span");
    wrap.className = "pwd-wrap";
    inp.parentNode.insertBefore(wrap, inp);
    wrap.appendChild(inp);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pwd-eye";
    btn.dataset.eye = "1";
    btn.setAttribute("aria-label", t("pwd.show"));
    btn.title = t("pwd.show");
    btn.innerHTML = icon("eye");
    wrap.appendChild(btn);
  });
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest?.("[data-eye]");
  if (!btn) return;
  const inp = btn.parentElement?.querySelector("input");
  if (!inp) return;
  const show = inp.type === "password";
  inp.type = show ? "text" : "password";
  btn.innerHTML = icon(show ? "eye-off" : "eye");
  const lbl = show ? t("pwd.hide") : t("pwd.show");
  btn.setAttribute("aria-label", lbl);
  btn.title = lbl;
  inp.focus({ preventScroll: true });
}, true);
new MutationObserver((muts) => {
  for (const m of muts) m.addedNodes.forEach((n) => {
    if (n.nodeType === 1) enhancePwd(n);
  });
}).observe(document.documentElement, { childList: true, subtree: true });
enhancePwd(document);
var _ac = null;
function uiClickSound(force = false) {
  if (!force && !uiSoundEnabled()) return;
  try {
    _ac = _ac || new (window.AudioContext || window.webkitSoundContext || window.webkitAudioContext)();
    if (_ac.state === "suspended") _ac.resume();
    const t0 = _ac.currentTime;
    const o = _ac.createOscillator();
    const g = _ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1560, t0);
    o.frequency.exponentialRampToValueAtTime(1180, t0 + 0.06);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(0.045, t0 + 8e-3);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + 0.075);
    o.connect(g).connect(_ac.destination);
    o.start(t0);
    o.stop(t0 + 0.09);
  } catch {
  }
}
function uiSoundEnabled() {
  try {
    return !!JSON.parse(localStorage.getItem("bm_prefs_v1") || "{}").uiSound;
  } catch {
    return false;
  }
}
document.addEventListener("pointerdown", (e) => {
  if (!uiSoundEnabled()) return;
  if (e.target.closest?.('button, a, [role="button"], .pcard, .chip, .gal-thumb')) uiClickSound(true);
}, true);

// public/js/components.mjs
function productImage(p, cls = "") {
  const src = p.images && p.images[0] || "";
  const alt = prodName(p) || t("img.alt");
  if (src) return html`<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" decoding="async" data-glyph="${p.glyph || "misc"}">`;
  return raw(`<svg class="ic ph-img ${cls}" data-glyph="${esc(p.glyph || "misc")}" role="img" aria-label="${esc(alt)}"><use href="#i-${catIcon(p.glyph || "misc")}"/></svg>`);
}
function productCard(p, { quick = null } = {}) {
  const showBrand = (ui().productCardInfo || []).includes("brand");
  const showStock = (ui().productCardInfo || []).includes("stock");
  const showRating = (ui().productCardInfo || []).includes("rating");
  const showQuick = quick !== null ? quick : feat("compare") || ui().quickView !== false;
  const stock = p.stock ?? 0;
  const stockCls = stock <= 0 ? "out" : stock <= 3 ? "low" : "";
  return html`
  <article class="pcard" data-pid="${p.id}">
    <div class="pc-media">
      <a href="#/product/${p.id}" aria-label="${prodName(p)}">${productImage(p)}</a>
      <div class="ribbon">
        ${p.discountPct > 0 ? html`<span class="badge-pill bp-danger">${fmtNum(p.discountPct)}٪ ${t("pdp.off")}</span>` : ""}
        ${stock <= 0 ? html`<span class="badge-pill bp-muted">${t("card.outOfStock")}</span>` : ""}
        ${p.featured ? html`<span class="badge-pill bp-accent">${icon("star")} ${t("home.featured")}</span>` : ""}
      </div>
      <div class="pc-quick">
        ${ui().quickView !== false ? html`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${p.id}" title="${t("card.quickView")}" aria-label="${t("card.quickView")}">${icon("eye")}</button>` : ""}
        ${feat("wishlist") ? html`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${p.id}" title="${t("card.wishlistAdd")}" aria-label="${t("card.wishlistAdd")}">${icon("heart")}</button>` : ""}
        ${feat("compare") ? html`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${p.id}" title="${t("card.compareAdd")}" aria-label="${t("card.compareAdd")}">${icon("compare")}</button>` : ""}
      </div>
    </div>
    <div class="pc-body">
      ${showBrand && p.brandName ? html`<span class="pc-brand">${lang() === "fa" ? p.brandName : p.brandNameEn || p.brandName}</span>` : ""}
      <h3 class="pc-name"><a href="#/product/${p.id}">${prodName(p)}</a></h3>
      ${showRating && p.ratingCount > 0 ? html`<div class="pc-rate">${stars(p.ratingAvg)} <span>${fmtNum(p.ratingAvg)} (${fmtNum(p.ratingCount)})</span></div>` : ""}
      ${showStock ? html`<div class="pc-stock ${stockCls}"><span class="dot"></span>${stock <= 0 ? t("card.outOfStock") : stock <= 3 ? t("common.lowStock") : t("common.inStock")}</div>` : ""}
      <div class="pc-price">
        ${p.oldPrice > p.price ? html`<span class="pc-old">${fmtMoney(p.oldPrice)}</span>` : ""}
        ${p.price ? html`<span class="pc-now">${fmtMoney(p.price)}</span>` : html`<span class="pc-now pc-inquire">${t("price.inquire")}</span>`}
      </div>
      <div class="pc-actions">
        ${p.price ? html`<button type="button" class="btn btn-primary" data-act="add-cart" data-id="${p.id}" ${stock <= 0 ? "disabled" : ""}>${icon("cart")} ${t("card.addToCart")}</button>` : html`<a class="btn btn-outline" href="#/product/${p.id}">${icon("phone")} ${t("price.inquireShort")}</a>`}
      </div>
    </div>
  </article>`;
}
var productGrid = (items, opts) => html`<div class="pgrid">${items.map((p) => productCard(p, opts))}</div>`;
function catCard(c, count = null) {
  return html`
    <a class="cat-card" href="#/category/${c.id}">
      <span class="cat-ic">${icon(catIcon(c.glyph))}</span>
      <span class="cat-name">${catName(c)}</span>
      ${count !== null ? html`<span class="cat-count">${fmtNum(count)} ${t("catalog.count")}</span>` : ""}
    </a>`;
}
function bannerHtml(ad) {
  const title2 = lang() === "en" && ad.titleEn ? ad.titleEn : ad.title;
  const text = lang() === "en" && ad.textEn ? ad.textEn : ad.text;
  const cta = lang() === "en" && ad.ctaEn ? ad.ctaEn : ad.cta;
  return html`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${title2}</div>
        ${text ? html`<div class="banner-text">${text}</div>` : ""}
      </div>
      ${ad.link ? html`<a class="btn btn-primary banner-cta" href="${ad.link.startsWith("#") || ad.link.startsWith("/") ? ad.link : "#/"}">${cta || t("common.more")} ${icon("chevron-left")}</a>` : ""}
    </div>`;
}
var bannerSlot = (slot, ads, extraClass = "") => {
  const list = (ads || []).filter((a) => a.slot === slot);
  if (!list.length) return "";
  return html`<div class="${extraClass} banner-grid mt">${list.map(bannerHtml)}</div>`;
};
function sectionHead({ titleIcon = "", title: title2 = "", sub = "", link = null, linkLabel = "" }) {
  return html`
    <div class="section-head">
      <div>
        <h2 class="section-title">${titleIcon ? icon(titleIcon) : ""}${title2}</h2>
        ${sub ? html`<p class="section-sub">${sub}</p>` : ""}
      </div>
      ${link ? html`<a class="section-link" href="${link}">${linkLabel || t("common.showAll")} ${icon("chevron-left")}</a>` : ""}
    </div>`;
}
function statCard({ icon: ic = "box", label = "", value = "", sub = "" }) {
  return html`
    <div class="stat-card">
      <span class="stat-ic">${icon(ic)}</span>
      <div><div class="stat-val">${value}</div><div class="stat-lbl">${label}</div>${sub ? html`<div class="tiny muted">${sub}</div>` : ""}</div>
    </div>`;
}
function minimapSvg() {
  const fa2 = isFa();
  return html`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${t("contact.mapTitle")}">
      <rect class="mm-bg" width="640" height="360"/>
      <!-- دریا -->
      <path class="mm-sea" d="M0 292c60-14 120 10 180 2s110-24 170-14 130 26 190 12 100-18 100-18V360H0Z"/>
      <g class="mm-wave" fill="none">
        <path d="M28 316c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M250 330c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M470 318c14-8 26 8 40 0s26 8 40 0"/>
      </g>
      <!-- بلوک‌های شهری -->
      <g class="mm-block">
        <rect x="36" y="34" width="150" height="86" rx="10"/>
        <rect x="238" y="34" width="120" height="60" rx="10"/>
        <rect x="452" y="34" width="150" height="86" rx="10"/>
        <rect x="36" y="176" width="110" height="70" rx="10"/>
        <rect x="452" y="176" width="150" height="70" rx="10"/>
      </g>
      <!-- خیابان‌ها -->
      <g class="mm-road" fill="none">
        <path d="M0 148h640"/>
        <path d="M0 268h640"/>
        <path d="M204 0v292"/>
        <path d="M420 0v292"/>
      </g>
      <g class="mm-road-thin" fill="none">
        <path d="M312 148v120"/>
      </g>
      <!-- پاساژ مغازه -->
      <g>
        <rect class="mm-shop" x="238" y="176" width="150" height="70" rx="10"/>
        <text class="mm-txt mm-txt-b" x="313" y="205" text-anchor="middle">${fa2 ? "\u0628\u0648\u0631\u0633 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0647\u0641\u062A\u200C\u062D\u0648\u0636" : "Haft-Hoz Electronics Bourse"}</text>
        <text class="mm-txt" x="313" y="226" text-anchor="middle">${fa2 ? "\u0637\u0628\u0642\u0647\u0654 \u062F\u0648\u0645\u060C \u067E\u0644\u0627\u06A9 \u06F2\u06F4" : "2nd floor, No. 24"}</text>
      </g>
      <!-- نام خیابان‌ها -->
      <text class="mm-txt" x="24" y="140">${fa2 ? "\u062E\u06CC\u0627\u0628\u0627\u0646 \u0633\u0627\u062D\u0644\u06CC" : "Saheli St."}</text>
      <text class="mm-txt" x="446" y="140">${fa2 ? "\u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636" : "Haft-Hoz Square"}</text>
      <text class="mm-txt mm-vert" x="196" y="60" transform="rotate(90 196 60)">${fa2 ? "\u0628\u0644\u0648\u0627\u0631 \u062A\u0647\u0631\u0627\u0646" : "Port Blvd."}</text>
      <!-- نشان مغازه -->
      <g transform="translate(313 176)">
        <circle class="mm-pulse" r="26"/>
        <path class="mm-accent" d="M0-34c11 0 19 8 19 19 0 14-19 31-19 31S-19-1-19-15c0-11 8-19 19-19Z"/>
        <circle class="mm-pin" cx="0" cy="-15" r="7"/>
      </g>
      <g class="mm-tag">
        <rect x="330" y="120" rx="12" width="${fa2 ? 92 : 74}" height="26"/>
        <text x="${fa2 ? 376 : 367}" y="137" text-anchor="middle">${fa2 ? "\u0645\u063A\u0627\u0632\u0647\u0654 \u0645\u0627" : "Our shop"}</text>
      </g>
      <!-- قطب‌نما و مقیاس -->
      <g class="mm-compass" transform="translate(596 44)">
        <circle r="17"/>
        <path d="M0-11 4 5 0 1-4 5Z"/>
        <text y="30" text-anchor="middle">N</text>
      </g>
      <g class="mm-scale" transform="translate(36 336)">
        <path d="M0 0h70" fill="none"/>
        <path d="M0-4v8M70-4v8" fill="none"/>
        <text x="78" y="4">${fa2 ? "\u06F1\u06F0\u06F0 \u0645\u062A\u0631" : "100 m"}</text>
      </g>
    </svg>`;
}

// public/js/views/home.mjs
async function render() {
  const st = store();
  let recentItems = [];
  if (feat("recentlyViewed") && (S.recent || []).length) {
    try {
      recentItems = (await api.get(`/api/products?ids=${S.recent.slice(0, 8).join(",")}&limit=8`)).items || [];
    } catch {
      recentItems = [];
    }
  }
  let items = [];
  let cats = S.categories;
  let brands = S.brands;
  let stats = S.stats;
  try {
    const [pr, cr, br] = await Promise.all([
      api.get("/api/products?limit=48&sort=popular"),
      S.categories.length ? Promise.resolve(null) : api.get("/api/categories"),
      S.brands.length ? Promise.resolve(null) : api.get("/api/brands")
    ]);
    items = pr.items || [];
    if (cr) cats = cr.items || [];
    if (br) brands = br.items || [];
    if (feat("publicStats")) {
      try {
        const sr = await api.get("/api/stats/public");
        stats = sr.stats || stats;
      } catch {
      }
    }
  } catch {
  }
  const featured = items.filter((p) => p.featured).slice(0, 8);
  const best = [...items].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 8);
  const fresh = [...items].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).slice(0, 8);
  const deals = items.filter((p) => p.discountPct > 0).sort((a, b) => b.discountPct - a.discountPct).slice(0, 8);
  const topCats = cats.filter((c) => !c.parentId).slice(0, 12);
  const list = featured.length ? featured : best.slice(0, 8);
  return html`
    ${bannerSlot("home_hero", adInSlot("home_hero"))}
    

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-circuit.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${icon("zap")} ${t("home.heroKicker")}</span>
        <h1 class="hero-title">${t("home.heroTitle")}</h1>
        <p class="hero-text">${t("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${icon("cart")} ${t("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${icon("percent")} ${t("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${icon("shield")} ${t("home.point1")}</span>
          <span class="hero-point">${icon("package-check")} ${t("home.point2")}</span>
          <span class="hero-point">${icon("truck")} ${t("home.point3")}</span>
          <span class="hero-point">${icon("store")} ${t("home.point4")}</span>
        </div>
      </div>
    </section>

    ${bannerSlot("home_strip", adInSlot("home_strip"))}

    <section class="section">
      ${sectionHead({ titleIcon: "layers", title: t("home.categories"), sub: t("home.categoriesSub"), link: "#/products", linkLabel: t("common.showAll") })}
      <div class="cat-grid">${topCats.map((c) => catCard(c, c.count ?? null))}</div>
    </section>

    ${feat("partners") && S.settings.partners?.items?.length ? html`
    <section class="partners-sec partners-top">
      ${sectionHead({ titleIcon: "store", title: t("home.partnersTitle") })}
      <div class="marquee" aria-label="${t("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...S.settings.partners.items, ...S.settings.partners.items].map((p) => {
    const br = (S.brands || []).find((b) => b.name === p.fa || p.en && (b.nameEn === p.en || b.nameEn?.toLowerCase() === p.en.toLowerCase()));
    const href = br ? `#/products?brand=${br.id}` : `#/search?q=${encodeURIComponent(p.fa)}`;
    return html`<a class="partner-chip" href="${href}" title="${isFa() ? p.fa : p.en || p.fa}">
              <img class="pt-logo" src="/assets/img/brands/${br ? br.id : "no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${isFa() ? p.fa : p.en || p.fa}</b></a>`;
  }).join("")}
        </div>
      </div>
    </section>` : ""}

    ${list.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "star", title: t("home.featured"), sub: t("home.featuredSub"), link: "#/products?sort=popular" })}
      ${productGrid(list)}
    </section>` : ""}

    ${deals.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "percent", title: t("home.deals"), sub: t("home.dealsSub"), link: "#/products?discount=1" })}
      ${productGrid(deals)}
    </section>` : ""}

    ${best.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "chart", title: t("home.bestSellers"), sub: t("home.bestSellersSub"), link: "#/products?sort=popular" })}
      ${productGrid(best)}
    </section>` : ""}

    ${fresh.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "sparkles", title: t("home.newArrivals"), sub: t("home.newArrivalsSub"), link: "#/products?sort=newest" })}
      ${productGrid(fresh)}
    </section>` : ""}

    ${brands.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "tag", title: t("home.brands") })}
      <div class="row row-wrap">
        ${brands.slice(0, 18).map((b) => html`<a class="chip" href="#/products?brand=${b.id}">${brandName(b)}</a>`)}
      </div>
    </section>` : ""}

    <section class="section">
      <div class="card pf-card">
        <strong>${icon("search")} ${t("home.partFinder")}</strong>
        <p class="muted small mt-s">${t("home.partFinderText")}</p>
        <div class="row row-wrap mt-s">
          ${S.settings?.store?.phone ? html`<a class="btn btn-primary btn-sm" href="tel:${S.settings.store.phone}">${icon("phone")} ${t("home.partFinderCta")}: <bdi>${fmtTel(S.settings.store.phone)}</bdi></a>` : ""}
          <a class="btn btn-outline btn-sm" href="#/pages/contact">${icon("chat")} ${t("nav.contact")}</a>
          ${S.settings?.store?.socials?.instagram ? html`<a class="btn btn-ghost btn-sm" href="${S.settings.store.socials.instagram}" target="_blank" rel="noopener">${icon("camera")} ${t("social.instagram")}</a>` : ""}
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionHead({ titleIcon: "shield", title: t("home.whyUs"), sub: t("home.whyUsSub") })}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${icon("shield")}</span><div><div class="b">${t("home.point1")}</div><div class="muted small">${isFa() ? "\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F." : "Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("package-check")}</span><div><div class="b">${t("home.point2")}</div><div class="muted small">${isFa() ? "\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A." : "By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("truck")}</span><div><div class="b">${t("home.point3")}</div><div class="muted small">${isFa() ? "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A." : "Orders leave Tehran every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("headset")}</span><div><div class="b">${t("footer.support")}</div><div class="muted small">${isFa() ? "\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A." : "Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${feat("publicStats") && stats ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "chart", title: t("home.statsTitle"), link: "#/stats", linkLabel: t("common.showAll") })}
      <div class="stats-grid">
        ${statCard({ icon: "box", label: t("stats.products"), value: fmtNum(stats.products) })}
        ${statCard({ icon: "package-check", label: t("stats.ordersTotal"), value: fmtNum(stats.ordersTotal) })}
        ${statCard({ icon: "cart", label: t("stats.ordersToday"), value: fmtNum(stats.ordersToday) })}
        ${statCard({ icon: "eye", label: t("stats.visitsToday"), value: fmtNum(stats.visitsToday) })}
        ${statCard({ icon: "users", label: t("stats.customers"), value: fmtNum(stats.customers) })}
        ${statCard({ icon: "truck", label: t("stats.delivered"), value: fmtNum(stats.deliveredOrders) })}
      </div>
    </section>` : ""}

    ${feat("plus") && !isPlus() ? html`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${icon("sparkles")} ${t("home.plusTitle")}</div>
          <div class="banner-text">${t("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(plusCfg().perks || []).slice(0, 4).map((p) => html`<span class="chip">${icon("check")} ${isFa() ? p.fa : p.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${t("home.plusCta")} ${icon("chevron-left")}</a>
      </div>
    </section>` : ""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${sectionHead({ titleIcon: "store", title: t("home.visitStore"), sub: t("home.visitStoreText") })}
          <p class="muted small mb">${esc(isFa() ? st.address || "" : st.addressEn || st.address || "")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${icon("map")} ${t("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${st.phone}">${icon("phone")} ${fmtTel(st.phone || "")}</a>
          </div>
        </div>
        <div class="card">
          ${sectionHead({ titleIcon: "download", title: t("home.appTitle"), sub: t("home.appText") })}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${icon("download")} ${t("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${t("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${recentItems.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "history", title: t("home.recent"), sub: t("home.recentSub") })}
      ${productGrid(recentItems)}
    </section>` : ""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${t("contact.mapTitle")}">
          ${raw(minimapSvg())}
          <span class="minimap-hint">${icon("pin")} ${t("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `;
}
function mount() {
  const box = document.querySelector(".marquee");
  const track = box?.querySelector(".marquee-track");
  if (!box || !track) return null;
  let pos = 0;
  let dragging = false;
  let moved = 0;
  let suppressClick = false;
  let lastX = 0;
  let last = performance.now();
  let raf = 0;
  const speed = 42;
  const half = () => {
    const gap = parseFloat(getComputedStyle(track).gap || "10") || 10;
    return (track.scrollWidth + gap) / 2 || 1;
  };
  const ensureCopies = () => {
    const gap = parseFloat(getComputedStyle(track).gap || "10") || 10;
    const kids = [...track.children];
    if (!kids.length) return;
    const n0 = track.dataset.base ? Number(track.dataset.base) : kids.length / 2;
    const base = kids.slice(0, n0);
    const baseW = base.reduce((a, el2) => a + el2.offsetWidth + gap, 0);
    let mult = 1;
    while (baseW * mult < innerWidth * 1.6 && mult < 4) mult++;
    track.dataset.base = String(n0);
    const want = n0 * mult * 2;
    if (kids.length === want) return;
    const frag = document.createDocumentFragment();
    for (let c = 0; c < 2; c++) for (let m2 = 0; m2 < mult; m2++) base.forEach((el2) => frag.appendChild(el2.cloneNode(true)));
    track.innerHTML = "";
    track.appendChild(frag);
  };
  ensureCopies();
  addEventListener("resize", ensureCopies, { passive: true });
  const sign = () => getComputedStyle(track).direction === "rtl" ? 1 : -1;
  const wrap = () => {
    const hw = half();
    if (sign() > 0) {
      if (pos >= hw) pos -= hw;
      if (pos < 0) pos += hw;
    } else {
      if (pos <= -hw) pos += hw;
      if (pos > 0) pos -= hw;
    }
  };
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1e3);
    last = now;
    if (!dragging && !document.documentElement.classList.contains("eco")) pos += sign() * speed * dt;
    wrap();
    track.style.transform = `translateX(${pos.toFixed(1)}px)`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  const down = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    suppressClick = false;
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    box.classList.add("grabbing");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };
  const move = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    pos += dx;
    moved += Math.abs(dx);
    lastX = e.clientX;
  };
  const up = () => {
    dragging = false;
    box.classList.remove("grabbing");
    if (moved > 8) suppressClick = true;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };
  const onClick = (e) => {
    if (!suppressClick) return;
    suppressClick = false;
    e.preventDefault();
    e.stopPropagation();
  };
  const noDrag = (e) => e.preventDefault();
  box.addEventListener("dragstart", noDrag);
  box.addEventListener("click", onClick, true);
  box.addEventListener("pointerdown", down);
  return () => {
    cancelAnimationFrame(raf);
    box.removeEventListener("pointerdown", down);
    box.removeEventListener("dragstart", noDrag);
    box.removeEventListener("click", onClick, true);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };
}
var title = () => t("nav.home");
export {
  mount,
  render,
  title
};
