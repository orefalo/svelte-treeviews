const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_app/immutable/nodes/0.BZ4b_5dc.js","_app/immutable/chunks/external.BsFOAlSY.js","_app/immutable/assets/0.LEWtMjZZ.css","_app/immutable/nodes/1.CRtqFNcL.js","_app/immutable/nodes/2.BWywmjIm.js","_app/immutable/nodes/3.CdMN4zNl.js","_app/immutable/chunks/svelte-treeviews.CVI5fHN3.js","_app/immutable/assets/svelte-treeviews.BDF5w1sq.css","_app/immutable/nodes/4.WDYDzfW0.js"])))=>i.map(i=>d[i]);
import{p as q,a as y,J as U,u as j,o as z,g as w,e as P,K as B,b as J,q as p,i as L,n as k,L as x,k as _,j as O,l as K,m as C,s as R,f as A,h as W,M as F,t as G,I as H,w as N,N as Q}from"../chunks/external.BsFOAlSY.js";const X="modulepreload",Y=function(u){return"/svelte-treeviews/"+u},T={},h=function(e,r,g){let m=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),i=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));m=Promise.all(r.map(n=>{if(n=Y(n),n in T)return;T[n]=!0;const l=n.endsWith(".css"),E=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${E}`))return;const a=document.createElement("link");if(a.rel=l?"stylesheet":X,l||(a.as="script",a.crossOrigin=""),a.href=n,i&&a.setAttribute("nonce",i),document.head.appendChild(a),l)return new Promise((c,o)=>{a.addEventListener("load",c),a.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${n}`)))})}))}return m.then(()=>e()).catch(t=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=t,window.dispatchEvent(i),!i.defaultPrevented)throw t})},re={};var Z=C('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),M=C("<!> <!>",1);function $(u,e){q(e,!0);let r=y(e,"components",23,()=>[]),g=y(e,"data_0",3,null),m=y(e,"data_1",3,null);U(()=>e.stores.page.set(e.page)),j(()=>{e.stores,e.page,e.constructors,r(),e.form,g(),m(),e.stores.page.notify()});let t=R(!1),i=R(!1),n=R(null);z(()=>{const c=e.stores.page.subscribe(()=>{w(t)&&(P(i,!0),B().then(()=>{P(n,J(document.title||"untitled page"))}))});return P(t,!0),c});var l=M(),E=p(l);L(E,()=>e.constructors[1],c=>{var o=k(),f=p(o);x(f,()=>e.constructors[0],(v,d)=>{A(d(v,{get data(){return g()},children:(s,ee)=>{var I=k(),D=p(I);x(D,()=>e.constructors[1],(S,V)=>{A(V(S,{get data(){return m()},get form(){return e.form}}),b=>r()[1]=b,()=>{var b;return(b=r())==null?void 0:b[1]})}),_(s,I)},$$slots:{default:!0}}),s=>r()[0]=s,()=>{var s;return(s=r())==null?void 0:s[0]})}),_(c,o)},c=>{var o=k(),f=p(o);x(f,()=>e.constructors[0],(v,d)=>{A(d(v,{get data(){return g()},get form(){return e.form}}),s=>r()[0]=s,()=>{var s;return(s=r())==null?void 0:s[0]})}),_(c,o)});var a=O(O(E,!0));L(a,()=>w(t),c=>{var o=Z(),f=W(o);L(f,()=>w(i),v=>{var d=F();G(()=>H(d,`${w(n)??""}`)),_(v,d)}),N(o),_(c,o)}),_(u,l),K()}const ne=Q($),oe=[()=>h(()=>import("../nodes/0.BZ4b_5dc.js"),__vite__mapDeps([0,1,2])),()=>h(()=>import("../nodes/1.CRtqFNcL.js"),__vite__mapDeps([3,1])),()=>h(()=>import("../nodes/2.BWywmjIm.js"),__vite__mapDeps([4,1])),()=>h(()=>import("../nodes/3.CdMN4zNl.js"),__vite__mapDeps([5,1,6,7])),()=>h(()=>import("../nodes/4.WDYDzfW0.js"),__vite__mapDeps([8,1]))],se=[],ae={"/":[2],"/examples/basictree":[3],"/minified-size":[4]},ie={handleError:({error:u})=>{console.error(u)},reroute:()=>{}};export{ae as dictionary,ie as hooks,re as matchers,oe as nodes,ne as root,se as server_loads};