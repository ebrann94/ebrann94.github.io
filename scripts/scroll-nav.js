(function() {
    let mobileMenuRunning = false;

    function isMobile() {
        return window.innerWidth < 600;
    }

    function run() {
        if (isMobile()) {
            scrollNav();
            mobileMenu();
        } else {
            scrollNav();
        }
    }

    window.addEventListener('load', run);

    window.addEventListener('resize', () => {
        if (isMobile() && !mobileMenuRunning) {
            mobileMenu();
        }
    });
    
    function scrollNav() {
        const about = document.getElementById('about');
        const projects = document.getElementById('projects');
        const contact = document.getElementById('contact');
    
        const header = document.querySelector('header');
    
        const targets = {
            about: about.getBoundingClientRect().top + window.scrollY,
            projects: projects.getBoundingClientRect().top + window.scrollY,
            contact: contact.getBoundingClientRect().top + window.scrollY,
            home: 0
        }
    
        const links = {
            about: document.getElementById('about-link'),
            projects: document.getElementById('projects-link'),
            contact: document.getElementById('contact-link'),
            home: document.querySelector('.logo')
        }
    
        window.addEventListener('resize', () => {
            targets.about = about.getBoundingClientRect().top + window.scrollY;
            targets.projects = projects.getBoundingClientRect().top + window.scrollY;
        });
        
        const setupScroll = (target) => {
            const scrollY = window.scrollY;
            if (isMobile()) {
                target -= header.clientHeight;
            }
            const amtToMove = Math.abs(target - scrollY);
            let time = 0;
    
            function easeInOutQuad (t) { 
                return t<.5 ? 2*t*t : -1+(4-2*t)*t 
            }
            
            const scroll = () => {
                if (scrollY < target) {
                    window.scroll(0, scrollY + easeInOutQuad(time) * amtToMove);
                } else if (scrollY > target) {
                    window.scroll(0, scrollY - easeInOutQuad(time) * amtToMove);
                }
                time += 0.06;
    
                if (time < 1) {
                    window.requestAnimationFrame(scroll);
                } else {
                    window.scroll(0, target);
                }
            }
            window.requestAnimationFrame(scroll);
        }
    
        const linkKeys = Object.keys(links);
    
        linkKeys.forEach(key => {
            links[key].addEventListener('click', () => {
                setupScroll(targets[key]);
            });
        });
    };
    
    function mobileMenu() {
        mobileMenuRunning = true;
        
        const menu = document.querySelector('nav');
        const hb = document.querySelector('.hamburger');
    
        let menuOpen = false;
    
        hb.addEventListener('click', () => {
            menu.classList.toggle('nav-open');
            menuOpen = true;
        });
    
        menu.addEventListener('click', () => {
            if (menuOpen) {
                menu.classList.remove('nav-open');
            }
        });
    }

})();
