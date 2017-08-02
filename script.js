 $(document).ready(function(){
   
    $('form').on('submit', function(e){
        e.preventDefault(); 
        console.log("The zip code is: " + $('input').val())
        makeApiCall($('input').val())
    })
    });



var zips = []
    //makeApiCall(93427)

//http://api.petfinder.com/pet.getRandom?format=json&key=a4d4d400939b10647da19b7593286b34&animal=dog&output=basic
function makeApiCall(zipcode){
//http://api.petfinder.com/shelter.get?id=SD08&format=json&key=a4d4d400939b10647da19b7593286b34&animal=smallfurry&output=basic
 //var zipcode = (zipcode);
    var url = `http://api.petfinder.com/pet.find?location=${zipcode}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
    return $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'json',
        success : function(data) {              
           // console.log(data)
            //for(var i =0; i<20; i++){
               // console.log(data.petfinder.pets.pet[i].description.$t)
           // }
           zips = []
           let html = ""
           let pets = data.petfinder.pets.pet;
           pets.forEach(function(pet,e) { 
            

                console.log(pet,e) 
                console.log(pet.contact.zip.$t)
                if(zips.indexOf(pet.contact.zip.$t) < 0){
                    zips.push(pet.contact.zip.$t)
                }
                

                
                let name = pet.name.$t;
                html += '<div class="name">'+name+'</div>'
                for(var k = 0; k<pet.media.photos.photo.length; k++){
                    if(pet.media.photos.photo[k]['@size'] == "x") {
                        html +=`<img class="petPhoto" src = "${pet.media.photos.photo[k].$t}"/>`
                        break
                    }
                }
                //let zip = pet.contact.zip.$t;
                //zips.push(zip)
                //let coverPhoto = pet.media.photos.photo[0].$t;
                //html +=`<img src = "${pet.media.photos.photo[0].$t}"/>`
                let breed = pet.breeds.breed.$t;
                if (pet.mix.$t == "yes") {
                html += `<div id="breed">Amazing Mixed Breed</div>`
                }
                html += `<div id="breed">${breed}</div>`
                let age = pet.age.$t;
                html += `<div id="age">${age}</div>`
                let size = pet.size.$t;
                if (pet.size.$t == "s") {
                html += `<div id="small">"I am " + $('input')</div>`
                }
                if(pet.size.$t == "m"){
                html += `<div id="medium">I am medium sized</div>`
                }
                if(pet.size.$t == "l"){
                html += `<div id="large">I am large</div>`
                }
                if(pet.size.$t == "xl"){
                html += `<div id="xl">I am extra large</div>`
                }
                html += `<div id="size">${size}</div>`
                let city = pet.contact.city.$t;
                html += `<div id="city">${city}</div>`
                let state = pet.contact.state.$t;
                html += `<div id="state">${state}</div>`



                //return zips
                //let description = pet.description.$t;
                //html += `<h6>${description}</h6>` 

                //html += '<h5>'+description+ '</h5>'
                //html +='<img src ="http://photos.petfinder.com/photos/pets/38751785/1/?bust=1499974270&width=50&-t.jpg"/>'
                //html += '<img src ="http://photos.petfinder.com/photos">'
                
                //html += `<h5>${description}</h5>` 
                //objective is to show all images for each pet. This will require an additional for each loop within the current for each loop.
            } )
           console.log(zips)
           //for(var k = 0; k<pet.media.photos.photo.length; k++){
                //if(pet.media.photos.photo[k]['@size'] == "x") {
                //html +=`<img src = "${pet.media.photos.photo[k].$t}"/>`
                //}
        
            

           $('#petfinderInfo').html(html)

        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }

    });
     
}