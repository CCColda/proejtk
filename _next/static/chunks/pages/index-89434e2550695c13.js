(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5226)}])},7909:function(t,e,n){"use strict";n.d(e,{Q:function(){return u},z:function(){return c}});var r=n(5893),a=n(1664),i=n.n(a),s=n(5870),l=n.n(s);let o=(t,e)=>[l().button,l()[t||"primary"],...null!=e?e:[]].join(" "),c=t=>{let{children:e,priority:n,title:a,classes:i,disabled:s,onClick:l}=t;return(0,r.jsx)("button",{className:o(null!=n?n:"primary",i),onClick:l,title:a,disabled:s,children:e})},u=t=>{let{children:e,href:n,title:a,priority:s,classes:l}=t;return(0,r.jsx)(i(),{className:o(null!=s?s:"primary",l),title:a,href:n,children:e})}},4748:function(t,e,n){"use strict";n.d(e,{n:function(){return s}});var r=n(5893),a=n(9188),i=n.n(a);let s=t=>(0,r.jsx)("div",{className:i().titlepanel,children:(0,r.jsx)("h1",{children:t.text})})},2686:function(t,e,n){"use strict";n.d(e,{BT:function(){return a},tf:function(){return i},yy:function(){return r}});let r=Object.freeze({REGISTRY:"registry.json",SCHEMA:"schema.json",STAGEFILES:"stagefiles"}),a=Object.freeze(["application/json","text/yaml","text/x-yaml","application/x-yaml","text/vnd.yaml"]),i=Object.freeze([".json",".yaml",".yml"])},7423:function(t,e,n){"use strict";n.d(e,{AV:function(){return o},IS:function(){return c},K8:function(){return u},i8:function(){return f},q4:function(){return d}});var r=n(4707),a=n(4360),i=n(8764),s=n(2686);function l(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return i.lW.concat([t,i.lW.alloc(Math.max(0,e-t.length),n)])}async function o(t){let e=await fetch(t,{method:"GET",headers:{Accept:s.BT.join(",")}});if(!e.ok)return null;try{var n;return(null===(n=e.headers.get("Content-Type"))||void 0===n?void 0:n.match("application/json"))?await e.json():a.Qc(await e.text())}catch(t){return console.error("Parse error",t),null}}async function c(t){let e=await o(t);return e?{author:e.author,title:e.title}:null}async function u(t,e){if(!0!=t.encrypted)return t;{let n=function(t,e,n){let a=i.lW.from(n),s=a.reduce((t,e)=>t^e),o=l(a.slice(0,16),16,s),c=l(a.slice(16,24),8,s),u=i.lW.from(t,"hex");try{let t=JSON.parse((0,r.pe)(u,o,"cbc",c,!0).toString("utf-8").slice(0,e));return t}catch(t){return console.error("Decrypt error",t),null}}(t.data,t.size,e);return n||null}}function d(t){return new Promise((e,n)=>{let r=new FileReader;r.onload=()=>{var t;let n="string"==typeof r.result?r.result:new TextDecoder().decode(null!==(t=r.result)&&void 0!==t?t:void 0);try{return e(JSON.parse(n))}catch(t){console.error("JSON parse error",t);try{return e(a.Qc(n))}catch(t){return console.error("YAML parse error",t),e(null)}}},r.onabort=n,r.onerror=n,r.readAsText(t,"utf-8")})}function f(t){if("string"!=typeof t)return t;{let e=t.indexOf(":"),[n,r]=[t.substring(0,e),t.substring(e+1)];if(!["game_over","stage","invalid"].includes(n))return{type:"invalid"};switch(n){case"invalid":default:return{type:"invalid"};case"game_over":return{type:"game_over",message:r};case"stage":return{type:"stage",stage:r}}}}},5226:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return m}});var r=n(5893),a=n(2686);async function i(t){try{let e=await fetch(t,{method:"GET",headers:{Accept:"application/json"}});if(!e.ok)return console.error("Response error",e.status),null;return await e.json()}catch(t){return console.error("Parse error",t),null}}var s=n(7423),l=n(7909),o=n(7116),c=n.n(o);let u=t=>{var e,n;return(0,r.jsxs)(l.Q,{priority:"secondary",href:"stage?s=".concat(t.stage),classes:[c().stagecard],children:[(0,r.jsx)("span",{className:c().title,children:null!==(e=t.title)&&void 0!==e?e:t.stage}),(0,r.jsxs)("span",{className:c().author,children:["by ",null!==(n=t.author)&&void 0!==n?n:"unknown"]})]})};var d=n(2729),f=n.n(d),h=n(7294),p=n(4748),y=n(1752),_=n.n(y);function m(){var t;let e=_()(),[n,o]=(0,h.useState)([]),c=()=>i((null!==(t=e.publicRuntimeConfig.basePath)&&void 0!==t?t:"")+"/"+a.yy.REGISTRY).then(async t=>{if(!t){console.error("Failed loading registry");return}let n=[];for(let i of t.stages){var r;let t=await (0,s.IS)("".concat(null!==(r=e.publicRuntimeConfig.basePath)&&void 0!==r?r:"","/").concat(a.yy.STAGEFILES,"/").concat(i));t&&n.push({filename:i,base:t})}o(n)});return(0,h.useEffect)(()=>{c()},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(p.n,{text:"Műalkot\xe1sok"}),(0,r.jsxs)("div",{className:f().contentpanel,children:[(0,r.jsx)("div",{className:f().stagelist,children:n.map((t,e)=>(0,r.jsx)(u,{stage:t.filename,...t.base},e))}),(0,r.jsxs)("div",{className:f().buttons,children:[(0,r.jsx)(l.Q,{href:"stage_local",children:" Helyi f\xe1jl megnyit\xe1sa "}),(0,r.jsx)(l.Q,{href:"editor",children:" Szerkesztő "})]})]})]})}},9188:function(t){t.exports={titlepanel:"titlepanel_titlepanel__iImoc"}},2729:function(t){t.exports={buttons:"index_buttons__jOyIn",stagelist:"index_stagelist__w6tRw"}},5870:function(t){t.exports={button:"button_button__qrSvw",primary:"button_primary__e2_Sy",secondary:"button_secondary__DAail",tetriary:"button_tetriary__rvrGd"}},7116:function(t){t.exports={stagecard:"stagecard_stagecard__FkuUv",title:"stagecard_title__F2mli",author:"stagecard_author__CUDPj"}}},function(t){t.O(0,[350,774,888,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);