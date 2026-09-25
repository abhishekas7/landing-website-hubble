import React from 'react'
import type { Product } from '../types/product'
import ProductCard from './productCard'


function ProductSection({ products }: { products: Product[] }) {
  return (
  <>
  <div>
    <div className="mx-auto px-8 py-12 sm:px-6 lg:px-[180px] text-center text-[#756383] border-[#E5DCEE] font-inter">
      <h1 className="text-4xl font-semibold text-[#392259] mb-6 font-arimo">Hubble's Key Features</h1>
      <p className="text-lg text-[#392259] md:text-xl font-inter">
        Cavli Hubble offers a range of products designed to simplify IoT connectivity and device management. Our solutions are built to provide real-time visibility, operational control, and seamless integration across various networks.
      </p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 justify-items-center">
{products.map((product) => (
  <ProductCard key={product.id} {...product} />
))}
      </div>
    </div>
  </div>
  </>
  )
}

export default ProductSection