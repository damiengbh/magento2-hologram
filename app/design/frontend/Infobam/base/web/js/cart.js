require(['jquery'], function ($) {
    $(document).ready(function () {

        // Quantity input
        if ($('.js-quantity').length) {
            $('.js-quantity').each(function () {
                var input = $(this).find('.form-control');
                var btnMinus = '<button type="button" class="form-quantity-minus">-</button>';
                var btnPlus = '<button type="button" class="form-quantity-plus">+</button>';
                input.wrap('<div class="form-quantity"></div>').parent().append(btnMinus + btnPlus);
            });

            $('.js-quantity').on('click', '.form-quantity-plus', function () {
                var form = $(this).parents('#form-validate');
                var input = $(this).parent().find('.form-control');
                var inputValue = input.val();
                inputValue++;
                input.val(inputValue);
                form.submit();
            });

            $('.js-quantity').on('click', '.form-quantity-minus', function () {
                var form = $(this).parents('#form-validate');
                var input = $(this).parent().find('.form-control');
                var inputValue = input.val();
                if (inputValue > 1) {
                    inputValue--;
                    input.val(inputValue);
                    form.submit();
                }
            });
        }

    });
});
