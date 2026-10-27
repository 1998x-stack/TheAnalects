import A from "./books-01-05.js";
import B from "./books-06-10.js";
import C from "./books-11-15.js";
import D from "./books-16-20.js";

/**《论语》上游原译数据：Scagin/CCTC (MIT)，见 THIRD-PARTY-NOTICES.md。
 * 20篇、616条源文-现代译文配对单元；616并非权威古籍分章数量。
 */
export const BOOKS=Object.freeze([...A,...B,...C,...D]);
export const BOOK_COUNT=BOOKS.length;
export const SOURCE_UNIT_COUNT=BOOKS.reduce((sum,b)=>sum+b.units.length,0);
export const bookByNumber=n=>BOOKS[Number(n)-1]??null;
export const THEMES=Object.freeze([...new Set(BOOKS.map(b=>b.theme))]);
export function editorialSentences(s){
 if(typeof s!=="string")throw new TypeError("Expected Chinese text");
 return s.match(/[^。！？；]+[。！？；][”’]?|[^。！？；]+$/gu)||[];
}
/** 严格保持原译单元。仅双方句数相等且源文字节可回拼时进行句级细分。
 * 自动对齐仍需人工语义复核；未达条件的单元保持原有逐条对照。
 */
export function passagesOf(book){
 if(!book||!Array.isArray(book.units))throw new TypeError("Invalid book");
 return book.units.flatMap(unit=>{
  const s=editorialSentences(unit.original),t=editorialSentences(unit.translation);
  const matched=s.length>1&&s.length===t.length&&s.join("")===unit.original&&t.join("")===unit.translation;
  const source=matched?s:[unit.original],translation=matched?t:[unit.translation];
  return source.map((original,i)=>Object.freeze({
   id:unit.id+"-"+String(i+1).padStart(2,"0"),unitId:unit.id,book:book.number,
   index:i+1,parts:source.length,original,translation:translation[i],
   alignment:matched?"punctuation":"source-pair"
  }));
 });
}
export const PASSAGES=Object.freeze(BOOKS.map(passagesOf));
export const PASSAGE_COUNT=PASSAGES.reduce((n,b)=>n+b.length,0);
export const getPassages=n=>PASSAGES[Number(n)-1]??[];
