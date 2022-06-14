import Modal from 'react-bootstrap/Modal'

import ProductForm from './FormP'
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
    dispatch(setShowForm(false))
    if (product !== null) dispatch(setEditingProduct(null))
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
    </Modal>
  )
}

export default ModalP
