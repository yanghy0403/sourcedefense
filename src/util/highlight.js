//查找关键词
function findHighlight(keyWord,node){
  
    const str=keyWord.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
 
  const val= node.innerHTML;
  const content = searchdo(val, str);
 
  node.innerHTML=content;
 
};
//根据内容和关键词进行匹配替换
function searchdo(content,keyWord){
 
  // let keyWordArr = keyWord.split(' ');
  // if(keyWordArr.indexOf('-')>-1){
  //    keyWordArr.splice(keyWordArr.indexOf('-'),1);
  // }
  
 let keyWordArr = [keyWord];
  let re;
  for(let n = 0; n < keyWordArr.length; n +=1) {
    re = new RegExp(`${keyWordArr[n]}`,"gmi");
  
    content = content.replace(re,`<span class="high">${keyWordArr[n]}</span>`);
    
  }
  return content;
};
let obj={
  findHighlight:findHighlight,
  searchdo:searchdo
}

export default obj;