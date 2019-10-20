## Registering provider

Like any other provider, you need to register the provider inside `start/app.js` file.

```js
const providers = [
  ...
  'adonisjs-sse/providers/ServerSentEventsProvider',
]
```
## Registering middleware

Register the following middleware inside `start/kernel.js` file. 

>You can optionally place the sse middleware after the 'Adonis/Middleware/AuthInit' middleware

```js
const globalMiddleware = [
  ...
  'Adonis/Middleware/AuthInit',
  'Adonis/Middleware/EventSourceWatcher'
]
```
>Or alternatively setup the middleware as a named (use any name you feel like) middleware inside `start/kernel.js` file.

```js

const namedMiddleware = {
  eventsource: 'Adonis/Middleware/EventSourceWatcher'
}

```

## Config

The configuration is saved inside `config/sse.js` file. Tweak it accordingly.

## Docs

To find out more, read the docs [here](https://github.com/stitchng/adonis-sse).
