
var buttonColor = "#36393b";
var buttonTextColor = "#fff";
var decorativeColor = "#04d6f1"
var decorativeColor02 = "#ffffff"
var color01 = "#23292F";
var color0102 = "#e0e0e0";
var color02 = "#2C2F33";
var color0202 = "#fefefe"
var color03 = "#40444b";
var color04 = "#2d3135";
var color05 = "#2a2e31";

const API_KEY = '362594389988e7bb803fc7d8c227e651';

var currentUser;

const userTemplate = 
{
    'userName': "name1",
    'completeName': "cname1", 
    'phone': "phone1",
    'email': "email1",
    'birthDay': "1",
    'birthMonth': "1",
    'birthYear': "2000",
    'password': "123",
    'profileImg': "",
    'recEmail': "",
    'darkTheme': "",
    'favouriteGames': [],
    'favouriteFilms': [],
    'favouriteAnimes': [],
    'favouriteMusics': []

};


window.onload = () => {


    document.getElementById("headerId").style.borderColor = decorativeColor;
    document.getElementById("headerId").style.backgroundColor = color01;

    document.getElementById("footerId").style.borderColor = decorativeColor;
    document.getElementById("footerId").style.backgroundColor = color01;
    document.getElementById("footerId").style.color = '#ffffff';

    document.body.style.backgroundColor = color02;




    

    //------------------------------------------------------------------------------

    //configure buttons color
    let arr = document.getElementsByClassName('btn');
    for(let i = 0; i < arr.length; ++i)
    {
        arr[i].style.backgroundColor = buttonColor;
        arr[i].style.color = buttonTextColor;
    }



    //===========================================================================


    let localData = 
    {
        users: []
    };


    let dataJSON = localStorage.getItem("localData");
    if(dataJSON)
    {
        localData = JSON.parse(dataJSON);
    }
    else{
        localStorage.setItem("localData", JSON.stringify(localData));
    }


    //---------------------------------------------------------------------

    //get the current user
    var currentUserId = -1;
    let currentUserJSON = localStorage.getItem("currentUser");
    if(currentUserJSON)
    {
        for(let i = 0; i < localData.users.length; ++i)
        {
            if(localData.users[i].userName == JSON.parse(currentUserJSON).userName)
            {
                currentUserId = i;
                break;
            }
            else if(i == localData.users.length - 1)
            {
                 alert("No user is currently logged");
                 window.location.href = "./LoginPage.html";
            }
        }
    }
    else
    {
        window.location.href = "./LoginPage.html";
    }




    if(currentUserId != -1)
    {   
        currentUser = JSON.parse(currentUserJSON);
        document.getElementById("userNameId").innerHTML = "<p> " + localData.users[currentUserId].userName + "</p>";
    }
    
    

    if(currentUserId != -1)
    {
        if(localData.users[currentUserId].profileImg.length)
            document.getElementById("imag01").src = localData.users[currentUserId].profileImg;
        else
            document.getElementById("imag01").src = './assets/profileImage.png';
    }

    //================================================================
    //load news from the newsApi





    function loadNews()
    {
       
        let newsStore = document.getElementById("carouselId");
        newsStore.innerHTML = "";
        let newsStoreStr = "";

        let data = JSON.parse(this.responseText);

        
        for(let i = 0; i < data.articles.length && i < 9; ++i)
        {
            let article = data.articles[i];


            let date = new Date(article.publishedAt);

            newsStoreStr += ((i % 3 == 0) ? ('<div class="carousel-item col-12 ' +
                                ((i == 0) ? 'active">\n' : '">\n'))
                                                    : '') +
            '<div class="card newsCard col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">' +
                `<img class="card-img-top" src="${article.image}" alt="Card image cap">` +
                '<div class="card-body">' +
                    `<h5 class="card-title">${article.title}</h5>` +
                    `<p class="card-text"> ${article.content} </p>` +
                    `<p> ${date.toLocaleDateString()} - ${article.source.name}</p>` + 
                    `<a href="${article.url}" target="_blank">Mais detalhers</a>` +
                '</div>' +
            '</div>' + ((i > 0 && (i + 1) % 3 == 0) ? '</div>\n' : '');
            
            
        }
        newsStore.innerHTML = newsStoreStr;
        

       
    }

/*
    let newsStore = document.getElementById("carouselId");
    newsStore.innerHTML = "";
    let newsStoreStr = "";

    for(let i = 0; i < 9; ++i)
    {
        let text123 = (i % 2) == 0 ? 'sdgiausgdaugsduaosdosudyoagdaisgdasgdigasudtaiosgdustdoiuagsd9augsdoasgdoausdguoagdugawoudgagdauwgdouagsdoasd'
        : 'sdgiausgdaugsduaosdosudyoagdaisgdasgdigasudtaiosg';
        newsStoreStr += ((i % 3 == 0) ? ('<div class="carousel-item col-12 ' +
                            ((i == 0) ? 'active">\n' : '">\n'))
                                                : '') +
        '<div class="card newsCard col-4">' +
            `<img class="card-img-top" src="./assets/profileImage.png" alt="Card image cap">` +
            '<div class="card-body">' +
                `<h5 class="card-title">Test</h5>` +
                `<p class="card-text"> ${text123} </p>` +
                `<p> </p>` + 
                `<a href="#">Mais detalhes</a>` +
            '</div>' +
        '</div>' + ((i > 0 && (i + 1) % 3 == 0) ? '</div>\n' : '');
        
        
    }
    newsStore.innerHTML = newsStoreStr;
*/


    let newsRequest = new XMLHttpRequest();
    newsRequest.onload = loadNews;
    
    newsRequest.open('GET', `https://gnews.io/api/v4/search?lang=en&q=(game OR anime OR serie OR film OR movie) AND (netflix OR riot OR crunchyroll OR anime OR sony OR nintendo OR vr OR virtual reality OR geek OR epic games OR steam)&token=${API_KEY}`);
    newsRequest.send();

}