import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom"

import Product from './components/products.jsx'
import Order from './components/orders.jsx'


function App() {

  return (

    <Router>
    <div className="container mt-5">
      <div className="btn-group">
        <NavLink to="/" className="btn btn-dark" activeClassName="active">HOME</NavLink>
        <Link to="/orders" className="btn btn-dark">ORDERS</Link>
        <Link to="/products" className="btn btn-dark">PRODUCTS</Link>
        
      </div>
      <hr />
      <Switch>
        <Route path="/products">
          <Product />
        </Route>
        <Route path="/orders">
          <Order />
        </Route>
        <Route path="/" exact>
          <h1>HOME</h1>
        </Route>
      </Switch>
    </div>
  </Router>
  )
}
export default App;