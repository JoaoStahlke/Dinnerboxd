function loadRestaurantPage(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/getRestaurantPageData.php?restaurant=${restaurantId}`)
        .then(response => response.json())
        .then(data => {
            if (data.pageNotFound==false){
                pageNotFound();
            }
        })
        .catch(error => {
            setTimeout(() => {
                loadRestaurantPage()
            }, 1000)
            });
    
}

function pageNotFound(){
    fetch("../HTML/pageNotFound.html") 
    .then(response => response.text()) 
    .then(html => {
        document.querySelector('.main').innerHTML = html;

    })
    .catch(error => console.error('Erro ao carregar a pagina:', error));
}


loadRestaurantPage();
