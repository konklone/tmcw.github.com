window.setTimeout(function() {
    var links = document.getElementsByTagName('A');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href.indexOf('amazon.com') !== -1) {
            links[i].setAttribute('href', href + '?tag=workingideala-20');
        }
    }
}, 500);
