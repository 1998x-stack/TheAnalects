import fs from "node:fs";
import {BOOKS,BOOK_COUNT,SOURCE_UNIT_COUNT,PASSAGES,PASSAGE_COUNT,passagesOf,editorialSentences} from "../data/index.js";
let passed=0,failed=0;
function assert(condition,message){if(condition)passed++;else{failed++;console.error("FAIL "+message)}}
assert(BOOK_COUNT===20,"20 canonical books");
assert(SOURCE_UNIT_COUNT===616,"616 attributed source translation units");
assert(PASSAGE_COUNT===1013,"1013 conservative reading cards");
assert(PASSAGES.length===20,"20 passage arrays");
assert(new Set(BOOKS.map(b=>b.number)).size===20,"book numbers unique");
const titles=["学而","为政","八佾","里仁","公冶长","雍也","述而","泰伯","子罕","乡党","先进","颜渊","子路","宪问","卫灵公","季氏","阳货","微子","子张","尧曰"];
for(let n=1;n<=20;n++){
 const b=BOOKS[n-1],lines=passagesOf(b);
 assert(b.number===n&&b.title===titles[n-1]+"篇","canonical book #"+n);
 assert(b.units.length>0&&b.units.every(u=>u.original.trim()&&u.translation.trim()),"nonempty pairs #"+n);
 assert(lines.every(p=>p.book===n&&p.original&&p.translation),"rendered lines #"+n);
 assert(new Set(lines.map(p=>p.id)).size===lines.length,"unique ids #"+n);
 for(const unit of b.units){
  const parts=lines.filter(p=>p.unitId===unit.id);
  assert(parts.length>0,"unit has rendered cards "+unit.id);
  assert(parts.map(p=>p.original).join("")===unit.original,"source roundtrip "+unit.id);
  assert(parts.map(p=>p.translation).join("")===unit.translation,"translation roundtrip "+unit.id);
  assert(editorialSentences(unit.original).length>=1,"sentence content "+unit.id);
 }
}
assert(BOOKS[0].units[0].original.startsWith("子曰：“学而时习之"),"first book begins with Xue Er");
assert(BOOKS[1].units.some(u=>u.original.includes("学而不思则罔")),"Learning/thinking from Book 2");
assert(BOOKS[12].units.some(u=>u.original.includes("君子和而不同")),"Harmony from Book 13");
assert(BOOKS[19].units.at(-1).original.includes("不知命"),"last book closing source");
const files=["README.md","AGENTS.md","SKILL.md",".agents/skills/analects-wisdom/SKILL.md",".github/workflows/ci.yml",".github/workflows/pages.yml","data/index.js","data/books-01-05.js","data/books-06-10.js","data/books-11-15.js","data/books-16-20.js","THIRD-PARTY-NOTICES.md","docs/README.md","docs/TEXTUAL-SOURCES.md","scripts/build.mjs","styles.css","index.html","app.js","assets/favicon.svg","assets/og-cover.svg"];
files.forEach(f=>assert(fs.existsSync(f),"required "+f));
const html=fs.readFileSync("index.html","utf8"),js=fs.readFileSync("app.js","utf8"),css=fs.readFileSync("styles.css","utf8");
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
assert(ids.length===new Set(ids).size,"unique HTML ids");
for(const id of ["chapter-nav","chapter-grid","search","reading-lines","book-title","collapse-all","theme-toggle","font-plus","font-minus","prev-book","next-book","bookmark","copy-url","reveal-count"]){
 assert(ids.includes(id),"HTML defines "+id);
 assert(js.includes('"'+id+'"'),"app uses "+id);
}
assert(js.includes("translation.hidden=true"),"translation initially hidden");
assert(js.includes("aria-expanded"),"button has accessible state");
assert(js.includes("aria-controls"),"button uniquely points to translation");
assert(js.includes("renderLines(b)"),"chapter reload resets translation");
assert(!js.includes("innerHTML"),"no untrusted HTML injection");
assert(css.includes(".sentence-card")&&css.includes(".sentence-meaning"),"stacked vertical original and interpretation");
assert(!html.includes("reader-columns"),"not side-by-side columns");
assert(html.includes('type="module" src="./app.js"'),"relative ES module entry");
console.log("PASS "+passed+"/"+(passed+failed)+" assertions, "+BOOK_COUNT+" books, "+SOURCE_UNIT_COUNT+" source pairs, "+PASSAGE_COUNT+" reading cards.");
if(failed)process.exitCode=1;
