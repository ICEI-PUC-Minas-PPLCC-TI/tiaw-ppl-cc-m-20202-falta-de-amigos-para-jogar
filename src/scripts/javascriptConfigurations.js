
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

    var user01 = localStorage.getItem("user002");
    if(user01 != null)
    {
        let parsedUser = JSON.parse(user01);
        document.getElementById("inputGroupSelect01").value = parsedUser.darkTheme;
        document.getElementById("recEmailId").value = parsedUser.recEmail;
    }



    let useDarkTheme = document.getElementById('inputGroupSelect01').value;
    document.getElementById("headerId").style.borderColor = (useDarkTheme == '1') ? decorativeColor : decorativeColor02;
    document.getElementById("headerId").style.backgroundColor = (useDarkTheme == '1') ? color01 : color0102;


    if(document.getElementById("profileSettingsId"))
    {
        document.getElementById("profileSettingsId").style.borderColor = (useDarkTheme == '1') ? decorativeColor : decorativeColor02;
        document.getElementById("profileSettingsId").style.backgroundColor = (useDarkTheme == '1') ? color03 : color03;
    }

    document.getElementById("footerId").style.borderColor = (useDarkTheme == '1') ? decorativeColor : decorativeColor02;
    document.getElementById("footerId").style.backgroundColor = (useDarkTheme == '1') ? color01 : color0102;
    document.getElementById("footerId").style.color = (useDarkTheme == '1') ? '#ffffff' : '#000000';

    document.body.style.backgroundColor = (useDarkTheme == '1') ? color02 : color0202;

    let pList = document.getElementsByTagName('p');
    for(let i = 0; i < pList.length; ++i)
        pList[i].style.color = (useDarkTheme == '1') ? '#ffffff' : '#000000';

    //------------------------------------------------------------------------------

    //configure buttons color
    let arr = document.getElementsByClassName('btn');
    for(let i = 0; i < arr.length; ++i)
    {
        arr[i].style.backgroundColor = buttonColor;
        arr[i].style.color = buttonTextColor;
    }


    //------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------


    

    document.getElementById("bt02").onclick = () => {

        let user02 = { 'darkTheme': document.getElementById('inputGroupSelect01').value,
                 'recEmail': document.getElementById('recEmailId').value};

        localStorage.setItem("user002", JSON.stringify(user02) );

        location.reload();
    }

   

}