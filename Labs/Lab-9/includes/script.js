jQuery(document).ready(function() {
    jQuery("#login-button").on("click", function(event) {
        event.preventDefault();
        // keep track of the form validity
        let validity = true;

        // validate the email field
        if (jQuery("#login-email").val() === "") {
            jQuery("#login-email").addClass("is-invalid");
            jQuery("#login-email").removeClass("is-valid");
            let tooltip = new bootstrap.Tooltip('#login-email', {
                title: "Email cannot be blank"
            });
            validity = false;
        } else {
            jQuery("#login-email").removeClass("is-invalid");
            jQuery("#login-email").addClass("is-valid");
            if (jQuery("#login-email").tooltip !== undefined) {
                jQuery("#login-email").tooltip("dispose");
            }
        }

        // validate the password field
        if (jQuery("#login-password").val() === "") {
            jQuery("#login-password").addClass("is-invalid");
            jQuery("#login-password").removeClass("is-valid");
            let tooltip = new bootstrap.Tooltip('#login-password', {
                title: "Password cannot be blank"
            });
            validity = false;
        } else {
            jQuery("#login-password").removeClass("is-invalid");
            jQuery("#login-password").addClass("is-valid");
            if (jQuery("#login-password").tooltip !== undefined) {
                jQuery("#login-password").tooltip("dispose");
            }
        }

        // exit if form is invalid
        if (!validity) {
            return false;
        }

        // Spin the icon and disable the button
        jQuery("#login-spinner").addClass("spin").css("display", "inline-block");
        jQuery("#login-button").attr("disabled", true);

        // Animate the modal opacity
        jQuery("#loginModal").animate({ opacity: 0 }, 2000, function() {
            // Hide modal
            jQuery("#loginModal").modal("hide");
            // Hide login button
            jQuery("#part-1").hide();
            // Show part 2
            jQuery("#part-2").show();
        });
    });

    // 1. Add the "outlined" CSS class to each of the 3 boxes
    jQuery('.box').addClass('outlined');

    // 2. Toggle background-color CSS attribute on all boxes
    jQuery('#button_toggle_colors').on('click', function() {
        jQuery('.box').each(function() {
            // Toggle between teal and default
            if (jQuery(this).css('background-color') === 'rgb(0, 128, 128)') {
                jQuery(this).css('background-color', '');
            } else {
                jQuery(this).css('background-color', 'teal');
            }
        });
    });

    // 3. Add/Remove round-edge class on all boxes (fix: use 'rounded-box' class)
    jQuery('#button_toggle_roundedges').on('click', function() {
        jQuery('.box').toggleClass('rounded-box');
    });

    // 4. Add a new box with unique id, sharp edges, and white background
    jQuery('#button_add_box').on('click', function() {
        var numBoxes = jQuery('.box').length;
        var newId = 'box' + (numBoxes + 1);
        var $newBox = jQuery('<div></div>', {
            'class': 'box outlined',
            'id': newId,
            'css': {
                'background': '#fff',
                'border-radius': '0'
            }
        });
        jQuery('#boxes').append($newBox);
    });
});
