document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.numbers_head');

    const options = {
        threshold: 1.0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const suffix = target.getAttribute('data-suffix') || '';
                const updateCount = () => {
                    const targetValue = +target.getAttribute('data-target');
                    const count = +target.innerText.replace(suffix, '');

                    const increment = targetValue / 100;

                    if (count < targetValue) {
                        target.innerText = Math.ceil(count + increment) + suffix;
                        setTimeout(updateCount, 20);
                    } else {
                        target.innerText = targetValue + suffix;
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});