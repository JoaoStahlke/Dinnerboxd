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