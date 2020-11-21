
var buttonColor = "#36393b";
var buttonTextColor = "#fff";
var decorativeColor = "#04d6f1"
var color01 = "#23292F";
var color02 = "#2C2F33";
var color03 = "#40444b";
var color04 = "#2d3135";
var color05 = "#2a2e31";

window.onload = () => {

    document.getElementById("headerId").style.borderColor = decorativeColor;
    document.getElementById("headerId").style.backgroundColor= color01;

    if(document.getElementById("profileSettingsId"))
    {
        document.getElementById("profileSettingsId").style.borderColor = decorativeColor;
        document.getElementById("profileSettingsId").style.background = color03;
    }

    document.getElementById("footerId").style.borderColor = decorativeColor;
    document.getElementById("footerId").style.backgroundColor = color01;

    document.body.style.backgroundColor = color02;

    //------------------------------------------------------------------------------

    //configure buttons color
    let arr = document.getElementsByClassName('btn');
    for(let i = 0; i < arr.length; ++i)
    {
        arr[i].style.backgroundColor = buttonColor;
        arr[i].style.color = buttonTextColor;
    }

    document.getElementById("loadImageLabel").style.backgroundColor = buttonColor;
    document.getElementById("loadImageLabel").style.color = buttonTextColor;

    //------------------------------------------------------------------------------

    arr = document.getElementsByClassName("personalSettings01");
    for(let i = 0; i < arr.length; ++i)
    {
        arr[i].style.backgroundColor = (i % 2 == 0) ? color04 : color05;
    }

    //-----------------------------------------------------------------------------


    var localData = 
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
                window.location.href = "src/LoginPage.html";
            }
        }
    }




    //-----------------------------------------------------------------
    

    document.getElementById("bt02").onclick = () => {

        if(currentUserId != -1)
        {
            localData.users[currentUserId].userName = document.getElementById('nameId').value;
            localData.users[currentUserId].completeName = document.getElementById('completeNameId').value
            localData.users[currentUserId].phone = document.getElementById('phoneId').value;
            localData.users[currentUserId].birthDay = document.getElementById('birthDateDayId').value;
            localData.users[currentUserId].birthMonth = document.getElementById('birthDateMonthId').value
            localData.users[currentUserId].birthYear = document.getElementById('birthDateYearId').value;

            localStorage.setItem("localData", JSON.stringify(localData) );
        }
    }

    if(currentUserId != -1)
    {
        
        document.getElementById("nameId").value = localData.users[currentUserId].userName;
        document.getElementById("completeNameId").value = localData.users[currentUserId].completeName;
        document.getElementById("phoneId").value = localData.users[currentUserId].phone;
        document.getElementById("birthDateDayId").value = localData.users[currentUserId].birthDay;
        document.getElementById("birthDateMonthId").value = localData.users[currentUserId].birthMonth;
        document.getElementById("birthDateYearId").value = localData.users[currentUserId].birthYear;
        if(localData.users[currentUserId].profileImg != "")
            document.getElementById("imag01").src = localData.users[currentUserId].profileImg;
    };

    
    //======================================

   

    function loadimage(e1)
    {
        var filename = e1.target.files[0]; 
        var fr = new FileReader();
        fr.onload = () => { 
            document.getElementById("imag01").src = fr.result;
            try {                

                if(currentUserId != -1)
                {
                    localData.users[currentUserId].profileImg = fr.result;
                    localStorage.setItem("localData",  JSON.stringify(localData));
                }
            }
            catch (e) {
                console.log("Storage failed: " + e);
            }
        }
        fr.readAsDataURL(filename); 

    }


    var y = document.getElementById("getimage");
    y.addEventListener('change', loadimage, false);


    //#####################################################################
    
   function loadFavourites(storeName, lsKey) 
   {
        if(currentUserId != -1)
        {
            let arr = localData.users[currentUserId][lsKey];

            let store = document.getElementById(storeName);
            for(let i = 0; i < arr.length; ++i)
            {
                store.innerHTML += 
                    '<span class="badge badge-default"> '
                    + arr[i] + 
                    '<i tabindex="' + i + '" class="delete far fa-times-circle"></i></span>';
            }

            //set the onclick function for every badge's delete button
            let arr02 = document.querySelectorAll('#' + storeName +' .delete');
           
            for(let i = 0; i < arr02.length; ++i)
            {
            
                arr02[i].onclick = (eventObj ) => { deleteFavourite(eventObj, storeName, lsKey ); }
            }

        }
    }


    function addFavourite(storeName, lsKey, modalInput)
    {
        if(currentUserId == -1)
            return;

        let store = document.getElementById(storeName);

        if(document.getElementById(modalInput).value != '')
        {

            let arr = localData.users[currentUserId][lsKey];

            //see if the value already is in the array
            function check(val) {
                return val == document.getElementById(modalInput).value;
            }

            if(arr.find( check ) != undefined)
                return;

            arr.push(document.getElementById(modalInput).value);
           
            localData.users[currentUserId][lsKey] = arr;

            localStorage.setItem("localData", JSON.stringify(localData));

            store.innerHTML = ''; //clear all elements 
            loadFavourites(storeName, lsKey); //and load them again
       }
   }

   function deleteFavourite(eventObj, storeName, lsKey)
   {
        localData.users[currentUserId][lsKey].splice(eventObj.target.tabIndex, 1);

        localStorage.setItem("localData", JSON.stringify(localData));

    
        document.getElementById(storeName).innerHTML = ""; //clear all elements 
        loadFavourites(storeName, lsKey);  //and load them again

   }




    //=================================================================


    loadFavourites("gamesStore", "favouriteGames");
    loadFavourites("filmsStore", "favouriteFilms");
    loadFavourites("animesStore", "favouriteAnimes");
    loadFavourites("musicsStore", "favouriteMusics");


    document.getElementById("addButton01").onclick = () => { 
        addFavourite("gamesStore", "favouriteGames", "modalInput01" ); } 
    
    document.getElementById("addButton02").onclick = () => { 
        addFavourite("filmsStore", "favouriteFilms", "modalInput02" ); } 
        
    document.getElementById("addButton03").onclick = () => { 
        addFavourite("animesStore", "favouriteAnimes", "modalInput03" ); } 

    document.getElementById("addButton04").onclick = () => { 
        addFavourite("musicsStore", "favouriteMusics", "modalInput04" ); } ;


    document.addEventListener("DOMContentLoaded", () => {

        //let profileImg01 = localStorage.getItem("profileImg");
        if(currentUserId != -1)
        {
            document.getElementById("imag01").src = localData.users[currentUserId].profileImg;
        }
    
    });
                        
};






