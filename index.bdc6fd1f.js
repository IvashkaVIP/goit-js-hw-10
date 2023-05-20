document.querySelector("#search-box").addEventListener("input",(function(e){console.log(e.target.value)})),console.log(fetch(`https://restcountries.com/v3.1/name/${"SWIT"}?fields=name,capital,population,flag,languages`,{}).then((e=>{if(!e.ok)throw new Error;return e.json()})).then((e=>console.log(e))).catch((e=>console.log(e))));
//# sourceMappingURL=index.bdc6fd1f.js.map
