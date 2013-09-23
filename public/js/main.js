(function($) {
    /**
     * Overlay toggle
     */
    window.DoCheckView = Backbone.View.extend({
        el : ".doCheck",
        overlay: null,

        template : _.template($('#doCheck-template').length > 0 ? $('#doCheck-template').html() : ''),

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

        removeOverlay: function(e) { //on click outside .checklist-container, on esc keypress and on clicking the close button
            console.log(e.keyCode);
            var that = this;
            if (e.keyCode === 27) {    //esc key
                that.remove();
            }
        }
    });

    /**
     * Overlay
     */
    window.OverlayView = Backbone.View.extend({
        el : "#checkOverlay",
        numChecked: 0,

        template : _.template($('#checkOverlay-template').length > 0 ? $('#checkOverlay-template').html() : ''),

        render: function() {
            $("body").animate({ scrollTop: 0 }, '500');
            $(this.el).html(this.template());

            $(this.el).find(".checklist-container").append($(".checklist > *"));

            return this;
        },

        events: {
            'click li': 'clickIndicate'
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
        }
    });

    /**
     * Initialize the app
     */
    window.overlay = new checkOverlay();

})(window.jQuery);