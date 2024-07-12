const APIkey="559265ff166941cba2071adbb15937c5";
const url="https://your-api-endpoint.com/newsapi.org/v2/everything?q=";


window.addEventListener("load",() => fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${APIkey}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('newscard');
    cardContainer.innerHTML="";
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        filldataCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
function filldataCard(cardClone,article){
    const newsImage=cardClone.querySelector("#news-img");    
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}
let cursel=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    cursel?.classList.remove("active");
    cursel=navItem;
    cursel.classList.add("active");
}

const searchelement=document.getElementById('selem');
const stext=document.getElementById('searchtag ');

searchelement.addEventListener("click",()=>{
    const query=searchtag.value;
    if(!query) return;
    fetchNews(query);
    cursel?.classList.remove('active');
    cursel=null;
});
function reload(){
    window.location.reload();
}