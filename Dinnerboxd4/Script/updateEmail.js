function updateEmail() {
    var form = document.getElementById('changeEmail');
    var email = form.email.value;
    var password = form.password.value;

    if (!check(email)){
        return;
    }

    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);


    fetch('../PHP/updateEmailApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Email trocado com sucesso!";
        if (data==false){
            document.querySelector(".sucess").style.color="red";
            document.querySelector(".sucess").innerHTML="Email já alterado!";
        }
        document.querySelector("input[name='password']").style.borderColor = "";
        var error = document.querySelector("label[for='password']");
        error.innerHTML="Senha";
    })
    .catch(error => {
        
        document.querySelector("input[name='password']").style.borderColor = "red";
        var error = document.querySelector("label[for='password']");
        if(document.querySelector("label[for='password'] span") !=null){
            error.removeChild(document.querySelector("label[for='password'] span"));}
        error.innerHTML+=" <span class='error'>Senha incorreta.</span>";
        document.querySelector(".sucess").innerHTML="";
    }
        
        );
}




function check (email){
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
    
    
    if (error==null){
        return true;
    }
}
