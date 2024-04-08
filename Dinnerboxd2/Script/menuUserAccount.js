function loadContainer(link) {
    fetch(link) // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        // Insere o HTML da barra de navegação no elemento com id 'navbarContainer'
        document.getElementById('container').innerHTML = html;

    })
    .catch(error => console.error('Erro ao carregar a barra de navegação:', error));

}
document.addEventListener('DOMContentLoaded', function () {
    viewAccount();
});

function viewAccount(){
    loadContainer('../HTML/viewAccount.html');
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            var userName = data.userName;
            var email = data.email;
            document.querySelector("p[name='userName']").innerHTML = userName;
            document.querySelector("p[name='email']").innerHTML = email;
            if(data.restaurantCheck){
                loadRestaurantInfo();
                loadRestaurantContainer();
            }
        })
        .catch(error => {
            console.log('');
            window.location="../HTML/logIn.html";
            });
    
}
function loadRestaurantInfo(){
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            var restaurantDocument=data.restaurantDocument;
            var restaurantPhone = data.restaurantPhone;
            var restaurantLink = data.restaurantLink;
            var cityAddress = data.cityAddress;
            var streetAddress = data.streetAddress;
            var districtAddress = data.districtAddress;
            var numberAddress = data.numberAddress;
            
            var parentElement = document.getElementById("viewAccount");

            var dados = [
                {label: "CNPJ:", value: restaurantDocument},
                {label: "Telefone:", value: restaurantPhone},
                {label: "Link Externo:", value: restaurantLink},
                {label: "Cidade:", value: cityAddress},
                {label: "Rua:", value: streetAddress},
                {label: "Bairro:", value: districtAddress},
                {label: "Número:", value: numberAddress}
            ];
            
            // Itere sobre o array e crie os elementos h3 e p
            dados.forEach(function(item) {
                // Crie um novo elemento h3
                var h3 = document.createElement("h3");
                h3.textContent = item.label;
                
                // Crie um novo elemento p
                var p = document.createElement("p");
                p.textContent = item.value;
                
                parentElement.appendChild(h3);
                parentElement.appendChild(p);
            });
            
            
            
            
        })
        .catch(error => {
            });
}

function configUser(){
    loadContainer("../HTML/configUser.html");
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            var userName = data.userName;
            document.querySelector("input[name='userName']").value = userName;
        })
        .catch(error => {
            console.log('');
            });

    var script = document.createElement('script');
    script.src = "../Script/updateConfig.js";
    document.body.appendChild(script);
}


function changeEmail(){
    loadContainer("../HTML/changeEmail.html");
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            var userEmail = data.email;
            document.querySelector("input[name='email']").value = userEmail;
        })
        .catch(error => {
            console.log('');
            });

    var script = document.createElement('script');
    script.src = "../Script/updateEmail.js";
    document.body.appendChild(script);
}

function changePassword(){
    loadContainer("../HTML/changePassword.html");

    var script = document.createElement('script');
    script.src = "../Script/updatePassword.js";
    document.body.appendChild(script);
}


function deleteUser(){
    loadContainer("../HTML/deleteUser.html");
    var script = document.createElement('script');
    script.src = "../Script/deleteUser.js";
    document.body.appendChild(script);
}


function loadRestaurantContainer(){
    document.querySelector("#linkChangeAddress").innerHTML="<a  href='#' onclick='changeAddress()'><b>Endereço</b></a>";
    document.querySelector("#linkChangeContacts").innerHTML="<a  href='#' onclick='changeContacts()'><b>Contatos</b></a>";

}

function changeAddress(){
    loadContainer("../HTML/changeAddress.html");
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            document.querySelector("input[name='restaurantCity']").value = data.cityAddress;
            document.querySelector("input[name='restaurantStreet']").value = data.streetAddress;
            document.querySelector("input[name='restaurantDistrict']").value = data.districtAddress;
            document.querySelector("input[name='restaurantNumber']").value = data.numberAddress;

        })
        .catch(error => {
            console.log('');
            });
    var script = document.createElement('script');
    script.src = "../Script/updateAddress.js";
    document.body.appendChild(script);
}
function changeContacts(){
    loadContainer("../HTML/changeContacts.html");
    fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            document.querySelector("input[name='restaurantPhone']").value = data.restaurantPhone;
            document.querySelector("input[name='restaurantLink']").value = data.restaurantLink;
        })
        .catch(error => {
            console.log('');
            });
    var script = document.createElement('script');
    script.src = "../Script/updateContacts.js";
    document.body.appendChild(script);
}