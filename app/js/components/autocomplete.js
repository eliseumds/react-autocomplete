/** @jsx React.DOM */

define(['api/search', 'mixins/event_observable'], function(search, EventObservableMixin) {
    return React.createClass({
        mixins: [EventObservableMixin],
        ensureHighlightedVisible: function() {
            if (!this.refs.list || this.state.highlightedIndex < 0) return;

            var $list = $(this.refs.list.getDOMNode()),
                $highlighted = $list.children().eq(this.state.highlightedIndex);

            return $list.scrollTop($list.scrollTop() + $highlighted.position().top - $list.height() / 2 + $highlighted.height() / 2);
        },
        focused: false,
        getInitialState: function() {
            return {
                data: [],
                hideList: true,
                highlightedIndex: -1,
                loading: false,
                selected: null
            };
        },
        getSubjects: function() {
            return {
                keyUp: new Rx.Subject()
            }
        },
        onBlur: function() {
            this.focused = false;
            this.selectItem(this.state.selected);
        },
        onFocus: function() {
            this.focused = true;
        },
        onKeyDown: function(event) {
            var code = event.keyCode,
                highlightedIndex = this.state.highlightedIndex;

            switch (code) {
                case 13:
                    this.selectItem(this.state.data[this.state.highlightedIndex]);
                    break
                case 40:
                    highlightedIndex < this.state.data.length - 1 && (highlightedIndex += 1);
                    break
                case 38:
                    highlightedIndex > -1 && (highlightedIndex -= 1);
                    break
            };

            this.setState({ highlightedIndex: highlightedIndex });
            highlightedIndex > -1 && this.ensureHighlightedVisible();

            if (code === 13 || code === 40 || code === 38) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onSelect: function(item) {
            this.selectItem(item);
        },
        getStreams: function() {
            var s = this.subjects;

            function map(item) {
                return {
                    label: item,
                    value: item
                }
            }

            s.keyUp
                .map(function(event) {
                    return event.target.value;
                })
                .throttle(400)
                .filter(function(value) {
                    if (this.state.selected && this.state.selected.label === value) {
                        this.stop = false;
                        return false;
                    }

                    var cond = !this.stop && value && value.length > 2;
                    this.stop = false;

                    return cond;
                }, this)
                .distinctUntilChanged()
                .do(function() {
                    this.stop = false;

                    this.setState({
                        hideList: false,
                        highlightedIndex: -1,
                        loading: true
                    });
                }.bind(this))
                .flatMapLatest(function(value) {
                    return search(value).map(function (data) { return data[1] });
                }, this)
                .filter(function() {
                    if (!this.focused) {
                        this.setState({
                            loading: false,
                            hideList: true
                        });
                    }

                    return this.focused;
                }, this)
                .do(function() {
                    this.setState({ loading: false });
                }.bind(this))
                .subscribe(function(resp) {
                    if (!this.focused) return;

                    this.resetListScroll();
                    this.setState({ data: resp.map(map) });
                }.bind(this));

            return {};
        },
        render: function() {
            var s = this.state;

            return (
                React.DOM.div( {className:'autocomplete ' + (s.loading && 'loading')}, 
                    React.DOM.h3(null, "Search Wikipedia:"),
                    React.DOM.input(
                        {ref:"searchInput",
                        type:"search",
                        size:"50",
                        onFocus:this.onFocus,
                        onBlur:this.onBlur,
                        onKeyDown:this.onKeyDown,
                        onKeyUp:this.handlers.keyUp} ),

                    React.DOM.div( {className:'autocomplete__result ' + (s.hideList && 'hide')}, 
                        s.data && s.data.length
                            ? (
                                React.DOM.ul( {ref:"list"}, 
                                    s.data.map(function(item, i) {
                                        return React.DOM.li(
                                            {onMouseDown:this.onSelect.bind(this, item),
                                            className:s.highlightedIndex === i && 'active',
                                            key:i,
                                            'data-value':item.value}, item.label);
                                    }.bind(this))
                                )
                            )
                            : React.DOM.div( {className:"autocomplete__empty"}, s.loading ? 'Carregando' : 'Nenhum resultado')
                        
                    )
                )
            );
        },
        resetListScroll: function() {
            this.refs.list && (this.refs.list.getDOMNode().scrollTop = 0);
        },
        stop: false,
        selectItem: function(item) {
            this.resetListScroll();
            this.setState({ data: [], hideList: true, selected: item });

            if (item) {
                this.refs.searchInput.getDOMNode().value = item.label;
            }

        }
    });
});

