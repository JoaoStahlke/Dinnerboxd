function updateContacts() {
    var form = document.getElementById('changeContacts');
    var restaurantPhone = form.restaurantPhone.value;
    var restaurantLink = form.restaurantLink.value;


    if (!check(restaurantPhone,restaurantLink)){
        return;
    }

    var formData = new FormData();
    formData.append('restaurantPhone', restaurantPhone);
    formData.append('restaurantLink', restaurantLink);


    fetch('../PHP/updateContactsApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Contatos atualizados com sucesso!";
        wichNavBar();
    
    })
    .catch(error => console.error('Erro no update:', error));
}




function check (phone,link){
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
    
    if (error==null){
        return true;
    }
}
