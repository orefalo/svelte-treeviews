var Ye=Object.defineProperty;var Ce=s=>{throw TypeError(s)};var pe=(s,e,t)=>e in s?Ye(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var _=(s,e,t)=>pe(s,typeof e!="symbol"?e+"":e,t),$e=(s,e,t)=>e.has(s)||Ce("Cannot "+t);var k=(s,e,t)=>($e(s,e,"read from private field"),t?t.call(s):e.get(s)),H=(s,e,t)=>e.has(s)?Ce("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);import{d as et,p as m,t as q,a as O,b as L,s as ke,c as tt,r as nt,e as it,g as c,f as F,h as me,u as ge,i as j,j as J,k as D,l as Pe,m as st,n as oe,o as ve,q as G,v as xe,w as le,x as _e,y as R,z as S,A as x,B as dt,V as rt,C as ae,D as Ne,E as we,F as lt,G as at,H as ot,I as ct,J as ht}from"./external.DZkWoF1Q.js";var ft=L('<a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-1t1owd"><path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"></path></svg></a>');function Ht(s,e){let t=m(e,"open",11,!1),n=m(e,"class",3,""),i=m(e,"onclick",3,()=>{});var d=ft();d.__click=function(...a){var r;(r=i())==null||r.apply(this,a)},q(()=>{ke(d,`${`treeicon ${n()}`??""} svelte-1t1owd`),tt(d,"open",t())}),O(s,d)}et(["click"]);var ut=L('<input type="checkbox">');function Ft(s,e){let t=m(e,"value",15),n=F(()=>t()===0);var i=ut();nt(i),q(()=>{ke(i,e.class),i.indeterminate=c(n)}),it(i,t),O(s,i)}var gt=L('<div class="tree-line tree-vline svelte-gfld7i"></div>'),vt=L('<div class="tree-line tree-hline svelte-gfld7i"></div>'),_t=L("<!> <!>",1),It=L('<div><!> <div class="tree-node-inner"><!></div></div>');function yt(s,e){me(e,!0);let t=F(()=>e.style?`${e.style};${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`:`${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`),n=F(()=>`${e.rtl?"right":"left"}:${(e.nodeInfo.level-2)*e.indent+e.treeLineOffset}px`);ge(()=>{var f,b;e.nodeInfo.checked,!i&&(f=e.processor)!=null&&f.afterOneCheckChanged(e.nodeInfo)&&((b=e.onNodeChecked)==null||b.call(e,e.nodeInfo))}),ge(()=>{var b,h;const f=e.nodeInfo.expended;i||(f?(b=e.onNodeOpened)==null||b.call(e,e.nodeInfo):(h=e.onNodeClosed)==null||h.call(e,e.nodeInfo),d())});let i=!1;const d=()=>{i=!0,setTimeout(()=>{i=!1},100)},a=F(()=>{const f=[],b=C=>{var K;if(C.parent){let T=(K=C.parent)==null?void 0:K.children.indexOf(C);do{T+=1;const U=C.parent.children[T];if(U){if(!U.hidden)return!0}else break}while(!0)}return!1},h=e.rtl?"right":"left",w=e.btt?"top":"bottom";let N=e.nodeInfo;for(;N;){const C=(N.level-2)*e.indent+e.treeLineOffset,K=b(N),T=()=>{f.push({style:`${h}:${C}px;${w}:${K?"0":"50%"}`})};N===e.nodeInfo?N.level>1&&T():K&&T(),N=N.parent}return f});var r=It();const o=F(()=>`${_e("tree-node",e.class,e.treeLine&&"tree-node--with-tree-line")??""} svelte-gfld7i`);var u=j(r);J(u,()=>e.treeLine,f=>{var b=_t(),h=D(b);Pe(h,17,()=>c(a),st,(N,C)=>{var K=gt();q(()=>le(K,"style",c(C).style)),O(N,K)});var w=oe(h,2);J(w,()=>e.nodeInfo.level>1,N=>{var C=vt();q(()=>le(C,"style",c(n))),O(N,C)}),O(f,b)});var g=oe(u,2),v=j(g);ve(v,()=>e.tn_slot,()=>({data:e.nodeInfo.data,info:e.nodeInfo})),G(g),G(r),q(()=>{ke(r,c(o)),le(r,"style",c(t))}),O(s,r),xe()}function Ie(s){return Object.prototype.toString.call(s)==="[object Array]"}function kt(s){return s[s.length-1]}function Ke(s,e){let t,n=0;for(;(t=s.indexOf(e))>-1;)s.splice(t,1),n++;return n}function mt(s,e,t){s.hasOwnProperty(e)||(s[e]=t)}function xt(s,e){return Object.keys(e).forEach(t=>{mt(s,t,e[t])}),s}function bt(s){const e={};return Object.keys(s).forEach(t=>{s[t]!==void 0&&(e[t]=s[t])}),e}function M(s,e,t={}){t=xt({...t},{childrenKey:"children"});const n=t.childrenKey,i=Ie(s)?s:[s];class d{}const a=(r,o,u)=>{t.reverse&&(r=r.slice(),r.reverse());const g=r.length;for(let v=0;v<g;v++){const f=r[v],b=t.reverse?g-v-1:v,h=u?[...u,b]:[];t.childFirst&&f[n]!=null&&a(f[n],f,h);const w=e(f,b,o,h);if(w===!1)throw new d;if(w==="skip children")continue;if(w==="skip siblings")break;t.childFirst||f[n]!=null&&a(f[n],f,h)}};try{a(i,null,Ie(s)?[]:null)}catch(r){if(!(r instanceof d))throw r}}function Ct(s,e){const t={childrenKey:"children"};e&&Object.assign(t,e);const n=t.childrenKey,i=t.nodeHandler,d=new ye;return d.childrenKey=n,M(s,(a,r,o,u)=>{let g=Object.assign({},a);g[n]&&(g[n]=[]),i&&(g=i(g,{oldNode:a,index:r,parent:o,path:u})),d.set(u,g)},{childrenKey:n}),d.data}class ye{constructor(e=[]){_(this,"data");_(this,"childrenKey","children");this.data=e}get rootChildren(){const{childrenKey:e}=this,{data:t}=this;return Ie(t)?t:t[e]}*iteratePath(e,t={}){const{childrenKey:n,rootChildren:i}=this;if(t.reverse){const d=[...this.iteratePath(e,{...t,reverse:!1})];d.reverse();for(const{path:a,node:r}of d)yield{path:a,node:r}}else{let d=[],a=i;for(const r of e){const o=[...d,r],u=a[r];yield{path:o,node:u},d=o,a=u[n]}}}getFamily(e){const t=[];for(const{node:n}of this.iteratePath(e))t.push(n);return t}get(e){return kt(this.getFamily(e))}getParentAndIndex(e){const t=e.slice(),n=t.pop();return{parent:this.get(t),index:n,parentPath:t}}getParent(e){return this.getParentAndIndex(e).parent}set(e,t){if(e===null||e.length===0)this.data=t;else{const{childrenKey:n}=this;let{rootChildren:i}=this;const{parent:d,index:a}=this.getParentAndIndex(e);let r;e.length===1?(i||(this.data?this.data[n]=[]:this.data=[]),r=i):(d[n]||(d[n]=[]),r=d[n]),r[a]=t}}delete(e){const{childrenKey:t,rootChildren:n}=this,{parent:i,index:d}=this.getParentAndIndex(e),a=e.length===1?n:i[t],r=a[d];return a.splice(d,1),r}walk(e,t){const{childrenKey:n,data:i}=this;return M(i,e,n)}clone(e={}){return Ct(this.data),bt({childrenKey:this.childrenKey,nodeHandler:e.nodeHandler||void 0})}}var X,Y,p,$,ee,te;class Q{constructor(e){_(this,"data");H(this,X,R(!1));_(this,"parent");H(this,Y,R(x([])));_(this,"level",0);H(this,p,R(!1));H(this,$,R(!1));_(this,"draggable");_(this,"droppable");H(this,ee,R(""));H(this,te,R(""));_(this,"_ignoreCheckedOnce");this.data=(e==null?void 0:e.data)||null,this.expended=(e==null?void 0:e.expended)||!1,this.parent=e==null?void 0:e.parent,this.children=(e==null?void 0:e.children)||[],this.level=(e==null?void 0:e.level)||0,this.hidden=(e==null?void 0:e.hidden)||!1,this.checked=(e==null?void 0:e.checked)||!1,this.draggable=e==null?void 0:e.draggable,this.droppable=e==null?void 0:e.droppable,this.style=e==null?void 0:e.style,this.class=e==null?void 0:e.class,this._ignoreCheckedOnce=e==null?void 0:e._ignoreCheckedOnce}get expended(){return c(k(this,X))}set expended(e){S(k(this,X),x(e))}get children(){return c(k(this,Y))}set children(e){S(k(this,Y),x(e))}get hidden(){return c(k(this,p))}set hidden(e){S(k(this,p),x(e))}get checked(){return c(k(this,$))}set checked(e){S(k(this,$),x(e))}get style(){return c(k(this,ee))}set style(e){S(k(this,ee),x(e))}get class(){return c(k(this,te))}set class(e){S(k(this,te),x(e))}toggleExpand(){this.expended=!this.expended}toggleChecked(){this.checked=!this.checked}}X=new WeakMap,Y=new WeakMap,p=new WeakMap,$=new WeakMap,ee=new WeakMap,te=new WeakMap;const V="children";class Te{constructor(e){_(this,"childrenKey",V);_(this,"defaultOpen",!1);_(this,"noInitialization",!1);this.childrenKey=(e==null?void 0:e.childrenKey)||V,this.defaultOpen=(e==null?void 0:e.defaultOpen)||!1,this.noInitialization=(e==null?void 0:e.noInitialization)||!1}}var ne,ie,se;class Nt{constructor(e,t){_(this,"rawData");H(this,ne,R(x([])));H(this,ie,R(x([])));H(this,se,R(x(new Map)));_(this,"options");_(this,"afterSetInfoNode");_(this,"afterRemoveInfoNode");_(this,"infoNodesHandler");_(this,"infoNodesFlatHandler");_(this,"infoHandler",e=>e);_(this,"initialized",!1);this.options=t||new Te}get nodeInfos(){return c(k(this,ne))}set nodeInfos(e){S(k(this,ne),x(e))}get nodeInfosToRender(){return c(k(this,ie))}set nodeInfosToRender(e){S(k(this,ie),x(e))}get _infosMap(){return c(k(this,se))}set _infosMap(e){S(k(this,se),x(e))}init(){if(!this.initialized){this.initialized=!0,console.log("TreeProcessor.init() called");const e=this.options.childrenKey,t=new ye([]);this._infosMap.clear(),M(this.rawData,(i,d,a,r)=>{const o=this.infoHandler(new Q({data:i,expended:this.options.defaultOpen,parent:t.getParent(r),children:[],level:r.length}));this._infosMap.set(i,o),t.set(r,o)},{childrenKey:e});const n=[];t.walk(i=>{n.push(i)}),this.nodeInfos=this.infoNodesHandler?this.infoNodesHandler(t.rootChildren):t.rootChildren,this.nodeInfosToRender=this.infoNodesFlatHandler?this.infoNodesFlatHandler(n):n}}getNodeInfo(e){const t=this._infosMap.get(e);if(!t)throw new Oe("NodeInfo not found");return t}has(e){if(e instanceof Q)return this.nodeInfosToRender.indexOf(e)>-1;try{return(!!this.getNodeInfo(e)).valueOf()}catch(t){if(t instanceof Oe)return!1;throw t}}_getPathByStat(e){if(e===null)return[];const n=this.getSiblings(e).indexOf(e);return[...e.parent?this._getPathByStat(e.parent):[],n]}afterOneCheckChanged(e){const{checked:t}=e;if(e._ignoreCheckedOnce)return delete e._ignoreCheckedOnce,!1;const n=i=>{const d=i.parent;if(d){let a=!1,r=!1,o=!1;for(const g of d.children)g.checked?a=!0:g.checked===0?o=!0:r=!0;const u=o?0:r?a?0:!1:!0;d.checked!==u&&(this._ignoreCheckedOnce(d),d.checked=u),n(d)}};return n(e),M(e.children,i=>{i.checked!==t&&(this._ignoreCheckedOnce(i),i.checked=t)},{childrenKey:V}),!0}_ignoreCheckedOnce(e){e._ignoreCheckedOnce=!0,setTimeout(()=>{e._ignoreCheckedOnce&&(e._ignoreCheckedOnce=!1)},100)}isVisible(e){const t=e instanceof Q?e:this.getNodeInfo(e),n=i=>!i||!i.hidden&&i.expended&&n(i.parent);return!t.hidden&&n(t.parent)}updateCheckboxes(){M(this.nodeInfos,e=>{if(e.children&&e.children.length>0){const t=e.children.every(n=>n.checked);e.checked!==t&&(this._ignoreCheckedOnce(e),e.checked=t)}},{childFirst:!0,childrenKey:V})}getChecked(e=!1){return this.nodeInfosToRender.filter(t=>t.checked||e&&t.checked===0)}getUnchecked(e=!0){return this.nodeInfosToRender.filter(t=>e?!t.checked:t.checked===!1)}openAll(){for(const e of this.nodeInfosToRender)e.expended=!0}closeAll(){for(const e of this.nodeInfosToRender)e.expended=!1}openNodeAndParents(e){const t=e instanceof Q?e:this.getNodeInfo(e);for(const n of this.iterateParent(t,{withSelf:!0}))n.expended=!0}_calcFlatIndex(e,t){let n=e?this.nodeInfosToRender.indexOf(e)+1:0;const i=e?e.children:this.nodeInfos;for(let d=0;d<t;(d+=1)-1)n+=this._count(i[d]);return n}add(e,t,n){if(this.has(e))throw"Can't add because data exists in tree";const i=t?t.children:this.nodeInfos;n==null&&(n=i.length);const d=this.infoHandler(new Q({expended:!!this.options.defaultOpen,data:e,parent:t||void 0,children:[],level:t?t.level+1:1}));this._setPosition(d,t||void 0,n);const a=e[this.childrenKey];if(a){const r=a.slice();for(const o of r)this.add(o,d)}}remove(e){var n;const t=this.getSiblings(e);if(t.includes(e)){Ke(t,e);const i=this._flat(e);this.nodeInfosToRender.splice(this.nodeInfosToRender.indexOf(e),i.length);for(const d of i)this._infosMap.delete(d.data);return(n=this.afterRemoveInfoNode)==null||n.call(this,e),!0}return!1}getSiblings(e){const{parent:t}=e;return t?t.children:this.nodeInfos}_setPosition(e,t,n){var r;(t?t.children:this.nodeInfos).splice(n,0,e),e.parent=t,e.level=t?t.level+1:1;const d=this._calcFlatIndex(t,n),a=this._flat(e);this.nodeInfosToRender.splice(d,0,...a);for(const o of a)this._infosMap.has(o.data)||this._infosMap.set(o.data,o);M(e,(o,u,g)=>{g&&(o.level=g.level+1)},{childrenKey:V}),(r=this.afterSetInfoNode)==null||r.call(this,e,t,n)}*iterateParent(e,t){let n=t!=null&&t.withSelf?e:e.parent;for(;n;)yield n,n=n.parent}move(e,t,n){if(this.has(e)){if(e.parent===t&&this.getSiblings(e).indexOf(e)===n)return!1;if(e===t)throw new Error("Can't move node to itself");if(t&&e.level<t.level){let i;for(const d of this.iterateParent(t))if(d.level===e.level){i=d;break}if(e===i)throw new Error("Can't move node to its descendant")}this.remove(e)}return this._setPosition(e,t,n),!0}_flat(e){const t=[];return M(e,n=>{t.push(n)},{childrenKey:V}),t}_count(e){return this._flat(e).length}getData(e,t){const{childrenKey:n}=this.options,i=new ye([]);return i.childrenKey=n,M(t||this.nodeInfos,(d,a,r,o)=>{let u={...d.data,[n]:[]};e&&(u=e(u)),i.set(o,u)},{childrenKey:V}),i.data}}ne=new WeakMap,ie=new WeakMap,se=new WeakMap;class Oe extends Error{constructor(e){super(e),this.name="StatNotFoundError"}}class wt extends Te{constructor(t){super(t);_(this,"preProcessor")}filter(t,n){return t?t(n):n}}function Ot(s,e){const t=new wt(e),n=new Nt(s,t);return t.noInitialization||n.init(),n}var Pt=L('<div class="drag-placeholder he-tree-drag-placeholder"><!></div>');function Et(s,e){me(e,!0);let t=m(e,"updateBehavior",3,"modify"),n=m(e,"childrenKey",3,V),i=m(e,"indent",15,20),d=m(e,"virtualization",11,!1),a=m(e,"virtualizationPrerenderCount",3,20),r=m(e,"defaultOpen",11,!0),o=m(e,"rtl",15,!1),u=m(e,"btt",15,!1),g=m(e,"treeLine",15,!1),v=m(e,"treeLineOffset",7,8),f=m(e,"class",3,""),b=m(e,"style",3,""),h=m(e,"processor",23,()=>Ot([],{noInitialization:!0,defaultOpen:r()}));const w=l=>l?(l[n()]||(l[n()]=[]),l[n()]):c(W);h().afterSetInfoNode=(l,I,A)=>{let z=c(W);if(t()==="new"){if(E)return;z=re()}else if(t()==="modify"){const Z=w(I==null?void 0:I.data);Z.includes(l.data)||Z.splice(A,0,l.data)}else t();E||he(z)},h().afterRemoveInfoNode=l=>{var A;let I=c(W);if(t()==="new"){if(E)return;I=re()}else if(t()==="modify"){const z=w((A=l.parent)==null?void 0:A.data);Ke(z,l.data)}else t();E||he(I)};let N,C=R(x([])),K=R(x([])),T=null,U=!1,de={},E=!1,ce=!1,W=F(()=>e.model);ge(()=>{console.log("model change detected"),ce?ce=!1:(console.log("Initializing model"),h().rawData=e.model,h().init(),S(C,x(h().nodeInfos)),S(K,x(h().nodeInfosToRender)))});function Re(){let l=c(K)||[];return u()&&(l=l.slice().reverse()),l.filter(I=>De(I))}function Se(l){e.onUpdateValue&&e.onUpdateValue(l)}function he(l){return t()==="disabled"?!1:(l!==c(W)&&(ce=!0),Se(l),!0)}function ze(l){return h().getNodeInfo(l)}function Le(l){return h().has(l)}function He(l){return h().getChecked(l)}function Fe(l){return h().getUnchecked(l)}function Ee(){console.log("openAll"),h().openAll()}function Me(l){h().openNodeAndParents(l)}function Ve(){console.log("closeAll"),h().closeAll()}function De(l){return h().isVisible(l)}function Ue(l,I,A){return h().add(l,I,A)}function re(l,I){return h().getData(l,I)}function Be(l){const I=qe(l);return E||he(t()==="new"?re():c(W)),I}function qe(l){const I=E;E=!0;const A=l();return E=I,A}var je=F(()=>_e("he-tree",f(),o()&&"he-tree--rtl rtl",U)),Ge=F(()=>!d()),Je=F(Re);return dt(rt(s,{get class(){return c(je)},get style(){return b()},get preRenderCount(){return a()},get isDisabled(){return c(Ge)},get items(){return c(Je)},vl_slot:(I,A)=>{let z=()=>A==null?void 0:A().item;var Z=ae(),We=D(Z);J(We,z,Ze=>{var Qe=F(()=>_e(z().class,{"drag-placeholder-wrapper":z().data===de,"dragging-node":z()===T}));yt(Ze,{get class(){return c(Qe)},get style(){return z().style},get nodeInfo(){return z()},get rtl(){return o()},set rtl(y){o(y)},get btt(){return u()},set btt(y){u(y)},get indent(){return i()},set indent(y){i(y)},get treeLine(){return g()},set treeLine(y){g(y)},get treeLineOffset(){return v()},set treeLineOffset(y){v(y)},get processor(){return h()},onNodeOpened:y=>{var P;return(P=e.onNodeOpened)==null?void 0:P.call(e,y)},onNodeClosed:y=>{var P;return(P=e.onNodeClosed)==null?void 0:P.call(e,y)},onNodeSelected:y=>{var P;return(P=e.onNodeSelected)==null?void 0:P.call(e,y)},onNodeChecked:y=>{var P;return(P=e.onNodeChecked)==null?void 0:P.call(e,y)},tn_slot:(y,P=Ne)=>{var be=ae(),Xe=D(be);J(Xe,()=>P().data===de,fe=>{var B=Pt(),ue=j(B);ve(ue,()=>e.placeholder??Ne),G(B),O(fe,B)},fe=>{var B=ae(),ue=D(B);ve(ue,()=>e.tree_slot,P),O(fe,B)}),O(y,be)},$$slots:{tn_slot:!0}})}),O(I,Z)},$$slots:{vl_slot:!0}}),I=>N=I,()=>N),xe({getNodeInfo:ze,has:Le,getChecked:He,getUnchecked:Fe,openAll:Ee,openNodeAndParents:Me,closeAll:Ve,add:Ue,getData:re,batchUpdate:Be})}var Kt=L('<div class="item svelte-1s0qzrn"><!></div>'),Tt=L('<section class="svelte-1s0qzrn"><!></section>'),At=L("<b> </b> <!>",1);function Ae(s,e){me(e,!0);let t=m(e,"tree",15),n=m(e,"node",7);const i=300;function d(v){n().children=v.detail.items}function a(v){n().children=v.detail.items,t({...t()})}var r=At(),o=D(r),u=j(o,!0);G(o);var g=oe(o,2);J(g,()=>{var v;return(v=n())==null?void 0:v.children},v=>{var f=Tt(),b=j(f);J(b,()=>n().children,h=>{var w=ae(),N=D(w);Pe(N,25,()=>n().children,C=>C.id,(C,K)=>{var T=Kt(),U=j(T);Ae(U,{get tree(){return t()},set tree(de){t(de)},get node(){return t()[c(K).id]}}),G(T),at(T,()=>ht,()=>({duration:i})),O(C,T)}),O(h,w)}),G(f),we("consider",f,d),we("finalize",f,a),lt(f,(h,w)=>ot(h,w),()=>({items:n().children||[],flipDurationMs:i,centreDraggedOnCursor:!0})),O(v,f)}),q(()=>{var v,f;le(o,"style",`color:${((v=n())==null?void 0:v.color)??""}`),ct(u,(f=n())==null?void 0:f.name)}),O(s,r),xe()}var Rt=L("<h3>Try dragging node2 into node3 and then node4 into node2</h3> <!>",1);function Mt(s){let e=R(x({node1:{name:"node 1",children:[{id:"node2"},{id:"node3"},{id:"node4"}],id:"node1"},node2:{name:"node 2",children:[{id:"node5"},{id:"node6"},{id:"node7"},{id:"node8"}],id:"node2"},node3:{name:"node 3",children:[{id:"node9"},{id:"node10"},{id:"node11"},{id:"node12"}],id:"node3"},node4:{name:"node 4",children:[{id:"node13"},{id:"node14"},{id:"node15"},{id:"node16"}],id:"node4",color:"salmon"}}));for(let i=5;i<17;(i+=1)-1)c(e)[`node${i}`]={id:`node${i}`,name:`item ${i}`};c(e).node10.color="steelblue",c(e).node11.color="steelblue",c(e).node14.color="orange",c(e).node15.color="orange",c(e).node6.color="forestgreen";var t=Rt(),n=oe(D(t),2);Ae(n,{get node(){return c(e).node1},get tree(){return c(e)},set tree(i){S(e,x(i))}}),O(s,t)}export{Mt as A,Ft as I,Ht as O,Et as T};
