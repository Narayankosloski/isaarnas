/* =========================================
   HOME — slides (scroll, swipe, setas, autoplay)
========================================= */

(() => {

    const slides = document.querySelectorAll('.slide');
    if (slides.length < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    let current = 0;
    let locked = false;
    let timer;

    const show = index => {
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
    };

    const restart = () => {
        clearInterval(timer);
        if (!reduced) timer = setInterval(() => show(current + 1), 7000);
    };

    const go = dir => {
        if (locked || document.body.classList.contains('menu-open')) return;
        locked = true;
        show(current + dir);
        restart();
        setTimeout(() => locked = false, 900);
    };

    // scroll do mouse
    window.addEventListener('wheel', e => {
        if (Math.abs(e.deltaY) < 10) return;
        go(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    // swipe no celular
    let startY = 0;

    window.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', e => {
        const diff = startY - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    }, { passive: true });

    // teclado
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(-1);
    });

    restart();

})();
