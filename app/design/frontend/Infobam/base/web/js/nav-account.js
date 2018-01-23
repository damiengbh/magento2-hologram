require(['jquery'], function ($) {
    var i = 0;
    var myArray = [];
    var myName = [];
    var current_link;
    var found = false;
    var previous = 0;
    var nameNext = 0;
    var next = 0;
    $('.account-navigation__list').find('a').each(function () {
        myArray[i] = $(this).attr('href');
        myName[i] = $('.account-navigation__item--active').find('a').text();
        i++;
    });
    $( window ).resize(function() {
       if($(window).width()>470){
           $('.link-nav').first().text("Mes commandes");
           $('.link-nav').first().css({"borderBottom":"","color":""});
    }
    });
    $('.account-navigation__list').find('.account-navigation__item--active').each(function () {
        current_link = $('.account-navigation__list').find('.account-navigation__item--active').find('a').attr('href');
        if($(window).width() < 470) {
            $('.link-nav').first().text(myName[1]);
            $('.link-nav').first().css({"borderBottom":"solid 3px #ffab07","color":"#ffab07"});
        }
        for (var i = 0; i < myArray.length && !found; i++) {
            if (myArray[i] === current_link) {
                found = true;
                $( "<div class=\"owl-nav\"><div class=\"gauche\"></div><div class=\"droite\"></div></div>" ).insertBefore('.link-nav').first();
                if(myArray[i-1] == undefined){
                    myArray[i-1]= "#";
                }
                previous = '<a href="' + myArray[i - 1] + '"></a>';
                $('.gauche').wrap(previous);

                if(myArray[i+1] == undefined){
                    myArray[i+1]= "#";
                }
                next = '<a href="' + myArray[i + 1] + '"></a>';
                nameNext= myName[i+1];
                $('.droite').wrap(next);

                break;
            }
        }
    });

});