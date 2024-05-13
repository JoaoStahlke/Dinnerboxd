function review(){
    var reviewForm = document.getElementById('review-form');
    var reviewList = document.getElementById('review-list');
    var reviewTabs = document.getElementById('review-tabs');
    var ratingStars = document.querySelectorAll('.star');
    var userId=ownerReview();
    
    var review = [];
    var currentRating = 0;

    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(star.dataset.value);
            ratingStars.forEach(s => {
                s.classList.remove('activeClick');
            });
            for (let i = 0; i < currentRating; i++) {
                ratingStars[i].classList.add('activeClick');
            }
        });
    });
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            var value = parseInt(star.dataset.value);
            highlightStars(value);
        });
    
        star.addEventListener('mouseout', function() {
            resetStars();
        });
    
    });
    
    function highlightStars(value) {
        resetStars();
        for (let i = 0; i < value; i++) {
            ratingStars[i].classList.add('active');
        }
    }
    
    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove('active');
        });
    }
    function resetClick(){
        ratingStars.forEach(star => {
            star.classList.remove('activeClick');
        });
    }

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var reviewText = document.getElementById('review-text').value;

        if (reviewText.trim() === '') {
            alert('Por favor, escreva um comentário.');
            return;
        }

        if (currentRating === 0) {
            alert('Por favor, avalie o comentário.');
            return;
        }

        createReview(reviewText, currentRating);
        reviewForm.reset();
        currentRating=0;
        resetClick();
        

    });

    function createReview(text, rating) {
        var urlParams = new URLSearchParams(window.location.search);
        var restaurantId=urlParams.get("restaurant");
        var formData = new FormData();
        formData.append('restaurantId',restaurantId);
        formData.append('text', text);
        formData.append('rating', rating);
        formData.append('create', true);


        fetch('../PHP/reviewApi.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            var text=data.text;
            var rating = data.rating;
            var name = correctName(data.name);
            var photo = data.userImg;
            var date = data.date;
            var reviewId = data.reviewId;
            var userId = data.userId;
            review.push({ userId,reviewId,photo,name,text, rating,date });
            displayreview();
        
        })
        .catch(error => console.error('Erro no update:', error));

        
    }

    function selectReviews(){
        var urlParams = new URLSearchParams(window.location.search);
        var restaurantId=urlParams.get("restaurant");
        fetch(`../PHP/reviewApi.php?restaurant=${restaurantId}`)
        .then(response => response.json())
        .then(data => {
            if (data==false){
                document.querySelector("#review-list").innerHTML="<br><h1>Sem avaliações ainda.</h1>";
                return;
            }
            else{
                data.forEach(arrayReview=>{
                
                    var name = correctName(arrayReview.userName);
                    var photo = arrayReview.userImg;
                    var text = arrayReview.reviewText;
                    var rating = arrayReview.reviewRating;
                    var date = arrayReview.reviewDate;
                    var reviewId = arrayReview.reviewId;
                    var userId = arrayReview.id;
                    review.push({ userId,reviewId,photo,name,text, rating,date });
                    
                });
                displayreview();
            }
        })
        .catch(error => console.error('Erro ao carregar avaliações:', error));
    }selectReviews();

    function displayreview() {
        reviewList.innerHTML = '';
        reviewTabs.innerHTML = '';

        showreview(0);

        var numTabs = Math.ceil(review.length / 5);
        for (let i = 0; i < numTabs; i++) {
            var tabButton = document.createElement('button');
            tabButton.classList.add('review-tabs');
            tabButton.textContent = `${i + 1}`;
            tabButton.addEventListener('click', function() {
                showreview(i);
            });
            reviewTabs.appendChild(tabButton);
        }
    }

    function showreview(tabIndex) {
        reviewList.innerHTML = '';
        var start = tabIndex * 5;
        var end = Math.min(start + 5, review.length);

        for (let i = start; i < end; i++) {
            var reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review-item');
            var stars = '★'.repeat(review[i].rating);
            var emptyStars = '☆'.repeat(5 - review[i].rating);

            if (review[i].photo && review[i].photo!=null){
                null;
            }
            else{
                review[i].photo='';
            }

            var reviewContent = `
            <div class="review">
                <div class="review-profile">
                    <span class="review-photo-background"><img class="review-photo" src="${review[i].photo}"></span>
                    <span class="review-name">${review[i].name}</span>
                </div>
                <span class="stars">${stars}${emptyStars}</span>
                <p class="review-text">${review[i].text}</p>
                <span class="review-date">${review[i].date}</span>
            </div>`;
            if(review[i].userId==userId){
                reviewContent+=`
                <div class="review-buttons">
                    <button class="review-delete" onclick="deleteReview(${review[i].reviewId})" >  
                        <svg viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5">
                            </path>
                        </svg>
                    </button>
                    <button class="review-edit" onclick="loadUpdateReview(${review[i].reviewId},${review[i].rating},'${review[i].text}')"   >  
                        <svg viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                            </path>
                        </svg>
                    </button>
                </div>
                `;
        }

            reviewDiv.innerHTML = reviewContent;
            reviewList.appendChild(reviewDiv);
        }
    }



    
    function correctName(name) {
        var words = name.toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 1) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            } else {
                words[i] = words[i].toUpperCase();
            }
        }
        return words.join(' ');
    }
}





function deleteReview(reviewId) {
    var formData = new FormData();
    formData.append('delete', true);
    formData.append('reviewId', reviewId);
    fetch('../PHP/reviewApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loadReviews();
    })
    .catch(error => {
        console.log("erro ao excluir avaliação");
    });
}

function ownerReview() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../PHP/getSessionData.php', false); // O terceiro parâmetro define a requisição como síncrona
    xhr.send();

    if (xhr.status === 200) {
        var dados = JSON.parse(xhr.responseText);
        return dados.userId;

    } else {
        console.error("Erro ao obter dados:", xhr.status);
        return false;
    }
}




function loadUpdateReview(reviewId,rating,text){
    fetch("../HTML/updateReview.html") 
    .then(response => response.text()) 
    .then(html => {
        document.querySelector('.review-container').innerHTML = html;
        updateReviewForm(reviewId,rating,text);

    })
    .catch(error => console.error('Erro ao carregar:', error));
}


function updateReviewForm(reviewId,rating,text){
    
    var reviewForm = document.getElementById('review-form');
    var ratingStars = document.querySelectorAll('.star');
    var reviewText = document.getElementById('review-text');
    reviewText.value=text;
    var currentRating = rating;
    
    ratingStars.forEach(star => {
        for (let i = 0; i < currentRating; i++) {
                ratingStars[i].classList.add('activeClick');
            }
        });


    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(star.dataset.value);
            ratingStars.forEach(s => {
                s.classList.remove('activeClick');
            });
            for (let i = 0; i < currentRating; i++) {
                ratingStars[i].classList.add('activeClick');
            }
        });
    });
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            var value = parseInt(star.dataset.value);
            highlightStars(value);
        });
    
        star.addEventListener('mouseout', function() {
            resetStars();
        });
    
    });
    
    function highlightStars(value) {
        resetStars();
        for (let i = 0; i < value; i++) {
            ratingStars[i].classList.add('active');
        }
    }
    
    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove('active');
        });
    }
    function resetClick(){
        ratingStars.forEach(star => {
            star.classList.remove('activeClick');
        });
    }

    reviewForm.addEventListener('submit', function(event) {
        var reviewText = document.getElementById('review-text').value;
        event.preventDefault();

        if (reviewText.trim() === '') {
            alert('Por favor, escreva um comentário.');
            return;
        }

        if (currentRating === 0) {
            alert('Por favor, avalie o comentário.');
            return;
        }

        updateReview(reviewId,currentRating,reviewText);
        reviewForm.reset();
        resetClick();
        

    });

}
function updateReview(reviewId,rating,text) {
    var formData = new FormData();
    formData.append('update', true);
    formData.append('reviewId', reviewId);
    formData.append('rating', rating);
    formData.append('text', text);
    fetch('../PHP/reviewApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("avaliaçao alterada");
        loadReviews();
    })
    .catch(error => {
        console.log("erro ao alterar avaliação");
    });
}



