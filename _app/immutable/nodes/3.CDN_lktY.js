import{d as H,b as I,t as f,h as k,k as m,l as t,r as e,M as n,L as c,w as a,n as J,i as K,N as l,D as N}from"../chunks/external.DybHjibF.js";import{T as Q}from"../chunks/svelte-treeviews.DfcTaRQ5.js";const R=[{text:"T1",children:[{text:"T1.1"},{text:"T1.2"},{text:"T1.3"},{text:"T1.4"}]},{text:"T2"}];var S=(d,i)=>i().toggleExpand(),U=m("<span> </span>"),V=(d,i)=>i().toggleChecked(),W=m('<!> <input type="checkbox"> ',1),X=m('<div><h3>Base Tree Example</h3> <hr> <h4>Properties</h4> <label><input type="checkbox"> defaultOpen</label> <label><input type="checkbox"> rtl</label> <br> <label><input type="checkbox"> btt (display from bottom to top)</label> <br> <label><input type="checkbox"> Tree Line</label> <div>indent <input type="number"></div> <hr> <!></div>');function tt(d){const i=I(R),T=!0,y=!1,g=20,L=!1,O=!0;var _=X(),v=t(e(_),6),E=e(v);n(E),c(),a(v);var u=t(v,2),w=e(u);n(w),c(),a(u);var b=t(u,4),z=e(b);n(z),c(),a(b);var x=t(b,4),B=e(x);n(B),c(),a(x);var h=t(x,2),C=t(e(h));n(C),a(h);var P=t(h,4);Q(P,{get model(){return i},get defaultOpen(){return T},get rtl(){return y},get indent(){return g},get btt(){return L},get treeLine(){return O},virtualization:!0,style:"height: 500px",tree_slot:(j,r)=>{let q=()=>r==null?void 0:r().data,o=()=>r==null?void 0:r().info;var D=W(),M=J(D);K(M,()=>o().children.length,F=>{var p=U();p.__click=[S,o];var G=e(p);a(p),f(()=>N(G,o().expended?"-":"+")),k(F,p)});var s=t(M,2);n(s),s.__click=[V,o];var A=t(s);f(()=>{l(s,o().checked),N(A,` ${q().text??""}`)}),k(j,D)},$$slots:{tree_slot:!0}}),a(_),f(()=>{l(E,T),l(w,y),l(z,L),l(B,O),l(C,g)}),k(d,_)}H(["click"]);export{tt as component};