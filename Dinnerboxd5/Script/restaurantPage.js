function loadRestaurantPage(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/getRestaurantPageData.php?restaurant=${restaurantId}`)
        .then(response => response.json())
        .then(data => {
            if (data.pageNotFound==false){
                pageNotFound();
            }else{
                document.querySelector('title').innerHTML=data.userName;
                loadReviews();
                userCheck();
            }
        })
        .catch(error => {
            setTimeout(() => {
                loadRestaurantPage()
            }, 1000)
            });
    
}loadRestaurantPage();

function pageNotFound(){
    fetch("../HTML/pageNotFound.html") 
    .then(response => response.text()) 
    .then(html => {
        document.querySelector('.main').innerHTML = html;

    })
    .catch(error => console.error('Erro ao carregar a pagina:', error));
}


function loadReviews(){
    fetch("../HTML/review.html") // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        document.querySelector('.review-container').innerHTML = html;
        review();

    })
    .catch(error => console.error('Erro ao carregar reviews:', error));
}

function userCheck(){
    fetch('../PHP/getSessionData.php')
    .then(response => response.json())
    .then(data => {
        
        if(data.userCheck == false){
            var form=document.querySelector("#review-form");
            form.remove();
        }
    })
    .catch(error => {
        setTimeout(() => {
            viewAccount()
        }, 1000)
        });

}


