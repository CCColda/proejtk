(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{8102:function(e,t,n){var i,a;void 0!==(a="function"==typeof(i=function(){"use strict";function t(e,t,n){var i=new XMLHttpRequest;i.open("GET",e),i.responseType="blob",i.onload=function(){l(i.response,t,n)},i.onerror=function(){console.error("could not download file")},i.send()}function i(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function a(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(n){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var s="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n.g&&n.g.global===n.g?n.g:void 0,r=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),l=s.saveAs||("object"!=typeof window||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!r?function(e,n,r){var l=s.URL||s.webkitURL,o=document.createElement("a");n=n||e.name||"download",o.download=n,o.rel="noopener","string"==typeof e?(o.href=e,o.origin===location.origin?a(o):i(o.href)?t(e,n,r):a(o,o.target="_blank")):(o.href=l.createObjectURL(e),setTimeout(function(){l.revokeObjectURL(o.href)},4e4),setTimeout(function(){a(o)},0))}:"msSaveOrOpenBlob"in navigator?function(e,n,s){if(n=n||e.name||"download","string"!=typeof e){var r;navigator.msSaveOrOpenBlob((void 0===(r=s)?r={autoBom:!1}:"object"!=typeof r&&(console.warn("Deprecated: Expected third argument to be a object"),r={autoBom:!r}),r.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e),n)}else if(i(e))t(e,n,s);else{var l=document.createElement("a");l.href=e,l.target="_blank",setTimeout(function(){a(l)})}}:function(e,n,i,a){if((a=a||open("","_blank"))&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return t(e,n,i);var l="application/octet-stream"===e.type,o=/constructor/i.test(s.HTMLElement)||s.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||l&&o||r)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=e:location=e,a=null},d.readAsDataURL(e)}else{var u=s.URL||s.webkitURL,p=u.createObjectURL(e);a?a.location=p:location.href=p,a=null,setTimeout(function(){u.revokeObjectURL(p)},4e4)}});s.saveAs=l.saveAs=l,e.exports=l})?i.apply(t,[]):i)&&(e.exports=a)},1832:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return n(8609)}])},7909:function(e,t,n){"use strict";n.d(t,{Q:function(){return p},z:function(){return u}});var i=n(5893),a=n(1664),s=n.n(a),r=n(5870),l=n.n(r),o=n(1752),c=n.n(o);let d=(e,t)=>[l().button,l()[e||"primary"],...null!=t?t:[]].join(" "),u=e=>{let{children:t,priority:n,title:a,classes:s,disabled:r,onClick:l}=e;return(0,i.jsx)("button",{className:d(null!=n?n:"primary",s),onClick:l,title:a,disabled:r,children:t})},p=e=>{let{children:t,href:n,title:a,priority:r,classes:l}=e,o=c()(),u=o.publicRuntimeConfig.assetPrefix?o.publicRuntimeConfig.assetPrefix.slice(0,-1)+n:n;return(0,i.jsx)(s(),{className:d(null!=r?r:"primary",l),title:a,href:u,children:t})}},4748:function(e,t,n){"use strict";n.d(t,{n:function(){return r}});var i=n(5893),a=n(9188),s=n.n(a);let r=e=>(0,i.jsx)("div",{className:s().titlepanel,children:(0,i.jsx)("h1",{children:e.text})})},2686:function(e,t,n){"use strict";n.d(t,{BT:function(){return a},tf:function(){return s},yy:function(){return i}});let i=Object.freeze({REGISTRY:"registry.json",SCHEMA:"schema.json",STAGEFILES:"stagefiles"}),a=Object.freeze(["application/json","text/yaml","text/x-yaml","application/x-yaml","text/vnd.yaml"]),s=Object.freeze([".json",".yaml",".yml"])},7423:function(e,t,n){"use strict";n.d(t,{AV:function(){return o},IS:function(){return c},K8:function(){return d},i8:function(){return p},q4:function(){return u}});var i=n(4707),a=n(4360),s=n(8764),r=n(2686);function l(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return s.lW.concat([e,s.lW.alloc(Math.max(0,t-e.length),n)])}async function o(e){let t=await fetch(e,{method:"GET",headers:{Accept:r.BT.join(",")}});if(!t.ok)return null;try{var n;return(null===(n=t.headers.get("Content-Type"))||void 0===n?void 0:n.match("application/json"))?await t.json():a.Qc(await t.text())}catch(e){return console.error("Parse error",e),null}}async function c(e){let t=await o(e);return t?{author:t.author,title:t.title}:null}async function d(e,t){if(!0!=e.encrypted)return e;{let n=function(e,t,n){let a=s.lW.from(n),r=a.reduce((e,t)=>e^t),o=l(a.slice(0,16),16,r),c=l(a.slice(16,24),8,r),d=s.lW.from(e,"hex");try{let e=JSON.parse((0,i.pe)(d,o,"cbc",c,!0).toString("utf-8").slice(0,t));return e}catch(e){return console.error("Decrypt error",e),null}}(e.data,e.size,t);return n||null}}function u(e){return new Promise((t,n)=>{let i=new FileReader;i.onload=()=>{var e;let n="string"==typeof i.result?i.result:new TextDecoder().decode(null!==(e=i.result)&&void 0!==e?e:void 0);try{return t(JSON.parse(n))}catch(e){console.error("JSON parse error",e);try{return t(a.Qc(n))}catch(e){return console.error("YAML parse error",e),t(null)}}},i.onabort=n,i.onerror=n,i.readAsText(e,"utf-8")})}function p(e){if("string"!=typeof e)return e;{let t=e.indexOf(":"),[n,i]=[e.substring(0,t),e.substring(t+1)];if(!["game_over","stage","invalid"].includes(n))return{type:"invalid"};switch(n){case"invalid":default:return{type:"invalid"};case"game_over":return{type:"game_over",message:i};case"stage":return{type:"stage",stage:i}}}}},8909:function(e,t,n){"use strict";n.d(t,{a:function(){return a}});var i=n(7294);let a=e=>{let[t,n]=(0,i.useState)(null);return(0,i.useEffect)(()=>{let t=window.matchMedia(e),i=e=>n(e.matches);return t.addEventListener("change",i),()=>t.removeEventListener("change",i)},[]),t}},8609:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return z}});var i=n(5893),a=n(7423),s=n(2686),r=n(7294),l=n(6157),o=n.n(l),c=n(7909),d=e=>{let[t,n]=(0,r.useState)("new"),[l,d]=(0,r.useState)(null),[u,p]=(0,r.useState)(null),[f,g]=(0,r.useState)(""),v=(0,r.useMemo)(()=>"edit"===t&&!!l||"new"===t&&""!==f,[l,t,f]),x=e=>{n(e.currentTarget.value)},_=async e=>{var t;let i=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!i)return;let s=await (0,a.q4)(i);if(!s){d(null),p("Helytelen\xfcl form\xe1zott f\xe1jl");return}if(s.encrypted){d(null),p("Jelsz\xf3val v\xe9dett f\xe1jl - nem szerkeszthető");return}p(null),d(s),n("edit")};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:o().dialog,children:[(0,i.jsx)("h2",{children:"F\xe1jl kiv\xe1laszt\xe1sa"}),(0,i.jsxs)("div",{className:o().filechooser,children:[(0,i.jsxs)("div",{className:o().selection,children:[(0,i.jsx)("input",{type:"radio",name:"file_to_edit",id:"edit_local_file",value:"edit",onChange:x,defaultChecked:"edit"==t},t),(0,i.jsxs)("label",{htmlFor:"edit_local_file",children:[(0,i.jsx)("p",{children:" Helyi f\xe1jl szerkeszt\xe9se "}),(0,i.jsx)("input",{type:"file",name:"",id:"",accept:s.tf.join(","),onChange:_}),null!==u?(0,i.jsx)("p",{children:u}):(0,i.jsx)(i.Fragment,{})]})]}),(0,i.jsxs)("div",{className:o().selection,children:[(0,i.jsx)("input",{type:"radio",name:"file_to_edit",id:"new_file",value:"new",onChange:x,defaultChecked:"new"==t},t),(0,i.jsxs)("label",{htmlFor:"new_file",children:[(0,i.jsx)("p",{children:"\xdaj f\xe1jl szerkeszt\xe9se"}),(0,i.jsxs)("div",{className:"filename",children:[(0,i.jsx)("input",{type:"text",placeholder:"F\xe1jl neve",onChange:e=>{g(e.currentTarget.value)}}),(0,i.jsx)("span",{children:".yaml"})]})]})]})]}),(0,i.jsx)(c.z,{disabled:!v,onClick:n=>{e.callback("edit"===t?l:{title:f,author:"",stages:[]})},children:"Folytat\xe1s"})]}),(0,i.jsx)("div",{className:o().buttons,children:(0,i.jsx)(c.Q,{href:"/",children:"Főoldal"})})]})},u=n(5299),p=n(6004),f=n.n(p);let g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],[t,n]=(0,r.useState)(e);return[t,{reset:e=>n(e),set:(e,i)=>n([...t.slice(0,e),i,...t.slice(e+1)]),insert:(e,i)=>n([...t.slice(0,e),i,...t.slice(e)]),push:e=>n([...t,e]),pop:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return n(t.slice(0,-e))},pop_front:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return n(t.slice(e))},clear:()=>n([])}]};var v=n(8102),x=n.n(v),_=n(4360);let h=e=>e.flatMap(e=>{let t=e.buttons.flatMap((t,n)=>{let{action:i}=t;return"string"==typeof i?null:"stage"===i.type&&"string"!=typeof i.stage?h([{...i.stage,id:e.id+"/"+n}]):null}).filter(e=>null!==e),n={id:e.id,text:e.text,buttons:e.buttons.map((t,n)=>({text:t.text,action:"string"!=typeof t.action&&"stage"===t.action.type&&"string"!=typeof t.action.stage?{type:"stage",stage:"".concat(e.id,"/").concat(n)}:t.action}))};return[n,...t]}),m=e=>{var t,n,s,l,o,d;let p=e.button?(0,a.i8)(e.button.action):{type:"invalid"},g=null!==(l=(null==p?void 0:p.type)=="stage"?null==p?void 0:p.stage:null==p?void 0:p.type)&&void 0!==l?l:"invalid",v=["invalid","game_over",...e.possibleStages],[x,_]=(0,r.useState)(null!==(o=null===(t=e.button)||void 0===t?void 0:t.text)&&void 0!==o?o:""),[h,m]=(0,r.useState)(()=>{var t;if(!(null===(t=e.button)||void 0===t?void 0:t.action))return"";let n=(0,a.i8)(e.button.action);return"game_over"!=n.type?"":n.message}),[y,b]=(0,r.useState)(g),w=(0,r.useMemo)(()=>({text:x,action:"invalid"==y?{type:"invalid"}:"game_over"==y?{type:"game_over",message:h}:{type:"stage",stage:y}}),[x,y,h]),k=(0,r.useMemo)(()=>j(w),[w]);return(0,r.useEffect)(()=>{e.onEdit(w)},[w]),e.preview?(0,i.jsx)("div",{className:f().stageeditbutton,children:(0,i.jsx)("button",{className:f().sidebutton,children:(0,i.jsx)(u.D,{children:null!==(d=null===(n=e.button)||void 0===n?void 0:n.text)&&void 0!==d?d:""})})}):(0,i.jsxs)("div",{className:[f().stageeditbutton,k?"":f().invalid].join(" "),children:[(0,i.jsx)("textarea",{className:f().textarea,spellCheck:!1,defaultValue:null===(s=e.button)||void 0===s?void 0:s.text,placeholder:"Aa",onChange:e=>{_(e.target.value)}}),(0,i.jsxs)("div",{className:f().actionedit,children:[(0,i.jsx)("select",{defaultValue:g,onChange:e=>{b(e.target.value)},children:v.map(e=>(0,i.jsx)("option",{value:e,children:e},e))}),"game_over"==y?(0,i.jsx)("textarea",{className:f().textarea,spellCheck:!1,onChange:e=>{m(e.target.value)},defaultValue:h}):"invalid"!=y?(0,i.jsx)(c.z,{onClick:t=>e.onView(y),children:"Ugr\xe1s"}):(0,i.jsx)(i.Fragment,{})]})]})},j=e=>""!=e.text.trim()&&"invalid"!=(0,a.i8)(e.action).type,y=(e,t)=>e.length>0&&e.match(/^[a-z0-9_\.\-]*$/)&&!t.includes(e),b=e=>{let[t,n]=(0,r.useState)(e.stage.text),[a,s]=g([...e.stage.buttons,...Array(4-e.stage.buttons.length).fill({action:{type:"invalid"},text:""})]),[l,o]=(0,r.useState)(e.stage.id),d=(0,r.useMemo)(()=>y(l,e.stageIDs),[l,e.stageIDs]),p=(0,r.useMemo)(()=>({id:e.stage.id,text:t,buttons:a.filter(j)}),[t,a]);(0,r.useEffect)(()=>{e.onEdit(p)},[p]);let v=t=>(0,i.jsx)(i.Fragment,{children:t.filter(t=>!e.preview||e.stage.buttons[t]).map((t,n)=>(0,i.jsx)(m,{preview:e.preview,button:e.stage.buttons[t],possibleStages:e.stageIDs.filter(t=>t!=e.stage.id),onEdit:e=>{s.set(t,e)},onView:e.onView},"".concat(e.stage.id,"_").concat(t,"_").concat(n)))});return(0,i.jsxs)("div",{className:[f().stage_preview,e.preview?f().preview:f().edit].join(" "),children:[(0,i.jsxs)("div",{className:f().stageactions,children:[(0,i.jsxs)("span",{className:[f().rename,d?"":f().invalid].join(" "),children:[(0,i.jsx)("p",{children:"id:"}),(0,i.jsx)("input",{type:"text",onChange:e=>o(e.target.value),defaultValue:e.stage.id}),(0,i.jsx)(c.z,{onClick:t=>d&&e.onRename(l),disabled:!d,children:"\xc1tnevez\xe9s"})]}),(0,i.jsx)(c.z,{onClick:t=>e.onDelete(),classes:[f().delete],children:"T\xf6rl\xe9s"})]}),(0,i.jsxs)("div",{className:f().panels,children:[(0,i.jsx)("div",{className:f().sidepanel,children:v([0,2])}),(0,i.jsx)("div",{className:f().eventpanel,children:e.preview?(0,i.jsx)(u.D,{children:t}):(0,i.jsx)("textarea",{className:f().textarea,spellCheck:!1,placeholder:"Aa",defaultValue:t,onChange:e=>{var t;n(null!==(t=e.target.value)&&void 0!==t?t:"")}})}),(0,i.jsx)("div",{className:f().sidepanel,children:v([1,3])})]})]})},w=e=>{let t="stage_"+e.stage.id;return(0,i.jsxs)("div",{className:f().stageradio,children:[(0,i.jsx)("input",{type:"radio",name:"stage",id:t,value:e.stage.id,onChange:t=>{t.target.value==e.stage.id&&e.callback(e.stage.id)},defaultChecked:e.selected}),(0,i.jsx)("label",{htmlFor:t,children:e.stage.id})]})};var k=e=>{let[t,n]=(0,r.useState)(!1),[s,l]=g([]),[o,d]=(0,r.useState)(null),[u,p]=(0,r.useState)(""),v=(0,r.useMemo)(()=>y(u,s.map(e=>e.id)),[u,s]);return(0,r.useEffect)(()=>{e.stageFile.encrypted||l.reset(h(e.stageFile.stages))},[e.stageFile]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:f().page,children:(0,i.jsxs)("div",{className:f().editor,children:[(0,i.jsxs)("div",{className:f().stages,children:[(0,i.jsx)("div",{className:f().stagelist,children:s.map((e,t)=>(0,i.jsx)(w,{callback:e=>d(e),stage:e,selected:o==e.id},t))},o),(0,i.jsxs)("div",{className:[f().newstage,v?"":f().invalid].join(" "),children:[(0,i.jsx)("input",{type:"text",name:"",id:"",placeholder:"Aa",defaultValue:u,onChange:e=>p(e.target.value)},o),(0,i.jsx)(c.z,{onClick:e=>{v&&(l.push({id:u,buttons:[],text:""}),d("".concat(u)),p(""))},disabled:!v,children:"+"})]})]}),(0,i.jsxs)("div",{className:f().main,children:[null!==o?(0,i.jsx)(b,{stage:s.find(e=>e.id==o),preview:t,stageIDs:s.map(e=>e.id),onEdit:e=>{l.set(s.findIndex(e=>e.id==o),e)},onRename:e=>{let t=s.map(t=>({id:t.id==o?e:t.id,text:t.text,buttons:t.buttons.map(t=>{let n=(0,a.i8)(t.action);return{text:t.text,action:"stage"==n.type&&n.stage==o?{type:"stage",stage:e}:t.action}})}));d(e),l.reset(t)},onDelete:()=>{let e=s.filter(e=>e.id!=o).map(e=>({...e,buttons:e.buttons.filter(e=>{let t=(0,a.i8)(e.action);return!("stage"==t.type&&t.stage==o)})}));d(null),l.reset(e)},onView:e=>d(e)},o):(0,i.jsx)(i.Fragment,{}),(0,i.jsxs)("div",{className:f().bottompanel,children:[(0,i.jsxs)("div",{className:f().preview,children:[(0,i.jsx)("input",{type:"checkbox",name:"",id:"preview",onChange:e=>n(e.target.checked)}),(0,i.jsx)("label",{htmlFor:"preview",children:"Előn\xe9zet"})]}),(0,i.jsx)(c.z,{onClick:t=>{let n={...e.stageFile,stages:s},i=new Blob([(0,_.Pz)(n)],{type:"text/vnd.yaml;charset=utf-8"});x()(i,e.stageFile.title.replace(/[^0-9a-z_\-]/gi,"_")+".yaml")},children:"Ment\xe9s"})]})]})]})})})},N=n(4748),E=n(8909),S=n(45),C=n.n(S),z=e=>{let[t,n]=(0,r.useState)(null),a=(0,E.a)("(max-width: 480px) or (max-height: 500px)");return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(N.n,{text:"Szerkesztő"}),a?(0,i.jsxs)("div",{className:C().unsupported,children:[(0,i.jsx)("p",{children:"A szerkesztő kis k\xe9pernyők\xf6n nem t\xe1mogatott."}),(0,i.jsx)("p",{children:"K\xe9rlek v\xe1lts asztali m\xf3dra."})]}):null===t?(0,i.jsx)(d,{callback:e=>{n(e)}}):(0,i.jsx)(k,{stageFile:t})]})}},9188:function(e){e.exports={titlepanel:"titlepanel_titlepanel__iImoc"}},5870:function(e){e.exports={button:"button_button__qrSvw",primary:"button_primary__e2_Sy",secondary:"button_secondary__DAail",tetriary:"button_tetriary__rvrGd"}},6004:function(e){e.exports={sidebutton:"editor_sidebutton__yHiPp",button:"editor_button__NepT2",preview:"editor_preview__oHyQQ",primary:"editor_primary__y8VQy",secondary:"editor_secondary__UUhvZ",tetriary:"editor_tetriary__bX3Xe",page:"editor_page__D_Q_z",editor:"editor_editor__SVkBP",textarea:"editor_textarea__eCEc4",stagelist:"editor_stagelist__y5lQb",stageradio:"editor_stageradio__BYhHj",validatedinputcontainer:"editor_validatedinputcontainer___P1fU",stages:"editor_stages__25Tx5",newstage:"editor_newstage__v7BqX",stageactions:"editor_stageactions__GJCbz",rename:"editor_rename__poweh",invalid:"editor_invalid__DNOdM",main:"editor_main__jJGZp",stage_preview:"editor_stage_preview__j0baJ",panels:"editor_panels__hOljy",sidepanel:"editor_sidepanel__rCZpg",eventpanel:"editor_eventpanel__Dgfu5",edit:"editor_edit__IKMNU",stageeditbutton:"editor_stageeditbutton__jfwbY",actionedit:"editor_actionedit__j7gyE",bottompanel:"editor_bottompanel__Fn0Bh",buttons:"editor_buttons__aWm33"}},6157:function(e){e.exports={buttons:"editorfilechooser_buttons__nD6iR",filechooser:"editorfilechooser_filechooser__ur_Dt",selection:"editorfilechooser_selection__eqws1",dialog:"editorfilechooser_dialog__zv2a2",stages:"editorfilechooser_stages__Bsw7e",stage:"editorfilechooser_stage__Ml1ik",editor:"editorfilechooser_editor__cpBJa"}},45:function(e){e.exports={unsupported:"editor_unsupported__BroQa"}}},function(e){e.O(0,[350,299,774,888,179],function(){return e(e.s=1832)}),_N_E=e.O()}]);