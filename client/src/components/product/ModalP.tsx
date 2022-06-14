import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import ProductForm from './Form'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import {
  selectEditingProduct,
  selectShowForm,
  setEditingProduct,
  setShowForm,
} from '../../features/products/productsSlice'

function ModalP() {
  const dispatch = useStoreDispatch()
  const showForm = useStoreSelector(selectShowForm)
  const product = useStoreSelector(selectEditingProduct)

  const handleClose = () => {
    if (product !== null) dispatch(setEditingProduct(null))
    dispatch(setShowForm(false))
  }

  const title = product === null ? 'New Product' : 'Edit Product'

  return (
    <Modal show={showForm} onHide={handleClose} fullscreen="md-down">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer> */}
    </Modal>
  )
}

export default ModalP
