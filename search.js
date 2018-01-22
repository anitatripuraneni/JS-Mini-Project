  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }
function search(){
  removeAll();
  var viewCount =0;

var viewCounts = new Array();
  const input = document.getElementById('msg').value;
 console.log(input);
  const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q='+input;
  const ul = document.getElementById('search-container');
console.log(url);
  fetch(url)
  .then(resp => resp.json())
  .then((resp) => {
    let data = resp.items;
    return data.map(function(item){
      console.log(item);
      var kk="";
      var title = item.snippet.title;
      var desc = item.snippet.description;
      var publishedAt = item.snippet.publishedAt;
      var channelTitle = item.snippet.channelTitle;
      let li = createNode('li'),
      img = createNode('img'),
      span = createNode('span');
      img.src = item.snippet.thumbnails.medium.url;
      var videoId = item.id.videoId;
      const viewURL  = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id='+videoId+'&part=snippet,statistics';
      console.log(viewURL);
      
fetch(viewURL)
.then(resp1=>resp1.json())
.then((resp1)=>{
  console.log(resp1.items);
  let data1 = resp1.items;
return data1.map(function(item){
  console.log(item);
   viewCount =  item.statistics.viewCount;
   var count=new Object();
   count.videoId = videoId;
   count.viewCount = viewCount;
   viewCounts.push(count);  
  console.log(viewCounts)
})
}).catch(function(error) {
  console.log(JSON.stringify(error));
});
   
       kk += "<li>"+title+"</li>"+"<li>"+desc+"</li>"+"<li>"+publishedAt+"</li>"+"<li>"+channelTitle+"</li>";  
      span.innerHTML= kk;
      append(li, img);
      append(li, span);
      append(ul, li);
       })
     })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  });  
}

function removeAll(){
  document.getElementById("search-container").innerHTML = "";
}


  