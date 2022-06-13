import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { BiEdit } from 'react-icons/bi'

import Can from '../../helpers/Can'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { fetchOrders, selectOrders, setEditingOrder } from './ordersSlice'

function Orders() {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])
  const orders = useStoreSelector(selectOrders)

  return (
    <ListGroup>
      {orders.length > 0 &&
        orders.map((order) => (
          <ListGroup.Item as="li" key={order._id} className="list-group-item">
            <Link
              to={`/order/${order._id}`}
            >{`${order.createdAt} - ${order.total}`}</Link>
            <Can
              perform="orders:edit"
              yes={() => (
                <Button
                  variant="outline-warning"
                  className="mx-1"
                  aria-label="Edit order"
                  onClick={() => dispatch(setEditingOrder(order))}
                >
                  <BiEdit size="1.2em" />
                </Button>
              )}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export default Orders
