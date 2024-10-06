var We=Object.defineProperty;var Ke=i=>{throw TypeError(i)};var Ye=(i,e,t)=>e in i?We(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var I=(i,e,t)=>Ye(i,typeof e!="symbol"?e+"":e,t),Xe=(i,e,t)=>e.has(i)||Ke("Cannot "+t);var k=(i,e,t)=>(Xe(i,e,"read from private field"),t?t.call(i):e.get(i)),Z=(i,e,t)=>e.has(i)?Ke("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t);import{d as Ge,p as be,a as g,s as D,b as S,u as de,o as pe,c as $e,g as c,e as A,f as Ve,i as q,t as re,h as C,j as Oe,k as J,l as ce,m as U,n as L,q as _e,r as ee,v as we,w as te,x as He,y as ae,z as ne,A as Ne,B as Y,C as et,D as tt,E as nt,F as Le,G as it,H as st,I as lt}from"./external.B9NXY1Es.js";Ge(["click"]);class rt{constructor(e,t,n,s){I(this,"model");I(this,"modelCount");I(this,"itemSize");I(this,"estimatedItemSize");I(this,"itemSizeAndPositionData");I(this,"lastMeasuredIndex");I(this,"totalSize");this.model=e,this.itemSize=n,this.modelCount=t,this.estimatedItemSize=s,this.itemSizeAndPositionData=[],this.lastMeasuredIndex=-1,this.checkForMismatchItemSizeAndItemCount(),this.justInTime||this.computeTotalSizeAndPositionData()}get justInTime(){return typeof this.itemSize=="function"}updateConfig(e,t,n){t!==void 0&&(this.modelCount=t),n!==void 0&&(this.estimatedItemSize=n),e!==void 0&&(this.itemSize=e),this.checkForMismatchItemSizeAndItemCount(),this.justInTime&&this.totalSize!==void 0?this.totalSize=void 0:this.computeTotalSizeAndPositionData()}checkForMismatchItemSizeAndItemCount(){if(Array.isArray(this.itemSize)&&this.itemSize.length<this.modelCount)throw Error("When itemSize is an array, itemSize.length can't be smaller than itemCount")}getSize(e){const{itemSize:t}=this;return typeof t=="function"?this.model?t(this.model[e],e):0:Array.isArray(t)?t[e]:t}computeTotalSizeAndPositionData(){let e=0;for(let t=0;t<this.modelCount;t++){const n=this.getSize(t),s=e;e+=n,this.itemSizeAndPositionData[t]={offset:s,size:n}}this.totalSize=e}getLastMeasuredIndex(){return this.lastMeasuredIndex}getSizeAndPositionForIndex(e){return e<0||e>=this.modelCount?{size:0,offset:0}:this.justInTime?this.getJustInTimeSizeAndPositionForIndex(e):this.itemSizeAndPositionData[e]}getJustInTimeSizeAndPositionForIndex(e){if(e>this.lastMeasuredIndex){const t=this.getSizeAndPositionOfLastMeasuredItem();let n=t.offset+t.size;for(let s=this.lastMeasuredIndex+1;s<=e;s++){const l=this.getSize(s);if(l===void 0||isNaN(l))throw Error(`Invalid size returned for index ${s} of value ${l}`);this.itemSizeAndPositionData[s]={offset:n,size:l},n+=l}this.lastMeasuredIndex=e}return this.itemSizeAndPositionData[e]}getSizeAndPositionOfLastMeasuredItem(){return this.lastMeasuredIndex>=0?this.itemSizeAndPositionData[this.lastMeasuredIndex]:{offset:0,size:0}}getEstimatedItemSize(){return this.estimatedItemSize||typeof this.itemSize=="number"&&this.itemSize||50}getTotalSize(){if(this.totalSize)return this.totalSize;const e=this.getSizeAndPositionOfLastMeasuredItem();return e.offset+e.size+(this.modelCount-this.lastMeasuredIndex-1)*this.getEstimatedItemSize()}getUpdatedOffsetForIndex(e=oe.START,t,n,s){if(t<=0)return 0;const l=this.getSizeAndPositionForIndex(s),r=l.offset,o=r-t+l.size;let a;switch(e){case oe.END:a=o;break;case oe.CENTER:a=r-(t-l.size)/2;break;case oe.START:a=r;break;default:a=Math.max(o,Math.min(r,n))}const m=this.getTotalSize();return Math.max(0,Math.min(m-t,a))}getVisibleRange(e=0,t,n){if(this.getTotalSize()===0)return{start:0,end:0};const l=t+e;let r=this.findNearestItem(t);if(r===void 0)throw Error(`Invalid offset ${t} specified`);const o=this.getSizeAndPositionForIndex(r);t=o.offset+o.size;let a=r;for(;t<l&&a<this.modelCount-1;)a++,t+=this.getSizeAndPositionForIndex(a).size;return n&&(r=Math.max(0,r-n),a=Math.min(a+n,this.modelCount-1)),{start:r,end:a}}resetItem(e){this.lastMeasuredIndex=Math.min(this.lastMeasuredIndex,e-1)}findNearestItem(e){if(isNaN(e))throw Error(`Invalid offset ${e} specified`);e=Math.max(0,e);const t=this.getSizeAndPositionOfLastMeasuredItem(),n=Math.max(0,this.lastMeasuredIndex);return t.offset>=e?this.binarySearch(0,n,e):this.exponentialSearch(n,e)}binarySearch(e,t,n){let s=0,l=0;for(;e<=t;){if(s=e+Math.floor((t-e)/2),l=this.getSizeAndPositionForIndex(s).offset,l===n)return s;l<n?e=s+1:l>n&&(t=s-1)}return e>0?e-1:0}exponentialSearch(e,t){let n=1;for(;e<this.modelCount&&this.getSizeAndPositionForIndex(e).offset<t;)e+=n,n*=2;return this.binarySearch(Math.floor(e/2),Math.min(e,this.modelCount-1),t)}}const ot=(()=>{let i=!1;try{const e=Object.defineProperty({},"passive",{get(){return i={passive:!0},!0}});window.addEventListener("testpassive",e,e),window.remove("testpassive",e,e)}catch{}return i})();var dt=J('<div><!> <div class="virtual-list-inner svelte-f32i87"><!></div> <!></div>');function at(i,e){be(e,!0);const t=g(e,"width",3,"100%"),n=g(e,"model",19,()=>[]),s=g(e,"windowOverPadding",3,3),l=g(e,"scrollDirection",19,()=>F.VERTICAL),r=g(e,"scrollToAlignment",19,()=>oe.AUTO),o=g(e,"scrollToBehaviour",19,()=>Ue.INSTANT),a=g(e,"class",3,"");g(e,"style",3,"");const m={[F.VERTICAL]:"top",[F.HORIZONTAL]:"left"},_={[F.VERTICAL]:"scrollTop",[F.HORIZONTAL]:"scrollLeft"},v=new rt(n(),e.modelCount,e.itemSize,e.estimatedItemSize);let u=!1,b,K=D(S([])),x=D(S({offset:e.scrollOffset||e.scrollToIndex!==void 0&&e.modelCount&&ie(e.scrollToIndex)||0,scrollChangeReason:le.REQUESTED})),w={},y={scrollToIndex:e.scrollToIndex,scrollToAlignment:r(),scrollOffset:e.scrollOffset,modelCount:e.modelCount,itemSize:e.itemSize,estimatedItemSize:e.estimatedItemSize},N={},R=D(""),T=D("");de(()=>{e.scrollToIndex,r(),e.scrollOffset,e.modelCount,e.itemSize,e.estimatedItemSize,O()}),de(()=>{c(x),V()}),de(()=>{e.height,t(),u&&he(0)}),(()=>{if(l()===F.VERTICAL&&typeof e.height!="number")throw new Error("virtual list's height must be a number when scrollDirection is 'vertical', got "+e.height);if(l()===F.HORIZONTAL&&typeof t()!="number")throw new Error("virtual list's width must be a number if scrollDirection is 'horizontal', got "+t());H()})(),pe(()=>{b.addEventListener("scroll",Te,ot),e.scrollOffset!==void 0?W(e.scrollOffset):e.scrollToIndex!==void 0&&W(ie(e.scrollToIndex)),u=!0}),$e(()=>{u&&b.removeEventListener("scroll",Te)});function O(){if(!u)return;e.scrollToIndex&&e.scrollOffset&&console.log("VirtualList: scrollToIndex and scrollOffset shall not be used together.");const d=y.scrollToIndex!==e.scrollToIndex||y.scrollToAlignment!==r(),f=y.modelCount!==e.modelCount||y.itemSize!==e.itemSize||y.estimatedItemSize!==e.estimatedItemSize;f&&(v.updateConfig(e.itemSize,e.modelCount,e.estimatedItemSize),he()),y.scrollOffset!==e.scrollOffset?A(x,S({offset:e.scrollOffset||0,scrollChangeReason:le.REQUESTED})):typeof e.scrollToIndex=="number"&&(d||f)&&A(x,S({offset:ie(e.scrollToIndex,r(),e.modelCount),scrollChangeReason:le.REQUESTED})),y={scrollToIndex:e.scrollToIndex,scrollToAlignment:r(),scrollOffset:e.scrollOffset,modelCount:e.modelCount,itemSize:e.itemSize,estimatedItemSize:e.estimatedItemSize}}function V(){if(!u)return;const{offset:d,scrollChangeReason:f}=c(x);(w.offset!==d||w.scrollChangeReason!==f)&&H(),w.offset!==d&&f===le.REQUESTED&&W(d),w=c(x)}function H(){if(n().length===0||e.isDisabled)return;const{offset:d}=c(x);let{start:f,end:P}=v.getVisibleRange(l()===F.VERTICAL?e.height:t(),d,s()),j=[];const Q=v.getTotalSize(),G=typeof e.height=="number"?"px":"",E=typeof t()=="number"?"px":"";if(l()===F.VERTICAL?(A(R,`height:${e.height}${G};width:${t()}${E};`),A(T,`flex-direction:column;height:${Q}px;`)):(A(R,`height:${e.height}${G};width:${t()}${E};`),A(T,`min-height:100%;width:${Q}px;`)),n()&&f!==void 0&&P!==void 0){for(let z=f;z<=P;(z+=1)-1)j.push({item:n()[z],index:z,style:Ae(z)});if(e.onVisibleRangeUpdate){const z=v.getVisibleRange(l()===F.VERTICAL?e.height:t(),d,0);e.onVisibleRangeUpdate({type:"range.update",start:z.start,end:z.end})}}A(K,S(j))}function W(d){"scroll"in b?b.scroll({[m[l()]]:d,behavior:o()}):b[_[l()]]=d}function he(d=0){N={},v.resetItem(d),H()}function ie(d,f=r(),P=e.modelCount){return d<0?d=0:d>=P&&(d=P-1),v.getUpdatedOffsetForIndex(f,l()===F.VERTICAL?e.height:t(),c(x).offset||0,d)}const Te=d=>{const f=b[_[l()]];f<0||c(x).offset===f||d.target!==b||(A(x,S({offset:f,scrollChangeReason:le.OBSERVED})),e.onAfterScroll&&e.onAfterScroll({type:"scroll.update",offset:f,event:d}))};function Ae(d){if(N[d])return N[d];const{size:f,offset:P}=v.getSizeAndPositionForIndex(d),j=l()===F.VERTICAL?`left:0;width:100%;height:${f}px;position:absolute;top:${P}px;`:`top:0;width:${f}px;position:absolute;height:100%;left:${P}px;`;return N[d]=j}var X=dt();Ve(X,d=>b=d,()=>b);var Ce=ee(X);q(Ce,()=>e.header,d=>{var f=U(),P=L(f);ne(P,()=>e.header),C(d,f)});var h=ce(Ce,2),M=ee(h);q(M,()=>e.isDisabled,d=>{var f=U(),P=L(f);_e(P,17,n,we,(j,Q,G)=>{var E=U(),z=L(E);ne(z,()=>e.vl_slot,()=>({item:c(Q),style:"",index:G})),C(j,E)}),C(d,f)},d=>{var f=U(),P=L(f);_e(P,17,()=>c(K),we,(j,Q)=>{var G=U(),E=L(G);ne(E,()=>e.vl_slot,()=>({item:c(Q).item,style:c(Q).style,index:c(Q).index})),C(j,G)}),C(d,f)}),te(h);var B=ce(h,2);return q(B,()=>e.footer,d=>{var f=U(),P=L(f);ne(P,()=>e.footer),C(d,f)}),te(X),re(()=>{He(X,`virtual-list-wrapper $${a()??""} svelte-f32i87`),ae(X,"style",c(R)),ae(h,"style",c(T))}),C(i,X),Oe({recomputeSizes:he})}var Ue=(i=>(i.AUTO="auto",i.SMOOTH="smooth",i.INSTANT="instant",i))(Ue||{}),oe=(i=>(i.AUTO="auto",i.START="start",i.CENTER="center",i.END="end",i))(oe||{}),F=(i=>(i.HORIZONTAL="horizontal",i.VERTICAL="vertical",i))(F||{}),le=(i=>(i[i.OBSERVED=0]="OBSERVED",i[i.REQUESTED=1]="REQUESTED",i))(le||{}),ct=J('<div class="tree-line tree-vline svelte-gfld7i"></div>'),ht=J('<div class="tree-line tree-hline svelte-gfld7i"></div>'),ft=J("<!> <!>",1),ut=J('<div><!> <div class="tree-node-inner"><!></div></div>');function gt(i,e){be(e,!0);let t=g(e,"rtl",3,!1),n=g(e,"btt",3,!1),s=g(e,"indent",3,20),l=g(e,"treeLine",3,!0),r=g(e,"treeLineOffset",3,10),o=Y(()=>`${t()?"paddingRight":"paddingLeft"}:${s()*(e.nodeInfo.level-1)}px`),a=Y(()=>`${t()?"right":"left"}:${(e.nodeInfo.level-2)*s()+r()}px`);de(()=>{var w,y;e.nodeInfo.checked,!m&&(w=e.processor)!=null&&w.afterOneCheckChanged(e.nodeInfo)&&((y=e.onNodeChecked)==null||y.call(e,e.nodeInfo))}),de(()=>{var y,N;const w=e.nodeInfo.expended;console.log("toggleOpen"),!m&&(w?(y=e.onNodeOpened)==null||y.call(e,e.nodeInfo):(N=e.onNodeClosed)==null||N.call(e,e.nodeInfo),_())});let m=!1;const _=()=>{m=!0,setTimeout(()=>{m=!1},100)},v=Y(()=>{const w=[],y=O=>{var V;if(O.parent){let H=(V=O.parent)==null?void 0:V.children.indexOf(O);do{H+=1;const W=O.parent.children[H];if(W){if(!W.hidden)return!0}else break}while(!0)}return!1},N=t()?"right":"left",R=n()?"top":"bottom";let T=e.nodeInfo;for(;T;){const O=(T.level-2)*s()+r(),V=y(T),H=()=>{w.push({style:`${N}:${O}px;${R}:${V?"0":"50%"}`})};T===e.nodeInfo?T.level>1&&H():V&&H(),T=T.parent}return w});var u=ut();re(()=>He(u,`${Ne("tree-node",e.class,l()&&"tree-node--with-tree-line")??""} svelte-gfld7i`));var b=ee(u);q(b,l,w=>{var y=ft(),N=L(y);_e(N,17,()=>c(v),we,(T,O)=>{var V=ct();re(()=>ae(V,"style",c(O).style)),C(T,V)});var R=ce(N,2);q(R,()=>e.nodeInfo.level>1,T=>{var O=ht();re(()=>ae(O,"style",c(a))),C(T,O)}),C(w,y)});var K=ce(b,2),x=ee(K);ne(x,()=>e.tn_slot,()=>({data:e.nodeInfo.data,info:e.nodeInfo})),te(K),te(u),re(()=>ae(u,"style",`${e.style} ${c(o)}`)),C(i,u),Oe()}function Re(i){return Object.prototype.toString.call(i)==="[object Array]"}function mt(i){return i[i.length-1]}function Be(i,e){let t,n=0;for(;(t=i.indexOf(e))>-1;)i.splice(t,1),n++;return n}function vt(i,e,t){i.hasOwnProperty(e)||(i[e]=t)}function It(i,e){return Object.keys(e).forEach(t=>{vt(i,t,e[t])}),i}function St(i){const e={};return Object.keys(i).forEach(t=>{i[t]!==void 0&&(e[t]=i[t])}),e}function p(i,e,t={}){t=It({...t},{childrenKey:"children"});const n=t.childrenKey,s=Re(i)?i:[i];class l{}const r=(o,a,m)=>{t.reverse&&(o=o.slice(),o.reverse());const _=o.length;for(let v=0;v<_;v++){const u=o[v],b=t.reverse?_-v-1:v,K=m?[...m,b]:[];t.childFirst&&u[n]!=null&&r(u[n],u,K);const x=e(u,b,a,K);if(x===!1)throw new l;if(x==="skip children")continue;if(x==="skip siblings")break;t.childFirst||u[n]!=null&&r(u[n],u,K)}};try{r(s,null,Re(i)?[]:null)}catch(o){if(!(o instanceof l))throw o}}function zt(i,e){const t={childrenKey:"children"};e&&Object.assign(t,e);const n=t.childrenKey,s=t.nodeHandler,l=new Ee;return l.childrenKey=n,p(i,(r,o,a,m)=>{let _=Object.assign({},r);_[n]&&(_[n]=[]),s&&(_=s(_,{oldNode:r,index:o,parent:a,path:m})),l.set(m,_)},{childrenKey:n}),l.data}class Ee{constructor(e=[]){I(this,"data");I(this,"childrenKey","children");this.data=e}get rootChildren(){const{childrenKey:e}=this,{data:t}=this;return Re(t)?t:t[e]}*iteratePath(e,t={}){const{childrenKey:n,rootChildren:s}=this;if(t.reverse){const l=[...this.iteratePath(e,{...t,reverse:!1})];l.reverse();for(const{path:r,node:o}of l)yield{path:r,node:o}}else{let l=[],r=s;for(const o of e){const a=[...l,o],m=r[o];yield{path:a,node:m},l=a,r=m[n]}}}getFamily(e){const t=[];for(const{node:n}of this.iteratePath(e))t.push(n);return t}get(e){return mt(this.getFamily(e))}getParentAndIndex(e){const t=e.slice(),n=t.pop();return{parent:this.get(t),index:n,parentPath:t}}getParent(e){return this.getParentAndIndex(e).parent}set(e,t){if(e===null||e.length===0)this.data=t;else{const{childrenKey:n}=this;let{rootChildren:s}=this;const{parent:l,index:r}=this.getParentAndIndex(e);let o;e.length===1?(s||(this.data?this.data[n]=[]:this.data=[]),o=s):(l[n]||(l[n]=[]),o=l[n]),o[r]=t}}delete(e){const{childrenKey:t,rootChildren:n}=this,{parent:s,index:l}=this.getParentAndIndex(e),r=e.length===1?n:s[t],o=r[l];return r.splice(l,1),o}walk(e,t){const{childrenKey:n,data:s}=this;return p(s,e,n)}clone(e={}){return zt(this.data),St({childrenKey:this.childrenKey,nodeHandler:e.nodeHandler||void 0})}}var ue,ge,me,ve,Ie,Se;class fe{constructor(e){I(this,"data");Z(this,ue,D(!1));I(this,"parent",null);Z(this,ge,D(S([])));I(this,"level",0);Z(this,me,D(!1));Z(this,ve,D(!1));I(this,"draggable");I(this,"droppable");Z(this,Ie,D(""));Z(this,Se,D(""));I(this,"_ignoreCheckedOnce");this.data=(e==null?void 0:e.data)||null,this.expended=(e==null?void 0:e.expended)||!1,this.parent=(e==null?void 0:e.parent)||null,this.children=(e==null?void 0:e.children)||[],this.level=(e==null?void 0:e.level)||0,this.hidden=(e==null?void 0:e.hidden)||!1,this.checked=(e==null?void 0:e.checked)||!1,this.draggable=(e==null?void 0:e.draggable)||null,this.droppable=(e==null?void 0:e.droppable)||null,this.style=e==null?void 0:e.style,this.class=e==null?void 0:e.class,this._ignoreCheckedOnce=e==null?void 0:e._ignoreCheckedOnce}get expended(){return c(k(this,ue))}set expended(e){A(k(this,ue),S(e))}get children(){return c(k(this,ge))}set children(e){A(k(this,ge),S(e))}get hidden(){return c(k(this,me))}set hidden(e){A(k(this,me),S(e))}get checked(){return c(k(this,ve))}set checked(e){A(k(this,ve),S(e))}get style(){return c(k(this,Ie))}set style(e){A(k(this,Ie),S(e))}get class(){return c(k(this,Se))}set class(e){A(k(this,Se),S(e))}toggleExpand(){console.log("nodeInfo.toggleExpand"),this.expended=!this.expended,console.log(this.expended)}toggleChecked(){console.log("nodeInfo.toggleChecked"),this.checked=!this.checked,console.log(this.checked)}}ue=new WeakMap,ge=new WeakMap,me=new WeakMap,ve=new WeakMap,Ie=new WeakMap,Se=new WeakMap;const $="children";class je{constructor(e){I(this,"childrenKey",$);I(this,"defaultOpen",!1);I(this,"noInitialization",!1);this.childrenKey=(e==null?void 0:e.childrenKey)||$,this.defaultOpen=(e==null?void 0:e.defaultOpen)||!1,this.noInitialization=(e==null?void 0:e.noInitialization)||!1}}var ze,ye,xe;class yt{constructor(e,t){I(this,"rawData");Z(this,ze,D(S([])));Z(this,ye,D(S([])));Z(this,xe,D(S(new Map)));I(this,"options");I(this,"afterSetInfoNode");I(this,"afterRemoveInfoNode");I(this,"infoNodesHandler");I(this,"infoNodesFlatHandler");I(this,"infoHandler",e=>e);I(this,"initialized",!1);this.options=t||new je}get nodeInfos(){return c(k(this,ze))}set nodeInfos(e){A(k(this,ze),S(e))}get nodeInfosToRender(){return c(k(this,ye))}set nodeInfosToRender(e){A(k(this,ye),S(e))}get _infosMap(){return c(k(this,xe))}set _infosMap(e){A(k(this,xe),S(e))}init(){if(!this.initialized){this.initialized=!0,console.log("TreeProcessor.init() called");const e=this.options.childrenKey,t=new Ee([]);this._infosMap.clear(),p(this.rawData,(s,l,r,o)=>{const a=this.infoHandler(new fe({data:s,expended:this.options.defaultOpen,parent:t.getParent(o),children:[],level:o.length}));this._infosMap.set(s,a),t.set(o,a)},{childrenKey:e}),console.log("td",t);const n=[];t.walk(s=>{n.push(s)}),console.log("flat",n),this.nodeInfos=this.infoNodesHandler?this.infoNodesHandler(t.rootChildren):t.rootChildren,this.nodeInfosToRender=this.infoNodesFlatHandler?this.infoNodesFlatHandler(n):n}}getNodeInfo(e){const t=this._infosMap.get(e);if(!t)throw new Fe("NodeInfo not found");return t}has(e){if(e instanceof fe)return this.nodeInfosToRender.indexOf(e)>-1;try{return(!!this.getNodeInfo(e)).valueOf()}catch(t){if(t instanceof Fe)return!1;throw t}}_getPathByStat(e){if(e===null)return[];const n=this.getSiblings(e).indexOf(e);return[...e.parent?this._getPathByStat(e.parent):[],n]}afterOneCheckChanged(e){const{checked:t}=e;if(e._ignoreCheckedOnce)return delete e._ignoreCheckedOnce,!1;const n=s=>{const l=s.parent;if(l){let r=!1,o=!1;for(const m of l.children)if(m.checked||m.checked===0)r=!0;else if(o=!0,r&&o)break;const a=o?r?0:!1:!0;l.checked!==a&&(this._ignoreCheckedOnce(l),l.checked=a),n(l)}};return n(e),p(e.children,s=>{s.checked!==t&&(this._ignoreCheckedOnce(s),s.checked=t)},{childrenKey:$}),!0}_ignoreCheckedOnce(e){e._ignoreCheckedOnce=!0,setTimeout(()=>{e._ignoreCheckedOnce&&(e._ignoreCheckedOnce=!1)},100)}isVisible(e){const t=e instanceof fe?e:this.getNodeInfo(e),n=s=>!s||!s.hidden&&s.expended&&n(s.parent);return!t.hidden&&n(t.parent)}updateCheckboxes(){p(this.nodeInfos,e=>{if(e.children&&e.children.length>0){const t=e.children.every(n=>n.checked);e.checked!==t&&(this._ignoreCheckedOnce(e),e.checked=t)}},{childFirst:!0,childrenKey:$})}getChecked(e=!1){return this.nodeInfosToRender.filter(t=>t.checked||e&&t.checked===0)}getUnchecked(e=!0){return this.nodeInfosToRender.filter(t=>e?!t.checked:t.checked===!1)}openAll(){for(const e of this.nodeInfosToRender)e.expended=!0}closeAll(){for(const e of this.nodeInfosToRender)e.expended=!1}openNodeAndParents(e){const t=e instanceof fe?e:this.getNodeInfo(e);for(const n of this.iterateParent(t,{withSelf:!0}))n.expended=!0}_calcFlatIndex(e,t){let n=e?this.nodeInfosToRender.indexOf(e)+1:0;const s=e?e.children:this.nodeInfos;for(let l=0;l<t;(l+=1)-1)n+=this._count(s[l]);return n}add(e,t,n){if(this.has(e))throw"Can't add because data exists in tree";const s=t?t.children:this.nodeInfos;n==null&&(n=s.length);const l=this.infoHandler(new fe({expended:!!this.options.defaultOpen,data:e,parent:t||null,children:[],level:t?t.level+1:1}));this._setPosition(l,t||null,n);const r=e[this.childrenKey];if(r){const o=r.slice();for(const a of o)this.add(a,l)}}remove(e){var n;const t=this.getSiblings(e);if(t.includes(e)){Be(t,e);const s=this._flat(e);this.nodeInfosToRender.splice(this.nodeInfosToRender.indexOf(e),s.length);for(const l of s)this._infosMap.delete(l.data);return(n=this.afterRemoveInfoNode)==null||n.call(this,e),!0}return!1}getSiblings(e){const{parent:t}=e;return t?t.children:this.nodeInfos}_setPosition(e,t,n){var o;(t?t.children:this.nodeInfos).splice(n,0,e),e.parent=t,e.level=t?t.level+1:1;const l=this._calcFlatIndex(t,n),r=this._flat(e);this.nodeInfosToRender.splice(l,0,...r);for(const a of r)this._infosMap.has(a.data)||this._infosMap.set(a.data,a);p(e,(a,m,_)=>{_&&(a.level=_.level+1)},{childrenKey:$}),(o=this.afterSetInfoNode)==null||o.call(this,e,t,n)}*iterateParent(e,t){let n=t!=null&&t.withSelf?e:e.parent;for(;n;)yield n,n=n.parent}move(e,t,n){if(this.has(e)){if(e.parent===t&&this.getSiblings(e).indexOf(e)===n)return!1;if(e===t)throw new Error("Can't move node to itself");if(t&&e.level<t.level){let s;for(const l of this.iterateParent(t))if(l.level===e.level){s=l;break}if(e===s)throw new Error("Can't move node to its descendant")}this.remove(e)}return this._setPosition(e,t,n),!0}_flat(e){const t=[];return p(e,n=>{t.push(n)},{childrenKey:$}),t}_count(e){return this._flat(e).length}getData(e,t){const{childrenKey:n}=this.options,s=new Ee([]);return s.childrenKey=n,p(t||this.nodeInfos,(l,r,o,a)=>{let m={...l.data,[n]:[]};e&&(m=e(m)),s.set(a,m)},{childrenKey:$}),s.data}}ze=new WeakMap,ye=new WeakMap,xe=new WeakMap;class Fe extends Error{constructor(e){super(e),this.name="StatNotFoundError"}}class xt extends je{constructor(t){super(t);I(this,"preProcessor")}filter(t,n){return t?t(n):n}infoHandler(t){this.preProcessor&&(t=this.preProcessor(t));let n=S(t);return this.filter(super.infoHandler,n)}infoNodesHandler(t){let n=S(t);return this.filter(super.infoNodesHandler,n)}InfoNodesFlatHandler(t){let n=S(t);return this.filter(super.InfoNodesFlatHandler,n)}}function Tt(i,e){const t=new xt(e),n=new yt(i,t);return t.noInitialization||n.init(),n}var Ct=J('<div class="drag-placeholder he-tree-drag-placeholder"><!></div>');function wt(i,e){be(e,!0);let t=g(e,"processor",23,()=>Tt([],{noInitialization:!0})),n=g(e,"updateBehavior",3,"modify"),s=g(e,"childrenKey",3,$);g(e,"textKey",3,"text"),g(e,"nodeKey",3,"index");let l=g(e,"indent",3,20),r=g(e,"virtualization",3,!1);g(e,"virtualizationPrerenderCount",3,20),g(e,"defaultOpen",3,!0);let o=g(e,"rtl",3,!1),a=g(e,"btt",3,!1),m=g(e,"treeLine",3,!1),_=g(e,"treeLineOffset",3,8);g(e,"class",3,"");let v=g(e,"style",3,"");const u=h=>h?(h[s()]||(h[s()]=[]),h[s()]):c(O);t().afterSetInfoNode=(h,M,B)=>{let d=c(O);if(n()==="new"){if(R)return;d=ie()}else if(n()==="modify"){const f=u(M==null?void 0:M.data);f.includes(h.data)||f.splice(B,0,h.data)}else n();R||W(d)},t().afterRemoveInfoNode=h=>{var B;let M=c(O);if(n()==="new"){if(R)return;M=ie()}else if(n()==="modify"){const d=u((B=h.parent)==null?void 0:B.data);Be(d,h.data)}else n();R||W(M)};let b,K=D(S([])),x=D(S([])),w=null,y=!1,N={},R=!1,T=!1,O=Y(()=>e.model);de(()=>{console.log("model change detected"),T?T=!1:(console.log("Initializing model"),t().rawData=e.model,t().init(),A(K,S(t().nodeInfos)),A(x,S(t().nodeInfosToRender)))});function V(){console.log("filterVisibleNodes");let h=c(x)||[];return a()&&(h=h.slice(),h.reverse()),h=h.filter(M=>he(M)),console.log("# items to render:"+h.length),h}function H(h){e.onUpdateValue&&e.onUpdateValue(h)}function W(h){return n()==="disabled"?!1:(h!==c(O)&&(T=!0),H(h),!0)}function he(h){return t().isVisible(h)}function ie(h,M){return t().getData(h,M)}var Te=Y(()=>Ne("he-tree",o()&&"he-tree--rtl rtl",y)),Ae=Y(()=>!r()),X=Y(V),Ce=Y(()=>{var h;return((h=t().nodeInfos)==null?void 0:h.length)||0});Ve(at(i,{get class(){return c(Te)},get style(){return v()},height:500,get isDisabled(){return c(Ae)},width:"auto",get model(){return c(X)},get modelCount(){return c(Ce)},itemSize:25,vl_slot:(M,B)=>{let d=()=>B==null?void 0:B().item;var f=U(),P=L(f);q(P,d,j=>{var Q=Y(()=>Ne(d().class,{"drag-placeholder-wrapper":d().data===N,"dragging-node":d()===w}));gt(j,{get class(){return c(Q)},get style(){return d().style},get nodeInfo(){return d()},get rtl(){return o()},get btt(){return a()},get indent(){return l()},get treeLine(){return m()},get treeLineOffset(){return _()},get processor(){return t()},onNodeOpened:E=>{var z;return(z=e.onNodeOpened)==null?void 0:z.call(e,E)},onNodeClosed:E=>{var z;return(z=e.onNodeClosed)==null?void 0:z.call(e,E)},onNodeSelected:E=>{var z;return(z=e.onNodeSelected)==null?void 0:z.call(e,E)},onNodeChecked:E=>{var z;return(z=e.onNodeChecked)==null?void 0:z.call(e,E)},tn_slot:(E,z=et)=>{var Me=U(),Ze=L(Me);q(Ze,()=>z().data===N,Pe=>{var se=Ct(),ke=ee(se);q(ke,()=>e.placeholder,qe=>{var De=U(),Je=L(De);ne(Je,()=>e.placeholder),C(qe,De)}),te(se),C(Pe,se)},Pe=>{var se=U(),ke=L(se);ne(ke,()=>e.tree_slot,z),C(Pe,se)}),C(E,Me)},$$slots:{tn_slot:!0}})}),C(M,f)},$$slots:{vl_slot:!0}}),M=>b=M,()=>b),Oe()}var _t=J('<div class="item svelte-1s0qzrn"><!></div>'),bt=J('<section class="svelte-1s0qzrn"><!></section>'),Ot=J("<b> </b> <!>",1);function Qe(i,e){be(e,!0);let t=g(e,"tree",15),n=g(e,"node",7);const s=300;function l(v){n().children=v.detail.items}function r(v){n().children=v.detail.items,t({...t()})}var o=Ot(),a=L(o),m=ee(a);te(a);var _=ce(a,2);q(_,()=>{var v;return(v=n())==null?void 0:v.children},v=>{var u=bt(),b=ee(u);q(b,()=>n().children,K=>{var x=U(),w=L(x);_e(w,25,()=>n().children,y=>y.id,(y,N)=>{var R=_t(),T=ee(R);Qe(T,{get tree(){return t()},set tree(O){t(O)},get node(){return t()[c(N).id]}}),te(R),nt(R,()=>st,()=>({duration:s})),C(y,R)}),C(K,x)}),te(u),Le("consider",u,l),Le("finalize",u,r),it(u,(K,x)=>lt(K,x),()=>({items:n().children||[],flipDurationMs:s,centreDraggedOnCursor:!0})),C(v,u)}),re(()=>{var v,u;ae(a,"style",`color:${((v=n())==null?void 0:v.color)??""}`),tt(m,(u=n())==null?void 0:u.name)}),C(i,o),Oe()}var At=J("<h3>Try dragging node2 into node3 and then node4 into node2</h3> <!>",1);function Nt(i){let e=D(S({node1:{name:"node 1",children:[{id:"node2"},{id:"node3"},{id:"node4"}],id:"node1"},node2:{name:"node 2",children:[{id:"node5"},{id:"node6"},{id:"node7"},{id:"node8"}],id:"node2"},node3:{name:"node 3",children:[{id:"node9"},{id:"node10"},{id:"node11"},{id:"node12"}],id:"node3"},node4:{name:"node 4",children:[{id:"node13"},{id:"node14"},{id:"node15"},{id:"node16"}],id:"node4",color:"salmon"}}));for(let s=5;s<17;(s+=1)-1)c(e)[`node${s}`]={id:`node${s}`,name:`item ${s}`};c(e).node10.color="steelblue",c(e).node11.color="steelblue",c(e).node14.color="orange",c(e).node15.color="orange",c(e).node6.color="forestgreen";var t=At(),n=ce(L(t),2);Qe(n,{get node(){return c(e).node1},get tree(){return c(e)},set tree(s){A(e,S(s))}}),C(i,t)}export{Nt as A,fe as N,wt as T,at as V};
