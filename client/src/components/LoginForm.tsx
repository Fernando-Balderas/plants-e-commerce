import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

import axios from '../helpers/axios/instance'
import useAuth from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'

type LoginFormProps = {
  from: string
}

function LoginForm({ from }: LoginFormProps) {
  const history = useHistory()
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onLoginSubmit = async (data: any) => {
    try {
      const res = await axios.post('/users/login', data)
      if (res.status !== 200) throw new Error()
      const apiToken: string = res.data.token || ''
      const user = res.data.user || null
      await auth.login(apiToken)
      await auth.setUser(user)
      history.replace(from)
    } catch (error) {
      alert('Login error')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onLoginSubmit)} className="login-form">
      <Form.Group>
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
        Log In
      </Button>
      <div className="login-form__signup">
        <p className="my-0">Don't have an account?</p>
        <Nav.Link onClick={() => history.push('/signup')}>Sign Up</Nav.Link>
      </div>
    </Form>
  )
}

export default LoginForm
