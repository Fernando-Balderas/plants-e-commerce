import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OrdersList from '../features/orders/Orders'

function Orders() {
  return (
    <>
      <h1 className="page-title">Orders</h1>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <OrdersList />
        </Col>
      </Row>
    </>
  )
}
export default Orders
