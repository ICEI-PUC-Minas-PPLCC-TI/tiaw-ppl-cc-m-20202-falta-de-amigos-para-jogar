
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


    

    document.getElementById("bt02").onclick = () => {

        let user02 = { 'userName': document.getElementById('nameId').value,
                 'completeName': document.getElementById('completeNameId').value, 
                 'phone': document.getElementById('phoneId').value,
                 'birthDay': document.getElementById('birthDateDayId').value,
                 'birthMonth': document.getElementById('birthDateMonthId').value,
                 'birthYear': document.getElementById('birthDateYearId').value};

        localStorage.setItem("user001", JSON.stringify(user02) );
    }

    var user01 = localStorage.getItem("user001");
    if(user01 != null)
    {
        let parsedUser = JSON.parse(user01);
        document.getElementById("nameId").value = parsedUser.userName;
        document.getElementById("completeNameId").value = parsedUser.completeName;
        document.getElementById("phoneId").value = parsedUser.phone;
        document.getElementById("birthDateDayId").value = parsedUser.birthDay;
        document.getElementById("birthDateMonthId").value = parsedUser.birthMonth;
        document.getElementById("birthDateYearId").value = parsedUser.birthYear;
    }


    
    //======================================

   

    function loadimage(e1)
    {
        var filename = e1.target.files[0]; 
        var fr = new FileReader();
        fr.onload = () => { 
            document.getElementById("imag01").src = fr.result;
            try {
                localStorage.setItem("profileImg", fr.result);
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

       favoritesArr = localStorage.getItem(lsKey);
       if(favoritesArr != null)
       {
           let arr = JSON.parse(localStorage.getItem(lsKey));

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
       else{
           localStorage.setItem(lsKey, JSON.stringify([]));
       }
   }


   function addFavourite(storeName, lsKey, modalInput)
   {
       let store = document.getElementById(storeName);

       if(document.getElementById(modalInput).value != '')
       {

            let favoritesArr = localStorage.getItem(lsKey);
            let arr = JSON.parse(favoritesArr);

            //see if the value already is in the array
            function check(val) {
                return val == document.getElementById(modalInput).value;
            }

            if(arr.find( check ) != undefined)
                return;

            arr.push(document.getElementById(modalInput).value);
           
            localStorage.setItem(lsKey, JSON.stringify(arr));

            store.innerHTML = ''; //clear all elements 
            loadFavourites(storeName, lsKey); //and load them again
       }
   }

   function deleteFavourite(eventObj, storeName, lsKey)
   {
        let favoriteGamesArr = localStorage.getItem(lsKey);

        let arr = JSON.parse(favoriteGamesArr);

        arr.splice(eventObj.target.tabIndex, 1);
        localStorage.setItem(lsKey, JSON.stringify(arr));

    
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
        addFavourite("musicsStore", "favouriteMusics", "modalInput04" ); } 
                        
};


document.addEventListener("DOMContentLoaded", () => {

    let profileImg01 = localStorage.getItem("profileImg");
    if(profileImg01 != null)
    {
        document.getElementById("imag01").src = profileImg01;
    }

});

