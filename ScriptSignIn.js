function createUser() {
    var form = document.getElementById('signIn');
    var userName = form.userName.value;
    var email = form.email.value;
    var password = form.password.value;
    var repeatPassword = form.repeatPassword.value;

    if (password!==repeatPassword){
        document.querySelector("input[name='repeatPassword']").style.borderColor = "red";
        window.alert("As senhas não coincidem!");
        return;
    }
    else{
        document.querySelector("input[name='repeatPassword']").style.borderColor = "";
    }

    var formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);


    fetch('SignInApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro feito com sucesso:', data);
    
    })
    .catch(error => console.error('Erro no cadastro:', error));
}





