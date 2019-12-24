import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Produtos from './Produtos';
import ProdutosEdit from './ProdutosEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/produtos' exact={true} component={Produtos}/>
		  <Route path='/produto/:id' component={ProdutosEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;