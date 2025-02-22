function redirect() {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "Homepage.html";
    }, 1000); 
}

function createStars(number) {
    const starContainer = document.querySelector('.stars-background');
    for (let i = 0; i < number; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random();
        starContainer.appendChild(star);
    }
}
createStars(100);  