require(['jquery'], function ($) {
    $(document).ready(function () {
        $('.collapse').collapse({toggle: false}); /* for fix bug on toggle nav on mobile devices */

        var checkForms = setInterval(function() {
            if ($("input[name='telephone']").length) {
                validateInput();
                clearInterval(checkForms);
            }
        }, 2000);

        function validateInput() {
            $("input[name='telephone']").wrap("<div id='control-telephone'></div>");
            $("#control-telephone").append("<p style='display:none; color:#ee385c;' class='control-phoneNumber'>Veuillez entrer le numéro au format international (ex: (+)0596XXXXXX)</p>");
            $("input[name='telephone']").on('input', function() { //validate form on changement and autocomplete him on country selected (later)
                var input=$(this);
                var re = /^([+]?)[0-9]{10,12}$/; //  \d{4}\d{3}\d{3}
                var is_phone=re.test(input.val());
                $("input[name='telephone']").attr("placeholder", "(+)0596XXXXXX"); //give an example for user in a placeholder

                if(is_phone){ //if valid
                    $(".control-phoneNumber").css("display","none");
                    $("input[name='telephone']").removeClass("mage-error");
                    $("input[name='telephone']").addClass("valid");
                }
                else{ //if not valid
                    $(".control-phoneNumber").css("display","block")
                    $("input[name='telephone']").removeClass("valid");
                    $("input[name='telephone']").addClass("mage-error");
                }
            });
            $("input[name='postcode']").wrap("<div id='control-postcode'></div>");
            $("#control-postcode").append("<p style='display:none; color:#ee385c;' class='control-postcode'>Veuillez entrer le code postal au bon format (ex: XXXXX)</p>");
            $("input[name='postcode']").on('input', function() { //validate form on changement
                var input=$(this);
                var re = /^[0-9]{5,5}$/;
                var is_zip=re.test(input.val());
                $("input[name='postcode']").attr("placeholder", "XXXXX"); // Give an example for user in a placeholder

                if(is_zip){ //if valid
                    $(".control-postcode").css("display","none");
                    $("input[name='postcode']").removeClass("mage-error");
                    $("input[name='postcode']").addClass("valid");
                }
                else{ //if not valid
                    $(".control-postcode").css("display","block");
                    $("input[name='postcode']").removeClass("valid");
                    $("input[name='postcode']").addClass("mage-error");
                }
            });
        };

        // Media queries
        var mqExtraSmall = 480;
        var mqSmall = 768;
        var mqMedium = 992;
        var mqLarge = 1200;

        // Panels
        var panelSearch;
        var panelCart;

        // Smooth scrolling for anchor links
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
            .not('[href="#"],[data-toggle]')
            .click(function (event) {
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });

        // Stick the header to the top
        if ($('#header').length) {
            $('#header').affix({
                offset: {
                    top: 1000, // Fix affix Flickering Problem in Bootstrap 3.3.1
                    bottom: function () {
                        return (this.bottom = $('#footer').outerHeight(true))
                    }
                }
            });
        }

        // Toggle panel
        if ($('#header-toggle-panel').length) {
            $('#header-toggle-panel').click(function () {
                if ($('body').hasClass('has-search-open')) {
                    $('#header-toggle-search').attr('aria-expanded', 'false');
                    $('body').removeClass('has-search-open');
                } else if ($('body').hasClass('has-cart-open')) {
                    $('#header-toggle-cart').attr('aria-expanded', 'false');
                    $('body').removeClass('has-cart-open');
                } else if ($('body').hasClass('has-panel-open')) {
                    $(this).attr('aria-expanded', 'false');
                    $('body').removeClass('has-panel-open');
                } else {
                    $(this).attr('aria-expanded', 'true');
                    $('body').addClass('has-panel-open');
                }
            });
        }

        // Toggle search
        if ($('#header-toggle-search').length) {
            $('#header-toggle-search').click(function () {
                if ($('body').hasClass('has-cart-open')) {
                    if (checkWindowWidth() >= mqSmall) {
                        var panelCart = true;

                        $('#header-cart').bootstrapModal('hide');
                        $('#header-search').bootstrapModal('show');
                    }
                }

                if ($('body').hasClass('has-search-open')) {
                    $(this).attr('aria-expanded', 'false');

                    if (checkWindowWidth() >= mqSmall) {
                        $('#header-search').bootstrapModal('hide');
                    } else {
                        $('body').removeClass('has-search-open');
                    }
                } else {
                    $(this).attr('aria-expanded', 'true');

                    if (checkWindowWidth() >= mqSmall) {
                        if (!panelCart == true) {
                            $('#header-search').bootstrapModal('show');
                        }
                    } else {
                        $('body').addClass('has-search-open');
                    }
                }
            });

            $('#header-search').on('show.bs.modal', function () {
                $('body').addClass('has-panel');
            });

            $('#header-search').on('show.bs.modal', function () { //iciiiiiii (n)
                $('body').addClass('has-search-open');
            });

            $('#header-search').on('hide.bs.modal', function () {
                $('#header-search').css("display","none");
                $('body').removeClass('has-search-open');$('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });

            if (panelSearch == true) {
                $('#header-search').on('hidden.bs.modal', function () {
                    $('body').removeClass('has-panel');
                });
            }
        }

        // Toggle cart
        if ($('#header-toggle-cart').length) {
            $('#header').on('click', '#header-toggle-cart, #header-close-cart', function () {
                if ($('body').hasClass('has-search-open')) {
                    if (checkWindowWidth() >= mqSmall) {
                        var panelSearch = true;

                        $('#header-search').bootstrapModal('hide');
                        $('#header-cart').bootstrapModal('show');
                    }
                }

                if ($('body').hasClass('has-cart-open')) {
                    $(this).attr('aria-expanded', 'false');

                    if (checkWindowWidth() >= mqSmall) {
                        $('#header-cart').bootstrapModal('hide');

                    } else {
                        $('body').removeClass('has-cart-open');
                    }
                } else {
                    $(this).attr('aria-expanded', 'true');

                    if (checkWindowWidth() >= mqSmall) {
                        if (!panelSearch == true) {
                            $('#header-cart').bootstrapModal('show');
                            $('body').removeClass('modal-open');
                        }
                    } else {
                        $('body').addClass('has-cart-open');
                    }
                }
            });

            $('#header-cart').on('show.bs.modal', function () {
                $('body').addClass('has-panel');
            });

            $('#header-cart').on('show.bs.modal', function () {
                $('body').addClass('has-cart-open');
            });

            $('#header-cart').on('hide.bs.modal', function () {
                $('#header-cart').css("display","none");
                $('body').removeClass('has-cart-open');$('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

            });
            if (panelCart == true) {
                $('#header-cart').on('hide.bs.modal', function () {
                    $('body').removeClass('has-panel');
                });
            }
        }


        // Functions
        // ------------------------------------------------------------------

        function checkWindowWidth() {
            var windowsize = window.innerWidth;
            return windowsize;
        }
    });
});
