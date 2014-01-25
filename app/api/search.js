define(function() {
    return function(term) {
        var promise = $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            dataType: 'jsonp',
            data: {
                action: 'opensearch',
                format: 'json',
                search: encodeURI(term)
            }
        }).promise();
        return Rx.Observable.fromPromise(promise);
    };
});
