

const slides = document.querySelectorAll('.slide');

let current = 0;
let scrolling = false;

window.addEventListener('wheel', (e) => {

    if (scrolling) return;

    scrolling = true;

    slides[current].classList.remove('active');

    if (e.deltaY > 0) {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

    } else {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

    }

    slides[current].classList.add('active');

    setTimeout(() => {
        scrolling = false;
    }, 800);

});

/* Cursor */

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a').forEach(link => {

    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });

});



const menuButton =
document.querySelector('.menu-button');

const overlay =
document.querySelector('.menu-overlay');

menuButton.addEventListener('click',()=>{

    overlay.classList.toggle('active');

});

overlay.addEventListener('click',(e)=>{

    if(e.target === overlay){

        overlay.classList.remove('active');

    }

});

