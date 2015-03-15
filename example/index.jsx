const React = require('react')
const ElementQueryMixin = require('../src/index')

const App = React.createClass({
  render() {
    return <div className="container-fluid"><ElementQueryDemo/></div>
  }
})

function render() {
  React.render(
    <App/>,
    document.getElementById('content')
  )
}

const ElementQueryDemo = React.createClass({
  displayName: 'ElementQueryDemo',
  render() {
    return (<div style={{marginBottom: 50}}>
      <h1>Element Query Demo</h1>
      <ElementQueryStyleDemo/>
      <ElementQueryTableDemo/>
      <ElementQueryCardDemo/>
    </div>
    )
  }
})

const ElementQueryStyleDemo = React.createClass({
  displayName: 'ElementQueryStyleDemo',
  render() {
    return (<div>
      <h2>Changing Styles</h2>
      <p>Colors change ever 200px below 900px</p>
      <ColorBar/>
      <p>Color bar in 400px container</p>
      <div style={{width: 400}}>
        <ColorBar/>
      </div>
    </div>
    )
  }
})

const ColorBar = React.createClass({
  displayName: 'ColorBar',
  mixins: [ElementQueryMixin],
  getEqPoints() {
    return {
      blue: 900,
      red: 700,
      green: 500,
      orange: 1
    }
  },
  render() {
    const style = {
      width: '100%',
      height: '100px',
      padding: 30,
      backgroundColor: this.state.eqState
    }

    return <div style={style}>Watch the colors!</div>
  }
})

const ElementQueryTableDemo = React.createClass({
  displayName: 'ElementQueryTableDemo',
  mixins: [ElementQueryMixin],
  getEqPoints() {
    return {
      table: 900
    }
  },
  render() {
    return (<div>
      <h2>Responsive Table</h2>
      <p>Break point at 900px</p>
      {this.state.eqState == 'table' && <table className="table">
        <thead>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </thead>
        <tr>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
        </tr>
      </table>}
      {this.state.eqState != 'table' && <ul>
        <li>Header 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        <li>Header 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        <li>Header 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
      </ul>}
    </div>
    )
  }
})

const ElementQueryCardDemo = React.createClass({
  displayName: 'ElementQueryCardDemo',
  render() {
    return (<div>
      <h2>Responsive Card</h2>
      <p>Large image appears when card is wider than 400px and taller than 200px</p>
      <div style={{width: '50%', height: '400px', marginBottom: 10}}>
        <KittyCard/>
      </div>
      <div style={{width: '200px'}}>
        <KittyCard/>
      </div>
      <div style={{width: '450px', height: '180px'}}>
        <KittyCard/>
      </div>
    </div>
    )
  }
})

const KittyCard = React.createClass({
  displayName: 'KittyCard',
  mixins: [ElementQueryMixin],
  getEqPoints() {
    return {
      width: {
        full: 400
      },
      height: {
        full: 200
      }
    }
  },
  render() {
    return (<div style={{height: '100%'}} className="card primary">
      {this.state.eqWState == 'full' && this.state.eqHState == 'full' &&
      <img style={{width: '100%'}} src="http://placekitten.com/g/400/200"/>}
      <div className="card-divider">
        {(this.state.eqWState != 'full' || this.state.eqHState != 'full') &&
        <img style={{width: 25, height: 15, marginRight: 10}} src="http://placekitten.com/g/400/200"/>}
        I'm so cute!
      </div>
      <div className="card-section">
        <h4>Look at This Swag Card</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi iusto reprehenderit
          voluptatem odio deleniti provident aliquam qui magnam aspernatur necessitatibus.</p>
      </div>
    </div>
    )
  }
})

render()

