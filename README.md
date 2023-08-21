<h1 align="center">Ultimate CSR Boilerplate</h1>

This project implements the optimizations that were demonstrated in my [case study](https://github.com/theninthsky/client-side-rendering).

Fully abiding by this boilerplate's requirements grants you the following features:

- [Extreme vendors splitting for better cache persistence](https://github.com/theninthsky/client-side-rendering#caching)
- [Code-splitting](https://github.com/theninthsky/client-side-rendering#code-splitting)
- [Preloading of current page scripts](https://github.com/theninthsky/client-side-rendering#preloading-async-pages)
- [Prefetching of all scripts for instant navigation](https://github.com/theninthsky/client-side-rendering#prefetching-async-pages)
- [Preloading of data](https://github.com/theninthsky/client-side-rendering#preloading-data)
- [Prerendering for perfect SEO](https://github.com/theninthsky/client-side-rendering#prerendering)

To watch all of these features in action, visit https://client-side-rendering.pages.dev.

## Requirements

Tools that optimize for performance usually require the developer to follow a set of rules to "help" them do it.

For example: Next.js requires you to use its file-based router in order to be able to apply automatic code-splitting and other optimizations, and modern frameworks require the use of signals (which sometimes feel a little unintuitive) to skip full-tree renders.

This boilerplate is no exception, thus it requires **two** things in order to fully apply its optimizations:

1. **Lazily loading all pages and giving them unique names**.
2. **Maintaining the _[pages-manifest](src/pages-manifest.json)_. A file that specifies the chunk names, paths and data to preload**.

### Naming Async Chunks (Pages)

Async chunks can be easily named using [Webpack's magic comments](https://webpack.js.org/api/module-methods/#magic-comments):

_[App.tsx](src/App.tsx)_

```js
const Home = lazy(() => import(/* webpackChunkName: 'home' */ 'pages/Home'))
const LoremIpsum = lazy(() => import(/* webpackChunkName: 'lorem-ipsum' */ 'pages/LoremIpsum'))
```

This will create both `home.[hash].js` and `lorem-ipsum.[hash].js` files (instead of the default, cryptic, `[id].[hash].js` files).

### The Pages Manifest File Structure

To easily describe what properties should be in the _pages-manifest_ JSON file, we'll use a typescript-like definition:

_[pages-manifest.json](src/pages-manifest.json)_

```js
[
  {
    "chunk": string,
    "path": string,
    "data"?: [
      {
        "url": string,
        "dynamicPathIndexes"?: number[],
        "crossorigin"?: string,
        "preconnectURL"?: string
      }
    ]
  }
]
```

`chunk` is the unique page name we chose via magic comments.

`path` is the pathname of the page (like `/`, `/about`, `/posts`...).

`data` can be supplied if the page has dynamic data that will be fetched right when it loads.

`url` is the data API URL.

`dynamicPathIndexes` is for cases where the data endpoint is dynamic and depends on the pathname (such as `https://api.my-site.post/{id}`).
<br>
In such cases, the `url` should contain `$` signs for all dynamic parameters and this property should specify their indexes in the `path`.

For example, if the `path` is `https://my-ecommerce-site/:category/:id` and the endpoint is `https://api.my-ecommerce-site/{id}/{category}`, then:

```
{
  "path": "https://my-ecommerce-site/:category/:id",
  "data": [
    "url": "https://api.my-ecommerce-site/$/$",
    "dynamicPathIndexes": [3, 2]
  ]
}
```

The logic is as follows: put the third element of the pathname in the first placeholder (`$`) and the second element of the pathname in the second placeholder (`$`).

`crossorigin` is for _[CORS-enabled fetches](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload#cors-enabled_fetches)_.

`preconnectURL` is for cases where the fetch request will be followed by requests to resources from a different origin.
