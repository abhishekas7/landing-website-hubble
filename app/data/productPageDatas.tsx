import { iotModuleProductTypes } from "../types/product";

export const ourTrustBussinessData = {
    title:{
        mainTitle: "Trust by",
        subTitle: "Great Brands"
    },      
    description: "Cavli’s Extensive Distributors, Channel Partners & VARs",
    logos: [
        { id: 1, src: "/images/company%20logo/company-logo%20(1).png", alt: "Logo 1" },
        { id: 2, src: "/images/company%20logo/company-logo%20(2).png", alt: "Logo 2" },
        { id: 3, src: "/images/company%20logo/company-logo%20(3).png", alt: "Logo 3" },
        { id: 4, src: "/images/company%20logo/company-logo%20(4).png", alt: "Logo 4" },
        { id: 5, src: "/images/company%20logo/company-logo%20(5).png", alt: "Logo 5" },
        { id: 6, src: "/images/company%20logo/company-logo%20(6).png", alt: "Logo 6" },
        { id: 7, src: "/images/company%20logo/company-logo%20(7).png", alt: "Logo 7" },
        { id: 8, src: "/images/company%20logo/company-logo%20(8).png", alt: "Logo 8" },
    ],
};

export const iotModuleProducts: iotModuleProductTypes[] = [
    {
        id: 1,  
        name: "5G RedCap IoT Modules",  
        subtitle: "Linux / OpenWrt",
        desc: "5G RedCap stands for 5G Reduced Capability. It is also called NR-Light and was introduced in 3GPP Release 17 for IoT devices that do not need the full performance profile of standard 5G NR.",
        imageLink: "/images/chips/5G.webp",  
    },

    {
        id: 2,  
        name: "LTE Cat 1",  
        subtitle: "ThreadX OS | Yocto Linux",
        desc:"LTE Cat 1, or LTE Category 1, introduced in 3GPP Release 8, is a cellular technology designed for IoT applications that require medium data throughputs. It is positioned between high-bandwidth cellular technology like LTE Cat 4 and low-power wide area networks like NB-IoT and LTE-M1.",
        imageLink: "/images/chips/LTE Cat 1.webp",  
    },

    {
        id: 3,  
        name: "Automotive IoT Modules",  
        subtitle: "Linux / TelSDK",
        desc: "Cavli Automotive Modules are engineered to adhere to the highest quality standards to meet the rigorous demands of the automotive industry. Compliant with the IATF 16949:2016 quality management system and a suite of additional certifications, Cavli Automotive Modules are positioned as a reliable component for advanced vehicle connectivity.",
        imageLink: "/images/chips/Automotive.webp",  
    },

    {
        id: 4,  
        name: "LTE Cat 1bis",  
        subtitle: "FreeRTOS",
        desc: "LTE Cat 1bis is an advanced version of LTE Cat 1 introduced in 3GPP Release 13 in 2016. The term 'bis' means 'second time' in Latin, and signifies its iteration as an improvement over LTE Cat 1. Unlike LTE Cat 1, which requires two antennas, LTE Cat 1bis is designed to operate efficiently on a single antenna.",
        imageLink: "/images/chips/Cat1bis.webp",  
    },

    {
        id: 5,  
        name: "LTE Cat 4 IoT Modules",  
        subtitle: "Yocto Linux (Kernel 4.14)",
        desc: "LTE Cat 4 is a category within the 4G LTE standard, introduced in 3GPP Release 8, that offers faster data speeds than earlier categories like LTE Cat 1. LTE Cat 4 is an ideal choice for IoT devices and applications that need a significant step up in high speed data connectivity.",
        imageLink: "/images/chips/Cat4.webp",  
    },

    {
        id: 6,  
        name: "LPWAN | NB-IoT Technology",  
        subtitle: "Free RTOS",
        desc: "LPWAN, short for low-power wide-area network technology, is developed for IoT solutions that need to operate for extended periods with minimal power consumption. NB-IoT or Narrowband IoT, is a cellular technology under LPWAN. Cavli Wireless provides LPWAN and NB-IoT modules, significantly enhancing the IoT capabilities and offering extended coverage in remote and indoor environments.",
        imageLink: "/images/chips/NB-IoT.webp",  
    },

];