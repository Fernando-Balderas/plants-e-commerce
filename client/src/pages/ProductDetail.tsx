import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductDetailCard from '../components/product/DetailCard'

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()

  return (
    <>
      <h1 style={{ display: 'none' }}>Product detail</h1>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <ProductDetailCard productId={productId} />
        </Col>
      </Row>
    </>
  )
}

export default ProductDetail
