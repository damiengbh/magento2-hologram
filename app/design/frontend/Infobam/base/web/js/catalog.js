require(['jquery'], function ($) {
    $(document).ready(function () {
        // Vehicle navigation
        if ($('#vehicle-navigation').length) {
            var navigationHead = $('#vehicle-navigation-head');
            var filters = $('#vehicle-navigation-filters');
            var modelViewButton = $('#vehicle-navigation-vehicle');
            var modelViewContainer = $('#vehicle-navigation-model');
            var modelViewTour = $('#vehicle-navigation-tour');
            var listViewContainer = $('#vehicle-navigation-list');
            var listViewLinks = $('#vehicle-navigation-list .vehicle-navigation__links');
            var listSubnav = listViewLinks.find('.vehicle-navigation__links-subnav');
            var toggleButton = $('.vehicle-navigation__links-toggle');

            if(modelViewButton.hasClass('active') ) { // Le cas ou l'on arrive par defaut sur la home et qu'on ne click pas
                listViewLinks.css("opacity","1");
            }

            // Display model view if model button is clicked
            modelViewButton.click(function () {
                resetNavigationHeadButtons();
                $(this).addClass('active');
                modelViewContainer.addClass('active');
                listViewContainer.removeClass('active');
                listViewLinks.css("opacity", "1"); //Pour ne pas avoir de problèmes d'opacity sur le model 2D
            });

            // Navigation filters carousel
            if ($('#vehicle-navigation-filters-list').length) {
                if (!$('body').hasClass('cms-index-index')) {
                    var filtersList = $('#vehicle-navigation-filters-list');

                    filtersList.addClass('owl-carousel');

                    filtersList.owlCarousel({
                        loop: false,
                        nav: true,
                        dots: false,
                        items: 1
                    });

                    filtersList.on('changed.owl.carousel', function (event) {
                        var currentItemIndex = event.item.index;
                        var currentItem = $(event.target).find('.owl-item').eq(currentItemIndex).find('button');
                        currentItem.trigger('click');
                    })
                }
            }

            $('#vehicle-navigation-filters .vehicle-navigation__filters-item').each(function () {
                $(this).find('button').click(function () {
                    resetNavigationHeadButtons();

                    // Display list view if any filters button is clicked
                    $(this).addClass('active');
                    filters.addClass('active');
                    listViewContainer.addClass('active');
                    listViewLinks.css("opacity", ""); // Pour reset l'opacity forcé sur le modèle 2D
                    // Reset deploiement sous-cat + arrow
                    listSubnav.addClass('collapse');
                    toggleButton.attr('aria-expanded', 'false');
                         

                    //Close and reset all category panels
                    listViewContainer.removeClass('selected');
                    listViewLinks.removeClass('expanded');
                    listViewContainer.find('.vehicle-navigation__links-item').each(function () {
                        if ($(this).hasClass('show')) {
                            $(this).addClass('hide');
                            $(this).removeClass('show');
                            var linkListMore =  $(this).parents().data('more');
                            $('.vehicle-navigation__links-more').text(linkListMore);
                            if ($(this).find('.vehicle-navigation__links-subnav.collapse.in')) {
                                $('.vehicle-navigation__links-subnav.collapse.in').collapse('hide');
                            }
                        }
                    });

                    modelViewContainer.removeClass('active');

                    // Filter links list corresponding to the group
                    listViewLinks.removeClass('hide');

                    var filterGoup = $(this).data('target-group');
                    if (filterGoup != 'all') {
                        listViewLinks.addClass('hide');

                        listViewLinks.each(function () {
                            var linksGroup = $(this).data('group');
                            if (filterGoup == linksGroup) {
                                $(this).removeClass('hide');
                            }
                        });
                    }
                });
            });

            modelViewTour.find('.vehicle-navigation__tour-chip').each(function () {
                // Fade vehicle and other elements when a chip is hovered
                $(this).find('button').hover(
                    function () {
                        $(this).addClass('selected');
                        modelViewTour.addClass('selected');
                    }, function () {
                        $(this).removeClass('selected');
                        modelViewTour.removeClass('selected');
                    }
                );

                // Display targeted links in model view
                $(this).find('button').click(function () {
                    var tourTarget = $(this).data('target');
                    modelViewTour.addClass('model-selected');

                    modelViewTour.find('button').removeClass('active');
                    listViewLinks.removeClass('model-show');

                    $(this).addClass('active');
                    $('#' + tourTarget).addClass('model-show');
                    $('#' + tourTarget).find('.vehicle-navigation__links-container').append('<button type="button" class="vehicle-navigation__links-close"></button>');
                });
            });

            // Close navigation links panel when the close button is clicked
            listViewContainer.on('click', '.vehicle-navigation__links-close', function () {
                modelViewTour.removeClass('model-selected');
                modelViewTour.find('button').removeClass('active');
                listViewLinks.removeClass('model-show');
                listViewContainer.find('.vehicle-navigation__links-item').each(function () {
                    if ($(this).hasClass('hide')) {
                        $(this).addClass('show');
                        $(this).removeClass('hide');
                        moreButton.text(linkListLess);
                    } else if ($(this).hasClass('show')) {
                        $(this).addClass('hide');
                        $(this).removeClass('show');
                        moreButton.text(linkListMore);

                        if ($(this).find('.vehicle-navigation__links-subnav.collapse.in')) {
                            $('.vehicle-navigation__links-subnav.collapse.in').collapse('hide');
                        }
                    }
                });
            });

            // Only display the five first links
            listViewLinks.each(function () {
                var linksCategory = $(this);
                var linksList = linksCategory.find('.vehicle-navigation__links-list');
                var linkListMore = linksList.data('more');
                var linkListLess = linksList.data('less');
                var linksItem = linksCategory.find('.vehicle-navigation__links-item');
                var linksSubnav = linksItem.find('.vehicle-navigation__links-subnav');
                var linksItemMax = 5;

                // If there more than five links, hide them and add a button to show them when clicked
                if (linksItem.length > linksItemMax) {
                    linksList.append('<li class="vehicle-navigation__links-item"><button type="button" class="vehicle-navigation__links-more">'+ linkListMore +'</button></li>');

                    linksItem.each(function (index, element) {
                        if (index >= linksItemMax) {
                            $(this).addClass('hide');
                        }
                    });
                }

                // Act like a reset to avoid to get several expanded elements
                linksItem.on('click', 'a', function () {
                    var allLinks = listViewLinks.find('.vehicle-navigation__links-item');
                    var moreButton = allLinks.find('.vehicle-navigation__links-more');

                    listViewContainer.removeClass('selected');
                    listViewLinks.removeClass('expanded');

                    /*allLinks.each(function () {
                        if ($(this).hasClass('show')) {
                            $(this).addClass('hide');
                            $(this).removeClass('show');
                            moreButton.text(linkListMore);
                        }
                    });*/
                });

                // When the button is clicked, it toggle the more than five links display
                linksList.on('click', '.vehicle-navigation__links-more', function () {
                    var moreButton = $(this);

                    listViewContainer.toggleClass('selected');
                    linksCategory.toggleClass('expanded');


                    if (listViewLinks.hasClass('expanded')) {
                        listViewContainer.addClass('selected');
                    }


                    linksItem.each(function () {
                        if ($(this).hasClass('hide')) {
                            $(this).addClass('show');
                            $(this).removeClass('hide');
                            moreButton.text(linkListLess);
                        } else if ($(this).hasClass('show')) {
                            $(this).addClass('hide');
                            $(this).removeClass('show');
                            moreButton.text(linkListMore);

                            if ($(this).find('.vehicle-navigation__links-subnav.collapse.in')) {
                                $('.vehicle-navigation__links-subnav.collapse.in').collapse('hide');
                            }
                        }
                    });
                });




                // When the toggle sub categories button is clicked, it apply mostly the same behavior than the toggle more button
                linksList.on('click', '.vehicle-navigation__links-toggle', function () {
                    var sousCategorie = $(this).next();
                    var myButton= $(this);
                    listViewContainer.addClass('selected');
                    linksCategory.addClass('expanded');

                   linksSubnav.each(function () {
                        if ($(this).id != sousCategorie.id) {
                            $(this).addClass('collapse');
                            myButton.attr("aria-expanded","false");
                        }
                    });
                    sousCategorie.toggleClass('collapse');   
                    myButton.attr('aria-expanded', function (i, attr) {
                        return attr == 'true' ? 'false' : 'true'
                    });    
                });
            });


            // Functions
            // ------------------------------------------------------------------

            function resetNavigationHeadButtons() {
                navigationHead.find('button').removeClass('active');
                filters.removeClass('active');
                listViewLinks.removeClass('model-show');
                modelViewTour.removeClass('model-selected');
            }
        }
    });
});
