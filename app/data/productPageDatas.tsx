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
    // =========================================================
    // 1. 5G REDCAP
    // =========================================================
    {
        id: 1,
        name: "5G RedCap IoT Modules",
        subtitle: "Linux / OpenWrt",
        desc: "5G RedCap IoT modules help OEMs build mid-tier connected devices that need stronger performance than LTE Cat 4 but lower cost, power, and RF complexity than full 5G NR.",
        imageLink: "/images/chips/5G.webp",

        detailsView: {
            title: "5G RedCap IoT Modules",
            des: "Cavli's CQM220 5G RedCap IoT module, powered by the Qualcomm X35 chipset and integrated with the Cavli Hubble platform, delivers high-performance connectivity for the next generation of connected devices.",
            whatIs: "5G RedCap stands for 5G Reduced Capability. It is also called NR-Light and was introduced in 3GPP Release 17 for IoT devices that do not need the full performance profile of standard 5G NR.",

            chip: [
                {
                    name: "CQM220",
                    imgUrl: "",
                    types: [
                        "5G RedCap",
                        "3GPP Release 17"
                    ],

                    cellularBands: {
                        "5G": "n1 / n2 / n3 / n5 / n7 / n8 / n12 / n13 / n14 / n18 / n20 / n25 / n26 / n28 / n30 / n38 / n40 / n41 / n48 / n66 / n70 / n71 / n77 / n78",
                        "4G": "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B12 / B13 / B14 / B17 / B18 / B19 / B20 / B25 / B26 / B28 / B34 / B38 / B39 / B40 / B41 / B42 / B43 / B48 / B66 / B71"
                    },

                    os: "Linux / OpenWrt",

                    interfaces: [
                        "1x I2C*",
                        "3x UART",
                        "1x I2S",
                        "1x PCM",
                        "1x MAIN_ANT",
                        "1x GNSS_ANT",
                        "1x DIV_ANT",
                        "1x SDC*",
                        "1x SGMII"
                    ],

                    speeds: {
                        "5G RedCap": {
                            download: "220 Mbps",
                            upload: "120 Mbps"
                        },
                        "4G": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        }
                    },

                    keyHighlights: [
                        "Arm Cortex A7 up to 1.7 GHz",
                        "5G RedCap",
                        "LTE Fallback",
                        "In-built GNSS Support",
                        "Open SDK Support",
                        "USB 2.0 Interface"
                    ]
                }
            ]
        }
    },

    // =========================================================
    // 2. LTE CAT 1
    // =========================================================
    {
        id: 2,
        name: "LTE Cat 1",
        subtitle: "ThreadX OS | Yocto Linux",
        desc: "LTE Cat 1 IoT modules deliver reliable cellular connectivity with global and regional band support, GNSS, VoLTE, 2G fallback and flexible interfaces for connected devices.",
        imageLink: "/images/chips/LTE Cat 1.webp",

        detailsView: {
            title: "LTE Cat 1",
            des: "Cavli LTE Cat 1 modules provide dependable cellular connectivity for IoT applications requiring moderate bandwidth, global coverage and long-term network availability.",
            whatIs: "LTE Cat 1 is an LTE category designed for IoT applications requiring higher performance than low-power LTE categories while maintaining a cost-effective hardware profile.",

            chip: [
                {
                    name: "C10QM",
                    imgUrl: "",
                    types: [
                        "LTE Cat 1",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        EAJ: "1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 38 / 40 / 41",
                        NA: "2 / 4 / 5 / 12 / 13 / 17 / 25 / 66",
                        EU: "1 / 3 / 7 / 8 / 20 / 28",
                        IN: "1 / 3 / 5 / 8 / 40 / 41",
                        AN: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 28"
                    },

                    os: "Yocto Linux (Kernel 4.14)",

                    interfaces: [
                        "9x GPIO*",
                        "1x USB HS",
                        "3x UART",
                        "1x SDH",
                        "2x ADC**",
                        "1x PCM*",
                        "1x USIM",
                        "1x I2C*",
                        "1x SPI*",
                        "1x SDC",
                        "1x SGMII",
                        "1x JTAG",
                        "1x LCD**",
                        "1x MAIN_ANT",
                        "1x GNSS_ANT"
                    ],

                    speeds: {
                        "LTE Cat 1": {
                            download: "10 Mbps",
                            upload: "5 Mbps"
                        },
                        "2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "Applicable regions Global/APAC/EMEA/N.America",
                        "GNSS Support",
                        "LTE Cat 1",
                        "2G Fallback",
                        "VoLTE Support",
                        "SMS over IMS/SG/CS",
                        "FOTA",
                        "DFOTA",
                        "USB OTG Support",
                        "USB 2.0 Interface",
                        "Deep Sleep Mode",
                        "SDK Support",
                        "LCD Interface",
                        "Inbuilt GNSS"
                    ]
                },

                {
                    name: "CQ10",
                    imgUrl: "",
                    types: [
                        "LTE Cat 1",
                        "2G",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "LTE - 1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 13 / 18 / 19 / 20 / 25 / 26 / 28 / 40 / 66",
                        NA: "LTE - 2 / 4 / 5 / 12 / 13 / 25 / 66",
                        EAJ: "LTE - 1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 40",
                        EU: "LTE - 1 / 3 / 7 / 8 / 20 / 28",
                        IN: "LTE - 1 / 3 / 5 / 8 / 40",
                        AN: "LTE - 1 / 3 / 5 / 8 / 18 / 19 / 26 / 28",
                        LA: "LTE - 1 / 2 / 3 / 4 / 5 / 7 / 8"
                    },

                    os: "Yocto Linux (Kernel 4.14)",

                    interfaces: [
                        "3x UART",
                        "1x USB 2.0 (HS)",
                        "1x HSIC",
                        "1x WLAN/BT (External)",
                        "2x SDC",
                        "1x USIM (1.8V / 2.85V)",
                        "2x Network Status Indicator",
                        "1x Power ON Status Indicator",
                        "1x SGMII",
                        "1x I2C**",
                        "2x ADC",
                        "1x PCM**",
                        "1x JTAG",
                        "1x Main ANT",
                        "1x GNSS ANT",
                        "1x Diversity ANT"
                    ],

                    speeds: {
                        "LTE Cat 1": {
                            download: "10 Mbps",
                            upload: "5 Mbps"
                        },
                        "2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Powered by Cavli Hubble",
                        "Applicable regions EA/NA/WW",
                        "In-built GNSS",
                        "LTE Cat 1",
                        "2G Fallback",
                        "VoLTE Support",
                        "SMS over IMS/SG/CS",
                        "USB 2.0 Interface",
                        "OpenSDK Support",
                        "USB OTG Support"
                    ]
                },

                {
                    name: "C11QM",
                    imgUrl: "",
                    types: [
                        "LTE Cat 1",
                        "2G",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        INDIA: "B1 / B3 / B5 / B8 / B38 / B40 / B41"
                    },

                    os: "ThreadX OS | Yocto Linux",

                    interfaces: [
                        "1x uSIM",
                        "2x ADC",
                        "1x USB 2.0",
                        "4x GPIO",
                        "1x I2C",
                        "2x SDC",
                        "1x PCM",
                        "1x SPI",
                        "4x UART",
                        "1x Network Status Indicator",
                        "1x Power ON Status Indicator"
                    ],

                    speeds: {
                        "Cat 1": {
                            download: "10 Mbps",
                            upload: "5 Mbps"
                        },
                        "GSM": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "LTE Cat 1",
                        "Inbuilt GNSS",
                        "2G Fallback",
                        "USB 2.0 Interface",
                        "ThreadX RTOS",
                        "VoLTE Support",
                        "SMS over IMS/SG/CS"
                    ]
                }
            ]
        }
    },

    // =========================================================
    // 3. AUTOMOTIVE
    // =========================================================
    {
        id: 3,
        name: "Automotive IoT Modules",
        subtitle: "Linux / TelSDK",
        desc: "Automotive-grade cellular connectivity for next-generation connected vehicles, telematics and intelligent mobility applications.",
        imageLink: "/images/chips/Automotive.webp",

        detailsView: {
            title: "Automotive IoT Modules",
            des: "Cavli automotive IoT modules combine high-speed 5G NR connectivity, automotive-grade design, GNSS and advanced interfaces for connected vehicle applications.",
            whatIs: "Automotive IoT modules are designed for connected vehicle applications including telematics, infotainment, fleet management, vehicle diagnostics and next-generation mobility systems.",

            chip: [
                {
                    name: "AQ62",
                    imgUrl: "",
                    types: [
                        "Automotive",
                        "5G NR",
                        "3GPP Release 16"
                    ],

                    cellularBands: {
                        WW: {
                            LTE: "1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 13 / 14 / 17 / 18 / 19 / 20 / 25 / 26 / 28 / 34 / 38 / 39 / 40 / 41 / 42 / 43 / 48 / 66 / 71",
                            NR: "1 / 2 / 3 / 5 / 7 / 8 / 12 / 13 / 14 / 18 / 20 / 25 / 26 / 28 / 38 / 40 / 41 / 48 / 66 / 71 / 77 / 78 / 79"
                        },
                        NA: {
                            LTE: "2 / 4 / 5 / 7 / 12 / 13 / 14 / 17 / 18 / 19 / 25 / 26 / 38 / 41 / 42 / 43 / 48 / 66 / 71",
                            NR: "2 / 5 / 7 / 12 / 13 / 14 / 18 / 25 / 26 / 38 / 41 / 48 / 66 / 71 / 77 / 78"
                        },
                        EAJ: {
                            LTE: "1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 34 / 38 / 39 / 40 / 41 / 42 / 43 / 48",
                            NR: "1 / 3 / 5 / 7 / 8 / 18 / 20 / 26 / 28 / 38 / 40 / 41 / 48 / 77 / 78 / 79",
                            NTN: "255 / 256"
                        },
                        IN: {
                            LTE: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 38 / 40 / 41 / 42 / 43 / 48",
                            NR: "1 / 3 / 5 / 8 / 18 / 26 / 38 / 40 / 41 / 48 / 77 / 78",
                            NTN: "255 / 256"
                        },
                        EA: {
                            LTE: "1 / 3 / 5 / 7 / 8 / 20 / 28 / 38 / 40 / 41 / 42 / 43 / 48",
                            NR: "1 / 3 / 5 / 7 / 8 / 20 / 28 / 38 / 40 / 41 / 48 / 77 / 78",
                            NTN: "255 / 256"
                        }
                    },

                    os: "Linux / TelSDK",

                    interfaces: [
                        "4x UART",
                        "2x USIM",
                        "1x USB",
                        "2x SDC (4-bit / 8-bit)",
                        "2x I2C",
                        "2x SPI",
                        "3x I2S",
                        "1x PCM",
                        "1x RGMII / SGMII / USxGMII",
                        "1x PCIe 4.0 / 3.0",
                        "1x PCIe 3.0",
                        "19x GPIO",
                        "5x ANT"
                    ],

                    speeds: {
                        "5G": {
                            download: "4.4 Gbps",
                            upload: "900 Mbps"
                        },
                        "Configuration": {
                            download: "2T4R, LTE 5xCC, NR 4xCC, 2x2 UL MIMO, 4x4 DL MIMO, ULCA, DLCA, ENDC",
                            upload: "2T4R, LTE 5xCC, NR 4xCC, 2x2 UL MIMO, 4x4 DL MIMO, ULCA, DLCA, ENDC"
                        }
                    },

                    keyHighlights: [
                        "5G NR",
                        "Automotive Grade",
                        "NG-eCall Support",
                        "In-built GNSS (L1 + L5)",
                        "USB 2.0 Interface",
                        "OpenSDK Support",
                        "LTE Cat 18 Fallback",
                        "LGA Package",
                        "VoLTE Support",
                        "Linux / TelSDK"
                    ]
                }
            ]
        }
    },

    // =========================================================
    // 4. LTE CAT 1BIS
    // =========================================================
    {
        id: 4,
        name: "LTE Cat 1bis",
        subtitle: "FreeRTOS",
        desc: "LTE Cat 1bis modules provide cost-effective cellular connectivity with reduced RF complexity, low power consumption and compact form factors.",
        imageLink: "/images/chips/Cat1bis.webp",

        detailsView: {
            title: "LTE Cat 1bis",
            des: "Cavli LTE Cat 1bis modules provide reliable LTE connectivity in compact form factors for applications that require moderate cellular performance with optimized cost and power consumption.",
            whatIs: "LTE Cat 1bis is an evolution of LTE Cat 1 that uses a single receive antenna while maintaining the same peak data rates, helping reduce module complexity and cost.",

            chip: [
                {
                    name: "CQ16",
                    imgUrl: "",
                    types: [
                        "LTE Cat 1bis",
                        "3GPP Release 14"
                    ],

                    cellularBands: {
                        NA: "2 / 4 / 5 / 12 / 13 / 25 / 66",
                        AN: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 28",
                        EU: "1 / 3 / 7 / 8 / 20 / 28",
                        IN: "1 / 3 / 5 / 8 / 40 / 41"
                    },

                    os: "FreeRTOS",

                    interfaces: [
                        "3x UART",
                        "1x USB 2.0",
                        "1x USIM",
                        "2x ADC**",
                        "1x I2S**",
                        "1x I2C**",
                        "1x SPI**",
                        "3x GPIO**",
                        "1x Main ANT"
                    ],

                    speeds: {
                        "LTE Cat 1bis": {
                            download: "10 Mbps",
                            upload: "5 Mbps"
                        }
                    },

                    keyHighlights: [
                        "Integrated eSIM",
                        "Power Saving Modes",
                        "Powered by Cavli Hubble",
                        "Compact Form Factor Design",
                        "USB 2.0 Interface",
                        "LTE Cat 1bis",
                        "DFOTA Available",
                        "Max UART Speed up to 3 Mbps",
                        "Applicable regions N.A, AN, EU, IN"
                    ]
                },

                {
                    name: "C16QS",
                    imgUrl: "",
                    types: [
                        "LTE Cat 1bis",
                        "3GPP Release 14"
                    ],

                    cellularBands: {
                        EAJ: "1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 40 / 41",
                        EU: "1 / 3 / 5 / 7 / 8 / 20 / 28",
                        NA: "2 / 4 / 5 / 12 / 25 / 66",
                        AN: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 28",
                        LA: "1 / 2 / 3 / 4 / 5 / 7 / 8",
                        IN: "1 / 3 / 5 / 8 / 40 / 41",
                        WW: "1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 18 / 19 / 20 / 25 / 26 / 28 / 40 / 41 / 66"
                    },

                    os: "FreeRTOS",

                    interfaces: [
                        "3x UART",
                        "1x USB 2.0",
                        "1x USIM",
                        "1x SWD",
                        "2x ADC**",
                        "1x I2S**",
                        "1x I2C**",
                        "1x SPI**",
                        "4x GPIO**",
                        "1x Main ANT",
                        "1x GNSS ANT*"
                    ],

                    speeds: {
                        "LTE Cat 1bis": {
                            download: "10 Mbps",
                            upload: "5 Mbps"
                        }
                    },

                    keyHighlights: [
                        "Integrated eSIM",
                        "GNSS Support",
                        "Power Saving Mode",
                        "Powered by Cavli Hubble",
                        "Small Form Factor Design",
                        "USB 2.0 Interface",
                        "LTE Cat 1bis",
                        "DFOTA Available",
                        "Max UART speed up to 3 Mbps",
                        "Independent GNSS",
                        "WiFi Scanning Support",
                        "Applicable regions",
                        "Inbuilt GNSS"
                    ]
                }
            ]
        }
    },

    // =========================================================
    // 5. LTE CAT 4
    // =========================================================
    {
        id: 5,
        name: "LTE Cat 4 IoT Modules",
        subtitle: "Yocto Linux (Kernel 4.14)",
        desc: "LTE Cat 4 IoT modules provide high-speed 4G connectivity for industrial, enterprise, multimedia and connected-device applications.",
        imageLink: "/images/chips/Cat4.webp",

        detailsView: {
            title: "LTE Cat 4 IoT Modules",
            des: "Cavli LTE Cat 4 modules deliver download speeds up to 150 Mbps with extensive regional coverage, GNSS, 2G fallback and advanced interfaces for demanding IoT applications.",
            whatIs: "LTE Cat 4 provides higher throughput than lower LTE IoT categories and is suitable for applications such as routers, gateways, video-enabled devices, industrial systems and connected equipment.",

            chip: [
                {
                    name: "CQ20",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "LTE - 1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 13 / 18 / 19 / 20 / 25 / 26 / 28 / 40 / 66",
                        NA: "LTE - 2 / 4 / 5 / 12 / 13 / 25 / 66",
                        EAJ: "LTE - 1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 40",
                        EU: "LTE - 1 / 3 / 7 / 8 / 20 / 28",
                        IN: "LTE - 1 / 3 / 5 / 8 / 40",
                        AN: "LTE - 1 / 3 / 5 / 8 / 18 / 19 / 26 / 28",
                        LA: "LTE - 1 / 2 / 3 / 4 / 5 / 7 / 8"
                    },

                    os: "Yocto Linux (Kernel 4.14)",

                    interfaces: [
                        "3x UART",
                        "1x USB 2.0 (HS)",
                        "1x HSIC",
                        "1x WLAN/BT (External)",
                        "2x SDC",
                        "1x USIM (1.8V / 2.85V)",
                        "2x Network Status Indicator",
                        "1x Power ON Status Indicator",
                        "1x SGMII",
                        "1x I2C**",
                        "2x ADC",
                        "1x PCM**",
                        "1x JTAG",
                        "1x Main ANT",
                        "1x GNSS ANT",
                        "1x Diversity ANT"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Applicable regions EA/NA/WW",
                        "In-built GNSS",
                        "LTE Cat 4",
                        "2G Fallback",
                        "VoLTE Support",
                        "SMS over IMS/SG/CS",
                        "USB 2.0 Interface",
                        "OpenSDK Support",
                        "USB OTG Support"
                    ]
                },

                {
                    name: "C20QM",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        EAJ: "1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 38 / 40 / 41",
                        EU: "1 / 3 / 7 / 8 / 20 / 28",
                        NA: "2 / 4 / 5 / 12 / 13 / 17 / 25 / 66",
                        AN: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 28"
                    },

                    os: "Yocto Linux (Kernel 4.14)",

                    interfaces: [
                        "9x GPIO**",
                        "1x USB HS",
                        "3x UART",
                        "2x ADC**",
                        "1x PCM**",
                        "1x USIM",
                        "1x I2C**",
                        "1x SPI**",
                        "1x SDC",
                        "1x SGMII",
                        "1x JTAG",
                        "1x LCD**",
                        "1x MAIN_ANT",
                        "1x SDIO",
                        "1x GNSS_ANT",
                        "1x DIV_ANT*"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "Applicable regions APAC/EMEA/N.America",
                        "GNSS Support",
                        "LTE Cat 4",
                        "2G Fallback",
                        "VoLTE Support",
                        "DFOTA",
                        "SMS over IMS/SG/CS",
                        "USB 2.0 Interface",
                        "Deep Sleep Mode",
                        "OpenSDK Support",
                        "USB OTG Support",
                        "LCD Interface"
                    ]
                },

                {
                    name: "CQS290",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B12 / B13 / B18 / B19 / B20 / B25 / B26 / B28 / B38 / B40 / B41 / B66 / B71 | GSM - 900 / 1800 MHz"
                    },

                    os: "Android / Linux OS",

                    interfaces: [
                        "1x LCD (DSI)**",
                        "2x Camera (CSI)**",
                        "2x CCI I2C",
                        "2x Analog Audio Out**",
                        "2x Analog Audio In",
                        "2x Digital Audio In",
                        "1x USB 2.0 (OTG Support)",
                        "1x USIM",
                        "3x UART",
                        "1x JTAG",
                        "37x GPIO**",
                        "1x SDC 3.0",
                        "1x ADC**",
                        "2x I2C**",
                        "1x I3C**",
                        "1x SPI**",
                        "1x Touch Interface (I2C)",
                        "1x VIB_DRV",
                        "1x Wi-Fi & Bluetooth ANT",
                        "1x Main ANT",
                        "1x DIV ANT",
                        "1x GNSS ANT"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "GSM 2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "ARM Cortex-A53 64-bit Processor (Quad-core)",
                        "Qualcomm Adreno 702 GPU",
                        "Android OS 12",
                        "SP up to 14",
                        "2G Fallback",
                        "GPS/BDS/GLONASS/Galileo/QZSS/SBAS",
                        "Superior Multimedia Functions",
                        "Wi-Fi 802.11 a/b/g/n/ac",
                        "Bluetooth 5.0 (BR/EDR + BLE)"
                    ]
                },

                {
                    name: "CQS291",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B12 / B13 / B18 / B19 / B20 / B25 / B26 / B28 / B38 / B40 / B41 / B66 / B71"
                    },

                    os: "Android / Linux OS",

                    interfaces: [
                        "1x LCD (MIPI-DSI)**",
                        "2x Camera (MIPI-CSI)**",
                        "2x CCI I2C",
                        "2x Analog Audio Out**",
                        "2x DMIC",
                        "1x USB 3.1 (OTG Support)",
                        "1x USIM",
                        "3x UART",
                        "37x GPIO**",
                        "1x SDC 3.0",
                        "1x ADC**",
                        "2x I2C**",
                        "1x I3C**",
                        "1x SPI**",
                        "1x Touch Interface (I2C)",
                        "1x VIB_DRV",
                        "1x Wi-Fi + BLE + FM ANT",
                        "1x Main ANT",
                        "1x DIV ANT",
                        "1x GNSS ANT"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "GSM 2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "ARM Cortex-A53 64-bit Quad-core",
                        "BR/EDR + BLE",
                        "World Wide",
                        "Wi-Fi 802.11 a/b/g/n/ac",
                        "Superior Multimedia Functions",
                        "Android OS 12",
                        "2G Fallback",
                        "Adreno 702 GPU",
                        "Touch Screen LCD Interface",
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "GNSS Support",
                        "GPS/BDS/GLONASS/Galileo/QZSS/SBAS"
                    ]
                },

                {
                    name: "CQS292",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B12 / B13 / B18 / B19 / B20 / B25 / B26 / B28 / B38 / B40 / B41 / B66 / B71"
                    },

                    os: "Android 12 + Service packs up to Android 14",

                    interfaces: [
                        "1x LCD (MIPI-DSI)**",
                        "2x Camera (MIPI-CSI)**",
                        "2x CCI I2C",
                        "2x Analog Audio Out**",
                        "2x DMIC",
                        "1x USB 3.1 (OTG Support)",
                        "1x USIM",
                        "3x UART",
                        "37x GPIO**",
                        "1x SDC 3.0",
                        "1x ADC**",
                        "2x I2C**",
                        "1x I3C**",
                        "1x SPI**",
                        "1x Touch Interface (I2C)",
                        "1x VIB_DRV",
                        "1x Wi-Fi + BLE + FM ANT",
                        "1x Main ANT",
                        "1x DIV ANT",
                        "1x GNSS ANT"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "GSM 2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "ARM Cortex-A53 64-bit Quad-core",
                        "BR/EDR + BLE",
                        "World Wide",
                        "Wi-Fi 802.11 a/b/g/n/ac",
                        "Superior Multimedia Functions",
                        "Android OS 12",
                        "2G Fallback",
                        "Adreno 702 GPU",
                        "Touch Screen LCD Interface",
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "GNSS Support",
                        "GPS/BDS/GLONASS/Galileo/QZSS/SBAS/NavIC"
                    ]
                },

                {
                    name: "CQS315",
                    imgUrl: "",
                    types: [
                        "LTE Cat 4",
                        "3GPP Release 10"
                    ],

                    cellularBands: {
                        WW: "1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 13 / 18 / 19 / 20 / 25 / 26 / 28 / 40 / 41 / 66 / 71 | GSM - 900 / 1800 MHz",
                        EAJ: "1 / 3 / 5 / 7 / 8 / 18 / 19 / 20 / 26 / 28 / 38 / 40 / 41 | GSM - 900 / 1800 MHz",
                        AN: "1 / 3 / 5 / 8 / 18 / 19 / 26 / 28 | GSM - 900 / 1800 MHz",
                        IN: "1 / 3 / 5 / 8 / 40 / 41 | GSM - 900 / 1800 MHz",
                        NA: "2 / 4 / 5 / 7 / 8 / 12 / 13 / 17 / 25 / 66 / 71 | GSM - 900 / 1800 MHz"
                    },

                    os: "Android / Linux",

                    interfaces: [
                        "1x LCD (DSI)**",
                        "2x Camera (CSI)**",
                        "2x CCI I2C",
                        "3x Analog Audio Out**",
                        "3x Analog Audio In",
                        "2x Digital Audio In",
                        "1x USB 2.0 / 3.1 (OTG Support)",
                        "1x USIM",
                        "7x UART",
                        "71x GPIO**",
                        "1x SDC 3.0",
                        "1x ADC**",
                        "4x I2C**",
                        "2x I3C**",
                        "5x SPI**",
                        "1x Touch Interface (I2C)",
                        "1x Wi-Fi & Bluetooth ANT",
                        "1x Main ANT",
                        "1x DIV ANT",
                        "1x GNSS ANT"
                    ],

                    speeds: {
                        "LTE Cat 4": {
                            download: "150 Mbps",
                            upload: "50 Mbps"
                        },
                        "GSM 2G": {
                            download: "236.8 Kbps",
                            upload: "236.8 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Qualcomm Octa-core Kryo 260 64-bit CPU",
                        "Qualcomm Adreno 610 GPU",
                        "Android/Linux OS",
                        "2G Fallback",
                        "Superior Multimedia Functions",
                        "Wi-Fi 802.11 a/b/g/n/ac",
                        "Bluetooth 5.0 (BR/EDR + BLE)",
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "World Wide",
                        "GNSS Support",
                        "GPS/BDS/GLONASS/Galileo/QZSS/SBAS",
                        "Integrated LCD Touchscreen interface"
                    ]
                }
            ]
        }
    },

    // =========================================================
    // 6. LPWAN / NB-IOT
    // =========================================================
    {
        id: 6,
        name: "LPWAN | NB-IoT Technology",
        subtitle: "Free RTOS",
        desc: "LPWAN and NB-IoT modules provide ultra-low-power cellular connectivity for battery-operated IoT devices requiring long deployment life and broad coverage.",
        imageLink: "/images/chips/NB-IoT.webp",

        detailsView: {
            title: "LPWAN | NB-IoT Technology",
            des: "Cavli NB-IoT modules are designed for low-power, low-bandwidth IoT applications where long battery life, reliable cellular coverage and compact designs are critical.",
            whatIs: "NB-IoT is a low-power wide-area cellular technology standardized by 3GPP for IoT devices that transmit small amounts of data while operating for long periods on battery power.",

            chip: [
                {
                    name: "C41QS",
                    imgUrl: "",
                    types: [
                        "LPWA",
                        "NB-IoT",
                        "3GPP Release 14"
                    ],

                    cellularBands: {
                        Global: "B1 / B2 / B3 / B4 / B5 / B8 / B12 / B13 / B14 / B17 / B18 / B19 / B20 / B25 / B26 / B28 / B66 / B70 / B85",
                        "3GPP Release": "LTE 3GPP E-UTRA Release 14 Cat M1 / LTE NB1 / NB2"
                    },

                    os: "Free RTOS",

                    interfaces: [
                        "3x UART",
                        "1x GNSS_UART*",
                        "1x USIM",
                        "1x SWD",
                        "1x ADC",
                        "1x SPI**",
                        "2x GPIO**",
                        "1x MAIN_ANT",
                        "1x GNSS_ANT"
                    ],

                    speeds: {
                        "LTE Cat NB2": {
                            download: "127 Kbps",
                            upload: "158.5 Kbps"
                        }
                    },

                    keyHighlights: [
                        "Integrated eSIM",
                        "Powered by Cavli Hubble",
                        "Applicable regions Global",
                        "GNSS Support",
                        "Ultra-Low Power Consumption",
                        "Compact Form Factor Design",
                        "Cat NB2"
                    ]
                }
            ]
        }
    }
];