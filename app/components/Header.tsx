import React from 'react'


type Props = {}

function Header({}: Props) {
  return (
    <div className="flex min-h-[20px] w-full items-center justify-center bg-gradient-to-b from-black to-[#392259] bg-cover bg-center px-6 text-center text-white">
      <div>
        <p className="m-1 text-sm text-slate-300 md:text-[14px] font-small font-arimo">
          Our Flagship Product from Cavli Wireless
        </p>
      </div>
    </div>
  )
}

export default Header