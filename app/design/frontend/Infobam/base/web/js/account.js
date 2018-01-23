require(['jquery'], function ($) {
    $(document).ready(function () {
        // Account navigation carousel
        if ($('#account-navigation').length) {
            $('#account-navigation').addClass('owl-carousel');

            $('#account-navigation').owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });
        }

        // Active addresses
        if ($('.account-addresses__item').length) {
            var item = $('.account-addresses__item');

            if (item.find('input:checked')) {
                item.addClass('active');
            }
        }
    });
});
