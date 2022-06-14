import { useHistory } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function Home() {
  const history = useHistory()

  return (
    <>
      <h1 className="page-title">Home</h1>
      <Row className="my-5">
        <Col>
          <Alert variant="primary" className="home-product-card">
            <h2>Adopt a tree</h2>
            <p>Adopting a tree and get its fruit 1-2 times per year!</p>
            <Button
              variant="secondary"
              onClick={() => history.push('/products?filter=tree')}
            >
              Adopt
            </Button>
          </Alert>
        </Col>
        <Col>
          <Alert variant="primary" className="home-product-card">
            <h2>Buy a box of fruit</h2>
            <p>
              Buy the seasonal fruit without any processing or storage delay!
            </p>
            <Button
              variant="secondary"
              onClick={() => history.push('/products?filter=fruit')}
            >
              Buy
            </Button>
          </Alert>
        </Col>
      </Row>
    </>
  )
}
export default Home
