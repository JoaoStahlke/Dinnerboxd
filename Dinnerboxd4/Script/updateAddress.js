function updateAddress() {
    var form = document.getElementById('changeAddress');

    var cityAddress = form.restaurantCity.value.toUpperCase();
    var streetAddress = form.restaurantStreet.value.toUpperCase();
    var districtAddress = form.restaurantDistrict.value.toUpperCase();
    var numberAddress = form.restaurantNumber.value.toUpperCase();


    if (!check(cityAddress,streetAddress,districtAddress,numberAddress)){
        return;
    }

    var formData = new FormData();
    formData.append('cityAddress', cityAddress);
    formData.append('streetAddress', streetAddress);
    formData.append('districtAddress', districtAddress);
    formData.append('numberAddress', numberAddress);


    fetch('../PHP/updateAddressApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Endereço alterado com sucesso!";
        wichNavBar();
    
    })
    .catch(error => console.error('Erro no update:', error));
}




function check (cityAddress,streetAddress,districtAddress,numberAddress){
    var regex =/^[a-zA-Z\s]+$/;
    if(cityAddress.length<=3||!regex.test(cityAddress)){
        document.querySelector("input[name='restaurantCity']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantCity']");
        if(document.querySelector("label[for='restaurantCity'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantCity'] span"));}
        error.innerHTML+=" <span class='error'>Cidade inválida.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantCity'] span") !=null){
            span=document.querySelector("label[for='restaurantCity'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantCity']").style.borderColor = "";
    }
    if(districtAddress.length<=3||!regex.test(districtAddress)){
        document.querySelector("input[name='restaurantDistrict']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantDistrict']");
        if(document.querySelector("label[for='restaurantDistrict'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantDistrict'] span"));}
        error.innerHTML+=" <span class='error'>Bairro inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantDistrict'] span") !=null){
            span=document.querySelector("label[for='restaurantDistrict'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantDistrict']").style.borderColor = "";
    }
    if(streetAddress.length<=3){
        document.querySelector("input[name='restaurantStreet']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantStreet']");
        if(document.querySelector("label[for='restaurantStreet'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantStreet'] span"));}
        error.innerHTML+=" <span class='error'>Rua inválida.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantStreet'] span") !=null){
            span=document.querySelector("label[for='restaurantStreet'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantStreet']").style.borderColor = "";
    }

    if(numberAddress.length<=1){
        document.querySelector("input[name='restaurantNumber']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantNumber']");
        if(document.querySelector("label[for='restaurantNumber'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantNumber'] span"));}
        error.innerHTML+=" <span class='error'>Numero inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantNumber'] span") !=null){
            span=document.querySelector("label[for='restaurantNumber'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantNumber']").style.borderColor = "";
    }
    
    if (error==null){
        return true;
    }
}
