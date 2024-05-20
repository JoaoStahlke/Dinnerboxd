function loadShelf(){
    fetch('../PHP/getRestaurantLink.php')
        .then(response => response.json())
        .then(data => {
            if(data == false){
                console.log("Sem itens na prateleira");
            }
            else{
                var list =document.querySelector(".list-shelf");
                data.forEach(item => {
                    if(item.userImg && item.userImg !=null){
                        var img = item.userImg
                    }else{
                        var img = '';
                    }
                    list.innerHTML+=`
                    <a href="../HTML/restaurantPage.html?restaurant=${item.restaurantId}" class="item-shelf">
                        <img class="image-item" src="${img}"></img>
                        <span class="title-item">${item.userName}</span>
                    </a>
                    `;
                });
                
            }
        })
        .catch(error => {
            setTimeout(() => {
                loadShelf()
            }, 1000)
            });


}loadShelf();


document.addEventListener("DOMContentLoaded", function scrollShelf() {
    const container = document.querySelector('.list-shelf');
    const scrollLeftBtn = document.querySelector('.left-btn-shelf');
    const scrollRightBtn = document.querySelector('.right-btn-shelf');
    const scrollAmount = 100; 
  
    scrollLeftBtn.addEventListener('click', function() {
        container.scrollLeft -= scrollAmount;
    });
  
    scrollRightBtn.addEventListener('click', function() {
        container.scrollLeft += scrollAmount;
    });
  });
