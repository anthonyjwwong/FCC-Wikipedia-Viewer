const searchButton = document.querySelector('#search-button');
const searchKeyword = document.querySelector('#search-keyword');
const responseContainer = document.querySelector('#response-container');
let searchedForText = "";

searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchKeyword.value;

  let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchedForText +"&format=json&callback=?";

  $.ajax({
    type:"GET",
    url:url,
    dataType: "json"
  }).done(addArticles)
  .fail(function(err) {
    alert("error");
  });

  function addArticles(data) {

     for(let i =0; i < data[1].length; i++) {

       if (data[1].length !== 0) {

          let li = document.createElement('li');
         li.innerHTML = "<a href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "..." + "</p>";
          responseContainer.appendChild(li);
      } else if (data[1].length === 0) {
        let li = document.createElement('li');
        let errormsg = "Oops, seems like we can't find what you were searching for, is there something else you will like to search for?"
        let textnode = document.createTextNode(errormsg);
        li.appendChild(textnode);
        responseContainer.appendChild('li');
      }

      }
  searchKeyword.value = "";
  }
})
