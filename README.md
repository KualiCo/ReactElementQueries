Element Queries
---------------

Element queries allow component to respond based on their parent container. They are similar to media queries. However, instead of doing queries against the device (or viewport), we perform queries
against the parent container. This allows the component do respond different based on whether it is in a side bar, versus the main container of a page. This allows for components that are not only responsive for different devices, but also responsive to their context.

For more information, see [Why Element Queries Matter](http://hugogiraudel.com/2014/04/22/why-element-queries-matter/)


Installation
------------

    npm install --save easy-cursors

Example
-------

See [index.jsx](./example/index.jsx) in the example directory.

Usage
-----



API
---

##### `state(data:Object):State`

Create a state object with starting data.

    var cursors = require('easy-cursors')

    var state = cursors.state({
      people: [{name: "bob"}]
    })

### State

##### `onUpdate(callback:Function)`

Triggers when any cursor in the state is updated. Useful for calling render.

    state.onUpdate(render)

##### `offUpdate(callback:Function)`