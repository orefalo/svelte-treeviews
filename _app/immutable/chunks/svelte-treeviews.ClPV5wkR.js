var st=Object.defineProperty;var Pe=i=>{throw TypeError(i)};var dt=(i,e,t)=>e in i?st(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var y=(i,e,t)=>dt(i,typeof e!="symbol"?e+"":e,t),lt=(i,e,t)=>e.has(i)||Pe("Cannot "+t);var m=(i,e,t)=>(lt(i,e,"read from private field"),t?t.call(i):e.get(i)),A=(i,e,t)=>e.has(i)?Pe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t);import{d as ot,p as C,r as at,t as X,b as ct,a as K,c as H,s as Re,g as c,e as L,f as me,u as ge,h as j,i as W,j as B,k as Ae,l as ht,m as oe,n as ve,o as G,q as ke,v as de,w as _e,x as T,y as S,z as k,A as ft,V as ut,B as le,C as Ke,D as gt,E as vt,F as Te,G as _t,H as yt,I as It}from"./external.DReb9YF9.js";ot(["click"]);var mt=H('<input type="checkbox">');function Ut(i,e){let t=C(e,"value",15),n=L(()=>t()===0);var r=mt();at(r),X(()=>{Re(r,e.class),r.indeterminate=c(n)}),ct(r,t),K(i,r)}var kt=H('<div class="tvtree-line tvtree-vline"></div>'),bt=H('<div class="tvtree-line tvtree-hline"></div>'),xt=H("<!> <!>",1),Ct=H('<div><!> <div class="tvtree-node-inner"><!></div></div>');function Nt(i,e){me(e,!0);let t=C(e,"treeLineStyle",11,"orthogonal"),n=L(()=>e.style?`${e.style};${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`:`${e.rtl?"padding-right":"padding-left"}:${e.indent*(e.nodeInfo.level-1)}px`),r=L(()=>`${e.rtl?"right":"left"}:${(e.nodeInfo.level-2)*e.indent+e.treeLineOffset}px`);ge(()=>{var N,o;e.nodeInfo.checked,!s&&(N=e.processor)!=null&&N.afterOneCheckChanged(e.nodeInfo)&&((o=e.onNodeChecked)==null||o.call(e,e.nodeInfo))}),ge(()=>{var o,I;const N=e.nodeInfo.expended;s||(N?(o=e.onNodeOpened)==null||o.call(e,e.nodeInfo):(I=e.onNodeClosed)==null||I.call(e,e.nodeInfo),h())});let s=!1;const h=()=>{s=!0,setTimeout(()=>{s=!1},100)},l=L(()=>{const N=[],o=O=>{var w;if(O.parent){let z=(w=O.parent)==null?void 0:w.children.indexOf(O);do{z+=1;const D=O.parent.children[z];if(D){if(!D.hidden)return!0}else break}while(!0)}return!1},I=e.rtl?"right":"left",F=e.btt?"top":"bottom";let b=e.nodeInfo;for(;b;){const O=(b.level-2)*e.indent+e.treeLineOffset,w=o(b),z=()=>{N.push({style:`${I}:${O}px;${F}:${w?"0":"50%"}`})};b===e.nodeInfo?b.level>1&&z():w&&z(),b=b.parent}return N});var a=Ct();const u=L(()=>_e("tree-node",e.class,t()!=="none"&&"tvtree-node--with-tree-line"));var v=j(a);W(v,()=>t()!=="none",N=>{var o=xt(),I=B(o);Ae(I,17,()=>c(l),ht,(b,O)=>{var w=kt();X(()=>de(w,"style",c(O).style)),K(b,w)});var F=oe(I,2);W(F,()=>e.nodeInfo.level>1&&t()==="orthogonal",b=>{var O=bt();X(()=>de(O,"style",c(r))),K(b,O)}),K(N,o)});var g=oe(v,2),_=j(g);ve(_,()=>e.tn_slot,()=>({data:e.nodeInfo.data,info:e.nodeInfo})),G(g),G(a),X(()=>{Re(a,c(u)),de(a,"style",c(n))}),K(i,a),ke()}function ye(i){return Object.prototype.toString.call(i)==="[object Array]"}function Ot(i){return i[i.length-1]}function Le(i,e){let t,n=0;for(;(t=i.indexOf(e))>-1;)i.splice(t,1),n++;return n}function wt(i,e,t){i.hasOwnProperty(e)||(i[e]=t)}function Pt(i,e){return Object.keys(e).forEach(t=>{wt(i,t,e[t])}),i}function Kt(i){const e={};return Object.keys(i).forEach(t=>{i[t]!==void 0&&(e[t]=i[t])}),e}function E(i,e,t={}){t=Pt({...t},{childrenKey:"children"});const n=t.childrenKey,r=ye(i)?i:[i];class s{}const h=(l,a,u)=>{t.reverse&&(l=l.slice(),l.reverse());const v=l.length;for(let g=0;g<v;g++){const _=l[g],N=t.reverse?v-g-1:g,o=u?[...u,N]:[];t.childFirst&&_[n]!=null&&h(_[n],_,o);const I=e(_,N,a,o);if(I===!1)throw new s;if(I==="skip children")continue;if(I==="skip siblings")break;t.childFirst||_[n]!=null&&h(_[n],_,o)}};try{h(r,null,ye(i)?[]:null)}catch(l){if(!(l instanceof s))throw l}}function Tt(i,e){const t={childrenKey:"children"};e&&Object.assign(t,e);const n=t.childrenKey,r=t.nodeHandler,s=new Ie;return s.childrenKey=n,E(i,(h,l,a,u)=>{let v=Object.assign({},h);v[n]&&(v[n]=[]),r&&(v=r(v,{oldNode:h,index:l,parent:a,path:u})),s.set(u,v)},{childrenKey:n}),s.data}class Ie{constructor(e=[]){y(this,"data");y(this,"childrenKey","children");this.data=e}get rootChildren(){const{childrenKey:e}=this,{data:t}=this;return ye(t)?t:t[e]}*iteratePath(e,t={}){const{childrenKey:n,rootChildren:r}=this;if(t.reverse){const s=[...this.iteratePath(e,{...t,reverse:!1})];s.reverse();for(const{path:h,node:l}of s)yield{path:h,node:l}}else{let s=[],h=r;for(const l of e){const a=[...s,l],u=h[l];yield{path:a,node:u},s=a,h=u[n]}}}getFamily(e){const t=[];for(const{node:n}of this.iteratePath(e))t.push(n);return t}get(e){return Ot(this.getFamily(e))}getParentAndIndex(e){const t=e.slice(),n=t.pop();return{parent:this.get(t),index:n,parentPath:t}}getParent(e){return this.getParentAndIndex(e).parent}set(e,t){if(e===null||e.length===0)this.data=t;else{const{childrenKey:n}=this;let{rootChildren:r}=this;const{parent:s,index:h}=this.getParentAndIndex(e);let l;e.length===1?(r||(this.data?this.data[n]=[]:this.data=[]),l=r):(s[n]||(s[n]=[]),l=s[n]),l[h]=t}}delete(e){const{childrenKey:t,rootChildren:n}=this,{parent:r,index:s}=this.getParentAndIndex(e),h=e.length===1?n:r[t],l=h[s];return h.splice(s,1),l}walk(e,t){const{childrenKey:n,data:r}=this;return E(r,e,n)}clone(e={}){return Tt(this.data),Kt({childrenKey:this.childrenKey,nodeHandler:e.nodeHandler||void 0})}}var Y,Z,p,$,ee,te;class Q{constructor(e){y(this,"data");A(this,Y,T(!1));y(this,"parent");A(this,Z,T(k([])));y(this,"level",0);A(this,p,T(!1));A(this,$,T(!1));y(this,"draggable");y(this,"droppable");A(this,ee,T(""));A(this,te,T(""));y(this,"_ignoreCheckedOnce");this.data=(e==null?void 0:e.data)||null,this.expended=(e==null?void 0:e.expended)||!1,this.parent=e==null?void 0:e.parent,this.children=(e==null?void 0:e.children)||[],this.level=(e==null?void 0:e.level)||0,this.hidden=(e==null?void 0:e.hidden)||!1,this.checked=(e==null?void 0:e.checked)||!1,this.draggable=e==null?void 0:e.draggable,this.droppable=e==null?void 0:e.droppable,this.style=e==null?void 0:e.style,this.class=e==null?void 0:e.class,this._ignoreCheckedOnce=e==null?void 0:e._ignoreCheckedOnce}get expended(){return c(m(this,Y))}set expended(e){S(m(this,Y),k(e))}get children(){return c(m(this,Z))}set children(e){S(m(this,Z),k(e))}get hidden(){return c(m(this,p))}set hidden(e){S(m(this,p),k(e))}get checked(){return c(m(this,$))}set checked(e){S(m(this,$),k(e))}get style(){return c(m(this,ee))}set style(e){S(m(this,ee),k(e))}get class(){return c(m(this,te))}set class(e){S(m(this,te),k(e))}toggleExpand(){this.expended=!this.expended}toggleChecked(){this.checked=!this.checked}}Y=new WeakMap,Z=new WeakMap,p=new WeakMap,$=new WeakMap,ee=new WeakMap,te=new WeakMap;const V="children";class He{constructor(e){y(this,"childrenKey",V);y(this,"defaultOpen",!1);y(this,"noInitialization",!1);this.childrenKey=(e==null?void 0:e.childrenKey)||V,this.defaultOpen=(e==null?void 0:e.defaultOpen)||!1,this.noInitialization=(e==null?void 0:e.noInitialization)||!1}}var ne,ie,re;class St{constructor(e,t){y(this,"rawData");A(this,ne,T(k([])));A(this,ie,T(k([])));A(this,re,T(k(new Map)));y(this,"options");y(this,"afterSetInfoNode");y(this,"afterRemoveInfoNode");y(this,"infoNodesHandler");y(this,"infoNodesFlatHandler");y(this,"infoHandler",e=>e);y(this,"initialized",!1);this.options=t||new He}get nodeInfos(){return c(m(this,ne))}set nodeInfos(e){S(m(this,ne),k(e))}get nodeInfosToRender(){return c(m(this,ie))}set nodeInfosToRender(e){S(m(this,ie),k(e))}get _infosMap(){return c(m(this,re))}set _infosMap(e){S(m(this,re),k(e))}init(){if(!this.initialized){this.initialized=!0;const e=this.options.childrenKey,t=new Ie([]);this._infosMap.clear(),E(this.rawData,(r,s,h,l)=>{const a=this.infoHandler(new Q({data:r,expended:this.options.defaultOpen,parent:t.getParent(l),children:[],level:l.length}));this._infosMap.set(r,a),t.set(l,a)},{childrenKey:e});const n=[];t.walk(r=>{n.push(r)}),this.nodeInfos=this.infoNodesHandler?this.infoNodesHandler(t.rootChildren):t.rootChildren,this.nodeInfosToRender=this.infoNodesFlatHandler?this.infoNodesFlatHandler(n):n}}getNodeInfo(e){const t=this._infosMap.get(e);if(!t)throw new Se("NodeInfo not found");return t}has(e){if(e instanceof Q)return this.nodeInfosToRender.indexOf(e)>-1;try{return(!!this.getNodeInfo(e)).valueOf()}catch(t){if(t instanceof Se)return!1;throw t}}_getPathByStat(e){if(e===null)return[];const n=this.getSiblings(e).indexOf(e);return[...e.parent?this._getPathByStat(e.parent):[],n]}afterOneCheckChanged(e){const{checked:t}=e;if(e._ignoreCheckedOnce)return delete e._ignoreCheckedOnce,!1;const n=r=>{const s=r.parent;if(s){let h=!1,l=!1,a=!1;for(const v of s.children)v.checked?h=!0:v.checked===0?a=!0:l=!0;const u=a?0:l?h?0:!1:!0;s.checked!==u&&(this._ignoreCheckedOnce(s),s.checked=u),n(s)}};return n(e),E(e.children,r=>{r.checked!==t&&(this._ignoreCheckedOnce(r),r.checked=t)},{childrenKey:V}),!0}_ignoreCheckedOnce(e){e._ignoreCheckedOnce=!0,setTimeout(()=>{e._ignoreCheckedOnce&&(e._ignoreCheckedOnce=!1)},100)}isVisible(e){const t=e instanceof Q?e:this.getNodeInfo(e),n=r=>!r||!r.hidden&&r.expended&&n(r.parent);return!t.hidden&&n(t.parent)}updateCheckboxes(){E(this.nodeInfos,e=>{if(e.children&&e.children.length>0){const t=e.children.every(n=>n.checked);e.checked!==t&&(this._ignoreCheckedOnce(e),e.checked=t)}},{childFirst:!0,childrenKey:V})}getChecked(e=!1){return this.nodeInfosToRender.filter(t=>t.checked||e&&t.checked===0)}getUnchecked(e=!0){return this.nodeInfosToRender.filter(t=>e?!t.checked:t.checked===!1)}openAll(){for(const e of this.nodeInfosToRender)e.expended=!0}closeAll(){for(const e of this.nodeInfosToRender)e.expended=!1}openNodeAndParents(e){const t=e instanceof Q?e:this.getNodeInfo(e);for(const n of this.iterateParent(t,{withSelf:!0}))n.expended=!0}_calcFlatIndex(e,t){let n=e?this.nodeInfosToRender.indexOf(e)+1:0;const r=e?e.children:this.nodeInfos;for(let s=0;s<t;(s+=1)-1)n+=this._count(r[s]);return n}add(e,t,n){if(this.has(e))throw"Can't add because data exists in tree";const r=t?t.children:this.nodeInfos;n==null&&(n=r.length);const s=this.infoHandler(new Q({expended:!!this.options.defaultOpen,data:e,parent:t||void 0,children:[],level:t?t.level+1:1}));this._setPosition(s,t||void 0,n);const h=e[this.childrenKey];if(h){const l=h.slice();for(const a of l)this.add(a,s)}}remove(e){var n;const t=this.getSiblings(e);if(t.includes(e)){Le(t,e);const r=this._flat(e);this.nodeInfosToRender.splice(this.nodeInfosToRender.indexOf(e),r.length);for(const s of r)this._infosMap.delete(s.data);return(n=this.afterRemoveInfoNode)==null||n.call(this,e),!0}return!1}getSiblings(e){const{parent:t}=e;return t?t.children:this.nodeInfos}_setPosition(e,t,n){var l;(t?t.children:this.nodeInfos).splice(n,0,e),e.parent=t,e.level=t?t.level+1:1;const s=this._calcFlatIndex(t,n),h=this._flat(e);this.nodeInfosToRender.splice(s,0,...h);for(const a of h)this._infosMap.has(a.data)||this._infosMap.set(a.data,a);E(e,(a,u,v)=>{v&&(a.level=v.level+1)},{childrenKey:V}),(l=this.afterSetInfoNode)==null||l.call(this,e,t,n)}*iterateParent(e,t){let n=t!=null&&t.withSelf?e:e.parent;for(;n;)yield n,n=n.parent}move(e,t,n){if(this.has(e)){if(e.parent===t&&this.getSiblings(e).indexOf(e)===n)return!1;if(e===t)throw new Error("Can't move node to itself");if(t&&e.level<t.level){let r;for(const s of this.iterateParent(t))if(s.level===e.level){r=s;break}if(e===r)throw new Error("Can't move node to its descendant")}this.remove(e)}return this._setPosition(e,t,n),!0}_flat(e){const t=[];return E(e,n=>{t.push(n)},{childrenKey:V}),t}_count(e){return this._flat(e).length}getData(e,t){const{childrenKey:n}=this.options,r=new Ie([]);return r.childrenKey=n,E(t||this.nodeInfos,(s,h,l,a)=>{let u={...s.data,[n]:[]};e&&(u=e(u)),r.set(a,u)},{childrenKey:V}),r.data}}ne=new WeakMap,ie=new WeakMap,re=new WeakMap;class Se extends Error{constructor(e){super(e),this.name="StatNotFoundError"}}class Rt extends He{constructor(t){super(t);y(this,"preProcessor")}filter(t,n){return t?t(n):n}}function At(i,e){const t=new Rt(e),n=new St(i,t);return t.noInitialization||n.init(),n}var Lt=H('<div class="tvtree-drag-placeholder"><!></div>');function Bt(i,e){me(e,!0);let t=C(e,"updateBehavior",3,"modify"),n=C(e,"childrenKey",3,V),r=C(e,"indent",15,20),s=C(e,"scrollable",11,!1),h=C(e,"scrollablePrerenderCount",3,20),l=C(e,"defaultOpen",11,!0),a=C(e,"rtl",15,!1),u=C(e,"btt",15,!1),v=C(e,"treeLineStyle",15,"none"),g=C(e,"treeLineOffset",15,8),_=C(e,"class",3,""),N=C(e,"style",3,"");C(e,"selectionBehavior",3,"single");let o=C(e,"processor",23,()=>At([],{noInitialization:!0,defaultOpen:l()}));const I=d=>d?(d[n()]||(d[n()]=[]),d[n()]):c(J);o().afterSetInfoNode=(d,f,x)=>{let P=c(J);if(t()==="new"){if(M)return;P=se()}else if(t()==="modify"){const U=I(f==null?void 0:f.data);U.includes(d.data)||U.splice(x,0,d.data)}else t();M||ce(P)},o().afterRemoveInfoNode=d=>{var x;let f=c(J);if(t()==="new"){if(M)return;f=se()}else if(t()==="modify"){const P=I((x=d.parent)==null?void 0:x.data);Le(P,d.data)}else t();M||ce(f)};let F,b=T(k([])),O=T(k([])),w=null,z=!1,D={},M=!1,ae=!1,J=L(()=>e.model);ge(()=>{ae?ae=!1:(o().rawData=e.model,o().init(),S(b,k(o().nodeInfos)),S(O,k(o().nodeInfosToRender)))});function Fe(d){}function Me(){let d=c(O);return u()&&(d=d.slice().reverse()),d.filter(f=>xe(f))}function Ee(){return c(b)}function Ve(d){e.onUpdateValue&&e.onUpdateValue(d)}function ce(d){return t()==="disabled"?!1:(d!==c(J)&&(ae=!0),Ve(d),!0)}function be(d){return o().getNodeInfo(d)}function De(d){return o().has(d)}function Ue(d){return o().getChecked(d)}function Be(d){return o().getUnchecked(d)}function qe(){console.log("openAll"),o().openAll()}function je(d){o().openNodeAndParents(d)}function Ge(){console.log("closeAll"),o().closeAll()}function xe(d){return o().isVisible(d)}function We(d,f,x){return o().move(d,f,x)}function Ce(d,f,x){return o().add(d,f,x)}function Je(d,f,x){he(()=>{let P=x;for(const U of d)Ce(U,f,P),P!=null&&(P+=1)})}function Ne(d){return o().remove(d)}function Qe(d){const f=[...d];he(()=>{for(const x of f)Ne(be(x))})}function Xe(d,f){return o().iterateParent(d,f)}function Ye(d){return o().getSiblings(d)}function se(d,f){return o().getData(d,f)}function he(d){const f=Ze(d);return M||ce(t()==="new"?se():c(J)),f}function Ze(d){const f=M;M=!0;const x=d();return M=f,x}var pe=L(()=>_e("tvtree",_(),a()&&"tvtree--rtl",z)),$e=L(()=>!s()),et=L(Me);return ft(ut(i,{get class(){return c(pe)},get style(){return N()},get preRenderCount(){return h()},get isDisabled(){return c($e)},get items(){return c(et)},vl_slot:(f,x)=>{let P=()=>x==null?void 0:x().item;var U=le(),tt=B(U);W(tt,P,nt=>{var it=L(()=>_e(P().class,{"drag-placeholder-wrapper":P().data===D,"dragging-node":P()===w}));Nt(nt,{get class(){return c(it)},get style(){return P().style},get nodeInfo(){return P()},get rtl(){return a()},set rtl(R){a(R)},get btt(){return u()},set btt(R){u(R)},get indent(){return r()},set indent(R){r(R)},get treeLineStyle(){return v()},set treeLineStyle(R){v(R)},get treeLineOffset(){return g()},set treeLineOffset(R){g(R)},get processor(){return o()},get onNodeOpened(){return e.onNodeOpened},get onNodeClosed(){return e.onNodeClosed},onNodeChecked:Fe,tn_slot:(R,Oe=Ke)=>{var we=le(),rt=B(we);W(rt,()=>Oe().data===D,fe=>{var q=Lt(),ue=j(q);ve(ue,()=>e.placeholder??Ke),G(q),K(fe,q)},fe=>{var q=le(),ue=B(q);ve(ue,()=>e.tree_slot,Oe),K(fe,q)}),K(R,we)},$$slots:{tn_slot:!0}})}),K(f,U)},$$slots:{vl_slot:!0}}),f=>F=f,()=>F),ke({rootChildren:Ee,getNodeInfo:be,has:De,getChecked:Ue,getUnchecked:Be,openAll:qe,openNodeAndParents:je,closeAll:Ge,isVisible:xe,move:We,add:Ce,addMulti:Je,remove:Ne,removeMulti:Qe,iterateParent:Xe,getSiblings:Ye,getData:se,batchUpdate:he})}var Ht=H('<div class="item svelte-1s0qzrn"><!></div>'),zt=H('<section class="svelte-1s0qzrn"><!></section>'),Ft=H("<b> </b> <!>",1);function ze(i,e){me(e,!0);let t=C(e,"tree",15),n=C(e,"node",7);const r=300;function s(g){n().children=g.detail.items}function h(g){n().children=g.detail.items,t({...t()})}var l=Ft(),a=B(l),u=j(a,!0);G(a);var v=oe(a,2);W(v,()=>{var g;return(g=n())==null?void 0:g.children},g=>{var _=zt(),N=j(_);W(N,()=>n().children,o=>{var I=le(),F=B(I);Ae(F,25,()=>n().children,b=>b.id,(b,O)=>{var w=Ht(),z=j(w);ze(z,{get tree(){return t()},set tree(D){t(D)},get node(){return t()[c(O).id]}}),G(w),gt(w,()=>_t,()=>({duration:r})),K(b,w)}),K(o,I)}),G(_),vt(_,(o,I)=>yt(o,I),()=>({items:n().children||[],flipDurationMs:r,centreDraggedOnCursor:!0})),Te("consider",_,s),Te("finalize",_,h),K(g,_)}),X(()=>{var g,_;de(a,"style",`color:${((g=n())==null?void 0:g.color)??""}`),It(u,(_=n())==null?void 0:_.name)}),K(i,l),ke()}var Mt=H("<h3>Try dragging node2 into node3 and then node4 into node2</h3> <!>",1);function qt(i){let e=T(k({node1:{name:"node 1",children:[{id:"node2"},{id:"node3"},{id:"node4"}],id:"node1"},node2:{name:"node 2",children:[{id:"node5"},{id:"node6"},{id:"node7"},{id:"node8"}],id:"node2"},node3:{name:"node 3",children:[{id:"node9"},{id:"node10"},{id:"node11"},{id:"node12"}],id:"node3"},node4:{name:"node 4",children:[{id:"node13"},{id:"node14"},{id:"node15"},{id:"node16"}],id:"node4",color:"salmon"}}));function t(){for(let s=5;s<17;(s+=1)-1)c(e)[`node${s}`]={id:`node${s}`,name:`item ${s}`};c(e).node10.color="steelblue",c(e).node11.color="steelblue",c(e).node14.color="orange",c(e).node15.color="orange",c(e).node6.color="forestgreen"}t();var n=Mt(),r=oe(B(n),2);ze(r,{get node(){return c(e).node1},get tree(){return c(e)},set tree(s){S(e,k(s))}}),K(i,n)}export{qt as A,Ut as I,Bt as T};
