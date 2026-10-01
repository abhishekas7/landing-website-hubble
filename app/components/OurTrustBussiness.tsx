import React from 'react'
import { ourTrustBussinessData } from '../data/productPageDatas'

type Props = {}

const OurTrustBussiness = (props: Props) => {
    return (
        <div className="mx-auto px-8 py-12 sm:px-6 lg:px-[180px] text-center text-[#756383] border-t border-b border-[#E5DCEE] font-inter  ">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/3 mb-6 md:mb-0 bg-[transparent] text-white p-6 rounded-lg  text-left">
                    <p className='font-medium text-3xl md:text-4xl text-[#392259]'>Trust by</p>
                    <p className='font-bold text-3xl md:text-4xl text-[#392259]'>Great Distributors</p>
                    <p className='text-[#756383] text-lg md:text-md line-height-[1]'>Cavli’s Extensive Distributors, Channel Partners & VARs</p>
                </div>
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center justify-items-center">
                        {ourTrustBussinessData?.logos.map((logo) => (
                            <div key={logo.id} className="bg-[#e5e5e57a] text-white p-4 rounded-lg ">
                                <img src={logo.src} alt={logo.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OurTrustBussiness