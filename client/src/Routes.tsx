import React from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import useAuth from './hooks/useAuth'

function PrivateRoute({ children, ...rest }: any) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

const Routes = () => {
  let location = useLocation()
  return (
    <Switch location={location}>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/product/:productId" component={ProductDetail} />
      {/* <Route path="/product/:productId/edit" component={EditProduct} /> */}
      <PrivateRoute path="/protected">
        <EditProduct />
      </PrivateRoute>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes
