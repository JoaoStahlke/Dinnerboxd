function updateProfile() {
    var fileInput = document.querySelector('.profile-real-file');
    if (fileInput.files && fileInput.files.length > 0) {
        updateProfileImage(fileInput.files[0]);
    }


    var form = document.getElementById('userConfig');
    var userName = form.userName.value.toUpperCase();

    if (!check(userName)){
        return;
    }

    var formData = new FormData();
    formData.append('userName', userName);


    fetch('../PHP/updateProfileApi.php', {
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


function updateProfileImage(file){
    var formData = new FormData();
    formData.append('file', file);
    formData.append('profile',true);

    fetch('../PHP/storageImages.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.error==false){
            if(data.type==1){
                document.querySelector(".errorImg").innerHTML="O arquivo enviado não está no formato : PNG, JPEG ou JPG";
            }
            else{
                document.querySelector(".errorImg").innerHTML="Erro no envio do arquivo!";
            }
        }
        else{
            document.querySelector(".sucess").innerHTML="Foto trocada com sucesso!";
            changeProfile();
        }
        
    
    })
    .catch(error => console.error('Erro no update da foto:', error));


}

