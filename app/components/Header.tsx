import React from 'react'


type Props = {}

function Header({}: Props) {
  return (
    <div className="flex min-h-[20px] w-full items-center justify-center bg-[#392259] bg-cover bg-center px-6 text-center text-white">
      <div>
        <p className="m-1 text-lg text-slate-300 md:text-[16px]">
          Our Flagship Product from Cavli Wireless
        </p>
      </div>
    </div>
  )
}

export default Header