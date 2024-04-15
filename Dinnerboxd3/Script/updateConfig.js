function updateConfig() {
    var form = document.getElementById('userConfig');
    var userName = form.userName.value.toUpperCase();

    if (!check(userName)){
        return;
    }

    var formData = new FormData();
    formData.append('userName', userName);


    fetch('../PHP/updateConfigApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Nome trocado com sucesso!";
        wichNavBar();
    
    })
    .catch(error => console.error('Erro no update:', error));
}




function check (userName){
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
    
    if (error==null){
        return true;
    }
}
