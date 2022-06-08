import React from 'react'
import Can from '../components/Can'

function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Can perform="products:edit" yes={() => <button>Product Edit</button>} />
    </>
  )
}
export default Home
