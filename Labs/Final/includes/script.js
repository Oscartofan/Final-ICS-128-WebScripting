        // Instant feedback for Shipping Details fields
        $(document).on('input', '#shipping-firstname, #shipping-lastname', function() {
            if ($(this).val().trim().length > 1) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#shipping-address', function() {
            if ($(this).val().trim().length > 3) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#shipping-email', function() {
            var val = $(this).val();
            var valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
            if (valid) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#shipping-phone', function() {
            var val = $(this).val();
            var valid = /^\d{3}-\d{3}-\d{4}$/.test(val);
            if (valid) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Address autocomplete for Shipping Address using Nominatim
        let shippingAddressTimer;
        $(document).on('input', '#shipping-address', function() {
            clearTimeout(shippingAddressTimer);
            var input = $(this);
            var val = input.val().trim();
            if (val.length < 5) {
                $('#shipping-address-suggestions').remove();
                return;
            }
            shippingAddressTimer = setTimeout(function() {
                $.getJSON('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=' + encodeURIComponent(val), function(data) {
                    $('#shipping-address-suggestions').remove();
                    if (data && data.length > 0) {
                        var list = $('<div id="shipping-address-suggestions" class="list-group position-absolute w-100" style="z-index:1000;"></div>');
                        data.forEach(function(place) {
                            var display = place.display_name;
                            var address = place.address || {};
                            var item = $('<button type="button" class="list-group-item list-group-item-action"></button>').text(display);
                            item.on('click', function() {
                                input.val(address.road || address.pedestrian || address.cycleway || address.footway || address.path || display).addClass('is-valid').removeClass('is-invalid');
                                $('#shipping-city').val(address.city || address.town || address.village || '').addClass('is-valid').removeClass('is-invalid');
                                $('#shipping-province').val(address.state || '').addClass('is-valid').removeClass('is-invalid');
                                $('#shipping-postal').val(address.postcode || '').addClass('is-valid').removeClass('is-invalid');
                                if (address.country_code === 'ca') {
                                    $('#shipping-country').val('Canada').addClass('is-valid').removeClass('is-invalid');
                                } else if (address.country_code === 'us') {
                                    $('#shipping-country').val('United States').addClass('is-valid').removeClass('is-invalid');
                                } else if (address.country_code === 'mx') {
                                    $('#shipping-country').val('Mexico').addClass('is-valid').removeClass('is-invalid');
                                } else {
                                    $('#shipping-country').val('').removeClass('is-valid is-invalid');
                                }
                                $('#shipping-address-suggestions').remove();
                            });
                            list.append(item);
                        });
                        input.closest('.mb-3, .position-relative').css('position', 'relative');
                        input.after(list);
                    }
                });
            }, 400);
        });
        $(document).on('blur', '#shipping-address', function() {
            setTimeout(function() { $('#shipping-address-suggestions').remove(); }, 200);
        });
        // Toggle shipping fields based on checkbox
        $(document).on('change', '#shipping-same-billing', function() {
            if ($(this).is(':checked')) {
                $('#shipping-fields').addClass('d-none');
            } else {
                $('#shipping-fields').removeClass('d-none');
            }
        });
        // Show/hide on modal open
        $(document).on('shown.bs.modal', '#paymentModal', function() {
            if ($('#shipping-same-billing').length) {
                if ($('#shipping-same-billing').is(':checked')) {
                    $('#shipping-fields').addClass('d-none');
                } else {
                    $('#shipping-fields').removeClass('d-none');
                }
            }
        });
        // Instant feedback for Billing Details fields
        $(document).on('input', '#billing-firstname, #billing-lastname', function() {
            if ($(this).val().trim().length > 1) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#billing-address', function() {
            if ($(this).val().trim().length > 3) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#billing-email', function() {
            var val = $(this).val();
            var valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
            if (valid) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });
        $(document).on('input', '#billing-phone', function() {
            var val = $(this).val();
            var valid = /^\d{3}-\d{3}-\d{4}$/.test(val);
            if (valid) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Address autocomplete for Billing Address using geocoder.ca
        let addressTimer;
        $(document).on('input', '#billing-address', function() {
            clearTimeout(addressTimer);
            var input = $(this);
            var val = input.val().trim();
            if (val.length < 5) {
                $('#address-suggestions').remove();
                return;
            }
            addressTimer = setTimeout(function() {
                $.getJSON('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=' + encodeURIComponent(val), function(data) {
                    console.log('Nominatim API result:', data); // Debug log
                    $('#address-suggestions').remove();
                    if (data && data.length > 0) {
                        var list = $('<div id="address-suggestions" class="list-group position-absolute w-100" style="z-index:1000;"></div>');
                        data.forEach(function(place) {
                            var display = place.display_name;
                            var address = place.address || {};
                            var item = $('<button type="button" class="list-group-item list-group-item-action"></button>').text(display);
                            item.on('click', function() {
                                input.val(address.road || address.pedestrian || address.cycleway || address.footway || address.path || display).addClass('is-valid').removeClass('is-invalid');
                                $('#billing-city').val(address.city || address.town || address.village || '').addClass('is-valid').removeClass('is-invalid');
                                $('#billing-province').val(address.state || '').addClass('is-valid').removeClass('is-invalid');
                                $('#billing-postal').val(address.postcode || '').addClass('is-valid').removeClass('is-invalid');
                                if (address.country_code === 'ca') {
                                    $('#billing-country').val('Canada').addClass('is-valid').removeClass('is-invalid');
                                } else if (address.country_code === 'us') {
                                    $('#billing-country').val('United States').addClass('is-valid').removeClass('is-invalid');
                                } else if (address.country_code === 'mx') {
                                    $('#billing-country').val('Mexico').addClass('is-valid').removeClass('is-invalid');
                                } else {
                                    $('#billing-country').val('').removeClass('is-valid is-invalid');
                                }
                                $('#address-suggestions').remove();
                            });
                            list.append(item);
                        });
                        // Ensure parent is position-relative for dropdown visibility
                        input.closest('.mb-3, .position-relative').css('position', 'relative');
                        input.after(list);
                    } else {
                        console.log('No suggestions found for:', val);
                    }
                });
            }, 400);
        });
        $(document).on('blur', '#billing-address', function() {
            setTimeout(function() { $('#address-suggestions').remove(); }, 200);
        });
// Simple cart array
		let cart = {};

		// Load products from Fakestore API with fallback
		function loadProducts() {
            $.get('https://fakestoreapi.com/products')
                .done(function(products) {
                    renderProducts(products);
                })
                .fail(function() {
                    // Fallback to backup JSON
                    $.get('https://deepblue.camosun.bc.ca/~c0180354/ics128/final/fakestoreapi.json', function(products) {
                        renderProducts(products);
                    })
                    .fail(function() {
                        $('#loading-spinner').hide(); // Hide spinner if both fail
                    });
                });
        }

        // Currency logic
let currencyRates = { USD: 1, CAD: 1.35, GBP: 0.78 };
let currencySymbols = { USD: '$', CAD: 'C$', GBP: '£' };
let currentCurrency = 'USD';

function fetchCurrencyRates() {
    // Example using exchangerate.host (free, no API key required)
    $.get('https://api.exchangerate.host/latest?base=USD&symbols=USD,CAD,GBP', function(data) {
        if (data && data.rates) {
            currencyRates = data.rates;
        }
    });
}

function convertPrice(priceUSD) {
    return priceUSD * (currencyRates[currentCurrency] || 1);
}

function getCurrencySymbol() {
    return currencySymbols[currentCurrency] || '$';
}

// Add currency selector to offcanvas on page load
$(function() {
    const selector = `<div class="mb-3 mx-3"><label for="currency-select" class="form-label">Currency:</label>
        <select id="currency-select" class="form-select">
            <option value="USD">United States ($)</option>
            <option value="CAD">Canadian Dollar (C$)</option>
            <option value="GBP">British Pound (£)</option>
        </select></div>`;
    $('#cartOffcanvas .offcanvas-header').after(selector);
    fetchCurrencyRates();
});

$(document).on('change', '#currency-select', function() {
    currentCurrency = $(this).val();
    updateCatalogPrices();
    updateCart();
});

function updateCatalogPrices() {
    // Update product grid prices
    $('#product-grid .card').each(function() {
        const card = $(this);
        const id = card.find('.add-to-cart').data('id');
        const prod = productData[id];
        if (prod) {
            const converted = convertPrice(prod.price).toFixed(2);
            card.find('.card-text').first().text(getCurrencySymbol() + converted);
        }
    });
}

        function renderProducts(products) {
            products.forEach(function(product) {
                productData[product.id] = product;
                $('#product-grid').append(
                    `<div class="col">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${getCurrencySymbol()}${convertPrice(product.price).toFixed(2)}</p>
                                <p class="card-text">${product.description}</p>
                                <button class="btn btn-success add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">
                                    Add to Cart <span class="badge bg-warning text-dark ms-1" id="cart-badge-${product.id}">${cartItems[product.id] || 0}</span>
                                </button>
                            </div>
                        </div>
                    </div>`
                );
            });
            $('#loading-spinner').hide(); // Hide spinner after products are loaded
            document.getElementById('loading-spinner').style.display = 'none'; // Force hide spinner
            updateCart();
        }

        // Store product data for cart rendering
        let productData = {};

		// Cart object for cookie storage
		let cartItems = {};

		// Load cart from cookie on page load
		function loadCartFromCookie() {
        const data = get_cookie("shopping_cart_items");
        if (data) cartItems = data;

        }

		// Save cart to cookie
		function saveCartToCookie() {
		    set_cookie("shopping_cart_items", cartItems);
		}

        function updateCart() {
            const cartArray = Object.entries(cartItems);
            if (cartArray.length === 0) {
                $('#cart-items').html('<p>Your cart is empty.</p>');
                $('#cart-actions').html('');
                return;
            }
            let html = '<table class="table"><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th><th></th></tr></thead><tbody>';
            let total = 0;
            cartArray.forEach(function([id, qty], idx) {
                const prod = productData[id];
                if (!prod) return;
                const price = convertPrice(prod.price);
                const subtotal = price * qty;
                total += subtotal;
                html += `<tr>
                    <td>${prod.title}</td>
                    <td>${qty}</td>
                    <td>${getCurrencySymbol()}${price.toFixed(2)}</td>
                    <td>${getCurrencySymbol()}${subtotal.toFixed(2)}</td>
                    <td><button class="btn btn-sm btn-outline-danger remove-item" data-id="${id}" title="Remove"><span aria-hidden="true">&times;</span></button></td>
                </tr>`;
            });
            html += `</tbody></table><div class="mt-2"><strong>Subtotal: ${getCurrencySymbol()}${total.toFixed(2)}</strong></div>`;
            $('#cart-items').html(html);
            // Cart actions: Checkout and Remove All
            $('#cart-actions').html(`
                <div class="d-flex gap-2 mx-3 my-3">
                    <button class="btn btn-warning" id="remove-all-btn">Empty Cart</button>
                    <button class="btn btn-primary" id="checkout-btn">Checkout</button>
                </div>
            `);
            // Update badges on Add to Cart buttons
            Object.keys(productData).forEach(function(id) {
                const qty = cartItems[id] || 0;
                $("#cart-badge-" + id).text(qty);
            });
        }

        // Add product to cart with visual cue
        $(document).on('click', '.add-to-cart', function() {
            var product_id = $(this).attr('data-id');
            var cart_items = get_cookie("shopping_cart_items");
            if (cart_items === null) {
                cart_items = {};
            }
            if (cart_items[product_id] === undefined) {
                cart_items[product_id] = 0;
            }
            cart_items[product_id]++;
            set_cookie("shopping_cart_items", cart_items);
            cartItems = cart_items; // update local cartItems for display
            updateCart();
            // Visual cue: briefly highlight button
            var btn = $(this);
            btn.addClass('btn-success-active');
            setTimeout(function() { btn.removeClass('btn-success-active'); }, 500);
            // Open cart offcanvas automatically
            var cartOffcanvas = document.getElementById('cartOffcanvas');
            if (cartOffcanvas) {
                var bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvas);
                bsOffcanvas.show();
            }
        });

		// Remove product from cart
		$(document).on('click', '.remove-item', function() {
		    const id = $(this).data('id');
		    delete cartItems[id];
		    saveCartToCookie();
		    updateCart();
		    // Reset badge for this product to 0
		    $("#cart-badge-" + id).text(0);
		});

        // Remove all items from cart
        $(document).on('click', '#remove-all-btn', function() {
            cartItems = {};
            saveCartToCookie();
            updateCart();
            // Reset all Add to Cart badges to 0
            Object.keys(productData).forEach(function(id) {
                $("#cart-badge-" + id).text(0);
            });
        });

        // Checkout button: open Payment Method modal
        $(document).on('click', '#checkout-btn', function() {
            // Reset all forms and feedback
            $('#paymentModal input, #paymentModal select').val('');
            $('#paymentModal .is-invalid, #paymentModal .is-valid').removeClass('is-invalid is-valid');
            populateYearOptions();
            // Show first step only
            $('.step-content').addClass('d-none');
            $('#step-payment').removeClass('d-none');
            $('#checkout-steps .nav-link').removeClass('active');
            $('#step-payment-tab').addClass('active');
            var modal = new bootstrap.Modal(document.getElementById('paymentModal'));
            modal.show();
        });

        // Step navigation logic
        $(document).on('click', '#checkout-steps .nav-link', function() {
            var step = $(this).data('step');
            $('#checkout-steps .nav-link').removeClass('active');
            $(this).addClass('active');
            $('.step-content').addClass('d-none');
            $('#step-' + step).removeClass('d-none');
        });

        // Populate year options dynamically (current year + 10)
        function populateYearOptions() {
            var yearSelect = $('#card-exp-year');
            yearSelect.empty();
            yearSelect.append('<option value="">YYYY</option>');
            var now = new Date().getFullYear();
            for (var y = now; y <= now + 10; y++) {
                yearSelect.append(`<option value="${y}">${y}</option>`);
            }
        }

        // Card number format validation: 1111 2222 3333 4444
        function isValidCardNumber(num) {
            return /^\d{4} \d{4} \d{4} \d{4}$/.test(num.trim());
        }

        // Payment form validation on submit
        // Instant feedback for card number input
        // Instant feedback for expiration month
        $(document).on('change', '#card-exp-month', function() {
            if ($(this).val()) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Instant feedback for expiration year
        $(document).on('change', '#card-exp-year', function() {
            if ($(this).val()) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Instant feedback for security code
        $(document).on('input', '#card-cvc', function() {
            // Only allow up to 3 digits
            let val = $(this).val().replace(/\D/g, '');
            if (val.length > 3) val = val.slice(0, 3);
            $(this).val(val);
            if (val.length === 3) {
                $(this).addClass('is-valid').removeClass('is-invalid');
                $(this).next('.invalid-feedback').text('Enter a valid security code.');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
                $(this).next('.invalid-feedback').text('Security code must be exactly 3 digits');
            }
        });
        $(document).on('input', '#card-number', function() {
            var val = $(this).val();
            if (isValidCardNumber(val)) {
                $(this).addClass('is-valid').removeClass('is-invalid');
                $(this).next('.invalid-feedback').text('Please enter a valid card number.');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
                $(this).next('.invalid-feedback').text('Invalid Credit Card # - MC/VISA/Amex Accepted');
            }
        });
        $(document).on('submit', '#payment-form', function(e) {
            e.preventDefault();
            var valid = true;
            // Card number
            var cardNum = $('#card-number').val();
            if (!isValidCardNumber(cardNum)) {
                $('#card-number').addClass('is-invalid').removeClass('is-valid');
                $('#card-number').next('.invalid-feedback').text('Invalid format. Use 1111 2222 3333 4444');
                valid = false;
            } else {
                $('#card-number').addClass('is-valid').removeClass('is-invalid');
                $('#card-number').next('.invalid-feedback').text('Valid card number format.');
            }
            // Expiration month
            var expMonth = $('#card-exp-month').val();
            if (!expMonth) {
                $('#card-exp-month').addClass('is-invalid').removeClass('is-valid');
                valid = false;
            } else {
                $('#card-exp-month').addClass('is-valid').removeClass('is-invalid');
            }
            // Expiration year
            var expYear = $('#card-exp-year').val();
            if (!expYear) {
                $('#card-exp-year').addClass('is-invalid').removeClass('is-valid');
                valid = false;
            } else {
                $('#card-exp-year').addClass('is-valid').removeClass('is-invalid');
            }
            // Security code
            var secCode = $('#card-cvc').val();
            if (!/^\d{3}$/.test(secCode)) {
                $('#card-cvc').addClass('is-invalid').removeClass('is-valid');
                $('#card-cvc').next('.invalid-feedback').text('Security code must be exactly 3 digits');
                valid = false;
            } else {
                $('#card-cvc').addClass('is-valid').removeClass('is-invalid');
                $('#card-cvc').next('.invalid-feedback').text('Enter a valid security code.');
            }

            // Move to next step if valid
            if (valid) {
                $('#card-number, #card-exp-month, #card-exp-year, #card-cvc').addClass('is-valid').removeClass('is-invalid');
                // Switch to Billing Details tab and content
                $('#checkout-steps .nav-link').removeClass('active');
                $('#step-billing-tab').addClass('active');
                $('.step-content').addClass('d-none');
                $('#step-billing').removeClass('d-none');
            }
        });
        // Billing form: move to next step
        $(document).on('submit', '#billing-form', function(e) {
            e.preventDefault();
            // You can add validation here if needed
            $('#checkout-steps .nav-link').removeClass('active');
            $('#step-shipping-tab').addClass('active');
            $('.step-content').addClass('d-none');
            $('#step-shipping').removeClass('d-none');
        });

        // Shipping form: move to next step
        $(document).on('submit', '#shipping-form', function(e) {
            e.preventDefault();
            // You can add validation here if needed
            $('#checkout-steps .nav-link').removeClass('active');
            $('#step-confirm-tab').addClass('active');
            $('.step-content').addClass('d-none');
            $('#step-confirm').removeClass('d-none');
                renderOrderConfirmation();
        });

    // Render order confirmation summary with all cart items
    function renderOrderConfirmation() {
        const cartArray = Object.entries(cartItems);
        let html = `<h5>Order Confirmation</h5><p>Review your order and submit.</p>`;
        if (cartArray.length === 0) {
            html += '<p>Your cart is empty.</p>';
            $('#step-confirm').html(html);
            return;
        }
        html += `<div class="table-responsive"><table class="table"><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>`;
        let subtotal = 0;
        cartArray.forEach(function([id, qty]) {
            const prod = productData[id];
            if (!prod) return;
            const price = convertPrice(prod.price);
            const total = price * qty;
            subtotal += total;
            html += `<tr><td>${prod.title}</td><td>${qty}</td><td>${getCurrencySymbol()}${price.toFixed(2)}</td><td>${getCurrencySymbol()}${total.toFixed(2)}</td></tr>`;
        });
        html += `</tbody></table></div>`;
            // Shipping is 10% of subtotal
            const shipping = +(subtotal * 0.10).toFixed(2);
            // Tax rate by country
            let country = $('#billing-country').val() || 'Canada';
            let taxRate = 0.13; // Default Canada 13%
            if (country === 'United States') taxRate = 0.07;
            else if (country === 'Mexico') taxRate = 0.16;
            const tax = +(subtotal * taxRate).toFixed(2);
            const orderTotal = subtotal + shipping + tax;
            html += `<div class=\"mt-3\"><table class=\"table\"><tbody>`;
            html += `<tr><th>Subtotal</th><td>${getCurrencySymbol()}${subtotal.toFixed(2)}</td></tr>`;
            html += `<tr><th>Shipping (10%)</th><td>${getCurrencySymbol()}${shipping.toFixed(2)}</td></tr>`;
            html += `<tr><th>Tax (${(taxRate*100).toFixed(1)}% ${country})</th><td>${getCurrencySymbol()}${tax.toFixed(2)}</td></tr>`;
            html += `<tr><th>Order Total</th><td><strong>${getCurrencySymbol()}${orderTotal.toFixed(2)}</strong></td></tr>`;
            html += `</tbody></table></div>`;
        html += `<button type="button" class="btn btn-success" id="confirm-order-btn">Place Order</button>`;
        $('#step-confirm').html(html);
                    // Inject success modal if not present
                    if (!$('#order-success-modal').length) {
                            $('body').append(`
                            <div class=\"modal fade\" id=\"order-success-modal\" tabindex=\"-1\" aria-labelledby=\"orderSuccessLabel\" aria-hidden=\"true\">
                                <div class=\"modal-dialog\">
                                    <div class=\"modal-content\">
                                        <div class=\"modal-header\">
                                            <h5 class=\"modal-title text-success\" id=\"orderSuccessLabel\">Success!</h5>
                                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
                                        </div>
                                        <div class=\"modal-body\">
                                            <p>Your order was successfully placed!</p>
                                        </div>
                                        <div class=\"modal-footer\">
                                            <button type=\"button\" class=\"btn btn-primary\" data-bs-dismiss=\"modal\">Okay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `);
                    }
    }
		// Show spinner on page load
		$(function() {
            $('#loading-spinner').show();
            loadProducts();
            loadCartFromCookie();
            // Timeout failsafe: hide spinner after 5 seconds
            setTimeout(function() {
                $('#loading-spinner').hide();
                document.getElementById('loading-spinner').style.display = 'none';
            }, 5000);
        });
            // Submit order as JSON when Place Order is clicked
            $(document).on('click', '#confirm-order-btn', function() {
                // Collect all checkout data
                // --- Collect and validate all checkout data ---
                let errors = [];
                let card_number = ($('#card-number').val() || '').replace(/\s+/g, '');
                if (!/^\d{16}$/.test(card_number)) errors.push('Card number must be 16 digits, no spaces.');
                let expiry_month = $('#card-exp-month').val() || '';
                if (!/^\d{2}$/.test(expiry_month)) errors.push('Expiration month must be two digits.');
                let expiry_year = $('#card-exp-year').val() || '';
                if (!/^\d{4}$/.test(expiry_year)) errors.push('Expiration year must be four digits.');
                let security_code = $('#card-cvc').val() || '';
                if (!/^\d{3,4}$/.test(security_code)) errors.push('Security code must be 3 or 4 digits.');
                let currency = currentCurrency.toLowerCase();

                // Totals
                let subtotal = 0;
                let items = {};
                Object.entries(cartItems).forEach(([id, qty]) => {
                    const prod = productData[id];
                    if (!prod) return;
                    const price = convertPrice(prod.price);
                    subtotal += price * qty;
                    items[id] = {
                        title: prod.title,
                        qty: qty,
                        price: price.toFixed(2),
                        total: (price * qty).toFixed(2)
                    };
                });
                if (subtotal === 0) errors.push('Your cart is empty.');
                const shipping_amount = +(subtotal * 0.10).toFixed(2);
                let countryName = $('#billing-country').val() || 'Canada';
                let countryCode = 'ca';
                let taxRate = 0.13;
                if (countryName === 'United States') { countryCode = 'us'; taxRate = 0.07; }
                else if (countryName === 'Mexico') { countryCode = 'mx'; taxRate = 0.16; }
                const taxes = +(subtotal * taxRate).toFixed(2);
                const amount = +(subtotal + shipping_amount + taxes).toFixed(2);

                // Billing
                let billing = {
                    first_name: $('#billing-firstname').val() || '',
                    last_name: $('#billing-lastname').val() || '',
                    address_1: $('#billing-address').val() || '',
                    address_2: $('#billing-address2').val() || '',
                    city: $('#billing-city').val() || '',
                    province: $('#billing-province').val() || '',
                    country: countryCode,
                    postal: $('#billing-postal').val() || '',
                    phone: $('#billing-phone').val() || '',
                    email: $('#billing-email').val() || ''
                };
                // Validate billing fields
                Object.entries(billing).forEach(([key, val]) => {
                    if (key !== 'address_2' && !val) errors.push('Billing ' + key.replace('_',' ') + ' is required.');
                });
                // Remove address_2 if empty
                if (!billing.address_2) delete billing.address_2;
                if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(billing.email)) errors.push('Billing email is invalid.');
                if (!/^\d{3}-\d{3}-\d{4}$/.test(billing.phone)) errors.push('Billing phone must be in format 123-456-7890.');

                // Shipping
                let shipping = {};
                if ($('#shipping-same-billing').is(':checked')) {
                    shipping = {...billing};
                    delete shipping.email; // Only billing has email
                } else {
                    shipping = {
                        first_name: $('#shipping-firstname').val() || '',
                        last_name: $('#shipping-lastname').val() || '',
                        address_1: $('#shipping-address').val() || '',
                        address_2: $('#shipping-address2').val() || '',
                        city: $('#shipping-city').val() || '',
                        province: $('#shipping-province').val() || '',
                        country: countryCode,
                        postal: $('#shipping-postal').val() || ''
                    };
                    Object.entries(shipping).forEach(([key, val]) => {
                        if (key !== 'address_2' && !val) errors.push('Shipping ' + key.replace('_',' ') + ' is required.');
                    });
                    if (!shipping.address_2) delete shipping.address_2;
                }

                // If errors, show in modal and do not submit
                if (errors.length > 0) {
                    $('#order-success-modal .modal-title').text('Error!').removeClass('text-success').addClass('text-danger');
                    $('#order-success-modal .modal-body').html('<ul style="color:red">' + errors.map(e => '<li>'+e+'</li>').join('') + '</ul>');
                    var modal = new bootstrap.Modal(document.getElementById('order-success-modal'));
                    modal.show();
                    return;
                }

                // Build order JSON
                let orderData = {
                    card_number,
                    expiry_month,
                    expiry_year,
                    security_code,
                    amount: amount.toFixed(2),
                    taxes: taxes.toFixed(2),
                    shipping_amount: shipping_amount.toFixed(2),
                    currency,
                    items,
                    billing,
                    shipping
                };

                // Submit via AJAX
                $.ajax({
                    url: 'https://deepblue.camosun.bc.ca/~c0180354/ics128/final/',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(orderData),
                    success: function(response) {
                        // Show success modal
                        $('#order-success-modal .modal-title').text('Success!').removeClass('text-danger').addClass('text-success');
                        $('#order-success-modal .modal-body').html('<p>Your order was successfully placed!</p>');
                        var modal = new bootstrap.Modal(document.getElementById('order-success-modal'));
                        modal.show();
                        cartItems = {};
                        saveCartToCookie();
                        updateCart();
                        var paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
                        if (paymentModal) paymentModal.hide();
                    },
                    error: function(xhr) {
                        // Show detailed error in modal, guide user to fix
                        let msg = 'There was an error submitting your order.';
                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            msg = xhr.responseJSON.error;
                        } else if (xhr.responseText) {
                            msg += '<br><pre>' + xhr.responseText + '</pre>';
                        }
                        $('#order-success-modal .modal-title').text('Error!').removeClass('text-success').addClass('text-danger');
                        $('#order-success-modal .modal-body').html('<p>' + msg + '</p>');
                        var modal = new bootstrap.Modal(document.getElementById('order-success-modal'));
                        modal.show();
                    }
                });
            });