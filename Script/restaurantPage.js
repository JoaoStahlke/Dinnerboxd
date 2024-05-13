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
        document.querySelector('.pageNotFound').innerHTML = html;

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
            loadRestaurantPage()
        }, 1000)
        });

}


function loadRestaurantData(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/getRestaurantPageData.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        if(data.userImg && data.userImg!= null){
            var img = data.userImg;
        }
        else{
            var img = '';
        }
        document.querySelector(".restaurant-profile-img img").src=img;
        document.querySelector(".restaurant-title").innerHTML=data.userName;
        document.querySelector(".cityAddress").innerHTML+=" "+data.cityAddress;
        document.querySelector(".streetAddress").innerHTML+=" "+data.streetAddress;
        document.querySelector(".districtAddress").innerHTML+=" "+data.districtAddress;
        document.querySelector(".numberAddress").innerHTML+=" "+data.numberAddress;
        
    })
    .catch(error => {
        setTimeout(() => {
            loadRestaurantData()
        }, 1000)
        });

}loadRestaurantData();