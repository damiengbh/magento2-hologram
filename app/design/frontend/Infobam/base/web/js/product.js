require(['jquery'], function ($) {
    $(document).ready(function () {
        // Media carousel
        if ($('#product-media').length) {
            $('#product-media').addClass('owl-carousel');
            $('#product-media').owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 1
            });
        }
        // to remove the div clearfix bug of social module login Mageplaza for a good display of caracteristics on a product page
        $('#social-login-popup').next('div').remove();
    });
});
