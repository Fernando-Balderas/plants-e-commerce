import Can from '../helpers/Can'
import ProductForm from '../components/product/Form'
import ProductsList from '../features/products/Products'
import { useStoreDispatch, useStoreSelector } from '../store/hooks'
import { selectShowForm, setShowForm } from '../features/products/productsSlice'

function Products() {
  const dispatch = useStoreDispatch()
  const showForm = useStoreSelector(selectShowForm)

  return (
    <>
      <h1>Products page</h1>
      {!showForm && (
        <Can
          perform="products:create"
          yes={() => (
            <button onClick={() => dispatch(setShowForm(true))}>
              New Product
            </button>
          )}
        />
      )}
      {showForm && <ProductForm title="New Product" />}

      <ProductsList />
    </>
  )
}

export default Products
