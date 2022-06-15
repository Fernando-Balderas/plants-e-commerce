import Card from 'react-bootstrap/Card'

import { selectProductById } from '../../features/products/productsSlice'
import { useStoreSelector } from '../../store/hooks'
import addCurrency from '../../util/addCurrency'
// import Can from '../../helpers/Can'
// import AddToCartButton from './AddToCartButton'

function DetailCard({ productId }: any) {
  const product = useStoreSelector(selectProductById(productId))

  return (
    <Card className="detailed-product-card">
      <Card.Body>
        <Card.Title className="detailed-product-card__title">
          {product?.name || ''}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted detailed-product-card__subtitle">
          {addCurrency(product?.price)}
        </Card.Subtitle>
        <Card.Text>{product?.description || ''}</Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={product?.image || ''} />
      <Card.Footer className="detailed-product-card__footer">
        <small className="text-muted">
          {product?.categories.join(' ') || ''}
        </small>
      </Card.Footer>
      {/* <Can
          perform="products:edit"
          yes={() => <AddToCartButton product={product} />}
        /> */}
    </Card>
  )
}

export default DetailCard
