import{a as _,T as k,l,n as C,t as I,h as c,k as u,e as T,b as N,r as e,s as P,w as t,D as f,g as S}from"../chunks/external.CPem1cX5.js";import{b as A}from"../chunks/svelte-treeviews.CVFYkb94.js";var B=u('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">'),D=u(`<h1>Tree Example</h1> (*) Custom labels do not display right away in the story book, tree items need to be toggled first. <br> However, they seem to work in a "normal" svelte app setup. I'm working on it :) <hr> <div class="flex-container svelte-1aa5b7a"><div><!></div> <div><h2>Current items:</h2> <pre> </pre></div> <div><h2>Selected item</h2> <pre> </pre></div></div>`,1);function E(s,i){let r=_(i,"treeItems",7),d=P(void 0);var p=D();k(a=>{var y=B();c(a,y)});var m=l(C(p),6),n=e(m),g=e(n);A(g,{get treeItems(){return r()},get options(){return i.options},onselected:a=>T(d,N(a.detail)),onmodelChanged:a=>{r(a.detail)}}),t(n);var o=l(n,2),b=l(e(o),2),w=e(b);t(b),t(o);var h=l(o,2),v=l(e(h),2),x=e(v);t(v),t(h),t(m),I(()=>{f(w,JSON.stringify(r(),void 0,2)),f(x,JSON.stringify(S(d),void 0,2))}),c(s,p)}function V(s){E(s,{treeItems:{label:"Yummy",children:[{label:"Diary products",expanded:!1,children:[{label:"Cheese"},{label:"Yogurt"}]},{label:"Fruit",expanded:!0,children:[{label:"Apple"},{label:"Banana"},{label:"Peach"},{label:"Nuts",children:[{label:"Cashew"},{label:"Peanut"},{label:"Almond"}]}]},{label:"Vegetables",expanded:!0,children:[{label:"Eggplant"},{label:"Pepper"},{label:"Broccoli"},{label:"Mushroom"},{label:"Cauliflower"}]}]},options:{}})}export{V as component};