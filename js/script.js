/* =========================================
   SCRIPT COMUM — todas as páginas
   cursor + menu overlay + animação de entrada
========================================= */

(() => {

    const body = document.body;

    /* ---------- CURSOR ---------- */

    const cursor = document.querySelector('.cursor');

    if (cursor && window.matchMedia('(hover:hover)').matches) {

        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.classList.add('visible');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
        });

        // delegação: funciona também em elementos criados depois (ex.: lightbox)
        document.addEventListener('mouseover', e => {
            cursor.classList.toggle(
                'hover',
                !!e.target.closest('a, button, [data-hover]')
            );
        });

    }

    /* ---------- MENU OVERLAY ---------- */

    const menuButton = document.querySelector('.menu-button');
    const overlay = document.querySelector('.menu-overlay');

    if (menuButton && overlay) {

        const setMenu = open => {
            overlay.classList.toggle('active', open);
            body.classList.toggle('menu-open', open);
            menuButton.setAttribute('aria-expanded', open);
            menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            menuButton.textContent = open ? '✕' : '|||';
        };

        menuButton.addEventListener('click', () => {
            setMenu(!overlay.classList.contains('active'));
        });

        // clicar no fundo ou em um link fecha o menu
        overlay.addEventListener('click', e => {
            if (e.target === overlay || e.target.closest('.overlay-links')) {
                if (e.target === overlay) setMenu(false);
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') setMenu(false);
        });

    }

    /* ---------- ANIMAÇÃO DE ENTRADA ---------- */

    const items = document.querySelectorAll('.reveal');

    if (items.length) {

        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('show'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .15 });

        items.forEach(el => observer.observe(el));

    }

})();
