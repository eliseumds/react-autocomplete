/** @jsx React.DOM */
'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var React = require('react/addons');

    return React.createClass({
        render: function() {
            return (
                <div className="footer">
                    <hr />
                    Repo: <a href="https://github.com/eliseumds/react-autocomplete">https://github.com/eliseumds/react-autocomplete</a>
                </div>
            );
        }
    });
});

