'use strict';

/**
 * Require the Fractal module
 */
const fractal        = module.exports = require('@frctl/fractal').create();
const pkg            = require('./package.json');
const nighthawkTheme = require('@gotoandplay/nighthawk');
const tsxAdapter     = require('@gotoandplay/fractal-tsx-adapter');

/**
 * Give your project a title.
 */
fractal.set('project.title', 'Project Web Style Guide');
fractal.set('project.version', pkg.version);

/**
 * Tell Fractal where to look for components.
 */
fractal.components.engine(tsxAdapter);
fractal.components.set('path', 'src/patterns');
fractal.components.set('title', 'Patterns');
fractal.components.set('default.preview', '@preview');
fractal.components.set('statuses', {
    prototype: {
        key: "prototype",
        label: "Prototype",
        description: "Do not implement."
    },
    wip: {
        key: "wip",
        label: "WIP",
        description: "Work in progress. Implement with caution."
    },
    ready: {
        key: "ready",
        label: "Ready",
        description: "Ready to implement."
    }
});
fractal.components.set('default.status', null);
fractal.components.set('ext', '.tsx');

/**
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
    open: true
});
fractal.web.set('static.path', 'app/styleguide/public');
fractal.web.set('builder.dest', 'app/styleguide/build');

fractal.web.theme(nighthawkTheme());
