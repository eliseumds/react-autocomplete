/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: '/js',
    paths: {
        'lodash': '../vendor/lodash/dist/lodash.min',
        'react/addons': '../vendor/react/react-with-addons',
        'rx': '../vendor/rxjs/rx.lite',
    },
    urlArgs: 'bust=' + (+new Date())
});

requirejs(['app']);
