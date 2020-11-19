
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

    document.getElementById("loginInfo").style.borderColor = decorativeColor;
    document.getElementById("loginInfo").style.backgroundColor =  color03;

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


    //------------------------------------------------------------------------------



    let button01 = window.document.getElementById("loginBt");
    let button02 = window.document.getElementById("registerBt");

    button01.style.backgroundColor = color03;
    button02.addEventListener("click", () => { window.location.href = "RegisterPage.html";}); 


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


    let currentUserJSON = localStorage.getItem("currentUser");
    let usernameObj = document.getElementById("userNameInput");
    let passwordObj = document.getElementById("passwordNameInput");

    if(currentUserJSON)
    {   
        currentUser = JSON.parse(currentUserJSON);
        usernameObj.value = currentUser.userName;
        passwordObj.value = currentUser.password;

    }

    
    //function to be executed when the user press the Register button
    document.getElementById("bt02").onclick = () => {
        if(document.getElementById("userNameInput").value.length == 0 || 
            document.getElementById("passwordNameInput").value.length == 0) 
        {
            alert("Preencha todos os campos");
            return;
        }
        
        for(let i = 0; i < localData.users.length; ++i)
        {
            if(localData.users[i].userName == usernameObj.value && localData.users[i].password == passwordObj.value)
            {
                currentUser = localData.users[i];
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                window.location.href = "MainPage.html";
                return;
            }
            
        }
        alert("Nome de usuário ou senha Incorretos");

    }

}