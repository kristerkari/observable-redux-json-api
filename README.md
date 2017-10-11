# Observables + Redux + JSON API

[![Greenkeeper badge](https://badges.greenkeeper.io/kristerkari/observable-redux-json-api.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/kristerkari/observable-redux-json-api.svg?branch=master)](https://travis-ci.org/kristerkari/observable-redux-json-api)
[![Build status](https://ci.appveyor.com/api/projects/status/39y7dxu90yive4vb/branch/master?svg=true)](https://ci.appveyor.com/project/kristerkari/observable-redux-json-api/branch/master)

This library is intended for use in web applications build on Redux, which consumes data from a [JSON API](http://jsonapi.org/).

Use **observable-redux-json-api** to have one simple way of storing resource objects in Redux state along with it's CRUD API, which provides easy ways to create, read, update and delete resources.

**observable-redux-json-api** is a library based on [redux-json-api](https://github.com/stonecircle/redux-json-api) (big thanks to them).

The main difference is that instead of [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) it uses [RxJS Observables](http://reactivex.io/rxjs/) for all its [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) methods.

Observables give you better control of the network requests compared to promises. You can for example easily cancel or retry the requests using RxJS.

## Why should you use observable-redux-json-api instead of redux-json-api?

✓ Compatible with [Typescript](https://www.typescriptlang.org/) (includes type definitions).
✓ ECMAScript 5 compatible, no need to add polyfills for browsers that do not support ECMAScript 6.
✓ You can easily cancel or retry network requests using RxJS.
✓ Compatible with [redux-observable](https://redux-observable.js.org/).

# Table of contents
1. [Set-Up & Configure](docs/set-up-configure.md)
1. [API](docs/api.md)
