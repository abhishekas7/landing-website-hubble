import React from "react";
import { Product } from "../types/product";
import {
  RiChat4Line,
  RiDeviceLine,
  RiSimCardLine,
  RiCloudLine,
  RiRefreshLine,
  RiDatabase2Line,
  RiGitBranchLine,
} from "react-icons/ri";

export const products: Product[] = [
  {
    id: 1,
    name: "Hubble Messaging Service",
    description:
      "Secure and scalable messaging that enables IoT devices to reliably exchange data between connected devices, cloud platforms, and applications.",
    image: <RiChat4Line size={40} />,

    overview:
      "Hubble Messaging Service provides a reliable communication layer for IoT deployments. It enables connected devices to exchange telemetry, commands, and operational data with cloud platforms and applications through a centralized messaging infrastructure.",

    features: [
      "Reliable device-to-cloud messaging",
      "Real-time data communication",
      "Secure message transmission",
      "Scalable IoT communication infrastructure",
      "Centralized message management",
      "Support for large-scale device deployments",
    ],

    benefits: [
      "Improve reliability of IoT data communication",
      "Reduce communication complexity",
      "Centralize device messaging",
      "Scale communication as device fleets grow",
    ],

    useCases: [
      "Industrial IoT",
      "Smart infrastructure",
      "Connected vehicles",
      "Remote monitoring",
      "Asset tracking",
    ],

    specifications: [
      { label: "Category", value: "IoT Connectivity" },
      { label: "Communication", value: "Device-to-Cloud" },
      { label: "Architecture", value: "Cloud-based" },
      { label: "Scalability", value: "Enterprise-ready" },
    ],
  },

  {
    id: 2,
    name: "Device Orchestration & Monitoring",
    description:
      "Monitor and manage connected IoT devices from a centralized platform with real-time visibility into device health, status, and modem parameters.",
    image: <RiDeviceLine size={40} />,

    overview:
      "Device Orchestration & Monitoring provides centralized visibility and control over connected devices. Operators can monitor device health, connectivity, modem parameters, and operational status from a single platform.",

    features: [
      "Centralized device management",
      "Real-time device status",
      "Device health monitoring",
      "Modem parameter visibility",
      "Remote device management",
      "Fleet-level monitoring",
    ],

    benefits: [
      "Reduce device management complexity",
      "Identify connectivity issues faster",
      "Improve operational visibility",
      "Manage large device fleets from one platform",
    ],

    useCases: [
      "Industrial equipment monitoring",
      "Fleet management",
      "Smart meters",
      "Connected machinery",
      "Remote asset monitoring",
    ],

    specifications: [
      { label: "Category", value: "Device Management" },
      { label: "Monitoring", value: "Real-time" },
      { label: "Management", value: "Centralized" },
      { label: "Deployment", value: "Cloud-based" },
    ],
  },

  {
    id: 3,
    name: "Intelligent eSIM Management",
    description:
      "Manage eSIM profiles and cellular connectivity remotely to keep IoT devices connected across different networks and regions.",
    image: <RiSimCardLine size={40} />,

    overview:
      "Intelligent eSIM Management simplifies cellular connectivity for IoT deployments by providing centralized management of eSIM profiles, network connectivity, and subscription information across multiple regions.",

    features: [
      "Remote eSIM profile management",
      "Centralized connectivity control",
      "Multi-network connectivity",
      "Remote profile provisioning",
      "Subscription visibility",
      "Global connectivity management",
    ],

    benefits: [
      "Simplify global IoT connectivity",
      "Reduce physical SIM management",
      "Enable remote connectivity changes",
      "Improve fleet deployment flexibility",
    ],

    useCases: [
      "Connected vehicles",
      "Global IoT deployments",
      "Industrial IoT",
      "Asset tracking",
      "Smart devices",
    ],

    specifications: [
      { label: "Category", value: "eSIM Management" },
      { label: "Management", value: "Remote" },
      { label: "Connectivity", value: "Multi-network" },
      { label: "Coverage", value: "Global" },
    ],
  },

  {
    id: 4,
    name: "Web Service API & Cloud Connectors",
    description:
      "Integrate Cavli Hubble with existing applications, IoT platforms, and cloud services using APIs and cloud connectors.",
    image: <RiCloudLine size={40} />,

    overview:
      "Web Service API & Cloud Connectors enable applications and IoT platforms to communicate with Hubble services. Developers can integrate connectivity and device management capabilities into existing software ecosystems.",

    features: [
      "REST API integration",
      "Cloud service connectivity",
      "Application integration",
      "Device data access",
      "Automated workflows",
      "Third-party platform integration",
    ],

    benefits: [
      "Connect existing applications with Hubble",
      "Reduce integration effort",
      "Automate IoT workflows",
      "Build custom IoT applications",
    ],

    useCases: [
      "IoT dashboards",
      "Cloud applications",
      "Enterprise platforms",
      "Data analytics systems",
      "Custom IoT solutions",
    ],

    specifications: [
      { label: "Category", value: "API & Integration" },
      { label: "API Type", value: "Web APIs" },
      { label: "Integration", value: "Cloud & Applications" },
      { label: "Architecture", value: "API-driven" },
    ],
  },

  {
    id: 5,
    name: "Firmware Updates Over-the-Air",
    description:
      "Remotely deploy and manage firmware updates across connected IoT devices without requiring physical access to the hardware.",
    image: <RiRefreshLine size={40} />,

    overview:
      "Firmware Updates Over-the-Air enables organizations to remotely distribute firmware updates to connected devices. This allows device software to be maintained without requiring physical access to deployed hardware.",

    features: [
      "Remote firmware deployment",
      "Centralized update management",
      "Device update tracking",
      "Version management",
      "Remote software maintenance",
      "Fleet-wide updates",
    ],

    benefits: [
      "Reduce physical maintenance requirements",
      "Keep devices up to date",
      "Improve device security",
      "Reduce operational costs",
    ],

    useCases: [
      "Connected vehicles",
      "Industrial equipment",
      "Smart appliances",
      "Remote sensors",
      "IoT gateways",
    ],

    specifications: [
      { label: "Category", value: "Device Management" },
      { label: "Update Method", value: "Over-the-Air" },
      { label: "Management", value: "Remote" },
      { label: "Deployment", value: "Fleet-wide" },
    ],
  },

  {
    id: 6,
    name: "IoT Data Subscription Management",
    description:
      "Manage IoT data subscriptions and connectivity plans while providing access to cellular networks across different regions.",
    image: <RiDatabase2Line size={40} />,

    overview:
      "IoT Data Subscription Management provides centralized visibility and control over connectivity subscriptions. Organizations can manage data plans, monitor usage, and manage connectivity across deployed IoT devices.",

    features: [
      "Data subscription management",
      "Connectivity plan management",
      "Usage monitoring",
      "Subscription visibility",
      "Multi-region connectivity",
      "Centralized account management",
    ],

    benefits: [
      "Simplify IoT connectivity operations",
      "Improve subscription visibility",
      "Manage connectivity at scale",
      "Optimize data plan management",
    ],

    useCases: [
      "Connected vehicles",
      "Smart city infrastructure",
      "Industrial IoT",
      "Asset tracking",
      "Remote monitoring",
    ],

    specifications: [
      { label: "Category", value: "Connectivity Management" },
      { label: "Subscription", value: "IoT Data Plans" },
      { label: "Coverage", value: "Multi-region" },
      { label: "Management", value: "Centralized" },
    ],
  },

  {
    id: 7,
    name: "Dual-Channel Architecture",
    description:
      "Separate modem authentication and messaging channels to reduce communication conflicts and maintain reliable data transmission.",
    image: <RiGitBranchLine size={40} />,

    overview:
      "Dual-Channel Architecture separates authentication and messaging communication paths. This architecture helps minimize communication conflicts and provides a more reliable foundation for IoT device connectivity.",

    features: [
      "Separated communication channels",
      "Independent authentication flow",
      "Dedicated messaging channel",
      "Reliable data transmission",
      "Improved communication isolation",
      "Scalable architecture",
    ],

    benefits: [
      "Reduce communication conflicts",
      "Improve data transmission reliability",
      "Simplify communication flows",
      "Support scalable IoT deployments",
    ],

    useCases: [
      "Industrial IoT",
      "Connected devices",
      "Remote monitoring",
      "Large device fleets",
      "Mission-critical IoT systems",
    ],

    specifications: [
      { label: "Category", value: "IoT Architecture" },
      { label: "Architecture", value: "Dual-channel" },
      { label: "Authentication", value: "Dedicated Channel" },
      { label: "Messaging", value: "Dedicated Channel" },
    ],
  },
];

