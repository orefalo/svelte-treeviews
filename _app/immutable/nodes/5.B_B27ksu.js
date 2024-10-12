import{U as f,t as h,f as o,h as r,w as p,y as i,A as u,p as d,g as m,m as g,V as y,E as x,q as _}from"../chunks/external.DBrx1XmV.js";import{N as w,V as b}from"../chunks/svelte-treeviews.CU-h9fmE.js";var I=r('<pre><code class="hljs"><!></code></pre>');function N(l,s){var a=I(),n=p(a),t=p(n);f(t,()=>s.highlighted),i(n),i(a),h(()=>u(a,"data-language",s.lang)),o(l,a)}var L=r("<div><!> <!></div>");function V(l,s){d(s,!0);const a=s.example.component;var n=L(),t=p(n);a(t,{});var e=g(t,2);N(e,{lang:"svelte",get highlighted(){return s.example.highlightedHTML}}),i(n),o(l,n),m()}var k=r('<div style="border: 1px solid rgb(204, 204, 204)"> </div>');function q(l,s){d(s,!1);const a=new Array(1e4).fill(1).map((n,t)=>new w({data:{text:"Item "+t}}));y(),b(l,{items:a,style:"height:600px",vl_slot:(t,e)=>{let j=()=>e==null?void 0:e().item;var c=k(),v=p(c);h(()=>x(v,JSON.stringify(j()))),i(c),o(t,c)},$$slots:{vl_slot:!0}}),m()}const A=`<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import { NodeInfo } from '$lib/NodeInfo.svelte';

  const myModel: Array<NodeInfo> = new Array(10000).fill(1).map(
    (v, i) =>
      new NodeInfo({
        data: { text: 'Item ' + i }
      })
  );

  // let itemSize = () => 25;
<\/script>

<VirtualList items={myModel} style="height:600px">
  {#snippet vl_slot({ item, index })}
    <div style="border: 1px solid rgb(204, 204, 204)">
      {JSON.stringify(item)}
    </div>
  {/snippet}
</VirtualList>
`,M=`<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;ts&quot;</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">VirtualList</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;$lib/virtuallist&#x27;</span>;
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">NodeInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;$lib/NodeInfo.svelte&#x27;</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-attr">myModel</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-title class_">NodeInfo</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">10000</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">map</span>(
    <span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">NodeInfo</span>({
        <span class="hljs-attr">data</span>: { <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Item &#x27;</span> + i }
      })
  );

  <span class="hljs-comment">// let itemSize = () =&gt; 25;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">VirtualList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{myModel}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;height:600px&quot;</span>&gt;</span>
  {#snippet vl_slot({ item, index })}
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;border: 1px solid rgb(204, 204, 204)&quot;</span>&gt;</span>
      {JSON.stringify(item)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  {/snippet}
<span class="hljs-tag">&lt;/<span class="hljs-name">VirtualList</span>&gt;</span>
`,S={code:A,highlightedHTML:M,component:q};var H=r("<h2>Internal: VirtualList</h2> <p>Tree nodes are layedout in a virtuallist with infinite scrolling</p> <!>",1);function T(l){var s=H(),a=g(_(s),4);V(a,{example:S}),o(l,s)}export{T as component};
