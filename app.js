const navLinksEls=document.querySelectorAll('.nav-link');
const sectionEls=document.querySelectorAll('.section');
let currentId='home'
window.addEventListener('scroll',()=>{
    sectionEls.forEach(i => {
        if(window.scrollY>=i.offsetTop)
        {
            currentId=i.id;
            console.log(currentId);
        }
    });
});