import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import axios from '../helpers/axios/instance'
import { useHistory } from 'react-router-dom'

function LoginForm() {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSignupSubmit = async (data: any) => {
    try {
      const res = await axios.post('/users/signup', data)
      if (res.status !== 201) throw new Error()
      history.replace('/login')
    } catch (error) {
      alert('Signup error')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSignupSubmit)} className="login-form">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          isInvalid={!!errors.name}
          {...register('name', { required: true })}
          placeholder="Name"
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          type="text"
          isInvalid={!!errors.lastname}
          {...register('lastname')}
          placeholder="Lastname"
        />
        {errors.lastname && (
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          isInvalid={!!errors.email}
          {...register('email', { required: true })}
          placeholder="Email"
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          isInvalid={!!errors.password}
          {...register('password', { required: true })}
          placeholder="Password"
        />
        {errors.password && (
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" variant="secondary">
        Sign Up
      </Button>
    </Form>
  )
}

export default LoginForm
