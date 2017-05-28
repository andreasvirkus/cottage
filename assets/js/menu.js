(function() {
    function SVGMenu(el, options) {
        this.el = el;
        this.init();
    }

    SVGMenu.prototype.init = function() {
        this.trigger = this.el.querySelector('button.menu__handle');
        this.shapeEl = this.el.querySelector('div.morph-shape');

        var s = Snap(this.shapeEl.querySelector('svg'));
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
        var menu = this,
            isBlogPost,
            menuLinks = document.querySelectorAll('#menu .menu__link');

        menu.trigger.addEventListener('click', menu.toggle.bind(menu));

        // Close menu if opened and reassign current nav link
        [].forEach.call(menuLinks, function(menuLink) {
            menuLink.addEventListener('click', function(e) {
                menu.isOpen && menu.toggle();
            });
        })
        // document.addEventListener('pjax:complete', function() {
        //     menu.isOpen && menu.toggle();
        //
        //     isBlogPost = true;
        //
        //     // Loop through nav links, find one whose href matches page slug
        //     [].forEach.call(menuLinks, function(link) {
        //         link.parentElement.removeAttribute('aria-current');
        //
        //         if (link.getAttribute('href') === location.pathname) {
        //             link.parentElement.setAttribute('aria-current', 'page');
        //             isBlogPost = false;
        //         }
        //     });
        //
        //     if (isBlogPost) {
        //         document.getElementById('menu')
        //             .querySelector('[href="/thoughts/"]')
        //             .parentElement.setAttribute('aria-current', 'page');
        //     }
        // });
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
            'path': this.isOpen
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

    // new Pjax({
    //     selectors: ["title", "main"],
    //     cacheBust: false,
    //     switches: {
    //         'main': Pjax.switches.outerHTML
    //     }
    // });

})();
