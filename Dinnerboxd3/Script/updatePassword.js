function updatePassword() {
    var form = document.getElementById('changePassword');
    var newPassword = form.newPassword.value;
    var repeatNewPassword = form.repeatNewPassword.value;
    var password = form.password.value;

    if (!check(newPassword,repeatNewPassword)){
        return;
    }

    var formData = new FormData();
    formData.append('newPassword', newPassword);
    formData.append('password', password);


    fetch('../PHP/updatePasswordApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Senha trocada com sucesso!";
        if (data==false){
            document.querySelector(".sucess").style.color="red";
            document.querySelector(".sucess").innerHTML="Senha já alterada!";
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




function check (password,repeatPassword){
    if(password.length<=5){
        document.querySelector("input[name='newPassword']").style.borderColor = "red";
        var error = document.querySelector("label[for='newPassword']");
        if(document.querySelector("label[for='newPassword'] span") !=null){
            error.removeChild(document.querySelector("label[for='newPassword'] span"));}
        error.innerHTML+=" <span class='error'>Sua senha deve ter no minímo 6 caracteres.</span>";
        
    }
    else{
        if(document.querySelector("label[for='newPassword'] span") !=null){
            document.querySelector("label[for='newPassword']").removeChild(document.querySelector("span"));}
        document.querySelector("input[name='newPassword']").style.borderColor = "";
    }

    if (password!==repeatPassword){
        document.querySelector("input[name='repeatNewPassword']").style.borderColor = "red";
        var error = document.querySelector("label[for='repeatNewPassword']");
        if(document.querySelector("label[for='repeatNewPassword'] span") !=null){
            error.removeChild(document.querySelector("label[for='repeatNewPassword'] span"));}
        error.innerHTML+="  <span class='error'>As senhas digitadas não coincidem.</span>";
        
    }
    else{
        if(document.querySelector("label[for='repeatNewPassword'] span") !=null){
            document.querySelector("label[for='repeatNewPassword']").removeChild(document.querySelector("span"));}
        document.querySelector("input[name='repeatNewPassword']").style.borderColor = "";
    }
    
    
    if (error==null){
        return true;
    }
}
