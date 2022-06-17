import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SignupForm from '../components/SignupForm'

function SignUp() {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <h1 className="login-title">SignUp</h1>
          <SignupForm />
        </Col>
      </Row>
    </>
  )
}

export default SignUp
