import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UsersList from '../features/users/Users'

function Users() {
  return (
    <>
      <h1>Users</h1>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <UsersList />
        </Col>
      </Row>
    </>
  )
}
export default Users
