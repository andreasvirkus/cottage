(function() {
    var main = document.querySelectorAll('main')[0], // Selector to load
        state = history.state || location.pathname,
        navLinks = document.querySelectorAll('header a');

    [].forEach.call(navLinks, function(e) {
        e.addEventListener('click', toggleActive);
    });

    // Browser's native back button
    window.addEventListener('statechange', function() {
        state = history.state || location.pathname; // Find out what we previously loaded
        main.classList.add('loading-content');

        // TODO: use events instead of arbitrary timeouts
        setTimeout(function () {
            // $content.load(state.url + ' #primary');
            console.log('Loading content from', state.url);
            loadContent(main, state.url);
        }, 200);
        setTimeout(function () {
            main.classList.remove('loading-content');
        }, 400);
    });

    function toggleActive(e) {
        e.preventDefault();

        var href = this.getAttribute('href');

        this.parentElement.querySelectorAll('a').classList.remove('active');
        this.parentElement.classList.add('active');

        history.pushState(null, document.title, href); // change the url and add our ajax request to our history
    }

    function loadContent(el, path) {
        // TODO: Retrieve <main> contents and swap outerHTML
    }

    function contentRequest(location, callback) {
        var request = new XMLHttpRequest()

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    callback(request.responseText, request)
                } else {
                    callback(null, request)
                }
            }
        }

        request.open("GET", location, true)
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        request.send(null)
        return request
    }
}());
