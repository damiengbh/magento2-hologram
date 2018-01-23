/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/confirm',
    'jquery/ui',
], function($, $t, confirm) {
    "use strict";

    $.widget('mage.catalogAddToCart', {

        options: {
            processStart: null,
            processStop: null,
            bindSubmit: true,
            minicartSelector: '[data-block="minicart"]',
            messagesSelector: '[data-placeholder="messages"]',
            productStatusSelector: '.stock.available',
            addToCartButtonSelector: '.action.tocart',
            addToCartButtonDisabledClass: 'disabled',
            addToCartButtonTextWhileAdding: '',
            addToCartButtonTextAdded: '',
            addToCartButtonTextDefault: '',
            checkCompatibilityUrl: null
        },

        _create: function() {
            if (this.options.bindSubmit) {
                this._bindSubmit();
            }
        },

        _bindSubmit: function() {
            var self = this;
            this.element.on('submit', function(e) {
                e.preventDefault();

                if(self.options.checkCompatibilityUrl == null) {
                    self.submitForm($(this));
                } else {
                    self.checkCurrentVersion($(this));
                }
            });
        },

        isLoaderEnabled: function() {
            return this.options.processStart && this.options.processStop;
        },

        /**
         * Handler for the form 'submit' event
         *
         * @param {Object} form
         */
        submitForm: function (form) {
            var addToCartButton, self = this;

            if (form.has('input[type="file"]').length && form.find('input[type="file"]').val() !== '') {
                self.element.off('submit');
                // disable 'Add to Cart' button
                addToCartButton = $(form).find(this.options.addToCartButtonSelector);
                addToCartButton.prop('disabled', true);
                addToCartButton.addClass(this.options.addToCartButtonDisabledClass);
                form.submit();
            } else {
                self.ajaxSubmit(form);
            }
        },

        /**
         * Check current version of customer
         *
         * @param {Object} form
         */
        checkCurrentVersion: function (form) {
            var self = this;

            self.disableAddToCartButton(form);

            $.ajax({
                type: 'POST',
                url: this.options.checkCompatibilityUrl,
                data: form.serialize(),
                success: function (data) {
                    var isSuitable = false;
                    if (data.is_suitable !== undefined) {
                        isSuitable = data.is_suitable;
                    }

                    var currentVersion = false;
                    if (data.current_version !== undefined) {
                        currentVersion = data.current_version;
                    }

                    var urlToRedirect = false;
                    if (data.url_to_redirect !== undefined) {
                        urlToRedirect = data.url_to_redirect;
                    }

                    var productId = false;
                    if (data.product_id !== undefined) {
                        productId = data.product_id;
                    }

                    if (currentVersion === false) {
                        // No vehicle in session
                        // isSuitable can be true if product is not filtered by version
                        if(isSuitable) {
                            // Add product to cart because is suitable without currentVersion
                            self.submitForm(form);
                        } else {
                            confirm({
                                content: $t('Attention, nous ne pouvons garantir que que votre produit est compatible avec votre véhicule, êtes-vous sûr de vouloir l\'ajouter au panier ?'),
                                actions: {
                                    confirm: function () {
                                        // Add product to cart
                                        self.submitForm(form);
                                    },
                                    cancel: function() {
                                        // Display vehicle popin
                                        if (!productId) {
                                            return;
                                        }
                                        $('#popup-modal-identification input[name="product_to_add_to_cart"]').val(productId);
                                        $('#popup-modal-identification').modal('openModal');
                                    },
                                    always: function (event) {
                                        self.enableAddToCartButton(form);
                                        event.stopImmediatePropagation();
                                    }
                                }
                            });
                        }
                    } else {
                        // Vehicle in session
                        if (isSuitable) {
                            // Add product to cart
                            self.submitForm(form);
                        } else {
                            // Ask customer
                            confirm({
                                content: $t('Attention, votre véhicule n\'est pas compatible avec ce produit, êtes-vous sûr de vouloir l\'ajouter au panier ?'),
                                actions: {
                                    confirm: function () {
                                        // Add product to cart
                                        self.submitForm(form);
                                    },
                                    cancel: function() {
                                        // Redirect to page
                                        console.log(urlToRedirect);
                                        if (urlToRedirect) {
                                            window.location = urlToRedirect;
                                        }
                                    },
                                    always: function (event) {
                                        self.enableAddToCartButton(form);
                                        event.stopImmediatePropagation();
                                    }
                                }
                            });
                        }
                    }

                },
                error: function (data) {
                    var isSuitable = false;
                    var currentVersion = false;
                }
            });
        },

        ajaxSubmit: function(form) {
            var self = this;
            $(self.options.minicartSelector).trigger('contentLoading');
            self.disableAddToCartButton(form);

            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: 'post',
                dataType: 'json',
                beforeSend: function() {
                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStart);
                    }
                },
                success: function(res) {
                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStop);
                    }

                    if (res.backUrl) {
                        window.location = res.backUrl;
                        return;
                    }
                    if (res.messages) {
                        $(self.options.messagesSelector).html(res.messages);
                    }
                    if (res.minicart) {
                        $(self.options.minicartSelector).replaceWith(res.minicart);
                        $(self.options.minicartSelector).trigger('contentUpdated');
                    }
                    if (res.product && res.product.statusText) {
                        $(self.options.productStatusSelector)
                            .removeClass('available')
                            .addClass('unavailable')
                            .find('span')
                            .html(res.product.statusText);
                    }
                    self.enableAddToCartButton(form);
                }
            });
        },

        disableAddToCartButton: function(form) {
            var addToCartButtonTextWhileAdding = this.options.addToCartButtonTextWhileAdding || $t('Adding...');
            var addToCartButton = $(form).find(this.options.addToCartButtonSelector);
            addToCartButton.addClass(this.options.addToCartButtonDisabledClass);
            addToCartButton.find('span').text(addToCartButtonTextWhileAdding);
            addToCartButton.attr('title', addToCartButtonTextWhileAdding);
        },

        enableAddToCartButton: function(form) {
            var addToCartButtonTextAdded = this.options.addToCartButtonTextAdded || $t('Added');
            var self = this,
                addToCartButton = $(form).find(this.options.addToCartButtonSelector);

            addToCartButton.find('span').text(addToCartButtonTextAdded);
            addToCartButton.attr('title', addToCartButtonTextAdded);

            setTimeout(function() {
                var addToCartButtonTextDefault = self.options.addToCartButtonTextDefault || $t('Add to Cart');
                addToCartButton.removeClass(self.options.addToCartButtonDisabledClass);
                addToCartButton.find('span').text(addToCartButtonTextDefault);
                addToCartButton.attr('title', addToCartButtonTextDefault);
            }, 1000);
        }
    });

    return $.mage.catalogAddToCart;
});
