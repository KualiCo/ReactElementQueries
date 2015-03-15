const React = require('react')
const {forIn} = require('lodash')

/**
 * Mixin which provides element queries for the component.
 *
 * Call matchMedia to run an element query. This will setup a listener that will update the component's
 * state whenever the query result changes.
 *
 * @see http://www.backalleycoder.com/2014/04/18/element-queries-from-the-feet-up/
 */
export default {
  getInitialState() {
    return {
      queries: [],
      mqls: {}
    }
  },

  matchMedia(query) {
    if (this.state.mqls[query]) {
      return this.state.mqls[query].matches
    }

    // since this can be called during render and we can't update state, need to
    // run on next tick. Adding a little delay due to quirk with firefox
    setTimeout(() => {
      if (this.isMounted()) {
        this.runQuery(query)
      }
      else {
        // hold query for evaluation on component mount
        let queries = this.state.queries
        queries.push(query)
        this.setState({queries: queries})
      }
    }, 10)
    return false
  },

  runQuery(query) {
    const probeNode = this.refs.sensor.getDOMNode()
    if (probeNode.contentDocument) {
      const window = probeNode.contentDocument.defaultView
      const mql = window.matchMedia(query)
      mql.addListener(this.handleMediaChange(query))
      this.saveMediaQueryList(query, mql)
    }
  },

  saveMediaQueryList(query, mql) {
    let mqls = this.state.mqls
    mqls[query] = mql
    this.setState({mqls: mqls})
  },

  handleMediaChange(query) {
    return (mql) => this.saveMediaQueryList(query, mql)
  },

  componentDidMount() {
    this.state.queries.forEach(query => this.runQuery(query))
  },

  componentWillUnmount() {
    forIn(this.state.mqls, (mql, query) => mql.removeListener(this.handleMediaChange(query)))
  },

  getEQSensor() {
    return <object ref="sensor" style={{width: '100%', height: 0}} type="text/html" data="about:blank">
    </object>
  }
}