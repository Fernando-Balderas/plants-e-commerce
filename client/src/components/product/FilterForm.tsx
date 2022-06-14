import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import useQuery from '../../hooks/useQuery'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import {
  selectFilters,
  setFilters,
} from '../../features/products/productsSlice'

function FilterForm() {
  const dispatch = useStoreDispatch()
  const filters = useStoreSelector(selectFilters)
  const { register, handleSubmit } = useForm()
  const query = useQuery()
  const [check, setCheck] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    setCheck(filters)
    const filter = query.get('filter')
    if (filter && !check[filter]) {
      dispatch(setFilters({ [filter]: true }))
    }
  }, [filters, query, dispatch, check])

  const onSubmitFilters = (data: any) => dispatch(setFilters(data))

  return (
    <Form onSubmit={handleSubmit(onSubmitFilters)} className="filters-form">
      <Form.Group className="me-3">
        <Form.Check
          type="checkbox"
          label="Tree"
          {...register('tree')}
          checked={check.tree || false}
          onClick={() => setCheck({ ...check, tree: !check.tree })}
        />
      </Form.Group>
      <Form.Group className="me-3">
        <Form.Check
          type="checkbox"
          label="Fruit"
          {...register('fruit')}
          checked={check.fruit || false}
          onClick={() => setCheck({ ...check, fruit: !check.fruit })}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Filter
      </Button>
    </Form>
  )
}

export default FilterForm
