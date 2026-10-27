import {BOOKS,PASSAGE_COUNT,SOURCE_UNIT_COUNT,bookByNumber,getPassages} from "./data/index.js";

const $=id=>document.getElementById(id);
const create=(tag,cls,content)=>{
 const el=document.createElement(tag);
 if(cls)el.className=cls;
 if(content!==undefined)el.textContent=content;
 return el;
};
const numerals=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];
const chapterLabel=n=>"第"+numerals[n-1]+"篇";
const storage={
 read(key,defaultValue){try{return JSON.parse(localStorage.getItem("analects:"+key))??defaultValue}catch{return defaultValue}},
 write(key,value){try{localStorage.setItem("analects:"+key,JSON.stringify(value))}catch{/* Private mode should not interrupt reading */}}
};
const hashNumber=()=>{
 const match=location.hash.match(/^#chapter-(\d+)$/);
 return match?Number(match[1]):null;
};
const valid=n=>Number.isInteger(n)&&n>=1&&n<=20;
const saved=storage.read("last",1);
const initial=valid(hashNumber())?hashNumber():valid(saved)?saved:1;
const state={
 chapter:initial,
 search:"",
 font:Math.min(28,Math.max(16,Number(storage.read("font",20))||20)),
 bookmarks:Array.isArray(storage.read("bookmarks",[]))?storage.read("bookmarks",[]):[]
};
let toastTimeout=null;
function toast(message){
 const el=$("toast");el.textContent=message;el.classList.add("show");
 clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove("show"),2200);
}
function setTheme(theme){
 document.documentElement.dataset.theme=theme;
 storage.write("theme",theme);
 $("theme-toggle").setAttribute("aria-label",theme==="paper"?"切换夜读深墨模式":"切换宣纸浅色模式");
 document.querySelector('meta[name="theme-color"]').content=theme==="paper"?"#f6f1e5":"#142421";
}
setTheme(storage.read("theme","paper")==="ink"?"ink":"paper");
$("theme-toggle").addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="paper"?"ink":"paper"));
function renderCatalogue(){
 const q=state.search.trim().toLocaleLowerCase("zh-CN");
 const shown=BOOKS.filter(b=>{
  if(!q)return true;
  const text=[b.title,b.theme,b.summary,...b.units.flatMap(u=>[u.original,u.translation])].join(" ").toLocaleLowerCase("zh-CN");
  return text.includes(q);
 });
 $("search-count").textContent=shown.length+" / "+BOOKS.length+" 篇";
 $("no-results").hidden=shown.length!==0;
 const frag=document.createDocumentFragment();
 for(const b of shown){
  const card=create("button","chapter-card");card.type="button";
  card.setAttribute("aria-label","打开"+b.title);
  const head=create("div","card-top");
  head.append(create("span",null,String(b.number).padStart(2,"0")+" / 20"),create("span","card-arrow",state.bookmarks.includes(b.number)?"★":"↗"));
  card.append(head,create("h3",null,b.title),create("p","card-intro",b.summary),create("span","card-footer",b.units.length+" 组原译 · "+b.theme));
  card.addEventListener("click",()=>goToBook(b.number,true));
  frag.append(card);
 }
 $("chapter-grid").replaceChildren(frag);
}
function renderNavigation(){
 const frag=document.createDocumentFragment();
 for(const b of BOOKS){
  const btn=create("button","chapter-nav-item"+(b.number===state.chapter?" active":""));btn.type="button";
  if(b.number===state.chapter)btn.setAttribute("aria-current","location");
  btn.append(create("span","index",String(b.number).padStart(2,"0")),create("span",null,b.title));
  btn.addEventListener("click",()=>goToBook(b.number,false));
  frag.append(btn);
 }
 $("chapter-nav").replaceChildren(frag);
 $("nav-position").textContent=String(state.chapter).padStart(2,"0")+" / 20";
}
function updateRevealCount(){
 const total=$("reading-lines").querySelectorAll(".reveal-button").length;
 const read=$("reading-lines").querySelectorAll('.reveal-button[aria-expanded="true"]').length;
 $("reveal-count").textContent="已读 "+read+" / "+total+" 条";
}
function reveal(button,translation){
 const opening=button.getAttribute("aria-expanded")==="false";
 button.setAttribute("aria-expanded",String(opening));
 button.setAttribute("aria-label",(opening?"收起":"揭晓")+"此条对应的现代白话译文");
 translation.hidden=!opening;
 button.querySelector(".reveal-text").textContent=opening?"收起此条译文":"轻触见译";
 button.querySelector(".reveal-seal").textContent=opening?"收":"译";
 button.closest(".sentence-card").classList.toggle("open",opening);
 updateRevealCount();
}
function renderLines(book){
 const frag=document.createDocumentFragment();
 const passages=getPassages(book.number);
 let count=0;
 for(const item of passages){
  count++;
  const box=create("article","sentence-card");
  box.setAttribute("role","listitem");box.dataset.id=item.id;
  const heading=create("div","sentence-meta");
  heading.append(create("span",null,"文 "+String(count).padStart(3,"0")),create("span",null,item.parts>1?"逐句对照":"原译对照"));
  const source=create("p","sentence-original",item.original);
  const button=create("button","reveal-button");button.type="button";
  button.setAttribute("aria-expanded","false");
  button.setAttribute("aria-controls","translation-"+item.id);
  button.setAttribute("aria-label","揭晓第"+count+"条的现代白话译文");
  button.append(create("span","reveal-text","轻触见译"),create("span","reveal-seal","译"));
  const translation=create("div","sentence-meaning");
  translation.id="translation-"+item.id;
  translation.hidden=true;
  translation.append(create("span","meaning-caption","白话译文 / MODERN CHINESE"),create("p",null,item.translation));
  button.addEventListener("click",()=>reveal(button,translation));
  box.append(heading,source,button,translation);
  frag.append(box);
 }
 $("reading-lines").replaceChildren(frag);
 updateRevealCount();
}
function renderChapter(){
 const b=bookByNumber(state.chapter);
 if(!b)return;
 $("book-kicker").textContent=chapterLabel(b.number)+" · "+b.theme;
 $("book-title").textContent=b.title;
 $("book-description").textContent=b.summary;
 $("chapter-watermark").textContent=String(b.number).padStart(2,"0");
 $("unit-count").textContent="本篇 "+b.units.length+" 组原译 · 全书 "+SOURCE_UNIT_COUNT+" 组 · 页面 "+PASSAGE_COUNT+" 条";
 const isBookmarked=state.bookmarks.includes(b.number);
 $("bookmark").setAttribute("aria-pressed",String(isBookmarked));
 $("bookmark").textContent=isBookmarked?"★ 已收藏":"☆ 收藏此篇";
 $("prev-book").disabled=b.number===1;
 $("next-book").disabled=b.number===20;
 $("prev-name").textContent=b.number>1?bookByNumber(b.number-1).title:"已是首篇";
 $("next-name").textContent=b.number<20?bookByNumber(b.number+1).title:"已是末篇";
 document.documentElement.style.setProperty("--reader-font",state.font+"px");
 renderLines(b);
 renderNavigation();
 storage.write("last",b.number);
}
const reducedMotion=()=>window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??false;
function goToBook(n,scroll){
 if(!valid(n))return;
 state.chapter=n;
 renderChapter();
 history.replaceState(null,"","#chapter-"+n);
 const destination=scroll?$("reader"):$("book-kicker");
 destination.scrollIntoView({behavior:reducedMotion()?"auto":"smooth",block:"start"});
}
$("search").addEventListener("input",e=>{
 state.search=e.target.value;
 document.querySelectorAll(".quick").forEach(b=>b.classList.toggle("active",b.dataset.query===state.search));
 renderCatalogue();
});
document.querySelectorAll(".quick").forEach(b=>b.addEventListener("click",()=>{
 state.search=b.dataset.query;
 $("search").value=state.search;
 document.querySelectorAll(".quick").forEach(x=>x.classList.toggle("active",x===b));
 renderCatalogue();
}));
$("collapse-all").addEventListener("click",()=>{
 for(const button of $("reading-lines").querySelectorAll('.reveal-button[aria-expanded="true"]')){
  reveal(button,document.getElementById(button.getAttribute("aria-controls")));
 }
});
$("font-plus").addEventListener("click",()=>{
 state.font=Math.min(28,state.font+2);storage.write("font",state.font);
 document.documentElement.style.setProperty("--reader-font",state.font+"px");
});
$("font-minus").addEventListener("click",()=>{
 state.font=Math.max(16,state.font-2);storage.write("font",state.font);
 document.documentElement.style.setProperty("--reader-font",state.font+"px");
});
$("prev-book").addEventListener("click",()=>goToBook(state.chapter-1,false));
$("next-book").addEventListener("click",()=>goToBook(state.chapter+1,false));
$("bookmark").addEventListener("click",()=>{
 state.bookmarks=state.bookmarks.includes(state.chapter)
  ?state.bookmarks.filter(n=>n!==state.chapter):[...state.bookmarks,state.chapter];
 storage.write("bookmarks",state.bookmarks);
 renderChapter();renderCatalogue();
 toast(state.bookmarks.includes(state.chapter)?"此篇已收藏":"已取消收藏");
});
$("copy-url").addEventListener("click",async()=>{
 const url=new URL("#chapter-"+state.chapter,location.href).href;
 try{await navigator.clipboard.writeText(url);toast("本篇链接已复制")}
 catch{toast("请复制浏览器地址栏链接")}
});
window.addEventListener("hashchange",()=>{
 const n=hashNumber();
 if(valid(n)){state.chapter=n;renderChapter();}
});
window.addEventListener("keydown",event=>{
 if(event.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){
  event.preventDefault();$("search").focus();
 }
});
let scrollQueued=false;
const updateScroll=()=>{
 const extent=document.documentElement.scrollHeight-innerHeight;
 $("scroll-progress").style.width=(extent?Math.min(100,100*scrollY/extent):0)+"%";
 scrollQueued=false;
};
window.addEventListener("scroll",()=>{
 if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}
},{passive:true});
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
 },{threshold:.11});
 document.querySelectorAll(".appear").forEach(el=>observer.observe(el));
}else document.querySelectorAll(".appear").forEach(el=>el.classList.add("visible"));
renderCatalogue();
renderChapter();
updateScroll();
if(valid(hashNumber()))requestAnimationFrame(()=>$("reader").scrollIntoView({behavior:"auto"}));
