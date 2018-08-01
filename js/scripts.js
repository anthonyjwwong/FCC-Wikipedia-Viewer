'use strict';

const elements = {
    searchButton: document.querySelector("#search-button"),
    searchKeyWord: document.querySelector("#search-keyword"),
    response: document.querySelector("#main_response_container"),
    main: document.querySelector(".main")
}

elements.searchButton.addEventListener('click', function(e) {
    let searchedText;
    e.preventDefault();
    elements.response.innerHTML = '';
    searchedText = elements.searchKeyWord.value;
    let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchedText +"&format=json&callback=?";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json"
    }).done(addArticles)
    .fail(function(err){
        console.log(err);
    });

    elements.searchKeyWord.value = '';
    if (elements.response.classList.contains('displayNone')) {
        elements.response.classList.remove('displayNone');
    }
})

function addArticles(data) {
    console.log(data);
    console.log(data[1].length);
    if (data[1].length === 0) {
        let li = document.createElement('li');

        li.innerHTML = "Sorry, we couldn't find your query. Try something else?";
        li.classList.add('errorMsg');
        elements.response.appendChild(li);

    } else {
        for (let i = 0; i < data[1].length; i++) {
            let li = document.createElement('li');
            li.innerHTML = "<a href= " + data[3][i] + ">" +[i + 1] + ". " + data[1][i] + "</a><p>" + data[2][i] + "..." + "</p>";
            elements.response.appendChild(li);
        }
    }
}

