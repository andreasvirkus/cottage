(function() {
    function SVGMenu(el, options) {
        this.el = el;
        this.init();
    }

    SVGMenu.prototype.init = function() {
        this.trigger = this.el.querySelector('button.menu__handle');
        this.shapeEl = this.el.querySelector('div.morph-shape');

        var s = Snap( this.shapeEl.querySelector('svg'));
        this.pathEl = s.select('path');
        this.paths = {
            reset : this.pathEl.attr('d'),
            open : this.shapeEl.getAttribute('data-morph-open'),
            close : this.shapeEl.getAttribute('data-morph-close')
        };

        this.isOpen = false;

        this.initEvents();
    };

    SVGMenu.prototype.initEvents = function() {
        this.trigger.addEventListener('click', this.toggle.bind(this));
    };

    SVGMenu.prototype.toggle = function() {
        var self = this;

        if (this.isOpen) {
            self.el.classList.remove('menu--anim');
            setTimeout(function() {
                self.el.classList.remove('menu--open');
            }, 250);
        } else {
            self.el.classList.add('menu--anim');
            setTimeout(function() {
                self.el.classList.add('menu--open');
            }, 250);
        }

        this.pathEl.stop().animate({
            'path' : this.isOpen
                ? this.paths.close
                : this.paths.open
            }, 350, mina.easeout, function() {
                self.pathEl.stop().animate({ 'path' : self.paths.reset },
                    800,
                    mina.elastic
                );
            });

        this.isOpen = !this.isOpen;
    };

    new SVGMenu(document.getElementById('menu'));
})();
