function f(o,a){const n=e=>(e||"unknown").toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),r=n(o.title);if(a==="books"){const e=Array.isArray(o.author)?n(o.author[0]):n(o.author);return`${r}-${e}.md`}if(a==="movies"){const e=n(o.director),c=o.year||"0000";return`${r}-${e}-${c}.md`}if(a==="series"){const e=o.year||"0000";return`${r}-${e}.md`}return`${r}.md`}async function g(o,a,n,r){const e=localStorage.getItem("LOGRARY_PAT"),c="hryggrbyr/lograry";if(!e){alert("Missing GitHub PAT. Please sign in.");return}let s=`---
`;for(const[i,t]of Object.entries(n))Array.isArray(t)?s+=`${i}:
${t.map(p=>`  - "${p}"`).join(`
`)}
`:t===null||t===""?s+=`${i}: null
`:typeof t=="boolean"||typeof t=="number"?s+=`${i}: ${t}
`:s+=`${i}: "${t}"
`;s+=`---

`+r;const l=`https://api.github.com/repos/${c}/contents/${o}/${a}`,$=await fetch(l,{headers:{Authorization:`token ${e}`}}),h=$.ok?(await $.json()).sha:null,u=await fetch(l,{method:"PUT",headers:{Authorization:`token ${e}`,"Content-Type":"application/json"},body:JSON.stringify({message:`archive: ${h?"update":"add"} ${n.title}`,content:btoa(unescape(encodeURIComponent(s))),sha:h})});if(!u.ok){const i=await u.json();throw new Error(i.message||"Failed to push to GitHub")}return u.json()}export{f as g,g as p};
