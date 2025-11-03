document.addEventListener("DOMContentLoaded", function() {
    
    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px",
        threshold: 0.1 
    });

    function observeWithDelay(selector, delay = 0) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el) => {
            el.style.setProperty('--stagger-delay', `${delay}ms`);
            observer.observe(el);
        });
    }

    function observeAndStagger(selector, staggerAmount = 100) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, index) => {
            const delay = staggerAmount * index;
            el.style.setProperty('--stagger-delay', `${delay}ms`);
            observer.observe(el);
        });
    }

    // Bio Animationo
    observeWithDelay(".about-text .greeting", 100); 
    observeWithDelay(".about-text h1", 200);
    observeWithDelay(".about-text .tags", 300);
    observeWithDelay(".about-text .description", 400);
    observeWithDelay(".about-text .bio-socials", 500);
    observeWithDelay(".about-image", 300);

    // MY KEMAMPUAN Animation
    const skillsTitle = document.querySelector(".skills h2");
    if (skillsTitle) {
        observer.observe(skillsTitle);
    }

    // Skill Animation
    observeAndStagger(".skill-item", 100);

});