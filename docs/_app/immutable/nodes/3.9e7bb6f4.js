import{S as q,i as B,s as D,e as I,d as C,f as V,g as m,j as z,k as v,a0 as N,t as S,q as k,c as O,u as Y,m as F,n as J,C as E,D as A,E as H,H as x,a1 as K,I as P,a as j,J as y,b as T,K as b,V as M}from"../chunks/external.71726656.js";import{T as R}from"../chunks/svelte-treeviews.53acd2cf.js";const G=!0,re=Object.freeze(Object.defineProperty({__proto__:null,prerender:G},Symbol.toStringTag,{value:"Module"}));function L(r){let e;const a=r[6].default,t=O(a,r,r[5],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,i){t&&t.m(n,i),e=!0},p(n,i){t&&t.p&&(!e||i&32)&&Y(t,a,n,n[5],e?J(a,n[5],i,null):F(n[5]),null)},i(n){e||(S(t,n),e=!0)},o(n){k(t,n),e=!1},d(n){t&&t.d(n)}}}function Q(r){let e,a,t,n,i,f,o=r[3]===null&&L(r);return{c(){e=I("div"),o&&o.c(),this.h()},l(u){e=C(u,"DIV",{role:!0,id:!0,"data-content":!0});var c=V(e);o&&o.l(c),c.forEach(m),this.h()},h(){z(e,"role","presentation"),z(e,"id",a=r[2](r[1])),z(e,"data-content",t=void 0)},m(u,c){v(u,e,c),o&&o.m(e,null),n=!0,i||(f=N(r[4].call(null,e)),i=!0)},p(u,[c]){u[3]===null&&o.p(u,c),(!n||c&2&&a!==(a=u[2](u[1])))&&z(e,"id",a),(!n||c&1&&t!==(t=void 0))&&z(e,"data-content",t)},i(u){n||(S(o),n=!0)},o(u){k(o),n=!1},d(u){u&&m(e),o&&o.d(),i=!1,f()}}}function U(r,e,a){let{$$slots:t={},$$scope:n}=e,{content:i=void 0}=e,{id:f}=e;const o=s=>`prerendered_area_${s}`;function u(){const s=document.getElementById(o(f));return s??null}const c=u();var h=null;if(c!==null){const s=c.childNodes;h=Array.from(s).map(p=>p.cloneNode(!0))}const $=s=>{c!==null&&h.forEach(p=>{s.appendChild(p)})};return r.$$set=s=>{"content"in s&&a(0,i=s.content),"id"in s&&a(1,f=s.id),"$$scope"in s&&a(5,n=s.$$scope)},[i,f,o,c,$,n,t]}class W extends q{constructor(e){super(),B(this,e,U,Q,D,{content:0,id:1})}}function X(r){let e,a;return e=new K({props:{code:r[1]}}),{c(){E(e.$$.fragment)},l(t){A(e.$$.fragment,t)},m(t,n){H(e,t,n),a=!0},p(t,n){const i={};n&2&&(i.code=t[1]),e.$set(i)},i(t){a||(S(e.$$.fragment,t),a=!0)},o(t){k(e.$$.fragment,t),a=!1},d(t){x(e,t)}}}function Z(r){let e,a;return e=new W({props:{id:r[0],content:r[1],$$slots:{default:[X]},$$scope:{ctx:r}}}),{c(){E(e.$$.fragment)},l(t){A(e.$$.fragment,t)},m(t,n){H(e,t,n),a=!0},p(t,[n]){const i={};n&1&&(i.id=t[0]),n&2&&(i.content=t[1]),n&6&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){a||(S(e.$$.fragment,t),a=!0)},o(t){k(e.$$.fragment,t),a=!1},d(t){x(e,t)}}}function ee(r,e,a){let{id:t}=e,{code:n}=e;return r.$$set=i=>{"id"in i&&a(0,t=i.id),"code"in i&&a(1,n=i.code)},[t,n]}class te extends q{constructor(e){super(),B(this,e,ee,Z,D,{id:0,code:1})}}function ne(r){let e,a,t,n,i,f,o,u=!1+"",c,h,$,s,p,_,w;return s=new R({}),_=new te({props:{id:"min_max",code:r[0]}}),{c(){e=I("h2"),a=P("Horizontal layout, push other panes, min & max use, doubleclick"),t=j(),n=I("p"),i=P("You can double click a splitter to maximize the next pane!"),f=I("br"),o=P(`
	If you want to disable the 'double click splitter to maximize' behavior, you can add this attribute: dblClickSplitter=`),c=P(u),h=P("."),$=j(),E(s.$$.fragment),p=j(),E(_.$$.fragment)},l(l){e=C(l,"H2",{});var d=V(e);a=y(d,"Horizontal layout, push other panes, min & max use, doubleclick"),d.forEach(m),t=T(l),n=C(l,"P",{});var g=V(n);i=y(g,"You can double click a splitter to maximize the next pane!"),f=C(g,"BR",{}),o=y(g,`
	If you want to disable the 'double click splitter to maximize' behavior, you can add this attribute: dblClickSplitter=`),c=y(g,u),h=y(g,"."),g.forEach(m),$=T(l),A(s.$$.fragment,l),p=T(l),A(_.$$.fragment,l)},m(l,d){v(l,e,d),b(e,a),v(l,t,d),v(l,n,d),b(n,i),b(n,f),b(n,o),b(n,c),b(n,h),v(l,$,d),H(s,l,d),v(l,p,d),H(_,l,d),w=!0},p:M,i(l){w||(S(s.$$.fragment,l),S(_.$$.fragment,l),w=!0)},o(l){k(s.$$.fragment,l),k(_.$$.fragment,l),w=!1},d(l){l&&m(e),l&&m(t),l&&m(n),l&&m($),x(s,l),l&&m(p),x(_,l)}}}function ae(r){return[`
<script>
	import { Pane, Splitpanes } from 'svelte-treeviews'
<\/script>
<Splitpanes class="default-theme" horizontal={true} style="height: 400px">
	<Pane minSize={20} maxSize={70}>
		<span
			>1
			<br />
			<em class="specs">I have a min height of 20% &amp; max height of 70%</em>
		</span>
	</Pane>
	<Pane>
		<span>2</span>
	</Pane>
	<Pane maxSize={70}>
		<span
			>3

			<br />
			<em class="specs">I have a max height of 70%</em>
		</span>
	</Pane>
</Splitpanes>`]}class se extends q{constructor(e){super(),B(this,e,ae,ne,D,{})}}export{se as component,re as universal};
