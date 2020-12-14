
var buttonColor = "#36393b";
var buttonTextColor = "#fff";
var decorativeColor = "#04d6f1";
var decorativeColor02 = "#ffffff";
var color01 = "#23292F";
var color0102 = "#e0e0e0";
var color02 = "#2C2F33";
var color0202 = "#fefefe"
var color03 = "#40444b";
var color04 = "#2d3135";
var color05 = "#2a2e31";

const API_KEY = '362594389988e7bb803fc7d8c227e651';

var currentUser;



function setOtherUserName(ouName)
{
    localStorage.setItem("otherUserName", JSON.stringify(ouName));
    window.location.href = "./ChatPage.html";
}


function testCompatibility(user1, user2)
{
    let compat = 10;
    compat -= Math.abs(user1.favouriteGames.length - user2.favouriteGames.length);
    compat -= Math.abs(user1.favouriteFilms.length - user2.favouriteFilms.length);
    compat -= Math.abs(user1.favouriteAnimes.length - user2.favouriteAnimes.length);
    compat -= Math.abs(user1.favouriteMusics.length - user2.favouriteMusics.length);


    return compat >= 7;
}


function testAge(user1, age1, age2 )
{
    let currDate = new Date();
    let birthDate = new Date(`${user1.birthDay}/${user1.birthMonth}/${user1.birthYear}`);
    let age = Math.ceil(Math.abs(currDate - birthDate) / (1000 * 60 * 60 * 24 * 365));
    console.log(user1.birthMonth + "/" + user1.birthDay + "/" + user1.birthYear + "->" + age >= age1 && age <= age2);
    return age >= age1 && age <= age2;
}


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
        arr[i].style.backgroundColor = color01;
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
        
    }
    
    


    //================================================================





    //---------------------------------------------------------------

    function loadUsers()
    {
        let carouselObj = document.getElementById("carousel01Id");
        carouselObj.innerHTML = "";
        let usersStoreStr = "";


        if(localData.users.length <= 1)
            document.getElementById("usersCarousel01").style.display = 'none';

        let messages = localStorage.getItem("messages");

        if(!messages)
        {
            document.getElementById("carousel02divId").style.display= "none";
            document.getElementById("carousel02Id").innerHTML = "";
        }
        else 
            messages = JSON.parse(messages);

        let usersStoreStr2 = "";



        let amount = 0;
        let amount2 = 0;
        for(let i = 0; i < localData.users.length; ++i)
        {
            let user = localData.users[i];

            if(user.userName == currentUser.userName)
                continue;

            let result = false;
            for(let j = 0; j < messages.msgs.length; ++j)
            {
                if((messages.msgs[j].senderUsername == user.userName || messages.msgs[j].receiverUsername == user.userName) &&
                   (messages.msgs[j].senderUsername == currentUser.userName || messages.msgs[j].receiverUsername == currentUser.userName))
                    result = true;
                
            }
            
            
            let userImg = user.profileImg.length ? user.profileImg : './assets/profileImage.png';


            let age1 = document.getElementById("exampleInputAge1").value;
            let age2 = document.getElementById("exampleInputAge2").value;
            
            if(!result)
            {

                if(!testCompatibility(user, currentUser) || !testAge(user, age1 != "" ? age1 : 0, age2 != "" ? age2 : 100))
                    continue;

                

                usersStoreStr += ((amount % 4 == 0) ? ('<div class="carousel-item col-12 ' +
                ((amount == 0) ? 'active">\n' : '">\n'))
                                    : '') +
                        '<div class="card newsCard col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">' +
                        `<img class="userImg rounded-circle" src="${userImg}" alt="Avatar">` +
                        '<div class="card-body">' +
                            `<h4 class="card-title">${user.userName}</h4>` +
                            `<button class="btn" type="button" onclick="setOtherUserName('${user.userName}');">Conversar</button>` +
                        '</div>' +
                        '</div>' + ((amount > 0 && (amount + 1) % 4 == 0) || amount == localData.users.length - 1 ? '</div>\n' : '');

                ++amount;
                continue;
                
            }
                
            

            

        
            usersStoreStr2 += ((amount2 % 4 == 0) ? ('<div class="carousel-item col-12 ' +
                                ((amount2 == 0) ? 'active">\n' : '">\n'))
                                                    : '') +
            '<div class="card newsCard col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">' +
                `<img class="userImg rounded-circle" src="${userImg}" alt="Avatar">` +
                '<div class="card-body">' +
                    `<h4 class="card-title">${user.userName}</h4>` +
                    `<button class="btn" type="button" onclick="setOtherUserName('${user.userName}');">Conversar</button>` +
                '</div>' +
            '</div>' + ((amount2 > 0 && (amount2 + 1) % 4 == 0) || amount == localData.users.length - 1 ? '</div>\n' : '');
            
            ++amount2;
        }

        if(amount2 == 0)
            document.getElementById("carousel02divId").style.display= 'none';
        else
            document.getElementById("carousel02divId").style.display= 'block';

        if(amount == 0)
            document.getElementById("usersCarousel01").style.display = 'none';
        else
            document.getElementById("usersCarousel01").style.display = 'block';

        document.getElementById("carousel02Id").innerHTML = usersStoreStr2;
        carouselObj.innerHTML = usersStoreStr;
       
    }


    document.getElementById("exampleInputAge1").onchange = loadUsers;
    document.getElementById("exampleInputAge2").onchange = loadUsers;
    document.getElementById("defaultCheck1").onchange = loadUsers;

    loadUsers();
}