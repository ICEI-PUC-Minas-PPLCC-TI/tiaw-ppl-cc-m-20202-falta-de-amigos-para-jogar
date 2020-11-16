
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

    button02.style.backgroundColor = color03;
    
    button01.addEventListener("click", () => { window.location.href = "LoginPage.html";}); 

    //==========================================================

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


    //-----------------------------------------------------------------

    let usernameObj = document.getElementById("userNameInput");
    let emailObj = document.getElementById("emailInput");
    let passwordObj = document.getElementById("passwordInput");
    let birthDayObj = document.getElementById("birthDateDayId");
    let birthMonthObj = document.getElementById("birthDateMonthId");
    let birthYearObj = document.getElementById("birthDateYearId");

    //function to be executed when the user press the Login button
    document.getElementById("bt02").onclick = () => {
        if(usernameObj.value.length == 0 || 
            emailObj.value.length == 0 ||
            passwordObj.value.length == 0 ||
            birthDayObj.value.length == 0 ||
            birthMonthObj.value.length == 0 ||
            birthYearObj.value.length == 0) 
        {
            alert("Preencha todos os campos");
            return;
        }
        
        for(let i = 0; i < localData.users.length; ++i)
        {
            if(localData.users[i].userName == usernameObj.value)
            {
                alert("This username is already in use.");
                return;
            }
        }

        let currentUser = {
            'userName': usernameObj.value,
            'completeName': "", 
            'phone': "",
            'email': emailObj.value,
            'birthDay': birthDayObj.value,
            'birthMonth': birthMonthObj.value,
            'birthYear': birthYearObj.value,
            'password': passwordObj.value,
            'recEmail': "",
            'darkTheme': 1,
            'favouriteGames': [],
            'favouriteFilms': [],
            'favouriteAnimes': [],
            'favouriteMusics': [],
            'profileImg': ""
        }

        localData.users.push(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("localData", JSON.stringify(localData));
        window.location.href = "ProfileSettings.html";
        return;

    }

}