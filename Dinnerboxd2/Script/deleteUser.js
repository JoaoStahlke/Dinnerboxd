function deleteAccount() {
    var form = document.getElementById('deleteUser');
    var auth = form.auth.value.toLowerCase();
    var password = form.password.value;

    if (!check(auth)){
        return;
    }

    var formData = new FormData();
    formData.append('password', password);

    fetch('../PHP/deleteUser.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data==true){
            window.location="../HTML/home.html";
            
        }
        document.querySelector(".sucess").style.color="red";
        document.querySelector(".sucess").innerHTML="Erro ao excluir conta!";
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




function check (auth){
    if(auth!="continuar"){
        document.querySelector("input[name='auth']").style.borderColor = "red";
        var error = document.querySelector("label[for='auth']");
        if(document.querySelector("label[for='auth'] span") !=null){
            error.removeChild(document.querySelector("label[for='auth'] span"));}
        error.innerHTML+=" <span class='error'>Autorização inválida.</span>";
        
    }
    else{
        if(document.querySelector("label[for='auth'] span") !=null){
            document.querySelector("label[for='auth']").removeChild(document.querySelector("label[for='auth'] span"));}
        document.querySelector("input[name='auth']").style.borderColor = "";
    }
    
    
    if (error==null){
        return true;
    }
}
