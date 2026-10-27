import fs from "node:fs";import path from "node:path";
const dir=path.resolve("dist");
fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
for(const f of ["index.html","app.js","styles.css",".nojekyll"])fs.copyFileSync(f,path.join(dir,f));
for(const d of ["data","assets"])fs.cpSync(d,path.join(dir,d),{recursive:true});
for(const f of ["index.html","app.js","styles.css","data/index.js","data/books-01-05.js","data/books-16-20.js","assets/favicon.svg"])if(!fs.existsSync(path.join(dir,f)))throw Error("Missing "+f);
console.log("Built GitHub Pages dist/");