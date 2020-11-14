
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
}