const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_app/immutable/nodes/0.l-djgUgX.js","_app/immutable/chunks/external.CNQxPKoL.js","_app/immutable/assets/0.LEWtMjZZ.css","_app/immutable/nodes/1.5PvnfYsp.js","_app/immutable/nodes/2.1bOCw1hN.js","_app/immutable/nodes/3.r2eWS5PW.js","_app/immutable/chunks/svelte-treeviews.DU3K5w9q.js","_app/immutable/assets/svelte-treeviews.DbPaOt-3.css","_app/immutable/nodes/4.D5djq27X.js"])))=>i.map(i=>d[i]);
import{p as q,a as p,b as T,L as z,u as B,o as F,g as y,d as w,M as W,y as P,i as x,x as L,N as k,k as _,h as C,l as j,m as I,s as R,e as A,f as G,O as H,t as J,F as K,r as N,P as Q}from"../chunks/external.CNQxPKoL.js";const X="modulepreload",Y=function(u){return"/svelte-treeviews/"+u},D={},h=function(e,r,g){let m=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),i=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));m=Promise.all(r.map(o=>{if(o=Y(o),o in D)return;D[o]=!0;const l=o.endsWith(".css"),E=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${E}`))return;const a=document.createElement("link");if(a.rel=l?"stylesheet":X,l||(a.as="script",a.crossOrigin=""),a.href=o,i&&a.setAttribute("nonce",i),document.head.appendChild(a),l)return new Promise((c,n)=>{a.addEventListener("load",c),a.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${o}`)))})}))}return m.then(()=>e()).catch(t=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=t,window.dispatchEvent(i),!i.defaultPrevented)throw t})},re={};var Z=I('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),M=I("<!> <!>",1);function $(u,e){q(e,!0);let r=p(e,"components",15,()=>T([])),g=p(e,"data_0",3,null),m=p(e,"data_1",3,null);z(()=>e.stores.page.set(e.page)),B(()=>{e.stores,e.page,e.constructors,r(),e.form,g(),m(),e.stores.page.notify()});let t=R(!1),i=R(!1),o=R(null);F(()=>{const c=e.stores.page.subscribe(()=>{y(t)&&(w(i,!0),W().then(()=>{w(o,T(document.title||"untitled page"))}))});return w(t,!0),c});var l=M(),E=P(l);x(E,()=>e.constructors[1],c=>{var n=L(),f=P(n);k(f,()=>e.constructors[0],(v,d)=>{A(d(v,{get data(){return g()},children:(s,ee)=>{var O=L(),S=P(O);k(S,()=>e.constructors[1],(V,U)=>{A(U(V,{get data(){return m()},get form(){return e.form}}),b=>r()[1]=b,()=>{var b;return(b=r())==null?void 0:b[1]})}),_(s,O)},$$slots:{default:!0}}),s=>r()[0]=s,()=>{var s;return(s=r())==null?void 0:s[0]})}),_(c,n)},c=>{var n=L(),f=P(n);k(f,()=>e.constructors[0],(v,d)=>{A(d(v,{get data(){return g()},get form(){return e.form}}),s=>r()[0]=s,()=>{var s;return(s=r())==null?void 0:s[0]})}),_(c,n)});var a=C(C(E,!0));x(a,()=>y(t),c=>{var n=Z(),f=G(n);x(f,()=>y(i),v=>{var d=H();J(()=>K(d,y(o))),_(v,d)}),N(n),_(c,n)}),_(u,l),j()}const oe=Q($),ne=[()=>h(()=>import("../nodes/0.l-djgUgX.js"),__vite__mapDeps([0,1,2])),()=>h(()=>import("../nodes/1.5PvnfYsp.js"),__vite__mapDeps([3,1])),()=>h(()=>import("../nodes/2.1bOCw1hN.js"),__vite__mapDeps([4,1])),()=>h(()=>import("../nodes/3.r2eWS5PW.js"),__vite__mapDeps([5,1,6,7])),()=>h(()=>import("../nodes/4.D5djq27X.js"),__vite__mapDeps([8,1]))],se=[],ae={"/":[2],"/examples/vertical":[3],"/minified-size":[4]},ie={handleError:({error:u})=>{console.error(u)},reroute:()=>{}};export{ae as dictionary,ie as hooks,re as matchers,ne as nodes,oe as root,se as server_loads};