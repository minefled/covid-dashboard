var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function a(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let o,c;function l(e,t){return o||(o=document.createElement("a")),o.href=t,e===o.href}function r(e){return null==e?"":e}function d(e,t){e.appendChild(t)}function u(e,t,n){e.insertBefore(t,n||null)}function m(e){e.parentNode.removeChild(e)}function v(e){return document.createElement(e)}function p(e){return document.createTextNode(e)}function g(){return p(" ")}function h(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function f(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function $(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function b(e,t,n,s){e.style.setProperty(t,n,s?"important":"")}function w(e){c=e}function y(){if(!c)throw new Error("Function called outside component initialization");return c}function _(e){y().$$.on_mount.push(e)}const T=[],x=[],k=[],M=[],D=Promise.resolve();let z=!1;function C(e){k.push(e)}let I=!1;const V=new Set;function q(){if(!I){I=!0;do{for(let e=0;e<T.length;e+=1){const t=T[e];w(t),B(t.$$)}for(w(null),T.length=0;x.length;)x.pop()();for(let e=0;e<k.length;e+=1){const t=k[e];V.has(t)||(V.add(t),t())}k.length=0}while(T.length);for(;M.length;)M.pop()();z=!1,I=!1,V.clear()}}function B(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(C)}}const E=new Set;let j;function L(){j={r:0,c:[],p:j}}function P(){j.r||s(j.c),j=j.p}function A(e,t){e&&e.i&&(E.delete(e),e.i(t))}function H(e,t,n,s){if(e&&e.o){if(E.has(e))return;E.add(e),j.c.push((()=>{E.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}}function Z(e){e&&e.c()}function Q(e,n,i,o){const{fragment:c,on_mount:l,on_destroy:r,after_update:d}=e.$$;c&&c.m(n,i),o||C((()=>{const n=l.map(t).filter(a);r?r.push(...n):s(n),e.$$.on_mount=[]})),d.forEach(C)}function S(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function G(e,t){-1===e.$$.dirty[0]&&(T.push(e),z||(z=!0,D.then(q)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function N(t,a,i,o,l,r,d,u=[-1]){const v=c;w(t);const p=t.$$={fragment:null,ctx:null,props:r,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(v?v.$$.context:[])),callbacks:n(),dirty:u,skip_bound:!1,root:a.target||v.$$.root};d&&d(p.root);let g=!1;if(p.ctx=i?i(t,a.props||{},((e,n,...s)=>{const a=s.length?s[0]:n;return p.ctx&&l(p.ctx[e],p.ctx[e]=a)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](a),g&&G(t,e)),n})):[],p.update(),g=!0,s(p.before_update),p.fragment=!!o&&o(p.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);p.fragment&&p.fragment.l(e),e.forEach(m)}else p.fragment&&p.fragment.c();a.intro&&A(t.$$.fragment),Q(t,a.target,a.anchor,a.customElement),q()}w(v)}class J{$destroy(){S(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function W(t){let n,s,a,i,o,c,l,r,b;return{c(){n=v("div"),s=v("b"),a=p(t[1]),i=g(),o=v("span"),f(s,"class","item-name svelte-vku21z"),f(o,"class","item-name-underline svelte-vku21z"),f(n,"class",c="navigator-item "+(t[0]==t[2]?"active":"")+" svelte-vku21z"),f(n,"id",l="header-nav-itm-"+t[0])},m(e,c){u(e,n,c),d(n,s),d(s,a),d(n,i),d(n,o),r||(b=h(n,"click",t[3]),r=!0)},p(e,[t]){2&t&&$(a,e[1]),5&t&&c!==(c="navigator-item "+(e[0]==e[2]?"active":"")+" svelte-vku21z")&&f(n,"class",c),1&t&&l!==(l="header-nav-itm-"+e[0])&&f(n,"id",l)},i:e,o:e,d(e){e&&m(n),r=!1,b()}}}function O(e,t,n){let{id:s}=t,{name:a}=t,{selected_page:i}=t;return e.$$set=e=>{"id"in e&&n(0,s=e.id),"name"in e&&n(1,a=e.name),"selected_page"in e&&n(2,i=e.selected_page)},[s,a,i,()=>{window.location.href=`#${s}`}]}class F extends J{constructor(e){super(),N(this,e,O,W,i,{id:0,name:1,selected_page:2})}}function R(t){let n,s,a;return{c(){n=v("div"),n.innerHTML='<img class="theme-icon svelte-qp6drt" alt="theme-icon" src="public/assets/icons/themes/dark-theme.png" id="header-theme-sel-icon"/>',f(n,"class","theme-selector-block svelte-qp6drt")},m(e,i){u(e,n,i),s||(a=h(n,"click",t[2]),s=!0)},p:e,i:e,o:e,d(e){e&&m(n),s=!1,a()}}}function K(e,t,n){let{core:s}=t;function a(){"light"==s.userPreferences.theme?n(1,s.userPreferences.theme="dark",s):"dark"==s.userPreferences.theme&&n(1,s.userPreferences.theme="light",s),document.getElementById("header-theme-sel-icon").style.opacity="0",setTimeout((()=>{document.getElementById("header-theme-sel-icon").setAttribute("src",`public/assets/icons/themes/${s.userPreferences.theme}-theme.png`),s.app.update(),document.getElementById("header-theme-sel-icon").style.opacity="1"}),200)}_((()=>{document.getElementById("header-theme-sel-icon").setAttribute("src",`public/assets/icons/themes/${s.userPreferences.theme}-theme.png`)}));return e.$$set=e=>{"core"in e&&n(1,s=e.core)},[a,s,()=>{a()}]}class U extends J{constructor(e){super(),N(this,e,K,R,i,{core:1})}}function X(e){let t,n,a,i,o,c,l,p,$,b,w,y,_,T,x,k,M,D,z,C,I;return o=new F({props:{id:"home",name:"Home",selected_page:e[1]}}),l=new F({props:{id:"world",name:"Welt",selected_page:e[1]}}),$=new F({props:{id:"germany",name:"Deutschland",selected_page:e[1]}}),w=new F({props:{id:"states",name:"Bundesländer",selected_page:e[1]}}),_=new F({props:{id:"districts",name:"Landkreise",selected_page:e[1]}}),D=new U({props:{core:e[2]}}),{c(){t=v("div"),n=v("div"),n.innerHTML='<img class="icon svelte-cv842i" alt="[Icon]" src="public/favicon.png"/> \n        <b class="title svelte-cv842i">Covid Dashboard</b>',a=g(),i=v("div"),Z(o.$$.fragment),c=g(),Z(l.$$.fragment),p=g(),Z($.$$.fragment),b=g(),Z(w.$$.fragment),y=g(),Z(_.$$.fragment),x=g(),k=v("div"),k.innerHTML='<span class="nav-icon-bar svelte-cv842i"></span> \n        <span class="nav-icon-bar svelte-cv842i"></span> \n        <span class="nav-icon-bar svelte-cv842i"></span>',M=g(),Z(D.$$.fragment),f(n,"class","icon-block svelte-cv842i"),f(i,"class",T=r(e[0]?"navigator-block visible":"navigator-block")+" svelte-cv842i"),f(k,"class","navigator-icon svelte-cv842i"),f(t,"class","header svelte-cv842i")},m(s,r){u(s,t,r),d(t,n),d(t,a),d(t,i),Q(o,i,null),d(i,c),Q(l,i,null),d(i,p),Q($,i,null),d(i,b),Q(w,i,null),d(i,y),Q(_,i,null),d(t,x),d(t,k),d(t,M),Q(D,t,null),z=!0,C||(I=[h(n,"click",e[3]),h(i,"click",e[4]),h(k,"click",e[5])],C=!0)},p(e,[t]){const n={};2&t&&(n.selected_page=e[1]),o.$set(n);const s={};2&t&&(s.selected_page=e[1]),l.$set(s);const a={};2&t&&(a.selected_page=e[1]),$.$set(a);const c={};2&t&&(c.selected_page=e[1]),w.$set(c);const d={};2&t&&(d.selected_page=e[1]),_.$set(d),(!z||1&t&&T!==(T=r(e[0]?"navigator-block visible":"navigator-block")+" svelte-cv842i"))&&f(i,"class",T);const u={};4&t&&(u.core=e[2]),D.$set(u)},i(e){z||(A(o.$$.fragment,e),A(l.$$.fragment,e),A($.$$.fragment,e),A(w.$$.fragment,e),A(_.$$.fragment,e),A(D.$$.fragment,e),z=!0)},o(e){H(o.$$.fragment,e),H(l.$$.fragment,e),H($.$$.fragment,e),H(w.$$.fragment,e),H(_.$$.fragment,e),H(D.$$.fragment,e),z=!1},d(e){e&&m(t),S(o),S(l),S($),S(w),S(_),S(D),C=!1,s(I)}}}function Y(e,t,n){let{page:s=""}=t,{core:a}=t,{showNavigator:i=!1}=t;return e.$$set=e=>{"page"in e&&n(1,s=e.page),"core"in e&&n(2,a=e.core),"showNavigator"in e&&n(0,i=e.showNavigator)},[i,s,a,()=>{window.location.href=""},()=>{n(0,i=!1)},()=>{n(0,i=!i)}]}class ee extends J{constructor(e){super(),N(this,e,Y,X,i,{page:1,core:2,showNavigator:0})}}function te(t){let n,a,i,o,c,l,r,p,$,b,w,y,_,T,x,k;return{c(){n=v("div"),a=v("div"),a.innerHTML='<b class="info-message svelte-1btxb0s">Die aktuellen Covid-19 Zahlen und Statistiken aus Deutschland</b>',i=g(),o=v("div"),c=v("div"),c.innerHTML='<b class="title svelte-1btxb0s">Navigator</b>',l=g(),r=v("div"),p=v("div"),p.innerHTML='<div class="item-box svelte-1btxb0s"><b class="item-name svelte-1btxb0s">Welt</b></div>',$=g(),b=v("div"),b.innerHTML='<div class="item-box svelte-1btxb0s"><b class="item-name svelte-1btxb0s">Deutschland</b></div>',w=g(),y=v("div"),y.innerHTML='<div class="item-box svelte-1btxb0s"><b class="item-name svelte-1btxb0s">Bundesländer</b></div>',_=g(),T=v("div"),T.innerHTML='<div class="item-box svelte-1btxb0s"><b class="item-name svelte-1btxb0s">Landkreise</b></div>',f(a,"class","landing-banner svelte-1btxb0s"),f(c,"class","header svelte-1btxb0s"),f(p,"class","item svelte-1btxb0s"),f(b,"class","item svelte-1btxb0s"),f(y,"class","item svelte-1btxb0s"),f(T,"class","item svelte-1btxb0s"),f(r,"class","item-list svelte-1btxb0s"),f(o,"class","quick-navigator svelte-1btxb0s"),f(n,"class","home-page svelte-1btxb0s")},m(e,s){u(e,n,s),d(n,a),d(n,i),d(n,o),d(o,c),d(o,l),d(o,r),d(r,p),d(r,$),d(r,b),d(r,w),d(r,y),d(r,_),d(r,T),x||(k=[h(p,"click",t[0]),h(b,"click",t[1]),h(y,"click",t[2]),h(T,"click",t[3])],x=!0)},p:e,i:e,o:e,d(e){e&&m(n),x=!1,s(k)}}}function ne(e){return[()=>{window.location.href="#world"},()=>{window.location.href="#germany"},()=>{window.location.href="#states"},()=>{window.location.href="#districts"}]}class se extends J{constructor(e){super(),N(this,e,ne,te,i,{})}}class ae{constructor(){}getCache(){try{return JSON.parse(window.localStorage.getItem("dashboard.api.cache"))||{}}catch(e){return this.setCache({}),{}}}setCache(e){window.localStorage.setItem("dashboard.api.cache",JSON.stringify(e))}setCacheItem(e,t){let n=this.getCache();n[e]=t,this.setCache(n)}async fetchGermany(){var e,t,n,s,a;let i;return"germany"in this.getCache()?i=this.getCache().germany:(i=await(await fetch("https://api.corona-zahlen.org/germany")).json(),this.setCacheItem("germany",i)),{cases:i.cases||0,deaths:i.deaths||0,recovered:i.recovered||0,cases7Days:i.casesPerWeek||0,weekIncidence:i.weekIncidence||0,deltaCases:(null===(e=i.delta)||void 0===e?void 0:e.cases)||0,deltaDeaths:(null===(t=i.delta)||void 0===t?void 0:t.deaths)||0,deltaRecovered:(null===(n=i.delta)||void 0===n?void 0:n.recovered)||0,hospitalizationIncidence:null===(s=i.hospitalization)||void 0===s?void 0:s.incidence7Days,hospitalizationCases:null===(a=i.hospitalization)||void 0===a?void 0:a.cases7Days}}async fetchGermanyVaccinations(){var e,t,n,s,a,i,o,c,l,r,d,u,m,v,p,g,h,f,$,b,w,y,_,T,x,k,M,D,z,C,I;let V;return"germany-vaccinations"in this.getCache()?V=this.getCache()["germany-vaccinations"]:(V=await(await fetch("https://api.corona-zahlen.org/vaccinations")).json(),this.setCacheItem("germany-vaccinations",V)),{vaccinated:(null===(e=V.data)||void 0===e?void 0:e.vaccinated)||0,secondVaccinations:(null===(n=null===(t=V.data)||void 0===t?void 0:t.secondVaccination)||void 0===n?void 0:n.vaccinated)||0,administered:(null===(s=V.data)||void 0===s?void 0:s.administered)||0,quote:(null===(a=V.data)||void 0===a?void 0:a.quote)||0,secondVaccinationQuote:(null===(o=null===(i=V.data)||void 0===i?void 0:i.secondVaccination)||void 0===o?void 0:o.quote)||0,boosterVaccinations:(null===(l=null===(c=V.data)||void 0===c?void 0:c.boosterVaccination)||void 0===l?void 0:l.vaccinated)||0,boosterVaccinationQuote:(null===(d=null===(r=V.data)||void 0===r?void 0:r.boosterVaccination)||void 0===d?void 0:d.quote)||0,dosesBiontech:(null===(m=null===(u=V.data)||void 0===u?void 0:u.vaccination)||void 0===m?void 0:m.biontech)||0,dosesModerna:(null===(p=null===(v=V.data)||void 0===v?void 0:v.vaccination)||void 0===p?void 0:p.moderna)||0,dosesAstraZeneca:(null===(h=null===(g=V.data)||void 0===g?void 0:g.vaccination)||void 0===h?void 0:h.astraZeneca)||0,dosesJanssen:(null===($=null===(f=V.data)||void 0===f?void 0:f.vaccination)||void 0===$?void 0:$.janssen)||0,boosterDosesBiontech:(null===(y=null===(w=null===(b=V.data)||void 0===b?void 0:b.boosterVaccination)||void 0===w?void 0:w.vaccination)||void 0===y?void 0:y.biontech)||0,boosterDosesModerna:(null===(x=null===(T=null===(_=V.data)||void 0===_?void 0:_.boosterVaccination)||void 0===T?void 0:T.vaccination)||void 0===x?void 0:x.moderna)||0,boosterDosesAstraZeneca:(null===(D=null===(M=null===(k=V.data)||void 0===k?void 0:k.boosterVaccination)||void 0===M?void 0:M.vaccination)||void 0===D?void 0:D.astraZeneca)||0,boosterDosesJanssen:(null===(I=null===(C=null===(z=V.data)||void 0===z?void 0:z.boosterVaccination)||void 0===C?void 0:C.vaccination)||void 0===I?void 0:I.janssen)||0}}async fetchTestData(){var e;let t;"germany-tests"in this.getCache()?t=this.getCache()["germany-tests"]:(t=await(await fetch("https://api.corona-zahlen.org/testing/history/")).json(),this.setCacheItem("germany-tests",t));let n=((null===(e=t.data)||void 0===e?void 0:e.history)||[]).reverse()[0]||{};return{calendarWeek:n.calendarWeek||"",performedTest:n.performedTests||0,positiveTests:n.positiveTests||0,laboratoryCount:n.laboratoryCount||0}}}function ie(){return"light"===window.localStorage.getItem("dashboard.preferences.theme")?"light":"dark"}function oe(){switch(window.location.hash){case"#world":return"world";case"#germany":return"germany";case"#states":return"states";case"#districts":return"districts";default:return"home"}}function ce(e){let t=Math.floor(100*e)/100;var n=t.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");return null!=t.toString().split(".")[1]&&(n=n+","+t.toString().split(".")[1]),n}function le(e){let t,n,s,a=ce(e[1])+"";return{c(){t=v("b"),n=p("+"),s=p(a),f(t,"class","delta svelte-llv9le")},m(e,a){u(e,t,a),d(t,n),d(t,s)},p(e,t){2&t&&a!==(a=ce(e[1])+"")&&$(s,a)},d(e){e&&m(t)}}}function re(t){let n,s,a,i,o,c,r,h,b,w,y,_,T,x,k,M,D,z=ce(t[0])+"",C=null!=t[1]&&le(t);return{c(){n=v("div"),s=v("div"),a=v("div"),i=v("img"),c=g(),r=v("div"),h=v("div"),b=v("b"),w=p(t[3]),y=g(),_=v("div"),T=v("b"),x=p(z),k=p(t[5]),D=g(),C&&C.c(),l(i.src,o=t[2])||f(i,"src",o),f(i,"class","item-icon svelte-llv9le"),f(i,"alt",""),f(a,"class","icon-section svelte-llv9le"),f(b,"class","item-title svelte-llv9le"),f(h,"class","title-section svelte-llv9le"),f(T,"class","item-value svelte-llv9le"),f(T,"style",M=""==t[4]?"":`color: ${t[4]}`),f(_,"class","value-section svelte-llv9le"),f(r,"class","content-section svelte-llv9le"),f(s,"class","item svelte-llv9le"),f(n,"class","item-box svelte-llv9le")},m(e,t){u(e,n,t),d(n,s),d(s,a),d(a,i),d(s,c),d(s,r),d(r,h),d(h,b),d(b,w),d(r,y),d(r,_),d(_,T),d(T,x),d(T,k),d(_,D),C&&C.m(_,null)},p(e,[t]){4&t&&!l(i.src,o=e[2])&&f(i,"src",o),8&t&&$(w,e[3]),1&t&&z!==(z=ce(e[0])+"")&&$(x,z),32&t&&$(k,e[5]),16&t&&M!==(M=""==e[4]?"":`color: ${e[4]}`)&&f(T,"style",M),null!=e[1]?C?C.p(e,t):(C=le(e),C.c(),C.m(_,null)):C&&(C.d(1),C=null)},i:e,o:e,d(e){e&&m(n),C&&C.d()}}}function de(e,t,n){let{value:s=0}=t,{delta:a=null}=t,{icon_src:i=""}=t,{name:o=""}=t,{color:c=""}=t,{unit:l=""}=t;return e.$$set=e=>{"value"in e&&n(0,s=e.value),"delta"in e&&n(1,a=e.delta),"icon_src"in e&&n(2,i=e.icon_src),"name"in e&&n(3,o=e.name),"color"in e&&n(4,c=e.color),"unit"in e&&n(5,l=e.unit)},[s,a,i,o,c,l]}class ue extends J{constructor(e){super(),N(this,e,de,re,i,{value:0,delta:1,icon_src:2,name:3,color:4,unit:5})}}function me(t){let n,s,a,i,o,c,l,r,p,h,$,w,y,_,T,x;return{c(){n=v("div"),s=v("div"),a=v("div"),a.innerHTML='<img class="item-icon svelte-wa4g98" src="public/assets/icons/light/distribution.png" alt=""/> \n            <b class="item-title svelte-wa4g98">Impfdosen</b>',i=g(),o=v("div"),c=v("div"),c.innerHTML='<div class="legend-item svelte-wa4g98"><span class="item-color-preview biontech svelte-wa4g98"></span> \n                    <b class="item-name svelte-wa4g98">Biontech</b></div> \n\n                <div class="legend-item svelte-wa4g98"><span class="item-color-preview moderna svelte-wa4g98"></span> \n                    <b class="item-name svelte-wa4g98">Moderna</b></div> \n\n                <div class="legend-item svelte-wa4g98"><span class="item-color-preview astrazeneca svelte-wa4g98"></span> \n                    <b class="item-name svelte-wa4g98">AstraZeneca</b></div> \n\n                <div class="legend-item svelte-wa4g98"><span class="item-color-preview janssen svelte-wa4g98"></span> \n                    <b class="item-name svelte-wa4g98">Janssen</b></div>',l=g(),r=v("div"),p=v("div"),h=v("span"),$=g(),w=v("span"),y=g(),_=v("span"),T=g(),x=v("span"),f(a,"class","title-section svelte-wa4g98"),f(c,"class","legend svelte-wa4g98"),f(h,"class","dose-segment biontech svelte-wa4g98"),b(h,"width",t[0]+"%"),f(w,"class","dose-segment moderna svelte-wa4g98"),b(w,"width",t[1]+"%"),f(_,"class","dose-segment astrazeneca svelte-wa4g98"),b(_,"width",t[2]+"%"),f(x,"class","dose-segment janssen svelte-wa4g98"),b(x,"width",t[3]+"%"),f(p,"class","distribution-chart svelte-wa4g98"),f(r,"class","distribution-chart-container svelte-wa4g98"),f(o,"class","value-section svelte-wa4g98"),f(s,"class","item svelte-wa4g98"),f(n,"class","item-box svelte-wa4g98")},m(e,t){u(e,n,t),d(n,s),d(s,a),d(s,i),d(s,o),d(o,c),d(o,l),d(o,r),d(r,p),d(p,h),d(p,$),d(p,w),d(p,y),d(p,_),d(p,T),d(p,x)},p(e,[t]){1&t&&b(h,"width",e[0]+"%"),2&t&&b(w,"width",e[1]+"%"),4&t&&b(_,"width",e[2]+"%"),8&t&&b(x,"width",e[3]+"%")},i:e,o:e,d(e){e&&m(n)}}}function ve(e,t,n){let s=0,a=0,i=0,o=0,{doses_biontech:c=0,doses_moderna:l=0,doses_astrazeneca:r=0,doses_janssen:d=0}=t;var u;return _((()=>{})),u=()=>{!function(){let e=Math.max(c+l+r+d,1);n(0,s=c/e*100),n(1,a=l/e*100),n(2,i=r/e*100),n(3,o=d/e*100)}()},y().$$.after_update.push(u),e.$$set=e=>{"doses_biontech"in e&&n(4,c=e.doses_biontech),"doses_moderna"in e&&n(5,l=e.doses_moderna),"doses_astrazeneca"in e&&n(6,r=e.doses_astrazeneca),"doses_janssen"in e&&n(7,d=e.doses_janssen)},[s,a,i,o,c,l,r,d]}class pe extends J{constructor(e){super(),N(this,e,ve,me,i,{doses_biontech:4,doses_moderna:5,doses_astrazeneca:6,doses_janssen:7})}}function ge(e){let t=Math.min(Math.max(e/400,0),1);return`hsl(${(Math.min(115,0)-Math.max(115,0))*t+Math.max(115,0)}, 61%, 55%)`}function he(e){let t=Math.min(Math.max(e/33e4,0),1);return`hsl(${(Math.min(115,0)-Math.max(115,0))*t+Math.max(115,0)}, 61%, 55%)`}function fe(e){let t=Math.min(Math.max(e/8,0),1);return`hsl(${(Math.min(115,0)-Math.max(115,0))*t+Math.max(115,0)}, 61%, 55%)`}function $e(e){let t=Math.min(Math.max(e/25,0),1);return`hsl(${(Math.min(115,0)-Math.max(115,0))*t+Math.max(115,0)}, 61%, 55%)`}function be(e){let t,n,s,a,i,o,c,l,r,p,h,$,w,y,_,T,x,k,M,D,z,C,I,V,q,B,E,j,L,P,G,N,J,W,O,F,R,K,U,X,Y,ee,te,ne,se,ae,ie,oe,ce,le,re,de;return r=new ue({props:{name:"7-Tage-Inzidenz",icon_src:"public/assets/icons/"+e[3].iconTheme+"/7-day-incidence.svg",value:e[0].weekIncidence,color:ge(e[0].weekIncidence)}}),h=new ue({props:{name:"Fälle 7 Tage",icon_src:"public/assets/icons/"+e[3].iconTheme+"/covid.png",value:e[0].cases7Days,color:he(e[0].cases7Days)}}),w=new ue({props:{name:"Hospitalisierungs-Inzidenz",icon_src:"public/assets/icons/"+e[3].iconTheme+"/hospitalization.png",value:e[0].hospitalizationIncidence,color:fe(e[0].hospitalizationIncidence)}}),_=new ue({props:{name:"Fälle Gesamt",icon_src:"public/assets/icons/"+e[3].iconTheme+"/covid.png",value:e[0].cases,delta:e[0].deltaCases}}),x=new ue({props:{name:"Tode Gesamt",icon_src:"public/assets/icons/"+e[3].iconTheme+"/death.png",value:e[0].deaths,delta:e[0].deltaDeaths}}),M=new ue({props:{name:"Genesene Gesamt",icon_src:"public/assets/icons/"+e[3].iconTheme+"/recovered.png",value:e[0].recovered,delta:e[0].deltaRecovered}}),E=new ue({props:{name:"Erstimpfung",icon_src:"public/assets/icons/"+e[3].iconTheme+"/vaccination.png",value:e[1].vaccinated}}),L=new ue({props:{name:"Zweitimpfung",icon_src:"public/assets/icons/"+e[3].iconTheme+"/vaccination.png",value:e[1].secondVaccinations}}),G=new ue({props:{name:"Boosterimpfung",icon_src:"public/assets/icons/"+e[3].iconTheme+"/booster.png",value:e[1].boosterVaccinations}}),J=new ue({props:{name:"Erstimpfung-Quote",icon_src:"public/assets/icons/"+e[3].iconTheme+"/quote.png",value:100*e[1].quote,unit:"%"}}),O=new ue({props:{name:"Zweitimpfung-Quote",icon_src:"public/assets/icons/"+e[3].iconTheme+"/quote.png",value:100*e[1].secondVaccinationQuote,unit:"%"}}),R=new ue({props:{name:"Boosterimpfung-Quote",icon_src:"public/assets/icons/"+e[3].iconTheme+"/quote.png",value:100*e[1].boosterVaccinationQuote,unit:"%"}}),U=new pe({props:{doses_biontech:e[1].dosesBiontech,doses_moderna:e[1].dosesModerna,doses_astrazeneca:e[1].dosesAstraZeneca,doses_janssen:e[1].dosesJanssen}}),ie=new ue({props:{name:"Durchgeführte Tests",icon_src:"public/assets/icons/"+e[3].iconTheme+"/tests.png",value:e[2].performedTest}}),ce=new ue({props:{name:"Positive Tests",icon_src:"public/assets/icons/"+e[3].iconTheme+"/tests.png",value:e[2].positiveTests}}),re=new ue({props:{name:"Postitivitätsrate",icon_src:"public/assets/icons/"+e[3].iconTheme+"/quote.png",value:e[2].positiveTests/e[2].performedTest*100,unit:"%",color:$e(e[2].positiveTests/e[2].performedTest*100)}}),{c(){t=v("div"),n=v("div"),s=v("div"),a=v("b"),a.textContent="Fälle",i=g(),o=v("span"),c=g(),l=v("div"),Z(r.$$.fragment),p=g(),Z(h.$$.fragment),$=g(),Z(w.$$.fragment),y=g(),Z(_.$$.fragment),T=g(),Z(x.$$.fragment),k=g(),Z(M.$$.fragment),D=g(),z=v("div"),C=v("b"),C.textContent="Impfungen",I=g(),V=v("span"),q=g(),B=v("div"),Z(E.$$.fragment),j=g(),Z(L.$$.fragment),P=g(),Z(G.$$.fragment),N=g(),Z(J.$$.fragment),W=g(),Z(O.$$.fragment),F=g(),Z(R.$$.fragment),K=g(),Z(U.$$.fragment),X=g(),Y=v("div"),ee=v("b"),ee.textContent="Tests",te=g(),ne=v("span"),se=g(),ae=v("div"),Z(ie.$$.fragment),oe=g(),Z(ce.$$.fragment),le=g(),Z(re.$$.fragment),f(a,"class","category-name svelte-ol5yuk"),f(o,"class","title-underline svelte-ol5yuk"),f(l,"class","item-container size-6 svelte-ol5yuk"),f(s,"class","category svelte-ol5yuk"),f(C,"class","category-name svelte-ol5yuk"),f(V,"class","title-underline svelte-ol5yuk"),f(B,"class","item-container size-5 svelte-ol5yuk"),f(z,"class","category svelte-ol5yuk"),f(ee,"class","category-name svelte-ol5yuk"),f(ne,"class","title-underline svelte-ol5yuk"),f(ae,"class","item-container size-3 svelte-ol5yuk"),f(Y,"class","category tests-category svelte-ol5yuk"),b(Y,"padding-bottom","60px"),f(n,"class","categories svelte-ol5yuk"),f(t,"class","germany-page svelte-ol5yuk")},m(e,m){u(e,t,m),d(t,n),d(n,s),d(s,a),d(s,i),d(s,o),d(s,c),d(s,l),Q(r,l,null),d(l,p),Q(h,l,null),d(l,$),Q(w,l,null),d(l,y),Q(_,l,null),d(l,T),Q(x,l,null),d(l,k),Q(M,l,null),d(n,D),d(n,z),d(z,C),d(z,I),d(z,V),d(z,q),d(z,B),Q(E,B,null),d(B,j),Q(L,B,null),d(B,P),Q(G,B,null),d(B,N),Q(J,B,null),d(B,W),Q(O,B,null),d(B,F),Q(R,B,null),d(B,K),Q(U,B,null),d(n,X),d(n,Y),d(Y,ee),d(Y,te),d(Y,ne),d(Y,se),d(Y,ae),Q(ie,ae,null),d(ae,oe),Q(ce,ae,null),d(ae,le),Q(re,ae,null),de=!0},p(e,[t]){const n={};8&t&&(n.icon_src="public/assets/icons/"+e[3].iconTheme+"/7-day-incidence.svg"),1&t&&(n.value=e[0].weekIncidence),1&t&&(n.color=ge(e[0].weekIncidence)),r.$set(n);const s={};8&t&&(s.icon_src="public/assets/icons/"+e[3].iconTheme+"/covid.png"),1&t&&(s.value=e[0].cases7Days),1&t&&(s.color=he(e[0].cases7Days)),h.$set(s);const a={};8&t&&(a.icon_src="public/assets/icons/"+e[3].iconTheme+"/hospitalization.png"),1&t&&(a.value=e[0].hospitalizationIncidence),1&t&&(a.color=fe(e[0].hospitalizationIncidence)),w.$set(a);const i={};8&t&&(i.icon_src="public/assets/icons/"+e[3].iconTheme+"/covid.png"),1&t&&(i.value=e[0].cases),1&t&&(i.delta=e[0].deltaCases),_.$set(i);const o={};8&t&&(o.icon_src="public/assets/icons/"+e[3].iconTheme+"/death.png"),1&t&&(o.value=e[0].deaths),1&t&&(o.delta=e[0].deltaDeaths),x.$set(o);const c={};8&t&&(c.icon_src="public/assets/icons/"+e[3].iconTheme+"/recovered.png"),1&t&&(c.value=e[0].recovered),1&t&&(c.delta=e[0].deltaRecovered),M.$set(c);const l={};8&t&&(l.icon_src="public/assets/icons/"+e[3].iconTheme+"/vaccination.png"),2&t&&(l.value=e[1].vaccinated),E.$set(l);const d={};8&t&&(d.icon_src="public/assets/icons/"+e[3].iconTheme+"/vaccination.png"),2&t&&(d.value=e[1].secondVaccinations),L.$set(d);const u={};8&t&&(u.icon_src="public/assets/icons/"+e[3].iconTheme+"/booster.png"),2&t&&(u.value=e[1].boosterVaccinations),G.$set(u);const m={};8&t&&(m.icon_src="public/assets/icons/"+e[3].iconTheme+"/quote.png"),2&t&&(m.value=100*e[1].quote),J.$set(m);const v={};8&t&&(v.icon_src="public/assets/icons/"+e[3].iconTheme+"/quote.png"),2&t&&(v.value=100*e[1].secondVaccinationQuote),O.$set(v);const p={};8&t&&(p.icon_src="public/assets/icons/"+e[3].iconTheme+"/quote.png"),2&t&&(p.value=100*e[1].boosterVaccinationQuote),R.$set(p);const g={};2&t&&(g.doses_biontech=e[1].dosesBiontech),2&t&&(g.doses_moderna=e[1].dosesModerna),2&t&&(g.doses_astrazeneca=e[1].dosesAstraZeneca),2&t&&(g.doses_janssen=e[1].dosesJanssen),U.$set(g);const f={};8&t&&(f.icon_src="public/assets/icons/"+e[3].iconTheme+"/tests.png"),4&t&&(f.value=e[2].performedTest),ie.$set(f);const $={};8&t&&($.icon_src="public/assets/icons/"+e[3].iconTheme+"/tests.png"),4&t&&($.value=e[2].positiveTests),ce.$set($);const b={};8&t&&(b.icon_src="public/assets/icons/"+e[3].iconTheme+"/quote.png"),4&t&&(b.value=e[2].positiveTests/e[2].performedTest*100),4&t&&(b.color=$e(e[2].positiveTests/e[2].performedTest*100)),re.$set(b)},i(e){de||(A(r.$$.fragment,e),A(h.$$.fragment,e),A(w.$$.fragment,e),A(_.$$.fragment,e),A(x.$$.fragment,e),A(M.$$.fragment,e),A(E.$$.fragment,e),A(L.$$.fragment,e),A(G.$$.fragment,e),A(J.$$.fragment,e),A(O.$$.fragment,e),A(R.$$.fragment,e),A(U.$$.fragment,e),A(ie.$$.fragment,e),A(ce.$$.fragment,e),A(re.$$.fragment,e),de=!0)},o(e){H(r.$$.fragment,e),H(h.$$.fragment,e),H(w.$$.fragment,e),H(_.$$.fragment,e),H(x.$$.fragment,e),H(M.$$.fragment,e),H(E.$$.fragment,e),H(L.$$.fragment,e),H(G.$$.fragment,e),H(J.$$.fragment,e),H(O.$$.fragment,e),H(R.$$.fragment,e),H(U.$$.fragment,e),H(ie.$$.fragment,e),H(ce.$$.fragment,e),H(re.$$.fragment,e),de=!1},d(e){e&&m(t),S(r),S(h),S(w),S(_),S(x),S(M),S(E),S(L),S(G),S(J),S(O),S(R),S(U),S(ie),S(ce),S(re)}}}function we(e,t,n){let{core:s}=t,{data:a={weekIncidence:0,cases7Days:0,hospitalizationIncidence:0,hospitalizationCases:0,cases:0,deaths:0,recovered:0,deltaCases:0,deltaDeaths:0,deltaRecovered:0}}=t,{vaccinations:i={vaccinated:0,secondVaccinations:0,boosterVaccinations:0,administered:0,quote:0,secondVaccinationQuote:0,boosterVaccinationQuote:0,dosesBiontech:0,dosesModerna:0,dosesAstraZeneca:0,dosesJanssen:0,boosterDosesBiontech:0,boosterDosesModerna:0,boosterDosesAstraZeneca:0,boosterDosesJanssen:0}}=t,{tests:o={calendarWeek:"",performedTest:0,positiveTests:0,laboratoryCount:0}}=t;return _((async()=>{n(0,a=await s.api.fetchGermany()),n(1,i=await s.api.fetchGermanyVaccinations()),n(2,o=await s.api.fetchTestData()),console.log(i)})),e.$$set=e=>{"core"in e&&n(3,s=e.core),"data"in e&&n(0,a=e.data),"vaccinations"in e&&n(1,i=e.vaccinations),"tests"in e&&n(2,o=e.tests)},[a,i,o,s]}class ye extends J{constructor(e){super(),N(this,e,we,be,i,{core:3,data:0,vaccinations:1,tests:2})}}function _e(e){let t,n;return t=new se({}),{c(){Z(t.$$.fragment)},m(e,s){Q(t,e,s),n=!0},i(e){n||(A(t.$$.fragment,e),n=!0)},o(e){H(t.$$.fragment,e),n=!1},d(e){S(t,e)}}}function Te(e){let t,n;return t=new ye({props:{core:e[1]}}),{c(){Z(t.$$.fragment)},m(e,s){Q(t,e,s),n=!0},p(e,n){const s={};2&n&&(s.core=e[1]),t.$set(s)},i(e){n||(A(t.$$.fragment,e),n=!0)},o(e){H(t.$$.fragment,e),n=!1},d(e){S(t,e)}}}function xe(e){let t,n,s,a,i,o,c,l;i=new ee({props:{page:e[0],core:e[1]}});let r="home"==e[0]&&_e(),p="germany"==e[0]&&Te(e);return{c(){t=v("main"),n=v("link"),a=g(),Z(i.$$.fragment),o=g(),r&&r.c(),c=g(),p&&p.c(),f(n,"rel","stylesheet"),f(n,"href",s="public/assets/themes/"+e[1].userPreferences.theme+".css"),f(n,"id","theme-loader"),f(t,"class","svelte-ifx5fi")},m(e,s){u(e,t,s),d(t,n),d(t,a),Q(i,t,null),d(t,o),r&&r.m(t,null),d(t,c),p&&p.m(t,null),l=!0},p(e,[a]){(!l||2&a&&s!==(s="public/assets/themes/"+e[1].userPreferences.theme+".css"))&&f(n,"href",s);const o={};1&a&&(o.page=e[0]),2&a&&(o.core=e[1]),i.$set(o),"home"==e[0]?r?1&a&&A(r,1):(r=_e(),r.c(),A(r,1),r.m(t,c)):r&&(L(),H(r,1,1,(()=>{r=null})),P()),"germany"==e[0]?p?(p.p(e,a),1&a&&A(p,1)):(p=Te(e),p.c(),A(p,1),p.m(t,null)):p&&(L(),H(p,1,1,(()=>{p=null})),P())},i(e){l||(A(i.$$.fragment,e),A(r),A(p),l=!0)},o(e){H(i.$$.fragment,e),H(r),H(p),l=!1},d(e){e&&m(t),S(i),r&&r.d(),p&&p.d()}}}function ke(e,t,n){let{page:s="home"}=t,{core:a}=t;return _((()=>{window.addEventListener("hashchange",(()=>{n(0,s=oe())}))})),e.$$set=e=>{"page"in e&&n(0,s=e.page),"core"in e&&n(1,a=e.core)},[s,a,function(){n(1,a)}]}let Me=new class{constructor(){this.api=new ae,this.userPreferences={theme:ie()}}get iconTheme(){return"dark"==this.userPreferences.theme?"light":"dark"}async fetchData(){this.germanyData=await this.api.fetchGermany(),this.germanyVaccinationData=await this.api.fetchGermanyVaccinations(),this.germanyTestData=await this.api.fetchTestData(),console.log(this.germanyData,this.germanyVaccinationData)}};Me.fetchData();const De=new class extends J{constructor(e){super(),N(this,e,ke,xe,i,{page:0,core:1,update:2})}get update(){return this.$$.ctx[2]}}({target:document.body,props:{page:oe(),core:Me}});return Me.app=De,De}();
//# sourceMappingURL=bundle.js.map
