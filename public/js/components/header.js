/** @jsx React.DOM */
'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var React = require('react/addons');

    return React.createClass({
        render: function() {
            return (
                React.DOM.div( {className:"header jumbotron"}, 
                    React.DOM.h1(null, "React + RxJS Autocomplete"),
                    React.DOM.p(null, "Now we have server-side rendering :)")
                )
            );
        }
    });
});

