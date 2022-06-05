import React from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

function Home() {
  const { authed } = useAuth()
  const text = authed === true ? 'User Logged in' : 'User not logged'

  const handleGetProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/products'
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )
      console.log('response:', response.data)
    } catch (error: any) {
      console.log('error:', error.response.data)
    }
  }

  return (
    <>
      <h1>Home page</h1>
      <p>{text}</p>
      <button
        style={{ width: '200px', height: '80px', marginTop: '1rem' }}
        onClick={handleGetProducts}
      >
        GET PRODUCTS
      </button>
    </>
  )
}
export default Home
