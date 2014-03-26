/** @jsx React.DOM */
'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var React = require('react/addons');

    return React.createClass({
        render: function() {
            return (
                <div className="header jumbotron">
                    <h1>React + RxJS Autocomplete</h1>
                    <p>Now we have server-side rendering :)</p>
                </div>
            );
        }
    });
});

