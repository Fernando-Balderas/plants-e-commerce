import React from 'react'

function SimpleCard({ title, subtitle, stars, price }: any) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <p>{stars}</p>
      <p>{price}</p>
    </div>
  )
}

export default SimpleCard
