var vo=Object.defineProperty,Ac=Object.defineProperties;var Dc=Object.getOwnPropertyDescriptors;var go=Object.getOwnPropertySymbols;var Pc=Object.prototype.hasOwnProperty,Mc=Object.prototype.propertyIsEnumerable;var fo=(t,e,s)=>e in t?vo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,mt=(t,e)=>{for(var s in e||(e={}))Pc.call(e,s)&&fo(t,s,e[s]);if(go)for(var s of go(e))Mc.call(e,s)&&fo(t,s,e[s]);return t},zt=(t,e)=>Ac(t,Dc(e));var V=(t,e,s)=>()=>{if(s)throw s[0];try{return t&&(e=t(t=0)),e}catch(n){throw s=[n],n}};var X=(t,e)=>{for(var s in e)vo(t,s,{get:e[s],enumerable:!0})};var xo={};X(xo,{ApiError:()=>ne,api:()=>f,errorEn:()=>Ic,errorMessage:()=>Gs,getCookie:()=>ko,onLoading:()=>Nc,withQuery:()=>So});function ko(t){let e=document.cookie.match(new RegExp("(?:^|; )"+t.replace(/[.$?*|{}()[\]\\/+^]/g,"\\$&")+"=([^;]*)"));return e?decodeURIComponent(e[1]):""}function yo(t){Qt||(Qt=document.createElement("div"),Qt.className="bm-queue-overlay",Qt.setAttribute("role","status"),Qt.innerHTML='<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>',document.documentElement.appendChild(Qt));let e=document.documentElement.lang==="en";Qt.querySelector(".bm-q-title").textContent=e?"Site is busy \u2014 you are in the queue":"\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC",Qt.querySelector(".bm-q-pos").textContent=e?`Your turn: ${t>0?t:"\u2026"}`:`\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${t>0?t:"\u2026"}`,Qt.querySelector(".bm-q-note").textContent=e?"Continues automatically when it is your turn\u2026":"\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026"}function $o(){Qt&&(Qt.remove(),Qt=null)}async function Lc(t={}){return Ga||(Ga=(async()=>{yo(Number(t.pos)||0);let e=Math.max(2,Math.min(20,Number(t.pollSec)||4))*1e3;for(let s=0;s<60;s++){await new Promise(n=>setTimeout(n,e));try{let o=await(await fetch("/api/queue/status",{credentials:"same-origin",headers:{Accept:"application/json"}})).json();if((o==null?void 0:o.state)==="pass")return $o(),!0;(o==null?void 0:o.state)==="queued"&&yo(Number(o.pos)||0)}catch(n){}}return $o(),!1})().finally(()=>{Ga=null})),Ga}function Nc(t){return Ys.add(t),()=>Ys.delete(t)}function wo(t){Ws=Math.max(0,Ws+(t?1:-1));for(let e of Ys)try{e(Ws>0)}catch(s){}}async function Se(t,e,s,n={}){if(typeof navigator!="undefined"&&!navigator.onLine&&t!=="GET")throw new ne(0,"offline","\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","You are offline.");wo(!0);let o=mt({},n.headers||{});if(s!=null&&(o["Content-Type"]="application/json"),t!=="GET"){let p=ko("bm_csrf");p&&(o["X-CSRF-Token"]=p)}let i=new AbortController,l=setTimeout(()=>i.abort(),n.timeout||25e3);try{let p=await fetch(e,{method:t,headers:o,signal:i.signal,credentials:"same-origin",body:s==null?void 0:JSON.stringify(s)}),d=null,b=await p.text();if(b)try{d=JSON.parse(b)}catch(u){d={raw:b.slice(0,300)}}if(p.status===403&&(d==null?void 0:d.code)==="csrf_failed"&&!n._retried)return await fetch("/api/bootstrap",{credentials:"same-origin"}).catch(()=>{}),Se(t,e,s,zt(mt({},n),{_retried:!0}));if(p.status===503&&(d==null?void 0:d.code)==="queued"&&!n._queueRetried&&await Lc((d==null?void 0:d.details)||{}))return Se(t,e,s,zt(mt({},n),{_queueRetried:!0}));if(!p.ok||(d==null?void 0:d.ok)===!1){let u=(d==null?void 0:d.code)||"error";throw new ne(p.status||500,u,(d==null?void 0:d.message)||Vs[u]||"\u062E\u0637\u0627",Vs[u])}return d}catch(p){throw p instanceof ne?p:(p==null?void 0:p.name)==="AbortError"?new ne(408,"timeout","\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","Request timed out."):new ne(0,"network","\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","Network error.")}finally{clearTimeout(l),wo(!1)}}function Gs(t){return t instanceof ne?t.message:String((t==null?void 0:t.message)||t||"\u062E\u0637\u0627")}function Ic(t){return(t==null?void 0:t.details)||Vs[t==null?void 0:t.code]||(t==null?void 0:t.message)||"Error"}var ne,Vs,Qt,Ga,Ws,Ys,So,f,Z=V(()=>{ne=class extends Error{constructor(e,s,n,o){super(n||s||"error"),this.status=e,this.code=s,this.details=o}};Vs={login_required:"Please sign in to continue.",store_asleep:"The store is temporarily turned off.",unauthorized:"Authentication failed.",forbidden:"You do not have access to this section.",csrf_failed:"Security token expired. Please refresh the page.",too_many_requests:"Too many requests. Please wait a moment.",not_found:"Not found.",product_not_found:"Product not found.",order_not_found:"Order not found.",invalid_credentials:"Incorrect username or password.",invalid_code:"The verification code is not valid.",invalid_phone:"Invalid mobile number.",invalid_email:"Invalid email address.",weak_password:"Password is too weak. Use upper/lower case letters, digits and symbols.",stock_limit:"Not enough stock for this quantity.",empty_cart:"Your cart is empty.",insufficient_balance:"Wallet balance is not enough.",account_exists:"This account already exists.",username_taken:"This username is taken.",phone_taken:"This phone number is already registered.",email_taken:"This email is already registered.",terms_required:"You must accept the terms and conditions.",rules_required:"You must accept the ticket rules.",address_required:"Please add a shipping address first.",already_submitted:"You have already submitted this.",payload_too_large:"The uploaded data is too large.",invalid_type:"Only image files are allowed.",server_error:"Internal server error. Please try again.",product_unavailable:"One of the items in your cart is no longer available.",cannot_cancel:"This order cannot be cancelled in its current state.",account_blocked:"This account is blocked. Please contact support.",disabled:"This feature is currently disabled.",queued:"The site is busy. You are in the entry queue\u2026",banned:"Access is blocked. Please contact support."},Qt=null,Ga=null;Ws=0,Ys=new Set;So=(t,e)=>{let s=new URLSearchParams;for(let[o,i]of Object.entries(e||{}))i==null||i===""||s.set(o,String(i));let n=s.toString();return n?`${t}${t.includes("?")?"&":"?"}${n}`:t},f={url:So,get:(t,e)=>Se("GET",t,void 0,e),post:(t,e,s)=>Se("POST",t,e!=null?e:{},s),patch:(t,e,s)=>Se("PATCH",t,e!=null?e:{},s),del:(t,e,s)=>Se("DELETE",t,e,s),put:(t,e,s)=>Se("PUT",t,e!=null?e:{},s),upload:t=>Se("POST","/api/upload",{data:t},{timeout:6e4})}});var qo={};X(qo,{applyI18n:()=>Xe,dictSize:()=>Hc,isFa:()=>q,lang:()=>$t,missingKeys:()=>Bc,setLang:()=>Qs,t:()=>a});function Qs(t){Je=t==="en"?"en":"fa",document.documentElement.lang=Je,document.documentElement.dir=Je==="fa"?"rtl":"ltr"}function a(t,e){let n=(Rc[Je]||Ka)[t];if(n===void 0&&(n=Ka[t],n===void 0&&(Ks.has(t)||(Ks.add(t),(location.hostname==="localhost"||location.hostname==="127.0.0.1")&&console.warn("[i18n] missing key:",t)),n=t)),e)for(let[o,i]of Object.entries(e))n=n.replace(new RegExp(`\\{${o}\\}`,"g"),String(i));return n}function Xe(t=document){t.querySelectorAll("[data-i18n]").forEach(e=>{e.textContent=a(e.dataset.i18n)}),t.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{e.setAttribute("placeholder",a(e.dataset.i18nPlaceholder))}),t.querySelectorAll("[data-i18n-title]").forEach(e=>{e.setAttribute("title",a(e.dataset.i18nTitle)),e.setAttribute("aria-label",a(e.dataset.i18nTitle))}),t.querySelectorAll("[data-i18n-html]").forEach(e=>{e.innerHTML=a(e.dataset.i18nHtml)})}var Ka,Eo,Rc,Je,Ks,$t,q,Bc,Hc,G=V(()=>{Ka={"app.name":"\u06CC\u0627\u0633\u0627\u06CC\u06CC","app.tagline":"\u0644\u0648\u0627\u0632\u0645 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0648 \u0627\u0644\u06A9\u062A\u0631\u06CC\u06A9\u06CC","common.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","common.save":"\u0630\u062E\u06CC\u0631\u0647","common.saving":"\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026","common.cancel":"\u0627\u0646\u0635\u0631\u0627\u0641","common.close":"\u0628\u0633\u062A\u0646","common.confirm":"\u062A\u0623\u06CC\u06CC\u062F","common.delete":"\u062D\u0630\u0641","common.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634","common.add":"\u0627\u0641\u0632\u0648\u062F\u0646","common.create":"\u0627\u06CC\u062C\u0627\u062F","common.update":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","common.filter":"\u0641\u06CC\u0644\u062A\u0631","common.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","common.sort":"\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC","common.all":"\u0647\u0645\u0647","common.none":"\u0647\u06CC\u0686","common.more":"\u0628\u06CC\u0634\u062A\u0631","common.less":"\u06A9\u0645\u062A\u0631","common.showAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647","common.back":"\u0628\u0627\u0632\u06AF\u0634\u062A","common.next":"\u0627\u062F\u0627\u0645\u0647","common.prev":"\u0642\u0628\u0644\u06CC","common.yes":"\u0628\u0644\u0647","common.no":"\u062E\u06CC\u0631","common.optional":"\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC","common.required":"\u0627\u0644\u0632\u0627\u0645\u06CC","common.copy":"\u06A9\u067E\u06CC","common.copied":"\u06A9\u067E\u06CC \u0634\u062F","common.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","common.download":"\u062F\u0627\u0646\u0644\u0648\u062F","common.upload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC","common.print":"\u0686\u0627\u067E","common.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC","common.retry":"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647","common.send":"\u0627\u0631\u0633\u0627\u0644","common.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","common.submit":"\u062B\u0628\u062A","common.reply":"\u067E\u0627\u0633\u062E","common.view":"\u0645\u0634\u0627\u0647\u062F\u0647","common.details":"\u062C\u0632\u0626\u06CC\u0627\u062A","common.status":"\u0648\u0636\u0639\u06CC\u062A","common.date":"\u062A\u0627\u0631\u06CC\u062E","common.time":"\u0633\u0627\u0639\u062A","common.amount":"\u0645\u0628\u0644\u063A","common.count":"\u062A\u0639\u062F\u0627\u062F","common.total":"\u0645\u062C\u0645\u0648\u0639","common.price":"\u0642\u06CC\u0645\u062A","price.inquire":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u2014 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u063A\u0627\u0632\u0647","price.inquireShort":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A","pdp.callStore":"\u0632\u0646\u06AF \u0628\u0632\u0646 \u0628\u0647 \u0645\u063A\u0627\u0632\u0647","pdp.visitStore":"\u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u0622\u06CC\u0645","pdp.serviceHint":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062E\u062F\u0645\u0627\u062A/\u0633\u0641\u0627\u0631\u0634\u06CC \u0627\u0633\u062A\u061B \u0642\u06CC\u0645\u062A \u0646\u0647\u0627\u06CC\u06CC \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0644\u0641\u0646\u06CC \u0627\u0639\u0644\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F.","home.partFinder":"\u0642\u0637\u0639\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u061F","home.partFinderText":"\u0627\u0633\u0645\u0634 \u0631\u0627 \u062A\u0644\u0641\u0646\u06CC \u0628\u06AF\u0648 \u06CC\u0627 \u062F\u0631 \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u061B \u0627\u06AF\u0631 \u062F\u0631 \u0642\u0641\u0633\u0647\u200C\u0647\u0627 \u0628\u0627\u0634\u062F\u060C \u0647\u0645\u0627\u0646 \u0631\u0648\u0632 \u0628\u0631\u0627\u06CC\u062A \u06A9\u0646\u0627\u0631 \u0645\u06CC\u200C\u06AF\u0630\u0627\u0631\u06CC\u0645.","home.partFinderCta":"\u062A\u0645\u0627\u0633 \u06CC\u0627 \u067E\u06CC\u0627\u0645","common.stock":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.available":"\u0645\u0648\u062C\u0648\u062F","common.unavailable":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","common.inStock":"\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631","common.lowStock":"\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647","common.notifyMe":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646","common.notified":"\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","common.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","common.brand":"\u0628\u0631\u0646\u062F","common.product":"\u06A9\u0627\u0644\u0627","common.products":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","common.order":"\u0633\u0641\u0627\u0631\u0634","common.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","common.user":"\u06A9\u0627\u0631\u0628\u0631","common.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.result":"\u0646\u062A\u06CC\u062C\u0647","common.results":"\u0646\u062A\u06CC\u062C\u0647","common.noResult":"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","common.error":"\u062E\u0637\u0627","common.success":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.warning":"\u062A\u0648\u062C\u0647","common.note":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A","common.notes":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","common.actions":"\u0639\u0645\u0644\u06CC\u0627\u062A","common.active":"\u0641\u0639\u0627\u0644","common.inactive":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644","common.enabled":"\u0631\u0648\u0634\u0646","common.disabled":"\u062E\u0627\u0645\u0648\u0634","common.on":"\u0631\u0648\u0634\u0646","common.off":"\u062E\u0627\u0645\u0648\u0634","common.from":"\u0627\u0632","common.to":"\u062A\u0627","common.and":"\u0648","common.or":"\u06CC\u0627","common.today":"\u0627\u0645\u0631\u0648\u0632","common.yesterday":"\u062F\u06CC\u0631\u0648\u0632","common.toman":"\u062A\u0648\u0645\u0627\u0646","common.rial":"\u0631\u06CC\u0627\u0644","common.page":"\u0635\u0641\u062D\u0647","common.of":"\u0627\u0632","common.items":"\u0642\u0644\u0645","common.new":"\u062C\u062F\u06CC\u062F","common.old":"\u0642\u062F\u06CC\u0645\u06CC","common.apply":"\u0627\u0639\u0645\u0627\u0644","common.reset":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC","common.clear":"\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","common.select":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F","common.title":"\u0639\u0646\u0648\u0627\u0646","common.body":"\u0645\u062A\u0646","common.type":"\u0646\u0648\u0639","common.priority":"\u0627\u0648\u0644\u0648\u06CC\u062A","common.answer":"\u067E\u0627\u0633\u062E","common.message":"\u067E\u06CC\u0627\u0645","common.messages":"\u067E\u06CC\u0627\u0645\u200C\u0647\u0627","common.attach":"\u067E\u06CC\u0648\u0633\u062A","common.image":"\u062A\u0635\u0648\u06CC\u0631","common.images":"\u062A\u0635\u0627\u0648\u06CC\u0631","common.phone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","common.email":"\u0627\u06CC\u0645\u06CC\u0644","common.address":"\u0622\u062F\u0631\u0633","common.city":"\u0634\u0647\u0631","common.province":"\u0627\u0633\u062A\u0627\u0646","common.postal":"\u06A9\u062F \u067E\u0633\u062A\u06CC","common.name":"\u0646\u0627\u0645","common.fullName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","common.username":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC","common.password":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.passwordConfirm":"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.login":"\u0648\u0631\u0648\u062F","common.logout":"\u062E\u0631\u0648\u062C","common.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","common.guest":"\u0645\u0647\u0645\u0627\u0646","common.admin":"\u0645\u062F\u06CC\u0631","common.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A","common.help":"\u0631\u0627\u0647\u0646\u0645\u0627","common.home":"\u062E\u0627\u0646\u0647","common.skip":"\u0631\u062F \u0634\u062F\u0646","common.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","common.approved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","common.rejected":"\u0631\u062F \u0634\u062F\u0647","common.open":"\u0628\u0627\u0632","common.closed":"\u0628\u0633\u062A\u0647","common.all2":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F","common.never":"\u0647\u0631\u06AF\u0632","common.empty":"\u062E\u0627\u0644\u06CC","common.secure":"\u0627\u0645\u0646","common.free":"\u0631\u0627\u06CC\u06AF\u0627\u0646","common.unit":"\u0639\u062F\u062F","common.day":"\u0631\u0648\u0632","common.hour":"\u0633\u0627\u0639\u062A","common.minute":"\u062F\u0642\u06CC\u0642\u0647","common.second":"\u062B\u0627\u0646\u06CC\u0647","common.percent":"\u062F\u0631\u0635\u062F","common.discount":"\u062A\u062E\u0641\u06CC\u0641","common.discountCode":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","common.shipping":"\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","common.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","common.subtotal":"\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627","common.payable":"\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A","common.payment":"\u067E\u0631\u062F\u0627\u062E\u062A","common.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","common.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","common.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647","common.profile":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644","common.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","common.balance":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.transactions":"\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627","common.deposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","common.points":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.ticket":"\u062A\u06CC\u06A9\u062A","common.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","common.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","common.review":"\u0646\u0638\u0631","common.reviews":"\u0646\u0638\u0631\u0627\u062A","common.question":"\u0633\u0624\u0627\u0644","common.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.rating":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.notification":"\u0627\u0639\u0644\u0627\u0646","common.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","common.security":"\u0627\u0645\u0646\u06CC\u062A","common.history":"\u062A\u0627\u0631\u06CC\u062E\u0686\u0647","common.report":"\u06AF\u0632\u0627\u0631\u0634","common.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","common.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","common.complaint":"\u0634\u06A9\u0627\u06CC\u062A","common.law":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","common.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","common.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","common.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","common.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","common.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","common.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","common.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","common.searchProducts":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026","common.noData":"\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F","common.tryAgain":"\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646","common.showMore":"\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631","common.perPage":"\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",skip:"\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC","boot.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC\u2026","boot.waking":"\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026","boot.failed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.","update.available":"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.","update.reload":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","boot.failedHint":"\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.","topbar.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","nav.home":"\u062E\u0627\u0646\u0647","nav.products":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","nav.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627","nav.new":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","nav.stats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647","nav.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","nav.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","nav.login":"\u0648\u0631\u0648\u062F","nav.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","nav.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","nav.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","nav.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","nav.menu":"\u0645\u0646\u0648","nav.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","nav.admin":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","nav.allCategories":"\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627","theme.toggle":"\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)","theme.dark":"\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9","theme.light":"\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646","theme.auto":"\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645","search.placeholder":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026","search.go":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","search.voice":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","search.byImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.listening":"\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646","search.noVoice":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.","search.micDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.","search.voiceNetwork":"\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","search.noSpeech":"\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.","search.noMic":"\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","pwd.show":"\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","pwd.hide":"\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","search.suggestions":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","search.trending":"\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627","search.recent":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627","search.resultsFor":"\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC","search.inProducts":"\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A","search.inCategories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","search.inBrands":"\u0628\u0631\u0646\u062F\u0647\u0627","search.inPages":"\u0635\u0641\u062D\u0647\u200C\u0647\u0627","search.didYouMean":"\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F","search.noResultTitle":"\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645","search.noResultText":"\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.","search.imageTitle":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.imageText":"\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.","search.imageHint":"\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A","search.imageIndexing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026","search.imageNoIndex":"\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.","search.imageNoMatch":"\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.","search.dropHere":"\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646","search.pickFile":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633","search.takePhoto":"\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","mnav.home":"\u062E\u0627\u0646\u0647","mnav.products":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","mnav.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","mnav.cart":"\u0633\u0628\u062F","mnav.me":"\u062D\u0633\u0627\u0628 \u0645\u0646","footer.shopping":"\u062E\u0631\u06CC\u062F","footer.allProducts":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","footer.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","footer.inStock":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","footer.searchByImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","footer.myList":"\u0644\u06CC\u0633\u062A \u0645\u0646","footer.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","footer.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","footer.service":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","footer.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","footer.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","footer.tickets":"\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","footer.about":"\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646","footer.aboutUs":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","footer.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","footer.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","footer.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","footer.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","footer.suggest":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","footer.contactUs":"\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC","footer.install":"\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646","footer.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","footer.rights":"\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.","footer.workingHours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","home.heroKicker":"\u0628\u0648\u0631\u0633 \u0647\u0641\u062A\u200C\u062D\u0648\u0636\u061B \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A","home.heroTitle":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u062A\u0627 \u06A9\u0646\u062A\u0627\u06A9\u062A\u0648\u0631\u061B \u0647\u0645\u0627\u0646 \u0644\u062D\u0638\u0647 \u0627\u0632 \u0642\u0641\u0633\u0647 \u0645\u06CC\u200C\u0622\u06CC\u062F","home.heroText":"\u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u062E\u0627\u0632\u0646 \u0648 \u0622\u06CC\u200C\u0633\u06CC\u060C \u0647\u0648\u06CC\u0647 \u0648 \u0633\u06CC\u0645 \u0642\u0644\u0639\u060C \u06A9\u0627\u0628\u0644 \u0648 \u0633\u06CC\u0645 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0633\u0627\u06CC\u0632\u0647\u0627\u060C \u0631\u06CC\u0633\u0647 \u0648 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631\u060C \u0645\u0648\u062F\u0645 \u0648 \u0633\u0648\u06CC\u06CC\u0686\u060C \u067E\u0646\u06A9\u0647 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642 \u2014 \u0647\u0631 \u0622\u0646\u0686\u0647 \u0628\u0631\u0627\u06CC \u0628\u0631\u062F\u060C \u062E\u0627\u0646\u0647 \u0648 \u06A9\u0627\u0631\u06AF\u0627\u0647 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC\u060C \u06CC\u06A9\u200C\u062C\u0627 \u062F\u0631 \u0646\u0627\u0631\u0645\u06A9.","home.ctaShop":"\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F","home.ctaDeals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632","home.point1":"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","home.point2":"\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641","home.point3":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","home.point4":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646","home.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627","home.categoriesSub":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u0622\u06CC\u200C\u0633\u06CC \u062A\u0627 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642","home.featured":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","home.featuredSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","home.bestSellers":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","home.bestSellersSub":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.newArrivals":"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newArrivalsSub":"\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647","home.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","home.dealsSub":"\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631","home.brands":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","home.whyUs":"\u0686\u0631\u0627 \u06CC\u0627\u0633\u0627\u06CC\u06CC\u061F","home.whyUsSub":"\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F","home.reviews":"\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","home.reviewsSub":"\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646","home.visitStore":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.visitStoreText":"\u062A\u0647\u0631\u0627\u0646\u060C \u0646\u0627\u0631\u0645\u06A9\u060C \u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u062A\u0633\u062A \u06A9\u0627\u0644\u0627 \u0642\u0628\u0644 \u0627\u0632 \u062E\u0631\u06CC\u062F","home.openMap":"\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647","home.statsTitle":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647","home.plusTitle":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.plusText":"\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","home.plusCta":"\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633","home.appTitle":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.appText":"\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","home.installCta":"\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646","home.appInstalled":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A","home.liveStats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newsletter":"\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648","home.newsletterText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","home.subscribe":"\u0639\u0636\u0648\u06CC\u062A","stats.products":"\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644","stats.ordersTotal":"\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","stats.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","stats.visitsToday":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","stats.visitsTotal":"\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","stats.pendingOrders":"\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","stats.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642","stats.customers":"\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647","stats.plusMembers":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","stats.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","stats.brands":"\u0628\u0631\u0646\u062F","stats.outOfStock":"\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F","stats.years":"\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A","stats.title":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","stats.sub":"\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","stats.chartTitle":"\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","stats.topProducts":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627","stats.transparency":"\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC","stats.transparencyText":"\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.","catalog.title":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","catalog.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.showFilters":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.hideFilters":"\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.sort.relevant":"\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646","catalog.sort.newest":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646","catalog.sort.oldest":"\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646","catalog.sort.cheapest":"\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.dearest":"\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.popular":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646","catalog.sort.rating":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.sort.discount":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641","catalog.sort.name":"\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627","catalog.f.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","catalog.f.brand":"\u0628\u0631\u0646\u062F","catalog.f.price":"\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A","catalog.f.availability":"\u0645\u0648\u062C\u0648\u062F\u06CC","catalog.f.inStock":"\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","catalog.f.discountOnly":"\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631","catalog.f.rating":"\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.f.authenticity":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","catalog.f.clear":"\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.count":"\u06A9\u0627\u0644\u0627","catalog.viewGrid":"\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","catalog.viewList":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC","auth.original":"\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)","auth.highcopy":"\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9","auth.generic":"\u0645\u062A\u0641\u0631\u0642\u0647","card.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F","card.added":"\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F","card.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","card.wishlistAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646","card.wishlistRemove":"\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646","card.compareAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","card.outOfStock":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","card.soldOut":"\u062A\u0645\u0627\u0645 \u0634\u062F","pdp.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","pdp.buyNow":"\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC","pdp.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647","pdp.warranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.warrantyMonths":"{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noWarranty":"\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.sku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","pdp.barcode":"\u0628\u0627\u0631\u06A9\u062F","pdp.weight":"\u0648\u0632\u0646","pdp.gram":"\u06AF\u0631\u0645","pdp.zoomIn":"\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomOut":"\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomReset":"\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC","pdp.zoomHint":"\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647","pdp.video":"\u0648\u06CC\u062F\u06CC\u0648","pdp.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","pdp.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","pdp.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","pdp.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627","pdp.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","pdp.related":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647","pdp.compatibility":"\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC","pdp.writeReview":"\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632","pdp.askQuestion":"\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644","pdp.loginToReview":"\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","pdp.reviewSubmitted":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.reviewPending":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.questionSubmitted":"\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.","pdp.buyerBadge":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627","pdp.visitorBadge":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","pdp.helpful":"\u0645\u0641\u06CC\u062F \u0628\u0648\u062F","pdp.storeReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noReviews":"\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!","pdp.noQuestions":"\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.","pdp.yourRating":"\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627","pdp.viewed":"\u0628\u0627\u0632\u062F\u06CC\u062F","pdp.sold":"\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647","pdp.off":"\u062A\u062E\u0641\u06CC\u0641","pdp.save":"\u0633\u0648\u062F \u0634\u0645\u0627","pdp.lastPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC","pdp.stockCount":"\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F","pdp.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646","pdp.installment":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637","cart.title":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","cart.empty":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","cart.emptyText":"\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.","cart.goShopping":"\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F","cart.item":"\u06A9\u0627\u0644\u0627","cart.qty":"\u062A\u0639\u062F\u0627\u062F","cart.remove":"\u062D\u0630\u0641","cart.clear":"\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F","cart.clearConfirm":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F","cart.summary":"\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634","cart.continue":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F","cart.freeShipHint":"\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","cart.freeShipDone":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!","cart.couponApplied":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F","cart.couponPlaceholder":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646","cart.applyCoupon":"\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F","cart.removeCoupon":"\u062D\u0630\u0641 \u06A9\u062F","cart.updated":"\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","checkout.title":"\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634","checkout.step1":"\u062A\u062D\u0648\u06CC\u0644","checkout.step2":"\u067E\u0631\u062F\u0627\u062E\u062A","checkout.step3":"\u062A\u0623\u06CC\u06CC\u062F","checkout.delivery":"\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644","checkout.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647","checkout.pickupDesc":"\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","checkout.courier":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A","checkout.courierDesc":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.","checkout.zone":"\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","checkout.express":"\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)","checkout.insuranceOpt":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","checkout.insuranceDesc":"\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.insuranceAuto":"\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.","checkout.address":"\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644","checkout.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F","checkout.noAddress":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.","checkout.paymentMethod":"\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.useWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","checkout.walletBalance":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646","checkout.note":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","checkout.notePlaceholder":"\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.","checkout.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","checkout.placeOrder":"\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634","checkout.placing":"\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026","checkout.loginRequired":"\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","checkout.successTitle":"\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F","checkout.successText":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.","checkout.payNow":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","checkout.payLater":"\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645","checkout.gatewayDemo":"\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.paymentSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.paymentFailed":"\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.simulateSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)","checkout.simulateFail":"\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.concurrencyNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","checkout.pickupReady":"\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","auth.title":"\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645","auth.loginTitle":"\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.registerTitle":"\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.methodPassword":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632","auth.methodPhone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","auth.methodEmail":"\u0627\u06CC\u0645\u06CC\u0644","auth.identifier":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644","auth.remember":"\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631","auth.forgot":"\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.noAccount":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F","auth.haveAccount":"\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F","auth.sendCode":"\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.codeSent":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","auth.codeSentTo":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.","auth.enterCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","auth.otpCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.resend":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F","auth.resendIn":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647","auth.demoCode":"\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}","auth.2faTitle":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","auth.2faText":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.","auth.2faTotp":"\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","auth.2faSms":"\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC","auth.2faEmail":"\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC","auth.2faBackup":"\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","auth.2faVerify":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F","auth.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","auth.referral":"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","auth.registerDone":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!","auth.loginDone":"\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","auth.logoutDone":"\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC","auth.recoveryTitle":"\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.recoveryText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","auth.newPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","auth.resetDone":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","auth.passwordRules":"\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F","auth.orContinue":"\u06CC\u0627","auth.guestCheckout":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.title":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646","acc.badges":"\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646","badge.got":"\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647","badge.locked":"\u0647\u0646\u0648\u0632 \u0642\u0641\u0644","badge.first-buy":"\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F","badge.first-buy.d":"\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.silver-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC","badge.silver-buyer.d":"\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.gold-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC","badge.gold-buyer.d":"\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.big-spender":"\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628","badge.big-spender.d":"\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.","badge.early-bird":"\u067E\u06CC\u0634\u06AF\u0627\u0645","badge.early-bird.d":"\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.veteran":"\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631","badge.veteran.d":"\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.","badge.reviewer":"\u0646\u0642\u062F\u0646\u0648\u06CC\u0633","badge.reviewer.d":"\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.","badge.plus-member":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","badge.plus-member.d":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.","badge.wallet-user":"\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC","badge.wallet-user.d":"\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.supporter":"\u067E\u06CC\u06AF\u06CC\u0631","badge.supporter.d":"\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","acc.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646","acc.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","acc.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.addresses":"\u0622\u062F\u0631\u0633\u200C\u0647\u0627","acc.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646","acc.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","acc.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0646","acc.feedback":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","acc.profile":"\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644","acc.security":"\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628","acc.sessions":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","acc.prefs":"\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634","acc.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.hello":"\u0633\u0644\u0627\u0645 {name}","acc.memberSince":"\u0639\u0636\u0648 \u0627\u0632 {date}","acc.noOrders":"\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.noOrdersText":"\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.","acc.orderCode":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634","acc.orderDate":"\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634","acc.orderItems":"\u0627\u0642\u0644\u0627\u0645","acc.orderTotal":"\u0645\u0628\u0644\u063A \u06A9\u0644","acc.trackOrder":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","acc.cancelOrder":"\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","acc.cancelConfirm":"\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","acc.cancelReason":"\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","acc.orderCancelled":"\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F","acc.reorder":"\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647","acc.invoice":"\u0641\u0627\u06A9\u062A\u0648\u0631","acc.printInvoice":"\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631","acc.timeline":"\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634","acc.walletEmpty":"\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.walletDeposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.walletAmount":"\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)","acc.walletDeposited":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F","acc.walletNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.","acc.tx.deposit":"\u0634\u0627\u0631\u0698","acc.tx.purchase":"\u062E\u0631\u06CC\u062F","acc.tx.refund":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","acc.tx.adjust_in":"\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.tx.adjust_out":"\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.plusInactive":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC","acc.plusActive":"\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}","acc.plusSubscribe":"\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusRenew":"\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9","acc.plusPrice":"{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632","acc.plusPerks":"\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusSubscribed":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F","acc.plusPayWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plusPayGateway":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","acc.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633","acc.editAddress":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633","acc.addrTitle":"\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)","acc.addrReceiver":"\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrStreet":"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC","acc.addrDefault":"\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","acc.addrNote":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9","acc.addrSaved":"\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.addrDeleted":"\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F","acc.noAddress":"\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.wishlistEmpty":"\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","acc.wishlistEmptyText":"\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.","acc.notifEmpty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","acc.markAllRead":"\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","acc.ticketNew":"\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F","acc.ticketSubject":"\u0645\u0648\u0636\u0648\u0639","acc.ticketCategory":"\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A","acc.ticketPriority":"\u0627\u0648\u0644\u0648\u06CC\u062A","acc.ticketBody":"\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A","form.rulesRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","form.termsRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","page.statsTitle":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","page.aboutCta":"\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645","page.stepsTitle":"\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F","page.tipsTitle":"\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F","page.hintsTitle":"\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631","page.bugTitle":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","page.rulesTitle":"\u0642\u0648\u0627\u0646\u06CC\u0646","faq.all":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A","faq.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026","faq.results":"{n} \u0633\u0624\u0627\u0644","faq.notFound":"\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","faq.askText":"\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","faq.cat.orders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","faq.cat.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644","faq.cat.returns":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","faq.cat.product":"\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A","faq.cat.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","faq.cat.security":"\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","faq.cat.store":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633","faq.cat.other":"\u0633\u0627\u06CC\u0631","acc.ticketCloseConfirm":"\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.","acc.ticketClosedNote":"\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.","acc.ticketBodyShort":"\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.","acc.attachHint":"\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.","err.tooLarge":"\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.","acc.ticketRules":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","acc.ticketViewRules":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketCreated":"\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}","acc.ticketWrite":"\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.ticketClose":"\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketReopen":"\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC","acc.ticketSla":"\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A","acc.noTickets":"\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.chatTitle":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","acc.chatPlaceholder":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.chatWelcome":"\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.","acc.chatOffline":"\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","acc.chatOpenTicket":"\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A","acc.reviewEmpty":"\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.feedbackNew":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","acc.feedbackType":"\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645","acc.feedbackContact":"\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)","acc.feedbackContactHint":"\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.","acc.feedbackSent":"\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.","acc.noFeedback":"\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.profileSaved":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.passwordChange":"\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","acc.currentPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC","acc.newPassword2":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","acc.passwordChanged":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","acc.2faSection":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)","acc.2faOff":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","acc.2faOn":"\u0641\u0639\u0627\u0644","acc.2faEnable":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","acc.2faDisable":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC","acc.2faScan":"\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","acc.2faKey":"\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC","acc.2faEnterCode":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F","acc.2faEnabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faDisabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faBackup":"\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)","acc.2faBackupHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.","acc.2faMethods":"\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F","acc.sessionsText":"\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.","acc.revokeAll":"\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627","acc.revokeDone":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F","acc.current":"\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647","acc.prefsText":"\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.prefTheme":"\u067E\u0648\u0633\u062A\u0647","acc.prefLang":"\u0632\u0628\u0627\u0646","acc.prefDensity":"\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634","acc.prefMotion":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","acc.prefNotif":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.notifMarketing":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","acc.notifOrders":"\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","acc.notifRestock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646","acc.notifSupport":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","acc.exportData":"\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.exportHint":"\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.","acc.deleteAccount":"\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.deleteWarn":"\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.deleteConfirm":"\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","acc.pointsText":"\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","acc.referralCode":"\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648","acc.referralText":"\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.","chat.title":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","chat.online":"\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","chat.open":"\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648","chat.minimize":"\u0628\u0633\u062A\u0646","chat.loginFirst":"\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","chat.sent":"\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","chat.typing":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026","chat.quick":"\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631","notif.new":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","notif.markRead":"\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","notif.viewAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","notif.empty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","notif.type.announcement":"\u0627\u0637\u0644\u0627\u0639\u06CC\u0647","notif.type.order":"\u0633\u0641\u0627\u0631\u0634","notif.type.restock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","notif.type.ticket":"\u062A\u06CC\u06A9\u062A","notif.type.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","notif.type.review":"\u0646\u0638\u0631","notif.type.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","notif.type.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","notif.type.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","notif.type.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F","notif.type.admin_alert":"\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631","notif.type.news":"\u062E\u0628\u0631","notif.type.offer":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","notif.type.system":"\u0633\u0627\u0645\u0627\u0646\u0647","notif.type.info":"\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC","notif.type.welcome":"\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC","consent.title":"\u0628\u0647 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","consent.text":"\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.","consent.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.marketing":"\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).","consent.accept":"\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645","consent.readTerms":"\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646","consent.readPrivacy":"\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","consent.thanks":"\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.","consent.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","social.instagram":"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","home.partnersTitle":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","stats.subtitle":"\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.","stats.chartHint":"\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.","stats.topTitle":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.sPartners":"\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627","adm.ptFa":"\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC","adm.ptEn":"Name (EN)","adm.ptAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F","adm.ptHint":"\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.","feat.partners":"\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631","auth.pwdLater":"\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645","auth.pwdLaterToast":"\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.","social.telegram":"\u062A\u0644\u06AF\u0631\u0627\u0645","social.eitaa":"\u0627\u06CC\u062A\u0627","social.whatsapp":"\u0648\u0627\u062A\u0633\u0627\u067E","consent.rejectOptional":"\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC","consent.ttlNote":"\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.title":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","contact.mapTitle":"\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mapHint":"\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646","contact.mapAsk":"\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F","contact.mapPermission":"\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.","contact.allowLocation":"\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.denyLocation":"\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.openMaps":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647","contact.copyAddress":"\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633","contact.hours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","contact.phone":"\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mobile":"\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E","contact.emailUs":"\u0627\u06CC\u0645\u06CC\u0644","contact.addressUs":"\u0622\u062F\u0631\u0633","contact.callNow":"\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631","contact.whatsapp":"\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E","contact.locationOn":"\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F","contact.locationDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.formTitle":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639","contact.formText":"\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","contact.neshan":"\u0646\u0634\u0627\u0646","contact.balad":"\u0628\u0644\u062F","contact.google":"\u06AF\u0648\u06AF\u0644 \u0645\u067E","contact.osm":"\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E","contact.tgBotTitle":"\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645","contact.tgBotText":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.","contact.tgBotBtn":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645","compare.title":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","compare.empty":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647","compare.emptyText":"\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).","compare.add":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","compare.remove":"\u062D\u0630\u0641","priceCheck.title":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F","priceCheck.sub":"\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","priceCheck.input":"\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627","priceCheck.scanCamera":"\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.stopCamera":"\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.waiting":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026","priceCheck.notFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","priceCheck.found":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","priceCheck.cameraUnsupported":"\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","priceCheck.cameraDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.","priceCheck.deviceMode":"\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)","priceCheck.lastScan":"\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646","priceCheck.fullscreen":"\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647","err.generic":"\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","err.network":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.","err.notFound":"\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","err.notFoundText":"\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.","err.goHome":"\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","err.offline":"\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","err.online":"\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC","err.loginRequired":"\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.","err.forbidden":"\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.","adm.title":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","adm.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F","adm.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.productNew":"\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627","adm.productEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","adm.categories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","adm.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A","adm.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.supportChat":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","adm.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","adm.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A","adm.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","adm.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.theme":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","adm.features":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647","adm.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.pages":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","adm.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","adm.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.audit":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.stats":"\u0622\u0645\u0627\u0631","adm.export":"\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.maintenance":"\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC","adm.backToSite":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A","adm.kpi.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","adm.kpi.visits":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","adm.kpi.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.kpi.revenueTotal":"\u062F\u0631\u0622\u0645\u062F \u06A9\u0644","adm.kpi.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.kpi.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.kpi.lowStock":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.awaiting":"\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645","adm.awaiting.reviews":"\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F","adm.awaiting.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632","adm.awaiting.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","adm.awaiting.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F","adm.awaiting.chat":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A","adm.chart":"\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","adm.topSelling":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","adm.lowStockList":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.recentAudit":"\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.storage":"\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.pName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.pNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","adm.pCat":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","adm.pBrand":"\u0628\u0631\u0646\u062F","adm.pPrice":"\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)","adm.pOldPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641","adm.pCost":"\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F","adm.pStock":"\u0645\u0648\u062C\u0648\u062F\u06CC","adm.pSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.pBarcode":"\u0628\u0627\u0631\u06A9\u062F","adm.pWeight":"\u0648\u0632\u0646 (\u06AF\u0631\u0645)","adm.pWarranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)","adm.pAuth":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","adm.pTags":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)","adm.pSpecs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","adm.pSpecKey":"\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647","adm.pSpecVal":"\u0645\u0642\u062F\u0627\u0631","adm.pAddSpec":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647","adm.pVideos":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)","adm.pVideosHint":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.pImages":"\u062A\u0635\u0627\u0648\u06CC\u0631","adm.pFindImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631","adm.pFindImageHint":"\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.","adm.pFindSearching":"\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026","adm.pFindEmpty":"\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.","adm.pUpload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633","adm.pUseImage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631","adm.pDefaultImage":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.pFeatured":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","adm.pActive":"\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)","adm.pSaved":"\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.pCreated":"\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F","adm.pDeleted":"\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F","adm.pDeleteConfirm":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","adm.pQuickEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639","adm.pBulkPrice":"\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A","adm.catName":"\u0646\u0627\u0645 \u062F\u0633\u062A\u0647","adm.catParent":"\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F","adm.catGlyph":"\u0622\u06CC\u06A9\u0648\u0646","adm.catOrder":"\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634","adm.catNoParent":"\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)","adm.brandName":"\u0646\u0627\u0645 \u0628\u0631\u0646\u062F","adm.brandNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F","adm.oStatus":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A","adm.oTracking":"\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC","adm.oNote":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC","adm.oCustomer":"\u0645\u0634\u062A\u0631\u06CC","adm.oDelivery":"\u062A\u062D\u0648\u06CC\u0644","adm.oPayment":"\u067E\u0631\u062F\u0627\u062E\u062A","adm.oSaved":"\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rApprove":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631","adm.rReject":"\u0631\u062F \u06A9\u0631\u062F\u0646","adm.rReply":"\u067E\u0627\u0633\u062E","adm.rReplySaved":"\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.rModerated":"\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rFilter":"\u0641\u06CC\u0644\u062A\u0631","adm.uRole":"\u0646\u0642\u0634","adm.uPerms":"\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.uPermsHint":"\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.uAll":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uNone":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uWalletAdjust":"\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644","adm.uWalletReason":"\u062F\u0644\u06CC\u0644","adm.uPlusDays":"\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.uResetPass":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","adm.uStatus":"\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628","adm.uBlocked":"\u0645\u0633\u062F\u0648\u062F","adm.uSaved":"\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.uMakeStaff":"\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646","adm.cCode":"\u06A9\u062F","adm.cType":"\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641","adm.cValue":"\u0645\u0642\u062F\u0627\u0631","adm.cMax":"\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","adm.cMin":"\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","adm.cLimit":"\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644","adm.cPerUser":"\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","adm.cStart":"\u0634\u0631\u0648\u0639","adm.cEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cUsed":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647","adm.aSlot":"\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634","adm.aTitle":"\u0639\u0646\u0648\u0627\u0646","adm.aText":"\u0645\u062A\u0646","adm.aLink":"\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F","adm.aCta":"\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","adm.aActive":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F","adm.nTitle":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nBody":"\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nTarget":"\u06AF\u06CC\u0631\u0646\u062F\u0647","adm.nAll":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.nOne":"\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635","adm.nLevel":"\u0633\u0637\u062D","adm.nSent":"\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","adm.nOutbox":"\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)","adm.sStore":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.sTheme":"\u067E\u0648\u0633\u062A\u0647","adm.sUi":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637","adm.mailsms":"\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9","adm.mailCfg":"\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)","adm.mailEnabled":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644","adm.mailFrom":"\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.smsCfg":"\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)","adm.smsEnabled":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644","adm.smsKey":"\u06A9\u0644\u06CC\u062F API","adm.smsSender":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.console":"\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647","adm.consoleHint":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.","adm.sysRestart":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631","adm.sysRestartWarn":"\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.sysRestarting":"\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.sysResetLabel":"\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):","adm.sysReset.audit":"\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC","adm.sysReset.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.sysReset.visits":"\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.sysReset.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.secTitle":"\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F","adm.secQueueEnabled":"\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC","adm.secQueueDesc":"\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.","adm.secMaxConc":"\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646","adm.secTriggerRps":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647","adm.secPassTtl":"\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)","adm.secPoll":"\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)","adm.secFloodBan":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)","adm.secFloodMin":"\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)","adm.secSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.","adm.secInflight":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644","adm.secRps":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647","adm.secQueued":"\u062F\u0631 \u0635\u0641","adm.secAutoBans":"\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644","adm.secTop":"\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)","adm.secPerMin":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647","adm.secTopEmpty":"\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.secBusy":"\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644","adm.secNormal":"\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC","adm.banMinutes":"\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)","adm.banUntil":"\u062A\u0627","adm.banAuto":"\u062E\u0648\u062F\u06A9\u0627\u0631","adm.resetAudit":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627","adm.resetCarts":"\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.resetVisitors":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.resetDone":"\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.","adm.resetWarn.audit":"\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","adm.resetWarn.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F","adm.resetWarn.visitors":"\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F","adm.resetWarn.visits":"\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F","adm.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.uDevice":"\u062F\u0633\u062A\u06AF\u0627\u0647 / IP","adm.uBrowser":"\u0645\u0631\u0648\u0631\u06AF\u0631","adm.uRegion":"\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646","adm.uPath":"\u0645\u0633\u06CC\u0631","adm.guest":"\u0645\u0647\u0645\u0627\u0646","adm.bans":"\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)","adm.banType":"\u0646\u0648\u0639","adm.banValue":"\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)","adm.banReason":"\u062F\u0644\u06CC\u0644","adm.ban":"\u0645\u0633\u062F\u0648\u062F \u06A9\u0646","adm.unban":"\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC","adm.banned":"\u0645\u0633\u062F\u0648\u062F","adm.banDone":"\u0645\u0633\u062F\u0648\u062F \u0634\u062F.","adm.unbanDone":"\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.","adm.bansEmpty":"\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.","adm.banByAdmin":"\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","adm.channels":"\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644","adm.chSite":"\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","adm.chTelegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.chEmail":"\u0627\u06CC\u0645\u06CC\u0644","adm.chSms":"\u067E\u06CC\u0627\u0645\u06A9","adm.channelsHint":"\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.telegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.tgHint":"\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.tgEnabled":"\u0628\u0627\u062A \u0631\u0648\u0634\u0646","adm.tgToken":"\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A","adm.tgTokenHint":"\u0645\u062B\u0644 123456:ABC-\u2026","adm.tgWelcome":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start","adm.tgTest":"\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","adm.tgInbox":"\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627","adm.tgSubs":"\u0639\u0636\u0648\u0647\u0627","adm.tgReplyPh":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026","adm.tgInboxEmpty":"\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.","adm.lottery":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","adm.lotteryNew":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F","adm.lotPrize":"\u062C\u0627\u06CC\u0632\u0647","adm.lotEnds":"\u067E\u0627\u06CC\u0627\u0646","adm.lotWinners":"\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647","adm.lotWinnersList":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","adm.lotMode":"\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A","adm.lotModeOrders":"\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.lotModeManual":"\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC","adm.lotEntries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.lotRun":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646","adm.lotRunWarn":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F","adm.lotDone":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.lotClose":"\u0628\u0633\u062A\u0646","adm.lotClosed":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.","adm.lotEmpty":"\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.","lot.title":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC","lot.nav":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.soon":"\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!","lot.done":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647","lot.winners":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","lot.active":"\u0641\u0639\u0627\u0644","lot.prize":"\u062C\u0627\u06CC\u0632\u0647","lot.ends":"\u067E\u0627\u06CC\u0627\u0646","lot.entries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","lot.joined":"\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.","lot.join":"\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.joinDone":"\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!","lot.autoEntry":"\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.","contact.phone3":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645","adm.sBackups":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E","adm.backupNow":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627","adm.backupsHint":"\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.backupsEmpty":"\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.","adm.backupSize":"\u062D\u062C\u0645","adm.backupRestore":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC","adm.backupRestoreWarn":"\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F","adm.backupDone":"\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.","adm.backupRestored":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dumpFull":"\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A","adm.sFeatures":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.sShipping":"\u0627\u0631\u0633\u0627\u0644","adm.sPlus":"\u067E\u0644\u0627\u0633","adm.sOrders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","adm.sSeo":"\u0633\u0626\u0648","adm.sAuth":"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","adm.sSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.tAccent":"\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC","adm.tVariant":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC","adm.tVariantHint":"\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.","hdr.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","adm.errTitle":"\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A","adm.tPort":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0645\u0648\u062C \u0648 \u062F\u0631\u06CC\u0627 (\u0645\u0646\u0627\u0633\u0628 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0633\u0627\u062D\u0644\u06CC \u2014 \u0628\u0631\u0627\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A)","adm.tPortHint":"\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.","adm.tMode":"\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.tRadius":"\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627","adm.tDensity":"\u062A\u0631\u0627\u06A9\u0645","adm.tBg":"\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647","adm.tContrast":"\u06A9\u0646\u062A\u0631\u0627\u0633\u062A","adm.tAnim":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","adm.uSearchPos":"\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648","adm.uHeader":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF","adm.uNav":"\u0633\u0628\u06A9 \u0645\u0646\u0648","adm.uCards":"\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uSticky":"\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646","adm.uTicker":"\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627","adm.uTickerItems":"\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uTickerSpeed":"\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uQuick":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627","adm.uChat":"\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.uCrumb":"\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647","adm.uCols":"\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627","adm.uColsMobile":"\u0645\u0648\u0628\u0627\u06CC\u0644","adm.uColsTablet":"\u062A\u0628\u0644\u062A","adm.uColsDesktop":"\u062F\u0633\u06A9\u062A\u0627\u067E","adm.uColsWide":"\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636","adm.uCardInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uPosStart":"\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)","adm.uPosCenter":"\u0648\u0633\u0637","adm.uPosEnd":"\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)","adm.uLayoutLogoStart":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632","adm.uLayoutSplit":"\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646","adm.uLayoutCentered":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637","adm.fHint":"\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.bLabel":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bSelect":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627","adm.bSize":"\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628","adm.bCopies":"\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627","adm.bShowName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.bShowPrice":"\u0642\u06CC\u0645\u062A","adm.bShowBrand":"\u0628\u0631\u0646\u062F","adm.bShowSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.bShowQr":"\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","adm.bType":"\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F","adm.bPrint":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627","adm.bGenerate":"\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F","adm.igPack":"\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","adm.igCap":"\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)","adm.igTags":"\u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igImgHint":"\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.","adm.igDl":"\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631","adm.igNoImg":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.","adm.igCopyCap":"\u06A9\u067E\u06CC \u0645\u062A\u0646","adm.igCopyTags":"\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igCopyAll":"\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF","adm.bGenerated":"\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F","adm.bScan":"\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F","adm.bScanMode":"\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)","adm.bScanHint":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","adm.bConnected":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646","adm.bSerial":"\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial","adm.bSerialHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).","adm.bSerialUnsupported":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","adm.bSerialConnected":"\u0645\u062A\u0635\u0644 \u0634\u062F","adm.bSerialClosed":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F","adm.bHistory":"\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.isTitle":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.isHint":"\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.","adm.isBuild":"\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633","adm.isBuilding":"\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026","adm.isDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F","adm.isCount":"\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647","adm.auditAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.auditActor":"\u06A9\u0627\u0631\u0628\u0631","adm.auditTarget":"\u0645\u0648\u0636\u0648\u0639","adm.auditMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.statsRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.statsVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F","adm.statsOrders":"\u0633\u0641\u0627\u0631\u0634","adm.statsByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.statsByBrand":"\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F","adm.statsStockValue":"\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","adm.statsAvgOrder":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","adm.exportProducts":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","adm.exportOrders":"\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.exportUsers":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.exportReviews":"\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A","adm.exportTickets":"\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.exportAudit":"\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.exportAll":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)","adm.backup":"\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.cleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC","adm.cleanupDone":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.pageEditHint":"\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.noPermission":"\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.","adm.liveView":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A","adm.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","st.pending_payment":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A","st.pending_review":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","st.confirmed":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","st.preparing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC","st.ready_pickup":"\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","st.shipped":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647","st.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647","st.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","st.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","st.returned":"\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647","dl.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","dl.courier":"\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC","pm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","pm.gateway":"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC","pm.cod":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644","ps.unpaid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647","ps.paid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647","ps.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","ps.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F","ps.failed":"\u0646\u0627\u0645\u0648\u0641\u0642","ps.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","tc.order":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","tc.return":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","tc.product":"\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","tc.technical":"\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A","tc.complaint":"\u0634\u06A9\u0627\u06CC\u062A","tc.partnership":"\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","tc.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A","tc.other":"\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F","tp.critical":"\u0628\u062D\u0631\u0627\u0646\u06CC","tp.high":"\u0632\u06CC\u0627\u062F","tp.normal":"\u0645\u0639\u0645\u0648\u0644\u06CC","tp.low":"\u06A9\u0645","ft.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","ft.complaint":"\u0634\u06A9\u0627\u06CC\u062A","ft.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","fs.new":"\u062C\u062F\u06CC\u062F","fs.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647","fs.in_progress":"\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","fs.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647","fs.rejected":"\u0631\u062F \u0634\u062F\u0647","tk.open":"\u0628\u0627\u0632","tk.answered":"\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647","tk.closed":"\u0628\u0633\u062A\u0647","feat.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","feat.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","feat.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","feat.tickets":"\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A","feat.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","feat.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","feat.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","feat.priceCheckDevice":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","feat.publicStats":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC","feat.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","feat.consent":"\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)","feat.liveSupport":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","feat.announcements":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","feat.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","feat.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","feat.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","feat.guestCheckout":"\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","feat.priceAlerts":"\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","feat.twoFactor":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","feat.referrals":"\u06A9\u062F \u0645\u0639\u0631\u0641","feat.voiceSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","feat.offlineMode":"\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646","feat.captcha":"\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)","captcha.required":"\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","captcha.label":"\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645","captcha.hint":"\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633","captcha.placeholder":"\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A","captcha.solved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714","captcha.refresh":"\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647","perm.dashboard.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F","perm.products.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","perm.products.create":"\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627","perm.products.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","perm.products.delete":"\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627","perm.products.price":"\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641","perm.products.stock":"\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC","perm.categories.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","perm.orders.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","perm.orders.manage":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634","perm.refunds.manage":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","perm.reviews.moderate":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A","perm.reviews.reply":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A","perm.tickets.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","perm.feedback.manage":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","perm.users.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.permissions":"\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","perm.wallet.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644","perm.plus.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","perm.coupons.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","perm.ads.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","perm.notifications.send":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646","perm.settings.edit":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","perm.theme.edit":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","perm.pages.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","perm.barcode.print":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","perm.barcode.scan":"\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","perm.imagesearch.index":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC","perm.audit.view":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","perm.stats.view":"\u0622\u0645\u0627\u0631","perm.data.export":"\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627","misc.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","misc.addToHome":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","misc.installHint":"\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.","misc.printBlocked":"\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.","misc.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","misc.deleted":"\u062D\u0630\u0641 \u0634\u062F","misc.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","misc.confirmDelete":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","misc.loadingMore":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","misc.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","misc.uiSound":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637","misc.uiSoundOn":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F","misc.uiSoundOff":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F","misc.shareDone":"\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F","misc.shareNative":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","img.alt":"\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627","adm.view":"\u0645\u0634\u0627\u0647\u062F\u0647","adm.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.supSelect":"\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.supSelectHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.","adm.tkReply":"\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.tkManage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A","common.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.link":"\u0644\u06CC\u0646\u06A9","common.text":"\u0645\u062A\u0646","cart.coupon":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","misc.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","misc.copied":"\u06A9\u067E\u06CC \u0634\u062F","adm.revPending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.revApproved":"\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647","adm.revRejected":"\u0631\u062F\u0634\u062F\u0647","adm.revApprove":"\u0627\u0646\u062A\u0634\u0627\u0631","adm.revReject":"\u0631\u062F","adm.revReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.revEmpty":"\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A","adm.revEmptyHint":"\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.","rev.buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631","rev.visitor":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","rev.shopReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","fb.new":"\u062C\u062F\u06CC\u062F","fb.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F","fb.inProgress":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","fb.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","fb.rejected":"\u0631\u062F \u0634\u062F","feedback.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","feedback.complaint":"\u0634\u06A9\u0627\u06CC\u062A","feedback.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","adm.fbEmptyHint":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.cpNew":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F","adm.cpPercent":"\u062F\u0631\u0635\u062F\u06CC","adm.cpAmount":"\u0645\u0628\u0644\u063A\u06CC","adm.cpValue":"\u0645\u0642\u062F\u0627\u0631","adm.cpUsage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647","adm.cpDates":"\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631","adm.cpStart":"\u0634\u0631\u0648\u0639","adm.cpEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cpExpired":"\u0645\u0646\u0642\u0636\u06CC","adm.adNew":"\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F","adm.adSlot":"\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634","adm.adsHint":"\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.","adm.notifNew":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","adm.notifHint":"\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.","adm.notifLevel":"\u0633\u0637\u062D","adm.notifRecent":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","notif.level.info":"\u0627\u0637\u0644\u0627\u0639","notif.level.success":"\u0645\u0648\u0641\u0642","notif.level.warning":"\u0647\u0634\u062F\u0627\u0631","notif.level.error":"\u062E\u0637\u0627","adm.pagesPick":"\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.pagesPickHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.pgHint":"\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bPrinter":"\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628","adm.bPrinterHint":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bScanner":"\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646","adm.bLabels":"\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bPreview":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628","adm.bPriceMode":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","adm.bFound":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","adm.bNotFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","adm.bPickFirst":"\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.ixHint":"\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.","adm.ixIndex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647","adm.ixReindex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647","adm.ixDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.audActor":"\u06A9\u0627\u0631\u0628\u0631","adm.audAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.audTarget":"\u0647\u062F\u0641","adm.audMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.stOrders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.stRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.stVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.stUsers":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.stProducts":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.stAvg":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634","adm.stByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.stByBrand":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627","adm.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.dataHint":"\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.","adm.dExport":"\u062E\u0631\u0648\u062C\u06CC","adm.dBackup":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC","adm.dBackupHint":"\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dCleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC","adm.dCleanupHint":"\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","sys.turnOn":"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.turnOff":"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.offConfirm":"\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.","sys.autoWakeMins":"\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)","sys.asleep":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.","sys.asleepTimed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","sys.awake":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.","sys.sleepBanner":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","sys.keepAlive":"\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644","checkout.guestInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646","checkout.guestHint":"\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.","checkout.guestName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","checkout.guestPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644","checkout.guestPhoneHint":"\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9","checkout.guestNameRequired":"\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","checkout.guestPhoneInvalid":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.","checkout.guestCodPickup":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","home.recent":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627","home.recentSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC","checkout.guestCourierNote":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"},Eo={"app.name":"Yassaei Electronics","app.tagline":"Electronics & electrical supplies","common.loading":"Loading\u2026","common.save":"Save","common.saving":"Saving\u2026","common.cancel":"Cancel","common.close":"Close","common.confirm":"Confirm","common.delete":"Delete","common.edit":"Edit","common.add":"Add","common.create":"Create","common.update":"Update","common.search":"Search","common.filter":"Filter","common.filters":"Filters","common.sort":"Sort","common.all":"All","common.none":"None","common.more":"More","common.less":"Less","common.showAll":"View all","common.back":"Back","common.next":"Next","common.prev":"Previous","common.yes":"Yes","common.no":"No","common.optional":"Optional","common.required":"Required","common.copy":"Copy","common.copied":"Copied","common.share":"Share","common.download":"Download","common.upload":"Upload","common.print":"Print","common.refresh":"Refresh","common.retry":"Try again","common.send":"Send","common.sent":"Sent","common.submit":"Submit","common.reply":"Reply","common.view":"View","common.details":"Details","common.status":"Status","common.date":"Date","common.time":"Time","common.amount":"Amount","common.count":"Quantity","common.total":"Total","common.price":"Price","common.stock":"Stock","common.available":"In stock","common.unavailable":"Out of stock","common.inStock":"Available in stock","common.lowStock":"Fewer than 3 left","common.notifyMe":"Notify me when available","common.notified":"We will let you know as soon as it is back","common.category":"Category","common.brand":"Brand","common.product":"Product","common.products":"Products","common.order":"Order","common.orders":"Orders","common.user":"User","common.users":"Users","common.result":"Result","common.results":"Results","common.noResult":"No results found","common.error":"Error","common.success":"Done","common.warning":"Notice","common.note":"Note","common.notes":"Notes","common.description":"Description","common.specs":"Specifications","common.actions":"Actions","common.active":"Active","common.inactive":"Inactive","common.enabled":"On","common.disabled":"Off","common.on":"On","common.off":"Off","common.from":"From","common.to":"To","common.and":"and","common.or":"or","common.today":"Today","common.yesterday":"Yesterday","common.toman":"Toman","common.rial":"Rial","common.page":"Page","common.of":"of","common.items":"items","common.new":"New","common.old":"Old","common.apply":"Apply","common.reset":"Reset","common.clear":"Clear","common.select":"Please select","common.title":"Title","common.body":"Message","common.type":"Type","common.priority":"Priority","common.answer":"Answer","common.message":"Message","common.messages":"Messages","common.attach":"Attachment","common.image":"Image","common.images":"Images","common.phone":"Mobile number","common.email":"Email","common.address":"Address","common.city":"City","common.province":"Province","common.postal":"Postal code","common.name":"Name","common.fullName":"Full name","common.username":"Username","common.password":"Password","common.passwordConfirm":"Repeat password","common.login":"Sign in","common.logout":"Sign out","common.register":"Register","common.guest":"Guest","common.admin":"Admin","common.settings":"Settings","common.help":"Help","common.home":"Home","common.skip":"Skip","common.done":"Done","common.pending":"Pending","common.approved":"Approved","common.rejected":"Rejected","common.open":"Open","common.closed":"Closed","common.all2":"All items","common.never":"Never","common.empty":"Empty","common.secure":"Secure","common.free":"Free","common.unit":"pcs","common.day":"day","common.hour":"hour","common.minute":"minute","common.second":"second","common.percent":"percent","common.discount":"Discount","common.discountCode":"Discount code","common.shipping":"Shipping cost","common.insurance":"Shipment insurance","common.subtotal":"Items subtotal","common.payable":"Amount payable","common.payment":"Payment","common.cart":"Cart","common.wishlist":"My list","common.compare":"Compare","common.profile":"Profile","common.wallet":"Wallet","common.balance":"Balance","common.transactions":"Transactions","common.deposit":"Top up wallet","common.points":"Points","common.ticket":"Ticket","common.tickets":"Tickets","common.support":"Support","common.review":"Review","common.reviews":"Reviews","common.question":"Question","common.questions":"Customer questions","common.rating":"Rating","common.notification":"Notification","common.notifications":"Notifications","common.security":"Security","common.history":"History","common.report":"Report","common.bug":"Bug report","common.suggestion":"Suggestion","common.complaint":"Complaint","common.law":"Terms & conditions","common.privacy":"Privacy policy","common.about":"About us","common.contact":"Contact us","common.faq":"FAQ","common.guide":"Buying guide","common.services":"Customer services","common.stats":"Store statistics","common.searchProducts":"Search products\u2026","common.noData":"Nothing to show","common.tryAgain":"Try again","common.showMore":"Show more","common.perPage":"Per page",skip:"Skip to main content","boot.loading":"Loading Yassaei Electronics\u2026","boot.waking":"The cloud server is waking up; we will retry automatically in a few seconds\u2026","boot.failed":"Store unreachable; the cloud server is asleep or the network is down.","update.available":"A new version is ready \u2014 tap to see the changes.","update.reload":"Refresh now","boot.failedHint":"Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.","topbar.fastSend":"Shipping from Tehran to all of Iran","nav.home":"Home","nav.products":"All products","nav.deals":"Deals","nav.new":"New arrivals","nav.stats":"Live stats","nav.about":"About us","price.inquire":"Price on request \u2014 call the store","price.inquireShort":"Inquire","pdp.callStore":"Call the store","pdp.visitStore":"Visit in person","pdp.serviceHint":"This is a service/custom item; final price is confirmed by phone.","home.partFinder":"Can't find a part?","home.partFinderText":"Tell us by phone or message; if it is on our shelves, we set it aside for you the same day.","home.partFinderCta":"Call or message","nav.contact":"Contact us","nav.login":"Sign in","nav.register":"Register","nav.cart":"Cart","nav.wishlist":"My list","nav.notifications":"Notifications","nav.menu":"Menu","nav.account":"My account","nav.admin":"Admin panel","nav.allCategories":"All categories","theme.toggle":"Toggle theme (light/dark)","theme.dark":"Dark mode","theme.light":"Light mode","theme.auto":"Match system","search.placeholder":"Search products, brands or categories\u2026","search.go":"Search","search.voice":"Voice search","search.byImage":"Search by photo","search.listening":"Listening\u2026 go ahead and speak","search.noVoice":"Your browser does not support voice search.","search.micDenied":"Microphone access is blocked. Allow microphone permission for this site in browser settings.","search.voiceNetwork":"Speech service unreachable; check your internet connection.","search.noSpeech":"I didn't catch that; try again and speak clearly.","search.noMic":"No microphone found on this device.","pwd.show":"Show password","pwd.hide":"Hide password","search.suggestions":"Suggestions","search.trending":"Trending searches","search.recent":"Your recent searches","search.resultsFor":"Search results for","search.inProducts":"In products","search.inCategories":"Categories","search.inBrands":"Brands","search.inPages":"Pages","search.didYouMean":"Did you mean?","search.noResultTitle":"We found nothing","search.noResultText":"Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.","search.imageTitle":"Search by photo","search.imageText":"Upload a photo of the product and we will find similar items in the store.","search.imageHint":"JPG or PNG, up to 4 MB","search.imageIndexing":"Preparing the visual search engine\u2026","search.imageNoIndex":"Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.","search.imageNoMatch":"No similar product found for this photo. You can search by product name instead.","search.dropHere":"Drop the photo here","search.pickFile":"Choose a photo","search.takePhoto":"Take a photo with the camera","mnav.home":"Home","mnav.products":"Categories","mnav.search":"Search","mnav.cart":"Cart","mnav.me":"Account","footer.shopping":"Shopping","footer.allProducts":"All products","footer.deals":"Deals & offers","footer.inStock":"In-stock items","footer.searchByImage":"Visual search","footer.myList":"My list","footer.stats":"Store statistics","footer.services":"Customer services","footer.guide":"Buying guide","footer.service":"Customer services","footer.faq":"FAQ","footer.insurance":"Shipment insurance","footer.plus":"Plus membership","footer.tickets":"Support tickets","footer.about":"About & legal","footer.aboutUs":"About us","footer.terms":"Terms & conditions","footer.privacy":"Privacy policy","footer.bug":"Report a bug","footer.contact":"Contact us","footer.suggest":"Suggestions & complaints","footer.contactUs":"Ways to reach us","footer.install":"Install the app","footer.support":"Live support","footer.rights":"All rights reserved.","footer.workingHours":"Working hours","home.heroKicker":"Haft-Hoz bourse, with an authenticity guarantee","home.heroTitle":"From resistors to contactors \u2014 on your bench the same day","home.heroText":"Resistors, capacitors and ICs, soldering gear, cables and wires in every size, LED strips and projectors, modems and switches, fans and surge protectors \u2014 everything your board, home or workshop needs, under one roof in Narmak.","home.ctaShop":"Start shopping","home.ctaDeals":"Today's deals","home.point1":"Authenticity guarantee","home.point2":"7-day withdrawal right","home.point3":"Shipping across Iran","home.point4":"Free in-store pickup","home.categories":"Categories","home.categoriesSub":"From resistors and ICs to projectors and surge protectors","home.featured":"Featured picks","home.featuredSub":"Items we use and recommend ourselves","home.bestSellers":"Best sellers","home.bestSellersSub":"Chosen by Yassaei Electronics customers","home.newArrivals":"New in store","home.newArrivalsSub":"The latest items added to the shelf","home.deals":"Active discounts","home.dealsSub":"Limited-time offers at better prices","home.brands":"Brands in stock","home.whyUs":"Why Yassaei Electronics?","home.whyUsSub":"The things that set us apart","home.reviews":"Customer reviews","home.reviewsSub":"Real buyer experiences","home.visitStore":"Visit the store","home.visitStoreText":"Tehran, Narmak, Haft-Hoz square \u2014 free in-person advice and on-the-spot product testing","home.openMap":"See the sketch and map","home.statsTitle":"The store at a glance","home.plusTitle":"Yassaei Electronics Plus membership","home.plusText":"With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.","home.plusCta":"See Plus benefits","home.appTitle":"The Yassaei Electronics app","home.appText":"This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.","home.installCta":"Install on my device","home.appInstalled":"The app is installed","home.liveStats":"Live store statistics","home.newsletter":"Stay posted on deals","home.newsletterText":"Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.","home.subscribe":"Subscribe","stats.products":"Active products","stats.ordersTotal":"Total orders","stats.ordersToday":"Orders today","stats.visitsToday":"Visits today","stats.visitsTotal":"Total visits","stats.pendingOrders":"Orders under review","stats.delivered":"Successful deliveries","stats.customers":"Registered customers","stats.plusMembers":"Plus members","stats.categories":"Categories","stats.brands":"Brands","stats.outOfStock":"Out-of-stock items","stats.years":"Years active","stats.title":"Public store statistics","stats.sub":"These figures are taken live from the site's real data.","stats.chartTitle":"Visits over the last 14 days","stats.topProducts":"Best-selling products","stats.transparency":"Transparency for customers","stats.transparencyText":"We show real stock and real prices, and we do not hide the store's statistics either.","catalog.title":"Products","catalog.filters":"Filters","catalog.showFilters":"Show filters","catalog.hideFilters":"Hide filters","catalog.sort.relevant":"Most relevant","catalog.sort.newest":"Newest","catalog.sort.oldest":"Oldest","catalog.sort.cheapest":"Cheapest","catalog.sort.dearest":"Most expensive","catalog.sort.popular":"Best selling","catalog.sort.rating":"Highest rated","catalog.sort.discount":"Biggest discount","catalog.sort.name":"Alphabetical","catalog.f.category":"Category","catalog.f.brand":"Brand","catalog.f.price":"Price range","catalog.f.availability":"Availability","catalog.f.inStock":"In-stock items only","catalog.f.discountOnly":"Discounted only","catalog.f.rating":"Minimum rating","catalog.f.authenticity":"Authenticity","catalog.f.clear":"Clear all filters","catalog.count":"products","catalog.viewGrid":"Grid view","catalog.viewList":"List view","auth.original":"Original","auth.highcopy":"High copy (grade 1)","auth.generic":"Generic","card.addToCart":"Add to cart","card.added":"Added to cart","card.quickView":"Quick view","card.wishlistAdd":"Add to my list","card.wishlistRemove":"Remove from my list","card.compareAdd":"Add to compare","card.outOfStock":"Out of stock","card.soldOut":"Sold out","pdp.addToCart":"Add to cart","pdp.buyNow":"Buy now","pdp.pickup":"Free in-store pickup","pdp.warranty":"Warranty","pdp.warrantyMonths":"{n}-month store replacement warranty","pdp.noWarranty":"No warranty","pdp.sku":"Product code","pdp.barcode":"Barcode","pdp.weight":"Weight","pdp.gram":"grams","pdp.zoomIn":"Zoom in","pdp.zoomOut":"Zoom out","pdp.zoomReset":"Actual size","pdp.zoomHint":"Hover for magnifier; click or double-tap for full zoom","pdp.video":"Video","pdp.share":"Share","pdp.specs":"Specifications","pdp.description":"Description","pdp.reviews":"Reviews & ratings","pdp.questions":"Customer questions","pdp.related":"Similar products","pdp.compatibility":"Compatibility","pdp.writeReview":"Write a review & rating","pdp.askQuestion":"Ask a question","pdp.loginToReview":"Sign in to write a review.","pdp.reviewSubmitted":"Your review was submitted and will appear once the admin approves it.","pdp.reviewPending":"Your review will appear after the admin approves it.","pdp.questionSubmitted":"Your question was submitted; once approved, the admin will answer it.","pdp.buyerBadge":"Buyer of this product","pdp.visitorBadge":"Visitor","pdp.helpful":"Was helpful","pdp.storeReply":"Store reply","pdp.noReviews":"No reviews yet. Be the first!","pdp.noQuestions":"No questions yet. Ask if you have one.","pdp.yourRating":"Your rating","pdp.viewed":"views","pdp.sold":"sold","pdp.off":"off","pdp.save":"You save","pdp.lastPrice":"Previous price","pdp.stockCount":"In stock: {n}","pdp.fastSend":"Fast shipping from Tehran","pdp.installment":"Cash on delivery for eligible orders","cart.title":"Cart","cart.empty":"Your cart is empty","cart.emptyText":"You have not picked anything yet. Start from the categories or the search box.","cart.goShopping":"Let's go shopping","cart.item":"Product","cart.qty":"Quantity","cart.remove":"Remove","cart.clear":"Empty the cart","cart.clearConfirm":"Remove all items from the cart?","cart.summary":"Order summary","cart.continue":"Continue to checkout","cart.freeShipHint":"Spend {amount} Toman more to get free shipping.","cart.freeShipDone":"Shipping is free for this order!","cart.couponApplied":"Discount code applied","cart.couponPlaceholder":"Have a discount code? Enter it","cart.applyCoupon":"Apply code","cart.removeCoupon":"Remove code","cart.updated":"Cart updated","checkout.title":"Checkout","checkout.step1":"Delivery","checkout.step2":"Payment","checkout.step3":"Confirm","checkout.delivery":"Delivery method","checkout.pickup":"Pickup from the store","checkout.pickupDesc":"Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.","checkout.courier":"Courier / postal shipping","checkout.courierDesc":"Shipped to a saved address, with optional shipment insurance.","checkout.zone":"Shipping zone","checkout.express":"Express shipping (same day)","checkout.insuranceOpt":"Shipment insurance","checkout.insuranceDesc":"If the parcel is damaged or lost in transit, the goods value is compensated.","checkout.insuranceAuto":"Applied automatically and free for Plus members.","checkout.address":"Delivery address","checkout.addAddress":"Add a new address","checkout.noAddress":"You must save at least one address for postal shipping.","checkout.paymentMethod":"Payment method","checkout.useWallet":"Pay from wallet","checkout.walletBalance":"Wallet balance: {amount} Toman","checkout.note":"Order note (optional)","checkout.notePlaceholder":"e.g. please call before delivery.","checkout.acceptTerms":"I have read and accept the Terms & Conditions and the Privacy Policy.","checkout.placeOrder":"Place & pay for the order","checkout.placing":"Placing your order\u2026","checkout.loginRequired":"Sign in to complete your purchase.","checkout.successTitle":"Order placed","checkout.successText":"Your order code is {code}. Track its status under My Orders.","checkout.payNow":"Pay online","checkout.payLater":"I will pay later","checkout.gatewayDemo":"The gateway is in demo mode; no real money is deducted.","checkout.paymentSuccess":"Payment was successful","checkout.paymentFailed":"Payment failed","checkout.simulateSuccess":"Successful payment (gateway simulation)","checkout.simulateFail":"Cancel payment","checkout.concurrencyNote":"Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.","checkout.pickupReady":"Preparation time: about {h} working hours","auth.title":"Sign in or register","auth.loginTitle":"Sign in to your account","auth.registerTitle":"Create an account","auth.methodPassword":"Username & password","auth.methodPhone":"Mobile number","auth.methodEmail":"Email","auth.identifier":"Username, mobile or email","auth.remember":"Remember me","auth.forgot":"Forgot password","auth.noAccount":"Do not have an account?","auth.haveAccount":"Already registered?","auth.sendCode":"Send verification code","auth.codeSent":"Verification code sent","auth.codeSentTo":"A 6-digit code was sent to {target}.","auth.enterCode":"Enter the verification code","auth.otpCode":"Verification code","auth.resend":"Resend code","auth.resendIn":"Resend in {s} seconds","auth.demoCode":"Demo mode: verification code {code}","auth.2faTitle":"Two-step sign-in","auth.2faText":"Enter the 6-digit code from your authenticator app, SMS or email.","auth.2faTotp":"Authenticator app","auth.2faSms":"SMS code","auth.2faEmail":"Email code","auth.2faBackup":"Backup code","auth.2faVerify":"Verify & sign in","auth.acceptTerms":"I accept the Terms & Conditions and the Privacy Policy.","auth.referral":"Referral code (optional)","auth.registerDone":"Your account was created. Welcome!","auth.loginDone":"Welcome","auth.logoutDone":"You signed out successfully","auth.recoveryTitle":"Password recovery","auth.recoveryText":"Enter your registered mobile number or email and we will send a recovery code.","auth.newPassword":"New password","auth.resetDone":"Password changed successfully","auth.passwordRules":"At least 8 characters including lowercase, uppercase, a digit and a symbol","auth.orContinue":"or","auth.guestCheckout":"Continue shopping without an account","acc.title":"My account","acc.dashboard":"My dashboard","acc.badges":"My achievements","badge.got":"Earned","badge.locked":"Locked","badge.first-buy":"First purchase","badge.first-buy.d":"You placed your first successful order.","badge.silver-buyer":"Silver buyer","badge.silver-buyer.d":"5 successful orders at Yassaei Electronics.","badge.gold-buyer":"Gold buyer","badge.gold-buyer.d":"15 successful orders; a Yassaei Electronics VIP.","badge.big-spender":"Big spender","badge.big-spender.d":"Over 50,000,000 Toman in purchases.","badge.early-bird":"Early bird","badge.early-bird.d":"Among the first 100 Yassaei Electronics users.","badge.veteran":"Veteran","badge.veteran.d":"With us for more than a year.","badge.reviewer":"Reviewer","badge.reviewer.d":"3 posted reviews helping others choose.","badge.plus-member":"Plus member","badge.plus-member.d":"You have an active Plus subscription.","badge.wallet-user":"Wallet user","badge.wallet-user.d":"You have used the Yassaei Electronics wallet.","badge.supporter":"Supporter","badge.supporter.d":"You opened your first support ticket.","acc.orders":"My orders","acc.wishlist":"My list","acc.wallet":"Wallet","acc.plus":"Plus membership","acc.addresses":"Addresses","acc.notifications":"Notifications","acc.tickets":"My tickets","acc.support":"Support chat","acc.reviews":"My reviews","acc.feedback":"Suggestions & complaints","acc.profile":"Profile details","acc.security":"Account security","acc.sessions":"Active sessions","acc.prefs":"Display preferences","acc.data":"My data","acc.hello":"Hi {name}","acc.memberSince":"Member since {date}","acc.noOrders":"You have not placed an order yet","acc.noOrdersText":"Make your first purchase with the welcome discount WELCOME10.","acc.orderCode":"Order code","acc.orderDate":"Order date","acc.orderItems":"Items","acc.orderTotal":"Total amount","acc.trackOrder":"Track order","acc.cancelOrder":"Cancel order","acc.cancelConfirm":"Cancel this order? The paid amount returns to your wallet.","acc.cancelReason":"Reason for cancellation (optional)","acc.orderCancelled":"Order cancelled","acc.reorder":"Buy again","acc.invoice":"Invoice","acc.printInvoice":"Print invoice","acc.timeline":"Order progress","acc.walletEmpty":"No transactions recorded yet","acc.walletDeposit":"Top up wallet","acc.walletAmount":"Top-up amount (Toman)","acc.walletDeposited":"Wallet topped up","acc.walletNote":"The wallet balance can only be used to buy from this store; no interest or fee applies to it.","acc.tx.deposit":"Top-up","acc.tx.purchase":"Purchase","acc.tx.refund":"Refund","acc.tx.adjust_in":"Increase by admin","acc.tx.adjust_out":"Deduction by admin","acc.plusInactive":"You do not have a Plus membership","acc.plusActive":"Plus active until {date}","acc.plusSubscribe":"Buy Plus membership","acc.plusRenew":"Renew membership","acc.plusPrice":"{price} Toman for {days} days","acc.plusPerks":"Plus membership benefits","acc.plusSubscribed":"Plus membership activated","acc.plusPayWallet":"Pay from wallet","acc.plusPayGateway":"Pay online","acc.addAddress":"Add address","acc.editAddress":"Edit address","acc.addrTitle":"Label (e.g. home, work)","acc.addrReceiver":"Recipient name","acc.addrPhone":"Recipient phone number","acc.addrStreet":"Full postal address","acc.addrDefault":"Default address","acc.addrNote":"Note for the courier","acc.addrSaved":"Address saved","acc.addrDeleted":"Address deleted","acc.noAddress":"No address saved yet","acc.wishlistEmpty":"Your list is empty","acc.wishlistEmptyText":"Tap the heart icon on any product to save it here.","acc.notifEmpty":"You have no notifications","acc.markAllRead":"Mark all as read","acc.ticketNew":"New ticket","acc.ticketSubject":"Subject","acc.ticketCategory":"Request category","acc.ticketPriority":"Priority","acc.ticketBody":"Request details","form.rulesRequired":"You must accept the ticket rules first.","form.termsRequired":"You must accept the terms and conditions first.","page.statsTitle":"Live store stats","page.aboutCta":"Come and see what we have in store for you","page.stepsTitle":"How to buy","page.tipsTitle":"Buying tips","page.hintsTitle":"For a more precise report","page.bugTitle":"Report a bug","page.rulesTitle":"Rules","faq.all":"All topics","faq.search":"Search questions\u2026","faq.results":"{n} questions","faq.notFound":"No question matched your search.","faq.askText":"Ask live support or open a ticket.","faq.cat.orders":"Orders & tracking","faq.cat.shipping":"Shipping & delivery","faq.cat.returns":"Returns & refunds","faq.cat.product":"Products & authenticity","faq.cat.account":"Account","faq.cat.security":"Security & payment","faq.cat.store":"Store & contact","faq.cat.other":"Other","acc.ticketCloseConfirm":"Close this ticket? You can reopen it later by sending a message.","acc.ticketClosedNote":"This ticket is closed. Sending a new message reopens it.","acc.ticketBodyShort":"The message is too short.","acc.attachHint":"Up to 4 images, each below 4 MB.","err.tooLarge":"The file is larger than 4 MB.","acc.ticketRules":"I have read and accept the ticket rules.","acc.ticketViewRules":"Read ticket rules","acc.ticketCreated":"Ticket created. Tracking code: {code}","acc.ticketWrite":"Write your reply\u2026","acc.ticketClose":"Close ticket","acc.ticketReopen":"Reopen","acc.ticketSla":"Estimated reply time: {h} hours","acc.noTickets":"You have no tickets","acc.chatTitle":"Live support","acc.chatPlaceholder":"Write your message\u2026","acc.chatWelcome":"Hi! Any question or issue? Write it here and we will answer.","acc.chatOffline":"We are outside working hours right now; leave a message and we reply first thing, or open a ticket.","acc.chatOpenTicket":"Open a ticket","acc.reviewEmpty":"You have not posted a review or question","acc.feedbackNew":"Send a suggestion, complaint or bug report","acc.feedbackType":"Message type","acc.feedbackContact":"Contact (email or mobile)","acc.feedbackContactHint":"If provided, we will inform you of the outcome.","acc.feedbackSent":"Your message was submitted. Thanks for helping us improve.","acc.noFeedback":"You have not sent any message","acc.profileSaved":"Profile saved","acc.passwordChange":"Change password","acc.currentPassword":"Current password","acc.newPassword2":"New password","acc.passwordChanged":"Password changed","acc.2faSection":"Two-factor authentication (2FA)","acc.2faOff":"Disabled \u2014 turn it on for extra security.","acc.2faOn":"Enabled","acc.2faEnable":"Enable two-factor","acc.2faDisable":"Disable","acc.2faScan":"Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.","acc.2faKey":"Manual key","acc.2faEnterCode":"Enter the 6-digit code from the app to enable","acc.2faEnabled":"Two-factor enabled","acc.2faDisabled":"Two-factor disabled","acc.2faBackup":"Backup codes (keep them safe)","acc.2faBackupHint":"If you lose access to the app, sign in with these. Each code works once.","acc.2faMethods":"Verification methods","acc.sessionsText":"Devices currently signed in to your account.","acc.revokeAll":"Sign out everywhere","acc.revokeDone":"Sessions revoked","acc.current":"This device","acc.prefsText":"These settings apply only to this device.","acc.prefTheme":"Theme","acc.prefLang":"Language","acc.prefDensity":"Density","acc.prefMotion":"Animations","acc.prefNotif":"Notifications","acc.notifMarketing":"Offers and discounts","acc.notifOrders":"Order status","acc.notifRestock":"Restock of my saved items","acc.notifSupport":"Support and ticket replies","acc.exportData":"Export my data","acc.exportHint":"Download all your account info, orders, reviews and tickets as JSON.","acc.deleteAccount":"Delete account","acc.deleteWarn":"Deleting removes your personal data, while financial order records are kept as required by law.","acc.deleteConfirm":"Enter your password to delete the account","acc.pointsText":"You earn 1 point per 100,000 Toman of purchase.","acc.referralCode":"Your referral code","acc.referralText":"Share this code; you both get 50 points.","chat.title":"Yassaei Electronics live support","chat.online":"We usually reply within minutes","chat.open":"Start chat","chat.minimize":"Close","chat.loginFirst":"Sign in to chat with support.","chat.sent":"Message sent","chat.typing":"Support is typing\u2026","chat.quick":"Frequent questions","notif.new":"New notification","notif.markRead":"Mark as read","notif.viewAll":"View all notifications","notif.empty":"No notifications","notif.type.announcement":"Announcement","notif.type.order":"Order","notif.type.restock":"Back in stock","notif.type.ticket":"Ticket","notif.type.support":"Support","notif.type.review":"Review","notif.type.plus":"Plus membership","notif.type.wallet":"Wallet","notif.type.account":"Account","notif.type.feedback":"Feedback","notif.type.admin_alert":"Admin alert","notif.type.news":"News","notif.type.offer":"Special offer","notif.type.system":"System","notif.type.info":"Info","notif.type.welcome":"Welcome","consent.title":"Welcome to Yassaei Electronics","consent.text":"Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.","consent.terms":"I have read and accept the Terms & Conditions.","consent.privacy":"I accept the Privacy Policy.","consent.marketing":"I would like to hear about deals and new arrivals (optional).","consent.accept":"Accept & enter the site","consent.readTerms":"Read terms","consent.readPrivacy":"Read privacy","consent.thanks":"Thanks! Your acceptance was recorded.","consent.manage":"Cookie & privacy choices","social.instagram":"Instagram","home.partnersTitle":"Brands we work with","stats.subtitle":"Real store numbers, updated live.","stats.chartHint":"Each column height is that day visit count.","stats.topTitle":"Recent best sellers","adm.sPartners":"Partners & brands","adm.ptFa":"Persian name","adm.ptEn":"Name (EN)","adm.ptAdd":"Add brand","adm.ptHint":"These names scroll as a marquee on the home page; order is yours to set.","feat.partners":"Partner brands strip","auth.pwdLater":"I'll change it later","auth.pwdLaterToast":"OK; you can change it anytime from Account \u2192 Change password.","social.telegram":"Telegram","social.eitaa":"Eitaa","social.whatsapp":"WhatsApp","consent.rejectOptional":"Accept necessary only","consent.ttlNote":"Your choice stays valid for 180 days; after that we ask again.","contact.title":"Contact us","contact.mapTitle":"Shop location sketch","contact.mapHint":"Click to open in a map app","contact.mapAsk":"Which map would you like to open?","contact.mapPermission":"If you allow location access, we will show the route from your current position to the shop.","contact.allowLocation":"Allow location access","contact.denyLocation":"Continue without location","contact.openMaps":"Open in maps","contact.copyAddress":"Copy address","contact.hours":"Working hours","contact.phone":"Store phone","contact.mobile":"Mobile & WhatsApp","contact.emailUs":"Email","contact.addressUs":"Address","contact.callNow":"Call now","contact.whatsapp":"Message on WhatsApp","contact.locationOn":"Your approximate location was found","contact.locationDenied":"Location denied; the map opens without an origin.","contact.formTitle":"Send a quick message","contact.formText":"Prefer not to call? Leave a message or open a ticket.","contact.neshan":"Neshan","contact.balad":"Balad","contact.google":"Google Maps","contact.osm":"OpenStreetMap","contact.tgBotTitle":"Telegram support bot","contact.tgBotText":"Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.","contact.tgBotBtn":"Open the bot on Telegram","compare.title":"Compare products","compare.empty":"No products selected for comparison","compare.emptyText":"Use the Compare button on product cards (up to 4 items).","compare.add":"Add to compare","compare.remove":"Remove","priceCheck.title":"Price check by barcode","priceCheck.sub":"Scan the barcode with your device or type it manually.","priceCheck.input":"Barcode or SKU","priceCheck.scanCamera":"Scan with camera","priceCheck.stopCamera":"Stop camera","priceCheck.waiting":"Waiting for a scan\u2026","priceCheck.notFound":"No product found for this barcode","priceCheck.found":"Product found","priceCheck.cameraUnsupported":"Camera unavailable. Use a barcode device or manual entry.","priceCheck.cameraDenied":"Camera access denied.","priceCheck.deviceMode":"Kiosk mode (full screen)","priceCheck.lastScan":"Last scan","priceCheck.fullscreen":"Full screen","err.generic":"Something went wrong. Please try again.","err.network":"Could not reach the server.","err.notFound":"Page not found","err.notFoundText":"The address may be wrong or the page has been removed.","err.goHome":"Go to homepage","err.offline":"You are offline. Cached data is shown.","err.online":"Back online","err.loginRequired":"You must sign in to view this section.","err.forbidden":"You do not have access to this section.","adm.title":"Admin panel","adm.dashboard":"Dashboard","adm.products":"Products","adm.productNew":"Add product","adm.productEdit":"Edit product","adm.categories":"Categories & brands","adm.orders":"Orders","adm.reviews":"Reviews & questions","adm.tickets":"Tickets","adm.supportChat":"Support chat","adm.feedback":"Feedback & bugs","adm.users":"Users & permissions","adm.wallet":"User wallets","adm.coupons":"Coupons","adm.ads":"Advertisements","adm.notifications":"Notifications","adm.settings":"Store settings","adm.theme":"Theme & layout","adm.features":"Features","adm.shipping":"Shipping & insurance","adm.plus":"Plus membership","adm.pages":"Page content","adm.barcode":"Barcode & labels","adm.imageSearch":"Image search","adm.audit":"Audit log","adm.stats":"Statistics","adm.export":"Export & backup","adm.maintenance":"Maintenance","adm.backToSite":"Back to site","adm.kpi.ordersToday":"Orders today","adm.kpi.visits":"Visits today","adm.kpi.pending":"Pending review","adm.kpi.revenueTotal":"Total revenue","adm.kpi.users":"Users","adm.kpi.products":"Products","adm.kpi.lowStock":"Low stock","adm.awaiting":"Tasks awaiting action","adm.awaiting.reviews":"Reviews to approve","adm.awaiting.tickets":"Open tickets","adm.awaiting.orders":"Pending orders","adm.awaiting.feedback":"New feedback","adm.awaiting.chat":"Unread chat messages","adm.chart":"Last 14 days trend","adm.topSelling":"Best sellers","adm.lowStockList":"Low-stock items","adm.recentAudit":"Latest events","adm.storage":"Data size","adm.pName":"Product name","adm.pNameEn":"English name","adm.pCat":"Category","adm.pBrand":"Brand","adm.pPrice":"Price (Toman)","adm.pOldPrice":"Price before discount","adm.pCost":"Purchase cost","adm.pStock":"Stock","adm.pSku":"SKU","adm.pBarcode":"Barcode","adm.pWeight":"Weight (grams)","adm.pWarranty":"Warranty (months)","adm.pAuth":"Authenticity","adm.pTags":"Tags (separate with Enter)","adm.pSpecs":"Specifications","adm.pSpecKey":"Spec name","adm.pSpecVal":"Value","adm.pAddSpec":"Add spec","adm.pVideos":"Product videos (one https or /uploads URL per line)","adm.pVideosHint":"Videos play in the product gallery and lightbox.","adm.pImages":"Images","adm.pFindImage":"Auto image search","adm.pFindImageHint":"We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.","adm.pFindSearching":"Searching for images\u2026","adm.pFindEmpty":"No images found. You can upload your own photo.","adm.pUpload":"Upload photo","adm.pUseImage":"Use this image","adm.pDefaultImage":"Restore default image","adm.pFeatured":"Show in featured picks","adm.pActive":"Active (visible on site)","adm.pSaved":"Product saved","adm.pCreated":"Product created","adm.pDeleted":"Product deleted","adm.pDeleteConfirm":"Delete this product permanently?","adm.pQuickEdit":"Quick edit","adm.pBulkPrice":"Bulk price change","adm.catName":"Category name","adm.catParent":"Parent category","adm.catGlyph":"Icon","adm.catOrder":"Display order","adm.catNoParent":"No parent (top level)","adm.brandName":"Brand name","adm.brandNameEn":"Brand English name","adm.oStatus":"Change status","adm.oTracking":"Tracking code","adm.oNote":"Internal note","adm.oCustomer":"Customer","adm.oDelivery":"Delivery","adm.oPayment":"Payment","adm.oSaved":"Order updated","adm.rApprove":"Approve & publish","adm.rReject":"Reject","adm.rReply":"Reply","adm.rReplySaved":"Reply saved","adm.rModerated":"Review status updated","adm.rFilter":"Filter","adm.uRole":"Role","adm.uPerms":"Permissions","adm.uPermsHint":"Toggle each permission separately. Changes apply immediately.","adm.uAll":"Enable all","adm.uNone":"Disable all","adm.uWalletAdjust":"Adjust wallet balance","adm.uWalletReason":"Reason","adm.uPlusDays":"Plus membership days","adm.uResetPass":"Reset password","adm.uStatus":"Account status","adm.uBlocked":"Blocked","adm.uSaved":"User changes saved","adm.uMakeStaff":"Make staff","adm.cCode":"Code","adm.cType":"Discount type","adm.cValue":"Value","adm.cMax":"Max discount","adm.cMin":"Minimum order","adm.cLimit":"Total usage limit","adm.cPerUser":"Per-user limit","adm.cStart":"Starts","adm.cEnd":"Ends","adm.cUsed":"Used","adm.aSlot":"Placement","adm.aTitle":"Title","adm.aText":"Text","adm.aLink":"Target link","adm.aCta":"Button text","adm.aActive":"Visible","adm.nTitle":"Notification title","adm.nBody":"Notification body","adm.nTarget":"Recipient","adm.nAll":"All users","adm.nOne":"A specific user","adm.nLevel":"Level","adm.nSent":"Notification sent","adm.nOutbox":"SMS & email outbox (demo mode)","adm.sStore":"Store information","adm.sTheme":"Theme","adm.sUi":"Interface layout","adm.mailsms":"Email & SMS","adm.mailCfg":"Mail server (SMTP)","adm.mailEnabled":"Email sending on","adm.mailFrom":"From address","adm.smsCfg":"SMS panel (Kavenegar)","adm.smsEnabled":"SMS sending on","adm.smsKey":"API key","adm.smsSender":"Sender number","adm.console":"System console","adm.consoleHint":"Restart takes a few seconds; the page reloads itself. Resets are irreversible.","adm.sysRestart":"Restart server","adm.sysRestartWarn":"Restart the server now? Users will be disconnected for a few seconds.","adm.sysRestarting":"Restarting\u2026 the page will reload shortly.","adm.sysResetLabel":"Reset sections (irreversible):","adm.sysReset.audit":"Audit log","adm.sysReset.carts":"Guest carts","adm.sysReset.visits":"Visit counters","adm.sysReset.visitors":"Visitors list","adm.secTitle":"Defense & entry queue","adm.secQueueEnabled":"Queue visitors when busy","adm.secQueueDesc":"When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.","adm.secMaxConc":"Max concurrent requests","adm.secTriggerRps":"Requests-per-second trigger","adm.secPassTtl":"Entry pass TTL (minutes)","adm.secPoll":"Queue poll interval (seconds)","adm.secFloodBan":"Auto-ban threshold (requests/minute)","adm.secFloodMin":"Auto-ban duration (minutes)","adm.secSaved":"Defense settings saved.","adm.secInflight":"Active requests","adm.secRps":"Req/sec","adm.secQueued":"In queue","adm.secAutoBans":"Active auto-bans","adm.secTop":"Top talker IPs (last minute)","adm.secPerMin":"Req/min","adm.secTopEmpty":"No unusual traffic recorded.","adm.secBusy":"Busy \u2014 queue active","adm.secNormal":"Normal","adm.banMinutes":"Duration (minutes, 0 = permanent)","adm.banUntil":"Until","adm.banAuto":"auto","adm.resetAudit":"Clear audit logs","adm.resetCarts":"Clear guest carts","adm.resetVisitors":"Clear visitors","adm.resetDone":"Reset done.","adm.resetWarn.audit":"Delete all audit logs?","adm.resetWarn.carts":"Empty all guest carts?","adm.resetWarn.visitors":"Delete the visitors list?","adm.resetWarn.visits":"Zero the visit counters?","adm.visitors":"Visitors","adm.uDevice":"Device / IP","adm.uBrowser":"Browser","adm.uRegion":"Region / time","adm.uPath":"Path","adm.guest":"Guest","adm.bans":"Bans (block / unblock)","adm.banType":"Type","adm.banValue":"Value (IP / phone / email / username)","adm.banReason":"Reason","adm.ban":"Ban","adm.unban":"Unban","adm.banned":"Banned","adm.banDone":"Banned.","adm.unbanDone":"Unbanned.","adm.bansEmpty":"Nobody is banned right now.","adm.banByAdmin":"By admin","adm.channels":"Channels","adm.chSite":"In-site notification","adm.chTelegram":"Telegram bot","adm.chEmail":"Email","adm.chSms":"SMS","adm.channelsHint":"Email/SMS need settings below; without them only ready channels send.","adm.telegram":"Telegram bot","adm.tgHint":"Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.","adm.tgEnabled":"Bot on","adm.tgToken":"Bot token","adm.tgTokenHint":"Like 123456:ABC-\u2026","adm.tgWelcome":"/start welcome message","adm.tgTest":"Test send","adm.tgInbox":"Inbox","adm.tgSubs":"Subscribers","adm.tgReplyPh":"Reply to this user\u2026","adm.tgInboxEmpty":"No messages yet.","adm.lottery":"Lottery","adm.lotteryNew":"New draw","adm.lotPrize":"Prize","adm.lotEnds":"Ends","adm.lotWinners":"Winners count","adm.lotWinnersList":"Winners","adm.lotMode":"Entry mode","adm.lotModeOrders":"Automatic from orders","adm.lotModeManual":"Manual join button","adm.lotEntries":"Entries","adm.lotRun":"Draw now","adm.lotRunWarn":"Winners are picked randomly and notified now. Continue?","adm.lotDone":"Draw done","adm.lotClose":"Close","adm.lotClosed":"Draw closed.","adm.lotEmpty":"No draws yet.","lot.title":"Yassaei Electronics lottery","lot.nav":"Lottery","lot.soon":"Coming soon \u2014 stay tuned!","lot.done":"Past draws","lot.winners":"Winners","lot.active":"Active","lot.prize":"Prize","lot.ends":"Ends","lot.entries":"Entries","lot.joined":"You are in this draw.","lot.join":"Join draw","lot.joinDone":"Entry recorded \u2014 good luck!","lot.autoEntry":"Every valid order in the draw window counts automatically.","contact.phone3":"Third phone","adm.sBackups":"Backups & dump","adm.backupNow":"Backup now","adm.backupsHint":"A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.","adm.backupsEmpty":'No snapshot yet; hit "Backup now".',"adm.backupSize":"Size","adm.backupRestore":"Restore","adm.backupRestoreWarn":"All current data will be replaced by this snapshot. Sure?","adm.backupDone":"Backup created.","adm.backupRestored":"Restore done; reloading.","adm.dumpFull":"Full site dump","adm.sFeatures":"Features","adm.sShipping":"Shipping","adm.sPlus":"Plus","adm.sOrders":"Orders & payment","adm.sSeo":"SEO","adm.sAuth":"Authentication","adm.sSaved":"Settings saved","adm.tAccent":"Primary colour","adm.tPort":"Port theme (waves, boat and palm in the background)","adm.tPortHint":"Turn it off for a plain neutral background.","adm.tMode":"Default theme","adm.tRadius":"Corner radius","adm.tDensity":"Density","adm.uHeader":"Header layout","adm.uNav":"Menu style","adm.uCards":"Product card style","adm.uSticky":"Sticky header","adm.uTicker":"Top ticker bar","adm.uTickerItems":"Ticker messages","adm.uTickerSpeed":"Ticker speed","adm.uQuick":"Product quick view","adm.uChat":"Floating support button","adm.uCrumb":"Show breadcrumbs","adm.uCols":"Product columns","adm.uColsMobile":"Mobile","adm.uColsTablet":"Tablet","adm.uColsDesktop":"Desktop","adm.uColsWide":"Wide screen","adm.uCardInfo":"Info shown on product cards","adm.uPosStart":"Right (start)","adm.uPosCenter":"Center","adm.uPosEnd":"Left (end)","adm.uLayoutLogoStart":"Logo at start","adm.uLayoutSplit":"Logo start / search center / actions end","adm.uLayoutCentered":"Logo centered","adm.fHint":"Turn off any feature you do not need; its section disappears from the site and panel.","adm.bLabel":"Label printing","adm.bSelect":"Select products","adm.bSize":"Label size","adm.bCopies":"Copies per product","adm.bShowName":"Product name","adm.bShowPrice":"Price","adm.bShowBrand":"Brand","adm.bShowSku":"SKU","adm.bShowQr":"Product page QR code","adm.bType":"Barcode type","adm.bPrint":"Print labels","adm.bGenerate":"Generate new barcode","adm.igPack":"Instagram post pack","adm.igCap":"Caption (editable before copy)","adm.igTags":"Hashtags","adm.igImgHint":"Post image; download it and publish with the caption.","adm.igDl":"Download image","adm.igNoImg":"This product has no image yet; add one via upload or image search first.","adm.igCopyCap":"Copy caption","adm.igCopyTags":"Copy hashtags","adm.igCopyAll":"Copy caption + tags","adm.bGenerated":"Barcode generated and assigned","adm.bScan":"Scan barcode","adm.bScanMode":"Scanner mode (device sync)","adm.bScanHint":"Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.","adm.bConnected":"Device connected \u2014 ready to scan","adm.bSerial":"Direct connection via Web Serial","adm.bSerialHint":"If your device has a serial/USB port, connect here (desktop Chrome/Edge only).","adm.bSerialUnsupported":"Your browser does not support Web Serial; use keyboard or camera mode.","adm.bSerialConnected":"Connected","adm.bSerialClosed":"Connection closed","adm.bHistory":"Recent scans","adm.isTitle":"Image index for visual search","adm.isHint":"Build the index once so customers can search by photo. It runs in your browser and adds no server load.","adm.isBuild":"Build index","adm.isBuilding":"Indexing\u2026","adm.isDone":"Index built","adm.isCount":"Indexed images","adm.auditAction":"Event","adm.auditActor":"User","adm.auditTarget":"Target","adm.auditMeta":"Details","adm.statsRevenue":"Revenue","adm.statsVisits":"Visits","adm.statsOrders":"Orders","adm.statsByCat":"Category performance","adm.statsByBrand":"Sales by brand","adm.statsStockValue":"Inventory value","adm.statsAvgOrder":"Average basket","adm.exportProducts":"Export products","adm.exportOrders":"Export orders","adm.exportUsers":"Export users","adm.exportReviews":"Export reviews","adm.exportTickets":"Export tickets","adm.exportAudit":"Export events","adm.exportAll":"Full backup (JSON)","adm.backup":"Create backup now","adm.cleanup":"Clean old data","adm.cleanupDone":"Cleanup done","adm.pageEditHint":"Edit page texts here; changes apply to the site immediately.","adm.noPermission":"You do not have permission for this section. Ask the owner to grant it.","adm.liveView":"Live preview of changes","adm.saved":"Saved","st.pending_payment":"Pending payment","st.pending_review":"Pending review","st.confirmed":"Confirmed","st.preparing":"Preparing","st.ready_pickup":"Ready for pickup","st.shipped":"Shipped","st.delivered":"Delivered","st.cancelled":"Cancelled","st.refunded":"Refunded","st.returned":"Returned","dl.pickup":"In-store pickup","dl.courier":"Postal shipping","pm.wallet":"Wallet","pm.gateway":"Bank gateway","pm.cod":"Cash on delivery","ps.unpaid":"Unpaid","ps.paid":"Paid","ps.pending":"Pending","ps.refunded":"Refunded","ps.failed":"Failed","ps.cancelled":"Cancelled","tc.order":"Order tracking","tc.return":"Return & refund","tc.product":"Product question","tc.technical":"Technical issue","tc.complaint":"Complaint","tc.partnership":"Partnership & advertising","tc.account":"Account & security","tc.other":"Other","tp.critical":"Critical","tp.high":"High","tp.normal":"Normal","tp.low":"Low","ft.suggestion":"Suggestion","ft.complaint":"Complaint","ft.bug":"Bug report","fs.new":"New","fs.seen":"Seen","fs.in_progress":"In progress","fs.done":"Done","fs.rejected":"Rejected","tk.open":"Open","tk.answered":"Answered","tk.closed":"Closed","feat.wallet":"Wallet","feat.plus":"Plus membership","feat.insurance":"Shipment insurance","feat.tickets":"Ticket system","feat.reviews":"Customer reviews","feat.questions":"Customer questions","feat.ads":"On-site ads","feat.imageSearch":"Image search","feat.barcode":"Barcode & labels","feat.priceCheckDevice":"Price display mode","feat.publicStats":"Public statistics","feat.coupons":"Coupons","feat.consent":"Cookie consent modal (first visit)","feat.liveSupport":"Live chat support","feat.announcements":"Notifications","feat.wishlist":"My list","feat.compare":"Product comparison","feat.recentlyViewed":"Recently viewed","feat.guestCheckout":"Guest checkout","feat.priceAlerts":"Restock alerts","feat.twoFactor":"Two-factor login","feat.referrals":"Referral codes","feat.voiceSearch":"Voice search","feat.offlineMode":"Offline mode","feat.captcha":"Captcha (I'm not a robot)","captcha.required":"Prove you are human first: tick the box and solve the math.","captcha.label":"I'm not a robot","captcha.hint":"Tick it, then solve the tiny math image","captcha.placeholder":"Answer","captcha.solved":"Human verified \u2714","captcha.refresh":"New challenge","perm.dashboard.view":"View dashboard","perm.products.view":"View products","perm.products.create":"Create product","perm.products.edit":"Edit product","perm.products.delete":"Delete product","perm.products.price":"Change price & discount","perm.products.stock":"Change stock","perm.categories.manage":"Manage categories & brands","perm.orders.view":"View orders","perm.orders.manage":"Change order status","perm.refunds.manage":"Refunds & cancellation","perm.reviews.moderate":"Moderate reviews","perm.reviews.reply":"Reply to reviews","perm.tickets.manage":"Manage tickets","perm.feedback.manage":"Feedback & bugs","perm.users.view":"View users","perm.users.manage":"Manage users","perm.users.permissions":"Assign permissions","perm.wallet.manage":"Wallet management","perm.plus.manage":"Plus membership","perm.coupons.manage":"Coupons","perm.ads.manage":"Manage ads","perm.notifications.send":"Send notifications","perm.settings.edit":"Store settings","perm.theme.edit":"Theme & layout","perm.pages.edit":"Edit page content","perm.barcode.print":"Print labels","perm.barcode.scan":"Scan & price display","perm.imagesearch.index":"Image index","perm.audit.view":"Audit log","perm.stats.view":"Statistics","perm.data.export":"Export data","misc.quickView":"Quick view","misc.addToHome":"Add to home screen","misc.installHint":'In your browser menu, choose "Add to Home screen" or "Install".',"misc.printBlocked":"The print dialog did not open; please allow pop-ups.","misc.saved":"Saved","misc.deleted":"Deleted","misc.updated":"Updated","misc.confirmDelete":"Delete this item?","misc.loadingMore":"Loading\u2026","misc.recentlyViewed":"Recently viewed","misc.uiSound":"UI click sound","misc.uiSoundOn":"Click sound on","misc.uiSoundOff":"Click sound off","misc.shareDone":"Link copied","misc.shareNative":"Share","img.alt":"Product image","adm.view":"View","adm.support":"Support chat","adm.supSelect":"Select a conversation","adm.supSelectHint":"Pick a thread from the list to reply.","adm.tkReply":"Support reply","adm.tkManage":"Ticket management","common.updated":"Updated","common.link":"Link","common.text":"Text","cart.coupon":"Coupon code","misc.sent":"Sent","misc.copied":"Copied","adm.revPending":"Pending","adm.revApproved":"Approved","adm.revRejected":"Rejected","adm.revApprove":"Approve","adm.revReject":"Reject","adm.revReply":"Shop reply","adm.revEmpty":"Nothing in this state","adm.revEmptyHint":"No new reviews or questions to moderate.","rev.buyer":"Buyer","rev.visitor":"Visitor","rev.shopReply":"Shop reply","fb.new":"New","fb.seen":"Seen","fb.inProgress":"In progress","fb.done":"Done","fb.rejected":"Rejected","feedback.suggestion":"Suggestion","feedback.complaint":"Complaint","feedback.bug":"Bug report","adm.fbEmptyHint":"No suggestions, complaints or bug reports yet.","adm.cpNew":"New coupon","adm.cpPercent":"Percent","adm.cpAmount":"Fixed amount","adm.cpValue":"Value","adm.cpUsage":"Usage","adm.cpDates":"Validity","adm.cpStart":"Starts","adm.cpEnd":"Ends","adm.cpExpired":"Expired","adm.adNew":"New banner","adm.adSlot":"Placement slot","adm.adsHint":"Schedule, enable or disable banners anywhere on the site.","adm.notifNew":"New notification","adm.notifHint":"Send a notification to everyone or to one user.","adm.notifLevel":"Level","adm.notifRecent":"Recent notifications","notif.level.info":"Info","notif.level.success":"Success","notif.level.warning":"Warning","notif.level.error":"Error","adm.pagesPick":"Pick a page","adm.pagesPickHint":"Choose a page from the list to edit its content.","adm.pgHint":"Changes are text-only and apply immediately.","adm.bPrinter":"Label printer","adm.bPrinterHint":"Labels go to the printer through the browser print dialog.","adm.bScanner":"Barcode scanner","adm.bLabels":"Build & print labels","adm.bPreview":"Label preview","adm.bPriceMode":"Price display mode","adm.bFound":"Product found","adm.bNotFound":"No product with this barcode.","adm.bPickFirst":"Select at least one product first.","adm.ixHint":"Image fingerprints are computed in the browser so visual search works.","adm.ixIndex":"Index remaining images","adm.ixReindex":"Re-index all","adm.ixDone":"Indexing done","adm.audActor":"Actor","adm.audAction":"Action","adm.audTarget":"Target","adm.audMeta":"Details","adm.stOrders":"Orders","adm.stRevenue":"Revenue","adm.stVisits":"Visits","adm.stUsers":"Users","adm.stProducts":"Products","adm.stAvg":"Average order","adm.stByCat":"Category performance","adm.stByBrand":"Top brands","adm.data":"Data","adm.dataHint":"Export, back up and clean up data.","adm.dExport":"Export","adm.dBackup":"Backup","adm.dBackupHint":"A full copy of the database is saved in the data folder.","adm.dCleanup":"Cleanup","adm.dCleanupHint":"Audit entries older than 90 days and expired sessions are removed.","sys.turnOn":"Turn the store on","sys.turnOff":"Turn the store off","sys.offConfirm":"Are you sure? Nobody can buy until you turn it back on.","sys.autoWakeMins":"Auto turn-on after minutes (0 = never)","sys.asleep":"The store is now off.","sys.asleepTimed":"The store is off; it turns back on automatically in {n} minutes.","sys.awake":"The store is on.","sys.sleepBanner":"The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.","sys.keepAlive":"Keep the service warm","checkout.guestInfo":"Guest contact details","checkout.guestHint":"You can buy without an account; we only need this to coordinate delivery.","checkout.guestName":"Full name","checkout.guestPhone":"Mobile number","checkout.guestPhoneHint":"e.g. 09123456789","checkout.guestNameRequired":"Please enter your name.","checkout.guestPhoneInvalid":"Mobile number must be 11 digits starting with 09.","checkout.guestCodPickup":"Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.","home.recent":"Continue where you left off","home.recentSub":"Products you viewed recently","checkout.guestCourierNote":"Sign in for courier delivery"},Rc={fa:Ka,en:Eo},Je="fa",Ks=new Set;$t=()=>Je,q=()=>Je==="fa";Bc=()=>[...Ks],Hc=()=>({fa:Object.keys(Ka).length,en:Object.keys(Eo).length})});var ts={};X(ts,{applyDyn:()=>N,byId:()=>jc,catIcon:()=>xe,copyText:()=>tn,countdown:()=>Yc,debounce:()=>Ze,el:()=>Jt,esc:()=>h,faDigits:()=>oe,fileToDataURL:()=>Ie,fmtDate:()=>O,fmtDay:()=>Vc,fmtMoney:()=>A,fmtMoneyPlain:()=>Wc,fmtNum:()=>g,fmtTel:()=>at,html:()=>r,icon:()=>c,latinDigits:()=>Uc,linkify:()=>Zs,locale:()=>_c,pct:()=>Gc,qs:()=>I,qsa:()=>Oc,raw:()=>ct,safeHref:()=>Dt,scrollTop:()=>Qc,setLocale:()=>Xs,stars:()=>Ht,throttle:()=>Kc,timeAgo:()=>St});function Za(t){return Qa+Xa(String(t!=null?t:""))+Ja}function h(t){if(t==null||t===!1)return Za("");if(typeof t=="object"&&t!==null&&t[To]!==void 0)return t[To];let e=String(t);return e.includes(Qa)||e.includes(Ja)?Xa(e):Za(e.replace(/[&<>"'`]/g,s=>Fc[s]))}function r(t,...e){let s=t[0];for(let n=0;n<e.length;n++){let o=e[n];Array.isArray(o)?s+=o.map(i=>h(i)).join(""):s+=h(o),s+=t[n+1]}return Za(s)}function Jt(t,e={},s=[]){let n=document.createElement(t);for(let[o,i]of Object.entries(e))i==null||i===!1||(o==="class"?n.className=i:o==="text"?n.textContent=i:o.startsWith("on")&&typeof i=="function"?n.addEventListener(o.slice(2).toLowerCase(),i):o==="style"&&typeof i=="object"?Object.assign(n.style,i):n.setAttribute(o,i));for(let o of[].concat(s))o==null||o===!1||n.appendChild(typeof o=="string"?document.createTextNode(o):o);return n}function c(t,e=""){return ct(`<svg class="ic ${e}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${t}"/></svg>`)}function oe(t){return String(t).replace(/[0-9]/g,e=>Js[+e])}function Uc(t){return String(t).replace(/[۰-۹]/g,e=>Js.indexOf(e)).replace(/[٠-٩]/g,e=>"\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e))}function Xs(t){At=t==="en"?"en":"fa"}function g(t){let e=Number(t)||0;return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(e)}function Dt(t){let e=String(t||"").trim();return/^https?:\/\//i.test(e)?e:""}function at(t){let e=String(t!=null?t:"").trim();if(!e)return"";let s=/^(0\d{2})(\d{4})(\d{4})$/.test(e)?e.replace(/^(0\d{2})(\d{4})(\d{4})$/,"$1-$2-$3"):/^(09\d{2})(\d{3})(\d{4})$/.test(e)?e.replace(/^(09\d{2})(\d{3})(\d{4})$/,"$1 $2 $3"):e;return At==="fa"?s.replace(/\d/g,n=>Js[+n]):s}function A(t,{withUnit:e=!0}={}){let s=Math.round(Number(t)||0),n=new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(s);return e?ct(`${n} <span class="pc-cur">${At==="fa"?"\u062A\u0648\u0645\u0627\u0646":"Toman"}</span>`):n}function Wc(t){return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(Math.round(Number(t)||0))}function O(t,{time:e=!0,short:s=!1}={}){if(!t)return"\u2014";let n=new Date(t);if(Number.isNaN(n.getTime()))return"\u2014";try{let o={calendar:At==="fa"?"persian":"gregory"};if(s)return n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",mt({year:"numeric",month:"short",day:"numeric"},o));let i=n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",mt({year:"numeric",month:"long",day:"numeric"},o));if(!e)return i;let l=n.toLocaleTimeString(At==="fa"?"fa-IR":"en-GB",{hour:"2-digit",minute:"2-digit"});return`${i} \xB7 ${l}`}catch(o){return n.toISOString().slice(0,16).replace("T"," ")}}function Vc(t){let e=new Date(t);if(Number.isNaN(e.getTime()))return"\u2014";try{return e.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"short",day:"numeric",calendar:At==="fa"?"persian":"gregory"})}catch(s){return t.slice(0,10)}}function St(t){let e=new Date(t).getTime();if(Number.isNaN(e))return"\u2014";let s=Math.max(1,Math.floor((Date.now()-e)/1e3)),n=(o,i)=>{try{return new Intl.RelativeTimeFormat(At==="fa"?"fa":"en",{numeric:"auto"}).format(-o,i)}catch(l){return`${o} ${i}`}};return s<60?n(s,"second"):s<3600?n(Math.floor(s/60),"minute"):s<86400?n(Math.floor(s/3600),"hour"):s<2592e3?n(Math.floor(s/86400),"day"):s<31536e3?n(Math.floor(s/2592e3),"month"):n(Math.floor(s/31536e3),"year")}function Yc(t){let e=new Date(t).getTime()-Date.now();if(Number.isNaN(e))return"";if(e<=0)return At==="fa"?"\u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A":"Expired";let s=Math.floor(e/864e5),n=Math.floor(e%864e5/36e5),o=Math.floor(e%36e5/6e4),i=Math.floor(e%6e4/1e3);if(s>0)return At==="fa"?`${oe(s)} \u0631\u0648\u0632 \u0648 ${oe(n)} \u0633\u0627\u0639\u062A`:`${s}d ${n}h`;let l=d=>String(d).padStart(2,"0"),p=`${l(n)}:${l(o)}:${l(i)}`;return At==="fa"?oe(p):p}function Ht(t,e=""){let s=Math.round(Number(t)||0),n='<span class="pc-stars">';for(let o=1;o<=5;o++)n+=`<svg class="ic ${o<=s?"":"off"} ${e}" aria-hidden="true"><use href="#i-star"/></svg>`;return ct(n+"</span>")}function Gc(t){return`${g(Math.round(Number(t)||0))}\u066A`}function Zs(t){let e=h(t);return ct(e.replace(/(https?:\/\/[^\s<]+)/g,s=>`<a href="${s}" target="_blank" rel="noopener noreferrer nofollow">${s}</a>`))}function Ze(t,e=260){let s;return(...n)=>{clearTimeout(s),s=setTimeout(()=>t(...n),e)}}function Kc(t,e=200){let s=0,n=null;return(...o)=>{let i=Date.now(),l=e-(i-s);l<=0?(s=i,t(...o)):(clearTimeout(n),n=setTimeout(()=>{s=Date.now(),t(...o)},l))}}function Ie(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>s(new Error("read-failed")),n.readAsDataURL(t)})}function tn(t){var e;return(e=navigator.clipboard)!=null&&e.writeText?navigator.clipboard.writeText(t):new Promise((s,n)=>{try{let o=document.createElement("textarea");o.value=t,o.setAttribute("readonly",""),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),s()}catch(o){n(o)}})}function N(t=document){t.querySelectorAll("[data-w]").forEach(e=>{e.style.width=e.dataset.w}),t.querySelectorAll("[data-h]").forEach(e=>{e.style.height=e.dataset.h}),t.querySelectorAll("[data-maxw]").forEach(e=>{e.style.maxWidth=e.dataset.maxw})}function Qc(t=!0){window.scrollTo({top:0,behavior:t?"smooth":"auto"})}var To,Qa,Ja,Xa,ct,Fc,I,Oc,jc,zc,xe,Js,At,_c,U=V(()=>{To=Symbol("raw"),Qa="",Ja="",Xa=t=>t.replace(/[\u0001\u0002]/g,"");try{if(typeof Element!="undefined"){let t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");t&&t.set&&t.configurable!==!1&&Object.defineProperty(Element.prototype,"innerHTML",{configurable:!0,enumerable:t.enumerable,get(){return t.get.call(this)},set(s){t.set.call(this,typeof s=="string"&&(s.includes(Qa)||s.includes(Ja))?Xa(s):s)}});let e=Element.prototype.insertAdjacentHTML;e&&(Element.prototype.insertAdjacentHTML=function(s,n){return e.call(this,s,typeof n=="string"&&(n.includes(Qa)||n.includes(Ja))?Xa(n):n)})}}catch(t){}ct=t=>Za(t),Fc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};I=(t,e=document)=>e.querySelector(t),Oc=(t,e=document)=>[...e.querySelectorAll(t)],jc=t=>document.getElementById(t);zc={cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box",watch:"watch",phone:"phone",chip:"chip",solder:"solder",tools:"wrench",fan:"fan",tv:"tv",keyboard:"keyboard",measure:"chart",network:"globe",parts:"chip"},xe=t=>zc[t]||"box",Js=["\u06F0","\u06F1","\u06F2","\u06F3","\u06F4","\u06F5","\u06F6","\u06F7","\u06F8","\u06F9"];At="fa";_c=()=>At});var qa={};X(qa,{BUILD:()=>en,CONSENT_TTL_DAYS:()=>Mo,CONSENT_VERSION:()=>fn,S:()=>m,adInSlot:()=>le,addSearch:()=>gn,addToCart:()=>ss,applyCoupon:()=>ns,applyPrefs:()=>Ce,boot:()=>nn,brandById:()=>Jc,brandName:()=>Yt,can:()=>Q,cartCount:()=>ti,catById:()=>Ee,catName:()=>Et,clearCart:()=>cn,clearSearches:()=>ei,connectEvents:()=>yn,deleteNotification:()=>bn,emit:()=>st,feat:()=>B,getImgIndex:()=>ai,hasAlert:()=>rs,hasConsent:()=>vn,inCompare:()=>pn,inWishlist:()=>os,isAdmin:()=>Xc,isPlus:()=>Zt,loadCart:()=>Mt,loadNotifications:()=>ye,loadPrefs:()=>Po,markNotificationsRead:()=>cs,mergeGuestData:()=>un,on:()=>Ft,ordersCfg:()=>sn,plusCfg:()=>xa,prodName:()=>ft,promptInstall:()=>Ea,pushRecent:()=>hn,refreshBootstrap:()=>Ot,refreshMe:()=>te,removeFromCart:()=>rn,setConsent:()=>is,setImgIndex:()=>si,setPref:()=>Te,setQty:()=>on,settings:()=>an,ship:()=>ve,store:()=>Xt,themeCfg:()=>Do,toggleAlert:()=>mn,toggleCompare:()=>dn,toggleWishlist:()=>ln,ui:()=>re,watchInstall:()=>wn,watchNetwork:()=>$n});function Ft(t,e){return ka.has(t)||ka.set(t,new Set),ka.get(t).add(e),()=>{var s;return(s=ka.get(t))==null?void 0:s.delete(e)}}function st(t,e){for(let s of ka.get(t)||[])try{s(e)}catch(n){console.error("[state]",t,n)}}function fe(t,e){try{let s=localStorage.getItem(t);return s?JSON.parse(s):e}catch(s){return e}}function qe(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(s){}}function Po(){var e;let t=fe(Pt.prefs,{});if(m.prefs=mt(mt({},m.prefs),t),(e=m.me)!=null&&e.prefs){let s=m.me.prefs;s.theme&&(m.prefs.theme=s.theme),s.locale&&(m.prefs.locale=s.locale),s.density&&s.density!=="normal"&&(m.prefs.density=s.density),s.reduceMotion!==void 0&&(m.prefs.reduceMotion=!!s.reduceMotion),s.uiSound!==void 0&&(m.prefs.uiSound=!!s.uiSound)}return m.prefs}function Te(t,e,{sync:s=!0}={}){if(m.prefs[t]=e,qe(Pt.prefs,m.prefs),Ce(),st("prefs",{key:t,value:e}),s&&m.me&&["theme","locale","density","reduceMotion","uiSound"].includes(t)){let n={theme:m.prefs.theme,locale:m.prefs.locale,density:m.prefs.density,reduceMotion:m.prefs.reduceMotion,uiSound:!!m.prefs.uiSound};f.patch("/api/me",{prefs:n}).then(o=>{o!=null&&o.me&&(m.me=o.me,st("me",m.me))}).catch(()=>{})}}function Ce(){var H,F,ot,R,P,et;let t=document.documentElement,e=Do(),s=m.prefs,n=s.locale||"fa";Qs(n),Xs(n),t.setAttribute("data-lang",n);let o=s.theme||e.mode||"dark";o==="auto"&&(o=(H=window.matchMedia)!=null&&H.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"),t.setAttribute("data-mode",o),t.setAttribute("data-theme",e.theme||"default"),t.setAttribute("color-scheme",o),t.setAttribute("data-port",e.portTheme===!1?"off":"on"),t.setAttribute("data-bg",e.bgStyle||"waves"),t.setAttribute("data-variant",e.variant==="classic"?"classic":"fresh");let i=Math.max(0,Math.min(28,Number((F=e.radius)!=null?F:16)));t.style.setProperty("--radius",`${i}px`),t.style.setProperty("--radius-sm",`${Math.max(4,Math.round(i*.68))}px`),t.style.setProperty("--radius-lg",`${Math.round(i*1.5)}px`);let l=s.density==="compact"||s.density==="comfy"?s.density:e.density||"normal";t.setAttribute("data-density",l),t.setAttribute("data-contrast",e.contrast==="high"?"high":"normal");let p=s.reduceMotion===!0||e.animations===!1;t.setAttribute("data-motion",p?"off":"on");let d=/^#[0-9a-f]{6}$/i.test(String(e.accent||"").trim())?e.accent.trim():"#f59e0b",[b,u,v]=Zc(d).split(",").map(kt=>parseInt(kt,10));t.style.setProperty("--accent",d),t.style.setProperty("--accent-rgb",`${b}, ${u}, ${v}`),t.style.setProperty("--accent-2",Co(d,-34)),t.style.setProperty("--accent-3",Co(d,52)),t.style.setProperty("--accent-soft",`rgba(${b}, ${u}, ${v}, .14)`);let w=re();t.setAttribute("data-nav",w.navStyle==="underline"?"underline":"pills"),t.setAttribute("data-cards",w.cardStyle==="list"?"list":"grid"),t.style.setProperty("--cols-m",String(es((ot=w.columns)==null?void 0:ot.mobile,2,1,3))),t.style.setProperty("--cols-t",String(es((R=w.columns)==null?void 0:R.tablet,3,2,4))),t.style.setProperty("--cols-d",String(es((P=w.columns)==null?void 0:P.desktop,4,3,6))),t.style.setProperty("--cols-w",String(es((et=w.columns)==null?void 0:et.wide,5,3,7))),t.style.setProperty("--ticker-dur",`${Math.max(8,Number(w.tickerSpeed)||30)}s`);let $=document.getElementById("headerGrid");$&&($.setAttribute("data-search-position",["start","center","end"].includes(w.searchPosition)?w.searchPosition:"center"),$.setAttribute("data-header-layout",["logoStart","split","centered"].includes(w.headerLayout)?w.headerLayout:"split"));let k=document.getElementById("siteHeader");k&&k.setAttribute("data-sticky",w.stickyHeader===!1?"off":"on");let C=document.getElementById("topbar");C&&(C.hidden=w.showTicker===!1&&!m.ticker.length),st("theme",{mode:o,loc:n}),setTimeout(()=>{let kt=document.querySelector('meta[name="theme-color"]');if(kt){let gt=getComputedStyle(t).getPropertyValue("--bg").trim();gt&&kt.setAttribute("content",gt)}},50)}function es(t,e,s,n){let o=Number(t);return Number.isFinite(o)?Math.max(s,Math.min(n,Math.round(o))):e}function Zc(t){let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());return e?`${parseInt(e[1],16)}, ${parseInt(e[2],16)}, ${parseInt(e[3],16)}`:"49, 175, 212"}function Co(t,e){let s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());if(!s)return t;let n=o=>Math.max(0,Math.min(255,o+e)).toString(16).padStart(2,"0");return`#${n(parseInt(s[1],16))}${n(parseInt(s[2],16))}${n(parseInt(s[3],16))}`}async function nn(){var s;m.recent=fe(Pt.recent,[]),m.searches=fe(Pt.search,[]),m.consent=fe(Pt.consent,null),m.wishlist=fe(Pt.wish,[]),m.compare=fe(Pt.cmp,[]),m.installed=((s=window.matchMedia)==null?void 0:s.call(window,"(display-mode: standalone)").matches)||typeof navigator!="undefined"&&navigator.standalone===!0;let t=null,e=Date.now();for(let n=0;n<10&&!t;n++){n&&await new Promise(o=>setTimeout(o,5e3));try{t=await f.get("/api/bootstrap")}catch(o){console.warn("[state] bootstrap failed",o)}!t&&Date.now()-e>6e3&&st("boot-slow")}return t&&(m.serverTime=t.serverTime,m.sleeping=!!t.sleeping,m.sleepSince=t.sleepSince||null,m.settings=t.settings||{},m.categories=t.categories||[],m.brands=t.brands||[],m.me=t.me||null,m.stats=t.stats||null,m.ads=t.ads||[],m.ticker=t.ticker||[],m.orderStatuses=t.orderStatuses||[],m.ticketCategories=t.ticketCategories||[],m.ticketPriorities=t.ticketPriorities||[]),t||st("boot-failed"),Po(),Ce(),m.me&&(m.wishlist=m.me.wishlist||[],m.compare=m.me.compare||[],m.alerts=m.me.alerts||[],m.unread=m.me.unreadNotifications||0),await Promise.all([Mt().catch(()=>{}),m.me?ye(!0).catch(()=>{}):Promise.resolve()]),m.ready=!0,yn(),st("ready",m),m}async function Ot({silent:t=!1}={}){try{let e=await f.get("/api/bootstrap");return m.settings=e.settings||m.settings,m.sleeping=!!e.sleeping,m.sleepSince=e.sleepSince||null,m.categories=e.categories||m.categories,m.brands=e.brands||m.brands,m.stats=e.stats||null,m.ads=e.ads||[],m.ticker=e.ticker||[],e.me!==void 0&&(m.me=e.me||null,st("me",m.me)),Ce(),st("settings",m.settings),m}catch(e){if(!t)throw e;return m}}async function te(){if(!m.me)return null;try{let t=await f.get("/api/me");return m.me=t.me||null,m.me&&(m.wishlist=m.me.wishlist||[],m.compare=m.me.compare||[],m.alerts=m.me.alerts||[],m.unread=m.me.unreadNotifications||0),st("me",m.me),m.me}catch(t){return m.me}}async function Mt(){var t,e;try{let s=await f.get("/api/cart");m.cart=s.cart||m.cart,((t=s.quote)==null?void 0:t.freeOver)!==void 0&&(m.freeOver=s.quote.freeOver),((e=s.quote)==null?void 0:e.plus)!==void 0&&(m.cartPlus=s.quote.plus)}catch(s){m.cart={items:[],count:0,subtotal:0,weight:0,coupon:null}}return st("cart",m.cart),m.cart}async function ss(t,e=1){let s=await f.post("/api/cart/add",{productId:t,qty:e});return m.cart=s.cart,st("cart",m.cart),s}async function on(t,e){let s=await f.patch("/api/cart/item",{productId:t,qty:e});return m.cart=s.cart,st("cart",m.cart),s}async function rn(t){let e=await f.del(`/api/cart/item/${encodeURIComponent(t)}`);return m.cart=e.cart,st("cart",m.cart),e}async function cn(){let t=await f.post("/api/cart/clear");return m.cart=t.cart||{items:[],count:0,subtotal:0,weight:0,coupon:null},st("cart",m.cart),t}async function ns(t){let e=await f.post("/api/cart/coupon",{code:t});return m.cart=e.cart,st("cart",m.cart),e}async function Sa(t,e){let s=await f.post(`/api/me/${t}/${encodeURIComponent(e)}`);return t==="wishlist"&&(m.wishlist=s.wishlist||m.wishlist),t==="compare"&&(m.compare=s.compare||m.compare),t==="alerts"&&(m.alerts=s.alerts||m.alerts),s}async function ln(t){if(!m.me){let s=m.wishlist.indexOf(t);return s>=0?m.wishlist.splice(s,1):m.wishlist.push(t),qe(Pt.wish,m.wishlist),st("wishlist",m.wishlist),{in:m.wishlist.includes(t)}}let e=await Sa("wishlist",t);return st("wishlist",m.wishlist),e}async function dn(t){if(!m.me){let s=m.compare.indexOf(t);return s>=0?m.compare.splice(s,1):(m.compare.length>=4&&m.compare.shift(),m.compare.push(t)),qe(Pt.cmp,m.compare),st("compare",m.compare),{in:m.compare.includes(t)}}let e=await Sa("compare",t);return st("compare",m.compare),e}async function mn(t){if(!m.me)throw new Error("login_required");let e=await Sa("alerts",t);return st("alerts",m.alerts),e}async function un(){if(!m.me)return;let t=fe(Pt.wish,[]),e=fe(Pt.cmp,[]),s=[];for(let n of t)m.wishlist.includes(n)||s.push(Sa("wishlist",n).catch(()=>{}));for(let n of e)!m.compare.includes(n)&&m.compare.length<4&&s.push(Sa("compare",n).catch(()=>{}));await Promise.all(s),st("wishlist",m.wishlist),st("compare",m.compare)}async function ye(t=!1){if(!m.me)return m.notifications=[],m.unread=0,[];try{let e=await f.get("/api/me/notifications");m.notifications=e.items||[],m.unread=m.notifications.filter(s=>!s.read).length,m.me&&(m.me.unreadNotifications=m.unread),st("notifications",m.notifications)}catch(e){if(!t)throw e}return m.notifications}async function cs(t,e=!1){let s=await f.post("/api/me/notifications/read",{ids:t||[],all:e});return await ye(!0),s}async function bn(t){await f.del(`/api/me/notifications/${encodeURIComponent(t)}`),await ye(!0)}function hn(t){B("recentlyViewed")&&(m.recent=[t,...m.recent.filter(e=>e!==t)].slice(0,12),qe(Pt.recent,m.recent),st("recent",m.recent))}function gn(t){let e=String(t||"").trim();e&&(m.searches=[e,...m.searches.filter(s=>s!==e)].slice(0,8),qe(Pt.search,m.searches))}function ei(){m.searches=[],qe(Pt.search,[])}function is(t){m.consent=zt(mt({},t),{v:fn,at:new Date().toISOString()}),qe(Pt.consent,m.consent),m.me&&f.patch("/api/me",{consent:!0}).catch(()=>{}),st("consent",m.consent)}function yn(){if(ie)try{ie.close()}catch(t){}if(typeof EventSource!="undefined"){try{ie=new EventSource("/api/events",{withCredentials:!0})}catch(t){return}ie.addEventListener("ready",()=>{m.online=!0}),ie.addEventListener("support",t=>{st("sse:support",as(t.data))}),ie.addEventListener("ticket",t=>{st("sse:ticket",as(t.data)),st("notif",as(t.data))}),ie.addEventListener("notif",t=>{st("sse:notif",as(t.data)),ye(!0)}),ie.addEventListener("settings",()=>Ot({silent:!0})),ie.onerror=()=>{try{ie.close()}catch(t){}clearTimeout(Ao),Ao=setTimeout(yn,8e3)}}}function as(t){try{return JSON.parse(t)}catch(e){return null}}function $n(){window.addEventListener("online",()=>{m.online=!0,st("online",!0),Mt().catch(()=>{})}),window.addEventListener("offline",()=>{m.online=!1,st("online",!1)})}function wn(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),m.installPrompt=t,st("install",t)}),window.addEventListener("appinstalled",()=>{m.installed=!0,m.installPrompt=null,st("installed")})}async function Ea(){if(!m.installPrompt)return!1;m.installPrompt.prompt();let t=await m.installPrompt.userChoice;return m.installPrompt=null,(t==null?void 0:t.outcome)==="accepted"}function ai(){return fe(Pt.imgIdx,null)}function si(t){qe(Pt.imgIdx,t)}var Pt,m,ka,en,an,Xt,re,Do,B,ve,xa,sn,Ee,Jc,Zt,Xc,Q,Et,Yt,ft,le,ti,os,pn,rs,fn,Mo,vn,ie,Ao,K=V(()=>{Z();G();U();Pt={prefs:"bm_prefs_v1",cart:"bm_cart_local_v1",wish:"bm_wish_v1",cmp:"bm_cmp_v1",recent:"bm_recent_v1",search:"bm_search_v1",consent:"bm_consent_v1",imgIdx:"bm_img_index_v1"},m={ready:!1,serverTime:null,sleeping:!1,sleepSince:null,settings:null,categories:[],brands:[],me:null,stats:null,ads:[],ticker:[],orderStatuses:[],ticketCategories:[],ticketPriorities:[],cart:{items:[],count:0,subtotal:0,weight:0,coupon:null},wishlist:[],compare:[],alerts:[],notifications:[],unread:0,recent:[],searches:[],prefs:{theme:"dark",locale:"fa",density:"normal",reduceMotion:!1,view:"grid"},consent:null,online:typeof navigator!="undefined"?navigator.onLine:!0,installPrompt:null,installed:!1},ka=new Map;en="ys-v8",an=()=>m.settings||{},Xt=()=>{var t;return((t=m.settings)==null?void 0:t.store)||{}},re=()=>{var t;return((t=m.settings)==null?void 0:t.ui)||{}},Do=()=>{var t;return((t=m.settings)==null?void 0:t.theme)||{}},B=t=>{var e,s;return((s=(e=m.settings)==null?void 0:e.features)==null?void 0:s[t])!==!1},ve=()=>{var t;return((t=m.settings)==null?void 0:t.shipping)||{}},xa=()=>{var t;return((t=m.settings)==null?void 0:t.plus)||{}},sn=()=>{var t;return((t=m.settings)==null?void 0:t.orders)||{}},Ee=t=>m.categories.find(e=>e.id===t)||null,Jc=t=>m.brands.find(e=>e.id===t)||null,Zt=()=>{var t,e,s,n;return!!((e=(t=m.me)==null?void 0:t.plus)!=null&&e.active&&((n=(s=m.me)==null?void 0:s.plus)!=null&&n.until)&&new Date(m.me.plus.until)>new Date)},Xc=()=>{var t;return!!((t=m.me)!=null&&t.isAdmin)},Q=t=>{var e;return m.me?m.me.role==="owner"?!0:((e=m.me.permissions)==null?void 0:e[t])===!0:!1},Et=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",Yt=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",ft=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",le=t=>B("ads")?m.ads.filter(e=>e.slot===t&&e.active!==!1):[];ti=()=>{var t;return((t=m.cart)==null?void 0:t.count)||0};os=t=>m.wishlist.includes(t),pn=t=>m.compare.includes(t),rs=t=>m.alerts.includes(t);fn=2,Mo=180,vn=()=>{let t=m.consent;if(!(t!=null&&t.at)||(t.v||1)!==fn)return!1;let e=Date.now()-Date.parse(t.at);return Number.isFinite(e)&&e>=0&&e<Mo*864e5};ie=null,Ao=null});var ms={};X(ms,{adaptive:()=>Sn,clearInvalid:()=>ls,confirmDelete:()=>Gt,confirmDialog:()=>wt,copyWithToast:()=>vi,drawer:()=>kn,emptyState:()=>L,errorState:()=>_,fillSelect:()=>fi,installHintModal:()=>Fe,lightbox:()=>He,listSkeleton:()=>ui,loadingBar:()=>Da,markInvalid:()=>gi,modal:()=>pt,notice:()=>Aa,productSkeleton:()=>pi,promptDialog:()=>de,readForm:()=>hi,sheet:()=>Ta,spinner:()=>Ca,tableSkeleton:()=>bi,toast:()=>it,toastApiError:()=>S,toastError:()=>Y,toastSuccess:()=>E,toastWarn:()=>mi,uiClickSound:()=>ds,uiSoundEnabled:()=>Tn,updateSleepScreen:()=>qn,wireAccordions:()=>xn,wireTabs:()=>En,withBusy:()=>D});function it(t,{type:e="info",title:s="",timeout:n=3800,action:o=null}={}){let i=ri();if(!i)return null;let l=`t${++di}`,p=ii[e]||"info",d=Jt("div",{class:`toast ${p}`,id:l,role:e==="error"?"alert":"status"});for(d.innerHTML=r`
    ${c(li[e]||"info")}
    <div class="grow">
      ${s?r`<div class="toast-t">${s}</div>`:""}
      <div class="${s?"toast-d":"toast-t"}">${t}</div>
    </div>
    ${o?r`<button type="button" class="toast-act" data-tid="${l}">${o.label}</button>`:""}
    <button type="button" class="toast-x" aria-label="${a("common.close")}" data-close="${l}">${c("close")}</button>`,i.appendChild(d);i.children.length>4;)i.firstElementChild.remove();let b=()=>{d.isConnected&&(d.classList.add("out"),setTimeout(()=>d.remove(),220))},u=n>0?setTimeout(b,n):null;return d.addEventListener("click",v=>{if(v.target.closest("[data-close]")){clearTimeout(u),b();return}if(o&&v.target.closest("[data-tid]")){clearTimeout(u),b();try{o.onClick()}catch(w){console.error(w)}}}),{close:()=>{clearTimeout(u),b()}}}function S(t,e="err.generic"){let s=t instanceof ne?$t()==="en"&&t.details||t.message:Gs(t);Y(s||a(e))}function Lo(t){t?(document.body.classList.add("locked"),document.documentElement.classList.add("locked")):Re.length||(document.body.classList.remove("locked"),document.documentElement.classList.remove("locked"))}function Be(t){var kt;let{kind:e="modal",title:s="",subtitle:n="",size:o="md",body:i="",footer:l="",onMount:p=null,onClose:d=null,closeBtn:b=!0,dismissible:u=!0}=t,v=e==="modal"?ni():oi();if(!v)return{close:()=>{}};let w=document.activeElement,$=window.innerWidth<760,k=e==="drawer"&&$?"sheet":e,C=Jt("div",{class:`overlay${k==="drawer"?" overlay-drawer":""}${k==="sheet"?" overlay-sheet":""}`}),H=k==="modal"?`modal ${(kt=ci[o])!=null?kt:""}`.trim():k,F=Jt("div",{class:H,role:"dialog","aria-modal":"true"});s&&F.setAttribute("aria-label",s);let ot=k==="modal"?"modal-h":"drawer-h",R=k==="modal"?"modal-b":"drawer-b";F.innerHTML=r`
    ${s?r`<header class="${ot}">
      <div class="grow"><h3>${s}</h3>${n?r`<p class="small muted">${n}</p>`:""}</div>
      ${b?r`<button type="button" class="layer-x" data-lx aria-label="${a("common.close")}">${c("close")}</button>`:""}
    </header>`:b?r`<button type="button" class="layer-x" data-lx aria-label="${a("common.close")}">${c("close")}</button>`:""}
    <div class="${R}">${i}</div>
    ${l?r`<footer class="modal-f">${l}</footer>`:""}`,C.appendChild(F),v.appendChild(C),Lo(!0);let P=!1,et={panel:F,overlay:C,result:void 0,dismissible:u,close(gt){if(!P){P=!0,et.result=gt,C.classList.add("out"),F.classList.add("out"),setTimeout(()=>{var Tt;C.remove();let z=Re.indexOf(et);z>=0&&Re.splice(z,1),Lo(!1);try{(Tt=w==null?void 0:w.focus)==null||Tt.call(w,{preventScroll:!0})}catch(se){}},190);try{d==null||d(gt)}catch(z){console.error(z)}}}};Re.push(et),C.addEventListener("click",gt=>{if(b&&gt.target.closest("[data-lx]")){et.close(null);return}gt.target===C&&u&&et.close(null)}),F.addEventListener("keydown",gt=>{if(gt.key!=="Tab")return;let Tt=[...F.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([type=hidden]), select, [tabindex]:not([tabindex="-1"])')].filter(ge=>ge.offsetParent!==null);if(!Tt.length)return;let se=Tt[0],Vt=Tt[Tt.length-1];gt.shiftKey&&document.activeElement===se?(gt.preventDefault(),Vt.focus()):!gt.shiftKey&&document.activeElement===Vt&&(gt.preventDefault(),se.focus())}),setTimeout(()=>{let gt=F.querySelector("[data-autofocus], input:not([type=hidden]), textarea, select");try{gt==null||gt.focus({preventScroll:!0})}catch(z){}},70);try{p==null||p(F,et)}catch(gt){console.error(gt)}return et}function wt({title:t="",text:e="",okText:s="",cancelText:n="",danger:o=!1,icon:i="alert"}={}){return new Promise(l=>{let p=!1;Be({kind:"modal",title:t||a("common.warning"),size:"sm",body:r`
        <div class="confirm-body">
          <span class="confirm-ic ${o?"danger":""}">${c(i)}</span>
          <p class="confirm-text">${e}</p>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${n||a("common.cancel")}</button>
        <button type="button" class="btn ${o?"btn-danger":"btn-primary"}" data-yes data-autofocus>${s||a("common.confirm")}</button>`,onClose:()=>l(p),onMount:(d,b)=>{d.querySelector("[data-no]").addEventListener("click",()=>{p=!1,b.close()}),d.querySelector("[data-yes]").addEventListener("click",()=>{p=!0,b.close()})}})})}function de({title:t="",text:e="",label:s="",value:n="",type:o="text",okText:i="",required:l=!1,rows:p=4}={}){return new Promise(d=>{let b=null;Be({kind:"modal",title:t||a("common.note"),size:"sm",body:r`
        <form class="prompt-form" data-pf>
          ${e?r`<p class="confirm-text mb-s">${e}</p>`:""}
          <label class="field">
            <span class="label">${s||t}</span>
            ${o==="textarea"?r`<textarea class="textarea" name="v" rows="${p}" data-autofocus>${n}</textarea>`:r`<input class="input" type="${o}" name="v" value="${n}" data-autofocus>`}
          </label>
        </form>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${a("common.cancel")}</button>
        <button type="button" class="btn btn-primary" data-yes>${i||a("common.confirm")}</button>`,onClose:()=>d(b),onMount:(u,v)=>{let w=u.querySelector("[name=v]"),$=()=>{let k=String(w.value||"").trim();if(l&&!k){w.classList.add("invalid"),w.focus();return}b=k,v.close()};u.querySelector("[data-no]").addEventListener("click",()=>{b=null,v.close()}),u.querySelector("[data-yes]").addEventListener("click",$),u.querySelector("[data-pf]").addEventListener("submit",k=>{k.preventDefault(),$()}),w.addEventListener("keydown",k=>{k.key==="Enter"&&o!=="textarea"&&(k.preventDefault(),$())})}})})}function He(t,e=0,s=""){let n=$=>typeof $=="string"?{url:$,kind:"image"}:$,o=(Array.isArray(t)?t:[t]).filter(Boolean).map(n).filter($=>$.url);if(!o.length)return null;let i=Math.max(0,Math.min(e,o.length-1)),l=null,p=1,d=0,b=0,u=$=>{let k=$==null?void 0:$.querySelector(".lb-img");k&&(k.style.transform=`translate(${d.toFixed(0)}px, ${b.toFixed(0)}px) scale(${p.toFixed(2)})`),$==null||$.classList.toggle("zoomed",p>1.01)},v=()=>{p=1,d=0,b=0},w=()=>{let $=o[i],k=$.kind==="video"?`<video class="lb-img lb-video" src="${$.url}" controls playsinline autoplay preload="metadata"></video>`:`<img class="lb-img" src="${$.url}" alt="${s||a("img.alt")}" decoding="async" draggable="false">`;return r`
    <figure class="lb-figure">
      ${ct(k)}
      <div class="lb-tools" role="toolbar" aria-label="${a("pdp.zoomHint")}">
        <button type="button" class="icon-btn" data-zin aria-label="${a("pdp.zoomIn")}">${c("plus")}</button>
        <button type="button" class="icon-btn" data-zout aria-label="${a("pdp.zoomOut")}">${c("minus")}</button>
        <button type="button" class="icon-btn tiny-txt" data-zreset aria-label="${a("pdp.zoomReset")}">1x</button>
      </div>
      ${o.length>1?r`<figcaption class="lb-count">${i+1} / ${o.length}${$.kind==="video"?` \xB7 ${a("pdp.video")}`:""}</figcaption>`:""}
    </figure>`};return Be({kind:"modal",size:"lg",title:"",body:r`<div data-lb>${w()}</div>`,footer:o.length>1?r`
      <button type="button" class="btn btn-ghost" data-prev>${c("chevron-right")} ${a("common.prev")}</button>
      <button type="button" class="btn btn-ghost" data-next>${a("common.next")} ${c("chevron-left")}</button>`:"",onClose:()=>{l&&document.removeEventListener("keydown",l),l=null},onMount:$=>{var kt,gt;let k=$.querySelector("[data-lb]"),C=()=>k.querySelector(".lb-figure"),H=z=>{i=(i+z+o.length)%o.length,v(),k.innerHTML=w(),et()};(kt=$.querySelector("[data-prev]"))==null||kt.addEventListener("click",()=>H(-1)),(gt=$.querySelector("[data-next]"))==null||gt.addEventListener("click",()=>H(1));let F=(z,Tt,se)=>{let Vt=Math.max(1,Math.min(4,p*z));Vt===1?(d=0,b=0):Tt!=null&&(d=Tt-(Tt-d)*(Vt/p),b=se-(se-b)*(Vt/p)),p=Vt,u(C())},ot=new Map,R=0,P=1,et=()=>{var Vt,ge,Ne,Ya,bo,ho;let z=C();if(!z)return;let Tt=z.querySelector(".lb-img");(Vt=z.querySelector("[data-zin]"))==null||Vt.addEventListener("click",()=>F(1.5)),(ge=z.querySelector("[data-zout]"))==null||ge.addEventListener("click",()=>F(1/1.5)),(Ne=z.querySelector("[data-zreset]"))==null||Ne.addEventListener("click",()=>{v(),u(z)}),z.addEventListener("wheel",xt=>{if(o[i].kind==="video")return;xt.preventDefault();let Bt=z.getBoundingClientRect();F(xt.deltaY<0?1.18:1/1.18,xt.clientX-Bt.left-Bt.width/2,xt.clientY-Bt.top-Bt.height/2)},{passive:!1}),z.addEventListener("dblclick",xt=>{if(o[i].kind==="video")return;let Bt=z.getBoundingClientRect();p>1.01?v():F(2.5,xt.clientX-Bt.left-Bt.width/2,xt.clientY-Bt.top-Bt.height/2),u(z)}),z.addEventListener("pointerdown",xt=>{var Bt;if(o[i].kind!=="video"){if(ot.set(xt.pointerId,[xt.clientX,xt.clientY]),ot.size===2){let[$a,wa]=[...ot.values()];R=Math.hypot($a[0]-wa[0],$a[1]-wa[1]),P=p}(Bt=z.setPointerCapture)==null||Bt.call(z,xt.pointerId)}}),z.addEventListener("pointermove",xt=>{if(!ot.has(xt.pointerId))return;let Bt=ot.get(xt.pointerId);if(ot.set(xt.pointerId,[xt.clientX,xt.clientY]),ot.size===2&&R){let[$a,wa]=[...ot.values()],Cc=Math.hypot($a[0]-wa[0],$a[1]-wa[1]);p=Math.max(1,Math.min(4,P*(Cc/R))),p===1&&(d=0,b=0),u(z)}else p>1.01&&(d+=xt.clientX-Bt[0],b+=xt.clientY-Bt[1],u(z))});let se=xt=>{ot.delete(xt.pointerId),ot.size<2&&(R=0)};z.addEventListener("pointerup",se),z.addEventListener("pointercancel",se),(Ya=z.querySelector("[data-zin]"))==null||Ya.addEventListener("click",()=>F(1.3)),(bo=z.querySelector("[data-zout]"))==null||bo.addEventListener("click",()=>F(1/1.3)),(ho=z.querySelector("[data-zreset]"))==null||ho.addEventListener("click",()=>{v(),u(z)}),u(z)};et(),l=z=>{z.key==="ArrowLeft"?H(1):z.key==="ArrowRight"?H(-1):z.key==="+"||z.key==="="?F(1.3):z.key==="-"?F(1/1.3):z.key==="0"&&(v(),u(C()))},document.addEventListener("keydown",l)}})}function pi(t=8){let e="";for(let s=0;s<t;s++)e+='<div class="sk sk-card"></div>';return ct(`<div class="pgrid">${e}</div>`)}function ui(t=5,e=3){let s="";for(let n=0;n<t;n++){let o="";for(let i=0;i<e;i++)o+=`<div class="sk sk-line w${[70,40,55,80][i%4]}"></div>`;s+=r`<div class="card row-card">${o}</div>`}return s}function bi(t=6,e=4){let s="";for(let n=0;n<t;n++){let o="";for(let i=0;i<e;i++)o+=`<td><div class="sk sk-line w${[80,55,40,70][i%4]}"></div></td>`;s+=`<tr>${o}</tr>`}return ct(`<div class="table-wrap"><table class="table"><tbody>${s}</tbody></table></div>`)}function L({icon:t="box",title:e="",text:s="",action:n=null,act:o=null}={}){return r`
    <div class="empty">
      <span class="empty-ic">${c(t)}</span>
      <h4>${e||a("common.noData")}</h4>
      ${s?r`<p>${s}</p>`:""}
      ${n?r`<a class="btn btn-primary" href="${n.href||"#/"}">${n.label}</a>`:""}
      ${o?r`<button type="button" class="btn btn-primary" data-act="${o.act}" ${o.arg?r`data-arg="${o.arg}"`:""}>${o.label}</button>`:""}
    </div>`}function _({title:t="",text:e="",retryAct:s="ui-retry"}={}){return r`
    <div class="empty">
      <span class="empty-ic danger">${c("alert")}</span>
      <h4>${t||a("err.generic")}</h4>
      ${e?r`<p>${e}</p>`:""}
      <button type="button" class="btn btn-primary" data-act="${s}">${a("common.retry")}</button>
    </div>`}function Da(t){t?(clearTimeout(No),Ut||(Ut=Jt("div",{class:"loadbar"}),Ut.innerHTML='<span class="loadbar-fill"></span>',document.body.appendChild(Ut)),requestAnimationFrame(()=>Ut==null?void 0:Ut.classList.add("on"))):No=setTimeout(()=>{Ut==null||Ut.classList.remove("on"),setTimeout(()=>{Ut==null||Ut.remove(),Ut=null},420)},160)}async function D(t,e,{busyText:s=""}={}){let n=typeof t=="string"?I(t):t,o=n?n.innerHTML:"";try{return n&&(n.disabled=!0,n.classList.add("busy"),n.innerHTML=r`<span class="spinner"></span>${s||a("common.loading")}`),await e()}finally{n&&(n.disabled=!1,n.classList.remove("busy"),n.innerHTML=o)}}function hi(t){let e={},s=new FormData(t);for(let[n,o]of s.entries())n in e&&!Array.isArray(e[n])?e[n]=[e[n],o]:n in e?e[n].push(o):e[n]=o;for(let n of t.querySelectorAll("input[type=checkbox]"))e[n.name]=n.checked;return e}function gi(t,e,s){var i;let n=t.querySelector(`[name="${e}"]`);if(!n)return;n.classList.add("invalid");let o=(i=n.closest(".field"))==null?void 0:i.querySelector(".field-err");o||(o=Jt("span",{class:"field-err"}),(n.closest(".field")||n.parentElement).appendChild(o)),o.textContent=s;try{n.focus({preventScroll:!1})}catch(l){}}function ls(t){t.querySelectorAll(".invalid").forEach(e=>e.classList.remove("invalid")),t.querySelectorAll(".field-err").forEach(e=>e.remove())}function fi(t,e,{valueKey:s="id",labelKey:n="label",placeholder:o="",selected:i=""}={}){if(!t)return;let l=o?[`<option value="">${h(o)}</option>`]:[];for(let p of e){let d=p[s];l.push(`<option value="${h(d)}"${String(d)===String(i)?" selected":""}>${h(p[n])}</option>`)}t.innerHTML=l.join("")}async function vi(t,e){let{copyText:s}=await Promise.resolve().then(()=>(U(),ts));try{await s(String(t)),E(e||a("common.copied"))}catch(n){Y(a("err.generic"))}}function Fe(){let t=$t()==="fa"?["\u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 (\u22EE \u06CC\u0627 \u062F\u06A9\u0645\u0647\u0654 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC) \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646.","\u06AF\u0632\u06CC\u0646\u0647\u0654 \xAB\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC\xBB \u06CC\u0627 \xABInstall app\xBB \u0631\u0627 \u0628\u0632\u0646.","\u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646\u061B \u0622\u06CC\u06A9\u0648\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."]:["Open the browser menu (\u22EE or the Share button).","Choose \u201CAdd to Home screen\u201D or \u201CInstall app\u201D.","Confirm \u2014 the Yassaei Electronics icon appears on your home screen."];pt({title:a("misc.addToHome"),size:"sm",body:r`
      <div class="install-hint">
        <ol class="steps-list">${t.map(e=>r`<li>${e}</li>`)}</ol>
        <p class="muted small">${a("misc.installHint")}</p>
      </div>`,footer:r`<button type="button" class="btn btn-primary" data-ok>${a("common.done")}</button>`,onMount:(e,s)=>e.querySelector("[data-ok]").addEventListener("click",()=>s.close())})}function xn(t=document){t.querySelectorAll(".acc-h").forEach(e=>{e.dataset.wired||(e.dataset.wired="1",e.addEventListener("click",()=>{let s=e.closest(".acc-item"),n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),e.setAttribute("aria-expanded",String(n))}))})}function En(t=document,e=null){t.querySelectorAll(".tabs").forEach(s=>{s.dataset.wired||(s.dataset.wired="1",s.addEventListener("click",n=>{let o=n.target.closest("[data-tab]");if(!o)return;let i=o.dataset.tab;s.querySelectorAll("[data-tab]").forEach(p=>p.classList.toggle("active",p===o)),t.querySelectorAll("[data-panel]").forEach(p=>{p.hidden=p.dataset.panel!==i}),e==null||e(i)}))})}function qn({sleeping:t=!1,canWake:e=!1,since:s=null,onWake:n=null,onLogin:o=null}={}){var v,w,$,k,C,H;let i="sleepScreen",l=document.getElementById(i);if(!t){l&&l.remove(),(v=document.body)==null||v.classList.remove("sleeping");return}(w=document.body)==null||w.classList.add("sleeping");let p=$t()==="fa",d=p?"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A":"The store is asleep",b=p?"\u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u060C \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u0645. \u06A9\u0633\u06CC \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u06A9\u0646\u062F \u062A\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646 \u0634\u0648\u062F.":"The shop was switched off for a break. Nobody can place orders until it is turned on again.",u=s?`<div class="tiny sleep-since">${p?"\u062E\u0627\u0645\u0648\u0634 \u0627\u0632":"Asleep since"}: ${new Date(s).toLocaleString(p?"fa-IR":"en-GB")}</div>`:"";l||(l=document.createElement("div"),l.id=i,l.className="sleep-screen",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),($=document.body)==null||$.appendChild(l)),l.innerHTML=r`
    <div class="sleep-card">
      <span class="sleep-ic">${c("moon")}</span>
      <h2>${d}</h2>
      <p>${b}</p>
      ${ct(u)}
      ${e?r`<button class="btn btn-primary btn-block mt" data-sleep-wake>${c("zap")} ${p?"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647":"Turn the store on"}</button>`:r`
          <a class="btn btn-outline btn-block mt" href="#/auth" data-sleep-login>${c("user")} ${p?"\u0648\u0631\u0648\u062F \u0645\u062F\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646":"Sign in as admin to turn it on"}</a>
          <button class="btn btn-ghost btn-block mt-s" data-sleep-reload>${c("refresh")} ${p?"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647":"Try again"}</button>`}
      <p class="tiny sleep-note">${p?"\u062E\u0648\u062F\u06A9\u0627\u0631 \u062E\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u062A\u0627 \u0648\u0642\u062A\u06CC \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u062E\u0627\u0645\u0648\u0634 \u0645\u06CC\u200C\u0645\u0627\u0646\u062F.":"It never turns off by itself \u2014 it stays off until you switch it on."}</p>
    </div>`,(k=l.querySelector("[data-sleep-wake]"))==null||k.addEventListener("click",async F=>{let ot=F.currentTarget;ot.disabled=!0;try{await(n==null?void 0:n())}finally{ot.disabled=!1}}),(C=l.querySelector("[data-sleep-reload]"))==null||C.addEventListener("click",()=>location.reload()),(H=l.querySelector("[data-sleep-login]"))==null||H.addEventListener("click",()=>o==null?void 0:o())}function Io(t){var e,s;(s=(e=t.querySelectorAll)==null?void 0:e.call(t,'input[type="password"]'))==null||s.forEach(n=>{if(n.dataset.pwdDone)return;n.dataset.pwdDone="1";let o=document.createElement("span");o.className="pwd-wrap",n.parentNode.insertBefore(o,n),o.appendChild(n);let i=document.createElement("button");i.type="button",i.className="pwd-eye",i.dataset.eye="1",i.setAttribute("aria-label",a("pwd.show")),i.title=a("pwd.show"),i.innerHTML=c("eye"),o.appendChild(i)})}function ds(t=!1){if(!(!t&&!Tn()))try{Ae=Ae||new(window.AudioContext||window.webkitSoundContext||window.webkitAudioContext),Ae.state==="suspended"&&Ae.resume();let e=Ae.currentTime,s=Ae.createOscillator(),n=Ae.createGain();s.type="sine",s.frequency.setValueAtTime(1560,e),s.frequency.exponentialRampToValueAtTime(1180,e+.06),n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.045,e+.008),n.gain.exponentialRampToValueAtTime(1e-4,e+.075),s.connect(n).connect(Ae.destination),s.start(e),s.stop(e+.09)}catch(e){}}function Tn(){try{return!!JSON.parse(localStorage.getItem("bm_prefs_v1")||"{}").uiSound}catch(t){return!1}}var ni,oi,ri,ci,ii,li,di,E,Y,mi,Re,pt,kn,Ta,Sn,Gt,Ca,Aa,Ut,No,Ae,tt=V(()=>{U();G();Z();ni=()=>I("#modalRoot"),oi=()=>I("#drawerRoot"),ri=()=>I("#toastRoot"),ci={sm:"narrow",md:"",lg:"wide",xl:"wide"},ii={success:"success",error:"error",warn:"warning",warning:"warning",info:"info"},li={success:"check-circle",error:"alert",warn:"alert",warning:"alert",info:"info"},di=0;E=(t,e)=>it(t,mt({type:"success"},e)),Y=(t,e)=>it(t,mt({type:"error",timeout:5600},e)),mi=(t,e)=>it(t,mt({type:"warn"},e));Re=[];document.addEventListener("keydown",t=>{if(t.key==="Escape"&&Re.length){let e=Re[Re.length-1];e.dismissible!==!1&&(t.preventDefault(),e.close(null))}});pt=t=>Be(mt({kind:"modal"},t)),kn=t=>Be(mt({kind:"drawer"},t)),Ta=t=>Be(mt({kind:"sheet"},t)),Sn=t=>Be(mt({kind:window.innerWidth<760?"sheet":"modal"},t));Gt=t=>wt({title:a("common.delete"),text:t||a("misc.confirmDelete"),okText:a("common.delete"),danger:!0,icon:"trash"});Ca=(t="")=>r`<div class="row center mt-l" role="status"><span class="spinner"></span>${t?r`<span class="muted small">${t}</span>`:""}</div>`;Aa=(t,e)=>r`
  <div class="notice notice-${t}">${c(t==="success"?"check-circle":t==="danger"?"alert":"info")}<div class="grow">${e}</div></div>`,Ut=null,No=null;document.addEventListener("click",t=>{var i,l,p;let e=(l=(i=t.target).closest)==null?void 0:l.call(i,"[data-eye]");if(!e)return;let s=(p=e.parentElement)==null?void 0:p.querySelector("input");if(!s)return;let n=s.type==="password";s.type=n?"text":"password",e.innerHTML=c(n?"eye-off":"eye");let o=n?a("pwd.hide"):a("pwd.show");e.setAttribute("aria-label",o),e.title=o,s.focus({preventScroll:!0})},!0);new MutationObserver(t=>{for(let e of t)e.addedNodes.forEach(s=>{s.nodeType===1&&Io(s)})}).observe(document.documentElement,{childList:!0,subtree:!0});Io(document);Ae=null;document.addEventListener("pointerdown",t=>{var e,s;Tn()&&(s=(e=t.target).closest)!=null&&s.call(e,'button, a, [role="button"], .pcard, .chip, .gal-thumb')&&ds(!0)},!0)});function Oe(t,e=""){let s=t.images&&t.images[0]||"",n=ft(t)||a("img.alt");return s?r`<img class="${e}" src="${s}" alt="${n}" loading="lazy" decoding="async" data-glyph="${t.glyph||"misc"}">`:ct(`<svg class="ic ph-img ${e}" data-glyph="${h(t.glyph||"misc")}" role="img" aria-label="${h(n)}"><use href="#i-${xe(t.glyph||"misc")}"/></svg>`)}function yi(t,{quick:e=null}={}){var d;let s=(re().productCardInfo||[]).includes("brand"),n=(re().productCardInfo||[]).includes("stock"),o=(re().productCardInfo||[]).includes("rating"),i=e!==null?e:B("compare")||re().quickView!==!1,l=(d=t.stock)!=null?d:0,p=l<=0?"out":l<=3?"low":"";return r`
  <article class="pcard" data-pid="${t.id}">
    <div class="pc-media">
      <a href="#/product/${t.id}" aria-label="${ft(t)}">${Oe(t)}</a>
      <div class="ribbon">
        ${t.discountPct>0?r`<span class="badge-pill bp-danger">${g(t.discountPct)}٪ ${a("pdp.off")}</span>`:""}
        ${l<=0?r`<span class="badge-pill bp-muted">${a("card.outOfStock")}</span>`:""}
        ${t.featured?r`<span class="badge-pill bp-accent">${c("star")} ${a("home.featured")}</span>`:""}
      </div>
      <div class="pc-quick">
        ${re().quickView!==!1?r`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${t.id}" title="${a("card.quickView")}" aria-label="${a("card.quickView")}">${c("eye")}</button>`:""}
        ${B("wishlist")?r`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${t.id}" title="${a("card.wishlistAdd")}" aria-label="${a("card.wishlistAdd")}">${c("heart")}</button>`:""}
        ${B("compare")?r`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${t.id}" title="${a("card.compareAdd")}" aria-label="${a("card.compareAdd")}">${c("compare")}</button>`:""}
      </div>
    </div>
    <div class="pc-body">
      ${s&&t.brandName?r`<span class="pc-brand">${$t()==="fa"?t.brandName:t.brandNameEn||t.brandName}</span>`:""}
      <h3 class="pc-name"><a href="#/product/${t.id}">${ft(t)}</a></h3>
      ${o&&t.ratingCount>0?r`<div class="pc-rate">${Ht(t.ratingAvg)} <span>${g(t.ratingAvg)} (${g(t.ratingCount)})</span></div>`:""}
      ${n?r`<div class="pc-stock ${p}"><span class="dot"></span>${l<=0?a("card.outOfStock"):l<=3?a("common.lowStock"):a("common.inStock")}</div>`:""}
      <div class="pc-price">
        ${t.oldPrice>t.price?r`<span class="pc-old">${A(t.oldPrice)}</span>`:""}
        ${t.price?r`<span class="pc-now">${A(t.price)}</span>`:r`<span class="pc-now pc-inquire">${a("price.inquire")}</span>`}
      </div>
      <div class="pc-actions">
        ${t.price?r`<button type="button" class="btn btn-primary" data-act="add-cart" data-id="${t.id}" ${l<=0?"disabled":""}>${c("cart")} ${a("card.addToCart")}</button>`:r`<a class="btn btn-outline" href="#/product/${t.id}">${c("phone")} ${a("price.inquireShort")}</a>`}
      </div>
    </div>
  </article>`}function Ro(t,e=null){return r`
    <a class="cat-card" href="#/category/${t.id}">
      <span class="cat-ic">${c(xe(t.glyph))}</span>
      <span class="cat-name">${Et(t)}</span>
      ${e!==null?r`<span class="cat-count">${g(e)} ${a("catalog.count")}</span>`:""}
    </a>`}function $i(t){let e=$t()==="en"&&t.titleEn?t.titleEn:t.title,s=$t()==="en"&&t.textEn?t.textEn:t.text,n=$t()==="en"&&t.ctaEn?t.ctaEn:t.cta;return r`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${e}</div>
        ${s?r`<div class="banner-text">${s}</div>`:""}
      </div>
      ${t.link?r`<a class="btn btn-primary banner-cta" href="${t.link.startsWith("#")||t.link.startsWith("/")?t.link:"#/"}">${n||a("common.more")} ${c("chevron-left")}</a>`:""}
    </div>`}function Nt({titleIcon:t="",title:e="",sub:s="",link:n=null,linkLabel:o=""}){return r`
    <div class="section-head">
      <div>
        <h2 class="section-title">${t?c(t):""}${e}</h2>
        ${s?r`<p class="section-sub">${s}</p>`:""}
      </div>
      ${n?r`<a class="section-link" href="${n}">${o||a("common.showAll")} ${c("chevron-left")}</a>`:""}
    </div>`}function ps(t){return re().showBreadcrumbs===!1||!(t!=null&&t.length)?"":r`
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="#/">${c("home")} ${a("nav.home")}</a>
      ${t.map((e,s)=>r`
        ${c("chevron-left")}
        ${s===t.length-1?r`<span aria-current="page">${e.label}</span>`:r`<a href="${e.href}">${e.label}</a>`}`)}
    </nav>`}function me(t,e,s){if(e<=1)return"";let n=(d,b,u="",v=!1)=>r`
    <a class="pg ${u}" href="${v?"#":s(d)}" ${v?'aria-disabled="true" tabindex="-1"':""} ${d===t?'aria-current="page"':""}>${b}</a>`,o=[],i=d=>{d>=1&&d<=e&&!o.includes(d)&&o.push(d)};i(1),i(2);for(let d=t-1;d<=t+1;d++)i(d);i(e-1),i(e),o.sort((d,b)=>d-b);let l=[n(t-1,c("chevron-right"),"",t<=1)],p=0;for(let d of o)p&&d-p>1&&l.push(r`<span class="pg pg-gap" aria-hidden="true">…</span>`),l.push(n(d,g(d),d===t?"active":"")),p=d;return l.push(n(t+1,c("chevron-left"),"",t>=e)),r`<nav class="pagination" aria-label="${a("common.page")}">${ct(l.join(""))}</nav>`}function $e(t){return r`<span class="badge-pill ${wi[t]||"bp-muted"}">${a(`st.${t}`)}</span>`}function ze(t){return r`<span class="badge-pill ${{paid:"bp-success",unpaid:"bp-warn",pending:"bp-warn",refunded:"bp-muted",failed:"bp-danger",cancelled:"bp-muted"}[t==null?void 0:t.status]||"bp-muted"}">${a(`ps.${(t==null?void 0:t.status)||"unpaid"}`)}</span>`}function ta(t){let e=t.timeline||[];return e.length?r`
    <div class="timeline">
      ${e.map(s=>r`
        <div class="tl-item">
          <div class="tl-t">${a(`st.${s.status}`)||s.status}</div>
          <div class="tl-d">${O(s.at)}${s.note?` \u2014 ${s.note}`:""}${s.by?` \xB7 ${s.by}`:""}</div>
        </div>`)}
    </div>`:""}function Ct({icon:t="box",label:e="",value:s="",sub:n=""}){return r`
    <div class="stat-card">
      <span class="stat-ic">${c(t)}</span>
      <div><div class="stat-val">${s}</div><div class="stat-lbl">${e}</div>${n?r`<div class="tiny muted">${n}</div>`:""}</div>
    </div>`}function It({label:t="",value:e="",sub:s="",icon:n=""}){return r`
    <div class="kpi">
      <div class="l">${t}</div>
      <div class="v">${e}</div>
      ${s?r`<div class="s">${s}</div>`:""}
    </div>`}function us(t,{height:e=130}={}){let s=Math.max(1,...t.map(n=>n.value));return r`
    <div class="chart" ${e?r`data-h="${e}px"`:""}>
      ${t.map(n=>r`<div class="bar" data-tip="${n.label}: ${g(n.value)}" data-h="${Math.max(2,Math.round(n.value/s*100))}%"></div>`)}
    </div>
    <div class="chart-x">${t.map(n=>r`<span>${n.short||""}</span>`)}</div>`}function lt(t,e,{emptyText:s=null}={}){return e.length?r`
    <div class="table-wrap">
      <table class="table">
        <thead><tr>${t.map(n=>r`<th class="${n.cls||""}">${n.label}</th>`)}</tr></thead>
        <tbody>${ct(e.join(""))}</tbody>
      </table>
    </div>`:ct(`<div class="empty"><h4>${h(s||a("common.noData"))}</h4></div>`)}function x({label:t="",name:e,type:s="text",value:n="",placeholder:o="",required:i=!1,hint:l="",attrs:p="",span2:d=!1,autocomplete:b=""}){return r`
    <label class="field ${d?"span-2":""}">
      <span class="label">${t}${i?r`<span class="req">*</span>`:""}</span>
      <input class="input" type="${s}" name="${e}" value="${n}" placeholder="${o}" ${i?"required":""} ${b?r`autocomplete="${b}"`:""} ${p}>
      ${l?r`<span class="hint">${l}</span>`:""}
    </label>`}function J({label:t="",name:e,value:s="",placeholder:n="",required:o=!1,hint:i="",rows:l=4,span2:p=!1,attrs:d=""}){return r`
    <label class="field ${p?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <textarea class="textarea" name="${e}" rows="${l}" placeholder="${n}" ${o?"required":""} ${d}>${s}</textarea>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function j({label:t="",name:e,options:s=[],value:n="",required:o=!1,hint:i="",span2:l=!1,placeholder:p=""}){let d=s.find(v=>String(v.value)===String(n)),b=d?d.label:p||a("common.select"),u=h(JSON.stringify(s));return r`
    <label class="field ${l?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <button type="button" class="input select" data-act="open-select" data-name="${e}" data-opts="${u}" data-val="${n}" data-title="${t}" style="text-align: start; padding-inline-end: 32px;">
        <span class="sb-txt" style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${b}</span>
      </button>
      <input type="hidden" name="${e}" value="${n}" ${o?"required":""}>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function Ue({label:t="",name:e,checked:s=!1,hint:n=""}){return r`
    <label class="check">
      <input type="checkbox" name="${e}" ${s?"checked":""}>
      <span class="box">${c("check")}</span>
      <span>${t}${n?r`<span class="hint">${n}</span>`:""}</span>
    </label>`}function yt({label:t="",desc:e="",name:s,checked:n=!1,value:o=""}){return r`
    <div class="switch-row">
      <div><div class="t">${t}</div>${e?r`<div class="d">${e}</div>`:""}</div>
      <label class="switch">
        <input type="checkbox" name="${s}" value="${o}" ${n?"checked":""}>
        <span class="track"></span>
      </label>
    </div>`}function bs({value:t=1,max:e=99,min:s=1,name:n="qty",small:o=!1}){return r`
    <div class="qty" data-qty>
      <button type="button" data-q="-1" aria-label="-1">${c("minus")}</button>
      <input type="number" name="${n}" value="${t}" min="${s}" max="${e}" inputmode="numeric">
      <button type="button" data-q="1" aria-label="+1">${c("plus")}</button>
    </div>`}function hs({name:t="rating",value:e=0}){return r`
    <div class="stars-input" data-stars name-wrap="${t}" role="radiogroup" aria-label="${a("pdp.yourRating")}">
      ${[1,2,3,4,5].map(s=>r`
        <button type="button" data-star="${s}" class="${s<=e?"on":""}" role="radio" aria-checked="${s===e}" aria-label="${s}">
          <svg class="ic"><use href="#i-star"/></svg>
        </button>`)}
      <input type="hidden" name="${t}" value="${e}">
    </div>`}function Cn(t,{showPlus:e=!0}={}){var n;let s=[];return s.push(r`<div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>`),e&&t.plusDiscount>0&&s.push(r`<div class="sum-row discount"><span>${a("acc.plus")} (${g(t.plusDiscountPct||3)}٪)</span><span class="v">−${A(t.plusDiscount)}</span></div>`),t.couponDiscount>0&&s.push(r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${((n=t.coupon)==null?void 0:n.code)||""}</span><span class="v">−${A(t.couponDiscount)}</span></div>`),s.push(r`<div class="sum-row"><span>${a("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${t.shippingLabel})</span>`:""}</span><span class="v">${t.shipping===0?a("common.free"):A(t.shipping)}</span></div>`),t.insured&&s.push(r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${t.insuranceFee===0?a("common.free"):A(t.insuranceFee)}</span></div>`),s.push(r`<div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(t.total)}</span></div>`),ct(s.join(""))}function Bo(t){var n;let e=Number((n=ve().freeOver)!=null?n:0);if(!e||t>=e)return r`<div class="notice notice-success mt-s">${c("truck")}<div>${a("cart.freeShipDone")}</div></div>`;let s=Math.min(100,Math.round(t/e*100));return r`
    <div class="mt-s">
      <div class="progress"><i data-w="${s}%"></i></div>
      <p class="hint mt-s">${a("cart.freeShipHint",{amount:A(e-t,{withUnit:!0}).replace(/<[^>]+>/g,"")})}</p>
    </div>`}function ea(){let t=q();return r`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a("contact.mapTitle")}">
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
        <text class="mm-txt mm-txt-b" x="313" y="205" text-anchor="middle">${t?"\u0628\u0648\u0631\u0633 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0647\u0641\u062A\u200C\u062D\u0648\u0636":"Haft-Hoz Electronics Bourse"}</text>
        <text class="mm-txt" x="313" y="226" text-anchor="middle">${t?"\u0637\u0628\u0642\u0647\u0654 \u062F\u0648\u0645\u060C \u067E\u0644\u0627\u06A9 \u06F2\u06F4":"2nd floor, No. 24"}</text>
      </g>
      <!-- نام خیابان‌ها -->
      <text class="mm-txt" x="24" y="140">${t?"\u062E\u06CC\u0627\u0628\u0627\u0646 \u0633\u0627\u062D\u0644\u06CC":"Saheli St."}</text>
      <text class="mm-txt" x="446" y="140">${t?"\u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636":"Haft-Hoz Square"}</text>
      <text class="mm-txt mm-vert" x="196" y="60" transform="rotate(90 196 60)">${t?"\u0628\u0644\u0648\u0627\u0631 \u062A\u0647\u0631\u0627\u0646":"Port Blvd."}</text>
      <!-- نشان مغازه -->
      <g transform="translate(313 176)">
        <circle class="mm-pulse" r="26"/>
        <path class="mm-accent" d="M0-34c11 0 19 8 19 19 0 14-19 31-19 31S-19-1-19-15c0-11 8-19 19-19Z"/>
        <circle class="mm-pin" cx="0" cy="-15" r="7"/>
      </g>
      <g class="mm-tag">
        <rect x="330" y="120" rx="12" width="${t?92:74}" height="26"/>
        <text x="${t?376:367}" y="137" text-anchor="middle">${t?"\u0645\u063A\u0627\u0632\u0647\u0654 \u0645\u0627":"Our shop"}</text>
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
        <text x="78" y="4">${t?"\u06F1\u06F0\u06F0 \u0645\u062A\u0631":"100 m"}</text>
      </g>
    </svg>`}function De({hidden:t=!1}={}){return r`
  <div class="captcha" data-captcha ${t?"hidden":""}>
    <label class="check"><input type="checkbox" name="captchaBox" data-act="captcha-open"><span class="box">${c("check")}</span><span>${a("captcha.label")}</span></label>
    <div class="captcha-ch" data-cch hidden>
      <div class="captcha-img" data-cimg></div>
      <div class="captcha-row">
        <input class="input" name="captchaAnswer" inputmode="numeric" autocomplete="off" placeholder="${a("captcha.placeholder")}" aria-label="${a("captcha.placeholder")}" data-act="captcha-check">
        <button type="button" class="btn btn-ghost" data-act="captcha-refresh" title="${a("captcha.refresh")}" aria-label="${a("captcha.refresh")}">${c("refresh")}</button>
      </div>
      <div class="captcha-st" data-cst>${a("captcha.hint")}</div>
    </div>
    <input type="hidden" name="captchaToken" data-ctok>
  </div>`}var jt,je,wi,dt=V(()=>{U();G();K();U();tt();jt=(t,e)=>r`<div class="pgrid">${t.map(s=>yi(s,e))}</div>`;je=(t,e,s="")=>{let n=(e||[]).filter(o=>o.slot===t);return n.length?r`<div class="${s} banner-grid mt">${n.map($i)}</div>`:""};wi={pending_payment:"bp-warn",pending_review:"bp-warn",confirmed:"bp-info",preparing:"bp-info",ready_pickup:"bp-accent",shipped:"bp-violet",delivered:"bp-success",cancelled:"bp-danger",refunded:"bp-muted",returned:"bp-muted"}});var Ho={};X(Ho,{mount:()=>Si,render:()=>ki,title:()=>xi});async function ki(){var w,$,k,C,H,F,ot;let t=Xt(),e=[];if(B("recentlyViewed")&&(m.recent||[]).length)try{e=(await f.get(`/api/products?ids=${m.recent.slice(0,8).join(",")}&limit=8`)).items||[]}catch(R){e=[]}let s=[],n=m.categories,o=m.brands,i=m.stats;try{let[R,P,et]=await Promise.all([f.get("/api/products?limit=48&sort=popular"),m.categories.length?Promise.resolve(null):f.get("/api/categories"),m.brands.length?Promise.resolve(null):f.get("/api/brands")]);if(s=R.items||[],P&&(n=P.items||[]),et&&(o=et.items||[]),B("publicStats"))try{i=(await f.get("/api/stats/public")).stats||i}catch(kt){}}catch(R){}let l=s.filter(R=>R.featured).slice(0,8),p=[...s].sort((R,P)=>(P.sold||0)-(R.sold||0)).slice(0,8),d=[...s].sort((R,P)=>String(P.createdAt||"").localeCompare(String(R.createdAt||""))).slice(0,8),b=s.filter(R=>R.discountPct>0).sort((R,P)=>P.discountPct-R.discountPct).slice(0,8),u=n.filter(R=>!R.parentId).slice(0,12),v=l.length?l:p.slice(0,8);return r`
    ${je("home_hero",le("home_hero"))}
    

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-circuit.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${c("zap")} ${a("home.heroKicker")}</span>
        <h1 class="hero-title">${a("home.heroTitle")}</h1>
        <p class="hero-text">${a("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${c("cart")} ${a("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${c("percent")} ${a("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${c("shield")} ${a("home.point1")}</span>
          <span class="hero-point">${c("package-check")} ${a("home.point2")}</span>
          <span class="hero-point">${c("truck")} ${a("home.point3")}</span>
          <span class="hero-point">${c("store")} ${a("home.point4")}</span>
        </div>
      </div>
    </section>

    ${je("home_strip",le("home_strip"))}

    <section class="section">
      ${Nt({titleIcon:"layers",title:a("home.categories"),sub:a("home.categoriesSub"),link:"#/products",linkLabel:a("common.showAll")})}
      <div class="cat-grid">${u.map(R=>{var P;return Ro(R,(P=R.count)!=null?P:null)})}</div>
    </section>

    ${B("partners")&&(($=(w=m.settings.partners)==null?void 0:w.items)!=null&&$.length)?r`
    <section class="partners-sec partners-top">
      ${Nt({titleIcon:"store",title:a("home.partnersTitle")})}
      <div class="marquee" aria-label="${a("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...m.settings.partners.items,...m.settings.partners.items].map(R=>{let P=(m.brands||[]).find(kt=>{var gt;return kt.name===R.fa||R.en&&(kt.nameEn===R.en||((gt=kt.nameEn)==null?void 0:gt.toLowerCase())===R.en.toLowerCase())}),et=P?`#/products?brand=${P.id}`:`#/search?q=${encodeURIComponent(R.fa)}`;return r`<a class="partner-chip" href="${et}" title="${q()?R.fa:R.en||R.fa}">
              <img class="pt-logo" src="/assets/img/brands/${P?P.id:"no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${q()?R.fa:R.en||R.fa}</b></a>`}).join("")}
        </div>
      </div>
    </section>`:""}

    ${v.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:a("home.featured"),sub:a("home.featuredSub"),link:"#/products?sort=popular"})}
      ${jt(v)}
    </section>`:""}

    ${b.length?r`
    <section class="section">
      ${Nt({titleIcon:"percent",title:a("home.deals"),sub:a("home.dealsSub"),link:"#/products?discount=1"})}
      ${jt(b)}
    </section>`:""}

    ${p.length?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:a("home.bestSellers"),sub:a("home.bestSellersSub"),link:"#/products?sort=popular"})}
      ${jt(p)}
    </section>`:""}

    ${d.length?r`
    <section class="section">
      ${Nt({titleIcon:"sparkles",title:a("home.newArrivals"),sub:a("home.newArrivalsSub"),link:"#/products?sort=newest"})}
      ${jt(d)}
    </section>`:""}

    ${o.length?r`
    <section class="section">
      ${Nt({titleIcon:"tag",title:a("home.brands")})}
      <div class="row row-wrap">
        ${o.slice(0,18).map(R=>r`<a class="chip" href="#/products?brand=${R.id}">${Yt(R)}</a>`)}
      </div>
    </section>`:""}

    <section class="section">
      <div class="card pf-card">
        <strong>${c("search")} ${a("home.partFinder")}</strong>
        <p class="muted small mt-s">${a("home.partFinderText")}</p>
        <div class="row row-wrap mt-s">
          ${(C=(k=m.settings)==null?void 0:k.store)!=null&&C.phone?r`<a class="btn btn-primary btn-sm" href="tel:${m.settings.store.phone}">${c("phone")} ${a("home.partFinderCta")}: <bdi>${at(m.settings.store.phone)}</bdi></a>`:""}
          <a class="btn btn-outline btn-sm" href="#/pages/contact">${c("chat")} ${a("nav.contact")}</a>
          ${(ot=(F=(H=m.settings)==null?void 0:H.store)==null?void 0:F.socials)!=null&&ot.instagram?r`<a class="btn btn-ghost btn-sm" href="${m.settings.store.socials.instagram}" target="_blank" rel="noopener">${c("camera")} ${a("social.instagram")}</a>`:""}
        </div>
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"shield",title:a("home.whyUs"),sub:a("home.whyUsSub")})}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${c("shield")}</span><div><div class="b">${a("home.point1")}</div><div class="muted small">${q()?"\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.":"Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("package-check")}</span><div><div class="b">${a("home.point2")}</div><div class="muted small">${q()?"\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A.":"By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("truck")}</span><div><div class="b">${a("home.point3")}</div><div class="muted small">${q()?"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A.":"Orders leave Tehran every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("headset")}</span><div><div class="b">${a("footer.support")}</div><div class="muted small">${q()?"\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A.":"Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${B("publicStats")&&i?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:a("home.statsTitle"),link:"#/stats",linkLabel:a("common.showAll")})}
      <div class="stats-grid">
        ${Ct({icon:"box",label:a("stats.products"),value:g(i.products)})}
        ${Ct({icon:"package-check",label:a("stats.ordersTotal"),value:g(i.ordersTotal)})}
        ${Ct({icon:"cart",label:a("stats.ordersToday"),value:g(i.ordersToday)})}
        ${Ct({icon:"eye",label:a("stats.visitsToday"),value:g(i.visitsToday)})}
        ${Ct({icon:"users",label:a("stats.customers"),value:g(i.customers)})}
        ${Ct({icon:"truck",label:a("stats.delivered"),value:g(i.deliveredOrders)})}
      </div>
    </section>`:""}

    ${B("plus")&&!Zt()?r`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${c("sparkles")} ${a("home.plusTitle")}</div>
          <div class="banner-text">${a("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(xa().perks||[]).slice(0,4).map(R=>r`<span class="chip">${c("check")} ${q()?R.fa:R.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${a("home.plusCta")} ${c("chevron-left")}</a>
      </div>
    </section>`:""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${Nt({titleIcon:"store",title:a("home.visitStore"),sub:a("home.visitStoreText")})}
          <p class="muted small mb">${h(q()?t.address||"":t.addressEn||t.address||"")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${c("map")} ${a("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${t.phone}">${c("phone")} ${at(t.phone||"")}</a>
          </div>
        </div>
        <div class="card">
          ${Nt({titleIcon:"download",title:a("home.appTitle"),sub:a("home.appText")})}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${c("download")} ${a("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${a("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${e.length?r`
    <section class="section">
      ${Nt({titleIcon:"history",title:a("home.recent"),sub:a("home.recentSub")})}
      ${jt(e)}
    </section>`:""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${a("contact.mapTitle")}">
          ${ct(ea())}
          <span class="minimap-hint">${c("pin")} ${a("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `}function Si(){let t=document.querySelector(".marquee"),e=t==null?void 0:t.querySelector(".marquee-track");if(!t||!e)return null;let s=0,n=!1,o=0,i=!1,l=0,p=performance.now(),d=0,b=42,u=()=>{let P=parseFloat(getComputedStyle(e).gap||"10")||10;return(e.scrollWidth+P)/2||1},v=()=>{let P=parseFloat(getComputedStyle(e).gap||"10")||10,et=[...e.children];if(!et.length)return;let kt=e.dataset.base?Number(e.dataset.base):et.length/2,gt=et.slice(0,kt),z=gt.reduce((ge,Ne)=>ge+Ne.offsetWidth+P,0),Tt=1;for(;z*Tt<innerWidth*1.6&&Tt<4;)Tt++;e.dataset.base=String(kt);let se=kt*Tt*2;if(et.length===se)return;let Vt=document.createDocumentFragment();for(let ge=0;ge<2;ge++)for(let Ne=0;Ne<Tt;Ne++)gt.forEach(Ya=>Vt.appendChild(Ya.cloneNode(!0)));e.innerHTML="",e.appendChild(Vt)};v(),addEventListener("resize",v,{passive:!0});let w=()=>getComputedStyle(e).direction==="rtl"?1:-1,$=()=>{let P=u();w()>0?(s>=P&&(s-=P),s<0&&(s+=P)):(s<=-P&&(s+=P),s>0&&(s-=P))},k=P=>{let et=Math.min(.05,(P-p)/1e3);p=P,!n&&!document.documentElement.classList.contains("eco")&&(s+=w()*b*et),$(),e.style.transform=`translateX(${s.toFixed(1)}px)`,d=requestAnimationFrame(k)};d=requestAnimationFrame(k);let C=P=>{P.pointerType==="mouse"&&P.button!==0||(i=!1,n=!0,o=0,l=P.clientX,t.classList.add("grabbing"),window.addEventListener("pointermove",H),window.addEventListener("pointerup",F),window.addEventListener("pointercancel",F))},H=P=>{if(!n)return;let et=P.clientX-l;s+=et,o+=Math.abs(et),l=P.clientX},F=()=>{n=!1,t.classList.remove("grabbing"),o>8&&(i=!0),window.removeEventListener("pointermove",H),window.removeEventListener("pointerup",F),window.removeEventListener("pointercancel",F)},ot=P=>{i&&(i=!1,P.preventDefault(),P.stopPropagation())},R=P=>P.preventDefault();return t.addEventListener("dragstart",R),t.addEventListener("click",ot,!0),t.addEventListener("pointerdown",C),()=>{cancelAnimationFrame(d),t.removeEventListener("pointerdown",C),t.removeEventListener("dragstart",R),t.removeEventListener("click",ot,!0),window.removeEventListener("pointermove",H),window.removeEventListener("pointerup",F),window.removeEventListener("pointercancel",F)}}var xi,Fo=V(()=>{U();G();Z();K();dt();xi=()=>a("nav.home")});var An={};X(An,{mount:()=>qi,render:()=>Ei});function gs(t,e){let s=new URLSearchParams(t.query);for(let[o,i]of Object.entries(e))i===null||i===""||i===void 0?s.delete(o):s.set(o,i);return"page"in e||s.delete("page"),`#${t.params.id?`/category/${t.params.id}`:"/products"}${s.toString()?`?${s}`:""}`}async function Ei(t){let e=new URLSearchParams(t.query);t.params.id&&e.set("cat",t.params.id);let s=e,n=new URLSearchParams;for(let C of["q","cat","sort","min","max","rating","authenticity","page"])s.get(C)&&n.set(C,s.get(C));s.get("brand")&&n.set("brand",s.get("brand")),s.get("inStock")==="1"&&n.set("inStock","1"),s.get("discount")==="1"&&n.set("discount","1"),n.set("limit","24");let o={items:[],total:0,pages:1,page:1,facets:{}};try{o=await f.get(`/api/products?${n}`)}catch(C){}let i=o.items||[],l=o.facets||{},p=m.categories,d=m.brands,b=t.params.id?Ee(t.params.id):s.get("cat")?Ee(s.get("cat")):null,u=(s.get("brand")||"").split(",").filter(Boolean),v=Oo.includes(s.get("sort"))?s.get("sort"):"relevant",w=Number(s.get("page"))||1,$=[];if(b){let C=[],H=b;for(;H;)C.unshift(H),H=H.parentId?Ee(H.parentId):null;for(let F of C)$.push({label:Et(F),href:`#/category/${F.id}`})}else s.get("q")?$.push({label:`${a("search.resultsFor")} \xAB${s.get("q")}\xBB`}):s.get("discount")==="1"?$.push({label:a("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"})}):s.get("sort")==="newest"?$.push({label:a("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"})}):$.push({label:a("catalog.title")});let k=(C,H,F,ot,R)=>r`
    <label class="fopt">
      <input type="checkbox" data-f="${C}" value="${H}" ${R?"checked":""}>
      <span class="cb">${c("check")}</span>
      <span>${F}</span>
      ${ot!==void 0?r`<span class="cnt">${g(ot)}</span>`:""}
    </label>`;return r`
    ${ps($)}
    <div class="section-head">
      <div>
        <h1 class="section-title">${b?Et(b):s.get("q")?a("search.resultsFor")+" \xAB"+s.get("q")+"\xBB":s.get("discount")==="1"?a("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"}):s.get("sort")==="newest"?a("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"}):a("catalog.title")}</h1>
        <p class="section-sub">${g(o.total||0)} ${a("catalog.count")}</p>
      </div>
      <button type="button" class="btn btn-ghost only-mobile" data-act="cat-filters">${c("filter")} ${a("catalog.showFilters")}</button>
    </div>

    ${o.didYouMean?r`<div class="notice notice-info mb">${c("sparkles")}<span>${a("search.didYouMean")} <a class="section-link" href="${gs(t,{q:o.didYouMean})}">${o.didYouMean}</a></span></div>`:""}

    <div class="catalog">
      <aside class="filters card" id="filtersBox" hidden>
        <div class="row row-between mb-s">
          <strong>${a("catalog.filters")}</strong>
          <button type="button" class="link-btn" data-act="cat-clear">${a("catalog.f.clear")}</button>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${a("catalog.f.category")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b" >
            ${p.filter(C=>!C.parentId).map(C=>{var H;return k("cat",C.id,Et(C),(H=l.categories)==null?void 0:H[C.id],(s.get("cat")||t.params.id)===C.id)})}
          </div>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${a("catalog.f.brand")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b">
            ${d.slice(0,20).map(C=>{var H;return k("brand",C.id,Yt(C),(H=l.brands)==null?void 0:H[C.id],u.includes(C.id))})}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.price")}</div>
          <form class="fgroup-b row" data-price-form>
            <input class="input" type="number" min="0" step="10000" name="min" placeholder="${a("common.from")}" value="${s.get("min")||""}">
            <input class="input" type="number" min="0" step="10000" name="max" placeholder="${a("common.to")}" value="${s.get("max")||""}">
            <button class="btn btn-ghost btn-xs" type="submit">${a("common.apply")}</button>
          </form>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.availability")}</div>
          <div class="fgroup-b">
            ${k("flag","inStock",a("catalog.f.inStock"),void 0,s.get("inStock")==="1")}
            ${k("flag","discount",a("catalog.f.discountOnly"),void 0,s.get("discount")==="1")}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.rating")}</div>
          <div class="fgroup-b">
            ${[4,3,2].map(C=>k("rating",C,`${g(C)}\u2605 ${a("common.and")} ${a("common.more")}`,void 0,s.get("rating")===String(C)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.authenticity")}</div>
          <div class="fgroup-b">
            ${["original","highcopy","generic"].map(C=>{var H;return k("authenticity",C,a(`auth.${C}`),(H=l.authenticity)==null?void 0:H[C],s.get("authenticity")===C)})}
          </div>
        </div>
      </aside>

      <div>
        <div class="toolbar">
          <span class="muted small">${g(o.total||0)} ${a("catalog.count")}</span>
          <span class="grow"></span>
          <label class="row" style="flex-wrap: nowrap;" >
            <span class="muted small nowrap" style="flex-shrink: 0;">${a("common.sort")}</span>
            <button type="button" class="btn" data-act="choose-sort" style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 11px; padding: 7px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 140px; font-size: 14px; font-weight: 500; color: var(--text); flex-shrink: 0;">
              <span data-txt style="white-space: nowrap;">${a(`catalog.sort.${v}`)}</span>
              ${c("chevron-down")}
            </button>
          </label>
          <div class="btn-group">
            <button type="button" class="btn ${m.prefs.view!=="list"?"active":""}" data-view="grid" title="${a("catalog.viewGrid")}" aria-label="${a("catalog.viewGrid")}">${c("grid")}</button>
            <button type="button" class="btn ${m.prefs.view==="list"?"active":""}" data-view="list" title="${a("catalog.viewList")}" aria-label="${a("catalog.viewList")}">${c("list")}</button>
          </div>
        </div>

        <div class="active-filters" data-activef>
          ${b?r`<span class="chip active" data-unf="cat">${Et(b)} <span class="chip-close">${c("close")}</span></span>`:""}
          ${u.map(C=>r`<span class="chip active" data-unf="brand" data-v="${C}">${Yt(mt({id:C},m.brands.find(H=>H.id===C)||{}))} <span class="chip-close">${c("close")}</span></span>`)}
          ${s.get("inStock")==="1"?r`<span class="chip active" data-unf="flag" data-v="inStock">${a("catalog.f.inStock")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("discount")==="1"?r`<span class="chip active" data-unf="flag" data-v="discount">${a("catalog.f.discountOnly")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("min")||s.get("max")?r`<span class="chip active" data-unf="price">${a("catalog.f.price")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("rating")?r`<span class="chip active" data-unf="rating">${s.get("rating")}★ <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("authenticity")?r`<span class="chip active" data-unf="authenticity">${a(`auth.${s.get("authenticity")}`)} <span class="chip-close">${c("close")}</span></span>`:""}
        </div>

        ${i.length?ct(jt(i)):L({icon:"search",title:a("search.noResultTitle"),text:a("search.noResultText"),action:{href:"#/products",label:a("cart.goShopping")}})}

        ${me(w,o.pages||1,C=>gs(t,{page:C>1?C:null}))}
      </div>
    </div>
  `}function qi(t,e){var i;N(t);let s=t.querySelector("#filtersBox");window.innerWidth>=980&&(s.hidden=!1);let n=l=>{location.hash=l.replace(/^#/,"")};t.querySelectorAll("[data-view]").forEach(l=>l.addEventListener("click",()=>{Te("view",l.dataset.view,{sync:!1}),document.documentElement.setAttribute("data-cards",l.dataset.view==="list"?"list":"grid"),l.closest(".btn-group").querySelectorAll("button").forEach(p=>p.classList.toggle("active",p===l))}));let o=()=>{var C,H;let l=new URLSearchParams(e.query);e.params.id&&l.delete("cat");let p=[...t.querySelectorAll('[data-f="cat"]:checked')].map(F=>F.value),d=[...t.querySelectorAll('[data-f="brand"]:checked')].map(F=>F.value),b=((C=t.querySelector('[data-f="rating"]:checked'))==null?void 0:C.value)||"",u=((H=t.querySelector('[data-f="authenticity"]:checked'))==null?void 0:H.value)||"",v=t.querySelector('[data-f="flag"][value="inStock"]:checked')?"1":"",w=t.querySelector('[data-f="flag"][value="discount"]:checked')?"1":"",$=new URLSearchParams;for(let[F,ot]of l.entries())["cat","brand","rating","authenticity","inStock","discount","page"].includes(F)||$.set(F,ot);p.length&&$.set("cat",p[p.length-1]),d.length&&$.set("brand",d.join(",")),b&&$.set("rating",b),u&&$.set("authenticity",u),v&&$.set("inStock","1"),w&&$.set("discount","1");let k=e.params.id&&!p.length?`/category/${e.params.id}`:"/products";n(`#${k}${$.toString()?`?${$}`:""}`)};return t.querySelectorAll("[data-f]").forEach(l=>l.addEventListener("change",o)),(i=t.querySelector("[data-price-form]"))==null||i.addEventListener("submit",l=>{l.preventDefault();let p=new FormData(l.target);n(gs(e,{min:p.get("min")||null,max:p.get("max")||null}))}),t.querySelectorAll("[data-unf]").forEach(l=>l.addEventListener("click",()=>{let p=l.dataset.unf,d={};if(p==="cat"&&(d.cat=null,e.params.id)){location.hash=`#/products${e.query.toString()?`?${new URLSearchParams([...e.query.entries()].filter(([b])=>b!=="cat"))}`:""}`;return}if(p==="brand"){let b=(e.query.get("brand")||"").split(",").filter(u=>u&&u!==l.dataset.v);d.brand=b.length?b.join(","):null}p==="flag"&&(d[l.dataset.v]=null),p==="price"&&(d.min=null,d.max=null),p==="rating"&&(d.rating=null),p==="authenticity"&&(d.authenticity=null),n(gs(e,d))})),null}var Oo,Dn=V(()=>{U();G();Z();K();dt();nt();tt();ut();Oo=["relevant","newest","oldest","cheapest","dearest","popular","rating","discount","name"];y("cat-filters",(t,e)=>{let s=document.getElementById("filtersBox");s&&(s.hidden=!s.hidden,e.textContent=s.hidden?a("catalog.showFilters"):a("catalog.hideFilters"),s.hidden||s.scrollIntoView({behavior:"smooth",block:"start"}))});y("choose-sort",(t,e)=>{let s=new URLSearchParams(location.hash.split("?")[1]||"").get("sort")||"relevant",n=Ta({title:a("common.sort"),body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
      ${Oo.map(o=>r`<button class="btn ${o===s?"active":""}" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${o}">${a(`catalog.sort.${o}`)}</button>`).join("")}
    </div>`});n.panel.querySelectorAll("button[data-v]").forEach(o=>{o.addEventListener("click",()=>{let i=o.dataset.v;n.close();let l=new URLSearchParams(location.hash.split("?")[1]||"");i==="relevant"?l.delete("sort"):l.set("sort",i),l.delete("page"),location.hash=`${location.hash.split("?")[0]}${l.toString()?"?"+l.toString():""}`})})});y("cat-clear",()=>{let t=location.hash.includes("/category/")?"#/products":location.hash.split("?")[0];location.hash=t})});var zo={};X(zo,{mount:()=>Di,render:()=>Ti,title:()=>Pi});async function Ti(t){var H,F,ot,R;let e=t.params.id,s=null;try{s=await f.get(`/api/products/${encodeURIComponent(e)}`)}catch(P){return L({icon:"alert",title:a("err.notFound"),text:a("err.notFoundText"),action:{href:"#/products",label:a("err.goHome")}})}let n=s.product,o=s.reviews||[],i=o.filter(P=>P.type!=="question"),l=o.filter(P=>P.type==="question"),p=s.reviewStats||{count:0,avg:0,dist:[0,0,0,0,0],questions:0},d=s.related||[],b=[],u=Ee(n.categoryId);for(;u;)b.unshift(u),u=u.parentId?Ee(u.parentId):null;let v=(n.images&&n.images.length?n.images:[]).slice(0,6),w=[...v.map(P=>({url:P,kind:"image"})),...(n.videos||[]).slice(0,4).map(P=>({url:P,kind:"video",poster:v[0]||""}))],$=(H=n.stock)!=null?H:0,k=String(((ot=(F=m.settings)==null?void 0:F.store)==null?void 0:ot.phone)||"").trim(),C=ve().zones||[];return r`
    ${ps([...b.map(P=>({label:Et(P),href:`#/category/${P.id}`})),{label:ft(n)}])}
    <div class="pdp">
      <div class="gallery">
        <div class="gal-main" data-act="lightbox" data-imgs='${h(JSON.stringify(w))}' data-i="0" role="button" tabindex="0" aria-label="${a("pdp.zoomHint")}">
          ${((R=w[0])==null?void 0:R.kind)==="video"?r`<video src="${w[0].url}" poster="${w[0].poster}" controls playsinline preload="metadata" class="gal-video"></video>`:v[0]?r`<img src="${v[0]}" alt="${ft(n)}" data-glyph="${n.glyph}">`:ct(`<svg class="ic"><use href="#i-${n.glyph||"box"}"/></svg>`)}
          <span class="gal-zoom-hint" aria-hidden="true">${c("search")} ${a("pdp.zoomHint")}</span>
        </div>
        ${w.length>1?r`<div class="gal-thumbs">${w.map((P,et)=>r`
          <button type="button" class="gal-thumb ${et===0?"active":""}" data-thumb="${et}" aria-label="${et+1}">
            ${P.kind==="video"?ct(`<span class="gt-video">${P.poster?`<img src="${P.poster}" alt="" loading="lazy">`:""}<svg class="ic"><use href="#i-play"/></svg></span>`):r`<img src="${P.url}" alt="" loading="lazy">`}
          </button>`)}</div>`:""}
        <div class="row row-wrap">
          ${B("wishlist")?r`<button type="button" class="btn btn-ghost btn-sm ${os(n.id)?"btn-danger":""}" data-act="wish-toggle" data-id="${n.id}">${c("heart")} ${os(n.id)?a("card.wishlistRemove"):a("card.wishlistAdd")}</button>`:""}
          ${B("compare")?r`<button type="button" class="btn btn-ghost btn-sm ${pn(n.id)?"active":""}" data-act="compare-toggle" data-id="${n.id}">${c("scale")} ${a("compare.add")}</button>`:""}
          <button type="button" class="btn btn-ghost btn-sm" data-act="share" data-title="${ft(n)}">${c("share")} ${a("pdp.share")}</button>
        </div>
      </div>

      <div class="buy-box">
        ${n.brandName?r`<div class="pc-brand">${q()?n.brandName:n.brandNameEn||n.brandName}</div>`:""}
        <h1 class="buy-title">${ft(n)}</h1>
        ${!q()&&n.name?r`<div class="buy-title-en">${n.name}</div>`:""}
        <div class="row row-wrap mt-s">
          <a href="#/products?cat=${n.categoryId}" class="badge-pill bp-accent">${c(Ci(n.glyph))} ${Et(b[b.length-1])}</a>
          <a href="#/products?authenticity=${n.authenticity||"generic"}" class="badge-pill ${n.authenticity==="original"?"bp-success":n.authenticity==="highcopy"?"bp-warn":"bp-muted"}">${a(`auth.${n.authenticity||"generic"}`)}</a>
          ${n.featured?r`<a href="#/products?sort=popular" class="badge-pill bp-violet">${c("star")} ${a("home.featured")}</a>`:""}
        </div>
        <div class="pc-rate mt-s">${Ht(n.ratingAvg)} <span class="muted small">${g(p.avg||n.ratingAvg)} · ${g(p.count||n.ratingCount)} ${a("common.reviews")}</span></div>

        <div class="buy-price">
          ${n.oldPrice>n.price?r`<span class="pc-old">${A(n.oldPrice)}</span>`:""}
          ${n.price?r`<span class="buy-now">${A(n.price)}</span>`:r`<span class="buy-now pc-inquire">${a("price.inquire")}</span>`}
          ${n.discountPct>0?r`<span class="pc-off">${g(n.discountPct)}٪</span>`:""}
        </div>
        ${n.oldPrice>n.price?r`<p class="hint">${a("pdp.save")}: ${A(n.oldPrice-n.price)}</p>`:""}

        <div class="pc-stock ${$<=0?"out":$<=3?"low":""} mt-s">
          <span class="dot"></span>
          ${$<=0?a("card.outOfStock"):a("pdp.stockCount",{n:g($)})}
          ${$>0&&$<=3?r` <span class="badge-pill bp-warn">${a("common.lowStock")}</span>`:""}
        </div>

        ${n.price?r`
        <div class="row mt">
          ${bs({value:1,max:Math.max(1,$),name:"qty"})}
          <button type="button" class="btn btn-primary btn-lg grow" data-act="pdp-add" data-id="${n.id}" ${$<=0?"disabled":""}>${c("cart")} ${a("pdp.addToCart")}</button>
        </div>
        <button type="button" class="btn btn-outline btn-block mt-s" data-act="pdp-buy" data-id="${n.id}" ${$<=0?"disabled":""}>${c("zap")} ${a("pdp.buyNow")}</button>`:r`
        <div class="row mt">
          ${k?r`<a class="btn btn-primary btn-lg grow" href="tel:${k}">${c("phone")} ${a("pdp.callStore")}</a>`:""}
          <a class="btn btn-outline btn-lg" href="#/pages/contact">${c("map")} ${a("pdp.visitStore")}</a>
        </div>
        <p class="hint mt-s">${c("info")} ${a("pdp.serviceHint")}</p>`}
        ${n.price&&k?r`<a class="btn btn-ghost btn-block mt-s" href="tel:${k}">${c("phone")} ${a("pdp.callStore")}: <bdi>${at(k)}</bdi></a>`:""}

        ${$<=0&&B("priceAlerts")?r`
          <button type="button" class="btn btn-ghost btn-block mt-s ${rs(n.id)?"active":""}" data-act="notify-me" data-id="${n.id}">
            ${c("bell")} ${rs(n.id)?a("common.notified"):a("common.notifyMe")}
          </button>`:""}

        <div class="divider"></div>
        <ul class="col">
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("store")}</span><span class="small">${a("pdp.pickup")}</span></li>
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("truck")}</span><span class="small">${a("checkout.courier")}: ${C.map(P=>`${q()?P.name:P.nameEn} ${g(P.fee)}`).join(" \xB7 ")}</span></li>
          ${B("insurance")?r`<li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("scale")}</span><span class="small">${a("checkout.insuranceDesc")}</span></li>`:""}
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("shield")}</span><span class="small">${n.warrantyMonths>0?a("pdp.warrantyMonths",{n:g(n.warrantyMonths)}):a("pdp.noWarranty")}</span></li>
        </ul>

        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${a("pdp.sku")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.sku}">${n.sku}</button></span>
          ${n.barcode?r`<span>${a("pdp.barcode")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.barcode}">${n.barcode}</button></span>`:""}
        </div>
        <div class="row row-between small muted mt-s">
          <span>${c("eye")} ${g(n.views)} ${a("pdp.viewed")}</span>
          <span>${c("package-check")} ${g(n.sold)} ${a("pdp.sold")}</span>
        </div>
      </div>
    </div>

    ${je("product_page",le("product_page"))}

    <section class="section card">
      <div class="tabs" role="tablist">
        <button type="button" class="tab active" data-tab="specs" role="tab">${a("pdp.specs")}</button>
        <button type="button" class="tab" data-tab="desc" role="tab">${a("pdp.description")}</button>
        ${B("reviews")?r`<button type="button" class="tab" data-tab="reviews" role="tab">${a("pdp.reviews")} (${g(p.count)})</button>`:""}
        ${B("questions")?r`<button type="button" class="tab" data-tab="questions" role="tab">${a("pdp.questions")} (${g(p.questions||l.length)})</button>`:""}
      </div>

      <div class="tab-panel" data-panel="specs">
        ${Object.keys(n.specs||{}).length?r`
          <table class="spec-table">
            <tbody>${Object.entries(n.specs).map(([P,et])=>r`<tr><th>${h(P)}</th><td>${h(et)}</td></tr>`)}</tbody>
          </table>`:r`<p class="muted">${a("common.noData")}</p>`}
        ${n.weight?r`<table class="spec-table mt-s"><tbody><tr><th>${a("pdp.weight")}</th><td>${g(n.weight)} ${a("pdp.gram")}</td></tr></tbody></table>`:""}
        ${(n.tags||[]).length?r`<div class="row row-wrap mt">${n.tags.map(P=>r`<a class="tag" href="#/products?q=${encodeURIComponent(P)}">#${P}</a>`)}</div>`:""}
      </div>

      <div class="tab-panel" data-panel="desc" hidden>
        <div class="rev-body">${Zs(q()?n.description||"":n.descriptionEn||n.description||"")}</div>
        ${!q()&&n.descriptionEn?"":n.descriptionEn?r`<div class="rev-body muted mt-s" dir="ltr">${h(n.descriptionEn)}</div>`:""}
      </div>

      ${B("reviews")?r`
      <div class="tab-panel" data-panel="reviews" hidden>
        <div class="rev-summary mb">
          <div class="rev-score">
            <div class="n">${g(p.avg||0)}</div>
            ${Ht(p.avg||0)}
            <div class="muted small mt-s">${g(p.count)} ${a("common.reviews")}</div>
          </div>
          <div class="rev-bars">
            ${[5,4,3,2,1].map(P=>{var et,kt;return r`
              <div class="rev-bar"><span>${g(P)}★</span><span class="track"><span class="fill" data-w="${p.count?Math.round((((et=p.dist)==null?void 0:et[P-1])||0)/p.count*100):0}%"></span></span><span>${g(((kt=p.dist)==null?void 0:kt[P-1])||0)}</span></div>`})}
          </div>
        </div>
        <div data-reviews>
          ${i.length?i.map(jo).join(""):r`<p class="muted">${a("pdp.noReviews")}</p>`}
        </div>
        <div class="divider"></div>
        ${m.me?r`
          <form data-act="review-submit" data-pid="${n.id}">
            <strong>${a("pdp.writeReview")}</strong>
            <div class="mt-s">${hs({name:"rating",value:5})}</div>
            <label class="field mt-s"><span class="label">${a("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${a("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${a("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${a("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${a("nav.login")}</a></span></p>`}
      </div>`:""}

      ${B("questions")?r`
      <div class="tab-panel" data-panel="questions" hidden>
        <div data-questions>
          ${l.length?l.map(jo).join(""):r`<p class="muted">${a("pdp.noQuestions")}</p>`}
        </div>
        <div class="divider"></div>
        ${m.me?r`
          <form data-act="question-submit" data-pid="${n.id}">
            <strong>${a("pdp.askQuestion")}</strong>
            <label class="field mt-s"><span class="label">${a("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${a("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${a("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${a("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${a("nav.login")}</a></span></p>`}
      </div>`:""}
    </section>

    ${d.length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("layers")} ${a("pdp.related")}</h2></div></div>
      ${jt(d.slice(0,5))}
    </section>`:""}

    ${m.recent.filter(P=>P!==n.id).length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${a("misc.recentlyViewed")}</h2></div></div>
      <div data-recent></div>
    </section>`:""}

    <div class="pdp-bar no-print">
      <div class="pdp-bar-p">
        ${n.price?r`<div class="b">${A(n.price)}</div>`:r`<div class="b pc-inquire">${a("price.inquireShort")}</div>`}
        ${(n.oldPrice||0)>n.price?r`<div class="tiny muted del">${A(n.oldPrice)}</div>`:""}
      </div>
      ${n.price?(n.stock||0)>0?r`<button class="btn btn-primary" data-act="pdp-add" data-id="${n.id}">${c("cart")} ${a("pdp.addToCart")}</button>`:r`<button class="btn btn-ghost" data-act="notify-me" data-id="${n.id}">${c("bell")} ${a("common.notifyMe")}</button>`:k?r`<a class="btn btn-primary" href="tel:${k}">${c("phone")} ${a("pdp.callStore")}</a>`:r`<a class="btn btn-primary" href="#/pages/contact">${c("chat")} ${a("nav.contact")}</a>`}
    </div>
  `}function Ci(t){return{cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box"}[t]||"box"}function jo(t){return r`
    <div class="review" data-rid="${t.id}">
      <div class="rev-head">
        <span class="rev-who">${h(t.userName)}</span>
        <span class="badge-pill ${t.userBadge==="buyer"?"bp-success":"bp-muted"}">${t.userBadge==="buyer"?a("pdp.buyerBadge"):a("pdp.visitorBadge")}</span>
        ${t.rating?Ht(t.rating):""}
        <span class="rev-date">${O(t.createdAt,{time:!1})}</span>
      </div>
      <div class="rev-title">${h(t.title)}</div>
      <div class="rev-body">${h(t.body)}</div>
      ${t.reply?r`<div class="rev-reply"><strong>${a("pdp.storeReply")}:</strong> ${h(t.reply)}</div>`:""}
      <div class="rev-actions">
        <button type="button" class="link-btn" data-act="review-like" data-id="${t.id}">${c("heart")} ${a("pdp.helpful")} (${g(t.likes||0)})</button>
      </div>
    </div>`}function Ai(t){var l,p;let e=t.querySelector(".gal-main");if(!e||!((p=(l=window.matchMedia)==null?void 0:l.call(window,"(hover: hover) and (pointer: fine)"))!=null&&p.matches))return;let s=2.6,n=null,o=null,i=()=>{n&&(n.style.display="none")};e.addEventListener("mousemove",d=>{let b=e.querySelector("img");if(!b||!b.currentSrc){i();return}let u=e.getBoundingClientRect(),v=d.clientX-u.left,w=d.clientY-u.top;if(v<0||w<0||v>u.width||w>u.height){i();return}n||(n=document.createElement("div"),n.className="gal-lens",n.setAttribute("aria-hidden","true"),o=document.createElement("img"),o.alt="",n.appendChild(o),e.appendChild(n));let $=Math.max(120,Math.min(190,Math.round(u.width*.46)));n.style.width=`${$}px`,n.style.height=`${$}px`,n.style.display="block",n.style.left=`${Math.max(-$*.15,Math.min(u.width-$*.85,v-$/2))}px`,n.style.top=`${Math.max(-$*.15,Math.min(u.height-$*.85,w-$/2))}px`;let k=u.width*s,C=u.height*s;o.src=b.currentSrc,o.style.width=`${k}px`,o.style.height=`${C}px`;let H=Math.max($/2,Math.min(k-$/2,v/u.width*k)),F=Math.max($/2,Math.min(C-$/2,w/u.height*C));o.style.left=`${$/2-H}px`,o.style.top=`${$/2-F}px`}),e.addEventListener("mouseleave",i),e.addEventListener("click",i)}function Di(t,e){N(t),hn(e.params.id),En(t),Ai(t);let s=t.querySelector(".gal-main");if(s){let o=null,i=!1;s.addEventListener("click",l=>{i&&(i=!1,l.stopPropagation(),l.preventDefault())},!0),s.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(o=l.clientX)},{passive:!0}),s.addEventListener("pointerup",l=>{var u,v;if(o==null||l.pointerType!=="touch")return;let p=l.clientX-o;if(o=null,Math.abs(p)<48)return;i=!0;let d=JSON.parse(((u=t.querySelector("[data-imgs]"))==null?void 0:u.dataset.imgs)||"[]");if(d.length<2)return;let b=Number(t.querySelector("[data-imgs]").dataset.i||0);b=(b+(p<0?1:-1)+d.length)%d.length,(v=t.querySelector(`[data-thumb="${b}"]`))==null||v.click()},{passive:!0})}t.querySelectorAll("[data-thumb]").forEach(o=>o.addEventListener("click",()=>{var b;let i=Number(o.dataset.thumb),l=JSON.parse(t.querySelector("[data-imgs]").dataset.imgs||"[]"),p=t.querySelector(".gal-main"),d=l[i];if(p&&d)if((b=p.querySelector("img, video"))==null||b.remove(),d.kind==="video"){let u=document.createElement("video");u.src=d.url,u.controls=!0,u.playsInline=!0,u.preload="metadata",u.className="gal-video",d.poster&&(u.poster=d.poster),p.prepend(u)}else{let u=document.createElement("img");u.src=d.url,u.alt="",p.prepend(u)}t.querySelectorAll("[data-thumb]").forEach(u=>u.classList.toggle("active",u===o)),t.querySelector("[data-imgs]").dataset.i=String(i)})),y("pdp-add",async(o,i)=>{var p;let l=Number(((p=t.querySelector(".qty input"))==null?void 0:p.value)||1);await D(i,async()=>{try{let{addToCart:d}=await Promise.resolve().then(()=>(K(),qa));await d(i.dataset.id,l),E(a("card.added"),{timeout:2400})}catch(d){S(d)}})}),y("pdp-buy",async(o,i)=>{var p;let l=Number(((p=t.querySelector(".qty input"))==null?void 0:p.value)||1);try{let{addToCart:d}=await Promise.resolve().then(()=>(K(),qa));await d(i.dataset.id,l),bt("#/checkout")}catch(d){S(d)}}),y("review-like",async(o,i)=>{if(!m.me){bt("#/auth");return}try{let l=await f.post(`/api/reviews/${i.dataset.id}/like`);i.innerHTML=r`${c("heart")} ${a("pdp.helpful")} (${g(l.likes)})`}catch(l){S(l)}}),y("review-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await D(i.querySelector("button[type=submit]"),async()=>{try{let p=await f.post("/api/reviews",{productId:i.dataset.pid,type:"review",rating:Number(l.get("rating")||0),title:l.get("title"),body:l.get("body")});E(p.message||a("pdp.reviewSubmitted"),{timeout:5e3}),i.reset()}catch(p){S(p)}})}),y("question-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await D(i.querySelector("button[type=submit]"),async()=>{try{let p=await f.post("/api/reviews",{productId:i.dataset.pid,type:"question",title:l.get("title"),body:l.get("body")});E(p.message||a("pdp.questionSubmitted"),{timeout:5e3}),i.reset()}catch(p){S(p)}})});let n=t.querySelector("[data-recent]");return n&&m.recent.length&&f.get("/api/products?limit=60").then(o=>{let l=m.recent.filter(p=>p!==e.params.id).slice(0,5).map(p=>o.items.find(d=>d.id===p)).filter(Boolean);n.innerHTML=jt(l),N(n)}).catch(()=>{}),()=>{}}var Pi,Uo=V(()=>{U();G();Z();K();dt();tt();ut();nt();Pi=t=>t.params.id});function Mi(t){return new Promise((e,s)=>{let n=new Image;n.onload=()=>e(n),n.onerror=()=>s(new Error("image-load")),n.src=t})}async function fs(t){let e=await Mi(t),s=document.createElement("canvas");s.width=9,s.height=8;let n=s.getContext("2d",{willReadFrequently:!0});n.drawImage(e,0,0,9,8);let o=n.getImageData(0,0,9,8).data,i=$=>.299*o[$]+.587*o[$+1]+.114*o[$+2],l="";for(let $=0;$<8;$++)for(let k=0;k<8;k++){let C=i(($*9+k)*4),H=i(($*9+k+1)*4);l+=C>H?"1":"0"}let p="";for(let $=0;$<64;$+=4)p+=parseInt(l.slice($,$+4),2).toString(16);let d=document.createElement("canvas");d.width=8,d.height=8;let b=d.getContext("2d",{willReadFrequently:!0});b.drawImage(e,0,0,8,8);let u=b.getImageData(0,0,8,8).data,v=new Array(64).fill(0);for(let $=0;$<64;$++){let k=u[$*4]>>6,C=u[$*4+1]>>6,H=u[$*4+2]>>6;v[k<<4|C<<2|H]++}let w=v.reduce(($,k)=>$+k,0)||1;return{dhash:p,hist:v.map($=>Math.round($/w*1e3)/1e3)}}var Pn=V(()=>{});var _o={};X(_o,{mount:()=>Ni,render:()=>Li,title:()=>Ii});async function Li(){return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("camera")} ${a("search.imageTitle")}</h1>
      <p class="section-sub">${a("search.imageText")}</p>
    </div></div>

    <div class="card t-center" data-drop>
      <span class="empty-ic">${c("image")}</span>
      <p class="muted">${a("search.imageHint")}</p>
      <div class="row center row-wrap mt">
        <label class="btn btn-primary">${c("upload")} ${a("search.pickFile")}
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file hidden>
        </label>
        <label class="btn btn-ghost">${c("camera")} ${a("search.takePhoto")}
          <input type="file" accept="image/*" capture="environment" data-file hidden>
        </label>
      </div>
      <div class="mt" data-preview hidden>
        <img class="si-preview" data-pimg alt="">
      </div>
    </div>

    <section class="section" data-results hidden></section>`}function Ni(t){N(t);let e=t.querySelector("[data-drop]"),s=t.querySelector("[data-results]"),n=async o=>{if(!o)return;if(!/^image\//.test(o.type)){S({code:"invalid_type",message:a("err.generic")});return}if(o.size>4*1024*1024){S({code:"payload_too_large",message:a("err.generic")});return}let i=await Ie(o),l=t.querySelector("[data-preview]");l.hidden=!1,t.querySelector("[data-pimg]").src=i,s.hidden=!1,s.innerHTML=r`<div class="row center">${c("refresh")} ${a("search.imageIndexing")}</div>`,await D(null,async()=>{var p;try{let d=await fs(i),b=await f.post("/api/search/image",d);if(!b.indexed){s.innerHTML=L({icon:"image",title:a("search.imageNoIndex"),text:a("adm.isHint")});return}if(!((p=b.items)!=null&&p.length)){s.innerHTML=L({icon:"search",title:a("search.imageNoMatch"),action:{href:"#/products",label:a("cart.goShopping")}});return}s.innerHTML=r`
          <div class="section-head"><div><h2 class="section-title">${c("sparkles")} ${g(b.items.length)} ${a("common.results")}</h2></div></div>
          ${jt(b.items.map(u=>zt(mt({},u),{match:u.matchScore})))}
          <div class="row row-wrap mt-s">${b.items.map(u=>{var v;return r`<span class="chip">${(v=u.name)==null?void 0:v.slice(0,24)}… ${g(u.matchScore)}٪</span>`})}</div>`}catch(d){s.innerHTML=L({icon:"alert",title:a("err.generic")}),S(d)}})};return t.querySelectorAll("[data-file]").forEach(o=>o.addEventListener("change",()=>{var i;return n((i=o.files)==null?void 0:i[0])})),["dragover","dragenter"].forEach(o=>e.addEventListener(o,i=>{i.preventDefault(),e.classList.add("drag")})),["dragleave","drop"].forEach(o=>e.addEventListener(o,i=>{i.preventDefault(),e.classList.remove("drag")})),e.addEventListener("drop",o=>{var i,l;return n((l=(i=o.dataTransfer)==null?void 0:i.files)==null?void 0:l[0])}),null}var Ii,Wo=V(()=>{U();G();Z();Pn();tt();dt();Ii=()=>a("search.imageTitle")});var Vo={};X(Vo,{mount:()=>Hi,render:()=>Ri,title:()=>Fi});async function Ri(){var e;await Mt().catch(()=>{});let t=m.cart;return(e=t.items)!=null&&e.length?r`
    <div class="section-head">
      <div><h1 class="section-title">${c("cart")} ${a("cart.title")}</h1>
      <p class="section-sub">${g(t.count)} ${a("common.items")}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${c("trash")} ${a("cart.clear")}</button>
    </div>
    ${je("cart",le("cart"))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${t.items.map(Bi).join("")}
      </div>
      <aside class="summary card">
        <strong>${a("cart.summary")}</strong>
        <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
        <div data-coupon-row>
          ${t.coupon?r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${t.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${a("cart.removeCoupon")}</button></span></div>`:""}
        </div>
        <div data-shipbar>${Bo(t.subtotal)}</div>
        ${t.coupon?"":r`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${a("cart.couponPlaceholder")}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${a("cart.applyCoupon")}</button>
          </form>`}
        <div class="sum-row total"><span>${a("common.payable")}</span><span class="v" data-total>${A(t.subtotal-(t.couponDiscount||0))}</span></div>
        <p class="hint">${a("checkout.concurrencyNote")}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${a("cart.continue")} ${c("chevron-left")}</a>
      </aside>
    </div>`:r`
      <div class="section-head"><div><h1 class="section-title">${c("cart")} ${a("cart.title")}</h1></div></div>
      ${L({icon:"cart",title:a("cart.empty"),text:a("cart.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}})}`}function Bi(t){var s;let e=t.product;return r`
    <div class="cart-line" data-line="${e.id}">
      <a class="cl-img" href="#/product/${e.id}">${(s=e.images)!=null&&s[0]?r`<img src="${e.images[0]}" alt="${ft(e)}" loading="lazy" data-glyph="${e.glyph}">`:c(e.glyph||"box")}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${e.id}">${ft(e)}</a>
        <div class="cl-meta">${e.brandName?`${e.brandName} \xB7 `:""}${A(e.price)} / ${a("common.unit")}</div>
        ${t.available<t.requestedQty?r`<div class="err mt-s">${c("alert")} ${a("common.lowStock")} (${g(t.available)})</div>`:""}
        <div class="cl-foot">
          <span data-qtybox>${bs({value:t.qty,max:Math.max(1,t.available),name:"qty"})}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${e.id}">${c("trash")} ${a("cart.remove")}</button>
          <span class="cl-price">${A(t.lineTotal)}</span>
        </div>
      </div>
    </div>`}function Hi(t){return N(t),t.querySelectorAll(".qty input").forEach(e=>{e.addEventListener("change",async()=>{let n=e.closest("[data-line]").dataset.line,o=Math.max(1,Number(e.value)||1);try{await on(n,o),it(a("cart.updated"),{timeout:1500}),Promise.resolve().then(()=>(nt(),pe)).then(i=>i.refresh(!0))}catch(i){S(i),Promise.resolve().then(()=>(nt(),pe)).then(l=>l.refresh(!0))}})}),y("cart-remove",async(e,s)=>{try{await rn(s.dataset.id),Promise.resolve().then(()=>(nt(),pe)).then(n=>n.refresh(!0))}catch(n){S(n)}}),y("cart-clear",async()=>{if(await wt({text:a("cart.clearConfirm"),danger:!0,okText:a("cart.clear")}))try{await cn(),Promise.resolve().then(()=>(nt(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}}),y("coupon-apply",async(e,s)=>{e.preventDefault();let n=s.querySelector("[name=code]").value.trim();n&&await D(s.querySelector("button"),async()=>{try{await ns(n),E(a("cart.couponApplied")),Promise.resolve().then(()=>(nt(),pe)).then(o=>o.refresh(!0))}catch(o){S(o)}})}),y("coupon-remove",async()=>{try{await ns(""),Promise.resolve().then(()=>(nt(),pe)).then(e=>e.refresh(!0))}catch(e){S(e)}}),null}var Fi,Yo=V(()=>{U();G();Z();K();dt();tt();ut();nt();Fi=()=>a("cart.title")});var Ko={};X(Ko,{mount:()=>ji,render:()=>Oi,title:()=>Ui});async function Oi(t){var o,i,l,p,d,b;if(await Mt().catch(()=>{}),!((o=m.cart.items)!=null&&o.length))return L({icon:"cart",title:a("cart.empty"),text:a("cart.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}});if(!m.me)return L({icon:"user",title:a("checkout.loginRequired"),action:{href:"#/auth?next=checkout",label:a("nav.login")}});if(m.me.kycStatus!=="approved")return L({icon:"shield-alert",title:"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0646\u0627\u0642\u0635 \u0627\u0633\u062A",text:"\u062C\u0647\u062A \u062C\u0644\u0648\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062A\u0642\u0644\u0628 \u0648 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u06CC\u060C \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0647\u0648\u06CC\u062A \u0627\u0633\u062A.",action:{href:"#/account/kyc",label:"\u062A\u06A9\u0645\u06CC\u0644 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A"}});let e=ve(),s=e.zones||[],n=((i=m.me)==null?void 0:i.addresses)||[];try{let u=await f.post("/api/checkout/quote",{delivery:"courier",zone:((l=s[0])==null?void 0:l.id)||"country",express:!1,insurance:!1});aa=u.quote,Pa=(u.paymentMethods||[]).filter(v=>m.me?!0:v.id==="cod"||v.id==="gateway"),Pa.length||(Pa=[{id:"cod",fa:"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",en:"Cash on delivery",note:""}])}catch(u){aa=null}return r`
    <div class="section-head"><div><h1 class="section-title">${c("card")} ${a("checkout.title")}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${a("checkout.step1")}</span>
      <span class="cstep"><span class="n">2</span> ${a("checkout.step2")}</span>
      <span class="cstep"><span class="n">3</span> ${a("checkout.step3")}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${c("truck")} ${a("checkout.delivery")}</strong>
          <div class="col">
            <label class="radio-card">
              <input type="radio" name="delivery" value="pickup" ${e.pickupEnabled===!1?"disabled":""} ${m.me?"":"checked"}>
              <span class="dot"></span>
              <span><span class="b">${a("checkout.pickup")}</span><span class="hint" >${a("checkout.pickupDesc")} ${a("checkout.pickupReady",{h:g(e.handlingHours||24)})}</span></span>
            </label>
            <label class="radio-card${m.me?"":" disabled"}">
              <input type="radio" name="delivery" value="courier" ${m.me?"checked":"disabled"} ${e.courierEnabled===!1?"disabled":""}>
              <span class="dot"></span>
              <span><span class="b">${a("checkout.courier")}</span><span class="hint">${a("checkout.courierDesc")}${m.me?"":` \u2014 ${a("checkout.guestCourierNote")}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            ${j({label:a("checkout.zone"),name:"zone",value:defZone,options:s.map(u=>({value:u.id,label:`${q()?u.name:u.nameEn} \u2014 ${g(u.fee)} ${a("common.toman")} \xB7 ${q()?u.eta:""}`}))})}
            ${e.expressEnabled?yt({label:a("checkout.express"),desc:`${g(e.expressFee||0)} ${a("common.toman")}${Zt()?` \xB7 ${a("acc.plus")}: \u2212${g(e.expressDiscountPct||50)}\u066A`:""}`,name:"express"}):""}
            ${B("insurance")?yt({label:a("checkout.insuranceOpt"),desc:Zt()&&((d=(p=m.settings)==null?void 0:p.plus)!=null&&d.autoInsurance)?a("checkout.insuranceAuto"):a("checkout.insuranceDesc"),name:"insurance",checked:Zt()}):""}

            <div class="divider"></div>
            <strong class="row mb-s">${c("pin")} ${a("checkout.address")}</strong>
            ${m.me?n.length?r`
              <div class="col" data-addresses>
                ${n.map((u,v)=>r`
                  <label class="addr-card">
                    <input type="radio" name="addressId" value="${u.id}" ${u.isDefault||v===0?"checked":""}>
                    <span class="dot"></span>
                    <span>
                      <span class="b">${h(u.title||a("common.address"))}</span>
                      <span class="hint">${h(u.receiver||"")} · ${at(u.phone||"")}<br>${h(u.street||"")}${u.city?`\u060C ${h(u.city)}`:""}${u.postal?` \xB7 ${h(u.postal)}`:""}</span>
                    </span>
                  </label>`)}
              </div>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${a("checkout.addAddress")}</button>
            `:r`
              <p class="notice notice-warn">${c("alert")}<span>${a("checkout.noAddress")}</span></p>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${a("checkout.addAddress")}</button>
            `:r`
              <div class="form-grid mt-s">
                ${x({label:q()?"\u0627\u0633\u062A\u0627\u0646":"Province",name:"guestProvince"})}
                ${x({label:q()?"\u0634\u0647\u0631":"City",name:"guestCity"})}
                ${x({label:q()?"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 (\u062E\u06CC\u0627\u0628\u0627\u0646\u060C \u06A9\u0648\u0686\u0647\u060C \u067E\u0644\u0627\u06A9\u060C \u0648\u0627\u062D\u062F)":"Full Address",name:"guestAddress",span2:!0})}
                ${x({label:q()?"\u06A9\u062F \u067E\u0633\u062A\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)":"Postal Code",name:"guestZip",type:"tel",attrs:'inputmode="numeric"'})}
              </div>
            `}
          </div>
        </section>

        ${m.me?"":r`
        <section class="card">
          <strong class="row mb-s">${c("user")} ${a("checkout.guestInfo")}</strong>
          <p class="hint mb-s">${a("checkout.guestHint")}</p>
          <div class="form-grid">
            ${x({label:a("checkout.guestName"),name:"guestName",required:!0,autocomplete:"name"})}
            ${x({label:a("checkout.guestPhone"),name:"guestPhone",type:"tel",required:!0,autocomplete:"tel",attrs:'inputmode="numeric" maxlength="11" placeholder="09xxxxxxxxx"',hint:a("checkout.guestPhoneHint")})}
          </div>
        </section>`}

        <section class="card">
          <strong class="row mb-s">${c("wallet")} ${a("checkout.paymentMethod")}</strong>
          <div class="col" data-paymethods>
            ${(Pa.length?Pa:[{id:"gateway",fa:"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",en:"Bank gateway",note:""}]).map((u,v)=>r`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${u.id}" ${v===0?"checked":""} ${["snapppay","azki","digipay"].includes(u.id)&&(!m.me||m.me.kycStatus!=="approved")?"disabled":""}>
                <span class="dot"></span>
                <span><span class="b">${q()?u.fa:u.en}</span><span class="hint">${h(u.note||"")}${u.id==="gateway"&&sn().gatewayMode==="demo"?` \u2014 ${a("checkout.gatewayDemo")}`:""}${["snapppay","azki","digipay"].includes(u.id)&&(!m.me||m.me.kycStatus!=="approved")?' <span style="color:var(--danger)">(\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A)</span>':""}</span></span>
              </label>`)}
          </div>
          ${m.me?"":r`<p class="hint mt-s" data-guest-cod-note hidden>${a("checkout.guestCodPickup")}</p>`}
          ${m.me&&B("wallet")&&(((b=m.me.wallet)==null?void 0:b.balance)||0)>0?yt({label:a("checkout.useWallet"),desc:a("checkout.walletBalance",{amount:g(m.me.wallet.balance)}),name:"useWallet",checked:!0}):""}
          <label class="field mt"><span class="label">${a("checkout.note")}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${a("checkout.notePlaceholder")}"></textarea></label>
        </section>

        <section class="card">
          ${Ue({label:r`${a("checkout.acceptTerms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}
          <p class="hint mt-s">${a("checkout.concurrencyNote")}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${a("cart.summary")}</strong>
        <div data-quote>${aa?Cn(aa):r`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${c("check")} ${a("checkout.placeOrder")}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${c("chevron-right")} ${a("cart.title")}</a>
      </aside>
    </form>`}async function Go(t){var s;let e=new FormData(t);try{aa=(await f.post("/api/checkout/quote",{delivery:e.get("delivery")||"courier",zone:e.get("zone")||"country",express:e.get("express")==="on",insurance:e.get("insurance")==="on"})).quote;let o=t.querySelector("[data-quote]");o&&(o.innerHTML=Cn(aa));let i=t.querySelector("[data-courier-opts]"),l=e.get("delivery");if(i&&(i.hidden=l!=="courier"),!m.me){let p=t.querySelector('input[name="paymentMethod"][value="cod"]');if(p){p.disabled=l==="pickup",(s=p.closest(".radio-card"))==null||s.classList.toggle("disabled",l==="pickup");let d=t.querySelector("[data-guest-cod-note]");if(d&&(d.hidden=l!=="pickup"),p.disabled&&p.checked){let b=t.querySelector('input[name="paymentMethod"][value="gateway"]');b&&(b.checked=!0)}}}}catch(n){}}function ji(t){N(t);let e=t.querySelector('form[data-act="checkout-submit"]');if(!e)return null;let s=Ze(()=>Go(e),220);return e.addEventListener("change",s),Go(e),y("addr-add",()=>zi()),y("checkout-submit",async(n,o)=>{n.preventDefault();let i=new FormData(o);if(!i.get("acceptTerms")){Y(a("form.termsRequired"));return}if(m.me&&i.get("delivery")==="courier"&&!i.get("addressId")){Y(a("checkout.noAddress"));return}if(!m.me&&i.get("delivery")==="courier"&&(!i.get("guestProvince")||!i.get("guestCity")||!i.get("guestAddress"))){Y(q()?"\u0644\u0637\u0641\u0627\u064B \u0622\u062F\u0631\u0633 \u067E\u0633\u062A\u06CC \u0631\u0627 \u06A9\u0627\u0645\u0644 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.":"Please enter your shipping address.");return}if(!m.me){if(!String(i.get("guestName")||"").trim()){Y(a("checkout.guestNameRequired"));return}if(!/^09\d{9}$/.test(String(i.get("guestPhone")||"").replace(/[\s-]/g,""))){Y(a("checkout.guestPhoneInvalid"));return}}await D(o.querySelector("button[type=submit]"),async()=>{try{let l=await f.post("/api/checkout",{delivery:i.get("delivery"),zone:i.get("zone"),express:i.get("express")==="on",insurance:i.get("insurance")==="on",paymentMethod:i.get("paymentMethod")||"gateway",useWallet:i.get("useWallet")==="on",note:i.get("note")||"",addressId:i.get("addressId")||"",guestName:m.me?"":String(i.get("guestName")||"").trim(),guestPhone:m.me?"":String(i.get("guestPhone")||"").replace(/[\s-]/g,""),acceptTerms:!0});l.me&&(m.me=l.me,te());try{sessionStorage.setItem("bm_last_order",JSON.stringify(l.order))}catch(p){}await Mt(),l.needsPayment&&["gateway","snapppay","azki","digipay"].includes(l.paymentMethod)?bt(`#/pay/${l.order.id}`):bt(`#/checkout/done/${l.order.id}`)}catch(l){S(l),((l==null?void 0:l.code)==="stock_limit"||(l==null?void 0:l.code)==="product_unavailable")&&T(!0)}})}),null}function zi(){var t,e;if(!m.me){bt("#/auth?next=checkout");return}vs=pt({title:a("acc.addAddress"),body:r`
      <form data-act="addr-save" class="form-grid">
        ${x({label:a("acc.addrTitle"),name:"title",required:!0})}
        ${x({label:a("acc.addrReceiver"),name:"receiver",required:!0,value:m.me.name||""})}
        ${x({label:a("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:m.me.phone||""})}
        ${x({label:a("common.city"),name:"city",value:((e=(t=m.settings)==null?void 0:t.store)==null?void 0:e.city)||""})}
        ${x({label:a("common.postal"),name:"postal"})}
        ${x({label:a("acc.addrStreet"),name:"street",required:!0,span2:!0})}
        ${x({label:a("acc.addrNote"),name:"note",span2:!0})}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${c("check")}</span><span>${a("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}var aa,Pa,vs,Ui,Qo=V(()=>{U();G();Z();K();dt();tt();ut();nt();aa=null,Pa=[];vs=null;y("addr-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";try{let o=await f.post("/api/me/addresses",n);o.addresses&&m.me&&(m.me.addresses=o.addresses),E(a("acc.addrSaved")),vs==null||vs.close(),T(!0)}catch(o){S(o)}});Ui=()=>a("checkout.title")});var Jo={};X(Jo,{mount:()=>Vi,render:()=>Wi,title:()=>Yi});function _i(t){try{let e=JSON.parse(sessionStorage.getItem("bm_last_order")||"null");return e&&e.id===t?e:null}catch(e){return null}}async function Wi(t){var o,i;let e=t.params.id,s=_i(e);if(!s&&m.me)try{s=(await f.get(`/api/me/orders/${encodeURIComponent(e)}`)).order}catch(l){}if(!s)return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h1 class="mt-s">${a("checkout.successTitle")}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${a("acc.orders")}</a>
    </div>`;let n=((o=s.payment)==null?void 0:o.status)==="paid";return r`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${c("check-circle")}</span>
      <h1 class="mt-s">${a("checkout.successTitle")}</h1>
      <p class="muted">${a("checkout.successText",{code:s.code})}</p>
      <div class="row center row-wrap mt">
        ${$e(s.status)} ${ze(s.payment)}
        <span class="badge-pill bp-accent">${A(s.total)}</span>
      </div>
      ${!n&&((i=s.payment)==null?void 0:i.method)==="gateway"?r`
        <a class="btn btn-success btn-lg mt" href="#/pay/${s.id}">${c("card")} ${a("checkout.payNow")}</a>`:""}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${s.id}">${c("package-check")} ${a("acc.trackOrder")}</a>
        <a class="btn btn-primary" href="#/products">${c("cart")} ${a("cart.goShopping")}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${ta(s)}</div>
    </div>`}function Vi(t){return N(t),null}var Yi,Xo=V(()=>{U();G();Z();K();dt();Yi=()=>a("checkout.successTitle")});var Zo={};X(Zo,{mount:()=>Ki,render:()=>Gi,title:()=>Qi});async function Gi(t){var l,p,d,b,u,v,w;let e=t.params.id,s=null;try{s=(await f.get(`/api/me/orders/${encodeURIComponent(e)}`)).order}catch($){}if(!s)return L({icon:"alert",title:a("err.notFound"),action:{href:"#/account/orders",label:a("acc.orders")}});if(((l=s.payment)==null?void 0:l.status)==="paid")return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h2 class="mt-s">${a("checkout.paymentSuccess")}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${s.id}">${a("acc.trackOrder")}</a>
    </div>`;let n=(p=s.payable)!=null?p:s.total,o=["snapppay","azki","digipay"].includes((d=s.payment)==null?void 0:d.method),i="";return((b=s.payment)==null?void 0:b.method)==="snapppay"?i="\u0627\u0633\u0646\u067E\u200C\u067E\u06CC":((u=s.payment)==null?void 0:u.method)==="azki"?i="\u0627\u0632\u06A9\u06CC\u200C\u0648\u0627\u0645":((v=s.payment)==null?void 0:v.method)==="digipay"&&(i="\u062F\u06CC\u062C\u06CC\u200C\u067E\u06CC"),r`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${c("card")}</span>
        <h1 class="mt-s">${o?"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0642\u0633\u0627\u0637\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 "+i:a("common.payment")}</h1>
        <p class="muted">${a("acc.orderCode")}: <span class="mono b">${s.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${A(n)}</span></div>
        
        ${o?r`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${c("info")} شبیه‌ساز درگاه اقساطی (${i})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${i} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        `:r`
          <p class="notice notice-warn">${c("info")}<span>${a("checkout.gatewayDemo")}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="1">${c("check")} ${a("checkout.simulateSuccess")}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="0">${c("close")} ${a("checkout.simulateFail")}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${a("acc.orderDate")}: ${s.createdAt}</span>
          <span>${a("common.items")}: ${g(((w=s.items)==null?void 0:w.length)||0)}</span>
        </div>
      </div>
    </div>`}function Ki(t){return N(t),null}var Qi,tr=V(()=>{U();G();Z();K();dt();tt();nt();ut();y("pay-sim",async(t,e)=>{let s=e.dataset.ok==="1";await D(e,async()=>{try{let n=await f.post(`/api/payments/simulate/${e.dataset.id}`,{success:s});await te(),await Mt(),s?(E(a("checkout.paymentSuccess")),bt(`#/checkout/done/${e.dataset.id}`)):(S({code:"payment_failed",message:a("checkout.paymentFailed"),details:"Payment failed"}),bt("#/account/orders"))}catch(n){S(n)}})});Qi=()=>a("common.payment")});var er={};X(er,{mount:()=>Xi,render:()=>Ji,title:()=>Zi});async function Ji(){let t=m.compare.slice(0,4);if(!t.length)return L({icon:"scale",title:a("compare.empty"),text:a("compare.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}});let e=(await Promise.all(t.map(o=>f.get(`/api/products/${encodeURIComponent(o)}`).catch(()=>null)))).filter(Boolean).map(o=>o.product);if(!e.length)return L({icon:"scale",title:a("compare.empty")});let s=[...new Set(e.flatMap(o=>Object.keys(o.specs||{})))],n=(o,i)=>r`<tr><th class="t-start">${o}</th>${i.map(l=>r`<td>${l}</td>`)}</tr>`;return r`
    <div class="section-head"><div><h1 class="section-title">${c("scale")} ${a("compare.title")}</h1>
    <p class="section-sub">${g(e.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${a("common.product")}</th>${e.map(o=>{var i;return r`<th>
          <div class="col center">
            <a href="#/product/${o.id}">${(i=o.images)!=null&&i[0]?r`<img class="table-img" src="${o.images[0]}" alt="${ft(o)}" data-glyph="${o.glyph}">`:c(o.glyph)}</a>
            <span class="small">${ft(o)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${o.id}">${c("trash")} ${a("compare.remove")}</button>
          </div></th>`})}</tr></thead>
        <tbody>
          ${n(a("common.price"),e.map(o=>ct(A(o.price))))}
          ${n(a("common.brand"),e.map(o=>q()?o.brandName:o.brandNameEn||o.brandName||"\u2014"))}
          ${n(a("common.stock"),e.map(o=>o.stock>0?r`<span class="badge-pill bp-success">${g(o.stock)}</span>`:r`<span class="badge-pill bp-danger">${a("card.outOfStock")}</span>`))}
          ${n(a("common.rating"),e.map(o=>o.ratingCount?r`${Ht(o.ratingAvg)} ${g(o.ratingAvg)}`:"\u2014"))}
          ${n(a("adm.pAuth"),e.map(o=>a(`auth.${o.authenticity||"generic"}`)))}
          ${n(a("pdp.warranty"),e.map(o=>o.warrantyMonths?a("pdp.warrantyMonths",{n:g(o.warrantyMonths)}):a("pdp.noWarranty")))}
          ${n(a("pdp.weight"),e.map(o=>o.weight?`${g(o.weight)} ${a("pdp.gram")}`:"\u2014"))}
          ${s.map(o=>n(o,e.map(i=>{var l;return((l=i.specs)==null?void 0:l[o])||"\u2014"})))}
          ${n("",e.map(o=>r`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${o.id}" ${o.stock<=0?"disabled":""}>${c("cart")} ${a("card.addToCart")}</button>`))}
        </tbody>
      </table>
    </div>`}function Xi(t){return N(t),null}var Zi,ar=V(()=>{U();G();Z();K();dt();Zi=()=>a("compare.title")});var sr={};X(sr,{render:()=>tl,title:()=>el});async function tl(){let t=null;try{t=await f.get("/api/lotteries")}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}let e=(t.items||[]).filter(n=>n.status==="active"),s=(t.items||[]).filter(n=>n.status!=="active");return e.length?r`
    <h1 class="section-title mb">${c("gift2")} ${a("lot.title")}</h1>
    <div class="cart-grid">
      ${e.map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${c("sparkles")} ${h(n.title)}</strong><span class="badge-pill bp-accent">${a("lot.active")}</span></div>
          <p class="mt-s">${a("lot.prize")}: <b>${h(n.prize)}</b></p>
          <p class="muted small">${a("lot.ends")}: ${O(n.endsAt)} · ${a("lot.entries")}: ${g(n.entries||0)}</p>
          ${n.myEntry?r`<div class="notice notice-success mt-s">${c("check")} ${a("lot.joined")}</div>`:n.entryMode==="manual"?r`<button class="btn btn-primary mt-s" data-act="lot-join" data-id="${n.id}">${c("gift2")} ${a("lot.join")}</button>`:r`<p class="hint mt-s">${a("lot.autoEntry")}</p>`}
        </div>`)}
      ${s.slice(0,6).map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${h(n.title)}</strong><span class="badge-pill bp-success">${a("lot.done")}</span></div>
          <p class="tiny muted mt-s">${a("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
        </div>`)}
    </div>`:r`
      <div class="card lot-soon">
        <span class="lot-ic">${c("gift2")}</span>
        <h1 class="buy-title">${a("lot.title")}</h1>
        <p class="muted mt-s">${a("lot.soon")}</p>
        ${s.length?r`<div class="mt">
          <h2 class="section-title small">${c("history")} ${a("lot.done")}</h2>
          ${s.slice(0,5).map(n=>r`
            <div class="notif-item lv-success mt-s">
              <strong class="tiny">${h(n.title)}</strong>
              <p class="tiny muted mt-s">${a("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
            </div>`)}
        </div>`:""}
      </div>`}var el,nr=V(()=>{U();G();Z();tt();ut();K();y("lot-join",async(t,e)=>{if(!m.me){Y(a("nav.login"));return}await D(e,async()=>{try{await f.post(`/api/lotteries/${e.dataset.id}/join`,{}),E(a("lot.joinDone")),Promise.resolve().then(()=>(nt(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}})});el=()=>q()?"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC":"Lottery"});var ir={};X(ir,{mount:()=>nl,render:()=>al,title:()=>ol});async function al(){return r`
    <div class="section-head">
      <div><h1 class="section-title">${c("barcode")} ${a("priceCheck.title")}</h1>
      <p class="section-sub">${a("priceCheck.sub")}</p></div>
      <button type="button" class="btn btn-ghost" data-act="pc-fullscreen">${c("external")} ${a("priceCheck.fullscreen")}</button>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card scan-view">
          <form class="row" data-act="pc-lookup" >
            <input class="input" name="code" placeholder="${a("priceCheck.input")}" data-autofocus autocomplete="off" inputmode="numeric">
            <button class="btn btn-primary" type="submit">${c("search")} ${a("common.search")}</button>
          </form>
          <div class="row row-wrap center">
            <button type="button" class="btn btn-ghost" data-act="pc-camera">${c("camera")} ${a("priceCheck.scanCamera")}</button>
            <button type="button" class="btn btn-ghost" hidden data-act="pc-camera-stop">${c("close")} ${a("priceCheck.stopCamera")}</button>
          </div>
          <div class="scan-frame" data-frame hidden>
            <video playsinline muted></video>
            <span class="scan-line"></span>
            <span class="scan-corner" ></span>
          </div>
          <p class="hint">${a("adm.bScanHint")}</p>
          <input class="pc-wedge" data-wedge autocomplete="off" aria-label="${a("priceCheck.input")}" placeholder="${a("priceCheck.waiting")}">
        </div>
        <div class="card" data-history>
          <strong class="row mb-s">${c("history")} ${a("priceCheck.lastScan")}</strong>
          <div class="col" data-hlist><p class="muted small">${a("common.noData")}</p></div>
        </div>
      </div>
      <aside class="card price-display" data-result>
        <span class="empty-ic">${c("barcode")}</span>
        <p class="muted">${a("priceCheck.waiting")}</p>
      </aside>
    </div>`}function $s(t,e,{error:s=""}={}){var n;if(s){t.innerHTML=r`<span class="empty-ic danger">${c("alert")}</span><h3>${s}</h3>`;return}t.innerHTML=r`
    ${(n=e.images)!=null&&n[0]?r`<img class="pc-result-img" src="${e.images[0]}" alt="${ft(e)}" data-glyph="${e.glyph}">`:c(e.glyph||"box")}
    <h2 class="mt-s">${ft(e)}</h2>
    <p class="muted small">${e.brandName||""} ${e.sku?`\xB7 ${e.sku}`:""}</p>
    <div class="big">${A(e.price,{withUnit:!1})}</div>
    <div class="cur">${a("common.toman")}</div>
    ${e.oldPrice>e.price?r`<p class="pc-old">${A(e.oldPrice)}</p>`:""}
    <div class="mt-s">${e.stock>0?r`<span class="badge-pill bp-success">${a("pdp.stockCount",{n:g(e.stock)})}</span>`:r`<span class="badge-pill bp-danger">${a("card.outOfStock")}</span>`}</div>
    <a class="btn btn-primary mt" href="#/product/${e.id}">${a("common.details")} ${c("chevron-left")}</a>`}async function Mn(t,e){let s=e.querySelector("[data-result]");try{let n=await f.post("/api/scan",{code:String(t).trim()});if(n.found&&n.product)return $s(s,n.product),sl(e,n.product),n.product;$s(s,null,{error:a("priceCheck.notFound")})}catch(n){(n==null?void 0:n.status)===404?$s(s,null,{error:a("priceCheck.notFound")}):$s(s,null,{error:a("err.generic")})}return null}function sl(t,e){ys.unshift({id:e.id,name:ft(e),price:e.price,at:new Date().toISOString()}),ys.length>8&&ys.pop();let s=t.querySelector("[data-hlist]");s&&(s.innerHTML=ys.map(n=>r`<div class="row row-between small"><span class="nowrap">${n.name}</span><span class="b">${g(n.price)}</span></div>`).join(""))}function nl(t){N(t),document.body.classList.add("kiosk-page");let e=t.querySelector("[data-wedge]"),s="",n=0;return e.addEventListener("keydown",o=>{let i=Date.now();if(i-n>120&&(s=""),n=i,o.key==="Enter"){o.preventDefault();let l=s.trim();s="",l&&Mn(l,t);return}o.key.length===1&&(s+=o.key)}),e.focus(),y("pc-lookup",(o,i)=>{o.preventDefault(),Mn(i.querySelector("[name=code]").value,t)}),y("pc-fullscreen",()=>{var o,i;document.fullscreenElement?document.exitFullscreen().catch(()=>{}):(i=(o=document.documentElement).requestFullscreen)==null||i.call(o).catch(()=>it(a("misc.printBlocked")))}),y("pc-camera",async(o,i)=>{var d;let l=t.querySelector("[data-frame]"),p=l.querySelector("video");if(!("BarcodeDetector"in window)&&!((d=navigator.mediaDevices)!=null&&d.getUserMedia)){Y(a("priceCheck.cameraUnsupported"));return}try{if(sa=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),p.srcObject=sa,await p.play(),l.hidden=!1,i.hidden=!0,t.querySelector('[data-act="pc-camera-stop"]').hidden=!1,"BarcodeDetector"in window){or=new window.BarcodeDetector({formats:["ean_13","ean_8","code_128","code_39","upc_a","upc_e"]});let b=async()=>{if(sa){try{let u=await or.detect(p);if(u!=null&&u.length){let v=u[0].rawValue;Mn(v,t);let w=t.querySelector("[name=code]");w&&(w.value=v)}}catch(u){}cr=setTimeout(b,700)}};b()}}catch(b){Y(a("priceCheck.cameraDenied"))}}),y("pc-camera-stop",(o,i)=>{rr(t),i.hidden=!0,t.querySelector('[data-act="pc-camera"]').hidden=!1}),()=>{rr(t),document.body.classList.remove("kiosk-page")}}function rr(t){if(clearTimeout(cr),sa){for(let s of sa.getTracks())s.stop();sa=null}let e=t==null?void 0:t.querySelector("[data-frame]");e&&(e.hidden=!0)}var sa,or,cr,ys,ol,lr=V(()=>{U();G();Z();K();tt();ut();sa=null,or=null,cr=0,ys=[];ol=()=>a("priceCheck.title")});var Nn={};X(Nn,{mount:()=>cl,render:()=>rl,title:()=>il});async function ws(t){var i,l,p,d;let e=(i=t==null?void 0:t.querySelector)==null?void 0:i.call(t,"[data-captcha]");if(!e||e.hidden)return!0;let s=e.querySelector("[name=captchaAnswer]");if(s&&String(s.value).trim()&&!e.dataset.verifying&&!((l=e.querySelector("[data-ctok]"))!=null&&l.value)){let b=ks("captcha-check");b&&await b(new Event("change"),s)}if(e.dataset.verifying&&await new Promise(b=>{let u=Date.now(),v=setInterval(()=>{(!e.dataset.verifying||Date.now()-u>2500)&&(clearInterval(v),b())},60)}),String(((p=e.querySelector("[data-ctok]"))==null?void 0:p.value)||"").trim())return!0;let n=e.querySelector("[name=captchaBox]"),o=e.querySelector("[data-cch]");return n&&(n.checked=!0),o&&(o.hidden=!1),e.dataset.cid||_e(e),(d=e.querySelector("[name=captchaAnswer]"))==null||d.focus(),it(a("captcha.required"),{type:"error",timeout:4500}),!1}function Ma(t){let e=t&&!t.startsWith("auth")?`#/${t.replace(/^#|^\/|#$/g,"")}`:"#/";Ot().then(()=>Mt()).then(()=>un()).then(()=>bt(e))}async function rl(t){let e=t.query.get("next")||"",s=t.query.get("ref")||"",n=t.params.mode==="register"||!!s,o=t.params.mode==="forgot";return r`
    <div class="auth-wrap">
      <div class="card auth-card">
        <div class="t-center mb">
          <span class="pwa-ic center" data-h="56px" data-w="56px">${c("user")}</span>
          <h1 class="mt-s" data-title>${n?a("auth.registerTitle"):o?a("auth.recoveryTitle"):a("auth.loginTitle")}</h1>
        </div>

        <div class="tabs" data-auth-tabs role="tablist">
          <button type="button" class="tab ${!n&&!o?"active":""}" data-at="login" role="tab">${a("common.login")}</button>
          <button type="button" class="tab ${n?"active":""}" data-at="register" role="tab">${a("common.register")}</button>
          <button type="button" class="tab ${o?"active":""}" data-at="forgot" role="tab">${a("auth.forgot")}</button>
        </div>

        <!-- ورود -->
        <div class="tab-panel" data-ap="login" ${n||o?"hidden":""}>
          <div class="btn-group mb" data-method>
            <button type="button" class="btn active" data-m="password">${a("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${a("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
          </div>

          <form data-act="login-pass" data-apf="password">
            ${x({label:a("auth.identifier"),name:"identifier",required:!0,autocomplete:"username"})}
            ${x({label:a("common.password"),name:"password",type:"password",required:!0,autocomplete:"current-password"})}
            <div class="row row-between mb">
              ${Ue({label:a("auth.remember"),name:"remember",checked:!0})}
              <button type="button" class="link-btn" data-goto="forgot">${a("auth.forgot")}</button>
            </div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("logout")} ${a("common.login")}</button>
          </form>

          <form data-act="otp-send" data-purpose="login" data-apf="phone" hidden>
            ${x({label:a("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${a("auth.sendCode")}</button>
          </form>
          <form data-act="otp-send" data-purpose="login" data-apf="email" hidden>
            ${x({label:a("common.email"),name:"target",type:"email",required:!0})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${a("auth.sendCode")}</button>
          </form>

          <form data-act="otp-login" data-apf="code" hidden>
            <p class="notice notice-info mb">${c("mail")}<span data-sentto></span></p>
            <p class="notice notice-warn mb" data-democode hidden>${c("info")}<span></span></p>
            ${x({label:a("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${c("check")} ${a("common.login")}</button>
            <div class="row row-between mt-s">
              <button type="button" class="link-btn" data-resend>${a("auth.resend")}</button>
              <span class="muted tiny" data-resend-timer></span>
            </div>
          </form>

          <form data-act="login-2fa" data-apf="2fa" hidden>
            <p class="notice notice-info mb">${c("shield")}<span>${a("auth.2faText")}</span></p>
            <div class="btn-group mb" data-2fa-method></div>
            ${x({label:a("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric"'})}
            <button class="btn btn-primary btn-block" type="submit">${c("shield")} ${a("auth.2faVerify")}</button>
          </form>
        </div>

        <!-- ثبت‌نام -->
        <div class="tab-panel" data-ap="register" ${n?"":"hidden"}>
          <div class="btn-group mb" data-regmode>
            <button type="button" class="btn active" data-m="username">${a("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${a("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
          </div>
          <form data-act="register" data-next="${e}">
            ${x({label:a("common.fullName"),name:"name",required:!0,autocomplete:"name"})}
            <span data-reg-username>${x({label:a("common.username"),name:"username",autocomplete:"username",hint:$t()==="fa"?"\u062D\u0631\u0648\u0641 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC\u060C \u0639\u062F\u062F \u0648 _ \u060C \u062D\u062F\u0627\u0642\u0644 \u06F3 \u0646\u0648\u06CC\u0633\u0647":"letters, digits and _ , min 3 chars"})}</span>
            <span data-reg-target-phone hidden>${x({label:a("common.phone"),name:"phoneTarget",type:"tel",placeholder:"09xxxxxxxxx"})}</span>
            <span data-reg-target-email hidden>${x({label:a("common.email"),name:"emailTarget",type:"email"})}</span>
            <span data-reg-code hidden>
              <div class="row">
                <span class="grow">${x({label:a("auth.otpCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}</span>
                <button type="button" class="btn btn-ghost" data-reg-send>${a("auth.sendCode")}</button>
              </div>
              <p class="notice notice-warn mb" data-reg-demo hidden>${c("info")}<span></span></p>
            </span>
            <span data-reg-extra>
              ${x({label:`${a("common.phone")} (${a("common.optional")})`,name:"phone",type:"tel"})}
              ${x({label:`${a("common.email")} (${a("common.optional")})`,name:"email",type:"email"})}
            </span>
            ${x({label:a("common.password"),name:"password",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
            <div class="row row-between mt-s gap-2">
              <span class="grow">${x({label:"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",name:"referralCode",placeholder:"\u0645\u062B\u0644\u0627\u064B Z8A4X"})}</span>
              <span class="grow">
                <span class="grow" style="width:100%">
                <label class="field">
                  <span class="label">نحوه آشنایی (اختیاری)</span>
                  <input type="hidden" name="hearAboutUs" value="">
                  <button type="button" class="input" data-act="choose-hear" style="text-align: right; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <span data-txt>(انتخاب کنید)</span>
                    ${c("chevron-down")}
                  </button>
                </label>
              </span>
              </span>
            </div>
            <div class="mb">${Ue({label:r`${a("auth.acceptTerms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}</div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("user")} ${a("common.register")}</button>
          </form>
        </div>

        <!-- بازیابی -->
        <div class="tab-panel" data-ap="forgot" ${o?"":"hidden"}>
          <p class="muted small mb">${a("auth.recoveryText")}</p>
          <form data-act="forgot-send">
            <div class="btn-group mb" data-fch>
              <button type="button" class="btn active" data-m="phone">${a("auth.methodPhone")}</button>
              <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
            </div>
            ${x({label:a("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${a("auth.sendCode")}</button>
          </form>
          <form data-act="forgot-reset" hidden>
            <p class="notice notice-info mb">${c("mail")}<span data-fsent></span></p>
            <p class="notice notice-warn mb" data-fdemo hidden>${c("info")}<span></span></p>
            ${x({label:a("auth.otpCode"),name:"code",required:!0,attrs:'inputmode="numeric" maxlength="6"'})}
            ${x({label:a("auth.newPassword"),name:"password",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
            <button class="btn btn-primary btn-block" type="submit">${c("key")} ${a("common.save")}</button>
          </form>
        </div>
      </div>
    </div>`}function cl(t,e){var p;N(t),t.querySelectorAll("[data-captcha]").forEach(d=>_e(d));let s=e.query.get("next")||"",n=e.query.get("ref")||"";if(n){let d=t.querySelector("[name=referralCode]");d&&(d.value=n,setTimeout(()=>{var b;return(b=t.querySelector('[data-at="register"]'))==null?void 0:b.click()},50))}let o={login:t.querySelector('[data-ap="login"]'),register:t.querySelector('[data-ap="register"]'),forgot:t.querySelector('[data-ap="forgot"]')};t.querySelectorAll("[data-at]").forEach(d=>d.addEventListener("click",()=>{t.querySelectorAll("[data-at]").forEach(b=>b.classList.toggle("active",b===d));for(let[b,u]of Object.entries(o))u.hidden=b!==d.dataset.at})),t.querySelectorAll("[data-goto]").forEach(d=>d.addEventListener("click",()=>t.querySelector(`[data-at="${d.dataset.goto}"]`).click()));let i=t.querySelector("[data-method]");i.addEventListener("click",d=>{let b=d.target.closest("[data-m]");if(!b)return;i.querySelectorAll("[data-m]").forEach(v=>v.classList.toggle("active",v===b));let u=b.dataset.m;o.login.querySelectorAll("[data-apf]").forEach(v=>{v.hidden=v.dataset.apf!==u})});let l=t.querySelector("[data-regmode]");return l.addEventListener("click",d=>{let b=d.target.closest("[data-m]");b&&(l.querySelectorAll("[data-m]").forEach(u=>u.classList.toggle("active",u===b)),rt.regMode=b.dataset.m,t.querySelector("[data-reg-username]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-extra]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-target-phone]").hidden=rt.regMode!=="phone",t.querySelector("[data-reg-target-email]").hidden=rt.regMode!=="email",t.querySelector("[data-reg-code]").hidden=rt.regMode==="username")}),t.querySelector("[data-reg-send]").addEventListener("click",async d=>{var w;let b=t.querySelector('[data-act="register"]'),u=rt.regMode==="phone"?"phone":"email",v=u==="phone"?b.querySelector("[name=phoneTarget]").value:b.querySelector("[name=emailTarget]").value;try{let $=await f.post("/api/auth/otp/send",{channel:u,target:v,purpose:"register",captchaToken:((w=b.querySelector("[data-ctok]"))==null?void 0:w.value)||void 0});rt.demoCode=$.demoCode||"";let k=t.querySelector("[data-reg-demo]");k.hidden=!$.demoCode,$.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:$.demoCode})),E(a("auth.codeSentTo",{target:$.target})),Ln(t,"[data-reg-send]")}catch($){($==null?void 0:$.code)==="captcha_required"&&na(b),S($)}}),y("choose-hear",(d,b)=>{let v=Ta({title:"\u0646\u062D\u0648\u0647 \u0622\u0634\u0646\u0627\u06CC\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
        ${[{v:"",l:"(\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F)"},{v:"google",l:"\u062C\u0633\u062A\u062C\u0648\u06CC \u06AF\u0648\u06AF\u0644"},{v:"instagram",l:"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645"},{v:"telegram",l:"\u062A\u0644\u06AF\u0631\u0627\u0645"},{v:"friend",l:"\u0645\u0639\u0631\u0641\u06CC \u062F\u0648\u0633\u062A\u0627\u0646"},{v:"other",l:"\u0633\u0627\u06CC\u0631"}].map(w=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${w.v}">${w.l}</button>`).join("")}
      </div>`});v.panel.querySelectorAll("button[data-v]").forEach(w=>{w.addEventListener("click",()=>{b.parentElement.querySelector('input[type="hidden"]').value=w.dataset.v,b.querySelector("[data-txt]").textContent=w.textContent,v.close()})})}),y("login-pass",async(d,b)=>{if(d.preventDefault(),ls(b),!await ws(b))return;let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{var v;try{let w=await f.post("/api/auth/login",{identifier:u.get("identifier"),password:u.get("password"),remember:u.get("remember")==="on",captchaToken:u.get("captchaToken")||void 0});w.twoFactor?(rt.challenge=w.challengeToken,rt.methods=w.methods||["totp"],rt.sent=w.sent||null,dr(t,w)):(m.me=w.me,E(a("auth.loginDone")),Ma(s))}catch(w){((w==null?void 0:w.code)==="captcha_required"||(v=w==null?void 0:w.details)!=null&&v.captchaRequired)&&na(b),S(w)}})}),y("otp-send",async(d,b)=>{if(d.preventDefault(),!await ws(b))return;let u=new FormData(b),v=b.dataset.apf==="email"?"email":"phone";rt.channel=v,rt.target=String(u.get("target")||"").trim(),await D(b.querySelector("button[type=submit]"),async()=>{try{let w=await f.post("/api/auth/otp/send",{channel:v,target:rt.target,purpose:"login",captchaToken:u.get("captchaToken")||void 0});rt.demoCode=w.demoCode||"";let $=o.login.querySelector('[data-apf="code"]');o.login.querySelectorAll("[data-apf]").forEach(C=>{C.hidden=C!==$}),$.querySelector("[data-sentto]").textContent=a("auth.codeSentTo",{target:w.target});let k=$.querySelector("[data-democode]");k.hidden=!w.demoCode,w.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:w.demoCode})),E(a("auth.codeSent")),Ln(t,"[data-resend]"),$.querySelector("[name=code]").focus()}catch(w){(w==null?void 0:w.code)==="captcha_required"&&na(b),S(w)}})}),y("otp-login",async(d,b)=>{d.preventDefault();let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{try{let v=await f.post("/api/auth/login/otp",{channel:rt.channel,target:rt.target,code:u.get("code")});if(v.twoFactor){rt.challenge=v.challengeToken,rt.methods=v.methods||["totp"],dr(t,v);return}m.me=v.me,E(a("auth.loginDone")),Ma(s)}catch(v){S(v)}})}),(p=t.querySelector("[data-resend]"))==null||p.addEventListener("click",async()=>{try{let d=await f.post("/api/auth/otp/send",{channel:rt.channel,target:rt.target,purpose:"login"});rt.demoCode=d.demoCode||"";let b=o.login.querySelector("[data-democode]");b.hidden=!d.demoCode,d.demoCode&&(b.querySelector("span").textContent=a("auth.demoCode",{code:d.demoCode})),E(a("auth.codeSent")),Ln(t,"[data-resend]")}catch(d){S(d)}}),y("login-2fa",async(d,b)=>{var w;d.preventDefault();let u=new FormData(b),v=((w=b.querySelector("[data-2fam].active"))==null?void 0:w.dataset["2fam"])||"totp";await D(b.querySelector("button[type=submit]"),async()=>{try{let $=await f.post("/api/auth/login/2fa",{challengeToken:rt.challenge,code:u.get("code"),type:v});m.me=$.me,E(a("auth.loginDone")),Ma(s)}catch($){S($)}})}),y("register",async(d,b)=>{if(d.preventDefault(),ls(b),!await ws(b))return;let u=new FormData(b),v={mode:rt.regMode,name:u.get("name"),password:u.get("password"),acceptTerms:u.get("acceptTerms")==="on",referralCode:u.get("referralCode")||"",hearAboutUs:u.get("hearAboutUs")||"",captchaToken:u.get("captchaToken")||void 0};rt.regMode==="username"?(v.username=u.get("username"),v.phone=u.get("phone")||"",v.email=u.get("email")||""):rt.regMode==="phone"?(v.target=u.get("phoneTarget"),v.code=u.get("code"),v.email=u.get("email")||""):(v.target=u.get("emailTarget"),v.code=u.get("code"),v.phone=u.get("phone")||""),await D(b.querySelector("button[type=submit]"),async()=>{try{let w=await f.post("/api/auth/register",v);m.me=w.me,E(a("auth.registerDone")),Ma(s||"")}catch(w){(w==null?void 0:w.code)==="captcha_required"&&na(b),S(w)}})}),y("forgot-send",async(d,b)=>{if(d.preventDefault(),!await ws(b))return;let u=new FormData(b),v=b.querySelector("[data-fch] .active").dataset.m;rt.channel=v,rt.target=String(u.get("target")||"").trim(),await D(b.querySelector("button[type=submit]"),async()=>{try{let w=await f.post("/api/auth/password/forgot",{channel:v,target:rt.target,captchaToken:u.get("captchaToken")||void 0}),$=o.forgot.querySelector('[data-act="forgot-reset"]');o.forgot.querySelector('[data-act="forgot-send"]').hidden=!0,$.hidden=!1,$.querySelector("[data-fsent]").textContent=a("auth.codeSentTo",{target:w.target});let k=$.querySelector("[data-fdemo]");k.hidden=!w.demoCode,w.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:w.demoCode})),E(a("auth.codeSent"))}catch(w){(w==null?void 0:w.code)==="captcha_required"&&na(b),S(w)}})}),y("forgot-reset",async(d,b)=>{d.preventDefault();let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{try{let v=await f.post("/api/auth/password/reset",{channel:rt.channel,target:rt.target,code:u.get("code"),password:u.get("password")});m.me=v.me,E(a("auth.resetDone")),Ma("")}catch(v){S(v)}})}),null}function dr(t,e){var p;let s=t.querySelector('[data-ap="login"]');s.querySelectorAll("[data-apf]").forEach(d=>{d.hidden=d.dataset.apf!=="2fa"});let n=s.querySelector('[data-act="login-2fa"]'),o=n.querySelector("[data-2fa-method]"),i=rt.methods,l={totp:a("auth.2faTotp"),sms:a("auth.2faSms"),email:a("auth.2faEmail"),backup:a("auth.2faBackup")};o.innerHTML=i.map((d,b)=>r`<button type="button" class="btn ${b===0?"active":""}" data-2fam="${d}">${l[d]||d}</button>`).join(""),o.addEventListener("click",d=>{let b=d.target.closest("[data-2fam]");b&&o.querySelectorAll("[data-2fam]").forEach(u=>u.classList.toggle("active",u===b))}),(p=e.sent)!=null&&p.demoCode&&it(a("auth.demoCode",{code:e.sent.demoCode}),{title:a("auth.2faTitle"),timeout:12e3}),n.querySelector("[name=code]").focus()}function Ln(t,e){let s=60,n=t.querySelector(e),o=setInterval(()=>{s-=1,n&&(n.textContent=s>0?a("auth.resendIn",{s:g(s)}):a("auth.resend")),s<=0&&clearInterval(o)},1e3)}var rt,il,In=V(()=>{U();G();Z();K();dt();tt();ut();nt();rt={challenge:null,methods:[],sent:null,channel:"phone",target:"",demoCode:"",mode:"login",regMode:"username"};il=()=>a("auth.title")});async function xs(){return(await f.get("/api/support/messages")).items||[]}function Es(t){return t.length?t.map(Hn).join(""):r`<div class="msg them">${a("acc.chatWelcome")}</div>`}function qs(t){requestAnimationFrame(()=>{t.scrollTop=t.scrollHeight})}async function ll(t){return await f.post("/api/support/messages",{body:t})}function Ss(){if(!dl())return;if(!m.me){it(a("chat.loginFirst")),location.hash="#/auth?next="+encodeURIComponent("account/support");return}if(Kt){mr();return}let t=document.getElementById("chatRoot");Kt=Jt("div",{class:"chat-win",role:"dialog","aria-label":a("chat.title")}),Kt.innerHTML=r`
    <header class="chat-h">
      <span class="stat-ic" data-h="34px" data-w="34px">${c("headset")}</span>
      <div class="grow">
        <div class="t">${a("chat.title")}</div>
        <div class="s"><span class="online-dot"></span>${a("chat.online")}</div>
      </div>
      <button type="button" class="icon-btn" data-cx aria-label="${a("chat.minimize")}">${c("close")}</button>
    </header>
    <div class="chat-b" data-thread><div class="msg them">${a("common.loading")}</div></div>
    <form class="chat-f" data-act="chat-send">
      <input class="input" name="body" maxlength="1000" placeholder="${a("acc.chatPlaceholder")}" autocomplete="off">
      <button type="submit" class="btn btn-primary btn-icon" aria-label="${a("common.send")}">${c("send")}</button>
    </form>`,t.appendChild(Kt),we=Kt.querySelector("[data-thread]"),Kt.querySelector("[data-cx]").addEventListener("click",mr);let e=Kt.querySelector(".chat-h .stat-ic");e&&(e.style.width="34px",e.style.height="34px",e.style.borderRadius="11px"),xs().then(s=>{we.innerHTML=Es(s),qs(we)}).catch(()=>{we.innerHTML=r`<div class="msg them">${a("err.network")}</div>`}),Kt.querySelector("input[name=body]").focus()}function mr(){Kt==null||Kt.remove(),Kt=null,we=null}function ur(t){let e=[];we&&e.push(we),document.querySelectorAll("[data-thread-page]").forEach(s=>e.push(s));for(let s of e){if(s.querySelector(`[data-id="${t.id}"]`))continue;let n=s.querySelector(".msg");n&&!n.dataset.id&&s.children.length===1&&n.classList.contains("them")&&n.textContent===a("acc.chatWelcome")&&(s.innerHTML=""),s.insertAdjacentHTML("beforeend",Hn(t)),qs(s)}}function br(){var t,e;(t=document.getElementById("fabSupport"))==null||t.addEventListener("click",Ss),(e=document.getElementById("btnSupportTop"))==null||e.addEventListener("click",Ss),Ft("sse:support",s=>{!m.me||(s==null?void 0:s.userId)!==m.me.id||xs().then(n=>{let o=n.find(l=>l.id===s.id);o&&o.from==="staff"&&(pr()?ur(o):(Bn+=1,Rn(),it(o.body,{title:a("chat.title"),timeout:6e3,action:{label:a("common.view"),onClick:Ss}})));let i=document.querySelector("[data-thread-page]");i&&!pr()&&(i.innerHTML=Es(n),qs(i))}).catch(()=>{})}),Ft("me",()=>Rn())}function Rn(){let t=document.getElementById("fabSupport");if(!t)return;let e=t.querySelector(".fab-dot");Bn>0?e||(e=Jt("span",{class:"fab-dot"}),t.appendChild(e)):e==null||e.remove()}function hr(){Bn=0,Rn()}function dl(){var t,e;return((e=(t=m.settings)==null?void 0:t.features)==null?void 0:e.liveSupport)!==!1}var Kt,we,Bn,Hn,pr,Fn=V(()=>{K();G();Z();U();tt();ut();Kt=null,we=null,Bn=0,Hn=t=>r`
  <div class="msg ${t.from==="user"?"me":"them"}" data-id="${t.id||""}">
    ${h(t.body)}
    <span class="tm">${St(t.at)}</span>
  </div>`;pr=()=>!!Kt;y("chat-open",()=>Ss());y("chat-send",async(t,e)=>{var l;let s=e.querySelector("input[name=body], textarea[name=body]"),n=String((s==null?void 0:s.value)||"").trim();if(!n)return;s.value="";let o={id:"tmp",from:"user",body:n,at:new Date().toISOString()},i=[];we&&i.push(we),document.querySelectorAll("[data-thread-page]").forEach(p=>i.push(p));for(let p of i)p.insertAdjacentHTML("beforeend",Hn(o)),qs(p);try{let p=await ll(n),d=p.message;it(a("chat.sent"),{timeout:1600});for(let b of i){let u=b.querySelector(".msg.me:not([data-id])");u&&(u.dataset.id=d.id,u.querySelector(".tm").textContent=St(d.at))}p.botMessage&&ur(p.botMessage)}catch(p){S(p);for(let d of i)(l=d.lastElementChild)==null||l.remove();s.value=n}})});var jn={};X(jn,{mount:()=>Pl,render:()=>pl,title:()=>Ml});async function pl(t){var o,i,l,p,d,b,u,v,w;let e=t.params.section||"",s=ml.filter($=>!$.feat||B($.feat)),n=await ul(e,t);return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("user")} ${a("acc.title")}</h1>
      <p class="section-sub">${a("acc.hello",{name:h(((o=m.me)==null?void 0:o.name)||((i=m.me)==null?void 0:i.username)||"")})} · ${a("acc.memberSince",{date:O((l=m.me)==null?void 0:l.createdAt,{time:!1})})}</p>
    </div></div>
    <div class="acc-grid">
      <aside class="acc-side">
        <div class="acc-user">
          <span class="av">${h((((p=m.me)==null?void 0:p.name)||((d=m.me)==null?void 0:d.username)||"?").charAt(0))}</span>
          <div class="grow">
            <div class="b nowrap">${h(((b=m.me)==null?void 0:b.name)||((u=m.me)==null?void 0:u.username))}</div>
            <div class="tiny muted">${((v=m.me)==null?void 0:v.role)==="owner"?a("common.admin"):((w=m.me)==null?void 0:w.role)==="staff"?"\u06A9\u0627\u0631\u0645\u0646\u062F":a("common.user")}</div>
          </div>
        </div>
        <nav class="acc-nav" aria-label="${a("acc.title")}">
          ${s.map($=>r`<a href="#/account${$.id?`/${$.id}`:""}" class="${$.id===e?"active":""}">${c($.icon)} ${$.label()}${$.id==="notifications"&&m.unread?r`<span class="cnt">${g(m.unread)}</span>`:""}</a>`)}
        </nav>
      </aside>
      <div data-accbody>${n}</div>
    </div>`}async function ul(t,e){switch(t){case"orders":return hl();case"wishlist":return gl();case"wallet":return fl();case"plus":return vl();case"addresses":return yl();case"notifications":return $l();case"tickets":return kl();case"support":return Sl();case"reviews":return xl();case"feedback":return El();case"referrals":return Nl();case"profile":return ql();case"kyc":return Ll();case"security":return Tl();case"prefs":return Al();case"data":return Dl();default:return bl()}}async function bl(){var s,n,o,i,l,p;let t=[];try{t=(await f.get("/api/me/orders")).items||[]}catch(d){}let e=t.slice(0,4);return r`
    <div class="stats-grid mb">
      <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${g(t.length)}</div><div class="stat-lbl">${a("acc.orders")}</div></div></div>
      ${B("wallet")?r`<div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${g(((n=(s=m.me)==null?void 0:s.wallet)==null?void 0:n.balance)||0)}</div><div class="stat-lbl">${a("common.balance")}</div></div></div>`:""}
      <div class="stat-card"><span class="stat-ic">${c("heart")}</span><div><div class="stat-val">${g(m.wishlist.length)}</div><div class="stat-lbl">${a("acc.wishlist")}</div></div></div>
      <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${g(((o=m.me)==null?void 0:o.points)||0)}</div><div class="stat-lbl">${a("common.points")}</div></div></div>
    </div>
    ${(()=>{var u;let d=((u=m.me)==null?void 0:u.badges)||[],b=d.filter(v=>v.got).length;return d.length?r`<div class="card mb">
        <div class="row row-between"><strong>${c("award")} ${a("acc.badges")}</strong><span class="muted tiny">${g(b)} / ${g(d.length)}</span></div>
        <div class="badges-grid mt-s">
          ${d.map(v=>r`
            <div class="badge-item ${v.got?"got":""}" title="${a(`badge.${v.id}.d`)}">
              <span class="bi-ic">${c(v.got?"award":"lock")}</span>
              <b>${a(`badge.${v.id}`)}</b>
              <span class="tiny muted">${v.got?a("badge.got"):v.progress!==void 0?`${g(v.progress)}\xD7`:a("badge.locked")}</span>
            </div>`)}
        </div>
      </div>`:""})()}
    ${Zt()?r`<div class="notice notice-success mb">${c("sparkles")}<span>${a("acc.plusActive",{date:O((l=(i=m.me)==null?void 0:i.plus)==null?void 0:l.until,{time:!1})})}</span></div>`:B("plus")?r`<div class="notice notice-info mb">${c("sparkles")}<span>${a("acc.plusInactive")} — <a class="section-link" href="#/account/plus">${a("acc.plusSubscribe")}</a></span></div>`:""}
    ${t.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${a("acc.orders")}</h2></div><a class="section-link" href="#/account/orders">${a("common.showAll")}</a></div>
      ${gr(e)}`:L({icon:"cart",title:a("acc.noOrders"),text:a("acc.noOrdersText"),action:{href:"#/products",label:a("cart.goShopping")}})}
    ${(p=m.me)!=null&&p.referralCode&&B("referrals")?r`
      <div class="card mt">
        <strong>${c("gift")} ${a("acc.referralCode")}</strong>
        <div class="row mt-s">
          <code class="tag mono b" data-h="34px">${m.me.referralCode}</code>
          <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${m.me.referralCode}">${c("copy")} ${a("common.copy")}</button>
        </div>
        <p class="hint mt-s">${a("acc.referralText")}</p>
      </div>`:""}`}function gr(t){return lt([{label:a("acc.orderCode")},{label:a("acc.orderDate")},{label:a("common.status")},{label:a("acc.orderTotal"),cls:"num"},{label:a("common.actions"),cls:"num"}],t.map(e=>r`
      <tr>
        <td class="mono b">${e.code}</td>
        <td class="nowrap">${O(e.createdAt,{time:!1})}</td>
        <td>${$e(e.status)}</td>
        <td class="num">${A(e.total)}</td>
        <td><div class="act"><a class="btn btn-ghost btn-xs" href="#/account/orders/${e.id}">${a("common.view")}</a></div></td>
      </tr>`))}async function hl(){let t=[];try{t=(await f.get("/api/me/orders")).items||[]}catch(e){}return t.length?gr(t):L({icon:"package-check",title:a("acc.noOrders"),text:a("acc.noOrdersText"),action:{href:"#/products",label:a("cart.goShopping")}})}async function gl(){if(!m.wishlist.length)return L({icon:"heart",title:a("acc.wishlistEmpty"),text:a("acc.wishlistEmptyText"),action:{href:"#/products",label:a("cart.goShopping")}});let t=await f.get("/api/products?limit=96").catch(()=>null),e=m.wishlist.map(s=>{var n;return(n=t==null?void 0:t.items)==null?void 0:n.find(o=>o.id===s)}).filter(Boolean);return jt(e)}async function fl(){if(!B("wallet"))return L({icon:"wallet",title:a("err.notFound")});let t={balance:0,transactions:[]};try{t=await f.get("/api/me/wallet")}catch(e){}return r`
    <div class="card mb">
      <div class="row row-between row-wrap">
        <div><div class="muted small">${a("common.balance")}</div><div class="buy-now">${A(t.balance)}</div></div>
        <button class="btn btn-primary" data-act="wallet-deposit">${c("plus")} ${a("acc.walletDeposit")}</button>
      </div>
      <p class="hint mt-s">${a("acc.walletNote")}</p>
    </div>
    ${lt([{label:a("common.date")},{label:a("common.type")},{label:a("common.amount"),cls:"num"},{label:a("common.note")}],(t.transactions||[]).map(e=>r`
        <tr>
          <td class="nowrap">${O(e.at)}</td>
          <td><span class="badge-pill ${e.amount>=0?"bp-success":"bp-warn"}">${a(`acc.tx.${e.type}`)||e.type}</span></td>
          <td class="num b">${e.amount>=0?"+":""}${g(e.amount)}</td>
          <td class="muted small">${h(e.note||"")} ${e.ref?r`<button class="link-btn mono" data-act="copy" data-text="${e.ref}">${e.ref}</button>`:""}</td>
        </tr>`),{emptyText:a("acc.walletEmpty")})}`}function vl(){var s,n;if(!B("plus"))return L({icon:"sparkles",title:a("err.notFound")});let t=xa(),e=Zt();return r`
    <div class="card mb t-center">
      <span class="pwa-ic center" data-h="60px" data-w="60px">${c("sparkles")}</span>
      <h2 class="mt-s">${e?a("acc.plusActive",{date:O((n=(s=m.me)==null?void 0:s.plus)==null?void 0:n.until,{time:!1})}):a("acc.plusInactive")}</h2>
      <p class="buy-price center"><span class="buy-now">${A(t.price)}</span><span class="buy-cur">/ ${g(t.durationDays)} ${a("common.day")}</span></p>
      <div class="row center row-wrap">
        <button class="btn btn-primary" data-act="plus-buy" data-method="wallet" ${B("wallet")?"":"hidden"}>${c("wallet")} ${a("acc.plusPayWallet")}</button>
        <button class="btn btn-ghost" data-act="plus-buy" data-method="gateway">${c("card")} ${a("acc.plusPayGateway")}</button>
      </div>
      <p class="hint mt-s">${a("checkout.gatewayDemo")}</p>
    </div>
    <div class="section-head"><div><h2 class="section-title">${c("gift")} ${a("acc.plusPerks")}</h2></div></div>
    <div class="pwa-grid">
      ${(t.perks||[]).map(o=>r`<div class="pwa-card"><span class="pwa-ic">${c("check")}</span><div>${q()?o.fa:o.en}</div></div>`)}
    </div>`}function yl(){var e;let t=((e=m.me)==null?void 0:e.addresses)||[];return r`
    <div class="row row-between mb">
      <strong>${a("acc.addresses")} (${g(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="addr-new">${c("plus")} ${a("acc.addAddress")}</button>
    </div>
    ${t.length?r`<div class="pwa-grid">${t.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <strong>${h(s.title||"")}</strong>
          ${s.isDefault?r`<span class="badge-pill bp-accent">${a("acc.addrDefault")}</span>`:""}
        </div>
        <p class="muted small mt-s">${h(s.receiver||"")} · ${at(s.phone||"")}<br>${h(s.street||"")}${s.city?`\u060C ${h(s.city)}`:""}${s.postal?`<br>${a("common.postal")}: ${h(s.postal)}`:""}</p>
        ${s.note?r`<p class="hint">${h(s.note)}</p>`:""}
        <div class="row mt-s">
          <button class="btn btn-ghost btn-xs" data-act="addr-edit" data-id="${s.id}">${c("edit")} ${a("common.edit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="addr-del" data-id="${s.id}">${c("trash")} ${a("common.delete")}</button>
          ${s.isDefault?"":r`<button class="btn btn-ghost btn-xs" data-act="addr-default" data-id="${s.id}">${c("check")} ${a("acc.addrDefault")}</button>`}
        </div>
      </div>`)}</div>`:L({icon:"pin",title:a("acc.noAddress")})}`}function fr(t=null){var e,s;return pt({title:t?a("acc.editAddress"):a("acc.addAddress"),body:r`
      <form data-act="addr-save2" class="form-grid" data-id="${(t==null?void 0:t.id)||""}">
        ${x({label:a("acc.addrTitle"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${x({label:a("acc.addrReceiver"),name:"receiver",required:!0,value:(t==null?void 0:t.receiver)||((e=m.me)==null?void 0:e.name)||""})}
        ${x({label:a("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:(t==null?void 0:t.phone)||((s=m.me)==null?void 0:s.phone)||""})}
        ${x({label:a("common.city"),name:"city",value:(t==null?void 0:t.city)||""})}
        ${x({label:a("common.postal"),name:"postal",value:(t==null?void 0:t.postal)||""})}
        ${x({label:a("acc.addrStreet"),name:"street",required:!0,span2:!0,value:(t==null?void 0:t.street)||""})}
        ${x({label:a("acc.addrNote"),name:"note",span2:!0,value:(t==null?void 0:t.note)||""})}
        <label class="check span-2"><input type="checkbox" name="isDefault" ${t!=null&&t.isDefault?"checked":""}><span class="box">${c("check")}</span><span>${a("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}async function $l(){await ye(!0);let t=m.notifications;return r`
    <div class="row row-between mb">
      <strong>${a("common.notifications")} (${g(t.length)})</strong>
      <button class="btn btn-ghost btn-sm" data-act="notif-read-all">${c("check")} ${a("acc.markAllRead")}</button>
    </div>
    ${t.length?r`<div class="col">${t.map(e=>r`
      <div class="card ${e.read?"":"notif-unread"}">
        <div class="row row-between">
          <strong class="row">${c(wl(e.type))} ${h(q()?e.title:e.titleEn||e.title)}</strong>
          <span class="muted tiny nowrap">${St(e.createdAt)}</span>
        </div>
        ${e.body?r`<p class="muted small mt-s">${h(q()?e.body:e.bodyEn||e.body)}</p>`:""}
        <div class="row mt-s">
          ${e.link?r`<a class="btn btn-ghost btn-xs" href="${e.link}">${a("common.view")}</a>`:""}
          ${e.read?"":r`<button class="btn btn-ghost btn-xs" data-act="notif-read" data-id="${e.id}">${a("notif.markRead")}</button>`}
          <button class="btn btn-ghost btn-xs" data-act="notif-del" data-id="${e.id}">${c("trash")}</button>
        </div>
      </div>`)}</div>`:L({icon:"bell",title:a("acc.notifEmpty")})}`}function wl(t){return{order:"package-check",restock:"box",ticket:"ticket",support:"headset",review:"star",plus:"sparkles",wallet:"wallet",account:"user",feedback:"flag",admin_alert:"alert",offer:"percent",welcome:"heart"}[t]||"bell"}async function kl(){let t=[];try{t=(await f.get("/api/tickets")).items||[]}catch(e){}return r`
    <div class="row row-between mb">
      <strong>${a("common.tickets")} (${g(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="ticket-new">${c("plus")} ${a("acc.ticketNew")}</button>
    </div>
    ${t.length?lt([{label:a("acc.orderCode")},{label:a("acc.ticketSubject")},{label:a("common.status")},{label:a("common.priority")},{label:a("common.date")},{label:""}],t.map(e=>r`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="nowrap">${h(e.subject)}</td>
          <td><span class="badge-pill ${e.status==="closed"?"bp-muted":e.status==="answered"?"bp-success":"bp-warn"}">${a(`tk.${e.status}`)}</span></td>
          <td>${a(`tp.${e.priority}`)}</td>
          <td class="nowrap">${O(e.createdAt,{time:!1})}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/account/tickets/${e.id}">${a("common.view")}${e.unread?r` <span class="badge-pill bp-danger">${g(e.messageCount)}</span>`:""}</a></td>
        </tr>`)):L({icon:"ticket",title:a("acc.noTickets")})}`}async function Sl(){if(!B("liveSupport"))return L({icon:"headset",title:a("err.notFound")});let t=[];try{t=await xs()}catch(e){}return hr(),r`
    <div class="card">
      <div class="row row-between mb-s">
        <strong>${c("headset")} ${a("acc.chatTitle")}</strong>
        <a class="btn btn-ghost btn-xs" href="#/account/tickets">${c("ticket")} ${a("acc.chatOpenTicket")}</a>
      </div>
      <div class="chat-b" data-thread-page data-h="340px">${Es(t)}</div>
      <form class="chat-f mt-s" data-act="chat-send">
        <input class="input" name="body" maxlength="1000" placeholder="${a("acc.chatPlaceholder")}" autocomplete="off">
        <button type="submit" class="btn btn-primary btn-icon" aria-label="${a("common.send")}">${c("send")}</button>
      </form>
    </div>`}async function On(){return(await f.get("/api/me/export")).data}async function xl(){let t=null;try{t=await On()}catch(s){}let e=(t==null?void 0:t.reviews)||[];return e.length?r`<div class="col">${e.map(s=>r`
    <div class="card">
      <div class="row row-between">
        <strong>${h(s.productName||s.productId)}</strong>
        <span class="badge-pill ${s.status==="approved"?"bp-success":s.status==="rejected"?"bp-danger":"bp-warn"}">${a(`common.${s.status==="approved"?"approved":s.status==="rejected"?"rejected":"pending"}`)}</span>
      </div>
      <div class="row row-wrap mt-s">${s.rating?Ht(s.rating):""}<span class="muted tiny">${O(s.createdAt,{time:!1})}</span><span class="badge-pill bp-muted">${s.type==="question"?a("common.question"):a("common.review")}</span></div>
      <div class="rev-title mt-s">${h(s.title)}</div>
      <div class="rev-body">${h(s.body)}</div>
      ${s.reply?r`<div class="rev-reply"><strong>${a("pdp.storeReply")}:</strong> ${h(s.reply)}</div>`:""}
    </div>`)}</div>`:L({icon:"star",title:a("acc.reviewEmpty")})}async function El(){let t=null;try{t=await On()}catch(s){}let e=(t==null?void 0:t.feedback)||[];return r`
    <div class="row row-between mb">
      <strong>${a("acc.feedback")}</strong>
      <button class="btn btn-primary btn-sm" data-act="feedback-new">${c("plus")} ${a("acc.feedbackNew")}</button>
    </div>
    ${e.length?r`<div class="col">${e.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <span class="badge-pill ${s.type==="bug"?"bp-danger":s.type==="complaint"?"bp-warn":"bp-info"}">${a(`ft.${s.type}`)}</span>
          <span class="badge-pill bp-muted">${a(`fs.${s.status}`)}</span>
        </div>
        <div class="rev-title mt-s">${h(s.title)}</div>
        <div class="rev-body">${h(s.body)}</div>
        ${s.response?r`<div class="rev-reply">${h(s.response)}</div>`:""}
        <div class="muted tiny mt-s">${O(s.createdAt)}</div>
      </div>`)}</div>`:L({icon:"flag",title:a("acc.noFeedback")})}`}function ql(){let t=m.me;return r`
    <form class="card form-grid" data-act="profile-save">
      ${x({label:a("common.fullName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
      ${x({label:"Name (EN)",name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
      ${x({label:a("common.username"),name:"username",value:(t==null?void 0:t.username)||"",attrs:"disabled"})}
      ${x({label:a("common.phone"),name:"phone",type:"tel",value:(t==null?void 0:t.phone)||""})}
      ${x({label:a("common.email"),name:"email",type:"email",value:(t==null?void 0:t.email)||""})}
      <div class="span-2 row">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
      </div>
    </form>`}async function Tl(){var s;let t=null,e=[];try{t=await f.get("/api/me/2fa")}catch(n){}try{e=(await f.get("/api/me/sessions")).items||[]}catch(n){}return r`
    <div class="card mb">
      <strong>${c("key")} ${a("acc.passwordChange")}</strong>
      <form class="form-grid mt-s" data-act="pass-change">
        ${x({label:a("acc.currentPassword"),name:"current",type:"password",required:!0,autocomplete:"current-password"})}
        ${x({label:a("acc.newPassword2"),name:"next",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
        ${x({label:a("common.passwordConfirm"),name:"confirm",type:"password",required:!0,autocomplete:"new-password"})}
        <div class="span-2"><button class="btn btn-primary" type="submit">${a("common.save")}</button></div>
      </form>
    </div>

    ${B("twoFactor")?r`
    <div class="card mb">
      <div class="row row-between">
        <strong>${c("shield")} ${a("acc.2faSection")}</strong>
        <span class="badge-pill ${t!=null&&t.enabled?"bp-success":"bp-muted"}">${t!=null&&t.enabled?a("acc.2faOn"):a("acc.2faOff")}</span>
      </div>
      <div class="mt-s" data-2fa-box>
        ${t!=null&&t.enabled?r`
          <p class="muted small">${a("acc.2faMethods")}: ${(t.methods||[]).map(n=>a(`auth.2fa${n==="totp"?"Totp":n==="sms"?"Sms":"Email"}`)).join("\u060C ")}</p>
          ${(s=t.backupCodes)!=null&&s.length?r`<details class="mt-s"><summary class="link-btn">${a("acc.2faBackup")}</summary><p class="hint">${a("acc.2faBackupHint")}</p><div class="row row-wrap">${t.backupCodes.map(n=>r`<code class="tag mono">${n}</code>`)}</div></details>`:""}
          <button class="btn btn-danger btn-sm mt" data-act="2fa-disable">${c("close")} ${a("acc.2faDisable")}</button>`:r`
          <p class="muted small">${a("acc.2faOff")}</p>
          <button class="btn btn-primary btn-sm mt-s" data-act="2fa-setup">${c("shield")} ${a("acc.2faEnable")}</button>`}
      </div>
    </div>`:""}

    <div class="card">
      <div class="row row-between">
        <strong>${c("users")} ${a("acc.sessions")}</strong>
        <button class="btn btn-ghost btn-sm" data-act="sessions-revoke">${c("logout")} ${a("acc.revokeAll")}</button>
      </div>
      <p class="muted small mt-s">${a("acc.sessionsText")}</p>
      ${lt([{label:a("acc.current")},{label:"IP"},{label:a("common.date")},{label:""}],e.map(n=>r`
          <tr>
            <td>${n.current?r`<span class="badge-pill bp-success">${a("acc.current")}</span>`:r`<span class="muted tiny">${h((n.ua||"").slice(0,40))}</span>`}</td>
            <td class="mono small">${h(n.ip||"")}</td>
            <td class="nowrap small">${O(n.lastSeenAt||n.createdAt)}</td>
            <td>${n.current?"":r`<button class="btn btn-ghost btn-xs" data-act="session-revoke" data-id="${n.id}">${c("trash")}</button>`}</td>
          </tr>`))}
    </div>`}async function Cl(){return window.qrcode||await new Promise((t,e)=>{let s=document.createElement("script");s.src="/js/vendor/qrcode-generator.js",s.onload=t,s.onerror=e,document.head.appendChild(s)}),window.qrcode}function Al(){var s;let t=m.prefs,e=((s=m.me)==null?void 0:s.notificationsPrefs)||{};return r`
    <div class="card mb">
      <strong>${c("settings")} ${a("acc.prefs")}</strong>
      <p class="muted small mt-s">${a("acc.prefsText")}</p>
      <div class="form-grid mt">
        ${j({label:a("acc.prefTheme"),name:"theme",value:t.theme,options:[{value:"dark",label:a("theme.dark")},{value:"light",label:a("theme.light")},{value:"auto",label:a("theme.auto")}]})}
        ${j({label:a("acc.prefLang"),name:"locale",value:t.locale,options:[{value:"fa",label:"\u0641\u0627\u0631\u0633\u06CC"},{value:"en",label:"English"}]})}
        ${j({label:a("acc.prefDensity"),name:"density",value:t.density,options:[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"comfy",label:"Comfy"}]})}
      </div>
      ${yt({label:a("acc.prefMotion"),desc:$t()==="fa"?"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0631\u0627\u062D\u062A\u06CC \u0686\u0634\u0645":"Turn animations off",name:"reduceMotion",checked:!!t.reduceMotion})}
    </div>
    <div class="card">
      <strong>${c("bell")} ${a("acc.prefNotif")}</strong>
      <form data-act="notif-prefs" class="mt-s">
        ${yt({label:a("acc.notifMarketing"),name:"marketing",checked:!!e.marketing})}
        ${yt({label:a("acc.notifOrders"),name:"orders",checked:e.orders!==!1})}
        ${yt({label:a("acc.notifRestock"),name:"restock",checked:e.restock!==!1})}
        ${yt({label:a("acc.notifSupport"),name:"support",checked:e.support!==!1})}
        <button class="btn btn-primary mt" type="submit">${a("common.save")}</button>
      </form>
    </div>`}function Dl(){return r`
    <div class="card mb">
      <strong>${c("download")} ${a("acc.exportData")}</strong>
      <p class="muted small mt-s">${a("acc.exportHint")}</p>
      <button class="btn btn-primary mt-s" data-act="data-export">${c("download")} ${a("common.download")}</button>
    </div>
    <div class="card">
      <strong class="danger-text">${c("alert")} ${a("acc.deleteAccount")}</strong>
      <p class="muted small mt-s">${a("acc.deleteWarn")}</p>
      <button class="btn btn-danger mt-s" data-act="data-delete">${c("trash")} ${a("acc.deleteAccount")}</button>
    </div>`}function Pl(t,e){return N(t),null}async function Ll(){let t=m.me.kycStatus==="approved",e=m.me.kycStatus==="pending",s=m.me.kycStatus==="rejected";return t?r`
      <div class="card box pad text-center">
        ${c("check-circle",{style:"color:var(--success);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">احراز هویت تأیید شده است</h3>
        <p class="text-muted">شما می‌توانید بدون محدودیت از تمامی خدمات و ثبت سفارش استفاده کنید.</p>
      </div>
    `:e?r`
      <div class="card box pad text-center">
        ${c("clock",{style:"color:var(--warning);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">در حال بررسی مدارک</h3>
        <p class="text-muted">مدارک شما دریافت شده و در صف بررسی توسط کارشناسان یاسایی الکترونیک قرار دارد. لطفاً شکیبا باشید.</p>
      </div>
    `:r`
    <div class="card box pad">
      <h3 class="mb-4">${c("shield-check")} تکمیل احراز هویت</h3>
      ${s?r`<div class="alert danger mb-4">مدارک قبلی شما به دلیل نقص یا ناخوانا بودن رد شد. لطفاً دوباره ارسال کنید. (${h(m.me.kycMessage||"")})</div>`:""}
      <p class="text-muted mb-4"><strong>توجه:</strong> حداکثر حجم مجاز برای هر فایل ۲ مگابایت است.<br>احراز هویت <strong>اجباری نیست</strong>، اما با تایید مدارک خود امکان استفاده از <strong>خرید اقساطی (اسنپ‌پی، ازکی‌وام)</strong>، شرکت در <strong>قرعه‌کشی‌ها</strong> و دریافت <strong>کدهای تخفیف ویژه</strong> برای شما فعال خواهد شد.</p>
      
      <div class="alert info mb-4">
        <strong>راهنمای بارگذاری مدارک:</strong>
        <ol class="mt-2 mb-0" style="padding-right: 20px;">
          <li>فرم تعهدنامه را <a href="/assets/docs/kyc-form.pdf" target="_blank" download style="font-weight:bold;text-decoration:underline;">دانلود کنید</a>، پرینت گرفته و امضا کنید (یا به صورت دیجیتال پر کنید).</li>
          <li>یک عکس واضح از کارت ملی یا شناسنامه خود بگیرید.</li>
          <li>یک عکس سلفی در حالی که کارت ملی و فرم تعهدنامه را در دست دارید بگیرید.</li>
        </ol>
      </div>

      <form class="stack grid gap-3" onsubmit="event.preventDefault(); window.submitKyc(event.target);">
        <div class="field">
          <label>عکس سلفی (همراه با کارت ملی و فرم)</label>
          <input type="file" name="selfie" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>عکس کارت ملی یا شناسنامه</label>
          <input type="file" name="idCard" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>فرم امضا شده تعهدنامه (PDF یا عکس)</label>
          <input type="file" name="formDoc" accept="image/*,.pdf" required class="input">
        </div>
        <button type="submit" class="btn primary mt-2">${c("upload")} ارسال مدارک</button>
      </form>
    </div>
  `}function Nl(){var s,n,o,i,l;let t=((s=m.me)==null?void 0:s.referralCode)||((o=(n=m.me)==null?void 0:n.id)==null?void 0:o.substring(0,6).toUpperCase()),e=window.location.origin+"#/auth?ref="+t;return r`
    <div class="card box pad">
      <h3 class="mb-4">${c("users")} دعوت از دوستان (Referral)</h3>
      <p class="text-muted mb-4">با دعوت از دوستان خود هم به آن‌ها هدیه بدهید و هم خودتان پاداش بگیرید!</p>
      
      <div class="grid gap-3 mb-4">
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">کد معرف شما:</div>
          <div class="row row-between">
            <h2 class="mono m-0">${t}</h2>
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${t}'); import('../ui.mjs').then(m => m.toastSuccess('کد کپی شد'))">${c("copy")} کپی کد</button>
          </div>
        </div>
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">لینک دعوت اختصاصی:</div>
          <div class="row row-between gap-2">
            <input readonly value="${e}" class="input flex-1" style="font-size: 0.85rem;" dir="ltr">
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${e}'); import('../ui.mjs').then(m => m.toastSuccess('لینک کپی شد'))">${c("copy")}</button>
          </div>
        </div>
      </div>
      
      <div class="stats-grid mb-4">
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--info)">${c("users")}</span>
          <div><div class="stat-val">${((i=m.me)==null?void 0:i.referralCount)||0}</div><div class="stat-lbl">دوستان دعوت‌شده</div></div>
        </div>
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--success)">${c("gift")}</span>
          <div><div class="stat-val">${(((l=m.me)==null?void 0:l.referralCount)||0)*10}</div><div class="stat-lbl">امتیاز دریافتی</div></div>
        </div>
      </div>
      
      <div class="alert info">
        <h4 class="mb-2">${c("info")} پاداش‌ها (به‌زودی بر اساس قوانین سایت):</h4>
        <ul class="mb-0" style="padding-right: 20px;">
          <li>دعوت از هر نفر (ثبت‌نام موفق): <strong>تخفیف روی سبد خرید بعدی یا ارسال رایگان</strong></li>
          <li>دعوت از بیش از ۱۰ نفر: <strong>دریافت جایزه ویژه وفاداری</strong></li>
        </ul>
      </div>
    </div>
  `}var ml,La,Ts,Cs,Ml,zn=V(()=>{U();G();Z();K();dt();tt();ut();nt();Fn();ml=[{id:"",icon:"home",label:()=>a("acc.dashboard")},{id:"orders",icon:"package-check",label:()=>a("acc.orders")},{id:"wishlist",icon:"heart",label:()=>a("acc.wishlist"),feat:"wishlist"},{id:"wallet",icon:"wallet",label:()=>a("acc.wallet"),feat:"wallet"},{id:"plus",icon:"sparkles",label:()=>a("acc.plus"),feat:"plus"},{id:"addresses",icon:"pin",label:()=>a("acc.addresses")},{id:"notifications",icon:"bell",label:()=>a("acc.notifications")},{id:"tickets",icon:"ticket",label:()=>a("acc.tickets"),feat:"tickets"},{id:"support",icon:"headset",label:()=>a("acc.support"),feat:"liveSupport"},{id:"reviews",icon:"star",label:()=>a("acc.reviews")},{id:"feedback",icon:"flag",label:()=>a("acc.feedback")},{id:"referrals",icon:"users",label:()=>"\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"},{id:"profile",icon:"user",label:()=>a("acc.profile")},{id:"kyc",icon:"shield-check",label:()=>"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (KYC)"},{id:"security",icon:"shield",label:()=>a("acc.security")},{id:"prefs",icon:"settings",label:()=>a("acc.prefs")},{id:"data",icon:"download",label:()=>a("acc.data")}];y("wallet-deposit",()=>{let t=pt({title:a("acc.walletDeposit"),size:"sm",body:r`
      <form data-act="wallet-deposit-do">
        <p class="notice notice-warn mb">${c("info")}<span>${a("checkout.gatewayDemo")}</span></p>
        ${x({label:a("acc.walletAmount"),name:"amount",type:"number",required:!0,value:"100000",attrs:'min="10000" step="10000"'})}
        <div class="row row-wrap mb">
          ${[1e5,2e5,5e5,1e6].map(e=>r`<button type="button" class="chip" data-amt="${e}">${g(e)}</button>`)}
        </div>
        <button class="btn btn-primary btn-block" type="submit">${c("card")} ${a("common.deposit")}</button>
      </form>`,onMount:(e,s)=>{e.querySelectorAll("[data-amt]").forEach(n=>n.addEventListener("click",()=>{e.querySelector("[name=amount]").value=n.dataset.amt}))}})});y("wallet-deposit-do",async(t,e)=>{t.preventDefault();let s=Number(new FormData(e).get("amount")||0);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/me/wallet/deposit",{amount:s}),await te(),E(a("acc.walletDeposited")),T(!0)}catch(n){S(n)}})});y("plus-buy",async(t,e)=>{await D(e,async()=>{try{await f.post("/api/me/plus/subscribe",{method:e.dataset.method}),await te(),E(a("acc.plusSubscribed")),T(!0)}catch(s){S(s)}})});La=null;y("addr-new",()=>{La=fr(null)});y("addr-edit",(t,e)=>{var n;let s=(((n=m.me)==null?void 0:n.addresses)||[]).find(o=>o.id===e.dataset.id);s&&(La=fr(s))});y("addr-del",async(t,e)=>{if(await Gt())try{let n=await f.del(`/api/me/addresses/${e.dataset.id}`);m.me&&(m.me.addresses=n.addresses),E(a("acc.addrDeleted")),T(!0)}catch(n){S(n)}});y("addr-default",async(t,e)=>{var n;let s=(((n=m.me)==null?void 0:n.addresses)||[]).find(o=>o.id===e.dataset.id);try{let o=await f.patch(`/api/me/addresses/${e.dataset.id}`,zt(mt({},s),{isDefault:!0}));m.me&&(m.me.addresses=o.addresses),E(a("acc.addrSaved")),T(!0)}catch(o){S(o)}});y("addr-save2",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";let o=e.dataset.id;try{let i=o?await f.patch(`/api/me/addresses/${o}`,n):await f.post("/api/me/addresses",n);m.me&&(m.me.addresses=i.addresses),E(a("acc.addrSaved")),La==null||La.close(),T(!0)}catch(i){S(i)}});y("notif-read-all",async()=>{await cs([],!0),T(!0)});y("notif-read",async(t,e)=>{await cs([e.dataset.id]),T(!0)});y("notif-del",async(t,e)=>{await bn(e.dataset.id),T(!0)});Ts=null;y("ticket-new",()=>{let t=m.ticketCategories||[],e=m.ticketPriorities||[];Ts=pt({title:a("acc.ticketNew"),body:r`
      <form data-act="ticket-create">
        ${x({label:a("acc.ticketSubject"),name:"subject",required:!0})}
        <div class="form-grid">
          ${j({label:a("acc.ticketCategory"),name:"category",required:!0,options:t.map(s=>({value:s.id||s,label:a(`tc.${s.id||s}`)}))})}
          ${j({label:a("acc.ticketPriority"),name:"priority",options:e.map(s=>({value:s.id||s,label:a(`tp.${s.id||s}`)})),value:"normal"})}
        </div>
        ${J({label:a("acc.ticketBody"),name:"body",required:!0,rows:5})}
        <div class="mb">${Ue({label:r`${a("acc.ticketRules")} <a class="section-link" href="#/pages/ticketRules">${a("acc.ticketViewRules")}</a>`,name:"rules",required:!0})}</div>
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("ticket-create",async(t,e)=>{t.preventDefault();let s=new FormData(e);if(s.get("rules")!=="on"){Y(a("form.rulesRequired"));return}await D(e.querySelector("button[type=submit]"),async()=>{var n,o;try{let i=await f.post("/api/tickets",{subject:s.get("subject"),category:s.get("category"),priority:s.get("priority"),body:s.get("body"),rulesAccepted:!0});E(a("acc.ticketCreated",{code:((n=i.ticket)==null?void 0:n.code)||""})),Ts==null||Ts.close(),bt(`#/account/tickets/${((o=i.ticket)==null?void 0:o.id)||""}`)}catch(i){S(i)}})});Cs=null;y("feedback-new",()=>{var t,e;Cs=pt({title:a("acc.feedbackNew"),body:r`
      <form data-act="feedback-send">
        ${j({label:a("acc.feedbackType"),name:"type",options:["suggestion","complaint","bug"].map(s=>({value:s,label:a(`ft.${s}`)})),value:"suggestion"})}
        ${x({label:a("common.title"),name:"title",required:!0})}
        ${J({label:a("common.body"),name:"body",required:!0,rows:5})}
        ${x({label:a("acc.feedbackContact"),name:"contact",hint:a("acc.feedbackContactHint"),value:((t=m.me)==null?void 0:t.phone)||((e=m.me)==null?void 0:e.email)||""})}
        ${m.me?"":De()}
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("feedback-send",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/feedback",{type:s.get("type"),title:s.get("title"),body:s.get("body"),contact:s.get("contact")||"",captchaToken:s.get("captchaToken")||void 0}),E(a("acc.feedbackSent")),Cs==null||Cs.close(),T(!0)}catch(n){if((n==null?void 0:n.code)==="captcha_required"){let o=e.querySelector("[data-captcha]");o&&(o.hidden=!1)}S(n)}})});y("profile-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{let n=await f.patch("/api/me",{name:s.get("name"),nameEn:s.get("nameEn"),phone:s.get("phone"),email:s.get("email")});m.me=n.me,E(a("acc.profileSaved")),T(!0)}catch(n){S(n)}})});y("pass-change",async(t,e)=>{t.preventDefault();let s=new FormData(e);if(s.get("next")!==s.get("confirm")){Y($t()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),E(a("acc.passwordChanged")),e.reset()}catch(n){S(n)}})});y("2fa-setup",async()=>{try{let t=await f.get("/api/me/2fa");pt({title:a("acc.2faEnable"),body:r`
        <div data-2fa-setup>
          <p class="muted small">${a("acc.2faScan")}</p>
          <div class="center mt-s" data-qr></div>
          <p class="hint t-center mono" data-key>${t.secret||""}</p>
          <div class="btn-group mt-s" data-methods>
            <button type="button" class="btn active" data-mm="totp">${a("auth.2faTotp")}</button>
            <button type="button" class="btn" data-mm="sms" ${t.hasPhone?"":"disabled"}>${a("auth.2faSms")}</button>
            <button type="button" class="btn" data-mm="email" ${t.hasEmail?"":"disabled"}>${a("auth.2faEmail")}</button>
          </div>
          <form data-act="2fa-enable" class="mt">
            ${x({label:a("acc.2faEnterCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${a("common.confirm")}</button>
          </form>
        </div>`,onMount:async e=>{try{let n=(await Cl())(0,"M");n.addData(t.otpauth),n.make();let o=e.querySelector("[data-qr]"),i=n.createSvgTag({cellSize:4,margin:2});o.innerHTML=i;let l=o.querySelector("svg");l&&(l.setAttribute("width","180"),l.setAttribute("height","180"),l.classList.add("qr-img"))}catch(s){e.querySelector("[data-qr]").innerHTML=r`<code class="tag mono">${t.otpauth}</code>`}e.querySelector("[data-methods]").addEventListener("click",s=>{let n=s.target.closest("[data-mm]");n&&(e.querySelectorAll("[data-mm]").forEach(o=>o.classList.toggle("active",o===n)),e.querySelector("[name=code]").closest(".field").hidden=n.dataset.mm!=="totp")})}})}catch(t){S(t)}});y("2fa-enable",async(t,e)=>{var o;let s=((o=e.closest("[data-2fa-setup]").querySelector("[data-mm].active"))==null?void 0:o.dataset.mm)||"totp",n=new FormData(e).get("code")||"";await D(e.querySelector("button[type=submit]"),async()=>{var i;try{let l=await f.post("/api/me/2fa/enable",{method:s,code:n});await te(),E(a("acc.2faEnabled")),(i=l.backupCodes)!=null&&i.length&&pt({title:a("acc.2faBackup"),size:"sm",body:r`<p class="hint">${a("acc.2faBackupHint")}</p><div class="row row-wrap mt-s">${l.backupCodes.map(p=>r`<code class="tag mono b">${p}</code>`)}</div>`}),T(!0)}catch(l){S(l)}})});y("2fa-disable",async()=>{let t=await de({title:a("acc.2faDisable"),label:a("common.password"),type:"password",required:!0});if(t!==null)try{await f.post("/api/me/2fa/disable",{password:t}),await te(),E(a("acc.2faDisabled")),T(!0)}catch(e){S(e)}});y("sessions-revoke",async()=>{if(await wt({text:a("acc.revokeAll"),danger:!0}))try{await f.post("/api/me/sessions/revoke",{allOthers:!0}),E(a("acc.revokeDone")),T(!0)}catch(e){S(e)}});y("session-revoke",async(t,e)=>{try{await f.post("/api/me/sessions/revoke",{id:e.dataset.id}),E(a("acc.revokeDone")),T(!0)}catch(s){S(s)}});y("notif-prefs",async(t,e)=>{t.preventDefault();let s=new FormData(e);try{let n=await f.patch("/api/me",{notificationsPrefs:{marketing:s.get("marketing")==="on",orders:s.get("orders")==="on",restock:s.get("restock")==="on",support:s.get("support")==="on"}});m.me=n.me,E(a("misc.saved"))}catch(n){S(n)}});y("data-export",async(t,e)=>{await D(e,async()=>{try{let s=await On(),n=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`bander-mobile-data-${new Date().toISOString().slice(0,10)}.json`,i.click(),setTimeout(()=>URL.revokeObjectURL(o),4e3),E(a("common.download"))}catch(s){S(s)}})});y("data-delete",async()=>{if(!await wt({title:a("acc.deleteAccount"),text:a("acc.deleteWarn"),danger:!0,okText:a("common.delete")}))return;let e=await de({title:a("acc.deleteConfirm"),label:a("common.password"),type:"password",required:!0});if(e!==null)try{await f.post("/api/me/delete",{password:e}),m.me=null,bt("#/"),T()}catch(s){S(s)}});Ml=t=>a("acc.title")});var vr={};X(vr,{mount:()=>Bl,render:()=>Rl});async function Rl(t){var i,l,p,d,b,u,v,w,$;let e=t.params.id,s=null;try{s=await f.get(`/api/me/orders/${e}`)}catch(k){return(k==null?void 0:k.status)===404?L({icon:"package-check",title:a("acc.noOrders"),action:{href:"#/account/orders",label:a("acc.orders")}}):_({title:a("err.generic")})}let n=s.order,o=new Set(s.canReviewIds||[]);return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${a("acc.title")}</a> <span>/</span>
      <a href="#/account/orders">${a("acc.orders")}</a> <span>/</span>
      <span class="mono">${n.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <div class="row row-wrap"><h1 class="buy-title">${c("package-check")} ${n.code}</h1>${$e(n.status)}</div>
              <p class="muted small mt-s">${O(n.createdAt)} · ${h(((i=n.statusInfo)==null?void 0:i.fa)||((l=n.statusInfo)==null?void 0:l.label)||"")}</p>
            </div>
            <div class="row row-wrap">
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${n.id}">${c("printer")} ${a("acc.printInvoice")}</button>
              ${((p=n.payment)==null?void 0:p.status)==="unpaid"?r`<a class="btn btn-primary btn-sm" href="#/pay/${n.id}">${c("card")} ${a("common.payable")} ${A(n.payable)}</a>`:""}
              ${["pending_review","pending_payment","confirmed","preparing"].includes(n.status)?r`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${n.id}">${c("close")} ${a("acc.cancelOrder")}</button>`:""}
            ${n.tracking?r`<span class="row gap-s"><span class="badge-pill bp-info mono">${c("truck")} ${h(n.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${h(n.tracking)}">${c("copy")} ${a("common.copy")}</button></span>`:""}
            </div>
          </div>
          ${(d=n.statusInfo)!=null&&d.fa&&q()===!1&&((b=n.statusInfo)!=null&&b.en)?r`<p class="muted small">${h(n.statusInfo.en)}</p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${a("acc.timeline")}</strong>
          ${ta(n)}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${a("acc.orderItems")} (${g(((u=n.items)==null?void 0:u.length)||0)})</strong>
          ${lt([{label:""},{label:a("common.product")},{label:a("common.price"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.total"),cls:"num"},{label:""}],(n.items||[]).map(k=>r`
              <tr>
                <td><span class="cl-img" data-h="52px" data-w="52px">${k.image?r`<img src="${k.image}" alt="${h(q()?k.name:k.nameEn||k.name)}" loading="lazy">`:c("box")}</span></td>
                <td>
                  <a class="b" href="#/product/${k.productId}">${h(q()?k.name:k.nameEn||k.name)}</a>
                  ${k.brand?r`<div class="tiny muted">${h(k.brand)}</div>`:""}
                  ${k.sku?r`<div class="tiny muted mono">SKU ${h(k.sku)}</div>`:""}
                </td>
                <td class="num">${A(k.price)}</td>
                <td class="num">${g(k.qty)}</td>
                <td class="num b">${A(k.price*k.qty)}</td>
                <td>${o.has(k.productId)?r`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${k.productId}" data-name="${h(q()?k.name:k.nameEn||k.name)}">${c("star")} ${a("pdp.writeReview")}</button>`:""}</td>
              </tr>`))}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${n.id}">${c("cart")} ${a("acc.reorder")}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${a("acc.chatOpenTicket")}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${a("cart.summary")}</strong>
          <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(n.subtotal)}</span></div>
          ${n.plusDiscount>0?r`<div class="sum-row discount"><span>${a("acc.plus")}</span><span class="v">−${A(n.plusDiscount)}</span></div>`:""}
          ${n.couponDiscount>0?r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${n.couponCode}</span><span class="v">−${A(n.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.shipping")}${n.shippingLabel?r` <span class="muted tiny">(${h(n.shippingLabel)})</span>`:""}</span><span class="v">${n.shipping===0?a("common.free"):A(n.shipping)}</span></div>
          ${n.insured?r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${n.insuranceFee===0?a("common.free"):A(n.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.total")}</span><span class="v">${A(n.total)}</span></div>
          ${n.walletUsed>0?r`<div class="sum-row discount"><span>${a("common.wallet")}</span><span class="v">−${A(n.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(n.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${a("common.payment")}</span>
            ${ze(n.payment)}
          </div>
          ${(v=n.payment)!=null&&v.ref?r`<p class="hint mono mt-s">${h(n.payment.ref)}</p>`:""}
          ${n.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${A(n.refund.amount)} ${a("acc.tx.refund")} — ${O(n.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${a(n.delivery==="pickup"?"checkout.pickup":"checkout.courier")}</strong>
          ${n.delivery==="pickup"?r`
            <p class="muted small mt-s">${a("checkout.pickupDesc")}</p>
            <p class="mt-s small">${h((($=(w=m.settings)==null?void 0:w.store)==null?void 0:$.address)||"")}</p>`:r`
            ${n.address?r`
              <p class="small mt-s"><strong>${h(n.address.receiver||"")}</strong> · ${at(n.address.phone||"")}</p>
              <p class="muted small">${h(n.address.street||"")}${n.address.city?`\u060C ${h(n.address.city)}`:""}</p>
              ${n.address.postal?r`<p class="muted small">${a("common.postal")}: ${h(n.address.postal)}</p>`:""}`:r`<p class="muted small mt-s">${a("acc.noAddress")}</p>`}
            ${n.zone?r`<p class="small mt-s">${a("checkout.zone")}: ${h(Il(n.zone))}</p>`:""}`}
          ${n.express?r`<p class="small mt-s"><span class="badge-pill bp-accent">${c("zap")} ${a("checkout.express")}</span></p>`:""}
          ${n.insured?r`<p class="small mt-s"><span class="badge-pill bp-success">${c("shield")} ${a("common.insurance")} ${A(n.insuranceFee)}</span></p>`:""}
          ${n.note?r`<p class="hint mt-s">${c("edit")} ${h(n.note)}</p>`:""}
          ${n.couponCode?r`<p class="hint mt-s">${c("percent")} ${n.couponCode}</p>`:""}
        </div>
      </aside>
    </div>`}function Bl(t,e){return N(t),null}var Il,yr=V(()=>{U();G();Z();K();dt();tt();ut();nt();K();Il=t=>{let e=(ve().zones||[]).find(s=>s.id===t);return e?q()?e.name:e.nameEn||e.name:t||""};y("od-cancel",async(t,e)=>{let s=await de({title:a("acc.cancelOrder"),text:a("acc.cancelReason"),label:a("acc.cancelReason"),rows:3,okText:a("acc.cancelOrder")});if(s!==null)try{await f.post(`/api/me/orders/${e.dataset.id}/cancel`,{reason:s||""}),E(a("acc.orderCancelled")),T(!0)}catch(n){S(n)}});y("od-reorder",async(t,e)=>{await D(e,async()=>{try{let{order:s}=await f.get(`/api/me/orders/${e.dataset.id}`),n=0;for(let o of s.items||[])try{await f.post("/api/cart/add",{productId:o.productId,qty:o.qty||1}),n+=1}catch(i){}if(await Mt(),!n){S({code:"out_of_stock",message:q()?"\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645 \u0627\u0632 \u0627\u0642\u0644\u0627\u0645 \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u0646\u06CC\u0633\u062A.":"None of the items are in stock."});return}E(a("card.added")),bt("#/cart")}catch(s){S(s)}})});y("od-invoice",async(t,e)=>{var o,i,l,p;let{order:s}=await f.get(`/api/me/orders/${e.dataset.id}`),n=((o=m.settings)==null?void 0:o.store)||{};pt({title:a("acc.invoice"),body:r`
      <div class="invoice-print" dir="rtl">
        <div class="inv-head">
          <div>
            <strong>${h(n.name||"Yassaei Electronics")}</strong>
            <div class="tiny">${h(n.address||"")}</div>
            <div class="tiny">${at(n.phone||"")}</div>
          </div>
          <div class="t-center">
            <div class="inv-code mono">${s.code}</div>
            <div class="tiny">${O(s.createdAt)}</div>
          </div>
        </div>
        <table class="inv-table">
          <thead><tr><th>#</th><th>کالا</th><th>تعداد</th><th>فی</th><th>مبلغ</th></tr></thead>
          <tbody>
            ${(s.items||[]).map((d,b)=>r`<tr>
              <td>${g(b+1)}</td><td>${h(d.name)}${d.sku?` <span class="mono tiny">(${d.sku})</span>`:""}</td>
              <td>${g(d.qty)}</td><td>${g(d.price)}</td><td>${g(d.price*d.qty)}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="inv-sum">
          <div><span>جمع کالاها</span><span>${g(s.subtotal)}</span></div>
          ${s.discount?r`<div><span>تخفیف</span><span>- ${g(s.discount)}</span></div>`:""}
          <div><span>هزینهٔ ارسال${s.shippingLabel?` (${s.shippingLabel})`:""}</span><span>${g(s.shipping)}</span></div>
          ${s.insuranceFee?r`<div><span>بیمهٔ ارسال</span><span>${g(s.insuranceFee)}</span></div>`:""}
          <div class="b"><span>مبلغ کل</span><span>${g(s.total)}</span></div>
          ${s.walletUsed?r`<div><span>پرداخت از کیف پول</span><span>- ${g(s.walletUsed)}</span></div>`:""}
          <div class="b"><span>قابل پرداخت</span><span>${g(s.payable)}</span></div>
        </div>
        <div class="inv-foot tiny">
          <div>وضعیت پرداخت: ${((i=s.payment)==null?void 0:i.status)==="paid"?"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647":((l=s.payment)==null?void 0:l.status)==="pending"?"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647"} — روش: ${((p=s.payment)==null?void 0:p.method)||"\u2014"}</div>
          <div>${h(n.name||"")} · این فاکتور به‌صورت خودکار توسط سامانه صادر شده است.</div>
        </div>
      </div>
      <div class="row mt">
        <button class="btn btn-primary" data-act="print-page">${c("printer")} ${a("common.print")}</button>
      </div>`})});y("od-review",(t,e)=>{let s=e.dataset.id,n=e.dataset.name||"",o=pt({title:`${a("pdp.writeReview")} \u2014 ${n}`,body:r`
      <form data-act="od-review-send" data-id="${s}">
        <div class="field"><span class="label">${a("pdp.yourRating")}</span>${hs({name:"rating",value:5})}</div>
        ${x({label:a("common.title"),name:"title",required:!0})}
        ${J({label:a("common.body"),name:"body",required:!0,rows:5})}
        <p class="hint mb">${a("pdp.reviewPending")}</p>
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("od-review-send",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{var n;try{await f.post("/api/reviews",{productId:e.dataset.id,type:"review",rating:Number(s.get("rating")||5),title:s.get("title"),body:s.get("body")}),E(a("pdp.reviewSubmitted")),(n=e.closest(".overlay"))==null||n.remove()}catch(o){S(o)}})})});var wr={};X(wr,{mount:()=>jl,render:()=>Ol});async function Ol(t){var o,i;let e=null;try{e=(await f.get(`/api/tickets/${t.params.id}`)).ticket}catch(l){return(l==null?void 0:l.status)===404?L({icon:"ticket",title:a("acc.noTickets"),action:{href:"#/account/tickets",label:a("acc.tickets")}}):_({title:a("err.generic")})}We=[];let s=((o=(m.ticketPriorities||[]).find(l=>l.id===e.priority))==null?void 0:o.slaHours)||24,n=e.status==="closed";return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${a("acc.title")}</a> <span>/</span>
      <a href="#/account/tickets">${a("acc.tickets")}</a> <span>/</span>
      <span class="mono">${e.code}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h1 class="buy-title">${c("ticket")} ${h(e.subject)}</h1>
          <p class="muted small mt-s">
            <span class="mono">${e.code}</span> · ${O(e.createdAt)} ·
            ${a("acc.ticketCategory")}: ${a(`tc.${e.category}`)}
          </p>
        </div>
        <div class="row row-wrap">
          <span class="badge-pill ${Hl[e.status]||"bp-muted"}">${a(`tk.${e.status}`)}</span>
          <span class="badge-pill ${Fl[e.priority]||"bp-info"}">${a(`tp.${e.priority}`)}</span>
          ${n?"":r`<button class="btn btn-ghost btn-sm" data-act="tk-close" data-id="${e.id}">${c("check")} ${a("acc.ticketClose")}</button>`}
        </div>
      </div>
      <p class="notice notice-info mt-s">${c("clock")}<span>${a("acc.ticketSla",{h:g(s)})}</span></p>
    </div>

    <div class="card mt">
      <strong>${c("chat")} ${a("common.messages")} (${g(((i=e.messages)==null?void 0:i.length)||0)})</strong>
      <div class="tk-thread mt-s" data-tk-thread>
        ${(e.messages||[]).map($r).join("")}
      </div>

      ${n?r`<p class="notice notice-warn mt">${c("info")}<span>${a("acc.ticketClosedNote")}</span></p>`:""}
      <form class="mt" data-act="tk-reply" data-id="${e.id}">
        ${J({label:a("acc.ticketWrite"),name:"body",required:!0,rows:4,placeholder:a("acc.chatPlaceholder")})}
        <div data-attach-preview class="row row-wrap mt-s"></div>
        <div class="row row-between row-wrap mt-s">
          <div class="row row-wrap">
            <label class="btn btn-ghost btn-sm" for="tk-file">${c("upload")} ${a("common.attach")}</label>
            <input id="tk-file" type="file" accept="image/*" multiple hidden data-attach-input>
            <span class="hint">${a("acc.attachHint")}</span>
          </div>
          <button class="btn btn-primary" type="submit">${c("send")} ${a("common.send")}</button>
        </div>
      </form>
    </div>`}function $r(t){var n;let e=t.from==="user",s=t.from==="system"?"them sys":e?"me":"them";return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(e?((n=m.me)==null?void 0:n.name)||a("common.user"):t.from==="staff"?a("common.support"):t.name||"")}</strong>
          <span class="tiny muted nowrap">${St(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${o}" alt="${a("common.image")}" loading="lazy" data-act="tk-att-open" data-url="${o}">`)}</div>`:""}
      </div>
    </div>`}function Un(t){let e=t.querySelector("[data-attach-preview]");e&&(e.innerHTML=We.map((s,n)=>r`
    <span class="att-chip">
      <img src="${s.url}" alt="${h(s.name)}">
      <button type="button" class="att-x" data-act="tk-att-del" data-i="${n}" aria-label="${a("common.delete")}">${c("close")}</button>
    </span>`).join(""))}function jl(t,e){N(t);let s=t.querySelector("[data-attach-input]");s&&s.addEventListener("change",o=>{let i=ks("tk-attach-pick");i==null||i(o,o.target)});let n=t.querySelector("[data-tk-thread]");return n&&(n.scrollTop=n.scrollHeight),null}var Hl,Fl,We,kr=V(()=>{U();G();Z();K();dt();tt();ut();nt();Hl={open:"bp-warn",answered:"bp-success",closed:"bp-muted",in_progress:"bp-info",new:"bp-info"},Fl={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},We=[];y("tk-att-open",(t,e)=>{let n=[...document.querySelectorAll("[data-tk-thread] .tk-att")].map(o=>o.getAttribute("src"));He(n.length?n:[e.getAttribute("src")],Math.max(0,n.indexOf(e.getAttribute("src"))))});y("tk-attach-pick",async(t,e)=>{let s=e.closest("form"),n=[...e.files||[]].slice(0,4-We.length);e.value="";for(let o of n){if(o.size>4*1024*1024){Y(a("err.tooLarge"));continue}try{let i=await Ie(o),l=await f.upload(i);We.push({url:l.url,name:o.name})}catch(i){S(i)}}Un(s)});y("tk-att-del",(t,e)=>{We.splice(Number(e.dataset.i),1),Un(e.closest("form"))});y("tk-reply",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("body")||"").trim();if(s.length<2){Y(a("acc.ticketBodyShort"));return}let n=e.querySelector("button[type=submit]");await D(n,async()=>{var o;try{let i=await f.post(`/api/tickets/${e.dataset.id}/messages`,{body:s,attachments:We.map(p=>p.url)});We=[];let l=e.closest(".card").querySelector("[data-tk-thread]");l&&(l.innerHTML=(((o=i.ticket)==null?void 0:o.messages)||[]).map($r).join(""),l.scrollTop=l.scrollHeight),e.reset(),Un(e),E(a("common.sent")),ye(!0)}catch(i){S(i)}})});y("tk-close",async(t,e)=>{await wt({text:a("acc.ticketCloseConfirm"),okText:a("acc.ticketClose")})&&await D(e,async()=>{try{await f.post(`/api/tickets/${e.dataset.id}/close`,{}),E(a("common.done")),T(!0)}catch(n){S(n)}})})});var Sr={};X(Sr,{render:()=>zl});async function zl(){let t=null;try{t=await f.get("/api/stats/public")}catch(l){}if(!t)return r`<div class="empty"><h4>${a("err.network")}</h4></div>`;let e=t.stats||{},s=t.chart||[],n=t.topProducts||[],o=Math.max(1,...s.map(l=>l.visits)),i=s.map(l=>{let p=Math.min(12,Math.max(1,Math.round(l.visits/o*12)));return r`<div class="ch-col" title="${l.date}: ${oe(l.visits)}">
      <i class="hb-${p}"></i>
      <span>${oe(Number(l.date.slice(8,10)))}</span>
    </div>`}).join("");return r`
    <div class="page-head">
      <h1 class="page-h1">${c("chart")} ${a("stats.title")}</h1>
      <p class="muted small">${a("stats.subtitle")}</p>
    </div>

    <section class="section">
      <div class="stats-grid">
        ${Ct({icon:"box",label:a("stats.products"),value:g(e.products)})}
        ${Ct({icon:"grid",label:a("stats.categories"),value:g(e.categories)})}
        ${Ct({icon:"cart",label:a("stats.ordersTotal"),value:g(e.ordersTotal)})}
        ${Ct({icon:"package-check",label:a("stats.delivered"),value:g(e.deliveredOrders)})}
        ${Ct({icon:"users",label:a("stats.customers"),value:g(e.customers)})}
        ${Ct({icon:"eye",label:a("stats.visitsTotal"),value:g(e.visitsTotal)})}
        ${Ct({icon:"chart",label:a("stats.visitsToday"),value:g(e.visitsToday)})}
        ${Ct({icon:"sparkles",label:a("stats.plusMembers"),value:g(e.plusMembers)})}
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"chart",title:a("stats.chartTitle")})}
      <div class="card chart-card">
        <div class="chart">${i}</div>
        <p class="hint mt-s">${a("stats.chartHint")}</p>
      </div>
    </section>

    ${n!=null&&n.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:a("stats.topTitle")})}
      <div class="list">
        ${n.map((l,p)=>r`
          <a class="list-row" href="#/product/${l.id}">
            <span class="rank">${oe(p+1)}</span>
            <span class="grow">
              <span class="b">${q()?l.name:l.nameEn||l.name}</span>
              <span class="muted tiny">${q()?l.categoryName:l.categoryNameEn||l.categoryName}</span>
            </span>
            <span class="muted small">${c("eye")} ${oe(l.sold||0)}</span>
          </a>`)}
      </div>
    </section>`:""}
  `}var xr=V(()=>{U();G();K();Z();dt()});var qr={};X(qr,{mount:()=>Xl,render:()=>Ul,title:()=>Zl});function ca(t,e=""){return t!=null&&t.hero?r`
    <div class="page-hero mb">
      <h1 class="page-title">${h(ue(t.hero,"title"))}</h1>
      ${ue(t.hero,"subtitle")?r`<p class="page-sub">${h(ue(t.hero,"subtitle"))}</p>`:""}
      ${e}
    </div>`:""}function _n(t){return t!=null&&t.length?t.map(e=>r`
    <div class="card mt">
      <h2 class="page-h2">${h(ue(e,"title"))}</h2>
      ${e.body||e.bodyEn?r`<div class="page-body">${ct(ue(e,"body"))}</div>`:""}
      ${ra(oa(e,"list").length?oa(e,"list"):e.list||[])}
    </div>`).join(""):""}async function Ul(t){let e=String(t.params.key||""),s=null;try{s=await f.get(`/api/pages/${e}`)}catch(o){}if(!(s!=null&&s.page))return L({icon:"file",title:a("err.notFound"),text:a("err.notFoundText"),action:{href:"#/",label:a("err.goHome")}});let n=s.page;if(Array.isArray(n))return Jl(n);switch(e){case"about":return _l(n);case"guide":return Vl(n);case"service":return Yl(n);case"contact":return Ql(n);case"bugReport":return Kl(n);default:return Gl(n)}}async function _l(t){var s;let e=null;if(B("publicStats"))try{e=(await f.get("/api/stats/public")).stats}catch(n){}return r`
    ${ca(t)}
    ${e&&((s=t.stats)!=null&&s.length)?r`
      <div class="section-head"><div><h2 class="section-title">${c("chart")} ${a("page.statsTitle")}</h2></div></div>
      <div class="stats-grid">
        ${t.stats.map(n=>Ct({icon:Wl(n.key),label:q()?n.fa:n.en||n.fa,value:g(Number(e[n.key]||0))}))}
      </div>`:""}
    ${_n(t.sections)}
    <div class="card mt t-center">
      <strong>${c("heart")} ${a("page.aboutCta")}</strong>
      <div class="row center row-wrap mt-s">
        <a class="btn btn-primary" href="#/products">${c("cart")} ${a("cart.goShopping")}</a>
        <a class="btn btn-ghost" href="#/pages/contact">${c("phone")} ${a("contact.title")}</a>
        <a class="btn btn-ghost" href="#/pages/guide">${c("file")} ${a("footer.guide")}</a>
      </div>
    </div>`}function Wl(t){return{years:"clock",products:"box",orders:"package-check",customers:"users",visits:"eye"}[t]||"chart"}function Vl(t){var e,s;return r`
    ${ca(t)}
    ${(e=t.steps)!=null&&e.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("list")} ${a("page.stepsTitle")}</h2></div></div>
      <ol class="steps-list">
        ${t.steps.map(n=>r`
          <li class="card step-item">
            <div class="grow">
              <strong>${h(ue(n,"title"))}</strong>
              <p class="muted small mt-s">${h(ue(n,"body"))}</p>
              ${ra(oa(n,"list").length?oa(n,"list"):n.list||[])}
            </div>
          </li>`)}
      </ol>`:""}
    ${(s=t.tips)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("zap")} ${a("page.tipsTitle")}</h2>
        ${ra((q(),t.tips).map(n=>q()?n.fa:n.en||n.fa))}
      </div>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-primary" href="#/products">${a("cart.goShopping")}</a>
      <a class="btn btn-ghost" href="#/pages/faq">${c("info")} ${a("footer.faq")}</a>
    </div>`}function Yl(t){return r`
    ${ca(t)}
    <div class="pwa-grid">
      ${(t.items||[]).map(e=>r`
        <div class="pwa-card">
          <span class="pwa-ic">${c(e.icon||"check")}</span>
          <div>
            <strong>${h(ue(e,"title"))}</strong>
            <p class="muted small mt-s">${h(ue(e,"body"))}</p>
            ${ra(oa(e,"list").length?oa(e,"list"):e.list||[])}
          </div>
        </div>`)}
    </div>
    ${_n(t.sections)}`}function Gl(t){var e,s;return r`
    ${ca(t)}
    ${t.intro||t.introEn?r`<p class="page-lead">${h(q()?t.intro:t.introEn||t.intro)}</p>`:""}
    ${t.body||t.bodyEn?r`<div class="card"><div class="page-body">${ct(q()?t.body:t.bodyEn||t.body)}</div></div>`:""}
    ${(e=t.rules)!=null&&e.length||(s=t.rulesEn)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("check")} ${a("page.rulesTitle")}</h2>
        ${ra(q()?t.rules:t.rulesEn||t.rules)}
      </div>`:""}
    ${_n(t.sections)}
    ${t.notice||t.noticeEn?r`<p class="notice notice-warn mt">${c("info")}<span>${h(q()?t.notice:t.noticeEn||t.notice)}</span></p>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-ghost" href="#/pages/terms">${c("file")} ${a("footer.terms")}</a>
      <a class="btn btn-ghost" href="#/pages/privacy">${c("shield")} ${a("footer.privacy")}</a>
      <a class="btn btn-ghost" href="#/pages/insurance">${c("truck")} ${a("footer.insurance")}</a>
      <a class="btn btn-ghost" href="#/pages/ticketRules">${c("ticket")} ${a("acc.ticketViewRules")}</a>
    </div>
    ${(t.id==="terms"||t.id==="privacy")&&!hasConsent()?r`
      <div class="card mt bg-shade">
        <p class="mb-s b">${q()?"\u0622\u06CC\u0627 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0631\u0627 \u0645\u0637\u0627\u0644\u0639\u0647 \u06A9\u0631\u062F\u06CC\u062F\u061F":"Have you read the terms?"}</p>
        <button type="button" class="btn btn-primary" data-act="accept-consent-now">${c("check")} ${a("consent.accept")}</button>
      </div>
    `:""}
    `}function Kl(t){var e,s,n;return r`
    ${ca(t)}
    ${t.body||t.bodyEn?r`<p class="page-lead">${h(q()?t.body:t.bodyEn||t.body)}</p>`:""}
    ${(e=t.hints)!=null&&e.length?r`
      <div class="card">
        <h2 class="page-h2">${c("info")} ${a("page.hintsTitle")}</h2>
        ${ra(q()?t.hints:t.hintsEn||t.hints)}
      </div>`:""}
    <form class="card mt" data-act="page-feedback">
      <input type="hidden" name="type" value="bug">
      <h2 class="page-h2">${c("bug")} ${a("page.bugTitle")}</h2>
      ${x({label:a("common.title"),name:"title",required:!0})}
      ${J({label:a("common.body"),name:"body",required:!0,rows:6})}
      ${x({label:a("acc.feedbackContact"),name:"contact",hint:a("acc.feedbackContactHint"),value:((s=m.me)==null?void 0:s.phone)||((n=m.me)==null?void 0:n.email)||""})}
      <button class="btn btn-primary" type="submit">${c("send")} ${a("common.submit")}</button>
    </form>`}function Ql(t){var i,l;let e=Xt(),s=e.socials||{},n="https://instagram.com/jam.yassaei",o=[{key:"instagram",icon:"camera",url:Dt(s.instagram||n)},{key:"telegram",icon:"send",url:Dt(s.telegram)},{key:"eitaa",icon:"message",url:Dt(s.eitaa)},{key:"whatsapp",icon:"chat",url:e.whatsapp?`https://wa.me/${String(e.whatsapp).replace(/\D/g,"")}`:""}].filter(p=>p.url);return r`
    ${ca(t)}
    <div class="acc-grid">
      <div class="col">
        <div class="card">
          <h2 class="page-h2">${c("pin")} ${a("contact.addressUs")}</h2>
          <p class="page-body">${h(q()?e.address:e.addressEn||e.address)}</p>
          <div class="row row-wrap mt-s">
            <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${h(q()?e.address:e.addressEn||e.address)}">${c("copy")} ${a("contact.copyAddress")}</button>
            ${e.phone?r`<a class="btn btn-primary btn-sm" href="tel:${e.phone}">${c("phone")} ${a("contact.callNow")}</a>`:""}
            ${e.email?r`<a class="btn btn-ghost btn-sm" href="mailto:${e.email}">${c("mail")} ${a("contact.emailUs")}</a>`:""}
          </div>
          <div class="contact-list mt">
            ${e.phone?r`<div class="row"><span class="muted small">${a("contact.phone")}</span><a class="mono" href="tel:${e.phone}">${at(e.phone)}</a></div>`:""}
            ${e.phone2?r`<div class="row"><span class="muted small">${a("contact.mobile")}</span><a class="mono" href="tel:${e.phone2}">${at(e.phone2)}</a></div>`:""}
            ${e.phone3?r`<div class="row"><span class="muted small">${a("contact.phone3")}</span><a class="mono" href="tel:${e.phone3}">${at(e.phone3)}</a></div>`:""}
            ${e.whatsapp?r`<div class="row"><span class="muted small">${a("contact.whatsapp")}</span><span class="mono">${at(e.whatsapp)}</span></div>`:""}
            ${e.email?r`<div class="row"><span class="muted small">${a("common.email")}</span><span class="mono small">${h(e.email)}</span></div>`:""}
          </div>
          ${o.length?r`<div class="row row-wrap mt-s">${o.map(p=>r`<a class="btn btn-ghost btn-sm" href="${h(p.url)}" target="_blank" rel="noopener">${c(p.icon)} ${a("social."+p.key)}</a>`)}</div>`:""}
        </div>

        <div class="card mt">
          <h2 class="page-h2">${c("clock")} ${a("footer.workingHours")}</h2>
          ${(e.workingHours||[]).map(p=>r`
            <div class="row row-between mt-s">
              <span class="small">${h(q()?p.fa||p.day:p.en||p.day)}</span>
              <span class="small b mono">${h(q()?p.time:p.timeEn||p.time)}</span>
            </div>`)}
        </div>

        <form class="card mt" data-act="page-feedback">
          <input type="hidden" name="type" value="suggestion">
          <h2 class="page-h2">${c("chat")} ${a("contact.formTitle")}</h2>
          <p class="muted small mb-s">${a("contact.formText")}</p>
          ${x({label:a("common.title"),name:"title",required:!0})}
          ${J({label:a("common.message"),name:"body",required:!0,rows:5})}
          ${x({label:a("acc.feedbackContact"),name:"contact",value:((i=m.me)==null?void 0:i.phone)||((l=m.me)==null?void 0:l.email)||""})}
          <button class="btn btn-primary" type="submit">${c("send")} ${a("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        ${Dt(s.instagram||n)||Dt(s.telegram)?r`
        <div class="card">
          <h2 class="page-h2">${c("globe")} ${a("contact.socials")}</h2>
          <p class="muted small">${a("contact.socialsDesc",{default:"\u0645\u0627 \u0631\u0627 \u062F\u0631 \u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u062F."})}</p>
          <div class="row row-wrap mt-s" style="gap: 12px;">
            ${Dt(s.instagram||n)?r`<a class="btn btn-outline btn-sm" href="${h(Dt(s.instagram||n))}" target="_blank" rel="noopener">${c("camera")} ${a("social.instagram")}</a>`:""}
            ${Dt(s.telegram)?r`<a class="btn btn-primary btn-sm" href="${h(Dt(s.telegram))}" target="_blank" rel="noopener">${c("send")} ${a("contact.tgBotBtn")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card ${Dt(s.telegram)||Dt(s.instagram||n)?"mt":""}">
          <h2 class="page-h2">${c("map")} ${a("contact.mapTitle")}</h2>
          <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${a("contact.mapTitle")}">
            ${ct(ea())}
            <span class="minimap-hint">${c("pin")} ${a("contact.mapHint")}</span>
          </div>
          <p class="hint mt-s">${a("contact.mapAsk")}</p>
          <button class="btn btn-outline btn-block mt-s" data-act="open-map">${c("map")} ${a("contact.openMaps")}</button>
        </div>

        ${B("liveSupport")?r`
        <div class="card mt">
          <h2 class="page-h2">${c("headset")} ${a("common.support")}</h2>
          <p class="muted small">${a("acc.chatTitle")}</p>
          <div class="row row-wrap mt-s">
            ${m.me?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${a("acc.chatTitle")}</button>`:r`<a class="btn btn-primary btn-sm" href="#/auth">${c("user")} ${a("nav.login")}</a>`}
            ${B("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${a("common.ticket")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card mt">
          <h2 class="page-h2">${c("info")} ${a("footer.faq")}</h2>
          <p class="muted small">${a("faq.askText")}</p>
          <a class="btn btn-ghost btn-sm mt-s" href="#/pages/faq">${a("footer.faq")}</a>
        </div>
      </aside>
    </div>`}function Jl(t){let e=[...new Set(t.map(s=>s.cat||"other"))];return r`
    <div class="page-hero mb">
      <h1 class="page-title">${c("info")} ${a("footer.faq")}</h1>
      <p class="page-sub">${a("faq.askText")}</p>
    </div>
    <div class="field mb">
      <input class="input" type="search" id="faq-q" placeholder="${a("faq.search")}" data-faq-q autocomplete="off">
    </div>
    <div class="row row-wrap mb" data-faq-cats>
      <button type="button" class="chip active" data-act="faq-cat" data-cat="">${a("faq.all")}</button>
      ${e.map(s=>r`<button type="button" class="chip" data-act="faq-cat" data-cat="${s}">${a(`faq.cat.${s}`)}</button>`)}
    </div>
    <p class="muted small mb-s" data-faq-count>${a("faq.results",{n:g(t.length)})}</p>
    <div class="accordion" data-faq-list>
      ${t.map((s,n)=>r`
        <div class="acc-item" data-cat="${s.cat||"other"}" data-text="${h(((q()?s.q:s.qEn)+" "+(q()?s.a:s.aEn)).toLowerCase())}">
          <button class="acc-h" type="button" aria-expanded="false">
            <span class="b">${h(q()?s.q:s.qEn||s.q)}</span>
            ${c("chevron-down")}
          </button>
          <div class="acc-b" hidden><div class="page-body"><p>${h(q()?s.a:s.aEn||s.a)}</p></div></div>
        </div>`)}
    </div>
    <div class="card mt t-center" data-faq-empty hidden>
      <p class="muted">${a("faq.notFound")}</p>
      <div class="row center row-wrap mt-s">
        ${m.me&&B("liveSupport")?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${a("acc.chatTitle")}</button>`:""}
        ${B("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${a("acc.ticketNew")}</a>`:""}
      </div>
    </div>`}function Er(){var l,p;let t=document.querySelector("[data-faq-list]");if(!t)return;let e=(((l=document.querySelector("[data-faq-q]"))==null?void 0:l.value)||"").trim().toLowerCase(),s=((p=document.querySelector("[data-faq-cats] .chip.active"))==null?void 0:p.dataset.cat)||"",n=0;t.querySelectorAll(".acc-item").forEach(d=>{let b=!s||d.dataset.cat===s,u=!e||(d.dataset.text||"").includes(e),v=b&&u;d.hidden=!v,v&&(n+=1)});let o=document.querySelector("[data-faq-count]");o&&(o.textContent=a("faq.results",{n:g(n)}));let i=document.querySelector("[data-faq-empty]");i&&(i.hidden=n!==0)}function Xl(t,e){N(t),xn(t);let s=t.querySelector("[data-faq-q]");if(s){let n=0;s.addEventListener("input",()=>{clearTimeout(n),n=setTimeout(Er,160)})}return null}var ue,oa,ra,Zl,Tr=V(()=>{U();G();Z();K();dt();tt();ut();ue=(t,e)=>{var s,n,o;return q()?(s=t==null?void 0:t[e])!=null?s:"":(o=(n=t==null?void 0:t[`${e}En`])!=null?n:t==null?void 0:t[e])!=null?o:""},oa=(t,e)=>q()?(t==null?void 0:t[e])||[]:(t==null?void 0:t[`${e}En`])||(t==null?void 0:t[e])||[];ra=(t,e="dot-list")=>t!=null&&t.length?r`<ul class="${e}">${t.map(s=>r`<li>${typeof s=="string"?h(s):h(ue(s,"fa")||s.title||"")}</li>`)}</ul>`:"";y("page-feedback",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/feedback",{type:s.get("type")||"suggestion",title:s.get("title"),body:s.get("body"),contact:s.get("contact")||""}),E(a("acc.feedbackSent")),e.reset()}catch(n){S(n)}})});y("faq-cat",(t,e)=>{e.closest("[data-faq-cats]").querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n===e)),Er()});Zl=()=>a("common.page")});var Cr={};X(Cr,{mount:()=>ad,render:()=>td});async function td(){var n,o,i,l,p,d,b,u,v,w,$;let t=null;try{t=await f.get("/api/admin/overview")}catch(k){return _({title:(k==null?void 0:k.message)||a("err.generic")})}let e=t.stats||{},s=(t.chart||[]).map(k=>({label:k.date,short:k.date.slice(8),value:k.visits||0}));return Q("users.view")&&ed(),r`
    <div class="kpi-grid">
      ${It({label:a("adm.kpi.ordersToday"),value:g(((n=t.today)==null?void 0:n.orders)||0),sub:A(((o=t.today)==null?void 0:o.revenue)||0)})}
      ${It({label:a("adm.kpi.visits"),value:g(((i=t.today)==null?void 0:i.visits)||0),sub:`${a("stats.visitsTotal")}: ${g(e.visitsTotal||0)}`})}
      ${It({label:a("adm.kpi.revenueTotal"),value:A(((l=t.totals)==null?void 0:l.revenue)||0),sub:`${g(((p=t.totals)==null?void 0:p.orders)||0)} ${a("common.orders")}`})}
      ${It({label:a("adm.kpi.pending"),value:g(e.pendingOrders||0),sub:a("adm.awaiting.orders")})}
      ${It({label:a("adm.kpi.products"),value:g(e.products||0),sub:`${g(e.outOfStock||0)} ${a("stats.outOfStock")}`})}
      ${It({label:a("adm.kpi.users"),value:g(e.customers||0),sub:`${g(e.plusMembers||0)} ${a("stats.plusMembers")}`})}
      ${It({label:a("adm.kpi.lowStock"),value:g((t.lowStock||[]).length),sub:a("adm.lowStockList")})}
      ${It({label:a("adm.storage"),value:`${g(((d=t.storage)==null?void 0:d.sizeKb)||0)} KB`,sub:"db.json"})}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${c("alert")} ${a("adm.awaiting")}</h2></div></div>
    <div class="kpi-grid">
      ${Q("reviews.moderate")?Na("star",a("adm.awaiting.reviews"),(b=t.awaiting)==null?void 0:b.reviews,"#/admin/reviews"):""}
      ${Q("tickets.manage")?Na("ticket",a("adm.awaiting.tickets"),(u=t.awaiting)==null?void 0:u.tickets,"#/admin/tickets"):""}
      ${Q("orders.view")?Na("package-check",a("adm.awaiting.orders"),(v=t.awaiting)==null?void 0:v.orders,"#/admin/orders"):""}
      ${Q("feedback.manage")?Na("flag",a("adm.awaiting.feedback"),(w=t.awaiting)==null?void 0:w.feedback,"#/admin/feedback"):""}
      ${Q("tickets.manage")?Na("headset",a("adm.awaiting.chat"),($=t.awaiting)==null?void 0:$.support,"#/admin/support"):""}
    </div>

    <div class="card mt">
      <strong>${c("chart")} ${a("adm.chart")}</strong>
      ${s.length?us(s,{height:140}):r`<p class="muted small">${a("common.noData")}</p>`}
    </div>

    <div class="acc-grid acc-grid-eq mt">
      <div class="card">
        <strong>${c("star")} ${a("adm.topSelling")}</strong>
        ${lt([{label:""},{label:a("adm.pName")},{label:a("pdp.sold"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("common.price"),cls:"num"}],(t.topSelling||[]).map(k=>r`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${Oe(zt(mt({},k),{images:k.image?[k.image]:[]}))}</span></td>
              <td><a class="b" href="#/admin/products/${k.id}">${h((q(),k.name))}</a></td>
              <td class="num">${g(k.sold)}</td>
              <td class="num">${g(k.stock)}</td>
              <td class="num">${A(k.price)}</td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
      <div class="card">
        <strong>${c("box")} ${a("adm.lowStockList")}</strong>
        ${lt([{label:a("adm.pName")},{label:a("common.available"),cls:"num"},{label:""}],(t.lowStock||[]).map(k=>r`
            <tr>
              <td class="nowrap">${h(k.name)}</td>
              <td class="num"><span class="badge-pill ${k.inStock?"bp-warn":"bp-danger"}">${g(Math.max(0,(k.stock||0)-(k.reserved||0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${k.id}">${a("common.edit")}</a></td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
    </div>

    ${Q("users.view")||Q("settings.edit")?r`
    <div class="acc-grid acc-grid-eq mt">
      ${Q("users.view")?r`
      <div class="card" id="secLiveCard">
        <div class="row row-between">
          <strong>${c("shield")} ${a("adm.secTitle")}</strong>
          <span class="badge-pill bp-success tiny" id="secState">…</span>
        </div>
        <div class="kpi-grid mt-s" id="secKpis"></div>
        <div class="mt-s" id="secTop"></div>
        ${Q("settings.edit")?r`
        <form class="form-grid mt" id="secForm" data-act="adm-sec-save">
          ${yt({label:a("adm.secQueueEnabled"),desc:a("adm.secQueueDesc"),name:"queueEnabled",checked:!0})}
          ${x({label:a("adm.secMaxConc"),name:"maxConcurrent",type:"number",value:"80",attrs:'min="5" max="5000" inputmode="numeric"'})}
          ${x({label:a("adm.secTriggerRps"),name:"triggerRps",type:"number",value:"40",attrs:'min="5" max="2000" inputmode="numeric"'})}
          ${x({label:a("adm.secPassTtl"),name:"passTtlMin",type:"number",value:"30",attrs:'min="5" max="240" inputmode="numeric"'})}
          ${x({label:a("adm.secPoll"),name:"pollSec",type:"number",value:"4",attrs:'min="2" max="20" inputmode="numeric"'})}
          ${x({label:a("adm.secFloodBan"),name:"floodBanPerMin",type:"number",value:"2500",attrs:'min="500" max="100000" inputmode="numeric"'})}
          ${x({label:a("adm.secFloodMin"),name:"floodBanMin",type:"number",value:"15",attrs:'min="1" max="1440" inputmode="numeric"'})}
          <button class="btn btn-primary btn-sm span-2" type="submit">${c("save")} ${a("common.save")}</button>
        </form>`:""}
      </div>`:""}
      ${Q("settings.edit")?r`
      <div class="card">
        <strong>${c("terminal")} ${a("adm.console")}</strong>
        <p class="muted small mt-s">${a("adm.consoleHint")}</p>
        <button class="btn btn-danger btn-sm mt-s" data-act="adm-sys-restart">${c("zap")} ${a("adm.sysRestart")}</button>
        <p class="muted small mt">${a("adm.sysResetLabel")}</p>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="audit">${a("adm.sysReset.audit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="carts">${a("adm.sysReset.carts")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visits">${a("adm.sysReset.visits")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visitors">${a("adm.sysReset.visitors")}</button>
        </div>
      </div>`:""}
    </div>`:""}

    ${Q("audit.view")?r`
    <div class="card mt">
      <div class="row row-between">
        <strong>${c("history")} ${a("adm.recentAudit")}</strong>
        <a class="section-link" href="#/admin/audit">${a("common.showAll")}</a>
      </div>
      ${lt([{label:a("common.date")},{label:a("adm.auditActor")},{label:a("adm.auditAction")},{label:a("adm.auditTarget")}],(t.recentAudit||[]).map(k=>r`
          <tr>
            <td class="nowrap tiny">${St(k.at)}</td>
            <td class="tiny">${h(k.actorName||"")} <span class="muted">(${h(k.actorRole||"")})</span></td>
            <td class="mono tiny">${h(k.action||"")}</td>
            <td class="tiny muted">${h(String(k.target||"").slice(0,40))}</td>
          </tr>`),{emptyText:a("common.noData")})}
    </div>`:""}`}function Na(t,e,s,n){return r`
    <a class="kpi await-card ${s>0?"hot":""}" href="${n}">
      <div class="l">${c(t)} ${e}</div>
      <div class="v">${g(s||0)}</div>
    </a>`}async function Vn(){var l,p,d,b;if(!document.getElementById("secLiveCard")){++Wn>=3&&ia&&(clearInterval(ia),ia=0);return}Wn=0;let e;try{e=await f.get("/api/admin/system/load")}catch(u){return}let s=document.getElementById("secKpis");s&&(s.innerHTML=[`<div class="kpi"><div class="l">${a("adm.secInflight")}</div><div class="v">${g(e.inflight)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secRps")}</div><div class="v">${g(e.rps)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secQueued")}</div><div class="v ${e.queued>0?"hot":""}">${g(e.queued)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secAutoBans")}</div><div class="v">${g((e.autoBans||[]).length)}</div></div>`].join(""));let n=document.getElementById("secTop");n&&(n.innerHTML=(e.top||[]).length?`<div class="muted tiny">${a("adm.secTop")}</div><div class="table-wrap"><table class="table"><thead><tr><th>IP</th><th class="num">${a("adm.secPerMin")}</th></tr></thead><tbody>${e.top.map(u=>`<tr><td class="mono tiny">${h(u.ip)}</td><td class="num tiny">${g(u.perMin)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted tiny">${a("adm.secTopEmpty")}</p>`);let o=document.getElementById("secState");if(o){let u=e.queued>0||e.inflight>(((l=e.sec)==null?void 0:l.maxConcurrent)||80)||e.rps>(((p=e.sec)==null?void 0:p.triggerRps)||40);o.textContent=u?a("adm.secBusy"):a("adm.secNormal"),o.className=`badge-pill tiny ${u?"bp-warn":"bp-success"}`}let i=document.getElementById("secForm");if(i&&!i.dataset.filled){i.dataset.filled="1";for(let v of["maxConcurrent","triggerRps","passTtlMin","pollSec","floodBanPerMin","floodBanMin"]){let w=i.elements[v];w&&((d=e.sec)==null?void 0:d[v])!=null&&(w.value=e.sec[v])}let u=i.elements.queueEnabled;u&&(u.checked=!!((b=e.sec)!=null&&b.queueEnabled))}}function ed(){ia&&clearInterval(ia),Wn=0,setTimeout(Vn,400),ia=setInterval(Vn,5e3)}function ad(){return null}var ia,Wn,Ar=V(()=>{U();G();Z();ut();K();dt();tt();ia=0,Wn=0;y("adm-sec-save",async(t,e)=>{var n,o,i,l,p,d,b,u;t.preventDefault();let s={queueEnabled:(o=(n=e.elements.queueEnabled)==null?void 0:n.checked)!=null?o:!0,maxConcurrent:Number((i=e.elements.maxConcurrent)==null?void 0:i.value)||80,triggerRps:Number((l=e.elements.triggerRps)==null?void 0:l.value)||40,passTtlMin:Number((p=e.elements.passTtlMin)==null?void 0:p.value)||30,pollSec:Number((d=e.elements.pollSec)==null?void 0:d.value)||4,floodBanPerMin:Number((b=e.elements.floodBanPerMin)==null?void 0:b.value)||2500,floodBanMin:Number((u=e.elements.floodBanMin)==null?void 0:u.value)||15};await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch("/api/admin/settings/security",{value:s}),E(a("adm.secSaved"));let v=document.getElementById("secForm");v&&delete v.dataset.filled,Vn()}catch(v){S(v)}})});y("adm-sys-restart",async(t,e)=>{await wt({text:a("adm.sysRestartWarn"),danger:!0})&&await D(e,async()=>{try{await f.post("/api/admin/system/restart",{}),E(a("adm.sysRestarting")),setTimeout(()=>location.reload(),6e3)}catch(n){S(n)}})});y("adm-sys-reset",async(t,e)=>{let s=e.dataset.what;await wt({text:a(`adm.resetWarn.${s}`),danger:!0})&&await D(e,async()=>{try{await f.post("/api/admin/system/reset",{what:s}),E(a("adm.resetDone"))}catch(o){S(o)}})})});var Mr={};X(Mr,{mount:()=>cd,render:()=>sd});async function sd(t){let e=t.params.id;if(e==="new")return Dr(null);if(e){let s=null;try{s=await f.get(`/api/admin/products/${e}`)}catch(n){return _({title:(n==null?void 0:n.message)||a("err.notFound")})}return Dr(s.product)}return nd()}async function nd(){let t=null;try{t=await f.get(f.url("/api/admin/products",{q:Lt.q,cat:Lt.cat,brand:Lt.brand,status:Lt.status,page:Lt.page,limit:Lt.limit}))}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=n=>`#/admin/products?page=${n}`;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("box")} ${a("adm.products")}</h2>
        <p class="muted small">${g(t.total||0)} ${a("catalog.count")}</p>
      </div>
      ${Q("products.create")?r`<a class="btn btn-primary btn-sm" href="#/admin/products/new">${c("plus")} ${a("adm.productNew")}</a>`:""}
    </div>

    <form class="card mb adm-filter" data-act="adm-p-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Lt.q)}" placeholder="${a("adm.pName")} / SKU / ${a("pdp.barcode")}">
        </label>
        ${j({label:a("adm.pCat"),name:"cat",value:Lt.cat,options:[{value:"",label:a("common.all")},...m.categories.map(n=>({value:n.id,label:Et(n)}))]})}
        ${j({label:a("adm.pBrand"),name:"brand",value:Lt.brand,options:[{value:"",label:a("common.all")},...m.brands.map(n=>({value:n.id,label:Yt(n)}))]})}
        ${j({label:a("common.status"),name:"status",value:Lt.status,options:[{value:"",label:a("common.all")},{value:"active",label:a("common.active")},{value:"inactive",label:a("common.inactive")},{value:"low",label:a("adm.kpi.lowStock")},{value:"out",label:a("card.outOfStock")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-p-clear">${c("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${e.length?lt([{label:""},{label:a("adm.pName")},{label:a("adm.pCat")},{label:a("common.price"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("pdp.sold"),cls:"num"},{label:a("common.status")},{label:a("common.actions"),cls:"num"}],e.map(n=>r`
        <tr>
          <td><span class="cl-img" data-h="46px" data-w="46px">${Oe(n)}</span></td>
          <td>
            <a class="b" href="#/admin/products/${n.id}">${h(q()?n.name:n.nameEn||n.name)}</a>
            <div class="tiny muted mono">${h(n.sku||"")}${n.barcode?` \xB7 ${h(n.barcode)}`:""}</div>
          </td>
          <td class="tiny">${h(n.categoryName||"")}<div class="tiny muted">${h(n.brandName||"")}</div></td>
          <td class="num">
            ${A(n.price)}
            ${n.oldPrice>n.price?r`<div class="tiny muted"><s>${g(n.oldPrice)}</s> <span class="badge-pill bp-danger">${g(n.discountPct)}٪</span></div>`:""}
          </td>
          <td class="num"><span class="badge-pill ${n.inStock?n.stock<=3?"bp-warn":"bp-success":"bp-danger"}">${g(Math.max(0,(n.stock||0)-(n.reserved||0)))}</span></td>
          <td class="num">${g(n.sold||0)}</td>
          <td>${n.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <a class="btn btn-ghost btn-xs" href="#/admin/products/${n.id}">${c("edit")}</a>
              <a class="btn btn-ghost btn-xs" href="#/product/${n.id}" target="_blank" rel="noopener">${c("external")}</a>
              <button class="btn btn-ghost btn-xs" data-act="adm-p-igpack" data-id="${n.id}" title="${a("adm.igPack")}">${c("camera")}</button>
              ${Q("products.delete")?r`<button class="btn btn-ghost btn-xs" data-act="adm-p-del" data-id="${n.id}" data-name="${h(n.name)}">${c("trash")}</button>`:""}
            </div>
          </td>
        </tr>`)):L({icon:"box",title:a("common.noResult"),action:Q("products.create")?{href:"#/admin/products/new",label:a("adm.productNew")}:null})}

    <div class="mt" data-page="${t.page}" data-pages="${t.pages}">${me(t.page||1,t.pages||1,s)}</div>`}function Dr(t){var s,n,o,i,l,p;let e=!t;return vt.images=[...(t==null?void 0:t.images)||[]],vt.specs=Object.entries((t==null?void 0:t.specs)||{}).map(([d,b])=>({key:d,value:b})),vt.tags=[...(t==null?void 0:t.tags)||[]],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(e?"plus":"edit")} ${e?a("adm.productNew"):a("adm.productEdit")}</h2>
      <div class="row row-wrap">
        <a class="btn btn-ghost btn-sm" href="#/admin/products">${c("arrow-right")} ${a("adm.products")}</a>
        ${e?"":r`<a class="btn btn-ghost btn-sm" href="#/product/${t.id}" target="_blank" rel="noopener">${c("external")} ${a("common.view")}</a>`}
      </div>
    </div>

    <form data-act="adm-p-save" data-id="${(t==null?void 0:t.id)||""}">
      <div class="card">
        <div class="form-grid">
          ${x({label:a("adm.pName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
          ${x({label:a("adm.pNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
          ${j({label:a("adm.pCat"),name:"categoryId",value:(t==null?void 0:t.categoryId)||"",options:m.categories.map(d=>({value:d.id,label:Et(d)}))})}
          ${j({label:a("adm.pBrand"),name:"brandId",value:(t==null?void 0:t.brandId)||"",options:m.brands.map(d=>({value:d.id,label:Yt(d)}))})}
          ${x({label:a("adm.pSku"),name:"sku",value:(t==null?void 0:t.sku)||"",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Leave empty to auto-generate"})}
          ${x({label:a("adm.pBarcode"),name:"barcode",value:(t==null?void 0:t.barcode)||"",attrs:'inputmode="numeric"'})}
          ${x({label:a("adm.pPrice"),name:"price",type:"number",required:!0,value:(s=t==null?void 0:t.price)!=null?s:""})}
          ${x({label:a("adm.pOldPrice"),name:"oldPrice",type:"number",value:(n=t==null?void 0:t.oldPrice)!=null?n:0})}
          ${x({label:a("adm.pCost"),name:"cost",type:"number",value:(o=t==null?void 0:t.cost)!=null?o:0})}
          ${x({label:a("adm.pStock"),name:"stock",type:"number",required:!0,value:(i=t==null?void 0:t.stock)!=null?i:1})}
          ${x({label:a("adm.pWeight"),name:"weight",type:"number",value:(l=t==null?void 0:t.weight)!=null?l:0})}
          ${x({label:a("adm.pWarranty"),name:"warrantyMonths",type:"number",value:(p=t==null?void 0:t.warrantyMonths)!=null?p:0})}
          ${j({label:a("adm.pAuth"),name:"authenticity",value:(t==null?void 0:t.authenticity)||"generic",options:["original","highcopy","generic"].map(d=>({value:d,label:a(`auth.${d}`)}))})}
        </div>
        ${!e&&Q("barcode.print")?r`
          <div class="row row-wrap mt-s">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-barcode" data-id="${t.id}">${c("barcode")} ${a("adm.bGenerate")}</button>
            ${t.barcode?r`<code class="tag mono">${t.barcode}</code>`:""}
          </div>`:""}
      </div>

      <div class="card mt">
        <strong>${c("file")} ${a("pdp.description")}</strong>
        <div class="mt-s">${J({label:"\u0641\u0627\u0631\u0633\u06CC",name:"description",value:(t==null?void 0:t.description)||"",rows:5})}</div>
        ${J({label:"English",name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:4})}
      </div>

      <div class="card mt">
        <div class="row row-between row-wrap">
          <strong>${c("image")} ${a("adm.pImages")} (${g(vt.images.length)}/8)</strong>
          <div class="row row-wrap">
            ${Q("products.create")?r`<button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-find" data-name="${h((t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"")}">${c("search")} ${a("adm.pFindImage")}</button>`:""}
            <label class="btn btn-ghost btn-sm" for="adm-p-file">${c("upload")} ${a("adm.pUpload")}</label>
            <input id="adm-p-file" type="file" accept="image/*" multiple hidden data-img-input>
          </div>
        </div>
        <div class="img-list mt-s" data-img-list>${Ia()}</div>
        <div class="mt">
          ${J({label:a("adm.pVideos"),name:"videos",value:((t==null?void 0:t.videos)||[]).join(`
`),rows:2,hint:a("adm.pVideosHint")})}
        </div>
      </div>

      <div class="card mt">
        <div class="row row-between">
          <strong>${c("list")} ${a("adm.pSpecs")}</strong>
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-spec-add">${c("plus")} ${a("adm.pAddSpec")}</button>
        </div>
        <div class="mt-s" data-spec-list>${Yn()}</div>
      </div>

      <div class="card mt">
        <strong>${c("tag")} ${a("adm.pTags")}</strong>
        <div class="mt-s" data-tag-list>${Gn()}</div>
        <div class="row mt-s">
          <input class="input" data-tag-input placeholder="${q()?"\u0628\u0631\u0686\u0633\u0628 \u062C\u062F\u06CC\u062F \u0648 Enter":"New tag and Enter"}" maxlength="30">
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-tag-add">${c("plus")}</button>
        </div>
      </div>

      <div class="card mt">
        ${yt({label:a("adm.pFeatured"),name:"featured",checked:!!(t!=null&&t.featured)})}
        ${yt({label:a("adm.pActive"),name:"active",checked:t?t.active!==!1:!0})}
      </div>

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/products">${a("common.cancel")}</a>
      </div>
    </form>`}function Ia(){return vt.images.length?vt.images.map((t,e)=>r`
    <span class="img-item">
      <img src="${t}" alt="${a("img.alt")}" loading="lazy">
      <span class="img-tools">
        ${e>0?r`<button type="button" data-act="adm-img-up" data-i="${e}" title="${a("common.prev")}">${c("arrow-up")}</button>`:""}
        <button type="button" data-act="adm-img-del" data-i="${e}" title="${a("common.delete")}">${c("trash")}</button>
      </span>
      ${e===0?r`<span class="img-main">${a("common.image")} ۱</span>`:""}
    </span>`).join(""):r`<p class="muted small">${a("adm.pFindEmpty")}</p>`}function Yn(){return vt.specs.length?vt.specs.map((t,e)=>r`
    <div class="spec-row">
      <input class="input" value="${h(t.key)}" placeholder="${a("adm.pSpecKey")}" data-spec-k="${e}" maxlength="40">
      <input class="input" value="${h(t.value)}" placeholder="${a("adm.pSpecVal")}" data-spec-v="${e}" maxlength="120">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-spec-del" data-i="${e}">${c("trash")}</button>
    </div>`).join(""):r`<p class="muted small">${a("common.empty")}</p>`}function Gn(){return vt.tags.length?r`<div class="row row-wrap">${vt.tags.map((t,e)=>r`
    <span class="chip">${h(t)}<button type="button" data-act="adm-tag-del" data-i="${e}" aria-label="${a("common.delete")}">${c("close")}</button></span>`)}</div>`:r`<p class="muted small">${a("common.empty")}</p>`}function Pe(t,e,s){let n=(t||document).querySelector(e);n&&(n.innerHTML=s),N(n||document)}function od(t){let e=Xt(),s=q()?t.name:t.nameEn||t.name,n=b=>Number(b||0).toLocaleString(q()?"fa-IR":"en-US"),o=Number(t.oldPrice||0),i=Math.max(0,(t.stock||0)-(t.reserved||0)),l=`${location.origin}/#/product/${t.id}`,p=String(q()?t.description||"":t.descriptionEn||t.description||"").split(`
`)[0].trim().slice(0,160);return(q()?[`\u2728 ${s} \u2728`,p,"",`\u{1F4B0} \u0642\u06CC\u0645\u062A: ${n(t.price)} \u062A\u0648\u0645\u0627\u0646${o>t.price?` (\u0628\u0647\u200C\u062C\u0627\u06CC ${n(o)} \u2014 ${g(t.discountPct||0)}\u066A \u062A\u062E\u0641\u06CC\u0641)`:""}`,i>0?"\u{1F4E6} \u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u2014 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0633\u0641\u0627\u0631\u0634 \u0628\u062F\u0647":"\u{1F4E6} \u0641\u0639\u0644\u0627\u064B \u0646\u0627\u0645\u0648\u062C\u0648\u062F\u061B \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u062A \u06A9\u0646\u06CC\u0645","\u{1F6E1} \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627 + \u0645\u0647\u0644\u062A \u062A\u0633\u062A \u0648 \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632","\u{1F69A} \u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","",`\u{1F517} \u0633\u0641\u0627\u0631\u0634 \u0622\u0646\u0644\u0627\u06CC\u0646: ${l}`,`\u{1F4DE} \u062A\u0644\u0641\u0646: ${e.phone||""} \xB7 \u{1F34F} \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645: @jam.yassaei`]:[`\u2728 ${s} \u2728`,p,"",`\u{1F4B0} Price: ${n(t.price)} Toman${o>t.price?` (was ${n(o)})`:""}`,"\u{1F6E1} Authenticity guarantee + 7-day return",`\u{1F517} Order: ${l}`,`\u{1F4DE} ${e.phone||""}`]).filter((b,u,v)=>!(b===""&&(v[u-1]===""||u===0))).join(`
`)}function rd(t){let e=q()?["\u06CC\u0627\u0633\u0627\u06CC\u06CC","\u0644\u0648\u0627\u0632\u0645_\u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9","\u0642\u0637\u0639\u0627\u062A","\u062A\u0647\u0631\u0627\u0646","\u0646\u0627\u0631\u0645\u06A9","\u062E\u0631\u06CC\u062F_\u0622\u0646\u0644\u0627\u06CC\u0646"]:["Yassaei","Electronics","Parts","Tehran","OnlineShopping"],s=[t.brandName,t.categoryName].filter(Boolean).map(n=>String(n).trim().replace(/\s+/g,"_"));return[...new Set([...e,...s])].map(n=>`#${n}`).join(" ")}async function Pr(t,e,s){t&&(t.innerHTML=Ca(a("adm.pFindSearching")));try{let o=(await f.post("/api/admin/find-image",{query:e,lang:s})).items||[];t&&(t.innerHTML=o.length?r`<div class="find-grid">${o.map((i,l)=>r`
        <div class="find-item">
          <img src="/api/admin/image-thumb?url=${encodeURIComponent(i.thumbnail||i.url)}" alt="${h(i.title||"")}" loading="lazy">
          <div class="find-meta">
            <div class="tiny b">${h((i.title||"").slice(0,60))}</div>
            <div class="tiny muted">${h(i.license||"")} · ${h(i.source||"")}${i.creator?` \xB7 ${h(i.creator)}`:""}</div>
          </div>
          <button type="button" class="btn btn-primary btn-xs" data-act="adm-find-use" data-url="${h(i.url)}">${a("adm.pUseImage")}</button>
        </div>`).join("")}</div>`:L({icon:"image",title:a("adm.pFindEmpty")}))}catch(n){t&&(t.innerHTML=r`<p class="notice notice-danger">${c("alert")}<span>${h((n==null?void 0:n.message)||a("err.network"))}</span></p>`)}}function cd(t){N(t);let e=t.querySelector("[data-img-input]");e&&e.addEventListener("change",async()=>{let n=[...e.files||[]].slice(0,8-vt.images.length);e.value="";for(let o of n){if(o.size>4*1024*1024){it(`${a("err.tooLarge")}: ${o.name}`,{type:"warn"});continue}try{let i=await Ie(o),l=await f.upload(i);l.url&&vt.images.push(l.url)}catch(i){S(i)}}Pe(t,"[data-img-list]",Ia())});let s=t.querySelector("[data-tag-input]");return s&&s.addEventListener("keydown",n=>{var o;n.key==="Enter"&&(n.preventDefault(),(o=document.querySelector('[data-act="adm-p-tag-add"]'))==null||o.click())}),t.querySelectorAll(".pagination .pg").forEach(n=>{n.addEventListener("click",o=>{let i=/page=(\d+)/.exec(n.getAttribute("href")||"");if(!i)return;o.preventDefault();let l=Number(i[1]);l>=1&&(Lt.page=l,T(!0))})}),null}var Lt,vt,Lr=V(()=>{U();G();Z();K();dt();tt();ut();nt();Lt={q:"",cat:"",brand:"",status:"",page:1,limit:25},vt={images:[],specs:[],tags:[]};y("adm-p-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Lt.q=String(s.get("q")||"").trim(),Lt.cat=String(s.get("cat")||""),Lt.brand=String(s.get("brand")||""),Lt.status=String(s.get("status")||""),Lt.page=1,T(!0)});y("adm-p-clear",()=>{Object.assign(Lt,{q:"",cat:"",brand:"",status:"",page:1}),T(!0)});y("adm-p-del",async(t,e)=>{if(await Gt(e.dataset.name))try{await f.del(`/api/admin/products/${e.dataset.id}`),E(a("adm.pDeleted")),T(!0)}catch(n){S(n)}});y("adm-img-del",(t,e)=>{vt.images.splice(Number(e.dataset.i),1),Pe(null,"[data-img-list]",Ia())});y("adm-img-up",(t,e)=>{let s=Number(e.dataset.i),[n]=vt.images.splice(s,1);vt.images.splice(s-1,0,n),Pe(null,"[data-img-list]",Ia())});y("adm-p-spec-add",()=>{vt.specs.push({key:"",value:""}),Pe(null,"[data-spec-list]",Yn())});y("adm-spec-del",(t,e)=>{vt.specs.splice(Number(e.dataset.i),1),Pe(null,"[data-spec-list]",Yn())});y("adm-p-tag-add",()=>{let t=document.querySelector("[data-tag-input]"),e=String((t==null?void 0:t.value)||"").trim();e&&(!vt.tags.includes(e)&&vt.tags.length<20&&vt.tags.push(e),t&&(t.value=""),Pe(null,"[data-tag-list]",Gn()))});y("adm-tag-del",(t,e)=>{vt.tags.splice(Number(e.dataset.i),1),Pe(null,"[data-tag-list]",Gn())});y("adm-p-barcode",async(t,e)=>{await D(e,async()=>{var s,n,o;try{let i=await f.post("/api/admin/barcode/generate",{productId:e.dataset.id,count:1}),l=((n=(s=i.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=i.codes)==null?void 0:o[0])||"";if(l){let p=document.querySelector("[name=barcode]");p&&(p.value=l),E(a("adm.bGenerated"))}}catch(i){S(i)}})});y("adm-p-igpack",async(t,e)=>{let s=null;try{s=(await f.get(`/api/admin/products/${e.dataset.id}`)).product}catch(o){S(o);return}let n=(s.images||[])[0]||"";pt({title:`${c("camera")} ${a("adm.igPack")}`,subtitle:q()?s.name:s.nameEn||s.name,body:r`
      ${n?r`
        <div class="row row-wrap mb">
          <img class="igpack-img" src="${h(n)}" alt="">
          <div class="grow">
            <p class="small muted">${a("adm.igImgHint")}</p>
            <a class="btn btn-ghost btn-sm mt-s" href="${h(n)}" download="yassaei-${h(s.sku||s.id)}.jpg" target="_blank" rel="noopener">${c("download")} ${a("adm.igDl")}</a>
          </div>
        </div>`:r`<p class="notice notice-warn mb">${c("info")}<span>${a("adm.igNoImg")}</span></p>`}
      ${J({label:a("adm.igCap"),name:"igcap",rows:10,value:od(s)})}
      ${J({label:a("adm.igTags"),name:"igtags",rows:2,value:rd(s)})}
      <div class="row row-wrap mt-s">
        <button type="button" class="btn btn-primary btn-sm" data-act="adm-ig-copy" data-what="cap">${c("copy")} ${a("adm.igCopyCap")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="tags">${c("copy")} ${a("adm.igCopyTags")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="all">${c("copy")} ${a("adm.igCopyAll")}</button>
      </div>`})});y("adm-ig-copy",async(t,e)=>{var l,p;let s=e.closest(".modal"),n=((l=s==null?void 0:s.querySelector("[name=igcap]"))==null?void 0:l.value)||"",o=((p=s==null?void 0:s.querySelector("[name=igtags]"))==null?void 0:p.value)||"",i=e.dataset.what==="tags"?o:e.dataset.what==="all"?`${n}

${o}`:n;try{await tn(i),E(a("common.copied"),{timeout:1800})}catch(d){S(new Error(a("err.generic")))}});y("adm-p-save",async(t,e)=>{var l;t.preventDefault();let s=new FormData(e),n={};e.querySelectorAll("[data-spec-k]").forEach(p=>{let d=p.dataset.specK,b=e.querySelector(`[data-spec-v="${d}"]`),u=String(p.value||"").trim();u&&(n[u]=String((b==null?void 0:b.value)||"").trim())});let o=e.dataset.id,i={name:s.get("name"),nameEn:s.get("nameEn")||"",categoryId:s.get("categoryId")||"",brandId:s.get("brandId")||"",sku:s.get("sku")||"",barcode:s.get("barcode")||"",price:Number(s.get("price")||0),oldPrice:Number(s.get("oldPrice")||0),cost:Number(s.get("cost")||0),stock:Number(s.get("stock")||0),weight:Number(s.get("weight")||0),warrantyMonths:Number(s.get("warrantyMonths")||0),authenticity:s.get("authenticity")||"generic",description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",images:vt.images.slice(0,8),videos:String(((l=e.videos)==null?void 0:l.value)||"").split(/\n+/).map(p=>p.trim()).filter(Boolean).slice(0,4),specs:n,tags:vt.tags.slice(0,20),featured:s.get("featured")==="on",active:s.get("active")==="on"};await D(e.querySelector("button[type=submit]"),async()=>{var p;try{if(o)await f.patch(`/api/admin/products/${o}`,i),E(a("adm.pSaved"));else{let d=await f.post("/api/admin/products",i);if(E(a("adm.pCreated")),(p=d.product)!=null&&p.id){bt(`#/admin/products/${d.product.id}`);return}}T(!0)}catch(d){S(d)}})});y("adm-p-find",(t,e)=>{let s=pt({title:a("adm.pFindImage"),size:"lg",body:r`
      <form data-act="adm-find-run" class="row row-wrap mb">
        <input class="input grow" name="query" value="${h(e.dataset.name||"")}" placeholder="${a("adm.pName")}" required>
        <select class="select" name="lang" data-w="110px">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button class="btn btn-primary" type="submit">${c("search")} ${a("common.search")}</button>
      </form>
      <p class="hint mb-s">${a("adm.pFindImageHint")}</p>
      <div data-find-results>${Ca(a("adm.pFindSearching"))}</div>`,onMount:n=>{var i;(i=n.querySelector("[name=query]"))==null||i.focus(),n.dataset.findBox="1";let o=e.dataset.name||"";o&&Pr(n.querySelector("[data-find-results]"),o,"en")}})});y("adm-find-run",(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.closest(".modal");Pr(n==null?void 0:n.querySelector("[data-find-results]"),String(s.get("query")||""),String(s.get("lang")||"en"))});y("adm-find-use",async(t,e)=>{await D(e,async()=>{var s,n;try{let o=await f.post("/api/admin/fetch-image",{url:e.dataset.url});o.url&&!vt.images.includes(o.url)&&vt.images.length<8&&vt.images.push(o.url),Pe(null,"[data-img-list]",Ia()),E(a("adm.pSaved")),(n=(s=e.closest(".overlay"))==null?void 0:s.querySelector("[data-lx]"))==null||n.click()}catch(o){S(o)}})})});var Rr={};X(Rr,{mount:()=>dd,render:()=>id});async function id(){let t=null;try{t=await f.get("/api/admin/categories")}catch(e){return _({title:(e==null?void 0:e.message)||a("err.generic")})}return Ve=t.items||[],As=t.brands||[],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("layers")} ${a("adm.categories")}</h2>
      <div class="row row-wrap">
        <button class="btn btn-primary btn-sm" data-act="adm-cat-new">${c("plus")} ${a("common.category")}</button>
        <button class="btn btn-outline btn-sm" data-act="adm-brand-new">${c("plus")} ${a("common.brand")}</button>
      </div>
    </div>

    <div class="card">
      <strong>${c("layers")} ${a("common.category")} (${g(Ve.length)})</strong>
      ${lt([{label:a("adm.catGlyph")},{label:a("adm.catName")},{label:a("adm.catParent")},{label:a("adm.catOrder"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.status")},{label:"",cls:"num"}],Ve.map(e=>{var s;return r`
          <tr>
            <td><span class="cat-ic" data-h="34px" data-w="34px">${c(e.glyph||"box")}</span></td>
            <td><span class="b">${h(q()?e.name:e.nameEn||e.name)}</span><div class="tiny muted mono">${h(e.id)}</div></td>
            <td class="tiny">${h(((s=Ve.find(n=>n.id===e.parentId))==null?void 0:s.name)||"\u2014")}</td>
            <td class="num">${g(e.order||0)}</td>
            <td class="num">${g(e.productCount||0)}</td>
            <td>${e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-edit" data-id="${e.id}">${c("edit")}</button>
                <a class="btn btn-ghost btn-xs" href="#/category/${e.id}" target="_blank" rel="noopener">${c("external")}</a>
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-del" data-id="${e.id}" data-name="${h(e.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`}),{emptyText:a("common.noData")})}
    </div>

    <div class="card mt">
      <strong>${c("tag")} ${a("common.brand")} (${g(As.length)})</strong>
      ${lt([{label:a("adm.brandName")},{label:a("adm.brandNameEn")},{label:a("common.count"),cls:"num"},{label:a("common.status")},{label:"",cls:"num"}],As.map(e=>r`
          <tr>
            <td class="b">${h(e.name)}<div class="tiny muted mono">${h(e.id)}</div></td>
            <td class="tiny">${h(e.nameEn||"")}${e.country?r` <span class="muted">· ${h(e.country)}</span>`:""}</td>
            <td class="num">${g(e.productCount||0)}</td>
            <td>${e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-edit" data-id="${e.id}">${c("edit")}</button>
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-del" data-id="${e.id}" data-name="${h(e.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`),{emptyText:a("common.noData")})}
    </div>`}function Nr(t){var e;return pt({title:t?a("common.edit"):a("common.add"),body:r`
      <form class="form-grid" data-act="adm-cat-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":x({label:"id",name:"id",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Auto if empty"})}
        ${x({label:a("adm.catName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${x({label:a("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${j({label:a("adm.catGlyph"),name:"glyph",value:(t==null?void 0:t.glyph)||"box",options:ld.map(s=>({value:s,label:s}))})}
        ${j({label:a("adm.catParent"),name:"parentId",value:(t==null?void 0:t.parentId)||"",options:[{value:"",label:a("adm.catNoParent")},...Ve.filter(s=>s.id!==(t==null?void 0:t.id)).map(s=>({value:s.id,label:s.name}))]})}
        ${x({label:a("adm.catOrder"),name:"order",type:"number",value:(e=t==null?void 0:t.order)!=null?e:Ve.length+1,attrs:'min="0" max="999"'})}
        <div class="span-2">${J({label:a("common.description"),name:"description",value:(t==null?void 0:t.description)||"",rows:2})}</div>
        <div class="span-2">${J({label:Kn("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Description (EN)"),name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:2})}</div>
        <div class="span-2">${yt({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}function Ir(t){return pt({title:t?a("common.edit"):a("common.add"),size:"sm",body:r`
      <form data-act="adm-brand-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":x({label:"id",name:"id",hint:Kn("\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F","Auto if empty")})}
        ${x({label:a("adm.brandName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${x({label:a("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${x({label:Kn("\u06A9\u0634\u0648\u0631","Country"),name:"country",value:(t==null?void 0:t.country)||""})}
        ${yt({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}
        <button class="btn btn-primary btn-block mt-s" type="submit">${a("common.save")}</button>
      </form>`})}function dd(t){return N(t),null}var Ve,As,ld,Kn,Ra,Ba,Br=V(()=>{U();G();Z();K();dt();tt();ut();nt();Ve=[],As=[];ld=["box","cable","plug","battery","speaker","watch","glasses","mic","camera","phone","card","zap","image","headset","anchor","palm","wave","globe","layers","tag","chip","solder","wrench","fan","tv","keyboard","chart"];Kn=(t,e)=>q()?t:e,Ra=null;y("adm-cat-new",()=>{Ra=Nr(null)});y("adm-cat-edit",(t,e)=>{Ra=Nr(Ve.find(s=>s.id===e.dataset.id))});y("adm-cat-del",async(t,e)=>{if(await Gt(e.dataset.name))try{await f.del(`/api/admin/categories/${e.dataset.id}`),E(a("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-cat-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",glyph:s.get("glyph")||"box",parentId:s.get("parentId")||"",order:Number(s.get("order")||0),description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/categories",o):await f.patch(`/api/admin/categories/${e.dataset.id}`,o),E(a("misc.saved")),Ra==null||Ra.close(),await Ot({silent:!0}),T(!0)}catch(i){S(i)}})});Ba=null;y("adm-brand-new",()=>{Ba=Ir(null)});y("adm-brand-edit",(t,e)=>{Ba=Ir(As.find(s=>s.id===e.dataset.id))});y("adm-brand-del",async(t,e)=>{if(await Gt(e.dataset.name))try{await f.del(`/api/admin/brands/${e.dataset.id}`),E(a("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-brand-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",country:s.get("country")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/brands",o):await f.patch(`/api/admin/brands/${e.dataset.id}`,o),E(a("misc.saved")),Ba==null||Ba.close(),await Ot({silent:!0}),T(!0)}catch(i){S(i)}})})});var Or={};X(Or,{mount:()=>bd,render:()=>md});async function md(t){return t.params.id?ud(t.params.id):pd()}async function pd(){let t=null;try{t=await f.get(f.url("/api/admin/orders",{q:_t.q,status:_t.status,delivery:_t.delivery,page:_t.page,limit:_t.limit}))}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}Hr=t.statuses||[];let e=t.items||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("package-check")} ${a("adm.orders")}</h2>
        <p class="muted small">${g(t.total||0)} ${a("common.orders")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-o-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(_t.q)}" placeholder="${a("acc.orderCode")} / ${a("common.phone")} / ${a("common.name")}">
        </label>
        ${j({label:a("common.status"),name:"status",value:_t.status,options:[{value:"",label:a("common.all")},...Hr.map(s=>({value:s.id,label:a(`st.${s.id}`)}))]})}
        ${j({label:a("adm.oDelivery"),name:"delivery",value:_t.delivery,options:[{value:"",label:a("common.all")},{value:"pickup",label:a("dl.pickup")},{value:"courier",label:a("dl.courier")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-o-clear">${c("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${e.length?lt([{label:a("acc.orderCode")},{label:a("adm.oCustomer")},{label:a("common.date")},{label:a("adm.oDelivery")},{label:a("common.total"),cls:"num"},{label:a("adm.oPayment")},{label:a("common.status")},{label:"",cls:"num"}],e.map(s=>{var n;return r`
        <tr>
          <td class="mono b nowrap">${s.code}</td>
          <td class="nowrap">${h(s.userName||"")}<div class="tiny muted mono">${at(s.userPhone||"")}</div></td>
          <td class="nowrap tiny">${O(s.createdAt)}</td>
          <td class="tiny">${a(s.delivery==="pickup"?"dl.pickup":"dl.courier")}${s.express?r` <span class="badge-pill bp-accent">${a("checkout.express")}</span>`:""}</td>
          <td class="num b">${A(s.total)}</td>
          <td>${ze(s.payment)}<div class="tiny muted">${a(`pm.${((n=s.payment)==null?void 0:n.method)||"cod"}`)}</div></td>
          <td>${$e(s.status)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/orders/${s.id}">${a("common.view")}</a></td>
        </tr>`})):L({icon:"package-check",title:a("common.noResult")})}

    <div class="mt">${me(t.page||1,t.pages||1,s=>`#/admin/orders?page=${s}`)}</div>`}async function ud(t){let e=null;try{e=await f.get(f.url("/api/admin/orders",{q:"",page:1,limit:200}))}catch(n){}let s=((e==null?void 0:e.items)||[]).find(n=>n.id===t||n.code===t);if(!s){try{let n=await f.get(f.url("/api/admin/orders",{q:t,page:1,limit:50})),o=((n==null?void 0:n.items)||[]).find(i=>i.id===t||i.code===t);if(o)return Fr(o,n.statuses||[])}catch(n){}return L({icon:"package-check",title:a("acc.noOrders"),action:{href:"#/admin/orders",label:a("adm.orders")}})}return Fr(s,e.statuses||[])}function Fr(t,e){var n,o,i;let s=Q("orders.manage");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/orders">${a("adm.orders")}</a> <span>/</span> <span class="mono">${t.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${c("package-check")} ${t.code}</h2>
              <p class="muted small">${O(t.createdAt)} · ${h(t.userName||"")} · <span class="mono">${at(t.userPhone||"")}</span></p>
            </div>
            <div class="row row-wrap">${$e(t.status)}${ze(t.payment)}</div>
          </div>
          ${s?r`
            <form class="form-grid mt" data-act="adm-o-save" data-id="${t.id}">
              ${j({label:a("adm.oStatus"),name:"status",value:t.status,options:(e.length?e:[]).map(l=>({value:l.id,label:a(`st.${l.id}`)}))})}
              ${x({label:a("adm.oTracking"),name:"tracking",value:t.tracking||((n=t.payment)==null?void 0:n.tracking)||""})}
              <div class="span-2">${J({label:a("adm.oNote"),name:"note",value:t.adminNote||"",rows:3})}</div>
              <div class="span-2"><button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button></div>
            </form>`:""}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${a("acc.orderItems")}</strong>
          ${lt([{label:""},{label:a("common.product")},{label:a("common.price"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.total"),cls:"num"}],(t.items||[]).map(l=>r`
              <tr>
                <td><span class="cl-img" data-h="46px" data-w="46px">${Oe({id:l.productId,name:l.name,images:l.image?[l.image]:[]})}</span></td>
                <td><a class="b" href="#/admin/products/${l.productId}">${h(q()?l.name:l.nameEn||l.name)}</a><div class="tiny muted mono">${h(l.sku||"")}</div></td>
                <td class="num">${A(l.price)}</td>
                <td class="num">${g(l.qty)}</td>
                <td class="num b">${A(l.price*l.qty)}</td>
              </tr>`))}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${a("acc.timeline")}</strong>
          ${ta(t)}
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${a("cart.summary")}</strong>
          <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
          ${t.plusDiscount>0?r`<div class="sum-row discount"><span>${a("acc.plus")}</span><span class="v">−${A(t.plusDiscount)}</span></div>`:""}
          ${t.couponDiscount>0?r`<div class="sum-row discount"><span>${t.couponCode}</span><span class="v">−${A(t.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${h(t.shippingLabel)})</span>`:""}</span><span class="v">${A(t.shipping)}</span></div>
          ${t.insured?r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${A(t.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.total")}</span><span class="v">${A(t.total)}</span></div>
          ${t.walletUsed>0?r`<div class="sum-row discount"><span>${a("common.wallet")}</span><span class="v">−${A(t.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(t.payable)}</span></div>
          <p class="hint mt-s">${a("adm.oPayment")}: ${a(`pm.${((o=t.payment)==null?void 0:o.method)||"cod"}`)}${(i=t.payment)!=null&&i.ref?` \xB7 ${h(t.payment.ref)}`:""}</p>
          ${t.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${A(t.refund.amount)} — ${O(t.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${a(t.delivery==="pickup"?"dl.pickup":"dl.courier")}</strong>
          ${t.address?r`
            <p class="small mt-s"><strong>${h(t.address.receiver||"")}</strong> · <span class="mono">${at(t.address.phone||"")}</span></p>
            <p class="muted small">${h(t.address.street||"")}${t.address.city?`\u060C ${h(t.address.city)}`:""}</p>
            ${t.address.postal?r`<p class="muted small">${a("common.postal")}: ${h(t.address.postal)}</p>`:""}
            ${t.address.note?r`<p class="hint">${h(t.address.note)}</p>`:""}`:r`<p class="muted small mt-s">${a("checkout.pickupDesc")}</p>`}
          ${t.zone?r`<p class="small mt-s">${a("checkout.zone")}: ${h(t.zone)}</p>`:""}
          ${t.note?r`<p class="hint mt-s">${c("edit")} ${h(t.note)}</p>`:""}
        </div>
      </aside>
    </div>`}function bd(t){return N(t),t.querySelectorAll(".pagination .pg").forEach(e=>{e.addEventListener("click",s=>{let n=/page=(\d+)/.exec(e.getAttribute("href")||"");n&&(s.preventDefault(),_t.page=Number(n[1]),T(!0))})}),null}var _t,Hr,jr=V(()=>{U();G();Z();K();dt();tt();ut();nt();_t={q:"",status:"",delivery:"",page:1,limit:25},Hr=[];y("adm-o-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);_t.q=String(s.get("q")||"").trim(),_t.status=String(s.get("status")||""),_t.delivery=String(s.get("delivery")||""),_t.page=1,T(!0)});y("adm-o-clear",()=>{Object.assign(_t,{q:"",status:"",delivery:"",page:1}),T(!0)});y("adm-o-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/orders/${e.dataset.id}`,{status:s.get("status"),tracking:s.get("tracking")||"",note:s.get("note")||""}),E(a("adm.oSaved")),T(!0)}catch(n){S(n)}})})});var zr={};X(zr,{mount:()=>vd,render:()=>hd});async function hd(){let t=null;try{t=await f.get(f.url("/api/admin/reviews",{status:ee.status,type:ee.type}))}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}Ds=t.items||[],la=t.counts||la;let e=Math.max(1,Math.ceil(Ds.length/Qn));ee.page>e&&(ee.page=e);let s=Ds.slice((ee.page-1)*Qn,ee.page*Qn);return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${a("adm.reviews")}</h2>
      <div class="row row-wrap">
        <span class="badge-pill bp-warn">${a("adm.revPending")}: ${g(la.pending||0)}</span>
        <span class="badge-pill bp-success">${a("adm.revApproved")}: ${g(la.approved||0)}</span>
        <span class="badge-pill bp-muted">${a("adm.revRejected")}: ${g(la.rejected||0)}</span>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-rev-filter">
      <div class="form-grid">
        ${j({label:a("common.status"),name:"status",value:ee.status,options:[{value:"pending",label:`${a("adm.revPending")} (${g(la.pending||0)})`},{value:"approved",label:a("adm.revApproved")},{value:"rejected",label:a("adm.revRejected")},{value:"",label:a("common.all")}]})}
        ${j({label:a("common.type"),name:"type",value:ee.type,options:[{value:"",label:a("common.all")},{value:"review",label:a("common.review")},{value:"question",label:a("common.question")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
      </div>
    </form>

    ${s.length?r`
      <div class="rev-list">
        ${s.map(gd).join("")}
      </div>
      ${e>1?me(ee.page,e,n=>`#/admin/reviews?p=${n}`):""}
    `:L({icon:"star",title:a("adm.revEmpty"),text:a("adm.revEmptyHint")})}`}function gd(t){var s;let e=t.type==="question";return r`
    <article class="card rev-card" data-id="${t.id}">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          ${t.productImage?r`<img class="rev-thumb" src="${h(t.productImage)}" alt="" loading="lazy" data-h="46px" data-w="46px">`:r`<span class="rev-thumb ph" data-h="46px" data-w="46px">${c("box")}</span>`}
          <div>
            <a class="b" href="#/product/${t.productId}">${h(t.productName||t.productId)}</a>
            <div class="tiny muted">${h(t.userName||"")} · ${t.userBadge==="buyer"?a("rev.buyer"):a("rev.visitor")} · ${O(t.createdAt)}</div>
          </div>
        </div>
        <div class="row row-wrap">
          ${e?r`<span class="badge-pill bp-info">${a("common.question")}</span>`:r`<span class="rate-row">${Ht(t.rating||0)}</span>`}
          ${fd(t.status)}
        </div>
      </div>
      ${t.title?r`<h3 class="rev-title">${h(t.title)}</h3>`:""}
      <p class="rev-body">${h(t.body||"")}</p>
      ${t.reply?r`
        <div class="rev-reply">
          <span class="tiny muted">${c("send")} ${a("rev.shopReply")}</span>
          <p>${h(t.reply)}</p>
        </div>`:""}
      <div class="row row-wrap mt-s">
        ${t.status!=="approved"?r`<button class="btn btn-success btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="approved">${c("check")} ${a("adm.revApprove")}</button>`:""}
        ${t.status!=="rejected"?r`<button class="btn btn-outline btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="rejected">${c("close")} ${a("adm.revReject")}</button>`:""}
        ${t.status!=="pending"?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="pending">${c("refresh")} ${a("adm.revPending")}</button>`:""}
        ${Q("reviews.reply")?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-reply" data-id="${t.id}">${c("send")} ${a("adm.revReply")}</button>`:""}
        <a class="btn btn-ghost btn-xs" href="#/product/${t.productId}" target="_blank" rel="noopener">${c("external")}</a>
        <button class="btn btn-ghost btn-xs" data-act="adm-rev-del" data-id="${t.id}" data-name="${h(t.title||((s=t.body)==null?void 0:s.slice(0,30))||"")}">${c("trash")}</button>
      </div>
    </article>`}function fd(t){let e={pending:["bp-warn",a("adm.revPending")],approved:["bp-success",a("adm.revApproved")],rejected:["bp-danger",a("adm.revRejected")]},[s,n]=e[t]||["bp-muted",t];return r`<span class="badge-pill ${s}">${n}</span>`}function vd(t){return N(t),null}var ee,Qn,Ds,la,Ur=V(()=>{U();G();Z();K();dt();tt();ut();nt();ee={status:"pending",type:"",page:1},Qn=12,Ds=[],la={pending:0,approved:0,rejected:0};y("adm-rev-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);ee.status=String(s.get("status")||""),ee.type=String(s.get("type")||""),ee.page=1,T(!0)});y("adm-rev-status",async(t,e)=>{try{await f.patch(`/api/admin/reviews/${e.dataset.id}`,{status:e.dataset.status}),E(a("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-rev-reply",async(t,e)=>{var o;let s=Ds.find(i=>i.id===e.dataset.id),n=await de({title:a("adm.revReply"),text:((o=s==null?void 0:s.body)==null?void 0:o.slice(0,140))||"",label:a("rev.shopReply"),value:(s==null?void 0:s.reply)||"",rows:4});if(n!==null)try{await f.patch(`/api/admin/reviews/${e.dataset.id}`,{reply:String(n)}),E(a("misc.saved")),T(!0)}catch(i){S(i)}});y("adm-rev-del",async(t,e)=>{if(await Gt(e.dataset.name||e.dataset.id))try{await f.del(`/api/admin/reviews/${e.dataset.id}`),E(a("misc.deleted")),T(!0)}catch(s){S(s)}})});var Zn={};X(Zn,{mount:()=>Sd,render:()=>yd});async function yd(t){return t.params.section==="support"?kd(t.params.id):t.params.id?wd(t.params.id):$d()}async function $d(){let t=null;try{t=await f.get(f.url("/api/admin/tickets",{status:Jn.status}))}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=t.counts||{};return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("ticket")} ${a("adm.tickets")}</h2>
        <p class="muted small">${ce("\u0628\u0627\u0632","Open")}: ${g(s.open||0)} · ${ce("\u0628\u0633\u062A\u0647","Closed")}: ${g(s.closed||0)} · ${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}: ${g(e.filter(n=>n.unread).length)}</p>
      </div>
      <form class="row" data-act="adm-tk-filter" data-live>
        ${j({label:a("common.status"),name:"status",value:Jn.status,options:[{value:"",label:a("common.all")},{value:"open",label:a("tk.open")},{value:"answered",label:a("tk.answered")},{value:"closed",label:a("tk.closed")}]})}
      </form>
    </div>

    ${lt([{label:a("acc.ticketSubject")},{label:a("acc.ticketCategory")},{label:a("common.priority")},{label:a("common.user")},{label:a("common.messages"),cls:"num"},{label:a("common.status")},{label:a("common.updated"),cls:"num"},{label:"",cls:"num"}],e.map(n=>r`
        <tr class="${n.unread?"row-new":""}">
          <td>
            ${n.unread?r`<span class="dot-new" title="${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}"></span>`:""}
            <a class="b" href="#/admin/tickets/${n.id}">${h(n.subject)}</a>
            <div class="tiny muted mono">${h(n.code)}</div>
            ${n.lastMessage?r`<div class="tiny muted clip">${h(n.lastMessage)}</div>`:""}
          </td>
          <td>${a(`tc.${n.category}`)}</td>
          <td><span class="badge-pill ${Wr[n.priority]||"bp-info"}">${a(`tp.${n.priority}`)}</span></td>
          <td class="tiny">${h(n.userName||"")}<div class="tiny muted mono">${at(n.userPhone||"")}</div></td>
          <td class="num">${g(n.messageCount||0)}</td>
          <td><span class="badge-pill ${_r[n.status]||"bp-muted"}">${a(`tk.${n.status}`)}</span></td>
          <td class="num tiny nowrap">${St(n.updatedAt||n.createdAt)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/tickets/${n.id}">${c("chevron-left")}</a></td>
        </tr>`),{emptyText:a("acc.noTickets")})}`}async function wd(t){var n;let e=null;try{e=(await f.get(`/api/admin/tickets/${t}`)).ticket}catch(o){return(o==null?void 0:o.status)===404?L({icon:"ticket",title:a("acc.noTickets"),action:{href:"#/admin/tickets",label:a("adm.tickets")}}):_({title:(o==null?void 0:o.message)||a("err.generic")})}let s=e.user;return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/tickets">${a("adm.tickets")}</a> <span>/</span> <span class="mono">${h(e.code)}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${c("ticket")} ${h(e.subject)}</h2>
              <p class="muted small mt-s">
                <span class="mono">${h(e.code)}</span> · ${a("acc.ticketCategory")}: ${a(`tc.${e.category}`)} ·
                ${O(e.createdAt)} · ${ce("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","Updated")}: ${St(e.updatedAt||e.createdAt)}
              </p>
            </div>
            <div class="row row-wrap">
              <span class="badge-pill ${_r[e.status]||"bp-muted"}">${a(`tk.${e.status}`)}</span>
              <span class="badge-pill ${Wr[e.priority]||"bp-info"}">${a(`tp.${e.priority}`)}</span>
            </div>
          </div>
        </div>

        <div class="card mt">
          <strong>${c("chat")} ${a("common.messages")} (${g(((n=e.messages)==null?void 0:n.length)||0)})</strong>
          <div class="tk-thread mt">
            ${(e.messages||[]).map(Xn).join("")}
          </div>
          <form class="mt" data-act="adm-tk-reply" data-id="${e.id}">
            <label class="field">
              <span class="label">${a("adm.tkReply")}</span>
              <textarea class="textarea" name="body" rows="3" placeholder="${ce("\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","Write your reply\u2026")}"></textarea>
            </label>
            <div class="row row-wrap mt-s">
              <button class="btn btn-primary" type="submit">${c("send")} ${a("common.send")}</button>
              <select class="select select-sm" name="status">
                <option value="answered">${a("tk.answered")}</option>
                <option value="open">${a("tk.open")}</option>
                <option value="closed">${a("tk.closed")}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("user")} ${h((s==null?void 0:s.name)||e.userName||"")}</strong>
          <div class="mt-s">
            <div class="sum-row"><span>${a("common.phone")}</span><span class="v mono">${at((s==null?void 0:s.phone)||e.userPhone||"")}</span></div>
            ${s!=null&&s.email?r`<div class="sum-row"><span>${a("common.email")}</span><span class="v tiny">${h(s.email)}</span></div>`:""}
            <div class="sum-row"><span>${a("acc.plus")}</span><span class="v">${s!=null&&s.plus?r`<span class="badge-pill bp-accent">${a("common.active")}</span>`:r`<span class="muted">—</span>`}</span></div>
            <div class="sum-row"><span>${a("common.orders")}</span><span class="v">${g((s==null?void 0:s.orders)||0)}</span></div>
          </div>
          ${s?r`<a class="btn btn-ghost btn-sm btn-block mt-s" href="#/admin/users/${s.id}">${c("edit")} ${ce("\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631","Manage user")}</a>`:""}
        </div>

        <div class="card mt">
          <strong>${c("settings")} ${a("adm.tkManage")}</strong>
          <form class="mt-s" data-act="adm-tk-meta" data-id="${e.id}">
            <label class="field"><span class="label">${a("common.priority")}</span>
              <select class="select" name="priority">
                ${["critical","high","normal","low"].map(o=>r`<option value="${o}" ${e.priority===o?"selected":""}>${a(`tp.${o}`)}</option>`)}
              </select>
            </label>
            <button class="btn btn-outline btn-sm btn-block" type="submit">${a("common.save")}</button>
          </form>
          <div class="row row-wrap mt-s">
            ${e.status!=="closed"?r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${e.id}" data-status="closed">${c("check")} ${ce("\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","Close ticket")}</button>`:r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${e.id}" data-status="open">${c("refresh")} ${ce("\u0628\u0627\u0632\u06A9\u0631\u062F\u0646","Reopen")}</button>`}
          </div>
        </div>
      </aside>
    </div>`}function Xn(t){let e=t.from==="staff",s=t.from==="system"?"them sys":e?"me":"them",n=e?t.staffName?`${a("common.support")} \xB7 ${t.staffName}`:a("common.support"):t.name||a("common.user");return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(n)}</strong>
          <span class="tiny muted nowrap">${St(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${h(o)}" alt="${a("common.image")}" loading="lazy" data-act="adm-att-open" data-url="${h(o)}">`)}</div>`:""}
      </div>
    </div>`}async function kd(t){let e=null;try{e=await f.get("/api/admin/support")}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}da=e.items||[];let s=da.find(n=>n.userId===t)||null;return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${a("adm.support")}</h2>
      <span class="badge-pill bp-info">${g(da.reduce((n,o)=>n+(o.unread||0),0))} ${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","unread")}</span>
    </div>

    <div class="sup-grid">
      <div class="card sup-list">
        ${da.length?da.map(n=>{var o,i;return r`
          <a class="sup-item ${s&&s.userId===n.userId?"active":""} ${n.unread?"has-new":""}" href="#/admin/support/${n.userId}">
            <span class="sup-av">${h((n.userName||"?").slice(0,1))}</span>
            <span class="grow">
              <span class="row row-between"><strong class="tiny">${h(n.userName||"")}</strong><span class="tiny muted nowrap">${St((o=n.last)==null?void 0:o.at)}</span></span>
              <span class="tiny muted clip">${h(((i=n.last)==null?void 0:i.body)||"")}</span>
            </span>
            ${n.unread?r`<span class="badge-pill bp-danger">${g(n.unread)}</span>`:""}
          </a>`}).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
      </div>

      <div class="card sup-chat">
        ${s?r`
          <div class="row row-between mb-s">
            <strong>${c("user")} ${h(s.userName)}</strong>
            <span class="tiny muted">${g(s.count||0)} ${a("common.messages")}</span>
          </div>
          <div class="msg-thread sup-thread" data-thread>
            ${(s.messages||[]).map(Xn).join("")}
          </div>
          <form class="row mt-s" data-act="adm-sup-send" data-id="${s.userId}">
            <input class="input grow" name="body" placeholder="${ce("\u067E\u0627\u0633\u062E \u0633\u0631\u06CC\u0639\u2026","Quick reply\u2026")}" autocomplete="off">
            <button class="btn btn-primary" type="submit">${c("send")}</button>
          </form>
        `:L({icon:"chat",title:a("adm.supSelect"),text:a("adm.supSelectHint")})}
      </div>
    </div>`}function Sd(t,e){var s;if(N(t),((s=e==null?void 0:e.params)==null?void 0:s.section)==="support"&&e.params.id){let n=t.querySelector("[data-thread]");n&&(n.scrollTop=n.scrollHeight)}return null}var ce,_r,Wr,Jn,da,to=V(()=>{U();G();Z();K();dt();tt();ut();nt();ce=(t,e)=>q()?t:e,_r={open:"bp-warn",answered:"bp-success",closed:"bp-muted"},Wr={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},Jn={status:""};y("adm-tk-filter",(t,e)=>{t.preventDefault(),Jn.status=String(new FormData(e).get("status")||""),T(!0)});y("adm-att-open",(t,e)=>{t.preventDefault(),He([e.dataset.url],0,a("common.image"))});y("adm-tk-reply",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=String(s.get("body")||"").trim();n.length<1||await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/tickets/${e.dataset.id}`,{body:n,status:s.get("status")||"answered"}),E(a("misc.sent")),T(!0)}catch(o){S(o)}})});y("adm-tk-meta",async(t,e)=>{t.preventDefault();try{await f.patch(`/api/admin/tickets/${e.dataset.id}`,{priority:new FormData(e).get("priority")}),E(a("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-tk-status",async(t,e)=>{try{await f.patch(`/api/admin/tickets/${e.dataset.id}`,{status:e.dataset.status}),E(a("misc.saved")),T(!0)}catch(s){S(s)}});da=[];y("adm-sup-send",async(t,e)=>{var o,i;t.preventDefault();let s=e.querySelector("[name=body]"),n=String(s.value||"").trim();if(n){s.value="";try{await f.post(`/api/admin/support/${e.dataset.id}`,{body:n});let l=(o=e.closest(".sup-chat"))==null?void 0:o.querySelector("[data-thread]");if(l){let d=document.createElement("div");d.innerHTML=Xn({from:"staff",staffName:((i=m.me)==null?void 0:i.name)||"",body:n,at:new Date().toISOString()}).trim(),d.firstElementChild&&l.appendChild(d.firstElementChild),l.scrollTop=l.scrollHeight}let p=da.find(d=>d.userId===e.dataset.id);p&&(p.last={body:n,at:new Date().toISOString(),from:"staff"},p.unread=0),E(a("misc.sent"))}catch(l){S(l),s.value=n}}})});var Vr={};X(Vr,{mount:()=>Td,render:()=>Ed});async function Ed(){var s,n;let t=null;try{t=await f.get(f.url("/api/admin/feedback",{type:Ye.type}))}catch(o){return _({title:(o==null?void 0:o.message)||a("err.generic")})}let e=t.items||[];return Ye.status&&(e=e.filter(o=>o.status===Ye.status)),r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("mail")} ${a("adm.feedback")}</h2>
        <p class="muted small">${g(((s=t.counts)==null?void 0:s.total)||e.length)} ${ma("\u0645\u0648\u0631\u062F","items")} · ${g(((n=t.counts)==null?void 0:n.new)||0)} ${ma("\u062C\u062F\u06CC\u062F","new")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-fb-filter">
      <div class="form-grid">
        ${j({label:a("common.type"),name:"type",value:Ye.type,options:[{value:"",label:a("common.all")},{value:"suggestion",label:a("feedback.suggestion")},{value:"complaint",label:a("feedback.complaint")},{value:"bug",label:a("feedback.bug")}]})}
        ${j({label:a("common.status"),name:"status",value:Ye.status,options:[{value:"",label:a("common.all")},...Object.entries(eo).map(([o,[,i]])=>({value:o,label:i()}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
      </div>
    </form>

    ${e.length?r`<div class="rev-list">${e.map(qd).join("")}</div>`:L({icon:"mail",title:a("common.noData"),text:a("adm.fbEmptyHint")})}`}function qd(t){var o;let e=xd[t.type]||{icon:"mail",cls:"bp-muted"},[s,n]=eo[t.status]||["bp-muted",()=>t.status];return r`
    <article class="card rev-card">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          <span class="fb-ic ${e.cls}">${c(e.icon)}</span>
          <div>
            <strong>${h(t.title||"")}</strong>
            <div class="tiny muted">
              ${a(`feedback.${t.type}`)} · ${h(t.userName||ma("\u0645\u0647\u0645\u0627\u0646","Guest"))} · ${St(t.createdAt)}
              ${t.contact?` \xB7 ${h(t.contact)}`:""}${t.page?` \xB7 ${h(t.page)}`:""}
            </div>
          </div>
        </div>
        <span class="badge-pill ${s}">${n()}</span>
      </div>
      <p class="rev-body">${h(t.body||"")}</p>
      ${(t.attachments||[]).length?r`
        <div class="row row-wrap mt-s">
          ${t.attachments.map(i=>r`<img class="tk-att" src="${h(i)}" alt="" loading="lazy" data-act="adm-att-open" data-url="${h(i)}">`)}
        </div>`:""}
      ${(o=t.device)!=null&&o.ua?r`<p class="tiny muted mono mt-s clip-wide">${h(t.device.ua)}${t.device.screen?` \xB7 ${h(t.device.screen)}`:""}</p>`:""}
      ${t.answer?r`
        <div class="rev-reply">
          <span class="tiny muted">${c("send")} ${ma("\u067E\u0627\u0633\u062E \u0645\u0627","Our answer")}</span>
          <p>${h(t.answer)}</p>
        </div>`:""}
      <form class="mt-s" data-act="adm-fb-save" data-id="${t.id}">
        <div class="row row-wrap">
          <select class="select select-sm" name="status">
            ${Object.entries(eo).map(([i,[,l]])=>r`<option value="${i}" ${t.status===i?"selected":""}>${l()}</option>`)}
          </select>
          <input class="input grow" name="answer" value="${h(t.answer||"")}" placeholder="${ma("\u067E\u0627\u0633\u062E\u2026","Answer\u2026")}">
          <button class="btn btn-outline btn-sm" type="submit">${c("save")} ${a("common.save")}</button>
        </div>
      </form>
      <div class="tiny muted mt-s">${ma("\u062B\u0628\u062A","Created")}: ${O(t.createdAt)}</div>
    </article>`}function Td(t){return N(t),null}var ma,Ye,xd,eo,Yr=V(()=>{U();G();Z();dt();tt();ut();nt();ma=(t,e)=>q()?t:e,Ye={type:"",status:""},xd={suggestion:{icon:"sparkles",cls:"bp-info"},complaint:{icon:"flag",cls:"bp-warn"},bug:{icon:"bug",cls:"bp-danger"}},eo={new:["bp-info",()=>a("fb.new")],seen:["bp-muted",()=>a("fb.seen")],in_progress:["bp-warn",()=>a("fb.inProgress")],done:["bp-success",()=>a("fb.done")],rejected:["bp-danger",()=>a("fb.rejected")]};y("adm-fb-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Ye.type=String(s.get("type")||""),Ye.status=String(s.get("status")||""),T(!0)});y("adm-fb-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/feedback/${e.dataset.id}`,{status:s.get("status"),answer:String(s.get("answer")||"")}),E(a("misc.saved")),T(!0)}catch(n){S(n)}})})});var Xr={};X(Xr,{mount:()=>Pd,render:()=>Cd});async function Cd(t){return t.params.id?Dd(t.params.id):Ad()}async function Kr(){let t=await f.get(f.url("/api/admin/users",{q:Me.q,role:Me.role}));return ke=t.items||[],Gr=t.permissions||[],t}async function Ad(){let t=await Md(),e=null;try{e=await Kr()}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("users")} ${a("adm.users")}</h2>
        <p class="muted small">${g(ke.length)} ${a("common.users")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Me.q)}" placeholder="${a("common.name")} / ${a("common.username")} / ${a("common.phone")}">
        </label>
        ${j({label:a("adm.uRole"),name:"role",value:Me.role,options:[{value:"",label:a("common.all")},{value:"user",label:a("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${c("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${lt([{label:a("common.user")},{label:a("common.phone")},{label:a("adm.uRole")},{label:a("common.balance"),cls:"num"},{label:a("acc.plus"),cls:"num"},{label:a("common.orders"),cls:"num"},{label:a("adm.uDevice")},{label:a("common.status")},{label:"",cls:"num"}],ke.map(s=>r`
        <tr>
          <td>
            <span class="b">${h(s.name||s.username)}</span>
            <span class="tiny muted mono">@${h(s.username)}</span>
            ${s.twoFA?r`<span class="badge-pill bp-success tiny">${c("shield")}</span>`:""}
          </td>
          <td class="mono tiny nowrap">${at(s.phone||"")}${s.email?r`<div class="tiny muted">${h(s.email)}</div>`:""}</td>
          <td>${Qr(s.role)}</td>
          <td>${Jr(s.kycStatus)}</td>
          <td class="num">${g(s.wallet||0)}</td>
          <td class="num">${s.plus?r`<span class="badge-pill bp-accent">${a("common.active")}</span>`:r`<span class="muted">—</span>`}</td>
          <td class="num">${g(s.orders||0)}<div class="tiny muted">${A(s.spent||0)}</div></td>
          <td class="tiny">${s.lastAgent?r`<span>${s.lastAgent.os} · ${s.lastAgent.device}</span><div class="muted mono tiny">${h(s.lastIp||"")}</div>`:r`<span class="muted">—</span>`}</td>
          <td>${s.banned?r`<span class="badge-pill bp-danger">${a("adm.banned")}</span>`:s.status==="blocked"?r`<span class="badge-pill bp-danger">${a("adm.uBlocked")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td><div class="row row-end">
            ${Q("users.manage")?r`<button class="btn ${s.banned?"btn-success":"btn-danger"} btn-xs" data-act="adm-u-ban-toggle" data-id="${s.id}" data-val="${h(s.phone||s.username)}" data-banned="${s.banned?"1":""}" title="${s.banned?a("adm.unban"):a("adm.ban")}">${c(s.banned?"check":"lock")}</button>`:""}
            ${Q("users.manage")?r`<a class="btn btn-ghost btn-xs" href="#/admin/users/${s.id}">${c("edit")}</a>`:""}
          </div></td>
        </tr>`),{emptyText:a("common.noResult")})}`}function Qr(t){let e={owner:"bp-accent",staff:"bp-info",user:"bp-muted"},s={owner:be("\u0645\u0627\u0644\u06A9","Owner"),staff:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff"),user:a("common.user")}[t]||t;return r`<span class="badge-pill ${e[t]||"bp-muted"}">${s}</span>`}async function Dd(t){var i,l;try{ke.length||await Kr()}catch(p){return _({title:(p==null?void 0:p.message)||a("err.generic")})}let e=ke.find(p=>p.id===t);if(!e)return L({icon:"user",title:a("common.noResult"),action:{href:"#/admin/users",label:a("adm.users")}});let s=e.permissions||{},n=((i=m.me)==null?void 0:i.id)===e.id,o=Q("users.permissions");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${a("adm.users")}</a> <span>/</span> <span>${h(e.name||e.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${c("user")} ${h(e.name||e.username)} <span class="muted mono small">@${h(e.username)}</span></h2>
          <p class="muted small mt-s">
            ${at(e.phone||"")}${e.email?` \xB7 ${h(e.email)}`:""} ·
            ${a("acc.memberSince",{date:O(e.createdAt,{time:!1})})} ·
            ${be("\u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F","Last login")}: ${e.lastLoginAt?O(e.lastLoginAt):a("common.never")} (${g(e.loginCount||0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${Qr(e.role)}
          ${e.status==="blocked"?r`<span class="badge-pill bp-danger">${a("adm.uBlocked")}</span>`:""}
          ${e.plus?r`<span class="badge-pill bp-accent">${a("acc.plus")} ${O(e.plusUntil,{time:!1})}</span>`:""}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${g(e.wallet||0)}</div><div class="stat-lbl">${a("common.balance")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${g(e.points||0)}</div><div class="stat-lbl">${a("common.points")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${g(e.orders||0)}</div><div class="stat-lbl">${a("common.orders")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("card")}</span><div><div class="stat-val">${A(e.spent||0)}</div><div class="stat-lbl">${be("\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F","Total spent")}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${e.kycStatus&&e.kycStatus!=="none"?r`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${c("shield-check")} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${Jr(e.kycStatus)}</p>
        ${e.kycDocs?r`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${e.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${e.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${e.kycDocs.formDoc}</a>
            </div>
          </div>
        `:""}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${e.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${e.kycStatus==="pending"?"selected":""}>در انتظار</option>
            <option value="approved" ${e.kycStatus==="approved"?"selected":""}>تأیید شده</option>
            <option value="rejected" ${e.kycStatus==="rejected"?"selected":""}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${h(e.kycMessage||"")}">
          <button class="btn primary" type="submit">${c("save")} ذخیره وضعیت KYC</button>
        </form>
      </div>
    `:""}

    <form class="card mt" data-act="adm-u-save" data-id="${e.id}">
      <div class="form-grid">
        ${j({label:a("adm.uRole"),name:"role",value:e.role,options:[{value:"user",label:a("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},...o&&(((l=m.me)==null?void 0:l.role)==="owner"||e.role!=="owner")?[{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]:[]]})}
        ${j({label:a("adm.uStatus"),name:"status",value:e.status||"active",options:[{value:"active",label:a("common.active")},{value:"blocked",label:a("adm.uBlocked")}]})}
        ${x({label:a("common.points"),name:"points",type:"number",value:e.points||0,attrs:'min="0" max="1000000"'})}
      </div>

      ${o?r`
        <div class="row row-between row-wrap mt">
          <strong>${c("key")} ${a("adm.uPerms")}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${a("adm.uAll")}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${a("adm.uNone")}</button>
          </div>
        </div>
        <p class="hint">${a("adm.uPermsHint")}</p>
        <div class="perm-grid mt-s">
          ${Gr.map(p=>r`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${p.key}" ${s[p.key]?"checked":""}><span class="track"></span></span>
              <span class="grow">${h(q()?p.fa:p.en||p.fa)}<span class="k mono">${p.key}</span></span>
            </label>`)}
        </div>`:""}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/users">${a("common.back")}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${Q("wallet.manage")?r`
      <form class="card" data-act="adm-u-wallet" data-id="${e.id}">
        <strong>${c("wallet")} ${a("adm.uWalletAdjust")}</strong>
        <p class="muted small mt-s">${a("common.balance")}: ${A(e.wallet||0)}</p>
        ${x({label:a("common.amount"),name:"walletAdjust",type:"number",value:"",attrs:'min="-50000000" max="50000000" step="10000"',placeholder:"\xB1"})}
        ${x({label:a("adm.uWalletReason"),name:"walletReason",value:""})}
        <button class="btn btn-outline" type="submit">${a("common.apply")}</button>
      </form>`:""}

      ${Q("plus.manage")?r`
      <form class="card" data-act="adm-u-plus" data-id="${e.id}">
        <strong>${c("sparkles")} ${a("adm.uPlusDays")}</strong>
        <p class="muted small mt-s">${e.plus?`${a("acc.plusActive",{date:O(e.plusUntil,{time:!1})})}`:a("acc.plusInactive")}</p>
        ${x({label:a("common.day"),name:"plusDays",type:"number",value:"30",attrs:'min="-365" max="365"'})}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${a("common.apply")}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${e.id}">${a("common.disabled")}</button>
        </div>
      </form>`:""}

      ${Q("users.manage")&&!n?r`
      <form class="card" data-act="adm-u-pass" data-id="${e.id}">
        <strong>${c("key")} ${a("adm.uResetPass")}</strong>
        <p class="muted small mt-s">${be("\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u060C \u06A9\u0627\u0631\u0628\u0631 \u0628\u0627\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u0634\u0648\u062F \u0648 \u0631\u0645\u0632 \u0631\u0627 \u0639\u0648\u0636 \u06A9\u0646\u062F.","The user must sign in again and change the password.")}</p>
        ${x({label:a("auth.newPassword"),name:"resetPassword",type:"text",value:"",hint:a("auth.passwordRules")})}
        <button class="btn btn-danger" type="submit">${a("common.reset")}</button>
      </form>`:""}
    </div>`}function Pd(t){return N(t),null}async function Md(){var e;if(!Q("users.manage"))return"";let t={items:[]};try{t=await f.get("/api/admin/bans")}catch(s){return""}return r`
    <div class="card mb">
      <strong>${c("lock")} ${a("adm.bans")}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${j({label:a("adm.banType"),name:"type",options:[{value:"ip",label:"IP"},{value:"phone",label:a("contact.mobile")},{value:"email",label:a("common.email")},{value:"username",label:a("common.username")}]})}
        ${x({label:a("adm.banValue"),name:"value",required:!0})}
        ${x({label:a("adm.banReason"),name:"reason"})}
        ${x({label:a("adm.banMinutes"),name:"minutes",type:"number",value:"0",attrs:'min="0" max="525600" inputmode="numeric"'})}
        <button class="btn btn-danger" type="submit">${c("lock")} ${a("adm.ban")}</button>
      </form>
      ${(e=t.items)!=null&&e.length?r`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${a("adm.banType")}</th><th>${a("adm.banValue")}</th><th>${a("adm.banReason")}</th><th>${a("common.date")}</th><th></th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny">${s.type}${s.auto?r` <span class="badge-pill bp-warn tiny">${a("adm.banAuto")}</span>`:""}</td><td class="mono tiny">${h(s.value)}</td><td class="tiny muted">${h(s.reason||"")}</td><td class="tiny">${O(s.at)}${s.until?r`<br><span class="muted">${a("adm.banUntil")}: ${O(s.until)}</span>`:""}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${s.id}">${c("check")} ${a("adm.unban")}</button></td>
        </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${a("adm.bansEmpty")}</p>`}
    </div>`}function Jr(t){return t==="approved"?r`<span class="${N("badge-pill bp-success")}">تأیید شده</span>`:t==="pending"?r`<span class="${N("badge-pill bp-warning")}">در انتظار</span>`:t==="rejected"?r`<span class="${N("badge-pill bp-danger")}">رد شده</span>`:r`<span class="${N("muted")}">—</span>`}var Me,Gr,ke,be,Zr=V(()=>{U();G();Z();K();dt();tt();ut();nt();Me={q:"",role:""},Gr=[],ke=[];be=(t,e)=>q()?t:e;y("adm-u-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Me.q=String(s.get("q")||"").trim(),Me.role=String(s.get("role")||""),T(!0)});y("adm-u-clear",()=>{Me.q="",Me.role="",T(!0)});y("adm-perm-all",(t,e)=>{let s=e.dataset.v==="1";e.closest("form").querySelectorAll('input[name^="perm."]').forEach(n=>{n.checked=s})});y("adm-u-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n={role:s.get("role"),status:s.get("status"),points:Number(s.get("points")||0)},o={},i=!1;e.querySelectorAll('input[name^="perm."]').forEach(l=>{o[l.name.slice(5)]=l.checked,i=!0}),i&&(n.permissions=o),await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${e.dataset.id}`,n),E(a("adm.uSaved")),ke=[],T(!0)}catch(l){S(l)}})});y("adm-u-wallet",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Number(s.get("walletAdjust")||0);n&&await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${e.dataset.id}`,{walletAdjust:n,walletReason:s.get("walletReason")||"\u062A\u0646\u0638\u06CC\u0645 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631"}),E(a("adm.uSaved")),ke=[],T(!0)}catch(o){S(o)}})});y("adm-u-plus",async(t,e)=>{t.preventDefault();let s=Number(new FormData(e).get("plusDays")||0);s&&await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${e.dataset.id}`,{plusDays:s}),E(a("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}})});y("adm-u-plus-off",async(t,e)=>{if(await wt({text:be("\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u0648\u062F\u061F","Disable Plus for this user?")}))try{await f.patch(`/api/admin/users/${e.dataset.id}`,{plusDays:-365}),E(a("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}});y("adm-u-pass",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("resetPassword")||"");if(s.length<8){S({code:"weak_password",message:a("auth.passwordRules")});return}await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${e.dataset.id}`,{resetPassword:s}),E(a("adm.uSaved")),e.reset()}catch(n){S(n)}})});y("adm-ban-add",async(t,e)=>{var s,n;t.preventDefault();try{await f.post("/api/admin/bans",{type:e.type.value,value:e.value.value,reason:((s=e.reason)==null?void 0:s.value)||"",minutes:Number((n=e.minutes)==null?void 0:n.value)||0}),E(a("adm.banDone")),T(!0)}catch(o){S(o)}});y("adm-ban-del",async(t,e)=>{await D(e,async()=>{try{await f.del(`/api/admin/bans/${e.dataset.id}`),E(a("adm.unbanDone")),T(!0)}catch(s){S(s)}})});y("adm-u-ban-toggle",async(t,e)=>{if(e.dataset.banned==="1"){let i=((await f.get("/api/admin/bans")).items||[]).find(l=>l.value===String(e.dataset.val||"").toLowerCase());if(!i){toastError(a("err.generic"));return}try{await f.del(`/api/admin/bans/${i.id}`),E(a("adm.unbanDone")),T(!0)}catch(l){S(l)}return}let n=/^09\d{9}$/.test(e.dataset.val||"")?"phone":(e.dataset.val||"").includes("@")?"email":"username";try{await f.post("/api/admin/bans",{type:n,value:e.dataset.val,reason:a("adm.banByAdmin")}),E(a("adm.banDone")),T(!0)}catch(o){S(o)}})});var Ha={};X(Ha,{mount:()=>Fd,render:()=>Ld});async function Ld(t){let e=t.params.section;return e==="stats"?Rd():e==="visitors"?Od():e==="data"?Hd():Nd()}async function Nd(){let t=null;try{t=await f.get(f.url("/api/admin/audit",{q:Wt.q,action:Wt.action,page:Wt.page,limit:Wt.limit}))}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}let e=t.items||[];for(let s of e){let n=String(s.action||"").split(".")[0];n&&!ao.includes(n)&&ao.push(n)}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("history")} ${a("adm.audit")}</h2>
        <p class="muted small">${g(t.total||0)} ${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","events")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-aud-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Wt.q)}" placeholder="${Rt("\u06A9\u0627\u0631\u0628\u0631\u060C \u0631\u0648\u06CC\u062F\u0627\u062F\u060C \u0647\u062F\u0641\u2026","actor, action, target\u2026")}">
        </label>
        ${j({label:a("adm.audAction"),name:"action",value:Wt.action,options:[{value:"",label:a("common.all")},...ao.sort().map(s=>({value:s,label:s}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-aud-clear">${c("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${lt([{label:a("common.date")},{label:a("adm.audActor")},{label:a("adm.audAction")},{label:a("adm.audTarget")},{label:a("adm.audMeta")}],e.map(s=>r`
        <tr>
          <td class="tiny nowrap" title="${O(s.at)}">${St(s.at)}</td>
          <td class="tiny"><span class="b">${h(s.actorName||"")}</span><div class="tiny muted">${h(s.actorRole||"")}</div></td>
          <td><code class="tag mono">${h(s.action||"")}</code></td>
          <td class="tiny mono">${h(s.target||"")}</td>
          <td class="tiny muted clip-wide">${h(Id(s.meta))}</td>
        </tr>`),{emptyText:a("common.noData")})}
    ${t.pages>1?me(t.page,t.pages,s=>`#/admin/audit?p=${s}`):""}`}function Id(t){return!t||typeof t!="object"?"":Object.entries(t).map(([e,s])=>`${e}=${typeof s=="object"?JSON.stringify(s):s}`).join(" \xB7 ").slice(0,160)}async function Rd(){let t=null;try{t=await f.get(f.url("/api/admin/stats",{days:pa.days}))}catch(b){return _({title:(b==null?void 0:b.message)||a("err.generic")})}let e=t.series||[],s=t.summary||{},n=Object.entries(t.byCat||{}).sort((b,u)=>u[1].sold-b[1].sold),o=Object.entries(t.byBrand||{}).sort((b,u)=>u[1]-b[1]).slice(0,12),i=t.missedSearches||[],l=pa.metric,p=e.map(b=>({label:b.date,short:b.date.slice(5),value:l==="revenue"?b.revenue:l==="visits"?b.visits:b.orders})),d=e.reduce((b,u)=>({orders:b.orders+u.orders,revenue:b.revenue+u.revenue,visits:b.visits+u.visits,unique:b.unique+u.unique}),{orders:0,revenue:0,visits:0,unique:0});return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chart")} ${a("adm.stats")}</h2>
      <form class="row row-wrap" data-act="adm-st-filter" data-live>
        <select class="select select-sm" name="days">
          ${[7,30,90].map(b=>r`<option value="${b}" ${pa.days===b?"selected":""}>${g(b)} ${Rt("\u0631\u0648\u0632","days")}</option>`)}
        </select>
        <select class="select select-sm" name="metric">
          <option value="orders" ${l==="orders"?"selected":""}>${a("adm.stOrders")}</option>
          <option value="revenue" ${l==="revenue"?"selected":""}>${a("adm.stRevenue")}</option>
          <option value="visits" ${l==="visits"?"selected":""}>${a("adm.stVisits")}</option>
        </select>
      </form>
    </div>

    <div class="kpi-grid mb">
      ${It({icon:"package-check",label:a("adm.stOrders"),value:g(s.orders||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${g(d.orders)}`})}
      ${It({icon:"wallet",label:a("adm.stRevenue"),value:A(s.revenue||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${A(d.revenue)}`})}
      ${It({icon:"users",label:a("adm.stUsers"),value:g(s.users||0),sub:`${Rt("\u0628\u0627\u0632\u062F\u06CC\u062F \u06CC\u06A9\u062A\u0627","unique visits")}: ${g(d.unique)}`})}
      ${It({icon:"box",label:a("adm.stProducts"),value:g(s.products||0),sub:`${Rt("\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","stock value")}: ${A(s.stockValue||0)}`})}
      ${It({icon:"scale",label:a("adm.stAvg"),value:A(s.avgOrder||0),sub:`${Rt("\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F","average basket")}`})}
      ${It({icon:"eye",label:a("adm.stVisits"),value:g(d.visits),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}`})}
    </div>

    <div class="card">
      <strong>${c("chart")} ${l==="revenue"?a("adm.stRevenue"):l==="visits"?a("adm.stVisits"):a("adm.stOrders")} — ${g(pa.days)} ${Rt("\u0631\u0648\u0632","days")}</strong>
      <div class="mt-s">${us(p,{height:150})}</div>
    </div>

    <div class="cart-grid mt">
      <div class="col card">
        <strong>${c("layers")} ${a("adm.stByCat")}</strong>
        ${lt([{label:a("common.category")},{label:a("common.products"),cls:"num"},{label:a("pdp.sold"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("adm.stRevenue"),cls:"num"}],n.map(([b,u])=>r`
            <tr>
              <td class="b">${h(b)}</td>
              <td class="num">${g(u.products)}</td>
              <td class="num">${g(u.sold)}</td>
              <td class="num">${g(u.stock)}</td>
              <td class="num">${A(u.revenue)}</td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
      <aside class="col card">
        <strong>${c("tag")} ${a("adm.stByBrand")}</strong>
        <div class="mt-s">
          ${o.length?o.map(([b,u])=>{let v=o[0][1]||1;return r`
            <div class="brand-row">
              <span class="tiny">${h(b)}</span>
              <span class="progress"><i data-w="${Math.max(4,Math.round(u/v*100))}%"></i></span>
              <span class="tiny b">${g(u)}</span>
            </div>`}).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
        </div>
      </aside>
    </div>
    
    <div class="card mt">
      <strong>${c("search")} ${q()?"\u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0646\u062A\u06CC\u062C\u0647 (\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F)":"Missed Searches (Not in stock)"}</strong>
      ${i.length?lt([{label:q()?"\u0639\u0628\u0627\u0631\u062A \u062C\u0633\u062A\u062C\u0648 \u0634\u062F\u0647":"Query"},{label:q()?"\u062F\u0641\u0639\u0627\u062A \u062C\u0633\u062A\u062C\u0648":"Count",cls:"num"}],i.map(b=>r`
            <tr>
              <td>${h(b.q)}</td>
              <td class="num"><span class="badge-pill bp-warn">${g(b.count)}</span></td>
            </tr>`)):r`<p class="muted small mt-s">${a("common.empty")}</p>`}
    </div>`}function Hd(){var e;let t=((e=m.me)==null?void 0:e.role)==="owner";return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("download")} ${a("adm.data")}</h2>
        <p class="muted small">${a("adm.dataHint")}</p>
      </div>
    </div>

    <div class="card">
      <strong>${c("file")} ${a("adm.dExport")}</strong>
      <div class="exp-grid mt-s">
        ${Bd.map(s=>r`
          <div class="exp-item">
            <span class="exp-ic">${c(s.icon)}</span>
            <span class="grow b small">${s.label()}</span>
            <span class="act">
              <a class="btn btn-ghost btn-xs" href="${f.url(`/api/admin/export/${s.id}`,{format:"csv"})}" download>${Rt("CSV","CSV")}</a>
              <a class="btn btn-ghost btn-xs" href="/api/admin/export/${s.id}" download>JSON</a>
            </span>
          </div>`).join("")}
      </div>
    </div>

    <div class="dev-grid mt">
      <div class="card">
        <strong>${c("save")} ${a("adm.dBackup")}</strong>
        <p class="muted small mt-s">${a("adm.dBackupHint")}</p>
        ${t?r`<button class="btn btn-primary btn-sm mt-s" data-act="adm-d-backup">${c("save")} ${a("adm.dBackup")}</button>`:r`<p class="notice notice-warn mt-s">${c("lock")}<span>${Rt("\u0641\u0642\u0637 \u0645\u0627\u0644\u06A9 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0628\u06AF\u06CC\u0631\u062F.","Only the owner can create backups.")}</span></p>`}
      </div>
      <div class="card">
        <strong>${c("refresh")} ${a("adm.dCleanup")}</strong>
        <p class="muted small mt-s">${a("adm.dCleanupHint")}</p>
        <button class="btn btn-outline btn-sm mt-s" data-act="adm-d-cleanup">${c("trash")} ${a("adm.dCleanup")}</button>
      </div>
    </div>`}function Fd(t,e){var s;if(N(t),((s=e==null?void 0:e.params)==null?void 0:s.section)==="audit"){let n=new URLSearchParams(location.hash.split("?")[1]||""),o=Number(n.get("p")||0);o&&o!==Wt.page&&(Wt.page=o,T(!0))}return null}async function Od(){var e;let t={items:[],total:0};try{t=await f.get(f.url("/api/admin/visitors",{q:so.q||""}))}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("users")} ${a("adm.visitors")} <span class="muted small">(${g(t.total||0)})</span></h2>
      <form class="row" data-act="adm-vis-filter">
        <input class="input" name="q" value="${h(so.q||"")}" placeholder="${a("common.search")}">
        <button class="btn btn-ghost" type="submit">${c("search")}</button>
      </form>
    </div>
    <div class="card">
      ${(e=t.items)!=null&&e.length?r`<div class="table-wrap"><table class="table">
        <thead><tr><th>${a("common.date")}</th><th>IP</th><th>${a("adm.uDevice")}</th><th>${a("adm.uBrowser")}</th><th>${a("adm.uRegion")}</th><th>${a("adm.uPath")}</th><th>${a("common.user")}</th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny nowrap">${O(s.at)}</td>
          <td class="mono tiny">${h(s.ip||"")}</td>
          <td class="tiny">${h(s.os||"")} · ${h(s.device||"")}${s.screen?r`<div class="muted tiny">${h(s.screen)}</div>`:""}</div></td>
          <td class="tiny">${h(s.browser||"")}</td>
          <td class="tiny">${h(s.tz||"")}<div class="muted tiny">${h(s.lang||"")}</div></td>
          <td class="mono tiny">${h(s.path||"/")}</td>
          <td class="tiny">${s.userId?r`<a href="#/admin/users/${s.userId}">${c("user")}</a>`:r`<span class="muted">${a("adm.guest")}</span>`}</td>
        </tr>`)}</tbody></table></div>`:L({icon:"users",title:a("common.noResult")})}
    </div>`}var Rt,Wt,pa,ao,Bd,so,Fa=V(()=>{U();G();Z();K();dt();tt();ut();nt();Rt=(t,e)=>q()?t:e,Wt={q:"",action:"",page:1,limit:50},pa={days:30,metric:"orders"},ao=[];y("adm-aud-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Wt.q=String(s.get("q")||"").trim(),Wt.action=String(s.get("action")||""),Wt.page=1,T(!0)});y("adm-aud-clear",()=>{Wt.q="",Wt.action="",Wt.page=1,T(!0)});y("adm-st-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);pa.days=Number(s.get("days")||30),pa.metric=String(s.get("metric")||"orders"),T(!0)});Bd=[{id:"products",icon:"box",label:()=>a("common.products")},{id:"orders",icon:"package-check",label:()=>a("common.orders")},{id:"users",icon:"users",label:()=>a("common.users")},{id:"reviews",icon:"star",label:()=>a("adm.reviews")},{id:"tickets",icon:"ticket",label:()=>a("adm.tickets")},{id:"audit",icon:"history",label:()=>a("adm.audit")},{id:"all",icon:"download",label:()=>Rt("\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","Everything")}];y("adm-d-backup",async(t,e)=>{await D(e,async()=>{try{let s=await f.post("/api/admin/backup",{});E(`${a("adm.dBackup")}: ${s.file} (${g(s.sizeKb||0)} KB)`)}catch(s){S(s)}})});y("adm-d-cleanup",async(t,e)=>{await wt({text:Rt("\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","Remove audit entries older than 90 days and expired sessions?"),danger:!0})&&await D(e,async()=>{try{let n=await f.post("/api/admin/maintenance/cleanup",{});E(`${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","audit")}: ${g(n.auditRemoved||0)} \xB7 ${Rt("\u0646\u0634\u0633\u062A","sessions")}: ${g(n.sessionsRemoved||0)}`)}catch(n){S(n)}})});so={q:""};y("adm-vis-filter",(t,e)=>{t.preventDefault(),so.q=e.q.value,T(!0)})});var ba={};X(ba,{mount:()=>Wd,render:()=>jd});async function jd(t){let e=t.params.section;return e==="ads"?Ud():e==="notifications"?_d():e==="telegram"?Vd():e==="lottery"?Yd():zd()}async function zd(){try{ua=(await f.get("/api/admin/coupons")).items||[]}catch(e){return _({title:(e==null?void 0:e.message)||a("err.generic")})}let t=ua.filter(e=>e.active!==!1&&new Date(e.endAt)>new Date).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("percent")} ${a("adm.coupons")}</h2>
        <p class="muted small">${g(ua.length)} ${ht("\u06A9\u062F","codes")} · ${g(t)} ${ht("\u0641\u0639\u0627\u0644","active")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${c("plus")} ${a("common.add")}</button>
    </div>

    ${lt([{label:a("cart.coupon")},{label:a("common.type")},{label:a("adm.cpValue"),cls:"num"},{label:a("adm.cpUsage"),cls:"num"},{label:a("adm.cpDates")},{label:a("common.status")},{label:"",cls:"num"}],ua.map(e=>{let s=new Date(e.endAt)<new Date;return r`
        <tr>
          <td><span class="mono b">${h(e.code)}</span>${e.note?r`<div class="tiny muted">${h(e.note)}</div>`:""}</td>
          <td>${e.type==="percent"?a("adm.cpPercent"):a("adm.cpAmount")}</td>
          <td class="num">${e.type==="percent"?`${g(e.value)}\u066A`:A(e.value)}
            ${e.maxDiscount?r`<div class="tiny muted">${ht("\u0633\u0642\u0641","max")} ${A(e.maxDiscount)}</div>`:""}
            ${e.minOrder?r`<div class="tiny muted">${ht("\u062D\u062F\u0627\u0642\u0644 \u0633\u0641\u0627\u0631\u0634","min order")} ${A(e.minOrder)}</div>`:""}</td>
          <td class="num">${g(e.used||0)} / ${g(e.usageLimit||0)}<div class="tiny muted">${ht("\u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","per user")}: ${g(e.perUser||1)}</div></td>
          <td class="tiny nowrap">${O(e.startAt,{time:!1})}<div class="tiny muted">${O(e.endAt,{time:!1})}</div></td>
          <td>${s?r`<span class="badge-pill bp-muted">${a("adm.cpExpired")}</span>`:e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${e.id}" title="${a("common.active")}">${c(e.active===!1?"eye-off":"eye")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${e.id}">${c("edit")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${h(e.code)}">${c("copy")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${e.id}" data-name="${h(e.code)}">${c("trash")}</button>
            </div>
          </td>
        </tr>`}),{emptyText:a("common.noData")})}`}function tc(t){var e,s,n,o,i;return pt({title:t?a("common.edit"):a("adm.cpNew"),body:r`
      <form class="form-grid" data-act="adm-cp-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${x({label:a("cart.coupon"),name:"code",required:!t,value:(t==null?void 0:t.code)||"",attrs:t?"readonly":"",hint:ht("\u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0648 \u0639\u062F\u062F","Uppercase letters and digits")})}
        ${j({label:a("common.type"),name:"type",value:(t==null?void 0:t.type)||"percent",options:[{value:"percent",label:a("adm.cpPercent")},{value:"amount",label:a("adm.cpAmount")}]})}
        ${x({label:a("adm.cpValue"),name:"value",type:"number",required:!0,value:(e=t==null?void 0:t.value)!=null?e:10,attrs:'min="1" max="100000000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","Max discount"),name:"maxDiscount",type:"number",value:(s=t==null?void 0:t.maxDiscount)!=null?s:0,attrs:'min="0" max="100000000"'})}
        ${x({label:ht("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),name:"minOrder",type:"number",value:(n=t==null?void 0:t.minOrder)!=null?n:0,attrs:'min="0" max="100000000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u0654 \u06A9\u0644","Total usage limit"),name:"usageLimit",type:"number",value:(o=t==null?void 0:t.usageLimit)!=null?o:100,attrs:'min="1" max="100000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","Per user"),name:"perUser",type:"number",value:(i=t==null?void 0:t.perUser)!=null?i:1,attrs:'min="1" max="100"'})}
        ${x({label:a("adm.cpStart"),name:"startAt",type:"datetime-local",value:Ms(t==null?void 0:t.startAt)})}
        ${x({label:a("adm.cpEnd"),name:"endAt",type:"datetime-local",value:Ms(t==null?void 0:t.endAt)})}
        <div class="span-2">${x({label:a("common.note"),name:"note",value:(t==null?void 0:t.note)||""})}</div>
        <div class="span-2">${yt({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}function Ms(t){if(!t)return"";let e=new Date(t);if(Number.isNaN(e.getTime()))return"";let s=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())}T${s(e.getHours())}:${s(e.getMinutes())}`}async function Ud(){try{let t=await f.get("/api/admin/ads");Ps=t.items||[],Oa=t.slots||[]}catch(t){return _({title:(t==null?void 0:t.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("image")} ${a("adm.ads")}</h2>
        <p class="muted small">${a("adm.adsHint")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${c("plus")} ${a("common.add")}</button>
    </div>

    ${Oa.length?Oa.map(t=>{let e=Ps.filter(s=>s.slot===t.id);return r`
      <div class="card mb">
        <div class="row row-between">
          <strong>${c("pin")} ${h(q()?t.fa:t.en||t.fa)}</strong>
          <span class="badge-pill bp-muted">${g(e.length)}</span>
        </div>
        ${e.length?r`
          <div class="ad-rows mt-s">
            ${e.map(s=>r`
              <div class="ad-row ${s.active===!1?"off":""}">
                ${s.image?r`<img class="ad-img" src="${h(s.image)}" alt="" loading="lazy" data-h="54px" data-w="88px">`:r`<span class="ad-img ph" data-h="54px" data-w="88px">${c("image")}</span>`}
                <div class="grow">
                  <span class="b">${h(q()?s.title:s.titleEn||s.title)}</span>
                  <span class="tiny muted">${h(q()?s.text||"":s.textEn||s.text||"")}</span>
                  <span class="tiny muted nowrap">${ht("\u0627\u0632","From")} ${O(s.startAt,{time:!1})} ${ht("\u062A\u0627","to")} ${O(s.endAt,{time:!1})}${s.link?` \xB7 ${h(s.link)}`:""}</span>
                </div>
                <div class="act">
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-toggle" data-id="${s.id}">${c(s.active===!1?"eye-off":"eye")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-edit" data-id="${s.id}">${c("edit")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-del" data-id="${s.id}" data-name="${h(s.title)}">${c("trash")}</button>
                </div>
              </div>`).join("")}
          </div>`:r`<p class="muted small mt-s">${a("common.noData")}</p>`}
      </div>`}).join(""):L({icon:"image",title:a("common.noData")})}`}function ec(t){var e;return pt({title:t?a("common.edit"):a("adm.adNew"),body:r`
      <form class="form-grid" data-act="adm-ad-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        <div class="span-2">${j({label:a("adm.adSlot"),name:"slot",value:(t==null?void 0:t.slot)||((e=Oa[0])==null?void 0:e.id)||"home_hero",options:Oa.map(s=>({value:s.id,label:q()?s.fa:s.en||s.fa}))})}</div>
        ${x({label:a("common.title"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${x({label:ht("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:(t==null?void 0:t.titleEn)||""})}
        <div class="span-2">${J({label:a("common.text"),name:"text",value:(t==null?void 0:t.text)||"",rows:2})}</div>
        <div class="span-2">${J({label:ht("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"textEn",value:(t==null?void 0:t.textEn)||"",rows:2})}</div>
        ${x({label:a("common.link"),name:"link",value:(t==null?void 0:t.link)||"",hint:"#/products?cat=cases"})}
        ${x({label:a("common.image"),name:"image",value:(t==null?void 0:t.image)||"",hint:"/assets/\u2026"})}
        ${x({label:ht("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","CTA label"),name:"cta",value:(t==null?void 0:t.cta)||""})}
        ${x({label:ht("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","CTA (EN)"),name:"ctaEn",value:(t==null?void 0:t.ctaEn)||""})}
        ${x({label:ht("\u0634\u0631\u0648\u0639","Start"),name:"startAt",type:"datetime-local",value:Ms(t==null?void 0:t.startAt)})}
        ${x({label:ht("\u067E\u0627\u06CC\u0627\u0646","End"),name:"endAt",type:"datetime-local",value:Ms(t==null?void 0:t.endAt)})}
        <div class="span-2">${yt({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}async function _d(){let t=null;try{t=await f.get("/api/admin/notifications")}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=t.outbox||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("bell")} ${a("adm.notifications")}</h2>
        <p class="muted small">${a("adm.notifHint")}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${c("send")} ${a("adm.notifNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:a("common.title"),name:"title",required:!0,attrs:'maxlength="120"'})}
            ${x({label:ht("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",attrs:'maxlength="120"'})}
            <div class="span-2">${J({label:a("common.text"),name:"body",rows:3,attrs:'maxlength="600"'})}</div>
            <div class="span-2">${J({label:ht("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"bodyEn",rows:2})}</div>
            ${j({label:a("adm.notifLevel"),name:"level",value:"info",options:[{value:"info",label:a("notif.level.info")},{value:"success",label:a("notif.level.success")},{value:"warning",label:a("notif.level.warning")},{value:"error",label:a("notif.level.error")}]})}
            ${j({label:a("common.type"),name:"type",value:"announcement",options:[{value:"announcement",label:a("notif.type.announcement")},{value:"news",label:a("notif.type.news")},{value:"offer",label:a("notif.type.offer")},{value:"system",label:a("notif.type.system")}]})}
            ${x({label:a("common.link"),name:"link",hint:"#/products"})}
            ${x({label:ht("\u0634\u0646\u0627\u0633\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631 (\u062E\u0627\u0644\u06CC = \u0647\u0645\u0647)","User id (empty = everyone)"),name:"userId"})}
            <div class="span-2">
              <span class="label">${a("adm.channels")}</span>
              <div class="row row-wrap mt-s">
                <label class="check"><input type="checkbox" name="ch_site" checked><span class="box">${c("check")}</span><span>${a("adm.chSite")}</span></label>
                <label class="check"><input type="checkbox" name="ch_telegram"><span class="box">${c("check")}</span><span>${a("adm.chTelegram")}</span></label>
                <label class="check"><input type="checkbox" name="ch_email"><span class="box">${c("check")}</span><span>${a("adm.chEmail")}</span></label>
                <label class="check"><input type="checkbox" name="ch_sms"><span class="box">${c("check")}</span><span>${a("adm.chSms")}</span></label>
              </div>
              <p class="hint">${a("adm.channelsHint")}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("send")} ${a("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("history")} ${a("adm.notifRecent")} (${g(e.length)})</strong>
          <div class="notif-list mt-s">
            ${e.length?e.slice(0,40).map(n=>r`
              <div class="notif-item lv-${h(n.level||"info")}">
                <div class="row row-between">
                  <strong class="tiny">${h(q()?n.title:n.titleEn||n.title)}</strong>
                  <span class="tiny muted nowrap">${St(n.createdAt)}</span>
                </div>
                ${n.body?r`<p class="tiny muted">${h(q()?n.body:n.bodyEn||n.body)}</p>`:""}
                <span class="tiny muted mono">${n.userId?h(n.userId):ht("\u0647\u0645\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","All users")}${n.link?` \xB7 ${h(n.link)}`:""}</span>
              </div>`).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
          </div>
        </div>
        ${s.length?r`
        <div class="card mt">
          <strong>${c("mail")} ${ht("\u0635\u0641 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9/\u0627\u06CC\u0645\u06CC\u0644","SMS / email outbox")} (${g(s.length)})</strong>
          <div class="mt-s">
            ${s.map(n=>r`<div class="sum-row"><span class="tiny mono">${h(n.to||n.target||"")}</span><span class="v tiny">${h(String(n.body||n.text||"").slice(0,60))}</span></div>`).join("")}
          </div>
        </div>`:""}
      </aside>
    </div>`}function Wd(t){return N(t),null}async function Vd(){var e,s;let t=null;try{t=await f.get("/api/admin/telegram")}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-tg-save">
          <strong>${c("send")} ${a("adm.telegram")}</strong>
          <p class="muted small mt-s">${a("adm.tgHint")}</p>
          <div class="form-grid mt-s">
            <div class="span-2">${yt({label:a("adm.tgEnabled"),name:"enabled",checked:!!t.enabled})}</div>
            <div class="span-2">${x({label:a("adm.tgToken"),name:"token",hint:a("adm.tgTokenHint"),type:"password"})}</div>
            <div class="span-2">${J({label:a("adm.tgWelcome"),name:"welcome",rows:2,value:t.welcome||""})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("check")} ${a("common.save")}</button>
        </form>
        <form class="card mt" data-act="adm-tg-test">
          <strong>${c("zap")} ${a("adm.tgTest")}</strong>
          <div class="row mt-s">
            <input class="input" name="chatId" placeholder="chat id" required>
            <button class="btn btn-ghost" type="submit">${a("common.send")}</button>
          </div>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("chat")} ${a("adm.tgInbox")} (${g(((e=t.inbox)==null?void 0:e.length)||0)}) · ${a("adm.tgSubs")}: ${g(t.subs||0)}</strong>
          ${t.enabled?r`
            <p class="tiny muted mt-s">
              ${ht("\u0648\u0636\u0639\u06CC\u062A \u0627\u062A\u0635\u0627\u0644 \u0631\u0628\u0627\u062A:","bot link:")}
              ${t.lastError?r`<span class="c-danger">${ht("\u062E\u0637\u0627","error")}: ${h(String(t.lastError).slice(0,120))}</span>`:r`<span class="c-success">${ht("\u0633\u0627\u0644\u0645","healthy")}</span>`}
              · ${ht("\u062D\u0627\u0644\u062A \u0627\u062A\u0635\u0627\u0644:","mode:")} ${(s=t.webhook)!=null&&s.ok?ht("\u0648\u0628\u200C\u0647\u0648\u06A9 \u2714","webhook \u2714"):ht("\u067E\u0648\u0644\u06CC\u0646\u06AF","polling")}
              ${t.lastPoll?`\xB7 ${ht("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0631\u0631\u0633\u06CC:","last poll:")} ${St(t.lastPoll)}`:""}
            </p>`:""}
          <div class="notif-list mt-s">
            ${(t.inbox||[]).slice(0,30).map(n=>r`
              <div class="notif-item lv-info">
                <div class="row row-between"><strong class="tiny">${h(n.name)}</strong><span class="tiny muted">${St(n.at)}</span></div>
                <p class="tiny mt-s">${h(n.text)}</p>
                <form class="row mt-s" data-act="adm-tg-reply" data-chat="${h(n.chatId)}">
                  <input class="input" name="text" placeholder="${a("adm.tgReplyPh")}" required>
                  <button class="btn btn-ghost btn-sm" type="submit">${c("send")}</button>
                </form>
              </div>`)}
            ${(t.inbox||[]).length?"":r`<p class="muted small">${a("adm.tgInboxEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}async function Yd(){var e;let t=null;try{t=await f.get("/api/admin/lotteries")}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-lot-create">
          <strong>${c("gift2")} ${a("adm.lotteryNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:a("common.title"),name:"title",required:!0})}
            ${x({label:a("adm.lotPrize"),name:"prize",required:!0})}
            ${x({label:a("adm.lotEnds"),name:"endsAt",type:"datetime-local",required:!0})}
            ${x({label:a("adm.lotWinners"),name:"winnersCount",type:"number",value:"1"})}
            <div class="span-2">${j({label:a("adm.lotMode"),name:"entryMode",options:[{value:"orders",label:a("adm.lotModeOrders")},{value:"manual",label:a("adm.lotModeManual")}]})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("plus")} ${a("common.create")}</button>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("gift2")} ${a("adm.lottery")} (${g(((e=t.items)==null?void 0:e.length)||0)})</strong>
          <div class="notif-list mt-s">
            ${(t.items||[]).map(s=>{var n;return r`
              <div class="notif-item lv-${s.status==="drawn"?"success":s.status==="active"?"info":"warning"}">
                <div class="row row-between"><strong class="tiny">${h(s.title)}</strong><span class="tiny muted">${s.status}</span></div>
                <p class="tiny mt-s">${a("adm.lotPrize")}: ${h(s.prize)} · ${a("adm.lotEntries")}: ${g(s.entries||0)} · ${a("adm.lotEnds")}: ${h(s.endsAt||"")}</p>
                ${(n=s.winners)!=null&&n.length?r`<p class="tiny mt-s b">${a("adm.lotWinnersList")}: ${s.winners.map(o=>h(o.name)).join("\u060C ")}</p>`:""}
                ${s.status==="active"?r`<div class="row mt-s">
                  <button class="btn btn-primary btn-sm" data-act="adm-lot-run" data-id="${s.id}">${c("sparkles")} ${a("adm.lotRun")}</button>
                  <button class="btn btn-ghost btn-sm" data-act="adm-lot-close" data-id="${s.id}">${c("close")} ${a("adm.lotClose")}</button>
                </div>`:""}
              </div>`})}
            ${(t.items||[]).length?"":r`<p class="muted small">${a("adm.lotEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}var ht,ua,Ps,Oa,ja,za,ha=V(()=>{U();G();Z();dt();tt();ut();nt();ht=(t,e)=>q()?t:e,ua=[],Ps=[],Oa=[];ja=null;y("adm-cp-new",()=>{ja=tc(null)});y("adm-cp-edit",(t,e)=>{ja=tc(ua.find(s=>s.id===e.dataset.id))});y("adm-cp-toggle",async(t,e)=>{let s=ua.find(n=>n.id===e.dataset.id);if(s)try{await f.patch(`/api/admin/coupons/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-cp-copy",async(t,e)=>{try{await navigator.clipboard.writeText(e.dataset.code),E(a("misc.copied"))}catch(s){E(e.dataset.code)}});y("adm-cp-del",async(t,e)=>{if(await Gt(e.dataset.name))try{await f.del(`/api/admin/coupons/${e.dataset.id}`),E(a("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-cp-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={type:s.get("type"),value:Number(s.get("value")||0),maxDiscount:Number(s.get("maxDiscount")||0),minOrder:Number(s.get("minOrder")||0),usageLimit:Number(s.get("usageLimit")||100),perUser:Number(s.get("perUser")||1),active:s.get("active")==="on",note:s.get("note")||""};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),n&&(o.code=String(s.get("code")||"").toUpperCase()),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/coupons",o):await f.patch(`/api/admin/coupons/${e.dataset.id}`,o),E(a("misc.saved")),ja==null||ja.close(),T(!0)}catch(i){S(i)}})});za=null;y("adm-ad-new",()=>{za=ec(null)});y("adm-ad-edit",(t,e)=>{za=ec(Ps.find(s=>s.id===e.dataset.id))});y("adm-ad-toggle",async(t,e)=>{let s=Ps.find(n=>n.id===e.dataset.id);if(s)try{await f.patch(`/api/admin/ads/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-ad-del",async(t,e)=>{if(await Gt(e.dataset.name))try{await f.del(`/api/admin/ads/${e.dataset.id}`),E(a("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-ad-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={slot:s.get("slot"),title:s.get("title"),titleEn:s.get("titleEn")||"",text:s.get("text")||"",textEn:s.get("textEn")||"",link:s.get("link")||"",image:s.get("image")||"",cta:s.get("cta")||"",ctaEn:s.get("ctaEn")||"",active:s.get("active")==="on"};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/ads",o):await f.patch(`/api/admin/ads/${e.dataset.id}`,o),E(a("misc.saved")),za==null||za.close(),T(!0)}catch(i){S(i)}})});y("adm-notif-send",async(t,e)=>{t.preventDefault();let s=new FormData(e),n={title:String(s.get("title")||"").trim(),titleEn:String(s.get("titleEn")||"").trim(),body:String(s.get("body")||"").trim(),bodyEn:String(s.get("bodyEn")||"").trim(),level:s.get("level"),type:s.get("type"),link:String(s.get("link")||"").trim(),userId:String(s.get("userId")||"").trim(),channels:["site","telegram","email","sms"].filter(o=>s.get(`ch_${o}`))};n.title.length<3||await D(e.querySelector("button[type=submit]"),async()=>{try{let i=(await f.post("/api/admin/notifications",n)).results||{},l=Object.entries(i).map(([p,d])=>{var b;return`${p}: ${d.error?"\u2717":`\u2713${(b=d.ok)!=null?b:""}`}`}).join(" ");E(l?`${a("misc.sent")} \u2014 ${l}`:a("misc.sent"),{timeout:4200}),T(!0)}catch(o){S(o)}})});y("adm-tg-save",async(t,e)=>{var n,o;t.preventDefault();let s={enabled:!!((n=e.enabled)!=null&&n.checked)};(o=e.token)!=null&&o.value&&(s.token=e.token.value),e.welcome!==void 0&&(s.welcome=e.welcome.value),await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/admin/telegram",s),E(a("common.saved")),T(!0)}catch(i){S(i)}})});y("adm-tg-test",async(t,e)=>{t.preventDefault();try{await f.post("/api/admin/telegram/test",{chatId:e.chatId.value}),E(a("misc.sent"))}catch(s){S(s)}});y("adm-tg-reply",async(t,e)=>{t.preventDefault();try{await f.post("/api/admin/telegram/reply",{chatId:e.dataset.chat,text:e.text.value}),E(a("misc.sent")),e.text.value=""}catch(s){S(s)}});y("adm-lot-create",async(t,e)=>{t.preventDefault();let s=new Date(e.endsAt.value).toISOString();await D(e.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/admin/lotteries",{title:e.title.value,prize:e.prize.value,endsAt:s,winnersCount:Number(e.winnersCount.value||1),entryMode:e.entryMode.value}),E(a("common.saved")),T(!0)}catch(n){S(n)}})});y("adm-lot-run",async(t,e)=>{await wt({text:a("adm.lotRunWarn"),danger:!0})&&await D(e,async()=>{var n;try{let o=await f.post(`/api/admin/lotteries/${e.dataset.id}/run`,{});E(`${a("adm.lotDone")}: ${(((n=o.lottery)==null?void 0:n.winners)||[]).map(i=>i.name).join("\u060C ")}`,{timeout:6e3}),T(!0)}catch(o){S(o)}})});y("adm-lot-close",async(t,e)=>{await D(e,async()=>{try{await f.post(`/api/admin/lotteries/${e.dataset.id}/close`,{}),E(a("adm.lotClosed")),T(!0)}catch(s){S(s)}})})});var Ua={};X(Ua,{mount:()=>tm,render:()=>Gd});async function Gd(t){var i,l,p,d;let e=["settings","theme","features"].includes(t.params.section)?t.params.section:"settings",s=ac[e].filter(b=>e==="theme"?Q("theme.edit"):!0);if(!s.length)return L({icon:"lock",title:a("adm.noPermission")});let n=s.find(b=>b.id===t.params.id)||s[0];try{Ls=await f.get("/api/admin/settings")}catch(b){return _({title:(b==null?void 0:b.message)||a("err.generic")})}let o=((i=Ls.settings)==null?void 0:i[n.id])||{};return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(n.icon)} ${n.label()}</h2>
      <span class="badge-pill bp-info">${a("adm.liveView")}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${ac[e].filter(b=>e==="theme"?Q("theme.edit"):!0).map(b=>r`
        <a class="tab ${b.id===n.id?"active":""}" href="#/admin/${e}/${b.id}">${c(b.icon)} ${b.label()}</a>`)}
    </div>
    ${n.id==="features"?Jd(((l=Ls.settings)==null?void 0:l.features)||{}):n.id==="backups"?ct("<div data-backups-panel></div>"):n.id==="partners"?Xd(((d=(p=Ls.settings)==null?void 0:p.partners)==null?void 0:d.items)||[]):Kd(n.id,o)}
    <p class="hint mt">${M("\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0646\u062A\u06CC\u062C\u0647 \u0635\u0641\u062D\u0647 \u0631\u0627 \u062A\u0627\u0632\u0647 \u06A9\u0646.","Changes apply to the site immediately; refresh the page to see them.")}</p>`}function Kd(t,e){let s=nc[t]||[];return r`
    <form class="card" data-act="adm-set-save" data-section="${t}">
      <div class="form-grid">
        ${s.map(n=>Qd(n,e[n.k])).join("")}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${a("common.reset")}</button>
      </div>
    </form>`}function Qd(t,e){var n,o,i,l,p;let s=t.label();switch(t.type){case"bool":return r`<div class="span-2">${yt({label:s,desc:t.hint?t.hint():"",name:t.k,checked:e!==!1})}</div>`;case"select":return j({label:s,name:t.k,value:e!=null?e:"",options:t.options().map(([d,b])=>({value:d,label:b}))});case"number":return x({label:s,name:t.k,type:"number",value:e!=null?e:"",attrs:`min="${(n=t.min)!=null?n:0}" max="${(o=t.max)!=null?o:999999999}" step="${(i=t.step)!=null?i:1}"`});case"textarea":return r`<div class="span-2">${J({label:s,name:t.k,value:e!=null?e:"",rows:3})}</div>`;case"color":return r`
        <label class="field"><span class="label">${s}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${t.k}-pick" value="${h(e||"#f59e0b")}" data-color-for="${t.k}">
            <input class="input mono" name="${t.k}" value="${h(e||"#f59e0b")}" maxlength="7" data-fkey="${t.k}">
          </span>
        </label>`;case"coords":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row">
            <input class="input mono" name="${t.k}.lat" value="${(l=e==null?void 0:e.lat)!=null?l:""}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${t.k}.lng" value="${(p=e==null?void 0:e.lng)!=null?p:""}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${t.k}.lat" data-lng="${t.k}.lng">${c("pin")} ${a("contact.allowLocation")}</button>
          </div>
        </div>`;case"group":return r`
        <div class="span-2 group-box">
          <strong class="small">${s}</strong>
          <div class="form-grid mt-s">
            ${t.fields.map(d=>{var b,u;return d.type==="bool"?r`<div class="span-2">${yt({label:d.label(),name:`${t.k}.${d.k}`,checked:(e==null?void 0:e[d.k])!==!1})}</div>`:d.type==="number"?x({label:d.label(),name:`${t.k}.${d.k}`,type:"number",value:(b=e==null?void 0:e[d.k])!=null?b:""}):x({label:d.label(),name:`${t.k}.${d.k}`,value:(u=e==null?void 0:e[d.k])!=null?u:"",type:d.k==="pass"||d.k==="apiKey"?"password":"text"})}).join("")}
          </div>
        </div>`;case"kv":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var b;return r`<label class="field"><span class="label tiny muted mono">${d}</span>
              <input class="input" name="${t.k}.${d}" value="${h((b=e==null?void 0:e[d])!=null?b:"")}"></label>`})}
          </div>
        </div>`;case"kvnum":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var b;return r`<label class="field"><span class="label tiny muted">${a(`adm.uCols${d.charAt(0).toUpperCase()}${d.slice(1)}`)}</span>
              <input class="input" type="number" min="${t.min}" max="${t.max}" name="${t.k}.${d}" value="${(b=e==null?void 0:e[d])!=null?b:""}"></label>`})}
          </div>
        </div>`;case"multi":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row row-wrap">
            ${t.options().map(([d,b])=>r`<label class="check"><input type="checkbox" name="${t.k}[]" value="${d}" ${(e||[]).includes(d)?"checked":""}><span class="box">${c("check")}</span><span>${b}</span></label>`)}
          </div>
        </div>`;case"rows":return r`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${s}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${t.k}">${c("plus")} ${a("common.add")}</button>
          </div>
          <div data-rows="${t.k}">
            ${(Array.isArray(e)?e:[]).map(d=>sc(t,d)).join("")}
          </div>
          <template data-row-tpl="${t.k}">${sc(t,null)}</template>
        </div>`;default:return x({label:s,name:t.k,value:e!=null?e:""})}}function sc(t,e){return r`
    <div class="spec-row" data-row="${t.k}">
      ${t.cols.map(s=>{var o;let n=(o=e==null?void 0:e[s.k])!=null?o:"";return s.type==="select"?r`<select class="select" data-col="${s.k}">${s.options().map(([i,l])=>r`<option value="${i}" ${String(n)===String(i)?"selected":""}>${l}</option>`)}</select>`:s.type==="number"?r`<input class="input" type="number" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`:r`<input class="input" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`})}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${c("trash")}</button>
    </div>`}function Jd(t){let e=Object.keys(t);return r`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${c("info")}<span>${a("adm.fHint")}</span></p>
      <div class="perm-grid">
        ${e.map(s=>r`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${s}" ${t[s]!==!1?"checked":""}><span class="track"></span></span>
            <span class="grow">${a(`feat.${s}`)||s}<span class="k mono">${s}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${a("common.reset")}</button>
      </div>
    </form>`}function Xd(t){let e=s=>r`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${a("adm.ptFa")}" value="${(s==null?void 0:s.fa)||""}" maxlength="60">
      <input class="input" name="en" placeholder="${a("adm.ptEn")}" value="${(s==null?void 0:s.en)||""}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${a("misc.delete")}">${c("trash")}</button>
    </div>`;return r`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${c("info")}<span>${a("adm.ptHint")}</span></p>
      <div class="col" data-ptlist>${t.map(s=>e(s)).join("")||e(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${c("plus")} ${a("adm.ptAdd")}</button>
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
      </div>
    </form>`}function Zd(t,e){var n,o,i,l,p,d,b;let s={};if(e==="features")return t.querySelectorAll('input[type=checkbox][name^="features."]').forEach(u=>{s[u.name.slice(9)]=u.checked}),s;if(e==="partners")return s.items=[...t.querySelectorAll("[data-ptrow]")].map(u=>({fa:u.querySelector("[name=fa]").value.trim(),en:u.querySelector("[name=en]").value.trim()})).filter(u=>u.fa||u.en),s;for(let u of nc[e]||[])switch(u.type){case"bool":{let v=t.querySelector(`[name="${u.k}"]`);v&&(s[u.k]=v.checked);break}case"multi":{s[u.k]=[...t.querySelectorAll(`[name="${u.k}[]"]`)].filter(v=>v.checked).map(v=>v.value);break}case"rows":{s[u.k]=[...t.querySelectorAll(`[data-rows="${u.k}"] [data-row]`)].map(v=>{var $;let w={};for(let k of u.cols){let C=v.querySelector(`[data-col="${k.k}"]`);w[k.k]=k.type==="number"?Number((C==null?void 0:C.value)||0):String(($=C==null?void 0:C.value)!=null?$:"")}return w});break}case"kv":{let v={};for(let w of u.keys)v[w]=String((o=(n=t.querySelector(`[name="${u.k}.${w}"]`))==null?void 0:n.value)!=null?o:"");s[u.k]=v;break}case"group":{let v={};for(let w of u.fields){let $=t.querySelector(`[name="${u.k}.${w.k}"]`);$&&(v[w.k]=w.type==="bool"?$.checked:w.type==="number"?Number($.value||0):String((i=$.value)!=null?i:""))}s[u.k]=v;break}case"kvnum":{let v={};for(let w of u.keys)v[w]=Number(((l=t.querySelector(`[name="${u.k}.${w}"]`))==null?void 0:l.value)||0);s[u.k]=v;break}case"coords":{let v=(p=t.querySelector(`[name="${u.k}.lat"]`))==null?void 0:p.value,w=(d=t.querySelector(`[name="${u.k}.lng"]`))==null?void 0:d.value;v!==""&&w!==""&&v!==void 0&&(s[u.k]={lat:Number(v),lng:Number(w)});break}case"number":{let v=t.querySelector(`[name="${u.k}"]`);v&&v.value!==""&&(s[u.k]=Number(v.value));break}default:{let v=t.querySelector(`[name="${u.k}"]`);v&&(s[u.k]=String((b=v.value)!=null?b:""))}}return s}function tm(t,e){var s;return N(t),((s=e==null?void 0:e.params)==null?void 0:s.id)==="backups"&&oc(t),t.querySelectorAll("[data-color-for]").forEach(n=>{let o=t.querySelector(`[name="${n.dataset.colorFor}"]`);n.addEventListener("input",()=>{o&&(o.value=n.value)}),o==null||o.addEventListener("input",()=>{/^#[0-9a-f]{6}$/i.test(o.value)&&(n.value=o.value)})}),null}async function oc(t){var s;let e=t.querySelector("[data-backups-panel]");if(e){e.innerHTML='<div class="sk sk-line w70"></div>';try{let n=await f.get("/api/admin/backups");e.innerHTML=r`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${c("download")} ${a("adm.sBackups")}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${c("download")} ${a("adm.dumpFull")}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${c("plus")} ${a("adm.backupNow")}</button>
          </div>
        </div>
        <p class="muted small mt-s">${a("adm.backupsHint",{hours:g(n.everyHours||12),keep:g(n.keep||14)})}</p>
        ${(s=n.items)!=null&&s.length?r`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${a("common.date")}</th><th>${a("adm.backupSize")}</th><th></th></tr></thead>
          <tbody>${n.items.map(o=>r`<tr>
            <td class="tiny">${O(o.at)}</td>
            <td class="tiny muted">${g(Math.round(o.bytes/1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${o.id}/download" download>${c("download")} ${a("common.download")}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${o.id}">${c("refresh")} ${a("adm.backupRestore")}</button>
            </div></td>
          </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${a("adm.backupsEmpty")}</p>`}
      </div>`}catch(n){e.innerHTML=r`<div class="notice notice-error">${c("alert")} ${(n==null?void 0:n.message)||a("err.generic")}</div>`}}}var M,nc,ac,Ls,_a=V(()=>{U();G();Z();K();dt();tt();ut();nt();M=(t,e)=>q()?t:e,nc={mailsms:[{k:"mail",label:()=>a("adm.mailCfg"),type:"group",fields:[{k:"enabled",label:()=>a("adm.mailEnabled"),type:"bool"},{k:"host",label:()=>"SMTP host",type:"text"},{k:"port",label:()=>"SMTP port",type:"number",min:1,max:65535},{k:"user",label:()=>a("common.username"),type:"text"},{k:"pass",label:()=>a("common.password"),type:"text"},{k:"from",label:()=>a("adm.mailFrom"),type:"text"}]},{k:"sms",label:()=>a("adm.smsCfg"),type:"group",fields:[{k:"enabled",label:()=>a("adm.smsEnabled"),type:"bool"},{k:"apiKey",label:()=>a("adm.smsKey"),type:"text"},{k:"sender",label:()=>a("adm.smsSender"),type:"text"}]}],store:[{k:"name",label:()=>M("\u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","Store name"),type:"text"},{k:"nameEn",label:()=>M("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)"),type:"text"},{k:"tagline",label:()=>M("\u0634\u0639\u0627\u0631","Tagline"),type:"text"},{k:"taglineEn",label:()=>M("\u0634\u0639\u0627\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Tagline (EN)"),type:"text"},{k:"phone",label:()=>a("contact.phone"),type:"text"},{k:"phone2",label:()=>a("contact.mobile"),type:"text"},{k:"phone3",label:()=>M("\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","Third phone (optional)"),type:"text"},{k:"whatsapp",label:()=>a("contact.whatsapp"),type:"text"},{k:"email",label:()=>a("common.email"),type:"text"},{k:"city",label:()=>a("common.city"),type:"text"},{k:"cityEn",label:()=>M("\u0634\u0647\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","City (EN)"),type:"text"},{k:"address",label:()=>a("common.address"),type:"textarea"},{k:"addressEn",label:()=>M("\u0622\u062F\u0631\u0633 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Address (EN)"),type:"textarea"},{k:"description",label:()=>a("common.description"),type:"textarea"},{k:"descriptionEn",label:()=>M("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Description (EN)"),type:"textarea"},{k:"enamad",label:()=>M("\u06A9\u062F \u0646\u0645\u0627\u062F \u0627\u0639\u062A\u0645\u0627\u062F","Trust symbol code"),type:"text"},{k:"established",label:()=>M("\u0633\u0627\u0644 \u062A\u0623\u0633\u06CC\u0633 (\u0634\u0645\u0633\u06CC)","Founded year (Solar)"),type:"number",min:1300,max:1500},{k:"mapCoords",label:()=>M("\u0645\u062E\u062A\u0635\u0627\u062A \u0646\u0642\u0634\u0647","Map coordinates"),type:"coords"},{k:"socials",label:()=>M("\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC","Social links"),type:"kv",keys:["instagram","telegram","eitaa","whatsapp","website"]},{k:"workingHours",label:()=>a("footer.workingHours"),type:"rows",cols:[{k:"fa",label:()=>M("\u0631\u0648\u0632","Day (FA)")},{k:"en",label:()=>M("Day (EN)","Day (EN)")},{k:"time",label:()=>M("\u0633\u0627\u0639\u062A","Hours (FA)")},{k:"timeEn",label:()=>M("Hours (EN)","Hours (EN)")}]}],theme:[{k:"theme",label:()=>M("\u0642\u0627\u0644\u0628 \u0638\u0627\u0647\u0631\u06CC (\u062A\u0645)","Design Theme"),type:"select",options:()=>[["default",M("\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u06CC\u0627\u0633\u0627\u06CC\u06CC/\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644)","Default")],["tehran-nights",M("\u0634\u0628\u200C\u0647\u0627\u06CC \u062A\u0647\u0631\u0627\u0646","Tehran Nights")],["milad",M("\u0628\u0631\u062C \u0645\u06CC\u0644\u0627\u062F","Milad Tower")],["azadi",M("\u0645\u06CC\u062F\u0627\u0646 \u0622\u0632\u0627\u062F\u06CC","Azadi Square")],["lalehzar",M("\u0644\u0627\u0644\u0647\u200C\u0632\u0627\u0631","Lalehzar")],["tochal",M("\u062A\u0648\u0686\u0627\u0644","Tochal")],["valiasr",M("\u0648\u0644\u06CC\u0639\u0635\u0631","Valiasr")],["bazaar",M("\u0628\u0627\u0632\u0627\u0631 \u0628\u0632\u0631\u06AF","Grand Bazaar")],["chitgar",M("\u0686\u06CC\u062A\u06AF\u0631","Chitgar")],["tajrish",M("\u062A\u062C\u0631\u06CC\u0634","Tajrish")],["darband",M("\u062F\u0631\u0628\u0646\u062F","Darband")]]},{k:"accent",label:()=>a("adm.tAccent"),type:"color"},{k:"mode",label:()=>a("adm.tMode"),type:"select",options:()=>[["dark",a("theme.dark")],["light",a("theme.light")]]},{k:"bgStyle",label:()=>a("adm.tBg"),type:"select",options:()=>[["waves",M("\u0645\u0648\u062C \u0648 \u062A\u0647\u0631\u0627\u0646","Waves & port")],["grid",M("\u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","Grid")],["plain",M("\u0633\u0627\u062F\u0647","Plain")]]},{k:"density",label:()=>a("adm.tDensity"),type:"select",options:()=>[["compact","Compact"],["normal","Normal"],["comfy","Comfy"]]},{k:"contrast",label:()=>a("adm.tContrast"),type:"select",options:()=>[["normal","Normal"],["high","High"]]},{k:"radius",label:()=>a("adm.tRadius"),type:"number",min:0,max:32},{k:"portTheme",label:()=>a("adm.tPort"),type:"bool",hint:()=>a("adm.tPortHint")},{k:"animations",label:()=>a("adm.tAnim"),type:"bool"}],ui:[{k:"searchPosition",label:()=>a("adm.uSearchPos"),type:"select",options:()=>[["start",a("adm.uPosStart")],["center",a("adm.uPosCenter")],["end",a("adm.uPosEnd")]]},{k:"headerLayout",label:()=>a("adm.uHeader"),type:"select",options:()=>[["logoStart",a("adm.uLayoutLogoStart")],["split",a("adm.uLayoutSplit")],["centered",a("adm.uLayoutCentered")]]},{k:"navStyle",label:()=>a("adm.uNav"),type:"select",options:()=>[["pills","Pills"],["underline","Underline"]]},{k:"cardStyle",label:()=>a("adm.uCards"),type:"select",options:()=>[["grid",a("catalog.viewGrid")],["list",a("catalog.viewList")]]},{k:"stickyHeader",label:()=>a("adm.uSticky"),type:"bool"},{k:"showTicker",label:()=>a("adm.uTicker"),type:"bool"},{k:"tickerSpeed",label:()=>a("adm.uTickerSpeed"),type:"number",min:10,max:90},{k:"quickView",label:()=>a("adm.uQuick"),type:"bool"},{k:"floatingChat",label:()=>a("adm.uChat"),type:"bool"},{k:"showBreadcrumbs",label:()=>a("adm.uCrumb"),type:"bool"},{k:"columns",label:()=>a("adm.uCols"),type:"kvnum",keys:["mobile","tablet","desktop","wide"],min:1,max:8},{k:"productCardInfo",label:()=>a("adm.uCardInfo"),type:"multi",options:()=>[["brand",a("common.brand")],["stock",a("common.stock")],["rating",a("common.rating")],["warranty",a("pdp.warranty")],["sold",a("pdp.sold")]]},{k:"tickerItems",label:()=>a("adm.uTickerItems"),type:"rows",cols:[{k:"text",label:()=>M("\u0645\u062A\u0646","Text")},{k:"textEn",label:()=>M("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)")},{k:"link",label:()=>M("\u0644\u06CC\u0646\u06A9","Link")}]}],shipping:[{k:"pickupEnabled",label:()=>a("checkout.pickup"),type:"bool"},{k:"courierEnabled",label:()=>a("checkout.courier"),type:"bool"},{k:"courierBase",label:()=>M("\u0647\u0632\u06CC\u0646\u0647\u0654 \u067E\u0627\u06CC\u0647\u0654 \u0627\u0631\u0633\u0627\u0644","Base shipping fee"),type:"number",min:0,max:1e7},{k:"freeOver",label:()=>M("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"handlingHours",label:()=>M("\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC (\u0633\u0627\u0639\u062A)","Handling hours"),type:"number",min:1,max:720},{k:"expressEnabled",label:()=>a("checkout.express"),type:"bool"},{k:"expressFee",label:()=>M("\u0647\u0632\u06CC\u0646\u0647\u0654 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC","Express fee"),type:"number",min:0,max:1e7},{k:"insuranceRatePct",label:()=>M("\u0646\u0631\u062E \u0628\u06CC\u0645\u0647 (\u062F\u0631\u0635\u062F)","Insurance rate (%)"),type:"number",min:0,max:20,step:.1},{k:"insuranceMin",label:()=>M("\u062D\u062F\u0627\u0642\u0644 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u06CC\u0645\u0647","Insurance minimum"),type:"number",min:0,max:1e7},{k:"zones",label:()=>a("checkout.zone"),type:"rows",cols:[{k:"id",label:()=>M("\u0634\u0646\u0627\u0633\u0647","ID"),type:"select",options:()=>[["city",M("\u062F\u0627\u062E\u0644 \u0634\u0647\u0631","City")],["province",M("\u0627\u0633\u062A\u0627\u0646","Province")],["country",M("\u06A9\u0634\u0648\u0631","Country")],["island",M("\u062C\u0632\u0627\u06CC\u0631","Islands")]]},{k:"name",label:()=>M("\u0646\u0627\u0645","Name")},{k:"nameEn",label:()=>M("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)")},{k:"fee",label:()=>M("\u0647\u0632\u06CC\u0646\u0647","Fee"),type:"number"},{k:"eta",label:()=>M("\u0632\u0645\u0627\u0646 \u062A\u062D\u0648\u06CC\u0644","ETA")}]}],plus:[{k:"enabled",label:()=>a("feat.plus"),type:"bool"},{k:"price",label:()=>M("\u0645\u0628\u0644\u063A \u0627\u0634\u062A\u0631\u0627\u06A9","Price"),type:"number",min:0,max:1e8},{k:"durationDays",label:()=>M("\u0645\u062F\u062A (\u0631\u0648\u0632)","Duration (days)"),type:"number",min:1,max:365},{k:"discountPct",label:()=>M("\u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC (\u062F\u0631\u0635\u062F)","Permanent discount (%)"),type:"number",min:0,max:30,step:.5},{k:"freeShippingMin",label:()=>M("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"autoInsurance",label:()=>M("\u0628\u06CC\u0645\u0647\u0654 \u062E\u0648\u062F\u06A9\u0627\u0631","Auto insurance"),type:"bool"},{k:"prioritySupport",label:()=>M("\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631","Priority support"),type:"bool"},{k:"expressDiscountPct",label:()=>M("\u062A\u062E\u0641\u06CC\u0641 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u062F\u0631\u0635\u062F)","Express discount (%)"),type:"number",min:0,max:100},{k:"perks",label:()=>a("acc.plusPerks"),type:"rows",cols:[{k:"id",label:()=>"id"},{k:"fa",label:()=>M("\u0645\u0632\u06CC\u062A","Perk (FA)")},{k:"en",label:()=>M("Perk (EN)","Perk (EN)")}]}],orders:[{k:"minOrder",label:()=>M("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),type:"number",min:0,max:1e8},{k:"walletEnabled",label:()=>a("feat.wallet"),type:"bool"},{k:"gatewayEnabled",label:()=>a("pm.gateway"),type:"bool"},{k:"gatewayMode",label:()=>M("\u062D\u0627\u0644\u062A \u062F\u0631\u06AF\u0627\u0647","Gateway mode"),type:"select",options:()=>[["demo",M("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",M("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"codEnabled",label:()=>a("pm.cod"),type:"bool"},{k:"autoCancelHours",label:()=>M("\u0644\u063A\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0633 \u0627\u0632 (\u0633\u0627\u0639\u062A)","Auto-cancel after (h)"),type:"number",min:1,max:720},{k:"stockReserveMinutes",label:()=>M("\u0631\u0632\u0631\u0648 \u0645\u0648\u062C\u0648\u062F\u06CC (\u062F\u0642\u06CC\u0642\u0647)","Stock reserve (min)"),type:"number",min:0,max:1440},{k:"refundToWallet",label:()=>M("\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647 \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644","Refund to wallet"),type:"bool"}],seo:[{k:"title",label:()=>M("\u0639\u0646\u0648\u0627\u0646 \u0633\u0627\u06CC\u062A","Site title"),type:"text"},{k:"description",label:()=>M("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u062A\u0627","Meta description"),type:"textarea"},{k:"keywords",label:()=>M("\u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647\u200C\u0647\u0627","Keywords"),type:"text"}],currency:[{k:"code",label:()=>M("\u06A9\u062F \u0627\u0631\u0632","Currency code"),type:"text"},{k:"label",label:()=>M("\u0646\u0627\u0645 \u0648\u0627\u062D\u062F","Unit label"),type:"text"},{k:"labelEn",label:()=>M("Unit (EN)","Unit (EN)"),type:"text"}],auth:[{k:"allowRegistration",label:()=>M("\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F","Allow registration"),type:"bool"},{k:"otpMode",label:()=>M("\u062D\u0627\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F","OTP mode"),type:"select",options:()=>[["demo",M("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",M("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"requirePhone",label:()=>M("\u0634\u0645\u0627\u0631\u0647\u0654 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC","Require phone"),type:"bool"},{k:"force2faStaff",label:()=>M("\u06F2FA \u0627\u062C\u0628\u0627\u0631\u06CC \u06A9\u0627\u0631\u06A9\u0646\u0627\u0646","Force 2FA for staff"),type:"bool"},{k:"sessionDays",label:()=>M("\u0637\u0648\u0644 \u0646\u0634\u0633\u062A (\u0631\u0648\u0632)","Session days"),type:"number",min:1,max:90}],contact:[{k:"supportNote",label:()=>M("\u067E\u06CC\u0627\u0645 \u0628\u062E\u0634 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","Support note"),type:"textarea"},{k:"supportNoteEn",label:()=>M("Support note (EN)","Support note (EN)"),type:"textarea"}]},ac={settings:[{id:"store",icon:"store",label:()=>a("adm.sStore")},{id:"shipping",icon:"truck",label:()=>a("adm.sShipping")},{id:"plus",icon:"sparkles",label:()=>a("adm.sPlus")},{id:"orders",icon:"card",label:()=>a("adm.sOrders")},{id:"auth",icon:"key",label:()=>a("adm.sAuth")},{id:"seo",icon:"search",label:()=>a("adm.sSeo")},{id:"currency",icon:"wallet",label:()=>M("\u0648\u0627\u062D\u062F \u067E\u0648\u0644","Currency")},{id:"partners",icon:"star",label:()=>a("adm.sPartners")},{id:"contact",icon:"headset",label:()=>a("common.support")},{id:"mailsms",icon:"send",label:()=>a("adm.mailsms")}],theme:[{id:"theme",icon:"sun",label:()=>a("adm.sTheme")},{id:"ui",icon:"grid",label:()=>a("adm.sUi")}],features:[{id:"features",icon:"zap",label:()=>a("adm.sFeatures")},{id:"backups",icon:"download",label:()=>a("adm.sBackups")}]},Ls=null;y("adm-pt-add",t=>{t.target.closest("form").querySelector("[data-ptlist]").insertAdjacentHTML("beforeend",`<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${a("adm.ptFa")}" value="" maxlength="60"><input class="input" name="en" placeholder="${a("adm.ptEn")}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${a("misc.delete")}">${c("trash")}</button></div>`)});y("adm-pt-del",t=>{let e=t.target.closest("form");e.querySelectorAll("[data-ptrow]").length>1?t.target.closest("[data-ptrow]").remove():e.querySelectorAll("[data-ptrow] input").forEach(n=>n.value="")});y("adm-set-save",async(t,e)=>{t.preventDefault();let s=e.dataset.section,n=Zd(e,s);if(s==="theme"&&n.accent&&!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n.accent)){Y(q()?"\u0631\u0646\u06AF \u0628\u0627\u06CC\u062F \u0628\u0627 \u0641\u0631\u0645\u062A #RRGGBB \u0628\u0627\u0634\u062F.":"Colour must be in #RRGGBB format.");return}await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/settings/${s}`,{value:n}),await Ot({silent:!0}),Ce(),E(a("adm.sSaved")),T(!0)}catch(o){S(o)}})});y("adm-set-reset",()=>T(!0));y("adm-set-geo",(t,e)=>{if(!navigator.geolocation){Y(a("contact.locationDenied"));return}navigator.geolocation.getCurrentPosition(s=>{let n=e.closest("form"),o=n.querySelector(`[name="${e.dataset.lat}"]`),i=n.querySelector(`[name="${e.dataset.lng}"]`);o&&(o.value=s.coords.latitude.toFixed(5)),i&&(i.value=s.coords.longitude.toFixed(5)),E(a("contact.locationOn"))},()=>Y(a("contact.locationDenied")),{timeout:9e3})});y("adm-row-add",(t,e)=>{let s=e.dataset.row,n=e.closest("form"),o=n.querySelector(`[data-row-tpl="${s}"]`),i=n.querySelector(`[data-rows="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let p=l.firstElementChild;p&&(p.querySelectorAll("input").forEach(d=>{d.value=""}),i.appendChild(p))});y("adm-row-del",(t,e)=>{var s;(s=e.closest("[data-row]"))==null||s.remove()});y("adm-backup-now",async(t,e)=>{await D(e,async()=>{var s;try{await f.post("/api/admin/backups",{}),E(a("adm.backupDone")),await oc(document.querySelector("#view")||((s=e.closest("#view"))==null?void 0:s.parentNode)||document)}catch(n){S(n)}})});y("adm-backup-restore",async(t,e)=>{await wt({text:a("adm.backupRestoreWarn"),danger:!0})&&await D(e,async()=>{try{await f.post("/api/admin/backups/restore",{id:e.dataset.id}),E(a("adm.backupRestored")),setTimeout(()=>location.reload(),900)}catch(n){S(n)}})})});var pc={};X(pc,{mount:()=>lm,render:()=>em});async function em(t){try{dc=(await f.get("/api/admin/pages")).pages||{}}catch(s){return _({title:(s==null?void 0:s.message)||a("err.generic")})}let e=Wa.find(s=>s.key===t.params.id)?t.params.id:"";return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("file")} ${a("adm.pages")}</h2>
      <span class="badge-pill bp-muted">${g(Wa.length)} ${W("\u0635\u0641\u062D\u0647","pages")}</span>
    </div>

    <div class="page-grid">
      <div class="card page-nav">
        ${Wa.map(s=>r`
          <a class="pg-item ${s.key===e?"active":""}" href="#/admin/pages/${s.key}">
            ${c(s.icon)}<span class="grow">${mc(s.key)}</span>
          </a>`).join("")}
      </div>
      <div>${e?am(Wa.find(s=>s.key===e)):L({icon:"file",title:a("adm.pagesPick"),text:a("adm.pagesPickHint")})}</div>
    </div>`}function mc(t){return{about:a("footer.about"),guide:a("footer.guide"),service:a("footer.service"),faq:a("footer.faq"),terms:a("footer.terms"),privacy:a("footer.privacy"),insurance:a("footer.insurance"),ticketRules:a("acc.ticketRules"),bugReport:a("feedback.bug"),contact:a("footer.contact"),installments:W("\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC","Installments")}[t]||t}function am(t){let e=dc[t.key]||(t.key==="faq"?[]:{});return r`
    <form class="card" data-act="adm-pg-save" data-key="${t.key}">
      <div class="row row-between row-wrap mb-s">
        <strong>${c(t.icon)} ${mc(t.key)}</strong>
        <a class="btn btn-ghost btn-xs" href="#/pages/${t.key}" target="_blank" rel="noopener">${c("external")} ${a("adm.view")}</a>
      </div>
      <p class="notice notice-info mb">${c("info")}<span>${a("adm.pgHint")}</span></p>
      ${t.blocks.map(s=>sm(s,e)).join("")}
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/pages/${t.key}">${a("common.reset")}</a>
      </div>
    </form>`}function sm(t,e){switch(t){case"hero":{let s=e.hero||{};return r`
        <fieldset class="pg-block">
          <legend>${c("sparkles")} ${W("\u0633\u0631\u0628\u0631\u06AF \u0635\u0641\u062D\u0647","Page hero")}</legend>
          <div class="form-grid">
            ${x({label:a("common.title"),name:"hero.title",value:s.title||"",span2:!0})}
            ${x({label:W("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"hero.titleEn",value:s.titleEn||"",span2:!0})}
            ${J({label:W("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646","Subtitle"),name:"hero.subtitle",value:s.subtitle||"",rows:2,span2:!0})}
            ${J({label:W("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Subtitle (EN)"),name:"hero.subtitleEn",value:s.subtitleEn||"",rows:2,span2:!0})}
          </div>
        </fieldset>`}case"intro":return no("intro",W("\u0645\u0642\u062F\u0645\u0647","Intro"),e.intro||"",e.introEn||"");case"body":return no("body",W("\u0645\u062A\u0646 \u0627\u0635\u0644\u06CC","Body text"),e.body||"",e.bodyEn||"");case"notice":return no("notice",W("\u0647\u0634\u062F\u0627\u0631/\u0646\u06A9\u062A\u0647","Notice"),e.notice||"",e.noticeEn||"",2);case"rules":return rc("rules",W("\u0628\u0646\u062F\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0628\u0646\u062F)","Clauses (one per line)"),e.rules||[],e.rulesEn||[]);case"hints":return rc("hints",W("\u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u200C\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9\u06CC)","Hints (one per line)"),e.hints||[],e.hintsEn||[]);case"sections":return nm(e.sections||[]);case"steps":return Ns("steps",W("\u06AF\u0627\u0645\u200C\u0647\u0627","Steps"),e.steps||[],["title","titleEn","body","bodyEn"],"list");case"items":return Ns("items",W("\u0645\u0648\u0627\u0631\u062F \u062E\u062F\u0645\u0627\u062A","Service items"),e.items||[],["icon","title","titleEn","body","bodyEn"],"grid");case"tips":return Ns("tips",W("\u0646\u06A9\u062A\u0647\u200C\u0647\u0627","Tips"),e.tips||[],["fa","en"],"grid");case"stats":return Ns("stats",W("\u0622\u0645\u0627\u0631\u0647\u0627\u06CC \u0635\u0641\u062D\u0647\u0654 \u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627","About-page stats"),e.stats||[],["fa","en","key"],"grid");case"faq":return cm(Array.isArray(e)?e:[]);default:return""}}function no(t,e,s,n,o=4){return r`
    <fieldset class="pg-block">
      <legend>${c("edit")} ${e}</legend>
      <div class="form-grid">
        ${J({label:W("\u0641\u0627\u0631\u0633\u06CC","Persian"),name:`${t}`,value:s,rows:o,span2:!0})}
        ${J({label:W("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),name:`${t}En`,value:n,rows:o,span2:!0})}
      </div>
    </fieldset>`}function rc(t,e,s,n){return r`
    <fieldset class="pg-block">
      <legend>${c("list")} ${e}</legend>
      <div class="form-grid">
        <label class="field span-2"><span class="label">${W("\u0641\u0627\u0631\u0633\u06CC","Persian")}</span>
          <textarea class="textarea" name="${t}" rows="6" data-lines="1">${h((s||[]).join(`
`))}</textarea></label>
        <label class="field span-2"><span class="label">${W("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English")}</span>
          <textarea class="textarea" name="${t}En" rows="6" data-lines="1">${h((n||[]).join(`
`))}</textarea></label>
      </div>
    </fieldset>`}function nm(t){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("layers")} ${W("\u0628\u062E\u0634\u200C\u0647\u0627","Sections")}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="sections">${c("plus")} ${a("common.add")}</button>
      </legend>
      <div data-blocks="sections">
        ${t.map((e,s)=>cc(e,s)).join("")}
      </div>
      <template data-tpl="sections">${cc(om(),0)}</template>
    </fieldset>`}function cc(t,e){let s=Array.isArray(t.list)&&t.list.some(n=>n&&typeof n=="object");return r`
    <div class="pg-item" data-block="sections" data-objlist="${s?"1":""}">
      <div class="row row-between">
        <strong class="tiny">${W("\u0628\u062E\u0634","Section")} ${e+1}</strong>
        <span class="act">${Bs()}${Hs()}</span>
      </div>
      <div class="form-grid mt-s">
        ${x({label:a("common.title"),name:"title",value:t.title||""})}
        ${x({label:W("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:t.titleEn||""})}
        ${J({label:W("\u0645\u062A\u0646","Body"),name:"body",value:t.body||"",rows:4,span2:!0})}
        ${J({label:W("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),name:"bodyEn",value:t.bodyEn||"",rows:3,span2:!0})}
        ${rm(t,s)}
      </div>
    </div>`}function rm(t,e){if(e)return r`
      <div class="span-2">
        <div class="row row-between">
          <span class="label">${W("\u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Bullet list")}</span>
          <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-li-add">${c("plus")}</button>
        </div>
        <div data-li>${(t.list||[]).map(o=>ic(o)).join("")}</div>
        <template data-li-tpl>${ic({icon:"check",fa:"",en:""})}</template>
      </div>`;let s=(t.list||[]).map(o=>typeof o=="string"?o:(o==null?void 0:o.fa)||"").join(`
`),n=(t.listEn||[]).join(`
`);return s||n?r`
      <label class="field span-2"><span class="label">${W("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
        <textarea class="textarea" name="list" rows="4" data-lines="1">${h(s)}</textarea></label>
      <label class="field span-2"><span class="label">${W("\u0641\u0647\u0631\u0633\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List EN (one per line)")}</span>
        <textarea class="textarea" name="listEn" rows="4" data-lines="1">${h(n)}</textarea></label>`:r`
    <div class="span-2">
      <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-list-toggle">${c("plus")} ${W("\u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Add bullet list")}</button>
      <div data-listbox hidden>
        <label class="field span-2"><span class="label">${W("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
          <textarea class="textarea" name="list" rows="3" data-lines="1"></textarea></label>
      </div>
    </div>`}function ic(t){return r`
    <div class="spec-row" data-lir>
      <input class="input li-ic" name="icon" value="${h((t==null?void 0:t.icon)||"check")}" placeholder="icon">
      <input class="input" name="fa" value="${h((t==null?void 0:t.fa)||"")}" placeholder="${W("\u0641\u0627\u0631\u0633\u06CC","FA")}">
      <input class="input" name="en" value="${h((t==null?void 0:t.en)||"")}" placeholder="${W("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","EN")}">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-pg-lidel">${c("trash")}</button>
    </div>`}function Ns(t,e,s,n,o){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("grid")} ${e}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="${t}">${c("plus")} ${a("common.add")}</button>
      </legend>
      <div class="${o==="grid"?"perm-grid":""}" data-blocks="${t}">
        ${s.map((i,l)=>r`
          <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
            <div class="row row-between">
              <strong class="tiny">${g(l+1)}</strong>
              <span class="act">${Bs()}${Hs()}</span>
            </div>
            <div class="form-grid mt-s">
              ${n.map(p=>p==="body"||p==="bodyEn"?J({label:Is(p),name:p,value:i[p]||"",rows:2,span2:!0}):x({label:Is(p),name:p,value:i[p]||""}))}
            </div>
          </div>`).join("")}
      </div>
      <template data-tpl="${t}">
        <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
          <div class="row row-between"><strong class="tiny">+</strong><span class="act">${Bs()}${Hs()}</span></div>
          <div class="form-grid mt-s">
            ${n.map(i=>i==="body"||i==="bodyEn"?J({label:Is(i),name:i,value:"",rows:2,span2:!0}):x({label:Is(i),name:i,value:""}))}
          </div>
        </div>
      </template>
    </fieldset>`}function Is(t){return{title:a("common.title"),titleEn:W("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),body:W("\u0645\u062A\u0646","Body"),bodyEn:W("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),icon:W("\u0622\u06CC\u06A9\u0648\u0646","Icon"),fa:W("\u0641\u0627\u0631\u0633\u06CC","Persian"),en:W("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),key:W("\u06A9\u0644\u06CC\u062F \u0622\u0645\u0627\u0631\u06CC","Stat key")}[t]||t}function cm(t){let e=["orders","shipping","returns","product","account","security","store","other"];return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("help")} ${W("\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","FAQ")} (${g(t.length)})</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="faq">${c("plus")} ${a("common.add")}</button>
      </legend>
      <div data-blocks="faq">
        ${t.map((s,n)=>lc(s,n,e)).join("")}
      </div>
      <template data-tpl="faq">${lc({cat:"general",q:"",qEn:"",a:"",aEn:""},0,e)}</template>
    </fieldset>`}function lc(t,e,s){return r`
    <div class="pg-item" data-block="faq">
      <div class="row row-between">
        <strong class="tiny">${W("\u0633\u0624\u0627\u0644","Q")} ${e+1}</strong>
        <span class="act">${Bs()}${Hs()}</span>
      </div>
      <div class="form-grid mt-s">
        <label class="field"><span class="label">${W("\u062F\u0633\u062A\u0647","Category")}</span>
          <select class="select" name="cat">${s.map(n=>r`<option value="${n}" ${t.cat===n?"selected":""}>${a(`faq.cat.${n}`)}</option>`)}</select></label>
        ${x({label:W("\u0633\u0624\u0627\u0644","Question"),name:"q",value:t.q||""})}
        ${x({label:W("\u0633\u0624\u0627\u0644 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Question (EN)"),name:"qEn",value:t.qEn||"",span2:!0})}
        ${J({label:W("\u067E\u0627\u0633\u062E","Answer"),name:"a",value:t.a||"",rows:3,span2:!0})}
        ${J({label:W("\u067E\u0627\u0633\u062E (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Answer (EN)"),name:"aEn",value:t.aEn||"",rows:2,span2:!0})}
      </div>
    </div>`}function Rs(t,e,s){let n=t.querySelector(`[name="${e}"]`);if(n)return n.dataset.lines==="1"?n.value.split(`
`).map(o=>o.trim()).filter(Boolean):n.value}function im(t,e){var n,o;let s={};for(let i of e.blocks)if(i==="hero"){let l=p=>{var d,b;return(b=(d=t.querySelector(`[name="hero.${p}"]`))==null?void 0:d.value)!=null?b:""};s.hero={title:l("title"),titleEn:l("titleEn"),subtitle:l("subtitle"),subtitleEn:l("subtitleEn")}}else if(["intro","body","notice"].includes(i))s[i]=(n=Rs(t,i))!=null?n:"",s[`${i}En`]=(o=Rs(t,`${i}En`))!=null?o:"";else if(["rules","hints"].includes(i))s[i]=Rs(t,i)||[],s[`${i}En`]=Rs(t,`${i}En`)||[];else if(i==="faq")s.faq=[...t.querySelectorAll('[data-block="faq"]')].map(l=>{var p,d,b,u,v;return{cat:((p=l.querySelector("[name=cat]"))==null?void 0:p.value)||"general",q:((d=l.querySelector("[name=q]"))==null?void 0:d.value)||"",qEn:((b=l.querySelector("[name=qEn]"))==null?void 0:b.value)||"",a:((u=l.querySelector("[name=a]"))==null?void 0:u.value)||"",aEn:((v=l.querySelector("[name=aEn]"))==null?void 0:v.value)||""}});else{let l={sections:["title","titleEn","body","bodyEn"],steps:["title","titleEn","body","bodyEn"],items:["icon","title","titleEn","body","bodyEn"],tips:["fa","en"],stats:["fa","en","key"]}[i]||[];s[i]=[...t.querySelectorAll(`[data-block="${i}"]`)].map(p=>{var b,u;let d={};for(let v of l)d[v]=(u=(b=p.querySelector(`[name="${v}"]`))==null?void 0:b.value)!=null?u:"";if(i==="sections")if(p.dataset.objlist==="1")d.list=[...p.querySelectorAll("[data-lir]")].map(v=>{var w,$,k;return{icon:((w=v.querySelector("[name=icon]"))==null?void 0:w.value)||"check",fa:(($=v.querySelector("[name=fa]"))==null?void 0:$.value)||"",en:((k=v.querySelector("[name=en]"))==null?void 0:k.value)||""}});else{let v=p.querySelector("[name=list]");v&&(d.list=v.value.split(`
`).map($=>$.trim()).filter(Boolean));let w=p.querySelector("[name=listEn]");w&&(d.listEn=w.value.split(`
`).map($=>$.trim()).filter(Boolean))}return d})}return s}function lm(t){return N(t),null}var W,Wa,dc,om,Bs,Hs,uc=V(()=>{U();G();Z();dt();tt();ut();nt();W=(t,e)=>q()?t:e,Wa=[{key:"about",icon:"store",blocks:["hero","sections","stats"]},{key:"guide",icon:"info",blocks:["hero","steps","tips"]},{key:"service",icon:"headset",blocks:["hero","items"]},{key:"faq",icon:"help",blocks:["faq"]},{key:"terms",icon:"file",blocks:["hero","intro","notice","sections"]},{key:"privacy",icon:"shield",blocks:["hero","intro","sections"]},{key:"insurance",icon:"package-check",blocks:["hero","body","rules"]},{key:"ticketRules",icon:"ticket",blocks:["hero","rules"]},{key:"bugReport",icon:"bug",blocks:["hero","body","hints"]},{key:"contact",icon:"phone",blocks:["hero"]},{key:"installments",icon:"card",blocks:["hero","body","rules","sections"]}],dc={};om=()=>({title:"",titleEn:"",body:"",bodyEn:"",list:[],listEn:[]});Bs=()=>r`
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-up" aria-label="up">${c("arrow-up")}</button>
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-down" aria-label="down">${c("chevron-down")}</button>`,Hs=()=>r`<button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-del" aria-label="delete">${c("trash")}</button>`;y("adm-pg-save",async(t,e)=>{t.preventDefault();let s=e.dataset.key,n=Wa.find(i=>i.key===s),o=im(e,n);await D(e.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/pages/${s}`,{value:o}),E(a("misc.saved")),T(!0)}catch(i){S(i)}})});y("adm-pg-add",(t,e)=>{let s=e.dataset.kind,n=e.closest("form"),o=n.querySelector(`[data-tpl="${s}"]`),i=n.querySelector(`[data-blocks="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let p=l.firstElementChild;if(!p)return;p.querySelectorAll("input, textarea").forEach(u=>{u.value=""});let d=i.children.length+1,b=p.querySelector(".row strong");b&&(b.textContent=`${s==="faq"?q()?"\u0633\u0624\u0627\u0644":"Q":q()?"\u0645\u0648\u0631\u062F":"Item"} ${d}`),i.appendChild(p),p.scrollIntoView({behavior:"smooth",block:"center"})});y("adm-pg-del",(t,e)=>{var s;(s=e.closest("[data-block]"))==null||s.remove()});y("adm-pg-up",(t,e)=>{let s=e.closest("[data-block]");s!=null&&s.previousElementSibling&&s.parentNode.insertBefore(s,s.previousElementSibling)});y("adm-pg-down",(t,e)=>{let s=e.closest("[data-block]");s!=null&&s.nextElementSibling&&s.parentNode.insertBefore(s.nextElementSibling,s)});y("adm-pg-li-add",(t,e)=>{let s=e.closest(".span-2"),n=s.querySelector("[data-li]"),o=s.querySelector("[data-li-tpl]");if(!n||!o)return;let i=document.createElement("div");i.innerHTML=o.innerHTML.trim(),i.firstElementChild&&n.appendChild(i.firstElementChild)});y("adm-pg-list-toggle",(t,e)=>{var n;let s=(n=e.closest(".span-2"))==null?void 0:n.querySelector("[data-listbox]");s&&(s.hidden=!s.hidden)});y("adm-pg-lidel",(t,e)=>{var s;(s=e.closest("[data-lir]"))==null||s.remove()})});var ro={};X(ro,{mount:()=>gm,render:()=>dm});async function dm(t){return t.params.section==="imageSearch"?hm():mm()}async function mm(){try{let e=await f.get(f.url("/api/admin/barcode",{q:he.q}));Le=e.items||[],Ge=e.labelSizes||[],!Ge.find(s=>s.id===he.size)&&Ge.length&&(he.size=Ge[0].id)}catch(e){return _({title:(e==null?void 0:e.message)||a("err.generic")})}let t=Le.filter(e=>!e.barcode).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("barcode")} ${a("adm.barcode")}</h2>
        <p class="muted small">${g(Le.length)} ${qt("\u06A9\u0627\u0644\u0627","products")} · ${g(t)} ${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","without barcode")}</p>
      </div>
      <a class="btn btn-outline btn-sm" href="#/price-check" target="_blank" rel="noopener">${c("scan")} ${a("adm.bPriceMode")}</a>
    </div>

    <div class="dev-grid">
      <div class="card">
        <strong>${c("printer")} ${a("adm.bPrinter")}</strong>
        <p class="muted small mt-s">${a("adm.bPrinterHint")}</p>
        <ol class="dev-steps">
          <li>${qt("\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628 \u0631\u0627 \u0628\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0648\u0635\u0644 \u06A9\u0646 (USB/\u0634\u0628\u06A9\u0647).","Connect the label printer (USB/network).")}</li>
          <li>${qt("\u062F\u0631 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0686\u0627\u067E \u0633\u06CC\u0633\u062A\u0645\u060C \u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u06A9\u0627\u063A\u0630 \u0631\u0627 \u0647\u0645\u200C\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u0628\u06AF\u0630\u0627\u0631.","Set the system paper size to your label size.")}</li>
          <li>${qt("\u06A9\u0627\u0644\u0627\u0647\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \xAB\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0648 \u0686\u0627\u067E\xBB \u0631\u0627 \u0628\u0632\u0646.","Pick products and press \u201CPreview & print\u201D.")}</li>
        </ol>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-sm" data-act="adm-bc-testprint">${c("printer")} ${qt("\u0686\u0627\u067E \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Test print")}</button>
        </div>
      </div>

      <div class="card">
        <strong>${c("scan")} ${a("adm.bScanner")}</strong>
        <p class="muted small mt-s">${a("adm.bScanHint")}</p>
        <form class="row mt-s" data-act="adm-bc-scan">
          <input class="input grow mono" name="code" placeholder="${qt("\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0627\u0633\u06A9\u0646 \u06A9\u0646\u2026","Scan a barcode\u2026")}" autocomplete="off" data-autofocus>
          <button class="btn btn-primary" type="submit">${c("search")}</button>
        </form>
        <div class="scan-result mt-s" data-scan-result>
          <p class="muted small">${qt("\u062F\u0648\u0631\u0628\u06CC\u0646 \u062A\u0644\u0641\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F: \u0627\u0632 \u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Phone camera works too \u2014 use the price-display mode.")}</p>
        </div>
        <p class="tiny muted mt-s">${pm()}</p>
      </div>
    </div>

    <div class="card mt">
      <div class="row row-between row-wrap mb-s">
        <strong>${c("printer")} ${a("adm.bLabels")}</strong>
        <form class="row row-wrap" data-act="adm-bc-search">
          <input class="input" name="q" value="${h(he.q)}" placeholder="${a("adm.pName")} / SKU / ${a("pdp.barcode")}">
          <button class="btn btn-ghost btn-sm" type="submit">${c("search")}</button>
        </form>
      </div>

      <div class="row row-wrap mb-s">
        <select class="select select-sm" data-size>
          ${Ge.map(e=>r`<option value="${e.id}" ${he.size===e.id?"selected":""}>${h(q()?e.fa:`${e.w}\xD7${e.h} mm`)}</option>`)}
        </select>
        <label class="row tiny">${qt("\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0686\u0633\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627","Copies per product")}
          <input class="input copies-in" type="number" min="1" max="20" value="${g(he.copies)}" data-copies>
        </label>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-all">${c("check")} ${qt("\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647","Select all")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-none">${c("close")} ${qt("\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","Clear")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-nocode">${c("barcode")} ${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","Without barcode")}</button>
        <span class="badge-pill bp-accent" data-selcount>${g(ae.size)}</span>
      </div>

      ${lt([{label:""},{label:a("common.product")},{label:a("pdp.barcode")},{label:a("common.price"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:"",cls:"num"}],Le.slice(0,100).map(e=>r`
          <tr>
            <td><label class="check"><input type="checkbox" data-pick="${e.id}" ${ae.has(e.id)?"checked":""}><span class="box">${c("check")}</span></label></td>
            <td><span class="b">${h(e.name)}</span><div class="tiny muted mono">${h(e.sku||"")}</div></td>
            <td class="mono tiny">${e.barcode?h(e.barcode):r`<span class="badge-pill bp-warn">${qt("\u0646\u062F\u0627\u0631\u062F","none")}</span>`}</td>
            <td class="num">${A(e.price)}</td>
            <td class="num">${g(e.stock)}</td>
            <td>${e.barcode?"":r`<button class="btn btn-ghost btn-xs" data-act="adm-bc-gen" data-id="${e.id}">${c("barcode")} ${a("adm.bGenerate")}</button>`}</td>
          </tr>`),{emptyText:a("common.noResult")})}
    </div>

    <div class="card mt no-print">
      <div class="row row-between row-wrap">
        <strong>${c("eye")} ${a("adm.bPreview")}</strong>
        <div class="row row-wrap">
          <button class="btn btn-outline btn-sm" data-act="adm-bc-build">${c("refresh")} ${qt("\u0633\u0627\u062E\u062A \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634","Build preview")}</button>
          <button class="btn btn-primary btn-sm" data-act="adm-bc-print">${c("printer")} ${a("common.print")}</button>
        </div>
      </div>
      <div class="print-grid mt" data-print-area data-labels></div>
      <p class="hint mt-s">${qt("\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u062F\u0631 \u0686\u0627\u067E \u0627\u0632 \u0645\u062A\u063A\u06CC\u0631 \u0635\u0641\u062D\u0647 \u062A\u0646\u0638\u06CC\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0686\u0627\u067E \u0634\u062F\u0646\u062F\u060C \u062D\u0627\u0634\u06CC\u0647\u0654 \u0686\u0627\u067E \u0631\u0627 \u062F\u0631 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0635\u0641\u0631 \u06A9\u0646.","If labels shift when printing, set the print margins to zero in the print dialog.")}</p>
    </div>`}function pm(){return"BarcodeDetector"in window?r`${c("check")} ${qt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F","Camera scanning supported")}`:r`${c("info")} ${qt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u0632 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0633\u062E\u062A\u200C\u0627\u0641\u0632\u0627\u0631\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Camera scanning unsupported in this browser; use a hardware scanner.")}`}async function um(){return window.JsBarcode||await new Promise((t,e)=>{let s=document.createElement("script");s.src="/js/vendor/jsbarcode.all.min.js",s.onload=t,s.onerror=e,document.head.appendChild(s)}),window.JsBarcode}function bm(t,e){let s=Ge.find(o=>o.id===e)||{w:40,h:25},n=/^\d{13}$/.test(t.barcode||"")?"EAN13":"CODE128";return r`
    <div class="label-preview" data-lw="${s.w}" data-lh="${s.h}">
      <span class="ln">${h(t.name.slice(0,40))}</span>
      ${t.barcode?r`<svg data-bc="${h(t.barcode)}" data-fmt="${n}"></svg>`:r`<span class="ln tiny">${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","no barcode")}</span>`}
      <span class="row row-between w100">
        <span class="ln mono tiny">${h(t.barcode||t.sku||"")}</span>
        <span class="lp">${g(t.price)}</span>
      </span>
    </div>`}async function oo(t){var p,d;let e=t.querySelector("[data-labels]");if(!e)return 0;let s=Le.filter(b=>ae.has(b.id));if(!s.length)return e.innerHTML="",0;let n=Math.max(1,Number(((p=t.querySelector("[data-copies]"))==null?void 0:p.value)||1)),o=((d=t.querySelector("[data-size]"))==null?void 0:d.value)||he.size,i=Ge.find(b=>b.id===o)||{w:40,h:25},l="";for(let b of s)for(let u=0;u<n;u++)l+=bm(b,o);e.innerHTML=l,e.style.setProperty("--lw",`${i.w}mm`),e.style.setProperty("--lh",`${i.h}mm`);try{let b=await um();e.querySelectorAll("svg[data-bc]").forEach(u=>{try{b(u,u.dataset.bc,{format:u.dataset.fmt||"CODE128",displayValue:!1,height:Math.max(18,i.h-14),width:1.3,margin:0,background:"#ffffff",lineColor:"#000000"})}catch(v){u.remove()}})}catch(b){Y(qt("\u06A9\u062A\u0627\u0628\u062E\u0627\u0646\u0647\u0654 \u0628\u0627\u0631\u06A9\u062F \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F\u061B \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F \u0686\u0627\u067E \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","Barcode library failed to load; labels print without barcodes."))}return s.length*n}function Fs(){document.querySelectorAll("[data-pick]").forEach(e=>{e.checked=ae.has(e.dataset.pick)});let t=document.querySelector("[data-selcount]");t&&(t.textContent=g(ae.size))}async function hm(){let t=null;try{t=await f.get("/api/admin/image-index")}catch(n){return _({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.products||[],s=e.filter(n=>!n.indexed);return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("camera")} ${a("adm.imageSearch")}</h2>
        <p class="muted small">${g(t.indexed||0)} / ${g(e.length)} ${qt("\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0634\u062F\u0647","indexed")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ix-run" data-count="${s.length}">
        ${c("refresh")} ${s.length?`${a("adm.ixIndex")} (${g(s.length)})`:a("adm.ixReindex")}
      </button>
    </div>

    <p class="notice notice-info mb">${c("info")}<span>${a("adm.ixHint")}</span></p>
    <div class="mt-s" data-ix-progress hidden>
      <div class="progress"><i data-ix-bar data-w="0%"></i></div>
      <p class="tiny muted mt-s" data-ix-status></p>
    </div>

    ${e.length?r`
      <div class="ix-grid">
        ${e.slice(0,240).map(n=>r`
          <div class="ix-item ${n.indexed?"on":""}" data-pid="${n.id}">
            ${n.image?r`<img src="${h(n.image)}" alt="" loading="lazy" data-h="54px" data-w="54px">`:r`<span class="ix-ph">${c("image")}</span>`}
            <span class="grow tiny">${h(n.name.slice(0,46))}</span>
            ${n.indexed?r`<span class="badge-pill bp-success tiny">${c("check")}</span>`:r`<span class="badge-pill bp-muted tiny">${a("common.no")}</span>`}
          </div>`).join("")}
      </div>`:L({icon:"image",title:a("common.noData")})}`}function gm(t,e){var s,n;return N(t),t.querySelectorAll("[data-pick]").forEach(o=>{o.addEventListener("change",()=>{o.checked?ae.add(o.dataset.pick):ae.delete(o.dataset.pick);let i=t.querySelector("[data-selcount]");i&&(i.textContent=g(ae.size))})}),(s=t.querySelector("[data-size]"))==null||s.addEventListener("change",o=>{he.size=o.target.value}),(n=t.querySelector("[data-copies]"))==null||n.addEventListener("change",o=>{he.copies=Math.max(1,Number(o.target.value)||1)}),null}var qt,Le,Ge,ae,he,co=V(()=>{U();G();Z();dt();tt();ut();nt();Pn();qt=(t,e)=>q()?t:e,Le=[],Ge=[],ae=new Set,he={q:"",size:"40x25",copies:1};y("adm-bc-search",(t,e)=>{t.preventDefault(),he.q=String(new FormData(e).get("q")||"").trim(),T(!0)});y("adm-bc-all",()=>{Le.slice(0,100).forEach(t=>ae.add(t.id)),Fs()});y("adm-bc-none",()=>{ae.clear(),Fs()});y("adm-bc-nocode",()=>{ae=new Set(Le.filter(t=>!t.barcode).map(t=>t.id)),Fs()});y("adm-bc-gen",async(t,e)=>{var s,n,o;try{let i=await f.post("/api/admin/barcode/generate",{productId:e.dataset.id,count:1}),l=((n=(s=i.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=i.codes)==null?void 0:o[0])||"";l&&(E(`${a("adm.bGenerate")}: ${l}`),T(!0))}catch(i){S(i)}});y("adm-bc-build",async(t,e)=>{let s=e.closest("[data-admbody]")||document,n=await oo(s);n?E(`${g(n)} ${qt("\u0628\u0631\u0686\u0633\u0628 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F","labels ready")}`):Y(a("adm.bPickFirst"))});y("adm-bc-print",async(t,e)=>{let s=e.closest("[data-admbody]")||document;if(!await oo(s)){Y(a("adm.bPickFirst"));return}document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-testprint",async(t,e)=>{var i;let s=e.closest("[data-admbody]")||document;if(!s.querySelector("[data-labels]"))return;ae=new Set([(i=Le[0])==null?void 0:i.id].filter(Boolean)),Fs(),await oo(s),document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-scan",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("code")||"").trim(),n=e.closest(".card").querySelector("[data-scan-result]");if(s)try{let i=(await f.post("/api/admin/barcode/scan-log",{code:s})).product;n.innerHTML=r`
      <div class="row row-between">
        <div>
          <strong>${h(i.name)}</strong>
          <div class="tiny muted mono">${h(i.sku||"")} · ${h(i.barcode||"")}</div>
        </div>
        <div class="t-end">
          <div class="price-now">${A(i.price)}</div>
          <div class="tiny muted">${a("common.stock")}: ${g(i.stock)}</div>
        </div>
      </div>
      <div class="row row-wrap mt-s">
        <a class="btn btn-ghost btn-xs" href="#/admin/products/${i.id}">${c("edit")} ${a("common.edit")}</a>
        <a class="btn btn-ghost btn-xs" href="#/product/${i.id}" target="_blank" rel="noopener">${c("external")} ${a("adm.view")}</a>
      </div>`,E(a("adm.bFound"))}catch(o){n.innerHTML=r`<p class="muted small">${c("alert")} ${h((o==null?void 0:o.message)||a("adm.bNotFound"))}</p>`,(o==null?void 0:o.status)!==404&&S(o)}finally{e.querySelector("[name=code]").value="",e.querySelector("[name=code]").focus()}});y("adm-ix-run",async(t,e)=>{let s=Number(e.dataset.count||0)>0,n=document.querySelector("[data-ix-progress]"),o=document.querySelector("[data-ix-bar]"),i=document.querySelector("[data-ix-status]"),l=[...document.querySelectorAll(".ix-item")];if(!l.length)return;let p=s?l.filter(w=>!w.classList.contains("on")):l;if(!p.length){E(a("adm.ixDone"));return}e.disabled=!0,n&&(n.hidden=!1);let d=0,b=0,u=[],v=async()=>{if(u.length)try{let w=await f.post("/api/admin/image-index",{entries:u.splice(0,u.length)});b+=w.indexed||0}catch(w){S(w)}};for(let w of p){let $=w.querySelector("img");if($!=null&&$.src)try{let k=$.src.startsWith("http")&&!$.src.startsWith(location.origin)?f.url("/api/admin/image-thumb",{url:$.src}):$.src,C=await fs(k),H=w.dataset.pid;H&&u.push({productId:H,dhash:C.dhash,hist:C.hist})}catch(k){}d++,o&&(o.style.width=`${Math.round(d/p.length*100)}%`),i&&(i.textContent=`${g(d)} / ${g(p.length)}`),u.length>=40&&await v()}await v(),e.disabled=!1,E(`${a("adm.ixDone")} \u2014 ${g(b)}`),T(!0)})});var Os={};X(Os,{allowedSections:()=>io,mount:()=>wm,render:()=>$m,title:()=>km});async function $m(t){var l;let e=t.params.section||"",s=bc(e),n=io(),o="";if(!s)o=Aa("warn",e?a("adm.noPermission"):a("err.forbidden"))+r`<div class="card mt"><strong>${a("adm.title")}</strong><p class="muted small mt-s">${a("adm.noPermission")}</p></div>`;else try{o=await(await s.mod()).render(zt(mt({},t),{params:zt(mt({},t.params),{section:s.id}),admNav:n}))}catch(p){console.error("[admin] section render failed",p),o=Aa("danger",`${a("err.generic")} (${h((p==null?void 0:p.message)||"")})`)}let i=[...new Set(n.map(p=>p.grp))];return r`
    <div class="row row-between row-wrap mb">
      <div class="row">
        <h1 class="section-title">${c("settings")} ${a("adm.title")}</h1>
        <span class="badge-pill bp-accent">${h(((l=m.me)==null?void 0:l.role)==="owner"?q()?"\u0645\u0627\u0644\u06A9":"Owner":q()?"\u06A9\u0627\u0631\u0645\u0646\u062F":"Staff")}</span>
      </div>
      <div class="row row-wrap">
        ${Q("settings.edit")?r`
          <button class="btn btn-sm ${m.sleeping?"btn-success":"btn-ghost"}" data-act="adm-sleep-toggle" title="${m.sleeping?a("sys.turnOn"):a("sys.turnOff")}">
            ${c(m.sleeping?"zap":"moon")} ${m.sleeping?a("sys.turnOn"):a("sys.turnOff")}
          </button>`:""}
        <a class="btn btn-ghost btn-sm" href="#/">${c("arrow-right")} ${a("adm.backToSite")}</a>
      </div>
    </div>
    ${m.sleeping?Aa("warn",a("sys.sleepBanner")):""}
    <div class="adm-grid">
      <aside class="adm-side">
        ${i.map(p=>r`
          <div class="grp">${h(q()?vm[p]:ym[p])}</div>
          ${n.filter(d=>d.grp===p).map(d=>r`
            <a href="#/admin${d.id?`/${d.id}`:""}" class="${d.id===e||!e&&!d.id?"active":""}">
              ${c(d.icon)} <span>${d.label()}</span>
              ${d.count?r`<span class="cnt">${g(d.count)}</span>`:""}
            </a>`)}
        `).join("")}
      </aside>
      <div data-admbody>${o}</div>
    </div>`}async function wm(t,e){N(t);let s=e.params.section||"",n=bc(s);if(!n)return null;try{let o=await n.mod();if(typeof o.mount=="function")return o.mount(t.querySelector("[data-admbody]")||t,e)}catch(o){console.error("[admin] section mount failed",o)}return null}var fm,vm,ym,io,bc,km,js=V(()=>{U();G();K();tt();Z();ut();nt();fm=[{grp:"shop",id:"",perm:"dashboard.view",icon:"chart",label:()=>a("adm.dashboard"),mod:()=>Promise.resolve().then(()=>(Ar(),Cr))},{grp:"shop",id:"products",perm:"products.view",icon:"box",label:()=>a("adm.products"),mod:()=>Promise.resolve().then(()=>(Lr(),Mr))},{grp:"shop",id:"categories",perm:"categories.manage",icon:"layers",label:()=>a("adm.categories"),mod:()=>Promise.resolve().then(()=>(Br(),Rr))},{grp:"shop",id:"orders",perm:"orders.view",icon:"package-check",label:()=>a("adm.orders"),mod:()=>Promise.resolve().then(()=>(jr(),Or))},{grp:"people",id:"reviews",perm:"reviews.moderate",icon:"star",label:()=>a("adm.reviews"),mod:()=>Promise.resolve().then(()=>(Ur(),zr))},{grp:"people",id:"tickets",perm:"tickets.manage",icon:"ticket",label:()=>a("adm.tickets"),mod:()=>Promise.resolve().then(()=>(to(),Zn)),feat:"tickets"},{grp:"people",id:"support",perm:"tickets.manage",icon:"headset",label:()=>a("adm.supportChat"),mod:()=>Promise.resolve().then(()=>(to(),Zn)),feat:"liveSupport"},{grp:"people",id:"feedback",perm:"feedback.manage",icon:"flag",label:()=>a("adm.feedback"),mod:()=>Promise.resolve().then(()=>(Yr(),Vr))},{grp:"people",id:"users",perm:"users.view",icon:"users",label:()=>a("adm.users"),mod:()=>Promise.resolve().then(()=>(Zr(),Xr))},{grp:"people",id:"visitors",perm:"users.view",icon:"eye",label:()=>a("adm.visitors"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"growth",id:"coupons",perm:"coupons.manage",icon:"percent",label:()=>a("adm.coupons"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"coupons"},{grp:"growth",id:"settings/partners",perm:"settings.edit",icon:"store",label:()=>a("adm.sPartners"),mod:()=>Promise.resolve().then(()=>(_a(),Ua)),feat:"partners"},{grp:"growth",id:"ads",perm:"ads.manage",icon:"tag",label:()=>a("adm.ads"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"ads"},{grp:"growth",id:"notifications",perm:"notifications.send",icon:"bell",label:()=>a("adm.notifications"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"announcements"},{grp:"growth",id:"lottery",perm:"settings.edit",icon:"gift2",label:()=>a("adm.lottery"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"lottery"},{grp:"system",id:"telegram",perm:"settings.edit",icon:"send",label:()=>a("adm.telegram"),mod:()=>Promise.resolve().then(()=>(ha(),ba))},{grp:"system",id:"settings",perm:"settings.edit",icon:"settings",label:()=>a("adm.settings"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"theme",perm:"theme.edit",icon:"sun",label:()=>a("adm.theme"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"features",perm:"settings.edit",icon:"zap",label:()=>a("adm.features"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"pages",perm:"pages.edit",icon:"file",label:()=>a("adm.pages"),mod:()=>Promise.resolve().then(()=>(uc(),pc))},{grp:"system",id:"barcode",perm:"barcode.print",icon:"barcode",label:()=>a("adm.barcode"),mod:()=>Promise.resolve().then(()=>(co(),ro)),feat:"barcode"},{grp:"system",id:"imageSearch",perm:"imagesearch.index",icon:"camera",label:()=>a("adm.imageSearch"),mod:()=>Promise.resolve().then(()=>(co(),ro)),feat:"imageSearch"},{grp:"system",id:"audit",perm:"audit.view",icon:"history",label:()=>a("adm.audit"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"system",id:"stats",perm:"stats.view",icon:"chart",label:()=>a("adm.stats"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"system",id:"data",perm:"data.export",icon:"download",label:()=>a("adm.export"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))}],vm={shop:"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647",people:"\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627",growth:"\u0631\u0634\u062F \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",system:"\u0633\u0627\u0645\u0627\u0646\u0647"},ym={shop:"Store",people:"Customers",growth:"Growth & ads",system:"System"},io=()=>fm.filter(t=>(!t.perm||Q(t.perm))&&(!t.feat||B(t.feat))),bc=t=>io().find(e=>e.id===t)||null;km=()=>a("adm.title");y("adm-sleep-toggle",async(t,e)=>{let s=!m.sleeping,n=0;if(s){let o=await de({title:a("sys.turnOff"),text:a("sys.offConfirm"),label:a("sys.autoWakeMins"),value:"0",type:"number"});if(o===null)return;n=Math.max(0,Number(o)||0)}await D(e,async()=>{try{await f.post(s?"/api/system/sleep":"/api/system/wake",s?{minutes:n}:{}),await Ot({silent:!0}),document.dispatchEvent(new CustomEvent("sleep:changed")),E(s?n?a("sys.asleepTimed",{n}):a("sys.asleep"):a("sys.awake")),T(!0)}catch(o){S(o)}})})});var hc={};X(hc,{mount:()=>xm,render:()=>Sm});async function Sm(){var e;let t=decodeURIComponent((location.hash||"#/").slice(1));return r`
    <div class="center col mt-l nf-wrap">
      <div class="nf-code">۴۰۴</div>
      ${L({icon:"search",title:a("err.notFound"),text:`${a("err.notFoundText")} \u2014 ${t}`,action:{href:"#/",label:a("err.goHome")}})}
      <div class="row row-wrap center">
        <a class="btn btn-ghost btn-sm" href="#/products">${c("grid")} ${a("nav.products")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/faq">${c("info")} ${a("footer.faq")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/contact">${c("phone")} ${a("contact.title")}</a>
        <a class="btn btn-ghost btn-sm" href="#/search/image">${c("camera")} ${a("search.byImage")}</a>
      </div>
      ${(e=m.recent)!=null&&e.length?r`<p class="muted small">${a("misc.recentlyViewed")}: ${m.recent.length}</p>`:""}
    </div>`}function xm(t){return N(t),null}var gc=V(()=>{U();G();K();dt()});var pe={};X(pe,{currentRoute:()=>Am,href:()=>Pm,initRouter:()=>lo,navigate:()=>bt,parseHash:()=>vc,refresh:()=>T,render:()=>$c,routes:()=>fc,start:()=>ga});function vc(t=location.hash){let e=String(t||"").replace(/^#/,"");if(!e||e==="/")return{path:"/",query:new URLSearchParams,hashStr:""};let s="",n=e.indexOf("#");n>=0&&(s=e.slice(n+1),e=e.slice(0,n));let o=e.indexOf("?"),i=new URLSearchParams(o>=0?e.slice(o+1):""),l=o>=0?e.slice(0,o):e;return l.startsWith("/")||(l=`/${l}`),l=l.replace(/\/{2,}/g,"/"),l.length>1&&l.endsWith("/")&&(l=l.slice(0,-1)),{path:l,query:i,hashStr:s}}function Tm(t){let e=t.split("/").filter(s=>s!=="");for(let s of fc){let n=s.pattern.split("/").filter(l=>l!=="");if(n.length!==e.length)continue;let o={},i=!0;for(let l=0;l<n.length;l++)if(n[l].startsWith(":"))o[n[l].slice(1)]=decodeURIComponent(e[l]);else if(n[l]!==e[l]){i=!1;break}if(i)return{route:s,params:o}}return{route:qm,params:{}}}function Cm(t,e){var s,n,o;if(!t)return null;if(t==="auth"){if(!m.me){let i=encodeURIComponent(e.full);return it(a("err.loginRequired")),`#/auth?next=${i}`}return null}if(t==="admin")return(s=m.me)!=null&&s.isAdmin?null:(Y(a("err.forbidden")),"#/");if(t.startsWith("perm:")){let i=t.slice(5),{can:l}=e.helpers;return l(i)?null:(Y(a("adm.noPermission")),"#/admin")}if(t.startsWith("feature:")){let i=t.slice(8);return((o=(n=m.settings)==null?void 0:n.features)==null?void 0:o[i])===!1?(it(a("err.notFound")),"#/"):null}return null}async function $c(t){var i,l,p,d,b;let e=Em();if(!e)return;let s=++Va;if(zs){try{zs()}catch(u){}zs=null}Da(!0),e.innerHTML=t.skeleton||'<div class="sk sk-card"></div>';let n=null;try{n=await t.route.load()}catch(u){if(console.error("[router] load failed",u),s!==Va)return;e.innerHTML=`<div class="empty"><h4>${a("err.generic")}</h4><p>${a("err.network")}</p></div>`,Da(!1);return}if(s!==Va)return;let o="";try{o=await n.render(t)}catch(u){console.error("[router] render failed",u),o=`<div class="empty"><h4>${a("err.generic")}</h4><p>${String((u==null?void 0:u.message)||u)}</p></div>`}if(s===Va){e.innerHTML=o,N(e),setTimeout(()=>Promise.resolve().then(()=>(po(),mo)).then(u=>u.maybeConsent&&u.maybeConsent()),300);try{let u=((l=(i=m.settings)==null?void 0:i.store)==null?void 0:l[t.lang==="en"?"nameEn":"name"])||"\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",v=typeof n.title=="function"?n.title(t):n.title||((d=(p=t.route).title)==null?void 0:d.call(p,t))||"";document.title=v?`${v} \xB7 ${u}`:u}catch(u){}try{if(typeof n.mount=="function"){let u=n.mount(e,t);typeof u=="function"&&(zs=u)}}catch(u){console.error("[router] mount failed",u)}if(s===Va){Da(!1),document.dispatchEvent(new CustomEvent("view:rendered",{detail:t})),Dm(t),t.keepScroll||(window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),50));try{(b=e.closest("#view"))==null||b.focus({preventScroll:!0})}catch(u){}}}}function Dm(t){let e=t.path,s=e==="/products"&&t.query.get("discount")==="1",n=e==="/products"&&t.query.get("sort")==="newest";document.querySelectorAll(".nav-link[data-nav-key]").forEach(o=>{let i=!1;o.dataset.navKey==="/deals"?i=s:o.dataset.navKey==="/new"?i=n:o.dataset.navKey==="/products"?i=e==="/products"&&!s&&!n:i=o.dataset.navKey===e||o.dataset.navKey!=="/"&&e.startsWith(o.dataset.navKey),o.classList.toggle("active",i)}),document.querySelectorAll(".mobile-nav a[data-mn]").forEach(o=>{let i=o.dataset.mn,l=i==="home"&&e==="/"||i==="cats"&&(e.startsWith("/products")||e.startsWith("/category")||e.startsWith("/product"))||i==="search"&&e.startsWith("/search")||i==="cart"&&e.startsWith("/cart")||i==="me"&&(e.startsWith("/account")||e.startsWith("/auth"));o.classList.toggle("active",l)})}function bt(t,{replace:e=!1,keepScroll:s=!1}={}){let n=String(t||"#/"),o=n.startsWith("#")?n:`#${n}`;if(location.hash===o){ga({keepScroll:s});return}e?history.replaceState(null,"",o):location.hash=o,e&&ga({keepScroll:s})}function Pm(t,e){let n=(e instanceof URLSearchParams?e:new URLSearchParams(e||{})).toString();return`#${t.startsWith("/")?t:`/${t}`}${n?`?${n}`:""}`}function ga(t={}){let{path:e,query:s,hashStr:n}=vc(),{route:o,params:i}=Tm(e),l=`${e}${s.toString()?`?${s}`:""}`,p={path:e,params:i,query:s,hashStr:n,full:l,route:o,lang:document.documentElement.getAttribute("data-lang")||"fa",keepScroll:!!t.keepScroll,skeleton:o.skeleton||"",helpers:{}};yc=p;let d=Cm(o.guard,p);if(d){if(d!==location.hash){location.replace(d);return}return}$c(p)}function lo(){window.addEventListener("hashchange",()=>ga()),ga()}function T(t=!1){ga({keepScroll:t})}var Em,fc,qm,Va,yc,zs,Am,nt=V(()=>{U();G();K();tt();Em=()=>I("#viewInner"),fc=[{pattern:"/",load:()=>Promise.resolve().then(()=>(Fo(),Ho)),title:()=>a("nav.home")},{pattern:"/products",load:()=>Promise.resolve().then(()=>(Dn(),An)),title:()=>a("catalog.title")},{pattern:"/category/:id",load:()=>Promise.resolve().then(()=>(Dn(),An)),title:()=>a("catalog.title")},{pattern:"/product/:id",load:()=>Promise.resolve().then(()=>(Uo(),zo)),title:t=>t.params.id},{pattern:"/search/image",load:()=>Promise.resolve().then(()=>(Wo(),_o)),title:()=>a("search.imageTitle"),guard:"feature:imageSearch"},{pattern:"/cart",load:()=>Promise.resolve().then(()=>(Yo(),Vo)),title:()=>a("cart.title")},{pattern:"/checkout",load:()=>Promise.resolve().then(()=>(Qo(),Ko)),title:()=>a("checkout.title")},{pattern:"/checkout/done/:id",load:()=>Promise.resolve().then(()=>(Xo(),Jo)),title:()=>a("checkout.successTitle")},{pattern:"/pay/:id",load:()=>Promise.resolve().then(()=>(tr(),Zo)),title:()=>a("common.payment")},{pattern:"/compare",load:()=>Promise.resolve().then(()=>(ar(),er)),title:()=>a("compare.title"),guard:"feature:compare"},{pattern:"/lottery",load:()=>Promise.resolve().then(()=>(nr(),sr)),title:()=>a("lot.title")},{pattern:"/price-check",load:()=>Promise.resolve().then(()=>(lr(),ir)),title:()=>a("priceCheck.title"),guard:"feature:priceCheckDevice"},{pattern:"/auth",load:()=>Promise.resolve().then(()=>(In(),Nn)),title:()=>a("auth.title")},{pattern:"/auth/:mode",load:()=>Promise.resolve().then(()=>(In(),Nn)),title:()=>a("auth.title")},{pattern:"/account",load:()=>Promise.resolve().then(()=>(zn(),jn)),title:()=>a("acc.title"),guard:"auth"},{pattern:"/account/:section",load:()=>Promise.resolve().then(()=>(zn(),jn)),title:()=>a("acc.title"),guard:"auth"},{pattern:"/account/orders/:id",load:()=>Promise.resolve().then(()=>(yr(),vr)),title:()=>a("acc.trackOrder"),guard:"auth"},{pattern:"/account/tickets/:id",load:()=>Promise.resolve().then(()=>(kr(),wr)),title:()=>a("common.ticket"),guard:"auth"},{pattern:"/stats",load:()=>Promise.resolve().then(()=>(xr(),Sr)),title:()=>a("nav.stats"),guard:"feature:publicStats"},{pattern:"/pages/:key",load:()=>Promise.resolve().then(()=>(Tr(),qr)),title:t=>t.params.key},{pattern:"/admin",load:()=>Promise.resolve().then(()=>(js(),Os)),title:()=>a("adm.title"),guard:"admin"},{pattern:"/admin/:section",load:()=>Promise.resolve().then(()=>(js(),Os)),title:()=>a("adm.title"),guard:"admin"},{pattern:"/admin/:section/:id",load:()=>Promise.resolve().then(()=>(js(),Os)),title:()=>a("adm.title"),guard:"admin"}],qm={pattern:"/404",load:()=>Promise.resolve().then(()=>(gc(),hc)),title:()=>a("err.notFound")};Va=0,yc=null,zs=null,Am=()=>yc});function y(t,e){return fa.set(t,e),e}function ks(t){return fa.get(t)}async function _e(t){if(!t)return;let e=t.querySelector("[data-cch]"),s=t.querySelector("[data-cimg]"),n=t.querySelector("[data-ctok]"),o=t.querySelector("[data-cst]"),i=t.querySelector("[name=captchaAnswer]");n&&(n.value=""),i&&(i.value="",i.disabled=!1);let l=t.querySelector("[name=captchaBox]");l&&(l.disabled=!1);try{let p=await f.get("/api/captcha");if(p.disabled){t.hidden=!0;return}t.hidden=!1,t.dataset.cid=p.id,s&&(s.innerHTML=p.svg||""),o&&(o.textContent=a("captcha.hint")),e&&(e.hidden=!(l!=null&&l.checked))}catch(p){}}function na(t){var s;let e=(s=t==null?void 0:t.querySelector)==null?void 0:s.call(t,"[data-captcha]");e&&(e.hidden=!1,_e(e))}function kc(){document.addEventListener("click",t=>{let e=t.target.closest("[data-act]");if(!e||e.tagName==="FORM")return;e.tagName==="A"&&t.preventDefault();let s=e.dataset.act,n=fa.get(s);if(!n){console.warn("[actions] unknown:",s);return}try{let o=n(t,e);o&&typeof o.catch=="function"&&o.catch(i=>{console.error("[action]",s,i),i!=null&&i.code&&S(i)})}catch(o){console.error("[action]",s,o)}}),document.addEventListener("submit",t=>{var o;let e=t.target,s=(o=e==null?void 0:e.dataset)==null?void 0:o.act;if(!s)return;t.preventDefault();let n=fa.get(s);if(!n){console.warn("[actions] unknown submit:",s);return}try{let i=n(t,e);i&&typeof i.catch=="function"&&i.catch(l=>{console.error("[action]",s,l),l!=null&&l.code&&S(l)})}catch(i){console.error("[action]",s,i)}}),document.addEventListener("change",t=>{var i,l,p,d,b;let e=t.target;if((i=e.matches)!=null&&i.call(e,".qty input"))return;let s=(l=e.dataset)!=null&&l.act?null:(p=e.closest)==null?void 0:p.call(e,"form[data-act][data-live]");if(!((d=e.dataset)!=null&&d.act)&&!s)return;let n=(b=e.dataset)!=null&&b.act?e:s,o=fa.get(n.dataset.act);if(o)try{let u=o(t,n);u&&typeof u.catch=="function"&&u.catch(v=>console.error(v))}catch(u){console.error(u)}}),document.addEventListener("click",t=>{let e=t.target.closest(".qty [data-q]");if(!e)return;t.preventDefault(),fa.get("qty-btn")(t,e)}),document.addEventListener("error",t=>{let e=t.target;if((e==null?void 0:e.tagName)!=="IMG"||e.dataset.fallbackDone)return;e.dataset.fallbackDone="1";let s=e.dataset.glyph||"misc";e.src=Mm(s)},!0)}function Mm(t){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123a52"/><stop offset="1" stop-color="#0a2135"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g fill="none" stroke="#7fd3ec" stroke-opacity=".8" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="${wc[t]||wc.box}"/></g></svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}var fa,wc,ut=V(()=>{K();G();tt();Z();U();K();nt();tt();fa=new Map;y("add-cart",async(t,e)=>{let s=e.dataset.id,n=Number(e.dataset.qty||1)||1;await D(e,async()=>{try{await ss(s,n),E(a("card.added"),{timeout:2600})}catch(o){S(o)}})});y("wish-toggle",async(t,e)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await ln(e.dataset.id);it(s.in?a("card.wishlistAdd"):a("card.wishlistRemove"),{timeout:2e3})}catch(s){S(s)}});y("compare-toggle",async(t,e)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{(await dn(e.dataset.id)).in===!1?it(a("compare.remove"),{timeout:1800}):E(a("compare.add"),{timeout:1800})}catch(s){S(s)}});y("notify-me",async(t,e)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await mn(e.dataset.id);E(s.on?a("common.notified"):a("common.notifyMe"),{timeout:2400}),document.querySelectorAll(`[data-act="notify-me"][data-id="${e.dataset.id}"]`).forEach(n=>{n.classList.toggle("active",s.on)})}catch(s){S(s)}});y("lightbox",(t,e)=>{let s=[];try{s=JSON.parse(e.dataset.imgs||"[]")}catch(n){s=[e.dataset.imgs||""]}He(s,Number(e.dataset.i||0),e.dataset.alt||"")});y("sound-toggle",()=>{var s;let t=!((s=m.prefs)!=null&&s.uiSound);Te("uiSound",t);let e=document.querySelector('[data-act="sound-toggle"]');e&&(e.setAttribute("aria-pressed",String(t)),e.innerHTML=r`${c(t?"volume":"volume-off")} ${a("misc.uiSound")} <span class="um-sw ${t?"on":""}" aria-hidden="true"></span>`),it(t?a("misc.uiSoundOn"):a("misc.uiSoundOff"),{timeout:1600}),t&&ds(!0)});y("copy",async(t,e)=>{let{copyText:s}=await Promise.resolve().then(()=>(U(),ts));try{await s(e.dataset.text||e.textContent.trim()),E(a("common.copied"),{timeout:1800})}catch(n){Y(a("err.generic"))}});y("share",async(t,e)=>{let s=e.dataset.url||location.href,n=e.dataset.title||document.title;if(navigator.share)try{await navigator.share({title:n,url:s});return}catch(i){return}let{copyText:o}=await Promise.resolve().then(()=>(U(),ts));try{await o(s),E(a("misc.shareDone"),{timeout:2e3})}catch(i){Y(a("err.generic"))}});y("quick-view",async(t,e)=>{var n;let s=e.dataset.id;try{let i=(await f.get(`/api/products/${encodeURIComponent(s)}`)).product;pt({title:ft(i),size:"md",body:r`
        <div class="row">
          <div class="qv-media">${(n=i.images)!=null&&n[0]?r`<img src="${i.images[0]}" alt="${ft(i)}" class="qv-img" data-glyph="${i.glyph||"misc"}">`:c(i.glyph||"box")}</div>
          <div class="grow">
            ${i.brandName?r`<div class="pc-brand">${i.brandName}</div>`:""}
            <div class="pc-rate mb-s">${Ht(i.ratingAvg)} <span class="muted tiny">${g(i.ratingAvg)} · ${g(i.ratingCount)} ${a("common.reviews")}</span></div>
            <div class="buy-price">
              ${i.oldPrice>i.price?r`<span class="pc-old">${A(i.oldPrice)}</span>`:""}
              <span class="buy-now">${A(i.price)}</span>
            </div>
            <div class="pc-stock ${i.stock<=0?"out":i.stock<=3?"low":""}"><span class="dot"></span>${i.stock<=0?a("card.outOfStock"):a("pdp.stockCount",{n:g(i.stock)})}</div>
          </div>
        </div>
        ${i.description?r`<p class="muted small mt-s">${h(i.description).slice(0,220)}…</p>`:""}
        <div class="row mt">
          <a class="btn btn-ghost" href="#/product/${i.id}">${a("common.details")} ${c("chevron-left")}</a>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-close>${a("common.close")}</button>
        <button type="button" class="btn btn-primary" data-add ${i.stock<=0?"disabled":""}>${c("cart")} ${a("pdp.addToCart")}</button>`,onMount:(l,p)=>{l.querySelector("[data-close]").addEventListener("click",()=>p.close()),l.querySelector("[data-add]").addEventListener("click",async d=>{await D(d.currentTarget,async()=>{try{await ss(i.id,1),E(a("card.added"),{timeout:2200}),p.close()}catch(b){S(b)}})})}})}catch(o){S(o)}});y("ui-retry",()=>{Promise.resolve().then(()=>(nt(),pe)).then(t=>t.refresh())});y("scroll-top",()=>window.scrollTo({top:0,behavior:"smooth"}));y("qty-btn",(t,e)=>{let s=e.closest(".qty"),n=s==null?void 0:s.querySelector("input");if(!n)return;let o=Number(e.dataset.q||0),i=Number(n.min||1),l=Number(n.max||99),p=Math.max(i,Math.min(l,(Number(n.value)||i)+o));n.value=p,n.dispatchEvent(new Event("change",{bubbles:!0}))});y("confirm-nav",async(t,e)=>{await wt({text:e.dataset.text||a("misc.confirmDelete"),danger:e.dataset.danger==="1",okText:e.dataset.ok||""})&&e.dataset.href&&bt(e.dataset.href)});y("acc",(t,e)=>{let s=e.closest(".acc-item");if(!s)return;let n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),e.setAttribute("aria-expanded",String(n))});y("print-page",()=>{window.print()});y("captcha-open",(t,e)=>{let s=e.closest("[data-captcha]"),n=s==null?void 0:s.querySelector("[data-cch]");n&&(n.hidden=!e.checked,e.checked&&!s.dataset.cid&&_e(s))});y("captcha-refresh",(t,e)=>_e(e.closest("[data-captcha]")));y("captcha-check",async(t,e)=>{let s=e.closest("[data-captcha]");if(!s||e.disabled||s.dataset.verifying)return;let n=s==null?void 0:s.querySelector("[data-cst]"),o=s==null?void 0:s.querySelector("[data-ctok]"),i=String(e.value||"").trim();if(!(!i||!(s!=null&&s.dataset.cid))){s.dataset.verifying="1";try{let l=await f.post("/api/captcha/verify",{id:s.dataset.cid,answer:i});o&&(o.value=l.token||"");let p=s.querySelector("[name=captchaBox]");p&&(p.checked=!0,p.disabled=!0),e.disabled=!0,n&&(n.textContent=a("captcha.solved"),n.style.color="")}catch(l){n&&(n.textContent=(l==null?void 0:l.message)||a("captcha.hint"),n.style.color="var(--danger)"),e.value="",await _e(s)}finally{delete s.dataset.verifying}}});y("noop",()=>{});y("open-select",(t,e)=>{let s=e.dataset.name,n=e.dataset.title||a("common.select"),o=e.dataset.val,i=[];try{i=JSON.parse(e.dataset.opts||"[]")}catch(p){}let l=Sn({title:n,body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
      ${i.map(p=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: ${String(p.value)===String(o)?"var(--primary)":"var(--surface-2)"}; color: ${String(p.value)===String(o)?"#fff":"inherit"}; border-radius: 12px; font-size: 15px;" data-v="${p.value}">${p.label}</button>`).join("")}
    </div>`});l.panel.querySelectorAll("button[data-v]").forEach(p=>{p.addEventListener("click",()=>{let d=p.dataset.v;e.dataset.val=d;let b=e.querySelector(".sb-txt");b&&(b.textContent=p.textContent);let u=e.parentElement.querySelector(`input[name="${s}"]`);u&&(u.value=d,u.dispatchEvent(new Event("change",{bubbles:!0}))),l.close()})})});wc={cable:"M30 40h14v14H30zM37 54c0 18 12 20 20 14s20-4 22 8M62 66h16v12H62z",adapter:"M34 34h32v34H34zM42 34V22M58 34V22M44 68h12v8H44z",shield:"M34 22h32v56H34zM40 28h12v16H40z",layers:"M36 26h28v48H36zM30 34l30-14 30 14",battery:"M26 40h48v26H26zM32 46h8v14h-8zM44 46h8v14h-8z",plug:"M24 42h34v16H24zM58 36h22v28H58z",speaker:"M30 24h40v52H30zM50 54a10 10 0 1 0 0 .1M50 32a5 5 0 1 0 0 .1",headset:"M28 56a22 22 0 0 1 44 0M24 52h10v20H24zM66 52h10v20H66z",watch:"M38 34h24v32H38zM42 14h16v20H42zM42 66h16v20H42z",camera:"M50 18a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM50 54v34M50 88l-14-24M50 88l14-24",zap:"M26 44h14l6-8h10l6 8h14a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20",truck:"M38 28h24v30H38zM44 58h12v10H44z",light:"M30 26h18l6 12H24zM34 38h20v40H34z",mic:"M42 18h16v28H42zM36 40a14 14 0 0 0 28 0M50 54v30M36 86h28",box:"M26 36 50 24l24 12v28L50 76 26 64zM26 36l24 12 24-12M50 48v28",phone:"M36 16h28v68H36zM44 74h12"};y("pdp-lower-price",(t,e)=>{let s=e.dataset.id;Promise.resolve().then(()=>(tt(),ms)).then(({modal:n})=>{n({title:"\u06AF\u0632\u0627\u0631\u0634 \u0642\u06CC\u0645\u062A \u0645\u0646\u0627\u0633\u0628\u200C\u062A\u0631",content:r`
        <form data-act="submit-lower-price" data-id="${s}">
          <p class="mb">اگر این کالا را در فروشگاه دیگری با قیمت پایین‌تر دیده‌اید، به ما اطلاع دهید:</p>
          <div class="form-grid mb">
            ${field({label:"\u0642\u06CC\u0645\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631 (\u062A\u0648\u0645\u0627\u0646)",name:"price",type:"number",required:!0})}
            ${field({label:"\u0622\u062F\u0631\u0633 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 (\u0644\u06CC\u0646\u06A9 \u0633\u0627\u06CC\u062A \u06CC\u0627 \u0646\u0627\u0645)",name:"url",required:!0})}
          </div>
          <div class="row row-wrap mt">
            <button type="submit" class="btn btn-primary">${c("send")} ثبت</button>
            <button type="button" class="btn btn-ghost" data-act="modal-close">لغو</button>
          </div>
        </form>
      `})})});y("submit-lower-price",async(t,e)=>{t.preventDefault();let{withBusy:s,toastSuccess:n,toastApiError:o}=await Promise.resolve().then(()=>(tt(),ms));await s(e,async()=>{var i,l;try{await f.post("/api/reports/lower-price",{productId:e.dataset.id,price:Number(e.price.value),url:e.url.value}),n("\u0628\u0627 \u062A\u0634\u06A9\u0631! \u06AF\u0632\u0627\u0631\u0634 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F."),(l=(i=e.closest('[role="dialog"]'))==null?void 0:i.querySelector("[data-lx]"))==null||l.click()}catch(p){o(p)}})});y("accept-consent-now",async(t,e)=>{let{setConsent:s}=await Promise.resolve().then(()=>(K(),qa));s({terms:!0,privacy:!0,marketing:!1}),E(isFa()?"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u067E\u0630\u06CC\u0631\u0641\u062A\u0647 \u0634\u062F.":"Terms accepted."),sessionStorage.removeItem("consentDeferred");let{maybeConsent:n}=await Promise.resolve().then(()=>(po(),mo));n(),Promise.resolve().then(()=>(nt(),pe)).then(o=>o.refresh())})});function Lm(){let t=Xt().mapCoords||{lat:35.731026,lng:51.488461};return{lat:Number(t.lat),lng:Number(t.lng)}}function Nm(t,e){let s=`${t.lat},${t.lng}`,n=e?`${e.lat},${e.lng}`:"";return[{id:"neshan",label:a("contact.neshan"),icon:"map",href:e?`https://nshn.ir/maps?origin=${n}&destination=${s}&type=drive`:`https://nshn.ir/?lat=${t.lat}&lng=${t.lng}`},{id:"balad",label:a("contact.balad"),icon:"pin",href:e?`https://balad.ir/route/${n.replace(",",",")}/${s}`:`https://balad.ir/map?lat=${t.lat}&lng=${t.lng}`},{id:"osm",label:a("contact.osm"),icon:"globe",href:e?`https://www.openstreetmap.org/directions?from=${n.replace(",",";")}&to=${s.replace(",",";")}`:`https://www.openstreetmap.org/?mlat=${t.lat}&mlon=${t.lng}#map=17/${t.lat}/${t.lng}`},{id:"google",label:a("contact.google"),icon:"external",href:e?`https://www.google.com/maps/dir/?api=1&destination=${s}&origin=${n}`:`https://www.google.com/maps/search/?api=1&query=${s}`}]}function Im(){return new Promise(t=>{if(!("geolocation"in navigator))return t(null);let e=!1,s=o=>{e||(e=!0,t(o))},n=setTimeout(()=>s(null),7e3);navigator.geolocation.getCurrentPosition(o=>{clearTimeout(n),s({lat:o.coords.latitude,lng:o.coords.longitude})},()=>{clearTimeout(n),s(null)},{enableHighAccuracy:!1,timeout:6e3,maximumAge:12e4})})}function Rm(){let t=Lm(),e=null;return pt({title:a("contact.mapAsk"),size:"sm",body:r`
      <p class="notice notice-info mb">${c("info")}<span>${a("contact.mapPermission")}</span></p>
      <div class="col" data-maps></div>`,footer:r`<button type="button" class="btn btn-ghost" data-x>${a("common.close")}</button>`,onMount:(n,o)=>{let i=n.querySelector("[data-maps]"),l=()=>{i.innerHTML=Nm(t,e).map(p=>r`
          <a class="btn btn-ghost btn-block" href="${p.href}" target="_blank" rel="noopener noreferrer">${c(p.icon)} ${p.label} ${c("external")}</a>`).join("")};l(),n.querySelector("[data-x]").addEventListener("click",()=>o.close()),Im().then(p=>{p&&(e=p,l(),E(a("contact.locationOn"),{timeout:2400}))})}})}var Sc=V(()=>{G();K();tt();U();ut();y("open-map",t=>{var e;(e=t.preventDefault)==null||e.call(t),Rm()});y("install-app",async()=>{m.installPrompt?await Ea()||Fe():Fe()})});var mo={};X(mo,{ecoPaused:()=>ip,maybeConsent:()=>Tc,updateBadges:()=>va});async function Bm(){var t;kc(),location.search.includes("_nocache")&&history.replaceState(null,"",location.pathname+location.hash),_m(),await nn(),Qe(),ya(),Xe(),Vm(),Gm(),br(),$n(),wn(),Xm(),Zm(),lo(),np(),ep(),Km(),Qm(),rp(),lp(),dp(),sp(),ap(),Tc(),tp(),Ec(),Fm(),Om(),jm(),(t=document.getElementById("bootSplash"))==null||t.remove()}function Ec(){let t=document.getElementById("welcomeScreen");if(!t)return;let e=Math.max(0,700-(performance.now()-Hm));setTimeout(()=>{t.classList.add("gone"),setTimeout(()=>t.parentNode&&t.parentNode.removeChild(t),520)},e)}function Fm(){let t=document.getElementById("btnRefresh");t&&t.addEventListener("click",async()=>{if(typeof navigator!="undefined"&&!navigator.onLine){let{toastError:e}=await Promise.resolve().then(()=>(tt(),ms)),{isFa:s}=await Promise.resolve().then(()=>(G(),qo));e(s()?"\u0628\u0631\u0627\u06CC \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648 \u062D\u0630\u0641 \u06A9\u0634 \u0628\u0627\u06CC\u062F \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0645\u062A\u0635\u0644 \u0628\u0627\u0634\u06CC\u062F":"You must be online to refresh the app.");return}try{if("serviceWorker"in navigator){let e=await navigator.serviceWorker.getRegistrations();for(let s of e)await s.unregister()}if("caches"in window){let e=await caches.keys();for(let s of e)await caches.delete(s)}}catch(e){console.warn("Cache clear failed",e)}location.href=location.pathname+"?_nocache="+Date.now()})}function Om(){let t=()=>{for(let s of document.querySelectorAll('button[aria-label],a[aria-label],[role="button"][aria-label]'))s.title||(s.title=s.getAttribute("aria-label")||"")};t();let e=new MutationObserver(()=>{clearTimeout(e._t),e._t=setTimeout(t,350)});e.observe(document.body,{childList:!0,subtree:!0})}function jm(){let t=new Set,e=(s,n,o)=>{let i=String(s).slice(0,120);if(!(t.has(i)||t.size>12)){t.add(i);try{let l=JSON.stringify({msg:String(s).slice(0,300),src:String(n||"").slice(0,200),line:o||0,path:location.hash.slice(0,120),build:window.__BM_BUILD||""});navigator.sendBeacon?navigator.sendBeacon("/api/client-error",new Blob([l],{type:"application/json"})):fetch("/api/client-error",{method:"POST",headers:{"Content-Type":"application/json"},body:l,keepalive:!0}).catch(()=>{})}catch(l){}}};window.addEventListener("error",s=>e(s.message,s.filename,s.lineno)),window.addEventListener("unhandledrejection",s=>{var n;return e(`unhandledrejection: ${((n=s.reason)==null?void 0:n.message)||s.reason}`,location.href,0)})}function Qe(){var d,b;let t=Xt(),e=re(),s=I("#topbar"),n=[];t.freeShipOver&&n.push(q()?`\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC ${g(t.freeShipOver)} \u062A\u0648\u0645\u0627\u0646`:`Free shipping over ${g(t.freeShipOver)}`),n.push(q()?"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627\u061B \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632":"Authenticity guarantee; 7-day returns"),t.phone&&n.push(q()?`\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0647\u0631 \u0631\u0648\u0632 \u06F9 \u062A\u0627 \u06F2\u06F1 \u2014 ${at(t.phone)}`:`Support 9\u201321 daily \u2014 ${at(t.phone)}`),(d=t.socials)!=null&&d.instagram,n.push(q()?"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u062C\u062A \u0647\u0631 \u0647\u0641\u062A\u0647 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u06CC\u0627\u0633\u0627\u06CC\u06CC":"New gadgets weekly on Instagram");let o=(b=m.ticker)!=null&&b.length?m.ticker:n;s.hidden=!1,s.classList.toggle("no-ticker",e.showTicker===!1);let i=o.map(u=>r`<span class="ticker-item">${c("sparkles")} ${u}</span>`).join("");I("#ticker").innerHTML=`<div class="ticker-track">${i}${i}</div>`;let l=I("#tb-phone");l.href=`tel:${t.phone||""}`,l.innerHTML=r`${c("phone")} ${at(t.phone||"")}`,I("#brandName").textContent=q()?t.name||a("app.name"):t.nameEn||t.name||"Yassaei Electronics",I("#brandTag").textContent=q()?t.tagline||"":t.taglineEn||"",I("#brandLink").setAttribute("aria-label",`${t.name||""} \u2014 ${a("nav.home")}`),zm(),Um(),_s(),va();let p=I("#btnInstallApp");p&&(p.hidden=m.installed)}function zm(){let t=I("#navInner"),e=m.categories.filter(d=>!d.parentId).slice(0,10),n=[{key:"/",href:"#/",icon:"home",label:a("nav.home")},{key:"/products",href:"#/products",icon:"grid",label:a("nav.products")}].map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${c(d.icon)} ${d.label}</a>`).join("");n+=r`
    <div class="nav-more">
      <a href="#/products" class="nav-link">${c("layers")} ${a("nav.allCategories")} ${c("chevron-down")}</a>
      <div class="nav-dd mega-menu hidden-default">
        <div class="mega-side">
          ${m.categories.filter(d=>!d.parentId).map(d=>r`<a href="#/category/${d.id}" class="mega-side-link" data-cat="${d.id}">${c(xe(d.glyph))} ${Et(d)}</a>`)}
        </div>
        <div class="mega-content">
          <div class="mega-empty muted small">${a("nav.allCategories")}</div>
        </div>
      </div>
    </div>`;let o=[{key:"/deals",href:"#/products?discount=1",icon:"percent",label:a("nav.deals"),show:B("coupons")},{key:"/new",href:"#/products?sort=newest",icon:"sparkles",label:a("nav.new"),show:!0},{key:"/stats",href:"#/stats",icon:"chart",label:a("nav.stats"),show:B("publicStats")},{key:"/price-check",href:"#/price-check",icon:"barcode",label:a("priceCheck.title"),show:B("priceCheckDevice")},{key:"/lottery",href:"#/lottery",icon:"gift2",label:a("lot.nav"),show:!0},{key:"/pages/installments",href:"#/pages/installments",icon:"card",label:q()?"\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC":"Installments",show:!0},{key:"/pages/about",href:"#/pages/about",icon:"store",label:a("nav.about"),show:!0},{key:"/pages/contact",href:"#/pages/contact",icon:"map",label:a("nav.contact"),show:!0}].filter(d=>d.show);n+=o.map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${c(d.icon)} ${d.label}</a>`).join("");let i=le("ticker");i.length&&(n+=r`<span class="nav-link muted tiny">${i[0].title}</span>`),t.innerHTML=n;let l=t.querySelectorAll(".mega-side-link"),p=t.querySelector(".mega-content");if(l.length&&p){let d=b=>{l.forEach(k=>k.classList.remove("active")),b.classList.add("active");let u=b.dataset.cat,v=m.categories.filter(k=>k.parentId===u),w=m.brands.slice(0,10),$=`<a href="#/category/${u}" class="mega-see-all" style="margin-top:0;">${a("nav.allCategories")} ${Et(m.categories.find(k=>k.id===u)||{})} ${c("chevron-left")}</a>`;$+='<div class="mega-sub-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start; align-content: start;">',v.length&&($+='<div class="mega-sub-col" style="display:flex; flex-direction:column; gap:8px;"><h3>\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647</h3>',v.forEach(k=>{$+=`<a href="#/category/${k.id}" style="margin:0;">${Et(k)}</a>`}),$+="</div>"),$+=`<div class="mega-sub-col" style="${v.length?"":"grid-column: 1 / -1;"} display:flex; flex-direction:column; gap:8px;"><h3>\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u067E\u0631\u0637\u0631\u0641\u062F\u0627\u0631 \u0627\u06CC\u0646 \u062F\u0633\u062A\u0647</h3><div style="display: flex; flex-wrap: wrap; gap: 8px;">`,w.forEach(k=>{$+=`<a href="#/products?cat=${u}&brand=${k.id}" class="chip" style="margin:0;">${Yt(k)}</a>`}),$+="</div></div></div>",p.innerHTML=$,p.scrollTop=0};l.forEach(b=>{b.addEventListener("mouseenter",()=>d(b))}),l[0]&&d(l[0])}}function Um(){let t=Xt();I("#fBrandName").textContent=q()?t.name||a("app.name"):t.nameEn||t.name||"",I("#fDesc").textContent=q()?t.description||"":t.descriptionEn||t.description||"",I("#fYear").textContent=q()?oe(new Date().getFullYear()):String(new Date().getFullYear()),I("#fBadges").innerHTML=r`
    <span class="f-badge">${c("shield")}<span>${a("home.point1")}</span></span>
    <span class="f-badge">${c("package-check")}<span>${a("home.point2")}</span></span>
    ${B("insurance")?r`<span class="f-badge">${c("scale")}<span>${a("common.insurance")}</span></span>`:""}
    ${B("plus")?r`<span class="f-badge">${c("sparkles")}<span>${a("footer.plus")}</span></span>`:""}`;let e=t.socials||{},s=[["instagram",Dt(e.instagram||"https://instagram.com/jam.yassaei"),"camera"],["telegram",Dt(e.telegram),"send"],["whatsapp",e.whatsapp?`https://wa.me/${String(e.whatsapp).replace(/\D/g,"")}`:"","chat"],["eitaa",Dt(e.eitaa),"globe"]].filter(n=>n[1]);I("#fSocial").innerHTML=s.length?s.map(([n,o,i])=>r`<a href="${o}" target="_blank" rel="noopener noreferrer" aria-label="${n}" title="${n}">${c(i)}</a>`).join(""):r`<span class="muted tiny">${a("footer.contactUs")}</span>`,I("#fContact").innerHTML=r`
    <li>${c("phone")}<span>${a("contact.phone")}: <a href="tel:${t.phone}">${at(t.phone||"")}</a></span></li>
    <li>${c("chat")}<span>${a("contact.mobile")}: <a href="tel:${t.phone2||t.phone}">${at(t.phone2||"")}</a></span></li>
    <li>${c("mail")}<span><a href="mailto:${t.email}">${t.email}</a></span></li>
    <li>${c("pin")}<span>${q()?t.address||"":t.addressEn||t.address||""}</span></li>
    <li>${c("clock")}<span>${a("footer.workingHours")}: ${(t.workingHours||[]).map(n=>r`<bdi>${q()?n.fa:n.en} ${q()?n.time:n.timeEn}</bdi>`)}</span></li>`,I("#fMinimap").innerHTML=ea(),I("#fMinimap").setAttribute("title",a("contact.mapTitle"))}function _s(){var l,p,d,b;let t=I("#userMenu"),e=I("#btnAuth");if(!m.me){t.hidden=!0,e.hidden=!1,e.innerHTML=r`${c("user")}<span data-i18n="nav.login">${a("nav.login")}</span>`;return}e.hidden=!0,t.hidden=!1;let s=m.me,n=(s.name||s.username||"?").trim().charAt(0);t.innerHTML=r`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${h(n)}</span>
      <span class="um-name">${h(s.name||s.username)}</span>
      ${c("chevron-down")}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${h(s.name||s.username)}</div>
        <div class="tiny muted">${h(s.phone||s.email||s.username)}</div>
        ${Zt()?r`<span class="badge-pill bp-accent mt-s">${c("sparkles")} ${a("acc.plus")}</span>`:""}
      </div>
      <a href="#/account">${c("user")} ${a("acc.dashboard")}</a>
      <a href="#/account/orders">${c("package-check")} ${a("acc.orders")}</a>
      <a href="#/account/wishlist">${c("heart")} ${a("acc.wishlist")} <span class="um-count">${g(m.wishlist.length)}</span></a>
      ${B("wallet")?r`<a href="#/account/wallet">${c("wallet")} ${a("acc.wallet")} <span class="um-count">${g(((l=s.wallet)==null?void 0:l.balance)||0)}</span></a>`:""}
      ${B("tickets")?r`<a href="#/account/tickets">${c("ticket")} ${a("acc.tickets")}</a>`:""}
      <a href="#/account/notifications">${c("bell")} ${a("acc.notifications")} ${m.unread?r`<span class="um-count">${g(m.unread)}</span>`:""}</a>
      ${s.isAdmin?r`<div class="sep"></div><a href="#/admin">${c("settings")} ${a("nav.admin")}</a>`:""}
      <div class="sep"></div>
      <button type="button" data-act="sound-toggle" aria-pressed="${(p=m.prefs)!=null&&p.uiSound?"true":"false"}">${c((d=m.prefs)!=null&&d.uiSound?"volume":"volume-off")} ${a("misc.uiSound")} <span class="um-sw ${(b=m.prefs)!=null&&b.uiSound?"on":""}" aria-hidden="true"></span></button>
      <button type="button" data-act="logout">${c("logout")} ${a("common.logout")}</button>
    </div>`;let o=t.querySelector("[data-um]"),i=t.querySelector("[data-umbox]");o.addEventListener("click",u=>{u.stopPropagation(),i.hidden=!i.hidden,o.setAttribute("aria-expanded",String(!i.hidden))}),document.addEventListener("click",u=>{!i.hidden&&!u.target.closest(".user-menu")&&(i.hidden=!0,o.setAttribute("aria-expanded","false"))})}function va(){var e,s;let t=(n,o)=>{let i=I(n);i&&(i.hidden=!o,i.textContent=g(o))};t("#cartBadge",((e=m.cart)==null?void 0:e.count)||0),t("#mnCart",((s=m.cart)==null?void 0:s.count)||0),t("#wishBadge",m.wishlist.length),t("#notifBadge",m.unread)}function _m(){var s,n,o,i;(s=I("#btnTheme"))==null||s.addEventListener("click",()=>{let p=(m.prefs.theme==="auto"?document.documentElement.getAttribute("data-mode")||"dark":m.prefs.theme)==="dark"?"light":"dark";Te("theme",p);let d=I("#btnTheme");d.innerHTML=c(p==="dark"?"moon":"sun")}),(n=I("#btnLang"))==null||n.addEventListener("click",async()=>{let l=$t()==="fa"?"en":"fa";Te("locale",l),I("#langChip").textContent=l==="fa"?"EN":"\u0641\u0627",Xe(),Qe(),Xe(),T(!0)}),(o=I("#btnMenu"))==null||o.addEventListener("click",()=>Wm());let t=I("#fabTop");t==null||t.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));let e=!1;addEventListener("scroll",()=>{e||!t||(e=!0,requestAnimationFrame(()=>{t.hidden=scrollY<600,e=!1}))},{passive:!0}),(i=I("#btnInstallApp"))==null||i.addEventListener("click",async()=>{m.installPrompt?await Ea()||Fe():Fe()})}function Wm(){kn({title:r`<div style="display:flex;align-items:center;gap:12px;font-size:16px;font-weight:700">
      ${c("menu")} ${a("nav.menu")}
    </div>`,body:r`
      <div class="col" style="gap: 8px">
        <a class="nav-link" href="#/" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("home")} ${a("nav.home")}</a>
        <a class="nav-link" href="#/products" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("grid")} ${a("nav.products")}</a>
        ${m.categories.filter(t=>!t.parentId).map(t=>r`<a class="nav-link" href="#/category/${t.id}" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c(xe(t.glyph))} ${Et(t)}</a>`).join("")}
        <div class="divider" style="margin: 4px 0"></div>
        <a class="nav-link" href="#/pages/installments" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("card")} خرید اقساطی</a>
        <a class="nav-link" href="#/pages/about" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("store")} ${a("nav.about")}</a>
        <a class="nav-link" href="#/pages/contact" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("map")} ${a("nav.contact")}</a>
        ${m.me?"":r`<a class="btn btn-primary btn-block mt-s" href="#/auth" style="margin-top: 16px">${c("user")} ${a("nav.login")}</a>`}
      </div>`})}function Vm(){var l,p;let t=I("#searchForm"),e=I("#searchInput"),s=I("#suggestBox"),n=-1,o=()=>{s.hidden=!0,n=-1},i=Ze(async()=>{var b,u,v;let d=e.value.trim();if(!d){if(!m.searches.length){o();return}s.hidden=!1,s.innerHTML=r`
        <div class="sg-group">${a("search.recent")}</div>
        ${m.searches.map(w=>r`<div class="sg-item" data-q="${w}">${c("history")}<span class="sg-title">${w}</span></div>`)}`;return}try{let w=await f.get(`/api/search?q=${encodeURIComponent(d)}&limit=7`);s.hidden=!1;let $="";w.didYouMean&&($+=r`<div class="sg-group">${a("search.didYouMean")}</div><div class="sg-item" data-q="${w.didYouMean}">${c("sparkles")}<span class="sg-title">${w.didYouMean}</span></div>`),(b=w.categories)!=null&&b.length&&($+=r`<div class="sg-group">${a("search.inCategories")}</div>${w.categories.map(k=>r`<a class="sg-item" href="#/category/${k.id}">${c(xe(k.glyph))}<span class="sg-title">${Et(k)}</span></a>`)}`),(u=w.brands)!=null&&u.length&&($+=r`<div class="sg-group">${a("search.inBrands")}</div>${w.brands.map(k=>r`<div class="sg-item" data-q="${Yt(k)}">${c("tag")}<span class="sg-title">${Yt(k)}</span></div>`)}`),(v=w.products)!=null&&v.length&&($+=r`<div class="sg-group">${a("search.inProducts")}</div>${w.products.map(k=>{var C;return r`
          <a class="sg-item" href="#/product/${k.id}">
            ${(C=k.images)!=null&&C[0]?r`<img class="sg-thumb" src="${k.images[0]}" alt="" loading="lazy" data-glyph="${k.glyph}">`:c(k.glyph||"box")}
            <span class="grow"><span class="sg-title">${ft(k)}</span><span class="sg-meta">${Et({name:k.categoryName,nameEn:k.categoryNameEn})}</span></span>
            <span class="sg-price">${g(k.price)}</span>
          </a>`})}`),$||($=r`<div class="sg-item muted">${a("common.noResult")}</div>`),s.innerHTML=$}catch(w){o()}},240);e.addEventListener("input",i),e.addEventListener("focus",i),document.addEventListener("click",d=>{d.target.closest(".searchbox")||o()}),s.addEventListener("click",d=>{if(d.target.closest("a.sg-item")){o();return}let b=d.target.closest("[data-q]");b&&(d.preventDefault(),e.value=b.dataset.q,o(),Us(b.dataset.q))}),window.addEventListener("hashchange",o),t.addEventListener("submit",d=>{d.preventDefault();let b=e.value.trim();o(),Us(b)}),e.addEventListener("keydown",d=>{var u;let b=[...s.querySelectorAll(".sg-item, a.sg-item")];if(d.key==="ArrowDown"||d.key==="ArrowUp"){if(!b.length)return;d.preventDefault(),n=(n+(d.key==="ArrowDown"?1:-1)+b.length)%b.length,b.forEach((v,w)=>v.classList.toggle("active",w===n)),(u=b[n])==null||u.scrollIntoView({block:"nearest"})}else if(d.key==="Enter"&&n>=0&&b[n]){d.preventDefault();let v=b[n];v.dataset.q?(e.value=v.dataset.q,Us(v.dataset.q)):v.getAttribute("href")&&(location.hash=v.getAttribute("href")),o()}else d.key==="Escape"&&o()}),(l=I("#btnVoiceSearch"))==null||l.addEventListener("click",()=>Ym(e,Us)),(p=I("#btnImageSearch"))==null||p.addEventListener("click",()=>{if(!B("imageSearch")){it(a("err.notFound"));return}bt("#/search/image")})}function Us(t){let e=String(t||"").trim();e&&(gn(e),bt(`/products?q=${encodeURIComponent(e)}`))}async function Ym(t,e){var l;let s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s){Y(a("search.noVoice"));return}try{(l=navigator.mediaDevices)!=null&&l.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(d=>d.stop())}catch(p){Y(a("search.micDenied"));return}let n=new s;n.lang=$t()==="fa"?"fa-IR":"en-US",n.interimResults=!1,n.maxAlternatives=1;let o=I("#btnVoiceSearch");o.classList.add("active");let i=it(a("search.listening"),{timeout:2600});n.onresult=p=>{var b,u,v;i==null||i.close();let d=((v=(u=(b=p.results)==null?void 0:b[0])==null?void 0:u[0])==null?void 0:v.transcript)||"";d?(t.value=d,e(d)):it(a("search.noSpeech"))},n.onerror=p=>{i==null||i.close();let b={"not-allowed":"search.micDenied","service-not-allowed":"search.micDenied",network:"search.voiceNetwork","no-speech":"search.noSpeech",aborted:null,"audio-capture":"search.noMic"}[p.error];b?Y(a(b)):p.error!=="aborted"&&Y(a("search.noSpeech"))},n.onend=()=>{o.classList.remove("active"),i==null||i.close()};try{n.start()}catch(p){o.classList.remove("active")}}function Gm(){let t=null,e=()=>{t==null||t.remove(),t=null,document.removeEventListener("keydown",onKey,!0)},s=async()=>{if(t){e();return}t=Jt("div",{class:"cmdk",role:"dialog","aria-modal":"true","aria-label":a("common.search")}),t.innerHTML=r`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${a("common.searchProducts")}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${a("common.select")}</span><span><kbd>Enter</kbd> ${a("common.next")}</span><span><kbd>Esc</kbd> ${a("common.close")}</span></div>
      </div>`,document.body.appendChild(t);let n=t.querySelector("[data-ci]"),o=t.querySelector("[data-cl]");n.focus();let i=()=>{var u;return[{icon:"home",label:a("nav.home"),href:"#/"},{icon:"grid",label:a("nav.products"),href:"#/products"},{icon:"percent",label:a("nav.deals"),href:"#/products?discount=1"},{icon:"cart",label:a("cart.title"),href:"#/cart"},...m.me?[{icon:"user",label:a("acc.dashboard"),href:"#/account"},{icon:"package-check",label:a("acc.orders"),href:"#/account/orders"},...B("wallet")?[{icon:"wallet",label:a("acc.wallet"),href:"#/account/wallet"}]:[]]:[{icon:"user",label:a("nav.login"),href:"#/auth"}],...(u=m.me)!=null&&u.isAdmin?[{icon:"settings",label:a("adm.title"),href:"#/admin"}]:[],{icon:"moon",label:a("theme.toggle"),run:()=>I("#btnTheme").click()},{icon:"globe",label:"English / \u0641\u0627\u0631\u0633\u06CC",run:()=>I("#btnLang").click()},{icon:"chart",label:a("nav.stats"),href:"#/stats"},{icon:"map",label:a("nav.contact"),href:"#/pages/contact"}]},l=async u=>{let v=i().filter(w=>!u||w.label.toLowerCase().includes(u.toLowerCase()));if(u)try{let w=await f.get(`/api/search?q=${encodeURIComponent(u)}&limit=6`);v=[...v,...w.products.map($=>({icon:$.glyph||"box",label:ft($),meta:g($.price),href:`#/product/${$.id}`}))]}catch(w){}o.innerHTML=v.length?v.map((w,$)=>r`<div class="cmdk-item ${$===0?"active":""}" data-idx="${$}">${c(w.icon)}<span class="grow">${w.label}</span>${w.meta?r`<span class="muted tiny">${w.meta}</span>`:""}</div>`):r`<div class="cmdk-item muted">${a("common.noResult")}</div>`,o._items=v};await l(""),n.addEventListener("input",Ze(()=>l(n.value.trim()),200));let p=u=>{var w;let v=(w=o._items)==null?void 0:w[u];v&&(e(),v.run?v.run():v.href&&(location.hash=v.href))};o.addEventListener("click",u=>{let v=u.target.closest("[data-idx]");v&&p(Number(v.dataset.idx))});let d=0,b=u=>{var w;let v=o.querySelectorAll(".cmdk-item[data-idx]");u.key==="Escape"?(u.preventDefault(),e()):u.key==="ArrowDown"||u.key==="ArrowUp"?(u.preventDefault(),d=(d+(u.key==="ArrowDown"?1:-1)+v.length)%Math.max(1,v.length),v.forEach(($,k)=>$.classList.toggle("active",k===d)),(w=v[d])==null||w.scrollIntoView({block:"nearest"})):u.key==="Enter"&&(u.preventDefault(),p(d))};document.addEventListener("keydown",b,!0),t.addEventListener("click",u=>{u.target===t&&e()})};document.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&String(n.key).toLowerCase()==="k"&&(n.preventDefault(),s())})}function Km(){Ft("cart",va),Ft("wishlist",()=>{va(),_s()}),Ft("notifications",va),Ft("me",()=>{_s(),va()}),Ft("settings",()=>{Ce(),Qe(),Xe(),ya()}),document.addEventListener("view:rendered",()=>ya()),document.addEventListener("sleep:changed",()=>{ya(),Qe()}),Ft("install",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!1)}),Ft("installed",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!0),E(a("home.appInstalled"))}),Ft("online",t=>{t?E(a("err.online")):Jm()})}function Qm(){let t=async()=>{if(!document.documentElement.classList.contains("eco"))try{let e=await f.get("/api/system/status"),s=!!m.sleeping;m.sleeping=!!e.sleeping,m.sleepSince=e.since||null,s!==m.sleeping&&(ya(),Qe(),String(location.hash||"").startsWith("#/admin")&&T(!0))}catch(e){}};setInterval(t,45e3),document.addEventListener("visibilitychange",()=>{document.hidden||t()})}function ya(){let t=String(location.hash||"").startsWith("#/admin"),e=Q("settings.edit");qn({sleeping:!!m.sleeping&&!(t&&e),canWake:e,since:m.sleepSince,onWake:async()=>{try{await f.post("/api/system/wake",{}),await Ot({silent:!0}),ya(),Qe(),E(a("sys.awake")),T(!0)}catch(s){S(s)}},onLogin:()=>bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)))})}function Jm(){uo||(uo=!0,Y(a("err.offline"),{timeout:4200}))}function Xm(){window.addEventListener("online",()=>{uo=!1})}function Zm(){let t=I("#siteHeader"),e=I("#fabTop"),s=!1;window.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(()=>{t.classList.toggle("scrolled",window.scrollY>8),e.hidden=window.scrollY<420,s=!1}))},{passive:!0})}function qc(){if(B("consent")){if(sessionStorage.getItem("consentDeferred"))if(!location.hash.startsWith("#/pages/"))sessionStorage.removeItem("consentDeferred");else return;pt({title:a("consent.title"),dismissible:!1,closeBtn:!1,size:"md",body:r`
      <p class="confirm-text mb">${a("consent.text")}</p>
      <p class="hint mt-s">${c("info")} ${a("consent.ttlNote")}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${c("check")}</span><span>${a("consent.terms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${c("check")}</span><span>${a("consent.privacy")} <a class="section-link" href="#/pages/privacy">${a("consent.readPrivacy")}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${c("check")}</span><span>${a("consent.marketing")}</span></label>
      </form>`,footer:r`<button type="button" class="btn btn-ghost" data-consent-min>${a("consent.rejectOptional")}</button><button type="button" class="btn btn-primary" data-consent-go>${a("consent.accept")}</button>`,onMount:(t,e)=>{let s=t.querySelector('[data-act="consent-form"]');t.querySelectorAll('a[href^="#/"]').forEach(o=>o.addEventListener("click",()=>{sessionStorage.setItem("consentDeferred","1"),e.close()}));let n=()=>{let o=s.querySelector("[name=terms]").checked,i=s.querySelector("[name=privacy]").checked,l=s.querySelector("[name=marketing]").checked;if(!o||!i){Y(a("form.termsRequired"));return}is({terms:o,privacy:i,marketing:l}),m.me&&f.patch("/api/me",{notificationsPrefs:{marketing:l}}).catch(()=>{}),E(a("consent.thanks")),e.close()};t.closest(".modal").querySelector("[data-consent-go]").addEventListener("click",n),t.closest(".modal").querySelector("[data-consent-min]").addEventListener("click",()=>{is({terms:!0,privacy:!0,marketing:!1}),m.me&&f.patch("/api/me",{notificationsPrefs:{marketing:!1}}).catch(()=>{}),E(a("consent.thanks")),e.close()}),s.addEventListener("submit",o=>{o.preventDefault(),n()})}})}}function Tc(){vn()||qc()}function tp(){var t;if((t=m.me)!=null&&t.mustChangePassword){try{if(sessionStorage.getItem("bm_pwd_later"))return}catch(e){}Ke=pt({title:a("acc.passwordChange"),dismissible:!1,closeBtn:!1,size:"sm",body:r`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${c("alert")}<span>${$t()==="fa"?"\u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631\u060C \u0631\u0645\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0628\u062F\u0647.":"For security, change the default password."}</span></p>
        <label class="field"><span class="label">${a("acc.currentPassword")}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${a("acc.newPassword2")}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${a("auth.passwordRules")}</span></label>
        <label class="field"><span class="label">${a("common.passwordConfirm")}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${a("common.save")}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${a("auth.pwdLater")}</button>
      </form>`})}}function ep(){let t="bm_visit";try{if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1")}catch(e){return}f.post("/api/visits",{path:location.hash||"/"}).catch(()=>{})}function ap(){let t=String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);if(!t)return;let e=t[1];try{history.replaceState(null,"",String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/,"").replace(/\?$/,""))}catch(s){}setTimeout(async()=>{try{await f.post("/api/cart/coupon",{code:e}),await Mt(),E(`${a("cart.couponApplied")}: ${e}`)}catch(s){}},700)}function sp(){document.addEventListener("keydown",t=>{var n,o,i;let e=String(((n=t.target)==null?void 0:n.tagName)||"").toLowerCase(),s=["input","textarea","select"].includes(e)||((o=t.target)==null?void 0:o.isContentEditable);if(t.key==="/"&&!s&&!t.metaKey&&!t.ctrlKey&&!t.altKey){let l=I("#searchInput");l&&(t.preventDefault(),l.focus(),(i=l.select)==null||i.call(l))}if(t.key==="Escape"&&document.activeElement===I("#searchInput")){let l=I("#searchInput");l.value="",l.blur(),I("#suggestBox")&&(I("#suggestBox").hidden=!0)}})}function np(){var e;if(!("serviceWorker"in navigator)||((e=an().features)==null?void 0:e.offlineMode)===!1)return;let t=async()=>{try{let s=await navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"});setInterval(()=>{s.update().catch(()=>{})},36e5),document.addEventListener("visibilitychange",()=>{document.hidden||s.update().catch(()=>{})}),s.addEventListener("updatefound",()=>{let n=s.installing;n&&n.addEventListener("statechange",()=>{n.state==="installed"&&navigator.serviceWorker.controller&&it(q()?"\u0628\u0631\u0627\u06CC \u0627\u0639\u0645\u0627\u0644 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0631\u0648\u06CC \u062F\u06A9\u0645\u0647 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F.":"Click update to apply changes.",{type:"info",title:q()?"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A":"Update Available",timeout:15e3,action:{label:q()?"\u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC":"Update",onClick:()=>{var o;(o=document.getElementById("btnRefresh"))==null||o.click()}}})})})}catch(s){}};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0})}function op(){fetch("/api/system/status",{cache:"no-store"}).then(t=>t.ok?t.json():null).then(t=>{t!=null&&t.build&&t.build!==en&&!sessionStorage.getItem("bm-upd-seen")&&(sessionStorage.setItem("bm-upd-seen","1"),it(a("update.available"),{timeout:0,action:{label:a("update.reload"),onClick:()=>location.reload()}}))}).catch(()=>{})}function rp(){if(!matchMedia("(pointer:fine)").matches)return;let t=I("#cursorHalo");if(!t)return;let e=innerWidth/2,s=innerHeight/2,n=e,o=s,i=0,l=()=>{n+=(e-n)*.22,o+=(s-o)*.22,t.style.left=`${n.toFixed(1)}px`,t.style.top=`${o.toFixed(1)}px`,i=requestAnimationFrame(l)};document.addEventListener("pointermove",p=>{var b,u;if(document.documentElement.classList.contains("eco"))return;e=p.clientX,s=p.clientY,document.documentElement.classList.add("halo-on"),i||(i=requestAnimationFrame(l));let d=(u=(b=p.target).closest)==null?void 0:u.call(b,'a, button, [role="button"], .pcard, .gal-thumb');document.documentElement.classList.toggle("halo-hot",!!d)},{passive:!0}),document.addEventListener("pointerleave",()=>{document.documentElement.classList.remove("halo-on")})}function ip(){return document.documentElement.classList.contains("eco")}function lp(){let t=()=>{document.documentElement.classList.contains("eco")||(document.documentElement.classList.add("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!0}})))},e=()=>{document.documentElement.classList.contains("eco")&&(document.documentElement.classList.remove("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!1}})),Promise.resolve().then(()=>(K(),qa)).then(n=>{var o;return(o=n.refreshBootstrap)==null?void 0:o.call(n,{silent:!0})}).catch(()=>{}))},s=()=>{clearTimeout(xc),xc=setTimeout(t,cp)};for(let n of["pointerdown","keydown","wheel","touchstart","pointermove"])document.addEventListener(n,()=>{document.documentElement.classList.contains("eco")&&e(),s()},{passive:!0,capture:!0});s()}function dp(){try{if(sessionStorage.getItem("bm_vis"))return;sessionStorage.setItem("bm_vis","1");let t={screen:`${screen.width}x${screen.height}`,tz:Intl.DateTimeFormat().resolvedOptions().timeZone||"",lang:navigator.language||"",ref:document.referrer?document.referrer.slice(0,200):"",path:location.hash.replace("#","")||"/"};Promise.resolve().then(()=>(Z(),xo)).then(e=>e.api.post("/api/track",t)).catch(()=>{})}catch(t){}}var Hm,uo,Ke,cp,xc,po=V(()=>{K();G();Z();U();tt();ut();nt();Fn();Sc();K();dt();setTimeout(Ec,1e4);Hm=performance.now();y("logout",async()=>{if(await wt({text:a("common.logout")+"\u061F",okText:a("common.logout")}))try{await f.post("/api/auth/logout"),m.me=null,await Mt(),Qe(),E(a("auth.logoutDone")),bt("#/"),T()}catch(e){Y(a("err.generic"))}});uo=!1;y("consent-form",()=>{});y("consent-manage",()=>qc());y("reload",()=>location.reload());Ke=null;y("pwd-later",()=>{try{sessionStorage.setItem("bm_pwd_later","1")}catch(t){}Ke==null||Ke.close(),it(a("auth.pwdLaterToast"))});y("force-pass",async(t,e)=>{let s=new FormData(e);if(s.get("next")!==s.get("confirm")){Y($t()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}try{await f.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),await te(),_s(),E(a("acc.passwordChanged")),Ke==null||Ke.close()}catch(n){Y(n.message)}});Ft("boot-slow",()=>document.body.classList.add("boot-slow"));Ft("boot-failed",()=>{let t=document.getElementById("welcomeScreen");t&&t.parentNode&&t.parentNode.removeChild(t);let e=I("#bootSplash");e&&(e.innerHTML=r`<div class="empty">
    <h4>${a("boot.failed")}</h4>
    <p class="muted small mt-s">${a("boot.failedHint")}</p>
    <button class="btn btn-primary mt" data-act="reload">${c("refresh")} ${a("common.retry")}</button>
  </div>`)});Bm().catch(t=>{console.error("[boot]",t);let e=document.getElementById("welcomeScreen");e&&e.parentNode&&e.parentNode.removeChild(e);let s=I("#bootSplash");s&&(s.innerHTML=r`<div class="empty"><h4>${a("err.generic")}</h4><button class="btn btn-primary" data-act="reload">${a("common.retry")}</button></div>`)});setTimeout(op,6e3);cp=240*1e3,xc=0});po();export{ip as ecoPaused,Tc as maybeConsent,va as updateBadges};
