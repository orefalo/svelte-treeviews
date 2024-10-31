import{d as R,p as M,t as m,a as o,b as v,w as A,c as F,n as i,k as _,j as L,i as g,q as y,C as E,L as B,J as k}from"../chunks/external.DE7A-Ldg.js";import{T,O as P,I as S}from"../chunks/svelte-treeviews.Bv5OGsPR.js";import{m as q}from"../chunks/data.ZdgfwtBC.js";var D=v('<div class="toggleBtn svelte-1v4wtoy"><span class="svelte-1v4wtoy"><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"></path></svg></span></div>');function z(w,c){let h=M(c,"open",15,!1),b=M(c,"bgColor",3,"inherited"),C=M(c,"hoverColor",3,"#f00"),O=M(c,"onclick",3,()=>{h(!h())});var d=D();d.__click=function(...p){var e;(e=O())==null||e.apply(this,p)},m(()=>{A(d,"style",`--theme-bgcolor: ${b()??""};--theme-hovercolor: ${C()??""}`),F(d,"open",h())}),o(w,d)}R(["click"]);const J=[{text:"Things",children:[{text:"Fruits",children:[{text:"Apple"},{text:"Mango"},{text:"Orange",children:[{text:"Mandarin"},{text:"Sunkist"}]}]},{text:"Cars",children:[{text:"Toyota"},{text:"Fort"},{text:"Hyundai"}]}]}],j=[{text:"Manage",icon:"users.svg",children:[{text:"Activity"},{text:"Members"}]},{text:"Plan",icon:"planning.svg",children:[{text:"Issues"},{text:"Milestones"},{text:"Wiki"},{text:"Requirements"}]},{text:"Code",icon:"code.svg",children:[{text:"Repository"},{text:"Branches"},{text:"Commits"}]},{text:"Build",icon:"rocket.svg",children:[{text:"Pipelines"},{text:"Jobs"},{text:"Test Cases"}]},{text:"Deploy",icon:"deployments.svg",children:[{text:"Releases"},{text:"Package Registry"},{text:"Container Registry"}]},{text:"Operate",icon:"cloud-pod.svg",children:[{text:"Environments"}]},{text:"Monitor",icon:"monitor.svg",children:[{text:"Incidents"},{text:"Service desk"}]},{text:"Analyze",icon:"chart.svg",children:[{text:"Insights"},{text:"CI/CD Analytics"}]}];var G=v('<!> <!> <span class="mtl-ml"> </span>',1),H=v('<!> <span class="content"> </span>',1),W=v('<span class="content" style="padding-left:30px"> </span>'),K=v('<span class="content"> </span> <!>',1),N=v('<span class="content" style="padding-left:30px"> </span>'),Q=v("<h1>Material</h1> <!> <!> <h1>Fluent2</h1> <!> <h1>Gitlab</h1> <!> <h1>Shadcn</h1> <h1>Tailwind</h1>",1);function Y(w){var c=Q(),h=i(_(c),2);T(h,{model:q,defaultOpen:!1,indent:20,treeLine:!0,virtualization:!0,class:"mtl-tree",style:"height: auto",tree_slot:(p,e)=>{let x=()=>e==null?void 0:e().data,t=()=>e==null?void 0:e().info;var l=G(),u=_(l);L(u,()=>t().children.length,r=>{P(r,{class:"mlt-mr",onclick:()=>t().toggleExpand(),get open(){return t().expended},set open(f){t().expended=f},$$legacy:!0})});var s=i(u,2);S(s,{class:"mtl-checkbox mtl-mr",get value(){return t().checked},set value(r){t().checked=r},$$legacy:!0});var n=i(s,2),a=g(n,!0);y(n),m(()=>k(a,x().text)),o(p,l)},$$slots:{tree_slot:!0}});var b=i(h,2);z(b,{open:!0});var C=i(b,4);T(C,{model:J,defaultOpen:!1,indent:10,treeLine:!1,virtualization:!0,class:"fluentui2",style:"height: auto",tree_slot:(p,e)=>{let x=()=>e==null?void 0:e().data,t=()=>e==null?void 0:e().info;var l=E(),u=_(l);L(u,()=>t().children.length,s=>{var n=H(),a=_(n);z(a,{onclick:()=>t().toggleExpand(),get open(){return t().expended},set open(I){t().expended=I},$$legacy:!0});var r=i(a,2),f=g(r,!0);y(r),m(()=>k(f,x().text)),o(s,n)},s=>{var n=W(),a=g(n,!0);y(n),m(()=>k(a,x().text)),o(s,n)}),o(p,l)},$$slots:{tree_slot:!0}});var O=i(C,4);T(O,{model:j,defaultOpen:!1,indent:0,treeLine:!1,treeLineOffset:0,virtualization:!0,class:"gitlab",style:"height: auto",tree_slot:(p,e)=>{let x=()=>e==null?void 0:e().data,t=()=>e==null?void 0:e().info;var l=E(),u=_(l);L(u,()=>t().children.length,s=>{var n=K(),a=_(n),r=g(a,!0);y(a);var f=i(a,2);z(f,{onclick:()=>t().toggleExpand(),get open(){return t().expended},set open(I){t().expended=I},$$legacy:!0}),m(()=>k(r,x().text)),o(s,n)},s=>{var n=N(),a=g(n,!0);y(n),m(()=>k(a,x().text)),o(s,n)}),o(p,l)},$$slots:{tree_slot:!0}}),B(4),o(w,c)}export{Y as component};
