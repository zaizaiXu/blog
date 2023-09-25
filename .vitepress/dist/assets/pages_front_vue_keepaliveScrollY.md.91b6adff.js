import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.498a5564.js";const F=JSON.parse('{"title":"Vue keep-alive返回保存滚动条位置","description":"","frontmatter":{"title":"Vue keep-alive返回保存滚动条位置"},"headers":[],"relativePath":"pages/front/vue/keepaliveScrollY.md","filePath":"pages/front/vue/keepaliveScrollY.md"}'),p={name:"pages/front/vue/keepaliveScrollY.md"},o=l(`<p>Vue keep-alive返回保存滚动条位置</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      scrollY: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 页面离开前保存滚动条距离.page为滚动元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">beforeRouteLeave</span><span style="color:#E1E4E8;">(to, from, next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 保存滚动条元素scrollTop值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.scrollY </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.page&quot;</span><span style="color:#E1E4E8;">).scrollTop;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 进入页面 恢复滚动条位置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">activated</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.page&quot;</span><span style="color:#E1E4E8;">).scrollTop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.scrollY;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      scrollY: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 页面离开前保存滚动条距离.page为滚动元素</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">beforeRouteLeave</span><span style="color:#24292E;">(to, from, next) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 保存滚动条元素scrollTop值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.scrollY </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.page&quot;</span><span style="color:#24292E;">).scrollTop;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 进入页面 恢复滚动条位置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">activated</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.page&quot;</span><span style="color:#24292E;">).scrollTop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.scrollY;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,2),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const _=s(p,[["render",t]]);export{F as __pageData,_ as default};
