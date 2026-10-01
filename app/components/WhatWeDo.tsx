import React from 'react'

type Props = {}

const WhatWeDo = (props: Props) => {
  return (
    <div className="mx-auto px-8 py-12 sm:px-6 lg:px-[180px] text-center text-[#756383] border-t border-b border-[#E5DCEE] font-inter  ">
   <div>
    <p className="text-[24px] uppercase font-bold text-[#392259] md:text-xl sm:text-2xl font-inter text-left">What We Do</p>
    <p className="text-lg camelCase font-bold text-[#392259] md:text-3xl font-inter text-left pb-5">Connectivity & IoT Module Management Platform</p>
    <p className="text-lg text-[#392259] md:text-md font-inter text-left">The Cavli Hubble platform helps users bring IoT Modules online in minutes and manage them securely throughout their lifecycle. Powered by our eSIM, it enables seamless cloud connectivity across LPWAN, 4G, 5G, and legacy 2G networks, with support for secure end-of-journey .</p><br/>
    <p className='text-lg text-[#392259] md:text-md font-inter text-left'> With Cavli Hubble, we centralize connectivity and device management across LPWAN, LTE, 5G, and even legacy networks using integrated eSIM technology. Designed to scale, Hubble provides real-time visibility and operational control across every IoT deployment, ensuring strong security, high uptime, and consistent fleet-wide intelligence.</p><br/>
        <p className='text-lg text-[#392259] md:text-md font-inter text-left'>The platform streamlines modem onboarding, data plan management, and OTA updates, enabling our clients to activate and manage eSIM-enabled modems deployed anywhere in the world with minimal field intervention. This helps them simplify operations, reduce system complexity, and maintain a connected ecosystem that remains secure, transparent, and deployment-ready at all times.</p>
   </div>

    </div>
  )
}

export default WhatWeDo