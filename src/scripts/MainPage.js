
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
            else if(i == localData.users.length - 1) alert("No user is currently logged");
        }
    }



    if(currentUserId != -1)
    {   
        currentUser = JSON.parse(currentUserJSON);
        document.getElementById("userNameId").innerHTML = "<p> " + localData.users[currentUserId].userName + "</p>";
    }

    
    

    if(currentUserId != -1)
    {
        document.getElementById("imag01").src = localData.users[currentUserId].profileImg;
    }

    //================================================================
    //load news from the newsApi

    let newsStore = document.getElementById("carouselId");
    newsStore.innerHTML = "";
    let newsStoreStr = "";
    for(let i = 0; i < 16; ++i)
    {
        //if(i % 4 == 0)
        //{
        //    newsStore.innerHTML += '<div class="carousel-item col-12 active">\n';
        //}
    
        newsStoreStr += ((i % 4 == 0) ? ('<div class="carousel-item col-12 ' +
                            ((i == 0) ? 'active">\n' : '">\n'))
                                                : '') +
        '<div class="card col-3" style="width: 14rem;">' +
            '<img class="card-img-top" src="" alt="Card image cap">' +
            '<div class="card-body">' +
                '<h5 class="card-title">Card title</h5>' +
                '<p class="card-text"> example </p>' +
                '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' +
        '</div>' + ((i > 0 && (i + 1) % 4 == 0) ? '</div>\n' : '');
        
        //if(i > 0 && (i + 1) % 4 == 0)
        //{
        //   newsStore.innerHTML += '</div>\n';
        //}
        
    }
    newsStore.innerHTML = newsStoreStr;

}