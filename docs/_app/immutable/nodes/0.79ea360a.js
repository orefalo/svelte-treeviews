import{_ as j,S as te,i as se,s as ae,e as m,d as b,f as T,g as _,j as c,k as C,K as f,W as ee,a7 as ye,a8 as $e,a9 as Pe,I as y,a as q,J as $,b as S,L as W,h as Ce,l as Ue,x as De,U as Ne,C as _e,D as he,E as pe,V as Ve,t as Y,q as x,H as ge,c as He,aa as Me,y as ke,ab as je,ac as Oe,N as G,Z as Fe,ad as Ge,u as We,m as ze,n as Je}from"../chunks/external.662fb852.js";const Ke=!0,it=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ke},Symbol.toStringTag,{value:"Module"})),Le=l=>l.endsWith("/")?l.slice(0,-1):l,ve=(l,e)=>Le(j+l)===Le(e.url.pathname);function Re(l,e,t){const s=l.slice();return s[2]=e[t],s}function Ie(l,e,t){const s=l.slice();return s[5]=e[t].title,s[6]=e[t].path,s}function qe(l){let e,t,s=l[5]+"",n,a,r,i;return{c(){e=m("li"),t=m("a"),n=y(s),i=q(),this.h()},l(u){e=b(u,"LI",{class:!0});var o=T(e);t=b(o,"A",{"data-sveltekit-preload-data":!0,class:!0,"aria-current":!0,href:!0});var p=T(t);n=$(p,s),p.forEach(_),i=S(o),o.forEach(_),this.h()},h(){c(t,"data-sveltekit-preload-data",""),c(t,"class","page svelte-6bn3ki"),c(t,"aria-current",a=ve(l[6],l[1])?"page":void 0),c(t,"href",r=j+l[6]),c(e,"class","svelte-6bn3ki")},m(u,o){C(u,e,o),f(e,t),f(t,n),f(e,i)},p(u,o){o&1&&s!==(s=u[5]+"")&&W(n,s),o&3&&a!==(a=ve(u[6],u[1])?"page":void 0)&&c(t,"aria-current",a),o&1&&r!==(r=j+u[6])&&c(t,"href",r)},d(u){u&&_(e)}}}function Se(l){let e,t,s=l[2].title+"",n,a,r,i,u=l[2].pages,o=[];for(let p=0;p<u.length;p+=1)o[p]=qe(Ie(l,u,p));return{c(){e=m("li"),t=m("span"),n=y(s),a=q(),r=m("ul");for(let p=0;p<o.length;p+=1)o[p].c();i=q(),this.h()},l(p){e=b(p,"LI",{class:!0});var v=T(e);t=b(v,"SPAN",{class:!0});var h=T(t);n=$(h,s),h.forEach(_),a=S(v),r=b(v,"UL",{class:!0});var E=T(r);for(let g=0;g<o.length;g+=1)o[g].l(E);E.forEach(_),i=S(v),v.forEach(_),this.h()},h(){c(t,"class","section svelte-6bn3ki"),c(r,"class","svelte-6bn3ki"),c(e,"class","svelte-6bn3ki")},m(p,v){C(p,e,v),f(e,t),f(t,n),f(e,a),f(e,r);for(let h=0;h<o.length;h+=1)o[h]&&o[h].m(r,null);f(e,i)},p(p,v){if(v&1&&s!==(s=p[2].title+"")&&W(n,s),v&3){u=p[2].pages;let h;for(h=0;h<u.length;h+=1){const E=Ie(p,u,h);o[h]?o[h].p(E,v):(o[h]=qe(E),o[h].c(),o[h].m(r,null))}for(;h<o.length;h+=1)o[h].d(1);o.length=u.length}},d(p){p&&_(e),ye(o,p)}}}function Ze(l){let e,t,s=l[0],n=[];for(let a=0;a<s.length;a+=1)n[a]=Se(Re(l,s,a));return{c(){e=m("nav"),t=m("ul");for(let a=0;a<n.length;a+=1)n[a].c();this.h()},l(a){e=b(a,"NAV",{"aria-label":!0,class:!0});var r=T(e);t=b(r,"UL",{class:!0});var i=T(t);for(let u=0;u<n.length;u+=1)n[u].l(i);i.forEach(_),r.forEach(_),this.h()},h(){c(t,"class","sidebar svelte-6bn3ki"),c(e,"aria-label","Docs"),c(e,"class","svelte-6bn3ki")},m(a,r){C(a,e,r),f(e,t);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(t,null)},p(a,[r]){if(r&3){s=a[0];let i;for(i=0;i<s.length;i+=1){const u=Re(a,s,i);n[i]?n[i].p(u,r):(n[i]=Se(u),n[i].c(),n[i].m(t,null))}for(;i<n.length;i+=1)n[i].d(1);n.length=s.length}},i:ee,o:ee,d(a){a&&_(e),ye(n,a)}}}function Qe(l,e,t){let s;$e(l,Pe,a=>t(1,s=a));let{contents:n=[]}=e;return l.$$set=a=>{"contents"in a&&t(0,n=a.contents)},[n,s]}class Xe extends te{constructor(e){super(),se(this,e,Qe,Ze,ae,{contents:0})}}function Ye(l){let e,t,s,n,a,r;return{c(){e=m("button"),t=m("span"),s=y(l[1]),this.h()},l(i){e=b(i,"BUTTON",{"aria-pressed":!0,class:!0});var u=T(e);t=b(u,"SPAN",{style:!0});var o=T(t);s=$(o,l[1]),o.forEach(_),u.forEach(_),this.h()},h(){Ce(t,"display","none"),c(e,"aria-pressed",n=l[0]?"true":"false"),c(e,"class","svelte-ki38mm")},m(i,u){C(i,e,u),f(e,t),f(t,s),a||(r=Ue(e,"click",l[2]),a=!0)},p(i,[u]){u&2&&W(s,i[1]),u&1&&n!==(n=i[0]?"true":"false")&&c(e,"aria-pressed",n)},i:ee,o:ee,d(i){i&&_(e),a=!1,r()}}}function xe(l,e,t){let{pressed:s}=e,{label:n}=e;const a=()=>t(0,s=!s);return l.$$set=r=>{"pressed"in r&&t(0,s=r.pressed),"label"in r&&t(1,n=r.label)},[s,n,a]}class et extends te{constructor(e){super(),se(this,e,xe,Ye,ae,{pressed:0,label:1})}}function tt(l){let e,t,s,n,a,r,i,u,o,p,v;function h(g){l[1](g)}let E={label:"RTL direction"};return l[0]!==void 0&&(E.pressed=l[0]),r=new et({props:E}),De.push(()=>Ne(r,"pressed",h)),{c(){e=m("div"),t=y(`Reading direction:
	`),s=m("span"),n=y("LTR"),a=q(),_e(r.$$.fragment),u=q(),o=m("span"),p=y("RTL"),this.h()},l(g){e=b(g,"DIV",{class:!0});var I=T(e);t=$(I,`Reading direction:
	`),s=b(I,"SPAN",{"aria-hidden":!0});var D=T(s);n=$(D,"LTR"),D.forEach(_),a=S(I),he(r.$$.fragment,I),u=S(I),o=b(I,"SPAN",{"aria-hidden":!0});var w=T(o);p=$(w,"RTL"),w.forEach(_),I.forEach(_),this.h()},h(){c(s,"aria-hidden","true"),c(o,"aria-hidden","true"),c(e,"class","input-output-toggle svelte-snxs5h")},m(g,I){C(g,e,I),f(e,t),f(e,s),f(s,n),f(e,a),pe(r,e,null),f(e,u),f(e,o),f(o,p),v=!0},p(g,[I]){const D={};!i&&I&1&&(i=!0,D.pressed=g[0],Ve(()=>i=!1)),r.$set(D)},i(g){v||(Y(r.$$.fragment,g),v=!0)},o(g){x(r.$$.fragment,g),v=!1},d(g){g&&_(e),ge(r)}}}function st(l,e,t){let{isRTL:s}=e;function n(a){s=a,t(0,s)}return l.$$set=a=>{"isRTL"in a&&t(0,s=a.isRTL)},[s,n]}class at extends te{constructor(e){super(),se(this,e,st,tt,ae,{isRTL:0})}}function Ae(l){let e,t=l[2].title+"",s,n;return{c(){e=m("a"),s=y(t),this.h()},l(a){e=b(a,"A",{"data-sveltekit-preload-data":!0,href:!0,class:!0});var r=T(e);s=$(r,t),r.forEach(_),this.h()},h(){c(e,"data-sveltekit-preload-data",""),c(e,"href",n=j+l[2].path),c(e,"class","svelte-1xp6paq")},m(a,r){C(a,e,r),f(e,s)},p(a,r){r&4&&t!==(t=a[2].title+"")&&W(s,t),r&4&&n!==(n=j+a[2].path)&&c(e,"href",n)},d(a){a&&_(e)}}}function we(l){let e,t=l[1].title+"",s,n;return{c(){e=m("a"),s=y(t),this.h()},l(a){e=b(a,"A",{"data-sveltekit-preload-data":!0,href:!0,class:!0});var r=T(e);s=$(r,t),r.forEach(_),this.h()},h(){c(e,"data-sveltekit-preload-data",""),c(e,"href",n=j+l[1].path),c(e,"class","svelte-1xp6paq")},m(a,r){C(a,e,r),f(e,s)},p(a,r){r&2&&t!==(t=a[1].title+"")&&W(s,t),r&2&&n!==(n=j+a[1].path)&&c(e,"href",n)},d(a){a&&_(e)}}}function lt(l){let e,t,s,n,a,r,i,u,o,p,v,h,E,g,I,D,w,U,le,ne,re,H,N,O,M,me,ie,oe,F,ce,V,ue,P;document.title=e="Svelte-Treeviews"+(l[3]?` - ${l[3].title}`:"");const fe=l[9].default,A=He(fe,l,l[8],null);let k=l[2]&&Ae(l),L=l[1]&&we(l);F=new Xe({props:{contents:l[4]}});function Be(d){l[10](d)}let be={};return l[0]!==void 0&&(be.isRTL=l[0]),V=new at({props:be}),De.push(()=>Ne(V,"isRTL",Be)),{c(){t=m("meta"),s=new Me(!1),n=ke(),a=q(),r=m("div"),i=m("div"),u=q(),o=m("main"),A&&A.c(),p=q(),v=m("div"),h=m("div"),E=m("span"),g=y("previous"),I=q(),k&&k.c(),D=q(),w=m("div"),U=m("span"),le=y("next"),ne=q(),L&&L.c(),re=q(),H=m("div"),N=m("div"),O=m("h1"),M=m("img"),ie=y(" Svelte-Treeviews"),oe=q(),_e(F.$$.fragment),ce=q(),_e(V.$$.fragment),this.h()},l(d){const R=je("svelte-v9dq0p",document.head);t=b(R,"META",{name:!0,content:!0}),s=Oe(R,!1),n=ke(),R.forEach(_),a=S(d),r=b(d,"DIV",{class:!0});var B=T(r);i=b(B,"DIV",{role:!0,class:!0}),T(i).forEach(_),u=S(B),o=b(B,"MAIN",{class:!0});var z=T(o);A&&A.l(z),p=S(z),v=b(z,"DIV",{class:!0});var J=T(v);h=b(J,"DIV",{class:!0});var K=T(h);E=b(K,"SPAN",{class:!0});var Te=T(E);g=$(Te,"previous"),Te.forEach(_),I=S(K),k&&k.l(K),K.forEach(_),D=S(J),w=b(J,"DIV",{class:!0});var Z=T(w);U=b(Z,"SPAN",{class:!0});var Ee=T(U);le=$(Ee,"next"),Ee.forEach(_),ne=S(Z),L&&L.l(Z),Z.forEach(_),J.forEach(_),z.forEach(_),re=S(B),H=b(B,"DIV",{class:!0});var Q=T(H);N=b(Q,"DIV",{role:!0,class:!0});var X=T(N);O=b(X,"H1",{class:!0});var de=T(O);M=b(de,"IMG",{src:!0,alt:!0,width:!0,height:!0}),ie=$(de," Svelte-Treeviews"),de.forEach(_),oe=S(X),he(F.$$.fragment,X),X.forEach(_),ce=S(Q),he(V.$$.fragment,Q),Q.forEach(_),B.forEach(_),this.h()},h(){c(t,"name","description"),c(t,"content","A Fantastic tree view for Svelte"),s.a=n,c(i,"role","presentation"),c(i,"class","toc-container-space svelte-1xp6paq"),c(E,"class","svelte-1xp6paq"),G(E,"faded",!l[2]),c(h,"class","svelte-1xp6paq"),c(U,"class","svelte-1xp6paq"),G(U,"faded",!l[1]),c(w,"class","svelte-1xp6paq"),c(v,"class","controls svelte-1xp6paq"),c(o,"class","svelte-1xp6paq"),G(o,"rtl-containers",l[0]),Fe(M.src,me=j+"/favicon.svg")||c(M,"src",me),c(M,"alt","Icon"),c(M,"width","30"),c(M,"height","30"),c(O,"class","toc-head svelte-1xp6paq"),c(N,"role","presentation"),c(N,"class","toc-contents-wrap svelte-1xp6paq"),c(H,"class","toc-container svelte-1xp6paq"),c(r,"class","page-container svelte-1xp6paq")},m(d,R){f(document.head,t),s.m(Ge,document.head),f(document.head,n),C(d,a,R),C(d,r,R),f(r,i),f(r,u),f(r,o),A&&A.m(o,null),f(o,p),f(o,v),f(v,h),f(h,E),f(E,g),f(h,I),k&&k.m(h,null),f(v,D),f(v,w),f(w,U),f(U,le),f(w,ne),L&&L.m(w,null),f(r,re),f(r,H),f(H,N),f(N,O),f(O,M),f(O,ie),f(N,oe),pe(F,N,null),f(H,ce),pe(V,H,null),P=!0},p(d,[R]){(!P||R&8)&&e!==(e="Svelte-Treeviews"+(d[3]?` - ${d[3].title}`:""))&&(document.title=e),A&&A.p&&(!P||R&256)&&We(A,fe,d,d[8],P?Je(fe,d[8],R,null):ze(d[8]),null),(!P||R&4)&&G(E,"faded",!d[2]),d[2]?k?k.p(d,R):(k=Ae(d),k.c(),k.m(h,null)):k&&(k.d(1),k=null),(!P||R&2)&&G(U,"faded",!d[1]),d[1]?L?L.p(d,R):(L=we(d),L.c(),L.m(w,null)):L&&(L.d(1),L=null),(!P||R&1)&&G(o,"rtl-containers",d[0]);const B={};!ue&&R&1&&(ue=!0,B.isRTL=d[0],Ve(()=>ue=!1)),V.$set(B)},i(d){P||(Y(A,d),Y(F.$$.fragment,d),Y(V.$$.fragment,d),P=!0)},o(d){x(A,d),x(F.$$.fragment,d),x(V.$$.fragment,d),P=!1},d(d){_(t),_(n),d&&s.d(),d&&_(a),d&&_(r),A&&A.d(d),k&&k.d(),L&&L.d(),ge(F),ge(V)}}}function nt(l,e,t){let s,n,a,r,i,u;$e(l,Pe,g=>t(7,u=g));let{$$slots:o={},$$scope:p}=e,v=!1;const h=[{title:"Getting started",pages:[{title:"Introduction",path:"/"}]},{title:"Features",pages:[{title:"Basics",path:"/examples/basics"}]},{title:"API",pages:[{title:"Basics",path:"/examples/basics"}]},{title:"Use Cases",pages:[{title:"Basics",path:"/examples/basics"}]}];function E(g){v=g,t(0,v)}return l.$$set=g=>{"$$scope"in g&&t(8,p=g.$$scope)},l.$$.update=()=>{l.$$.dirty&192&&t(5,n=s.findIndex(({path:g})=>ve(g,u))),l.$$.dirty&96&&t(3,a=n>=0?s[n]:void 0),l.$$.dirty&96&&t(2,r=n>=1?s[n-1]:void 0),l.$$.dirty&96&&t(1,i=n>=0&&n<s.length-1?s[n+1]:void 0)},t(6,s=h.map(g=>g.pages).flat()),[v,i,r,a,h,n,s,u,p,o,E]}class ot extends te{constructor(e){super(),se(this,e,nt,lt,ae,{})}}export{ot as component,it as universal};