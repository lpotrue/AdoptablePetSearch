 $(document).ready(function(){

  $('form').on('submit', function(e){
    e.preventDefault(); 
    console.log("The zip code is: " + $('#zipcode-input').val())
    makeApiCall($('#zipcode-input').val())
  })


});




 var shelters = []; 
 
 var petDictionary = {};

function makeApiCall(searchObj){


var str = jQuery.param( searchObj );
console.log(str);

 var url = `https://api.petfinder.com/pet.find?${str}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;


 console.log(url)
 
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
          <div class="card" <a onclick="showPetProfile(${pet.id.$t})"></a>`
          
          html += findImage(pet)
         
          html += 
          `<div class="card-content">
          <h3>${pet.name.$t}</h3>
          <div id="gender">Gender: ${pet.sex.$t}</div>`


          html += findBreed(pet)
          
          html += `<div id="age">${pet.age.$t}</div>
          <div id="city">I live in ${pet.contact.city.$t},   ${pet.contact.state.$t}</div> 
          </div>
          </div>
          </div>`

        })





    html = "<div>" + html + "</div>"

    $('#results').html(html)

    },
    error : function(request,error)
    {
      alert("Request: "+JSON.stringify(request));
    }

  });

}

function findBreed(pet){
  if(pet.breeds.breed.$t === undefined){
    return "mixed breed"
  }
  else
  {
    return `${pet.breeds.breed.$t}`
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


function showPetProfile(id){
  console.log (id)

$("#map-container").hide();
$("#intro").hide();


  var dogProfileHtml = 
`<div id="background-2">
  <a id="go-back" onclick="$('#results').show();$('#intro').show();$('#map-container').show();$('#profile-view').hide();">Go Back</a>
  <div id ="js-description">
    <div id="name">${petDictionary[id].name.$t}</div>
    <div id="description">${petDictionary[id].description.$t}</div>`
    if(petDictionary[id].media.photos){

    for(var k = 0; k<petDictionary[id].media.photos.photo.length; k++){
      if(petDictionary[id].media.photos.photo[k]['@size'] == "x") {
        dogProfileHtml +=`<img class="profile-image" src = "${petDictionary[id].media.photos.photo[k].$t}"/>`
                        
      }
    }
  }
  dogProfileHtml += 
    `<div id="breed">I am a ${petDictionary[id].breeds.breed.$t}</div>
    <div id="city">And I live in ${petDictionary[id].contact.city.$t},  ${petDictionary[id].contact.state.$t}</div> 
    <div id ="code">Zip Code: ${petDictionary[id].contact.zip.$t}</div>
    <div id="phone">Please call: ${petDictionary[id].contact.phone.$t}</div>
    <div id="email">Or email: ${petDictionary[id].contact.email.$t}</div>`;

  let breed = petDictionary[id].breeds.breed.$t;
  if(!petDictionary[id].breeds.breed.$t){
    return "I am a mixed breed"
  }
  

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

$('input[type=radio]').change(
  function(){ 
    
    $('input[type=radio]:checked' ).each(function () {

      searchObj[this.name] = this.value
    })
    
      
    makeApiCall(searchObj)
    console.log(searchObj)
    
  }
  )

