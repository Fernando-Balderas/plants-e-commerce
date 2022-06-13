import React from 'react'
import { useHistory } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import { CgUserList } from 'react-icons/cg'
import { TbLogout } from 'react-icons/tb'
import { GoListUnordered } from 'react-icons/go'
import { TbUsers } from 'react-icons/tb'
import { BsCart2 } from 'react-icons/bs'

import useAuth from '../hooks/useAuth'
import { useStoreDispatch, useStoreSelector } from '../store/hooks'
import {
  selectCart,
  selectShowCart,
  setShowCart,
} from '../features/cart/cartSlice'

function UserOptions() {
  const history = useHistory()
  const auth = useAuth()
  const dispatch = useStoreDispatch()
  const cart = useStoreSelector(selectCart)
  const showCart = useStoreSelector(selectShowCart)

  if (auth.authed)
    return (
      <>
        <NavDropdown title={<CgUserList size="1.6em" />} aria-label="Themes">
          <NavDropdown.Item
            aria-label={`Dropdown`}
            onClick={() => {
              auth.logout().then(() => history.push('/'))
            }}
          >
            <TbLogout /> Log Out
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            aria-label={`Dropdown`}
            onClick={() => history.push('/orders')}
          >
            <GoListUnordered /> Orders
          </NavDropdown.Item>
          <NavDropdown.Item
            aria-label={`Dropdown`}
            onClick={() => history.push('/users')}
          >
            <TbUsers /> Users
          </NavDropdown.Item>
          {/* TODO: Add wishlist */}
        </NavDropdown>
        <Nav.Link
          aria-label="Cart"
          onClick={() => dispatch(setShowCart(!showCart))}
        >
          <BsCart2 size="1.6em" />
          {cart.length > 0 && <Badge bg="danger">{cart.length}</Badge>}
        </Nav.Link>
      </>
    )

  return (
    <Nav.Link onClick={() => history.push('/login')}>
      <TbLogout size="1.3em" /> Log In
    </Nav.Link>
  )
}

export default UserOptions
