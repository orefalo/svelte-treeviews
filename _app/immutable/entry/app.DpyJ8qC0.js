const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_app/immutable/nodes/0.Czyhslsh.js","_app/immutable/chunks/external.iwCWfrb3.js","_app/immutable/assets/0.LEWtMjZZ.css","_app/immutable/nodes/1.C0E6soEY.js","_app/immutable/nodes/2.C93SzJvU.js","_app/immutable/nodes/3.CC-MPtip.js","_app/immutable/chunks/svelte-treeviews.BJ1TO8xG.js","_app/immutable/assets/svelte-treeviews.m_DJPNLI.css","_app/immutable/nodes/4.D7nlrYsg.js","_app/immutable/nodes/5.CuJx4dpa.js"])))=>i.map(i=>d[i]);
import{p as q,a as R,O as B,u as z,o as Q,g as d,e as x,P as W,b as F,n as w,i as L,m as k,Q as A,h as f,l as G,j as H,k as V,s as O,B as D,f as S,r as J,R as K,t as X,D as Y,w as Z,S as N}from"../chunks/external.iwCWfrb3.js";const M="modulepreload",$=function(u){return"/svelte-treeviews/"+u},I={},v=function(e,n,P){let h=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),r=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));h=Promise.allSettled(n.map(a=>{if(a=$(a),a in I)return;I[a]=!0;const l=a.endsWith(".css"),b=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${b}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":M,l||(i.as="script"),i.crossOrigin="",i.href=a,r&&i.setAttribute("nonce",r),document.head.appendChild(i),l)return new Promise((c,o)=>{i.addEventListener("load",c),i.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${a}`)))})}))}function _(t){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t}return h.then(t=>{for(const r of t||[])r.status==="rejected"&&_(r.reason);return e().catch(_)})},se={};var ee=V('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),te=V("<!> <!>",1);function re(u,e){q(e,!0);let n=R(e,"components",23,()=>[]),P=R(e,"data_0",3,null),h=R(e,"data_1",3,null);B(()=>e.stores.page.set(e.page)),z(()=>{e.stores,e.page,e.constructors,n(),e.form,P(),h(),e.stores.page.notify()});let _=O(!1),t=O(!1),r=O(null);Q(()=>{const c=e.stores.page.subscribe(()=>{d(_)&&(x(t,!0),W().then(()=>{x(r,F(document.title||"untitled page"))}))});return x(_,!0),c});const a=D(()=>e.constructors[1]);var l=te(),b=w(l);L(b,()=>e.constructors[1],c=>{var o=k();const g=D(()=>e.constructors[0]);var E=w(o);A(E,()=>d(g),(m,p)=>{S(p(m,{get data(){return P()},get form(){return e.form},children:(s,ne)=>{var T=k(),C=w(T);A(C,()=>d(a),(U,j)=>{S(j(U,{get data(){return h()},get form(){return e.form}}),y=>n()[1]=y,()=>{var y;return(y=n())==null?void 0:y[1]})}),f(s,T)},$$slots:{default:!0}}),s=>n()[0]=s,()=>{var s;return(s=n())==null?void 0:s[0]})}),f(c,o)},c=>{var o=k();const g=D(()=>e.constructors[0]);var E=w(o);A(E,()=>d(g),(m,p)=>{S(p(m,{get data(){return P()},get form(){return e.form}}),s=>n()[0]=s,()=>{var s;return(s=n())==null?void 0:s[0]})}),f(c,o)});var i=G(b,2);L(i,()=>d(_),c=>{var o=ee(),g=J(o);L(g,()=>d(t),E=>{var m=K();X(()=>Y(m,d(r))),f(E,m)}),Z(o),f(c,o)}),f(u,l),H()}const ae=N(re),ie=[()=>v(()=>import("../nodes/0.Czyhslsh.js"),__vite__mapDeps([0,1,2])),()=>v(()=>import("../nodes/1.C0E6soEY.js"),__vite__mapDeps([3,1])),()=>v(()=>import("../nodes/2.C93SzJvU.js"),__vite__mapDeps([4,1])),()=>v(()=>import("../nodes/3.CC-MPtip.js"),__vite__mapDeps([5,1,6,7])),()=>v(()=>import("../nodes/4.D7nlrYsg.js"),__vite__mapDeps([8,1,6,7])),()=>v(()=>import("../nodes/5.CuJx4dpa.js"),__vite__mapDeps([9,1]))],ce=[],le={"/":[2],"/examples/basictree":[3],"/examples/dnd":[4],"/minified-size":[5]},de={handleError:({error:u})=>{console.error(u)},reroute:()=>{}};export{le as dictionary,de as hooks,se as matchers,ie as nodes,ae as root,ce as server_loads};