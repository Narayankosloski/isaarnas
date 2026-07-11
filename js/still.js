

const projects = document.querySelectorAll('.project');

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('show');

        }

    });

},{
    threshold:0.15
});

projects.forEach(project=>{
    observer.observe(project);
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


