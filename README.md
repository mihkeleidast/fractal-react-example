# Fractal demo with React (and TypeScript)

### Developing front-end styleguide
Run `npm run dev`. This will compile all assets, start a local server, and starts watching for changes.

### Building styleguide
Run `npm run build`. This will build a static styleguide to `app/styleguide/build`.


# Some notes

This project is using our custom [Nighthawk](https://github.com/gtap-dev/nighthawk) theme. But it should work with any theme.

In addition, this project is using our custom [tsx adapter](https://github.com/gtap-dev/fractal-tsx-adapter). This is necessary for our current server-side rendering.

Also, this project is using TypeScript so it adds a bit of extra complexity on top of all the React stuff. But it's 2018, and TypeScript support would be very good. For example, this project uses the `compilerOptions.paths` option in `tsconfig.json` to properly resolve the `@component` module imports & it's regenerated every time a component is added/removed.

## Handling of URLs on the server

For an example, see the `getHref` method in `src/patterns/components/icon/icon.tsx`.

In order to get proper URLs from the server, we need to define a variable in the adapter & use that URL, because we don't use the webpack bundle on the server.

If we could figure out a way to use the webpack bundle on the server, it would simplify this a lot.

## Demoing components with children

For an example, see `src/patterns/components/typography/typography.tsx` and `src/patterns/components/typography/typography--example.tsx`.

Note that this is a very simple example, but if there are components that are using the composition model, it will get a bit weird fast - there will be a lot of empty pages with nothing to see, and one "example" page that actually demos the component in action.

Currently, there's no way to pass JSX children through the config (even though this project is using JSON config files, it's also not possible with JS config files, since Fractal flattens the config to JSON anyway).

A possible solution for this would be to have Fractal's context resolver as a separate module (and not have it flatten everything down to JSON). Then we could import the config as a static property to the component and get the context from there. It's probably possible to also have a webpack plugin that then removes it from the production bundle that's passed to the app.

## Rehydrating the components on the client

For an example, see the `getHydrateScript` method in `src/core/preview/preview.tsx`.

Currently, we have to inline the context in the preview for hydration. I guess there's no way around some kind of inline script, but not having the context inline would be a big plus.

A possible solution for this might also be having the resolved context in the bundle, like in the previous section. Then we would have to figure out the best structure to get the correct variant's context.

## Collated components

This project is using a custom theme that outputs the collated components differently - each variant is outputted to it's own iframe, so the issue is not that clear. But the default collated view is definitely not working (the URLs should still be working, so it can be looked at).

I don't really like the default collated structure of Fractal anyways (using a theme like this for all projects), so it's not a big issue for me, but it could be improved.



## Thoughts? File an issue :)
