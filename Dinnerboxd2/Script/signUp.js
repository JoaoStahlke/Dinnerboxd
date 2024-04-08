function createUser() {
    var form = document.getElementById('signUp');
    var userName = form.userName.value.toUpperCase();
    var email = form.email.value;
    var password = form.password.value;
    var repeatPassword = form.repeatPassword.value;

    var checkbox = document.querySelector("#checkRestaurant");

    if(!check(userName,email,password,repeatPassword)){
        return;
    }
    if (checkbox.checked){
        createRestaurant(userName,email,password);
        return;
        
    }

    var formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);


    fetch('../PHP/signUpApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro feito com sucesso:', data);
        form.reset();
        window.location="../HTML/home.html";
    
    })
    .catch(error => console.error('Erro no cadastro:', error));
}

function createRestaurant(userName,email,password){
    var form = document.getElementById('signUp');
    var restaurantDocument = form.restaurantDocument.value;
    var phone = form.restaurantPhone.value;
    var link = form.restaurantLink.value;
    var cityAddress=form.restaurantCity.value.toUpperCase();
    var streetAddress=form.restaurantStreet.value.toUpperCase();
    var districtAddress=form.restaurantDistrict.value.toUpperCase();
    var numberAddress=form.restaurantNumber.value;
   
    if (!checkRestaurant(restaurantDocument,phone,link,cityAddress,streetAddress,districtAddress,numberAddress)){
        return false;
    }

    var formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('restaurantDocument', restaurantDocument);
    formData.append('phone', phone);
    formData.append('link', link);
    formData.append('cityAddress', cityAddress);
    formData.append('streetAddress', streetAddress);
    formData.append('districtAddress', districtAddress);
    formData.append('numberAddress', numberAddress);
    formData.append('checkRestaurant', true);



    fetch('../PHP/signUpApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro feito com sucesso:', data);
        form.reset();
        window.location="../HTML/home.html";
        
    
    })
    .catch(error => console.error('Erro no cadastro:', error));
}


function insertRestaurantForm() {
    var checkbox = document.querySelector("#checkRestaurant");
    var htmlElement = document.querySelector("#restaurantForm");
  
    if (checkbox.checked) {
        fetch('../HTML/signUpRestaurant.html') // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
        .then(response => response.text()) // Converte a resposta em texto
        .then(html => {
            htmlElement.innerHTML = html;
        })
        .catch(error => htmlElement.innerHTML = "");
    } else {
      htmlElement.innerHTML = "";
    }
  }


function check (userName,email,password,repeatPassword){
    if(userName.length<=1){
        document.querySelector("input[name='userName']").style.borderColor = "red";
        var error = document.querySelector("label[for='userName']");
        if(document.querySelector("label[for='userName'] span") !=null){
            error.removeChild(document.querySelector("label[for='userName'] span"));}
        error.innerHTML+=" <span class='error'>Nome inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='userName'] span") !=null){
            document.querySelector("label[for='userName']").removeChild(document.querySelector("span"));}
        document.querySelector("input[name='userName']").style.borderColor = "";
    }

    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
        document.querySelector("input[name='email']").style.borderColor = "red";
        var error = document.querySelector("label[for='email']");
        if(document.querySelector("label[for='email'] span") !=null){
            error.removeChild(document.querySelector("label[for='email'] span"));}
        error.innerHTML+=" <span class='error'>Email inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='email'] span") !=null){
            document.querySelector("label[for='email']").removeChild(document.querySelector("label[for='email'] span"));}
        document.querySelector("input[name='email']").style.borderColor = "";
    }


    if(password.length<=5){
        document.querySelector("input[name='password']").style.borderColor = "red";
        var error = document.querySelector("label[for='password']");
        if(document.querySelector("label[for='password'] span") !=null){
            error.removeChild(document.querySelector("label[for='password'] span"));}
        error.innerHTML+=" <span class='error'>Sua senha deve ter no minímo 6 caracteres.</span>";
        
    }
    else{
        if(document.querySelector("label[for='password'] span") !=null){
            document.querySelector("label[for='password']").removeChild(document.querySelector("span"));}
        document.querySelector("input[name='password']").style.borderColor = "";
    }

    if (password!==repeatPassword){
        document.querySelector("input[name='repeatPassword']").style.borderColor = "red";
        var error = document.querySelector("label[for='repeatPassword']");
        if(document.querySelector("label[for='repeatPassword'] span") !=null){
            error.removeChild(document.querySelector("label[for='repeatPassword'] span"));}
        error.innerHTML+="  <span class='error'>As senhas digitadas não coincidem.</span>";
        
    }
    else{
        if(document.querySelector("label[for='repeatPassword'] span") !=null){
            document.querySelector("label[for='repeatPassword']").removeChild(document.querySelector("span"));}
        document.querySelector("input[name='repeatPassword']").style.borderColor = "";
    }

    
    if (error==null){
        return true;
    }
}

function checkRestaurant(restaurantDocument,phone,link,cityAddress,streetAddress,districtAddress,numberAddress){
     var regex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
     if(!regex.test(restaurantDocument)){
        document.querySelector("input[name='restaurantDocument']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantDocument']");
        if(document.querySelector("label[for='restaurantDocument'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantDocument'] span"));}
        error.innerHTML+=" <span class='error'>CNPJ inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantDocument'] span") !=null){
            span=document.querySelector("label[for='restaurantDocument'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantDocument']").style.borderColor = "";
    }
    var regex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
    if(!regex.test(phone)){
        document.querySelector("input[name='restaurantPhone']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantPhone']");
        if(document.querySelector("label[for='restaurantPhone'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantPhone'] span"));}
        error.innerHTML+=" <span class='error'>Telefone inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantPhone'] span") !=null){
            span=document.querySelector("label[for='restaurantPhone'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantPhone']").style.borderColor = "";
    }
    var regex=/^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{1,}(\.[a-zA-Z]{2,})?\/?$/;
    if(!regex.test(link)){
        document.querySelector("input[name='restaurantLink']").style.borderColor = "red";
        var error = document.querySelector("label[for='restaurantLink']");
        if(document.querySelector("label[for='restaurantLink'] span") !=null){
            error.removeChild(document.querySelector("label[for='restaurantLink'] span"));}
        error.innerHTML+=" <span class='error'>Link inválido.</span>";
        
    }
    else{
        if(document.querySelector("label[for='restaurantLink'] span") !=null){
            span=document.querySelector("label[for='restaurantLink'] span");
            span.parentNode.removeChild(span);}
        document.querySelector("input[name='restaurantLink']").style.borderColor = "";
    }

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

