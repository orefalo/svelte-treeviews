import{Q as S,h as O,X as V,p as z,l as J,a as h,v as G,b as g,i as a,q as t,n as c,g as e,m as K,t as f,w as y,J as D,Y as W,Z as X,d as te,L as Y,A as M,_ as ae,o as se,j as N,k as le,$ as ne,a0 as ie,a1 as re,z as oe,y as ve,f as j,c as F}from"../chunks/external.DE7A-Ldg.js";const ce=!0,Le=Object.freeze(Object.defineProperty({__proto__:null,prerender:ce},Symbol.toStringTag,{value:"Module"})),Q=l=>l.endsWith("/")?l.slice(0,-1):l,Z=(l,s)=>Q(S+l)===Q(s.url.pathname);var de=g('<li class="svelte-19ye01s"><a data-sveltekit-preload-data="" class="page svelte-19ye01s"> </a></li>'),pe=g('<li class="svelte-19ye01s"><span class="section svelte-19ye01s"> </span> <ul class="svelte-19ye01s"></ul></li>'),ue=g('<nav aria-label="Docs" class="svelte-19ye01s"><ul class="sidebar svelte-19ye01s"></ul></nav>');function he(l,s){O(s,!0);const n=V(),i=()=>W(X,"$page",n);let r=z(s,"contents",19,()=>[]);var d=ue(),p=a(d);J(p,21,r,K,(u,q)=>{var m=pe(),_=a(m),T=a(_,!0);t(_);var x=c(_,2);J(x,21,()=>e(q).pages,K,(P,k)=>{let L=()=>e(k).title,R=()=>e(k).path;var w=de(),b=a(w);f(()=>y(b,"aria-current",Z(R(),i())?"page":void 0));var A=a(b,!0);t(b),t(w),f(()=>{y(b,"href",S+R()),D(A,L())}),h(P,w)}),t(x),t(m),f(()=>D(T,e(q).title)),h(u,m)}),t(p),t(d),h(l,d),G()}function ge(l,s,n){var i;s(!s()),(i=n.onclick)==null||i.call(n)}var me=g('<button class="svelte-1bsnqe6"><span style="display: none;"> </span></button>');function _e(l,s){O(s,!0);let n=z(s,"pressed",15);var i=me();i.__click=[ge,n,s];var r=a(i),d=a(r,!0);t(r),t(i),f(()=>{y(i,"aria-pressed",n()?"true":"false"),D(d,s.label)}),h(l,i),G()}te(["click"]);var fe=g('<div class="input-output-toggle svelte-1keqb9b">Direction: <span aria-hidden="true">LTR</span> <!> <span aria-hidden="true">RTL</span></div>');function xe(l,s){let n=z(s,"isRTL",15);function i(){document.documentElement.dir=n()?"rtl":"ltr"}var r=fe(),d=c(a(r),3);_e(d,{get pressed(){return n()},set pressed(p){n(p)},label:"RTL direction",onclick:i}),Y(2),t(r),h(l,r)}var be=g('<meta name="description" content="A Fantastic virtual list for Svelte 5 and above"> <!>',1),ye=g('<a data-sveltekit-preload-data="" class="svelte-113h04q"> </a>'),qe=g('<a data-sveltekit-preload-data="" class="svelte-113h04q"> </a>'),Te=g('<div class="page-container svelte-113h04q"><div role="presentation" class="toc-container-space svelte-113h04q"></div> <main class="svelte-113h04q"><!> <div class="controls svelte-113h04q"><div class="svelte-113h04q"><span class="svelte-113h04q">previous</span> <!></div> <div class="svelte-113h04q"><span class="svelte-113h04q">next</span> <!></div></div></main> <div class="toc-container svelte-113h04q"><div role="presentation" class="toc-contents-wrap svelte-113h04q"><h1 class="toc-head svelte-113h04q"><img alt="Icon" width="30" height="30"> Svelte-Treeviews</h1> <!></div> <!></div></div>');function Re(l,s){O(s,!0);const n=V(),i=()=>W(X,"$page",n);let r=ve(!1);const d=[{title:"Getting started",pages:[{title:"Introduction",path:"/"}]},{title:"General Examples",pages:[{title:"Themes",path:"/examples/themes"},{title:"Fold and Checkbox",path:"/examples/foldandcheckbox/"},{title:"Drag and Drop",path:"/examples/dnd"},{title:"Async Loading",path:"/examples/comingsoon"},{title:"Key Navigation",path:"/examples/comingsoon"},{title:"Dynamic Filtering",path:"/examples/comingsoon"},{title:"Virtual List",path:"/examples/virtuallist"},{title:"API",path:"/examples/api"},{title:"Events",path:"/examples/comingsoon"}]}],p=M(d.map(v=>v.pages).flat()),u=j(()=>p.findIndex(({path:v})=>Z(v,i()))),q=j(()=>e(u)>=0?p[e(u)]:void 0),m=j(()=>e(u)>=1?p[e(u)-1]:void 0),_=j(()=>e(u)>=0&&e(u)<p.length-1?p[e(u)+1]:void 0);var T=Te();ae(v=>{var o=be(),I=c(le(o),2);ne(I,()=>ie,!1,!1),f(()=>re.title=`Svelte-Treeviews${(e(q)?` - ${e(q).title}`:"")??""}`),h(v,o)});var x=c(a(T),2),P=a(x);se(P,()=>s.children);var k=c(P,2),L=a(k),R=a(L),w=c(R,2);N(w,()=>e(m),v=>{var o=ye(),I=a(o,!0);t(o),f(()=>{y(o,"href",S+e(m).path),D(I,e(m).title)}),h(v,o)}),t(L);var b=c(L,2),A=a(b),H=c(A,2);N(H,()=>e(_),v=>{var o=qe(),I=a(o,!0);t(o),f(()=>{y(o,"href",S+e(_).path),D(I,e(_).title)}),h(v,o)}),t(b),t(k),t(x);var B=c(x,2),C=a(B),E=a(C),U=a(E);y(U,"src",`${S??""}/favicon.svg`),Y(),t(E);var $=c(E,2);he($,{contents:d}),t(C);var ee=c(C,2);xe(ee,{get isRTL(){return e(r)},set isRTL(v){oe(r,M(v))}}),t(B),t(T),f(()=>{F(x,"rtl-containers",e(r)),F(R,"faded",!e(m)),F(A,"faded",!e(_))}),h(l,T),G()}export{Re as component,Le as universal};
