var go=Object.defineProperty,Cc=Object.defineProperties;var Ac=Object.getOwnPropertyDescriptors;var bo=Object.getOwnPropertySymbols;var Dc=Object.prototype.hasOwnProperty,Pc=Object.prototype.propertyIsEnumerable;var ho=(t,a,s)=>a in t?go(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,mt=(t,a)=>{for(var s in a||(a={}))Dc.call(a,s)&&ho(t,s,a[s]);if(bo)for(var s of bo(a))Pc.call(a,s)&&ho(t,s,a[s]);return t},zt=(t,a)=>Cc(t,Ac(a));var W=(t,a,s)=>()=>{if(s)throw s[0];try{return t&&(a=t(t=0)),a}catch(n){throw s=[n],n}};var X=(t,a)=>{for(var s in a)go(t,s,{get:a[s],enumerable:!0})};var ko={};X(ko,{ApiError:()=>ne,api:()=>f,errorEn:()=>Nc,errorMessage:()=>Ys,getCookie:()=>$o,onLoading:()=>Lc,withQuery:()=>wo});function $o(t){let a=document.cookie.match(new RegExp("(?:^|; )"+t.replace(/[.$?*|{}()[\]\\/+^]/g,"\\$&")+"=([^;]*)"));return a?decodeURIComponent(a[1]):""}function fo(t){Qt||(Qt=document.createElement("div"),Qt.className="bm-queue-overlay",Qt.setAttribute("role","status"),Qt.innerHTML='<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>',document.documentElement.appendChild(Qt));let a=document.documentElement.lang==="en";Qt.querySelector(".bm-q-title").textContent=a?"Site is busy \u2014 you are in the queue":"\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC",Qt.querySelector(".bm-q-pos").textContent=a?`Your turn: ${t>0?t:"\u2026"}`:`\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${t>0?t:"\u2026"}`,Qt.querySelector(".bm-q-note").textContent=a?"Continues automatically when it is your turn\u2026":"\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026"}function vo(){Qt&&(Qt.remove(),Qt=null)}async function Mc(t={}){return Ga||(Ga=(async()=>{fo(Number(t.pos)||0);let a=Math.max(2,Math.min(20,Number(t.pollSec)||4))*1e3;for(let s=0;s<60;s++){await new Promise(n=>setTimeout(n,a));try{let o=await(await fetch("/api/queue/status",{credentials:"same-origin",headers:{Accept:"application/json"}})).json();if((o==null?void 0:o.state)==="pass")return vo(),!0;(o==null?void 0:o.state)==="queued"&&fo(Number(o.pos)||0)}catch(n){}}return vo(),!1})().finally(()=>{Ga=null})),Ga}function Lc(t){return Vs.add(t),()=>Vs.delete(t)}function yo(t){_s=Math.max(0,_s+(t?1:-1));for(let a of Vs)try{a(_s>0)}catch(s){}}async function Se(t,a,s,n={}){if(typeof navigator!="undefined"&&!navigator.onLine&&t!=="GET")throw new ne(0,"offline","\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","You are offline.");yo(!0);let o=mt({},n.headers||{});if(s!=null&&(o["Content-Type"]="application/json"),t!=="GET"){let p=$o("bm_csrf");p&&(o["X-CSRF-Token"]=p)}let i=new AbortController,l=setTimeout(()=>i.abort(),n.timeout||25e3);try{let p=await fetch(a,{method:t,headers:o,signal:i.signal,credentials:"same-origin",body:s==null?void 0:JSON.stringify(s)}),d=null,b=await p.text();if(b)try{d=JSON.parse(b)}catch(u){d={raw:b.slice(0,300)}}if(p.status===403&&(d==null?void 0:d.code)==="csrf_failed"&&!n._retried)return await fetch("/api/bootstrap",{credentials:"same-origin"}).catch(()=>{}),Se(t,a,s,zt(mt({},n),{_retried:!0}));if(p.status===503&&(d==null?void 0:d.code)==="queued"&&!n._queueRetried&&await Mc((d==null?void 0:d.details)||{}))return Se(t,a,s,zt(mt({},n),{_queueRetried:!0}));if(!p.ok||(d==null?void 0:d.ok)===!1){let u=(d==null?void 0:d.code)||"error";throw new ne(p.status||500,u,(d==null?void 0:d.message)||Ws[u]||"\u062E\u0637\u0627",Ws[u])}return d}catch(p){throw p instanceof ne?p:(p==null?void 0:p.name)==="AbortError"?new ne(408,"timeout","\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","Request timed out."):new ne(0,"network","\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","Network error.")}finally{clearTimeout(l),yo(!1)}}function Ys(t){return t instanceof ne?t.message:String((t==null?void 0:t.message)||t||"\u062E\u0637\u0627")}function Nc(t){return(t==null?void 0:t.details)||Ws[t==null?void 0:t.code]||(t==null?void 0:t.message)||"Error"}var ne,Ws,Qt,Ga,_s,Vs,wo,f,Z=W(()=>{ne=class extends Error{constructor(a,s,n,o){super(n||s||"error"),this.status=a,this.code=s,this.details=o}};Ws={login_required:"Please sign in to continue.",store_asleep:"The store is temporarily turned off.",unauthorized:"Authentication failed.",forbidden:"You do not have access to this section.",csrf_failed:"Security token expired. Please refresh the page.",too_many_requests:"Too many requests. Please wait a moment.",not_found:"Not found.",product_not_found:"Product not found.",order_not_found:"Order not found.",invalid_credentials:"Incorrect username or password.",invalid_code:"The verification code is not valid.",invalid_phone:"Invalid mobile number.",invalid_email:"Invalid email address.",weak_password:"Password is too weak. Use upper/lower case letters, digits and symbols.",stock_limit:"Not enough stock for this quantity.",empty_cart:"Your cart is empty.",insufficient_balance:"Wallet balance is not enough.",account_exists:"This account already exists.",username_taken:"This username is taken.",phone_taken:"This phone number is already registered.",email_taken:"This email is already registered.",terms_required:"You must accept the terms and conditions.",rules_required:"You must accept the ticket rules.",address_required:"Please add a shipping address first.",already_submitted:"You have already submitted this.",payload_too_large:"The uploaded data is too large.",invalid_type:"Only image files are allowed.",server_error:"Internal server error. Please try again.",product_unavailable:"One of the items in your cart is no longer available.",cannot_cancel:"This order cannot be cancelled in its current state.",account_blocked:"This account is blocked. Please contact support.",disabled:"This feature is currently disabled.",queued:"The site is busy. You are in the entry queue\u2026",banned:"Access is blocked. Please contact support."},Qt=null,Ga=null;_s=0,Vs=new Set;wo=(t,a)=>{let s=new URLSearchParams;for(let[o,i]of Object.entries(a||{}))i==null||i===""||s.set(o,String(i));let n=s.toString();return n?`${t}${t.includes("?")?"&":"?"}${n}`:t},f={url:wo,get:(t,a)=>Se("GET",t,void 0,a),post:(t,a,s)=>Se("POST",t,a!=null?a:{},s),patch:(t,a,s)=>Se("PATCH",t,a!=null?a:{},s),del:(t,a,s)=>Se("DELETE",t,a,s),put:(t,a,s)=>Se("PUT",t,a!=null?a:{},s),upload:t=>Se("POST","/api/upload",{data:t},{timeout:6e4})}});var xo={};X(xo,{applyI18n:()=>Ze,dictSize:()=>Bc,isFa:()=>q,lang:()=>$t,missingKeys:()=>Rc,setLang:()=>Ks,t:()=>e});function Ks(t){Xe=t==="en"?"en":"fa",document.documentElement.lang=Xe,document.documentElement.dir=Xe==="fa"?"rtl":"ltr"}function e(t,a){let n=(Ic[Xe]||Ka)[t];if(n===void 0&&(n=Ka[t],n===void 0&&(Gs.has(t)||(Gs.add(t),(location.hostname==="localhost"||location.hostname==="127.0.0.1")&&console.warn("[i18n] missing key:",t)),n=t)),a)for(let[o,i]of Object.entries(a))n=n.replace(new RegExp(`\\{${o}\\}`,"g"),String(i));return n}function Ze(t=document){t.querySelectorAll("[data-i18n]").forEach(a=>{a.textContent=e(a.dataset.i18n)}),t.querySelectorAll("[data-i18n-placeholder]").forEach(a=>{a.setAttribute("placeholder",e(a.dataset.i18nPlaceholder))}),t.querySelectorAll("[data-i18n-title]").forEach(a=>{a.setAttribute("title",e(a.dataset.i18nTitle)),a.setAttribute("aria-label",e(a.dataset.i18nTitle))}),t.querySelectorAll("[data-i18n-html]").forEach(a=>{a.innerHTML=e(a.dataset.i18nHtml)})}var Ka,So,Ic,Xe,Gs,$t,q,Rc,Bc,G=W(()=>{Ka={"app.name":"\u06CC\u0627\u0633\u0627\u06CC\u06CC","app.tagline":"\u0644\u0648\u0627\u0632\u0645 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0648 \u0627\u0644\u06A9\u062A\u0631\u06CC\u06A9\u06CC","common.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","common.save":"\u0630\u062E\u06CC\u0631\u0647","common.saving":"\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026","common.cancel":"\u0627\u0646\u0635\u0631\u0627\u0641","common.close":"\u0628\u0633\u062A\u0646","common.confirm":"\u062A\u0623\u06CC\u06CC\u062F","common.delete":"\u062D\u0630\u0641","common.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634","common.add":"\u0627\u0641\u0632\u0648\u062F\u0646","common.create":"\u0627\u06CC\u062C\u0627\u062F","common.update":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","common.filter":"\u0641\u06CC\u0644\u062A\u0631","common.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","common.sort":"\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC","common.all":"\u0647\u0645\u0647","common.none":"\u0647\u06CC\u0686","common.more":"\u0628\u06CC\u0634\u062A\u0631","common.less":"\u06A9\u0645\u062A\u0631","common.showAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647","common.back":"\u0628\u0627\u0632\u06AF\u0634\u062A","common.next":"\u0627\u062F\u0627\u0645\u0647","common.prev":"\u0642\u0628\u0644\u06CC","common.yes":"\u0628\u0644\u0647","common.no":"\u062E\u06CC\u0631","common.optional":"\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC","common.required":"\u0627\u0644\u0632\u0627\u0645\u06CC","common.copy":"\u06A9\u067E\u06CC","common.copied":"\u06A9\u067E\u06CC \u0634\u062F","common.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","common.download":"\u062F\u0627\u0646\u0644\u0648\u062F","common.upload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC","common.print":"\u0686\u0627\u067E","common.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC","common.retry":"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647","common.send":"\u0627\u0631\u0633\u0627\u0644","common.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","common.submit":"\u062B\u0628\u062A","common.reply":"\u067E\u0627\u0633\u062E","common.view":"\u0645\u0634\u0627\u0647\u062F\u0647","common.details":"\u062C\u0632\u0626\u06CC\u0627\u062A","common.status":"\u0648\u0636\u0639\u06CC\u062A","common.date":"\u062A\u0627\u0631\u06CC\u062E","common.time":"\u0633\u0627\u0639\u062A","common.amount":"\u0645\u0628\u0644\u063A","common.count":"\u062A\u0639\u062F\u0627\u062F","common.total":"\u0645\u062C\u0645\u0648\u0639","common.price":"\u0642\u06CC\u0645\u062A","price.inquire":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u2014 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u063A\u0627\u0632\u0647","price.inquireShort":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A","pdp.callStore":"\u0632\u0646\u06AF \u0628\u0632\u0646 \u0628\u0647 \u0645\u063A\u0627\u0632\u0647","pdp.visitStore":"\u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u0622\u06CC\u0645","pdp.serviceHint":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062E\u062F\u0645\u0627\u062A/\u0633\u0641\u0627\u0631\u0634\u06CC \u0627\u0633\u062A\u061B \u0642\u06CC\u0645\u062A \u0646\u0647\u0627\u06CC\u06CC \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0644\u0641\u0646\u06CC \u0627\u0639\u0644\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F.","home.partFinder":"\u0642\u0637\u0639\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u061F","home.partFinderText":"\u0627\u0633\u0645\u0634 \u0631\u0627 \u062A\u0644\u0641\u0646\u06CC \u0628\u06AF\u0648 \u06CC\u0627 \u062F\u0631 \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u061B \u0627\u06AF\u0631 \u062F\u0631 \u0642\u0641\u0633\u0647\u200C\u0647\u0627 \u0628\u0627\u0634\u062F\u060C \u0647\u0645\u0627\u0646 \u0631\u0648\u0632 \u0628\u0631\u0627\u06CC\u062A \u06A9\u0646\u0627\u0631 \u0645\u06CC\u200C\u06AF\u0630\u0627\u0631\u06CC\u0645.","home.partFinderCta":"\u062A\u0645\u0627\u0633 \u06CC\u0627 \u067E\u06CC\u0627\u0645","common.stock":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.available":"\u0645\u0648\u062C\u0648\u062F","common.unavailable":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","common.inStock":"\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631","common.lowStock":"\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647","common.notifyMe":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646","common.notified":"\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","common.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","common.brand":"\u0628\u0631\u0646\u062F","common.product":"\u06A9\u0627\u0644\u0627","common.products":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","common.order":"\u0633\u0641\u0627\u0631\u0634","common.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","common.user":"\u06A9\u0627\u0631\u0628\u0631","common.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.result":"\u0646\u062A\u06CC\u062C\u0647","common.results":"\u0646\u062A\u06CC\u062C\u0647","common.noResult":"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","common.error":"\u062E\u0637\u0627","common.success":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.warning":"\u062A\u0648\u062C\u0647","common.note":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A","common.notes":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","common.actions":"\u0639\u0645\u0644\u06CC\u0627\u062A","common.active":"\u0641\u0639\u0627\u0644","common.inactive":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644","common.enabled":"\u0631\u0648\u0634\u0646","common.disabled":"\u062E\u0627\u0645\u0648\u0634","common.on":"\u0631\u0648\u0634\u0646","common.off":"\u062E\u0627\u0645\u0648\u0634","common.from":"\u0627\u0632","common.to":"\u062A\u0627","common.and":"\u0648","common.or":"\u06CC\u0627","common.today":"\u0627\u0645\u0631\u0648\u0632","common.yesterday":"\u062F\u06CC\u0631\u0648\u0632","common.toman":"\u062A\u0648\u0645\u0627\u0646","common.rial":"\u0631\u06CC\u0627\u0644","common.page":"\u0635\u0641\u062D\u0647","common.of":"\u0627\u0632","common.items":"\u0642\u0644\u0645","common.new":"\u062C\u062F\u06CC\u062F","common.old":"\u0642\u062F\u06CC\u0645\u06CC","common.apply":"\u0627\u0639\u0645\u0627\u0644","common.reset":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC","common.clear":"\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","common.select":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F","common.title":"\u0639\u0646\u0648\u0627\u0646","common.body":"\u0645\u062A\u0646","common.type":"\u0646\u0648\u0639","common.priority":"\u0627\u0648\u0644\u0648\u06CC\u062A","common.answer":"\u067E\u0627\u0633\u062E","common.message":"\u067E\u06CC\u0627\u0645","common.messages":"\u067E\u06CC\u0627\u0645\u200C\u0647\u0627","common.attach":"\u067E\u06CC\u0648\u0633\u062A","common.image":"\u062A\u0635\u0648\u06CC\u0631","common.images":"\u062A\u0635\u0627\u0648\u06CC\u0631","common.phone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","common.email":"\u0627\u06CC\u0645\u06CC\u0644","common.address":"\u0622\u062F\u0631\u0633","common.city":"\u0634\u0647\u0631","common.province":"\u0627\u0633\u062A\u0627\u0646","common.postal":"\u06A9\u062F \u067E\u0633\u062A\u06CC","common.name":"\u0646\u0627\u0645","common.fullName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","common.username":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC","common.password":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.passwordConfirm":"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.login":"\u0648\u0631\u0648\u062F","common.logout":"\u062E\u0631\u0648\u062C","common.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","common.guest":"\u0645\u0647\u0645\u0627\u0646","common.admin":"\u0645\u062F\u06CC\u0631","common.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A","common.help":"\u0631\u0627\u0647\u0646\u0645\u0627","common.home":"\u062E\u0627\u0646\u0647","common.skip":"\u0631\u062F \u0634\u062F\u0646","common.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","common.approved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","common.rejected":"\u0631\u062F \u0634\u062F\u0647","common.open":"\u0628\u0627\u0632","common.closed":"\u0628\u0633\u062A\u0647","common.all2":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F","common.never":"\u0647\u0631\u06AF\u0632","common.empty":"\u062E\u0627\u0644\u06CC","common.secure":"\u0627\u0645\u0646","common.free":"\u0631\u0627\u06CC\u06AF\u0627\u0646","common.unit":"\u0639\u062F\u062F","common.day":"\u0631\u0648\u0632","common.hour":"\u0633\u0627\u0639\u062A","common.minute":"\u062F\u0642\u06CC\u0642\u0647","common.second":"\u062B\u0627\u0646\u06CC\u0647","common.percent":"\u062F\u0631\u0635\u062F","common.discount":"\u062A\u062E\u0641\u06CC\u0641","common.discountCode":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","common.shipping":"\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","common.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","common.subtotal":"\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627","common.payable":"\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A","common.payment":"\u067E\u0631\u062F\u0627\u062E\u062A","common.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","common.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","common.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647","common.profile":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644","common.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","common.balance":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.transactions":"\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627","common.deposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","common.points":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.ticket":"\u062A\u06CC\u06A9\u062A","common.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","common.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","common.review":"\u0646\u0638\u0631","common.reviews":"\u0646\u0638\u0631\u0627\u062A","common.question":"\u0633\u0624\u0627\u0644","common.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.rating":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.notification":"\u0627\u0639\u0644\u0627\u0646","common.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","common.security":"\u0627\u0645\u0646\u06CC\u062A","common.history":"\u062A\u0627\u0631\u06CC\u062E\u0686\u0647","common.report":"\u06AF\u0632\u0627\u0631\u0634","common.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","common.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","common.complaint":"\u0634\u06A9\u0627\u06CC\u062A","common.law":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","common.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","common.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","common.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","common.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","common.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","common.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","common.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","common.searchProducts":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026","common.noData":"\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F","common.tryAgain":"\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646","common.showMore":"\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631","common.perPage":"\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",skip:"\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC","boot.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC\u2026","boot.waking":"\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026","boot.failed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.","update.available":"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.","update.reload":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","boot.failedHint":"\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.","topbar.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","nav.home":"\u062E\u0627\u0646\u0647","nav.products":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","nav.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627","nav.new":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","nav.stats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647","nav.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","nav.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","nav.login":"\u0648\u0631\u0648\u062F","nav.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","nav.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","nav.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","nav.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","nav.menu":"\u0645\u0646\u0648","nav.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","nav.admin":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","nav.allCategories":"\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627","theme.toggle":"\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)","theme.dark":"\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9","theme.light":"\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646","theme.auto":"\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645","search.placeholder":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026","search.go":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","search.voice":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","search.byImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.listening":"\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646","search.noVoice":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.","search.micDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.","search.voiceNetwork":"\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","search.noSpeech":"\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.","search.noMic":"\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","pwd.show":"\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","pwd.hide":"\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","search.suggestions":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","search.trending":"\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627","search.recent":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627","search.resultsFor":"\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC","search.inProducts":"\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A","search.inCategories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","search.inBrands":"\u0628\u0631\u0646\u062F\u0647\u0627","search.inPages":"\u0635\u0641\u062D\u0647\u200C\u0647\u0627","search.didYouMean":"\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F","search.noResultTitle":"\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645","search.noResultText":"\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.","search.imageTitle":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.imageText":"\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.","search.imageHint":"\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A","search.imageIndexing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026","search.imageNoIndex":"\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.","search.imageNoMatch":"\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.","search.dropHere":"\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646","search.pickFile":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633","search.takePhoto":"\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","mnav.home":"\u062E\u0627\u0646\u0647","mnav.products":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","mnav.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","mnav.cart":"\u0633\u0628\u062F","mnav.me":"\u062D\u0633\u0627\u0628 \u0645\u0646","footer.shopping":"\u062E\u0631\u06CC\u062F","footer.allProducts":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","footer.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","footer.inStock":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","footer.searchByImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","footer.myList":"\u0644\u06CC\u0633\u062A \u0645\u0646","footer.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","footer.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","footer.service":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","footer.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","footer.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","footer.tickets":"\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","footer.about":"\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646","footer.aboutUs":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","footer.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","footer.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","footer.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","footer.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","footer.suggest":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","footer.contactUs":"\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC","footer.install":"\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646","footer.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","footer.rights":"\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.","footer.workingHours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","home.heroKicker":"\u0628\u0648\u0631\u0633 \u0647\u0641\u062A\u200C\u062D\u0648\u0636\u061B \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A","home.heroTitle":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u062A\u0627 \u06A9\u0646\u062A\u0627\u06A9\u062A\u0648\u0631\u061B \u0647\u0645\u0627\u0646 \u0644\u062D\u0638\u0647 \u0627\u0632 \u0642\u0641\u0633\u0647 \u0645\u06CC\u200C\u0622\u06CC\u062F","home.heroText":"\u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u062E\u0627\u0632\u0646 \u0648 \u0622\u06CC\u200C\u0633\u06CC\u060C \u0647\u0648\u06CC\u0647 \u0648 \u0633\u06CC\u0645 \u0642\u0644\u0639\u060C \u06A9\u0627\u0628\u0644 \u0648 \u0633\u06CC\u0645 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0633\u0627\u06CC\u0632\u0647\u0627\u060C \u0631\u06CC\u0633\u0647 \u0648 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631\u060C \u0645\u0648\u062F\u0645 \u0648 \u0633\u0648\u06CC\u06CC\u0686\u060C \u067E\u0646\u06A9\u0647 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642 \u2014 \u0647\u0631 \u0622\u0646\u0686\u0647 \u0628\u0631\u0627\u06CC \u0628\u0631\u062F\u060C \u062E\u0627\u0646\u0647 \u0648 \u06A9\u0627\u0631\u06AF\u0627\u0647 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC\u060C \u06CC\u06A9\u200C\u062C\u0627 \u062F\u0631 \u0646\u0627\u0631\u0645\u06A9.","home.ctaShop":"\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F","home.ctaDeals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632","home.point1":"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","home.point2":"\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641","home.point3":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","home.point4":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646","home.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627","home.categoriesSub":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u0622\u06CC\u200C\u0633\u06CC \u062A\u0627 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642","home.featured":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","home.featuredSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","home.bestSellers":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","home.bestSellersSub":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.newArrivals":"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newArrivalsSub":"\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647","home.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","home.dealsSub":"\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631","home.brands":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","home.whyUs":"\u0686\u0631\u0627 \u06CC\u0627\u0633\u0627\u06CC\u06CC\u061F","home.whyUsSub":"\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F","home.reviews":"\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","home.reviewsSub":"\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646","home.visitStore":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.visitStoreText":"\u062A\u0647\u0631\u0627\u0646\u060C \u0646\u0627\u0631\u0645\u06A9\u060C \u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u062A\u0633\u062A \u06A9\u0627\u0644\u0627 \u0642\u0628\u0644 \u0627\u0632 \u062E\u0631\u06CC\u062F","home.openMap":"\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647","home.statsTitle":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647","home.plusTitle":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.plusText":"\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","home.plusCta":"\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633","home.appTitle":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.appText":"\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","home.installCta":"\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646","home.appInstalled":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A","home.liveStats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newsletter":"\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648","home.newsletterText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","home.subscribe":"\u0639\u0636\u0648\u06CC\u062A","stats.products":"\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644","stats.ordersTotal":"\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","stats.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","stats.visitsToday":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","stats.visitsTotal":"\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","stats.pendingOrders":"\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","stats.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642","stats.customers":"\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647","stats.plusMembers":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","stats.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","stats.brands":"\u0628\u0631\u0646\u062F","stats.outOfStock":"\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F","stats.years":"\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A","stats.title":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","stats.sub":"\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","stats.chartTitle":"\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","stats.topProducts":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627","stats.transparency":"\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC","stats.transparencyText":"\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.","catalog.title":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","catalog.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.showFilters":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.hideFilters":"\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.sort.relevant":"\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646","catalog.sort.newest":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646","catalog.sort.oldest":"\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646","catalog.sort.cheapest":"\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.dearest":"\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.popular":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646","catalog.sort.rating":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.sort.discount":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641","catalog.sort.name":"\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627","catalog.f.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","catalog.f.brand":"\u0628\u0631\u0646\u062F","catalog.f.price":"\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A","catalog.f.availability":"\u0645\u0648\u062C\u0648\u062F\u06CC","catalog.f.inStock":"\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","catalog.f.discountOnly":"\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631","catalog.f.rating":"\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.f.authenticity":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","catalog.f.clear":"\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.count":"\u06A9\u0627\u0644\u0627","catalog.viewGrid":"\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","catalog.viewList":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC","auth.original":"\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)","auth.highcopy":"\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9","auth.generic":"\u0645\u062A\u0641\u0631\u0642\u0647","card.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F","card.added":"\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F","card.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","card.wishlistAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646","card.wishlistRemove":"\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646","card.compareAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","card.outOfStock":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","card.soldOut":"\u062A\u0645\u0627\u0645 \u0634\u062F","pdp.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","pdp.buyNow":"\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC","pdp.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647","pdp.warranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.warrantyMonths":"{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noWarranty":"\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.sku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","pdp.barcode":"\u0628\u0627\u0631\u06A9\u062F","pdp.weight":"\u0648\u0632\u0646","pdp.gram":"\u06AF\u0631\u0645","pdp.zoomIn":"\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomOut":"\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomReset":"\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC","pdp.zoomHint":"\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647","pdp.video":"\u0648\u06CC\u062F\u06CC\u0648","pdp.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","pdp.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","pdp.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","pdp.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627","pdp.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","pdp.related":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647","pdp.compatibility":"\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC","pdp.writeReview":"\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632","pdp.askQuestion":"\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644","pdp.loginToReview":"\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","pdp.reviewSubmitted":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.reviewPending":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.questionSubmitted":"\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.","pdp.buyerBadge":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627","pdp.visitorBadge":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","pdp.helpful":"\u0645\u0641\u06CC\u062F \u0628\u0648\u062F","pdp.storeReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noReviews":"\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!","pdp.noQuestions":"\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.","pdp.yourRating":"\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627","pdp.viewed":"\u0628\u0627\u0632\u062F\u06CC\u062F","pdp.sold":"\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647","pdp.off":"\u062A\u062E\u0641\u06CC\u0641","pdp.save":"\u0633\u0648\u062F \u0634\u0645\u0627","pdp.lastPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC","pdp.stockCount":"\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F","pdp.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646","pdp.installment":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637","cart.title":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","cart.empty":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","cart.emptyText":"\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.","cart.goShopping":"\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F","cart.item":"\u06A9\u0627\u0644\u0627","cart.qty":"\u062A\u0639\u062F\u0627\u062F","cart.remove":"\u062D\u0630\u0641","cart.clear":"\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F","cart.clearConfirm":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F","cart.summary":"\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634","cart.continue":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F","cart.freeShipHint":"\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","cart.freeShipDone":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!","cart.couponApplied":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F","cart.couponPlaceholder":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646","cart.applyCoupon":"\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F","cart.removeCoupon":"\u062D\u0630\u0641 \u06A9\u062F","cart.updated":"\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","checkout.title":"\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634","checkout.step1":"\u062A\u062D\u0648\u06CC\u0644","checkout.step2":"\u067E\u0631\u062F\u0627\u062E\u062A","checkout.step3":"\u062A\u0623\u06CC\u06CC\u062F","checkout.delivery":"\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644","checkout.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647","checkout.pickupDesc":"\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","checkout.courier":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A","checkout.courierDesc":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.","checkout.zone":"\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","checkout.express":"\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)","checkout.insuranceOpt":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","checkout.insuranceDesc":"\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.insuranceAuto":"\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.","checkout.address":"\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644","checkout.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F","checkout.noAddress":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.","checkout.paymentMethod":"\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.useWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","checkout.walletBalance":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646","checkout.note":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","checkout.notePlaceholder":"\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.","checkout.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","checkout.placeOrder":"\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634","checkout.placing":"\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026","checkout.loginRequired":"\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","checkout.successTitle":"\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F","checkout.successText":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.","checkout.payNow":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","checkout.payLater":"\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645","checkout.gatewayDemo":"\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.paymentSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.paymentFailed":"\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.simulateSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)","checkout.simulateFail":"\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.concurrencyNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","checkout.pickupReady":"\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","auth.title":"\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645","auth.loginTitle":"\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.registerTitle":"\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.methodPassword":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632","auth.methodPhone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","auth.methodEmail":"\u0627\u06CC\u0645\u06CC\u0644","auth.identifier":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644","auth.remember":"\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631","auth.forgot":"\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.noAccount":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F","auth.haveAccount":"\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F","auth.sendCode":"\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.codeSent":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","auth.codeSentTo":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.","auth.enterCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","auth.otpCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.resend":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F","auth.resendIn":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647","auth.demoCode":"\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}","auth.2faTitle":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","auth.2faText":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.","auth.2faTotp":"\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","auth.2faSms":"\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC","auth.2faEmail":"\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC","auth.2faBackup":"\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","auth.2faVerify":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F","auth.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","auth.referral":"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","auth.registerDone":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!","auth.loginDone":"\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","auth.logoutDone":"\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC","auth.recoveryTitle":"\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.recoveryText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","auth.newPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","auth.resetDone":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","auth.passwordRules":"\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F","auth.orContinue":"\u06CC\u0627","auth.guestCheckout":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.title":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646","acc.badges":"\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646","badge.got":"\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647","badge.locked":"\u0647\u0646\u0648\u0632 \u0642\u0641\u0644","badge.first-buy":"\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F","badge.first-buy.d":"\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.silver-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC","badge.silver-buyer.d":"\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.gold-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC","badge.gold-buyer.d":"\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.big-spender":"\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628","badge.big-spender.d":"\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.","badge.early-bird":"\u067E\u06CC\u0634\u06AF\u0627\u0645","badge.early-bird.d":"\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.veteran":"\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631","badge.veteran.d":"\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.","badge.reviewer":"\u0646\u0642\u062F\u0646\u0648\u06CC\u0633","badge.reviewer.d":"\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.","badge.plus-member":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","badge.plus-member.d":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.","badge.wallet-user":"\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC","badge.wallet-user.d":"\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.supporter":"\u067E\u06CC\u06AF\u06CC\u0631","badge.supporter.d":"\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","acc.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646","acc.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","acc.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.addresses":"\u0622\u062F\u0631\u0633\u200C\u0647\u0627","acc.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646","acc.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","acc.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0646","acc.feedback":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","acc.profile":"\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644","acc.security":"\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628","acc.sessions":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","acc.prefs":"\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634","acc.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.hello":"\u0633\u0644\u0627\u0645 {name}","acc.memberSince":"\u0639\u0636\u0648 \u0627\u0632 {date}","acc.noOrders":"\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.noOrdersText":"\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.","acc.orderCode":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634","acc.orderDate":"\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634","acc.orderItems":"\u0627\u0642\u0644\u0627\u0645","acc.orderTotal":"\u0645\u0628\u0644\u063A \u06A9\u0644","acc.trackOrder":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","acc.cancelOrder":"\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","acc.cancelConfirm":"\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","acc.cancelReason":"\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","acc.orderCancelled":"\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F","acc.reorder":"\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647","acc.invoice":"\u0641\u0627\u06A9\u062A\u0648\u0631","acc.printInvoice":"\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631","acc.timeline":"\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634","acc.walletEmpty":"\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.walletDeposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.walletAmount":"\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)","acc.walletDeposited":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F","acc.walletNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.","acc.tx.deposit":"\u0634\u0627\u0631\u0698","acc.tx.purchase":"\u062E\u0631\u06CC\u062F","acc.tx.refund":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","acc.tx.adjust_in":"\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.tx.adjust_out":"\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.plusInactive":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC","acc.plusActive":"\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}","acc.plusSubscribe":"\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusRenew":"\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9","acc.plusPrice":"{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632","acc.plusPerks":"\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusSubscribed":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F","acc.plusPayWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plusPayGateway":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","acc.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633","acc.editAddress":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633","acc.addrTitle":"\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)","acc.addrReceiver":"\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrStreet":"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC","acc.addrDefault":"\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","acc.addrNote":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9","acc.addrSaved":"\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.addrDeleted":"\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F","acc.noAddress":"\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.wishlistEmpty":"\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","acc.wishlistEmptyText":"\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.","acc.notifEmpty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","acc.markAllRead":"\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","acc.ticketNew":"\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F","acc.ticketSubject":"\u0645\u0648\u0636\u0648\u0639","acc.ticketCategory":"\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A","acc.ticketPriority":"\u0627\u0648\u0644\u0648\u06CC\u062A","acc.ticketBody":"\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A","form.rulesRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","form.termsRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","page.statsTitle":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","page.aboutCta":"\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645","page.stepsTitle":"\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F","page.tipsTitle":"\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F","page.hintsTitle":"\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631","page.bugTitle":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","page.rulesTitle":"\u0642\u0648\u0627\u0646\u06CC\u0646","faq.all":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A","faq.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026","faq.results":"{n} \u0633\u0624\u0627\u0644","faq.notFound":"\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","faq.askText":"\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","faq.cat.orders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","faq.cat.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644","faq.cat.returns":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","faq.cat.product":"\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A","faq.cat.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","faq.cat.security":"\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","faq.cat.store":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633","faq.cat.other":"\u0633\u0627\u06CC\u0631","acc.ticketCloseConfirm":"\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.","acc.ticketClosedNote":"\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.","acc.ticketBodyShort":"\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.","acc.attachHint":"\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.","err.tooLarge":"\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.","acc.ticketRules":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","acc.ticketViewRules":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketCreated":"\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}","acc.ticketWrite":"\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.ticketClose":"\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketReopen":"\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC","acc.ticketSla":"\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A","acc.noTickets":"\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.chatTitle":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","acc.chatPlaceholder":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.chatWelcome":"\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.","acc.chatOffline":"\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","acc.chatOpenTicket":"\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A","acc.reviewEmpty":"\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.feedbackNew":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","acc.feedbackType":"\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645","acc.feedbackContact":"\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)","acc.feedbackContactHint":"\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.","acc.feedbackSent":"\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.","acc.noFeedback":"\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.profileSaved":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.passwordChange":"\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","acc.currentPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC","acc.newPassword2":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","acc.passwordChanged":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","acc.2faSection":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)","acc.2faOff":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","acc.2faOn":"\u0641\u0639\u0627\u0644","acc.2faEnable":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","acc.2faDisable":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC","acc.2faScan":"\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","acc.2faKey":"\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC","acc.2faEnterCode":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F","acc.2faEnabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faDisabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faBackup":"\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)","acc.2faBackupHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.","acc.2faMethods":"\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F","acc.sessionsText":"\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.","acc.revokeAll":"\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627","acc.revokeDone":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F","acc.current":"\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647","acc.prefsText":"\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.prefTheme":"\u067E\u0648\u0633\u062A\u0647","acc.prefLang":"\u0632\u0628\u0627\u0646","acc.prefDensity":"\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634","acc.prefMotion":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","acc.prefNotif":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.notifMarketing":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","acc.notifOrders":"\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","acc.notifRestock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646","acc.notifSupport":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","acc.exportData":"\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.exportHint":"\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.","acc.deleteAccount":"\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.deleteWarn":"\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.deleteConfirm":"\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","acc.pointsText":"\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","acc.referralCode":"\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648","acc.referralText":"\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.","chat.title":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","chat.online":"\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","chat.open":"\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648","chat.minimize":"\u0628\u0633\u062A\u0646","chat.loginFirst":"\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","chat.sent":"\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","chat.typing":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026","chat.quick":"\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631","notif.new":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","notif.markRead":"\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","notif.viewAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","notif.empty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","notif.type.announcement":"\u0627\u0637\u0644\u0627\u0639\u06CC\u0647","notif.type.order":"\u0633\u0641\u0627\u0631\u0634","notif.type.restock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","notif.type.ticket":"\u062A\u06CC\u06A9\u062A","notif.type.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","notif.type.review":"\u0646\u0638\u0631","notif.type.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","notif.type.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","notif.type.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","notif.type.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F","notif.type.admin_alert":"\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631","notif.type.news":"\u062E\u0628\u0631","notif.type.offer":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","notif.type.system":"\u0633\u0627\u0645\u0627\u0646\u0647","notif.type.info":"\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC","notif.type.welcome":"\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC","consent.title":"\u0628\u0647 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","consent.text":"\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.","consent.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.marketing":"\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).","consent.accept":"\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645","consent.readTerms":"\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646","consent.readPrivacy":"\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","consent.thanks":"\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.","consent.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","social.instagram":"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","home.partnersTitle":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","stats.subtitle":"\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.","stats.chartHint":"\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.","stats.topTitle":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.sPartners":"\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627","adm.ptFa":"\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC","adm.ptEn":"Name (EN)","adm.ptAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F","adm.ptHint":"\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.","feat.partners":"\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631","auth.pwdLater":"\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645","auth.pwdLaterToast":"\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.","social.telegram":"\u062A\u0644\u06AF\u0631\u0627\u0645","social.eitaa":"\u0627\u06CC\u062A\u0627","social.whatsapp":"\u0648\u0627\u062A\u0633\u0627\u067E","consent.rejectOptional":"\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC","consent.ttlNote":"\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.title":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","contact.mapTitle":"\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mapHint":"\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646","contact.mapAsk":"\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F","contact.mapPermission":"\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.","contact.allowLocation":"\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.denyLocation":"\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.openMaps":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647","contact.copyAddress":"\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633","contact.hours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","contact.phone":"\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mobile":"\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E","contact.emailUs":"\u0627\u06CC\u0645\u06CC\u0644","contact.addressUs":"\u0622\u062F\u0631\u0633","contact.callNow":"\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631","contact.whatsapp":"\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E","contact.locationOn":"\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F","contact.locationDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.formTitle":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639","contact.formText":"\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","contact.neshan":"\u0646\u0634\u0627\u0646","contact.balad":"\u0628\u0644\u062F","contact.google":"\u06AF\u0648\u06AF\u0644 \u0645\u067E","contact.osm":"\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E","contact.tgBotTitle":"\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645","contact.tgBotText":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.","contact.tgBotBtn":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645","compare.title":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","compare.empty":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647","compare.emptyText":"\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).","compare.add":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","compare.remove":"\u062D\u0630\u0641","priceCheck.title":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F","priceCheck.sub":"\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","priceCheck.input":"\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627","priceCheck.scanCamera":"\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.stopCamera":"\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.waiting":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026","priceCheck.notFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","priceCheck.found":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","priceCheck.cameraUnsupported":"\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","priceCheck.cameraDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.","priceCheck.deviceMode":"\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)","priceCheck.lastScan":"\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646","priceCheck.fullscreen":"\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647","err.generic":"\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","err.network":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.","err.notFound":"\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","err.notFoundText":"\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.","err.goHome":"\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","err.offline":"\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","err.online":"\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC","err.loginRequired":"\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.","err.forbidden":"\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.","adm.title":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","adm.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F","adm.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.productNew":"\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627","adm.productEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","adm.categories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","adm.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A","adm.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.supportChat":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","adm.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","adm.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A","adm.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","adm.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.theme":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","adm.features":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647","adm.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.pages":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","adm.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","adm.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.audit":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.stats":"\u0622\u0645\u0627\u0631","adm.export":"\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.maintenance":"\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC","adm.backToSite":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A","adm.kpi.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","adm.kpi.visits":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","adm.kpi.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.kpi.revenueTotal":"\u062F\u0631\u0622\u0645\u062F \u06A9\u0644","adm.kpi.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.kpi.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.kpi.lowStock":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.awaiting":"\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645","adm.awaiting.reviews":"\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F","adm.awaiting.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632","adm.awaiting.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","adm.awaiting.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F","adm.awaiting.chat":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A","adm.chart":"\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","adm.topSelling":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","adm.lowStockList":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.recentAudit":"\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.storage":"\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.pName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.pNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","adm.pCat":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","adm.pBrand":"\u0628\u0631\u0646\u062F","adm.pPrice":"\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)","adm.pOldPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641","adm.pCost":"\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F","adm.pStock":"\u0645\u0648\u062C\u0648\u062F\u06CC","adm.pSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.pBarcode":"\u0628\u0627\u0631\u06A9\u062F","adm.pWeight":"\u0648\u0632\u0646 (\u06AF\u0631\u0645)","adm.pWarranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)","adm.pAuth":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","adm.pTags":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)","adm.pSpecs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","adm.pSpecKey":"\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647","adm.pSpecVal":"\u0645\u0642\u062F\u0627\u0631","adm.pAddSpec":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647","adm.pVideos":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)","adm.pVideosHint":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.pImages":"\u062A\u0635\u0627\u0648\u06CC\u0631","adm.pFindImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631","adm.pFindImageHint":"\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.","adm.pFindSearching":"\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026","adm.pFindEmpty":"\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.","adm.pUpload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633","adm.pUseImage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631","adm.pDefaultImage":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.pFeatured":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","adm.pActive":"\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)","adm.pSaved":"\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.pCreated":"\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F","adm.pDeleted":"\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F","adm.pDeleteConfirm":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","adm.pQuickEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639","adm.pBulkPrice":"\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A","adm.catName":"\u0646\u0627\u0645 \u062F\u0633\u062A\u0647","adm.catParent":"\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F","adm.catGlyph":"\u0622\u06CC\u06A9\u0648\u0646","adm.catOrder":"\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634","adm.catNoParent":"\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)","adm.brandName":"\u0646\u0627\u0645 \u0628\u0631\u0646\u062F","adm.brandNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F","adm.oStatus":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A","adm.oTracking":"\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC","adm.oNote":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC","adm.oCustomer":"\u0645\u0634\u062A\u0631\u06CC","adm.oDelivery":"\u062A\u062D\u0648\u06CC\u0644","adm.oPayment":"\u067E\u0631\u062F\u0627\u062E\u062A","adm.oSaved":"\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rApprove":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631","adm.rReject":"\u0631\u062F \u06A9\u0631\u062F\u0646","adm.rReply":"\u067E\u0627\u0633\u062E","adm.rReplySaved":"\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.rModerated":"\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rFilter":"\u0641\u06CC\u0644\u062A\u0631","adm.uRole":"\u0646\u0642\u0634","adm.uPerms":"\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.uPermsHint":"\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.uAll":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uNone":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uWalletAdjust":"\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644","adm.uWalletReason":"\u062F\u0644\u06CC\u0644","adm.uPlusDays":"\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.uResetPass":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","adm.uStatus":"\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628","adm.uBlocked":"\u0645\u0633\u062F\u0648\u062F","adm.uSaved":"\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.uMakeStaff":"\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646","adm.cCode":"\u06A9\u062F","adm.cType":"\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641","adm.cValue":"\u0645\u0642\u062F\u0627\u0631","adm.cMax":"\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","adm.cMin":"\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","adm.cLimit":"\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644","adm.cPerUser":"\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","adm.cStart":"\u0634\u0631\u0648\u0639","adm.cEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cUsed":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647","adm.aSlot":"\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634","adm.aTitle":"\u0639\u0646\u0648\u0627\u0646","adm.aText":"\u0645\u062A\u0646","adm.aLink":"\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F","adm.aCta":"\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","adm.aActive":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F","adm.nTitle":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nBody":"\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nTarget":"\u06AF\u06CC\u0631\u0646\u062F\u0647","adm.nAll":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.nOne":"\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635","adm.nLevel":"\u0633\u0637\u062D","adm.nSent":"\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","adm.nOutbox":"\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)","adm.sStore":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.sTheme":"\u067E\u0648\u0633\u062A\u0647","adm.sUi":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637","adm.mailsms":"\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9","adm.mailCfg":"\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)","adm.mailEnabled":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644","adm.mailFrom":"\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.smsCfg":"\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)","adm.smsEnabled":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644","adm.smsKey":"\u06A9\u0644\u06CC\u062F API","adm.smsSender":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.console":"\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647","adm.consoleHint":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.","adm.sysRestart":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631","adm.sysRestartWarn":"\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.sysRestarting":"\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.sysResetLabel":"\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):","adm.sysReset.audit":"\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC","adm.sysReset.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.sysReset.visits":"\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.sysReset.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.secTitle":"\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F","adm.secQueueEnabled":"\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC","adm.secQueueDesc":"\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.","adm.secMaxConc":"\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646","adm.secTriggerRps":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647","adm.secPassTtl":"\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)","adm.secPoll":"\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)","adm.secFloodBan":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)","adm.secFloodMin":"\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)","adm.secSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.","adm.secInflight":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644","adm.secRps":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647","adm.secQueued":"\u062F\u0631 \u0635\u0641","adm.secAutoBans":"\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644","adm.secTop":"\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)","adm.secPerMin":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647","adm.secTopEmpty":"\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.secBusy":"\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644","adm.secNormal":"\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC","adm.banMinutes":"\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)","adm.banUntil":"\u062A\u0627","adm.banAuto":"\u062E\u0648\u062F\u06A9\u0627\u0631","adm.resetAudit":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627","adm.resetCarts":"\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.resetVisitors":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.resetDone":"\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.","adm.resetWarn.audit":"\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","adm.resetWarn.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F","adm.resetWarn.visitors":"\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F","adm.resetWarn.visits":"\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F","adm.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.uDevice":"\u062F\u0633\u062A\u06AF\u0627\u0647 / IP","adm.uBrowser":"\u0645\u0631\u0648\u0631\u06AF\u0631","adm.uRegion":"\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646","adm.uPath":"\u0645\u0633\u06CC\u0631","adm.guest":"\u0645\u0647\u0645\u0627\u0646","adm.bans":"\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)","adm.banType":"\u0646\u0648\u0639","adm.banValue":"\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)","adm.banReason":"\u062F\u0644\u06CC\u0644","adm.ban":"\u0645\u0633\u062F\u0648\u062F \u06A9\u0646","adm.unban":"\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC","adm.banned":"\u0645\u0633\u062F\u0648\u062F","adm.banDone":"\u0645\u0633\u062F\u0648\u062F \u0634\u062F.","adm.unbanDone":"\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.","adm.bansEmpty":"\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.","adm.banByAdmin":"\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","adm.channels":"\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644","adm.chSite":"\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","adm.chTelegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.chEmail":"\u0627\u06CC\u0645\u06CC\u0644","adm.chSms":"\u067E\u06CC\u0627\u0645\u06A9","adm.channelsHint":"\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.telegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.tgHint":"\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.tgEnabled":"\u0628\u0627\u062A \u0631\u0648\u0634\u0646","adm.tgToken":"\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A","adm.tgTokenHint":"\u0645\u062B\u0644 123456:ABC-\u2026","adm.tgWelcome":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start","adm.tgTest":"\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","adm.tgInbox":"\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627","adm.tgSubs":"\u0639\u0636\u0648\u0647\u0627","adm.tgReplyPh":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026","adm.tgInboxEmpty":"\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.","adm.lottery":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","adm.lotteryNew":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F","adm.lotPrize":"\u062C\u0627\u06CC\u0632\u0647","adm.lotEnds":"\u067E\u0627\u06CC\u0627\u0646","adm.lotWinners":"\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647","adm.lotWinnersList":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","adm.lotMode":"\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A","adm.lotModeOrders":"\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.lotModeManual":"\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC","adm.lotEntries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.lotRun":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646","adm.lotRunWarn":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F","adm.lotDone":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.lotClose":"\u0628\u0633\u062A\u0646","adm.lotClosed":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.","adm.lotEmpty":"\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.","lot.title":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC","lot.nav":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.soon":"\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!","lot.done":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647","lot.winners":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","lot.active":"\u0641\u0639\u0627\u0644","lot.prize":"\u062C\u0627\u06CC\u0632\u0647","lot.ends":"\u067E\u0627\u06CC\u0627\u0646","lot.entries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","lot.joined":"\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.","lot.join":"\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.joinDone":"\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!","lot.autoEntry":"\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.","contact.phone3":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645","adm.sBackups":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E","adm.backupNow":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627","adm.backupsHint":"\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.backupsEmpty":"\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.","adm.backupSize":"\u062D\u062C\u0645","adm.backupRestore":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC","adm.backupRestoreWarn":"\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F","adm.backupDone":"\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.","adm.backupRestored":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dumpFull":"\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A","adm.sFeatures":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.sShipping":"\u0627\u0631\u0633\u0627\u0644","adm.sPlus":"\u067E\u0644\u0627\u0633","adm.sOrders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","adm.sSeo":"\u0633\u0626\u0648","adm.sAuth":"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","adm.sSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.tAccent":"\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC","adm.tVariant":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC","adm.tVariantHint":"\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.","hdr.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","adm.errTitle":"\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A","adm.tPort":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0645\u0648\u062C \u0648 \u062F\u0631\u06CC\u0627 (\u0645\u0646\u0627\u0633\u0628 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0633\u0627\u062D\u0644\u06CC \u2014 \u0628\u0631\u0627\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A)","adm.tPortHint":"\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.","adm.tMode":"\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.tRadius":"\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627","adm.tDensity":"\u062A\u0631\u0627\u06A9\u0645","adm.tBg":"\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647","adm.tContrast":"\u06A9\u0646\u062A\u0631\u0627\u0633\u062A","adm.tAnim":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","adm.uSearchPos":"\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648","adm.uHeader":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF","adm.uNav":"\u0633\u0628\u06A9 \u0645\u0646\u0648","adm.uCards":"\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uSticky":"\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646","adm.uTicker":"\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627","adm.uTickerItems":"\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uTickerSpeed":"\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uQuick":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627","adm.uChat":"\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.uCrumb":"\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647","adm.uCols":"\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627","adm.uColsMobile":"\u0645\u0648\u0628\u0627\u06CC\u0644","adm.uColsTablet":"\u062A\u0628\u0644\u062A","adm.uColsDesktop":"\u062F\u0633\u06A9\u062A\u0627\u067E","adm.uColsWide":"\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636","adm.uCardInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uPosStart":"\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)","adm.uPosCenter":"\u0648\u0633\u0637","adm.uPosEnd":"\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)","adm.uLayoutLogoStart":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632","adm.uLayoutSplit":"\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646","adm.uLayoutCentered":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637","adm.fHint":"\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.bLabel":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bSelect":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627","adm.bSize":"\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628","adm.bCopies":"\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627","adm.bShowName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.bShowPrice":"\u0642\u06CC\u0645\u062A","adm.bShowBrand":"\u0628\u0631\u0646\u062F","adm.bShowSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.bShowQr":"\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","adm.bType":"\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F","adm.bPrint":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627","adm.bGenerate":"\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F","adm.igPack":"\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","adm.igCap":"\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)","adm.igTags":"\u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igImgHint":"\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.","adm.igDl":"\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631","adm.igNoImg":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.","adm.igCopyCap":"\u06A9\u067E\u06CC \u0645\u062A\u0646","adm.igCopyTags":"\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igCopyAll":"\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF","adm.bGenerated":"\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F","adm.bScan":"\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F","adm.bScanMode":"\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)","adm.bScanHint":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","adm.bConnected":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646","adm.bSerial":"\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial","adm.bSerialHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).","adm.bSerialUnsupported":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","adm.bSerialConnected":"\u0645\u062A\u0635\u0644 \u0634\u062F","adm.bSerialClosed":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F","adm.bHistory":"\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.isTitle":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.isHint":"\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.","adm.isBuild":"\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633","adm.isBuilding":"\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026","adm.isDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F","adm.isCount":"\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647","adm.auditAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.auditActor":"\u06A9\u0627\u0631\u0628\u0631","adm.auditTarget":"\u0645\u0648\u0636\u0648\u0639","adm.auditMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.statsRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.statsVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F","adm.statsOrders":"\u0633\u0641\u0627\u0631\u0634","adm.statsByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.statsByBrand":"\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F","adm.statsStockValue":"\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","adm.statsAvgOrder":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","adm.exportProducts":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","adm.exportOrders":"\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.exportUsers":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.exportReviews":"\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A","adm.exportTickets":"\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.exportAudit":"\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.exportAll":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)","adm.backup":"\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.cleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC","adm.cleanupDone":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.pageEditHint":"\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.noPermission":"\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.","adm.liveView":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A","adm.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","st.pending_payment":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A","st.pending_review":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","st.confirmed":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","st.preparing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC","st.ready_pickup":"\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","st.shipped":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647","st.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647","st.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","st.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","st.returned":"\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647","dl.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","dl.courier":"\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC","pm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","pm.gateway":"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC","pm.cod":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644","ps.unpaid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647","ps.paid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647","ps.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","ps.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F","ps.failed":"\u0646\u0627\u0645\u0648\u0641\u0642","ps.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","tc.order":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","tc.return":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","tc.product":"\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","tc.technical":"\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A","tc.complaint":"\u0634\u06A9\u0627\u06CC\u062A","tc.partnership":"\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","tc.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A","tc.other":"\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F","tp.critical":"\u0628\u062D\u0631\u0627\u0646\u06CC","tp.high":"\u0632\u06CC\u0627\u062F","tp.normal":"\u0645\u0639\u0645\u0648\u0644\u06CC","tp.low":"\u06A9\u0645","ft.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","ft.complaint":"\u0634\u06A9\u0627\u06CC\u062A","ft.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","fs.new":"\u062C\u062F\u06CC\u062F","fs.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647","fs.in_progress":"\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","fs.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647","fs.rejected":"\u0631\u062F \u0634\u062F\u0647","tk.open":"\u0628\u0627\u0632","tk.answered":"\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647","tk.closed":"\u0628\u0633\u062A\u0647","feat.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","feat.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","feat.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","feat.tickets":"\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A","feat.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","feat.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","feat.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","feat.priceCheckDevice":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","feat.publicStats":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC","feat.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","feat.consent":"\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)","feat.liveSupport":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","feat.announcements":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","feat.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","feat.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","feat.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","feat.guestCheckout":"\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","feat.priceAlerts":"\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","feat.twoFactor":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","feat.referrals":"\u06A9\u062F \u0645\u0639\u0631\u0641","feat.voiceSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","feat.offlineMode":"\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646","feat.captcha":"\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)","captcha.required":"\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","captcha.label":"\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645","captcha.hint":"\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633","captcha.placeholder":"\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A","captcha.solved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714","captcha.refresh":"\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647","perm.dashboard.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F","perm.products.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","perm.products.create":"\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627","perm.products.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","perm.products.delete":"\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627","perm.products.price":"\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641","perm.products.stock":"\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC","perm.categories.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","perm.orders.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","perm.orders.manage":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634","perm.refunds.manage":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","perm.reviews.moderate":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A","perm.reviews.reply":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A","perm.tickets.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","perm.feedback.manage":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","perm.users.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.permissions":"\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","perm.wallet.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644","perm.plus.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","perm.coupons.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","perm.ads.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","perm.notifications.send":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646","perm.settings.edit":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","perm.theme.edit":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","perm.pages.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","perm.barcode.print":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","perm.barcode.scan":"\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","perm.imagesearch.index":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC","perm.audit.view":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","perm.stats.view":"\u0622\u0645\u0627\u0631","perm.data.export":"\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627","misc.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","misc.addToHome":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","misc.installHint":"\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.","misc.printBlocked":"\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.","misc.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","misc.deleted":"\u062D\u0630\u0641 \u0634\u062F","misc.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","misc.confirmDelete":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","misc.loadingMore":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","misc.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","misc.uiSound":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637","misc.uiSoundOn":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F","misc.uiSoundOff":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F","misc.shareDone":"\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F","misc.shareNative":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","img.alt":"\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627","adm.view":"\u0645\u0634\u0627\u0647\u062F\u0647","adm.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.supSelect":"\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.supSelectHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.","adm.tkReply":"\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.tkManage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A","common.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.link":"\u0644\u06CC\u0646\u06A9","common.text":"\u0645\u062A\u0646","cart.coupon":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","misc.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","misc.copied":"\u06A9\u067E\u06CC \u0634\u062F","adm.revPending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.revApproved":"\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647","adm.revRejected":"\u0631\u062F\u0634\u062F\u0647","adm.revApprove":"\u0627\u0646\u062A\u0634\u0627\u0631","adm.revReject":"\u0631\u062F","adm.revReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.revEmpty":"\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A","adm.revEmptyHint":"\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.","rev.buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631","rev.visitor":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","rev.shopReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","fb.new":"\u062C\u062F\u06CC\u062F","fb.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F","fb.inProgress":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","fb.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","fb.rejected":"\u0631\u062F \u0634\u062F","feedback.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","feedback.complaint":"\u0634\u06A9\u0627\u06CC\u062A","feedback.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","adm.fbEmptyHint":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.cpNew":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F","adm.cpPercent":"\u062F\u0631\u0635\u062F\u06CC","adm.cpAmount":"\u0645\u0628\u0644\u063A\u06CC","adm.cpValue":"\u0645\u0642\u062F\u0627\u0631","adm.cpUsage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647","adm.cpDates":"\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631","adm.cpStart":"\u0634\u0631\u0648\u0639","adm.cpEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cpExpired":"\u0645\u0646\u0642\u0636\u06CC","adm.adNew":"\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F","adm.adSlot":"\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634","adm.adsHint":"\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.","adm.notifNew":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","adm.notifHint":"\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.","adm.notifLevel":"\u0633\u0637\u062D","adm.notifRecent":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","notif.level.info":"\u0627\u0637\u0644\u0627\u0639","notif.level.success":"\u0645\u0648\u0641\u0642","notif.level.warning":"\u0647\u0634\u062F\u0627\u0631","notif.level.error":"\u062E\u0637\u0627","adm.pagesPick":"\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.pagesPickHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.pgHint":"\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bPrinter":"\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628","adm.bPrinterHint":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bScanner":"\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646","adm.bLabels":"\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bPreview":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628","adm.bPriceMode":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","adm.bFound":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","adm.bNotFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","adm.bPickFirst":"\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.ixHint":"\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.","adm.ixIndex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647","adm.ixReindex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647","adm.ixDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.audActor":"\u06A9\u0627\u0631\u0628\u0631","adm.audAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.audTarget":"\u0647\u062F\u0641","adm.audMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.stOrders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.stRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.stVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.stUsers":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.stProducts":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.stAvg":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634","adm.stByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.stByBrand":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627","adm.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.dataHint":"\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.","adm.dExport":"\u062E\u0631\u0648\u062C\u06CC","adm.dBackup":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC","adm.dBackupHint":"\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dCleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC","adm.dCleanupHint":"\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","sys.turnOn":"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.turnOff":"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.offConfirm":"\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.","sys.autoWakeMins":"\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)","sys.asleep":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.","sys.asleepTimed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","sys.awake":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.","sys.sleepBanner":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","sys.keepAlive":"\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644","checkout.guestInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646","checkout.guestHint":"\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.","checkout.guestName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","checkout.guestPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644","checkout.guestPhoneHint":"\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9","checkout.guestNameRequired":"\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","checkout.guestPhoneInvalid":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.","checkout.guestCodPickup":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","home.recent":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627","home.recentSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC","checkout.guestCourierNote":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"},So={"app.name":"Yassaei Electronics","app.tagline":"Electronics & electrical supplies","common.loading":"Loading\u2026","common.save":"Save","common.saving":"Saving\u2026","common.cancel":"Cancel","common.close":"Close","common.confirm":"Confirm","common.delete":"Delete","common.edit":"Edit","common.add":"Add","common.create":"Create","common.update":"Update","common.search":"Search","common.filter":"Filter","common.filters":"Filters","common.sort":"Sort","common.all":"All","common.none":"None","common.more":"More","common.less":"Less","common.showAll":"View all","common.back":"Back","common.next":"Next","common.prev":"Previous","common.yes":"Yes","common.no":"No","common.optional":"Optional","common.required":"Required","common.copy":"Copy","common.copied":"Copied","common.share":"Share","common.download":"Download","common.upload":"Upload","common.print":"Print","common.refresh":"Refresh","common.retry":"Try again","common.send":"Send","common.sent":"Sent","common.submit":"Submit","common.reply":"Reply","common.view":"View","common.details":"Details","common.status":"Status","common.date":"Date","common.time":"Time","common.amount":"Amount","common.count":"Quantity","common.total":"Total","common.price":"Price","common.stock":"Stock","common.available":"In stock","common.unavailable":"Out of stock","common.inStock":"Available in stock","common.lowStock":"Fewer than 3 left","common.notifyMe":"Notify me when available","common.notified":"We will let you know as soon as it is back","common.category":"Category","common.brand":"Brand","common.product":"Product","common.products":"Products","common.order":"Order","common.orders":"Orders","common.user":"User","common.users":"Users","common.result":"Result","common.results":"Results","common.noResult":"No results found","common.error":"Error","common.success":"Done","common.warning":"Notice","common.note":"Note","common.notes":"Notes","common.description":"Description","common.specs":"Specifications","common.actions":"Actions","common.active":"Active","common.inactive":"Inactive","common.enabled":"On","common.disabled":"Off","common.on":"On","common.off":"Off","common.from":"From","common.to":"To","common.and":"and","common.or":"or","common.today":"Today","common.yesterday":"Yesterday","common.toman":"Toman","common.rial":"Rial","common.page":"Page","common.of":"of","common.items":"items","common.new":"New","common.old":"Old","common.apply":"Apply","common.reset":"Reset","common.clear":"Clear","common.select":"Please select","common.title":"Title","common.body":"Message","common.type":"Type","common.priority":"Priority","common.answer":"Answer","common.message":"Message","common.messages":"Messages","common.attach":"Attachment","common.image":"Image","common.images":"Images","common.phone":"Mobile number","common.email":"Email","common.address":"Address","common.city":"City","common.province":"Province","common.postal":"Postal code","common.name":"Name","common.fullName":"Full name","common.username":"Username","common.password":"Password","common.passwordConfirm":"Repeat password","common.login":"Sign in","common.logout":"Sign out","common.register":"Register","common.guest":"Guest","common.admin":"Admin","common.settings":"Settings","common.help":"Help","common.home":"Home","common.skip":"Skip","common.done":"Done","common.pending":"Pending","common.approved":"Approved","common.rejected":"Rejected","common.open":"Open","common.closed":"Closed","common.all2":"All items","common.never":"Never","common.empty":"Empty","common.secure":"Secure","common.free":"Free","common.unit":"pcs","common.day":"day","common.hour":"hour","common.minute":"minute","common.second":"second","common.percent":"percent","common.discount":"Discount","common.discountCode":"Discount code","common.shipping":"Shipping cost","common.insurance":"Shipment insurance","common.subtotal":"Items subtotal","common.payable":"Amount payable","common.payment":"Payment","common.cart":"Cart","common.wishlist":"My list","common.compare":"Compare","common.profile":"Profile","common.wallet":"Wallet","common.balance":"Balance","common.transactions":"Transactions","common.deposit":"Top up wallet","common.points":"Points","common.ticket":"Ticket","common.tickets":"Tickets","common.support":"Support","common.review":"Review","common.reviews":"Reviews","common.question":"Question","common.questions":"Customer questions","common.rating":"Rating","common.notification":"Notification","common.notifications":"Notifications","common.security":"Security","common.history":"History","common.report":"Report","common.bug":"Bug report","common.suggestion":"Suggestion","common.complaint":"Complaint","common.law":"Terms & conditions","common.privacy":"Privacy policy","common.about":"About us","common.contact":"Contact us","common.faq":"FAQ","common.guide":"Buying guide","common.services":"Customer services","common.stats":"Store statistics","common.searchProducts":"Search products\u2026","common.noData":"Nothing to show","common.tryAgain":"Try again","common.showMore":"Show more","common.perPage":"Per page",skip:"Skip to main content","boot.loading":"Loading Yassaei Electronics\u2026","boot.waking":"The cloud server is waking up; we will retry automatically in a few seconds\u2026","boot.failed":"Store unreachable; the cloud server is asleep or the network is down.","update.available":"A new version is ready \u2014 tap to see the changes.","update.reload":"Refresh now","boot.failedHint":"Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.","topbar.fastSend":"Shipping from Tehran to all of Iran","nav.home":"Home","nav.products":"All products","nav.deals":"Deals","nav.new":"New arrivals","nav.stats":"Live stats","nav.about":"About us","price.inquire":"Price on request \u2014 call the store","price.inquireShort":"Inquire","pdp.callStore":"Call the store","pdp.visitStore":"Visit in person","pdp.serviceHint":"This is a service/custom item; final price is confirmed by phone.","home.partFinder":"Can't find a part?","home.partFinderText":"Tell us by phone or message; if it is on our shelves, we set it aside for you the same day.","home.partFinderCta":"Call or message","nav.contact":"Contact us","nav.login":"Sign in","nav.register":"Register","nav.cart":"Cart","nav.wishlist":"My list","nav.notifications":"Notifications","nav.menu":"Menu","nav.account":"My account","nav.admin":"Admin panel","nav.allCategories":"All categories","theme.toggle":"Toggle theme (light/dark)","theme.dark":"Dark mode","theme.light":"Light mode","theme.auto":"Match system","search.placeholder":"Search products, brands or categories\u2026","search.go":"Search","search.voice":"Voice search","search.byImage":"Search by photo","search.listening":"Listening\u2026 go ahead and speak","search.noVoice":"Your browser does not support voice search.","search.micDenied":"Microphone access is blocked. Allow microphone permission for this site in browser settings.","search.voiceNetwork":"Speech service unreachable; check your internet connection.","search.noSpeech":"I didn't catch that; try again and speak clearly.","search.noMic":"No microphone found on this device.","pwd.show":"Show password","pwd.hide":"Hide password","search.suggestions":"Suggestions","search.trending":"Trending searches","search.recent":"Your recent searches","search.resultsFor":"Search results for","search.inProducts":"In products","search.inCategories":"Categories","search.inBrands":"Brands","search.inPages":"Pages","search.didYouMean":"Did you mean?","search.noResultTitle":"We found nothing","search.noResultText":"Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.","search.imageTitle":"Search by photo","search.imageText":"Upload a photo of the product and we will find similar items in the store.","search.imageHint":"JPG or PNG, up to 4 MB","search.imageIndexing":"Preparing the visual search engine\u2026","search.imageNoIndex":"Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.","search.imageNoMatch":"No similar product found for this photo. You can search by product name instead.","search.dropHere":"Drop the photo here","search.pickFile":"Choose a photo","search.takePhoto":"Take a photo with the camera","mnav.home":"Home","mnav.products":"Categories","mnav.search":"Search","mnav.cart":"Cart","mnav.me":"Account","footer.shopping":"Shopping","footer.allProducts":"All products","footer.deals":"Deals & offers","footer.inStock":"In-stock items","footer.searchByImage":"Visual search","footer.myList":"My list","footer.stats":"Store statistics","footer.services":"Customer services","footer.guide":"Buying guide","footer.service":"Customer services","footer.faq":"FAQ","footer.insurance":"Shipment insurance","footer.plus":"Plus membership","footer.tickets":"Support tickets","footer.about":"About & legal","footer.aboutUs":"About us","footer.terms":"Terms & conditions","footer.privacy":"Privacy policy","footer.bug":"Report a bug","footer.contact":"Contact us","footer.suggest":"Suggestions & complaints","footer.contactUs":"Ways to reach us","footer.install":"Install the app","footer.support":"Live support","footer.rights":"All rights reserved.","footer.workingHours":"Working hours","home.heroKicker":"Haft-Hoz bourse, with an authenticity guarantee","home.heroTitle":"From resistors to contactors \u2014 on your bench the same day","home.heroText":"Resistors, capacitors and ICs, soldering gear, cables and wires in every size, LED strips and projectors, modems and switches, fans and surge protectors \u2014 everything your board, home or workshop needs, under one roof in Narmak.","home.ctaShop":"Start shopping","home.ctaDeals":"Today's deals","home.point1":"Authenticity guarantee","home.point2":"7-day withdrawal right","home.point3":"Shipping across Iran","home.point4":"Free in-store pickup","home.categories":"Categories","home.categoriesSub":"From resistors and ICs to projectors and surge protectors","home.featured":"Featured picks","home.featuredSub":"Items we use and recommend ourselves","home.bestSellers":"Best sellers","home.bestSellersSub":"Chosen by Yassaei Electronics customers","home.newArrivals":"New in store","home.newArrivalsSub":"The latest items added to the shelf","home.deals":"Active discounts","home.dealsSub":"Limited-time offers at better prices","home.brands":"Brands in stock","home.whyUs":"Why Yassaei Electronics?","home.whyUsSub":"The things that set us apart","home.reviews":"Customer reviews","home.reviewsSub":"Real buyer experiences","home.visitStore":"Visit the store","home.visitStoreText":"Tehran, Narmak, Haft-Hoz square \u2014 free in-person advice and on-the-spot product testing","home.openMap":"See the sketch and map","home.statsTitle":"The store at a glance","home.plusTitle":"Yassaei Electronics Plus membership","home.plusText":"With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.","home.plusCta":"See Plus benefits","home.appTitle":"The Yassaei Electronics app","home.appText":"This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.","home.installCta":"Install on my device","home.appInstalled":"The app is installed","home.liveStats":"Live store statistics","home.newsletter":"Stay posted on deals","home.newsletterText":"Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.","home.subscribe":"Subscribe","stats.products":"Active products","stats.ordersTotal":"Total orders","stats.ordersToday":"Orders today","stats.visitsToday":"Visits today","stats.visitsTotal":"Total visits","stats.pendingOrders":"Orders under review","stats.delivered":"Successful deliveries","stats.customers":"Registered customers","stats.plusMembers":"Plus members","stats.categories":"Categories","stats.brands":"Brands","stats.outOfStock":"Out-of-stock items","stats.years":"Years active","stats.title":"Public store statistics","stats.sub":"These figures are taken live from the site's real data.","stats.chartTitle":"Visits over the last 14 days","stats.topProducts":"Best-selling products","stats.transparency":"Transparency for customers","stats.transparencyText":"We show real stock and real prices, and we do not hide the store's statistics either.","catalog.title":"Products","catalog.filters":"Filters","catalog.showFilters":"Show filters","catalog.hideFilters":"Hide filters","catalog.sort.relevant":"Most relevant","catalog.sort.newest":"Newest","catalog.sort.oldest":"Oldest","catalog.sort.cheapest":"Cheapest","catalog.sort.dearest":"Most expensive","catalog.sort.popular":"Best selling","catalog.sort.rating":"Highest rated","catalog.sort.discount":"Biggest discount","catalog.sort.name":"Alphabetical","catalog.f.category":"Category","catalog.f.brand":"Brand","catalog.f.price":"Price range","catalog.f.availability":"Availability","catalog.f.inStock":"In-stock items only","catalog.f.discountOnly":"Discounted only","catalog.f.rating":"Minimum rating","catalog.f.authenticity":"Authenticity","catalog.f.clear":"Clear all filters","catalog.count":"products","catalog.viewGrid":"Grid view","catalog.viewList":"List view","auth.original":"Original","auth.highcopy":"High copy (grade 1)","auth.generic":"Generic","card.addToCart":"Add to cart","card.added":"Added to cart","card.quickView":"Quick view","card.wishlistAdd":"Add to my list","card.wishlistRemove":"Remove from my list","card.compareAdd":"Add to compare","card.outOfStock":"Out of stock","card.soldOut":"Sold out","pdp.addToCart":"Add to cart","pdp.buyNow":"Buy now","pdp.pickup":"Free in-store pickup","pdp.warranty":"Warranty","pdp.warrantyMonths":"{n}-month store replacement warranty","pdp.noWarranty":"No warranty","pdp.sku":"Product code","pdp.barcode":"Barcode","pdp.weight":"Weight","pdp.gram":"grams","pdp.zoomIn":"Zoom in","pdp.zoomOut":"Zoom out","pdp.zoomReset":"Actual size","pdp.zoomHint":"Hover for magnifier; click or double-tap for full zoom","pdp.video":"Video","pdp.share":"Share","pdp.specs":"Specifications","pdp.description":"Description","pdp.reviews":"Reviews & ratings","pdp.questions":"Customer questions","pdp.related":"Similar products","pdp.compatibility":"Compatibility","pdp.writeReview":"Write a review & rating","pdp.askQuestion":"Ask a question","pdp.loginToReview":"Sign in to write a review.","pdp.reviewSubmitted":"Your review was submitted and will appear once the admin approves it.","pdp.reviewPending":"Your review will appear after the admin approves it.","pdp.questionSubmitted":"Your question was submitted; once approved, the admin will answer it.","pdp.buyerBadge":"Buyer of this product","pdp.visitorBadge":"Visitor","pdp.helpful":"Was helpful","pdp.storeReply":"Store reply","pdp.noReviews":"No reviews yet. Be the first!","pdp.noQuestions":"No questions yet. Ask if you have one.","pdp.yourRating":"Your rating","pdp.viewed":"views","pdp.sold":"sold","pdp.off":"off","pdp.save":"You save","pdp.lastPrice":"Previous price","pdp.stockCount":"In stock: {n}","pdp.fastSend":"Fast shipping from Tehran","pdp.installment":"Cash on delivery for eligible orders","cart.title":"Cart","cart.empty":"Your cart is empty","cart.emptyText":"You have not picked anything yet. Start from the categories or the search box.","cart.goShopping":"Let's go shopping","cart.item":"Product","cart.qty":"Quantity","cart.remove":"Remove","cart.clear":"Empty the cart","cart.clearConfirm":"Remove all items from the cart?","cart.summary":"Order summary","cart.continue":"Continue to checkout","cart.freeShipHint":"Spend {amount} Toman more to get free shipping.","cart.freeShipDone":"Shipping is free for this order!","cart.couponApplied":"Discount code applied","cart.couponPlaceholder":"Have a discount code? Enter it","cart.applyCoupon":"Apply code","cart.removeCoupon":"Remove code","cart.updated":"Cart updated","checkout.title":"Checkout","checkout.step1":"Delivery","checkout.step2":"Payment","checkout.step3":"Confirm","checkout.delivery":"Delivery method","checkout.pickup":"Pickup from the store","checkout.pickupDesc":"Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.","checkout.courier":"Courier / postal shipping","checkout.courierDesc":"Shipped to a saved address, with optional shipment insurance.","checkout.zone":"Shipping zone","checkout.express":"Express shipping (same day)","checkout.insuranceOpt":"Shipment insurance","checkout.insuranceDesc":"If the parcel is damaged or lost in transit, the goods value is compensated.","checkout.insuranceAuto":"Applied automatically and free for Plus members.","checkout.address":"Delivery address","checkout.addAddress":"Add a new address","checkout.noAddress":"You must save at least one address for postal shipping.","checkout.paymentMethod":"Payment method","checkout.useWallet":"Pay from wallet","checkout.walletBalance":"Wallet balance: {amount} Toman","checkout.note":"Order note (optional)","checkout.notePlaceholder":"e.g. please call before delivery.","checkout.acceptTerms":"I have read and accept the Terms & Conditions and the Privacy Policy.","checkout.placeOrder":"Place & pay for the order","checkout.placing":"Placing your order\u2026","checkout.loginRequired":"Sign in to complete your purchase.","checkout.successTitle":"Order placed","checkout.successText":"Your order code is {code}. Track its status under My Orders.","checkout.payNow":"Pay online","checkout.payLater":"I will pay later","checkout.gatewayDemo":"The gateway is in demo mode; no real money is deducted.","checkout.paymentSuccess":"Payment was successful","checkout.paymentFailed":"Payment failed","checkout.simulateSuccess":"Successful payment (gateway simulation)","checkout.simulateFail":"Cancel payment","checkout.concurrencyNote":"Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.","checkout.pickupReady":"Preparation time: about {h} working hours","auth.title":"Sign in or register","auth.loginTitle":"Sign in to your account","auth.registerTitle":"Create an account","auth.methodPassword":"Username & password","auth.methodPhone":"Mobile number","auth.methodEmail":"Email","auth.identifier":"Username, mobile or email","auth.remember":"Remember me","auth.forgot":"Forgot password","auth.noAccount":"Do not have an account?","auth.haveAccount":"Already registered?","auth.sendCode":"Send verification code","auth.codeSent":"Verification code sent","auth.codeSentTo":"A 6-digit code was sent to {target}.","auth.enterCode":"Enter the verification code","auth.otpCode":"Verification code","auth.resend":"Resend code","auth.resendIn":"Resend in {s} seconds","auth.demoCode":"Demo mode: verification code {code}","auth.2faTitle":"Two-step sign-in","auth.2faText":"Enter the 6-digit code from your authenticator app, SMS or email.","auth.2faTotp":"Authenticator app","auth.2faSms":"SMS code","auth.2faEmail":"Email code","auth.2faBackup":"Backup code","auth.2faVerify":"Verify & sign in","auth.acceptTerms":"I accept the Terms & Conditions and the Privacy Policy.","auth.referral":"Referral code (optional)","auth.registerDone":"Your account was created. Welcome!","auth.loginDone":"Welcome","auth.logoutDone":"You signed out successfully","auth.recoveryTitle":"Password recovery","auth.recoveryText":"Enter your registered mobile number or email and we will send a recovery code.","auth.newPassword":"New password","auth.resetDone":"Password changed successfully","auth.passwordRules":"At least 8 characters including lowercase, uppercase, a digit and a symbol","auth.orContinue":"or","auth.guestCheckout":"Continue shopping without an account","acc.title":"My account","acc.dashboard":"My dashboard","acc.badges":"My achievements","badge.got":"Earned","badge.locked":"Locked","badge.first-buy":"First purchase","badge.first-buy.d":"You placed your first successful order.","badge.silver-buyer":"Silver buyer","badge.silver-buyer.d":"5 successful orders at Yassaei Electronics.","badge.gold-buyer":"Gold buyer","badge.gold-buyer.d":"15 successful orders; a Yassaei Electronics VIP.","badge.big-spender":"Big spender","badge.big-spender.d":"Over 50,000,000 Toman in purchases.","badge.early-bird":"Early bird","badge.early-bird.d":"Among the first 100 Yassaei Electronics users.","badge.veteran":"Veteran","badge.veteran.d":"With us for more than a year.","badge.reviewer":"Reviewer","badge.reviewer.d":"3 posted reviews helping others choose.","badge.plus-member":"Plus member","badge.plus-member.d":"You have an active Plus subscription.","badge.wallet-user":"Wallet user","badge.wallet-user.d":"You have used the Yassaei Electronics wallet.","badge.supporter":"Supporter","badge.supporter.d":"You opened your first support ticket.","acc.orders":"My orders","acc.wishlist":"My list","acc.wallet":"Wallet","acc.plus":"Plus membership","acc.addresses":"Addresses","acc.notifications":"Notifications","acc.tickets":"My tickets","acc.support":"Support chat","acc.reviews":"My reviews","acc.feedback":"Suggestions & complaints","acc.profile":"Profile details","acc.security":"Account security","acc.sessions":"Active sessions","acc.prefs":"Display preferences","acc.data":"My data","acc.hello":"Hi {name}","acc.memberSince":"Member since {date}","acc.noOrders":"You have not placed an order yet","acc.noOrdersText":"Make your first purchase with the welcome discount WELCOME10.","acc.orderCode":"Order code","acc.orderDate":"Order date","acc.orderItems":"Items","acc.orderTotal":"Total amount","acc.trackOrder":"Track order","acc.cancelOrder":"Cancel order","acc.cancelConfirm":"Cancel this order? The paid amount returns to your wallet.","acc.cancelReason":"Reason for cancellation (optional)","acc.orderCancelled":"Order cancelled","acc.reorder":"Buy again","acc.invoice":"Invoice","acc.printInvoice":"Print invoice","acc.timeline":"Order progress","acc.walletEmpty":"No transactions recorded yet","acc.walletDeposit":"Top up wallet","acc.walletAmount":"Top-up amount (Toman)","acc.walletDeposited":"Wallet topped up","acc.walletNote":"The wallet balance can only be used to buy from this store; no interest or fee applies to it.","acc.tx.deposit":"Top-up","acc.tx.purchase":"Purchase","acc.tx.refund":"Refund","acc.tx.adjust_in":"Increase by admin","acc.tx.adjust_out":"Deduction by admin","acc.plusInactive":"You do not have a Plus membership","acc.plusActive":"Plus active until {date}","acc.plusSubscribe":"Buy Plus membership","acc.plusRenew":"Renew membership","acc.plusPrice":"{price} Toman for {days} days","acc.plusPerks":"Plus membership benefits","acc.plusSubscribed":"Plus membership activated","acc.plusPayWallet":"Pay from wallet","acc.plusPayGateway":"Pay online","acc.addAddress":"Add address","acc.editAddress":"Edit address","acc.addrTitle":"Label (e.g. home, work)","acc.addrReceiver":"Recipient name","acc.addrPhone":"Recipient phone number","acc.addrStreet":"Full postal address","acc.addrDefault":"Default address","acc.addrNote":"Note for the courier","acc.addrSaved":"Address saved","acc.addrDeleted":"Address deleted","acc.noAddress":"No address saved yet","acc.wishlistEmpty":"Your list is empty","acc.wishlistEmptyText":"Tap the heart icon on any product to save it here.","acc.notifEmpty":"You have no notifications","acc.markAllRead":"Mark all as read","acc.ticketNew":"New ticket","acc.ticketSubject":"Subject","acc.ticketCategory":"Request category","acc.ticketPriority":"Priority","acc.ticketBody":"Request details","form.rulesRequired":"You must accept the ticket rules first.","form.termsRequired":"You must accept the terms and conditions first.","page.statsTitle":"Live store stats","page.aboutCta":"Come and see what we have in store for you","page.stepsTitle":"How to buy","page.tipsTitle":"Buying tips","page.hintsTitle":"For a more precise report","page.bugTitle":"Report a bug","page.rulesTitle":"Rules","faq.all":"All topics","faq.search":"Search questions\u2026","faq.results":"{n} questions","faq.notFound":"No question matched your search.","faq.askText":"Ask live support or open a ticket.","faq.cat.orders":"Orders & tracking","faq.cat.shipping":"Shipping & delivery","faq.cat.returns":"Returns & refunds","faq.cat.product":"Products & authenticity","faq.cat.account":"Account","faq.cat.security":"Security & payment","faq.cat.store":"Store & contact","faq.cat.other":"Other","acc.ticketCloseConfirm":"Close this ticket? You can reopen it later by sending a message.","acc.ticketClosedNote":"This ticket is closed. Sending a new message reopens it.","acc.ticketBodyShort":"The message is too short.","acc.attachHint":"Up to 4 images, each below 4 MB.","err.tooLarge":"The file is larger than 4 MB.","acc.ticketRules":"I have read and accept the ticket rules.","acc.ticketViewRules":"Read ticket rules","acc.ticketCreated":"Ticket created. Tracking code: {code}","acc.ticketWrite":"Write your reply\u2026","acc.ticketClose":"Close ticket","acc.ticketReopen":"Reopen","acc.ticketSla":"Estimated reply time: {h} hours","acc.noTickets":"You have no tickets","acc.chatTitle":"Live support","acc.chatPlaceholder":"Write your message\u2026","acc.chatWelcome":"Hi! Any question or issue? Write it here and we will answer.","acc.chatOffline":"We are outside working hours right now; leave a message and we reply first thing, or open a ticket.","acc.chatOpenTicket":"Open a ticket","acc.reviewEmpty":"You have not posted a review or question","acc.feedbackNew":"Send a suggestion, complaint or bug report","acc.feedbackType":"Message type","acc.feedbackContact":"Contact (email or mobile)","acc.feedbackContactHint":"If provided, we will inform you of the outcome.","acc.feedbackSent":"Your message was submitted. Thanks for helping us improve.","acc.noFeedback":"You have not sent any message","acc.profileSaved":"Profile saved","acc.passwordChange":"Change password","acc.currentPassword":"Current password","acc.newPassword2":"New password","acc.passwordChanged":"Password changed","acc.2faSection":"Two-factor authentication (2FA)","acc.2faOff":"Disabled \u2014 turn it on for extra security.","acc.2faOn":"Enabled","acc.2faEnable":"Enable two-factor","acc.2faDisable":"Disable","acc.2faScan":"Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.","acc.2faKey":"Manual key","acc.2faEnterCode":"Enter the 6-digit code from the app to enable","acc.2faEnabled":"Two-factor enabled","acc.2faDisabled":"Two-factor disabled","acc.2faBackup":"Backup codes (keep them safe)","acc.2faBackupHint":"If you lose access to the app, sign in with these. Each code works once.","acc.2faMethods":"Verification methods","acc.sessionsText":"Devices currently signed in to your account.","acc.revokeAll":"Sign out everywhere","acc.revokeDone":"Sessions revoked","acc.current":"This device","acc.prefsText":"These settings apply only to this device.","acc.prefTheme":"Theme","acc.prefLang":"Language","acc.prefDensity":"Density","acc.prefMotion":"Animations","acc.prefNotif":"Notifications","acc.notifMarketing":"Offers and discounts","acc.notifOrders":"Order status","acc.notifRestock":"Restock of my saved items","acc.notifSupport":"Support and ticket replies","acc.exportData":"Export my data","acc.exportHint":"Download all your account info, orders, reviews and tickets as JSON.","acc.deleteAccount":"Delete account","acc.deleteWarn":"Deleting removes your personal data, while financial order records are kept as required by law.","acc.deleteConfirm":"Enter your password to delete the account","acc.pointsText":"You earn 1 point per 100,000 Toman of purchase.","acc.referralCode":"Your referral code","acc.referralText":"Share this code; you both get 50 points.","chat.title":"Yassaei Electronics live support","chat.online":"We usually reply within minutes","chat.open":"Start chat","chat.minimize":"Close","chat.loginFirst":"Sign in to chat with support.","chat.sent":"Message sent","chat.typing":"Support is typing\u2026","chat.quick":"Frequent questions","notif.new":"New notification","notif.markRead":"Mark as read","notif.viewAll":"View all notifications","notif.empty":"No notifications","notif.type.announcement":"Announcement","notif.type.order":"Order","notif.type.restock":"Back in stock","notif.type.ticket":"Ticket","notif.type.support":"Support","notif.type.review":"Review","notif.type.plus":"Plus membership","notif.type.wallet":"Wallet","notif.type.account":"Account","notif.type.feedback":"Feedback","notif.type.admin_alert":"Admin alert","notif.type.news":"News","notif.type.offer":"Special offer","notif.type.system":"System","notif.type.info":"Info","notif.type.welcome":"Welcome","consent.title":"Welcome to Yassaei Electronics","consent.text":"Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.","consent.terms":"I have read and accept the Terms & Conditions.","consent.privacy":"I accept the Privacy Policy.","consent.marketing":"I would like to hear about deals and new arrivals (optional).","consent.accept":"Accept & enter the site","consent.readTerms":"Read terms","consent.readPrivacy":"Read privacy","consent.thanks":"Thanks! Your acceptance was recorded.","consent.manage":"Cookie & privacy choices","social.instagram":"Instagram","home.partnersTitle":"Brands we work with","stats.subtitle":"Real store numbers, updated live.","stats.chartHint":"Each column height is that day visit count.","stats.topTitle":"Recent best sellers","adm.sPartners":"Partners & brands","adm.ptFa":"Persian name","adm.ptEn":"Name (EN)","adm.ptAdd":"Add brand","adm.ptHint":"These names scroll as a marquee on the home page; order is yours to set.","feat.partners":"Partner brands strip","auth.pwdLater":"I'll change it later","auth.pwdLaterToast":"OK; you can change it anytime from Account \u2192 Change password.","social.telegram":"Telegram","social.eitaa":"Eitaa","social.whatsapp":"WhatsApp","consent.rejectOptional":"Accept necessary only","consent.ttlNote":"Your choice stays valid for 180 days; after that we ask again.","contact.title":"Contact us","contact.mapTitle":"Shop location sketch","contact.mapHint":"Click to open in a map app","contact.mapAsk":"Which map would you like to open?","contact.mapPermission":"If you allow location access, we will show the route from your current position to the shop.","contact.allowLocation":"Allow location access","contact.denyLocation":"Continue without location","contact.openMaps":"Open in maps","contact.copyAddress":"Copy address","contact.hours":"Working hours","contact.phone":"Store phone","contact.mobile":"Mobile & WhatsApp","contact.emailUs":"Email","contact.addressUs":"Address","contact.callNow":"Call now","contact.whatsapp":"Message on WhatsApp","contact.locationOn":"Your approximate location was found","contact.locationDenied":"Location denied; the map opens without an origin.","contact.formTitle":"Send a quick message","contact.formText":"Prefer not to call? Leave a message or open a ticket.","contact.neshan":"Neshan","contact.balad":"Balad","contact.google":"Google Maps","contact.osm":"OpenStreetMap","contact.tgBotTitle":"Telegram support bot","contact.tgBotText":"Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.","contact.tgBotBtn":"Open the bot on Telegram","compare.title":"Compare products","compare.empty":"No products selected for comparison","compare.emptyText":"Use the Compare button on product cards (up to 4 items).","compare.add":"Add to compare","compare.remove":"Remove","priceCheck.title":"Price check by barcode","priceCheck.sub":"Scan the barcode with your device or type it manually.","priceCheck.input":"Barcode or SKU","priceCheck.scanCamera":"Scan with camera","priceCheck.stopCamera":"Stop camera","priceCheck.waiting":"Waiting for a scan\u2026","priceCheck.notFound":"No product found for this barcode","priceCheck.found":"Product found","priceCheck.cameraUnsupported":"Camera unavailable. Use a barcode device or manual entry.","priceCheck.cameraDenied":"Camera access denied.","priceCheck.deviceMode":"Kiosk mode (full screen)","priceCheck.lastScan":"Last scan","priceCheck.fullscreen":"Full screen","err.generic":"Something went wrong. Please try again.","err.network":"Could not reach the server.","err.notFound":"Page not found","err.notFoundText":"The address may be wrong or the page has been removed.","err.goHome":"Go to homepage","err.offline":"You are offline. Cached data is shown.","err.online":"Back online","err.loginRequired":"You must sign in to view this section.","err.forbidden":"You do not have access to this section.","adm.title":"Admin panel","adm.dashboard":"Dashboard","adm.products":"Products","adm.productNew":"Add product","adm.productEdit":"Edit product","adm.categories":"Categories & brands","adm.orders":"Orders","adm.reviews":"Reviews & questions","adm.tickets":"Tickets","adm.supportChat":"Support chat","adm.feedback":"Feedback & bugs","adm.users":"Users & permissions","adm.wallet":"User wallets","adm.coupons":"Coupons","adm.ads":"Advertisements","adm.notifications":"Notifications","adm.settings":"Store settings","adm.theme":"Theme & layout","adm.features":"Features","adm.shipping":"Shipping & insurance","adm.plus":"Plus membership","adm.pages":"Page content","adm.barcode":"Barcode & labels","adm.imageSearch":"Image search","adm.audit":"Audit log","adm.stats":"Statistics","adm.export":"Export & backup","adm.maintenance":"Maintenance","adm.backToSite":"Back to site","adm.kpi.ordersToday":"Orders today","adm.kpi.visits":"Visits today","adm.kpi.pending":"Pending review","adm.kpi.revenueTotal":"Total revenue","adm.kpi.users":"Users","adm.kpi.products":"Products","adm.kpi.lowStock":"Low stock","adm.awaiting":"Tasks awaiting action","adm.awaiting.reviews":"Reviews to approve","adm.awaiting.tickets":"Open tickets","adm.awaiting.orders":"Pending orders","adm.awaiting.feedback":"New feedback","adm.awaiting.chat":"Unread chat messages","adm.chart":"Last 14 days trend","adm.topSelling":"Best sellers","adm.lowStockList":"Low-stock items","adm.recentAudit":"Latest events","adm.storage":"Data size","adm.pName":"Product name","adm.pNameEn":"English name","adm.pCat":"Category","adm.pBrand":"Brand","adm.pPrice":"Price (Toman)","adm.pOldPrice":"Price before discount","adm.pCost":"Purchase cost","adm.pStock":"Stock","adm.pSku":"SKU","adm.pBarcode":"Barcode","adm.pWeight":"Weight (grams)","adm.pWarranty":"Warranty (months)","adm.pAuth":"Authenticity","adm.pTags":"Tags (separate with Enter)","adm.pSpecs":"Specifications","adm.pSpecKey":"Spec name","adm.pSpecVal":"Value","adm.pAddSpec":"Add spec","adm.pVideos":"Product videos (one https or /uploads URL per line)","adm.pVideosHint":"Videos play in the product gallery and lightbox.","adm.pImages":"Images","adm.pFindImage":"Auto image search","adm.pFindImageHint":"We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.","adm.pFindSearching":"Searching for images\u2026","adm.pFindEmpty":"No images found. You can upload your own photo.","adm.pUpload":"Upload photo","adm.pUseImage":"Use this image","adm.pDefaultImage":"Restore default image","adm.pFeatured":"Show in featured picks","adm.pActive":"Active (visible on site)","adm.pSaved":"Product saved","adm.pCreated":"Product created","adm.pDeleted":"Product deleted","adm.pDeleteConfirm":"Delete this product permanently?","adm.pQuickEdit":"Quick edit","adm.pBulkPrice":"Bulk price change","adm.catName":"Category name","adm.catParent":"Parent category","adm.catGlyph":"Icon","adm.catOrder":"Display order","adm.catNoParent":"No parent (top level)","adm.brandName":"Brand name","adm.brandNameEn":"Brand English name","adm.oStatus":"Change status","adm.oTracking":"Tracking code","adm.oNote":"Internal note","adm.oCustomer":"Customer","adm.oDelivery":"Delivery","adm.oPayment":"Payment","adm.oSaved":"Order updated","adm.rApprove":"Approve & publish","adm.rReject":"Reject","adm.rReply":"Reply","adm.rReplySaved":"Reply saved","adm.rModerated":"Review status updated","adm.rFilter":"Filter","adm.uRole":"Role","adm.uPerms":"Permissions","adm.uPermsHint":"Toggle each permission separately. Changes apply immediately.","adm.uAll":"Enable all","adm.uNone":"Disable all","adm.uWalletAdjust":"Adjust wallet balance","adm.uWalletReason":"Reason","adm.uPlusDays":"Plus membership days","adm.uResetPass":"Reset password","adm.uStatus":"Account status","adm.uBlocked":"Blocked","adm.uSaved":"User changes saved","adm.uMakeStaff":"Make staff","adm.cCode":"Code","adm.cType":"Discount type","adm.cValue":"Value","adm.cMax":"Max discount","adm.cMin":"Minimum order","adm.cLimit":"Total usage limit","adm.cPerUser":"Per-user limit","adm.cStart":"Starts","adm.cEnd":"Ends","adm.cUsed":"Used","adm.aSlot":"Placement","adm.aTitle":"Title","adm.aText":"Text","adm.aLink":"Target link","adm.aCta":"Button text","adm.aActive":"Visible","adm.nTitle":"Notification title","adm.nBody":"Notification body","adm.nTarget":"Recipient","adm.nAll":"All users","adm.nOne":"A specific user","adm.nLevel":"Level","adm.nSent":"Notification sent","adm.nOutbox":"SMS & email outbox (demo mode)","adm.sStore":"Store information","adm.sTheme":"Theme","adm.sUi":"Interface layout","adm.mailsms":"Email & SMS","adm.mailCfg":"Mail server (SMTP)","adm.mailEnabled":"Email sending on","adm.mailFrom":"From address","adm.smsCfg":"SMS panel (Kavenegar)","adm.smsEnabled":"SMS sending on","adm.smsKey":"API key","adm.smsSender":"Sender number","adm.console":"System console","adm.consoleHint":"Restart takes a few seconds; the page reloads itself. Resets are irreversible.","adm.sysRestart":"Restart server","adm.sysRestartWarn":"Restart the server now? Users will be disconnected for a few seconds.","adm.sysRestarting":"Restarting\u2026 the page will reload shortly.","adm.sysResetLabel":"Reset sections (irreversible):","adm.sysReset.audit":"Audit log","adm.sysReset.carts":"Guest carts","adm.sysReset.visits":"Visit counters","adm.sysReset.visitors":"Visitors list","adm.secTitle":"Defense & entry queue","adm.secQueueEnabled":"Queue visitors when busy","adm.secQueueDesc":"When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.","adm.secMaxConc":"Max concurrent requests","adm.secTriggerRps":"Requests-per-second trigger","adm.secPassTtl":"Entry pass TTL (minutes)","adm.secPoll":"Queue poll interval (seconds)","adm.secFloodBan":"Auto-ban threshold (requests/minute)","adm.secFloodMin":"Auto-ban duration (minutes)","adm.secSaved":"Defense settings saved.","adm.secInflight":"Active requests","adm.secRps":"Req/sec","adm.secQueued":"In queue","adm.secAutoBans":"Active auto-bans","adm.secTop":"Top talker IPs (last minute)","adm.secPerMin":"Req/min","adm.secTopEmpty":"No unusual traffic recorded.","adm.secBusy":"Busy \u2014 queue active","adm.secNormal":"Normal","adm.banMinutes":"Duration (minutes, 0 = permanent)","adm.banUntil":"Until","adm.banAuto":"auto","adm.resetAudit":"Clear audit logs","adm.resetCarts":"Clear guest carts","adm.resetVisitors":"Clear visitors","adm.resetDone":"Reset done.","adm.resetWarn.audit":"Delete all audit logs?","adm.resetWarn.carts":"Empty all guest carts?","adm.resetWarn.visitors":"Delete the visitors list?","adm.resetWarn.visits":"Zero the visit counters?","adm.visitors":"Visitors","adm.uDevice":"Device / IP","adm.uBrowser":"Browser","adm.uRegion":"Region / time","adm.uPath":"Path","adm.guest":"Guest","adm.bans":"Bans (block / unblock)","adm.banType":"Type","adm.banValue":"Value (IP / phone / email / username)","adm.banReason":"Reason","adm.ban":"Ban","adm.unban":"Unban","adm.banned":"Banned","adm.banDone":"Banned.","adm.unbanDone":"Unbanned.","adm.bansEmpty":"Nobody is banned right now.","adm.banByAdmin":"By admin","adm.channels":"Channels","adm.chSite":"In-site notification","adm.chTelegram":"Telegram bot","adm.chEmail":"Email","adm.chSms":"SMS","adm.channelsHint":"Email/SMS need settings below; without them only ready channels send.","adm.telegram":"Telegram bot","adm.tgHint":"Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.","adm.tgEnabled":"Bot on","adm.tgToken":"Bot token","adm.tgTokenHint":"Like 123456:ABC-\u2026","adm.tgWelcome":"/start welcome message","adm.tgTest":"Test send","adm.tgInbox":"Inbox","adm.tgSubs":"Subscribers","adm.tgReplyPh":"Reply to this user\u2026","adm.tgInboxEmpty":"No messages yet.","adm.lottery":"Lottery","adm.lotteryNew":"New draw","adm.lotPrize":"Prize","adm.lotEnds":"Ends","adm.lotWinners":"Winners count","adm.lotWinnersList":"Winners","adm.lotMode":"Entry mode","adm.lotModeOrders":"Automatic from orders","adm.lotModeManual":"Manual join button","adm.lotEntries":"Entries","adm.lotRun":"Draw now","adm.lotRunWarn":"Winners are picked randomly and notified now. Continue?","adm.lotDone":"Draw done","adm.lotClose":"Close","adm.lotClosed":"Draw closed.","adm.lotEmpty":"No draws yet.","lot.title":"Yassaei Electronics lottery","lot.nav":"Lottery","lot.soon":"Coming soon \u2014 stay tuned!","lot.done":"Past draws","lot.winners":"Winners","lot.active":"Active","lot.prize":"Prize","lot.ends":"Ends","lot.entries":"Entries","lot.joined":"You are in this draw.","lot.join":"Join draw","lot.joinDone":"Entry recorded \u2014 good luck!","lot.autoEntry":"Every valid order in the draw window counts automatically.","contact.phone3":"Third phone","adm.sBackups":"Backups & dump","adm.backupNow":"Backup now","adm.backupsHint":"A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.","adm.backupsEmpty":'No snapshot yet; hit "Backup now".',"adm.backupSize":"Size","adm.backupRestore":"Restore","adm.backupRestoreWarn":"All current data will be replaced by this snapshot. Sure?","adm.backupDone":"Backup created.","adm.backupRestored":"Restore done; reloading.","adm.dumpFull":"Full site dump","adm.sFeatures":"Features","adm.sShipping":"Shipping","adm.sPlus":"Plus","adm.sOrders":"Orders & payment","adm.sSeo":"SEO","adm.sAuth":"Authentication","adm.sSaved":"Settings saved","adm.tAccent":"Primary colour","adm.tPort":"Port theme (waves, boat and palm in the background)","adm.tPortHint":"Turn it off for a plain neutral background.","adm.tMode":"Default theme","adm.tRadius":"Corner radius","adm.tDensity":"Density","adm.uHeader":"Header layout","adm.uNav":"Menu style","adm.uCards":"Product card style","adm.uSticky":"Sticky header","adm.uTicker":"Top ticker bar","adm.uTickerItems":"Ticker messages","adm.uTickerSpeed":"Ticker speed","adm.uQuick":"Product quick view","adm.uChat":"Floating support button","adm.uCrumb":"Show breadcrumbs","adm.uCols":"Product columns","adm.uColsMobile":"Mobile","adm.uColsTablet":"Tablet","adm.uColsDesktop":"Desktop","adm.uColsWide":"Wide screen","adm.uCardInfo":"Info shown on product cards","adm.uPosStart":"Right (start)","adm.uPosCenter":"Center","adm.uPosEnd":"Left (end)","adm.uLayoutLogoStart":"Logo at start","adm.uLayoutSplit":"Logo start / search center / actions end","adm.uLayoutCentered":"Logo centered","adm.fHint":"Turn off any feature you do not need; its section disappears from the site and panel.","adm.bLabel":"Label printing","adm.bSelect":"Select products","adm.bSize":"Label size","adm.bCopies":"Copies per product","adm.bShowName":"Product name","adm.bShowPrice":"Price","adm.bShowBrand":"Brand","adm.bShowSku":"SKU","adm.bShowQr":"Product page QR code","adm.bType":"Barcode type","adm.bPrint":"Print labels","adm.bGenerate":"Generate new barcode","adm.igPack":"Instagram post pack","adm.igCap":"Caption (editable before copy)","adm.igTags":"Hashtags","adm.igImgHint":"Post image; download it and publish with the caption.","adm.igDl":"Download image","adm.igNoImg":"This product has no image yet; add one via upload or image search first.","adm.igCopyCap":"Copy caption","adm.igCopyTags":"Copy hashtags","adm.igCopyAll":"Copy caption + tags","adm.bGenerated":"Barcode generated and assigned","adm.bScan":"Scan barcode","adm.bScanMode":"Scanner mode (device sync)","adm.bScanHint":"Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.","adm.bConnected":"Device connected \u2014 ready to scan","adm.bSerial":"Direct connection via Web Serial","adm.bSerialHint":"If your device has a serial/USB port, connect here (desktop Chrome/Edge only).","adm.bSerialUnsupported":"Your browser does not support Web Serial; use keyboard or camera mode.","adm.bSerialConnected":"Connected","adm.bSerialClosed":"Connection closed","adm.bHistory":"Recent scans","adm.isTitle":"Image index for visual search","adm.isHint":"Build the index once so customers can search by photo. It runs in your browser and adds no server load.","adm.isBuild":"Build index","adm.isBuilding":"Indexing\u2026","adm.isDone":"Index built","adm.isCount":"Indexed images","adm.auditAction":"Event","adm.auditActor":"User","adm.auditTarget":"Target","adm.auditMeta":"Details","adm.statsRevenue":"Revenue","adm.statsVisits":"Visits","adm.statsOrders":"Orders","adm.statsByCat":"Category performance","adm.statsByBrand":"Sales by brand","adm.statsStockValue":"Inventory value","adm.statsAvgOrder":"Average basket","adm.exportProducts":"Export products","adm.exportOrders":"Export orders","adm.exportUsers":"Export users","adm.exportReviews":"Export reviews","adm.exportTickets":"Export tickets","adm.exportAudit":"Export events","adm.exportAll":"Full backup (JSON)","adm.backup":"Create backup now","adm.cleanup":"Clean old data","adm.cleanupDone":"Cleanup done","adm.pageEditHint":"Edit page texts here; changes apply to the site immediately.","adm.noPermission":"You do not have permission for this section. Ask the owner to grant it.","adm.liveView":"Live preview of changes","adm.saved":"Saved","st.pending_payment":"Pending payment","st.pending_review":"Pending review","st.confirmed":"Confirmed","st.preparing":"Preparing","st.ready_pickup":"Ready for pickup","st.shipped":"Shipped","st.delivered":"Delivered","st.cancelled":"Cancelled","st.refunded":"Refunded","st.returned":"Returned","dl.pickup":"In-store pickup","dl.courier":"Postal shipping","pm.wallet":"Wallet","pm.gateway":"Bank gateway","pm.cod":"Cash on delivery","ps.unpaid":"Unpaid","ps.paid":"Paid","ps.pending":"Pending","ps.refunded":"Refunded","ps.failed":"Failed","ps.cancelled":"Cancelled","tc.order":"Order tracking","tc.return":"Return & refund","tc.product":"Product question","tc.technical":"Technical issue","tc.complaint":"Complaint","tc.partnership":"Partnership & advertising","tc.account":"Account & security","tc.other":"Other","tp.critical":"Critical","tp.high":"High","tp.normal":"Normal","tp.low":"Low","ft.suggestion":"Suggestion","ft.complaint":"Complaint","ft.bug":"Bug report","fs.new":"New","fs.seen":"Seen","fs.in_progress":"In progress","fs.done":"Done","fs.rejected":"Rejected","tk.open":"Open","tk.answered":"Answered","tk.closed":"Closed","feat.wallet":"Wallet","feat.plus":"Plus membership","feat.insurance":"Shipment insurance","feat.tickets":"Ticket system","feat.reviews":"Customer reviews","feat.questions":"Customer questions","feat.ads":"On-site ads","feat.imageSearch":"Image search","feat.barcode":"Barcode & labels","feat.priceCheckDevice":"Price display mode","feat.publicStats":"Public statistics","feat.coupons":"Coupons","feat.consent":"Cookie consent modal (first visit)","feat.liveSupport":"Live chat support","feat.announcements":"Notifications","feat.wishlist":"My list","feat.compare":"Product comparison","feat.recentlyViewed":"Recently viewed","feat.guestCheckout":"Guest checkout","feat.priceAlerts":"Restock alerts","feat.twoFactor":"Two-factor login","feat.referrals":"Referral codes","feat.voiceSearch":"Voice search","feat.offlineMode":"Offline mode","feat.captcha":"Captcha (I'm not a robot)","captcha.required":"Prove you are human first: tick the box and solve the math.","captcha.label":"I'm not a robot","captcha.hint":"Tick it, then solve the tiny math image","captcha.placeholder":"Answer","captcha.solved":"Human verified \u2714","captcha.refresh":"New challenge","perm.dashboard.view":"View dashboard","perm.products.view":"View products","perm.products.create":"Create product","perm.products.edit":"Edit product","perm.products.delete":"Delete product","perm.products.price":"Change price & discount","perm.products.stock":"Change stock","perm.categories.manage":"Manage categories & brands","perm.orders.view":"View orders","perm.orders.manage":"Change order status","perm.refunds.manage":"Refunds & cancellation","perm.reviews.moderate":"Moderate reviews","perm.reviews.reply":"Reply to reviews","perm.tickets.manage":"Manage tickets","perm.feedback.manage":"Feedback & bugs","perm.users.view":"View users","perm.users.manage":"Manage users","perm.users.permissions":"Assign permissions","perm.wallet.manage":"Wallet management","perm.plus.manage":"Plus membership","perm.coupons.manage":"Coupons","perm.ads.manage":"Manage ads","perm.notifications.send":"Send notifications","perm.settings.edit":"Store settings","perm.theme.edit":"Theme & layout","perm.pages.edit":"Edit page content","perm.barcode.print":"Print labels","perm.barcode.scan":"Scan & price display","perm.imagesearch.index":"Image index","perm.audit.view":"Audit log","perm.stats.view":"Statistics","perm.data.export":"Export data","misc.quickView":"Quick view","misc.addToHome":"Add to home screen","misc.installHint":'In your browser menu, choose "Add to Home screen" or "Install".',"misc.printBlocked":"The print dialog did not open; please allow pop-ups.","misc.saved":"Saved","misc.deleted":"Deleted","misc.updated":"Updated","misc.confirmDelete":"Delete this item?","misc.loadingMore":"Loading\u2026","misc.recentlyViewed":"Recently viewed","misc.uiSound":"UI click sound","misc.uiSoundOn":"Click sound on","misc.uiSoundOff":"Click sound off","misc.shareDone":"Link copied","misc.shareNative":"Share","img.alt":"Product image","adm.view":"View","adm.support":"Support chat","adm.supSelect":"Select a conversation","adm.supSelectHint":"Pick a thread from the list to reply.","adm.tkReply":"Support reply","adm.tkManage":"Ticket management","common.updated":"Updated","common.link":"Link","common.text":"Text","cart.coupon":"Coupon code","misc.sent":"Sent","misc.copied":"Copied","adm.revPending":"Pending","adm.revApproved":"Approved","adm.revRejected":"Rejected","adm.revApprove":"Approve","adm.revReject":"Reject","adm.revReply":"Shop reply","adm.revEmpty":"Nothing in this state","adm.revEmptyHint":"No new reviews or questions to moderate.","rev.buyer":"Buyer","rev.visitor":"Visitor","rev.shopReply":"Shop reply","fb.new":"New","fb.seen":"Seen","fb.inProgress":"In progress","fb.done":"Done","fb.rejected":"Rejected","feedback.suggestion":"Suggestion","feedback.complaint":"Complaint","feedback.bug":"Bug report","adm.fbEmptyHint":"No suggestions, complaints or bug reports yet.","adm.cpNew":"New coupon","adm.cpPercent":"Percent","adm.cpAmount":"Fixed amount","adm.cpValue":"Value","adm.cpUsage":"Usage","adm.cpDates":"Validity","adm.cpStart":"Starts","adm.cpEnd":"Ends","adm.cpExpired":"Expired","adm.adNew":"New banner","adm.adSlot":"Placement slot","adm.adsHint":"Schedule, enable or disable banners anywhere on the site.","adm.notifNew":"New notification","adm.notifHint":"Send a notification to everyone or to one user.","adm.notifLevel":"Level","adm.notifRecent":"Recent notifications","notif.level.info":"Info","notif.level.success":"Success","notif.level.warning":"Warning","notif.level.error":"Error","adm.pagesPick":"Pick a page","adm.pagesPickHint":"Choose a page from the list to edit its content.","adm.pgHint":"Changes are text-only and apply immediately.","adm.bPrinter":"Label printer","adm.bPrinterHint":"Labels go to the printer through the browser print dialog.","adm.bScanner":"Barcode scanner","adm.bLabels":"Build & print labels","adm.bPreview":"Label preview","adm.bPriceMode":"Price display mode","adm.bFound":"Product found","adm.bNotFound":"No product with this barcode.","adm.bPickFirst":"Select at least one product first.","adm.ixHint":"Image fingerprints are computed in the browser so visual search works.","adm.ixIndex":"Index remaining images","adm.ixReindex":"Re-index all","adm.ixDone":"Indexing done","adm.audActor":"Actor","adm.audAction":"Action","adm.audTarget":"Target","adm.audMeta":"Details","adm.stOrders":"Orders","adm.stRevenue":"Revenue","adm.stVisits":"Visits","adm.stUsers":"Users","adm.stProducts":"Products","adm.stAvg":"Average order","adm.stByCat":"Category performance","adm.stByBrand":"Top brands","adm.data":"Data","adm.dataHint":"Export, back up and clean up data.","adm.dExport":"Export","adm.dBackup":"Backup","adm.dBackupHint":"A full copy of the database is saved in the data folder.","adm.dCleanup":"Cleanup","adm.dCleanupHint":"Audit entries older than 90 days and expired sessions are removed.","sys.turnOn":"Turn the store on","sys.turnOff":"Turn the store off","sys.offConfirm":"Are you sure? Nobody can buy until you turn it back on.","sys.autoWakeMins":"Auto turn-on after minutes (0 = never)","sys.asleep":"The store is now off.","sys.asleepTimed":"The store is off; it turns back on automatically in {n} minutes.","sys.awake":"The store is on.","sys.sleepBanner":"The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.","sys.keepAlive":"Keep the service warm","checkout.guestInfo":"Guest contact details","checkout.guestHint":"You can buy without an account; we only need this to coordinate delivery.","checkout.guestName":"Full name","checkout.guestPhone":"Mobile number","checkout.guestPhoneHint":"e.g. 09123456789","checkout.guestNameRequired":"Please enter your name.","checkout.guestPhoneInvalid":"Mobile number must be 11 digits starting with 09.","checkout.guestCodPickup":"Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.","home.recent":"Continue where you left off","home.recentSub":"Products you viewed recently","checkout.guestCourierNote":"Sign in for courier delivery"},Ic={fa:Ka,en:So},Xe="fa",Gs=new Set;$t=()=>Xe,q=()=>Xe==="fa";Rc=()=>[...Gs],Bc=()=>({fa:Object.keys(Ka).length,en:Object.keys(So).length})});var ts={};X(ts,{applyDyn:()=>N,byId:()=>Oc,catIcon:()=>xe,copyText:()=>Zs,countdown:()=>Vc,debounce:()=>ta,el:()=>Jt,esc:()=>h,faDigits:()=>oe,fileToDataURL:()=>Ie,fmtDate:()=>O,fmtDay:()=>Wc,fmtMoney:()=>A,fmtMoneyPlain:()=>_c,fmtNum:()=>g,fmtTel:()=>at,html:()=>r,icon:()=>c,latinDigits:()=>zc,linkify:()=>Xs,locale:()=>Uc,pct:()=>Yc,qs:()=>I,qsa:()=>Fc,raw:()=>ct,safeHref:()=>Dt,scrollTop:()=>Kc,setLocale:()=>Js,stars:()=>Ht,throttle:()=>Gc,timeAgo:()=>St});function Za(t){return Qa+Xa(String(t!=null?t:""))+Ja}function h(t){if(t==null||t===!1)return Za("");if(typeof t=="object"&&t!==null&&t[Eo]!==void 0)return t[Eo];let a=String(t);return a.includes(Qa)||a.includes(Ja)?Xa(a):Za(a.replace(/[&<>"'`]/g,s=>Hc[s]))}function r(t,...a){let s=t[0];for(let n=0;n<a.length;n++){let o=a[n];Array.isArray(o)?s+=o.map(i=>h(i)).join(""):s+=h(o),s+=t[n+1]}return Za(s)}function Jt(t,a={},s=[]){let n=document.createElement(t);for(let[o,i]of Object.entries(a))i==null||i===!1||(o==="class"?n.className=i:o==="text"?n.textContent=i:o.startsWith("on")&&typeof i=="function"?n.addEventListener(o.slice(2).toLowerCase(),i):o==="style"&&typeof i=="object"?Object.assign(n.style,i):n.setAttribute(o,i));for(let o of[].concat(s))o==null||o===!1||n.appendChild(typeof o=="string"?document.createTextNode(o):o);return n}function c(t,a=""){return ct(`<svg class="ic ${a}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${t}"/></svg>`)}function oe(t){return String(t).replace(/[0-9]/g,a=>Qs[+a])}function zc(t){return String(t).replace(/[۰-۹]/g,a=>Qs.indexOf(a)).replace(/[٠-٩]/g,a=>"\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(a))}function Js(t){At=t==="en"?"en":"fa"}function g(t){let a=Number(t)||0;return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(a)}function Dt(t){let a=String(t||"").trim();return/^https?:\/\//i.test(a)?a:""}function at(t){let a=String(t!=null?t:"").trim();if(!a)return"";let s=/^(0\d{2})(\d{4})(\d{4})$/.test(a)?a.replace(/^(0\d{2})(\d{4})(\d{4})$/,"$1-$2-$3"):/^(09\d{2})(\d{3})(\d{4})$/.test(a)?a.replace(/^(09\d{2})(\d{3})(\d{4})$/,"$1 $2 $3"):a;return At==="fa"?s.replace(/\d/g,n=>Qs[+n]):s}function A(t,{withUnit:a=!0}={}){let s=Math.round(Number(t)||0),n=new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(s);return a?ct(`${n} <span class="pc-cur">${At==="fa"?"\u062A\u0648\u0645\u0627\u0646":"Toman"}</span>`):n}function _c(t){return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(Math.round(Number(t)||0))}function O(t,{time:a=!0,short:s=!1}={}){if(!t)return"\u2014";let n=new Date(t);if(Number.isNaN(n.getTime()))return"\u2014";try{let o={calendar:At==="fa"?"persian":"gregory"};if(s)return n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",mt({year:"numeric",month:"short",day:"numeric"},o));let i=n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",mt({year:"numeric",month:"long",day:"numeric"},o));if(!a)return i;let l=n.toLocaleTimeString(At==="fa"?"fa-IR":"en-GB",{hour:"2-digit",minute:"2-digit"});return`${i} \xB7 ${l}`}catch(o){return n.toISOString().slice(0,16).replace("T"," ")}}function Wc(t){let a=new Date(t);if(Number.isNaN(a.getTime()))return"\u2014";try{return a.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"short",day:"numeric",calendar:At==="fa"?"persian":"gregory"})}catch(s){return t.slice(0,10)}}function St(t){let a=new Date(t).getTime();if(Number.isNaN(a))return"\u2014";let s=Math.max(1,Math.floor((Date.now()-a)/1e3)),n=(o,i)=>{try{return new Intl.RelativeTimeFormat(At==="fa"?"fa":"en",{numeric:"auto"}).format(-o,i)}catch(l){return`${o} ${i}`}};return s<60?n(s,"second"):s<3600?n(Math.floor(s/60),"minute"):s<86400?n(Math.floor(s/3600),"hour"):s<2592e3?n(Math.floor(s/86400),"day"):s<31536e3?n(Math.floor(s/2592e3),"month"):n(Math.floor(s/31536e3),"year")}function Vc(t){let a=new Date(t).getTime()-Date.now();if(Number.isNaN(a))return"";if(a<=0)return At==="fa"?"\u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A":"Expired";let s=Math.floor(a/864e5),n=Math.floor(a%864e5/36e5),o=Math.floor(a%36e5/6e4),i=Math.floor(a%6e4/1e3);if(s>0)return At==="fa"?`${oe(s)} \u0631\u0648\u0632 \u0648 ${oe(n)} \u0633\u0627\u0639\u062A`:`${s}d ${n}h`;let l=d=>String(d).padStart(2,"0"),p=`${l(n)}:${l(o)}:${l(i)}`;return At==="fa"?oe(p):p}function Ht(t,a=""){let s=Math.round(Number(t)||0),n='<span class="pc-stars">';for(let o=1;o<=5;o++)n+=`<svg class="ic ${o<=s?"":"off"} ${a}" aria-hidden="true"><use href="#i-star"/></svg>`;return ct(n+"</span>")}function Yc(t){return`${g(Math.round(Number(t)||0))}\u066A`}function Xs(t){let a=h(t);return ct(a.replace(/(https?:\/\/[^\s<]+)/g,s=>`<a href="${s}" target="_blank" rel="noopener noreferrer nofollow">${s}</a>`))}function ta(t,a=260){let s;return(...n)=>{clearTimeout(s),s=setTimeout(()=>t(...n),a)}}function Gc(t,a=200){let s=0,n=null;return(...o)=>{let i=Date.now(),l=a-(i-s);l<=0?(s=i,t(...o)):(clearTimeout(n),n=setTimeout(()=>{s=Date.now(),t(...o)},l))}}function Ie(t){return new Promise((a,s)=>{let n=new FileReader;n.onload=()=>a(String(n.result)),n.onerror=()=>s(new Error("read-failed")),n.readAsDataURL(t)})}function Zs(t){var a;return(a=navigator.clipboard)!=null&&a.writeText?navigator.clipboard.writeText(t):new Promise((s,n)=>{try{let o=document.createElement("textarea");o.value=t,o.setAttribute("readonly",""),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),s()}catch(o){n(o)}})}function N(t=document){t.querySelectorAll("[data-w]").forEach(a=>{a.style.width=a.dataset.w}),t.querySelectorAll("[data-h]").forEach(a=>{a.style.height=a.dataset.h}),t.querySelectorAll("[data-maxw]").forEach(a=>{a.style.maxWidth=a.dataset.maxw})}function Kc(t=!0){window.scrollTo({top:0,behavior:t?"smooth":"auto"})}var Eo,Qa,Ja,Xa,ct,Hc,I,Fc,Oc,jc,xe,Qs,At,Uc,z=W(()=>{Eo=Symbol("raw"),Qa="",Ja="",Xa=t=>t.replace(/[\u0001\u0002]/g,"");try{if(typeof Element!="undefined"){let t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");t&&t.set&&t.configurable!==!1&&Object.defineProperty(Element.prototype,"innerHTML",{configurable:!0,enumerable:t.enumerable,get(){return t.get.call(this)},set(s){t.set.call(this,typeof s=="string"&&(s.includes(Qa)||s.includes(Ja))?Xa(s):s)}});let a=Element.prototype.insertAdjacentHTML;a&&(Element.prototype.insertAdjacentHTML=function(s,n){return a.call(this,s,typeof n=="string"&&(n.includes(Qa)||n.includes(Ja))?Xa(n):n)})}}catch(t){}ct=t=>Za(t),Hc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};I=(t,a=document)=>a.querySelector(t),Fc=(t,a=document)=>[...a.querySelectorAll(t)],Oc=t=>document.getElementById(t);jc={cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box",watch:"watch",phone:"phone",chip:"chip",solder:"solder",tools:"wrench",fan:"fan",tv:"tv",keyboard:"keyboard",measure:"chart",network:"globe",parts:"chip"},xe=t=>jc[t]||"box",Qs=["\u06F0","\u06F1","\u06F2","\u06F3","\u06F4","\u06F5","\u06F6","\u06F7","\u06F8","\u06F9"];At="fa";Uc=()=>At});var qa={};X(qa,{BUILD:()=>tn,CONSENT_TTL_DAYS:()=>Do,CONSENT_VERSION:()=>gn,S:()=>m,adInSlot:()=>le,addSearch:()=>hn,addToCart:()=>ss,applyCoupon:()=>ns,applyPrefs:()=>Ce,boot:()=>sn,brandById:()=>Qc,brandName:()=>Yt,can:()=>Q,cartCount:()=>Zc,catById:()=>Ee,catName:()=>Et,clearCart:()=>rn,clearSearches:()=>ti,connectEvents:()=>vn,deleteNotification:()=>un,emit:()=>st,feat:()=>B,getImgIndex:()=>ei,hasAlert:()=>rs,hasConsent:()=>fn,inCompare:()=>mn,inWishlist:()=>os,isAdmin:()=>Jc,isPlus:()=>Zt,loadCart:()=>Mt,loadNotifications:()=>ye,loadPrefs:()=>Ao,markNotificationsRead:()=>cs,mergeGuestData:()=>pn,on:()=>Ft,ordersCfg:()=>an,plusCfg:()=>xa,prodName:()=>ft,promptInstall:()=>Ea,pushRecent:()=>bn,refreshBootstrap:()=>Ot,refreshMe:()=>te,removeFromCart:()=>on,setConsent:()=>is,setImgIndex:()=>ai,setPref:()=>Te,setQty:()=>nn,settings:()=>en,ship:()=>ve,store:()=>Xt,themeCfg:()=>Co,toggleAlert:()=>dn,toggleCompare:()=>ln,toggleWishlist:()=>cn,ui:()=>re,watchInstall:()=>$n,watchNetwork:()=>yn});function Ft(t,a){return ka.has(t)||ka.set(t,new Set),ka.get(t).add(a),()=>{var s;return(s=ka.get(t))==null?void 0:s.delete(a)}}function st(t,a){for(let s of ka.get(t)||[])try{s(a)}catch(n){console.error("[state]",t,n)}}function fe(t,a){try{let s=localStorage.getItem(t);return s?JSON.parse(s):a}catch(s){return a}}function qe(t,a){try{localStorage.setItem(t,JSON.stringify(a))}catch(s){}}function Ao(){var a;let t=fe(Pt.prefs,{});if(m.prefs=mt(mt({},m.prefs),t),(a=m.me)!=null&&a.prefs){let s=m.me.prefs;s.theme&&(m.prefs.theme=s.theme),s.locale&&(m.prefs.locale=s.locale),s.density&&s.density!=="normal"&&(m.prefs.density=s.density),s.reduceMotion!==void 0&&(m.prefs.reduceMotion=!!s.reduceMotion),s.uiSound!==void 0&&(m.prefs.uiSound=!!s.uiSound)}return m.prefs}function Te(t,a,{sync:s=!0}={}){if(m.prefs[t]=a,qe(Pt.prefs,m.prefs),Ce(),st("prefs",{key:t,value:a}),s&&m.me&&["theme","locale","density","reduceMotion","uiSound"].includes(t)){let n={theme:m.prefs.theme,locale:m.prefs.locale,density:m.prefs.density,reduceMotion:m.prefs.reduceMotion,uiSound:!!m.prefs.uiSound};f.patch("/api/me",{prefs:n}).then(o=>{o!=null&&o.me&&(m.me=o.me,st("me",m.me))}).catch(()=>{})}}function Ce(){var H,F,ot,R,P,tt;let t=document.documentElement,a=Co(),s=m.prefs,n=s.locale||"fa";Ks(n),Js(n),t.setAttribute("data-lang",n);let o=s.theme||a.mode||"dark";o==="auto"&&(o=(H=window.matchMedia)!=null&&H.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"),t.setAttribute("data-mode",o),t.setAttribute("data-theme",a.theme||"default"),t.setAttribute("color-scheme",o),t.setAttribute("data-port",a.portTheme===!1?"off":"on"),t.setAttribute("data-bg",a.bgStyle||"waves"),t.setAttribute("data-variant",a.variant==="classic"?"classic":"fresh");let i=Math.max(0,Math.min(28,Number((F=a.radius)!=null?F:16)));t.style.setProperty("--radius",`${i}px`),t.style.setProperty("--radius-sm",`${Math.max(4,Math.round(i*.68))}px`),t.style.setProperty("--radius-lg",`${Math.round(i*1.5)}px`);let l=s.density==="compact"||s.density==="comfy"?s.density:a.density||"normal";t.setAttribute("data-density",l),t.setAttribute("data-contrast",a.contrast==="high"?"high":"normal");let p=s.reduceMotion===!0||a.animations===!1;t.setAttribute("data-motion",p?"off":"on");let d=/^#[0-9a-f]{6}$/i.test(String(a.accent||"").trim())?a.accent.trim():"#f59e0b",[b,u,v]=Xc(d).split(",").map(kt=>parseInt(kt,10));t.style.setProperty("--accent",d),t.style.setProperty("--accent-rgb",`${b}, ${u}, ${v}`),t.style.setProperty("--accent-2",qo(d,-34)),t.style.setProperty("--accent-3",qo(d,52)),t.style.setProperty("--accent-soft",`rgba(${b}, ${u}, ${v}, .14)`);let $=re();t.setAttribute("data-nav",$.navStyle==="underline"?"underline":"pills"),t.setAttribute("data-cards",$.cardStyle==="list"?"list":"grid"),t.style.setProperty("--cols-m",String(es((ot=$.columns)==null?void 0:ot.mobile,2,1,3))),t.style.setProperty("--cols-t",String(es((R=$.columns)==null?void 0:R.tablet,3,2,4))),t.style.setProperty("--cols-d",String(es((P=$.columns)==null?void 0:P.desktop,4,3,6))),t.style.setProperty("--cols-w",String(es((tt=$.columns)==null?void 0:tt.wide,5,3,7))),t.style.setProperty("--ticker-dur",`${Math.max(8,Number($.tickerSpeed)||30)}s`);let w=document.getElementById("headerGrid");w&&(w.setAttribute("data-search-position",["start","center","end"].includes($.searchPosition)?$.searchPosition:"center"),w.setAttribute("data-header-layout",["logoStart","split","centered"].includes($.headerLayout)?$.headerLayout:"split"));let k=document.getElementById("siteHeader");k&&k.setAttribute("data-sticky",$.stickyHeader===!1?"off":"on");let C=document.getElementById("topbar");C&&(C.hidden=$.showTicker===!1&&!m.ticker.length),st("theme",{mode:o,loc:n}),setTimeout(()=>{let kt=document.querySelector('meta[name="theme-color"]');if(kt){let gt=getComputedStyle(t).getPropertyValue("--bg").trim();gt&&kt.setAttribute("content",gt)}},50)}function es(t,a,s,n){let o=Number(t);return Number.isFinite(o)?Math.max(s,Math.min(n,Math.round(o))):a}function Xc(t){let a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());return a?`${parseInt(a[1],16)}, ${parseInt(a[2],16)}, ${parseInt(a[3],16)}`:"49, 175, 212"}function qo(t,a){let s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());if(!s)return t;let n=o=>Math.max(0,Math.min(255,o+a)).toString(16).padStart(2,"0");return`#${n(parseInt(s[1],16))}${n(parseInt(s[2],16))}${n(parseInt(s[3],16))}`}async function sn(){var s;m.recent=fe(Pt.recent,[]),m.searches=fe(Pt.search,[]),m.consent=fe(Pt.consent,null),m.wishlist=fe(Pt.wish,[]),m.compare=fe(Pt.cmp,[]),m.installed=((s=window.matchMedia)==null?void 0:s.call(window,"(display-mode: standalone)").matches)||typeof navigator!="undefined"&&navigator.standalone===!0;let t=null,a=Date.now();for(let n=0;n<10&&!t;n++){n&&await new Promise(o=>setTimeout(o,5e3));try{t=await f.get("/api/bootstrap")}catch(o){console.warn("[state] bootstrap failed",o)}!t&&Date.now()-a>6e3&&st("boot-slow")}return t&&(m.serverTime=t.serverTime,m.sleeping=!!t.sleeping,m.sleepSince=t.sleepSince||null,m.settings=t.settings||{},m.categories=t.categories||[],m.brands=t.brands||[],m.me=t.me||null,m.stats=t.stats||null,m.ads=t.ads||[],m.ticker=t.ticker||[],m.orderStatuses=t.orderStatuses||[],m.ticketCategories=t.ticketCategories||[],m.ticketPriorities=t.ticketPriorities||[]),t||st("boot-failed"),Ao(),Ce(),m.me&&(m.wishlist=m.me.wishlist||[],m.compare=m.me.compare||[],m.alerts=m.me.alerts||[],m.unread=m.me.unreadNotifications||0),await Promise.all([Mt().catch(()=>{}),m.me?ye(!0).catch(()=>{}):Promise.resolve()]),m.ready=!0,vn(),st("ready",m),m}async function Ot({silent:t=!1}={}){try{let a=await f.get("/api/bootstrap");return m.settings=a.settings||m.settings,m.sleeping=!!a.sleeping,m.sleepSince=a.sleepSince||null,m.categories=a.categories||m.categories,m.brands=a.brands||m.brands,m.stats=a.stats||null,m.ads=a.ads||[],m.ticker=a.ticker||[],a.me!==void 0&&(m.me=a.me||null,st("me",m.me)),Ce(),st("settings",m.settings),m}catch(a){if(!t)throw a;return m}}async function te(){if(!m.me)return null;try{let t=await f.get("/api/me");return m.me=t.me||null,m.me&&(m.wishlist=m.me.wishlist||[],m.compare=m.me.compare||[],m.alerts=m.me.alerts||[],m.unread=m.me.unreadNotifications||0),st("me",m.me),m.me}catch(t){return m.me}}async function Mt(){var t,a;try{let s=await f.get("/api/cart");m.cart=s.cart||m.cart,((t=s.quote)==null?void 0:t.freeOver)!==void 0&&(m.freeOver=s.quote.freeOver),((a=s.quote)==null?void 0:a.plus)!==void 0&&(m.cartPlus=s.quote.plus)}catch(s){m.cart={items:[],count:0,subtotal:0,weight:0,coupon:null}}return st("cart",m.cart),m.cart}async function ss(t,a=1){let s=await f.post("/api/cart/add",{productId:t,qty:a});return m.cart=s.cart,st("cart",m.cart),s}async function nn(t,a){let s=await f.patch("/api/cart/item",{productId:t,qty:a});return m.cart=s.cart,st("cart",m.cart),s}async function on(t){let a=await f.del(`/api/cart/item/${encodeURIComponent(t)}`);return m.cart=a.cart,st("cart",m.cart),a}async function rn(){let t=await f.post("/api/cart/clear");return m.cart=t.cart||{items:[],count:0,subtotal:0,weight:0,coupon:null},st("cart",m.cart),t}async function ns(t){let a=await f.post("/api/cart/coupon",{code:t});return m.cart=a.cart,st("cart",m.cart),a}async function Sa(t,a){let s=await f.post(`/api/me/${t}/${encodeURIComponent(a)}`);return t==="wishlist"&&(m.wishlist=s.wishlist||m.wishlist),t==="compare"&&(m.compare=s.compare||m.compare),t==="alerts"&&(m.alerts=s.alerts||m.alerts),s}async function cn(t){if(!m.me){let s=m.wishlist.indexOf(t);return s>=0?m.wishlist.splice(s,1):m.wishlist.push(t),qe(Pt.wish,m.wishlist),st("wishlist",m.wishlist),{in:m.wishlist.includes(t)}}let a=await Sa("wishlist",t);return st("wishlist",m.wishlist),a}async function ln(t){if(!m.me){let s=m.compare.indexOf(t);return s>=0?m.compare.splice(s,1):(m.compare.length>=4&&m.compare.shift(),m.compare.push(t)),qe(Pt.cmp,m.compare),st("compare",m.compare),{in:m.compare.includes(t)}}let a=await Sa("compare",t);return st("compare",m.compare),a}async function dn(t){if(!m.me)throw new Error("login_required");let a=await Sa("alerts",t);return st("alerts",m.alerts),a}async function pn(){if(!m.me)return;let t=fe(Pt.wish,[]),a=fe(Pt.cmp,[]),s=[];for(let n of t)m.wishlist.includes(n)||s.push(Sa("wishlist",n).catch(()=>{}));for(let n of a)!m.compare.includes(n)&&m.compare.length<4&&s.push(Sa("compare",n).catch(()=>{}));await Promise.all(s),st("wishlist",m.wishlist),st("compare",m.compare)}async function ye(t=!1){if(!m.me)return m.notifications=[],m.unread=0,[];try{let a=await f.get("/api/me/notifications");m.notifications=a.items||[],m.unread=m.notifications.filter(s=>!s.read).length,m.me&&(m.me.unreadNotifications=m.unread),st("notifications",m.notifications)}catch(a){if(!t)throw a}return m.notifications}async function cs(t,a=!1){let s=await f.post("/api/me/notifications/read",{ids:t||[],all:a});return await ye(!0),s}async function un(t){await f.del(`/api/me/notifications/${encodeURIComponent(t)}`),await ye(!0)}function bn(t){B("recentlyViewed")&&(m.recent=[t,...m.recent.filter(a=>a!==t)].slice(0,12),qe(Pt.recent,m.recent),st("recent",m.recent))}function hn(t){let a=String(t||"").trim();a&&(m.searches=[a,...m.searches.filter(s=>s!==a)].slice(0,8),qe(Pt.search,m.searches))}function ti(){m.searches=[],qe(Pt.search,[])}function is(t){m.consent=zt(mt({},t),{v:gn,at:new Date().toISOString()}),qe(Pt.consent,m.consent),m.me&&f.patch("/api/me",{consent:!0}).catch(()=>{}),st("consent",m.consent)}function vn(){if(ie)try{ie.close()}catch(t){}if(typeof EventSource!="undefined"){try{ie=new EventSource("/api/events",{withCredentials:!0})}catch(t){return}ie.addEventListener("ready",()=>{m.online=!0}),ie.addEventListener("support",t=>{st("sse:support",as(t.data))}),ie.addEventListener("ticket",t=>{st("sse:ticket",as(t.data)),st("notif",as(t.data))}),ie.addEventListener("notif",t=>{st("sse:notif",as(t.data)),ye(!0)}),ie.addEventListener("settings",()=>Ot({silent:!0})),ie.onerror=()=>{try{ie.close()}catch(t){}clearTimeout(To),To=setTimeout(vn,8e3)}}}function as(t){try{return JSON.parse(t)}catch(a){return null}}function yn(){window.addEventListener("online",()=>{m.online=!0,st("online",!0),Mt().catch(()=>{})}),window.addEventListener("offline",()=>{m.online=!1,st("online",!1)})}function $n(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),m.installPrompt=t,st("install",t)}),window.addEventListener("appinstalled",()=>{m.installed=!0,m.installPrompt=null,st("installed")})}async function Ea(){if(!m.installPrompt)return!1;m.installPrompt.prompt();let t=await m.installPrompt.userChoice;return m.installPrompt=null,(t==null?void 0:t.outcome)==="accepted"}function ei(){return fe(Pt.imgIdx,null)}function ai(t){qe(Pt.imgIdx,t)}var Pt,m,ka,tn,en,Xt,re,Co,B,ve,xa,an,Ee,Qc,Zt,Jc,Q,Et,Yt,ft,le,Zc,os,mn,rs,gn,Do,fn,ie,To,K=W(()=>{Z();G();z();Pt={prefs:"bm_prefs_v1",cart:"bm_cart_local_v1",wish:"bm_wish_v1",cmp:"bm_cmp_v1",recent:"bm_recent_v1",search:"bm_search_v1",consent:"bm_consent_v1",imgIdx:"bm_img_index_v1"},m={ready:!1,serverTime:null,sleeping:!1,sleepSince:null,settings:null,categories:[],brands:[],me:null,stats:null,ads:[],ticker:[],orderStatuses:[],ticketCategories:[],ticketPriorities:[],cart:{items:[],count:0,subtotal:0,weight:0,coupon:null},wishlist:[],compare:[],alerts:[],notifications:[],unread:0,recent:[],searches:[],prefs:{theme:"dark",locale:"fa",density:"normal",reduceMotion:!1,view:"grid"},consent:null,online:typeof navigator!="undefined"?navigator.onLine:!0,installPrompt:null,installed:!1},ka=new Map;tn="ys-v8",en=()=>m.settings||{},Xt=()=>{var t;return((t=m.settings)==null?void 0:t.store)||{}},re=()=>{var t;return((t=m.settings)==null?void 0:t.ui)||{}},Co=()=>{var t;return((t=m.settings)==null?void 0:t.theme)||{}},B=t=>{var a,s;return((s=(a=m.settings)==null?void 0:a.features)==null?void 0:s[t])!==!1},ve=()=>{var t;return((t=m.settings)==null?void 0:t.shipping)||{}},xa=()=>{var t;return((t=m.settings)==null?void 0:t.plus)||{}},an=()=>{var t;return((t=m.settings)==null?void 0:t.orders)||{}},Ee=t=>m.categories.find(a=>a.id===t)||null,Qc=t=>m.brands.find(a=>a.id===t)||null,Zt=()=>{var t,a,s,n;return!!((a=(t=m.me)==null?void 0:t.plus)!=null&&a.active&&((n=(s=m.me)==null?void 0:s.plus)!=null&&n.until)&&new Date(m.me.plus.until)>new Date)},Jc=()=>{var t;return!!((t=m.me)!=null&&t.isAdmin)},Q=t=>{var a;return m.me?m.me.role==="owner"?!0:((a=m.me.permissions)==null?void 0:a[t])===!0:!1},Et=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",Yt=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",ft=t=>$t()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",le=t=>B("ads")?m.ads.filter(a=>a.slot===t&&a.active!==!1):[];Zc=()=>{var t;return((t=m.cart)==null?void 0:t.count)||0};os=t=>m.wishlist.includes(t),mn=t=>m.compare.includes(t),rs=t=>m.alerts.includes(t);gn=2,Do=180,fn=()=>{let t=m.consent;if(!(t!=null&&t.at)||(t.v||1)!==gn)return!1;let a=Date.now()-Date.parse(t.at);return Number.isFinite(a)&&a>=0&&a<Do*864e5};ie=null,To=null});var ms={};X(ms,{adaptive:()=>mi,clearInvalid:()=>ls,confirmDelete:()=>Gt,confirmDialog:()=>wt,copyWithToast:()=>vi,drawer:()=>wn,emptyState:()=>L,errorState:()=>U,fillSelect:()=>fi,installHintModal:()=>Fe,lightbox:()=>He,listSkeleton:()=>ui,loadingBar:()=>Da,markInvalid:()=>gi,modal:()=>pt,notice:()=>Aa,productSkeleton:()=>pi,promptDialog:()=>de,readForm:()=>hi,sheet:()=>Ta,spinner:()=>Ca,tableSkeleton:()=>bi,toast:()=>it,toastApiError:()=>S,toastError:()=>V,toastSuccess:()=>E,toastWarn:()=>di,uiClickSound:()=>ds,uiSoundEnabled:()=>En,updateSleepScreen:()=>xn,wireAccordions:()=>kn,wireTabs:()=>Sn,withBusy:()=>D});function it(t,{type:a="info",title:s="",timeout:n=3800,action:o=null}={}){let i=oi();if(!i)return null;let l=`t${++li}`,p=ci[a]||"info",d=Jt("div",{class:`toast ${p}`,id:l,role:a==="error"?"alert":"status"});for(d.innerHTML=r`
    ${c(ii[a]||"info")}
    <div class="grow">
      ${s?r`<div class="toast-t">${s}</div>`:""}
      <div class="${s?"toast-d":"toast-t"}">${t}</div>
    </div>
    ${o?r`<button type="button" class="toast-act" data-tid="${l}">${o.label}</button>`:""}
    <button type="button" class="toast-x" aria-label="${e("common.close")}" data-close="${l}">${c("close")}</button>`,i.appendChild(d);i.children.length>4;)i.firstElementChild.remove();let b=()=>{d.isConnected&&(d.classList.add("out"),setTimeout(()=>d.remove(),220))},u=n>0?setTimeout(b,n):null;return d.addEventListener("click",v=>{if(v.target.closest("[data-close]")){clearTimeout(u),b();return}if(o&&v.target.closest("[data-tid]")){clearTimeout(u),b();try{o.onClick()}catch($){console.error($)}}}),{close:()=>{clearTimeout(u),b()}}}function S(t,a="err.generic"){let s=t instanceof ne?$t()==="en"&&t.details||t.message:Ys(t);V(s||e(a))}function Po(t){t?(document.body.classList.add("locked"),document.documentElement.classList.add("locked")):Re.length||(document.body.classList.remove("locked"),document.documentElement.classList.remove("locked"))}function Be(t){var kt;let{kind:a="modal",title:s="",subtitle:n="",size:o="md",body:i="",footer:l="",onMount:p=null,onClose:d=null,closeBtn:b=!0,dismissible:u=!0}=t,v=a==="modal"?si():ni();if(!v)return{close:()=>{}};let $=document.activeElement,w=window.innerWidth<760,k=a==="drawer"&&w?"sheet":a,C=Jt("div",{class:`overlay${k==="drawer"?" overlay-drawer":""}${k==="sheet"?" overlay-sheet":""}`}),H=k==="modal"?`modal ${(kt=ri[o])!=null?kt:""}`.trim():k,F=Jt("div",{class:H,role:"dialog","aria-modal":"true"});s&&F.setAttribute("aria-label",s);let ot=k==="modal"?"modal-h":"drawer-h",R=k==="modal"?"modal-b":"drawer-b";F.innerHTML=r`
    ${s?r`<header class="${ot}">
      <div class="grow"><h3>${s}</h3>${n?r`<p class="small muted">${n}</p>`:""}</div>
      ${b?r`<button type="button" class="layer-x" data-lx aria-label="${e("common.close")}">${c("close")}</button>`:""}
    </header>`:b?r`<button type="button" class="layer-x" data-lx aria-label="${e("common.close")}">${c("close")}</button>`:""}
    <div class="${R}">${i}</div>
    ${l?r`<footer class="modal-f">${l}</footer>`:""}`,C.appendChild(F),v.appendChild(C),Po(!0);let P=!1,tt={panel:F,overlay:C,result:void 0,dismissible:u,close(gt){if(!P){P=!0,tt.result=gt,C.classList.add("out"),F.classList.add("out"),setTimeout(()=>{var Tt;C.remove();let j=Re.indexOf(tt);j>=0&&Re.splice(j,1),Po(!1);try{(Tt=$==null?void 0:$.focus)==null||Tt.call($,{preventScroll:!0})}catch(se){}},190);try{d==null||d(gt)}catch(j){console.error(j)}}}};Re.push(tt),C.addEventListener("click",gt=>{if(b&&gt.target.closest("[data-lx]")){tt.close(null);return}gt.target===C&&u&&tt.close(null)}),F.addEventListener("keydown",gt=>{if(gt.key!=="Tab")return;let Tt=[...F.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([type=hidden]), select, [tabindex]:not([tabindex="-1"])')].filter(ge=>ge.offsetParent!==null);if(!Tt.length)return;let se=Tt[0],Vt=Tt[Tt.length-1];gt.shiftKey&&document.activeElement===se?(gt.preventDefault(),Vt.focus()):!gt.shiftKey&&document.activeElement===Vt&&(gt.preventDefault(),se.focus())}),setTimeout(()=>{let gt=F.querySelector("[data-autofocus], input:not([type=hidden]), textarea, select");try{gt==null||gt.focus({preventScroll:!0})}catch(j){}},70);try{p==null||p(F,tt)}catch(gt){console.error(gt)}return tt}function wt({title:t="",text:a="",okText:s="",cancelText:n="",danger:o=!1,icon:i="alert"}={}){return new Promise(l=>{let p=!1;Be({kind:"modal",title:t||e("common.warning"),size:"sm",body:r`
        <div class="confirm-body">
          <span class="confirm-ic ${o?"danger":""}">${c(i)}</span>
          <p class="confirm-text">${a}</p>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${n||e("common.cancel")}</button>
        <button type="button" class="btn ${o?"btn-danger":"btn-primary"}" data-yes data-autofocus>${s||e("common.confirm")}</button>`,onClose:()=>l(p),onMount:(d,b)=>{d.querySelector("[data-no]").addEventListener("click",()=>{p=!1,b.close()}),d.querySelector("[data-yes]").addEventListener("click",()=>{p=!0,b.close()})}})})}function de({title:t="",text:a="",label:s="",value:n="",type:o="text",okText:i="",required:l=!1,rows:p=4}={}){return new Promise(d=>{let b=null;Be({kind:"modal",title:t||e("common.note"),size:"sm",body:r`
        <form class="prompt-form" data-pf>
          ${a?r`<p class="confirm-text mb-s">${a}</p>`:""}
          <label class="field">
            <span class="label">${s||t}</span>
            ${o==="textarea"?r`<textarea class="textarea" name="v" rows="${p}" data-autofocus>${n}</textarea>`:r`<input class="input" type="${o}" name="v" value="${n}" data-autofocus>`}
          </label>
        </form>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${e("common.cancel")}</button>
        <button type="button" class="btn btn-primary" data-yes>${i||e("common.confirm")}</button>`,onClose:()=>d(b),onMount:(u,v)=>{let $=u.querySelector("[name=v]"),w=()=>{let k=String($.value||"").trim();if(l&&!k){$.classList.add("invalid"),$.focus();return}b=k,v.close()};u.querySelector("[data-no]").addEventListener("click",()=>{b=null,v.close()}),u.querySelector("[data-yes]").addEventListener("click",w),u.querySelector("[data-pf]").addEventListener("submit",k=>{k.preventDefault(),w()}),$.addEventListener("keydown",k=>{k.key==="Enter"&&o!=="textarea"&&(k.preventDefault(),w())})}})})}function He(t,a=0,s=""){let n=w=>typeof w=="string"?{url:w,kind:"image"}:w,o=(Array.isArray(t)?t:[t]).filter(Boolean).map(n).filter(w=>w.url);if(!o.length)return null;let i=Math.max(0,Math.min(a,o.length-1)),l=null,p=1,d=0,b=0,u=w=>{let k=w==null?void 0:w.querySelector(".lb-img");k&&(k.style.transform=`translate(${d.toFixed(0)}px, ${b.toFixed(0)}px) scale(${p.toFixed(2)})`),w==null||w.classList.toggle("zoomed",p>1.01)},v=()=>{p=1,d=0,b=0},$=()=>{let w=o[i],k=w.kind==="video"?`<video class="lb-img lb-video" src="${w.url}" controls playsinline autoplay preload="metadata"></video>`:`<img class="lb-img" src="${w.url}" alt="${s||e("img.alt")}" decoding="async" draggable="false">`;return r`
    <figure class="lb-figure">
      ${ct(k)}
      <div class="lb-tools" role="toolbar" aria-label="${e("pdp.zoomHint")}">
        <button type="button" class="icon-btn" data-zin aria-label="${e("pdp.zoomIn")}">${c("plus")}</button>
        <button type="button" class="icon-btn" data-zout aria-label="${e("pdp.zoomOut")}">${c("minus")}</button>
        <button type="button" class="icon-btn tiny-txt" data-zreset aria-label="${e("pdp.zoomReset")}">1x</button>
      </div>
      ${o.length>1?r`<figcaption class="lb-count">${i+1} / ${o.length}${w.kind==="video"?` \xB7 ${e("pdp.video")}`:""}</figcaption>`:""}
    </figure>`};return Be({kind:"modal",size:"lg",title:"",body:r`<div data-lb>${$()}</div>`,footer:o.length>1?r`
      <button type="button" class="btn btn-ghost" data-prev>${c("chevron-right")} ${e("common.prev")}</button>
      <button type="button" class="btn btn-ghost" data-next>${e("common.next")} ${c("chevron-left")}</button>`:"",onClose:()=>{l&&document.removeEventListener("keydown",l),l=null},onMount:w=>{var kt,gt;let k=w.querySelector("[data-lb]"),C=()=>k.querySelector(".lb-figure"),H=j=>{i=(i+j+o.length)%o.length,v(),k.innerHTML=$(),tt()};(kt=w.querySelector("[data-prev]"))==null||kt.addEventListener("click",()=>H(-1)),(gt=w.querySelector("[data-next]"))==null||gt.addEventListener("click",()=>H(1));let F=(j,Tt,se)=>{let Vt=Math.max(1,Math.min(4,p*j));Vt===1?(d=0,b=0):Tt!=null&&(d=Tt-(Tt-d)*(Vt/p),b=se-(se-b)*(Vt/p)),p=Vt,u(C())},ot=new Map,R=0,P=1,tt=()=>{var Vt,ge,Ne,Ya,po,uo;let j=C();if(!j)return;let Tt=j.querySelector(".lb-img");(Vt=j.querySelector("[data-zin]"))==null||Vt.addEventListener("click",()=>F(1.5)),(ge=j.querySelector("[data-zout]"))==null||ge.addEventListener("click",()=>F(1/1.5)),(Ne=j.querySelector("[data-zreset]"))==null||Ne.addEventListener("click",()=>{v(),u(j)}),j.addEventListener("wheel",xt=>{if(o[i].kind==="video")return;xt.preventDefault();let Bt=j.getBoundingClientRect();F(xt.deltaY<0?1.18:1/1.18,xt.clientX-Bt.left-Bt.width/2,xt.clientY-Bt.top-Bt.height/2)},{passive:!1}),j.addEventListener("dblclick",xt=>{if(o[i].kind==="video")return;let Bt=j.getBoundingClientRect();p>1.01?v():F(2.5,xt.clientX-Bt.left-Bt.width/2,xt.clientY-Bt.top-Bt.height/2),u(j)}),j.addEventListener("pointerdown",xt=>{var Bt;if(o[i].kind!=="video"){if(ot.set(xt.pointerId,[xt.clientX,xt.clientY]),ot.size===2){let[$a,wa]=[...ot.values()];R=Math.hypot($a[0]-wa[0],$a[1]-wa[1]),P=p}(Bt=j.setPointerCapture)==null||Bt.call(j,xt.pointerId)}}),j.addEventListener("pointermove",xt=>{if(!ot.has(xt.pointerId))return;let Bt=ot.get(xt.pointerId);if(ot.set(xt.pointerId,[xt.clientX,xt.clientY]),ot.size===2&&R){let[$a,wa]=[...ot.values()],Tc=Math.hypot($a[0]-wa[0],$a[1]-wa[1]);p=Math.max(1,Math.min(4,P*(Tc/R))),p===1&&(d=0,b=0),u(j)}else p>1.01&&(d+=xt.clientX-Bt[0],b+=xt.clientY-Bt[1],u(j))});let se=xt=>{ot.delete(xt.pointerId),ot.size<2&&(R=0)};j.addEventListener("pointerup",se),j.addEventListener("pointercancel",se),(Ya=j.querySelector("[data-zin]"))==null||Ya.addEventListener("click",()=>F(1.3)),(po=j.querySelector("[data-zout]"))==null||po.addEventListener("click",()=>F(1/1.3)),(uo=j.querySelector("[data-zreset]"))==null||uo.addEventListener("click",()=>{v(),u(j)}),u(j)};tt(),l=j=>{j.key==="ArrowLeft"?H(1):j.key==="ArrowRight"?H(-1):j.key==="+"||j.key==="="?F(1.3):j.key==="-"?F(1/1.3):j.key==="0"&&(v(),u(C()))},document.addEventListener("keydown",l)}})}function pi(t=8){let a="";for(let s=0;s<t;s++)a+='<div class="sk sk-card"></div>';return ct(`<div class="pgrid">${a}</div>`)}function ui(t=5,a=3){let s="";for(let n=0;n<t;n++){let o="";for(let i=0;i<a;i++)o+=`<div class="sk sk-line w${[70,40,55,80][i%4]}"></div>`;s+=r`<div class="card row-card">${o}</div>`}return s}function bi(t=6,a=4){let s="";for(let n=0;n<t;n++){let o="";for(let i=0;i<a;i++)o+=`<td><div class="sk sk-line w${[80,55,40,70][i%4]}"></div></td>`;s+=`<tr>${o}</tr>`}return ct(`<div class="table-wrap"><table class="table"><tbody>${s}</tbody></table></div>`)}function L({icon:t="box",title:a="",text:s="",action:n=null,act:o=null}={}){return r`
    <div class="empty">
      <span class="empty-ic">${c(t)}</span>
      <h4>${a||e("common.noData")}</h4>
      ${s?r`<p>${s}</p>`:""}
      ${n?r`<a class="btn btn-primary" href="${n.href||"#/"}">${n.label}</a>`:""}
      ${o?r`<button type="button" class="btn btn-primary" data-act="${o.act}" ${o.arg?r`data-arg="${o.arg}"`:""}>${o.label}</button>`:""}
    </div>`}function U({title:t="",text:a="",retryAct:s="ui-retry"}={}){return r`
    <div class="empty">
      <span class="empty-ic danger">${c("alert")}</span>
      <h4>${t||e("err.generic")}</h4>
      ${a?r`<p>${a}</p>`:""}
      <button type="button" class="btn btn-primary" data-act="${s}">${e("common.retry")}</button>
    </div>`}function Da(t){t?(clearTimeout(Mo),Ut||(Ut=Jt("div",{class:"loadbar"}),Ut.innerHTML='<span class="loadbar-fill"></span>',document.body.appendChild(Ut)),requestAnimationFrame(()=>Ut==null?void 0:Ut.classList.add("on"))):Mo=setTimeout(()=>{Ut==null||Ut.classList.remove("on"),setTimeout(()=>{Ut==null||Ut.remove(),Ut=null},420)},160)}async function D(t,a,{busyText:s=""}={}){let n=typeof t=="string"?I(t):t,o=n?n.innerHTML:"";try{return n&&(n.disabled=!0,n.classList.add("busy"),n.innerHTML=r`<span class="spinner"></span>${s||e("common.loading")}`),await a()}finally{n&&(n.disabled=!1,n.classList.remove("busy"),n.innerHTML=o)}}function hi(t){let a={},s=new FormData(t);for(let[n,o]of s.entries())n in a&&!Array.isArray(a[n])?a[n]=[a[n],o]:n in a?a[n].push(o):a[n]=o;for(let n of t.querySelectorAll("input[type=checkbox]"))a[n.name]=n.checked;return a}function gi(t,a,s){var i;let n=t.querySelector(`[name="${a}"]`);if(!n)return;n.classList.add("invalid");let o=(i=n.closest(".field"))==null?void 0:i.querySelector(".field-err");o||(o=Jt("span",{class:"field-err"}),(n.closest(".field")||n.parentElement).appendChild(o)),o.textContent=s;try{n.focus({preventScroll:!1})}catch(l){}}function ls(t){t.querySelectorAll(".invalid").forEach(a=>a.classList.remove("invalid")),t.querySelectorAll(".field-err").forEach(a=>a.remove())}function fi(t,a,{valueKey:s="id",labelKey:n="label",placeholder:o="",selected:i=""}={}){if(!t)return;let l=o?[`<option value="">${h(o)}</option>`]:[];for(let p of a){let d=p[s];l.push(`<option value="${h(d)}"${String(d)===String(i)?" selected":""}>${h(p[n])}</option>`)}t.innerHTML=l.join("")}async function vi(t,a){let{copyText:s}=await Promise.resolve().then(()=>(z(),ts));try{await s(String(t)),E(a||e("common.copied"))}catch(n){V(e("err.generic"))}}function Fe(){let t=$t()==="fa"?["\u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 (\u22EE \u06CC\u0627 \u062F\u06A9\u0645\u0647\u0654 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC) \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646.","\u06AF\u0632\u06CC\u0646\u0647\u0654 \xAB\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC\xBB \u06CC\u0627 \xABInstall app\xBB \u0631\u0627 \u0628\u0632\u0646.","\u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646\u061B \u0622\u06CC\u06A9\u0648\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."]:["Open the browser menu (\u22EE or the Share button).","Choose \u201CAdd to Home screen\u201D or \u201CInstall app\u201D.","Confirm \u2014 the Yassaei Electronics icon appears on your home screen."];pt({title:e("misc.addToHome"),size:"sm",body:r`
      <div class="install-hint">
        <ol class="steps-list">${t.map(a=>r`<li>${a}</li>`)}</ol>
        <p class="muted small">${e("misc.installHint")}</p>
      </div>`,footer:r`<button type="button" class="btn btn-primary" data-ok>${e("common.done")}</button>`,onMount:(a,s)=>a.querySelector("[data-ok]").addEventListener("click",()=>s.close())})}function kn(t=document){t.querySelectorAll(".acc-h").forEach(a=>{a.dataset.wired||(a.dataset.wired="1",a.addEventListener("click",()=>{let s=a.closest(".acc-item"),n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),a.setAttribute("aria-expanded",String(n))}))})}function Sn(t=document,a=null){t.querySelectorAll(".tabs").forEach(s=>{s.dataset.wired||(s.dataset.wired="1",s.addEventListener("click",n=>{let o=n.target.closest("[data-tab]");if(!o)return;let i=o.dataset.tab;s.querySelectorAll("[data-tab]").forEach(p=>p.classList.toggle("active",p===o)),t.querySelectorAll("[data-panel]").forEach(p=>{p.hidden=p.dataset.panel!==i}),a==null||a(i)}))})}function xn({sleeping:t=!1,canWake:a=!1,since:s=null,onWake:n=null,onLogin:o=null}={}){var v,$,w,k,C,H;let i="sleepScreen",l=document.getElementById(i);if(!t){l&&l.remove(),(v=document.body)==null||v.classList.remove("sleeping");return}($=document.body)==null||$.classList.add("sleeping");let p=$t()==="fa",d=p?"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A":"The store is asleep",b=p?"\u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u060C \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u0645. \u06A9\u0633\u06CC \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u06A9\u0646\u062F \u062A\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646 \u0634\u0648\u062F.":"The shop was switched off for a break. Nobody can place orders until it is turned on again.",u=s?`<div class="tiny sleep-since">${p?"\u062E\u0627\u0645\u0648\u0634 \u0627\u0632":"Asleep since"}: ${new Date(s).toLocaleString(p?"fa-IR":"en-GB")}</div>`:"";l||(l=document.createElement("div"),l.id=i,l.className="sleep-screen",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),(w=document.body)==null||w.appendChild(l)),l.innerHTML=r`
    <div class="sleep-card">
      <span class="sleep-ic">${c("moon")}</span>
      <h2>${d}</h2>
      <p>${b}</p>
      ${ct(u)}
      ${a?r`<button class="btn btn-primary btn-block mt" data-sleep-wake>${c("zap")} ${p?"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647":"Turn the store on"}</button>`:r`
          <a class="btn btn-outline btn-block mt" href="#/auth" data-sleep-login>${c("user")} ${p?"\u0648\u0631\u0648\u062F \u0645\u062F\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646":"Sign in as admin to turn it on"}</a>
          <button class="btn btn-ghost btn-block mt-s" data-sleep-reload>${c("refresh")} ${p?"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647":"Try again"}</button>`}
      <p class="tiny sleep-note">${p?"\u062E\u0648\u062F\u06A9\u0627\u0631 \u062E\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u062A\u0627 \u0648\u0642\u062A\u06CC \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u062E\u0627\u0645\u0648\u0634 \u0645\u06CC\u200C\u0645\u0627\u0646\u062F.":"It never turns off by itself \u2014 it stays off until you switch it on."}</p>
    </div>`,(k=l.querySelector("[data-sleep-wake]"))==null||k.addEventListener("click",async F=>{let ot=F.currentTarget;ot.disabled=!0;try{await(n==null?void 0:n())}finally{ot.disabled=!1}}),(C=l.querySelector("[data-sleep-reload]"))==null||C.addEventListener("click",()=>location.reload()),(H=l.querySelector("[data-sleep-login]"))==null||H.addEventListener("click",()=>o==null?void 0:o())}function Lo(t){var a,s;(s=(a=t.querySelectorAll)==null?void 0:a.call(t,'input[type="password"]'))==null||s.forEach(n=>{if(n.dataset.pwdDone)return;n.dataset.pwdDone="1";let o=document.createElement("span");o.className="pwd-wrap",n.parentNode.insertBefore(o,n),o.appendChild(n);let i=document.createElement("button");i.type="button",i.className="pwd-eye",i.dataset.eye="1",i.setAttribute("aria-label",e("pwd.show")),i.title=e("pwd.show"),i.innerHTML=c("eye"),o.appendChild(i)})}function ds(t=!1){if(!(!t&&!En()))try{Ae=Ae||new(window.AudioContext||window.webkitSoundContext||window.webkitAudioContext),Ae.state==="suspended"&&Ae.resume();let a=Ae.currentTime,s=Ae.createOscillator(),n=Ae.createGain();s.type="sine",s.frequency.setValueAtTime(1560,a),s.frequency.exponentialRampToValueAtTime(1180,a+.06),n.gain.setValueAtTime(1e-4,a),n.gain.exponentialRampToValueAtTime(.045,a+.008),n.gain.exponentialRampToValueAtTime(1e-4,a+.075),s.connect(n).connect(Ae.destination),s.start(a),s.stop(a+.09)}catch(a){}}function En(){try{return!!JSON.parse(localStorage.getItem("bm_prefs_v1")||"{}").uiSound}catch(t){return!1}}var si,ni,oi,ri,ci,ii,li,E,V,di,Re,pt,wn,Ta,mi,Gt,Ca,Aa,Ut,Mo,Ae,et=W(()=>{z();G();Z();si=()=>I("#modalRoot"),ni=()=>I("#drawerRoot"),oi=()=>I("#toastRoot"),ri={sm:"narrow",md:"",lg:"wide",xl:"wide"},ci={success:"success",error:"error",warn:"warning",warning:"warning",info:"info"},ii={success:"check-circle",error:"alert",warn:"alert",warning:"alert",info:"info"},li=0;E=(t,a)=>it(t,mt({type:"success"},a)),V=(t,a)=>it(t,mt({type:"error",timeout:5600},a)),di=(t,a)=>it(t,mt({type:"warn"},a));Re=[];document.addEventListener("keydown",t=>{if(t.key==="Escape"&&Re.length){let a=Re[Re.length-1];a.dismissible!==!1&&(t.preventDefault(),a.close(null))}});pt=t=>Be(mt({kind:"modal"},t)),wn=t=>Be(mt({kind:"drawer"},t)),Ta=t=>Be(mt({kind:"sheet"},t)),mi=t=>Be(mt({kind:window.innerWidth<760?"sheet":"modal"},t));Gt=t=>wt({title:e("common.delete"),text:t||e("misc.confirmDelete"),okText:e("common.delete"),danger:!0,icon:"trash"});Ca=(t="")=>r`<div class="row center mt-l" role="status"><span class="spinner"></span>${t?r`<span class="muted small">${t}</span>`:""}</div>`;Aa=(t,a)=>r`
  <div class="notice notice-${t}">${c(t==="success"?"check-circle":t==="danger"?"alert":"info")}<div class="grow">${a}</div></div>`,Ut=null,Mo=null;document.addEventListener("click",t=>{var i,l,p;let a=(l=(i=t.target).closest)==null?void 0:l.call(i,"[data-eye]");if(!a)return;let s=(p=a.parentElement)==null?void 0:p.querySelector("input");if(!s)return;let n=s.type==="password";s.type=n?"text":"password",a.innerHTML=c(n?"eye-off":"eye");let o=n?e("pwd.hide"):e("pwd.show");a.setAttribute("aria-label",o),a.title=o,s.focus({preventScroll:!0})},!0);new MutationObserver(t=>{for(let a of t)a.addedNodes.forEach(s=>{s.nodeType===1&&Lo(s)})}).observe(document.documentElement,{childList:!0,subtree:!0});Lo(document);Ae=null;document.addEventListener("pointerdown",t=>{var a,s;En()&&(s=(a=t.target).closest)!=null&&s.call(a,'button, a, [role="button"], .pcard, .chip, .gal-thumb')&&ds(!0)},!0)});function Oe(t,a=""){let s=t.images&&t.images[0]||"",n=ft(t)||e("img.alt");return s?r`<img class="${a}" src="${s}" alt="${n}" loading="lazy" decoding="async" data-glyph="${t.glyph||"misc"}">`:ct(`<svg class="ic ph-img ${a}" data-glyph="${h(t.glyph||"misc")}" role="img" aria-label="${h(n)}"><use href="#i-${xe(t.glyph||"misc")}"/></svg>`)}function yi(t,{quick:a=null}={}){var d;let s=(re().productCardInfo||[]).includes("brand"),n=(re().productCardInfo||[]).includes("stock"),o=(re().productCardInfo||[]).includes("rating"),i=a!==null?a:B("compare")||re().quickView!==!1,l=(d=t.stock)!=null?d:0,p=l<=0?"out":l<=3?"low":"";return r`
  <article class="pcard" data-pid="${t.id}">
    <div class="pc-media">
      <a href="#/product/${t.id}" aria-label="${ft(t)}">${Oe(t)}</a>
      <div class="ribbon">
        ${t.discountPct>0?r`<span class="badge-pill bp-danger">${g(t.discountPct)}٪ ${e("pdp.off")}</span>`:""}
        ${l<=0?r`<span class="badge-pill bp-muted">${e("card.outOfStock")}</span>`:""}
        ${t.featured?r`<span class="badge-pill bp-accent">${c("star")} ${e("home.featured")}</span>`:""}
      </div>
      <div class="pc-quick">
        ${re().quickView!==!1?r`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${t.id}" title="${e("card.quickView")}" aria-label="${e("card.quickView")}">${c("eye")}</button>`:""}
        ${B("wishlist")?r`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${t.id}" title="${e("card.wishlistAdd")}" aria-label="${e("card.wishlistAdd")}">${c("heart")}</button>`:""}
        ${B("compare")?r`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${t.id}" title="${e("card.compareAdd")}" aria-label="${e("card.compareAdd")}">${c("compare")}</button>`:""}
      </div>
    </div>
    <div class="pc-body">
      ${s&&t.brandName?r`<span class="pc-brand">${$t()==="fa"?t.brandName:t.brandNameEn||t.brandName}</span>`:""}
      <h3 class="pc-name"><a href="#/product/${t.id}">${ft(t)}</a></h3>
      ${o&&t.ratingCount>0?r`<div class="pc-rate">${Ht(t.ratingAvg)} <span>${g(t.ratingAvg)} (${g(t.ratingCount)})</span></div>`:""}
      ${n?r`<div class="pc-stock ${p}"><span class="dot"></span>${l<=0?e("card.outOfStock"):l<=3?e("common.lowStock"):e("common.inStock")}</div>`:""}
      <div class="pc-price">
        ${t.oldPrice>t.price?r`<span class="pc-old">${A(t.oldPrice)}</span>`:""}
        ${t.price?r`<span class="pc-now">${A(t.price)}</span>`:r`<span class="pc-now pc-inquire">${e("price.inquire")}</span>`}
      </div>
      <div class="pc-actions">
        ${t.price?r`<button type="button" class="btn btn-primary" data-act="add-cart" data-id="${t.id}" ${l<=0?"disabled":""}>${c("cart")} ${e("card.addToCart")}</button>`:r`<a class="btn btn-outline" href="#/product/${t.id}">${c("phone")} ${e("price.inquireShort")}</a>`}
      </div>
    </div>
  </article>`}function No(t,a=null){return r`
    <a class="cat-card" href="#/category/${t.id}">
      <span class="cat-ic">${c(xe(t.glyph))}</span>
      <span class="cat-name">${Et(t)}</span>
      ${a!==null?r`<span class="cat-count">${g(a)} ${e("catalog.count")}</span>`:""}
    </a>`}function $i(t){let a=$t()==="en"&&t.titleEn?t.titleEn:t.title,s=$t()==="en"&&t.textEn?t.textEn:t.text,n=$t()==="en"&&t.ctaEn?t.ctaEn:t.cta;return r`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${a}</div>
        ${s?r`<div class="banner-text">${s}</div>`:""}
      </div>
      ${t.link?r`<a class="btn btn-primary banner-cta" href="${t.link.startsWith("#")||t.link.startsWith("/")?t.link:"#/"}">${n||e("common.more")} ${c("chevron-left")}</a>`:""}
    </div>`}function Nt({titleIcon:t="",title:a="",sub:s="",link:n=null,linkLabel:o=""}){return r`
    <div class="section-head">
      <div>
        <h2 class="section-title">${t?c(t):""}${a}</h2>
        ${s?r`<p class="section-sub">${s}</p>`:""}
      </div>
      ${n?r`<a class="section-link" href="${n}">${o||e("common.showAll")} ${c("chevron-left")}</a>`:""}
    </div>`}function ps(t){return re().showBreadcrumbs===!1||!(t!=null&&t.length)?"":r`
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="#/">${c("home")} ${e("nav.home")}</a>
      ${t.map((a,s)=>r`
        ${c("chevron-left")}
        ${s===t.length-1?r`<span aria-current="page">${a.label}</span>`:r`<a href="${a.href}">${a.label}</a>`}`)}
    </nav>`}function me(t,a,s){if(a<=1)return"";let n=(d,b,u="",v=!1)=>r`
    <a class="pg ${u}" href="${v?"#":s(d)}" ${v?'aria-disabled="true" tabindex="-1"':""} ${d===t?'aria-current="page"':""}>${b}</a>`,o=[],i=d=>{d>=1&&d<=a&&!o.includes(d)&&o.push(d)};i(1),i(2);for(let d=t-1;d<=t+1;d++)i(d);i(a-1),i(a),o.sort((d,b)=>d-b);let l=[n(t-1,c("chevron-right"),"",t<=1)],p=0;for(let d of o)p&&d-p>1&&l.push(r`<span class="pg pg-gap" aria-hidden="true">…</span>`),l.push(n(d,g(d),d===t?"active":"")),p=d;return l.push(n(t+1,c("chevron-left"),"",t>=a)),r`<nav class="pagination" aria-label="${e("common.page")}">${ct(l.join(""))}</nav>`}function $e(t){return r`<span class="badge-pill ${wi[t]||"bp-muted"}">${e(`st.${t}`)}</span>`}function ze(t){return r`<span class="badge-pill ${{paid:"bp-success",unpaid:"bp-warn",pending:"bp-warn",refunded:"bp-muted",failed:"bp-danger",cancelled:"bp-muted"}[t==null?void 0:t.status]||"bp-muted"}">${e(`ps.${(t==null?void 0:t.status)||"unpaid"}`)}</span>`}function ea(t){let a=t.timeline||[];return a.length?r`
    <div class="timeline">
      ${a.map(s=>r`
        <div class="tl-item">
          <div class="tl-t">${e(`st.${s.status}`)||s.status}</div>
          <div class="tl-d">${O(s.at)}${s.note?` \u2014 ${s.note}`:""}${s.by?` \xB7 ${s.by}`:""}</div>
        </div>`)}
    </div>`:""}function Ct({icon:t="box",label:a="",value:s="",sub:n=""}){return r`
    <div class="stat-card">
      <span class="stat-ic">${c(t)}</span>
      <div><div class="stat-val">${s}</div><div class="stat-lbl">${a}</div>${n?r`<div class="tiny muted">${n}</div>`:""}</div>
    </div>`}function It({label:t="",value:a="",sub:s="",icon:n=""}){return r`
    <div class="kpi">
      <div class="l">${t}</div>
      <div class="v">${a}</div>
      ${s?r`<div class="s">${s}</div>`:""}
    </div>`}function us(t,{height:a=130}={}){let s=Math.max(1,...t.map(n=>n.value));return r`
    <div class="chart" ${a?r`data-h="${a}px"`:""}>
      ${t.map(n=>r`<div class="bar" data-tip="${n.label}: ${g(n.value)}" data-h="${Math.max(2,Math.round(n.value/s*100))}%"></div>`)}
    </div>
    <div class="chart-x">${t.map(n=>r`<span>${n.short||""}</span>`)}</div>`}function lt(t,a,{emptyText:s=null}={}){return a.length?r`
    <div class="table-wrap">
      <table class="table">
        <thead><tr>${t.map(n=>r`<th class="${n.cls||""}">${n.label}</th>`)}</tr></thead>
        <tbody>${ct(a.join(""))}</tbody>
      </table>
    </div>`:ct(`<div class="empty"><h4>${h(s||e("common.noData"))}</h4></div>`)}function x({label:t="",name:a,type:s="text",value:n="",placeholder:o="",required:i=!1,hint:l="",attrs:p="",span2:d=!1,autocomplete:b=""}){return r`
    <label class="field ${d?"span-2":""}">
      <span class="label">${t}${i?r`<span class="req">*</span>`:""}</span>
      <input class="input" type="${s}" name="${a}" value="${n}" placeholder="${o}" ${i?"required":""} ${b?r`autocomplete="${b}"`:""} ${p}>
      ${l?r`<span class="hint">${l}</span>`:""}
    </label>`}function J({label:t="",name:a,value:s="",placeholder:n="",required:o=!1,hint:i="",rows:l=4,span2:p=!1,attrs:d=""}){return r`
    <label class="field ${p?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <textarea class="textarea" name="${a}" rows="${l}" placeholder="${n}" ${o?"required":""} ${d}>${s}</textarea>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function Y({label:t="",name:a,options:s=[],value:n="",required:o=!1,hint:i="",span2:l=!1,placeholder:p=""}){return r`
    <label class="field ${l?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <select class="select" name="${a}" ${o?"required":""}>
        ${p?r`<option value="">${p}</option>`:""}
        ${s.map(d=>r`<option value="${d.value}" ${String(d.value)===String(n)?"selected":""}>${d.label}</option>`)}
      </select>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function Ue({label:t="",name:a,checked:s=!1,hint:n=""}){return r`
    <label class="check">
      <input type="checkbox" name="${a}" ${s?"checked":""}>
      <span class="box">${c("check")}</span>
      <span>${t}${n?r`<span class="hint">${n}</span>`:""}</span>
    </label>`}function yt({label:t="",desc:a="",name:s,checked:n=!1,value:o=""}){return r`
    <div class="switch-row">
      <div><div class="t">${t}</div>${a?r`<div class="d">${a}</div>`:""}</div>
      <label class="switch">
        <input type="checkbox" name="${s}" value="${o}" ${n?"checked":""}>
        <span class="track"></span>
      </label>
    </div>`}function bs({value:t=1,max:a=99,min:s=1,name:n="qty",small:o=!1}){return r`
    <div class="qty" data-qty>
      <button type="button" data-q="-1" aria-label="-1">${c("minus")}</button>
      <input type="number" name="${n}" value="${t}" min="${s}" max="${a}" inputmode="numeric">
      <button type="button" data-q="1" aria-label="+1">${c("plus")}</button>
    </div>`}function hs({name:t="rating",value:a=0}){return r`
    <div class="stars-input" data-stars name-wrap="${t}" role="radiogroup" aria-label="${e("pdp.yourRating")}">
      ${[1,2,3,4,5].map(s=>r`
        <button type="button" data-star="${s}" class="${s<=a?"on":""}" role="radio" aria-checked="${s===a}" aria-label="${s}">
          <svg class="ic"><use href="#i-star"/></svg>
        </button>`)}
      <input type="hidden" name="${t}" value="${a}">
    </div>`}function qn(t,{showPlus:a=!0}={}){var n;let s=[];return s.push(r`<div class="sum-row"><span>${e("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>`),a&&t.plusDiscount>0&&s.push(r`<div class="sum-row discount"><span>${e("acc.plus")} (${g(t.plusDiscountPct||3)}٪)</span><span class="v">−${A(t.plusDiscount)}</span></div>`),t.couponDiscount>0&&s.push(r`<div class="sum-row discount"><span>${e("common.discountCode")}: ${((n=t.coupon)==null?void 0:n.code)||""}</span><span class="v">−${A(t.couponDiscount)}</span></div>`),s.push(r`<div class="sum-row"><span>${e("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${t.shippingLabel})</span>`:""}</span><span class="v">${t.shipping===0?e("common.free"):A(t.shipping)}</span></div>`),t.insured&&s.push(r`<div class="sum-row"><span>${e("common.insurance")}</span><span class="v">${t.insuranceFee===0?e("common.free"):A(t.insuranceFee)}</span></div>`),s.push(r`<div class="sum-row total"><span>${e("common.payable")}</span><span class="v">${A(t.total)}</span></div>`),ct(s.join(""))}function Io(t){var n;let a=Number((n=ve().freeOver)!=null?n:0);if(!a||t>=a)return r`<div class="notice notice-success mt-s">${c("truck")}<div>${e("cart.freeShipDone")}</div></div>`;let s=Math.min(100,Math.round(t/a*100));return r`
    <div class="mt-s">
      <div class="progress"><i data-w="${s}%"></i></div>
      <p class="hint mt-s">${e("cart.freeShipHint",{amount:A(a-t,{withUnit:!0}).replace(/<[^>]+>/g,"")})}</p>
    </div>`}function aa(){let t=q();return r`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${e("contact.mapTitle")}">
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
    <label class="check"><input type="checkbox" name="captchaBox" data-act="captcha-open"><span class="box">${c("check")}</span><span>${e("captcha.label")}</span></label>
    <div class="captcha-ch" data-cch hidden>
      <div class="captcha-img" data-cimg></div>
      <div class="captcha-row">
        <input class="input" name="captchaAnswer" inputmode="numeric" autocomplete="off" placeholder="${e("captcha.placeholder")}" aria-label="${e("captcha.placeholder")}" data-act="captcha-check">
        <button type="button" class="btn btn-ghost" data-act="captcha-refresh" title="${e("captcha.refresh")}" aria-label="${e("captcha.refresh")}">${c("refresh")}</button>
      </div>
      <div class="captcha-st" data-cst>${e("captcha.hint")}</div>
    </div>
    <input type="hidden" name="captchaToken" data-ctok>
  </div>`}var jt,je,wi,dt=W(()=>{z();G();K();z();et();jt=(t,a)=>r`<div class="pgrid">${t.map(s=>yi(s,a))}</div>`;je=(t,a,s="")=>{let n=(a||[]).filter(o=>o.slot===t);return n.length?r`<div class="${s} banner-grid mt">${n.map($i)}</div>`:""};wi={pending_payment:"bp-warn",pending_review:"bp-warn",confirmed:"bp-info",preparing:"bp-info",ready_pickup:"bp-accent",shipped:"bp-violet",delivered:"bp-success",cancelled:"bp-danger",refunded:"bp-muted",returned:"bp-muted"}});var Ro={};X(Ro,{mount:()=>Si,render:()=>ki,title:()=>xi});async function ki(){var $,w,k,C,H,F,ot;let t=Xt(),a=[];if(B("recentlyViewed")&&(m.recent||[]).length)try{a=(await f.get(`/api/products?ids=${m.recent.slice(0,8).join(",")}&limit=8`)).items||[]}catch(R){a=[]}let s=[],n=m.categories,o=m.brands,i=m.stats;try{let[R,P,tt]=await Promise.all([f.get("/api/products?limit=48&sort=popular"),m.categories.length?Promise.resolve(null):f.get("/api/categories"),m.brands.length?Promise.resolve(null):f.get("/api/brands")]);if(s=R.items||[],P&&(n=P.items||[]),tt&&(o=tt.items||[]),B("publicStats"))try{i=(await f.get("/api/stats/public")).stats||i}catch(kt){}}catch(R){}let l=s.filter(R=>R.featured).slice(0,8),p=[...s].sort((R,P)=>(P.sold||0)-(R.sold||0)).slice(0,8),d=[...s].sort((R,P)=>String(P.createdAt||"").localeCompare(String(R.createdAt||""))).slice(0,8),b=s.filter(R=>R.discountPct>0).sort((R,P)=>P.discountPct-R.discountPct).slice(0,8),u=n.filter(R=>!R.parentId).slice(0,12),v=l.length?l:p.slice(0,8);return r`
    ${je("home_hero",le("home_hero"))}
    

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-circuit.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${c("zap")} ${e("home.heroKicker")}</span>
        <h1 class="hero-title">${e("home.heroTitle")}</h1>
        <p class="hero-text">${e("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${c("cart")} ${e("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${c("percent")} ${e("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${c("shield")} ${e("home.point1")}</span>
          <span class="hero-point">${c("package-check")} ${e("home.point2")}</span>
          <span class="hero-point">${c("truck")} ${e("home.point3")}</span>
          <span class="hero-point">${c("store")} ${e("home.point4")}</span>
        </div>
      </div>
    </section>

    ${je("home_strip",le("home_strip"))}

    <section class="section">
      ${Nt({titleIcon:"layers",title:e("home.categories"),sub:e("home.categoriesSub"),link:"#/products",linkLabel:e("common.showAll")})}
      <div class="cat-grid">${u.map(R=>{var P;return No(R,(P=R.count)!=null?P:null)})}</div>
    </section>

    ${B("partners")&&((w=($=m.settings.partners)==null?void 0:$.items)!=null&&w.length)?r`
    <section class="partners-sec partners-top">
      ${Nt({titleIcon:"store",title:e("home.partnersTitle")})}
      <div class="marquee" aria-label="${e("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...m.settings.partners.items,...m.settings.partners.items].map(R=>{let P=(m.brands||[]).find(kt=>{var gt;return kt.name===R.fa||R.en&&(kt.nameEn===R.en||((gt=kt.nameEn)==null?void 0:gt.toLowerCase())===R.en.toLowerCase())}),tt=P?`#/products?brand=${P.id}`:`#/search?q=${encodeURIComponent(R.fa)}`;return r`<a class="partner-chip" href="${tt}" title="${q()?R.fa:R.en||R.fa}">
              <img class="pt-logo" src="/assets/img/brands/${P?P.id:"no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${q()?R.fa:R.en||R.fa}</b></a>`}).join("")}
        </div>
      </div>
    </section>`:""}

    ${v.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:e("home.featured"),sub:e("home.featuredSub"),link:"#/products?sort=popular"})}
      ${jt(v)}
    </section>`:""}

    ${b.length?r`
    <section class="section">
      ${Nt({titleIcon:"percent",title:e("home.deals"),sub:e("home.dealsSub"),link:"#/products?discount=1"})}
      ${jt(b)}
    </section>`:""}

    ${p.length?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:e("home.bestSellers"),sub:e("home.bestSellersSub"),link:"#/products?sort=popular"})}
      ${jt(p)}
    </section>`:""}

    ${d.length?r`
    <section class="section">
      ${Nt({titleIcon:"sparkles",title:e("home.newArrivals"),sub:e("home.newArrivalsSub"),link:"#/products?sort=newest"})}
      ${jt(d)}
    </section>`:""}

    ${o.length?r`
    <section class="section">
      ${Nt({titleIcon:"tag",title:e("home.brands")})}
      <div class="row row-wrap">
        ${o.slice(0,18).map(R=>r`<a class="chip" href="#/products?brand=${R.id}">${Yt(R)}</a>`)}
      </div>
    </section>`:""}

    <section class="section">
      <div class="card pf-card">
        <strong>${c("search")} ${e("home.partFinder")}</strong>
        <p class="muted small mt-s">${e("home.partFinderText")}</p>
        <div class="row row-wrap mt-s">
          ${(C=(k=m.settings)==null?void 0:k.store)!=null&&C.phone?r`<a class="btn btn-primary btn-sm" href="tel:${m.settings.store.phone}">${c("phone")} ${e("home.partFinderCta")}: <bdi>${at(m.settings.store.phone)}</bdi></a>`:""}
          <a class="btn btn-outline btn-sm" href="#/pages/contact">${c("chat")} ${e("nav.contact")}</a>
          ${(ot=(F=(H=m.settings)==null?void 0:H.store)==null?void 0:F.socials)!=null&&ot.instagram?r`<a class="btn btn-ghost btn-sm" href="${m.settings.store.socials.instagram}" target="_blank" rel="noopener">${c("camera")} ${e("social.instagram")}</a>`:""}
        </div>
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"shield",title:e("home.whyUs"),sub:e("home.whyUsSub")})}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${c("shield")}</span><div><div class="b">${e("home.point1")}</div><div class="muted small">${q()?"\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.":"Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("package-check")}</span><div><div class="b">${e("home.point2")}</div><div class="muted small">${q()?"\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A.":"By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("truck")}</span><div><div class="b">${e("home.point3")}</div><div class="muted small">${q()?"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A.":"Orders leave Tehran every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("headset")}</span><div><div class="b">${e("footer.support")}</div><div class="muted small">${q()?"\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A.":"Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${B("publicStats")&&i?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:e("home.statsTitle"),link:"#/stats",linkLabel:e("common.showAll")})}
      <div class="stats-grid">
        ${Ct({icon:"box",label:e("stats.products"),value:g(i.products)})}
        ${Ct({icon:"package-check",label:e("stats.ordersTotal"),value:g(i.ordersTotal)})}
        ${Ct({icon:"cart",label:e("stats.ordersToday"),value:g(i.ordersToday)})}
        ${Ct({icon:"eye",label:e("stats.visitsToday"),value:g(i.visitsToday)})}
        ${Ct({icon:"users",label:e("stats.customers"),value:g(i.customers)})}
        ${Ct({icon:"truck",label:e("stats.delivered"),value:g(i.deliveredOrders)})}
      </div>
    </section>`:""}

    ${B("plus")&&!Zt()?r`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${c("sparkles")} ${e("home.plusTitle")}</div>
          <div class="banner-text">${e("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(xa().perks||[]).slice(0,4).map(R=>r`<span class="chip">${c("check")} ${q()?R.fa:R.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${e("home.plusCta")} ${c("chevron-left")}</a>
      </div>
    </section>`:""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${Nt({titleIcon:"store",title:e("home.visitStore"),sub:e("home.visitStoreText")})}
          <p class="muted small mb">${h(q()?t.address||"":t.addressEn||t.address||"")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${c("map")} ${e("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${t.phone}">${c("phone")} ${at(t.phone||"")}</a>
          </div>
        </div>
        <div class="card">
          ${Nt({titleIcon:"download",title:e("home.appTitle"),sub:e("home.appText")})}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${c("download")} ${e("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${e("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${a.length?r`
    <section class="section">
      ${Nt({titleIcon:"history",title:e("home.recent"),sub:e("home.recentSub")})}
      ${jt(a)}
    </section>`:""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${e("contact.mapTitle")}">
          ${ct(aa())}
          <span class="minimap-hint">${c("pin")} ${e("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `}function Si(){let t=document.querySelector(".marquee"),a=t==null?void 0:t.querySelector(".marquee-track");if(!t||!a)return null;let s=0,n=!1,o=0,i=!1,l=0,p=performance.now(),d=0,b=42,u=()=>{let P=parseFloat(getComputedStyle(a).gap||"10")||10;return(a.scrollWidth+P)/2||1},v=()=>{let P=parseFloat(getComputedStyle(a).gap||"10")||10,tt=[...a.children];if(!tt.length)return;let kt=a.dataset.base?Number(a.dataset.base):tt.length/2,gt=tt.slice(0,kt),j=gt.reduce((ge,Ne)=>ge+Ne.offsetWidth+P,0),Tt=1;for(;j*Tt<innerWidth*1.6&&Tt<4;)Tt++;a.dataset.base=String(kt);let se=kt*Tt*2;if(tt.length===se)return;let Vt=document.createDocumentFragment();for(let ge=0;ge<2;ge++)for(let Ne=0;Ne<Tt;Ne++)gt.forEach(Ya=>Vt.appendChild(Ya.cloneNode(!0)));a.innerHTML="",a.appendChild(Vt)};v(),addEventListener("resize",v,{passive:!0});let $=()=>getComputedStyle(a).direction==="rtl"?1:-1,w=()=>{let P=u();$()>0?(s>=P&&(s-=P),s<0&&(s+=P)):(s<=-P&&(s+=P),s>0&&(s-=P))},k=P=>{let tt=Math.min(.05,(P-p)/1e3);p=P,!n&&!document.documentElement.classList.contains("eco")&&(s+=$()*b*tt),w(),a.style.transform=`translateX(${s.toFixed(1)}px)`,d=requestAnimationFrame(k)};d=requestAnimationFrame(k);let C=P=>{P.pointerType==="mouse"&&P.button!==0||(i=!1,n=!0,o=0,l=P.clientX,t.classList.add("grabbing"),window.addEventListener("pointermove",H),window.addEventListener("pointerup",F),window.addEventListener("pointercancel",F))},H=P=>{if(!n)return;let tt=P.clientX-l;s+=tt,o+=Math.abs(tt),l=P.clientX},F=()=>{n=!1,t.classList.remove("grabbing"),o>8&&(i=!0),window.removeEventListener("pointermove",H),window.removeEventListener("pointerup",F),window.removeEventListener("pointercancel",F)},ot=P=>{i&&(i=!1,P.preventDefault(),P.stopPropagation())},R=P=>P.preventDefault();return t.addEventListener("dragstart",R),t.addEventListener("click",ot,!0),t.addEventListener("pointerdown",C),()=>{cancelAnimationFrame(d),t.removeEventListener("pointerdown",C),t.removeEventListener("dragstart",R),t.removeEventListener("click",ot,!0),window.removeEventListener("pointermove",H),window.removeEventListener("pointerup",F),window.removeEventListener("pointercancel",F)}}var xi,Bo=W(()=>{z();G();Z();K();dt();xi=()=>e("nav.home")});var Tn={};X(Tn,{mount:()=>qi,render:()=>Ei});function gs(t,a){let s=new URLSearchParams(t.query);for(let[o,i]of Object.entries(a))i===null||i===""||i===void 0?s.delete(o):s.set(o,i);return"page"in a||s.delete("page"),`#${t.params.id?`/category/${t.params.id}`:"/products"}${s.toString()?`?${s}`:""}`}async function Ei(t){let a=new URLSearchParams(t.query);t.params.id&&a.set("cat",t.params.id);let s=a,n=new URLSearchParams;for(let C of["q","cat","sort","min","max","rating","authenticity","page"])s.get(C)&&n.set(C,s.get(C));s.get("brand")&&n.set("brand",s.get("brand")),s.get("inStock")==="1"&&n.set("inStock","1"),s.get("discount")==="1"&&n.set("discount","1"),n.set("limit","24");let o={items:[],total:0,pages:1,page:1,facets:{}};try{o=await f.get(`/api/products?${n}`)}catch(C){}let i=o.items||[],l=o.facets||{},p=m.categories,d=m.brands,b=t.params.id?Ee(t.params.id):s.get("cat")?Ee(s.get("cat")):null,u=(s.get("brand")||"").split(",").filter(Boolean),v=Ho.includes(s.get("sort"))?s.get("sort"):"relevant",$=Number(s.get("page"))||1,w=[];if(b){let C=[],H=b;for(;H;)C.unshift(H),H=H.parentId?Ee(H.parentId):null;for(let F of C)w.push({label:Et(F),href:`#/category/${F.id}`})}else s.get("q")?w.push({label:`${e("search.resultsFor")} \xAB${s.get("q")}\xBB`}):s.get("discount")==="1"?w.push({label:e("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"})}):s.get("sort")==="newest"?w.push({label:e("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"})}):w.push({label:e("catalog.title")});let k=(C,H,F,ot,R)=>r`
    <label class="fopt">
      <input type="checkbox" data-f="${C}" value="${H}" ${R?"checked":""}>
      <span class="cb">${c("check")}</span>
      <span>${F}</span>
      ${ot!==void 0?r`<span class="cnt">${g(ot)}</span>`:""}
    </label>`;return r`
    ${ps(w)}
    <div class="section-head">
      <div>
        <h1 class="section-title">${b?Et(b):s.get("q")?e("search.resultsFor")+" \xAB"+s.get("q")+"\xBB":s.get("discount")==="1"?e("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"}):s.get("sort")==="newest"?e("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"}):e("catalog.title")}</h1>
        <p class="section-sub">${g(o.total||0)} ${e("catalog.count")}</p>
      </div>
      <button type="button" class="btn btn-ghost only-mobile" data-act="cat-filters">${c("filter")} ${e("catalog.showFilters")}</button>
    </div>

    ${o.didYouMean?r`<div class="notice notice-info mb">${c("sparkles")}<span>${e("search.didYouMean")} <a class="section-link" href="${gs(t,{q:o.didYouMean})}">${o.didYouMean}</a></span></div>`:""}

    <div class="catalog">
      <aside class="filters card" id="filtersBox" hidden>
        <div class="row row-between mb-s">
          <strong>${e("catalog.filters")}</strong>
          <button type="button" class="link-btn" data-act="cat-clear">${e("catalog.f.clear")}</button>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${e("catalog.f.category")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b" >
            ${p.filter(C=>!C.parentId).map(C=>{var H;return k("cat",C.id,Et(C),(H=l.categories)==null?void 0:H[C.id],(s.get("cat")||t.params.id)===C.id)})}
          </div>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${e("catalog.f.brand")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b">
            ${d.slice(0,20).map(C=>{var H;return k("brand",C.id,Yt(C),(H=l.brands)==null?void 0:H[C.id],u.includes(C.id))})}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${e("catalog.f.price")}</div>
          <form class="fgroup-b row" data-price-form>
            <input class="input" type="number" min="0" step="10000" name="min" placeholder="${e("common.from")}" value="${s.get("min")||""}">
            <input class="input" type="number" min="0" step="10000" name="max" placeholder="${e("common.to")}" value="${s.get("max")||""}">
            <button class="btn btn-ghost btn-xs" type="submit">${e("common.apply")}</button>
          </form>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${e("catalog.f.availability")}</div>
          <div class="fgroup-b">
            ${k("flag","inStock",e("catalog.f.inStock"),void 0,s.get("inStock")==="1")}
            ${k("flag","discount",e("catalog.f.discountOnly"),void 0,s.get("discount")==="1")}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${e("catalog.f.rating")}</div>
          <div class="fgroup-b">
            ${[4,3,2].map(C=>k("rating",C,`${g(C)}\u2605 ${e("common.and")} ${e("common.more")}`,void 0,s.get("rating")===String(C)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${e("catalog.f.authenticity")}</div>
          <div class="fgroup-b">
            ${["original","highcopy","generic"].map(C=>{var H;return k("authenticity",C,e(`auth.${C}`),(H=l.authenticity)==null?void 0:H[C],s.get("authenticity")===C)})}
          </div>
        </div>
      </aside>

      <div>
        <div class="toolbar">
          <span class="muted small">${g(o.total||0)} ${e("catalog.count")}</span>
          <span class="grow"></span>
          <label class="row" style="flex-wrap: nowrap;" >
            <span class="muted small nowrap" style="flex-shrink: 0;">${e("common.sort")}</span>
            <button type="button" class="btn" data-act="choose-sort" style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 11px; padding: 7px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 140px; font-size: 14px; font-weight: 500; color: var(--text); flex-shrink: 0;">
              <span data-txt style="white-space: nowrap;">${e(`catalog.sort.${v}`)}</span>
              ${c("chevron-down")}
            </button>
          </label>
          <div class="btn-group">
            <button type="button" class="btn ${m.prefs.view!=="list"?"active":""}" data-view="grid" title="${e("catalog.viewGrid")}" aria-label="${e("catalog.viewGrid")}">${c("grid")}</button>
            <button type="button" class="btn ${m.prefs.view==="list"?"active":""}" data-view="list" title="${e("catalog.viewList")}" aria-label="${e("catalog.viewList")}">${c("list")}</button>
          </div>
        </div>

        <div class="active-filters" data-activef>
          ${b?r`<span class="chip active" data-unf="cat">${Et(b)} <span class="chip-close">${c("close")}</span></span>`:""}
          ${u.map(C=>r`<span class="chip active" data-unf="brand" data-v="${C}">${Yt(mt({id:C},m.brands.find(H=>H.id===C)||{}))} <span class="chip-close">${c("close")}</span></span>`)}
          ${s.get("inStock")==="1"?r`<span class="chip active" data-unf="flag" data-v="inStock">${e("catalog.f.inStock")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("discount")==="1"?r`<span class="chip active" data-unf="flag" data-v="discount">${e("catalog.f.discountOnly")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("min")||s.get("max")?r`<span class="chip active" data-unf="price">${e("catalog.f.price")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("rating")?r`<span class="chip active" data-unf="rating">${s.get("rating")}★ <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("authenticity")?r`<span class="chip active" data-unf="authenticity">${e(`auth.${s.get("authenticity")}`)} <span class="chip-close">${c("close")}</span></span>`:""}
        </div>

        ${i.length?ct(jt(i)):L({icon:"search",title:e("search.noResultTitle"),text:e("search.noResultText"),action:{href:"#/products",label:e("cart.goShopping")}})}

        ${me($,o.pages||1,C=>gs(t,{page:C>1?C:null}))}
      </div>
    </div>
  `}function qi(t,a){var i;N(t);let s=t.querySelector("#filtersBox");window.innerWidth>=980&&(s.hidden=!1);let n=l=>{location.hash=l.replace(/^#/,"")};t.querySelectorAll("[data-view]").forEach(l=>l.addEventListener("click",()=>{Te("view",l.dataset.view,{sync:!1}),document.documentElement.setAttribute("data-cards",l.dataset.view==="list"?"list":"grid"),l.closest(".btn-group").querySelectorAll("button").forEach(p=>p.classList.toggle("active",p===l))}));let o=()=>{var C,H;let l=new URLSearchParams(a.query);a.params.id&&l.delete("cat");let p=[...t.querySelectorAll('[data-f="cat"]:checked')].map(F=>F.value),d=[...t.querySelectorAll('[data-f="brand"]:checked')].map(F=>F.value),b=((C=t.querySelector('[data-f="rating"]:checked'))==null?void 0:C.value)||"",u=((H=t.querySelector('[data-f="authenticity"]:checked'))==null?void 0:H.value)||"",v=t.querySelector('[data-f="flag"][value="inStock"]:checked')?"1":"",$=t.querySelector('[data-f="flag"][value="discount"]:checked')?"1":"",w=new URLSearchParams;for(let[F,ot]of l.entries())["cat","brand","rating","authenticity","inStock","discount","page"].includes(F)||w.set(F,ot);p.length&&w.set("cat",p[p.length-1]),d.length&&w.set("brand",d.join(",")),b&&w.set("rating",b),u&&w.set("authenticity",u),v&&w.set("inStock","1"),$&&w.set("discount","1");let k=a.params.id&&!p.length?`/category/${a.params.id}`:"/products";n(`#${k}${w.toString()?`?${w}`:""}`)};return t.querySelectorAll("[data-f]").forEach(l=>l.addEventListener("change",o)),(i=t.querySelector("[data-price-form]"))==null||i.addEventListener("submit",l=>{l.preventDefault();let p=new FormData(l.target);n(gs(a,{min:p.get("min")||null,max:p.get("max")||null}))}),t.querySelectorAll("[data-unf]").forEach(l=>l.addEventListener("click",()=>{let p=l.dataset.unf,d={};if(p==="cat"&&(d.cat=null,a.params.id)){location.hash=`#/products${a.query.toString()?`?${new URLSearchParams([...a.query.entries()].filter(([b])=>b!=="cat"))}`:""}`;return}if(p==="brand"){let b=(a.query.get("brand")||"").split(",").filter(u=>u&&u!==l.dataset.v);d.brand=b.length?b.join(","):null}p==="flag"&&(d[l.dataset.v]=null),p==="price"&&(d.min=null,d.max=null),p==="rating"&&(d.rating=null),p==="authenticity"&&(d.authenticity=null),n(gs(a,d))})),null}var Ho,Cn=W(()=>{z();G();Z();K();dt();nt();et();ut();Ho=["relevant","newest","oldest","cheapest","dearest","popular","rating","discount","name"];y("cat-filters",(t,a)=>{let s=document.getElementById("filtersBox");s&&(s.hidden=!s.hidden,a.textContent=s.hidden?e("catalog.showFilters"):e("catalog.hideFilters"),s.hidden||s.scrollIntoView({behavior:"smooth",block:"start"}))});y("choose-sort",(t,a)=>{let s=new URLSearchParams(location.hash.split("?")[1]||"").get("sort")||"relevant",n=Ta({title:e("common.sort"),body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
      ${Ho.map(o=>r`<button class="btn ${o===s?"active":""}" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${o}">${e(`catalog.sort.${o}`)}</button>`).join("")}
    </div>`});n.panel.querySelectorAll("button[data-v]").forEach(o=>{o.addEventListener("click",()=>{let i=o.dataset.v;n.close();let l=new URLSearchParams(location.hash.split("?")[1]||"");i==="relevant"?l.delete("sort"):l.set("sort",i),l.delete("page"),location.hash=`${location.hash.split("?")[0]}${l.toString()?"?"+l.toString():""}`})})});y("cat-clear",()=>{let t=location.hash.includes("/category/")?"#/products":location.hash.split("?")[0];location.hash=t})});var Oo={};X(Oo,{mount:()=>Di,render:()=>Ti,title:()=>Pi});async function Ti(t){var H,F,ot,R;let a=t.params.id,s=null;try{s=await f.get(`/api/products/${encodeURIComponent(a)}`)}catch(P){return L({icon:"alert",title:e("err.notFound"),text:e("err.notFoundText"),action:{href:"#/products",label:e("err.goHome")}})}let n=s.product,o=s.reviews||[],i=o.filter(P=>P.type!=="question"),l=o.filter(P=>P.type==="question"),p=s.reviewStats||{count:0,avg:0,dist:[0,0,0,0,0],questions:0},d=s.related||[],b=[],u=Ee(n.categoryId);for(;u;)b.unshift(u),u=u.parentId?Ee(u.parentId):null;let v=(n.images&&n.images.length?n.images:[]).slice(0,6),$=[...v.map(P=>({url:P,kind:"image"})),...(n.videos||[]).slice(0,4).map(P=>({url:P,kind:"video",poster:v[0]||""}))],w=(H=n.stock)!=null?H:0,k=String(((ot=(F=m.settings)==null?void 0:F.store)==null?void 0:ot.phone)||"").trim(),C=ve().zones||[];return r`
    ${ps([...b.map(P=>({label:Et(P),href:`#/category/${P.id}`})),{label:ft(n)}])}
    <div class="pdp">
      <div class="gallery">
        <div class="gal-main" data-act="lightbox" data-imgs='${h(JSON.stringify($))}' data-i="0" role="button" tabindex="0" aria-label="${e("pdp.zoomHint")}">
          ${((R=$[0])==null?void 0:R.kind)==="video"?r`<video src="${$[0].url}" poster="${$[0].poster}" controls playsinline preload="metadata" class="gal-video"></video>`:v[0]?r`<img src="${v[0]}" alt="${ft(n)}" data-glyph="${n.glyph}">`:ct(`<svg class="ic"><use href="#i-${n.glyph||"box"}"/></svg>`)}
          <span class="gal-zoom-hint" aria-hidden="true">${c("search")} ${e("pdp.zoomHint")}</span>
        </div>
        ${$.length>1?r`<div class="gal-thumbs">${$.map((P,tt)=>r`
          <button type="button" class="gal-thumb ${tt===0?"active":""}" data-thumb="${tt}" aria-label="${tt+1}">
            ${P.kind==="video"?ct(`<span class="gt-video">${P.poster?`<img src="${P.poster}" alt="" loading="lazy">`:""}<svg class="ic"><use href="#i-play"/></svg></span>`):r`<img src="${P.url}" alt="" loading="lazy">`}
          </button>`)}</div>`:""}
        <div class="row row-wrap">
          ${B("wishlist")?r`<button type="button" class="btn btn-ghost btn-sm ${os(n.id)?"btn-danger":""}" data-act="wish-toggle" data-id="${n.id}">${c("heart")} ${os(n.id)?e("card.wishlistRemove"):e("card.wishlistAdd")}</button>`:""}
          ${B("compare")?r`<button type="button" class="btn btn-ghost btn-sm ${mn(n.id)?"active":""}" data-act="compare-toggle" data-id="${n.id}">${c("scale")} ${e("compare.add")}</button>`:""}
          <button type="button" class="btn btn-ghost btn-sm" data-act="share" data-title="${ft(n)}">${c("share")} ${e("pdp.share")}</button>
        </div>
      </div>

      <div class="buy-box">
        ${n.brandName?r`<div class="pc-brand">${q()?n.brandName:n.brandNameEn||n.brandName}</div>`:""}
        <h1 class="buy-title">${ft(n)}</h1>
        ${!q()&&n.name?r`<div class="buy-title-en">${n.name}</div>`:""}
        <div class="row row-wrap mt-s">
          <a href="#/products?cat=${n.categoryId}" class="badge-pill bp-accent">${c(Ci(n.glyph))} ${Et(b[b.length-1])}</a>
          <a href="#/products?authenticity=${n.authenticity||"generic"}" class="badge-pill ${n.authenticity==="original"?"bp-success":n.authenticity==="highcopy"?"bp-warn":"bp-muted"}">${e(`auth.${n.authenticity||"generic"}`)}</a>
          ${n.featured?r`<a href="#/products?sort=popular" class="badge-pill bp-violet">${c("star")} ${e("home.featured")}</a>`:""}
        </div>
        <div class="pc-rate mt-s">${Ht(n.ratingAvg)} <span class="muted small">${g(p.avg||n.ratingAvg)} · ${g(p.count||n.ratingCount)} ${e("common.reviews")}</span></div>

        <div class="buy-price">
          ${n.oldPrice>n.price?r`<span class="pc-old">${A(n.oldPrice)}</span>`:""}
          ${n.price?r`<span class="buy-now">${A(n.price)}</span>`:r`<span class="buy-now pc-inquire">${e("price.inquire")}</span>`}
          ${n.discountPct>0?r`<span class="pc-off">${g(n.discountPct)}٪</span>`:""}
        </div>
        ${n.oldPrice>n.price?r`<p class="hint">${e("pdp.save")}: ${A(n.oldPrice-n.price)}</p>`:""}

        <div class="pc-stock ${w<=0?"out":w<=3?"low":""} mt-s">
          <span class="dot"></span>
          ${w<=0?e("card.outOfStock"):e("pdp.stockCount",{n:g(w)})}
          ${w>0&&w<=3?r` <span class="badge-pill bp-warn">${e("common.lowStock")}</span>`:""}
        </div>

        ${n.price?r`
        <div class="row mt">
          ${bs({value:1,max:Math.max(1,w),name:"qty"})}
          <button type="button" class="btn btn-primary btn-lg grow" data-act="pdp-add" data-id="${n.id}" ${w<=0?"disabled":""}>${c("cart")} ${e("pdp.addToCart")}</button>
        </div>
        <button type="button" class="btn btn-outline btn-block mt-s" data-act="pdp-buy" data-id="${n.id}" ${w<=0?"disabled":""}>${c("zap")} ${e("pdp.buyNow")}</button>`:r`
        <div class="row mt">
          ${k?r`<a class="btn btn-primary btn-lg grow" href="tel:${k}">${c("phone")} ${e("pdp.callStore")}</a>`:""}
          <a class="btn btn-outline btn-lg" href="#/pages/contact">${c("map")} ${e("pdp.visitStore")}</a>
        </div>
        <p class="hint mt-s">${c("info")} ${e("pdp.serviceHint")}</p>`}
        ${n.price&&k?r`<a class="btn btn-ghost btn-block mt-s" href="tel:${k}">${c("phone")} ${e("pdp.callStore")}: <bdi>${at(k)}</bdi></a>`:""}

        ${w<=0&&B("priceAlerts")?r`
          <button type="button" class="btn btn-ghost btn-block mt-s ${rs(n.id)?"active":""}" data-act="notify-me" data-id="${n.id}">
            ${c("bell")} ${rs(n.id)?e("common.notified"):e("common.notifyMe")}
          </button>`:""}

        <div class="divider"></div>
        <ul class="col">
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("store")}</span><span class="small">${e("pdp.pickup")}</span></li>
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("truck")}</span><span class="small">${e("checkout.courier")}: ${C.map(P=>`${q()?P.name:P.nameEn} ${g(P.fee)}`).join(" \xB7 ")}</span></li>
          ${B("insurance")?r`<li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("scale")}</span><span class="small">${e("checkout.insuranceDesc")}</span></li>`:""}
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("shield")}</span><span class="small">${n.warrantyMonths>0?e("pdp.warrantyMonths",{n:g(n.warrantyMonths)}):e("pdp.noWarranty")}</span></li>
        </ul>

        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${e("pdp.sku")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.sku}">${n.sku}</button></span>
          ${n.barcode?r`<span>${e("pdp.barcode")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.barcode}">${n.barcode}</button></span>`:""}
        </div>
        <div class="row row-between small muted mt-s">
          <span>${c("eye")} ${g(n.views)} ${e("pdp.viewed")}</span>
          <span>${c("package-check")} ${g(n.sold)} ${e("pdp.sold")}</span>
        </div>
      </div>
    </div>

    ${je("product_page",le("product_page"))}

    <section class="section card">
      <div class="tabs" role="tablist">
        <button type="button" class="tab active" data-tab="specs" role="tab">${e("pdp.specs")}</button>
        <button type="button" class="tab" data-tab="desc" role="tab">${e("pdp.description")}</button>
        ${B("reviews")?r`<button type="button" class="tab" data-tab="reviews" role="tab">${e("pdp.reviews")} (${g(p.count)})</button>`:""}
        ${B("questions")?r`<button type="button" class="tab" data-tab="questions" role="tab">${e("pdp.questions")} (${g(p.questions||l.length)})</button>`:""}
      </div>

      <div class="tab-panel" data-panel="specs">
        ${Object.keys(n.specs||{}).length?r`
          <table class="spec-table">
            <tbody>${Object.entries(n.specs).map(([P,tt])=>r`<tr><th>${h(P)}</th><td>${h(tt)}</td></tr>`)}</tbody>
          </table>`:r`<p class="muted">${e("common.noData")}</p>`}
        ${n.weight?r`<table class="spec-table mt-s"><tbody><tr><th>${e("pdp.weight")}</th><td>${g(n.weight)} ${e("pdp.gram")}</td></tr></tbody></table>`:""}
        ${(n.tags||[]).length?r`<div class="row row-wrap mt">${n.tags.map(P=>r`<a class="tag" href="#/products?q=${encodeURIComponent(P)}">#${P}</a>`)}</div>`:""}
      </div>

      <div class="tab-panel" data-panel="desc" hidden>
        <div class="rev-body">${Xs(q()?n.description||"":n.descriptionEn||n.description||"")}</div>
        ${!q()&&n.descriptionEn?"":n.descriptionEn?r`<div class="rev-body muted mt-s" dir="ltr">${h(n.descriptionEn)}</div>`:""}
      </div>

      ${B("reviews")?r`
      <div class="tab-panel" data-panel="reviews" hidden>
        <div class="rev-summary mb">
          <div class="rev-score">
            <div class="n">${g(p.avg||0)}</div>
            ${Ht(p.avg||0)}
            <div class="muted small mt-s">${g(p.count)} ${e("common.reviews")}</div>
          </div>
          <div class="rev-bars">
            ${[5,4,3,2,1].map(P=>{var tt,kt;return r`
              <div class="rev-bar"><span>${g(P)}★</span><span class="track"><span class="fill" data-w="${p.count?Math.round((((tt=p.dist)==null?void 0:tt[P-1])||0)/p.count*100):0}%"></span></span><span>${g(((kt=p.dist)==null?void 0:kt[P-1])||0)}</span></div>`})}
          </div>
        </div>
        <div data-reviews>
          ${i.length?i.map(Fo).join(""):r`<p class="muted">${e("pdp.noReviews")}</p>`}
        </div>
        <div class="divider"></div>
        ${m.me?r`
          <form data-act="review-submit" data-pid="${n.id}">
            <strong>${e("pdp.writeReview")}</strong>
            <div class="mt-s">${hs({name:"rating",value:5})}</div>
            <label class="field mt-s"><span class="label">${e("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${e("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${e("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${e("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${e("nav.login")}</a></span></p>`}
      </div>`:""}

      ${B("questions")?r`
      <div class="tab-panel" data-panel="questions" hidden>
        <div data-questions>
          ${l.length?l.map(Fo).join(""):r`<p class="muted">${e("pdp.noQuestions")}</p>`}
        </div>
        <div class="divider"></div>
        ${m.me?r`
          <form data-act="question-submit" data-pid="${n.id}">
            <strong>${e("pdp.askQuestion")}</strong>
            <label class="field mt-s"><span class="label">${e("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${e("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${e("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${e("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${e("nav.login")}</a></span></p>`}
      </div>`:""}
    </section>

    ${d.length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("layers")} ${e("pdp.related")}</h2></div></div>
      ${jt(d.slice(0,5))}
    </section>`:""}

    ${m.recent.filter(P=>P!==n.id).length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${e("misc.recentlyViewed")}</h2></div></div>
      <div data-recent></div>
    </section>`:""}

    <div class="pdp-bar no-print">
      <div class="pdp-bar-p">
        ${n.price?r`<div class="b">${A(n.price)}</div>`:r`<div class="b pc-inquire">${e("price.inquireShort")}</div>`}
        ${(n.oldPrice||0)>n.price?r`<div class="tiny muted del">${A(n.oldPrice)}</div>`:""}
      </div>
      ${n.price?(n.stock||0)>0?r`<button class="btn btn-primary" data-act="pdp-add" data-id="${n.id}">${c("cart")} ${e("pdp.addToCart")}</button>`:r`<button class="btn btn-ghost" data-act="notify-me" data-id="${n.id}">${c("bell")} ${e("common.notifyMe")}</button>`:k?r`<a class="btn btn-primary" href="tel:${k}">${c("phone")} ${e("pdp.callStore")}</a>`:r`<a class="btn btn-primary" href="#/pages/contact">${c("chat")} ${e("nav.contact")}</a>`}
    </div>
  `}function Ci(t){return{cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box"}[t]||"box"}function Fo(t){return r`
    <div class="review" data-rid="${t.id}">
      <div class="rev-head">
        <span class="rev-who">${h(t.userName)}</span>
        <span class="badge-pill ${t.userBadge==="buyer"?"bp-success":"bp-muted"}">${t.userBadge==="buyer"?e("pdp.buyerBadge"):e("pdp.visitorBadge")}</span>
        ${t.rating?Ht(t.rating):""}
        <span class="rev-date">${O(t.createdAt,{time:!1})}</span>
      </div>
      <div class="rev-title">${h(t.title)}</div>
      <div class="rev-body">${h(t.body)}</div>
      ${t.reply?r`<div class="rev-reply"><strong>${e("pdp.storeReply")}:</strong> ${h(t.reply)}</div>`:""}
      <div class="rev-actions">
        <button type="button" class="link-btn" data-act="review-like" data-id="${t.id}">${c("heart")} ${e("pdp.helpful")} (${g(t.likes||0)})</button>
      </div>
    </div>`}function Ai(t){var l,p;let a=t.querySelector(".gal-main");if(!a||!((p=(l=window.matchMedia)==null?void 0:l.call(window,"(hover: hover) and (pointer: fine)"))!=null&&p.matches))return;let s=2.6,n=null,o=null,i=()=>{n&&(n.style.display="none")};a.addEventListener("mousemove",d=>{let b=a.querySelector("img");if(!b||!b.currentSrc){i();return}let u=a.getBoundingClientRect(),v=d.clientX-u.left,$=d.clientY-u.top;if(v<0||$<0||v>u.width||$>u.height){i();return}n||(n=document.createElement("div"),n.className="gal-lens",n.setAttribute("aria-hidden","true"),o=document.createElement("img"),o.alt="",n.appendChild(o),a.appendChild(n));let w=Math.max(120,Math.min(190,Math.round(u.width*.46)));n.style.width=`${w}px`,n.style.height=`${w}px`,n.style.display="block",n.style.left=`${Math.max(-w*.15,Math.min(u.width-w*.85,v-w/2))}px`,n.style.top=`${Math.max(-w*.15,Math.min(u.height-w*.85,$-w/2))}px`;let k=u.width*s,C=u.height*s;o.src=b.currentSrc,o.style.width=`${k}px`,o.style.height=`${C}px`;let H=Math.max(w/2,Math.min(k-w/2,v/u.width*k)),F=Math.max(w/2,Math.min(C-w/2,$/u.height*C));o.style.left=`${w/2-H}px`,o.style.top=`${w/2-F}px`}),a.addEventListener("mouseleave",i),a.addEventListener("click",i)}function Di(t,a){N(t),bn(a.params.id),Sn(t),Ai(t);let s=t.querySelector(".gal-main");if(s){let o=null,i=!1;s.addEventListener("click",l=>{i&&(i=!1,l.stopPropagation(),l.preventDefault())},!0),s.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(o=l.clientX)},{passive:!0}),s.addEventListener("pointerup",l=>{var u,v;if(o==null||l.pointerType!=="touch")return;let p=l.clientX-o;if(o=null,Math.abs(p)<48)return;i=!0;let d=JSON.parse(((u=t.querySelector("[data-imgs]"))==null?void 0:u.dataset.imgs)||"[]");if(d.length<2)return;let b=Number(t.querySelector("[data-imgs]").dataset.i||0);b=(b+(p<0?1:-1)+d.length)%d.length,(v=t.querySelector(`[data-thumb="${b}"]`))==null||v.click()},{passive:!0})}t.querySelectorAll("[data-thumb]").forEach(o=>o.addEventListener("click",()=>{var b;let i=Number(o.dataset.thumb),l=JSON.parse(t.querySelector("[data-imgs]").dataset.imgs||"[]"),p=t.querySelector(".gal-main"),d=l[i];if(p&&d)if((b=p.querySelector("img, video"))==null||b.remove(),d.kind==="video"){let u=document.createElement("video");u.src=d.url,u.controls=!0,u.playsInline=!0,u.preload="metadata",u.className="gal-video",d.poster&&(u.poster=d.poster),p.prepend(u)}else{let u=document.createElement("img");u.src=d.url,u.alt="",p.prepend(u)}t.querySelectorAll("[data-thumb]").forEach(u=>u.classList.toggle("active",u===o)),t.querySelector("[data-imgs]").dataset.i=String(i)})),y("pdp-add",async(o,i)=>{var p;let l=Number(((p=t.querySelector(".qty input"))==null?void 0:p.value)||1);await D(i,async()=>{try{let{addToCart:d}=await Promise.resolve().then(()=>(K(),qa));await d(i.dataset.id,l),E(e("card.added"),{timeout:2400})}catch(d){S(d)}})}),y("pdp-buy",async(o,i)=>{var p;let l=Number(((p=t.querySelector(".qty input"))==null?void 0:p.value)||1);try{let{addToCart:d}=await Promise.resolve().then(()=>(K(),qa));await d(i.dataset.id,l),bt("#/checkout")}catch(d){S(d)}}),y("review-like",async(o,i)=>{if(!m.me){bt("#/auth");return}try{let l=await f.post(`/api/reviews/${i.dataset.id}/like`);i.innerHTML=r`${c("heart")} ${e("pdp.helpful")} (${g(l.likes)})`}catch(l){S(l)}}),y("review-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await D(i.querySelector("button[type=submit]"),async()=>{try{let p=await f.post("/api/reviews",{productId:i.dataset.pid,type:"review",rating:Number(l.get("rating")||0),title:l.get("title"),body:l.get("body")});E(p.message||e("pdp.reviewSubmitted"),{timeout:5e3}),i.reset()}catch(p){S(p)}})}),y("question-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await D(i.querySelector("button[type=submit]"),async()=>{try{let p=await f.post("/api/reviews",{productId:i.dataset.pid,type:"question",title:l.get("title"),body:l.get("body")});E(p.message||e("pdp.questionSubmitted"),{timeout:5e3}),i.reset()}catch(p){S(p)}})});let n=t.querySelector("[data-recent]");return n&&m.recent.length&&f.get("/api/products?limit=60").then(o=>{let l=m.recent.filter(p=>p!==a.params.id).slice(0,5).map(p=>o.items.find(d=>d.id===p)).filter(Boolean);n.innerHTML=jt(l),N(n)}).catch(()=>{}),()=>{}}var Pi,jo=W(()=>{z();G();Z();K();dt();et();ut();nt();Pi=t=>t.params.id});function Mi(t){return new Promise((a,s)=>{let n=new Image;n.onload=()=>a(n),n.onerror=()=>s(new Error("image-load")),n.src=t})}async function fs(t){let a=await Mi(t),s=document.createElement("canvas");s.width=9,s.height=8;let n=s.getContext("2d",{willReadFrequently:!0});n.drawImage(a,0,0,9,8);let o=n.getImageData(0,0,9,8).data,i=w=>.299*o[w]+.587*o[w+1]+.114*o[w+2],l="";for(let w=0;w<8;w++)for(let k=0;k<8;k++){let C=i((w*9+k)*4),H=i((w*9+k+1)*4);l+=C>H?"1":"0"}let p="";for(let w=0;w<64;w+=4)p+=parseInt(l.slice(w,w+4),2).toString(16);let d=document.createElement("canvas");d.width=8,d.height=8;let b=d.getContext("2d",{willReadFrequently:!0});b.drawImage(a,0,0,8,8);let u=b.getImageData(0,0,8,8).data,v=new Array(64).fill(0);for(let w=0;w<64;w++){let k=u[w*4]>>6,C=u[w*4+1]>>6,H=u[w*4+2]>>6;v[k<<4|C<<2|H]++}let $=v.reduce((w,k)=>w+k,0)||1;return{dhash:p,hist:v.map(w=>Math.round(w/$*1e3)/1e3)}}var An=W(()=>{});var zo={};X(zo,{mount:()=>Ni,render:()=>Li,title:()=>Ii});async function Li(){return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("camera")} ${e("search.imageTitle")}</h1>
      <p class="section-sub">${e("search.imageText")}</p>
    </div></div>

    <div class="card t-center" data-drop>
      <span class="empty-ic">${c("image")}</span>
      <p class="muted">${e("search.imageHint")}</p>
      <div class="row center row-wrap mt">
        <label class="btn btn-primary">${c("upload")} ${e("search.pickFile")}
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file hidden>
        </label>
        <label class="btn btn-ghost">${c("camera")} ${e("search.takePhoto")}
          <input type="file" accept="image/*" capture="environment" data-file hidden>
        </label>
      </div>
      <div class="mt" data-preview hidden>
        <img class="si-preview" data-pimg alt="">
      </div>
    </div>

    <section class="section" data-results hidden></section>`}function Ni(t){N(t);let a=t.querySelector("[data-drop]"),s=t.querySelector("[data-results]"),n=async o=>{if(!o)return;if(!/^image\//.test(o.type)){S({code:"invalid_type",message:e("err.generic")});return}if(o.size>4*1024*1024){S({code:"payload_too_large",message:e("err.generic")});return}let i=await Ie(o),l=t.querySelector("[data-preview]");l.hidden=!1,t.querySelector("[data-pimg]").src=i,s.hidden=!1,s.innerHTML=r`<div class="row center">${c("refresh")} ${e("search.imageIndexing")}</div>`,await D(null,async()=>{var p;try{let d=await fs(i),b=await f.post("/api/search/image",d);if(!b.indexed){s.innerHTML=L({icon:"image",title:e("search.imageNoIndex"),text:e("adm.isHint")});return}if(!((p=b.items)!=null&&p.length)){s.innerHTML=L({icon:"search",title:e("search.imageNoMatch"),action:{href:"#/products",label:e("cart.goShopping")}});return}s.innerHTML=r`
          <div class="section-head"><div><h2 class="section-title">${c("sparkles")} ${g(b.items.length)} ${e("common.results")}</h2></div></div>
          ${jt(b.items.map(u=>zt(mt({},u),{match:u.matchScore})))}
          <div class="row row-wrap mt-s">${b.items.map(u=>{var v;return r`<span class="chip">${(v=u.name)==null?void 0:v.slice(0,24)}… ${g(u.matchScore)}٪</span>`})}</div>`}catch(d){s.innerHTML=L({icon:"alert",title:e("err.generic")}),S(d)}})};return t.querySelectorAll("[data-file]").forEach(o=>o.addEventListener("change",()=>{var i;return n((i=o.files)==null?void 0:i[0])})),["dragover","dragenter"].forEach(o=>a.addEventListener(o,i=>{i.preventDefault(),a.classList.add("drag")})),["dragleave","drop"].forEach(o=>a.addEventListener(o,i=>{i.preventDefault(),a.classList.remove("drag")})),a.addEventListener("drop",o=>{var i,l;return n((l=(i=o.dataTransfer)==null?void 0:i.files)==null?void 0:l[0])}),null}var Ii,Uo=W(()=>{z();G();Z();An();et();dt();Ii=()=>e("search.imageTitle")});var _o={};X(_o,{mount:()=>Hi,render:()=>Ri,title:()=>Fi});async function Ri(){var a;await Mt().catch(()=>{});let t=m.cart;return(a=t.items)!=null&&a.length?r`
    <div class="section-head">
      <div><h1 class="section-title">${c("cart")} ${e("cart.title")}</h1>
      <p class="section-sub">${g(t.count)} ${e("common.items")}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${c("trash")} ${e("cart.clear")}</button>
    </div>
    ${je("cart",le("cart"))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${t.items.map(Bi).join("")}
      </div>
      <aside class="summary card">
        <strong>${e("cart.summary")}</strong>
        <div class="sum-row"><span>${e("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
        <div data-coupon-row>
          ${t.coupon?r`<div class="sum-row discount"><span>${e("common.discountCode")}: ${t.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${e("cart.removeCoupon")}</button></span></div>`:""}
        </div>
        <div data-shipbar>${Io(t.subtotal)}</div>
        ${t.coupon?"":r`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${e("cart.couponPlaceholder")}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${e("cart.applyCoupon")}</button>
          </form>`}
        <div class="sum-row total"><span>${e("common.payable")}</span><span class="v" data-total>${A(t.subtotal-(t.couponDiscount||0))}</span></div>
        <p class="hint">${e("checkout.concurrencyNote")}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${e("cart.continue")} ${c("chevron-left")}</a>
      </aside>
    </div>`:r`
      <div class="section-head"><div><h1 class="section-title">${c("cart")} ${e("cart.title")}</h1></div></div>
      ${L({icon:"cart",title:e("cart.empty"),text:e("cart.emptyText"),action:{href:"#/products",label:e("cart.goShopping")}})}`}function Bi(t){var s;let a=t.product;return r`
    <div class="cart-line" data-line="${a.id}">
      <a class="cl-img" href="#/product/${a.id}">${(s=a.images)!=null&&s[0]?r`<img src="${a.images[0]}" alt="${ft(a)}" loading="lazy" data-glyph="${a.glyph}">`:c(a.glyph||"box")}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${a.id}">${ft(a)}</a>
        <div class="cl-meta">${a.brandName?`${a.brandName} \xB7 `:""}${A(a.price)} / ${e("common.unit")}</div>
        ${t.available<t.requestedQty?r`<div class="err mt-s">${c("alert")} ${e("common.lowStock")} (${g(t.available)})</div>`:""}
        <div class="cl-foot">
          <span data-qtybox>${bs({value:t.qty,max:Math.max(1,t.available),name:"qty"})}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${a.id}">${c("trash")} ${e("cart.remove")}</button>
          <span class="cl-price">${A(t.lineTotal)}</span>
        </div>
      </div>
    </div>`}function Hi(t){return N(t),t.querySelectorAll(".qty input").forEach(a=>{a.addEventListener("change",async()=>{let n=a.closest("[data-line]").dataset.line,o=Math.max(1,Number(a.value)||1);try{await nn(n,o),it(e("cart.updated"),{timeout:1500}),Promise.resolve().then(()=>(nt(),pe)).then(i=>i.refresh(!0))}catch(i){S(i),Promise.resolve().then(()=>(nt(),pe)).then(l=>l.refresh(!0))}})}),y("cart-remove",async(a,s)=>{try{await on(s.dataset.id),Promise.resolve().then(()=>(nt(),pe)).then(n=>n.refresh(!0))}catch(n){S(n)}}),y("cart-clear",async()=>{if(await wt({text:e("cart.clearConfirm"),danger:!0,okText:e("cart.clear")}))try{await rn(),Promise.resolve().then(()=>(nt(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}}),y("coupon-apply",async(a,s)=>{a.preventDefault();let n=s.querySelector("[name=code]").value.trim();n&&await D(s.querySelector("button"),async()=>{try{await ns(n),E(e("cart.couponApplied")),Promise.resolve().then(()=>(nt(),pe)).then(o=>o.refresh(!0))}catch(o){S(o)}})}),y("coupon-remove",async()=>{try{await ns(""),Promise.resolve().then(()=>(nt(),pe)).then(a=>a.refresh(!0))}catch(a){S(a)}}),null}var Fi,Wo=W(()=>{z();G();Z();K();dt();et();ut();nt();Fi=()=>e("cart.title")});var Yo={};X(Yo,{mount:()=>ji,render:()=>Oi,title:()=>Ui});async function Oi(t){var o,i,l,p,d,b;if(await Mt().catch(()=>{}),!((o=m.cart.items)!=null&&o.length))return L({icon:"cart",title:e("cart.empty"),text:e("cart.emptyText"),action:{href:"#/products",label:e("cart.goShopping")}});if(!m.me)return L({icon:"user",title:e("checkout.loginRequired"),action:{href:"#/auth?next=checkout",label:e("nav.login")}});if(m.me.kycStatus!=="approved")return L({icon:"shield-alert",title:"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0646\u0627\u0642\u0635 \u0627\u0633\u062A",text:"\u062C\u0647\u062A \u062C\u0644\u0648\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062A\u0642\u0644\u0628 \u0648 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u06CC\u060C \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0647\u0648\u06CC\u062A \u0627\u0633\u062A.",action:{href:"#/account/kyc",label:"\u062A\u06A9\u0645\u06CC\u0644 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A"}});let a=ve(),s=a.zones||[],n=((i=m.me)==null?void 0:i.addresses)||[];try{let u=await f.post("/api/checkout/quote",{delivery:"courier",zone:((l=s[0])==null?void 0:l.id)||"country",express:!1,insurance:!1});sa=u.quote,Pa=(u.paymentMethods||[]).filter(v=>m.me?!0:v.id==="cod"||v.id==="gateway"),Pa.length||(Pa=[{id:"cod",fa:"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",en:"Cash on delivery",note:""}])}catch(u){sa=null}return r`
    <div class="section-head"><div><h1 class="section-title">${c("card")} ${e("checkout.title")}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${e("checkout.step1")}</span>
      <span class="cstep"><span class="n">2</span> ${e("checkout.step2")}</span>
      <span class="cstep"><span class="n">3</span> ${e("checkout.step3")}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${c("truck")} ${e("checkout.delivery")}</strong>
          <div class="col">
            <label class="radio-card">
              <input type="radio" name="delivery" value="pickup" ${a.pickupEnabled===!1?"disabled":""} ${m.me?"":"checked"}>
              <span class="dot"></span>
              <span><span class="b">${e("checkout.pickup")}</span><span class="hint" >${e("checkout.pickupDesc")} ${e("checkout.pickupReady",{h:g(a.handlingHours||24)})}</span></span>
            </label>
            <label class="radio-card${m.me?"":" disabled"}">
              <input type="radio" name="delivery" value="courier" ${m.me?"checked":"disabled"} ${a.courierEnabled===!1?"disabled":""}>
              <span class="dot"></span>
              <span><span class="b">${e("checkout.courier")}</span><span class="hint">${e("checkout.courierDesc")}${m.me?"":` \u2014 ${e("checkout.guestCourierNote")}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            <label class="field"><span class="label">${e("checkout.zone")}</span>
              <select class="select" name="zone">
                ${s.map(u=>r`<option value="${u.id}">${q()?u.name:u.nameEn} — ${g(u.fee)} ${e("common.toman")} · ${q()?u.eta:""}</option>`)}
              </select>
            </label>
            ${a.expressEnabled?yt({label:e("checkout.express"),desc:`${g(a.expressFee||0)} ${e("common.toman")}${Zt()?` \xB7 ${e("acc.plus")}: \u2212${g(a.expressDiscountPct||50)}\u066A`:""}`,name:"express"}):""}
            ${B("insurance")?yt({label:e("checkout.insuranceOpt"),desc:Zt()&&((d=(p=m.settings)==null?void 0:p.plus)!=null&&d.autoInsurance)?e("checkout.insuranceAuto"):e("checkout.insuranceDesc"),name:"insurance",checked:Zt()}):""}

            <div class="divider"></div>
            <strong class="row mb-s">${c("pin")} ${e("checkout.address")}</strong>
            ${m.me?n.length?r`
              <div class="col" data-addresses>
                ${n.map((u,v)=>r`
                  <label class="addr-card">
                    <input type="radio" name="addressId" value="${u.id}" ${u.isDefault||v===0?"checked":""}>
                    <span class="dot"></span>
                    <span>
                      <span class="b">${h(u.title||e("common.address"))}</span>
                      <span class="hint">${h(u.receiver||"")} · ${at(u.phone||"")}<br>${h(u.street||"")}${u.city?`\u060C ${h(u.city)}`:""}${u.postal?` \xB7 ${h(u.postal)}`:""}</span>
                    </span>
                  </label>`)}
              </div>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${e("checkout.addAddress")}</button>
            `:r`
              <p class="notice notice-warn">${c("alert")}<span>${e("checkout.noAddress")}</span></p>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${e("checkout.addAddress")}</button>
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
          <strong class="row mb-s">${c("user")} ${e("checkout.guestInfo")}</strong>
          <p class="hint mb-s">${e("checkout.guestHint")}</p>
          <div class="form-grid">
            ${x({label:e("checkout.guestName"),name:"guestName",required:!0,autocomplete:"name"})}
            ${x({label:e("checkout.guestPhone"),name:"guestPhone",type:"tel",required:!0,autocomplete:"tel",attrs:'inputmode="numeric" maxlength="11" placeholder="09xxxxxxxxx"',hint:e("checkout.guestPhoneHint")})}
          </div>
        </section>`}

        <section class="card">
          <strong class="row mb-s">${c("wallet")} ${e("checkout.paymentMethod")}</strong>
          <div class="col" data-paymethods>
            ${(Pa.length?Pa:[{id:"gateway",fa:"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",en:"Bank gateway",note:""}]).map((u,v)=>r`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${u.id}" ${v===0?"checked":""} ${["snapppay","azki","digipay"].includes(u.id)&&(!m.me||m.me.kycStatus!=="approved")?"disabled":""}>
                <span class="dot"></span>
                <span><span class="b">${q()?u.fa:u.en}</span><span class="hint">${h(u.note||"")}${u.id==="gateway"&&an().gatewayMode==="demo"?` \u2014 ${e("checkout.gatewayDemo")}`:""}${["snapppay","azki","digipay"].includes(u.id)&&(!m.me||m.me.kycStatus!=="approved")?' <span style="color:var(--danger)">(\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A)</span>':""}</span></span>
              </label>`)}
          </div>
          ${m.me?"":r`<p class="hint mt-s" data-guest-cod-note hidden>${e("checkout.guestCodPickup")}</p>`}
          ${m.me&&B("wallet")&&(((b=m.me.wallet)==null?void 0:b.balance)||0)>0?yt({label:e("checkout.useWallet"),desc:e("checkout.walletBalance",{amount:g(m.me.wallet.balance)}),name:"useWallet",checked:!0}):""}
          <label class="field mt"><span class="label">${e("checkout.note")}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${e("checkout.notePlaceholder")}"></textarea></label>
        </section>

        <section class="card">
          ${Ue({label:r`${e("checkout.acceptTerms")} <a class="section-link" href="#/pages/terms">${e("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}
          <p class="hint mt-s">${e("checkout.concurrencyNote")}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${e("cart.summary")}</strong>
        <div data-quote>${sa?qn(sa):r`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${c("check")} ${e("checkout.placeOrder")}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${c("chevron-right")} ${e("cart.title")}</a>
      </aside>
    </form>`}async function Vo(t){var s;let a=new FormData(t);try{sa=(await f.post("/api/checkout/quote",{delivery:a.get("delivery")||"courier",zone:a.get("zone")||"country",express:a.get("express")==="on",insurance:a.get("insurance")==="on"})).quote;let o=t.querySelector("[data-quote]");o&&(o.innerHTML=qn(sa));let i=t.querySelector("[data-courier-opts]"),l=a.get("delivery");if(i&&(i.hidden=l!=="courier"),!m.me){let p=t.querySelector('input[name="paymentMethod"][value="cod"]');if(p){p.disabled=l==="pickup",(s=p.closest(".radio-card"))==null||s.classList.toggle("disabled",l==="pickup");let d=t.querySelector("[data-guest-cod-note]");if(d&&(d.hidden=l!=="pickup"),p.disabled&&p.checked){let b=t.querySelector('input[name="paymentMethod"][value="gateway"]');b&&(b.checked=!0)}}}}catch(n){}}function ji(t){N(t);let a=t.querySelector('form[data-act="checkout-submit"]');if(!a)return null;let s=ta(()=>Vo(a),220);return a.addEventListener("change",s),Vo(a),y("addr-add",()=>zi()),y("checkout-submit",async(n,o)=>{n.preventDefault();let i=new FormData(o);if(!i.get("acceptTerms")){V(e("form.termsRequired"));return}if(m.me&&i.get("delivery")==="courier"&&!i.get("addressId")){V(e("checkout.noAddress"));return}if(!m.me&&i.get("delivery")==="courier"&&(!i.get("guestProvince")||!i.get("guestCity")||!i.get("guestAddress"))){V(q()?"\u0644\u0637\u0641\u0627\u064B \u0622\u062F\u0631\u0633 \u067E\u0633\u062A\u06CC \u0631\u0627 \u06A9\u0627\u0645\u0644 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.":"Please enter your shipping address.");return}if(!m.me){if(!String(i.get("guestName")||"").trim()){V(e("checkout.guestNameRequired"));return}if(!/^09\d{9}$/.test(String(i.get("guestPhone")||"").replace(/[\s-]/g,""))){V(e("checkout.guestPhoneInvalid"));return}}await D(o.querySelector("button[type=submit]"),async()=>{try{let l=await f.post("/api/checkout",{delivery:i.get("delivery"),zone:i.get("zone"),express:i.get("express")==="on",insurance:i.get("insurance")==="on",paymentMethod:i.get("paymentMethod")||"gateway",useWallet:i.get("useWallet")==="on",note:i.get("note")||"",addressId:i.get("addressId")||"",guestName:m.me?"":String(i.get("guestName")||"").trim(),guestPhone:m.me?"":String(i.get("guestPhone")||"").replace(/[\s-]/g,""),acceptTerms:!0});l.me&&(m.me=l.me,te());try{sessionStorage.setItem("bm_last_order",JSON.stringify(l.order))}catch(p){}await Mt(),l.needsPayment&&["gateway","snapppay","azki","digipay"].includes(l.paymentMethod)?bt(`#/pay/${l.order.id}`):bt(`#/checkout/done/${l.order.id}`)}catch(l){S(l),((l==null?void 0:l.code)==="stock_limit"||(l==null?void 0:l.code)==="product_unavailable")&&T(!0)}})}),null}function zi(){var t,a;if(!m.me){bt("#/auth?next=checkout");return}vs=pt({title:e("acc.addAddress"),body:r`
      <form data-act="addr-save" class="form-grid">
        ${x({label:e("acc.addrTitle"),name:"title",required:!0})}
        ${x({label:e("acc.addrReceiver"),name:"receiver",required:!0,value:m.me.name||""})}
        ${x({label:e("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:m.me.phone||""})}
        ${x({label:e("common.city"),name:"city",value:((a=(t=m.settings)==null?void 0:t.store)==null?void 0:a.city)||""})}
        ${x({label:e("common.postal"),name:"postal"})}
        ${x({label:e("acc.addrStreet"),name:"street",required:!0,span2:!0})}
        ${x({label:e("acc.addrNote"),name:"note",span2:!0})}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${c("check")}</span><span>${e("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${e("common.save")}</button>
      </form>`})}var sa,Pa,vs,Ui,Go=W(()=>{z();G();Z();K();dt();et();ut();nt();sa=null,Pa=[];vs=null;y("addr-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";try{let o=await f.post("/api/me/addresses",n);o.addresses&&m.me&&(m.me.addresses=o.addresses),E(e("acc.addrSaved")),vs==null||vs.close(),T(!0)}catch(o){S(o)}});Ui=()=>e("checkout.title")});var Ko={};X(Ko,{mount:()=>Vi,render:()=>Wi,title:()=>Yi});function _i(t){try{let a=JSON.parse(sessionStorage.getItem("bm_last_order")||"null");return a&&a.id===t?a:null}catch(a){return null}}async function Wi(t){var o,i;let a=t.params.id,s=_i(a);if(!s&&m.me)try{s=(await f.get(`/api/me/orders/${encodeURIComponent(a)}`)).order}catch(l){}if(!s)return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h1 class="mt-s">${e("checkout.successTitle")}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${e("acc.orders")}</a>
    </div>`;let n=((o=s.payment)==null?void 0:o.status)==="paid";return r`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${c("check-circle")}</span>
      <h1 class="mt-s">${e("checkout.successTitle")}</h1>
      <p class="muted">${e("checkout.successText",{code:s.code})}</p>
      <div class="row center row-wrap mt">
        ${$e(s.status)} ${ze(s.payment)}
        <span class="badge-pill bp-accent">${A(s.total)}</span>
      </div>
      ${!n&&((i=s.payment)==null?void 0:i.method)==="gateway"?r`
        <a class="btn btn-success btn-lg mt" href="#/pay/${s.id}">${c("card")} ${e("checkout.payNow")}</a>`:""}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${s.id}">${c("package-check")} ${e("acc.trackOrder")}</a>
        <a class="btn btn-primary" href="#/products">${c("cart")} ${e("cart.goShopping")}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${ea(s)}</div>
    </div>`}function Vi(t){return N(t),null}var Yi,Qo=W(()=>{z();G();Z();K();dt();Yi=()=>e("checkout.successTitle")});var Jo={};X(Jo,{mount:()=>Ki,render:()=>Gi,title:()=>Qi});async function Gi(t){var l,p,d,b,u,v,$;let a=t.params.id,s=null;try{s=(await f.get(`/api/me/orders/${encodeURIComponent(a)}`)).order}catch(w){}if(!s)return L({icon:"alert",title:e("err.notFound"),action:{href:"#/account/orders",label:e("acc.orders")}});if(((l=s.payment)==null?void 0:l.status)==="paid")return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h2 class="mt-s">${e("checkout.paymentSuccess")}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${s.id}">${e("acc.trackOrder")}</a>
    </div>`;let n=(p=s.payable)!=null?p:s.total,o=["snapppay","azki","digipay"].includes((d=s.payment)==null?void 0:d.method),i="";return((b=s.payment)==null?void 0:b.method)==="snapppay"?i="\u0627\u0633\u0646\u067E\u200C\u067E\u06CC":((u=s.payment)==null?void 0:u.method)==="azki"?i="\u0627\u0632\u06A9\u06CC\u200C\u0648\u0627\u0645":((v=s.payment)==null?void 0:v.method)==="digipay"&&(i="\u062F\u06CC\u062C\u06CC\u200C\u067E\u06CC"),r`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${c("card")}</span>
        <h1 class="mt-s">${o?"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0642\u0633\u0627\u0637\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 "+i:e("common.payment")}</h1>
        <p class="muted">${e("acc.orderCode")}: <span class="mono b">${s.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${A(n)}</span></div>
        
        ${o?r`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${c("info")} شبیه‌ساز درگاه اقساطی (${i})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${i} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        `:r`
          <p class="notice notice-warn">${c("info")}<span>${e("checkout.gatewayDemo")}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="1">${c("check")} ${e("checkout.simulateSuccess")}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="0">${c("close")} ${e("checkout.simulateFail")}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${e("acc.orderDate")}: ${s.createdAt}</span>
          <span>${e("common.items")}: ${g((($=s.items)==null?void 0:$.length)||0)}</span>
        </div>
      </div>
    </div>`}function Ki(t){return N(t),null}var Qi,Xo=W(()=>{z();G();Z();K();dt();et();nt();ut();y("pay-sim",async(t,a)=>{let s=a.dataset.ok==="1";await D(a,async()=>{try{let n=await f.post(`/api/payments/simulate/${a.dataset.id}`,{success:s});await te(),await Mt(),s?(E(e("checkout.paymentSuccess")),bt(`#/checkout/done/${a.dataset.id}`)):(S({code:"payment_failed",message:e("checkout.paymentFailed"),details:"Payment failed"}),bt("#/account/orders"))}catch(n){S(n)}})});Qi=()=>e("common.payment")});var Zo={};X(Zo,{mount:()=>Xi,render:()=>Ji,title:()=>Zi});async function Ji(){let t=m.compare.slice(0,4);if(!t.length)return L({icon:"scale",title:e("compare.empty"),text:e("compare.emptyText"),action:{href:"#/products",label:e("cart.goShopping")}});let a=(await Promise.all(t.map(o=>f.get(`/api/products/${encodeURIComponent(o)}`).catch(()=>null)))).filter(Boolean).map(o=>o.product);if(!a.length)return L({icon:"scale",title:e("compare.empty")});let s=[...new Set(a.flatMap(o=>Object.keys(o.specs||{})))],n=(o,i)=>r`<tr><th class="t-start">${o}</th>${i.map(l=>r`<td>${l}</td>`)}</tr>`;return r`
    <div class="section-head"><div><h1 class="section-title">${c("scale")} ${e("compare.title")}</h1>
    <p class="section-sub">${g(a.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${e("common.product")}</th>${a.map(o=>{var i;return r`<th>
          <div class="col center">
            <a href="#/product/${o.id}">${(i=o.images)!=null&&i[0]?r`<img class="table-img" src="${o.images[0]}" alt="${ft(o)}" data-glyph="${o.glyph}">`:c(o.glyph)}</a>
            <span class="small">${ft(o)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${o.id}">${c("trash")} ${e("compare.remove")}</button>
          </div></th>`})}</tr></thead>
        <tbody>
          ${n(e("common.price"),a.map(o=>ct(A(o.price))))}
          ${n(e("common.brand"),a.map(o=>q()?o.brandName:o.brandNameEn||o.brandName||"\u2014"))}
          ${n(e("common.stock"),a.map(o=>o.stock>0?r`<span class="badge-pill bp-success">${g(o.stock)}</span>`:r`<span class="badge-pill bp-danger">${e("card.outOfStock")}</span>`))}
          ${n(e("common.rating"),a.map(o=>o.ratingCount?r`${Ht(o.ratingAvg)} ${g(o.ratingAvg)}`:"\u2014"))}
          ${n(e("adm.pAuth"),a.map(o=>e(`auth.${o.authenticity||"generic"}`)))}
          ${n(e("pdp.warranty"),a.map(o=>o.warrantyMonths?e("pdp.warrantyMonths",{n:g(o.warrantyMonths)}):e("pdp.noWarranty")))}
          ${n(e("pdp.weight"),a.map(o=>o.weight?`${g(o.weight)} ${e("pdp.gram")}`:"\u2014"))}
          ${s.map(o=>n(o,a.map(i=>{var l;return((l=i.specs)==null?void 0:l[o])||"\u2014"})))}
          ${n("",a.map(o=>r`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${o.id}" ${o.stock<=0?"disabled":""}>${c("cart")} ${e("card.addToCart")}</button>`))}
        </tbody>
      </table>
    </div>`}function Xi(t){return N(t),null}var Zi,tr=W(()=>{z();G();Z();K();dt();Zi=()=>e("compare.title")});var er={};X(er,{render:()=>tl,title:()=>el});async function tl(){let t=null;try{t=await f.get("/api/lotteries")}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}let a=(t.items||[]).filter(n=>n.status==="active"),s=(t.items||[]).filter(n=>n.status!=="active");return a.length?r`
    <h1 class="section-title mb">${c("gift2")} ${e("lot.title")}</h1>
    <div class="cart-grid">
      ${a.map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${c("sparkles")} ${h(n.title)}</strong><span class="badge-pill bp-accent">${e("lot.active")}</span></div>
          <p class="mt-s">${e("lot.prize")}: <b>${h(n.prize)}</b></p>
          <p class="muted small">${e("lot.ends")}: ${O(n.endsAt)} · ${e("lot.entries")}: ${g(n.entries||0)}</p>
          ${n.myEntry?r`<div class="notice notice-success mt-s">${c("check")} ${e("lot.joined")}</div>`:n.entryMode==="manual"?r`<button class="btn btn-primary mt-s" data-act="lot-join" data-id="${n.id}">${c("gift2")} ${e("lot.join")}</button>`:r`<p class="hint mt-s">${e("lot.autoEntry")}</p>`}
        </div>`)}
      ${s.slice(0,6).map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${h(n.title)}</strong><span class="badge-pill bp-success">${e("lot.done")}</span></div>
          <p class="tiny muted mt-s">${e("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
        </div>`)}
    </div>`:r`
      <div class="card lot-soon">
        <span class="lot-ic">${c("gift2")}</span>
        <h1 class="buy-title">${e("lot.title")}</h1>
        <p class="muted mt-s">${e("lot.soon")}</p>
        ${s.length?r`<div class="mt">
          <h2 class="section-title small">${c("history")} ${e("lot.done")}</h2>
          ${s.slice(0,5).map(n=>r`
            <div class="notif-item lv-success mt-s">
              <strong class="tiny">${h(n.title)}</strong>
              <p class="tiny muted mt-s">${e("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
            </div>`)}
        </div>`:""}
      </div>`}var el,ar=W(()=>{z();G();Z();et();ut();K();y("lot-join",async(t,a)=>{if(!m.me){V(e("nav.login"));return}await D(a,async()=>{try{await f.post(`/api/lotteries/${a.dataset.id}/join`,{}),E(e("lot.joinDone")),Promise.resolve().then(()=>(nt(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}})});el=()=>q()?"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC":"Lottery"});var rr={};X(rr,{mount:()=>nl,render:()=>al,title:()=>ol});async function al(){return r`
    <div class="section-head">
      <div><h1 class="section-title">${c("barcode")} ${e("priceCheck.title")}</h1>
      <p class="section-sub">${e("priceCheck.sub")}</p></div>
      <button type="button" class="btn btn-ghost" data-act="pc-fullscreen">${c("external")} ${e("priceCheck.fullscreen")}</button>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card scan-view">
          <form class="row" data-act="pc-lookup" >
            <input class="input" name="code" placeholder="${e("priceCheck.input")}" data-autofocus autocomplete="off" inputmode="numeric">
            <button class="btn btn-primary" type="submit">${c("search")} ${e("common.search")}</button>
          </form>
          <div class="row row-wrap center">
            <button type="button" class="btn btn-ghost" data-act="pc-camera">${c("camera")} ${e("priceCheck.scanCamera")}</button>
            <button type="button" class="btn btn-ghost" hidden data-act="pc-camera-stop">${c("close")} ${e("priceCheck.stopCamera")}</button>
          </div>
          <div class="scan-frame" data-frame hidden>
            <video playsinline muted></video>
            <span class="scan-line"></span>
            <span class="scan-corner" ></span>
          </div>
          <p class="hint">${e("adm.bScanHint")}</p>
          <input class="pc-wedge" data-wedge autocomplete="off" aria-label="${e("priceCheck.input")}" placeholder="${e("priceCheck.waiting")}">
        </div>
        <div class="card" data-history>
          <strong class="row mb-s">${c("history")} ${e("priceCheck.lastScan")}</strong>
          <div class="col" data-hlist><p class="muted small">${e("common.noData")}</p></div>
        </div>
      </div>
      <aside class="card price-display" data-result>
        <span class="empty-ic">${c("barcode")}</span>
        <p class="muted">${e("priceCheck.waiting")}</p>
      </aside>
    </div>`}function $s(t,a,{error:s=""}={}){var n;if(s){t.innerHTML=r`<span class="empty-ic danger">${c("alert")}</span><h3>${s}</h3>`;return}t.innerHTML=r`
    ${(n=a.images)!=null&&n[0]?r`<img class="pc-result-img" src="${a.images[0]}" alt="${ft(a)}" data-glyph="${a.glyph}">`:c(a.glyph||"box")}
    <h2 class="mt-s">${ft(a)}</h2>
    <p class="muted small">${a.brandName||""} ${a.sku?`\xB7 ${a.sku}`:""}</p>
    <div class="big">${A(a.price,{withUnit:!1})}</div>
    <div class="cur">${e("common.toman")}</div>
    ${a.oldPrice>a.price?r`<p class="pc-old">${A(a.oldPrice)}</p>`:""}
    <div class="mt-s">${a.stock>0?r`<span class="badge-pill bp-success">${e("pdp.stockCount",{n:g(a.stock)})}</span>`:r`<span class="badge-pill bp-danger">${e("card.outOfStock")}</span>`}</div>
    <a class="btn btn-primary mt" href="#/product/${a.id}">${e("common.details")} ${c("chevron-left")}</a>`}async function Dn(t,a){let s=a.querySelector("[data-result]");try{let n=await f.post("/api/scan",{code:String(t).trim()});if(n.found&&n.product)return $s(s,n.product),sl(a,n.product),n.product;$s(s,null,{error:e("priceCheck.notFound")})}catch(n){(n==null?void 0:n.status)===404?$s(s,null,{error:e("priceCheck.notFound")}):$s(s,null,{error:e("err.generic")})}return null}function sl(t,a){ys.unshift({id:a.id,name:ft(a),price:a.price,at:new Date().toISOString()}),ys.length>8&&ys.pop();let s=t.querySelector("[data-hlist]");s&&(s.innerHTML=ys.map(n=>r`<div class="row row-between small"><span class="nowrap">${n.name}</span><span class="b">${g(n.price)}</span></div>`).join(""))}function nl(t){N(t),document.body.classList.add("kiosk-page");let a=t.querySelector("[data-wedge]"),s="",n=0;return a.addEventListener("keydown",o=>{let i=Date.now();if(i-n>120&&(s=""),n=i,o.key==="Enter"){o.preventDefault();let l=s.trim();s="",l&&Dn(l,t);return}o.key.length===1&&(s+=o.key)}),a.focus(),y("pc-lookup",(o,i)=>{o.preventDefault(),Dn(i.querySelector("[name=code]").value,t)}),y("pc-fullscreen",()=>{var o,i;document.fullscreenElement?document.exitFullscreen().catch(()=>{}):(i=(o=document.documentElement).requestFullscreen)==null||i.call(o).catch(()=>it(e("misc.printBlocked")))}),y("pc-camera",async(o,i)=>{var d;let l=t.querySelector("[data-frame]"),p=l.querySelector("video");if(!("BarcodeDetector"in window)&&!((d=navigator.mediaDevices)!=null&&d.getUserMedia)){V(e("priceCheck.cameraUnsupported"));return}try{if(na=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),p.srcObject=na,await p.play(),l.hidden=!1,i.hidden=!0,t.querySelector('[data-act="pc-camera-stop"]').hidden=!1,"BarcodeDetector"in window){sr=new window.BarcodeDetector({formats:["ean_13","ean_8","code_128","code_39","upc_a","upc_e"]});let b=async()=>{if(na){try{let u=await sr.detect(p);if(u!=null&&u.length){let v=u[0].rawValue;Dn(v,t);let $=t.querySelector("[name=code]");$&&($.value=v)}}catch(u){}or=setTimeout(b,700)}};b()}}catch(b){V(e("priceCheck.cameraDenied"))}}),y("pc-camera-stop",(o,i)=>{nr(t),i.hidden=!0,t.querySelector('[data-act="pc-camera"]').hidden=!1}),()=>{nr(t),document.body.classList.remove("kiosk-page")}}function nr(t){if(clearTimeout(or),na){for(let s of na.getTracks())s.stop();na=null}let a=t==null?void 0:t.querySelector("[data-frame]");a&&(a.hidden=!0)}var na,sr,or,ys,ol,cr=W(()=>{z();G();Z();K();et();ut();na=null,sr=null,or=0,ys=[];ol=()=>e("priceCheck.title")});var Mn={};X(Mn,{mount:()=>cl,render:()=>rl,title:()=>il});async function ws(t){var o,i,l;let a=(o=t==null?void 0:t.querySelector)==null?void 0:o.call(t,"[data-captcha]");if(!a||a.hidden||(a.dataset.verifying&&await new Promise(p=>{let d=Date.now(),b=setInterval(()=>{(!a.dataset.verifying||Date.now()-d>2500)&&(clearInterval(b),p())},60)}),String(((i=a.querySelector("[data-ctok]"))==null?void 0:i.value)||"").trim()))return!0;let s=a.querySelector("[name=captchaBox]"),n=a.querySelector("[data-cch]");return s&&(s.checked=!0),n&&(n.hidden=!1),a.dataset.cid||_e(a),(l=a.querySelector("[name=captchaAnswer]"))==null||l.focus(),it(e("captcha.required"),{type:"error",timeout:4500}),!1}function Ma(t){let a=t&&!t.startsWith("auth")?`#/${t.replace(/^#|^\/|#$/g,"")}`:"#/";Ot().then(()=>Mt()).then(()=>pn()).then(()=>bt(a))}async function rl(t){let a=t.query.get("next")||"",s=t.query.get("ref")||"",n=t.params.mode==="register"||!!s,o=t.params.mode==="forgot";return r`
    <div class="auth-wrap">
      <div class="card auth-card">
        <div class="t-center mb">
          <span class="pwa-ic center" data-h="56px" data-w="56px">${c("user")}</span>
          <h1 class="mt-s" data-title>${n?e("auth.registerTitle"):o?e("auth.recoveryTitle"):e("auth.loginTitle")}</h1>
        </div>

        <div class="tabs" data-auth-tabs role="tablist">
          <button type="button" class="tab ${!n&&!o?"active":""}" data-at="login" role="tab">${e("common.login")}</button>
          <button type="button" class="tab ${n?"active":""}" data-at="register" role="tab">${e("common.register")}</button>
          <button type="button" class="tab ${o?"active":""}" data-at="forgot" role="tab">${e("auth.forgot")}</button>
        </div>

        <!-- ورود -->
        <div class="tab-panel" data-ap="login" ${n||o?"hidden":""}>
          <div class="btn-group mb" data-method>
            <button type="button" class="btn active" data-m="password">${e("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${e("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${e("auth.methodEmail")}</button>
          </div>

          <form data-act="login-pass" data-apf="password">
            ${x({label:e("auth.identifier"),name:"identifier",required:!0,autocomplete:"username"})}
            ${x({label:e("common.password"),name:"password",type:"password",required:!0,autocomplete:"current-password"})}
            <div class="row row-between mb">
              ${Ue({label:e("auth.remember"),name:"remember",checked:!0})}
              <button type="button" class="link-btn" data-goto="forgot">${e("auth.forgot")}</button>
            </div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("logout")} ${e("common.login")}</button>
          </form>

          <form data-act="otp-send" data-purpose="login" data-apf="phone" hidden>
            ${x({label:e("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${e("auth.sendCode")}</button>
          </form>
          <form data-act="otp-send" data-purpose="login" data-apf="email" hidden>
            ${x({label:e("common.email"),name:"target",type:"email",required:!0})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${e("auth.sendCode")}</button>
          </form>

          <form data-act="otp-login" data-apf="code" hidden>
            <p class="notice notice-info mb">${c("mail")}<span data-sentto></span></p>
            <p class="notice notice-warn mb" data-democode hidden>${c("info")}<span></span></p>
            ${x({label:e("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${c("check")} ${e("common.login")}</button>
            <div class="row row-between mt-s">
              <button type="button" class="link-btn" data-resend>${e("auth.resend")}</button>
              <span class="muted tiny" data-resend-timer></span>
            </div>
          </form>

          <form data-act="login-2fa" data-apf="2fa" hidden>
            <p class="notice notice-info mb">${c("shield")}<span>${e("auth.2faText")}</span></p>
            <div class="btn-group mb" data-2fa-method></div>
            ${x({label:e("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric"'})}
            <button class="btn btn-primary btn-block" type="submit">${c("shield")} ${e("auth.2faVerify")}</button>
          </form>
        </div>

        <!-- ثبت‌نام -->
        <div class="tab-panel" data-ap="register" ${n?"":"hidden"}>
          <div class="btn-group mb" data-regmode>
            <button type="button" class="btn active" data-m="username">${e("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${e("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${e("auth.methodEmail")}</button>
          </div>
          <form data-act="register" data-next="${a}">
            ${x({label:e("common.fullName"),name:"name",required:!0,autocomplete:"name"})}
            <span data-reg-username>${x({label:e("common.username"),name:"username",autocomplete:"username",hint:$t()==="fa"?"\u062D\u0631\u0648\u0641 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC\u060C \u0639\u062F\u062F \u0648 _ \u060C \u062D\u062F\u0627\u0642\u0644 \u06F3 \u0646\u0648\u06CC\u0633\u0647":"letters, digits and _ , min 3 chars"})}</span>
            <span data-reg-target-phone hidden>${x({label:e("common.phone"),name:"phoneTarget",type:"tel",placeholder:"09xxxxxxxxx"})}</span>
            <span data-reg-target-email hidden>${x({label:e("common.email"),name:"emailTarget",type:"email"})}</span>
            <span data-reg-code hidden>
              <div class="row">
                <span class="grow">${x({label:e("auth.otpCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}</span>
                <button type="button" class="btn btn-ghost" data-reg-send>${e("auth.sendCode")}</button>
              </div>
              <p class="notice notice-warn mb" data-reg-demo hidden>${c("info")}<span></span></p>
            </span>
            <span data-reg-extra>
              ${x({label:`${e("common.phone")} (${e("common.optional")})`,name:"phone",type:"tel"})}
              ${x({label:`${e("common.email")} (${e("common.optional")})`,name:"email",type:"email"})}
            </span>
            ${x({label:e("common.password"),name:"password",type:"password",required:!0,hint:e("auth.passwordRules"),autocomplete:"new-password"})}
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
            <div class="mb">${Ue({label:r`${e("auth.acceptTerms")} <a class="section-link" href="#/pages/terms">${e("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}</div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("user")} ${e("common.register")}</button>
          </form>
        </div>

        <!-- بازیابی -->
        <div class="tab-panel" data-ap="forgot" ${o?"":"hidden"}>
          <p class="muted small mb">${e("auth.recoveryText")}</p>
          <form data-act="forgot-send">
            <div class="btn-group mb" data-fch>
              <button type="button" class="btn active" data-m="phone">${e("auth.methodPhone")}</button>
              <button type="button" class="btn" data-m="email">${e("auth.methodEmail")}</button>
            </div>
            ${x({label:e("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${e("auth.sendCode")}</button>
          </form>
          <form data-act="forgot-reset" hidden>
            <p class="notice notice-info mb">${c("mail")}<span data-fsent></span></p>
            <p class="notice notice-warn mb" data-fdemo hidden>${c("info")}<span></span></p>
            ${x({label:e("auth.otpCode"),name:"code",required:!0,attrs:'inputmode="numeric" maxlength="6"'})}
            ${x({label:e("auth.newPassword"),name:"password",type:"password",required:!0,hint:e("auth.passwordRules"),autocomplete:"new-password"})}
            <button class="btn btn-primary btn-block" type="submit">${c("key")} ${e("common.save")}</button>
          </form>
        </div>
      </div>
    </div>`}function cl(t,a){var p;N(t),t.querySelectorAll("[data-captcha]").forEach(d=>_e(d));let s=a.query.get("next")||"",n=a.query.get("ref")||"";if(n){let d=t.querySelector("[name=referralCode]");d&&(d.value=n,setTimeout(()=>{var b;return(b=t.querySelector('[data-at="register"]'))==null?void 0:b.click()},50))}let o={login:t.querySelector('[data-ap="login"]'),register:t.querySelector('[data-ap="register"]'),forgot:t.querySelector('[data-ap="forgot"]')};t.querySelectorAll("[data-at]").forEach(d=>d.addEventListener("click",()=>{t.querySelectorAll("[data-at]").forEach(b=>b.classList.toggle("active",b===d));for(let[b,u]of Object.entries(o))u.hidden=b!==d.dataset.at})),t.querySelectorAll("[data-goto]").forEach(d=>d.addEventListener("click",()=>t.querySelector(`[data-at="${d.dataset.goto}"]`).click()));let i=t.querySelector("[data-method]");i.addEventListener("click",d=>{let b=d.target.closest("[data-m]");if(!b)return;i.querySelectorAll("[data-m]").forEach(v=>v.classList.toggle("active",v===b));let u=b.dataset.m;o.login.querySelectorAll("[data-apf]").forEach(v=>{v.hidden=v.dataset.apf!==u})});let l=t.querySelector("[data-regmode]");return l.addEventListener("click",d=>{let b=d.target.closest("[data-m]");b&&(l.querySelectorAll("[data-m]").forEach(u=>u.classList.toggle("active",u===b)),rt.regMode=b.dataset.m,t.querySelector("[data-reg-username]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-extra]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-target-phone]").hidden=rt.regMode!=="phone",t.querySelector("[data-reg-target-email]").hidden=rt.regMode!=="email",t.querySelector("[data-reg-code]").hidden=rt.regMode==="username")}),t.querySelector("[data-reg-send]").addEventListener("click",async d=>{var $;let b=t.querySelector('[data-act="register"]'),u=rt.regMode==="phone"?"phone":"email",v=u==="phone"?b.querySelector("[name=phoneTarget]").value:b.querySelector("[name=emailTarget]").value;try{let w=await f.post("/api/auth/otp/send",{channel:u,target:v,purpose:"register",captchaToken:(($=b.querySelector("[data-ctok]"))==null?void 0:$.value)||void 0});rt.demoCode=w.demoCode||"";let k=t.querySelector("[data-reg-demo]");k.hidden=!w.demoCode,w.demoCode&&(k.querySelector("span").textContent=e("auth.demoCode",{code:w.demoCode})),E(e("auth.codeSentTo",{target:w.target})),Pn(t,"[data-reg-send]")}catch(w){(w==null?void 0:w.code)==="captcha_required"&&oa(b),S(w)}}),y("choose-hear",(d,b)=>{let v=Ta({title:"\u0646\u062D\u0648\u0647 \u0622\u0634\u0646\u0627\u06CC\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
        ${[{v:"",l:"(\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F)"},{v:"google",l:"\u062C\u0633\u062A\u062C\u0648\u06CC \u06AF\u0648\u06AF\u0644"},{v:"instagram",l:"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645"},{v:"telegram",l:"\u062A\u0644\u06AF\u0631\u0627\u0645"},{v:"friend",l:"\u0645\u0639\u0631\u0641\u06CC \u062F\u0648\u0633\u062A\u0627\u0646"},{v:"other",l:"\u0633\u0627\u06CC\u0631"}].map($=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${$.v}">${$.l}</button>`).join("")}
      </div>`});v.panel.querySelectorAll("button[data-v]").forEach($=>{$.addEventListener("click",()=>{b.parentElement.querySelector('input[type="hidden"]').value=$.dataset.v,b.querySelector("[data-txt]").textContent=$.textContent,v.close()})})}),y("login-pass",async(d,b)=>{if(d.preventDefault(),ls(b),!await ws(b))return;let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{var v;try{let $=await f.post("/api/auth/login",{identifier:u.get("identifier"),password:u.get("password"),remember:u.get("remember")==="on",captchaToken:u.get("captchaToken")||void 0});$.twoFactor?(rt.challenge=$.challengeToken,rt.methods=$.methods||["totp"],rt.sent=$.sent||null,ir(t,$)):(m.me=$.me,E(e("auth.loginDone")),Ma(s))}catch($){(($==null?void 0:$.code)==="captcha_required"||(v=$==null?void 0:$.details)!=null&&v.captchaRequired)&&oa(b),S($)}})}),y("otp-send",async(d,b)=>{if(d.preventDefault(),!await ws(b))return;let u=new FormData(b),v=b.dataset.apf==="email"?"email":"phone";rt.channel=v,rt.target=String(u.get("target")||"").trim(),await D(b.querySelector("button[type=submit]"),async()=>{try{let $=await f.post("/api/auth/otp/send",{channel:v,target:rt.target,purpose:"login",captchaToken:u.get("captchaToken")||void 0});rt.demoCode=$.demoCode||"";let w=o.login.querySelector('[data-apf="code"]');o.login.querySelectorAll("[data-apf]").forEach(C=>{C.hidden=C!==w}),w.querySelector("[data-sentto]").textContent=e("auth.codeSentTo",{target:$.target});let k=w.querySelector("[data-democode]");k.hidden=!$.demoCode,$.demoCode&&(k.querySelector("span").textContent=e("auth.demoCode",{code:$.demoCode})),E(e("auth.codeSent")),Pn(t,"[data-resend]"),w.querySelector("[name=code]").focus()}catch($){($==null?void 0:$.code)==="captcha_required"&&oa(b),S($)}})}),y("otp-login",async(d,b)=>{d.preventDefault();let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{try{let v=await f.post("/api/auth/login/otp",{channel:rt.channel,target:rt.target,code:u.get("code")});if(v.twoFactor){rt.challenge=v.challengeToken,rt.methods=v.methods||["totp"],ir(t,v);return}m.me=v.me,E(e("auth.loginDone")),Ma(s)}catch(v){S(v)}})}),(p=t.querySelector("[data-resend]"))==null||p.addEventListener("click",async()=>{try{let d=await f.post("/api/auth/otp/send",{channel:rt.channel,target:rt.target,purpose:"login"});rt.demoCode=d.demoCode||"";let b=o.login.querySelector("[data-democode]");b.hidden=!d.demoCode,d.demoCode&&(b.querySelector("span").textContent=e("auth.demoCode",{code:d.demoCode})),E(e("auth.codeSent")),Pn(t,"[data-resend]")}catch(d){S(d)}}),y("login-2fa",async(d,b)=>{var $;d.preventDefault();let u=new FormData(b),v=(($=b.querySelector("[data-2fam].active"))==null?void 0:$.dataset["2fam"])||"totp";await D(b.querySelector("button[type=submit]"),async()=>{try{let w=await f.post("/api/auth/login/2fa",{challengeToken:rt.challenge,code:u.get("code"),type:v});m.me=w.me,E(e("auth.loginDone")),Ma(s)}catch(w){S(w)}})}),y("register",async(d,b)=>{if(d.preventDefault(),ls(b),!await ws(b))return;let u=new FormData(b),v={mode:rt.regMode,name:u.get("name"),password:u.get("password"),acceptTerms:u.get("acceptTerms")==="on",referralCode:u.get("referralCode")||"",hearAboutUs:u.get("hearAboutUs")||"",captchaToken:u.get("captchaToken")||void 0};rt.regMode==="username"?(v.username=u.get("username"),v.phone=u.get("phone")||"",v.email=u.get("email")||""):rt.regMode==="phone"?(v.target=u.get("phoneTarget"),v.code=u.get("code"),v.email=u.get("email")||""):(v.target=u.get("emailTarget"),v.code=u.get("code"),v.phone=u.get("phone")||""),await D(b.querySelector("button[type=submit]"),async()=>{try{let $=await f.post("/api/auth/register",v);m.me=$.me,E(e("auth.registerDone")),Ma(s||"")}catch($){($==null?void 0:$.code)==="captcha_required"&&oa(b),S($)}})}),y("forgot-send",async(d,b)=>{if(d.preventDefault(),!await ws(b))return;let u=new FormData(b),v=b.querySelector("[data-fch] .active").dataset.m;rt.channel=v,rt.target=String(u.get("target")||"").trim(),await D(b.querySelector("button[type=submit]"),async()=>{try{let $=await f.post("/api/auth/password/forgot",{channel:v,target:rt.target,captchaToken:u.get("captchaToken")||void 0}),w=o.forgot.querySelector('[data-act="forgot-reset"]');o.forgot.querySelector('[data-act="forgot-send"]').hidden=!0,w.hidden=!1,w.querySelector("[data-fsent]").textContent=e("auth.codeSentTo",{target:$.target});let k=w.querySelector("[data-fdemo]");k.hidden=!$.demoCode,$.demoCode&&(k.querySelector("span").textContent=e("auth.demoCode",{code:$.demoCode})),E(e("auth.codeSent"))}catch($){($==null?void 0:$.code)==="captcha_required"&&oa(b),S($)}})}),y("forgot-reset",async(d,b)=>{d.preventDefault();let u=new FormData(b);await D(b.querySelector("button[type=submit]"),async()=>{try{let v=await f.post("/api/auth/password/reset",{channel:rt.channel,target:rt.target,code:u.get("code"),password:u.get("password")});m.me=v.me,E(e("auth.resetDone")),Ma("")}catch(v){S(v)}})}),null}function ir(t,a){var p;let s=t.querySelector('[data-ap="login"]');s.querySelectorAll("[data-apf]").forEach(d=>{d.hidden=d.dataset.apf!=="2fa"});let n=s.querySelector('[data-act="login-2fa"]'),o=n.querySelector("[data-2fa-method]"),i=rt.methods,l={totp:e("auth.2faTotp"),sms:e("auth.2faSms"),email:e("auth.2faEmail"),backup:e("auth.2faBackup")};o.innerHTML=i.map((d,b)=>r`<button type="button" class="btn ${b===0?"active":""}" data-2fam="${d}">${l[d]||d}</button>`).join(""),o.addEventListener("click",d=>{let b=d.target.closest("[data-2fam]");b&&o.querySelectorAll("[data-2fam]").forEach(u=>u.classList.toggle("active",u===b))}),(p=a.sent)!=null&&p.demoCode&&it(e("auth.demoCode",{code:a.sent.demoCode}),{title:e("auth.2faTitle"),timeout:12e3}),n.querySelector("[name=code]").focus()}function Pn(t,a){let s=60,n=t.querySelector(a),o=setInterval(()=>{s-=1,n&&(n.textContent=s>0?e("auth.resendIn",{s:g(s)}):e("auth.resend")),s<=0&&clearInterval(o)},1e3)}var rt,il,Ln=W(()=>{z();G();Z();K();dt();et();ut();nt();rt={challenge:null,methods:[],sent:null,channel:"phone",target:"",demoCode:"",mode:"login",regMode:"username"};il=()=>e("auth.title")});async function Ss(){return(await f.get("/api/support/messages")).items||[]}function xs(t){return t.length?t.map(Rn).join(""):r`<div class="msg them">${e("acc.chatWelcome")}</div>`}function Es(t){requestAnimationFrame(()=>{t.scrollTop=t.scrollHeight})}async function ll(t){return await f.post("/api/support/messages",{body:t})}function ks(){if(!dl())return;if(!m.me){it(e("chat.loginFirst")),location.hash="#/auth?next="+encodeURIComponent("account/support");return}if(Kt){lr();return}let t=document.getElementById("chatRoot");Kt=Jt("div",{class:"chat-win",role:"dialog","aria-label":e("chat.title")}),Kt.innerHTML=r`
    <header class="chat-h">
      <span class="stat-ic" data-h="34px" data-w="34px">${c("headset")}</span>
      <div class="grow">
        <div class="t">${e("chat.title")}</div>
        <div class="s"><span class="online-dot"></span>${e("chat.online")}</div>
      </div>
      <button type="button" class="icon-btn" data-cx aria-label="${e("chat.minimize")}">${c("close")}</button>
    </header>
    <div class="chat-b" data-thread><div class="msg them">${e("common.loading")}</div></div>
    <form class="chat-f" data-act="chat-send">
      <input class="input" name="body" maxlength="1000" placeholder="${e("acc.chatPlaceholder")}" autocomplete="off">
      <button type="submit" class="btn btn-primary btn-icon" aria-label="${e("common.send")}">${c("send")}</button>
    </form>`,t.appendChild(Kt),we=Kt.querySelector("[data-thread]"),Kt.querySelector("[data-cx]").addEventListener("click",lr);let a=Kt.querySelector(".chat-h .stat-ic");a&&(a.style.width="34px",a.style.height="34px",a.style.borderRadius="11px"),Ss().then(s=>{we.innerHTML=xs(s),Es(we)}).catch(()=>{we.innerHTML=r`<div class="msg them">${e("err.network")}</div>`}),Kt.querySelector("input[name=body]").focus()}function lr(){Kt==null||Kt.remove(),Kt=null,we=null}function mr(t){let a=[];we&&a.push(we),document.querySelectorAll("[data-thread-page]").forEach(s=>a.push(s));for(let s of a){if(s.querySelector(`[data-id="${t.id}"]`))continue;let n=s.querySelector(".msg");n&&!n.dataset.id&&s.children.length===1&&n.classList.contains("them")&&n.textContent===e("acc.chatWelcome")&&(s.innerHTML=""),s.insertAdjacentHTML("beforeend",Rn(t)),Es(s)}}function pr(){var t,a;(t=document.getElementById("fabSupport"))==null||t.addEventListener("click",ks),(a=document.getElementById("btnSupportTop"))==null||a.addEventListener("click",ks),Ft("sse:support",s=>{!m.me||(s==null?void 0:s.userId)!==m.me.id||Ss().then(n=>{let o=n.find(l=>l.id===s.id);o&&o.from==="staff"&&(dr()?mr(o):(In+=1,Nn(),it(o.body,{title:e("chat.title"),timeout:6e3,action:{label:e("common.view"),onClick:ks}})));let i=document.querySelector("[data-thread-page]");i&&!dr()&&(i.innerHTML=xs(n),Es(i))}).catch(()=>{})}),Ft("me",()=>Nn())}function Nn(){let t=document.getElementById("fabSupport");if(!t)return;let a=t.querySelector(".fab-dot");In>0?a||(a=Jt("span",{class:"fab-dot"}),t.appendChild(a)):a==null||a.remove()}function ur(){In=0,Nn()}function dl(){var t,a;return((a=(t=m.settings)==null?void 0:t.features)==null?void 0:a.liveSupport)!==!1}var Kt,we,In,Rn,dr,Bn=W(()=>{K();G();Z();z();et();ut();Kt=null,we=null,In=0,Rn=t=>r`
  <div class="msg ${t.from==="user"?"me":"them"}" data-id="${t.id||""}">
    ${h(t.body)}
    <span class="tm">${St(t.at)}</span>
  </div>`;dr=()=>!!Kt;y("chat-open",()=>ks());y("chat-send",async(t,a)=>{var l;let s=a.querySelector("input[name=body], textarea[name=body]"),n=String((s==null?void 0:s.value)||"").trim();if(!n)return;s.value="";let o={id:"tmp",from:"user",body:n,at:new Date().toISOString()},i=[];we&&i.push(we),document.querySelectorAll("[data-thread-page]").forEach(p=>i.push(p));for(let p of i)p.insertAdjacentHTML("beforeend",Rn(o)),Es(p);try{let p=await ll(n),d=p.message;it(e("chat.sent"),{timeout:1600});for(let b of i){let u=b.querySelector(".msg.me:not([data-id])");u&&(u.dataset.id=d.id,u.querySelector(".tm").textContent=St(d.at))}p.botMessage&&mr(p.botMessage)}catch(p){S(p);for(let d of i)(l=d.lastElementChild)==null||l.remove();s.value=n}})});var Fn={};X(Fn,{mount:()=>Pl,render:()=>pl,title:()=>Ml});async function pl(t){var o,i,l,p,d,b,u,v,$;let a=t.params.section||"",s=ml.filter(w=>!w.feat||B(w.feat)),n=await ul(a,t);return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("user")} ${e("acc.title")}</h1>
      <p class="section-sub">${e("acc.hello",{name:h(((o=m.me)==null?void 0:o.name)||((i=m.me)==null?void 0:i.username)||"")})} · ${e("acc.memberSince",{date:O((l=m.me)==null?void 0:l.createdAt,{time:!1})})}</p>
    </div></div>
    <div class="acc-grid">
      <aside class="acc-side">
        <div class="acc-user">
          <span class="av">${h((((p=m.me)==null?void 0:p.name)||((d=m.me)==null?void 0:d.username)||"?").charAt(0))}</span>
          <div class="grow">
            <div class="b nowrap">${h(((b=m.me)==null?void 0:b.name)||((u=m.me)==null?void 0:u.username))}</div>
            <div class="tiny muted">${((v=m.me)==null?void 0:v.role)==="owner"?e("common.admin"):(($=m.me)==null?void 0:$.role)==="staff"?"\u06A9\u0627\u0631\u0645\u0646\u062F":e("common.user")}</div>
          </div>
        </div>
        <nav class="acc-nav" aria-label="${e("acc.title")}">
          ${s.map(w=>r`<a href="#/account${w.id?`/${w.id}`:""}" class="${w.id===a?"active":""}">${c(w.icon)} ${w.label()}${w.id==="notifications"&&m.unread?r`<span class="cnt">${g(m.unread)}</span>`:""}</a>`)}
        </nav>
      </aside>
      <div data-accbody>${n}</div>
    </div>`}async function ul(t,a){switch(t){case"orders":return hl();case"wishlist":return gl();case"wallet":return fl();case"plus":return vl();case"addresses":return yl();case"notifications":return $l();case"tickets":return kl();case"support":return Sl();case"reviews":return xl();case"feedback":return El();case"referrals":return Nl();case"profile":return ql();case"kyc":return Ll();case"security":return Tl();case"prefs":return Al();case"data":return Dl();default:return bl()}}async function bl(){var s,n,o,i,l,p;let t=[];try{t=(await f.get("/api/me/orders")).items||[]}catch(d){}let a=t.slice(0,4);return r`
    <div class="stats-grid mb">
      <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${g(t.length)}</div><div class="stat-lbl">${e("acc.orders")}</div></div></div>
      ${B("wallet")?r`<div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${g(((n=(s=m.me)==null?void 0:s.wallet)==null?void 0:n.balance)||0)}</div><div class="stat-lbl">${e("common.balance")}</div></div></div>`:""}
      <div class="stat-card"><span class="stat-ic">${c("heart")}</span><div><div class="stat-val">${g(m.wishlist.length)}</div><div class="stat-lbl">${e("acc.wishlist")}</div></div></div>
      <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${g(((o=m.me)==null?void 0:o.points)||0)}</div><div class="stat-lbl">${e("common.points")}</div></div></div>
    </div>
    ${(()=>{var u;let d=((u=m.me)==null?void 0:u.badges)||[],b=d.filter(v=>v.got).length;return d.length?r`<div class="card mb">
        <div class="row row-between"><strong>${c("award")} ${e("acc.badges")}</strong><span class="muted tiny">${g(b)} / ${g(d.length)}</span></div>
        <div class="badges-grid mt-s">
          ${d.map(v=>r`
            <div class="badge-item ${v.got?"got":""}" title="${e(`badge.${v.id}.d`)}">
              <span class="bi-ic">${c(v.got?"award":"lock")}</span>
              <b>${e(`badge.${v.id}`)}</b>
              <span class="tiny muted">${v.got?e("badge.got"):v.progress!==void 0?`${g(v.progress)}\xD7`:e("badge.locked")}</span>
            </div>`)}
        </div>
      </div>`:""})()}
    ${Zt()?r`<div class="notice notice-success mb">${c("sparkles")}<span>${e("acc.plusActive",{date:O((l=(i=m.me)==null?void 0:i.plus)==null?void 0:l.until,{time:!1})})}</span></div>`:B("plus")?r`<div class="notice notice-info mb">${c("sparkles")}<span>${e("acc.plusInactive")} — <a class="section-link" href="#/account/plus">${e("acc.plusSubscribe")}</a></span></div>`:""}
    ${t.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${e("acc.orders")}</h2></div><a class="section-link" href="#/account/orders">${e("common.showAll")}</a></div>
      ${br(a)}`:L({icon:"cart",title:e("acc.noOrders"),text:e("acc.noOrdersText"),action:{href:"#/products",label:e("cart.goShopping")}})}
    ${(p=m.me)!=null&&p.referralCode&&B("referrals")?r`
      <div class="card mt">
        <strong>${c("gift")} ${e("acc.referralCode")}</strong>
        <div class="row mt-s">
          <code class="tag mono b" data-h="34px">${m.me.referralCode}</code>
          <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${m.me.referralCode}">${c("copy")} ${e("common.copy")}</button>
        </div>
        <p class="hint mt-s">${e("acc.referralText")}</p>
      </div>`:""}`}function br(t){return lt([{label:e("acc.orderCode")},{label:e("acc.orderDate")},{label:e("common.status")},{label:e("acc.orderTotal"),cls:"num"},{label:e("common.actions"),cls:"num"}],t.map(a=>r`
      <tr>
        <td class="mono b">${a.code}</td>
        <td class="nowrap">${O(a.createdAt,{time:!1})}</td>
        <td>${$e(a.status)}</td>
        <td class="num">${A(a.total)}</td>
        <td><div class="act"><a class="btn btn-ghost btn-xs" href="#/account/orders/${a.id}">${e("common.view")}</a></div></td>
      </tr>`))}async function hl(){let t=[];try{t=(await f.get("/api/me/orders")).items||[]}catch(a){}return t.length?br(t):L({icon:"package-check",title:e("acc.noOrders"),text:e("acc.noOrdersText"),action:{href:"#/products",label:e("cart.goShopping")}})}async function gl(){if(!m.wishlist.length)return L({icon:"heart",title:e("acc.wishlistEmpty"),text:e("acc.wishlistEmptyText"),action:{href:"#/products",label:e("cart.goShopping")}});let t=await f.get("/api/products?limit=96").catch(()=>null),a=m.wishlist.map(s=>{var n;return(n=t==null?void 0:t.items)==null?void 0:n.find(o=>o.id===s)}).filter(Boolean);return jt(a)}async function fl(){if(!B("wallet"))return L({icon:"wallet",title:e("err.notFound")});let t={balance:0,transactions:[]};try{t=await f.get("/api/me/wallet")}catch(a){}return r`
    <div class="card mb">
      <div class="row row-between row-wrap">
        <div><div class="muted small">${e("common.balance")}</div><div class="buy-now">${A(t.balance)}</div></div>
        <button class="btn btn-primary" data-act="wallet-deposit">${c("plus")} ${e("acc.walletDeposit")}</button>
      </div>
      <p class="hint mt-s">${e("acc.walletNote")}</p>
    </div>
    ${lt([{label:e("common.date")},{label:e("common.type")},{label:e("common.amount"),cls:"num"},{label:e("common.note")}],(t.transactions||[]).map(a=>r`
        <tr>
          <td class="nowrap">${O(a.at)}</td>
          <td><span class="badge-pill ${a.amount>=0?"bp-success":"bp-warn"}">${e(`acc.tx.${a.type}`)||a.type}</span></td>
          <td class="num b">${a.amount>=0?"+":""}${g(a.amount)}</td>
          <td class="muted small">${h(a.note||"")} ${a.ref?r`<button class="link-btn mono" data-act="copy" data-text="${a.ref}">${a.ref}</button>`:""}</td>
        </tr>`),{emptyText:e("acc.walletEmpty")})}`}function vl(){var s,n;if(!B("plus"))return L({icon:"sparkles",title:e("err.notFound")});let t=xa(),a=Zt();return r`
    <div class="card mb t-center">
      <span class="pwa-ic center" data-h="60px" data-w="60px">${c("sparkles")}</span>
      <h2 class="mt-s">${a?e("acc.plusActive",{date:O((n=(s=m.me)==null?void 0:s.plus)==null?void 0:n.until,{time:!1})}):e("acc.plusInactive")}</h2>
      <p class="buy-price center"><span class="buy-now">${A(t.price)}</span><span class="buy-cur">/ ${g(t.durationDays)} ${e("common.day")}</span></p>
      <div class="row center row-wrap">
        <button class="btn btn-primary" data-act="plus-buy" data-method="wallet" ${B("wallet")?"":"hidden"}>${c("wallet")} ${e("acc.plusPayWallet")}</button>
        <button class="btn btn-ghost" data-act="plus-buy" data-method="gateway">${c("card")} ${e("acc.plusPayGateway")}</button>
      </div>
      <p class="hint mt-s">${e("checkout.gatewayDemo")}</p>
    </div>
    <div class="section-head"><div><h2 class="section-title">${c("gift")} ${e("acc.plusPerks")}</h2></div></div>
    <div class="pwa-grid">
      ${(t.perks||[]).map(o=>r`<div class="pwa-card"><span class="pwa-ic">${c("check")}</span><div>${q()?o.fa:o.en}</div></div>`)}
    </div>`}function yl(){var a;let t=((a=m.me)==null?void 0:a.addresses)||[];return r`
    <div class="row row-between mb">
      <strong>${e("acc.addresses")} (${g(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="addr-new">${c("plus")} ${e("acc.addAddress")}</button>
    </div>
    ${t.length?r`<div class="pwa-grid">${t.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <strong>${h(s.title||"")}</strong>
          ${s.isDefault?r`<span class="badge-pill bp-accent">${e("acc.addrDefault")}</span>`:""}
        </div>
        <p class="muted small mt-s">${h(s.receiver||"")} · ${at(s.phone||"")}<br>${h(s.street||"")}${s.city?`\u060C ${h(s.city)}`:""}${s.postal?`<br>${e("common.postal")}: ${h(s.postal)}`:""}</p>
        ${s.note?r`<p class="hint">${h(s.note)}</p>`:""}
        <div class="row mt-s">
          <button class="btn btn-ghost btn-xs" data-act="addr-edit" data-id="${s.id}">${c("edit")} ${e("common.edit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="addr-del" data-id="${s.id}">${c("trash")} ${e("common.delete")}</button>
          ${s.isDefault?"":r`<button class="btn btn-ghost btn-xs" data-act="addr-default" data-id="${s.id}">${c("check")} ${e("acc.addrDefault")}</button>`}
        </div>
      </div>`)}</div>`:L({icon:"pin",title:e("acc.noAddress")})}`}function hr(t=null){var a,s;return pt({title:t?e("acc.editAddress"):e("acc.addAddress"),body:r`
      <form data-act="addr-save2" class="form-grid" data-id="${(t==null?void 0:t.id)||""}">
        ${x({label:e("acc.addrTitle"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${x({label:e("acc.addrReceiver"),name:"receiver",required:!0,value:(t==null?void 0:t.receiver)||((a=m.me)==null?void 0:a.name)||""})}
        ${x({label:e("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:(t==null?void 0:t.phone)||((s=m.me)==null?void 0:s.phone)||""})}
        ${x({label:e("common.city"),name:"city",value:(t==null?void 0:t.city)||""})}
        ${x({label:e("common.postal"),name:"postal",value:(t==null?void 0:t.postal)||""})}
        ${x({label:e("acc.addrStreet"),name:"street",required:!0,span2:!0,value:(t==null?void 0:t.street)||""})}
        ${x({label:e("acc.addrNote"),name:"note",span2:!0,value:(t==null?void 0:t.note)||""})}
        <label class="check span-2"><input type="checkbox" name="isDefault" ${t!=null&&t.isDefault?"checked":""}><span class="box">${c("check")}</span><span>${e("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${e("common.save")}</button>
      </form>`})}async function $l(){await ye(!0);let t=m.notifications;return r`
    <div class="row row-between mb">
      <strong>${e("common.notifications")} (${g(t.length)})</strong>
      <button class="btn btn-ghost btn-sm" data-act="notif-read-all">${c("check")} ${e("acc.markAllRead")}</button>
    </div>
    ${t.length?r`<div class="col">${t.map(a=>r`
      <div class="card ${a.read?"":"notif-unread"}">
        <div class="row row-between">
          <strong class="row">${c(wl(a.type))} ${h(q()?a.title:a.titleEn||a.title)}</strong>
          <span class="muted tiny nowrap">${St(a.createdAt)}</span>
        </div>
        ${a.body?r`<p class="muted small mt-s">${h(q()?a.body:a.bodyEn||a.body)}</p>`:""}
        <div class="row mt-s">
          ${a.link?r`<a class="btn btn-ghost btn-xs" href="${a.link}">${e("common.view")}</a>`:""}
          ${a.read?"":r`<button class="btn btn-ghost btn-xs" data-act="notif-read" data-id="${a.id}">${e("notif.markRead")}</button>`}
          <button class="btn btn-ghost btn-xs" data-act="notif-del" data-id="${a.id}">${c("trash")}</button>
        </div>
      </div>`)}</div>`:L({icon:"bell",title:e("acc.notifEmpty")})}`}function wl(t){return{order:"package-check",restock:"box",ticket:"ticket",support:"headset",review:"star",plus:"sparkles",wallet:"wallet",account:"user",feedback:"flag",admin_alert:"alert",offer:"percent",welcome:"heart"}[t]||"bell"}async function kl(){let t=[];try{t=(await f.get("/api/tickets")).items||[]}catch(a){}return r`
    <div class="row row-between mb">
      <strong>${e("common.tickets")} (${g(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="ticket-new">${c("plus")} ${e("acc.ticketNew")}</button>
    </div>
    ${t.length?lt([{label:e("acc.orderCode")},{label:e("acc.ticketSubject")},{label:e("common.status")},{label:e("common.priority")},{label:e("common.date")},{label:""}],t.map(a=>r`
        <tr>
          <td class="mono">${a.code}</td>
          <td class="nowrap">${h(a.subject)}</td>
          <td><span class="badge-pill ${a.status==="closed"?"bp-muted":a.status==="answered"?"bp-success":"bp-warn"}">${e(`tk.${a.status}`)}</span></td>
          <td>${e(`tp.${a.priority}`)}</td>
          <td class="nowrap">${O(a.createdAt,{time:!1})}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/account/tickets/${a.id}">${e("common.view")}${a.unread?r` <span class="badge-pill bp-danger">${g(a.messageCount)}</span>`:""}</a></td>
        </tr>`)):L({icon:"ticket",title:e("acc.noTickets")})}`}async function Sl(){if(!B("liveSupport"))return L({icon:"headset",title:e("err.notFound")});let t=[];try{t=await Ss()}catch(a){}return ur(),r`
    <div class="card">
      <div class="row row-between mb-s">
        <strong>${c("headset")} ${e("acc.chatTitle")}</strong>
        <a class="btn btn-ghost btn-xs" href="#/account/tickets">${c("ticket")} ${e("acc.chatOpenTicket")}</a>
      </div>
      <div class="chat-b" data-thread-page data-h="340px">${xs(t)}</div>
      <form class="chat-f mt-s" data-act="chat-send">
        <input class="input" name="body" maxlength="1000" placeholder="${e("acc.chatPlaceholder")}" autocomplete="off">
        <button type="submit" class="btn btn-primary btn-icon" aria-label="${e("common.send")}">${c("send")}</button>
      </form>
    </div>`}async function Hn(){return(await f.get("/api/me/export")).data}async function xl(){let t=null;try{t=await Hn()}catch(s){}let a=(t==null?void 0:t.reviews)||[];return a.length?r`<div class="col">${a.map(s=>r`
    <div class="card">
      <div class="row row-between">
        <strong>${h(s.productName||s.productId)}</strong>
        <span class="badge-pill ${s.status==="approved"?"bp-success":s.status==="rejected"?"bp-danger":"bp-warn"}">${e(`common.${s.status==="approved"?"approved":s.status==="rejected"?"rejected":"pending"}`)}</span>
      </div>
      <div class="row row-wrap mt-s">${s.rating?Ht(s.rating):""}<span class="muted tiny">${O(s.createdAt,{time:!1})}</span><span class="badge-pill bp-muted">${s.type==="question"?e("common.question"):e("common.review")}</span></div>
      <div class="rev-title mt-s">${h(s.title)}</div>
      <div class="rev-body">${h(s.body)}</div>
      ${s.reply?r`<div class="rev-reply"><strong>${e("pdp.storeReply")}:</strong> ${h(s.reply)}</div>`:""}
    </div>`)}</div>`:L({icon:"star",title:e("acc.reviewEmpty")})}async function El(){let t=null;try{t=await Hn()}catch(s){}let a=(t==null?void 0:t.feedback)||[];return r`
    <div class="row row-between mb">
      <strong>${e("acc.feedback")}</strong>
      <button class="btn btn-primary btn-sm" data-act="feedback-new">${c("plus")} ${e("acc.feedbackNew")}</button>
    </div>
    ${a.length?r`<div class="col">${a.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <span class="badge-pill ${s.type==="bug"?"bp-danger":s.type==="complaint"?"bp-warn":"bp-info"}">${e(`ft.${s.type}`)}</span>
          <span class="badge-pill bp-muted">${e(`fs.${s.status}`)}</span>
        </div>
        <div class="rev-title mt-s">${h(s.title)}</div>
        <div class="rev-body">${h(s.body)}</div>
        ${s.response?r`<div class="rev-reply">${h(s.response)}</div>`:""}
        <div class="muted tiny mt-s">${O(s.createdAt)}</div>
      </div>`)}</div>`:L({icon:"flag",title:e("acc.noFeedback")})}`}function ql(){let t=m.me;return r`
    <form class="card form-grid" data-act="profile-save">
      ${x({label:e("common.fullName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
      ${x({label:"Name (EN)",name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
      ${x({label:e("common.username"),name:"username",value:(t==null?void 0:t.username)||"",attrs:"disabled"})}
      ${x({label:e("common.phone"),name:"phone",type:"tel",value:(t==null?void 0:t.phone)||""})}
      ${x({label:e("common.email"),name:"email",type:"email",value:(t==null?void 0:t.email)||""})}
      <div class="span-2 row">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
      </div>
    </form>`}async function Tl(){var s;let t=null,a=[];try{t=await f.get("/api/me/2fa")}catch(n){}try{a=(await f.get("/api/me/sessions")).items||[]}catch(n){}return r`
    <div class="card mb">
      <strong>${c("key")} ${e("acc.passwordChange")}</strong>
      <form class="form-grid mt-s" data-act="pass-change">
        ${x({label:e("acc.currentPassword"),name:"current",type:"password",required:!0,autocomplete:"current-password"})}
        ${x({label:e("acc.newPassword2"),name:"next",type:"password",required:!0,hint:e("auth.passwordRules"),autocomplete:"new-password"})}
        ${x({label:e("common.passwordConfirm"),name:"confirm",type:"password",required:!0,autocomplete:"new-password"})}
        <div class="span-2"><button class="btn btn-primary" type="submit">${e("common.save")}</button></div>
      </form>
    </div>

    ${B("twoFactor")?r`
    <div class="card mb">
      <div class="row row-between">
        <strong>${c("shield")} ${e("acc.2faSection")}</strong>
        <span class="badge-pill ${t!=null&&t.enabled?"bp-success":"bp-muted"}">${t!=null&&t.enabled?e("acc.2faOn"):e("acc.2faOff")}</span>
      </div>
      <div class="mt-s" data-2fa-box>
        ${t!=null&&t.enabled?r`
          <p class="muted small">${e("acc.2faMethods")}: ${(t.methods||[]).map(n=>e(`auth.2fa${n==="totp"?"Totp":n==="sms"?"Sms":"Email"}`)).join("\u060C ")}</p>
          ${(s=t.backupCodes)!=null&&s.length?r`<details class="mt-s"><summary class="link-btn">${e("acc.2faBackup")}</summary><p class="hint">${e("acc.2faBackupHint")}</p><div class="row row-wrap">${t.backupCodes.map(n=>r`<code class="tag mono">${n}</code>`)}</div></details>`:""}
          <button class="btn btn-danger btn-sm mt" data-act="2fa-disable">${c("close")} ${e("acc.2faDisable")}</button>`:r`
          <p class="muted small">${e("acc.2faOff")}</p>
          <button class="btn btn-primary btn-sm mt-s" data-act="2fa-setup">${c("shield")} ${e("acc.2faEnable")}</button>`}
      </div>
    </div>`:""}

    <div class="card">
      <div class="row row-between">
        <strong>${c("users")} ${e("acc.sessions")}</strong>
        <button class="btn btn-ghost btn-sm" data-act="sessions-revoke">${c("logout")} ${e("acc.revokeAll")}</button>
      </div>
      <p class="muted small mt-s">${e("acc.sessionsText")}</p>
      ${lt([{label:e("acc.current")},{label:"IP"},{label:e("common.date")},{label:""}],a.map(n=>r`
          <tr>
            <td>${n.current?r`<span class="badge-pill bp-success">${e("acc.current")}</span>`:r`<span class="muted tiny">${h((n.ua||"").slice(0,40))}</span>`}</td>
            <td class="mono small">${h(n.ip||"")}</td>
            <td class="nowrap small">${O(n.lastSeenAt||n.createdAt)}</td>
            <td>${n.current?"":r`<button class="btn btn-ghost btn-xs" data-act="session-revoke" data-id="${n.id}">${c("trash")}</button>`}</td>
          </tr>`))}
    </div>`}async function Cl(){return window.qrcode||await new Promise((t,a)=>{let s=document.createElement("script");s.src="/js/vendor/qrcode-generator.js",s.onload=t,s.onerror=a,document.head.appendChild(s)}),window.qrcode}function Al(){var s;let t=m.prefs,a=((s=m.me)==null?void 0:s.notificationsPrefs)||{};return r`
    <div class="card mb">
      <strong>${c("settings")} ${e("acc.prefs")}</strong>
      <p class="muted small mt-s">${e("acc.prefsText")}</p>
      <div class="form-grid mt">
        ${Y({label:e("acc.prefTheme"),name:"theme",value:t.theme,options:[{value:"dark",label:e("theme.dark")},{value:"light",label:e("theme.light")},{value:"auto",label:e("theme.auto")}]})}
        ${Y({label:e("acc.prefLang"),name:"locale",value:t.locale,options:[{value:"fa",label:"\u0641\u0627\u0631\u0633\u06CC"},{value:"en",label:"English"}]})}
        ${Y({label:e("acc.prefDensity"),name:"density",value:t.density,options:[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"comfy",label:"Comfy"}]})}
      </div>
      ${yt({label:e("acc.prefMotion"),desc:$t()==="fa"?"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0631\u0627\u062D\u062A\u06CC \u0686\u0634\u0645":"Turn animations off",name:"reduceMotion",checked:!!t.reduceMotion})}
    </div>
    <div class="card">
      <strong>${c("bell")} ${e("acc.prefNotif")}</strong>
      <form data-act="notif-prefs" class="mt-s">
        ${yt({label:e("acc.notifMarketing"),name:"marketing",checked:!!a.marketing})}
        ${yt({label:e("acc.notifOrders"),name:"orders",checked:a.orders!==!1})}
        ${yt({label:e("acc.notifRestock"),name:"restock",checked:a.restock!==!1})}
        ${yt({label:e("acc.notifSupport"),name:"support",checked:a.support!==!1})}
        <button class="btn btn-primary mt" type="submit">${e("common.save")}</button>
      </form>
    </div>`}function Dl(){return r`
    <div class="card mb">
      <strong>${c("download")} ${e("acc.exportData")}</strong>
      <p class="muted small mt-s">${e("acc.exportHint")}</p>
      <button class="btn btn-primary mt-s" data-act="data-export">${c("download")} ${e("common.download")}</button>
    </div>
    <div class="card">
      <strong class="danger-text">${c("alert")} ${e("acc.deleteAccount")}</strong>
      <p class="muted small mt-s">${e("acc.deleteWarn")}</p>
      <button class="btn btn-danger mt-s" data-act="data-delete">${c("trash")} ${e("acc.deleteAccount")}</button>
    </div>`}function Pl(t,a){return N(t),null}async function Ll(){let t=m.me.kycStatus==="approved",a=m.me.kycStatus==="pending",s=m.me.kycStatus==="rejected";return t?r`
      <div class="card box pad text-center">
        ${c("check-circle",{style:"color:var(--success);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">احراز هویت تأیید شده است</h3>
        <p class="text-muted">شما می‌توانید بدون محدودیت از تمامی خدمات و ثبت سفارش استفاده کنید.</p>
      </div>
    `:a?r`
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
  `}function Nl(){var s,n,o,i,l;let t=((s=m.me)==null?void 0:s.referralCode)||((o=(n=m.me)==null?void 0:n.id)==null?void 0:o.substring(0,6).toUpperCase()),a=window.location.origin+"#/auth?ref="+t;return r`
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
            <input readonly value="${a}" class="input flex-1" style="font-size: 0.85rem;" dir="ltr">
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${a}'); import('../ui.mjs').then(m => m.toastSuccess('لینک کپی شد'))">${c("copy")}</button>
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
  `}var ml,La,qs,Ts,Ml,On=W(()=>{z();G();Z();K();dt();et();ut();nt();Bn();ml=[{id:"",icon:"home",label:()=>e("acc.dashboard")},{id:"orders",icon:"package-check",label:()=>e("acc.orders")},{id:"wishlist",icon:"heart",label:()=>e("acc.wishlist"),feat:"wishlist"},{id:"wallet",icon:"wallet",label:()=>e("acc.wallet"),feat:"wallet"},{id:"plus",icon:"sparkles",label:()=>e("acc.plus"),feat:"plus"},{id:"addresses",icon:"pin",label:()=>e("acc.addresses")},{id:"notifications",icon:"bell",label:()=>e("acc.notifications")},{id:"tickets",icon:"ticket",label:()=>e("acc.tickets"),feat:"tickets"},{id:"support",icon:"headset",label:()=>e("acc.support"),feat:"liveSupport"},{id:"reviews",icon:"star",label:()=>e("acc.reviews")},{id:"feedback",icon:"flag",label:()=>e("acc.feedback")},{id:"referrals",icon:"users",label:()=>"\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"},{id:"profile",icon:"user",label:()=>e("acc.profile")},{id:"kyc",icon:"shield-check",label:()=>"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (KYC)"},{id:"security",icon:"shield",label:()=>e("acc.security")},{id:"prefs",icon:"settings",label:()=>e("acc.prefs")},{id:"data",icon:"download",label:()=>e("acc.data")}];y("wallet-deposit",()=>{let t=pt({title:e("acc.walletDeposit"),size:"sm",body:r`
      <form data-act="wallet-deposit-do">
        <p class="notice notice-warn mb">${c("info")}<span>${e("checkout.gatewayDemo")}</span></p>
        ${x({label:e("acc.walletAmount"),name:"amount",type:"number",required:!0,value:"100000",attrs:'min="10000" step="10000"'})}
        <div class="row row-wrap mb">
          ${[1e5,2e5,5e5,1e6].map(a=>r`<button type="button" class="chip" data-amt="${a}">${g(a)}</button>`)}
        </div>
        <button class="btn btn-primary btn-block" type="submit">${c("card")} ${e("common.deposit")}</button>
      </form>`,onMount:(a,s)=>{a.querySelectorAll("[data-amt]").forEach(n=>n.addEventListener("click",()=>{a.querySelector("[name=amount]").value=n.dataset.amt}))}})});y("wallet-deposit-do",async(t,a)=>{t.preventDefault();let s=Number(new FormData(a).get("amount")||0);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/me/wallet/deposit",{amount:s}),await te(),E(e("acc.walletDeposited")),T(!0)}catch(n){S(n)}})});y("plus-buy",async(t,a)=>{await D(a,async()=>{try{await f.post("/api/me/plus/subscribe",{method:a.dataset.method}),await te(),E(e("acc.plusSubscribed")),T(!0)}catch(s){S(s)}})});La=null;y("addr-new",()=>{La=hr(null)});y("addr-edit",(t,a)=>{var n;let s=(((n=m.me)==null?void 0:n.addresses)||[]).find(o=>o.id===a.dataset.id);s&&(La=hr(s))});y("addr-del",async(t,a)=>{if(await Gt())try{let n=await f.del(`/api/me/addresses/${a.dataset.id}`);m.me&&(m.me.addresses=n.addresses),E(e("acc.addrDeleted")),T(!0)}catch(n){S(n)}});y("addr-default",async(t,a)=>{var n;let s=(((n=m.me)==null?void 0:n.addresses)||[]).find(o=>o.id===a.dataset.id);try{let o=await f.patch(`/api/me/addresses/${a.dataset.id}`,zt(mt({},s),{isDefault:!0}));m.me&&(m.me.addresses=o.addresses),E(e("acc.addrSaved")),T(!0)}catch(o){S(o)}});y("addr-save2",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";let o=a.dataset.id;try{let i=o?await f.patch(`/api/me/addresses/${o}`,n):await f.post("/api/me/addresses",n);m.me&&(m.me.addresses=i.addresses),E(e("acc.addrSaved")),La==null||La.close(),T(!0)}catch(i){S(i)}});y("notif-read-all",async()=>{await cs([],!0),T(!0)});y("notif-read",async(t,a)=>{await cs([a.dataset.id]),T(!0)});y("notif-del",async(t,a)=>{await un(a.dataset.id),T(!0)});qs=null;y("ticket-new",()=>{let t=m.ticketCategories||[],a=m.ticketPriorities||[];qs=pt({title:e("acc.ticketNew"),body:r`
      <form data-act="ticket-create">
        ${x({label:e("acc.ticketSubject"),name:"subject",required:!0})}
        <div class="form-grid">
          ${Y({label:e("acc.ticketCategory"),name:"category",required:!0,options:t.map(s=>({value:s.id||s,label:e(`tc.${s.id||s}`)}))})}
          ${Y({label:e("acc.ticketPriority"),name:"priority",options:a.map(s=>({value:s.id||s,label:e(`tp.${s.id||s}`)})),value:"normal"})}
        </div>
        ${J({label:e("acc.ticketBody"),name:"body",required:!0,rows:5})}
        <div class="mb">${Ue({label:r`${e("acc.ticketRules")} <a class="section-link" href="#/pages/ticketRules">${e("acc.ticketViewRules")}</a>`,name:"rules",required:!0})}</div>
        <button class="btn btn-primary btn-block" type="submit">${e("common.submit")}</button>
      </form>`})});y("ticket-create",async(t,a)=>{t.preventDefault();let s=new FormData(a);if(s.get("rules")!=="on"){V(e("form.rulesRequired"));return}await D(a.querySelector("button[type=submit]"),async()=>{var n,o;try{let i=await f.post("/api/tickets",{subject:s.get("subject"),category:s.get("category"),priority:s.get("priority"),body:s.get("body"),rulesAccepted:!0});E(e("acc.ticketCreated",{code:((n=i.ticket)==null?void 0:n.code)||""})),qs==null||qs.close(),bt(`#/account/tickets/${((o=i.ticket)==null?void 0:o.id)||""}`)}catch(i){S(i)}})});Ts=null;y("feedback-new",()=>{var t,a;Ts=pt({title:e("acc.feedbackNew"),body:r`
      <form data-act="feedback-send">
        ${Y({label:e("acc.feedbackType"),name:"type",options:["suggestion","complaint","bug"].map(s=>({value:s,label:e(`ft.${s}`)})),value:"suggestion"})}
        ${x({label:e("common.title"),name:"title",required:!0})}
        ${J({label:e("common.body"),name:"body",required:!0,rows:5})}
        ${x({label:e("acc.feedbackContact"),name:"contact",hint:e("acc.feedbackContactHint"),value:((t=m.me)==null?void 0:t.phone)||((a=m.me)==null?void 0:a.email)||""})}
        ${m.me?"":De()}
        <button class="btn btn-primary btn-block" type="submit">${e("common.submit")}</button>
      </form>`})});y("feedback-send",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/feedback",{type:s.get("type"),title:s.get("title"),body:s.get("body"),contact:s.get("contact")||"",captchaToken:s.get("captchaToken")||void 0}),E(e("acc.feedbackSent")),Ts==null||Ts.close(),T(!0)}catch(n){if((n==null?void 0:n.code)==="captcha_required"){let o=a.querySelector("[data-captcha]");o&&(o.hidden=!1)}S(n)}})});y("profile-save",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{try{let n=await f.patch("/api/me",{name:s.get("name"),nameEn:s.get("nameEn"),phone:s.get("phone"),email:s.get("email")});m.me=n.me,E(e("acc.profileSaved")),T(!0)}catch(n){S(n)}})});y("pass-change",async(t,a)=>{t.preventDefault();let s=new FormData(a);if(s.get("next")!==s.get("confirm")){V($t()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),E(e("acc.passwordChanged")),a.reset()}catch(n){S(n)}})});y("2fa-setup",async()=>{try{let t=await f.get("/api/me/2fa");pt({title:e("acc.2faEnable"),body:r`
        <div data-2fa-setup>
          <p class="muted small">${e("acc.2faScan")}</p>
          <div class="center mt-s" data-qr></div>
          <p class="hint t-center mono" data-key>${t.secret||""}</p>
          <div class="btn-group mt-s" data-methods>
            <button type="button" class="btn active" data-mm="totp">${e("auth.2faTotp")}</button>
            <button type="button" class="btn" data-mm="sms" ${t.hasPhone?"":"disabled"}>${e("auth.2faSms")}</button>
            <button type="button" class="btn" data-mm="email" ${t.hasEmail?"":"disabled"}>${e("auth.2faEmail")}</button>
          </div>
          <form data-act="2fa-enable" class="mt">
            ${x({label:e("acc.2faEnterCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${e("common.confirm")}</button>
          </form>
        </div>`,onMount:async a=>{try{let n=(await Cl())(0,"M");n.addData(t.otpauth),n.make();let o=a.querySelector("[data-qr]"),i=n.createSvgTag({cellSize:4,margin:2});o.innerHTML=i;let l=o.querySelector("svg");l&&(l.setAttribute("width","180"),l.setAttribute("height","180"),l.classList.add("qr-img"))}catch(s){a.querySelector("[data-qr]").innerHTML=r`<code class="tag mono">${t.otpauth}</code>`}a.querySelector("[data-methods]").addEventListener("click",s=>{let n=s.target.closest("[data-mm]");n&&(a.querySelectorAll("[data-mm]").forEach(o=>o.classList.toggle("active",o===n)),a.querySelector("[name=code]").closest(".field").hidden=n.dataset.mm!=="totp")})}})}catch(t){S(t)}});y("2fa-enable",async(t,a)=>{var o;let s=((o=a.closest("[data-2fa-setup]").querySelector("[data-mm].active"))==null?void 0:o.dataset.mm)||"totp",n=new FormData(a).get("code")||"";await D(a.querySelector("button[type=submit]"),async()=>{var i;try{let l=await f.post("/api/me/2fa/enable",{method:s,code:n});await te(),E(e("acc.2faEnabled")),(i=l.backupCodes)!=null&&i.length&&pt({title:e("acc.2faBackup"),size:"sm",body:r`<p class="hint">${e("acc.2faBackupHint")}</p><div class="row row-wrap mt-s">${l.backupCodes.map(p=>r`<code class="tag mono b">${p}</code>`)}</div>`}),T(!0)}catch(l){S(l)}})});y("2fa-disable",async()=>{let t=await de({title:e("acc.2faDisable"),label:e("common.password"),type:"password",required:!0});if(t!==null)try{await f.post("/api/me/2fa/disable",{password:t}),await te(),E(e("acc.2faDisabled")),T(!0)}catch(a){S(a)}});y("sessions-revoke",async()=>{if(await wt({text:e("acc.revokeAll"),danger:!0}))try{await f.post("/api/me/sessions/revoke",{allOthers:!0}),E(e("acc.revokeDone")),T(!0)}catch(a){S(a)}});y("session-revoke",async(t,a)=>{try{await f.post("/api/me/sessions/revoke",{id:a.dataset.id}),E(e("acc.revokeDone")),T(!0)}catch(s){S(s)}});y("notif-prefs",async(t,a)=>{t.preventDefault();let s=new FormData(a);try{let n=await f.patch("/api/me",{notificationsPrefs:{marketing:s.get("marketing")==="on",orders:s.get("orders")==="on",restock:s.get("restock")==="on",support:s.get("support")==="on"}});m.me=n.me,E(e("misc.saved"))}catch(n){S(n)}});y("data-export",async(t,a)=>{await D(a,async()=>{try{let s=await Hn(),n=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`bander-mobile-data-${new Date().toISOString().slice(0,10)}.json`,i.click(),setTimeout(()=>URL.revokeObjectURL(o),4e3),E(e("common.download"))}catch(s){S(s)}})});y("data-delete",async()=>{if(!await wt({title:e("acc.deleteAccount"),text:e("acc.deleteWarn"),danger:!0,okText:e("common.delete")}))return;let a=await de({title:e("acc.deleteConfirm"),label:e("common.password"),type:"password",required:!0});if(a!==null)try{await f.post("/api/me/delete",{password:a}),m.me=null,bt("#/"),T()}catch(s){S(s)}});Ml=t=>e("acc.title")});var gr={};X(gr,{mount:()=>Bl,render:()=>Rl});async function Rl(t){var i,l,p,d,b,u,v,$,w;let a=t.params.id,s=null;try{s=await f.get(`/api/me/orders/${a}`)}catch(k){return(k==null?void 0:k.status)===404?L({icon:"package-check",title:e("acc.noOrders"),action:{href:"#/account/orders",label:e("acc.orders")}}):U({title:e("err.generic")})}let n=s.order,o=new Set(s.canReviewIds||[]);return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${e("acc.title")}</a> <span>/</span>
      <a href="#/account/orders">${e("acc.orders")}</a> <span>/</span>
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
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${n.id}">${c("printer")} ${e("acc.printInvoice")}</button>
              ${((p=n.payment)==null?void 0:p.status)==="unpaid"?r`<a class="btn btn-primary btn-sm" href="#/pay/${n.id}">${c("card")} ${e("common.payable")} ${A(n.payable)}</a>`:""}
              ${["pending_review","pending_payment","confirmed","preparing"].includes(n.status)?r`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${n.id}">${c("close")} ${e("acc.cancelOrder")}</button>`:""}
            ${n.tracking?r`<span class="row gap-s"><span class="badge-pill bp-info mono">${c("truck")} ${h(n.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${h(n.tracking)}">${c("copy")} ${e("common.copy")}</button></span>`:""}
            </div>
          </div>
          ${(d=n.statusInfo)!=null&&d.fa&&q()===!1&&((b=n.statusInfo)!=null&&b.en)?r`<p class="muted small">${h(n.statusInfo.en)}</p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${e("acc.timeline")}</strong>
          ${ea(n)}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${e("acc.orderItems")} (${g(((u=n.items)==null?void 0:u.length)||0)})</strong>
          ${lt([{label:""},{label:e("common.product")},{label:e("common.price"),cls:"num"},{label:e("common.count"),cls:"num"},{label:e("common.total"),cls:"num"},{label:""}],(n.items||[]).map(k=>r`
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
                <td>${o.has(k.productId)?r`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${k.productId}" data-name="${h(q()?k.name:k.nameEn||k.name)}">${c("star")} ${e("pdp.writeReview")}</button>`:""}</td>
              </tr>`))}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${n.id}">${c("cart")} ${e("acc.reorder")}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${e("acc.chatOpenTicket")}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${e("cart.summary")}</strong>
          <div class="sum-row"><span>${e("common.subtotal")}</span><span class="v">${A(n.subtotal)}</span></div>
          ${n.plusDiscount>0?r`<div class="sum-row discount"><span>${e("acc.plus")}</span><span class="v">−${A(n.plusDiscount)}</span></div>`:""}
          ${n.couponDiscount>0?r`<div class="sum-row discount"><span>${e("common.discountCode")}: ${n.couponCode}</span><span class="v">−${A(n.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${e("common.shipping")}${n.shippingLabel?r` <span class="muted tiny">(${h(n.shippingLabel)})</span>`:""}</span><span class="v">${n.shipping===0?e("common.free"):A(n.shipping)}</span></div>
          ${n.insured?r`<div class="sum-row"><span>${e("common.insurance")}</span><span class="v">${n.insuranceFee===0?e("common.free"):A(n.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${e("common.total")}</span><span class="v">${A(n.total)}</span></div>
          ${n.walletUsed>0?r`<div class="sum-row discount"><span>${e("common.wallet")}</span><span class="v">−${A(n.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${e("common.payable")}</span><span class="v">${A(n.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${e("common.payment")}</span>
            ${ze(n.payment)}
          </div>
          ${(v=n.payment)!=null&&v.ref?r`<p class="hint mono mt-s">${h(n.payment.ref)}</p>`:""}
          ${n.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${A(n.refund.amount)} ${e("acc.tx.refund")} — ${O(n.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${e(n.delivery==="pickup"?"checkout.pickup":"checkout.courier")}</strong>
          ${n.delivery==="pickup"?r`
            <p class="muted small mt-s">${e("checkout.pickupDesc")}</p>
            <p class="mt-s small">${h(((w=($=m.settings)==null?void 0:$.store)==null?void 0:w.address)||"")}</p>`:r`
            ${n.address?r`
              <p class="small mt-s"><strong>${h(n.address.receiver||"")}</strong> · ${at(n.address.phone||"")}</p>
              <p class="muted small">${h(n.address.street||"")}${n.address.city?`\u060C ${h(n.address.city)}`:""}</p>
              ${n.address.postal?r`<p class="muted small">${e("common.postal")}: ${h(n.address.postal)}</p>`:""}`:r`<p class="muted small mt-s">${e("acc.noAddress")}</p>`}
            ${n.zone?r`<p class="small mt-s">${e("checkout.zone")}: ${h(Il(n.zone))}</p>`:""}`}
          ${n.express?r`<p class="small mt-s"><span class="badge-pill bp-accent">${c("zap")} ${e("checkout.express")}</span></p>`:""}
          ${n.insured?r`<p class="small mt-s"><span class="badge-pill bp-success">${c("shield")} ${e("common.insurance")} ${A(n.insuranceFee)}</span></p>`:""}
          ${n.note?r`<p class="hint mt-s">${c("edit")} ${h(n.note)}</p>`:""}
          ${n.couponCode?r`<p class="hint mt-s">${c("percent")} ${n.couponCode}</p>`:""}
        </div>
      </aside>
    </div>`}function Bl(t,a){return N(t),null}var Il,fr=W(()=>{z();G();Z();K();dt();et();ut();nt();K();Il=t=>{let a=(ve().zones||[]).find(s=>s.id===t);return a?q()?a.name:a.nameEn||a.name:t||""};y("od-cancel",async(t,a)=>{let s=await de({title:e("acc.cancelOrder"),text:e("acc.cancelReason"),label:e("acc.cancelReason"),rows:3,okText:e("acc.cancelOrder")});if(s!==null)try{await f.post(`/api/me/orders/${a.dataset.id}/cancel`,{reason:s||""}),E(e("acc.orderCancelled")),T(!0)}catch(n){S(n)}});y("od-reorder",async(t,a)=>{await D(a,async()=>{try{let{order:s}=await f.get(`/api/me/orders/${a.dataset.id}`),n=0;for(let o of s.items||[])try{await f.post("/api/cart/add",{productId:o.productId,qty:o.qty||1}),n+=1}catch(i){}if(await Mt(),!n){S({code:"out_of_stock",message:q()?"\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645 \u0627\u0632 \u0627\u0642\u0644\u0627\u0645 \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u0646\u06CC\u0633\u062A.":"None of the items are in stock."});return}E(e("card.added")),bt("#/cart")}catch(s){S(s)}})});y("od-invoice",async(t,a)=>{var o,i,l,p;let{order:s}=await f.get(`/api/me/orders/${a.dataset.id}`),n=((o=m.settings)==null?void 0:o.store)||{};pt({title:e("acc.invoice"),body:r`
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
        <button class="btn btn-primary" data-act="print-page">${c("printer")} ${e("common.print")}</button>
      </div>`})});y("od-review",(t,a)=>{let s=a.dataset.id,n=a.dataset.name||"",o=pt({title:`${e("pdp.writeReview")} \u2014 ${n}`,body:r`
      <form data-act="od-review-send" data-id="${s}">
        <div class="field"><span class="label">${e("pdp.yourRating")}</span>${hs({name:"rating",value:5})}</div>
        ${x({label:e("common.title"),name:"title",required:!0})}
        ${J({label:e("common.body"),name:"body",required:!0,rows:5})}
        <p class="hint mb">${e("pdp.reviewPending")}</p>
        <button class="btn btn-primary btn-block" type="submit">${e("common.submit")}</button>
      </form>`})});y("od-review-send",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{var n;try{await f.post("/api/reviews",{productId:a.dataset.id,type:"review",rating:Number(s.get("rating")||5),title:s.get("title"),body:s.get("body")}),E(e("pdp.reviewSubmitted")),(n=a.closest(".overlay"))==null||n.remove()}catch(o){S(o)}})})});var yr={};X(yr,{mount:()=>jl,render:()=>Ol});async function Ol(t){var o,i;let a=null;try{a=(await f.get(`/api/tickets/${t.params.id}`)).ticket}catch(l){return(l==null?void 0:l.status)===404?L({icon:"ticket",title:e("acc.noTickets"),action:{href:"#/account/tickets",label:e("acc.tickets")}}):U({title:e("err.generic")})}We=[];let s=((o=(m.ticketPriorities||[]).find(l=>l.id===a.priority))==null?void 0:o.slaHours)||24,n=a.status==="closed";return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${e("acc.title")}</a> <span>/</span>
      <a href="#/account/tickets">${e("acc.tickets")}</a> <span>/</span>
      <span class="mono">${a.code}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h1 class="buy-title">${c("ticket")} ${h(a.subject)}</h1>
          <p class="muted small mt-s">
            <span class="mono">${a.code}</span> · ${O(a.createdAt)} ·
            ${e("acc.ticketCategory")}: ${e(`tc.${a.category}`)}
          </p>
        </div>
        <div class="row row-wrap">
          <span class="badge-pill ${Hl[a.status]||"bp-muted"}">${e(`tk.${a.status}`)}</span>
          <span class="badge-pill ${Fl[a.priority]||"bp-info"}">${e(`tp.${a.priority}`)}</span>
          ${n?"":r`<button class="btn btn-ghost btn-sm" data-act="tk-close" data-id="${a.id}">${c("check")} ${e("acc.ticketClose")}</button>`}
        </div>
      </div>
      <p class="notice notice-info mt-s">${c("clock")}<span>${e("acc.ticketSla",{h:g(s)})}</span></p>
    </div>

    <div class="card mt">
      <strong>${c("chat")} ${e("common.messages")} (${g(((i=a.messages)==null?void 0:i.length)||0)})</strong>
      <div class="tk-thread mt-s" data-tk-thread>
        ${(a.messages||[]).map(vr).join("")}
      </div>

      ${n?r`<p class="notice notice-warn mt">${c("info")}<span>${e("acc.ticketClosedNote")}</span></p>`:""}
      <form class="mt" data-act="tk-reply" data-id="${a.id}">
        ${J({label:e("acc.ticketWrite"),name:"body",required:!0,rows:4,placeholder:e("acc.chatPlaceholder")})}
        <div data-attach-preview class="row row-wrap mt-s"></div>
        <div class="row row-between row-wrap mt-s">
          <div class="row row-wrap">
            <label class="btn btn-ghost btn-sm" for="tk-file">${c("upload")} ${e("common.attach")}</label>
            <input id="tk-file" type="file" accept="image/*" multiple hidden data-attach-input>
            <span class="hint">${e("acc.attachHint")}</span>
          </div>
          <button class="btn btn-primary" type="submit">${c("send")} ${e("common.send")}</button>
        </div>
      </form>
    </div>`}function vr(t){var n;let a=t.from==="user",s=t.from==="system"?"them sys":a?"me":"them";return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(a?((n=m.me)==null?void 0:n.name)||e("common.user"):t.from==="staff"?e("common.support"):t.name||"")}</strong>
          <span class="tiny muted nowrap">${St(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${o}" alt="${e("common.image")}" loading="lazy" data-act="tk-att-open" data-url="${o}">`)}</div>`:""}
      </div>
    </div>`}function jn(t){let a=t.querySelector("[data-attach-preview]");a&&(a.innerHTML=We.map((s,n)=>r`
    <span class="att-chip">
      <img src="${s.url}" alt="${h(s.name)}">
      <button type="button" class="att-x" data-act="tk-att-del" data-i="${n}" aria-label="${e("common.delete")}">${c("close")}</button>
    </span>`).join(""))}function jl(t,a){N(t);let s=t.querySelector("[data-attach-input]");s&&s.addEventListener("change",o=>{let i=wr("tk-attach-pick");i==null||i(o,o.target)});let n=t.querySelector("[data-tk-thread]");return n&&(n.scrollTop=n.scrollHeight),null}var Hl,Fl,We,$r=W(()=>{z();G();Z();K();dt();et();ut();nt();Hl={open:"bp-warn",answered:"bp-success",closed:"bp-muted",in_progress:"bp-info",new:"bp-info"},Fl={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},We=[];y("tk-att-open",(t,a)=>{let n=[...document.querySelectorAll("[data-tk-thread] .tk-att")].map(o=>o.getAttribute("src"));He(n.length?n:[a.getAttribute("src")],Math.max(0,n.indexOf(a.getAttribute("src"))))});y("tk-attach-pick",async(t,a)=>{let s=a.closest("form"),n=[...a.files||[]].slice(0,4-We.length);a.value="";for(let o of n){if(o.size>4*1024*1024){V(e("err.tooLarge"));continue}try{let i=await Ie(o),l=await f.upload(i);We.push({url:l.url,name:o.name})}catch(i){S(i)}}jn(s)});y("tk-att-del",(t,a)=>{We.splice(Number(a.dataset.i),1),jn(a.closest("form"))});y("tk-reply",async(t,a)=>{t.preventDefault();let s=String(new FormData(a).get("body")||"").trim();if(s.length<2){V(e("acc.ticketBodyShort"));return}let n=a.querySelector("button[type=submit]");await D(n,async()=>{var o;try{let i=await f.post(`/api/tickets/${a.dataset.id}/messages`,{body:s,attachments:We.map(p=>p.url)});We=[];let l=a.closest(".card").querySelector("[data-tk-thread]");l&&(l.innerHTML=(((o=i.ticket)==null?void 0:o.messages)||[]).map(vr).join(""),l.scrollTop=l.scrollHeight),a.reset(),jn(a),E(e("common.sent")),ye(!0)}catch(i){S(i)}})});y("tk-close",async(t,a)=>{await wt({text:e("acc.ticketCloseConfirm"),okText:e("acc.ticketClose")})&&await D(a,async()=>{try{await f.post(`/api/tickets/${a.dataset.id}/close`,{}),E(e("common.done")),T(!0)}catch(n){S(n)}})})});var kr={};X(kr,{render:()=>zl});async function zl(){let t=null;try{t=await f.get("/api/stats/public")}catch(l){}if(!t)return r`<div class="empty"><h4>${e("err.network")}</h4></div>`;let a=t.stats||{},s=t.chart||[],n=t.topProducts||[],o=Math.max(1,...s.map(l=>l.visits)),i=s.map(l=>{let p=Math.min(12,Math.max(1,Math.round(l.visits/o*12)));return r`<div class="ch-col" title="${l.date}: ${oe(l.visits)}">
      <i class="hb-${p}"></i>
      <span>${oe(Number(l.date.slice(8,10)))}</span>
    </div>`}).join("");return r`
    <div class="page-head">
      <h1 class="page-h1">${c("chart")} ${e("stats.title")}</h1>
      <p class="muted small">${e("stats.subtitle")}</p>
    </div>

    <section class="section">
      <div class="stats-grid">
        ${Ct({icon:"box",label:e("stats.products"),value:g(a.products)})}
        ${Ct({icon:"grid",label:e("stats.categories"),value:g(a.categories)})}
        ${Ct({icon:"cart",label:e("stats.ordersTotal"),value:g(a.ordersTotal)})}
        ${Ct({icon:"package-check",label:e("stats.delivered"),value:g(a.deliveredOrders)})}
        ${Ct({icon:"users",label:e("stats.customers"),value:g(a.customers)})}
        ${Ct({icon:"eye",label:e("stats.visitsTotal"),value:g(a.visitsTotal)})}
        ${Ct({icon:"chart",label:e("stats.visitsToday"),value:g(a.visitsToday)})}
        ${Ct({icon:"sparkles",label:e("stats.plusMembers"),value:g(a.plusMembers)})}
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"chart",title:e("stats.chartTitle")})}
      <div class="card chart-card">
        <div class="chart">${i}</div>
        <p class="hint mt-s">${e("stats.chartHint")}</p>
      </div>
    </section>

    ${n!=null&&n.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:e("stats.topTitle")})}
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
  `}var Sr=W(()=>{z();G();K();Z();dt()});var Er={};X(Er,{mount:()=>Xl,render:()=>Ul,title:()=>Zl});function ia(t,a=""){return t!=null&&t.hero?r`
    <div class="page-hero mb">
      <h1 class="page-title">${h(ue(t.hero,"title"))}</h1>
      ${ue(t.hero,"subtitle")?r`<p class="page-sub">${h(ue(t.hero,"subtitle"))}</p>`:""}
      ${a}
    </div>`:""}function zn(t){return t!=null&&t.length?t.map(a=>r`
    <div class="card mt">
      <h2 class="page-h2">${h(ue(a,"title"))}</h2>
      ${a.body||a.bodyEn?r`<div class="page-body">${ct(ue(a,"body"))}</div>`:""}
      ${ca(ra(a,"list").length?ra(a,"list"):a.list||[])}
    </div>`).join(""):""}async function Ul(t){let a=String(t.params.key||""),s=null;try{s=await f.get(`/api/pages/${a}`)}catch(o){}if(!(s!=null&&s.page))return L({icon:"file",title:e("err.notFound"),text:e("err.notFoundText"),action:{href:"#/",label:e("err.goHome")}});let n=s.page;if(Array.isArray(n))return Jl(n);switch(a){case"about":return _l(n);case"guide":return Vl(n);case"service":return Yl(n);case"contact":return Ql(n);case"bugReport":return Kl(n);default:return Gl(n)}}async function _l(t){var s;let a=null;if(B("publicStats"))try{a=(await f.get("/api/stats/public")).stats}catch(n){}return r`
    ${ia(t)}
    ${a&&((s=t.stats)!=null&&s.length)?r`
      <div class="section-head"><div><h2 class="section-title">${c("chart")} ${e("page.statsTitle")}</h2></div></div>
      <div class="stats-grid">
        ${t.stats.map(n=>Ct({icon:Wl(n.key),label:q()?n.fa:n.en||n.fa,value:g(Number(a[n.key]||0))}))}
      </div>`:""}
    ${zn(t.sections)}
    <div class="card mt t-center">
      <strong>${c("heart")} ${e("page.aboutCta")}</strong>
      <div class="row center row-wrap mt-s">
        <a class="btn btn-primary" href="#/products">${c("cart")} ${e("cart.goShopping")}</a>
        <a class="btn btn-ghost" href="#/pages/contact">${c("phone")} ${e("contact.title")}</a>
        <a class="btn btn-ghost" href="#/pages/guide">${c("file")} ${e("footer.guide")}</a>
      </div>
    </div>`}function Wl(t){return{years:"clock",products:"box",orders:"package-check",customers:"users",visits:"eye"}[t]||"chart"}function Vl(t){var a,s;return r`
    ${ia(t)}
    ${(a=t.steps)!=null&&a.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("list")} ${e("page.stepsTitle")}</h2></div></div>
      <ol class="steps-list">
        ${t.steps.map(n=>r`
          <li class="card step-item">
            <div class="grow">
              <strong>${h(ue(n,"title"))}</strong>
              <p class="muted small mt-s">${h(ue(n,"body"))}</p>
              ${ca(ra(n,"list").length?ra(n,"list"):n.list||[])}
            </div>
          </li>`)}
      </ol>`:""}
    ${(s=t.tips)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("zap")} ${e("page.tipsTitle")}</h2>
        ${ca((q(),t.tips).map(n=>q()?n.fa:n.en||n.fa))}
      </div>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-primary" href="#/products">${e("cart.goShopping")}</a>
      <a class="btn btn-ghost" href="#/pages/faq">${c("info")} ${e("footer.faq")}</a>
    </div>`}function Yl(t){return r`
    ${ia(t)}
    <div class="pwa-grid">
      ${(t.items||[]).map(a=>r`
        <div class="pwa-card">
          <span class="pwa-ic">${c(a.icon||"check")}</span>
          <div>
            <strong>${h(ue(a,"title"))}</strong>
            <p class="muted small mt-s">${h(ue(a,"body"))}</p>
            ${ca(ra(a,"list").length?ra(a,"list"):a.list||[])}
          </div>
        </div>`)}
    </div>
    ${zn(t.sections)}`}function Gl(t){var a,s;return r`
    ${ia(t)}
    ${t.intro||t.introEn?r`<p class="page-lead">${h(q()?t.intro:t.introEn||t.intro)}</p>`:""}
    ${t.body||t.bodyEn?r`<div class="card"><div class="page-body">${ct(q()?t.body:t.bodyEn||t.body)}</div></div>`:""}
    ${(a=t.rules)!=null&&a.length||(s=t.rulesEn)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("check")} ${e("page.rulesTitle")}</h2>
        ${ca(q()?t.rules:t.rulesEn||t.rules)}
      </div>`:""}
    ${zn(t.sections)}
    ${t.notice||t.noticeEn?r`<p class="notice notice-warn mt">${c("info")}<span>${h(q()?t.notice:t.noticeEn||t.notice)}</span></p>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-ghost" href="#/pages/terms">${c("file")} ${e("footer.terms")}</a>
      <a class="btn btn-ghost" href="#/pages/privacy">${c("shield")} ${e("footer.privacy")}</a>
      <a class="btn btn-ghost" href="#/pages/insurance">${c("truck")} ${e("footer.insurance")}</a>
      <a class="btn btn-ghost" href="#/pages/ticketRules">${c("ticket")} ${e("acc.ticketViewRules")}</a>
    </div>
    ${(t.id==="terms"||t.id==="privacy")&&!hasConsent()?r`
      <div class="card mt bg-shade">
        <p class="mb-s b">${q()?"\u0622\u06CC\u0627 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0631\u0627 \u0645\u0637\u0627\u0644\u0639\u0647 \u06A9\u0631\u062F\u06CC\u062F\u061F":"Have you read the terms?"}</p>
        <button type="button" class="btn btn-primary" data-act="accept-consent-now">${c("check")} ${e("consent.accept")}</button>
      </div>
    `:""}
    `}function Kl(t){var a,s,n;return r`
    ${ia(t)}
    ${t.body||t.bodyEn?r`<p class="page-lead">${h(q()?t.body:t.bodyEn||t.body)}</p>`:""}
    ${(a=t.hints)!=null&&a.length?r`
      <div class="card">
        <h2 class="page-h2">${c("info")} ${e("page.hintsTitle")}</h2>
        ${ca(q()?t.hints:t.hintsEn||t.hints)}
      </div>`:""}
    <form class="card mt" data-act="page-feedback">
      <input type="hidden" name="type" value="bug">
      <h2 class="page-h2">${c("bug")} ${e("page.bugTitle")}</h2>
      ${x({label:e("common.title"),name:"title",required:!0})}
      ${J({label:e("common.body"),name:"body",required:!0,rows:6})}
      ${x({label:e("acc.feedbackContact"),name:"contact",hint:e("acc.feedbackContactHint"),value:((s=m.me)==null?void 0:s.phone)||((n=m.me)==null?void 0:n.email)||""})}
      <button class="btn btn-primary" type="submit">${c("send")} ${e("common.submit")}</button>
    </form>`}function Ql(t){var i,l;let a=Xt(),s=a.socials||{},n="https://instagram.com/jam.yassaei",o=[{key:"instagram",icon:"camera",url:Dt(s.instagram||n)},{key:"telegram",icon:"send",url:Dt(s.telegram)},{key:"eitaa",icon:"message",url:Dt(s.eitaa)},{key:"whatsapp",icon:"chat",url:a.whatsapp?`https://wa.me/${String(a.whatsapp).replace(/\D/g,"")}`:""}].filter(p=>p.url);return r`
    ${ia(t)}
    <div class="acc-grid">
      <div class="col">
        <div class="card">
          <h2 class="page-h2">${c("pin")} ${e("contact.addressUs")}</h2>
          <p class="page-body">${h(q()?a.address:a.addressEn||a.address)}</p>
          <div class="row row-wrap mt-s">
            <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${h(q()?a.address:a.addressEn||a.address)}">${c("copy")} ${e("contact.copyAddress")}</button>
            ${a.phone?r`<a class="btn btn-primary btn-sm" href="tel:${a.phone}">${c("phone")} ${e("contact.callNow")}</a>`:""}
            ${a.email?r`<a class="btn btn-ghost btn-sm" href="mailto:${a.email}">${c("mail")} ${e("contact.emailUs")}</a>`:""}
          </div>
          <div class="contact-list mt">
            ${a.phone?r`<div class="row"><span class="muted small">${e("contact.phone")}</span><a class="mono" href="tel:${a.phone}">${at(a.phone)}</a></div>`:""}
            ${a.phone2?r`<div class="row"><span class="muted small">${e("contact.mobile")}</span><a class="mono" href="tel:${a.phone2}">${at(a.phone2)}</a></div>`:""}
            ${a.phone3?r`<div class="row"><span class="muted small">${e("contact.phone3")}</span><a class="mono" href="tel:${a.phone3}">${at(a.phone3)}</a></div>`:""}
            ${a.whatsapp?r`<div class="row"><span class="muted small">${e("contact.whatsapp")}</span><span class="mono">${at(a.whatsapp)}</span></div>`:""}
            ${a.email?r`<div class="row"><span class="muted small">${e("common.email")}</span><span class="mono small">${h(a.email)}</span></div>`:""}
          </div>
          ${o.length?r`<div class="row row-wrap mt-s">${o.map(p=>r`<a class="btn btn-ghost btn-sm" href="${h(p.url)}" target="_blank" rel="noopener">${c(p.icon)} ${e("social."+p.key)}</a>`)}</div>`:""}
        </div>

        <div class="card mt">
          <h2 class="page-h2">${c("clock")} ${e("footer.workingHours")}</h2>
          ${(a.workingHours||[]).map(p=>r`
            <div class="row row-between mt-s">
              <span class="small">${h(q()?p.fa||p.day:p.en||p.day)}</span>
              <span class="small b mono">${h(q()?p.time:p.timeEn||p.time)}</span>
            </div>`)}
        </div>

        <form class="card mt" data-act="page-feedback">
          <input type="hidden" name="type" value="suggestion">
          <h2 class="page-h2">${c("chat")} ${e("contact.formTitle")}</h2>
          <p class="muted small mb-s">${e("contact.formText")}</p>
          ${x({label:e("common.title"),name:"title",required:!0})}
          ${J({label:e("common.message"),name:"body",required:!0,rows:5})}
          ${x({label:e("acc.feedbackContact"),name:"contact",value:((i=m.me)==null?void 0:i.phone)||((l=m.me)==null?void 0:l.email)||""})}
          <button class="btn btn-primary" type="submit">${c("send")} ${e("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        ${Dt(s.instagram||n)||Dt(s.telegram)?r`
        <div class="card">
          <h2 class="page-h2">${c("globe")} ${e("contact.socials")}</h2>
          <p class="muted small">${e("contact.socialsDesc",{default:"\u0645\u0627 \u0631\u0627 \u062F\u0631 \u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u062F."})}</p>
          <div class="row row-wrap mt-s" style="gap: 12px;">
            ${Dt(s.instagram||n)?r`<a class="btn btn-outline btn-sm" href="${h(Dt(s.instagram||n))}" target="_blank" rel="noopener">${c("camera")} ${e("social.instagram")}</a>`:""}
            ${Dt(s.telegram)?r`<a class="btn btn-primary btn-sm" href="${h(Dt(s.telegram))}" target="_blank" rel="noopener">${c("send")} ${e("contact.tgBotBtn")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card ${Dt(s.telegram)||Dt(s.instagram||n)?"mt":""}">
          <h2 class="page-h2">${c("map")} ${e("contact.mapTitle")}</h2>
          <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${e("contact.mapTitle")}">
            ${ct(aa())}
            <span class="minimap-hint">${c("pin")} ${e("contact.mapHint")}</span>
          </div>
          <p class="hint mt-s">${e("contact.mapAsk")}</p>
          <button class="btn btn-outline btn-block mt-s" data-act="open-map">${c("map")} ${e("contact.openMaps")}</button>
        </div>

        ${B("liveSupport")?r`
        <div class="card mt">
          <h2 class="page-h2">${c("headset")} ${e("common.support")}</h2>
          <p class="muted small">${e("acc.chatTitle")}</p>
          <div class="row row-wrap mt-s">
            ${m.me?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${e("acc.chatTitle")}</button>`:r`<a class="btn btn-primary btn-sm" href="#/auth">${c("user")} ${e("nav.login")}</a>`}
            ${B("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${e("common.ticket")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card mt">
          <h2 class="page-h2">${c("info")} ${e("footer.faq")}</h2>
          <p class="muted small">${e("faq.askText")}</p>
          <a class="btn btn-ghost btn-sm mt-s" href="#/pages/faq">${e("footer.faq")}</a>
        </div>
      </aside>
    </div>`}function Jl(t){let a=[...new Set(t.map(s=>s.cat||"other"))];return r`
    <div class="page-hero mb">
      <h1 class="page-title">${c("info")} ${e("footer.faq")}</h1>
      <p class="page-sub">${e("faq.askText")}</p>
    </div>
    <div class="field mb">
      <input class="input" type="search" id="faq-q" placeholder="${e("faq.search")}" data-faq-q autocomplete="off">
    </div>
    <div class="row row-wrap mb" data-faq-cats>
      <button type="button" class="chip active" data-act="faq-cat" data-cat="">${e("faq.all")}</button>
      ${a.map(s=>r`<button type="button" class="chip" data-act="faq-cat" data-cat="${s}">${e(`faq.cat.${s}`)}</button>`)}
    </div>
    <p class="muted small mb-s" data-faq-count>${e("faq.results",{n:g(t.length)})}</p>
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
      <p class="muted">${e("faq.notFound")}</p>
      <div class="row center row-wrap mt-s">
        ${m.me&&B("liveSupport")?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${e("acc.chatTitle")}</button>`:""}
        ${B("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${e("acc.ticketNew")}</a>`:""}
      </div>
    </div>`}function xr(){var l,p;let t=document.querySelector("[data-faq-list]");if(!t)return;let a=(((l=document.querySelector("[data-faq-q]"))==null?void 0:l.value)||"").trim().toLowerCase(),s=((p=document.querySelector("[data-faq-cats] .chip.active"))==null?void 0:p.dataset.cat)||"",n=0;t.querySelectorAll(".acc-item").forEach(d=>{let b=!s||d.dataset.cat===s,u=!a||(d.dataset.text||"").includes(a),v=b&&u;d.hidden=!v,v&&(n+=1)});let o=document.querySelector("[data-faq-count]");o&&(o.textContent=e("faq.results",{n:g(n)}));let i=document.querySelector("[data-faq-empty]");i&&(i.hidden=n!==0)}function Xl(t,a){N(t),kn(t);let s=t.querySelector("[data-faq-q]");if(s){let n=0;s.addEventListener("input",()=>{clearTimeout(n),n=setTimeout(xr,160)})}return null}var ue,ra,ca,Zl,qr=W(()=>{z();G();Z();K();dt();et();ut();ue=(t,a)=>{var s,n,o;return q()?(s=t==null?void 0:t[a])!=null?s:"":(o=(n=t==null?void 0:t[`${a}En`])!=null?n:t==null?void 0:t[a])!=null?o:""},ra=(t,a)=>q()?(t==null?void 0:t[a])||[]:(t==null?void 0:t[`${a}En`])||(t==null?void 0:t[a])||[];ca=(t,a="dot-list")=>t!=null&&t.length?r`<ul class="${a}">${t.map(s=>r`<li>${typeof s=="string"?h(s):h(ue(s,"fa")||s.title||"")}</li>`)}</ul>`:"";y("page-feedback",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/feedback",{type:s.get("type")||"suggestion",title:s.get("title"),body:s.get("body"),contact:s.get("contact")||""}),E(e("acc.feedbackSent")),a.reset()}catch(n){S(n)}})});y("faq-cat",(t,a)=>{a.closest("[data-faq-cats]").querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n===a)),xr()});Zl=()=>e("common.page")});var Tr={};X(Tr,{mount:()=>ad,render:()=>td});async function td(){var n,o,i,l,p,d,b,u,v,$,w;let t=null;try{t=await f.get("/api/admin/overview")}catch(k){return U({title:(k==null?void 0:k.message)||e("err.generic")})}let a=t.stats||{},s=(t.chart||[]).map(k=>({label:k.date,short:k.date.slice(8),value:k.visits||0}));return Q("users.view")&&ed(),r`
    <div class="kpi-grid">
      ${It({label:e("adm.kpi.ordersToday"),value:g(((n=t.today)==null?void 0:n.orders)||0),sub:A(((o=t.today)==null?void 0:o.revenue)||0)})}
      ${It({label:e("adm.kpi.visits"),value:g(((i=t.today)==null?void 0:i.visits)||0),sub:`${e("stats.visitsTotal")}: ${g(a.visitsTotal||0)}`})}
      ${It({label:e("adm.kpi.revenueTotal"),value:A(((l=t.totals)==null?void 0:l.revenue)||0),sub:`${g(((p=t.totals)==null?void 0:p.orders)||0)} ${e("common.orders")}`})}
      ${It({label:e("adm.kpi.pending"),value:g(a.pendingOrders||0),sub:e("adm.awaiting.orders")})}
      ${It({label:e("adm.kpi.products"),value:g(a.products||0),sub:`${g(a.outOfStock||0)} ${e("stats.outOfStock")}`})}
      ${It({label:e("adm.kpi.users"),value:g(a.customers||0),sub:`${g(a.plusMembers||0)} ${e("stats.plusMembers")}`})}
      ${It({label:e("adm.kpi.lowStock"),value:g((t.lowStock||[]).length),sub:e("adm.lowStockList")})}
      ${It({label:e("adm.storage"),value:`${g(((d=t.storage)==null?void 0:d.sizeKb)||0)} KB`,sub:"db.json"})}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${c("alert")} ${e("adm.awaiting")}</h2></div></div>
    <div class="kpi-grid">
      ${Q("reviews.moderate")?Na("star",e("adm.awaiting.reviews"),(b=t.awaiting)==null?void 0:b.reviews,"#/admin/reviews"):""}
      ${Q("tickets.manage")?Na("ticket",e("adm.awaiting.tickets"),(u=t.awaiting)==null?void 0:u.tickets,"#/admin/tickets"):""}
      ${Q("orders.view")?Na("package-check",e("adm.awaiting.orders"),(v=t.awaiting)==null?void 0:v.orders,"#/admin/orders"):""}
      ${Q("feedback.manage")?Na("flag",e("adm.awaiting.feedback"),($=t.awaiting)==null?void 0:$.feedback,"#/admin/feedback"):""}
      ${Q("tickets.manage")?Na("headset",e("adm.awaiting.chat"),(w=t.awaiting)==null?void 0:w.support,"#/admin/support"):""}
    </div>

    <div class="card mt">
      <strong>${c("chart")} ${e("adm.chart")}</strong>
      ${s.length?us(s,{height:140}):r`<p class="muted small">${e("common.noData")}</p>`}
    </div>

    <div class="acc-grid acc-grid-eq mt">
      <div class="card">
        <strong>${c("star")} ${e("adm.topSelling")}</strong>
        ${lt([{label:""},{label:e("adm.pName")},{label:e("pdp.sold"),cls:"num"},{label:e("common.stock"),cls:"num"},{label:e("common.price"),cls:"num"}],(t.topSelling||[]).map(k=>r`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${Oe(zt(mt({},k),{images:k.image?[k.image]:[]}))}</span></td>
              <td><a class="b" href="#/admin/products/${k.id}">${h((q(),k.name))}</a></td>
              <td class="num">${g(k.sold)}</td>
              <td class="num">${g(k.stock)}</td>
              <td class="num">${A(k.price)}</td>
            </tr>`),{emptyText:e("common.noData")})}
      </div>
      <div class="card">
        <strong>${c("box")} ${e("adm.lowStockList")}</strong>
        ${lt([{label:e("adm.pName")},{label:e("common.available"),cls:"num"},{label:""}],(t.lowStock||[]).map(k=>r`
            <tr>
              <td class="nowrap">${h(k.name)}</td>
              <td class="num"><span class="badge-pill ${k.inStock?"bp-warn":"bp-danger"}">${g(Math.max(0,(k.stock||0)-(k.reserved||0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${k.id}">${e("common.edit")}</a></td>
            </tr>`),{emptyText:e("common.noData")})}
      </div>
    </div>

    ${Q("users.view")||Q("settings.edit")?r`
    <div class="acc-grid acc-grid-eq mt">
      ${Q("users.view")?r`
      <div class="card" id="secLiveCard">
        <div class="row row-between">
          <strong>${c("shield")} ${e("adm.secTitle")}</strong>
          <span class="badge-pill bp-success tiny" id="secState">…</span>
        </div>
        <div class="kpi-grid mt-s" id="secKpis"></div>
        <div class="mt-s" id="secTop"></div>
        ${Q("settings.edit")?r`
        <form class="form-grid mt" id="secForm" data-act="adm-sec-save">
          ${yt({label:e("adm.secQueueEnabled"),desc:e("adm.secQueueDesc"),name:"queueEnabled",checked:!0})}
          ${x({label:e("adm.secMaxConc"),name:"maxConcurrent",type:"number",value:"80",attrs:'min="5" max="5000" inputmode="numeric"'})}
          ${x({label:e("adm.secTriggerRps"),name:"triggerRps",type:"number",value:"40",attrs:'min="5" max="2000" inputmode="numeric"'})}
          ${x({label:e("adm.secPassTtl"),name:"passTtlMin",type:"number",value:"30",attrs:'min="5" max="240" inputmode="numeric"'})}
          ${x({label:e("adm.secPoll"),name:"pollSec",type:"number",value:"4",attrs:'min="2" max="20" inputmode="numeric"'})}
          ${x({label:e("adm.secFloodBan"),name:"floodBanPerMin",type:"number",value:"2500",attrs:'min="500" max="100000" inputmode="numeric"'})}
          ${x({label:e("adm.secFloodMin"),name:"floodBanMin",type:"number",value:"15",attrs:'min="1" max="1440" inputmode="numeric"'})}
          <button class="btn btn-primary btn-sm span-2" type="submit">${c("save")} ${e("common.save")}</button>
        </form>`:""}
      </div>`:""}
      ${Q("settings.edit")?r`
      <div class="card">
        <strong>${c("terminal")} ${e("adm.console")}</strong>
        <p class="muted small mt-s">${e("adm.consoleHint")}</p>
        <button class="btn btn-danger btn-sm mt-s" data-act="adm-sys-restart">${c("zap")} ${e("adm.sysRestart")}</button>
        <p class="muted small mt">${e("adm.sysResetLabel")}</p>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="audit">${e("adm.sysReset.audit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="carts">${e("adm.sysReset.carts")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visits">${e("adm.sysReset.visits")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visitors">${e("adm.sysReset.visitors")}</button>
        </div>
      </div>`:""}
    </div>`:""}

    ${Q("audit.view")?r`
    <div class="card mt">
      <div class="row row-between">
        <strong>${c("history")} ${e("adm.recentAudit")}</strong>
        <a class="section-link" href="#/admin/audit">${e("common.showAll")}</a>
      </div>
      ${lt([{label:e("common.date")},{label:e("adm.auditActor")},{label:e("adm.auditAction")},{label:e("adm.auditTarget")}],(t.recentAudit||[]).map(k=>r`
          <tr>
            <td class="nowrap tiny">${St(k.at)}</td>
            <td class="tiny">${h(k.actorName||"")} <span class="muted">(${h(k.actorRole||"")})</span></td>
            <td class="mono tiny">${h(k.action||"")}</td>
            <td class="tiny muted">${h(String(k.target||"").slice(0,40))}</td>
          </tr>`),{emptyText:e("common.noData")})}
    </div>`:""}`}function Na(t,a,s,n){return r`
    <a class="kpi await-card ${s>0?"hot":""}" href="${n}">
      <div class="l">${c(t)} ${a}</div>
      <div class="v">${g(s||0)}</div>
    </a>`}async function _n(){var l,p,d,b;if(!document.getElementById("secLiveCard")){++Un>=3&&la&&(clearInterval(la),la=0);return}Un=0;let a;try{a=await f.get("/api/admin/system/load")}catch(u){return}let s=document.getElementById("secKpis");s&&(s.innerHTML=[`<div class="kpi"><div class="l">${e("adm.secInflight")}</div><div class="v">${g(a.inflight)}</div></div>`,`<div class="kpi"><div class="l">${e("adm.secRps")}</div><div class="v">${g(a.rps)}</div></div>`,`<div class="kpi"><div class="l">${e("adm.secQueued")}</div><div class="v ${a.queued>0?"hot":""}">${g(a.queued)}</div></div>`,`<div class="kpi"><div class="l">${e("adm.secAutoBans")}</div><div class="v">${g((a.autoBans||[]).length)}</div></div>`].join(""));let n=document.getElementById("secTop");n&&(n.innerHTML=(a.top||[]).length?`<div class="muted tiny">${e("adm.secTop")}</div><div class="table-wrap"><table class="table"><thead><tr><th>IP</th><th class="num">${e("adm.secPerMin")}</th></tr></thead><tbody>${a.top.map(u=>`<tr><td class="mono tiny">${h(u.ip)}</td><td class="num tiny">${g(u.perMin)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted tiny">${e("adm.secTopEmpty")}</p>`);let o=document.getElementById("secState");if(o){let u=a.queued>0||a.inflight>(((l=a.sec)==null?void 0:l.maxConcurrent)||80)||a.rps>(((p=a.sec)==null?void 0:p.triggerRps)||40);o.textContent=u?e("adm.secBusy"):e("adm.secNormal"),o.className=`badge-pill tiny ${u?"bp-warn":"bp-success"}`}let i=document.getElementById("secForm");if(i&&!i.dataset.filled){i.dataset.filled="1";for(let v of["maxConcurrent","triggerRps","passTtlMin","pollSec","floodBanPerMin","floodBanMin"]){let $=i.elements[v];$&&((d=a.sec)==null?void 0:d[v])!=null&&($.value=a.sec[v])}let u=i.elements.queueEnabled;u&&(u.checked=!!((b=a.sec)!=null&&b.queueEnabled))}}function ed(){la&&clearInterval(la),Un=0,setTimeout(_n,400),la=setInterval(_n,5e3)}function ad(){return null}var la,Un,Cr=W(()=>{z();G();Z();ut();K();dt();et();la=0,Un=0;y("adm-sec-save",async(t,a)=>{var n,o,i,l,p,d,b,u;t.preventDefault();let s={queueEnabled:(o=(n=a.elements.queueEnabled)==null?void 0:n.checked)!=null?o:!0,maxConcurrent:Number((i=a.elements.maxConcurrent)==null?void 0:i.value)||80,triggerRps:Number((l=a.elements.triggerRps)==null?void 0:l.value)||40,passTtlMin:Number((p=a.elements.passTtlMin)==null?void 0:p.value)||30,pollSec:Number((d=a.elements.pollSec)==null?void 0:d.value)||4,floodBanPerMin:Number((b=a.elements.floodBanPerMin)==null?void 0:b.value)||2500,floodBanMin:Number((u=a.elements.floodBanMin)==null?void 0:u.value)||15};await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch("/api/admin/settings/security",{value:s}),E(e("adm.secSaved"));let v=document.getElementById("secForm");v&&delete v.dataset.filled,_n()}catch(v){S(v)}})});y("adm-sys-restart",async(t,a)=>{await wt({text:e("adm.sysRestartWarn"),danger:!0})&&await D(a,async()=>{try{await f.post("/api/admin/system/restart",{}),E(e("adm.sysRestarting")),setTimeout(()=>location.reload(),6e3)}catch(n){S(n)}})});y("adm-sys-reset",async(t,a)=>{let s=a.dataset.what;await wt({text:e(`adm.resetWarn.${s}`),danger:!0})&&await D(a,async()=>{try{await f.post("/api/admin/system/reset",{what:s}),E(e("adm.resetDone"))}catch(o){S(o)}})})});var Pr={};X(Pr,{mount:()=>cd,render:()=>sd});async function sd(t){let a=t.params.id;if(a==="new")return Ar(null);if(a){let s=null;try{s=await f.get(`/api/admin/products/${a}`)}catch(n){return U({title:(n==null?void 0:n.message)||e("err.notFound")})}return Ar(s.product)}return nd()}async function nd(){let t=null;try{t=await f.get(f.url("/api/admin/products",{q:Lt.q,cat:Lt.cat,brand:Lt.brand,status:Lt.status,page:Lt.page,limit:Lt.limit}))}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}let a=t.items||[],s=n=>`#/admin/products?page=${n}`;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("box")} ${e("adm.products")}</h2>
        <p class="muted small">${g(t.total||0)} ${e("catalog.count")}</p>
      </div>
      ${Q("products.create")?r`<a class="btn btn-primary btn-sm" href="#/admin/products/new">${c("plus")} ${e("adm.productNew")}</a>`:""}
    </div>

    <form class="card mb adm-filter" data-act="adm-p-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${e("common.search")}</span>
          <input class="input" name="q" value="${h(Lt.q)}" placeholder="${e("adm.pName")} / SKU / ${e("pdp.barcode")}">
        </label>
        ${Y({label:e("adm.pCat"),name:"cat",value:Lt.cat,options:[{value:"",label:e("common.all")},...m.categories.map(n=>({value:n.id,label:Et(n)}))]})}
        ${Y({label:e("adm.pBrand"),name:"brand",value:Lt.brand,options:[{value:"",label:e("common.all")},...m.brands.map(n=>({value:n.id,label:Yt(n)}))]})}
        ${Y({label:e("common.status"),name:"status",value:Lt.status,options:[{value:"",label:e("common.all")},{value:"active",label:e("common.active")},{value:"inactive",label:e("common.inactive")},{value:"low",label:e("adm.kpi.lowStock")},{value:"out",label:e("card.outOfStock")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-p-clear">${c("close")} ${e("catalog.f.clear")}</button>
      </div>
    </form>

    ${a.length?lt([{label:""},{label:e("adm.pName")},{label:e("adm.pCat")},{label:e("common.price"),cls:"num"},{label:e("common.stock"),cls:"num"},{label:e("pdp.sold"),cls:"num"},{label:e("common.status")},{label:e("common.actions"),cls:"num"}],a.map(n=>r`
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
          <td>${n.active===!1?r`<span class="badge-pill bp-muted">${e("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${e("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <a class="btn btn-ghost btn-xs" href="#/admin/products/${n.id}">${c("edit")}</a>
              <a class="btn btn-ghost btn-xs" href="#/product/${n.id}" target="_blank" rel="noopener">${c("external")}</a>
              <button class="btn btn-ghost btn-xs" data-act="adm-p-igpack" data-id="${n.id}" title="${e("adm.igPack")}">${c("camera")}</button>
              ${Q("products.delete")?r`<button class="btn btn-ghost btn-xs" data-act="adm-p-del" data-id="${n.id}" data-name="${h(n.name)}">${c("trash")}</button>`:""}
            </div>
          </td>
        </tr>`)):L({icon:"box",title:e("common.noResult"),action:Q("products.create")?{href:"#/admin/products/new",label:e("adm.productNew")}:null})}

    <div class="mt" data-page="${t.page}" data-pages="${t.pages}">${me(t.page||1,t.pages||1,s)}</div>`}function Ar(t){var s,n,o,i,l,p;let a=!t;return vt.images=[...(t==null?void 0:t.images)||[]],vt.specs=Object.entries((t==null?void 0:t.specs)||{}).map(([d,b])=>({key:d,value:b})),vt.tags=[...(t==null?void 0:t.tags)||[]],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(a?"plus":"edit")} ${a?e("adm.productNew"):e("adm.productEdit")}</h2>
      <div class="row row-wrap">
        <a class="btn btn-ghost btn-sm" href="#/admin/products">${c("arrow-right")} ${e("adm.products")}</a>
        ${a?"":r`<a class="btn btn-ghost btn-sm" href="#/product/${t.id}" target="_blank" rel="noopener">${c("external")} ${e("common.view")}</a>`}
      </div>
    </div>

    <form data-act="adm-p-save" data-id="${(t==null?void 0:t.id)||""}">
      <div class="card">
        <div class="form-grid">
          ${x({label:e("adm.pName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
          ${x({label:e("adm.pNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
          ${Y({label:e("adm.pCat"),name:"categoryId",value:(t==null?void 0:t.categoryId)||"",options:m.categories.map(d=>({value:d.id,label:Et(d)}))})}
          ${Y({label:e("adm.pBrand"),name:"brandId",value:(t==null?void 0:t.brandId)||"",options:m.brands.map(d=>({value:d.id,label:Yt(d)}))})}
          ${x({label:e("adm.pSku"),name:"sku",value:(t==null?void 0:t.sku)||"",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Leave empty to auto-generate"})}
          ${x({label:e("adm.pBarcode"),name:"barcode",value:(t==null?void 0:t.barcode)||"",attrs:'inputmode="numeric"'})}
          ${x({label:e("adm.pPrice"),name:"price",type:"number",required:!0,value:(s=t==null?void 0:t.price)!=null?s:""})}
          ${x({label:e("adm.pOldPrice"),name:"oldPrice",type:"number",value:(n=t==null?void 0:t.oldPrice)!=null?n:0})}
          ${x({label:e("adm.pCost"),name:"cost",type:"number",value:(o=t==null?void 0:t.cost)!=null?o:0})}
          ${x({label:e("adm.pStock"),name:"stock",type:"number",required:!0,value:(i=t==null?void 0:t.stock)!=null?i:1})}
          ${x({label:e("adm.pWeight"),name:"weight",type:"number",value:(l=t==null?void 0:t.weight)!=null?l:0})}
          ${x({label:e("adm.pWarranty"),name:"warrantyMonths",type:"number",value:(p=t==null?void 0:t.warrantyMonths)!=null?p:0})}
          ${Y({label:e("adm.pAuth"),name:"authenticity",value:(t==null?void 0:t.authenticity)||"generic",options:["original","highcopy","generic"].map(d=>({value:d,label:e(`auth.${d}`)}))})}
        </div>
        ${!a&&Q("barcode.print")?r`
          <div class="row row-wrap mt-s">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-barcode" data-id="${t.id}">${c("barcode")} ${e("adm.bGenerate")}</button>
            ${t.barcode?r`<code class="tag mono">${t.barcode}</code>`:""}
          </div>`:""}
      </div>

      <div class="card mt">
        <strong>${c("file")} ${e("pdp.description")}</strong>
        <div class="mt-s">${J({label:"\u0641\u0627\u0631\u0633\u06CC",name:"description",value:(t==null?void 0:t.description)||"",rows:5})}</div>
        ${J({label:"English",name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:4})}
      </div>

      <div class="card mt">
        <div class="row row-between row-wrap">
          <strong>${c("image")} ${e("adm.pImages")} (${g(vt.images.length)}/8)</strong>
          <div class="row row-wrap">
            ${Q("products.create")?r`<button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-find" data-name="${h((t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"")}">${c("search")} ${e("adm.pFindImage")}</button>`:""}
            <label class="btn btn-ghost btn-sm" for="adm-p-file">${c("upload")} ${e("adm.pUpload")}</label>
            <input id="adm-p-file" type="file" accept="image/*" multiple hidden data-img-input>
          </div>
        </div>
        <div class="img-list mt-s" data-img-list>${Ia()}</div>
        <div class="mt">
          ${J({label:e("adm.pVideos"),name:"videos",value:((t==null?void 0:t.videos)||[]).join(`
`),rows:2,hint:e("adm.pVideosHint")})}
        </div>
      </div>

      <div class="card mt">
        <div class="row row-between">
          <strong>${c("list")} ${e("adm.pSpecs")}</strong>
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-spec-add">${c("plus")} ${e("adm.pAddSpec")}</button>
        </div>
        <div class="mt-s" data-spec-list>${Wn()}</div>
      </div>

      <div class="card mt">
        <strong>${c("tag")} ${e("adm.pTags")}</strong>
        <div class="mt-s" data-tag-list>${Vn()}</div>
        <div class="row mt-s">
          <input class="input" data-tag-input placeholder="${q()?"\u0628\u0631\u0686\u0633\u0628 \u062C\u062F\u06CC\u062F \u0648 Enter":"New tag and Enter"}" maxlength="30">
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-tag-add">${c("plus")}</button>
        </div>
      </div>

      <div class="card mt">
        ${yt({label:e("adm.pFeatured"),name:"featured",checked:!!(t!=null&&t.featured)})}
        ${yt({label:e("adm.pActive"),name:"active",checked:t?t.active!==!1:!0})}
      </div>

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/products">${e("common.cancel")}</a>
      </div>
    </form>`}function Ia(){return vt.images.length?vt.images.map((t,a)=>r`
    <span class="img-item">
      <img src="${t}" alt="${e("img.alt")}" loading="lazy">
      <span class="img-tools">
        ${a>0?r`<button type="button" data-act="adm-img-up" data-i="${a}" title="${e("common.prev")}">${c("arrow-up")}</button>`:""}
        <button type="button" data-act="adm-img-del" data-i="${a}" title="${e("common.delete")}">${c("trash")}</button>
      </span>
      ${a===0?r`<span class="img-main">${e("common.image")} ۱</span>`:""}
    </span>`).join(""):r`<p class="muted small">${e("adm.pFindEmpty")}</p>`}function Wn(){return vt.specs.length?vt.specs.map((t,a)=>r`
    <div class="spec-row">
      <input class="input" value="${h(t.key)}" placeholder="${e("adm.pSpecKey")}" data-spec-k="${a}" maxlength="40">
      <input class="input" value="${h(t.value)}" placeholder="${e("adm.pSpecVal")}" data-spec-v="${a}" maxlength="120">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-spec-del" data-i="${a}">${c("trash")}</button>
    </div>`).join(""):r`<p class="muted small">${e("common.empty")}</p>`}function Vn(){return vt.tags.length?r`<div class="row row-wrap">${vt.tags.map((t,a)=>r`
    <span class="chip">${h(t)}<button type="button" data-act="adm-tag-del" data-i="${a}" aria-label="${e("common.delete")}">${c("close")}</button></span>`)}</div>`:r`<p class="muted small">${e("common.empty")}</p>`}function Pe(t,a,s){let n=(t||document).querySelector(a);n&&(n.innerHTML=s),N(n||document)}function od(t){let a=Xt(),s=q()?t.name:t.nameEn||t.name,n=b=>Number(b||0).toLocaleString(q()?"fa-IR":"en-US"),o=Number(t.oldPrice||0),i=Math.max(0,(t.stock||0)-(t.reserved||0)),l=`${location.origin}/#/product/${t.id}`,p=String(q()?t.description||"":t.descriptionEn||t.description||"").split(`
`)[0].trim().slice(0,160);return(q()?[`\u2728 ${s} \u2728`,p,"",`\u{1F4B0} \u0642\u06CC\u0645\u062A: ${n(t.price)} \u062A\u0648\u0645\u0627\u0646${o>t.price?` (\u0628\u0647\u200C\u062C\u0627\u06CC ${n(o)} \u2014 ${g(t.discountPct||0)}\u066A \u062A\u062E\u0641\u06CC\u0641)`:""}`,i>0?"\u{1F4E6} \u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u2014 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0633\u0641\u0627\u0631\u0634 \u0628\u062F\u0647":"\u{1F4E6} \u0641\u0639\u0644\u0627\u064B \u0646\u0627\u0645\u0648\u062C\u0648\u062F\u061B \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u062A \u06A9\u0646\u06CC\u0645","\u{1F6E1} \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627 + \u0645\u0647\u0644\u062A \u062A\u0633\u062A \u0648 \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632","\u{1F69A} \u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","",`\u{1F517} \u0633\u0641\u0627\u0631\u0634 \u0622\u0646\u0644\u0627\u06CC\u0646: ${l}`,`\u{1F4DE} \u062A\u0644\u0641\u0646: ${a.phone||""} \xB7 \u{1F34F} \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645: @jam.yassaei`]:[`\u2728 ${s} \u2728`,p,"",`\u{1F4B0} Price: ${n(t.price)} Toman${o>t.price?` (was ${n(o)})`:""}`,"\u{1F6E1} Authenticity guarantee + 7-day return",`\u{1F517} Order: ${l}`,`\u{1F4DE} ${a.phone||""}`]).filter((b,u,v)=>!(b===""&&(v[u-1]===""||u===0))).join(`
`)}function rd(t){let a=q()?["\u06CC\u0627\u0633\u0627\u06CC\u06CC","\u0644\u0648\u0627\u0632\u0645_\u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9","\u0642\u0637\u0639\u0627\u062A","\u062A\u0647\u0631\u0627\u0646","\u0646\u0627\u0631\u0645\u06A9","\u062E\u0631\u06CC\u062F_\u0622\u0646\u0644\u0627\u06CC\u0646"]:["Yassaei","Electronics","Parts","Tehran","OnlineShopping"],s=[t.brandName,t.categoryName].filter(Boolean).map(n=>String(n).trim().replace(/\s+/g,"_"));return[...new Set([...a,...s])].map(n=>`#${n}`).join(" ")}async function Dr(t,a,s){t&&(t.innerHTML=Ca(e("adm.pFindSearching")));try{let o=(await f.post("/api/admin/find-image",{query:a,lang:s})).items||[];t&&(t.innerHTML=o.length?r`<div class="find-grid">${o.map((i,l)=>r`
        <div class="find-item">
          <img src="/api/admin/image-thumb?url=${encodeURIComponent(i.thumbnail||i.url)}" alt="${h(i.title||"")}" loading="lazy">
          <div class="find-meta">
            <div class="tiny b">${h((i.title||"").slice(0,60))}</div>
            <div class="tiny muted">${h(i.license||"")} · ${h(i.source||"")}${i.creator?` \xB7 ${h(i.creator)}`:""}</div>
          </div>
          <button type="button" class="btn btn-primary btn-xs" data-act="adm-find-use" data-url="${h(i.url)}">${e("adm.pUseImage")}</button>
        </div>`).join("")}</div>`:L({icon:"image",title:e("adm.pFindEmpty")}))}catch(n){t&&(t.innerHTML=r`<p class="notice notice-danger">${c("alert")}<span>${h((n==null?void 0:n.message)||e("err.network"))}</span></p>`)}}function cd(t){N(t);let a=t.querySelector("[data-img-input]");a&&a.addEventListener("change",async()=>{let n=[...a.files||[]].slice(0,8-vt.images.length);a.value="";for(let o of n){if(o.size>4*1024*1024){it(`${e("err.tooLarge")}: ${o.name}`,{type:"warn"});continue}try{let i=await Ie(o),l=await f.upload(i);l.url&&vt.images.push(l.url)}catch(i){S(i)}}Pe(t,"[data-img-list]",Ia())});let s=t.querySelector("[data-tag-input]");return s&&s.addEventListener("keydown",n=>{var o;n.key==="Enter"&&(n.preventDefault(),(o=document.querySelector('[data-act="adm-p-tag-add"]'))==null||o.click())}),t.querySelectorAll(".pagination .pg").forEach(n=>{n.addEventListener("click",o=>{let i=/page=(\d+)/.exec(n.getAttribute("href")||"");if(!i)return;o.preventDefault();let l=Number(i[1]);l>=1&&(Lt.page=l,T(!0))})}),null}var Lt,vt,Mr=W(()=>{z();G();Z();K();dt();et();ut();nt();Lt={q:"",cat:"",brand:"",status:"",page:1,limit:25},vt={images:[],specs:[],tags:[]};y("adm-p-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);Lt.q=String(s.get("q")||"").trim(),Lt.cat=String(s.get("cat")||""),Lt.brand=String(s.get("brand")||""),Lt.status=String(s.get("status")||""),Lt.page=1,T(!0)});y("adm-p-clear",()=>{Object.assign(Lt,{q:"",cat:"",brand:"",status:"",page:1}),T(!0)});y("adm-p-del",async(t,a)=>{if(await Gt(a.dataset.name))try{await f.del(`/api/admin/products/${a.dataset.id}`),E(e("adm.pDeleted")),T(!0)}catch(n){S(n)}});y("adm-img-del",(t,a)=>{vt.images.splice(Number(a.dataset.i),1),Pe(null,"[data-img-list]",Ia())});y("adm-img-up",(t,a)=>{let s=Number(a.dataset.i),[n]=vt.images.splice(s,1);vt.images.splice(s-1,0,n),Pe(null,"[data-img-list]",Ia())});y("adm-p-spec-add",()=>{vt.specs.push({key:"",value:""}),Pe(null,"[data-spec-list]",Wn())});y("adm-spec-del",(t,a)=>{vt.specs.splice(Number(a.dataset.i),1),Pe(null,"[data-spec-list]",Wn())});y("adm-p-tag-add",()=>{let t=document.querySelector("[data-tag-input]"),a=String((t==null?void 0:t.value)||"").trim();a&&(!vt.tags.includes(a)&&vt.tags.length<20&&vt.tags.push(a),t&&(t.value=""),Pe(null,"[data-tag-list]",Vn()))});y("adm-tag-del",(t,a)=>{vt.tags.splice(Number(a.dataset.i),1),Pe(null,"[data-tag-list]",Vn())});y("adm-p-barcode",async(t,a)=>{await D(a,async()=>{var s,n,o;try{let i=await f.post("/api/admin/barcode/generate",{productId:a.dataset.id,count:1}),l=((n=(s=i.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=i.codes)==null?void 0:o[0])||"";if(l){let p=document.querySelector("[name=barcode]");p&&(p.value=l),E(e("adm.bGenerated"))}}catch(i){S(i)}})});y("adm-p-igpack",async(t,a)=>{let s=null;try{s=(await f.get(`/api/admin/products/${a.dataset.id}`)).product}catch(o){S(o);return}let n=(s.images||[])[0]||"";pt({title:`${c("camera")} ${e("adm.igPack")}`,subtitle:q()?s.name:s.nameEn||s.name,body:r`
      ${n?r`
        <div class="row row-wrap mb">
          <img class="igpack-img" src="${h(n)}" alt="">
          <div class="grow">
            <p class="small muted">${e("adm.igImgHint")}</p>
            <a class="btn btn-ghost btn-sm mt-s" href="${h(n)}" download="yassaei-${h(s.sku||s.id)}.jpg" target="_blank" rel="noopener">${c("download")} ${e("adm.igDl")}</a>
          </div>
        </div>`:r`<p class="notice notice-warn mb">${c("info")}<span>${e("adm.igNoImg")}</span></p>`}
      ${J({label:e("adm.igCap"),name:"igcap",rows:10,value:od(s)})}
      ${J({label:e("adm.igTags"),name:"igtags",rows:2,value:rd(s)})}
      <div class="row row-wrap mt-s">
        <button type="button" class="btn btn-primary btn-sm" data-act="adm-ig-copy" data-what="cap">${c("copy")} ${e("adm.igCopyCap")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="tags">${c("copy")} ${e("adm.igCopyTags")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="all">${c("copy")} ${e("adm.igCopyAll")}</button>
      </div>`})});y("adm-ig-copy",async(t,a)=>{var l,p;let s=a.closest(".modal"),n=((l=s==null?void 0:s.querySelector("[name=igcap]"))==null?void 0:l.value)||"",o=((p=s==null?void 0:s.querySelector("[name=igtags]"))==null?void 0:p.value)||"",i=a.dataset.what==="tags"?o:a.dataset.what==="all"?`${n}

${o}`:n;try{await Zs(i),E(e("common.copied"),{timeout:1800})}catch(d){S(new Error(e("err.generic")))}});y("adm-p-save",async(t,a)=>{var l;t.preventDefault();let s=new FormData(a),n={};a.querySelectorAll("[data-spec-k]").forEach(p=>{let d=p.dataset.specK,b=a.querySelector(`[data-spec-v="${d}"]`),u=String(p.value||"").trim();u&&(n[u]=String((b==null?void 0:b.value)||"").trim())});let o=a.dataset.id,i={name:s.get("name"),nameEn:s.get("nameEn")||"",categoryId:s.get("categoryId")||"",brandId:s.get("brandId")||"",sku:s.get("sku")||"",barcode:s.get("barcode")||"",price:Number(s.get("price")||0),oldPrice:Number(s.get("oldPrice")||0),cost:Number(s.get("cost")||0),stock:Number(s.get("stock")||0),weight:Number(s.get("weight")||0),warrantyMonths:Number(s.get("warrantyMonths")||0),authenticity:s.get("authenticity")||"generic",description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",images:vt.images.slice(0,8),videos:String(((l=a.videos)==null?void 0:l.value)||"").split(/\n+/).map(p=>p.trim()).filter(Boolean).slice(0,4),specs:n,tags:vt.tags.slice(0,20),featured:s.get("featured")==="on",active:s.get("active")==="on"};await D(a.querySelector("button[type=submit]"),async()=>{var p;try{if(o)await f.patch(`/api/admin/products/${o}`,i),E(e("adm.pSaved"));else{let d=await f.post("/api/admin/products",i);if(E(e("adm.pCreated")),(p=d.product)!=null&&p.id){bt(`#/admin/products/${d.product.id}`);return}}T(!0)}catch(d){S(d)}})});y("adm-p-find",(t,a)=>{let s=pt({title:e("adm.pFindImage"),size:"lg",body:r`
      <form data-act="adm-find-run" class="row row-wrap mb">
        <input class="input grow" name="query" value="${h(a.dataset.name||"")}" placeholder="${e("adm.pName")}" required>
        <select class="select" name="lang" data-w="110px">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button class="btn btn-primary" type="submit">${c("search")} ${e("common.search")}</button>
      </form>
      <p class="hint mb-s">${e("adm.pFindImageHint")}</p>
      <div data-find-results>${Ca(e("adm.pFindSearching"))}</div>`,onMount:n=>{var i;(i=n.querySelector("[name=query]"))==null||i.focus(),n.dataset.findBox="1";let o=a.dataset.name||"";o&&Dr(n.querySelector("[data-find-results]"),o,"en")}})});y("adm-find-run",(t,a)=>{t.preventDefault();let s=new FormData(a),n=a.closest(".modal");Dr(n==null?void 0:n.querySelector("[data-find-results]"),String(s.get("query")||""),String(s.get("lang")||"en"))});y("adm-find-use",async(t,a)=>{await D(a,async()=>{var s,n;try{let o=await f.post("/api/admin/fetch-image",{url:a.dataset.url});o.url&&!vt.images.includes(o.url)&&vt.images.length<8&&vt.images.push(o.url),Pe(null,"[data-img-list]",Ia()),E(e("adm.pSaved")),(n=(s=a.closest(".overlay"))==null?void 0:s.querySelector("[data-lx]"))==null||n.click()}catch(o){S(o)}})})});var Ir={};X(Ir,{mount:()=>dd,render:()=>id});async function id(){let t=null;try{t=await f.get("/api/admin/categories")}catch(a){return U({title:(a==null?void 0:a.message)||e("err.generic")})}return Ve=t.items||[],Cs=t.brands||[],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("layers")} ${e("adm.categories")}</h2>
      <div class="row row-wrap">
        <button class="btn btn-primary btn-sm" data-act="adm-cat-new">${c("plus")} ${e("common.category")}</button>
        <button class="btn btn-outline btn-sm" data-act="adm-brand-new">${c("plus")} ${e("common.brand")}</button>
      </div>
    </div>

    <div class="card">
      <strong>${c("layers")} ${e("common.category")} (${g(Ve.length)})</strong>
      ${lt([{label:e("adm.catGlyph")},{label:e("adm.catName")},{label:e("adm.catParent")},{label:e("adm.catOrder"),cls:"num"},{label:e("common.count"),cls:"num"},{label:e("common.status")},{label:"",cls:"num"}],Ve.map(a=>{var s;return r`
          <tr>
            <td><span class="cat-ic" data-h="34px" data-w="34px">${c(a.glyph||"box")}</span></td>
            <td><span class="b">${h(q()?a.name:a.nameEn||a.name)}</span><div class="tiny muted mono">${h(a.id)}</div></td>
            <td class="tiny">${h(((s=Ve.find(n=>n.id===a.parentId))==null?void 0:s.name)||"\u2014")}</td>
            <td class="num">${g(a.order||0)}</td>
            <td class="num">${g(a.productCount||0)}</td>
            <td>${a.active===!1?r`<span class="badge-pill bp-muted">${e("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${e("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-edit" data-id="${a.id}">${c("edit")}</button>
                <a class="btn btn-ghost btn-xs" href="#/category/${a.id}" target="_blank" rel="noopener">${c("external")}</a>
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-del" data-id="${a.id}" data-name="${h(a.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`}),{emptyText:e("common.noData")})}
    </div>

    <div class="card mt">
      <strong>${c("tag")} ${e("common.brand")} (${g(Cs.length)})</strong>
      ${lt([{label:e("adm.brandName")},{label:e("adm.brandNameEn")},{label:e("common.count"),cls:"num"},{label:e("common.status")},{label:"",cls:"num"}],Cs.map(a=>r`
          <tr>
            <td class="b">${h(a.name)}<div class="tiny muted mono">${h(a.id)}</div></td>
            <td class="tiny">${h(a.nameEn||"")}${a.country?r` <span class="muted">· ${h(a.country)}</span>`:""}</td>
            <td class="num">${g(a.productCount||0)}</td>
            <td>${a.active===!1?r`<span class="badge-pill bp-muted">${e("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${e("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-edit" data-id="${a.id}">${c("edit")}</button>
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-del" data-id="${a.id}" data-name="${h(a.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`),{emptyText:e("common.noData")})}
    </div>`}function Lr(t){var a;return pt({title:t?e("common.edit"):e("common.add"),body:r`
      <form class="form-grid" data-act="adm-cat-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":x({label:"id",name:"id",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Auto if empty"})}
        ${x({label:e("adm.catName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${x({label:e("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${Y({label:e("adm.catGlyph"),name:"glyph",value:(t==null?void 0:t.glyph)||"box",options:ld.map(s=>({value:s,label:s}))})}
        ${Y({label:e("adm.catParent"),name:"parentId",value:(t==null?void 0:t.parentId)||"",options:[{value:"",label:e("adm.catNoParent")},...Ve.filter(s=>s.id!==(t==null?void 0:t.id)).map(s=>({value:s.id,label:s.name}))]})}
        ${x({label:e("adm.catOrder"),name:"order",type:"number",value:(a=t==null?void 0:t.order)!=null?a:Ve.length+1,attrs:'min="0" max="999"'})}
        <div class="span-2">${J({label:e("common.description"),name:"description",value:(t==null?void 0:t.description)||"",rows:2})}</div>
        <div class="span-2">${J({label:Yn("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Description (EN)"),name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:2})}</div>
        <div class="span-2">${yt({label:e("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${e("common.save")}</button>
      </form>`})}function Nr(t){return pt({title:t?e("common.edit"):e("common.add"),size:"sm",body:r`
      <form data-act="adm-brand-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":x({label:"id",name:"id",hint:Yn("\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F","Auto if empty")})}
        ${x({label:e("adm.brandName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${x({label:e("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${x({label:Yn("\u06A9\u0634\u0648\u0631","Country"),name:"country",value:(t==null?void 0:t.country)||""})}
        ${yt({label:e("common.active"),name:"active",checked:t?t.active!==!1:!0})}
        <button class="btn btn-primary btn-block mt-s" type="submit">${e("common.save")}</button>
      </form>`})}function dd(t){return N(t),null}var Ve,Cs,ld,Yn,Ra,Ba,Rr=W(()=>{z();G();Z();K();dt();et();ut();nt();Ve=[],Cs=[];ld=["box","cable","plug","battery","speaker","watch","glasses","mic","camera","phone","card","zap","image","headset","anchor","palm","wave","globe","layers","tag","chip","solder","wrench","fan","tv","keyboard","chart"];Yn=(t,a)=>q()?t:a,Ra=null;y("adm-cat-new",()=>{Ra=Lr(null)});y("adm-cat-edit",(t,a)=>{Ra=Lr(Ve.find(s=>s.id===a.dataset.id))});y("adm-cat-del",async(t,a)=>{if(await Gt(a.dataset.name))try{await f.del(`/api/admin/categories/${a.dataset.id}`),E(e("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-cat-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",glyph:s.get("glyph")||"box",parentId:s.get("parentId")||"",order:Number(s.get("order")||0),description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(a.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/categories",o):await f.patch(`/api/admin/categories/${a.dataset.id}`,o),E(e("misc.saved")),Ra==null||Ra.close(),await Ot({silent:!0}),T(!0)}catch(i){S(i)}})});Ba=null;y("adm-brand-new",()=>{Ba=Nr(null)});y("adm-brand-edit",(t,a)=>{Ba=Nr(Cs.find(s=>s.id===a.dataset.id))});y("adm-brand-del",async(t,a)=>{if(await Gt(a.dataset.name))try{await f.del(`/api/admin/brands/${a.dataset.id}`),E(e("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-brand-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",country:s.get("country")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(a.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/brands",o):await f.patch(`/api/admin/brands/${a.dataset.id}`,o),E(e("misc.saved")),Ba==null||Ba.close(),await Ot({silent:!0}),T(!0)}catch(i){S(i)}})})});var Fr={};X(Fr,{mount:()=>bd,render:()=>md});async function md(t){return t.params.id?ud(t.params.id):pd()}async function pd(){let t=null;try{t=await f.get(f.url("/api/admin/orders",{q:_t.q,status:_t.status,delivery:_t.delivery,page:_t.page,limit:_t.limit}))}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}Br=t.statuses||[];let a=t.items||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("package-check")} ${e("adm.orders")}</h2>
        <p class="muted small">${g(t.total||0)} ${e("common.orders")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-o-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${e("common.search")}</span>
          <input class="input" name="q" value="${h(_t.q)}" placeholder="${e("acc.orderCode")} / ${e("common.phone")} / ${e("common.name")}">
        </label>
        ${Y({label:e("common.status"),name:"status",value:_t.status,options:[{value:"",label:e("common.all")},...Br.map(s=>({value:s.id,label:e(`st.${s.id}`)}))]})}
        ${Y({label:e("adm.oDelivery"),name:"delivery",value:_t.delivery,options:[{value:"",label:e("common.all")},{value:"pickup",label:e("dl.pickup")},{value:"courier",label:e("dl.courier")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-o-clear">${c("close")} ${e("catalog.f.clear")}</button>
      </div>
    </form>

    ${a.length?lt([{label:e("acc.orderCode")},{label:e("adm.oCustomer")},{label:e("common.date")},{label:e("adm.oDelivery")},{label:e("common.total"),cls:"num"},{label:e("adm.oPayment")},{label:e("common.status")},{label:"",cls:"num"}],a.map(s=>{var n;return r`
        <tr>
          <td class="mono b nowrap">${s.code}</td>
          <td class="nowrap">${h(s.userName||"")}<div class="tiny muted mono">${at(s.userPhone||"")}</div></td>
          <td class="nowrap tiny">${O(s.createdAt)}</td>
          <td class="tiny">${e(s.delivery==="pickup"?"dl.pickup":"dl.courier")}${s.express?r` <span class="badge-pill bp-accent">${e("checkout.express")}</span>`:""}</td>
          <td class="num b">${A(s.total)}</td>
          <td>${ze(s.payment)}<div class="tiny muted">${e(`pm.${((n=s.payment)==null?void 0:n.method)||"cod"}`)}</div></td>
          <td>${$e(s.status)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/orders/${s.id}">${e("common.view")}</a></td>
        </tr>`})):L({icon:"package-check",title:e("common.noResult")})}

    <div class="mt">${me(t.page||1,t.pages||1,s=>`#/admin/orders?page=${s}`)}</div>`}async function ud(t){let a=null;try{a=await f.get(f.url("/api/admin/orders",{q:"",page:1,limit:200}))}catch(n){}let s=((a==null?void 0:a.items)||[]).find(n=>n.id===t||n.code===t);if(!s){try{let n=await f.get(f.url("/api/admin/orders",{q:t,page:1,limit:50})),o=((n==null?void 0:n.items)||[]).find(i=>i.id===t||i.code===t);if(o)return Hr(o,n.statuses||[])}catch(n){}return L({icon:"package-check",title:e("acc.noOrders"),action:{href:"#/admin/orders",label:e("adm.orders")}})}return Hr(s,a.statuses||[])}function Hr(t,a){var n,o,i;let s=Q("orders.manage");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/orders">${e("adm.orders")}</a> <span>/</span> <span class="mono">${t.code}</span>
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
              ${Y({label:e("adm.oStatus"),name:"status",value:t.status,options:(a.length?a:[]).map(l=>({value:l.id,label:e(`st.${l.id}`)}))})}
              ${x({label:e("adm.oTracking"),name:"tracking",value:t.tracking||((n=t.payment)==null?void 0:n.tracking)||""})}
              <div class="span-2">${J({label:e("adm.oNote"),name:"note",value:t.adminNote||"",rows:3})}</div>
              <div class="span-2"><button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button></div>
            </form>`:""}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${e("acc.orderItems")}</strong>
          ${lt([{label:""},{label:e("common.product")},{label:e("common.price"),cls:"num"},{label:e("common.count"),cls:"num"},{label:e("common.total"),cls:"num"}],(t.items||[]).map(l=>r`
              <tr>
                <td><span class="cl-img" data-h="46px" data-w="46px">${Oe({id:l.productId,name:l.name,images:l.image?[l.image]:[]})}</span></td>
                <td><a class="b" href="#/admin/products/${l.productId}">${h(q()?l.name:l.nameEn||l.name)}</a><div class="tiny muted mono">${h(l.sku||"")}</div></td>
                <td class="num">${A(l.price)}</td>
                <td class="num">${g(l.qty)}</td>
                <td class="num b">${A(l.price*l.qty)}</td>
              </tr>`))}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${e("acc.timeline")}</strong>
          ${ea(t)}
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${e("cart.summary")}</strong>
          <div class="sum-row"><span>${e("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
          ${t.plusDiscount>0?r`<div class="sum-row discount"><span>${e("acc.plus")}</span><span class="v">−${A(t.plusDiscount)}</span></div>`:""}
          ${t.couponDiscount>0?r`<div class="sum-row discount"><span>${t.couponCode}</span><span class="v">−${A(t.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${e("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${h(t.shippingLabel)})</span>`:""}</span><span class="v">${A(t.shipping)}</span></div>
          ${t.insured?r`<div class="sum-row"><span>${e("common.insurance")}</span><span class="v">${A(t.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${e("common.total")}</span><span class="v">${A(t.total)}</span></div>
          ${t.walletUsed>0?r`<div class="sum-row discount"><span>${e("common.wallet")}</span><span class="v">−${A(t.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${e("common.payable")}</span><span class="v">${A(t.payable)}</span></div>
          <p class="hint mt-s">${e("adm.oPayment")}: ${e(`pm.${((o=t.payment)==null?void 0:o.method)||"cod"}`)}${(i=t.payment)!=null&&i.ref?` \xB7 ${h(t.payment.ref)}`:""}</p>
          ${t.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${A(t.refund.amount)} — ${O(t.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${e(t.delivery==="pickup"?"dl.pickup":"dl.courier")}</strong>
          ${t.address?r`
            <p class="small mt-s"><strong>${h(t.address.receiver||"")}</strong> · <span class="mono">${at(t.address.phone||"")}</span></p>
            <p class="muted small">${h(t.address.street||"")}${t.address.city?`\u060C ${h(t.address.city)}`:""}</p>
            ${t.address.postal?r`<p class="muted small">${e("common.postal")}: ${h(t.address.postal)}</p>`:""}
            ${t.address.note?r`<p class="hint">${h(t.address.note)}</p>`:""}`:r`<p class="muted small mt-s">${e("checkout.pickupDesc")}</p>`}
          ${t.zone?r`<p class="small mt-s">${e("checkout.zone")}: ${h(t.zone)}</p>`:""}
          ${t.note?r`<p class="hint mt-s">${c("edit")} ${h(t.note)}</p>`:""}
        </div>
      </aside>
    </div>`}function bd(t){return N(t),t.querySelectorAll(".pagination .pg").forEach(a=>{a.addEventListener("click",s=>{let n=/page=(\d+)/.exec(a.getAttribute("href")||"");n&&(s.preventDefault(),_t.page=Number(n[1]),T(!0))})}),null}var _t,Br,Or=W(()=>{z();G();Z();K();dt();et();ut();nt();_t={q:"",status:"",delivery:"",page:1,limit:25},Br=[];y("adm-o-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);_t.q=String(s.get("q")||"").trim(),_t.status=String(s.get("status")||""),_t.delivery=String(s.get("delivery")||""),_t.page=1,T(!0)});y("adm-o-clear",()=>{Object.assign(_t,{q:"",status:"",delivery:"",page:1}),T(!0)});y("adm-o-save",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/orders/${a.dataset.id}`,{status:s.get("status"),tracking:s.get("tracking")||"",note:s.get("note")||""}),E(e("adm.oSaved")),T(!0)}catch(n){S(n)}})})});var jr={};X(jr,{mount:()=>vd,render:()=>hd});async function hd(){let t=null;try{t=await f.get(f.url("/api/admin/reviews",{status:ee.status,type:ee.type}))}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}As=t.items||[],da=t.counts||da;let a=Math.max(1,Math.ceil(As.length/Gn));ee.page>a&&(ee.page=a);let s=As.slice((ee.page-1)*Gn,ee.page*Gn);return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${e("adm.reviews")}</h2>
      <div class="row row-wrap">
        <span class="badge-pill bp-warn">${e("adm.revPending")}: ${g(da.pending||0)}</span>
        <span class="badge-pill bp-success">${e("adm.revApproved")}: ${g(da.approved||0)}</span>
        <span class="badge-pill bp-muted">${e("adm.revRejected")}: ${g(da.rejected||0)}</span>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-rev-filter">
      <div class="form-grid">
        ${Y({label:e("common.status"),name:"status",value:ee.status,options:[{value:"pending",label:`${e("adm.revPending")} (${g(da.pending||0)})`},{value:"approved",label:e("adm.revApproved")},{value:"rejected",label:e("adm.revRejected")},{value:"",label:e("common.all")}]})}
        ${Y({label:e("common.type"),name:"type",value:ee.type,options:[{value:"",label:e("common.all")},{value:"review",label:e("common.review")},{value:"question",label:e("common.question")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
      </div>
    </form>

    ${s.length?r`
      <div class="rev-list">
        ${s.map(gd).join("")}
      </div>
      ${a>1?me(ee.page,a,n=>`#/admin/reviews?p=${n}`):""}
    `:L({icon:"star",title:e("adm.revEmpty"),text:e("adm.revEmptyHint")})}`}function gd(t){var s;let a=t.type==="question";return r`
    <article class="card rev-card" data-id="${t.id}">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          ${t.productImage?r`<img class="rev-thumb" src="${h(t.productImage)}" alt="" loading="lazy" data-h="46px" data-w="46px">`:r`<span class="rev-thumb ph" data-h="46px" data-w="46px">${c("box")}</span>`}
          <div>
            <a class="b" href="#/product/${t.productId}">${h(t.productName||t.productId)}</a>
            <div class="tiny muted">${h(t.userName||"")} · ${t.userBadge==="buyer"?e("rev.buyer"):e("rev.visitor")} · ${O(t.createdAt)}</div>
          </div>
        </div>
        <div class="row row-wrap">
          ${a?r`<span class="badge-pill bp-info">${e("common.question")}</span>`:r`<span class="rate-row">${Ht(t.rating||0)}</span>`}
          ${fd(t.status)}
        </div>
      </div>
      ${t.title?r`<h3 class="rev-title">${h(t.title)}</h3>`:""}
      <p class="rev-body">${h(t.body||"")}</p>
      ${t.reply?r`
        <div class="rev-reply">
          <span class="tiny muted">${c("send")} ${e("rev.shopReply")}</span>
          <p>${h(t.reply)}</p>
        </div>`:""}
      <div class="row row-wrap mt-s">
        ${t.status!=="approved"?r`<button class="btn btn-success btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="approved">${c("check")} ${e("adm.revApprove")}</button>`:""}
        ${t.status!=="rejected"?r`<button class="btn btn-outline btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="rejected">${c("close")} ${e("adm.revReject")}</button>`:""}
        ${t.status!=="pending"?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="pending">${c("refresh")} ${e("adm.revPending")}</button>`:""}
        ${Q("reviews.reply")?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-reply" data-id="${t.id}">${c("send")} ${e("adm.revReply")}</button>`:""}
        <a class="btn btn-ghost btn-xs" href="#/product/${t.productId}" target="_blank" rel="noopener">${c("external")}</a>
        <button class="btn btn-ghost btn-xs" data-act="adm-rev-del" data-id="${t.id}" data-name="${h(t.title||((s=t.body)==null?void 0:s.slice(0,30))||"")}">${c("trash")}</button>
      </div>
    </article>`}function fd(t){let a={pending:["bp-warn",e("adm.revPending")],approved:["bp-success",e("adm.revApproved")],rejected:["bp-danger",e("adm.revRejected")]},[s,n]=a[t]||["bp-muted",t];return r`<span class="badge-pill ${s}">${n}</span>`}function vd(t){return N(t),null}var ee,Gn,As,da,zr=W(()=>{z();G();Z();K();dt();et();ut();nt();ee={status:"pending",type:"",page:1},Gn=12,As=[],da={pending:0,approved:0,rejected:0};y("adm-rev-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);ee.status=String(s.get("status")||""),ee.type=String(s.get("type")||""),ee.page=1,T(!0)});y("adm-rev-status",async(t,a)=>{try{await f.patch(`/api/admin/reviews/${a.dataset.id}`,{status:a.dataset.status}),E(e("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-rev-reply",async(t,a)=>{var o;let s=As.find(i=>i.id===a.dataset.id),n=await de({title:e("adm.revReply"),text:((o=s==null?void 0:s.body)==null?void 0:o.slice(0,140))||"",label:e("rev.shopReply"),value:(s==null?void 0:s.reply)||"",rows:4});if(n!==null)try{await f.patch(`/api/admin/reviews/${a.dataset.id}`,{reply:String(n)}),E(e("misc.saved")),T(!0)}catch(i){S(i)}});y("adm-rev-del",async(t,a)=>{if(await Gt(a.dataset.name||a.dataset.id))try{await f.del(`/api/admin/reviews/${a.dataset.id}`),E(e("misc.deleted")),T(!0)}catch(s){S(s)}})});var Jn={};X(Jn,{mount:()=>Sd,render:()=>yd});async function yd(t){return t.params.section==="support"?kd(t.params.id):t.params.id?wd(t.params.id):$d()}async function $d(){let t=null;try{t=await f.get(f.url("/api/admin/tickets",{status:Kn.status}))}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}let a=t.items||[],s=t.counts||{};return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("ticket")} ${e("adm.tickets")}</h2>
        <p class="muted small">${ce("\u0628\u0627\u0632","Open")}: ${g(s.open||0)} · ${ce("\u0628\u0633\u062A\u0647","Closed")}: ${g(s.closed||0)} · ${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}: ${g(a.filter(n=>n.unread).length)}</p>
      </div>
      <form class="row" data-act="adm-tk-filter" data-live>
        ${Y({label:e("common.status"),name:"status",value:Kn.status,options:[{value:"",label:e("common.all")},{value:"open",label:e("tk.open")},{value:"answered",label:e("tk.answered")},{value:"closed",label:e("tk.closed")}]})}
      </form>
    </div>

    ${lt([{label:e("acc.ticketSubject")},{label:e("acc.ticketCategory")},{label:e("common.priority")},{label:e("common.user")},{label:e("common.messages"),cls:"num"},{label:e("common.status")},{label:e("common.updated"),cls:"num"},{label:"",cls:"num"}],a.map(n=>r`
        <tr class="${n.unread?"row-new":""}">
          <td>
            ${n.unread?r`<span class="dot-new" title="${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}"></span>`:""}
            <a class="b" href="#/admin/tickets/${n.id}">${h(n.subject)}</a>
            <div class="tiny muted mono">${h(n.code)}</div>
            ${n.lastMessage?r`<div class="tiny muted clip">${h(n.lastMessage)}</div>`:""}
          </td>
          <td>${e(`tc.${n.category}`)}</td>
          <td><span class="badge-pill ${_r[n.priority]||"bp-info"}">${e(`tp.${n.priority}`)}</span></td>
          <td class="tiny">${h(n.userName||"")}<div class="tiny muted mono">${at(n.userPhone||"")}</div></td>
          <td class="num">${g(n.messageCount||0)}</td>
          <td><span class="badge-pill ${Ur[n.status]||"bp-muted"}">${e(`tk.${n.status}`)}</span></td>
          <td class="num tiny nowrap">${St(n.updatedAt||n.createdAt)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/tickets/${n.id}">${c("chevron-left")}</a></td>
        </tr>`),{emptyText:e("acc.noTickets")})}`}async function wd(t){var n;let a=null;try{a=(await f.get(`/api/admin/tickets/${t}`)).ticket}catch(o){return(o==null?void 0:o.status)===404?L({icon:"ticket",title:e("acc.noTickets"),action:{href:"#/admin/tickets",label:e("adm.tickets")}}):U({title:(o==null?void 0:o.message)||e("err.generic")})}let s=a.user;return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/tickets">${e("adm.tickets")}</a> <span>/</span> <span class="mono">${h(a.code)}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${c("ticket")} ${h(a.subject)}</h2>
              <p class="muted small mt-s">
                <span class="mono">${h(a.code)}</span> · ${e("acc.ticketCategory")}: ${e(`tc.${a.category}`)} ·
                ${O(a.createdAt)} · ${ce("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","Updated")}: ${St(a.updatedAt||a.createdAt)}
              </p>
            </div>
            <div class="row row-wrap">
              <span class="badge-pill ${Ur[a.status]||"bp-muted"}">${e(`tk.${a.status}`)}</span>
              <span class="badge-pill ${_r[a.priority]||"bp-info"}">${e(`tp.${a.priority}`)}</span>
            </div>
          </div>
        </div>

        <div class="card mt">
          <strong>${c("chat")} ${e("common.messages")} (${g(((n=a.messages)==null?void 0:n.length)||0)})</strong>
          <div class="tk-thread mt">
            ${(a.messages||[]).map(Qn).join("")}
          </div>
          <form class="mt" data-act="adm-tk-reply" data-id="${a.id}">
            <label class="field">
              <span class="label">${e("adm.tkReply")}</span>
              <textarea class="textarea" name="body" rows="3" placeholder="${ce("\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","Write your reply\u2026")}"></textarea>
            </label>
            <div class="row row-wrap mt-s">
              <button class="btn btn-primary" type="submit">${c("send")} ${e("common.send")}</button>
              <select class="select select-sm" name="status">
                <option value="answered">${e("tk.answered")}</option>
                <option value="open">${e("tk.open")}</option>
                <option value="closed">${e("tk.closed")}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("user")} ${h((s==null?void 0:s.name)||a.userName||"")}</strong>
          <div class="mt-s">
            <div class="sum-row"><span>${e("common.phone")}</span><span class="v mono">${at((s==null?void 0:s.phone)||a.userPhone||"")}</span></div>
            ${s!=null&&s.email?r`<div class="sum-row"><span>${e("common.email")}</span><span class="v tiny">${h(s.email)}</span></div>`:""}
            <div class="sum-row"><span>${e("acc.plus")}</span><span class="v">${s!=null&&s.plus?r`<span class="badge-pill bp-accent">${e("common.active")}</span>`:r`<span class="muted">—</span>`}</span></div>
            <div class="sum-row"><span>${e("common.orders")}</span><span class="v">${g((s==null?void 0:s.orders)||0)}</span></div>
          </div>
          ${s?r`<a class="btn btn-ghost btn-sm btn-block mt-s" href="#/admin/users/${s.id}">${c("edit")} ${ce("\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631","Manage user")}</a>`:""}
        </div>

        <div class="card mt">
          <strong>${c("settings")} ${e("adm.tkManage")}</strong>
          <form class="mt-s" data-act="adm-tk-meta" data-id="${a.id}">
            <label class="field"><span class="label">${e("common.priority")}</span>
              <select class="select" name="priority">
                ${["critical","high","normal","low"].map(o=>r`<option value="${o}" ${a.priority===o?"selected":""}>${e(`tp.${o}`)}</option>`)}
              </select>
            </label>
            <button class="btn btn-outline btn-sm btn-block" type="submit">${e("common.save")}</button>
          </form>
          <div class="row row-wrap mt-s">
            ${a.status!=="closed"?r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${a.id}" data-status="closed">${c("check")} ${ce("\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","Close ticket")}</button>`:r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${a.id}" data-status="open">${c("refresh")} ${ce("\u0628\u0627\u0632\u06A9\u0631\u062F\u0646","Reopen")}</button>`}
          </div>
        </div>
      </aside>
    </div>`}function Qn(t){let a=t.from==="staff",s=t.from==="system"?"them sys":a?"me":"them",n=a?t.staffName?`${e("common.support")} \xB7 ${t.staffName}`:e("common.support"):t.name||e("common.user");return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(n)}</strong>
          <span class="tiny muted nowrap">${St(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${h(o)}" alt="${e("common.image")}" loading="lazy" data-act="adm-att-open" data-url="${h(o)}">`)}</div>`:""}
      </div>
    </div>`}async function kd(t){let a=null;try{a=await f.get("/api/admin/support")}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}ma=a.items||[];let s=ma.find(n=>n.userId===t)||null;return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${e("adm.support")}</h2>
      <span class="badge-pill bp-info">${g(ma.reduce((n,o)=>n+(o.unread||0),0))} ${ce("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","unread")}</span>
    </div>

    <div class="sup-grid">
      <div class="card sup-list">
        ${ma.length?ma.map(n=>{var o,i;return r`
          <a class="sup-item ${s&&s.userId===n.userId?"active":""} ${n.unread?"has-new":""}" href="#/admin/support/${n.userId}">
            <span class="sup-av">${h((n.userName||"?").slice(0,1))}</span>
            <span class="grow">
              <span class="row row-between"><strong class="tiny">${h(n.userName||"")}</strong><span class="tiny muted nowrap">${St((o=n.last)==null?void 0:o.at)}</span></span>
              <span class="tiny muted clip">${h(((i=n.last)==null?void 0:i.body)||"")}</span>
            </span>
            ${n.unread?r`<span class="badge-pill bp-danger">${g(n.unread)}</span>`:""}
          </a>`}).join(""):r`<p class="muted small">${e("common.noData")}</p>`}
      </div>

      <div class="card sup-chat">
        ${s?r`
          <div class="row row-between mb-s">
            <strong>${c("user")} ${h(s.userName)}</strong>
            <span class="tiny muted">${g(s.count||0)} ${e("common.messages")}</span>
          </div>
          <div class="msg-thread sup-thread" data-thread>
            ${(s.messages||[]).map(Qn).join("")}
          </div>
          <form class="row mt-s" data-act="adm-sup-send" data-id="${s.userId}">
            <input class="input grow" name="body" placeholder="${ce("\u067E\u0627\u0633\u062E \u0633\u0631\u06CC\u0639\u2026","Quick reply\u2026")}" autocomplete="off">
            <button class="btn btn-primary" type="submit">${c("send")}</button>
          </form>
        `:L({icon:"chat",title:e("adm.supSelect"),text:e("adm.supSelectHint")})}
      </div>
    </div>`}function Sd(t,a){var s;if(N(t),((s=a==null?void 0:a.params)==null?void 0:s.section)==="support"&&a.params.id){let n=t.querySelector("[data-thread]");n&&(n.scrollTop=n.scrollHeight)}return null}var ce,Ur,_r,Kn,ma,Xn=W(()=>{z();G();Z();K();dt();et();ut();nt();ce=(t,a)=>q()?t:a,Ur={open:"bp-warn",answered:"bp-success",closed:"bp-muted"},_r={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},Kn={status:""};y("adm-tk-filter",(t,a)=>{t.preventDefault(),Kn.status=String(new FormData(a).get("status")||""),T(!0)});y("adm-att-open",(t,a)=>{t.preventDefault(),He([a.dataset.url],0,e("common.image"))});y("adm-tk-reply",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=String(s.get("body")||"").trim();n.length<1||await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/tickets/${a.dataset.id}`,{body:n,status:s.get("status")||"answered"}),E(e("misc.sent")),T(!0)}catch(o){S(o)}})});y("adm-tk-meta",async(t,a)=>{t.preventDefault();try{await f.patch(`/api/admin/tickets/${a.dataset.id}`,{priority:new FormData(a).get("priority")}),E(e("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-tk-status",async(t,a)=>{try{await f.patch(`/api/admin/tickets/${a.dataset.id}`,{status:a.dataset.status}),E(e("misc.saved")),T(!0)}catch(s){S(s)}});ma=[];y("adm-sup-send",async(t,a)=>{var o,i;t.preventDefault();let s=a.querySelector("[name=body]"),n=String(s.value||"").trim();if(n){s.value="";try{await f.post(`/api/admin/support/${a.dataset.id}`,{body:n});let l=(o=a.closest(".sup-chat"))==null?void 0:o.querySelector("[data-thread]");if(l){let d=document.createElement("div");d.innerHTML=Qn({from:"staff",staffName:((i=m.me)==null?void 0:i.name)||"",body:n,at:new Date().toISOString()}).trim(),d.firstElementChild&&l.appendChild(d.firstElementChild),l.scrollTop=l.scrollHeight}let p=ma.find(d=>d.userId===a.dataset.id);p&&(p.last={body:n,at:new Date().toISOString(),from:"staff"},p.unread=0),E(e("misc.sent"))}catch(l){S(l),s.value=n}}})});var Wr={};X(Wr,{mount:()=>Td,render:()=>Ed});async function Ed(){var s,n;let t=null;try{t=await f.get(f.url("/api/admin/feedback",{type:Ye.type}))}catch(o){return U({title:(o==null?void 0:o.message)||e("err.generic")})}let a=t.items||[];return Ye.status&&(a=a.filter(o=>o.status===Ye.status)),r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("mail")} ${e("adm.feedback")}</h2>
        <p class="muted small">${g(((s=t.counts)==null?void 0:s.total)||a.length)} ${pa("\u0645\u0648\u0631\u062F","items")} · ${g(((n=t.counts)==null?void 0:n.new)||0)} ${pa("\u062C\u062F\u06CC\u062F","new")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-fb-filter">
      <div class="form-grid">
        ${Y({label:e("common.type"),name:"type",value:Ye.type,options:[{value:"",label:e("common.all")},{value:"suggestion",label:e("feedback.suggestion")},{value:"complaint",label:e("feedback.complaint")},{value:"bug",label:e("feedback.bug")}]})}
        ${Y({label:e("common.status"),name:"status",value:Ye.status,options:[{value:"",label:e("common.all")},...Object.entries(Zn).map(([o,[,i]])=>({value:o,label:i()}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
      </div>
    </form>

    ${a.length?r`<div class="rev-list">${a.map(qd).join("")}</div>`:L({icon:"mail",title:e("common.noData"),text:e("adm.fbEmptyHint")})}`}function qd(t){var o;let a=xd[t.type]||{icon:"mail",cls:"bp-muted"},[s,n]=Zn[t.status]||["bp-muted",()=>t.status];return r`
    <article class="card rev-card">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          <span class="fb-ic ${a.cls}">${c(a.icon)}</span>
          <div>
            <strong>${h(t.title||"")}</strong>
            <div class="tiny muted">
              ${e(`feedback.${t.type}`)} · ${h(t.userName||pa("\u0645\u0647\u0645\u0627\u0646","Guest"))} · ${St(t.createdAt)}
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
          <span class="tiny muted">${c("send")} ${pa("\u067E\u0627\u0633\u062E \u0645\u0627","Our answer")}</span>
          <p>${h(t.answer)}</p>
        </div>`:""}
      <form class="mt-s" data-act="adm-fb-save" data-id="${t.id}">
        <div class="row row-wrap">
          <select class="select select-sm" name="status">
            ${Object.entries(Zn).map(([i,[,l]])=>r`<option value="${i}" ${t.status===i?"selected":""}>${l()}</option>`)}
          </select>
          <input class="input grow" name="answer" value="${h(t.answer||"")}" placeholder="${pa("\u067E\u0627\u0633\u062E\u2026","Answer\u2026")}">
          <button class="btn btn-outline btn-sm" type="submit">${c("save")} ${e("common.save")}</button>
        </div>
      </form>
      <div class="tiny muted mt-s">${pa("\u062B\u0628\u062A","Created")}: ${O(t.createdAt)}</div>
    </article>`}function Td(t){return N(t),null}var pa,Ye,xd,Zn,Vr=W(()=>{z();G();Z();dt();et();ut();nt();pa=(t,a)=>q()?t:a,Ye={type:"",status:""},xd={suggestion:{icon:"sparkles",cls:"bp-info"},complaint:{icon:"flag",cls:"bp-warn"},bug:{icon:"bug",cls:"bp-danger"}},Zn={new:["bp-info",()=>e("fb.new")],seen:["bp-muted",()=>e("fb.seen")],in_progress:["bp-warn",()=>e("fb.inProgress")],done:["bp-success",()=>e("fb.done")],rejected:["bp-danger",()=>e("fb.rejected")]};y("adm-fb-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);Ye.type=String(s.get("type")||""),Ye.status=String(s.get("status")||""),T(!0)});y("adm-fb-save",async(t,a)=>{t.preventDefault();let s=new FormData(a);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/feedback/${a.dataset.id}`,{status:s.get("status"),answer:String(s.get("answer")||"")}),E(e("misc.saved")),T(!0)}catch(n){S(n)}})})});var Jr={};X(Jr,{mount:()=>Pd,render:()=>Cd});async function Cd(t){return t.params.id?Dd(t.params.id):Ad()}async function Gr(){let t=await f.get(f.url("/api/admin/users",{q:Me.q,role:Me.role}));return ke=t.items||[],Yr=t.permissions||[],t}async function Ad(){let t=await Md(),a=null;try{a=await Gr()}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("users")} ${e("adm.users")}</h2>
        <p class="muted small">${g(ke.length)} ${e("common.users")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${e("common.search")}</span>
          <input class="input" name="q" value="${h(Me.q)}" placeholder="${e("common.name")} / ${e("common.username")} / ${e("common.phone")}">
        </label>
        ${Y({label:e("adm.uRole"),name:"role",value:Me.role,options:[{value:"",label:e("common.all")},{value:"user",label:e("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${c("close")} ${e("catalog.f.clear")}</button>
      </div>
    </form>

    ${lt([{label:e("common.user")},{label:e("common.phone")},{label:e("adm.uRole")},{label:e("common.balance"),cls:"num"},{label:e("acc.plus"),cls:"num"},{label:e("common.orders"),cls:"num"},{label:e("adm.uDevice")},{label:e("common.status")},{label:"",cls:"num"}],ke.map(s=>r`
        <tr>
          <td>
            <span class="b">${h(s.name||s.username)}</span>
            <span class="tiny muted mono">@${h(s.username)}</span>
            ${s.twoFA?r`<span class="badge-pill bp-success tiny">${c("shield")}</span>`:""}
          </td>
          <td class="mono tiny nowrap">${at(s.phone||"")}${s.email?r`<div class="tiny muted">${h(s.email)}</div>`:""}</td>
          <td>${Kr(s.role)}</td>
          <td>${Qr(s.kycStatus)}</td>
          <td class="num">${g(s.wallet||0)}</td>
          <td class="num">${s.plus?r`<span class="badge-pill bp-accent">${e("common.active")}</span>`:r`<span class="muted">—</span>`}</td>
          <td class="num">${g(s.orders||0)}<div class="tiny muted">${A(s.spent||0)}</div></td>
          <td class="tiny">${s.lastAgent?r`<span>${s.lastAgent.os} · ${s.lastAgent.device}</span><div class="muted mono tiny">${h(s.lastIp||"")}</div>`:r`<span class="muted">—</span>`}</td>
          <td>${s.banned?r`<span class="badge-pill bp-danger">${e("adm.banned")}</span>`:s.status==="blocked"?r`<span class="badge-pill bp-danger">${e("adm.uBlocked")}</span>`:r`<span class="badge-pill bp-success">${e("common.active")}</span>`}</td>
          <td><div class="row row-end">
            ${Q("users.manage")?r`<button class="btn ${s.banned?"btn-success":"btn-danger"} btn-xs" data-act="adm-u-ban-toggle" data-id="${s.id}" data-val="${h(s.phone||s.username)}" data-banned="${s.banned?"1":""}" title="${s.banned?e("adm.unban"):e("adm.ban")}">${c(s.banned?"check":"lock")}</button>`:""}
            ${Q("users.manage")?r`<a class="btn btn-ghost btn-xs" href="#/admin/users/${s.id}">${c("edit")}</a>`:""}
          </div></td>
        </tr>`),{emptyText:e("common.noResult")})}`}function Kr(t){let a={owner:"bp-accent",staff:"bp-info",user:"bp-muted"},s={owner:be("\u0645\u0627\u0644\u06A9","Owner"),staff:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff"),user:e("common.user")}[t]||t;return r`<span class="badge-pill ${a[t]||"bp-muted"}">${s}</span>`}async function Dd(t){var i,l;try{ke.length||await Gr()}catch(p){return U({title:(p==null?void 0:p.message)||e("err.generic")})}let a=ke.find(p=>p.id===t);if(!a)return L({icon:"user",title:e("common.noResult"),action:{href:"#/admin/users",label:e("adm.users")}});let s=a.permissions||{},n=((i=m.me)==null?void 0:i.id)===a.id,o=Q("users.permissions");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${e("adm.users")}</a> <span>/</span> <span>${h(a.name||a.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${c("user")} ${h(a.name||a.username)} <span class="muted mono small">@${h(a.username)}</span></h2>
          <p class="muted small mt-s">
            ${at(a.phone||"")}${a.email?` \xB7 ${h(a.email)}`:""} ·
            ${e("acc.memberSince",{date:O(a.createdAt,{time:!1})})} ·
            ${be("\u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F","Last login")}: ${a.lastLoginAt?O(a.lastLoginAt):e("common.never")} (${g(a.loginCount||0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${Kr(a.role)}
          ${a.status==="blocked"?r`<span class="badge-pill bp-danger">${e("adm.uBlocked")}</span>`:""}
          ${a.plus?r`<span class="badge-pill bp-accent">${e("acc.plus")} ${O(a.plusUntil,{time:!1})}</span>`:""}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${g(a.wallet||0)}</div><div class="stat-lbl">${e("common.balance")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${g(a.points||0)}</div><div class="stat-lbl">${e("common.points")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${g(a.orders||0)}</div><div class="stat-lbl">${e("common.orders")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("card")}</span><div><div class="stat-val">${A(a.spent||0)}</div><div class="stat-lbl">${be("\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F","Total spent")}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${a.kycStatus&&a.kycStatus!=="none"?r`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${c("shield-check")} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${Qr(a.kycStatus)}</p>
        ${a.kycDocs?r`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${a.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${a.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${a.kycDocs.formDoc}</a>
            </div>
          </div>
        `:""}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${a.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${a.kycStatus==="pending"?"selected":""}>در انتظار</option>
            <option value="approved" ${a.kycStatus==="approved"?"selected":""}>تأیید شده</option>
            <option value="rejected" ${a.kycStatus==="rejected"?"selected":""}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${h(a.kycMessage||"")}">
          <button class="btn primary" type="submit">${c("save")} ذخیره وضعیت KYC</button>
        </form>
      </div>
    `:""}

    <form class="card mt" data-act="adm-u-save" data-id="${a.id}">
      <div class="form-grid">
        ${Y({label:e("adm.uRole"),name:"role",value:a.role,options:[{value:"user",label:e("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},...o&&(((l=m.me)==null?void 0:l.role)==="owner"||a.role!=="owner")?[{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]:[]]})}
        ${Y({label:e("adm.uStatus"),name:"status",value:a.status||"active",options:[{value:"active",label:e("common.active")},{value:"blocked",label:e("adm.uBlocked")}]})}
        ${x({label:e("common.points"),name:"points",type:"number",value:a.points||0,attrs:'min="0" max="1000000"'})}
      </div>

      ${o?r`
        <div class="row row-between row-wrap mt">
          <strong>${c("key")} ${e("adm.uPerms")}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${e("adm.uAll")}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${e("adm.uNone")}</button>
          </div>
        </div>
        <p class="hint">${e("adm.uPermsHint")}</p>
        <div class="perm-grid mt-s">
          ${Yr.map(p=>r`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${p.key}" ${s[p.key]?"checked":""}><span class="track"></span></span>
              <span class="grow">${h(q()?p.fa:p.en||p.fa)}<span class="k mono">${p.key}</span></span>
            </label>`)}
        </div>`:""}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/users">${e("common.back")}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${Q("wallet.manage")?r`
      <form class="card" data-act="adm-u-wallet" data-id="${a.id}">
        <strong>${c("wallet")} ${e("adm.uWalletAdjust")}</strong>
        <p class="muted small mt-s">${e("common.balance")}: ${A(a.wallet||0)}</p>
        ${x({label:e("common.amount"),name:"walletAdjust",type:"number",value:"",attrs:'min="-50000000" max="50000000" step="10000"',placeholder:"\xB1"})}
        ${x({label:e("adm.uWalletReason"),name:"walletReason",value:""})}
        <button class="btn btn-outline" type="submit">${e("common.apply")}</button>
      </form>`:""}

      ${Q("plus.manage")?r`
      <form class="card" data-act="adm-u-plus" data-id="${a.id}">
        <strong>${c("sparkles")} ${e("adm.uPlusDays")}</strong>
        <p class="muted small mt-s">${a.plus?`${e("acc.plusActive",{date:O(a.plusUntil,{time:!1})})}`:e("acc.plusInactive")}</p>
        ${x({label:e("common.day"),name:"plusDays",type:"number",value:"30",attrs:'min="-365" max="365"'})}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${e("common.apply")}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${a.id}">${e("common.disabled")}</button>
        </div>
      </form>`:""}

      ${Q("users.manage")&&!n?r`
      <form class="card" data-act="adm-u-pass" data-id="${a.id}">
        <strong>${c("key")} ${e("adm.uResetPass")}</strong>
        <p class="muted small mt-s">${be("\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u060C \u06A9\u0627\u0631\u0628\u0631 \u0628\u0627\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u0634\u0648\u062F \u0648 \u0631\u0645\u0632 \u0631\u0627 \u0639\u0648\u0636 \u06A9\u0646\u062F.","The user must sign in again and change the password.")}</p>
        ${x({label:e("auth.newPassword"),name:"resetPassword",type:"text",value:"",hint:e("auth.passwordRules")})}
        <button class="btn btn-danger" type="submit">${e("common.reset")}</button>
      </form>`:""}
    </div>`}function Pd(t){return N(t),null}async function Md(){var a;if(!Q("users.manage"))return"";let t={items:[]};try{t=await f.get("/api/admin/bans")}catch(s){return""}return r`
    <div class="card mb">
      <strong>${c("lock")} ${e("adm.bans")}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${Y({label:e("adm.banType"),name:"type",options:[{value:"ip",label:"IP"},{value:"phone",label:e("contact.mobile")},{value:"email",label:e("common.email")},{value:"username",label:e("common.username")}]})}
        ${x({label:e("adm.banValue"),name:"value",required:!0})}
        ${x({label:e("adm.banReason"),name:"reason"})}
        ${x({label:e("adm.banMinutes"),name:"minutes",type:"number",value:"0",attrs:'min="0" max="525600" inputmode="numeric"'})}
        <button class="btn btn-danger" type="submit">${c("lock")} ${e("adm.ban")}</button>
      </form>
      ${(a=t.items)!=null&&a.length?r`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${e("adm.banType")}</th><th>${e("adm.banValue")}</th><th>${e("adm.banReason")}</th><th>${e("common.date")}</th><th></th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny">${s.type}${s.auto?r` <span class="badge-pill bp-warn tiny">${e("adm.banAuto")}</span>`:""}</td><td class="mono tiny">${h(s.value)}</td><td class="tiny muted">${h(s.reason||"")}</td><td class="tiny">${O(s.at)}${s.until?r`<br><span class="muted">${e("adm.banUntil")}: ${O(s.until)}</span>`:""}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${s.id}">${c("check")} ${e("adm.unban")}</button></td>
        </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${e("adm.bansEmpty")}</p>`}
    </div>`}function Qr(t){return t==="approved"?r`<span class="${N("badge-pill bp-success")}">تأیید شده</span>`:t==="pending"?r`<span class="${N("badge-pill bp-warning")}">در انتظار</span>`:t==="rejected"?r`<span class="${N("badge-pill bp-danger")}">رد شده</span>`:r`<span class="${N("muted")}">—</span>`}var Me,Yr,ke,be,Xr=W(()=>{z();G();Z();K();dt();et();ut();nt();Me={q:"",role:""},Yr=[],ke=[];be=(t,a)=>q()?t:a;y("adm-u-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);Me.q=String(s.get("q")||"").trim(),Me.role=String(s.get("role")||""),T(!0)});y("adm-u-clear",()=>{Me.q="",Me.role="",T(!0)});y("adm-perm-all",(t,a)=>{let s=a.dataset.v==="1";a.closest("form").querySelectorAll('input[name^="perm."]').forEach(n=>{n.checked=s})});y("adm-u-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n={role:s.get("role"),status:s.get("status"),points:Number(s.get("points")||0)},o={},i=!1;a.querySelectorAll('input[name^="perm."]').forEach(l=>{o[l.name.slice(5)]=l.checked,i=!0}),i&&(n.permissions=o),await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${a.dataset.id}`,n),E(e("adm.uSaved")),ke=[],T(!0)}catch(l){S(l)}})});y("adm-u-wallet",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=Number(s.get("walletAdjust")||0);n&&await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${a.dataset.id}`,{walletAdjust:n,walletReason:s.get("walletReason")||"\u062A\u0646\u0638\u06CC\u0645 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631"}),E(e("adm.uSaved")),ke=[],T(!0)}catch(o){S(o)}})});y("adm-u-plus",async(t,a)=>{t.preventDefault();let s=Number(new FormData(a).get("plusDays")||0);s&&await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${a.dataset.id}`,{plusDays:s}),E(e("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}})});y("adm-u-plus-off",async(t,a)=>{if(await wt({text:be("\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u0648\u062F\u061F","Disable Plus for this user?")}))try{await f.patch(`/api/admin/users/${a.dataset.id}`,{plusDays:-365}),E(e("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}});y("adm-u-pass",async(t,a)=>{t.preventDefault();let s=String(new FormData(a).get("resetPassword")||"");if(s.length<8){S({code:"weak_password",message:e("auth.passwordRules")});return}await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/users/${a.dataset.id}`,{resetPassword:s}),E(e("adm.uSaved")),a.reset()}catch(n){S(n)}})});y("adm-ban-add",async(t,a)=>{var s,n;t.preventDefault();try{await f.post("/api/admin/bans",{type:a.type.value,value:a.value.value,reason:((s=a.reason)==null?void 0:s.value)||"",minutes:Number((n=a.minutes)==null?void 0:n.value)||0}),E(e("adm.banDone")),T(!0)}catch(o){S(o)}});y("adm-ban-del",async(t,a)=>{await D(a,async()=>{try{await f.del(`/api/admin/bans/${a.dataset.id}`),E(e("adm.unbanDone")),T(!0)}catch(s){S(s)}})});y("adm-u-ban-toggle",async(t,a)=>{if(a.dataset.banned==="1"){let i=((await f.get("/api/admin/bans")).items||[]).find(l=>l.value===String(a.dataset.val||"").toLowerCase());if(!i){toastError(e("err.generic"));return}try{await f.del(`/api/admin/bans/${i.id}`),E(e("adm.unbanDone")),T(!0)}catch(l){S(l)}return}let n=/^09\d{9}$/.test(a.dataset.val||"")?"phone":(a.dataset.val||"").includes("@")?"email":"username";try{await f.post("/api/admin/bans",{type:n,value:a.dataset.val,reason:e("adm.banByAdmin")}),E(e("adm.banDone")),T(!0)}catch(o){S(o)}})});var Ha={};X(Ha,{mount:()=>Fd,render:()=>Ld});async function Ld(t){let a=t.params.section;return a==="stats"?Rd():a==="visitors"?Od():a==="data"?Hd():Nd()}async function Nd(){let t=null;try{t=await f.get(f.url("/api/admin/audit",{q:Wt.q,action:Wt.action,page:Wt.page,limit:Wt.limit}))}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}let a=t.items||[];for(let s of a){let n=String(s.action||"").split(".")[0];n&&!to.includes(n)&&to.push(n)}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("history")} ${e("adm.audit")}</h2>
        <p class="muted small">${g(t.total||0)} ${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","events")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-aud-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${e("common.search")}</span>
          <input class="input" name="q" value="${h(Wt.q)}" placeholder="${Rt("\u06A9\u0627\u0631\u0628\u0631\u060C \u0631\u0648\u06CC\u062F\u0627\u062F\u060C \u0647\u062F\u0641\u2026","actor, action, target\u2026")}">
        </label>
        ${Y({label:e("adm.audAction"),name:"action",value:Wt.action,options:[{value:"",label:e("common.all")},...to.sort().map(s=>({value:s,label:s}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${e("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-aud-clear">${c("close")} ${e("catalog.f.clear")}</button>
      </div>
    </form>

    ${lt([{label:e("common.date")},{label:e("adm.audActor")},{label:e("adm.audAction")},{label:e("adm.audTarget")},{label:e("adm.audMeta")}],a.map(s=>r`
        <tr>
          <td class="tiny nowrap" title="${O(s.at)}">${St(s.at)}</td>
          <td class="tiny"><span class="b">${h(s.actorName||"")}</span><div class="tiny muted">${h(s.actorRole||"")}</div></td>
          <td><code class="tag mono">${h(s.action||"")}</code></td>
          <td class="tiny mono">${h(s.target||"")}</td>
          <td class="tiny muted clip-wide">${h(Id(s.meta))}</td>
        </tr>`),{emptyText:e("common.noData")})}
    ${t.pages>1?me(t.page,t.pages,s=>`#/admin/audit?p=${s}`):""}`}function Id(t){return!t||typeof t!="object"?"":Object.entries(t).map(([a,s])=>`${a}=${typeof s=="object"?JSON.stringify(s):s}`).join(" \xB7 ").slice(0,160)}async function Rd(){let t=null;try{t=await f.get(f.url("/api/admin/stats",{days:ua.days}))}catch(b){return U({title:(b==null?void 0:b.message)||e("err.generic")})}let a=t.series||[],s=t.summary||{},n=Object.entries(t.byCat||{}).sort((b,u)=>u[1].sold-b[1].sold),o=Object.entries(t.byBrand||{}).sort((b,u)=>u[1]-b[1]).slice(0,12),i=t.missedSearches||[],l=ua.metric,p=a.map(b=>({label:b.date,short:b.date.slice(5),value:l==="revenue"?b.revenue:l==="visits"?b.visits:b.orders})),d=a.reduce((b,u)=>({orders:b.orders+u.orders,revenue:b.revenue+u.revenue,visits:b.visits+u.visits,unique:b.unique+u.unique}),{orders:0,revenue:0,visits:0,unique:0});return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chart")} ${e("adm.stats")}</h2>
      <form class="row row-wrap" data-act="adm-st-filter" data-live>
        <select class="select select-sm" name="days">
          ${[7,30,90].map(b=>r`<option value="${b}" ${ua.days===b?"selected":""}>${g(b)} ${Rt("\u0631\u0648\u0632","days")}</option>`)}
        </select>
        <select class="select select-sm" name="metric">
          <option value="orders" ${l==="orders"?"selected":""}>${e("adm.stOrders")}</option>
          <option value="revenue" ${l==="revenue"?"selected":""}>${e("adm.stRevenue")}</option>
          <option value="visits" ${l==="visits"?"selected":""}>${e("adm.stVisits")}</option>
        </select>
      </form>
    </div>

    <div class="kpi-grid mb">
      ${It({icon:"package-check",label:e("adm.stOrders"),value:g(s.orders||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${g(d.orders)}`})}
      ${It({icon:"wallet",label:e("adm.stRevenue"),value:A(s.revenue||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${A(d.revenue)}`})}
      ${It({icon:"users",label:e("adm.stUsers"),value:g(s.users||0),sub:`${Rt("\u0628\u0627\u0632\u062F\u06CC\u062F \u06CC\u06A9\u062A\u0627","unique visits")}: ${g(d.unique)}`})}
      ${It({icon:"box",label:e("adm.stProducts"),value:g(s.products||0),sub:`${Rt("\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","stock value")}: ${A(s.stockValue||0)}`})}
      ${It({icon:"scale",label:e("adm.stAvg"),value:A(s.avgOrder||0),sub:`${Rt("\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F","average basket")}`})}
      ${It({icon:"eye",label:e("adm.stVisits"),value:g(d.visits),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}`})}
    </div>

    <div class="card">
      <strong>${c("chart")} ${l==="revenue"?e("adm.stRevenue"):l==="visits"?e("adm.stVisits"):e("adm.stOrders")} — ${g(ua.days)} ${Rt("\u0631\u0648\u0632","days")}</strong>
      <div class="mt-s">${us(p,{height:150})}</div>
    </div>

    <div class="cart-grid mt">
      <div class="col card">
        <strong>${c("layers")} ${e("adm.stByCat")}</strong>
        ${lt([{label:e("common.category")},{label:e("common.products"),cls:"num"},{label:e("pdp.sold"),cls:"num"},{label:e("common.stock"),cls:"num"},{label:e("adm.stRevenue"),cls:"num"}],n.map(([b,u])=>r`
            <tr>
              <td class="b">${h(b)}</td>
              <td class="num">${g(u.products)}</td>
              <td class="num">${g(u.sold)}</td>
              <td class="num">${g(u.stock)}</td>
              <td class="num">${A(u.revenue)}</td>
            </tr>`),{emptyText:e("common.noData")})}
      </div>
      <aside class="col card">
        <strong>${c("tag")} ${e("adm.stByBrand")}</strong>
        <div class="mt-s">
          ${o.length?o.map(([b,u])=>{let v=o[0][1]||1;return r`
            <div class="brand-row">
              <span class="tiny">${h(b)}</span>
              <span class="progress"><i data-w="${Math.max(4,Math.round(u/v*100))}%"></i></span>
              <span class="tiny b">${g(u)}</span>
            </div>`}).join(""):r`<p class="muted small">${e("common.noData")}</p>`}
        </div>
      </aside>
    </div>
    
    <div class="card mt">
      <strong>${c("search")} ${q()?"\u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0646\u062A\u06CC\u062C\u0647 (\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F)":"Missed Searches (Not in stock)"}</strong>
      ${i.length?lt([{label:q()?"\u0639\u0628\u0627\u0631\u062A \u062C\u0633\u062A\u062C\u0648 \u0634\u062F\u0647":"Query"},{label:q()?"\u062F\u0641\u0639\u0627\u062A \u062C\u0633\u062A\u062C\u0648":"Count",cls:"num"}],i.map(b=>r`
            <tr>
              <td>${h(b.q)}</td>
              <td class="num"><span class="badge-pill bp-warn">${g(b.count)}</span></td>
            </tr>`)):r`<p class="muted small mt-s">${e("common.empty")}</p>`}
    </div>`}function Hd(){var a;let t=((a=m.me)==null?void 0:a.role)==="owner";return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("download")} ${e("adm.data")}</h2>
        <p class="muted small">${e("adm.dataHint")}</p>
      </div>
    </div>

    <div class="card">
      <strong>${c("file")} ${e("adm.dExport")}</strong>
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
        <strong>${c("save")} ${e("adm.dBackup")}</strong>
        <p class="muted small mt-s">${e("adm.dBackupHint")}</p>
        ${t?r`<button class="btn btn-primary btn-sm mt-s" data-act="adm-d-backup">${c("save")} ${e("adm.dBackup")}</button>`:r`<p class="notice notice-warn mt-s">${c("lock")}<span>${Rt("\u0641\u0642\u0637 \u0645\u0627\u0644\u06A9 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0628\u06AF\u06CC\u0631\u062F.","Only the owner can create backups.")}</span></p>`}
      </div>
      <div class="card">
        <strong>${c("refresh")} ${e("adm.dCleanup")}</strong>
        <p class="muted small mt-s">${e("adm.dCleanupHint")}</p>
        <button class="btn btn-outline btn-sm mt-s" data-act="adm-d-cleanup">${c("trash")} ${e("adm.dCleanup")}</button>
      </div>
    </div>`}function Fd(t,a){var s;if(N(t),((s=a==null?void 0:a.params)==null?void 0:s.section)==="audit"){let n=new URLSearchParams(location.hash.split("?")[1]||""),o=Number(n.get("p")||0);o&&o!==Wt.page&&(Wt.page=o,T(!0))}return null}async function Od(){var a;let t={items:[],total:0};try{t=await f.get(f.url("/api/admin/visitors",{q:eo.q||""}))}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("users")} ${e("adm.visitors")} <span class="muted small">(${g(t.total||0)})</span></h2>
      <form class="row" data-act="adm-vis-filter">
        <input class="input" name="q" value="${h(eo.q||"")}" placeholder="${e("common.search")}">
        <button class="btn btn-ghost" type="submit">${c("search")}</button>
      </form>
    </div>
    <div class="card">
      ${(a=t.items)!=null&&a.length?r`<div class="table-wrap"><table class="table">
        <thead><tr><th>${e("common.date")}</th><th>IP</th><th>${e("adm.uDevice")}</th><th>${e("adm.uBrowser")}</th><th>${e("adm.uRegion")}</th><th>${e("adm.uPath")}</th><th>${e("common.user")}</th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny nowrap">${O(s.at)}</td>
          <td class="mono tiny">${h(s.ip||"")}</td>
          <td class="tiny">${h(s.os||"")} · ${h(s.device||"")}${s.screen?r`<div class="muted tiny">${h(s.screen)}</div>`:""}</div></td>
          <td class="tiny">${h(s.browser||"")}</td>
          <td class="tiny">${h(s.tz||"")}<div class="muted tiny">${h(s.lang||"")}</div></td>
          <td class="mono tiny">${h(s.path||"/")}</td>
          <td class="tiny">${s.userId?r`<a href="#/admin/users/${s.userId}">${c("user")}</a>`:r`<span class="muted">${e("adm.guest")}</span>`}</td>
        </tr>`)}</tbody></table></div>`:L({icon:"users",title:e("common.noResult")})}
    </div>`}var Rt,Wt,ua,to,Bd,eo,Fa=W(()=>{z();G();Z();K();dt();et();ut();nt();Rt=(t,a)=>q()?t:a,Wt={q:"",action:"",page:1,limit:50},ua={days:30,metric:"orders"},to=[];y("adm-aud-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);Wt.q=String(s.get("q")||"").trim(),Wt.action=String(s.get("action")||""),Wt.page=1,T(!0)});y("adm-aud-clear",()=>{Wt.q="",Wt.action="",Wt.page=1,T(!0)});y("adm-st-filter",(t,a)=>{t.preventDefault();let s=new FormData(a);ua.days=Number(s.get("days")||30),ua.metric=String(s.get("metric")||"orders"),T(!0)});Bd=[{id:"products",icon:"box",label:()=>e("common.products")},{id:"orders",icon:"package-check",label:()=>e("common.orders")},{id:"users",icon:"users",label:()=>e("common.users")},{id:"reviews",icon:"star",label:()=>e("adm.reviews")},{id:"tickets",icon:"ticket",label:()=>e("adm.tickets")},{id:"audit",icon:"history",label:()=>e("adm.audit")},{id:"all",icon:"download",label:()=>Rt("\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","Everything")}];y("adm-d-backup",async(t,a)=>{await D(a,async()=>{try{let s=await f.post("/api/admin/backup",{});E(`${e("adm.dBackup")}: ${s.file} (${g(s.sizeKb||0)} KB)`)}catch(s){S(s)}})});y("adm-d-cleanup",async(t,a)=>{await wt({text:Rt("\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","Remove audit entries older than 90 days and expired sessions?"),danger:!0})&&await D(a,async()=>{try{let n=await f.post("/api/admin/maintenance/cleanup",{});E(`${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","audit")}: ${g(n.auditRemoved||0)} \xB7 ${Rt("\u0646\u0634\u0633\u062A","sessions")}: ${g(n.sessionsRemoved||0)}`)}catch(n){S(n)}})});eo={q:""};y("adm-vis-filter",(t,a)=>{t.preventDefault(),eo.q=a.q.value,T(!0)})});var ha={};X(ha,{mount:()=>Wd,render:()=>jd});async function jd(t){let a=t.params.section;return a==="ads"?Ud():a==="notifications"?_d():a==="telegram"?Vd():a==="lottery"?Yd():zd()}async function zd(){try{ba=(await f.get("/api/admin/coupons")).items||[]}catch(a){return U({title:(a==null?void 0:a.message)||e("err.generic")})}let t=ba.filter(a=>a.active!==!1&&new Date(a.endAt)>new Date).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("percent")} ${e("adm.coupons")}</h2>
        <p class="muted small">${g(ba.length)} ${ht("\u06A9\u062F","codes")} · ${g(t)} ${ht("\u0641\u0639\u0627\u0644","active")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${c("plus")} ${e("common.add")}</button>
    </div>

    ${lt([{label:e("cart.coupon")},{label:e("common.type")},{label:e("adm.cpValue"),cls:"num"},{label:e("adm.cpUsage"),cls:"num"},{label:e("adm.cpDates")},{label:e("common.status")},{label:"",cls:"num"}],ba.map(a=>{let s=new Date(a.endAt)<new Date;return r`
        <tr>
          <td><span class="mono b">${h(a.code)}</span>${a.note?r`<div class="tiny muted">${h(a.note)}</div>`:""}</td>
          <td>${a.type==="percent"?e("adm.cpPercent"):e("adm.cpAmount")}</td>
          <td class="num">${a.type==="percent"?`${g(a.value)}\u066A`:A(a.value)}
            ${a.maxDiscount?r`<div class="tiny muted">${ht("\u0633\u0642\u0641","max")} ${A(a.maxDiscount)}</div>`:""}
            ${a.minOrder?r`<div class="tiny muted">${ht("\u062D\u062F\u0627\u0642\u0644 \u0633\u0641\u0627\u0631\u0634","min order")} ${A(a.minOrder)}</div>`:""}</td>
          <td class="num">${g(a.used||0)} / ${g(a.usageLimit||0)}<div class="tiny muted">${ht("\u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","per user")}: ${g(a.perUser||1)}</div></td>
          <td class="tiny nowrap">${O(a.startAt,{time:!1})}<div class="tiny muted">${O(a.endAt,{time:!1})}</div></td>
          <td>${s?r`<span class="badge-pill bp-muted">${e("adm.cpExpired")}</span>`:a.active===!1?r`<span class="badge-pill bp-muted">${e("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${e("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${a.id}" title="${e("common.active")}">${c(a.active===!1?"eye-off":"eye")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${a.id}">${c("edit")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${h(a.code)}">${c("copy")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${a.id}" data-name="${h(a.code)}">${c("trash")}</button>
            </div>
          </td>
        </tr>`}),{emptyText:e("common.noData")})}`}function Zr(t){var a,s,n,o,i;return pt({title:t?e("common.edit"):e("adm.cpNew"),body:r`
      <form class="form-grid" data-act="adm-cp-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${x({label:e("cart.coupon"),name:"code",required:!t,value:(t==null?void 0:t.code)||"",attrs:t?"readonly":"",hint:ht("\u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0648 \u0639\u062F\u062F","Uppercase letters and digits")})}
        ${Y({label:e("common.type"),name:"type",value:(t==null?void 0:t.type)||"percent",options:[{value:"percent",label:e("adm.cpPercent")},{value:"amount",label:e("adm.cpAmount")}]})}
        ${x({label:e("adm.cpValue"),name:"value",type:"number",required:!0,value:(a=t==null?void 0:t.value)!=null?a:10,attrs:'min="1" max="100000000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","Max discount"),name:"maxDiscount",type:"number",value:(s=t==null?void 0:t.maxDiscount)!=null?s:0,attrs:'min="0" max="100000000"'})}
        ${x({label:ht("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),name:"minOrder",type:"number",value:(n=t==null?void 0:t.minOrder)!=null?n:0,attrs:'min="0" max="100000000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u0654 \u06A9\u0644","Total usage limit"),name:"usageLimit",type:"number",value:(o=t==null?void 0:t.usageLimit)!=null?o:100,attrs:'min="1" max="100000"'})}
        ${x({label:ht("\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","Per user"),name:"perUser",type:"number",value:(i=t==null?void 0:t.perUser)!=null?i:1,attrs:'min="1" max="100"'})}
        ${x({label:e("adm.cpStart"),name:"startAt",type:"datetime-local",value:Ps(t==null?void 0:t.startAt)})}
        ${x({label:e("adm.cpEnd"),name:"endAt",type:"datetime-local",value:Ps(t==null?void 0:t.endAt)})}
        <div class="span-2">${x({label:e("common.note"),name:"note",value:(t==null?void 0:t.note)||""})}</div>
        <div class="span-2">${yt({label:e("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${e("common.save")}</button>
      </form>`})}function Ps(t){if(!t)return"";let a=new Date(t);if(Number.isNaN(a.getTime()))return"";let s=n=>String(n).padStart(2,"0");return`${a.getFullYear()}-${s(a.getMonth()+1)}-${s(a.getDate())}T${s(a.getHours())}:${s(a.getMinutes())}`}async function Ud(){try{let t=await f.get("/api/admin/ads");Ds=t.items||[],Oa=t.slots||[]}catch(t){return U({title:(t==null?void 0:t.message)||e("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("image")} ${e("adm.ads")}</h2>
        <p class="muted small">${e("adm.adsHint")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${c("plus")} ${e("common.add")}</button>
    </div>

    ${Oa.length?Oa.map(t=>{let a=Ds.filter(s=>s.slot===t.id);return r`
      <div class="card mb">
        <div class="row row-between">
          <strong>${c("pin")} ${h(q()?t.fa:t.en||t.fa)}</strong>
          <span class="badge-pill bp-muted">${g(a.length)}</span>
        </div>
        ${a.length?r`
          <div class="ad-rows mt-s">
            ${a.map(s=>r`
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
          </div>`:r`<p class="muted small mt-s">${e("common.noData")}</p>`}
      </div>`}).join(""):L({icon:"image",title:e("common.noData")})}`}function tc(t){var a;return pt({title:t?e("common.edit"):e("adm.adNew"),body:r`
      <form class="form-grid" data-act="adm-ad-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        <div class="span-2">${Y({label:e("adm.adSlot"),name:"slot",value:(t==null?void 0:t.slot)||((a=Oa[0])==null?void 0:a.id)||"home_hero",options:Oa.map(s=>({value:s.id,label:q()?s.fa:s.en||s.fa}))})}</div>
        ${x({label:e("common.title"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${x({label:ht("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:(t==null?void 0:t.titleEn)||""})}
        <div class="span-2">${J({label:e("common.text"),name:"text",value:(t==null?void 0:t.text)||"",rows:2})}</div>
        <div class="span-2">${J({label:ht("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"textEn",value:(t==null?void 0:t.textEn)||"",rows:2})}</div>
        ${x({label:e("common.link"),name:"link",value:(t==null?void 0:t.link)||"",hint:"#/products?cat=cases"})}
        ${x({label:e("common.image"),name:"image",value:(t==null?void 0:t.image)||"",hint:"/assets/\u2026"})}
        ${x({label:ht("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","CTA label"),name:"cta",value:(t==null?void 0:t.cta)||""})}
        ${x({label:ht("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","CTA (EN)"),name:"ctaEn",value:(t==null?void 0:t.ctaEn)||""})}
        ${x({label:ht("\u0634\u0631\u0648\u0639","Start"),name:"startAt",type:"datetime-local",value:Ps(t==null?void 0:t.startAt)})}
        ${x({label:ht("\u067E\u0627\u06CC\u0627\u0646","End"),name:"endAt",type:"datetime-local",value:Ps(t==null?void 0:t.endAt)})}
        <div class="span-2">${yt({label:e("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${e("common.save")}</button>
      </form>`})}async function _d(){let t=null;try{t=await f.get("/api/admin/notifications")}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}let a=t.items||[],s=t.outbox||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("bell")} ${e("adm.notifications")}</h2>
        <p class="muted small">${e("adm.notifHint")}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${c("send")} ${e("adm.notifNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:e("common.title"),name:"title",required:!0,attrs:'maxlength="120"'})}
            ${x({label:ht("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",attrs:'maxlength="120"'})}
            <div class="span-2">${J({label:e("common.text"),name:"body",rows:3,attrs:'maxlength="600"'})}</div>
            <div class="span-2">${J({label:ht("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"bodyEn",rows:2})}</div>
            ${Y({label:e("adm.notifLevel"),name:"level",value:"info",options:[{value:"info",label:e("notif.level.info")},{value:"success",label:e("notif.level.success")},{value:"warning",label:e("notif.level.warning")},{value:"error",label:e("notif.level.error")}]})}
            ${Y({label:e("common.type"),name:"type",value:"announcement",options:[{value:"announcement",label:e("notif.type.announcement")},{value:"news",label:e("notif.type.news")},{value:"offer",label:e("notif.type.offer")},{value:"system",label:e("notif.type.system")}]})}
            ${x({label:e("common.link"),name:"link",hint:"#/products"})}
            ${x({label:ht("\u0634\u0646\u0627\u0633\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631 (\u062E\u0627\u0644\u06CC = \u0647\u0645\u0647)","User id (empty = everyone)"),name:"userId"})}
            <div class="span-2">
              <span class="label">${e("adm.channels")}</span>
              <div class="row row-wrap mt-s">
                <label class="check"><input type="checkbox" name="ch_site" checked><span class="box">${c("check")}</span><span>${e("adm.chSite")}</span></label>
                <label class="check"><input type="checkbox" name="ch_telegram"><span class="box">${c("check")}</span><span>${e("adm.chTelegram")}</span></label>
                <label class="check"><input type="checkbox" name="ch_email"><span class="box">${c("check")}</span><span>${e("adm.chEmail")}</span></label>
                <label class="check"><input type="checkbox" name="ch_sms"><span class="box">${c("check")}</span><span>${e("adm.chSms")}</span></label>
              </div>
              <p class="hint">${e("adm.channelsHint")}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("send")} ${e("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("history")} ${e("adm.notifRecent")} (${g(a.length)})</strong>
          <div class="notif-list mt-s">
            ${a.length?a.slice(0,40).map(n=>r`
              <div class="notif-item lv-${h(n.level||"info")}">
                <div class="row row-between">
                  <strong class="tiny">${h(q()?n.title:n.titleEn||n.title)}</strong>
                  <span class="tiny muted nowrap">${St(n.createdAt)}</span>
                </div>
                ${n.body?r`<p class="tiny muted">${h(q()?n.body:n.bodyEn||n.body)}</p>`:""}
                <span class="tiny muted mono">${n.userId?h(n.userId):ht("\u0647\u0645\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","All users")}${n.link?` \xB7 ${h(n.link)}`:""}</span>
              </div>`).join(""):r`<p class="muted small">${e("common.noData")}</p>`}
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
    </div>`}function Wd(t){return N(t),null}async function Vd(){var a,s;let t=null;try{t=await f.get("/api/admin/telegram")}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-tg-save">
          <strong>${c("send")} ${e("adm.telegram")}</strong>
          <p class="muted small mt-s">${e("adm.tgHint")}</p>
          <div class="form-grid mt-s">
            <div class="span-2">${yt({label:e("adm.tgEnabled"),name:"enabled",checked:!!t.enabled})}</div>
            <div class="span-2">${x({label:e("adm.tgToken"),name:"token",hint:e("adm.tgTokenHint"),type:"password"})}</div>
            <div class="span-2">${J({label:e("adm.tgWelcome"),name:"welcome",rows:2,value:t.welcome||""})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("check")} ${e("common.save")}</button>
        </form>
        <form class="card mt" data-act="adm-tg-test">
          <strong>${c("zap")} ${e("adm.tgTest")}</strong>
          <div class="row mt-s">
            <input class="input" name="chatId" placeholder="chat id" required>
            <button class="btn btn-ghost" type="submit">${e("common.send")}</button>
          </div>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("chat")} ${e("adm.tgInbox")} (${g(((a=t.inbox)==null?void 0:a.length)||0)}) · ${e("adm.tgSubs")}: ${g(t.subs||0)}</strong>
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
                  <input class="input" name="text" placeholder="${e("adm.tgReplyPh")}" required>
                  <button class="btn btn-ghost btn-sm" type="submit">${c("send")}</button>
                </form>
              </div>`)}
            ${(t.inbox||[]).length?"":r`<p class="muted small">${e("adm.tgInboxEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}async function Yd(){var a;let t=null;try{t=await f.get("/api/admin/lotteries")}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-lot-create">
          <strong>${c("gift2")} ${e("adm.lotteryNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:e("common.title"),name:"title",required:!0})}
            ${x({label:e("adm.lotPrize"),name:"prize",required:!0})}
            ${x({label:e("adm.lotEnds"),name:"endsAt",type:"datetime-local",required:!0})}
            ${x({label:e("adm.lotWinners"),name:"winnersCount",type:"number",value:"1"})}
            <div class="span-2">${Y({label:e("adm.lotMode"),name:"entryMode",options:[{value:"orders",label:e("adm.lotModeOrders")},{value:"manual",label:e("adm.lotModeManual")}]})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("plus")} ${e("common.create")}</button>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("gift2")} ${e("adm.lottery")} (${g(((a=t.items)==null?void 0:a.length)||0)})</strong>
          <div class="notif-list mt-s">
            ${(t.items||[]).map(s=>{var n;return r`
              <div class="notif-item lv-${s.status==="drawn"?"success":s.status==="active"?"info":"warning"}">
                <div class="row row-between"><strong class="tiny">${h(s.title)}</strong><span class="tiny muted">${s.status}</span></div>
                <p class="tiny mt-s">${e("adm.lotPrize")}: ${h(s.prize)} · ${e("adm.lotEntries")}: ${g(s.entries||0)} · ${e("adm.lotEnds")}: ${h(s.endsAt||"")}</p>
                ${(n=s.winners)!=null&&n.length?r`<p class="tiny mt-s b">${e("adm.lotWinnersList")}: ${s.winners.map(o=>h(o.name)).join("\u060C ")}</p>`:""}
                ${s.status==="active"?r`<div class="row mt-s">
                  <button class="btn btn-primary btn-sm" data-act="adm-lot-run" data-id="${s.id}">${c("sparkles")} ${e("adm.lotRun")}</button>
                  <button class="btn btn-ghost btn-sm" data-act="adm-lot-close" data-id="${s.id}">${c("close")} ${e("adm.lotClose")}</button>
                </div>`:""}
              </div>`})}
            ${(t.items||[]).length?"":r`<p class="muted small">${e("adm.lotEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}var ht,ba,Ds,Oa,ja,za,ga=W(()=>{z();G();Z();dt();et();ut();nt();ht=(t,a)=>q()?t:a,ba=[],Ds=[],Oa=[];ja=null;y("adm-cp-new",()=>{ja=Zr(null)});y("adm-cp-edit",(t,a)=>{ja=Zr(ba.find(s=>s.id===a.dataset.id))});y("adm-cp-toggle",async(t,a)=>{let s=ba.find(n=>n.id===a.dataset.id);if(s)try{await f.patch(`/api/admin/coupons/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-cp-copy",async(t,a)=>{try{await navigator.clipboard.writeText(a.dataset.code),E(e("misc.copied"))}catch(s){E(a.dataset.code)}});y("adm-cp-del",async(t,a)=>{if(await Gt(a.dataset.name))try{await f.del(`/api/admin/coupons/${a.dataset.id}`),E(e("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-cp-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={type:s.get("type"),value:Number(s.get("value")||0),maxDiscount:Number(s.get("maxDiscount")||0),minOrder:Number(s.get("minOrder")||0),usageLimit:Number(s.get("usageLimit")||100),perUser:Number(s.get("perUser")||1),active:s.get("active")==="on",note:s.get("note")||""};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),n&&(o.code=String(s.get("code")||"").toUpperCase()),await D(a.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/coupons",o):await f.patch(`/api/admin/coupons/${a.dataset.id}`,o),E(e("misc.saved")),ja==null||ja.close(),T(!0)}catch(i){S(i)}})});za=null;y("adm-ad-new",()=>{za=tc(null)});y("adm-ad-edit",(t,a)=>{za=tc(Ds.find(s=>s.id===a.dataset.id))});y("adm-ad-toggle",async(t,a)=>{let s=Ds.find(n=>n.id===a.dataset.id);if(s)try{await f.patch(`/api/admin/ads/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-ad-del",async(t,a)=>{if(await Gt(a.dataset.name))try{await f.del(`/api/admin/ads/${a.dataset.id}`),E(e("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-ad-save",async(t,a)=>{t.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={slot:s.get("slot"),title:s.get("title"),titleEn:s.get("titleEn")||"",text:s.get("text")||"",textEn:s.get("textEn")||"",link:s.get("link")||"",image:s.get("image")||"",cta:s.get("cta")||"",ctaEn:s.get("ctaEn")||"",active:s.get("active")==="on"};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),await D(a.querySelector("button[type=submit]"),async()=>{try{n?await f.post("/api/admin/ads",o):await f.patch(`/api/admin/ads/${a.dataset.id}`,o),E(e("misc.saved")),za==null||za.close(),T(!0)}catch(i){S(i)}})});y("adm-notif-send",async(t,a)=>{t.preventDefault();let s=new FormData(a),n={title:String(s.get("title")||"").trim(),titleEn:String(s.get("titleEn")||"").trim(),body:String(s.get("body")||"").trim(),bodyEn:String(s.get("bodyEn")||"").trim(),level:s.get("level"),type:s.get("type"),link:String(s.get("link")||"").trim(),userId:String(s.get("userId")||"").trim(),channels:["site","telegram","email","sms"].filter(o=>s.get(`ch_${o}`))};n.title.length<3||await D(a.querySelector("button[type=submit]"),async()=>{try{let i=(await f.post("/api/admin/notifications",n)).results||{},l=Object.entries(i).map(([p,d])=>{var b;return`${p}: ${d.error?"\u2717":`\u2713${(b=d.ok)!=null?b:""}`}`}).join(" ");E(l?`${e("misc.sent")} \u2014 ${l}`:e("misc.sent"),{timeout:4200}),T(!0)}catch(o){S(o)}})});y("adm-tg-save",async(t,a)=>{var n,o;t.preventDefault();let s={enabled:!!((n=a.enabled)!=null&&n.checked)};(o=a.token)!=null&&o.value&&(s.token=a.token.value),a.welcome!==void 0&&(s.welcome=a.welcome.value),await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/admin/telegram",s),E(e("common.saved")),T(!0)}catch(i){S(i)}})});y("adm-tg-test",async(t,a)=>{t.preventDefault();try{await f.post("/api/admin/telegram/test",{chatId:a.chatId.value}),E(e("misc.sent"))}catch(s){S(s)}});y("adm-tg-reply",async(t,a)=>{t.preventDefault();try{await f.post("/api/admin/telegram/reply",{chatId:a.dataset.chat,text:a.text.value}),E(e("misc.sent")),a.text.value=""}catch(s){S(s)}});y("adm-lot-create",async(t,a)=>{t.preventDefault();let s=new Date(a.endsAt.value).toISOString();await D(a.querySelector("button[type=submit]"),async()=>{try{await f.post("/api/admin/lotteries",{title:a.title.value,prize:a.prize.value,endsAt:s,winnersCount:Number(a.winnersCount.value||1),entryMode:a.entryMode.value}),E(e("common.saved")),T(!0)}catch(n){S(n)}})});y("adm-lot-run",async(t,a)=>{await wt({text:e("adm.lotRunWarn"),danger:!0})&&await D(a,async()=>{var n;try{let o=await f.post(`/api/admin/lotteries/${a.dataset.id}/run`,{});E(`${e("adm.lotDone")}: ${(((n=o.lottery)==null?void 0:n.winners)||[]).map(i=>i.name).join("\u060C ")}`,{timeout:6e3}),T(!0)}catch(o){S(o)}})});y("adm-lot-close",async(t,a)=>{await D(a,async()=>{try{await f.post(`/api/admin/lotteries/${a.dataset.id}/close`,{}),E(e("adm.lotClosed")),T(!0)}catch(s){S(s)}})})});var Ua={};X(Ua,{mount:()=>tm,render:()=>Gd});async function Gd(t){var i,l,p,d;let a=["settings","theme","features"].includes(t.params.section)?t.params.section:"settings",s=ec[a].filter(b=>a==="theme"?Q("theme.edit"):!0);if(!s.length)return L({icon:"lock",title:e("adm.noPermission")});let n=s.find(b=>b.id===t.params.id)||s[0];try{Ms=await f.get("/api/admin/settings")}catch(b){return U({title:(b==null?void 0:b.message)||e("err.generic")})}let o=((i=Ms.settings)==null?void 0:i[n.id])||{};return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(n.icon)} ${n.label()}</h2>
      <span class="badge-pill bp-info">${e("adm.liveView")}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${ec[a].filter(b=>a==="theme"?Q("theme.edit"):!0).map(b=>r`
        <a class="tab ${b.id===n.id?"active":""}" href="#/admin/${a}/${b.id}">${c(b.icon)} ${b.label()}</a>`)}
    </div>
    ${n.id==="features"?Jd(((l=Ms.settings)==null?void 0:l.features)||{}):n.id==="backups"?ct("<div data-backups-panel></div>"):n.id==="partners"?Xd(((d=(p=Ms.settings)==null?void 0:p.partners)==null?void 0:d.items)||[]):Kd(n.id,o)}
    <p class="hint mt">${M("\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0646\u062A\u06CC\u062C\u0647 \u0635\u0641\u062D\u0647 \u0631\u0627 \u062A\u0627\u0632\u0647 \u06A9\u0646.","Changes apply to the site immediately; refresh the page to see them.")}</p>`}function Kd(t,a){let s=sc[t]||[];return r`
    <form class="card" data-act="adm-set-save" data-section="${t}">
      <div class="form-grid">
        ${s.map(n=>Qd(n,a[n.k])).join("")}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${e("common.reset")}</button>
      </div>
    </form>`}function Qd(t,a){var n,o,i,l,p;let s=t.label();switch(t.type){case"bool":return r`<div class="span-2">${yt({label:s,desc:t.hint?t.hint():"",name:t.k,checked:a!==!1})}</div>`;case"select":return Y({label:s,name:t.k,value:a!=null?a:"",options:t.options().map(([d,b])=>({value:d,label:b}))});case"number":return x({label:s,name:t.k,type:"number",value:a!=null?a:"",attrs:`min="${(n=t.min)!=null?n:0}" max="${(o=t.max)!=null?o:999999999}" step="${(i=t.step)!=null?i:1}"`});case"textarea":return r`<div class="span-2">${J({label:s,name:t.k,value:a!=null?a:"",rows:3})}</div>`;case"color":return r`
        <label class="field"><span class="label">${s}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${t.k}-pick" value="${h(a||"#f59e0b")}" data-color-for="${t.k}">
            <input class="input mono" name="${t.k}" value="${h(a||"#f59e0b")}" maxlength="7" data-fkey="${t.k}">
          </span>
        </label>`;case"coords":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row">
            <input class="input mono" name="${t.k}.lat" value="${(l=a==null?void 0:a.lat)!=null?l:""}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${t.k}.lng" value="${(p=a==null?void 0:a.lng)!=null?p:""}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${t.k}.lat" data-lng="${t.k}.lng">${c("pin")} ${e("contact.allowLocation")}</button>
          </div>
        </div>`;case"group":return r`
        <div class="span-2 group-box">
          <strong class="small">${s}</strong>
          <div class="form-grid mt-s">
            ${t.fields.map(d=>{var b,u;return d.type==="bool"?r`<div class="span-2">${yt({label:d.label(),name:`${t.k}.${d.k}`,checked:(a==null?void 0:a[d.k])!==!1})}</div>`:d.type==="number"?x({label:d.label(),name:`${t.k}.${d.k}`,type:"number",value:(b=a==null?void 0:a[d.k])!=null?b:""}):x({label:d.label(),name:`${t.k}.${d.k}`,value:(u=a==null?void 0:a[d.k])!=null?u:"",type:d.k==="pass"||d.k==="apiKey"?"password":"text"})}).join("")}
          </div>
        </div>`;case"kv":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var b;return r`<label class="field"><span class="label tiny muted mono">${d}</span>
              <input class="input" name="${t.k}.${d}" value="${h((b=a==null?void 0:a[d])!=null?b:"")}"></label>`})}
          </div>
        </div>`;case"kvnum":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var b;return r`<label class="field"><span class="label tiny muted">${e(`adm.uCols${d.charAt(0).toUpperCase()}${d.slice(1)}`)}</span>
              <input class="input" type="number" min="${t.min}" max="${t.max}" name="${t.k}.${d}" value="${(b=a==null?void 0:a[d])!=null?b:""}"></label>`})}
          </div>
        </div>`;case"multi":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row row-wrap">
            ${t.options().map(([d,b])=>r`<label class="check"><input type="checkbox" name="${t.k}[]" value="${d}" ${(a||[]).includes(d)?"checked":""}><span class="box">${c("check")}</span><span>${b}</span></label>`)}
          </div>
        </div>`;case"rows":return r`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${s}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${t.k}">${c("plus")} ${e("common.add")}</button>
          </div>
          <div data-rows="${t.k}">
            ${(Array.isArray(a)?a:[]).map(d=>ac(t,d)).join("")}
          </div>
          <template data-row-tpl="${t.k}">${ac(t,null)}</template>
        </div>`;default:return x({label:s,name:t.k,value:a!=null?a:""})}}function ac(t,a){return r`
    <div class="spec-row" data-row="${t.k}">
      ${t.cols.map(s=>{var o;let n=(o=a==null?void 0:a[s.k])!=null?o:"";return s.type==="select"?r`<select class="select" data-col="${s.k}">${s.options().map(([i,l])=>r`<option value="${i}" ${String(n)===String(i)?"selected":""}>${l}</option>`)}</select>`:s.type==="number"?r`<input class="input" type="number" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`:r`<input class="input" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`})}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${c("trash")}</button>
    </div>`}function Jd(t){let a=Object.keys(t);return r`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${c("info")}<span>${e("adm.fHint")}</span></p>
      <div class="perm-grid">
        ${a.map(s=>r`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${s}" ${t[s]!==!1?"checked":""}><span class="track"></span></span>
            <span class="grow">${e(`feat.${s}`)||s}<span class="k mono">${s}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${e("common.reset")}</button>
      </div>
    </form>`}function Xd(t){let a=s=>r`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${e("adm.ptFa")}" value="${(s==null?void 0:s.fa)||""}" maxlength="60">
      <input class="input" name="en" placeholder="${e("adm.ptEn")}" value="${(s==null?void 0:s.en)||""}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${e("misc.delete")}">${c("trash")}</button>
    </div>`;return r`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${c("info")}<span>${e("adm.ptHint")}</span></p>
      <div class="col" data-ptlist>${t.map(s=>a(s)).join("")||a(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${c("plus")} ${e("adm.ptAdd")}</button>
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
      </div>
    </form>`}function Zd(t,a){var n,o,i,l,p,d,b;let s={};if(a==="features")return t.querySelectorAll('input[type=checkbox][name^="features."]').forEach(u=>{s[u.name.slice(9)]=u.checked}),s;if(a==="partners")return s.items=[...t.querySelectorAll("[data-ptrow]")].map(u=>({fa:u.querySelector("[name=fa]").value.trim(),en:u.querySelector("[name=en]").value.trim()})).filter(u=>u.fa||u.en),s;for(let u of sc[a]||[])switch(u.type){case"bool":{let v=t.querySelector(`[name="${u.k}"]`);v&&(s[u.k]=v.checked);break}case"multi":{s[u.k]=[...t.querySelectorAll(`[name="${u.k}[]"]`)].filter(v=>v.checked).map(v=>v.value);break}case"rows":{s[u.k]=[...t.querySelectorAll(`[data-rows="${u.k}"] [data-row]`)].map(v=>{var w;let $={};for(let k of u.cols){let C=v.querySelector(`[data-col="${k.k}"]`);$[k.k]=k.type==="number"?Number((C==null?void 0:C.value)||0):String((w=C==null?void 0:C.value)!=null?w:"")}return $});break}case"kv":{let v={};for(let $ of u.keys)v[$]=String((o=(n=t.querySelector(`[name="${u.k}.${$}"]`))==null?void 0:n.value)!=null?o:"");s[u.k]=v;break}case"group":{let v={};for(let $ of u.fields){let w=t.querySelector(`[name="${u.k}.${$.k}"]`);w&&(v[$.k]=$.type==="bool"?w.checked:$.type==="number"?Number(w.value||0):String((i=w.value)!=null?i:""))}s[u.k]=v;break}case"kvnum":{let v={};for(let $ of u.keys)v[$]=Number(((l=t.querySelector(`[name="${u.k}.${$}"]`))==null?void 0:l.value)||0);s[u.k]=v;break}case"coords":{let v=(p=t.querySelector(`[name="${u.k}.lat"]`))==null?void 0:p.value,$=(d=t.querySelector(`[name="${u.k}.lng"]`))==null?void 0:d.value;v!==""&&$!==""&&v!==void 0&&(s[u.k]={lat:Number(v),lng:Number($)});break}case"number":{let v=t.querySelector(`[name="${u.k}"]`);v&&v.value!==""&&(s[u.k]=Number(v.value));break}default:{let v=t.querySelector(`[name="${u.k}"]`);v&&(s[u.k]=String((b=v.value)!=null?b:""))}}return s}function tm(t,a){var s;return N(t),((s=a==null?void 0:a.params)==null?void 0:s.id)==="backups"&&nc(t),t.querySelectorAll("[data-color-for]").forEach(n=>{let o=t.querySelector(`[name="${n.dataset.colorFor}"]`);n.addEventListener("input",()=>{o&&(o.value=n.value)}),o==null||o.addEventListener("input",()=>{/^#[0-9a-f]{6}$/i.test(o.value)&&(n.value=o.value)})}),null}async function nc(t){var s;let a=t.querySelector("[data-backups-panel]");if(a){a.innerHTML='<div class="sk sk-line w70"></div>';try{let n=await f.get("/api/admin/backups");a.innerHTML=r`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${c("download")} ${e("adm.sBackups")}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${c("download")} ${e("adm.dumpFull")}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${c("plus")} ${e("adm.backupNow")}</button>
          </div>
        </div>
        <p class="muted small mt-s">${e("adm.backupsHint",{hours:g(n.everyHours||12),keep:g(n.keep||14)})}</p>
        ${(s=n.items)!=null&&s.length?r`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${e("common.date")}</th><th>${e("adm.backupSize")}</th><th></th></tr></thead>
          <tbody>${n.items.map(o=>r`<tr>
            <td class="tiny">${O(o.at)}</td>
            <td class="tiny muted">${g(Math.round(o.bytes/1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${o.id}/download" download>${c("download")} ${e("common.download")}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${o.id}">${c("refresh")} ${e("adm.backupRestore")}</button>
            </div></td>
          </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${e("adm.backupsEmpty")}</p>`}
      </div>`}catch(n){a.innerHTML=r`<div class="notice notice-error">${c("alert")} ${(n==null?void 0:n.message)||e("err.generic")}</div>`}}}var M,sc,ec,Ms,_a=W(()=>{z();G();Z();K();dt();et();ut();nt();M=(t,a)=>q()?t:a,sc={mailsms:[{k:"mail",label:()=>e("adm.mailCfg"),type:"group",fields:[{k:"enabled",label:()=>e("adm.mailEnabled"),type:"bool"},{k:"host",label:()=>"SMTP host",type:"text"},{k:"port",label:()=>"SMTP port",type:"number",min:1,max:65535},{k:"user",label:()=>e("common.username"),type:"text"},{k:"pass",label:()=>e("common.password"),type:"text"},{k:"from",label:()=>e("adm.mailFrom"),type:"text"}]},{k:"sms",label:()=>e("adm.smsCfg"),type:"group",fields:[{k:"enabled",label:()=>e("adm.smsEnabled"),type:"bool"},{k:"apiKey",label:()=>e("adm.smsKey"),type:"text"},{k:"sender",label:()=>e("adm.smsSender"),type:"text"}]}],store:[{k:"name",label:()=>M("\u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","Store name"),type:"text"},{k:"nameEn",label:()=>M("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)"),type:"text"},{k:"tagline",label:()=>M("\u0634\u0639\u0627\u0631","Tagline"),type:"text"},{k:"taglineEn",label:()=>M("\u0634\u0639\u0627\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Tagline (EN)"),type:"text"},{k:"phone",label:()=>e("contact.phone"),type:"text"},{k:"phone2",label:()=>e("contact.mobile"),type:"text"},{k:"phone3",label:()=>M("\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","Third phone (optional)"),type:"text"},{k:"whatsapp",label:()=>e("contact.whatsapp"),type:"text"},{k:"email",label:()=>e("common.email"),type:"text"},{k:"city",label:()=>e("common.city"),type:"text"},{k:"cityEn",label:()=>M("\u0634\u0647\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","City (EN)"),type:"text"},{k:"address",label:()=>e("common.address"),type:"textarea"},{k:"addressEn",label:()=>M("\u0622\u062F\u0631\u0633 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Address (EN)"),type:"textarea"},{k:"description",label:()=>e("common.description"),type:"textarea"},{k:"descriptionEn",label:()=>M("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Description (EN)"),type:"textarea"},{k:"enamad",label:()=>M("\u06A9\u062F \u0646\u0645\u0627\u062F \u0627\u0639\u062A\u0645\u0627\u062F","Trust symbol code"),type:"text"},{k:"established",label:()=>M("\u0633\u0627\u0644 \u062A\u0623\u0633\u06CC\u0633 (\u0634\u0645\u0633\u06CC)","Founded year (Solar)"),type:"number",min:1300,max:1500},{k:"mapCoords",label:()=>M("\u0645\u062E\u062A\u0635\u0627\u062A \u0646\u0642\u0634\u0647","Map coordinates"),type:"coords"},{k:"socials",label:()=>M("\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC","Social links"),type:"kv",keys:["instagram","telegram","eitaa","whatsapp","website"]},{k:"workingHours",label:()=>e("footer.workingHours"),type:"rows",cols:[{k:"fa",label:()=>M("\u0631\u0648\u0632","Day (FA)")},{k:"en",label:()=>M("Day (EN)","Day (EN)")},{k:"time",label:()=>M("\u0633\u0627\u0639\u062A","Hours (FA)")},{k:"timeEn",label:()=>M("Hours (EN)","Hours (EN)")}]}],theme:[{k:"theme",label:()=>M("\u0642\u0627\u0644\u0628 \u0638\u0627\u0647\u0631\u06CC (\u062A\u0645)","Design Theme"),type:"select",options:()=>[["default",M("\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u06CC\u0627\u0633\u0627\u06CC\u06CC/\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644)","Default")],["tehran-nights",M("\u0634\u0628\u200C\u0647\u0627\u06CC \u062A\u0647\u0631\u0627\u0646","Tehran Nights")],["milad",M("\u0628\u0631\u062C \u0645\u06CC\u0644\u0627\u062F","Milad Tower")],["azadi",M("\u0645\u06CC\u062F\u0627\u0646 \u0622\u0632\u0627\u062F\u06CC","Azadi Square")],["lalehzar",M("\u0644\u0627\u0644\u0647\u200C\u0632\u0627\u0631","Lalehzar")],["tochal",M("\u062A\u0648\u0686\u0627\u0644","Tochal")],["valiasr",M("\u0648\u0644\u06CC\u0639\u0635\u0631","Valiasr")],["bazaar",M("\u0628\u0627\u0632\u0627\u0631 \u0628\u0632\u0631\u06AF","Grand Bazaar")],["chitgar",M("\u0686\u06CC\u062A\u06AF\u0631","Chitgar")],["tajrish",M("\u062A\u062C\u0631\u06CC\u0634","Tajrish")],["darband",M("\u062F\u0631\u0628\u0646\u062F","Darband")]]},{k:"accent",label:()=>e("adm.tAccent"),type:"color"},{k:"mode",label:()=>e("adm.tMode"),type:"select",options:()=>[["dark",e("theme.dark")],["light",e("theme.light")]]},{k:"bgStyle",label:()=>e("adm.tBg"),type:"select",options:()=>[["waves",M("\u0645\u0648\u062C \u0648 \u062A\u0647\u0631\u0627\u0646","Waves & port")],["grid",M("\u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","Grid")],["plain",M("\u0633\u0627\u062F\u0647","Plain")]]},{k:"density",label:()=>e("adm.tDensity"),type:"select",options:()=>[["compact","Compact"],["normal","Normal"],["comfy","Comfy"]]},{k:"contrast",label:()=>e("adm.tContrast"),type:"select",options:()=>[["normal","Normal"],["high","High"]]},{k:"radius",label:()=>e("adm.tRadius"),type:"number",min:0,max:32},{k:"portTheme",label:()=>e("adm.tPort"),type:"bool",hint:()=>e("adm.tPortHint")},{k:"animations",label:()=>e("adm.tAnim"),type:"bool"}],ui:[{k:"searchPosition",label:()=>e("adm.uSearchPos"),type:"select",options:()=>[["start",e("adm.uPosStart")],["center",e("adm.uPosCenter")],["end",e("adm.uPosEnd")]]},{k:"headerLayout",label:()=>e("adm.uHeader"),type:"select",options:()=>[["logoStart",e("adm.uLayoutLogoStart")],["split",e("adm.uLayoutSplit")],["centered",e("adm.uLayoutCentered")]]},{k:"navStyle",label:()=>e("adm.uNav"),type:"select",options:()=>[["pills","Pills"],["underline","Underline"]]},{k:"cardStyle",label:()=>e("adm.uCards"),type:"select",options:()=>[["grid",e("catalog.viewGrid")],["list",e("catalog.viewList")]]},{k:"stickyHeader",label:()=>e("adm.uSticky"),type:"bool"},{k:"showTicker",label:()=>e("adm.uTicker"),type:"bool"},{k:"tickerSpeed",label:()=>e("adm.uTickerSpeed"),type:"number",min:10,max:90},{k:"quickView",label:()=>e("adm.uQuick"),type:"bool"},{k:"floatingChat",label:()=>e("adm.uChat"),type:"bool"},{k:"showBreadcrumbs",label:()=>e("adm.uCrumb"),type:"bool"},{k:"columns",label:()=>e("adm.uCols"),type:"kvnum",keys:["mobile","tablet","desktop","wide"],min:1,max:8},{k:"productCardInfo",label:()=>e("adm.uCardInfo"),type:"multi",options:()=>[["brand",e("common.brand")],["stock",e("common.stock")],["rating",e("common.rating")],["warranty",e("pdp.warranty")],["sold",e("pdp.sold")]]},{k:"tickerItems",label:()=>e("adm.uTickerItems"),type:"rows",cols:[{k:"text",label:()=>M("\u0645\u062A\u0646","Text")},{k:"textEn",label:()=>M("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)")},{k:"link",label:()=>M("\u0644\u06CC\u0646\u06A9","Link")}]}],shipping:[{k:"pickupEnabled",label:()=>e("checkout.pickup"),type:"bool"},{k:"courierEnabled",label:()=>e("checkout.courier"),type:"bool"},{k:"courierBase",label:()=>M("\u0647\u0632\u06CC\u0646\u0647\u0654 \u067E\u0627\u06CC\u0647\u0654 \u0627\u0631\u0633\u0627\u0644","Base shipping fee"),type:"number",min:0,max:1e7},{k:"freeOver",label:()=>M("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"handlingHours",label:()=>M("\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC (\u0633\u0627\u0639\u062A)","Handling hours"),type:"number",min:1,max:720},{k:"expressEnabled",label:()=>e("checkout.express"),type:"bool"},{k:"expressFee",label:()=>M("\u0647\u0632\u06CC\u0646\u0647\u0654 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC","Express fee"),type:"number",min:0,max:1e7},{k:"insuranceRatePct",label:()=>M("\u0646\u0631\u062E \u0628\u06CC\u0645\u0647 (\u062F\u0631\u0635\u062F)","Insurance rate (%)"),type:"number",min:0,max:20,step:.1},{k:"insuranceMin",label:()=>M("\u062D\u062F\u0627\u0642\u0644 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u06CC\u0645\u0647","Insurance minimum"),type:"number",min:0,max:1e7},{k:"zones",label:()=>e("checkout.zone"),type:"rows",cols:[{k:"id",label:()=>M("\u0634\u0646\u0627\u0633\u0647","ID"),type:"select",options:()=>[["city",M("\u062F\u0627\u062E\u0644 \u0634\u0647\u0631","City")],["province",M("\u0627\u0633\u062A\u0627\u0646","Province")],["country",M("\u06A9\u0634\u0648\u0631","Country")],["island",M("\u062C\u0632\u0627\u06CC\u0631","Islands")]]},{k:"name",label:()=>M("\u0646\u0627\u0645","Name")},{k:"nameEn",label:()=>M("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)")},{k:"fee",label:()=>M("\u0647\u0632\u06CC\u0646\u0647","Fee"),type:"number"},{k:"eta",label:()=>M("\u0632\u0645\u0627\u0646 \u062A\u062D\u0648\u06CC\u0644","ETA")}]}],plus:[{k:"enabled",label:()=>e("feat.plus"),type:"bool"},{k:"price",label:()=>M("\u0645\u0628\u0644\u063A \u0627\u0634\u062A\u0631\u0627\u06A9","Price"),type:"number",min:0,max:1e8},{k:"durationDays",label:()=>M("\u0645\u062F\u062A (\u0631\u0648\u0632)","Duration (days)"),type:"number",min:1,max:365},{k:"discountPct",label:()=>M("\u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC (\u062F\u0631\u0635\u062F)","Permanent discount (%)"),type:"number",min:0,max:30,step:.5},{k:"freeShippingMin",label:()=>M("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"autoInsurance",label:()=>M("\u0628\u06CC\u0645\u0647\u0654 \u062E\u0648\u062F\u06A9\u0627\u0631","Auto insurance"),type:"bool"},{k:"prioritySupport",label:()=>M("\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631","Priority support"),type:"bool"},{k:"expressDiscountPct",label:()=>M("\u062A\u062E\u0641\u06CC\u0641 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u062F\u0631\u0635\u062F)","Express discount (%)"),type:"number",min:0,max:100},{k:"perks",label:()=>e("acc.plusPerks"),type:"rows",cols:[{k:"id",label:()=>"id"},{k:"fa",label:()=>M("\u0645\u0632\u06CC\u062A","Perk (FA)")},{k:"en",label:()=>M("Perk (EN)","Perk (EN)")}]}],orders:[{k:"minOrder",label:()=>M("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),type:"number",min:0,max:1e8},{k:"walletEnabled",label:()=>e("feat.wallet"),type:"bool"},{k:"gatewayEnabled",label:()=>e("pm.gateway"),type:"bool"},{k:"gatewayMode",label:()=>M("\u062D\u0627\u0644\u062A \u062F\u0631\u06AF\u0627\u0647","Gateway mode"),type:"select",options:()=>[["demo",M("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",M("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"codEnabled",label:()=>e("pm.cod"),type:"bool"},{k:"autoCancelHours",label:()=>M("\u0644\u063A\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0633 \u0627\u0632 (\u0633\u0627\u0639\u062A)","Auto-cancel after (h)"),type:"number",min:1,max:720},{k:"stockReserveMinutes",label:()=>M("\u0631\u0632\u0631\u0648 \u0645\u0648\u062C\u0648\u062F\u06CC (\u062F\u0642\u06CC\u0642\u0647)","Stock reserve (min)"),type:"number",min:0,max:1440},{k:"refundToWallet",label:()=>M("\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647 \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644","Refund to wallet"),type:"bool"}],seo:[{k:"title",label:()=>M("\u0639\u0646\u0648\u0627\u0646 \u0633\u0627\u06CC\u062A","Site title"),type:"text"},{k:"description",label:()=>M("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u062A\u0627","Meta description"),type:"textarea"},{k:"keywords",label:()=>M("\u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647\u200C\u0647\u0627","Keywords"),type:"text"}],currency:[{k:"code",label:()=>M("\u06A9\u062F \u0627\u0631\u0632","Currency code"),type:"text"},{k:"label",label:()=>M("\u0646\u0627\u0645 \u0648\u0627\u062D\u062F","Unit label"),type:"text"},{k:"labelEn",label:()=>M("Unit (EN)","Unit (EN)"),type:"text"}],auth:[{k:"allowRegistration",label:()=>M("\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F","Allow registration"),type:"bool"},{k:"otpMode",label:()=>M("\u062D\u0627\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F","OTP mode"),type:"select",options:()=>[["demo",M("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",M("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"requirePhone",label:()=>M("\u0634\u0645\u0627\u0631\u0647\u0654 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC","Require phone"),type:"bool"},{k:"force2faStaff",label:()=>M("\u06F2FA \u0627\u062C\u0628\u0627\u0631\u06CC \u06A9\u0627\u0631\u06A9\u0646\u0627\u0646","Force 2FA for staff"),type:"bool"},{k:"sessionDays",label:()=>M("\u0637\u0648\u0644 \u0646\u0634\u0633\u062A (\u0631\u0648\u0632)","Session days"),type:"number",min:1,max:90}],contact:[{k:"supportNote",label:()=>M("\u067E\u06CC\u0627\u0645 \u0628\u062E\u0634 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","Support note"),type:"textarea"},{k:"supportNoteEn",label:()=>M("Support note (EN)","Support note (EN)"),type:"textarea"}]},ec={settings:[{id:"store",icon:"store",label:()=>e("adm.sStore")},{id:"shipping",icon:"truck",label:()=>e("adm.sShipping")},{id:"plus",icon:"sparkles",label:()=>e("adm.sPlus")},{id:"orders",icon:"card",label:()=>e("adm.sOrders")},{id:"auth",icon:"key",label:()=>e("adm.sAuth")},{id:"seo",icon:"search",label:()=>e("adm.sSeo")},{id:"currency",icon:"wallet",label:()=>M("\u0648\u0627\u062D\u062F \u067E\u0648\u0644","Currency")},{id:"partners",icon:"star",label:()=>e("adm.sPartners")},{id:"contact",icon:"headset",label:()=>e("common.support")},{id:"mailsms",icon:"send",label:()=>e("adm.mailsms")}],theme:[{id:"theme",icon:"sun",label:()=>e("adm.sTheme")},{id:"ui",icon:"grid",label:()=>e("adm.sUi")}],features:[{id:"features",icon:"zap",label:()=>e("adm.sFeatures")},{id:"backups",icon:"download",label:()=>e("adm.sBackups")}]},Ms=null;y("adm-pt-add",t=>{t.target.closest("form").querySelector("[data-ptlist]").insertAdjacentHTML("beforeend",`<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${e("adm.ptFa")}" value="" maxlength="60"><input class="input" name="en" placeholder="${e("adm.ptEn")}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${e("misc.delete")}">${c("trash")}</button></div>`)});y("adm-pt-del",t=>{let a=t.target.closest("form");a.querySelectorAll("[data-ptrow]").length>1?t.target.closest("[data-ptrow]").remove():a.querySelectorAll("[data-ptrow] input").forEach(n=>n.value="")});y("adm-set-save",async(t,a)=>{t.preventDefault();let s=a.dataset.section,n=Zd(a,s);if(s==="theme"&&n.accent&&!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n.accent)){V(q()?"\u0631\u0646\u06AF \u0628\u0627\u06CC\u062F \u0628\u0627 \u0641\u0631\u0645\u062A #RRGGBB \u0628\u0627\u0634\u062F.":"Colour must be in #RRGGBB format.");return}await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/settings/${s}`,{value:n}),await Ot({silent:!0}),Ce(),E(e("adm.sSaved")),T(!0)}catch(o){S(o)}})});y("adm-set-reset",()=>T(!0));y("adm-set-geo",(t,a)=>{if(!navigator.geolocation){V(e("contact.locationDenied"));return}navigator.geolocation.getCurrentPosition(s=>{let n=a.closest("form"),o=n.querySelector(`[name="${a.dataset.lat}"]`),i=n.querySelector(`[name="${a.dataset.lng}"]`);o&&(o.value=s.coords.latitude.toFixed(5)),i&&(i.value=s.coords.longitude.toFixed(5)),E(e("contact.locationOn"))},()=>V(e("contact.locationDenied")),{timeout:9e3})});y("adm-row-add",(t,a)=>{let s=a.dataset.row,n=a.closest("form"),o=n.querySelector(`[data-row-tpl="${s}"]`),i=n.querySelector(`[data-rows="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let p=l.firstElementChild;p&&(p.querySelectorAll("input").forEach(d=>{d.value=""}),i.appendChild(p))});y("adm-row-del",(t,a)=>{var s;(s=a.closest("[data-row]"))==null||s.remove()});y("adm-backup-now",async(t,a)=>{await D(a,async()=>{var s;try{await f.post("/api/admin/backups",{}),E(e("adm.backupDone")),await nc(document.querySelector("#view")||((s=a.closest("#view"))==null?void 0:s.parentNode)||document)}catch(n){S(n)}})});y("adm-backup-restore",async(t,a)=>{await wt({text:e("adm.backupRestoreWarn"),danger:!0})&&await D(a,async()=>{try{await f.post("/api/admin/backups/restore",{id:a.dataset.id}),E(e("adm.backupRestored")),setTimeout(()=>location.reload(),900)}catch(n){S(n)}})})});var mc={};X(mc,{mount:()=>lm,render:()=>em});async function em(t){try{lc=(await f.get("/api/admin/pages")).pages||{}}catch(s){return U({title:(s==null?void 0:s.message)||e("err.generic")})}let a=Wa.find(s=>s.key===t.params.id)?t.params.id:"";return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("file")} ${e("adm.pages")}</h2>
      <span class="badge-pill bp-muted">${g(Wa.length)} ${_("\u0635\u0641\u062D\u0647","pages")}</span>
    </div>

    <div class="page-grid">
      <div class="card page-nav">
        ${Wa.map(s=>r`
          <a class="pg-item ${s.key===a?"active":""}" href="#/admin/pages/${s.key}">
            ${c(s.icon)}<span class="grow">${dc(s.key)}</span>
          </a>`).join("")}
      </div>
      <div>${a?am(Wa.find(s=>s.key===a)):L({icon:"file",title:e("adm.pagesPick"),text:e("adm.pagesPickHint")})}</div>
    </div>`}function dc(t){return{about:e("footer.about"),guide:e("footer.guide"),service:e("footer.service"),faq:e("footer.faq"),terms:e("footer.terms"),privacy:e("footer.privacy"),insurance:e("footer.insurance"),ticketRules:e("acc.ticketRules"),bugReport:e("feedback.bug"),contact:e("footer.contact"),installments:_("\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC","Installments")}[t]||t}function am(t){let a=lc[t.key]||(t.key==="faq"?[]:{});return r`
    <form class="card" data-act="adm-pg-save" data-key="${t.key}">
      <div class="row row-between row-wrap mb-s">
        <strong>${c(t.icon)} ${dc(t.key)}</strong>
        <a class="btn btn-ghost btn-xs" href="#/pages/${t.key}" target="_blank" rel="noopener">${c("external")} ${e("adm.view")}</a>
      </div>
      <p class="notice notice-info mb">${c("info")}<span>${e("adm.pgHint")}</span></p>
      ${t.blocks.map(s=>sm(s,a)).join("")}
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${e("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/pages/${t.key}">${e("common.reset")}</a>
      </div>
    </form>`}function sm(t,a){switch(t){case"hero":{let s=a.hero||{};return r`
        <fieldset class="pg-block">
          <legend>${c("sparkles")} ${_("\u0633\u0631\u0628\u0631\u06AF \u0635\u0641\u062D\u0647","Page hero")}</legend>
          <div class="form-grid">
            ${x({label:e("common.title"),name:"hero.title",value:s.title||"",span2:!0})}
            ${x({label:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"hero.titleEn",value:s.titleEn||"",span2:!0})}
            ${J({label:_("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646","Subtitle"),name:"hero.subtitle",value:s.subtitle||"",rows:2,span2:!0})}
            ${J({label:_("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Subtitle (EN)"),name:"hero.subtitleEn",value:s.subtitleEn||"",rows:2,span2:!0})}
          </div>
        </fieldset>`}case"intro":return ao("intro",_("\u0645\u0642\u062F\u0645\u0647","Intro"),a.intro||"",a.introEn||"");case"body":return ao("body",_("\u0645\u062A\u0646 \u0627\u0635\u0644\u06CC","Body text"),a.body||"",a.bodyEn||"");case"notice":return ao("notice",_("\u0647\u0634\u062F\u0627\u0631/\u0646\u06A9\u062A\u0647","Notice"),a.notice||"",a.noticeEn||"",2);case"rules":return oc("rules",_("\u0628\u0646\u062F\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0628\u0646\u062F)","Clauses (one per line)"),a.rules||[],a.rulesEn||[]);case"hints":return oc("hints",_("\u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u200C\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9\u06CC)","Hints (one per line)"),a.hints||[],a.hintsEn||[]);case"sections":return nm(a.sections||[]);case"steps":return Ls("steps",_("\u06AF\u0627\u0645\u200C\u0647\u0627","Steps"),a.steps||[],["title","titleEn","body","bodyEn"],"list");case"items":return Ls("items",_("\u0645\u0648\u0627\u0631\u062F \u062E\u062F\u0645\u0627\u062A","Service items"),a.items||[],["icon","title","titleEn","body","bodyEn"],"grid");case"tips":return Ls("tips",_("\u0646\u06A9\u062A\u0647\u200C\u0647\u0627","Tips"),a.tips||[],["fa","en"],"grid");case"stats":return Ls("stats",_("\u0622\u0645\u0627\u0631\u0647\u0627\u06CC \u0635\u0641\u062D\u0647\u0654 \u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627","About-page stats"),a.stats||[],["fa","en","key"],"grid");case"faq":return cm(Array.isArray(a)?a:[]);default:return""}}function ao(t,a,s,n,o=4){return r`
    <fieldset class="pg-block">
      <legend>${c("edit")} ${a}</legend>
      <div class="form-grid">
        ${J({label:_("\u0641\u0627\u0631\u0633\u06CC","Persian"),name:`${t}`,value:s,rows:o,span2:!0})}
        ${J({label:_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),name:`${t}En`,value:n,rows:o,span2:!0})}
      </div>
    </fieldset>`}function oc(t,a,s,n){return r`
    <fieldset class="pg-block">
      <legend>${c("list")} ${a}</legend>
      <div class="form-grid">
        <label class="field span-2"><span class="label">${_("\u0641\u0627\u0631\u0633\u06CC","Persian")}</span>
          <textarea class="textarea" name="${t}" rows="6" data-lines="1">${h((s||[]).join(`
`))}</textarea></label>
        <label class="field span-2"><span class="label">${_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English")}</span>
          <textarea class="textarea" name="${t}En" rows="6" data-lines="1">${h((n||[]).join(`
`))}</textarea></label>
      </div>
    </fieldset>`}function nm(t){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("layers")} ${_("\u0628\u062E\u0634\u200C\u0647\u0627","Sections")}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="sections">${c("plus")} ${e("common.add")}</button>
      </legend>
      <div data-blocks="sections">
        ${t.map((a,s)=>rc(a,s)).join("")}
      </div>
      <template data-tpl="sections">${rc(om(),0)}</template>
    </fieldset>`}function rc(t,a){let s=Array.isArray(t.list)&&t.list.some(n=>n&&typeof n=="object");return r`
    <div class="pg-item" data-block="sections" data-objlist="${s?"1":""}">
      <div class="row row-between">
        <strong class="tiny">${_("\u0628\u062E\u0634","Section")} ${a+1}</strong>
        <span class="act">${Rs()}${Bs()}</span>
      </div>
      <div class="form-grid mt-s">
        ${x({label:e("common.title"),name:"title",value:t.title||""})}
        ${x({label:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:t.titleEn||""})}
        ${J({label:_("\u0645\u062A\u0646","Body"),name:"body",value:t.body||"",rows:4,span2:!0})}
        ${J({label:_("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),name:"bodyEn",value:t.bodyEn||"",rows:3,span2:!0})}
        ${rm(t,s)}
      </div>
    </div>`}function rm(t,a){if(a)return r`
      <div class="span-2">
        <div class="row row-between">
          <span class="label">${_("\u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Bullet list")}</span>
          <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-li-add">${c("plus")}</button>
        </div>
        <div data-li>${(t.list||[]).map(o=>cc(o)).join("")}</div>
        <template data-li-tpl>${cc({icon:"check",fa:"",en:""})}</template>
      </div>`;let s=(t.list||[]).map(o=>typeof o=="string"?o:(o==null?void 0:o.fa)||"").join(`
`),n=(t.listEn||[]).join(`
`);return s||n?r`
      <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
        <textarea class="textarea" name="list" rows="4" data-lines="1">${h(s)}</textarea></label>
      <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List EN (one per line)")}</span>
        <textarea class="textarea" name="listEn" rows="4" data-lines="1">${h(n)}</textarea></label>`:r`
    <div class="span-2">
      <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-list-toggle">${c("plus")} ${_("\u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Add bullet list")}</button>
      <div data-listbox hidden>
        <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
          <textarea class="textarea" name="list" rows="3" data-lines="1"></textarea></label>
      </div>
    </div>`}function cc(t){return r`
    <div class="spec-row" data-lir>
      <input class="input li-ic" name="icon" value="${h((t==null?void 0:t.icon)||"check")}" placeholder="icon">
      <input class="input" name="fa" value="${h((t==null?void 0:t.fa)||"")}" placeholder="${_("\u0641\u0627\u0631\u0633\u06CC","FA")}">
      <input class="input" name="en" value="${h((t==null?void 0:t.en)||"")}" placeholder="${_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","EN")}">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-pg-lidel">${c("trash")}</button>
    </div>`}function Ls(t,a,s,n,o){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("grid")} ${a}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="${t}">${c("plus")} ${e("common.add")}</button>
      </legend>
      <div class="${o==="grid"?"perm-grid":""}" data-blocks="${t}">
        ${s.map((i,l)=>r`
          <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
            <div class="row row-between">
              <strong class="tiny">${g(l+1)}</strong>
              <span class="act">${Rs()}${Bs()}</span>
            </div>
            <div class="form-grid mt-s">
              ${n.map(p=>p==="body"||p==="bodyEn"?J({label:Ns(p),name:p,value:i[p]||"",rows:2,span2:!0}):x({label:Ns(p),name:p,value:i[p]||""}))}
            </div>
          </div>`).join("")}
      </div>
      <template data-tpl="${t}">
        <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
          <div class="row row-between"><strong class="tiny">+</strong><span class="act">${Rs()}${Bs()}</span></div>
          <div class="form-grid mt-s">
            ${n.map(i=>i==="body"||i==="bodyEn"?J({label:Ns(i),name:i,value:"",rows:2,span2:!0}):x({label:Ns(i),name:i,value:""}))}
          </div>
        </div>
      </template>
    </fieldset>`}function Ns(t){return{title:e("common.title"),titleEn:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),body:_("\u0645\u062A\u0646","Body"),bodyEn:_("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),icon:_("\u0622\u06CC\u06A9\u0648\u0646","Icon"),fa:_("\u0641\u0627\u0631\u0633\u06CC","Persian"),en:_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),key:_("\u06A9\u0644\u06CC\u062F \u0622\u0645\u0627\u0631\u06CC","Stat key")}[t]||t}function cm(t){let a=["orders","shipping","returns","product","account","security","store","other"];return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("help")} ${_("\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","FAQ")} (${g(t.length)})</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="faq">${c("plus")} ${e("common.add")}</button>
      </legend>
      <div data-blocks="faq">
        ${t.map((s,n)=>ic(s,n,a)).join("")}
      </div>
      <template data-tpl="faq">${ic({cat:"general",q:"",qEn:"",a:"",aEn:""},0,a)}</template>
    </fieldset>`}function ic(t,a,s){return r`
    <div class="pg-item" data-block="faq">
      <div class="row row-between">
        <strong class="tiny">${_("\u0633\u0624\u0627\u0644","Q")} ${a+1}</strong>
        <span class="act">${Rs()}${Bs()}</span>
      </div>
      <div class="form-grid mt-s">
        <label class="field"><span class="label">${_("\u062F\u0633\u062A\u0647","Category")}</span>
          <select class="select" name="cat">${s.map(n=>r`<option value="${n}" ${t.cat===n?"selected":""}>${e(`faq.cat.${n}`)}</option>`)}</select></label>
        ${x({label:_("\u0633\u0624\u0627\u0644","Question"),name:"q",value:t.q||""})}
        ${x({label:_("\u0633\u0624\u0627\u0644 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Question (EN)"),name:"qEn",value:t.qEn||"",span2:!0})}
        ${J({label:_("\u067E\u0627\u0633\u062E","Answer"),name:"a",value:t.a||"",rows:3,span2:!0})}
        ${J({label:_("\u067E\u0627\u0633\u062E (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Answer (EN)"),name:"aEn",value:t.aEn||"",rows:2,span2:!0})}
      </div>
    </div>`}function Is(t,a,s){let n=t.querySelector(`[name="${a}"]`);if(n)return n.dataset.lines==="1"?n.value.split(`
`).map(o=>o.trim()).filter(Boolean):n.value}function im(t,a){var n,o;let s={};for(let i of a.blocks)if(i==="hero"){let l=p=>{var d,b;return(b=(d=t.querySelector(`[name="hero.${p}"]`))==null?void 0:d.value)!=null?b:""};s.hero={title:l("title"),titleEn:l("titleEn"),subtitle:l("subtitle"),subtitleEn:l("subtitleEn")}}else if(["intro","body","notice"].includes(i))s[i]=(n=Is(t,i))!=null?n:"",s[`${i}En`]=(o=Is(t,`${i}En`))!=null?o:"";else if(["rules","hints"].includes(i))s[i]=Is(t,i)||[],s[`${i}En`]=Is(t,`${i}En`)||[];else if(i==="faq")s.faq=[...t.querySelectorAll('[data-block="faq"]')].map(l=>{var p,d,b,u,v;return{cat:((p=l.querySelector("[name=cat]"))==null?void 0:p.value)||"general",q:((d=l.querySelector("[name=q]"))==null?void 0:d.value)||"",qEn:((b=l.querySelector("[name=qEn]"))==null?void 0:b.value)||"",a:((u=l.querySelector("[name=a]"))==null?void 0:u.value)||"",aEn:((v=l.querySelector("[name=aEn]"))==null?void 0:v.value)||""}});else{let l={sections:["title","titleEn","body","bodyEn"],steps:["title","titleEn","body","bodyEn"],items:["icon","title","titleEn","body","bodyEn"],tips:["fa","en"],stats:["fa","en","key"]}[i]||[];s[i]=[...t.querySelectorAll(`[data-block="${i}"]`)].map(p=>{var b,u;let d={};for(let v of l)d[v]=(u=(b=p.querySelector(`[name="${v}"]`))==null?void 0:b.value)!=null?u:"";if(i==="sections")if(p.dataset.objlist==="1")d.list=[...p.querySelectorAll("[data-lir]")].map(v=>{var $,w,k;return{icon:(($=v.querySelector("[name=icon]"))==null?void 0:$.value)||"check",fa:((w=v.querySelector("[name=fa]"))==null?void 0:w.value)||"",en:((k=v.querySelector("[name=en]"))==null?void 0:k.value)||""}});else{let v=p.querySelector("[name=list]");v&&(d.list=v.value.split(`
`).map(w=>w.trim()).filter(Boolean));let $=p.querySelector("[name=listEn]");$&&(d.listEn=$.value.split(`
`).map(w=>w.trim()).filter(Boolean))}return d})}return s}function lm(t){return N(t),null}var _,Wa,lc,om,Rs,Bs,pc=W(()=>{z();G();Z();dt();et();ut();nt();_=(t,a)=>q()?t:a,Wa=[{key:"about",icon:"store",blocks:["hero","sections","stats"]},{key:"guide",icon:"info",blocks:["hero","steps","tips"]},{key:"service",icon:"headset",blocks:["hero","items"]},{key:"faq",icon:"help",blocks:["faq"]},{key:"terms",icon:"file",blocks:["hero","intro","notice","sections"]},{key:"privacy",icon:"shield",blocks:["hero","intro","sections"]},{key:"insurance",icon:"package-check",blocks:["hero","body","rules"]},{key:"ticketRules",icon:"ticket",blocks:["hero","rules"]},{key:"bugReport",icon:"bug",blocks:["hero","body","hints"]},{key:"contact",icon:"phone",blocks:["hero"]},{key:"installments",icon:"card",blocks:["hero","body","rules","sections"]}],lc={};om=()=>({title:"",titleEn:"",body:"",bodyEn:"",list:[],listEn:[]});Rs=()=>r`
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-up" aria-label="up">${c("arrow-up")}</button>
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-down" aria-label="down">${c("chevron-down")}</button>`,Bs=()=>r`<button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-del" aria-label="delete">${c("trash")}</button>`;y("adm-pg-save",async(t,a)=>{t.preventDefault();let s=a.dataset.key,n=Wa.find(i=>i.key===s),o=im(a,n);await D(a.querySelector("button[type=submit]"),async()=>{try{await f.patch(`/api/admin/pages/${s}`,{value:o}),E(e("misc.saved")),T(!0)}catch(i){S(i)}})});y("adm-pg-add",(t,a)=>{let s=a.dataset.kind,n=a.closest("form"),o=n.querySelector(`[data-tpl="${s}"]`),i=n.querySelector(`[data-blocks="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let p=l.firstElementChild;if(!p)return;p.querySelectorAll("input, textarea").forEach(u=>{u.value=""});let d=i.children.length+1,b=p.querySelector(".row strong");b&&(b.textContent=`${s==="faq"?q()?"\u0633\u0624\u0627\u0644":"Q":q()?"\u0645\u0648\u0631\u062F":"Item"} ${d}`),i.appendChild(p),p.scrollIntoView({behavior:"smooth",block:"center"})});y("adm-pg-del",(t,a)=>{var s;(s=a.closest("[data-block]"))==null||s.remove()});y("adm-pg-up",(t,a)=>{let s=a.closest("[data-block]");s!=null&&s.previousElementSibling&&s.parentNode.insertBefore(s,s.previousElementSibling)});y("adm-pg-down",(t,a)=>{let s=a.closest("[data-block]");s!=null&&s.nextElementSibling&&s.parentNode.insertBefore(s.nextElementSibling,s)});y("adm-pg-li-add",(t,a)=>{let s=a.closest(".span-2"),n=s.querySelector("[data-li]"),o=s.querySelector("[data-li-tpl]");if(!n||!o)return;let i=document.createElement("div");i.innerHTML=o.innerHTML.trim(),i.firstElementChild&&n.appendChild(i.firstElementChild)});y("adm-pg-list-toggle",(t,a)=>{var n;let s=(n=a.closest(".span-2"))==null?void 0:n.querySelector("[data-listbox]");s&&(s.hidden=!s.hidden)});y("adm-pg-lidel",(t,a)=>{var s;(s=a.closest("[data-lir]"))==null||s.remove()})});var no={};X(no,{mount:()=>gm,render:()=>dm});async function dm(t){return t.params.section==="imageSearch"?hm():mm()}async function mm(){try{let a=await f.get(f.url("/api/admin/barcode",{q:he.q}));Le=a.items||[],Ge=a.labelSizes||[],!Ge.find(s=>s.id===he.size)&&Ge.length&&(he.size=Ge[0].id)}catch(a){return U({title:(a==null?void 0:a.message)||e("err.generic")})}let t=Le.filter(a=>!a.barcode).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("barcode")} ${e("adm.barcode")}</h2>
        <p class="muted small">${g(Le.length)} ${qt("\u06A9\u0627\u0644\u0627","products")} · ${g(t)} ${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","without barcode")}</p>
      </div>
      <a class="btn btn-outline btn-sm" href="#/price-check" target="_blank" rel="noopener">${c("scan")} ${e("adm.bPriceMode")}</a>
    </div>

    <div class="dev-grid">
      <div class="card">
        <strong>${c("printer")} ${e("adm.bPrinter")}</strong>
        <p class="muted small mt-s">${e("adm.bPrinterHint")}</p>
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
        <strong>${c("scan")} ${e("adm.bScanner")}</strong>
        <p class="muted small mt-s">${e("adm.bScanHint")}</p>
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
        <strong>${c("printer")} ${e("adm.bLabels")}</strong>
        <form class="row row-wrap" data-act="adm-bc-search">
          <input class="input" name="q" value="${h(he.q)}" placeholder="${e("adm.pName")} / SKU / ${e("pdp.barcode")}">
          <button class="btn btn-ghost btn-sm" type="submit">${c("search")}</button>
        </form>
      </div>

      <div class="row row-wrap mb-s">
        <select class="select select-sm" data-size>
          ${Ge.map(a=>r`<option value="${a.id}" ${he.size===a.id?"selected":""}>${h(q()?a.fa:`${a.w}\xD7${a.h} mm`)}</option>`)}
        </select>
        <label class="row tiny">${qt("\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0686\u0633\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627","Copies per product")}
          <input class="input copies-in" type="number" min="1" max="20" value="${g(he.copies)}" data-copies>
        </label>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-all">${c("check")} ${qt("\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647","Select all")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-none">${c("close")} ${qt("\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","Clear")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-nocode">${c("barcode")} ${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","Without barcode")}</button>
        <span class="badge-pill bp-accent" data-selcount>${g(ae.size)}</span>
      </div>

      ${lt([{label:""},{label:e("common.product")},{label:e("pdp.barcode")},{label:e("common.price"),cls:"num"},{label:e("common.stock"),cls:"num"},{label:"",cls:"num"}],Le.slice(0,100).map(a=>r`
          <tr>
            <td><label class="check"><input type="checkbox" data-pick="${a.id}" ${ae.has(a.id)?"checked":""}><span class="box">${c("check")}</span></label></td>
            <td><span class="b">${h(a.name)}</span><div class="tiny muted mono">${h(a.sku||"")}</div></td>
            <td class="mono tiny">${a.barcode?h(a.barcode):r`<span class="badge-pill bp-warn">${qt("\u0646\u062F\u0627\u0631\u062F","none")}</span>`}</td>
            <td class="num">${A(a.price)}</td>
            <td class="num">${g(a.stock)}</td>
            <td>${a.barcode?"":r`<button class="btn btn-ghost btn-xs" data-act="adm-bc-gen" data-id="${a.id}">${c("barcode")} ${e("adm.bGenerate")}</button>`}</td>
          </tr>`),{emptyText:e("common.noResult")})}
    </div>

    <div class="card mt no-print">
      <div class="row row-between row-wrap">
        <strong>${c("eye")} ${e("adm.bPreview")}</strong>
        <div class="row row-wrap">
          <button class="btn btn-outline btn-sm" data-act="adm-bc-build">${c("refresh")} ${qt("\u0633\u0627\u062E\u062A \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634","Build preview")}</button>
          <button class="btn btn-primary btn-sm" data-act="adm-bc-print">${c("printer")} ${e("common.print")}</button>
        </div>
      </div>
      <div class="print-grid mt" data-print-area data-labels></div>
      <p class="hint mt-s">${qt("\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u062F\u0631 \u0686\u0627\u067E \u0627\u0632 \u0645\u062A\u063A\u06CC\u0631 \u0635\u0641\u062D\u0647 \u062A\u0646\u0638\u06CC\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0686\u0627\u067E \u0634\u062F\u0646\u062F\u060C \u062D\u0627\u0634\u06CC\u0647\u0654 \u0686\u0627\u067E \u0631\u0627 \u062F\u0631 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0635\u0641\u0631 \u06A9\u0646.","If labels shift when printing, set the print margins to zero in the print dialog.")}</p>
    </div>`}function pm(){return"BarcodeDetector"in window?r`${c("check")} ${qt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F","Camera scanning supported")}`:r`${c("info")} ${qt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u0632 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0633\u062E\u062A\u200C\u0627\u0641\u0632\u0627\u0631\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Camera scanning unsupported in this browser; use a hardware scanner.")}`}async function um(){return window.JsBarcode||await new Promise((t,a)=>{let s=document.createElement("script");s.src="/js/vendor/jsbarcode.all.min.js",s.onload=t,s.onerror=a,document.head.appendChild(s)}),window.JsBarcode}function bm(t,a){let s=Ge.find(o=>o.id===a)||{w:40,h:25},n=/^\d{13}$/.test(t.barcode||"")?"EAN13":"CODE128";return r`
    <div class="label-preview" data-lw="${s.w}" data-lh="${s.h}">
      <span class="ln">${h(t.name.slice(0,40))}</span>
      ${t.barcode?r`<svg data-bc="${h(t.barcode)}" data-fmt="${n}"></svg>`:r`<span class="ln tiny">${qt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","no barcode")}</span>`}
      <span class="row row-between w100">
        <span class="ln mono tiny">${h(t.barcode||t.sku||"")}</span>
        <span class="lp">${g(t.price)}</span>
      </span>
    </div>`}async function so(t){var p,d;let a=t.querySelector("[data-labels]");if(!a)return 0;let s=Le.filter(b=>ae.has(b.id));if(!s.length)return a.innerHTML="",0;let n=Math.max(1,Number(((p=t.querySelector("[data-copies]"))==null?void 0:p.value)||1)),o=((d=t.querySelector("[data-size]"))==null?void 0:d.value)||he.size,i=Ge.find(b=>b.id===o)||{w:40,h:25},l="";for(let b of s)for(let u=0;u<n;u++)l+=bm(b,o);a.innerHTML=l,a.style.setProperty("--lw",`${i.w}mm`),a.style.setProperty("--lh",`${i.h}mm`);try{let b=await um();a.querySelectorAll("svg[data-bc]").forEach(u=>{try{b(u,u.dataset.bc,{format:u.dataset.fmt||"CODE128",displayValue:!1,height:Math.max(18,i.h-14),width:1.3,margin:0,background:"#ffffff",lineColor:"#000000"})}catch(v){u.remove()}})}catch(b){V(qt("\u06A9\u062A\u0627\u0628\u062E\u0627\u0646\u0647\u0654 \u0628\u0627\u0631\u06A9\u062F \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F\u061B \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F \u0686\u0627\u067E \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","Barcode library failed to load; labels print without barcodes."))}return s.length*n}function Hs(){document.querySelectorAll("[data-pick]").forEach(a=>{a.checked=ae.has(a.dataset.pick)});let t=document.querySelector("[data-selcount]");t&&(t.textContent=g(ae.size))}async function hm(){let t=null;try{t=await f.get("/api/admin/image-index")}catch(n){return U({title:(n==null?void 0:n.message)||e("err.generic")})}let a=t.products||[],s=a.filter(n=>!n.indexed);return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("camera")} ${e("adm.imageSearch")}</h2>
        <p class="muted small">${g(t.indexed||0)} / ${g(a.length)} ${qt("\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0634\u062F\u0647","indexed")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ix-run" data-count="${s.length}">
        ${c("refresh")} ${s.length?`${e("adm.ixIndex")} (${g(s.length)})`:e("adm.ixReindex")}
      </button>
    </div>

    <p class="notice notice-info mb">${c("info")}<span>${e("adm.ixHint")}</span></p>
    <div class="mt-s" data-ix-progress hidden>
      <div class="progress"><i data-ix-bar data-w="0%"></i></div>
      <p class="tiny muted mt-s" data-ix-status></p>
    </div>

    ${a.length?r`
      <div class="ix-grid">
        ${a.slice(0,240).map(n=>r`
          <div class="ix-item ${n.indexed?"on":""}" data-pid="${n.id}">
            ${n.image?r`<img src="${h(n.image)}" alt="" loading="lazy" data-h="54px" data-w="54px">`:r`<span class="ix-ph">${c("image")}</span>`}
            <span class="grow tiny">${h(n.name.slice(0,46))}</span>
            ${n.indexed?r`<span class="badge-pill bp-success tiny">${c("check")}</span>`:r`<span class="badge-pill bp-muted tiny">${e("common.no")}</span>`}
          </div>`).join("")}
      </div>`:L({icon:"image",title:e("common.noData")})}`}function gm(t,a){var s,n;return N(t),t.querySelectorAll("[data-pick]").forEach(o=>{o.addEventListener("change",()=>{o.checked?ae.add(o.dataset.pick):ae.delete(o.dataset.pick);let i=t.querySelector("[data-selcount]");i&&(i.textContent=g(ae.size))})}),(s=t.querySelector("[data-size]"))==null||s.addEventListener("change",o=>{he.size=o.target.value}),(n=t.querySelector("[data-copies]"))==null||n.addEventListener("change",o=>{he.copies=Math.max(1,Number(o.target.value)||1)}),null}var qt,Le,Ge,ae,he,oo=W(()=>{z();G();Z();dt();et();ut();nt();An();qt=(t,a)=>q()?t:a,Le=[],Ge=[],ae=new Set,he={q:"",size:"40x25",copies:1};y("adm-bc-search",(t,a)=>{t.preventDefault(),he.q=String(new FormData(a).get("q")||"").trim(),T(!0)});y("adm-bc-all",()=>{Le.slice(0,100).forEach(t=>ae.add(t.id)),Hs()});y("adm-bc-none",()=>{ae.clear(),Hs()});y("adm-bc-nocode",()=>{ae=new Set(Le.filter(t=>!t.barcode).map(t=>t.id)),Hs()});y("adm-bc-gen",async(t,a)=>{var s,n,o;try{let i=await f.post("/api/admin/barcode/generate",{productId:a.dataset.id,count:1}),l=((n=(s=i.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=i.codes)==null?void 0:o[0])||"";l&&(E(`${e("adm.bGenerate")}: ${l}`),T(!0))}catch(i){S(i)}});y("adm-bc-build",async(t,a)=>{let s=a.closest("[data-admbody]")||document,n=await so(s);n?E(`${g(n)} ${qt("\u0628\u0631\u0686\u0633\u0628 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F","labels ready")}`):V(e("adm.bPickFirst"))});y("adm-bc-print",async(t,a)=>{let s=a.closest("[data-admbody]")||document;if(!await so(s)){V(e("adm.bPickFirst"));return}document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-testprint",async(t,a)=>{var i;let s=a.closest("[data-admbody]")||document;if(!s.querySelector("[data-labels]"))return;ae=new Set([(i=Le[0])==null?void 0:i.id].filter(Boolean)),Hs(),await so(s),document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-scan",async(t,a)=>{t.preventDefault();let s=String(new FormData(a).get("code")||"").trim(),n=a.closest(".card").querySelector("[data-scan-result]");if(s)try{let i=(await f.post("/api/admin/barcode/scan-log",{code:s})).product;n.innerHTML=r`
      <div class="row row-between">
        <div>
          <strong>${h(i.name)}</strong>
          <div class="tiny muted mono">${h(i.sku||"")} · ${h(i.barcode||"")}</div>
        </div>
        <div class="t-end">
          <div class="price-now">${A(i.price)}</div>
          <div class="tiny muted">${e("common.stock")}: ${g(i.stock)}</div>
        </div>
      </div>
      <div class="row row-wrap mt-s">
        <a class="btn btn-ghost btn-xs" href="#/admin/products/${i.id}">${c("edit")} ${e("common.edit")}</a>
        <a class="btn btn-ghost btn-xs" href="#/product/${i.id}" target="_blank" rel="noopener">${c("external")} ${e("adm.view")}</a>
      </div>`,E(e("adm.bFound"))}catch(o){n.innerHTML=r`<p class="muted small">${c("alert")} ${h((o==null?void 0:o.message)||e("adm.bNotFound"))}</p>`,(o==null?void 0:o.status)!==404&&S(o)}finally{a.querySelector("[name=code]").value="",a.querySelector("[name=code]").focus()}});y("adm-ix-run",async(t,a)=>{let s=Number(a.dataset.count||0)>0,n=document.querySelector("[data-ix-progress]"),o=document.querySelector("[data-ix-bar]"),i=document.querySelector("[data-ix-status]"),l=[...document.querySelectorAll(".ix-item")];if(!l.length)return;let p=s?l.filter($=>!$.classList.contains("on")):l;if(!p.length){E(e("adm.ixDone"));return}a.disabled=!0,n&&(n.hidden=!1);let d=0,b=0,u=[],v=async()=>{if(u.length)try{let $=await f.post("/api/admin/image-index",{entries:u.splice(0,u.length)});b+=$.indexed||0}catch($){S($)}};for(let $ of p){let w=$.querySelector("img");if(w!=null&&w.src)try{let k=w.src.startsWith("http")&&!w.src.startsWith(location.origin)?f.url("/api/admin/image-thumb",{url:w.src}):w.src,C=await fs(k),H=$.dataset.pid;H&&u.push({productId:H,dhash:C.dhash,hist:C.hist})}catch(k){}d++,o&&(o.style.width=`${Math.round(d/p.length*100)}%`),i&&(i.textContent=`${g(d)} / ${g(p.length)}`),u.length>=40&&await v()}await v(),a.disabled=!1,E(`${e("adm.ixDone")} \u2014 ${g(b)}`),T(!0)})});var Fs={};X(Fs,{allowedSections:()=>ro,mount:()=>wm,render:()=>$m,title:()=>km});async function $m(t){var l;let a=t.params.section||"",s=uc(a),n=ro(),o="";if(!s)o=Aa("warn",a?e("adm.noPermission"):e("err.forbidden"))+r`<div class="card mt"><strong>${e("adm.title")}</strong><p class="muted small mt-s">${e("adm.noPermission")}</p></div>`;else try{o=await(await s.mod()).render(zt(mt({},t),{params:zt(mt({},t.params),{section:s.id}),admNav:n}))}catch(p){console.error("[admin] section render failed",p),o=Aa("danger",`${e("err.generic")} (${h((p==null?void 0:p.message)||"")})`)}let i=[...new Set(n.map(p=>p.grp))];return r`
    <div class="row row-between row-wrap mb">
      <div class="row">
        <h1 class="section-title">${c("settings")} ${e("adm.title")}</h1>
        <span class="badge-pill bp-accent">${h(((l=m.me)==null?void 0:l.role)==="owner"?q()?"\u0645\u0627\u0644\u06A9":"Owner":q()?"\u06A9\u0627\u0631\u0645\u0646\u062F":"Staff")}</span>
      </div>
      <div class="row row-wrap">
        ${Q("settings.edit")?r`
          <button class="btn btn-sm ${m.sleeping?"btn-success":"btn-ghost"}" data-act="adm-sleep-toggle" title="${m.sleeping?e("sys.turnOn"):e("sys.turnOff")}">
            ${c(m.sleeping?"zap":"moon")} ${m.sleeping?e("sys.turnOn"):e("sys.turnOff")}
          </button>`:""}
        <a class="btn btn-ghost btn-sm" href="#/">${c("arrow-right")} ${e("adm.backToSite")}</a>
      </div>
    </div>
    ${m.sleeping?Aa("warn",e("sys.sleepBanner")):""}
    <div class="adm-grid">
      <aside class="adm-side">
        ${i.map(p=>r`
          <div class="grp">${h(q()?vm[p]:ym[p])}</div>
          ${n.filter(d=>d.grp===p).map(d=>r`
            <a href="#/admin${d.id?`/${d.id}`:""}" class="${d.id===a||!a&&!d.id?"active":""}">
              ${c(d.icon)} <span>${d.label()}</span>
              ${d.count?r`<span class="cnt">${g(d.count)}</span>`:""}
            </a>`)}
        `).join("")}
      </aside>
      <div data-admbody>${o}</div>
    </div>`}async function wm(t,a){N(t);let s=a.params.section||"",n=uc(s);if(!n)return null;try{let o=await n.mod();if(typeof o.mount=="function")return o.mount(t.querySelector("[data-admbody]")||t,a)}catch(o){console.error("[admin] section mount failed",o)}return null}var fm,vm,ym,ro,uc,km,Os=W(()=>{z();G();K();et();Z();ut();nt();fm=[{grp:"shop",id:"",perm:"dashboard.view",icon:"chart",label:()=>e("adm.dashboard"),mod:()=>Promise.resolve().then(()=>(Cr(),Tr))},{grp:"shop",id:"products",perm:"products.view",icon:"box",label:()=>e("adm.products"),mod:()=>Promise.resolve().then(()=>(Mr(),Pr))},{grp:"shop",id:"categories",perm:"categories.manage",icon:"layers",label:()=>e("adm.categories"),mod:()=>Promise.resolve().then(()=>(Rr(),Ir))},{grp:"shop",id:"orders",perm:"orders.view",icon:"package-check",label:()=>e("adm.orders"),mod:()=>Promise.resolve().then(()=>(Or(),Fr))},{grp:"people",id:"reviews",perm:"reviews.moderate",icon:"star",label:()=>e("adm.reviews"),mod:()=>Promise.resolve().then(()=>(zr(),jr))},{grp:"people",id:"tickets",perm:"tickets.manage",icon:"ticket",label:()=>e("adm.tickets"),mod:()=>Promise.resolve().then(()=>(Xn(),Jn)),feat:"tickets"},{grp:"people",id:"support",perm:"tickets.manage",icon:"headset",label:()=>e("adm.supportChat"),mod:()=>Promise.resolve().then(()=>(Xn(),Jn)),feat:"liveSupport"},{grp:"people",id:"feedback",perm:"feedback.manage",icon:"flag",label:()=>e("adm.feedback"),mod:()=>Promise.resolve().then(()=>(Vr(),Wr))},{grp:"people",id:"users",perm:"users.view",icon:"users",label:()=>e("adm.users"),mod:()=>Promise.resolve().then(()=>(Xr(),Jr))},{grp:"people",id:"visitors",perm:"users.view",icon:"eye",label:()=>e("adm.visitors"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"growth",id:"coupons",perm:"coupons.manage",icon:"percent",label:()=>e("adm.coupons"),mod:()=>Promise.resolve().then(()=>(ga(),ha)),feat:"coupons"},{grp:"growth",id:"settings/partners",perm:"settings.edit",icon:"store",label:()=>e("adm.sPartners"),mod:()=>Promise.resolve().then(()=>(_a(),Ua)),feat:"partners"},{grp:"growth",id:"ads",perm:"ads.manage",icon:"tag",label:()=>e("adm.ads"),mod:()=>Promise.resolve().then(()=>(ga(),ha)),feat:"ads"},{grp:"growth",id:"notifications",perm:"notifications.send",icon:"bell",label:()=>e("adm.notifications"),mod:()=>Promise.resolve().then(()=>(ga(),ha)),feat:"announcements"},{grp:"growth",id:"lottery",perm:"settings.edit",icon:"gift2",label:()=>e("adm.lottery"),mod:()=>Promise.resolve().then(()=>(ga(),ha)),feat:"lottery"},{grp:"system",id:"telegram",perm:"settings.edit",icon:"send",label:()=>e("adm.telegram"),mod:()=>Promise.resolve().then(()=>(ga(),ha))},{grp:"system",id:"settings",perm:"settings.edit",icon:"settings",label:()=>e("adm.settings"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"theme",perm:"theme.edit",icon:"sun",label:()=>e("adm.theme"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"features",perm:"settings.edit",icon:"zap",label:()=>e("adm.features"),mod:()=>Promise.resolve().then(()=>(_a(),Ua))},{grp:"system",id:"pages",perm:"pages.edit",icon:"file",label:()=>e("adm.pages"),mod:()=>Promise.resolve().then(()=>(pc(),mc))},{grp:"system",id:"barcode",perm:"barcode.print",icon:"barcode",label:()=>e("adm.barcode"),mod:()=>Promise.resolve().then(()=>(oo(),no)),feat:"barcode"},{grp:"system",id:"imageSearch",perm:"imagesearch.index",icon:"camera",label:()=>e("adm.imageSearch"),mod:()=>Promise.resolve().then(()=>(oo(),no)),feat:"imageSearch"},{grp:"system",id:"audit",perm:"audit.view",icon:"history",label:()=>e("adm.audit"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"system",id:"stats",perm:"stats.view",icon:"chart",label:()=>e("adm.stats"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))},{grp:"system",id:"data",perm:"data.export",icon:"download",label:()=>e("adm.export"),mod:()=>Promise.resolve().then(()=>(Fa(),Ha))}],vm={shop:"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647",people:"\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627",growth:"\u0631\u0634\u062F \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",system:"\u0633\u0627\u0645\u0627\u0646\u0647"},ym={shop:"Store",people:"Customers",growth:"Growth & ads",system:"System"},ro=()=>fm.filter(t=>(!t.perm||Q(t.perm))&&(!t.feat||B(t.feat))),uc=t=>ro().find(a=>a.id===t)||null;km=()=>e("adm.title");y("adm-sleep-toggle",async(t,a)=>{let s=!m.sleeping,n=0;if(s){let o=await de({title:e("sys.turnOff"),text:e("sys.offConfirm"),label:e("sys.autoWakeMins"),value:"0",type:"number"});if(o===null)return;n=Math.max(0,Number(o)||0)}await D(a,async()=>{try{await f.post(s?"/api/system/sleep":"/api/system/wake",s?{minutes:n}:{}),await Ot({silent:!0}),document.dispatchEvent(new CustomEvent("sleep:changed")),E(s?n?e("sys.asleepTimed",{n}):e("sys.asleep"):e("sys.awake")),T(!0)}catch(o){S(o)}})})});var bc={};X(bc,{mount:()=>xm,render:()=>Sm});async function Sm(){var a;let t=decodeURIComponent((location.hash||"#/").slice(1));return r`
    <div class="center col mt-l nf-wrap">
      <div class="nf-code">۴۰۴</div>
      ${L({icon:"search",title:e("err.notFound"),text:`${e("err.notFoundText")} \u2014 ${t}`,action:{href:"#/",label:e("err.goHome")}})}
      <div class="row row-wrap center">
        <a class="btn btn-ghost btn-sm" href="#/products">${c("grid")} ${e("nav.products")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/faq">${c("info")} ${e("footer.faq")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/contact">${c("phone")} ${e("contact.title")}</a>
        <a class="btn btn-ghost btn-sm" href="#/search/image">${c("camera")} ${e("search.byImage")}</a>
      </div>
      ${(a=m.recent)!=null&&a.length?r`<p class="muted small">${e("misc.recentlyViewed")}: ${m.recent.length}</p>`:""}
    </div>`}function xm(t){return N(t),null}var hc=W(()=>{z();G();K();dt()});var pe={};X(pe,{currentRoute:()=>Am,href:()=>Pm,initRouter:()=>co,navigate:()=>bt,parseHash:()=>fc,refresh:()=>T,render:()=>yc,routes:()=>gc,start:()=>fa});function fc(t=location.hash){let a=String(t||"").replace(/^#/,"");if(!a||a==="/")return{path:"/",query:new URLSearchParams,hashStr:""};let s="",n=a.indexOf("#");n>=0&&(s=a.slice(n+1),a=a.slice(0,n));let o=a.indexOf("?"),i=new URLSearchParams(o>=0?a.slice(o+1):""),l=o>=0?a.slice(0,o):a;return l.startsWith("/")||(l=`/${l}`),l=l.replace(/\/{2,}/g,"/"),l.length>1&&l.endsWith("/")&&(l=l.slice(0,-1)),{path:l,query:i,hashStr:s}}function Tm(t){let a=t.split("/").filter(s=>s!=="");for(let s of gc){let n=s.pattern.split("/").filter(l=>l!=="");if(n.length!==a.length)continue;let o={},i=!0;for(let l=0;l<n.length;l++)if(n[l].startsWith(":"))o[n[l].slice(1)]=decodeURIComponent(a[l]);else if(n[l]!==a[l]){i=!1;break}if(i)return{route:s,params:o}}return{route:qm,params:{}}}function Cm(t,a){var s,n,o;if(!t)return null;if(t==="auth"){if(!m.me){let i=encodeURIComponent(a.full);return it(e("err.loginRequired")),`#/auth?next=${i}`}return null}if(t==="admin")return(s=m.me)!=null&&s.isAdmin?null:(V(e("err.forbidden")),"#/");if(t.startsWith("perm:")){let i=t.slice(5),{can:l}=a.helpers;return l(i)?null:(V(e("adm.noPermission")),"#/admin")}if(t.startsWith("feature:")){let i=t.slice(8);return((o=(n=m.settings)==null?void 0:n.features)==null?void 0:o[i])===!1?(it(e("err.notFound")),"#/"):null}return null}async function yc(t){var i,l,p,d,b;let a=Em();if(!a)return;let s=++Va;if(js){try{js()}catch(u){}js=null}Da(!0),a.innerHTML=t.skeleton||'<div class="sk sk-card"></div>';let n=null;try{n=await t.route.load()}catch(u){if(console.error("[router] load failed",u),s!==Va)return;a.innerHTML=`<div class="empty"><h4>${e("err.generic")}</h4><p>${e("err.network")}</p></div>`,Da(!1);return}if(s!==Va)return;let o="";try{o=await n.render(t)}catch(u){console.error("[router] render failed",u),o=`<div class="empty"><h4>${e("err.generic")}</h4><p>${String((u==null?void 0:u.message)||u)}</p></div>`}if(s===Va){a.innerHTML=o,N(a),setTimeout(()=>Promise.resolve().then(()=>(lo(),io)).then(u=>u.maybeConsent&&u.maybeConsent()),300);try{let u=((l=(i=m.settings)==null?void 0:i.store)==null?void 0:l[t.lang==="en"?"nameEn":"name"])||"\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",v=typeof n.title=="function"?n.title(t):n.title||((d=(p=t.route).title)==null?void 0:d.call(p,t))||"";document.title=v?`${v} \xB7 ${u}`:u}catch(u){}try{if(typeof n.mount=="function"){let u=n.mount(a,t);typeof u=="function"&&(js=u)}}catch(u){console.error("[router] mount failed",u)}if(s===Va){Da(!1),document.dispatchEvent(new CustomEvent("view:rendered",{detail:t})),Dm(t),t.keepScroll||(window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),50));try{(b=a.closest("#view"))==null||b.focus({preventScroll:!0})}catch(u){}}}}function Dm(t){let a=t.path,s=a==="/products"&&t.query.get("discount")==="1",n=a==="/products"&&t.query.get("sort")==="newest";document.querySelectorAll(".nav-link[data-nav-key]").forEach(o=>{let i=!1;o.dataset.navKey==="/deals"?i=s:o.dataset.navKey==="/new"?i=n:o.dataset.navKey==="/products"?i=a==="/products"&&!s&&!n:i=o.dataset.navKey===a||o.dataset.navKey!=="/"&&a.startsWith(o.dataset.navKey),o.classList.toggle("active",i)}),document.querySelectorAll(".mobile-nav a[data-mn]").forEach(o=>{let i=o.dataset.mn,l=i==="home"&&a==="/"||i==="cats"&&(a.startsWith("/products")||a.startsWith("/category")||a.startsWith("/product"))||i==="search"&&a.startsWith("/search")||i==="cart"&&a.startsWith("/cart")||i==="me"&&(a.startsWith("/account")||a.startsWith("/auth"));o.classList.toggle("active",l)})}function bt(t,{replace:a=!1,keepScroll:s=!1}={}){let n=String(t||"#/"),o=n.startsWith("#")?n:`#${n}`;if(location.hash===o){fa({keepScroll:s});return}a?history.replaceState(null,"",o):location.hash=o,a&&fa({keepScroll:s})}function Pm(t,a){let n=(a instanceof URLSearchParams?a:new URLSearchParams(a||{})).toString();return`#${t.startsWith("/")?t:`/${t}`}${n?`?${n}`:""}`}function fa(t={}){let{path:a,query:s,hashStr:n}=fc(),{route:o,params:i}=Tm(a),l=`${a}${s.toString()?`?${s}`:""}`,p={path:a,params:i,query:s,hashStr:n,full:l,route:o,lang:document.documentElement.getAttribute("data-lang")||"fa",keepScroll:!!t.keepScroll,skeleton:o.skeleton||"",helpers:{}};vc=p;let d=Cm(o.guard,p);if(d){if(d!==location.hash){location.replace(d);return}return}yc(p)}function co(){window.addEventListener("hashchange",()=>fa()),fa()}function T(t=!1){fa({keepScroll:t})}var Em,gc,qm,Va,vc,js,Am,nt=W(()=>{z();G();K();et();Em=()=>I("#viewInner"),gc=[{pattern:"/",load:()=>Promise.resolve().then(()=>(Bo(),Ro)),title:()=>e("nav.home")},{pattern:"/products",load:()=>Promise.resolve().then(()=>(Cn(),Tn)),title:()=>e("catalog.title")},{pattern:"/category/:id",load:()=>Promise.resolve().then(()=>(Cn(),Tn)),title:()=>e("catalog.title")},{pattern:"/product/:id",load:()=>Promise.resolve().then(()=>(jo(),Oo)),title:t=>t.params.id},{pattern:"/search/image",load:()=>Promise.resolve().then(()=>(Uo(),zo)),title:()=>e("search.imageTitle"),guard:"feature:imageSearch"},{pattern:"/cart",load:()=>Promise.resolve().then(()=>(Wo(),_o)),title:()=>e("cart.title")},{pattern:"/checkout",load:()=>Promise.resolve().then(()=>(Go(),Yo)),title:()=>e("checkout.title")},{pattern:"/checkout/done/:id",load:()=>Promise.resolve().then(()=>(Qo(),Ko)),title:()=>e("checkout.successTitle")},{pattern:"/pay/:id",load:()=>Promise.resolve().then(()=>(Xo(),Jo)),title:()=>e("common.payment")},{pattern:"/compare",load:()=>Promise.resolve().then(()=>(tr(),Zo)),title:()=>e("compare.title"),guard:"feature:compare"},{pattern:"/lottery",load:()=>Promise.resolve().then(()=>(ar(),er)),title:()=>e("lot.title")},{pattern:"/price-check",load:()=>Promise.resolve().then(()=>(cr(),rr)),title:()=>e("priceCheck.title"),guard:"feature:priceCheckDevice"},{pattern:"/auth",load:()=>Promise.resolve().then(()=>(Ln(),Mn)),title:()=>e("auth.title")},{pattern:"/auth/:mode",load:()=>Promise.resolve().then(()=>(Ln(),Mn)),title:()=>e("auth.title")},{pattern:"/account",load:()=>Promise.resolve().then(()=>(On(),Fn)),title:()=>e("acc.title"),guard:"auth"},{pattern:"/account/:section",load:()=>Promise.resolve().then(()=>(On(),Fn)),title:()=>e("acc.title"),guard:"auth"},{pattern:"/account/orders/:id",load:()=>Promise.resolve().then(()=>(fr(),gr)),title:()=>e("acc.trackOrder"),guard:"auth"},{pattern:"/account/tickets/:id",load:()=>Promise.resolve().then(()=>($r(),yr)),title:()=>e("common.ticket"),guard:"auth"},{pattern:"/stats",load:()=>Promise.resolve().then(()=>(Sr(),kr)),title:()=>e("nav.stats"),guard:"feature:publicStats"},{pattern:"/pages/:key",load:()=>Promise.resolve().then(()=>(qr(),Er)),title:t=>t.params.key},{pattern:"/admin",load:()=>Promise.resolve().then(()=>(Os(),Fs)),title:()=>e("adm.title"),guard:"admin"},{pattern:"/admin/:section",load:()=>Promise.resolve().then(()=>(Os(),Fs)),title:()=>e("adm.title"),guard:"admin"},{pattern:"/admin/:section/:id",load:()=>Promise.resolve().then(()=>(Os(),Fs)),title:()=>e("adm.title"),guard:"admin"}],qm={pattern:"/404",load:()=>Promise.resolve().then(()=>(hc(),bc)),title:()=>e("err.notFound")};Va=0,vc=null,js=null,Am=()=>vc});function y(t,a){return Ke.set(t,a),a}function wr(t){return Ke.get(t)}async function _e(t){if(!t)return;let a=t.querySelector("[data-cch]"),s=t.querySelector("[data-cimg]"),n=t.querySelector("[data-ctok]"),o=t.querySelector("[data-cst]"),i=t.querySelector("[name=captchaAnswer]");n&&(n.value=""),i&&(i.value="",i.disabled=!1);let l=t.querySelector("[name=captchaBox]");l&&(l.disabled=!1);try{let p=await f.get("/api/captcha");if(p.disabled){t.hidden=!0;return}t.hidden=!1,t.dataset.cid=p.id,s&&(s.innerHTML=p.svg||""),o&&(o.textContent=e("captcha.hint")),a&&(a.hidden=!(l!=null&&l.checked))}catch(p){}}function oa(t){var s;let a=(s=t==null?void 0:t.querySelector)==null?void 0:s.call(t,"[data-captcha]");a&&(a.hidden=!1,_e(a))}function wc(){document.addEventListener("click",a=>{let s=a.target.closest("[data-act]");if(!s||s.tagName==="FORM")return;s.tagName==="A"&&a.preventDefault();let n=s.dataset.act,o=Ke.get(n);if(!o){console.warn("[actions] unknown:",n);return}try{let i=o(a,s);i&&typeof i.catch=="function"&&i.catch(l=>{console.error("[action]",n,l),l!=null&&l.code&&S(l)})}catch(i){console.error("[action]",n,i)}}),document.addEventListener("submit",a=>{var i;let s=a.target,n=(i=s==null?void 0:s.dataset)==null?void 0:i.act;if(!n)return;a.preventDefault();let o=Ke.get(n);if(!o){console.warn("[actions] unknown submit:",n);return}try{let l=o(a,s);l&&typeof l.catch=="function"&&l.catch(p=>{console.error("[action]",n,p),p!=null&&p.code&&S(p)})}catch(l){console.error("[action]",n,l)}}),document.addEventListener("change",a=>{var l,p,d,b,u;let s=a.target;if((l=s.matches)!=null&&l.call(s,".qty input"))return;let n=(p=s.dataset)!=null&&p.act?null:(d=s.closest)==null?void 0:d.call(s,"form[data-act][data-live]");if(!((b=s.dataset)!=null&&b.act)&&!n)return;let o=(u=s.dataset)!=null&&u.act?s:n,i=Ke.get(o.dataset.act);if(i)try{let v=i(a,o);v&&typeof v.catch=="function"&&v.catch($=>console.error($))}catch(v){console.error(v)}});let t=0;document.addEventListener("input",a=>{var n;let s=a.target;(n=s.matches)!=null&&n.call(s,"[data-act=captcha-check]")&&(clearTimeout(t),t=setTimeout(()=>{let o=Ke.get("captcha-check");o&&!s.disabled&&o(new Event("change"),s)},450))}),document.addEventListener("click",a=>{let s=a.target.closest(".qty [data-q]");if(!s)return;a.preventDefault(),Ke.get("qty-btn")(a,s)}),document.addEventListener("error",a=>{let s=a.target;if((s==null?void 0:s.tagName)!=="IMG"||s.dataset.fallbackDone)return;s.dataset.fallbackDone="1";let n=s.dataset.glyph||"misc";s.src=Mm(n)},!0)}function Mm(t){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123a52"/><stop offset="1" stop-color="#0a2135"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g fill="none" stroke="#7fd3ec" stroke-opacity=".8" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="${$c[t]||$c.box}"/></g></svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}var Ke,$c,ut=W(()=>{K();G();et();Z();z();K();nt();Ke=new Map;y("add-cart",async(t,a)=>{let s=a.dataset.id,n=Number(a.dataset.qty||1)||1;await D(a,async()=>{try{await ss(s,n),E(e("card.added"),{timeout:2600})}catch(o){S(o)}})});y("wish-toggle",async(t,a)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await cn(a.dataset.id);it(s.in?e("card.wishlistAdd"):e("card.wishlistRemove"),{timeout:2e3})}catch(s){S(s)}});y("compare-toggle",async(t,a)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{(await ln(a.dataset.id)).in===!1?it(e("compare.remove"),{timeout:1800}):E(e("compare.add"),{timeout:1800})}catch(s){S(s)}});y("notify-me",async(t,a)=>{if(!m.me){bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await dn(a.dataset.id);E(s.on?e("common.notified"):e("common.notifyMe"),{timeout:2400}),document.querySelectorAll(`[data-act="notify-me"][data-id="${a.dataset.id}"]`).forEach(n=>{n.classList.toggle("active",s.on)})}catch(s){S(s)}});y("lightbox",(t,a)=>{let s=[];try{s=JSON.parse(a.dataset.imgs||"[]")}catch(n){s=[a.dataset.imgs||""]}He(s,Number(a.dataset.i||0),a.dataset.alt||"")});y("sound-toggle",()=>{var s;let t=!((s=m.prefs)!=null&&s.uiSound);Te("uiSound",t);let a=document.querySelector('[data-act="sound-toggle"]');a&&(a.setAttribute("aria-pressed",String(t)),a.innerHTML=r`${c(t?"volume":"volume-off")} ${e("misc.uiSound")} <span class="um-sw ${t?"on":""}" aria-hidden="true"></span>`),it(t?e("misc.uiSoundOn"):e("misc.uiSoundOff"),{timeout:1600}),t&&ds(!0)});y("copy",async(t,a)=>{let{copyText:s}=await Promise.resolve().then(()=>(z(),ts));try{await s(a.dataset.text||a.textContent.trim()),E(e("common.copied"),{timeout:1800})}catch(n){V(e("err.generic"))}});y("share",async(t,a)=>{let s=a.dataset.url||location.href,n=a.dataset.title||document.title;if(navigator.share)try{await navigator.share({title:n,url:s});return}catch(i){return}let{copyText:o}=await Promise.resolve().then(()=>(z(),ts));try{await o(s),E(e("misc.shareDone"),{timeout:2e3})}catch(i){V(e("err.generic"))}});y("quick-view",async(t,a)=>{var n;let s=a.dataset.id;try{let i=(await f.get(`/api/products/${encodeURIComponent(s)}`)).product;pt({title:ft(i),size:"md",body:r`
        <div class="row">
          <div class="qv-media">${(n=i.images)!=null&&n[0]?r`<img src="${i.images[0]}" alt="${ft(i)}" class="qv-img" data-glyph="${i.glyph||"misc"}">`:c(i.glyph||"box")}</div>
          <div class="grow">
            ${i.brandName?r`<div class="pc-brand">${i.brandName}</div>`:""}
            <div class="pc-rate mb-s">${Ht(i.ratingAvg)} <span class="muted tiny">${g(i.ratingAvg)} · ${g(i.ratingCount)} ${e("common.reviews")}</span></div>
            <div class="buy-price">
              ${i.oldPrice>i.price?r`<span class="pc-old">${A(i.oldPrice)}</span>`:""}
              <span class="buy-now">${A(i.price)}</span>
            </div>
            <div class="pc-stock ${i.stock<=0?"out":i.stock<=3?"low":""}"><span class="dot"></span>${i.stock<=0?e("card.outOfStock"):e("pdp.stockCount",{n:g(i.stock)})}</div>
          </div>
        </div>
        ${i.description?r`<p class="muted small mt-s">${h(i.description).slice(0,220)}…</p>`:""}
        <div class="row mt">
          <a class="btn btn-ghost" href="#/product/${i.id}">${e("common.details")} ${c("chevron-left")}</a>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-close>${e("common.close")}</button>
        <button type="button" class="btn btn-primary" data-add ${i.stock<=0?"disabled":""}>${c("cart")} ${e("pdp.addToCart")}</button>`,onMount:(l,p)=>{l.querySelector("[data-close]").addEventListener("click",()=>p.close()),l.querySelector("[data-add]").addEventListener("click",async d=>{await D(d.currentTarget,async()=>{try{await ss(i.id,1),E(e("card.added"),{timeout:2200}),p.close()}catch(b){S(b)}})})}})}catch(o){S(o)}});y("ui-retry",()=>{Promise.resolve().then(()=>(nt(),pe)).then(t=>t.refresh())});y("scroll-top",()=>window.scrollTo({top:0,behavior:"smooth"}));y("qty-btn",(t,a)=>{let s=a.closest(".qty"),n=s==null?void 0:s.querySelector("input");if(!n)return;let o=Number(a.dataset.q||0),i=Number(n.min||1),l=Number(n.max||99),p=Math.max(i,Math.min(l,(Number(n.value)||i)+o));n.value=p,n.dispatchEvent(new Event("change",{bubbles:!0}))});y("confirm-nav",async(t,a)=>{await wt({text:a.dataset.text||e("misc.confirmDelete"),danger:a.dataset.danger==="1",okText:a.dataset.ok||""})&&a.dataset.href&&bt(a.dataset.href)});y("acc",(t,a)=>{let s=a.closest(".acc-item");if(!s)return;let n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),a.setAttribute("aria-expanded",String(n))});y("print-page",()=>{window.print()});y("captcha-open",(t,a)=>{let s=a.closest("[data-captcha]"),n=s==null?void 0:s.querySelector("[data-cch]");n&&(n.hidden=!a.checked,a.checked&&!s.dataset.cid&&_e(s))});y("captcha-refresh",(t,a)=>_e(a.closest("[data-captcha]")));y("captcha-check",async(t,a)=>{let s=a.closest("[data-captcha]");if(!s||a.disabled||s.dataset.verifying)return;let n=s==null?void 0:s.querySelector("[data-cst]"),o=s==null?void 0:s.querySelector("[data-ctok]"),i=String(a.value||"").trim();if(!(!i||!(s!=null&&s.dataset.cid))){s.dataset.verifying="1";try{let l=await f.post("/api/captcha/verify",{id:s.dataset.cid,answer:i});o&&(o.value=l.token||"");let p=s.querySelector("[name=captchaBox]");p&&(p.checked=!0,p.disabled=!0),a.disabled=!0,n&&(n.textContent=e("captcha.solved"))}catch(l){n&&(n.textContent=(l==null?void 0:l.message)||e("captcha.hint")),await _e(s)}finally{delete s.dataset.verifying}}});y("noop",()=>{});$c={cable:"M30 40h14v14H30zM37 54c0 18 12 20 20 14s20-4 22 8M62 66h16v12H62z",adapter:"M34 34h32v34H34zM42 34V22M58 34V22M44 68h12v8H44z",shield:"M34 22h32v56H34zM40 28h12v16H40z",layers:"M36 26h28v48H36zM30 34l30-14 30 14",battery:"M26 40h48v26H26zM32 46h8v14h-8zM44 46h8v14h-8z",plug:"M24 42h34v16H24zM58 36h22v28H58z",speaker:"M30 24h40v52H30zM50 54a10 10 0 1 0 0 .1M50 32a5 5 0 1 0 0 .1",headset:"M28 56a22 22 0 0 1 44 0M24 52h10v20H24zM66 52h10v20H66z",watch:"M38 34h24v32H38zM42 14h16v20H42zM42 66h16v20H42z",camera:"M50 18a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM50 54v34M50 88l-14-24M50 88l14-24",zap:"M26 44h14l6-8h10l6 8h14a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20",truck:"M38 28h24v30H38zM44 58h12v10H44z",light:"M30 26h18l6 12H24zM34 38h20v40H34z",mic:"M42 18h16v28H42zM36 40a14 14 0 0 0 28 0M50 54v30M36 86h28",box:"M26 36 50 24l24 12v28L50 76 26 64zM26 36l24 12 24-12M50 48v28",phone:"M36 16h28v68H36zM44 74h12"};y("pdp-lower-price",(t,a)=>{let s=a.dataset.id;Promise.resolve().then(()=>(et(),ms)).then(({modal:n})=>{n({title:"\u06AF\u0632\u0627\u0631\u0634 \u0642\u06CC\u0645\u062A \u0645\u0646\u0627\u0633\u0628\u200C\u062A\u0631",content:r`
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
      `})})});y("submit-lower-price",async(t,a)=>{t.preventDefault();let{withBusy:s,toastSuccess:n,toastApiError:o}=await Promise.resolve().then(()=>(et(),ms));await s(a,async()=>{var i,l;try{await f.post("/api/reports/lower-price",{productId:a.dataset.id,price:Number(a.price.value),url:a.url.value}),n("\u0628\u0627 \u062A\u0634\u06A9\u0631! \u06AF\u0632\u0627\u0631\u0634 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F."),(l=(i=a.closest('[role="dialog"]'))==null?void 0:i.querySelector("[data-lx]"))==null||l.click()}catch(p){o(p)}})});y("accept-consent-now",async(t,a)=>{let{setConsent:s}=await Promise.resolve().then(()=>(K(),qa));s({terms:!0,privacy:!0,marketing:!1}),E(isFa()?"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u067E\u0630\u06CC\u0631\u0641\u062A\u0647 \u0634\u062F.":"Terms accepted."),sessionStorage.removeItem("consentDeferred");let{maybeConsent:n}=await Promise.resolve().then(()=>(lo(),io));n(),Promise.resolve().then(()=>(nt(),pe)).then(o=>o.refresh())})});function Lm(){let t=Xt().mapCoords||{lat:35.731026,lng:51.488461};return{lat:Number(t.lat),lng:Number(t.lng)}}function Nm(t,a){let s=`${t.lat},${t.lng}`,n=a?`${a.lat},${a.lng}`:"";return[{id:"neshan",label:e("contact.neshan"),icon:"map",href:a?`https://nshn.ir/maps?origin=${n}&destination=${s}&type=drive`:`https://nshn.ir/?lat=${t.lat}&lng=${t.lng}`},{id:"balad",label:e("contact.balad"),icon:"pin",href:a?`https://balad.ir/route/${n.replace(",",",")}/${s}`:`https://balad.ir/map?lat=${t.lat}&lng=${t.lng}`},{id:"osm",label:e("contact.osm"),icon:"globe",href:a?`https://www.openstreetmap.org/directions?from=${n.replace(",",";")}&to=${s.replace(",",";")}`:`https://www.openstreetmap.org/?mlat=${t.lat}&mlon=${t.lng}#map=17/${t.lat}/${t.lng}`},{id:"google",label:e("contact.google"),icon:"external",href:a?`https://www.google.com/maps/dir/?api=1&destination=${s}&origin=${n}`:`https://www.google.com/maps/search/?api=1&query=${s}`}]}function Im(){return new Promise(t=>{if(!("geolocation"in navigator))return t(null);let a=!1,s=o=>{a||(a=!0,t(o))},n=setTimeout(()=>s(null),7e3);navigator.geolocation.getCurrentPosition(o=>{clearTimeout(n),s({lat:o.coords.latitude,lng:o.coords.longitude})},()=>{clearTimeout(n),s(null)},{enableHighAccuracy:!1,timeout:6e3,maximumAge:12e4})})}function Rm(){let t=Lm(),a=null;return pt({title:e("contact.mapAsk"),size:"sm",body:r`
      <p class="notice notice-info mb">${c("info")}<span>${e("contact.mapPermission")}</span></p>
      <div class="col" data-maps></div>`,footer:r`<button type="button" class="btn btn-ghost" data-x>${e("common.close")}</button>`,onMount:(n,o)=>{let i=n.querySelector("[data-maps]"),l=()=>{i.innerHTML=Nm(t,a).map(p=>r`
          <a class="btn btn-ghost btn-block" href="${p.href}" target="_blank" rel="noopener noreferrer">${c(p.icon)} ${p.label} ${c("external")}</a>`).join("")};l(),n.querySelector("[data-x]").addEventListener("click",()=>o.close()),Im().then(p=>{p&&(a=p,l(),E(e("contact.locationOn"),{timeout:2400}))})}})}var kc=W(()=>{G();K();et();z();ut();y("open-map",t=>{var a;(a=t.preventDefault)==null||a.call(t),Rm()});y("install-app",async()=>{m.installPrompt?await Ea()||Fe():Fe()})});var io={};X(io,{ecoPaused:()=>ip,maybeConsent:()=>qc,updateBadges:()=>va});async function Bm(){var t;wc(),location.search.includes("_nocache")&&history.replaceState(null,"",location.pathname+location.hash),_m(),await sn(),Je(),ya(),Ze(),Vm(),Gm(),pr(),yn(),$n(),Xm(),Zm(),co(),np(),ep(),Km(),Qm(),rp(),lp(),dp(),sp(),ap(),qc(),tp(),xc(),Fm(),Om(),jm(),(t=document.getElementById("bootSplash"))==null||t.remove()}function xc(){let t=document.getElementById("welcomeScreen");if(!t)return;let a=Math.max(0,700-(performance.now()-Hm));setTimeout(()=>{t.classList.add("gone"),setTimeout(()=>t.parentNode&&t.parentNode.removeChild(t),520)},a)}function Fm(){let t=document.getElementById("btnRefresh");t&&t.addEventListener("click",async()=>{if(typeof navigator!="undefined"&&!navigator.onLine){let{toastError:a}=await Promise.resolve().then(()=>(et(),ms)),{isFa:s}=await Promise.resolve().then(()=>(G(),xo));a(s()?"\u0628\u0631\u0627\u06CC \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648 \u062D\u0630\u0641 \u06A9\u0634 \u0628\u0627\u06CC\u062F \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0645\u062A\u0635\u0644 \u0628\u0627\u0634\u06CC\u062F":"You must be online to refresh the app.");return}try{if("serviceWorker"in navigator){let a=await navigator.serviceWorker.getRegistrations();for(let s of a)await s.unregister()}if("caches"in window){let a=await caches.keys();for(let s of a)await caches.delete(s)}}catch(a){console.warn("Cache clear failed",a)}location.href=location.pathname+"?_nocache="+Date.now()})}function Om(){let t=()=>{for(let s of document.querySelectorAll('button[aria-label],a[aria-label],[role="button"][aria-label]'))s.title||(s.title=s.getAttribute("aria-label")||"")};t();let a=new MutationObserver(()=>{clearTimeout(a._t),a._t=setTimeout(t,350)});a.observe(document.body,{childList:!0,subtree:!0})}function jm(){let t=new Set,a=(s,n,o)=>{let i=String(s).slice(0,120);if(!(t.has(i)||t.size>12)){t.add(i);try{let l=JSON.stringify({msg:String(s).slice(0,300),src:String(n||"").slice(0,200),line:o||0,path:location.hash.slice(0,120),build:window.__BM_BUILD||""});navigator.sendBeacon?navigator.sendBeacon("/api/client-error",new Blob([l],{type:"application/json"})):fetch("/api/client-error",{method:"POST",headers:{"Content-Type":"application/json"},body:l,keepalive:!0}).catch(()=>{})}catch(l){}}};window.addEventListener("error",s=>a(s.message,s.filename,s.lineno)),window.addEventListener("unhandledrejection",s=>{var n;return a(`unhandledrejection: ${((n=s.reason)==null?void 0:n.message)||s.reason}`,location.href,0)})}function Je(){var d,b;let t=Xt(),a=re(),s=I("#topbar"),n=[];t.freeShipOver&&n.push(q()?`\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC ${g(t.freeShipOver)} \u062A\u0648\u0645\u0627\u0646`:`Free shipping over ${g(t.freeShipOver)}`),n.push(q()?"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627\u061B \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632":"Authenticity guarantee; 7-day returns"),t.phone&&n.push(q()?`\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0647\u0631 \u0631\u0648\u0632 \u06F9 \u062A\u0627 \u06F2\u06F1 \u2014 ${at(t.phone)}`:`Support 9\u201321 daily \u2014 ${at(t.phone)}`),(d=t.socials)!=null&&d.instagram,n.push(q()?"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u062C\u062A \u0647\u0631 \u0647\u0641\u062A\u0647 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u06CC\u0627\u0633\u0627\u06CC\u06CC":"New gadgets weekly on Instagram");let o=(b=m.ticker)!=null&&b.length?m.ticker:n;s.hidden=!1,s.classList.toggle("no-ticker",a.showTicker===!1);let i=o.map(u=>r`<span class="ticker-item">${c("sparkles")} ${u}</span>`).join("");I("#ticker").innerHTML=`<div class="ticker-track">${i}${i}</div>`;let l=I("#tb-phone");l.href=`tel:${t.phone||""}`,l.innerHTML=r`${c("phone")} ${at(t.phone||"")}`,I("#brandName").textContent=q()?t.name||e("app.name"):t.nameEn||t.name||"Yassaei Electronics",I("#brandTag").textContent=q()?t.tagline||"":t.taglineEn||"",I("#brandLink").setAttribute("aria-label",`${t.name||""} \u2014 ${e("nav.home")}`),zm(),Um(),Us(),va();let p=I("#btnInstallApp");p&&(p.hidden=m.installed)}function zm(){let t=I("#navInner"),a=m.categories.filter(d=>!d.parentId).slice(0,10),n=[{key:"/",href:"#/",icon:"home",label:e("nav.home")},{key:"/products",href:"#/products",icon:"grid",label:e("nav.products")}].map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${c(d.icon)} ${d.label}</a>`).join("");n+=r`
    <div class="nav-more">
      <a href="#/products" class="nav-link">${c("layers")} ${e("nav.allCategories")} ${c("chevron-down")}</a>
      <div class="nav-dd mega-menu hidden-default">
        <div class="mega-side">
          ${m.categories.filter(d=>!d.parentId).map(d=>r`<a href="#/category/${d.id}" class="mega-side-link" data-cat="${d.id}">${c(xe(d.glyph))} ${Et(d)}</a>`)}
        </div>
        <div class="mega-content">
          <div class="mega-empty muted small">${e("nav.allCategories")}</div>
        </div>
      </div>
    </div>`;let o=[{key:"/deals",href:"#/products?discount=1",icon:"percent",label:e("nav.deals"),show:B("coupons")},{key:"/new",href:"#/products?sort=newest",icon:"sparkles",label:e("nav.new"),show:!0},{key:"/stats",href:"#/stats",icon:"chart",label:e("nav.stats"),show:B("publicStats")},{key:"/price-check",href:"#/price-check",icon:"barcode",label:e("priceCheck.title"),show:B("priceCheckDevice")},{key:"/lottery",href:"#/lottery",icon:"gift2",label:e("lot.nav"),show:!0},{key:"/pages/installments",href:"#/pages/installments",icon:"card",label:q()?"\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC":"Installments",show:!0},{key:"/pages/about",href:"#/pages/about",icon:"store",label:e("nav.about"),show:!0},{key:"/pages/contact",href:"#/pages/contact",icon:"map",label:e("nav.contact"),show:!0}].filter(d=>d.show);n+=o.map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${c(d.icon)} ${d.label}</a>`).join("");let i=le("ticker");i.length&&(n+=r`<span class="nav-link muted tiny">${i[0].title}</span>`),t.innerHTML=n;let l=t.querySelectorAll(".mega-side-link"),p=t.querySelector(".mega-content");if(l.length&&p){let d=b=>{l.forEach(k=>k.classList.remove("active")),b.classList.add("active");let u=b.dataset.cat,v=m.categories.filter(k=>k.parentId===u),$=m.brands.slice(0,10),w=`<a href="#/category/${u}" class="mega-see-all" style="margin-top:0;">${e("nav.allCategories")} ${Et(m.categories.find(k=>k.id===u)||{})} ${c("chevron-left")}</a>`;w+='<div class="mega-sub-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start; align-content: start;">',v.length&&(w+='<div class="mega-sub-col" style="display:flex; flex-direction:column; gap:8px;"><h3>\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647</h3>',v.forEach(k=>{w+=`<a href="#/category/${k.id}" style="margin:0;">${Et(k)}</a>`}),w+="</div>"),w+=`<div class="mega-sub-col" style="${v.length?"":"grid-column: 1 / -1;"} display:flex; flex-direction:column; gap:8px;"><h3>\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u067E\u0631\u0637\u0631\u0641\u062F\u0627\u0631 \u0627\u06CC\u0646 \u062F\u0633\u062A\u0647</h3><div style="display: flex; flex-wrap: wrap; gap: 8px;">`,$.forEach(k=>{w+=`<a href="#/products?cat=${u}&brand=${k.id}" class="chip" style="margin:0;">${Yt(k)}</a>`}),w+="</div></div></div>",p.innerHTML=w,p.scrollTop=0};l.forEach(b=>{b.addEventListener("mouseenter",()=>d(b))}),l[0]&&d(l[0])}}function Um(){let t=Xt();I("#fBrandName").textContent=q()?t.name||e("app.name"):t.nameEn||t.name||"",I("#fDesc").textContent=q()?t.description||"":t.descriptionEn||t.description||"",I("#fYear").textContent=q()?oe(new Date().getFullYear()):String(new Date().getFullYear()),I("#fBadges").innerHTML=r`
    <span class="f-badge">${c("shield")}<span>${e("home.point1")}</span></span>
    <span class="f-badge">${c("package-check")}<span>${e("home.point2")}</span></span>
    ${B("insurance")?r`<span class="f-badge">${c("scale")}<span>${e("common.insurance")}</span></span>`:""}
    ${B("plus")?r`<span class="f-badge">${c("sparkles")}<span>${e("footer.plus")}</span></span>`:""}`;let a=t.socials||{},s=[["instagram",Dt(a.instagram||"https://instagram.com/jam.yassaei"),"camera"],["telegram",Dt(a.telegram),"send"],["whatsapp",a.whatsapp?`https://wa.me/${String(a.whatsapp).replace(/\D/g,"")}`:"","chat"],["eitaa",Dt(a.eitaa),"globe"]].filter(n=>n[1]);I("#fSocial").innerHTML=s.length?s.map(([n,o,i])=>r`<a href="${o}" target="_blank" rel="noopener noreferrer" aria-label="${n}" title="${n}">${c(i)}</a>`).join(""):r`<span class="muted tiny">${e("footer.contactUs")}</span>`,I("#fContact").innerHTML=r`
    <li>${c("phone")}<span>${e("contact.phone")}: <a href="tel:${t.phone}">${at(t.phone||"")}</a></span></li>
    <li>${c("chat")}<span>${e("contact.mobile")}: <a href="tel:${t.phone2||t.phone}">${at(t.phone2||"")}</a></span></li>
    <li>${c("mail")}<span><a href="mailto:${t.email}">${t.email}</a></span></li>
    <li>${c("pin")}<span>${q()?t.address||"":t.addressEn||t.address||""}</span></li>
    <li>${c("clock")}<span>${e("footer.workingHours")}: ${(t.workingHours||[]).map(n=>r`<bdi>${q()?n.fa:n.en} ${q()?n.time:n.timeEn}</bdi>`)}</span></li>`,I("#fMinimap").innerHTML=aa(),I("#fMinimap").setAttribute("title",e("contact.mapTitle"))}function Us(){var l,p,d,b;let t=I("#userMenu"),a=I("#btnAuth");if(!m.me){t.hidden=!0,a.hidden=!1,a.innerHTML=r`${c("user")}<span data-i18n="nav.login">${e("nav.login")}</span>`;return}a.hidden=!0,t.hidden=!1;let s=m.me,n=(s.name||s.username||"?").trim().charAt(0);t.innerHTML=r`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${h(n)}</span>
      <span class="um-name">${h(s.name||s.username)}</span>
      ${c("chevron-down")}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${h(s.name||s.username)}</div>
        <div class="tiny muted">${h(s.phone||s.email||s.username)}</div>
        ${Zt()?r`<span class="badge-pill bp-accent mt-s">${c("sparkles")} ${e("acc.plus")}</span>`:""}
      </div>
      <a href="#/account">${c("user")} ${e("acc.dashboard")}</a>
      <a href="#/account/orders">${c("package-check")} ${e("acc.orders")}</a>
      <a href="#/account/wishlist">${c("heart")} ${e("acc.wishlist")} <span class="um-count">${g(m.wishlist.length)}</span></a>
      ${B("wallet")?r`<a href="#/account/wallet">${c("wallet")} ${e("acc.wallet")} <span class="um-count">${g(((l=s.wallet)==null?void 0:l.balance)||0)}</span></a>`:""}
      ${B("tickets")?r`<a href="#/account/tickets">${c("ticket")} ${e("acc.tickets")}</a>`:""}
      <a href="#/account/notifications">${c("bell")} ${e("acc.notifications")} ${m.unread?r`<span class="um-count">${g(m.unread)}</span>`:""}</a>
      ${s.isAdmin?r`<div class="sep"></div><a href="#/admin">${c("settings")} ${e("nav.admin")}</a>`:""}
      <div class="sep"></div>
      <button type="button" data-act="sound-toggle" aria-pressed="${(p=m.prefs)!=null&&p.uiSound?"true":"false"}">${c((d=m.prefs)!=null&&d.uiSound?"volume":"volume-off")} ${e("misc.uiSound")} <span class="um-sw ${(b=m.prefs)!=null&&b.uiSound?"on":""}" aria-hidden="true"></span></button>
      <button type="button" data-act="logout">${c("logout")} ${e("common.logout")}</button>
    </div>`;let o=t.querySelector("[data-um]"),i=t.querySelector("[data-umbox]");o.addEventListener("click",u=>{u.stopPropagation(),i.hidden=!i.hidden,o.setAttribute("aria-expanded",String(!i.hidden))}),document.addEventListener("click",u=>{!i.hidden&&!u.target.closest(".user-menu")&&(i.hidden=!0,o.setAttribute("aria-expanded","false"))})}function va(){var a,s;let t=(n,o)=>{let i=I(n);i&&(i.hidden=!o,i.textContent=g(o))};t("#cartBadge",((a=m.cart)==null?void 0:a.count)||0),t("#mnCart",((s=m.cart)==null?void 0:s.count)||0),t("#wishBadge",m.wishlist.length),t("#notifBadge",m.unread)}function _m(){var s,n,o,i;(s=I("#btnTheme"))==null||s.addEventListener("click",()=>{let p=(m.prefs.theme==="auto"?document.documentElement.getAttribute("data-mode")||"dark":m.prefs.theme)==="dark"?"light":"dark";Te("theme",p);let d=I("#btnTheme");d.innerHTML=c(p==="dark"?"moon":"sun")}),(n=I("#btnLang"))==null||n.addEventListener("click",async()=>{let l=$t()==="fa"?"en":"fa";Te("locale",l),I("#langChip").textContent=l==="fa"?"EN":"\u0641\u0627",Ze(),Je(),Ze(),T(!0)}),(o=I("#btnMenu"))==null||o.addEventListener("click",()=>Wm());let t=I("#fabTop");t==null||t.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));let a=!1;addEventListener("scroll",()=>{a||!t||(a=!0,requestAnimationFrame(()=>{t.hidden=scrollY<600,a=!1}))},{passive:!0}),(i=I("#btnInstallApp"))==null||i.addEventListener("click",async()=>{m.installPrompt?await Ea()||Fe():Fe()})}function Wm(){wn({title:r`<div style="display:flex;align-items:center;gap:12px;font-size:16px;font-weight:700">
      ${c("menu")} ${e("nav.menu")}
    </div>`,body:r`
      <div class="col" style="gap: 8px">
        <a class="nav-link" href="#/" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("home")} ${e("nav.home")}</a>
        <a class="nav-link" href="#/products" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("grid")} ${e("nav.products")}</a>
        ${m.categories.filter(t=>!t.parentId).map(t=>r`<a class="nav-link" href="#/category/${t.id}" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c(xe(t.glyph))} ${Et(t)}</a>`).join("")}
        <div class="divider" style="margin: 4px 0"></div>
        <a class="nav-link" href="#/pages/installments" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("card")} خرید اقساطی</a>
        <a class="nav-link" href="#/pages/about" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("store")} ${e("nav.about")}</a>
        <a class="nav-link" href="#/pages/contact" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("map")} ${e("nav.contact")}</a>
        ${m.me?"":r`<a class="btn btn-primary btn-block mt-s" href="#/auth" style="margin-top: 16px">${c("user")} ${e("nav.login")}</a>`}
      </div>`})}function Vm(){var l,p;let t=I("#searchForm"),a=I("#searchInput"),s=I("#suggestBox"),n=-1,o=()=>{s.hidden=!0,n=-1},i=ta(async()=>{var b,u,v;let d=a.value.trim();if(!d){if(!m.searches.length){o();return}s.hidden=!1,s.innerHTML=r`
        <div class="sg-group">${e("search.recent")}</div>
        ${m.searches.map($=>r`<div class="sg-item" data-q="${$}">${c("history")}<span class="sg-title">${$}</span></div>`)}`;return}try{let $=await f.get(`/api/search?q=${encodeURIComponent(d)}&limit=7`);s.hidden=!1;let w="";$.didYouMean&&(w+=r`<div class="sg-group">${e("search.didYouMean")}</div><div class="sg-item" data-q="${$.didYouMean}">${c("sparkles")}<span class="sg-title">${$.didYouMean}</span></div>`),(b=$.categories)!=null&&b.length&&(w+=r`<div class="sg-group">${e("search.inCategories")}</div>${$.categories.map(k=>r`<a class="sg-item" href="#/category/${k.id}">${c(xe(k.glyph))}<span class="sg-title">${Et(k)}</span></a>`)}`),(u=$.brands)!=null&&u.length&&(w+=r`<div class="sg-group">${e("search.inBrands")}</div>${$.brands.map(k=>r`<div class="sg-item" data-q="${Yt(k)}">${c("tag")}<span class="sg-title">${Yt(k)}</span></div>`)}`),(v=$.products)!=null&&v.length&&(w+=r`<div class="sg-group">${e("search.inProducts")}</div>${$.products.map(k=>{var C;return r`
          <a class="sg-item" href="#/product/${k.id}">
            ${(C=k.images)!=null&&C[0]?r`<img class="sg-thumb" src="${k.images[0]}" alt="" loading="lazy" data-glyph="${k.glyph}">`:c(k.glyph||"box")}
            <span class="grow"><span class="sg-title">${ft(k)}</span><span class="sg-meta">${Et({name:k.categoryName,nameEn:k.categoryNameEn})}</span></span>
            <span class="sg-price">${g(k.price)}</span>
          </a>`})}`),w||(w=r`<div class="sg-item muted">${e("common.noResult")}</div>`),s.innerHTML=w}catch($){o()}},240);a.addEventListener("input",i),a.addEventListener("focus",i),document.addEventListener("click",d=>{d.target.closest(".searchbox")||o()}),s.addEventListener("click",d=>{if(d.target.closest("a.sg-item")){o();return}let b=d.target.closest("[data-q]");b&&(d.preventDefault(),a.value=b.dataset.q,o(),zs(b.dataset.q))}),window.addEventListener("hashchange",o),t.addEventListener("submit",d=>{d.preventDefault();let b=a.value.trim();o(),zs(b)}),a.addEventListener("keydown",d=>{var u;let b=[...s.querySelectorAll(".sg-item, a.sg-item")];if(d.key==="ArrowDown"||d.key==="ArrowUp"){if(!b.length)return;d.preventDefault(),n=(n+(d.key==="ArrowDown"?1:-1)+b.length)%b.length,b.forEach((v,$)=>v.classList.toggle("active",$===n)),(u=b[n])==null||u.scrollIntoView({block:"nearest"})}else if(d.key==="Enter"&&n>=0&&b[n]){d.preventDefault();let v=b[n];v.dataset.q?(a.value=v.dataset.q,zs(v.dataset.q)):v.getAttribute("href")&&(location.hash=v.getAttribute("href")),o()}else d.key==="Escape"&&o()}),(l=I("#btnVoiceSearch"))==null||l.addEventListener("click",()=>Ym(a,zs)),(p=I("#btnImageSearch"))==null||p.addEventListener("click",()=>{if(!B("imageSearch")){it(e("err.notFound"));return}bt("#/search/image")})}function zs(t){let a=String(t||"").trim();a&&(hn(a),bt(`/products?q=${encodeURIComponent(a)}`))}async function Ym(t,a){var l;let s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s){V(e("search.noVoice"));return}try{(l=navigator.mediaDevices)!=null&&l.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(d=>d.stop())}catch(p){V(e("search.micDenied"));return}let n=new s;n.lang=$t()==="fa"?"fa-IR":"en-US",n.interimResults=!1,n.maxAlternatives=1;let o=I("#btnVoiceSearch");o.classList.add("active");let i=it(e("search.listening"),{timeout:2600});n.onresult=p=>{var b,u,v;i==null||i.close();let d=((v=(u=(b=p.results)==null?void 0:b[0])==null?void 0:u[0])==null?void 0:v.transcript)||"";d?(t.value=d,a(d)):it(e("search.noSpeech"))},n.onerror=p=>{i==null||i.close();let b={"not-allowed":"search.micDenied","service-not-allowed":"search.micDenied",network:"search.voiceNetwork","no-speech":"search.noSpeech",aborted:null,"audio-capture":"search.noMic"}[p.error];b?V(e(b)):p.error!=="aborted"&&V(e("search.noSpeech"))},n.onend=()=>{o.classList.remove("active"),i==null||i.close()};try{n.start()}catch(p){o.classList.remove("active")}}function Gm(){let t=null,a=()=>{t==null||t.remove(),t=null,document.removeEventListener("keydown",onKey,!0)},s=async()=>{if(t){a();return}t=Jt("div",{class:"cmdk",role:"dialog","aria-modal":"true","aria-label":e("common.search")}),t.innerHTML=r`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${e("common.searchProducts")}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${e("common.select")}</span><span><kbd>Enter</kbd> ${e("common.next")}</span><span><kbd>Esc</kbd> ${e("common.close")}</span></div>
      </div>`,document.body.appendChild(t);let n=t.querySelector("[data-ci]"),o=t.querySelector("[data-cl]");n.focus();let i=()=>{var u;return[{icon:"home",label:e("nav.home"),href:"#/"},{icon:"grid",label:e("nav.products"),href:"#/products"},{icon:"percent",label:e("nav.deals"),href:"#/products?discount=1"},{icon:"cart",label:e("cart.title"),href:"#/cart"},...m.me?[{icon:"user",label:e("acc.dashboard"),href:"#/account"},{icon:"package-check",label:e("acc.orders"),href:"#/account/orders"},...B("wallet")?[{icon:"wallet",label:e("acc.wallet"),href:"#/account/wallet"}]:[]]:[{icon:"user",label:e("nav.login"),href:"#/auth"}],...(u=m.me)!=null&&u.isAdmin?[{icon:"settings",label:e("adm.title"),href:"#/admin"}]:[],{icon:"moon",label:e("theme.toggle"),run:()=>I("#btnTheme").click()},{icon:"globe",label:"English / \u0641\u0627\u0631\u0633\u06CC",run:()=>I("#btnLang").click()},{icon:"chart",label:e("nav.stats"),href:"#/stats"},{icon:"map",label:e("nav.contact"),href:"#/pages/contact"}]},l=async u=>{let v=i().filter($=>!u||$.label.toLowerCase().includes(u.toLowerCase()));if(u)try{let $=await f.get(`/api/search?q=${encodeURIComponent(u)}&limit=6`);v=[...v,...$.products.map(w=>({icon:w.glyph||"box",label:ft(w),meta:g(w.price),href:`#/product/${w.id}`}))]}catch($){}o.innerHTML=v.length?v.map(($,w)=>r`<div class="cmdk-item ${w===0?"active":""}" data-idx="${w}">${c($.icon)}<span class="grow">${$.label}</span>${$.meta?r`<span class="muted tiny">${$.meta}</span>`:""}</div>`):r`<div class="cmdk-item muted">${e("common.noResult")}</div>`,o._items=v};await l(""),n.addEventListener("input",ta(()=>l(n.value.trim()),200));let p=u=>{var $;let v=($=o._items)==null?void 0:$[u];v&&(a(),v.run?v.run():v.href&&(location.hash=v.href))};o.addEventListener("click",u=>{let v=u.target.closest("[data-idx]");v&&p(Number(v.dataset.idx))});let d=0,b=u=>{var $;let v=o.querySelectorAll(".cmdk-item[data-idx]");u.key==="Escape"?(u.preventDefault(),a()):u.key==="ArrowDown"||u.key==="ArrowUp"?(u.preventDefault(),d=(d+(u.key==="ArrowDown"?1:-1)+v.length)%Math.max(1,v.length),v.forEach((w,k)=>w.classList.toggle("active",k===d)),($=v[d])==null||$.scrollIntoView({block:"nearest"})):u.key==="Enter"&&(u.preventDefault(),p(d))};document.addEventListener("keydown",b,!0),t.addEventListener("click",u=>{u.target===t&&a()})};document.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&String(n.key).toLowerCase()==="k"&&(n.preventDefault(),s())})}function Km(){Ft("cart",va),Ft("wishlist",()=>{va(),Us()}),Ft("notifications",va),Ft("me",()=>{Us(),va()}),Ft("settings",()=>{Ce(),Je(),Ze(),ya()}),document.addEventListener("view:rendered",()=>ya()),document.addEventListener("sleep:changed",()=>{ya(),Je()}),Ft("install",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!1)}),Ft("installed",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!0),E(e("home.appInstalled"))}),Ft("online",t=>{t?E(e("err.online")):Jm()})}function Qm(){let t=async()=>{if(!document.documentElement.classList.contains("eco"))try{let a=await f.get("/api/system/status"),s=!!m.sleeping;m.sleeping=!!a.sleeping,m.sleepSince=a.since||null,s!==m.sleeping&&(ya(),Je(),String(location.hash||"").startsWith("#/admin")&&T(!0))}catch(a){}};setInterval(t,45e3),document.addEventListener("visibilitychange",()=>{document.hidden||t()})}function ya(){let t=String(location.hash||"").startsWith("#/admin"),a=Q("settings.edit");xn({sleeping:!!m.sleeping&&!(t&&a),canWake:a,since:m.sleepSince,onWake:async()=>{try{await f.post("/api/system/wake",{}),await Ot({silent:!0}),ya(),Je(),E(e("sys.awake")),T(!0)}catch(s){S(s)}},onLogin:()=>bt("#/auth?next="+encodeURIComponent(location.hash.slice(1)))})}function Jm(){mo||(mo=!0,V(e("err.offline"),{timeout:4200}))}function Xm(){window.addEventListener("online",()=>{mo=!1})}function Zm(){let t=I("#siteHeader"),a=I("#fabTop"),s=!1;window.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(()=>{t.classList.toggle("scrolled",window.scrollY>8),a.hidden=window.scrollY<420,s=!1}))},{passive:!0})}function Ec(){if(B("consent")){if(sessionStorage.getItem("consentDeferred"))if(!location.hash.startsWith("#/pages/"))sessionStorage.removeItem("consentDeferred");else return;pt({title:e("consent.title"),dismissible:!1,closeBtn:!1,size:"md",body:r`
      <p class="confirm-text mb">${e("consent.text")}</p>
      <p class="hint mt-s">${c("info")} ${e("consent.ttlNote")}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${c("check")}</span><span>${e("consent.terms")} <a class="section-link" href="#/pages/terms">${e("consent.readTerms")}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${c("check")}</span><span>${e("consent.privacy")} <a class="section-link" href="#/pages/privacy">${e("consent.readPrivacy")}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${c("check")}</span><span>${e("consent.marketing")}</span></label>
      </form>`,footer:r`<button type="button" class="btn btn-ghost" data-consent-min>${e("consent.rejectOptional")}</button><button type="button" class="btn btn-primary" data-consent-go>${e("consent.accept")}</button>`,onMount:(t,a)=>{let s=t.querySelector('[data-act="consent-form"]');t.querySelectorAll('a[href^="#/"]').forEach(o=>o.addEventListener("click",()=>{sessionStorage.setItem("consentDeferred","1"),a.close()}));let n=()=>{let o=s.querySelector("[name=terms]").checked,i=s.querySelector("[name=privacy]").checked,l=s.querySelector("[name=marketing]").checked;if(!o||!i){V(e("form.termsRequired"));return}is({terms:o,privacy:i,marketing:l}),m.me&&f.patch("/api/me",{notificationsPrefs:{marketing:l}}).catch(()=>{}),E(e("consent.thanks")),a.close()};t.closest(".modal").querySelector("[data-consent-go]").addEventListener("click",n),t.closest(".modal").querySelector("[data-consent-min]").addEventListener("click",()=>{is({terms:!0,privacy:!0,marketing:!1}),m.me&&f.patch("/api/me",{notificationsPrefs:{marketing:!1}}).catch(()=>{}),E(e("consent.thanks")),a.close()}),s.addEventListener("submit",o=>{o.preventDefault(),n()})}})}}function qc(){fn()||Ec()}function tp(){var t;if((t=m.me)!=null&&t.mustChangePassword){try{if(sessionStorage.getItem("bm_pwd_later"))return}catch(a){}Qe=pt({title:e("acc.passwordChange"),dismissible:!1,closeBtn:!1,size:"sm",body:r`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${c("alert")}<span>${$t()==="fa"?"\u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631\u060C \u0631\u0645\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0628\u062F\u0647.":"For security, change the default password."}</span></p>
        <label class="field"><span class="label">${e("acc.currentPassword")}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${e("acc.newPassword2")}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${e("auth.passwordRules")}</span></label>
        <label class="field"><span class="label">${e("common.passwordConfirm")}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${e("common.save")}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${e("auth.pwdLater")}</button>
      </form>`})}}function ep(){let t="bm_visit";try{if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1")}catch(a){return}f.post("/api/visits",{path:location.hash||"/"}).catch(()=>{})}function ap(){let t=String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);if(!t)return;let a=t[1];try{history.replaceState(null,"",String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/,"").replace(/\?$/,""))}catch(s){}setTimeout(async()=>{try{await f.post("/api/cart/coupon",{code:a}),await Mt(),E(`${e("cart.couponApplied")}: ${a}`)}catch(s){}},700)}function sp(){document.addEventListener("keydown",t=>{var n,o,i;let a=String(((n=t.target)==null?void 0:n.tagName)||"").toLowerCase(),s=["input","textarea","select"].includes(a)||((o=t.target)==null?void 0:o.isContentEditable);if(t.key==="/"&&!s&&!t.metaKey&&!t.ctrlKey&&!t.altKey){let l=I("#searchInput");l&&(t.preventDefault(),l.focus(),(i=l.select)==null||i.call(l))}if(t.key==="Escape"&&document.activeElement===I("#searchInput")){let l=I("#searchInput");l.value="",l.blur(),I("#suggestBox")&&(I("#suggestBox").hidden=!0)}})}function np(){var a;if(!("serviceWorker"in navigator)||((a=en().features)==null?void 0:a.offlineMode)===!1)return;let t=async()=>{try{let s=await navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"});setInterval(()=>{s.update().catch(()=>{})},36e5),document.addEventListener("visibilitychange",()=>{document.hidden||s.update().catch(()=>{})}),s.addEventListener("updatefound",()=>{let n=s.installing;n&&n.addEventListener("statechange",()=>{n.state==="installed"&&navigator.serviceWorker.controller&&it(q()?"\u0628\u0631\u0627\u06CC \u0627\u0639\u0645\u0627\u0644 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0631\u0648\u06CC \u062F\u06A9\u0645\u0647 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F.":"Click update to apply changes.",{type:"info",title:q()?"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A":"Update Available",timeout:15e3,action:{label:q()?"\u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC":"Update",onClick:()=>{var o;(o=document.getElementById("btnRefresh"))==null||o.click()}}})})})}catch(s){}};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0})}function op(){fetch("/api/system/status",{cache:"no-store"}).then(t=>t.ok?t.json():null).then(t=>{t!=null&&t.build&&t.build!==tn&&!sessionStorage.getItem("bm-upd-seen")&&(sessionStorage.setItem("bm-upd-seen","1"),it(e("update.available"),{timeout:0,action:{label:e("update.reload"),onClick:()=>location.reload()}}))}).catch(()=>{})}function rp(){if(!matchMedia("(pointer:fine)").matches)return;let t=I("#cursorHalo");if(!t)return;let a=innerWidth/2,s=innerHeight/2,n=a,o=s,i=0,l=()=>{n+=(a-n)*.22,o+=(s-o)*.22,t.style.left=`${n.toFixed(1)}px`,t.style.top=`${o.toFixed(1)}px`,i=requestAnimationFrame(l)};document.addEventListener("pointermove",p=>{var b,u;if(document.documentElement.classList.contains("eco"))return;a=p.clientX,s=p.clientY,document.documentElement.classList.add("halo-on"),i||(i=requestAnimationFrame(l));let d=(u=(b=p.target).closest)==null?void 0:u.call(b,'a, button, [role="button"], .pcard, .gal-thumb');document.documentElement.classList.toggle("halo-hot",!!d)},{passive:!0}),document.addEventListener("pointerleave",()=>{document.documentElement.classList.remove("halo-on")})}function ip(){return document.documentElement.classList.contains("eco")}function lp(){let t=()=>{document.documentElement.classList.contains("eco")||(document.documentElement.classList.add("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!0}})))},a=()=>{document.documentElement.classList.contains("eco")&&(document.documentElement.classList.remove("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!1}})),Promise.resolve().then(()=>(K(),qa)).then(n=>{var o;return(o=n.refreshBootstrap)==null?void 0:o.call(n,{silent:!0})}).catch(()=>{}))},s=()=>{clearTimeout(Sc),Sc=setTimeout(t,cp)};for(let n of["pointerdown","keydown","wheel","touchstart","pointermove"])document.addEventListener(n,()=>{document.documentElement.classList.contains("eco")&&a(),s()},{passive:!0,capture:!0});s()}function dp(){try{if(sessionStorage.getItem("bm_vis"))return;sessionStorage.setItem("bm_vis","1");let t={screen:`${screen.width}x${screen.height}`,tz:Intl.DateTimeFormat().resolvedOptions().timeZone||"",lang:navigator.language||"",ref:document.referrer?document.referrer.slice(0,200):"",path:location.hash.replace("#","")||"/"};Promise.resolve().then(()=>(Z(),ko)).then(a=>a.api.post("/api/track",t)).catch(()=>{})}catch(t){}}var Hm,mo,Qe,cp,Sc,lo=W(()=>{K();G();Z();z();et();ut();nt();Bn();kc();K();dt();setTimeout(xc,1e4);Hm=performance.now();y("logout",async()=>{if(await wt({text:e("common.logout")+"\u061F",okText:e("common.logout")}))try{await f.post("/api/auth/logout"),m.me=null,await Mt(),Je(),E(e("auth.logoutDone")),bt("#/"),T()}catch(a){V(e("err.generic"))}});mo=!1;y("consent-form",()=>{});y("consent-manage",()=>Ec());y("reload",()=>location.reload());Qe=null;y("pwd-later",()=>{try{sessionStorage.setItem("bm_pwd_later","1")}catch(t){}Qe==null||Qe.close(),it(e("auth.pwdLaterToast"))});y("force-pass",async(t,a)=>{let s=new FormData(a);if(s.get("next")!==s.get("confirm")){V($t()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}try{await f.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),await te(),Us(),E(e("acc.passwordChanged")),Qe==null||Qe.close()}catch(n){V(n.message)}});Ft("boot-slow",()=>document.body.classList.add("boot-slow"));Ft("boot-failed",()=>{let t=document.getElementById("welcomeScreen");t&&t.parentNode&&t.parentNode.removeChild(t);let a=I("#bootSplash");a&&(a.innerHTML=r`<div class="empty">
    <h4>${e("boot.failed")}</h4>
    <p class="muted small mt-s">${e("boot.failedHint")}</p>
    <button class="btn btn-primary mt" data-act="reload">${c("refresh")} ${e("common.retry")}</button>
  </div>`)});Bm().catch(t=>{console.error("[boot]",t);let a=document.getElementById("welcomeScreen");a&&a.parentNode&&a.parentNode.removeChild(a);let s=I("#bootSplash");s&&(s.innerHTML=r`<div class="empty"><h4>${e("err.generic")}</h4><button class="btn btn-primary" data-act="reload">${e("common.retry")}</button></div>`)});setTimeout(op,6e3);cp=240*1e3,Sc=0});lo();export{ip as ecoPaused,qc as maybeConsent,va as updateBadges};
