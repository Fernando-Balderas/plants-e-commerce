import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import EditProduct from '../pages/EditProduct'
import Checkout from '../pages/Checkout'
import NotFound from '../pages/NotFound'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import PrivateRoute from '../helpers/PrivateRoute'
import Orders from '../pages/Orders'
import Users from '../pages/Users'

const Routes = () => {
  let location = useLocation()
  return (
    <Switch location={location}>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/product/:productId" component={ProductDetail} />
      <PrivateRoute exact path="/product/:productId/edit">
        <EditProduct />
      </PrivateRoute>
      <PrivateRoute exact path="/orders">
        <Orders />
      </PrivateRoute>
      <PrivateRoute exact path="/users">
        <Users />
      </PrivateRoute>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes
