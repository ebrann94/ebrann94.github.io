(function scrollNav() {
    const mainElement = document.querySelector('main');
    const about = document.querySelector('#about');
    const projects = document.querySelector('#projects');
    // const skills = document.querySelector('#skills');
    const home = document.querySelector('.logo');

    const targets = {
        about: about.getBoundingClientRect().top,
        projects: projects.getBoundingClientRect().top,
        home: 0
    }

    const links = {
        about: document.getElementById('about-link'),
        projects: document.getElementById('projects-link'),
        home
    }

    window.addEventListener('resize', () => {
        targets.about = about.getBoundingClientRect().top + window.scrollY;
        targets.projects = projects.getBoundingClientRect().top + window.scrollY; 
    });
    
    const setupScroll = (target) => {
        const scrollY = window.scrollY;
        const amtToMove = Math.abs(target - scrollY);
        let time = 0;
        console.log(amtToMove);

        function easeInOutQuad (t) { 
            return t<.5 ? 2*t*t : -1+(4-2*t)*t 
        }
        
        const scroll = () => {
            // console.log('scroll called');
            // console.log(window.scrollY);
            if (scrollY < target) {
                console.log(scrollY + easeInOutQuad(time) * amtToMove);
                window.scroll(0, scrollY + easeInOutQuad(time) * amtToMove);
            } else if (scrollY > target) {
                window.scroll(0, scrollY - easeInOutQuad(time) * amtToMove);
            }
            time += 0.06;

            if (time < 1) {
                window.requestAnimationFrame(scroll);
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

    document.querySelector('.about-arrow').addEventListener('click', () => {
        setupScroll(targets.about);
    });
})();
