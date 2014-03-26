var _ = require('lodash'),
    React = require('react/addons');

function generateTemplateContext(options) {
    return {
        componentName: options.componentName,
        contextKey: options.contextKey,
        html: React.renderComponentToString(options.component(_.cloneDeep(options.props))),
        yield: options.yield
    };
}

function getContext(defaultComponents, mainComponentPath, props, callback) {
    var MainComponent = require('../../public/js/components/' + mainComponentPath),
        results = [];

    results.push(generateTemplateContext({
        component: MainComponent,
        componentName: mainComponentPath,
        contextKey: 'initialTemplateStr',
        props: props,
        yield: 'js-yield'
    }));

    for (var key in defaultComponents) {
        var defs = defaultComponents[key];

        results.push(generateTemplateContext({
            component: defs.component,
            componentName: key,
            contextKey: defs.contextKey,
            props: props,
            yield: defs.yield
        }));
    }

    var components = results.map(function(item) {
        return {
            componentName: item.componentName,
            yield: item.yield
        };
    });

    var context = {
        fastRender: {
            components: components,
            props: props
        }
    };

    results.forEach(function(item) {
        context[item.contextKey] = item.html;
    });

    return context;
};

module.exports = {
    react: function(defaultComponents) {
        return function(req, res, next) {
            res.renderComponent = function(componentPath, props, extraJadeContext) {
                props = props || {};

                props.request = {
                    path: req.path,
                    params: req.params,
                    qs: req.query,
                    url: req.url
                };

                var context = getContext(defaultComponents, componentPath, props);
                context = _.extend(context, extraJadeContext);

                return res.render('base', context);
            };

            next();
        }
    }
};
