import React from 'react'

function DetailCard({ id }: any) {
  return (
    <div>
      <h3>{id}</h3>
      <div>Image</div>
      <div>Description</div>
      <div>Price</div>
    </div>
  )
}

export default DetailCard
