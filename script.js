 $(document).ready(function(){

  $('form').on('submit', function(e){
    e.preventDefault(); 
    console.log("The zip code is: " + $('#zipcode-input').val())
    makeApiCall($('#zipcode-input').val())
  })


});




 var shelters = []; 
 
 var petDictionary = {};
//http://api.petfinder.com/pet.find?location=97062&key=a4d4d400939b10647da19b7593286b34&output=full&format=json
//http://api.petfinder.com/pet.getRandom?format=json&key=a4d4d400939b10647da19b7593286b34&animal=dog&output=basic

function makeApiCall(searchObj){
//http://api.petfinder.com/shelter.get?id=SD08&format=json&key=a4d4d400939b10647da19b7593286b34&animal=smallfurry&output=basic


var str = jQuery.param( searchObj );
console.log(str);

 var url = `http://api.petfinder.com/pet.find?${str}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;


 console.log(url)
 



 //var url = `http://api.petfinder.com/pet.find?location=${zipcode}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
return $.ajax({
  type : 'GET',
  data : {},
  url : url+'&callback=?' ,
  dataType: 'json',
  success : function(data) {              
    if(!data.petfinder.pets){
      return "no pets"
    }


    shelters = [];


    let html = ""

    let pets = data.petfinder.pets.pet;
    pets.forEach(function(pet,e) { 


      petDictionary[pet.id.$t] = pet;




      if(shelters.indexOf(pet.shelterId.$t) < 0) {
       shelters.push(pet.shelterId.$t)
     }




     if (e % 3 === 0){
            //make a new row
            html += `</div><div class="row">`

          }


          html +=   
          `<div class="col-4">
          <div class="card"<a onclick="showPetProfile(${pet.id.$t})"></a>`
          
          html += findImage(pet)
          html += findBreed(pet)
          
          html += `<div class="card-content">
          <h3>${pet.name.$t}</h3>
          <div id="gender">Gender: ${pet.sex.$t}</div>
          <div id="breed">I am a ${pet.breeds.breed.$t}</div>
          <div id="age">${pet.age.$t}</div>
          <div id="city">I live in ${pet.contact.city.$t}</div> 
          <div id="state">${pet.contact.state.$t}</div>
          </div>
          </div>
          </div>`


        })





    html = "<div>" + html + "</div>"

    $('#results').html(html)
      //$('#js-description').html(html)

    },
    error : function(request,error)
    {
      alert("Request: "+JSON.stringify(request));
    }

  });

}

function findBreed(pet){
  if(pet.breeds.breed.$t === "undefinded"){
    return "I am a mixed breed."
  }
  }
function findImage(pet){
  if(!pet.media.photos){
    return `<img class="no-photo" src="https://image.ibb.co/dRKSGa/IMG_3067.jpg"/>`
  }
 for(var c = 0; c< pet.media.photos.photo.length; c++){
  if(pet.media.photos.photo[c]['@size'] == "x") {
    return `<img class="card-image" src = "${pet.media.photos.photo[c].$t}"/>`
  }
}
}


function showPetProfile(id) {

$("#map-container").hide();
$("#intro").hide();


  var dogProfileHtml = 
  `<button id="go-back" onclick="$('#results').show();$('#profile-view').hide();"/>
  <div id="background-2">
  <div class="name">${petDictionary[id].name.$t}</div>
  <div id ="js-description">${petDictionary[id].description.$t}<div>
  <div id="breed">I am a ${petDictionary[id].breeds.breed.$t}</div>
  <div id="city">And I live in ${petDictionary[id].contact.city.$t},</div> 
  <div id="state">${petDictionary[id].contact.state.$t}</div>
  <div id ="code">Zip Code: ${petDictionary[id].contact.zip.$t}</div>
  <div id="phone">Please call: ${petDictionary[id].contact.phone.$t}</div>
  <div id="email">Or email: ${petDictionary[id].contact.email.$t}</div>`;

  let breed = petDictionary[id].breeds.breed.$t;
  if(!petDictionary[id].breeds.breed.$t){
    return "I am a mixed breed"
  }
 let gender = petDictionary[id].sex.$t;
 if (petDictionary[id].sex.$t === "M") {
   dogProfileHtml += `<div class="male">I am a Male.</div>`
 }
 if(petDictionary[id].sex.$t === "F"){
  dogProfileHtml += `<div class="female">I am a Female.</div>`
  }
  
  for(var k = 0; k<petDictionary[id].media.photos.photo.length; k++){
    if(petDictionary[id].media.photos.photo[k]['@size'] == "x") {
      dogProfileHtml +=`<div class="slides"><img class="profile-image" src = "${petDictionary[id].media.photos.photo[k].$t}"/>`
                        
    }
  }

  //$("#results").html(dogProfileHtml);
  $("#profile-view").html(dogProfileHtml);
  $("#profile-view").show();
  $("#results").hide();
}



jQuery(document).ready(function (e) {
  function t(t) {
    e(t).bind("click", function (t) {
      t.preventDefault();
      e(this).parent().fadeOut()
    })
  }
  e(".dropdown-toggle").click(function () {
    var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
    e(".button-dropdown .dropdown-menu").hide();
    e(".button-dropdown .dropdown-toggle").removeClass("active");
    if (t) {
      e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
    }
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
  })
});

//    makeApiCall($('#zipcode-input').val())
$('input[type=radio]').change(
  function(){ 
    
    $('input[type=radio]:checked' ).each(function () {

      searchObj[this.name] = this.value
    })
    
      
    makeApiCall(searchObj)
    console.log(searchObj)
    
  }
  )
