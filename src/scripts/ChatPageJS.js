
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
    else
    {
        localStorage.setItem("localData", JSON.stringify(localData));
    }


    //---------------------------------------------------------------------

    //get the current user
    var currentUserId = -1;
    let currentUserJSON = localStorage.getItem("currentUser");
    if(currentUserJSON)
    {
        currentUser = JSON.parse(currentUserJSON);

        for(let i = 0; i < localData.users.length; ++i)
        {
            if(localData.users[i].userName == currentUser.userName)
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



    



    //================================================================

    let otherUser;
    let otherUserName; //name of user to which messages will be sent
    let otherUserNameJSON = localStorage.getItem("otherUserName");

    if(otherUserNameJSON)
    {
        otherUserName = JSON.parse(otherUserNameJSON);

        for(let i = 0; i < localData.users.length; ++i)
        {
            if(localData.users[i].userName == otherUserName)
            {
                otherUser = localData.users[i];
                break;
            }
            else if(i == localData.users.length - 1)
            {
                 window.location.href = "./LoginPage.html";
            }
        }  
    }
    else
        window.location.href = "MainPage.html";        


    //==========================================================================
        

    var messagesObj;

    function loadMessages()
    {

        let messagesJSON = localStorage.getItem("messages");


        if(messagesJSON)
        {
            messagesObj =  JSON.parse(messagesJSON);
            let messagesStr = "";
            let count = 0; 
            

            for(let i = 0; i < messagesObj.msgs.length; ++i)
            {            

                
                if((messagesObj.msgs[i].senderUsername == currentUser.userName && messagesObj.msgs[i].receiverUsername == otherUserName) ||
                (messagesObj.msgs[i].receiverUsername == currentUser.userName && messagesObj.msgs[i].senderUsername == otherUserName))
                {
                    

                    if(messagesObj.msgs[i].senderUsername == currentUser.userName)
                    {                        
                        messagesStr += 
                        '<div class="message' + (count == 0 ? ' firstMsg' : '') + '">' +                            
                            `${messagesObj.msgs[i].body}` +
                            '<br>' + 
                        `</div>`;
                    }
                    else
                    {
                        messagesStr += 
                            '<div class="otherUserMsg' + (count == 0 ? ' firstMsg' : '') + '">' +
                                `<img src="${otherUser.profileImg.length ? otherUser.profileImg : "./assets/profileImage.png"}" alt="Avatar" class="rounded-circle">` + 
                                `${otherUserName} <br> ${messagesObj.msgs[i].body}` +
                                '<br>' + 
                            `</div>`;
                    }



                    ++count;
                }


                document.getElementById("messagesStore").innerHTML = messagesStr;
            }

        }
   


    }


    loadMessages();
    //==============================================================================


    function handleMsgSending ()
    {
        if(document.getElementById("messageInputID").value.length > 0)
        {
            let msg = { 
                "senderUsername": `${currentUser.userName}`,
                "receiverUsername": `${otherUserName}`,
                "body":`${document.getElementById("messageInputID").value}`
            };

            document.getElementById("messageInputID").value = "";

            let messagesJSON = localStorage.getItem("messages");


            if(messagesJSON)
            {
                messagesObj = JSON.parse(messagesJSON)
                messagesObj.msgs.push(msg);
                localStorage.setItem("messages", JSON.stringify(messagesObj));
            }
            else
            {
                messagesObj = { "msgs": [msg] };
                localStorage.setItem("messages", JSON.stringify(messagesObj));
            }

            loadMessages();
        }

    }


    document.getElementById("sendMessageIcon").addEventListener('click', handleMsgSending);

    document.getElementById("messagesStore2").style.minHeight = (window.innerHeight - 50) + 'px';
}

window.onresize = () =>
{
    document.getElementById("messagesStore2").style.minHeight = (window.innerHeight - 50) + 'px';
    
}
