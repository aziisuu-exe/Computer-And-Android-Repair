document.addEventListener("DOMContentLoaded", () => {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    const heroElements = [
        document.querySelector('.hero-text p:first-child'), // Motto
        document.querySelector('.hero-text h1'),             // Judul
        document.querySelector('.hero-text .description'),   // Deskripsi
        document.querySelector('.hero-text .btn-secondary')  // Tombol "Coba Sekarang"
    ];

    const heroImage = document.querySelector('.hero-image');

    const faqHeader = [
        document.querySelector('.faq h2'),
        document.querySelector('.faq > p')
    ];

    const faqItems = document.querySelectorAll('.faq-item');

    const setInitialStyle = (element, delay = 0) => {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        element.style.transitionDelay = `${delay}ms`;
        observer.observe(element);
    };

    heroElements.forEach((el, index) => {
        setInitialStyle(el, index * 100);
    });

    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(20px)';
        heroImage.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        heroImage.style.transitionDelay = '200ms';
        observer.observe(heroImage);
    }

    faqHeader.forEach((el, index) => {
        setInitialStyle(el, index * 100);
    });

    faqItems.forEach((item, index) => {
        if (!item) return;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.95)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${index * 100}ms`;
        
        observer.observe(item);
    });

    const addQuestionLink = document.querySelector('.add-question');
    const faqGrid = document.querySelector('.faq-grid');
    addQuestionLink.addEventListener('click', function(event) {
        
        event.preventDefault();
        const newQuestion = prompt("Silakan ketik pertanyaan Anda di sini:");
        if (newQuestion && newQuestion.trim() !== "") {
            
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = newQuestion;

            const answerText = document.createElement('p');
            answerText.textContent = "Pesan akan dibalas oleh admin saat mood saja ya";

            faqItem.appendChild(questionTitle);
            faqItem.appendChild(answerText);

            const existingItemCount = faqGrid.querySelectorAll('.faq-item').length;
            const newDelay = existingItemCount * 100;
            
            faqItem.style.opacity = '0';
            faqItem.style.transform = 'translateY(20px) scale(0.95)';
            faqItem.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            faqItem.style.transitionDelay = `${newDelay}ms`;

            faqGrid.appendChild(faqItem);

            observer.observe(faqItem);
            faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

});