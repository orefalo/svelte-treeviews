var Ue=Object.defineProperty;var be=d=>{throw TypeError(d)};var qe=(d,e,t)=>e in d?Ue(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var _=(d,e,t)=>qe(d,typeof e!="symbol"?e+"":e,t),je=(d,e,t)=>e.has(d)||be("Cannot "+t);var y=(d,e,t)=>(je(d,e,"read from private field"),t?t.call(d):e.get(d)),L=(d,e,t)=>e.has(d)?be("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(d):e.set(d,t);import{d as Ge,p as ye,u as fe,c as q,i as M,f as D,e as we,a as We,g as o,s as ae,t as re,b as w,h as ue,r as j,j as Ie,k as F,l as H,m as le,n as Je,o as ge,q as T,v as R,w as I,x,y as Qe,V as Xe,z as J,A as Ye,B as Ne,C as Ze,D as pe,E as $e,F as et,G as tt}from"./external.uDgEiTu0.js";Ge(["click"]);var nt=F('<div class="tree-line tree-vline svelte-gfld7i"></div>'),it=F('<div class="tree-line tree-hline svelte-gfld7i"></div>'),dt=F("<!> <!>",1),st=F('<div><!> <div class="tree-node-inner"><!></div></div>');function rt(d,e){ye(e,!0);let t=H(()=>e.style?`${e.style};${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`:`${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`),n=H(()=>`${e.rtl?"right":"left"}:${(e.nodeInfo.level-2)*e.indent+e.treeLineOffset}px`);fe(()=>{var c,k;e.nodeInfo.checked,!i&&(c=e.processor)!=null&&c.afterOneCheckChanged(e.nodeInfo)&&((k=e.onNodeChecked)==null||k.call(e,e.nodeInfo))}),fe(()=>{var k,f;const c=e.nodeInfo.expended;i||(c?(k=e.onNodeOpened)==null||k.call(e,e.nodeInfo):(f=e.onNodeClosed)==null||f.call(e,e.nodeInfo),s())});let i=!1;const s=()=>{i=!0,setTimeout(()=>{i=!1},100)},l=H(()=>{const c=[],k=m=>{var K;if(m.parent){let P=(K=m.parent)==null?void 0:K.children.indexOf(m);do{P+=1;const B=m.parent.children[P];if(B){if(!B.hidden)return!0}else break}while(!0)}return!1},f=e.rtl?"right":"left",b=e.btt?"top":"bottom";let C=e.nodeInfo;for(;C;){const m=(C.level-2)*e.indent+e.treeLineOffset,K=k(C),P=()=>{c.push({style:`${f}:${m}px;${b}:${K?"0":"50%"}`})};C===e.nodeInfo?C.level>1&&P():K&&P(),C=C.parent}return c});var r=st();const a=H(()=>`${ge("tree-node",e.class,e.treeLine&&"tree-node--with-tree-line")??""} svelte-gfld7i`);var u=q(r);M(u,()=>e.treeLine,c=>{var k=dt(),f=D(k);we(f,17,()=>o(l),We,(C,m)=>{var K=nt();re(()=>le(K,"style",o(m).style)),w(C,K)});var b=ae(f,2);M(b,()=>e.nodeInfo.level>1,C=>{var m=it();re(()=>le(m,"style",o(n))),w(C,m)}),w(c,k)});var g=ae(u,2),v=q(g);ue(v,()=>e.tn_slot,()=>({data:e.nodeInfo.data,info:e.nodeInfo})),j(g),j(r),re(()=>{Je(r,o(a)),le(r,"style",o(t))}),w(d,r),Ie()}function ve(d){return Object.prototype.toString.call(d)==="[object Array]"}function lt(d){return d[d.length-1]}function Ke(d,e){let t,n=0;for(;(t=d.indexOf(e))>-1;)d.splice(t,1),n++;return n}function at(d,e,t){d.hasOwnProperty(e)||(d[e]=t)}function ot(d,e){return Object.keys(e).forEach(t=>{at(d,t,e[t])}),d}function ct(d){const e={};return Object.keys(d).forEach(t=>{d[t]!==void 0&&(e[t]=d[t])}),e}function E(d,e,t={}){t=ot({...t},{childrenKey:"children"});const n=t.childrenKey,i=ve(d)?d:[d];class s{}const l=(r,a,u)=>{t.reverse&&(r=r.slice(),r.reverse());const g=r.length;for(let v=0;v<g;v++){const c=r[v],k=t.reverse?g-v-1:v,f=u?[...u,k]:[];t.childFirst&&c[n]!=null&&l(c[n],c,f);const b=e(c,k,a,f);if(b===!1)throw new s;if(b==="skip children")continue;if(b==="skip siblings")break;t.childFirst||c[n]!=null&&l(c[n],c,f)}};try{l(i,null,ve(d)?[]:null)}catch(r){if(!(r instanceof s))throw r}}function ht(d,e){const t={childrenKey:"children"};e&&Object.assign(t,e);const n=t.childrenKey,i=t.nodeHandler,s=new _e;return s.childrenKey=n,E(d,(l,r,a,u)=>{let g=Object.assign({},l);g[n]&&(g[n]=[]),i&&(g=i(g,{oldNode:l,index:r,parent:a,path:u})),s.set(u,g)},{childrenKey:n}),s.data}class _e{constructor(e=[]){_(this,"data");_(this,"childrenKey","children");this.data=e}get rootChildren(){const{childrenKey:e}=this,{data:t}=this;return ve(t)?t:t[e]}*iteratePath(e,t={}){const{childrenKey:n,rootChildren:i}=this;if(t.reverse){const s=[...this.iteratePath(e,{...t,reverse:!1})];s.reverse();for(const{path:l,node:r}of s)yield{path:l,node:r}}else{let s=[],l=i;for(const r of e){const a=[...s,r],u=l[r];yield{path:a,node:u},s=a,l=u[n]}}}getFamily(e){const t=[];for(const{node:n}of this.iteratePath(e))t.push(n);return t}get(e){return lt(this.getFamily(e))}getParentAndIndex(e){const t=e.slice(),n=t.pop();return{parent:this.get(t),index:n,parentPath:t}}getParent(e){return this.getParentAndIndex(e).parent}set(e,t){if(e===null||e.length===0)this.data=t;else{const{childrenKey:n}=this;let{rootChildren:i}=this;const{parent:s,index:l}=this.getParentAndIndex(e);let r;e.length===1?(i||(this.data?this.data[n]=[]:this.data=[]),r=i):(s[n]||(s[n]=[]),r=s[n]),r[l]=t}}delete(e){const{childrenKey:t,rootChildren:n}=this,{parent:i,index:s}=this.getParentAndIndex(e),l=e.length===1?n:i[t],r=l[s];return l.splice(s,1),r}walk(e,t){const{childrenKey:n,data:i}=this;return E(i,e,n)}clone(e={}){return ht(this.data),ct({childrenKey:this.childrenKey,nodeHandler:e.nodeHandler||void 0})}}var Q,X,Y,Z,p,$;class W{constructor(e){_(this,"data");L(this,Q,T(!1));_(this,"parent");L(this,X,T(I([])));_(this,"level",0);L(this,Y,T(!1));L(this,Z,T(!1));_(this,"draggable");_(this,"droppable");L(this,p,T(""));L(this,$,T(""));_(this,"_ignoreCheckedOnce");this.data=(e==null?void 0:e.data)||null,this.expended=(e==null?void 0:e.expended)||!1,this.parent=e==null?void 0:e.parent,this.children=(e==null?void 0:e.children)||[],this.level=(e==null?void 0:e.level)||0,this.hidden=(e==null?void 0:e.hidden)||!1,this.checked=(e==null?void 0:e.checked)||!1,this.draggable=e==null?void 0:e.draggable,this.droppable=e==null?void 0:e.droppable,this.style=e==null?void 0:e.style,this.class=e==null?void 0:e.class,this._ignoreCheckedOnce=e==null?void 0:e._ignoreCheckedOnce}get expended(){return o(y(this,Q))}set expended(e){R(y(this,Q),I(e))}get children(){return o(y(this,X))}set children(e){R(y(this,X),I(e))}get hidden(){return o(y(this,Y))}set hidden(e){R(y(this,Y),I(e))}get checked(){return o(y(this,Z))}set checked(e){R(y(this,Z),I(e))}get style(){return o(y(this,p))}set style(e){R(y(this,p),I(e))}get class(){return o(y(this,$))}set class(e){R(y(this,$),I(e))}toggleExpand(){console.log("nodeInfo.toggleExpand"),this.expended=!this.expended,console.log(this.expended)}toggleChecked(){console.log("nodeInfo.toggleChecked"),this.checked=!this.checked,console.log(this.checked)}}Q=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,p=new WeakMap,$=new WeakMap;const V="children";class Pe{constructor(e){_(this,"childrenKey",V);_(this,"defaultOpen",!1);_(this,"noInitialization",!1);this.childrenKey=(e==null?void 0:e.childrenKey)||V,this.defaultOpen=(e==null?void 0:e.defaultOpen)||!1,this.noInitialization=(e==null?void 0:e.noInitialization)||!1}}var ee,te,ne;class ft{constructor(e,t){_(this,"rawData");L(this,ee,T(I([])));L(this,te,T(I([])));L(this,ne,T(I(new Map)));_(this,"options");_(this,"afterSetInfoNode");_(this,"afterRemoveInfoNode");_(this,"infoNodesHandler");_(this,"infoNodesFlatHandler");_(this,"infoHandler",e=>e);_(this,"initialized",!1);this.options=t||new Pe}get nodeInfos(){return o(y(this,ee))}set nodeInfos(e){R(y(this,ee),I(e))}get nodeInfosToRender(){return o(y(this,te))}set nodeInfosToRender(e){R(y(this,te),I(e))}get _infosMap(){return o(y(this,ne))}set _infosMap(e){R(y(this,ne),I(e))}init(){if(!this.initialized){this.initialized=!0,console.log("TreeProcessor.init() called");const e=this.options.childrenKey,t=new _e([]);this._infosMap.clear(),E(this.rawData,(i,s,l,r)=>{const a=this.infoHandler(new W({data:i,expended:this.options.defaultOpen,parent:t.getParent(r),children:[],level:r.length}));this._infosMap.set(i,a),t.set(r,a)},{childrenKey:e}),console.log("td",t);const n=[];t.walk(i=>{n.push(i)}),console.log("flat",n),this.nodeInfos=this.infoNodesHandler?this.infoNodesHandler(t.rootChildren):t.rootChildren,this.nodeInfosToRender=this.infoNodesFlatHandler?this.infoNodesFlatHandler(n):n}}getNodeInfo(e){const t=this._infosMap.get(e);if(!t)throw new Oe("NodeInfo not found");return t}has(e){if(e instanceof W)return this.nodeInfosToRender.indexOf(e)>-1;try{return(!!this.getNodeInfo(e)).valueOf()}catch(t){if(t instanceof Oe)return!1;throw t}}_getPathByStat(e){if(e===null)return[];const n=this.getSiblings(e).indexOf(e);return[...e.parent?this._getPathByStat(e.parent):[],n]}afterOneCheckChanged(e){const{checked:t}=e;if(e._ignoreCheckedOnce)return delete e._ignoreCheckedOnce,!1;const n=i=>{const s=i.parent;if(s){let l=!1,r=!1,a=!1;for(const g of s.children)g.checked?l=!0:g.checked===0?a=!0:r=!0;const u=a?0:r?l?0:!1:!0;s.checked!==u&&(this._ignoreCheckedOnce(s),s.checked=u),n(s)}};return n(e),E(e.children,i=>{i.checked!==t&&(this._ignoreCheckedOnce(i),i.checked=t)},{childrenKey:V}),!0}_ignoreCheckedOnce(e){e._ignoreCheckedOnce=!0,setTimeout(()=>{e._ignoreCheckedOnce&&(e._ignoreCheckedOnce=!1)},100)}isVisible(e){const t=e instanceof W?e:this.getNodeInfo(e),n=i=>!i||!i.hidden&&i.expended&&n(i.parent);return!t.hidden&&n(t.parent)}updateCheckboxes(){E(this.nodeInfos,e=>{if(e.children&&e.children.length>0){const t=e.children.every(n=>n.checked);e.checked!==t&&(this._ignoreCheckedOnce(e),e.checked=t)}},{childFirst:!0,childrenKey:V})}getChecked(e=!1){return this.nodeInfosToRender.filter(t=>t.checked||e&&t.checked===0)}getUnchecked(e=!0){return this.nodeInfosToRender.filter(t=>e?!t.checked:t.checked===!1)}openAll(){for(const e of this.nodeInfosToRender)e.expended=!0}closeAll(){for(const e of this.nodeInfosToRender)e.expended=!1}openNodeAndParents(e){const t=e instanceof W?e:this.getNodeInfo(e);for(const n of this.iterateParent(t,{withSelf:!0}))n.expended=!0}_calcFlatIndex(e,t){let n=e?this.nodeInfosToRender.indexOf(e)+1:0;const i=e?e.children:this.nodeInfos;for(let s=0;s<t;(s+=1)-1)n+=this._count(i[s]);return n}add(e,t,n){if(this.has(e))throw"Can't add because data exists in tree";const i=t?t.children:this.nodeInfos;n==null&&(n=i.length);const s=this.infoHandler(new W({expended:!!this.options.defaultOpen,data:e,parent:t||void 0,children:[],level:t?t.level+1:1}));this._setPosition(s,t||void 0,n);const l=e[this.childrenKey];if(l){const r=l.slice();for(const a of r)this.add(a,s)}}remove(e){var n;const t=this.getSiblings(e);if(t.includes(e)){Ke(t,e);const i=this._flat(e);this.nodeInfosToRender.splice(this.nodeInfosToRender.indexOf(e),i.length);for(const s of i)this._infosMap.delete(s.data);return(n=this.afterRemoveInfoNode)==null||n.call(this,e),!0}return!1}getSiblings(e){const{parent:t}=e;return t?t.children:this.nodeInfos}_setPosition(e,t,n){var r;(t?t.children:this.nodeInfos).splice(n,0,e),e.parent=t,e.level=t?t.level+1:1;const s=this._calcFlatIndex(t,n),l=this._flat(e);this.nodeInfosToRender.splice(s,0,...l);for(const a of l)this._infosMap.has(a.data)||this._infosMap.set(a.data,a);E(e,(a,u,g)=>{g&&(a.level=g.level+1)},{childrenKey:V}),(r=this.afterSetInfoNode)==null||r.call(this,e,t,n)}*iterateParent(e,t){let n=t!=null&&t.withSelf?e:e.parent;for(;n;)yield n,n=n.parent}move(e,t,n){if(this.has(e)){if(e.parent===t&&this.getSiblings(e).indexOf(e)===n)return!1;if(e===t)throw new Error("Can't move node to itself");if(t&&e.level<t.level){let i;for(const s of this.iterateParent(t))if(s.level===e.level){i=s;break}if(e===i)throw new Error("Can't move node to its descendant")}this.remove(e)}return this._setPosition(e,t,n),!0}_flat(e){const t=[];return E(e,n=>{t.push(n)},{childrenKey:V}),t}_count(e){return this._flat(e).length}getData(e,t){const{childrenKey:n}=this.options,i=new _e([]);return i.childrenKey=n,E(t||this.nodeInfos,(s,l,r,a)=>{let u={...s.data,[n]:[]};e&&(u=e(u)),i.set(a,u)},{childrenKey:V}),i.data}}ee=new WeakMap,te=new WeakMap,ne=new WeakMap;class Oe extends Error{constructor(e){super(e),this.name="StatNotFoundError"}}class ut extends Pe{constructor(t){super(t);_(this,"preProcessor")}filter(t,n){return t?t(n):n}}function gt(d,e){const t=new ut(e),n=new ft(d,t);return t.noInitialization||n.init(),n}var vt=F('<div class="drag-placeholder he-tree-drag-placeholder"><!></div>');function bt(d,e){ye(e,!0);let t=x(e,"updateBehavior",3,"modify"),n=x(e,"childrenKey",3,V);x(e,"textKey",3,"text"),x(e,"nodeKey",3,"index");let i=x(e,"indent",15,20),s=x(e,"virtualization",11,!1),l=x(e,"virtualizationPrerenderCount",3,20),r=x(e,"defaultOpen",11,!0),a=x(e,"rtl",11,!1),u=x(e,"btt",11,!1),g=x(e,"treeLine",11,!1),v=x(e,"treeLineOffset",3,8),c=x(e,"class",3,""),k=x(e,"style",3,""),f=x(e,"processor",23,()=>gt([],{noInitialization:!0,defaultOpen:r()}));const b=h=>h?(h[n()]||(h[n()]=[]),h[n()]):o(se);f().afterSetInfoNode=(h,N,A)=>{let S=o(se);if(t()==="new"){if(de)return;S=me()}else if(t()==="modify"){const G=b(N==null?void 0:N.data);G.includes(h.data)||G.splice(A,0,h.data)}else t();de||ke(S)},f().afterRemoveInfoNode=h=>{var A;let N=o(se);if(t()==="new"){if(de)return;N=me()}else if(t()==="modify"){const S=b((A=h.parent)==null?void 0:A.data);Ke(S,h.data)}else t();de||ke(N)};let C,m=T(I([])),K=T(I([])),P=null,B=!1,ie={},de=!1,oe=!1,se=H(()=>e.model);fe(()=>{console.log("model change detected"),oe?oe=!1:(console.log("Initializing model"),f().rawData=e.model,f().init(),R(m,I(f().nodeInfos)),R(K,I(f().nodeInfosToRender)))});function Re(){let h=o(K)||[];return u()&&(h=h.slice(),h.reverse()),h=h.filter(N=>ze(N)),h}function Se(h){e.onUpdateValue&&e.onUpdateValue(h)}function ke(h){return t()==="disabled"?!1:(h!==o(se)&&(oe=!0),Se(h),!0)}function ze(h){return f().isVisible(h)}function me(h,N){return f().getData(h,N)}var Le=H(()=>ge("he-tree",c(),a()&&"he-tree--rtl rtl",B)),He=H(()=>!s()),Fe=H(Re);Qe(Xe(d,{get class(){return o(Le)},get style(){return k()},get preRenderCount(){return l()},get isDisabled(){return o(He)},get items(){return o(Fe)},vl_slot:(N,A)=>{let S=()=>A==null?void 0:A().item;var G=J(),Ae=D(G);M(Ae,S,Ee=>{var Ve=H(()=>ge(S().class,{"drag-placeholder-wrapper":S().data===ie,"dragging-node":S()===P}));rt(Ee,{get class(){return o(Ve)},get style(){return S().style},get nodeInfo(){return S()},get rtl(){return a()},get btt(){return u()},get indent(){return i()},set indent(z){i(z)},get treeLine(){return g()},get treeLineOffset(){return v()},get processor(){return f()},onNodeOpened:z=>{var O;return(O=e.onNodeOpened)==null?void 0:O.call(e,z)},onNodeClosed:z=>{var O;return(O=e.onNodeClosed)==null?void 0:O.call(e,z)},onNodeSelected:z=>{var O;return(O=e.onNodeSelected)==null?void 0:O.call(e,z)},onNodeChecked:z=>{var O;return(O=e.onNodeChecked)==null?void 0:O.call(e,z)},tn_slot:(z,O=Ye)=>{var xe=J(),De=D(xe);M(De,()=>O().data===ie,ce=>{var U=vt(),he=q(U);M(he,()=>e.placeholder,Me=>{var Ce=J(),Be=D(Ce);ue(Be,()=>e.placeholder),w(Me,Ce)}),j(U),w(ce,U)},ce=>{var U=J(),he=D(U);ue(he,()=>e.tree_slot,O),w(ce,U)}),w(z,xe)},$$slots:{tn_slot:!0}})}),w(N,G)},$$slots:{vl_slot:!0}}),N=>C=N,()=>C),Ie()}var _t=F('<div class="item svelte-1s0qzrn"><!></div>'),yt=F('<section class="svelte-1s0qzrn"><!></section>'),It=F("<b> </b> <!>",1);function Te(d,e){ye(e,!0);let t=x(e,"tree",15),n=x(e,"node",7);const i=300;function s(v){n().children=v.detail.items}function l(v){n().children=v.detail.items,t({...t()})}var r=It(),a=D(r),u=q(a);j(a);var g=ae(a,2);M(g,()=>{var v;return(v=n())==null?void 0:v.children},v=>{var c=yt(),k=q(c);M(k,()=>n().children,f=>{var b=J(),C=D(b);we(C,25,()=>n().children,m=>m.id,(m,K)=>{var P=_t(),B=q(P);Te(B,{get tree(){return t()},set tree(ie){t(ie)},get node(){return t()[o(K).id]}}),j(P),pe(P,()=>tt,()=>({duration:i})),w(m,P)}),w(f,b)}),j(c),Ne("consider",c,s),Ne("finalize",c,l),Ze(c,(f,b)=>$e(f,b),()=>({items:n().children||[],flipDurationMs:i,centreDraggedOnCursor:!0})),w(v,c)}),re(()=>{var v,c;le(a,"style",`color:${((v=n())==null?void 0:v.color)??""}`),et(u,(c=n())==null?void 0:c.name)}),w(d,r),Ie()}var kt=F("<h3>Try dragging node2 into node3 and then node4 into node2</h3> <!>",1);function Nt(d){let e=T(I({node1:{name:"node 1",children:[{id:"node2"},{id:"node3"},{id:"node4"}],id:"node1"},node2:{name:"node 2",children:[{id:"node5"},{id:"node6"},{id:"node7"},{id:"node8"}],id:"node2"},node3:{name:"node 3",children:[{id:"node9"},{id:"node10"},{id:"node11"},{id:"node12"}],id:"node3"},node4:{name:"node 4",children:[{id:"node13"},{id:"node14"},{id:"node15"},{id:"node16"}],id:"node4",color:"salmon"}}));for(let i=5;i<17;(i+=1)-1)o(e)[`node${i}`]={id:`node${i}`,name:`item ${i}`};o(e).node10.color="steelblue",o(e).node11.color="steelblue",o(e).node14.color="orange",o(e).node15.color="orange",o(e).node6.color="forestgreen";var t=kt(),n=ae(D(t),2);Te(n,{get node(){return o(e).node1},get tree(){return o(e)},set tree(i){R(e,I(i))}}),w(d,t)}export{Nt as A,bt as T};
