if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const a=e=>n(e,r),t={module:{uri:r},exports:c,require:a};i[r]=Promise.all(s.map((e=>t[e]||a(e)))).then((e=>(o(...e),c)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-117f51cd.css",revision:null},{url:"assets/index-de3c46ed.js",revision:null},{url:"index.html",revision:"1b64189695429429ef4709e731aa8e35"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./images/icons/icon-72x72.png",revision:"24dc3d669f36286505b3a1c5b0524ade"},{url:"./images/icons/icon-96x96.png",revision:"e5283aec658d86d667af822874f42900"},{url:"./images/icons/icon-128x128.png",revision:"622528abbcc0fccd70a6aabd2eaf3b9f"},{url:"./images/icons/icon-152x152.png",revision:"39797f6e04e170d19f66b37872195909"},{url:"./images/icons/icon-192x192.png",revision:"174456f3c0eaa685838b09094dbf46fe"},{url:"./images/icons/icon-512x512.png",revision:"59b4739dc64ec1f9b2a801e1b28777da"},{url:"manifest.webmanifest",revision:"268ad59728ad2ad097a4317b7f793ef2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
