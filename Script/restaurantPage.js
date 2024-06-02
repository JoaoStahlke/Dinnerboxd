
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

function loadRestaurantType(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/typeApi.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        if(data.category == null){
            data.category='';
        }

        if(data.modality == null){
            data.modality='';
        }
        document.querySelector(".restaurantCategory b").innerHTML=data.category;
        document.querySelector(".restaurantModality b").innerHTML=data.modality;
        
    })
    .catch(error => {
        setTimeout(() => {
            loadRestaurantType()
        }, 10000)
        });

}loadRestaurantType();





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
    let date = new Date();
    let hour = date.getHours().toString()+date.getMinutes().toString();
    let day = date.getDay();
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/openHourApi.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data[day*2]);
        if (data[day*2] <= data[(day*2)+1]){
            if (hour>=data[day*2] && hour<data[(day*2)+1]){
                document.querySelector(".restaurantStatus b").innerHTML=' Aberto';
                document.querySelector("#status-dot").style.color='green';
            }
            else{
                document.querySelector(".restaurantStatus b").innerHTML=' Fechado';
                document.querySelector("#status-dot").style.color='red';
            }
        }
        else{
            if (hour>=data[(day*2)+1] && hour>=data[day*2]){
                document.querySelector(".restaurantStatus b").innerHTML=' Aberto';
                document.querySelector("#status-dot").style.color='green';
            }
            else{
                document.querySelector(".restaurantStatus b").innerHTML=' Fechado';
                document.querySelector("#status-dot").style.color='red';
            }}
    })
    .catch(error => console.error('Erro ao carregar status:', error));
    console.log(`Horário atual: ${hour}${day}`);
    
}loadStatus();

function loadOpenHours(){
    var urlParams = new URLSearchParams(window.location.search);
    var restaurantId=urlParams.get("restaurant");
    fetch(`../PHP/openHourApi.php?restaurant=${restaurantId}`)
    .then(response => response.json())
    .then(data => {
        let j=1;
        for(let i=0;i<=13;i+=2){
            document.querySelector(`#day${j}`).innerHTML=`${data[i].substring(0, 2) + ":" + data[i].substring(2)} às ${data[i+1].substring(0, 2) + ":" + data[i+1].substring(2)}`;
            j++;
        }
    })
    .catch(error => console.error('Erro ao carregar horários:', error));
}loadOpenHours();



