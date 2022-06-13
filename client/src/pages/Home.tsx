import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Row>
        <Col>
          <Alert variant="primary" className="home-product-card">
            <h2>Adopt a tree</h2>
            <p>Adopting a tree and get its fruit 1-2 times per year!</p>
            <Button variant="secondary">Adopt</Button>
          </Alert>
        </Col>
        <Col>
          <Alert variant="primary" className="home-product-card">
            <h2>Buy a box of fruit</h2>
            <p>
              Buy the fruit of the season without any processing or storage
              delay!
            </p>
            <Button variant="secondary">Buy</Button>
          </Alert>
        </Col>
      </Row>
    </>
  )
}
export default Home
