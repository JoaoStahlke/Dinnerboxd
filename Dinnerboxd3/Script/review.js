document.addEventListener('DOMContentLoaded', function() {
    function userCheck(){
        fetch('../PHP/getSessionData.php')
        .then(response => response.json())
        .then(data => {
            
            if(data.userCheck == false){
                console.log("dsa");
                var r=document.querySelector("#review-form");
                r.remove();
            }
        })
        .catch(error => {
            setTimeout(() => {
                viewAccount()
            }, 1000)
            });
    
}
 userCheck();

    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    const reviewTabs = document.getElementById('review-tabs');
    const ratingStars = document.querySelectorAll('.star');

    let review = [];
    let currentRating = 0;

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
            const value = parseInt(star.dataset.value);
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
        const reviewText = document.getElementById('review-text').value;

        if (reviewText.trim() === '') {
            alert('Por favor, escreva um comentário.');
            return;
        }

        if (currentRating === 0) {
            alert('Por favor, avalie o comentário.');
            return;
        }

        addreview(reviewText, currentRating);
        reviewForm.reset();
        resetClick();
        

    });

    function addreview(text, rating) {
        var urlParams = new URLSearchParams(window.location.search);
        var restaurantId=urlParams.get("restaurant");
        var formData = new FormData();
        formData.append('restaurantId',restaurantId);
        formData.append('text', text);
        formData.append('rating', rating);


        fetch('../PHP/createReviewApi.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            var text=data.text;
            var rating = data.rating;
            var name = data.name;
            var date = data.date;
            review.push({ name,text, rating,date });
            displayreview();
        
        })
        .catch(error => console.error('Erro no update:', error));

        
    }

    function selectReviews(){
        var urlParams = new URLSearchParams(window.location.search);
        var restaurantId=urlParams.get("restaurant");
        fetch(`../PHP/readReviewApi.php?restaurant=${restaurantId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(arrayReview=>{
                
                var name = correctName(arrayReview.userName);
                var text = arrayReview.reviewText;
                var rating = arrayReview.reviewRating;
                var date = arrayReview.reviewDate;
                
                review.push({ name,text, rating,date });
                
            });
            displayreview();
        })
        .catch(error => console.error('Erro ao carregar avaliações:', error));
    }
selectReviews()

    function displayreview() {
        reviewList.innerHTML = '';
        reviewTabs.innerHTML = '';

        showreview(0);

        const numTabs = Math.ceil(review.length / 5);
        for (let i = 0; i < numTabs; i++) {
            const tabButton = document.createElement('button');
            tabButton.textContent = `${i + 1}`;
            tabButton.addEventListener('click', function() {
                showreview(i);
            });
            reviewTabs.appendChild(tabButton);
        }
    }

    function showreview(tabIndex) {
        reviewList.innerHTML = '';
        const start = tabIndex * 5;
        const end = Math.min(start + 5, review.length);

        for (let i = start; i < end; i++) {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            const stars = '★'.repeat(review[i].rating);
            const emptyStars = '☆'.repeat(5 - review[i].rating);
            const reviewContent = `<span class="review-name">${review[i].name}<br></span><span class="stars">${stars}${emptyStars}</span><p>${review[i].text}</p><span class="review-date">${review[i].date}</span>`;
            reviewDiv.innerHTML = reviewContent;
            reviewList.appendChild(reviewDiv);
        }
    }
});


function correctName(name) {
    const words = name.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 1) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        } else {
            words[i] = words[i].toUpperCase();
        }
    }
    return words.join(' ');
}