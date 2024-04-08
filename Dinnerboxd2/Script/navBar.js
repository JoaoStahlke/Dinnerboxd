function loadNavBar(link) {
    fetch(link) // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        // Insere o HTML da barra de navegação no elemento com id 'navbarContainer'
        document.getElementById('NavBarContainer').innerHTML = html;
    })
    .catch(error => console.error('Erro ao carregar a barra de navegação:', error));

}



function wichNavBar(){
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            // var userId = data.userId;
            // var userName = data.userName;
            // if (!userId || !userName){
            //     console.log(userName);
            //     loadNavBar("../HTML/defaultNavBar.html");
            // }
            

            loadNavBar("../HTML/loggedNavBar.html");
            userWelcome();
            
        })
        .catch(error => 
            loadNavBar("../HTML/defaultNavBar.html"));
}


function userWelcome(){
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            if (data.restaurantCheck){
                restaurantBar();
            }
            else{
                var userName = data.userName;
                var welcome = document.getElementById("userWelcome");
                welcome.innerHTML = "Olá, " + firstName(userName);
            }
        })
        .catch(error => {
            console.log('Sessão sem usuário');
            });
    
    function firstName(name){
        name = name.split(' ');
        newName=name[0].toLowerCase();
        var newName =newName.charAt(0).toUpperCase() + newName.slice(1);
        return newName;
        }
}

function restaurantBar(){
    var welcome = document.getElementById("userWelcome");
    welcome.innerHTML = "Configurações";

    document.querySelector("#pageEdit").innerHTML="<a href='../HTML/home.html'><b>Editar Página</b></a>";
}




function logOut() {
    fetch("../PHP/logOut.php");
    window.location="../HTML/logIn";
}

//Chama a função antes da pagina carregar
document.addEventListener('DOMContentLoaded', function () {
    // Chama a função para carregar a barra de navegação quando a página é carregada
    wichNavBar();
});


