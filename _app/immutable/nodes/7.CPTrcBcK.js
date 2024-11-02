import{d as j,p as y,t as m,a as r,c,a1 as I,s as O,h as M,_ as T,o as Z,f as E,q as F,m as f,j as b,i as B,B as C,I as L}from"../chunks/external.9Jc-A3Us.js";import{T as H,I as D}from"../chunks/svelte-treeviews.DtdE3LpY.js";import{m as N}from"../chunks/data.ZdgfwtBC.js";const P=[{text:"Things",children:[{text:"Fruits",children:[{text:"Apple"},{text:"Mango"},{text:"Orange",children:[{text:"Mandarin"},{text:"Sunkist"}]}]},{text:"Cars",children:[{text:"Toyota"},{text:"Fort"},{text:"Hyundai"}]}]}],S=[{text:"Manage",icon:"users",children:[{text:"Activity"},{text:"Members"}]},{text:"Plan",icon:"planning",children:[{text:"Issues"},{text:"Milestones"},{text:"Wiki"},{text:"Requirements"}]},{text:"Code",icon:"code",children:[{text:"Repository"},{text:"Branches"},{text:"Commits"}]},{text:"Build",icon:"rocket",children:[{text:"Pipelines"},{text:"Jobs"},{text:"Test Cases"}]},{text:"Deploy",icon:"deployments",children:[{text:"Releases"},{text:"Package Registry"},{text:"Container Registry"}]},{text:"Operate",icon:"cloud-pod",children:[{text:"Environments"}]},{text:"Monitor",icon:"monitor",children:[{text:"Incidents"},{text:"Service desk"}]},{text:"Analyze",icon:"chart",children:[{text:"Insights"},{text:"CI/CD Analytics"}]}],q=[{text:"src",children:[{text:"routes",children:[{text:"layout.svelte"},{text:"page1",children:[{text:"+page.svelte"}]},{text:"login",children:[{text:"+page.svelte"}]}]},{text:"lib",children:[{text:"TreeView.svelte"},{text:"TreeNode.svelte"},{text:"TreeProcessor.svelte"},{text:"helper.js"},{text:"authentication",children:[{text:"authentication.js"}]}]}]}],G=[{text:"assets",children:[{text:"css",children:[{text:"main",children:[{text:"main.css"},{text:"docs.css"},{text:"README.txt"}]},{text:"tailwind",children:[{text:"input.css"}]},{text:".gitignore"}]},{text:"img",children:[{text:"hero.jpg"},{text:"tailwind.png"},{text:"untitled.png"}]},{text:"js",children:[{text:"flyonui.js"}]}]},{text:"scripts",children:[{text:"flyonui.js"},{text:"tailwind.js"},{text:"www.js"}]},{text:"templates",children:[{text:"index.html"}]}];var J=c('<a class="treeicon svelte-ufbujr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-ufbujr"><path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"></path></svg></a>');function U(w,n){let t=y(n,"open",11,!1),h=y(n,"onclick",3,()=>{});var d=J();d.__click=function(...s){var g;(g=h())==null||g.apply(this,s)},m(()=>I(d,"open",t())),r(w,d)}j(["click"]);var W=c('<a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-18w1jbz"><path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"></path></svg></a>');function K(w,n){let t=y(n,"open",11,!1),h=y(n,"class",3,""),d=y(n,"onclick",3,()=>{});var s=W();s.__click=function(...g){var v;(v=d())==null||v.apply(this,g)},m(()=>{O(s,`${`treeicon ${h()}`??""} svelte-18w1jbz`),I(s,"open",t())}),r(w,s)}j(["click"]);var Q=c('<a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-e5wohh"><path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"></path></svg></a>');function X(w,n){let t=y(n,"open",11,!1),h=y(n,"class",3,""),d=y(n,"onclick",3,()=>{});var s=Q();s.__click=function(...g){var v;(v=d())==null||v.apply(this,g)},m(()=>{O(s,`${`treeicon ${h()}`??""} svelte-e5wohh`),I(s,"open",t())}),r(w,s)}j(["click"]);const Y='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 1a.75.75 0 0 1 .75.75v9.75h9.75a.75.75 0 0 1 0 1.5H4.5v1.25a.75.75 0 0 1-1.5 0V13H1.75a.75.75 0 0 1 0-1.5H3V1.75A.75.75 0 0 1 3.75 1Zm9.75 4.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5ZM9.75 3a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 9.75 3ZM7.5 7.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" fill="#000"/></svg>',$='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.255 6.052a3.75 3.75 0 0 1 7.349-.843l.152.528.55.014a2.25 2.25 0 0 1 1.256 4.077.75.75 0 0 0 .876 1.218 3.75 3.75 0 0 0-1.561-6.744 5.251 5.251 0 0 0-10.037.974 3.25 3.25 0 0 0-1.216 6.039.75.75 0 1 0 .752-1.299A1.749 1.749 0 0 1 3.43 6.76l.784.08.041-.787ZM8 9.838l-1.732-.99L8 7.858l1.732.99L8 9.838Zm.75 1.299 1.75-1v1.98l-1.75 1v-1.98Zm-1.5 0-1.75-1v1.98l1.75 1v-1.98Zm.254-4.723a1 1 0 0 1 .992 0l3 1.714a1 1 0 0 1 .504.868v3.41a1 1 0 0 1-.504.87l-3 1.713a1 1 0 0 1-.992 0l-3-1.714A1 1 0 0 1 4 12.407v-3.41a1 1 0 0 1 .504-.87l3-1.713Z" fill="#000"/></svg>',ee='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.424 2.023a.75.75 0 0 1 .556.904L7.48 13.42a.75.75 0 0 1-1.46-.348L8.52 2.58a.75.75 0 0 1 .904-.556ZM11.16 4.22a.75.75 0 0 1 1.06 0l3.25 3.25L16 8l-.53.53-3.25 3.25a.75.75 0 1 1-1.06-1.06L13.88 8l-2.72-2.72a.75.75 0 0 1 0-1.06ZM4.84 5.28a.75.75 0 1 0-1.06-1.06L.53 7.47 0 8l.53.53 3.25 3.25a.75.75 0 0 0 1.06-1.06L2.12 8l2.72-2.72Z" fill="#000"/></svg>',te='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 1a.75.75 0 0 0 0 1.5h6.5a3.25 3.25 0 0 1 3.25 3.25V9.5h-.75a.75.75 0 0 0 0 1.5H15V5.75A4.75 4.75 0 0 0 10.25 1h-6.5ZM13 14.25a.75.75 0 0 1-.75.75h-6.5A4.75 4.75 0 0 1 1 10.25V5h2.25a.75.75 0 0 1 0 1.5H2.5v3.75a3.25 3.25 0 0 0 3.25 3.25h6.5a.75.75 0 0 1 .75.75ZM6.22 5.22a.75.75 0 0 1 1.06 0l2.25 2.25.53.53-.53.53-2.25 2.25a.75.75 0 1 1-1.06-1.06L7.94 8 6.22 6.28a.75.75 0 0 1 0-1.06Z" fill="#000"/></svg>',ae='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5v8h13v-8h-13ZM1 12h4v1.5H3.75a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5H11V12h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Zm5.5 1.5V12h3v1.5h-3Zm5-7.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5ZM7.75 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 7.75 4ZM5.5 6.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" fill="#000"/></svg>',ne='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 1a.75.75 0 0 1 .75.75V3h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2V1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 .75-.75ZM2.5 7.5v6h11v-6h-11Zm0-1.5h11V4.5h-11V6Zm7.78 2.97a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-1.25-1.25a.75.75 0 1 1 1.06-1.06l.72.72 1.72-1.72a.75.75 0 0 1 1.06 0Z" fill="#000"/></svg>',le=`<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m16 .776.027-.803-.803.027-1.309.046A10.75 10.75 0 0 0 5.753 4.25H3.667A2.75 2.75 0 0 0 .962 6.504l-.8 4.36L0 11.75h2.69l1.56 1.56V16l.885-.162 4.36-.8a2.75 2.75 0 0 0 2.255-2.705v-2.086a10.75 10.75 0 0 0 4.204-8.162L16 .775ZM9.348 9.988l-4.2 2.1-1.235-1.236 2.1-4.2a9.25 9.25 0 0 1 7.954-5.107l.506-.018-.018.506a9.25 9.25 0 0 1-5.107 7.955ZM5.75 14.2v-.736l4.268-2.135.232-.116v1.12a1.25 1.25 0 0 1-1.025 1.23L5.75 14.2Zm-3.214-3.95 2.135-4.268.115-.232h-1.12a1.25 1.25 0 0 0-1.229 1.025L1.8 10.25h.736ZM10.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM12 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="#000"/></svg>
`,oe='<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm.63 2.113a3 3 0 1 0-4.259 0A3.997 3.997 0 0 0 1 9.5V13a2 2 0 0 0 2 2h4c.597 0 1.134-.262 1.5-.677.366.415.903.677 1.5.677h3a2 2 0 0 0 2-2v-2c0-1.218-.622-2.29-1.565-2.917a2.5 2.5 0 1 0-3.87 0c-.241.16-.462.35-.656.564a4.005 4.005 0 0 0-1.78-2.534ZM5 7a2.5 2.5 0 0 0-2.5 2.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V9.5A2.5 2.5 0 0 0 5 7Zm7.5-.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 2.5a2 2 0 0 0-2 2v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2a2 2 0 0 0-2-2Z" fill="#000"/></svg>';var se=c('<div class="logo svelte-13k58te"><!></div>');function z(w,n){let t="";switch(n.name){case"users":t=oe;break;case"planning":t=ne;break;case"code":t=ee;break;case"rocket":t=le;break;case"deployments":t=te;break;case"cloud-pod":t=$;break;case"monitor":t=ae;break;case"chart":t=Y;break;default:t="",console.log("ERROR: HeaderIcon unknown icon name "+n.name)}var h=se(),d=M(h);T(d,()=>t),Z(h),r(w,h)}const ie='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-open size-4"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path></svg>',re='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder size-4"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>',de='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file size-4"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>';var ce=c('<div class="logo svelte-1graggf"><!></div>');function ve(w,n){var g,v,_;E(n,!0);let t="";(((v=(g=n.node)==null?void 0:g.children)==null?void 0:v.length)||0)>1?(_=n.node)!=null&&_.expended?t=ie:t=re:t=de;var d=ce(),s=M(d);T(s,()=>t),Z(d),r(w,d),F()}var he=c('<a><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" class="svelte-kxrwdh"><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path></svg></a>');function pe(w,n){let t=y(n,"open",11,!1),h=y(n,"class",3,""),d=y(n,"onclick",3,()=>{});var s=he();s.__click=function(...g){var v;(v=d())==null||v.apply(this,g)},m(()=>{O(s,`${`treeicon ${h()}`??""} svelte-kxrwdh`),I(s,"open",t())}),r(w,s)}j(["click"]);var xe=c("<!> <!> <span> </span>",1),ue=c("<!> <span> </span>",1),we=c('<span style="padding-left:30px"> </span>'),ge=c("<span> </span> <!>",1),fe=c("<span> </span>"),me=c("<!> <!>",1),_e=c("<span> </span> <!>",1),ke=c("<span> </span>"),Me=c("<!> <!>",1),Ze=c("<!> <span> </span>",1),ye=c("<span> </span>"),be=c("<h1>Material-Design</h1> <!> <h1>FluentUI2</h1> <!> <h1>Gitlab</h1> <!> <h1>Shadcn</h1> <!> <h1>Tailwind</h1> <!>",1);function Be(w){var n=be(),t=f(b(n),2);H(t,{model:N,defaultOpen:!1,indent:20,treeLine:!0,virtualization:!0,class:"mtl-tree",style:"height: auto",tree_slot:(_,e)=>{let p=()=>e==null?void 0:e().data,l=()=>e==null?void 0:e().info;var x=xe(),k=b(x);B(k,()=>l().children.length,i=>{U(i,{onclick:()=>l().toggleExpand(),get open(){return l().expended},set open(V){l().expended=V},$$legacy:!0})});var u=f(k,2);D(u,{class:"mtl-checkbox mtl-mr",get value(){return l().checked},set value(i){l().checked=i},$$legacy:!0});var o=f(u,2),a=M(o,!0);Z(o),m(()=>L(a,p().text)),r(_,x)},$$slots:{tree_slot:!0}});var h=f(t,4);H(h,{model:P,defaultOpen:!1,indent:10,treeLine:!1,virtualization:!0,class:"fluentui2",style:"height: auto",tree_slot:(_,e)=>{let p=()=>e==null?void 0:e().data,l=()=>e==null?void 0:e().info;var x=C(),k=b(x);B(k,()=>l().children.length,u=>{var o=ue(),a=b(o);K(a,{onclick:()=>l().toggleExpand(),get open(){return l().expended},set open(A){l().expended=A},$$legacy:!0});var i=f(a,2),V=M(i,!0);Z(i),m(()=>L(V,p().text)),r(u,o)},u=>{var o=we(),a=M(o,!0);Z(o),m(()=>L(a,p().text)),r(u,o)}),r(_,x)},$$slots:{tree_slot:!0}});var d=f(h,4);H(d,{model:S,defaultOpen:!1,indent:10,treeLine:!1,treeLineOffset:0,virtualization:!0,class:"gitlab",style:"height: auto",tree_slot:(_,e)=>{let p=()=>e==null?void 0:e().data,l=()=>e==null?void 0:e().info;var x=me(),k=b(x);z(k,{get name(){return p().icon}});var u=f(k,2);B(u,()=>l().children.length,o=>{var a=ge(),i=b(a),V=M(i,!0);Z(i);var A=f(i,2);X(A,{onclick:()=>l().toggleExpand(),get open(){return l().expended},set open(R){l().expended=R},$$legacy:!0}),m(()=>L(V,p().text)),r(o,a)},o=>{var a=fe(),i=M(a,!0);Z(a),m(()=>L(i,p().text)),r(o,a)}),r(_,x)},$$slots:{tree_slot:!0}});var s=f(d,4);H(s,{model:q,defaultOpen:!1,indent:15,treeLine:!0,virtualization:!0,class:"shadcn",style:"height: auto",tree_slot:(_,e)=>{let p=()=>e==null?void 0:e().data,l=()=>e==null?void 0:e().info;var x=Me(),k=b(x);z(k,{get name(){return p().icon}});var u=f(k,2);B(u,()=>l().children.length,o=>{var a=_e(),i=b(a),V=M(i,!0);Z(i);var A=f(i,2);ve(A,{get node(){return l()}}),m(()=>L(V,p().text)),r(o,a)},o=>{var a=ke(),i=M(a,!0);Z(a),m(()=>L(i,p().text)),r(o,a)}),r(_,x)},$$slots:{tree_slot:!0}});var g=f(s,4);H(g,{model:G,defaultOpen:!1,indent:250,treeLine:!0,virtualization:!0,class:"tailwind",style:"height: auto",tree_slot:(_,e)=>{let p=()=>e==null?void 0:e().data,l=()=>e==null?void 0:e().info;var x=C(),k=b(x);B(k,()=>l().children.length,u=>{var o=Ze(),a=b(o);pe(a,{onclick:()=>l().toggleExpand(),get open(){return l().expended},set open(A){l().expended=A},$$legacy:!0});var i=f(a,2),V=M(i,!0);Z(i),m(()=>L(V,p().text)),r(u,o)},u=>{var o=ye(),a=M(o,!0);Z(o),m(()=>L(a,p().text)),r(u,o)}),r(_,x)},$$slots:{tree_slot:!0}}),r(w,n)}export{Be as component};
