import{d as J,b as K,h as e,j as t,t as m,k as y,m as f,F as n,G as x,w as r,q as Q,i as U,H as l,I as B}from"../chunks/external.B_VisAt9.js";import{T as X}from"../chunks/svelte-treeviews.BtLGPNBr.js";const Y=[{text:"Projects",children:[{text:"Frontend",children:[{text:"Vue",children:[{text:"Nuxt"}]},{text:"React",children:[{text:"Next"}]},{text:"Angular"}]},{text:"Backend"}]},{text:"Videos",children:[{text:"Movie",children:[{text:"The Godfather"},{text:"La Dolce Vita"},{text:"In the Mood for Love"}]},{text:"AD"},{text:"Shorts"}]},{text:"Photos",children:[{text:"Animals"},{text:"Buildings"},{text:"Sky"},{text:"Sea"}]},{text:"Music",children:[{text:"My Happy Melodies."},{text:"Hello Summer."},{text:"An Overture To Happiness."},{text:"Sunny Days."},{text:"Every One Need Adventure."},{text:"Happy, Chill Radio."},{text:"I Found My Way."},{text:"Early, Early Morning."}]},{text:"Games",children:[{text:"swimming"},{text:"cycling"},{text:"tennis"},{text:"boxing"}]},{text:"Download"}];var Z=(d,i)=>i().toggleExpand(),$=f("<span> </span>"),tt=(d,i)=>i().toggleChecked(),et=f('<!> <input type="checkbox"> ',1),rt=f('<div><h3>Base Tree Example</h3> <hr> <h4>Properties</h4> <label><input type="checkbox"> defaultOpen</label> <label><input type="checkbox"> rtl</label> <br> <label><input type="checkbox"> btt (display from bottom to top)</label> <br> <label><input type="checkbox"> Tree Line</label> <div>indent <input type="number"></div> <hr> <!></div>');function it(d){const i=K(Y),k=!0,g=!1,M=20,T=!1,A=!0;var u=rt(),F=e(u),G=t(t(F,!0)),I=t(t(G,!0)),p=t(t(I,!0)),E=e(p);n(E),x(),r(p);var v=t(t(p,!0)),H=e(v);n(H),x(),r(v);var N=t(t(v,!0)),h=t(t(N,!0)),L=e(h);n(L),x(),r(h);var P=t(t(h,!0)),_=t(t(P,!0)),O=e(_);n(O),x(),r(_);var b=t(t(_,!0)),S=t(e(b));n(S),r(b);var V=t(t(b,!0)),j=t(t(V,!0));X(j,{get model(){return i},get defaultOpen(){return k},get rtl(){return g},get indent(){return M},get btt(){return T},get treeLine(){return A},virtualization:!0,style:"height: 500px",tree_slot:(C,a)=>{let R=()=>a==null?void 0:a().data,o=()=>a==null?void 0:a().info;var D=et(),w=Q(D);U(w,()=>o().children.length,z=>{var c=$();c.__click=[Z,o];var W=e(c);r(c),m(()=>B(W,o().expended?"-":"+")),y(z,c)});var s=t(t(w,!0));n(s),s.__click=[tt,o];var q=t(s,!0);m(()=>{l(s,o().checked),B(q,` ${R().text??""}`)}),y(C,D)}}),r(u),m(()=>{l(E,k),l(H,g),l(L,T),l(O,A),l(S,M)}),y(d,u)}J(["click"]);export{it as component};
