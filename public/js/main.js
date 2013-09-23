(function($) {
    /**
     * Overlay toggle
     */
    window.DoCheckView = Backbone.View.extend({
        el      : ".doCheck",
        overlay : null,
        template: _.template($('#doCheck-template').length > 0 ? $('#doCheck-template').html() : ''),

        initialize: function(options) {
            this.overlay = options.overlay;
        },

        render: function() {
            $(this.el).html(this.template());

            return this;
        },

        events: {
            'click .check-it' : 'toggleOverlay'
        },

        toggleOverlay: function(e) {
            e.preventDefault();
            this.overlay.render();
        },

        hideOverlay: function() {
            this.overlay.hideOverlay();
        }
    });

    /**
     * Overlay
     */
    window.OverlayView = Backbone.View.extend({
        el        : "#checkOverlay",
        numChecked: 0,
        template  : _.template($('#checkOverlay-template').length > 0 ? $('#checkOverlay-template').html() : ''),

        render: function() {
            $(this.el).html(this.template()).show();

            $(this.el).find(".checklist-container").prepend($(".checklist > *").clone());

            return this;
        },

        events: {
            'click li': 'clickIndicate',
            'click .close': 'hideOverlay'
        },

        clickIndicate: function(e) {
            if (! $(e.target).hasClass("is-checked")) {
                var blinkInterval = setInterval(function() {
                    $(e.target).toggleClass("is-checked");
                }, 55);

                setTimeout(function() {
                    clearInterval(blinkInterval);
                }, 275);
            }

            $(e.target).toggleClass("is-checked");

            this.numChecked += $(e.target).hasClass("is-checked") ? 1 : -1;

            if (this.numChecked === $(this.el).find(".checklist-container li").length) {
                $(".found-suitable").removeClass("hidden");
                $(".checklist-container").scrollTop(1000);
            } else {
                if (! $(".found-suitable").hasClass("hidden")) {
                    $(".found-suitable").addClass("hidden");
                }
            }
        },

        hideOverlay: function() {
            $(this.el).hide();
            return this;
        }
    });

    /**
     * Check overlap app
     **/
    window.checkOverlay = Backbone.View.extend({
        /**
         * Requires the rosterId.
         * Will start fetching the roster entity which will then cascade into
         * further user and timeslot fetches
         */
        initialize : function()
        {
            var newCheckOverlay = new OverlayView();
            var newDoCheck = new DoCheckView({overlay: newCheckOverlay});
            newDoCheck.render();

            $('body').keyup(function(e) {
                if (e.which == 27){
                    newDoCheck.hideOverlay();
                }
            });
        }
    });

    /**
     * Initialize the app
     */
    window.overlay = new checkOverlay();

})(window.jQuery);