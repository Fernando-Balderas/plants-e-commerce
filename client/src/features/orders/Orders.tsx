import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <ul>
      {orders.length > 0 &&
        orders.map((order) => (
          <li key={order._id}>
            <Link
              to={`/order/${order._id}`}
            >{`${order.createdAt} - ${order.total}`}</Link>
            <Can
              perform="orders:edit"
              yes={() => (
                <button onClick={() => dispatch(setEditingOrder(order))}>
                  Edit
                </button>
              )}
            />
          </li>
        ))}
    </ul>
  )
}

export default Orders
