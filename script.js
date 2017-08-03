 $(document).ready(function(){

    $('form').on('submit', function(e){
        e.preventDefault(); 
        console.log("The zip code is: " + $('input').val())
        makeApiCall($('input').val())
    })
});




 var shelters = []; 


//http://api.petfinder.com/pet.getRandom?format=json&key=a4d4d400939b10647da19b7593286b34&animal=dog&output=basic
function makeApiCall(zipcode){
//http://api.petfinder.com/shelter.get?id=SD08&format=json&key=a4d4d400939b10647da19b7593286b34&animal=smallfurry&output=basic

var url = `http://api.petfinder.com/pet.find?location=${zipcode}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
return $.ajax({
    type : 'GET',
    data : {},
    url : url+'&callback=?' ,
    dataType: 'json',
    success : function(data) {              


      shelters = [];


      let html = ""
      let pets = data.petfinder.pets.pet;
      pets.forEach(function(pet,e) { 







          if(shelters.indexOf(pet.shelterId.$t) < 0) {
             shelters.push(pet.shelterId.$t)
         }
         /*


         let name = pet.name.$t;

         html += '<div class="name">'+name+'</div>'
         if(pet.media.photos){
             for(var k = 0; k<pet.media.photos.photo.length; k++){
                 if(pet.media.photos.photo[k]['@size'] == "x") {
                    html +=`<img class="petPhoto" src = "${pet.media.photos.photo[k].$t}"/>`
                    break
                }
            }
        }


        let breed = pet.breeds.breed.$t;
        if (pet.mix.$t == "yes") {
            html += `<p>I am an amazing mixed breed.</p>`
        }
        html += `<p>I am a ${breed}</p>`
        let size = pet.size.$t;
        if (pet.size.$t == "S") {
            html += `<p>I am ${size}mall.</p>`
        }
        if(pet.size.$t == "M"){
            html += `<p>I am ${size}edium sized.</p>`
        }
        if(pet.size.$t == "L"){
            html += `<p>I am ${size}arge.</p>`
        }
        if(pet.size.$t == "XL"){
            html += `<p>I am ${size}.</p>`
        }
        let age = pet.age.$t;
        let city = pet.contact.city.$t;
        let state = pet.contact.state.$t;
        html += `<p>${age}</p>`
        html += `<span>And I live in ${city},</span>` 
        html += `<span>${state}</span>`

        let description = pet.description.$t;
        html += `<div id ="js-description">${description}<div>` */
        
        console.log((e + 1) % 3 === 0)
        console.log(e + 1)

        if (e % 3 === 0){
            //make a new row
          html += `</div><div class="row">`

        }

            html +=   
     `<div class="col-4">
      <div class="card">
        <img class="card-image" src="https://tf-assets-prod.s3.amazonaws.com/tf-curric/WEB-DEV-001/2.6.3_challenge_responsive_layout/finn_square.png" />
        <div class="card-content">
          <h3>Finn</h3>
          <p>Storm Trooper, befriends Ray</p>
        </div>
      </div>
      </div>`


                
                

            } )

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


