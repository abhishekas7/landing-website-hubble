import { RiArrowRightUpLine } from "react-icons/ri";
import type {Product} from "../types/product";
import Link from "next/link";


function productCard({ id, name, description, image }: Product) {
  return (
    <div className='w-[300px] h-[auto] bg-white rounded-lg p-4 flex flex-col border border-[#E5DCEE] mt-[20px]'>
      <div className='w-full h-[auto]  rounded-lg flex items-start justify-between'>
        <div className='w-[80px] h-[80px]  rounded-full flex items-center justify-center mb-4 border border-[#E5DCEE]'>
          <img src={image} alt={name} className='w-full h-full object-cover rounded-full' />
        </div>
        <Link href={`/product/${id}`} className='ml-auto'>
        <RiArrowRightUpLine  size={24} className='text-[#392259] cursor-pointer hover:text-[#756383] transition-colors duration-200'/></Link>
      </div>

      <h1 className='text-[#392259] text-lg md:text-xl font-semibold mb-2 text-left font-arimo'>{name}</h1>
      <p className='text-[#756383] text-sm mb-4 text-left font-inter'>{description}</p>
    </div>
  )
}

export default productCard