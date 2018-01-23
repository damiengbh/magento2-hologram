require(['jquery'], function($){
    $(document).on('change', '#VISA, #EUROCARD_MASTERCARD, #E_CARD, #CB', function() { // Part CB
        $('#pbxep_cb').prop('checked', true).trigger("click");
    });
    $(document).on('change', '#AMEX', function() { // Part Amex
        $('#pbxep_private').prop('checked', true).trigger("click");
    });

    $(document).on('change', '#pbxep_paypal, #cashondelivery', function(){
        $('#VISA, #EUROCARD_MASTERCARD, #E_CARD, #CB, #AMEX').prop('checked',false);
    });
    $(document).on('change', '#pbxep_cb', function(){
        $('#CB').prop('checked', true).trigger("click");
    });
    $(document).on('change', '#pbxep_private', function(){
        $('#AMEX').prop('checked', true).trigger("click");
    });
});