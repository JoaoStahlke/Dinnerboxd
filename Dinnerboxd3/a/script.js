document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const commentsTabs = document.getElementById('comments-tabs');
    const ratingStars = document.querySelectorAll('.star');

    let comments = [];
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

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = document.getElementById('comment-text').value;

        if (commentText.trim() === '') {
            alert('Por favor, escreva um comentário.');
            return;
        }

        if (currentRating === 0) {
            alert('Por favor, avalie o comentário.');
            return;
        }

        addComment(commentText, currentRating);
        commentForm.reset();
    });

    function addComment(text, rating) {
        comments.push({ text, rating });
        displayComments();
    }

    function displayComments() {
        commentsList.innerHTML = '';
        commentsTabs.innerHTML = '';

        showComments(0);

        const numTabs = Math.ceil(comments.length / 5);
        for (let i = 0; i < numTabs; i++) {
            const tabButton = document.createElement('button');
            tabButton.textContent = `${i + 1}`;
            tabButton.addEventListener('click', function() {
                showComments(i);
            });
            commentsTabs.appendChild(tabButton);
        }
    }

    function showComments(tabIndex) {
        commentsList.innerHTML = '';
        const start = tabIndex * 5;
        const end = Math.min(start + 5, comments.length);
        for (let i = start; i < end; i++) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            const stars = '★'.repeat(comments[i].rating);
            const emptyStars = '☆'.repeat(5 - comments[i].rating);
            const commentContent = `<p>${comments[i].text}</p><span class="stars">${stars}${emptyStars}</span>`;
            commentDiv.innerHTML = commentContent;
            commentsList.appendChild(commentDiv);
        }
    }
});
