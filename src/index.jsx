const React = require('react')
const {debounce} = require('lodash')

/**
 * Mixin which provides element queries for the component.
 *
 *
 *
 * @see http://fourword.fourkitchens.com/article/use-element-queries-today-eqjs
 */
export default {
  getInitialState() {
    return {
      eqState: '',
      eqWState: '',
      eqHState: ''
    }
  },

  getNormalizedEqPoints() {
    const eqPts = this.getEqPoints ? this.getEqPoints() : null
    if (!eqPts) {
      return null
    }

    let eqWPts = null
    let eqHPts = null
    if (eqPts.width) {
      eqWPts = eqPts.width
    }
    else if (!eqPts.height) {
      eqWPts = eqPts
    }
    if (eqPts.height) {
      eqHPts = eqPts.height
    }
    return [eqWPts, eqHPts]
  },

  runEqQueries() {
    const getActiveState = (points, currentValue) => {
      const sortedKeys = Object.keys(points).sort((a, b) => {
        return points[b] - points[a]
      })

      let currentState = ''
      for (var j = 0; j < sortedKeys.length; j++) {
        const eqState = sortedKeys[j]
        const pointValue = points[eqState]
        if (currentValue >= pointValue) {
          currentState = eqState
          break
        }
      }
      return currentState
    }

    const [eqWPts, eqHPts] = this.getNormalizedEqPoints()

    let updatedState = {}
    if (eqWPts) {
      const eqState = getActiveState(eqWPts, this.getDOMNode().offsetWidth)
      updatedState.eqState = eqState
      updatedState.eqWState = eqState
    }
    if (eqHPts) {
      const eqState = getActiveState(eqHPts, this.getDOMNode().offsetHeight)
      updatedState.eqHState = eqState
    }
    this.setState(updatedState)
  },

  componentDidMount() {
    this.runEqQueries()
    window.addEventListener('resize', debounce(this.runEqQueries, 100))
  },

  componentWillUnmount() {
    window.removeListener('resize', debounce(this.runEqQueries, 100))
  }

}