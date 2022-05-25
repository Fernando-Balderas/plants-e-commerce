import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = () => navigate('/')
  return (
    <main className="not-found">
      <section className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">
          <code>{location.pathname}</code> not found
        </h2>
        <button className="not-found__go-back" onClick={handleClick}>
          Take me home!
        </button>
      </section>
    </main>
  )
}

export default NotFound
