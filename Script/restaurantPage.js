
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
        document.querySelector(".restaurant-profile-img img").src=img+ '?timestamp=' + new Date().getTime();
        document.querySelector(".restaurant-title").innerHTML=data.userName;
        document.querySelector(".cityAddress").innerHTML+=" "+data.cityAddress;
        document.querySelector(".streetAddress").innerHTML+=" "+data.streetAddress;
        document.querySelector(".districtAddress").innerHTML+=" "+data.districtAddress;
        document.querySelector(".numberAddress").innerHTML+=" "+data.numberAddress;
        document.querySelector(".restaurantPhone a").href='https://wa.me/'+data.restaurantPhone;
        document.querySelector(".instagram a").href="https:"+data.restaurantLink;
        document.querySelector(".section-banner img").src=data.restaurantBanner + '?timestamp=' + new Date().getTime();
        if(data.restaurantText == null){
            data.restaurantText='';
        }
        document.querySelector(".text-about-us pre").innerHTML=data.restaurantText;
        
    })
    .catch(error => {
        setTimeout(() => {
            loadRestaurantData()
        }, 10000)
        });

}loadRestaurantData();

function copyUrltoClipboard(){
    var x =document.querySelector(".share").innerHTML; 
    var url = window.location.href;
    navigator.clipboard.writeText(url)
    document.querySelector(".share").innerHTML="<b>Link Copiado!</b>";
    setTimeout(() => {
        document.querySelector(".share").innerHTML=x
    }, 2000)
}



// Checar se é o dono do restaurante para permitir a edição do conteudo
function checkOwnerRestaurant(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    
    fetch('../PHP/getSessionData.php')
    .then(response => response.json())
    .then(data => {
        if (restaurantId == data.restaurantId){
            ownerRestaurant();
        }
    })
    .catch(error => {
        console.log('');
        });
    
}checkOwnerRestaurant();

function ownerRestaurant(){
    var banner = document.querySelector(".section-banner");
    banner.innerHTML+=`
    <a onclick="clickFile()"><img src="../IMG/photoIcon.svg"></a>
    <input type="file" class="real-file" onchange="changeFile()" name="img" accept="image/*" hidden />
    <span><button type="button" onclick="updateRestaurantBanner()">Confirmar</button></span>
    `;
    var subtitle = document.querySelector(".about-us h1");
    subtitle.innerHTML+=`<a onclick="clickEditAboutUs()"><img src="../IMG/penIcon.svg"></a>`;
}




// Update do Banner

function updateRestaurantBanner(){
    var file = document.querySelector('.real-file');
    var formData = new FormData();
    formData.append('file', file.files[0]);
    formData.append('banner',true);


    fetch('../PHP/storageImages.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.error==false){
            if(data.type==1){
                document.querySelector(".section-banner span").innerHTML+="<p>Formato inválido!</p>";
                document.querySelector(".section-banner span").style.color='red';
            }
            else{
                document.querySelector(".section-banner span").innerHTML+="<p>Erro no envio do arquivo!</p>";
                document.querySelector(".section-banner span").style.color='red';
            }
        }
        document.querySelector(".section-banner span button").style.display = 'none';
        var banner = document.querySelector(".section-banner img");
        var newSrc = data.path + '?timestamp=' + new Date().getTime();
        banner.src=newSrc;

        
    
    })
    .catch(error => console.error('Erro no update da imagem:', error));

}

function clickFile() {
    document.querySelector(".real-file").click();
    if(document.querySelector(".section-banner span p")){
        document.querySelector(".section-banner span").removeChild(document.querySelector(".section-banner span p"));
    }
    
    
}


function changeFile(){
    document.querySelector(".section-banner span button").style.display = 'block';
}


// Update do texto sobre nós
function clickEditAboutUs(){
    var text=document.querySelector(".text-about-us pre").innerHTML;
    document.querySelector(".text-about-us").innerHTML=`
    <textarea class='textarea-about-us'  rows='4' cols='50'></textarea>
    <div class="buttons-about-us">
        <button onclick="updateAboutUs()" class="update-about-us">Confirmar</button> 
        <button class="update-cancel-about-us" onclick="cancelUpdateAboutUs()">Cancelar</button>
    </div>
    `;
    document.querySelector(".text-about-us textarea").value=text;
}

function updateAboutUs(){
    var text=document.querySelector(".text-about-us textarea").value;
    var formData = new FormData();
    formData.append('text', text);
    formData.append('aboutUs',true);


    fetch('../PHP/updateRestaurantPage.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".text-about-us").innerHTML=`<pre>${data.text}</pre>`;
    })
    .catch(error => console.error('Erro no update do texto:', error));
    
}

function cancelUpdateAboutUs(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/getRestaurantPageData.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        if(data.restaurantText == null){
            data.restaurantText='';
        }
        document.querySelector(".text-about-us").innerHTML=`<pre>${data.restaurantText}</pre>`;
        
    })
    .catch(error => {});
}



function loadStatus(){
    
}

function loadOpenHours(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/openHourApi.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector(`#day1`).innerHTML=`${data.hourOpen1.substring(0, 2) + ":" + data.hourOpen1.substring(2)} às ${data.hourClose1.substring(0, 2) + ":" + data.hourClose1.substring(2)}`;
        document.querySelector(`#day2`).innerHTML=`${data.hourOpen2.substring(0, 2) + ":" + data.hourOpen2.substring(2)} às ${data.hourClose2.substring(0, 2) + ":" + data.hourClose2.substring(2)}`;
        document.querySelector(`#day3`).innerHTML=`${data.hourOpen3.substring(0, 2) + ":" + data.hourOpen3.substring(2)} às ${data.hourClose3.substring(0, 2) + ":" + data.hourClose3.substring(2)}`;
        document.querySelector(`#day4`).innerHTML=`${data.hourOpen4.substring(0, 2) + ":" + data.hourOpen4.substring(2)} às ${data.hourClose4.substring(0, 2) + ":" + data.hourClose4.substring(2)}`;
        document.querySelector(`#day5`).innerHTML=`${data.hourOpen5.substring(0, 2) + ":" + data.hourOpen5.substring(2)} às ${data.hourClose5.substring(0, 2) + ":" + data.hourClose5.substring(2)}`;
        document.querySelector(`#day6`).innerHTML=`${data.hourOpen6.substring(0, 2) + ":" + data.hourOpen6.substring(2)} às ${data.hourClose6.substring(0, 2) + ":" + data.hourClose6.substring(2)}`;
        document.querySelector(`#day7`).innerHTML=`${data.hourOpen7.substring(0, 2) + ":" + data.hourOpen7.substring(2)} às ${data.hourClose7.substring(0, 2) + ":" + data.hourClose7.substring(2)}`;
            
        
    })
    .catch(error => console.error('Erro ao carregar horários:', error));
}loadOpenHours();



let dataAtual = new Date();

// Obtendo o horário atual
let horaAtual = dataAtual.getHours();
let minutoAtual = dataAtual.getMinutes();
let day = dataAtual.getDay();

// Exibindo o horário atual
console.log(`Horário atual: ${horaAtual}${minutoAtual}${day}`);