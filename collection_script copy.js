document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.dynamic-img');

    images.forEach(function(img) {
        var baseSrc = img.getAttribute('data-src');
        // You can replace 'mobile-card-id' and 'desktop-card-id' with actual logic to determine the correct image ID
        if (window.innerWidth <= 480) { // For mobile devices
            img.src = baseSrc.replace('{id}', 'mobile-card-id');
        } else {
            img.src = baseSrc.replace('{id}', 'desktop-card-id');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var img = entry.target;
                var baseSrc = img.getAttribute('data-src');
                img.src = baseSrc.replace('{id}', 'appropriate-card-id');
                observer.unobserve(img);
            }
        });
    });

    var images = document.querySelectorAll('.dynamic-img');
    images.forEach(img => observer.observe(img));
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterButton').addEventListener('click', function() {
        window.location.href = 'filter.html';
    });
});