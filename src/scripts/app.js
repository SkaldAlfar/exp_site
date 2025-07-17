// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        // Move to the next item
        currentIndex = (currentIndex + 1) % items.length;

        // Update the position of all items
        items.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    // Initialize the carousel positions
    items.forEach((item, index) => {
        item.style.transform = `translateX(${index * 100}%)`;
    });

    // Change image every 3 seconds
    setInterval(showNextItem, 3000);
});

// let blink =
//     document.getElementById('blink');

// setInterval(function () {
//     blink.style.opacity =
//         (blink.style.opacity == 0 ? 1 : 0);
// }, 2000); 