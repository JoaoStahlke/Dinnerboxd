function logIn(){
    var form = document.getElementById('logIn');
    var email = form.email.value;
    var password = form.password.value;



    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);


    fetch('../PHP/logInApi.php', {
        method: 'POST',
        body: formData
    })
    
    .then(response => {
        if (response==false) {
            throw new Error('Erro na solicitação.');
        }
        return response.json();
    })
    .then(data => {
        if(data==false){
            throw new Error('Credenciais Inválidas.')
        }
        console.log('Log-in feito com sucesso:', data['userName'],'logado com sucesso!');
        window.location="../HTML/home.html";

    })
    .catch(error => {
        console.log('Erro no log-in:', error.message);
        invalidLogIn(error.message);
    });

}


function invalidLogIn(errorMessage){
    document.querySelector("input[name='email']").style.borderColor = "red";
    document.querySelector("input[name='password']").style.borderColor = "red";

    var error = document.querySelector("span.error");
    error.innerHTML=errorMessage;
        
 }


