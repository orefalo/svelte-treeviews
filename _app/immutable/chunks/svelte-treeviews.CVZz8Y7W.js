var st=Object.defineProperty;var Oe=i=>{throw TypeError(i)};var dt=(i,e,t)=>e in i?st(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var y=(i,e,t)=>dt(i,typeof e!="symbol"?e+"":e,t),lt=(i,e,t)=>e.has(i)||Oe("Cannot "+t);var m=(i,e,t)=>(lt(i,e,"read from private field"),t?t.call(i):e.get(i)),S=(i,e,t)=>e.has(i)?Oe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t);import{d as ot,p as k,r as at,t as J,b as ct,a as w,c as z,s as Se,g as c,e as A,f as me,u as ge,h as B,i as G,j as V,k as Ae,l as ht,m as le,n as ve,o as q,q as be,v as se,w as Ie,x as O,y as K,z as b,A as ft,V as ut,B as de,C as Ke,D as gt,E as vt,F as Te,G as It,H as _t,I as yt}from"./external.CS8MKAfd.js";ot(["click"]);var mt=z('<input type="checkbox">');function Ut(i,e){let t=k(e,"value",15),n=A(()=>t()===0);var s=mt();at(s),J(()=>{Se(s,e.class),s.indeterminate=c(n)}),ct(s,t),w(i,s)}var bt=z('<div class="tree-line tree-vline svelte-gfld7i"></div>'),xt=z('<div class="tree-line tree-hline svelte-gfld7i"></div>'),kt=z("<!> <!>",1),Nt=z('<div><!> <div class="tree-node-inner"><!></div></div>');function wt(i,e){me(e,!0);let t=A(()=>e.style?`${e.style};${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`:`${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`),n=A(()=>`${e.rtl?"right":"left"}:${(e.nodeInfo.level-2)*e.indent+e.treeLineOffset}px`);ge(()=>{var u,f;e.nodeInfo.checked,(u=e.processor)!=null&&u.afterOneCheckChanged(e.nodeInfo)&&((f=e.onNodeChecked)==null||f.call(e,e.nodeInfo))}),ge(()=>{var f,v;e.nodeInfo.expended?(f=e.onNodeOpened)==null||f.call(e,e.nodeInfo):(v=e.onNodeClosed)==null||v.call(e,e.nodeInfo)});const s=A(()=>{const u=[],f=_=>{var C;if(_.parent){let P=(C=_.parent)==null?void 0:C.children.indexOf(_);do{P+=1;const M=_.parent.children[P];if(M){if(!M.hidden)return!0}else break}while(!0)}return!1},v=e.rtl?"right":"left",R=e.btt?"top":"bottom";let o=e.nodeInfo;for(;o;){const _=(o.level-2)*e.indent+e.treeLineOffset,C=f(o),P=()=>{u.push({style:`${v}:${_}px;${R}:${C?"0":"50%"}`})};o===e.nodeInfo?o.level>1&&P():C&&P(),o=o.parent}return u});var r=Nt();const h=A(()=>`${Ie("tree-node",e.class,e.treeLine&&"tree-node--with-tree-line")??""} svelte-gfld7i`);var l=B(r);G(l,()=>e.treeLine,u=>{var f=kt(),v=V(f);Ae(v,17,()=>c(s),ht,(o,_)=>{var C=bt();J(()=>se(C,"style",c(_).style)),w(o,C)});var R=le(v,2);G(R,()=>e.nodeInfo.level>1,o=>{var _=xt();J(()=>se(_,"style",c(n))),w(o,_)}),w(u,f)});var a=le(l,2),I=B(a);ve(I,()=>e.tn_slot,()=>({data:e.nodeInfo.data,info:e.nodeInfo})),q(a),q(r),J(()=>{Se(r,c(h)),se(r,"style",c(t))}),w(i,r),be()}function _e(i){return Object.prototype.toString.call(i)==="[object Array]"}function Ct(i){return i[i.length-1]}function ze(i,e){let t,n=0;for(;(t=i.indexOf(e))>-1;)i.splice(t,1),n++;return n}function Pt(i,e,t){i.hasOwnProperty(e)||(i[e]=t)}function Ot(i,e){return Object.keys(e).forEach(t=>{Pt(i,t,e[t])}),i}function Kt(i){const e={};return Object.keys(i).forEach(t=>{i[t]!==void 0&&(e[t]=i[t])}),e}function H(i,e,t={}){t=Ot({...t},{childrenKey:"children"});const n=t.childrenKey,s=_e(i)?i:[i];class r{}const h=(l,a,I)=>{t.reverse&&(l=l.slice(),l.reverse());const u=l.length;for(let f=0;f<u;f++){const v=l[f],R=t.reverse?u-f-1:f,o=I?[...I,R]:[];t.childFirst&&v[n]!=null&&h(v[n],v,o);const _=e(v,R,a,o);if(_===!1)throw new r;if(_==="skip children")continue;if(_==="skip siblings")break;t.childFirst||v[n]!=null&&h(v[n],v,o)}};try{h(s,null,_e(i)?[]:null)}catch(l){if(!(l instanceof r))throw l}}function Tt(i,e){const t={childrenKey:"children"};e&&Object.assign(t,e);const n=t.childrenKey,s=t.nodeHandler,r=new ye;return r.childrenKey=n,H(i,(h,l,a,I)=>{let u=Object.assign({},h);u[n]&&(u[n]=[]),s&&(u=s(u,{oldNode:h,index:l,parent:a,path:I})),r.set(I,u)},{childrenKey:n}),r.data}class ye{constructor(e=[]){y(this,"data");y(this,"childrenKey","children");this.data=e}get rootChildren(){const{childrenKey:e}=this,{data:t}=this;return _e(t)?t:t[e]}*iteratePath(e,t={}){const{childrenKey:n,rootChildren:s}=this;if(t.reverse){const r=[...this.iteratePath(e,{...t,reverse:!1})];r.reverse();for(const{path:h,node:l}of r)yield{path:h,node:l}}else{let r=[],h=s;for(const l of e){const a=[...r,l],I=h[l];yield{path:a,node:I},r=a,h=I[n]}}}getFamily(e){const t=[];for(const{node:n}of this.iteratePath(e))t.push(n);return t}get(e){return Ct(this.getFamily(e))}getParentAndIndex(e){const t=e.slice(),n=t.pop();return{parent:this.get(t),index:n,parentPath:t}}getParent(e){return this.getParentAndIndex(e).parent}set(e,t){if(e===null||e.length===0)this.data=t;else{const{childrenKey:n}=this;let{rootChildren:s}=this;const{parent:r,index:h}=this.getParentAndIndex(e);let l;e.length===1?(s||(this.data?this.data[n]=[]:this.data=[]),l=s):(r[n]||(r[n]=[]),l=r[n]),l[h]=t}}delete(e){const{childrenKey:t,rootChildren:n}=this,{parent:s,index:r}=this.getParentAndIndex(e),h=e.length===1?n:s[t],l=h[r];return h.splice(r,1),l}walk(e,t){const{childrenKey:n,data:s}=this;return H(s,e,n)}clone(e={}){return Tt(this.data),Kt({childrenKey:this.childrenKey,nodeHandler:e.nodeHandler||void 0})}}var Q,X,Y,Z,p,$;class j{constructor(e){y(this,"data");S(this,Q,O(!1));y(this,"parent");S(this,X,O(b([])));y(this,"level",0);S(this,Y,O(!1));S(this,Z,O(!1));y(this,"draggable");y(this,"droppable");S(this,p,O(""));S(this,$,O(""));this.data=(e==null?void 0:e.data)||null,this.expended=(e==null?void 0:e.expended)||!1,this.parent=e==null?void 0:e.parent,this.children=(e==null?void 0:e.children)||[],this.level=(e==null?void 0:e.level)||0,this.hidden=(e==null?void 0:e.hidden)||!1,this.checked=(e==null?void 0:e.checked)||!1,this.draggable=e==null?void 0:e.draggable,this.droppable=e==null?void 0:e.droppable,this.style=e==null?void 0:e.style,this.class=e==null?void 0:e.class}get expended(){return c(m(this,Q))}set expended(e){K(m(this,Q),b(e))}get children(){return c(m(this,X))}set children(e){K(m(this,X),b(e))}get hidden(){return c(m(this,Y))}set hidden(e){K(m(this,Y),b(e))}get checked(){return c(m(this,Z))}set checked(e){K(m(this,Z),b(e))}get style(){return c(m(this,p))}set style(e){K(m(this,p),b(e))}get class(){return c(m(this,$))}set class(e){K(m(this,$),b(e))}toggleExpand(){this.expended=!this.expended}toggleChecked(){this.checked=!this.checked}}Q=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,p=new WeakMap,$=new WeakMap;const F="children";class Le{constructor(e){y(this,"childrenKey",F);y(this,"defaultOpen",!1);y(this,"noInitialization",!1);this.childrenKey=(e==null?void 0:e.childrenKey)||F,this.defaultOpen=(e==null?void 0:e.defaultOpen)||!1,this.noInitialization=(e==null?void 0:e.noInitialization)||!1}}var ee,te,ne;class Rt{constructor(e,t){y(this,"rawData");S(this,ee,O(b([])));S(this,te,O(b([])));S(this,ne,O(b(new Map)));y(this,"options");y(this,"afterSetInfoNode");y(this,"afterRemoveInfoNode");y(this,"infoNodesHandler");y(this,"infoNodesFlatHandler");y(this,"infoHandler",e=>e);y(this,"initialized",!1);this.options=t||new Le}get nodeInfos(){return c(m(this,ee))}set nodeInfos(e){K(m(this,ee),b(e))}get nodeInfosToRender(){return c(m(this,te))}set nodeInfosToRender(e){K(m(this,te),b(e))}get _infosMap(){return c(m(this,ne))}set _infosMap(e){K(m(this,ne),b(e))}init(){if(!this.initialized){this.initialized=!0,console.log("TreeProcessor.init() called");const e=this.options.childrenKey,t=new ye([]);this._infosMap.clear(),H(this.rawData,(s,r,h,l)=>{const a=this.infoHandler(new j({data:s,expended:this.options.defaultOpen,parent:t.getParent(l),children:[],level:l.length}));this._infosMap.set(s,a),t.set(l,a)},{childrenKey:e});const n=[];t.walk(s=>{n.push(s)}),this.nodeInfos=this.infoNodesHandler?this.infoNodesHandler(t.rootChildren):t.rootChildren,this.nodeInfosToRender=this.infoNodesFlatHandler?this.infoNodesFlatHandler(n):n}}getNodeInfo(e){const t=this._infosMap.get(e);if(!t)throw new Re("NodeInfo not found");return t}has(e){if(e instanceof j)return this.nodeInfosToRender.indexOf(e)>-1;try{return(!!this.getNodeInfo(e)).valueOf()}catch(t){if(t instanceof Re)return!1;throw t}}_getPathByStat(e){if(e===null)return[];const n=this.getSiblings(e).indexOf(e);return[...e.parent?this._getPathByStat(e.parent):[],n]}afterOneCheckChanged(e){const{checked:t}=e,n=s=>{const r=s.parent;if(r){let h=!1,l=!1,a=!1;for(const u of r.children)u.checked?h=!0:u.checked===0?a=!0:l=!0;const I=a?0:l?h?0:!1:!0;r.checked!==I&&(r.checked=I),n(r)}};return n(e),H(e.children,s=>{s.checked!==t&&(s.checked=t)},{childrenKey:F}),!0}isVisible(e){const t=e instanceof j?e:this.getNodeInfo(e),n=s=>!s||!s.hidden&&s.expended&&n(s.parent);return!t.hidden&&n(t.parent)}updateCheckboxes(){H(this.nodeInfos,e=>{if(e.children&&e.children.length>0){const t=e.children.every(n=>n.checked);e.checked!==t&&(e.checked=t)}},{childFirst:!0,childrenKey:F})}getChecked(e=!1){return this.nodeInfosToRender.filter(t=>t.checked||e&&t.checked===0)}getUnchecked(e=!0){return this.nodeInfosToRender.filter(t=>e?!t.checked:t.checked===!1)}openAll(){for(const e of this.nodeInfosToRender)e.expended=!0}closeAll(){for(const e of this.nodeInfosToRender)e.expended=!1}openNodeAndParents(e){const t=e instanceof j?e:this.getNodeInfo(e);for(const n of this.iterateParent(t,{withSelf:!0}))n.expended=!0}_calcFlatIndex(e,t){let n=e?this.nodeInfosToRender.indexOf(e)+1:0;const s=e?e.children:this.nodeInfos;for(let r=0;r<t;(r+=1)-1)n+=this._count(s[r]);return n}add(e,t,n){if(this.has(e))throw"Can't add because data exists in tree";const s=t?t.children:this.nodeInfos;n==null&&(n=s.length);const r=this.infoHandler(new j({expended:!!this.options.defaultOpen,data:e,parent:t||void 0,children:[],level:t?t.level+1:1}));this._setPosition(r,t||void 0,n);const h=e[this.childrenKey];if(h){const l=h.slice();for(const a of l)this.add(a,r)}}remove(e){var n;const t=this.getSiblings(e);if(t.includes(e)){ze(t,e);const s=this._flat(e);this.nodeInfosToRender.splice(this.nodeInfosToRender.indexOf(e),s.length);for(const r of s)this._infosMap.delete(r.data);return(n=this.afterRemoveInfoNode)==null||n.call(this,e),!0}return!1}getSiblings(e){const{parent:t}=e;return t?t.children:this.nodeInfos}_setPosition(e,t,n){var l;(t?t.children:this.nodeInfos).splice(n,0,e),e.parent=t,e.level=t?t.level+1:1;const r=this._calcFlatIndex(t,n),h=this._flat(e);this.nodeInfosToRender.splice(r,0,...h);for(const a of h)this._infosMap.has(a.data)||this._infosMap.set(a.data,a);H(e,(a,I,u)=>{u&&(a.level=u.level+1)},{childrenKey:F}),(l=this.afterSetInfoNode)==null||l.call(this,e,t,n)}*iterateParent(e,t){let n=t!=null&&t.withSelf?e:e.parent;for(;n;)yield n,n=n.parent}move(e,t,n){if(this.has(e)){if(e.parent===t&&this.getSiblings(e).indexOf(e)===n)return!1;if(e===t)throw new Error("Can't move node to itself");if(t&&e.level<t.level){let s;for(const r of this.iterateParent(t))if(r.level===e.level){s=r;break}if(e===s)throw new Error("Can't move node to its descendant")}this.remove(e)}return this._setPosition(e,t,n),!0}_flat(e){const t=[];return H(e,n=>{t.push(n)},{childrenKey:F}),t}_count(e){return this._flat(e).length}getData(e,t){const{childrenKey:n}=this.options,s=new ye([]);return s.childrenKey=n,H(t||this.nodeInfos,(r,h,l,a)=>{let I={...r.data,[n]:[]};e&&(I=e(I)),s.set(a,I)},{childrenKey:F}),s.data}}ee=new WeakMap,te=new WeakMap,ne=new WeakMap;class Re extends Error{constructor(e){super(e),this.name="StatNotFoundError"}}class St extends Le{constructor(t){super(t);y(this,"preProcessor")}filter(t,n){return t?t(n):n}}function At(i,e){const t=new St(e),n=new Rt(i,t);return t.noInitialization||n.init(),n}var zt=z('<div class="drag-placeholder he-tree-drag-placeholder"><!></div>');function Bt(i,e){me(e,!0);let t=k(e,"updateBehavior",3,"modify"),n=k(e,"childrenKey",3,F),s=k(e,"indent",15,20),r=k(e,"virtualization",11,!1),h=k(e,"virtualizationPrerenderCount",3,20),l=k(e,"defaultOpen",11,!0),a=k(e,"rtl",15,!1),I=k(e,"btt",15,!1),u=k(e,"treeLine",15,!1),f=k(e,"treeLineOffset",7,8),v=k(e,"class",3,""),R=k(e,"style",3,"");k(e,"selectionBehavior",3,"single");let o=k(e,"processor",23,()=>At([],{noInitialization:!0,defaultOpen:l()}));const _=d=>d?(d[n()]||(d[n()]=[]),d[n()]):c(W);o().afterSetInfoNode=(d,g,x)=>{let N=c(W);if(t()==="new"){if(L)return;N=re()}else if(t()==="modify"){const E=_(g==null?void 0:g.data);E.includes(d.data)||E.splice(x,0,d.data)}else t();L||ce(N)},o().afterRemoveInfoNode=d=>{var x;let g=c(W);if(t()==="new"){if(L)return;g=re()}else if(t()==="modify"){const N=_((x=d.parent)==null?void 0:x.data);ze(N,d.data)}else t();L||ce(g)};let C,P=O(b([])),M=O(b([])),D=null,oe=!1,ie={},L=!1,ae=!1,W=A(()=>e.model);ge(()=>{console.log("model change detected"),ae?ae=!1:(console.log("Initializing model"),o().rawData=e.model,o().init(),K(P,b(o().nodeInfos)),K(M,b(o().nodeInfosToRender)))});function Fe(d){}function Me(){let d=c(M);return I()&&(d=d.slice().reverse()),d.filter(g=>ke(g))}function Ee(){return c(P)}function Ve(d){e.onUpdateValue&&e.onUpdateValue(d)}function ce(d){return t()==="disabled"?!1:(d!==c(W)&&(ae=!0),Ve(d),!0)}function xe(d){return o().getNodeInfo(d)}function De(d){return o().has(d)}function Ue(d){return o().getChecked(d)}function Be(d){return o().getUnchecked(d)}function qe(){console.log("openAll"),o().openAll()}function Ge(d){o().openNodeAndParents(d)}function We(){console.log("closeAll"),o().closeAll()}function ke(d){return o().isVisible(d)}function je(d,g,x){return o().move(d,g,x)}function Ne(d,g,x){return o().add(d,g,x)}function Je(d,g,x){he(()=>{let N=x;for(const E of d)Ne(E,g,N),N!=null&&(N+=1)})}function we(d){return o().remove(d)}function Qe(d){const g=[...d];he(()=>{for(const x of g)we(xe(x))})}function Xe(d,g){return o().iterateParent(d,g)}function Ye(d){return o().getSiblings(d)}function re(d,g){return o().getData(d,g)}function he(d){const g=Ze(d);return L||ce(t()==="new"?re():c(W)),g}function Ze(d){const g=L;L=!0;const x=d();return L=g,x}var pe=A(()=>Ie("he-tree",v(),a()&&"he-tree--rtl rtl",oe)),$e=A(()=>!r()),et=A(Me);return ft(ut(i,{get class(){return c(pe)},get style(){return R()},get preRenderCount(){return h()},get isDisabled(){return c($e)},get items(){return c(et)},vl_slot:(g,x)=>{let N=()=>x==null?void 0:x().item;var E=de(),tt=V(E);G(tt,N,nt=>{var it=A(()=>Ie(N().class,{"drag-placeholder-wrapper":N().data===ie,"dragging-node":N()===D}));wt(nt,{get class(){return c(it)},get style(){return N().style},get nodeInfo(){return N()},get rtl(){return a()},set rtl(T){a(T)},get btt(){return I()},set btt(T){I(T)},get indent(){return s()},set indent(T){s(T)},get treeLine(){return u()},set treeLine(T){u(T)},get treeLineOffset(){return f()},set treeLineOffset(T){f(T)},get processor(){return o()},get onNodeOpened(){return e.onNodeOpened},get onNodeClosed(){return e.onNodeClosed},onNodeChecked:Fe,tn_slot:(T,Ce=Ke)=>{var Pe=de(),rt=V(Pe);G(rt,()=>Ce().data===ie,fe=>{var U=zt(),ue=B(U);ve(ue,()=>e.placeholder??Ke),q(U),w(fe,U)},fe=>{var U=de(),ue=V(U);ve(ue,()=>e.tree_slot,Ce),w(fe,U)}),w(T,Pe)},$$slots:{tn_slot:!0}})}),w(g,E)},$$slots:{vl_slot:!0}}),g=>C=g,()=>C),be({rootChildren:Ee,getNodeInfo:xe,has:De,getChecked:Ue,getUnchecked:Be,openAll:qe,openNodeAndParents:Ge,closeAll:We,isVisible:ke,move:je,add:Ne,addMulti:Je,remove:we,removeMulti:Qe,iterateParent:Xe,getSiblings:Ye,getData:re,batchUpdate:he})}var Lt=z('<div class="item svelte-1s0qzrn"><!></div>'),Ht=z('<section class="svelte-1s0qzrn"><!></section>'),Ft=z("<b> </b> <!>",1);function He(i,e){me(e,!0);let t=k(e,"tree",15),n=k(e,"node",7);const s=300;function r(f){n().children=f.detail.items}function h(f){n().children=f.detail.items,t({...t()})}var l=Ft(),a=V(l),I=B(a,!0);q(a);var u=le(a,2);G(u,()=>{var f;return(f=n())==null?void 0:f.children},f=>{var v=Ht(),R=B(v);G(R,()=>n().children,o=>{var _=de(),C=V(_);Ae(C,25,()=>n().children,P=>P.id,(P,M)=>{var D=Lt(),oe=B(D);He(oe,{get tree(){return t()},set tree(ie){t(ie)},get node(){return t()[c(M).id]}}),q(D),gt(D,()=>It,()=>({duration:s})),w(P,D)}),w(o,_)}),q(v),vt(v,(o,_)=>_t(o,_),()=>({items:n().children||[],flipDurationMs:s,centreDraggedOnCursor:!0})),Te("consider",v,r),Te("finalize",v,h),w(f,v)}),J(()=>{var f,v;se(a,"style",`color:${((f=n())==null?void 0:f.color)??""}`),yt(I,(v=n())==null?void 0:v.name)}),w(i,l),be()}var Mt=z("<h3>Try dragging node2 into node3 and then node4 into node2</h3> <!>",1);function qt(i){let e=O(b({node1:{name:"node 1",children:[{id:"node2"},{id:"node3"},{id:"node4"}],id:"node1"},node2:{name:"node 2",children:[{id:"node5"},{id:"node6"},{id:"node7"},{id:"node8"}],id:"node2"},node3:{name:"node 3",children:[{id:"node9"},{id:"node10"},{id:"node11"},{id:"node12"}],id:"node3"},node4:{name:"node 4",children:[{id:"node13"},{id:"node14"},{id:"node15"},{id:"node16"}],id:"node4",color:"salmon"}}));function t(){for(let r=5;r<17;(r+=1)-1)c(e)[`node${r}`]={id:`node${r}`,name:`item ${r}`};c(e).node10.color="steelblue",c(e).node11.color="steelblue",c(e).node14.color="orange",c(e).node15.color="orange",c(e).node6.color="forestgreen"}t();var n=Mt(),s=le(V(n),2);He(s,{get node(){return c(e).node1},get tree(){return c(e)},set tree(r){K(e,b(r))}}),w(i,n)}export{qt as A,Ut as I,Bt as T};
