/* =========================================
   STILLS — lightbox (ampliar foto, setas, ESC)
========================================= */

(() => {

    const photos = [...document.querySelectorAll('.gallery .project img')];
    if (!photos.length) return;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Foto ampliada');
    box.innerHTML = `
        <button class="lb-close" type="button" aria-label="Fechar">Fechar</button>
        <button class="lb-prev" type="button" aria-label="Foto anterior">Anterior</button>
        <img alt="">
        <button class="lb-next" type="button" aria-label="Próxima foto">Próxima</button>
        <div class="lb-count"></div>
    `;
    document.body.appendChild(box);

    const img = box.querySelector('img');
    const count = box.querySelector('.lb-count');
    let index = 0;

    const render = () => {
        img.src = photos[index].src;
        img.alt = photos[index].alt;
        count.textContent = (index + 1) + ' / ' + photos.length;
    };

    const open = i => {
        index = i;
        render();
        box.classList.add('active');
        document.body.classList.add('menu-open'); // trava o scroll
    };

    const close = () => {
        box.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    const step = dir => {
        index = (index + dir + photos.length) % photos.length;
        render();
    };

    photos.forEach((photo, i) => {
        photo.closest('.project').addEventListener('click', () => open(i));
    });

    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    box.querySelector('.lb-next').addEventListener('click', () => step(1));

    box.addEventListener('click', e => {
        if (e.target === box) close();
    });

    document.addEventListener('keydown', e => {
        if (!box.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });

})();
