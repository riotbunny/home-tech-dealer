// Comprehensive Provider and Plan Catalog covering 27 Nationwide Carriers
export const PROVIDERS_CATALOG = [
  {
    id: "verizon",
    name: "Verizon",
    fullName: "Verizon Fios & 5G Home Internet",
    category: "Tier-1 Telco",
    type: "Fiber & 5G Home",
    color: "#EE0000",
    badge: "Fastest Speeds & 5G Ultra Wideband",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Very High (Fios + Verizon Wireless + Streaming Perks)",
    installationSla: "Self-Install / Next-Day Pro",
    complianceScore: "99.9%",
    plans: [
      {
        id: "verizon-5g-home",
        name: "Verizon 5G Home Internet",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "20-50 Mbps",
        price: 50,
        period: "mo.",
        contract: "No Annual Contract & 2-Yr Guarantee",
        equipmentFee: "$0 / mo (Included 5G Wi-Fi 6 Router)",
        dataCap: "Unlimited High-Speed Data",
        perks: [
          "2-Year price guarantee",
          "No equipment rental fees or data caps",
          "Save up to $25/mo with select 5G mobile plans",
          "Easy self-setup with zero technician wait"
        ],
        bountyEstimate: 160,
        popular: true
      },
      {
        id: "verizon-fios-300",
        name: "Verizon Fios 300",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "300 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Included Wi-Fi Router)",
        dataCap: "Unlimited Data",
        perks: [
          "100% Symmetrical download & upload",
          "No annual contract or hidden price hikes",
          "Stream 4K on up to 10 devices simultaneously"
        ],
        bountyEstimate: 150,
        popular: false
      },
      {
        id: "verizon-fios-gig",
        name: "Verizon Fios Gigabit Connection",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 79.99,
        period: "mo.",
        contract: "No Annual Contract & 4-Yr Guarantee",
        equipmentFee: "$0 / mo (Whole-Home Wi-Fi + Extender)",
        dataCap: "Unlimited Data",
        perks: [
          "True 1 Gig symmetrical fiber optic speed",
          "4-Year price guarantee",
          "Free router and Wi-Fi extender rental",
          "$150 Target GiftCard or Ray-Ban Meta offer"
        ],
        bountyEstimate: 215,
        popular: false
      }
    ]
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    fullName: "T-Mobile 5G Home Internet",
    category: "Tier-1 Wireless",
    type: "5G Home Internet",
    color: "#E20074",
    badge: "America's Largest 5G Home Footprint",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (5G Internet + Voice Lines + T-Mobile Tuesdays)",
    installationSla: "15-Minute Plug & Play Self-Install",
    complianceScore: "99.8%",
    plans: [
      {
        id: "tmobile-home-standard",
        name: "T-Mobile 5G Home Internet",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "50 Mbps",
        price: 50,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Wi-Fi 6 Gateway Included)",
        dataCap: "Unlimited High-Speed Data",
        perks: [
          "15-minute plug-and-play setup (no drilling or wires)",
          "Price Lock guarantee on rate",
          "No equipment fees or hidden surcharges",
          "15-day money-back test drive"
        ],
        bountyEstimate: 145,
        popular: true
      },
      {
        id: "tmobile-home-plus",
        name: "T-Mobile 5G Home Internet Plus",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "75 Mbps",
        price: 70,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Wi-Fi 6 Mesh Extender Included)",
        dataCap: "Unlimited High-Speed Data",
        perks: [
          "Whole-home coverage with included Wi-Fi 6 Mesh Extender",
          "Price Lock guarantee on rate",
          "24/7 dedicated Home Internet support",
          "$100 Virtual Prepaid Mastercard on activation"
        ],
        bountyEstimate: 180,
        popular: false
      }
    ]
  },
  {
    id: "earthlink",
    name: "EarthLink",
    fullName: "EarthLink Fiber & Wireless",
    category: "National ISP",
    type: "Fiber & High-Speed Wireless",
    color: "#F58220",
    badge: "Award-Winning Customer Service",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium (Fiber + EarthLink EasyShield Security)",
    installationSla: "Professional 48-Hour Setup",
    complianceScore: "99.6%",
    plans: [
      {
        id: "earthlink-fiber-500",
        name: "EarthLink HyperLink 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 59.95,
        period: "mo.",
        contract: "No Contract & No Data Caps",
        equipmentFee: "$9.95 / mo (Wi-Fi 6 Gateway)",
        dataCap: "Unlimited Data (Zero Throttling)",
        perks: [
          "100% Symmetrical fiber optic speeds",
          "No internet data caps or speed throttling",
          "Dedicated US-based customer care",
          "EarthLink EasyShield privacy security included"
        ],
        bountyEstimate: 140,
        popular: true
      },
      {
        id: "earthlink-fiber-1000",
        name: "EarthLink HyperLink 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 79.95,
        period: "mo.",
        contract: "No Contract & No Data Caps",
        equipmentFee: "$9.95 / mo (Wi-Fi 6 Gateway)",
        dataCap: "Unlimited Data (Zero Throttling)",
        perks: [
          "Gigabit symmetrical speed for power homes",
          "Zero data caps or buffering",
          "$100 Visa Prepaid Reward Card",
          "Free standard professional installation"
        ],
        bountyEstimate: 175,
        popular: false
      }
    ]
  },
  {
    id: "starlink",
    name: "Starlink",
    fullName: "Starlink Satellite Internet (SpaceX)",
    category: "Satellite LEO",
    type: "Satellite & LEO Broadband",
    color: "#0F172A",
    badge: "SpaceX Low-Earth Orbit Satellite",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Nationwide Coverage: 100% US Geography)",
    installationSla: "2-3 Day Self-Install Kit Delivery",
    complianceScore: "99.9%",
    plans: [
      {
        id: "starlink-standard",
        name: "Starlink Residential",
        downloadSpeed: "150 Mbps",
        uploadSpeed: "20 Mbps",
        price: 120,
        period: "mo.",
        contract: "No Long-Term Contracts",
        equipmentFee: "$349 One-Time Hardware Kit",
        dataCap: "Unlimited High-Speed Data",
        perks: [
          "High-speed low-latency broadband anywhere with sky view",
          "Engineered by SpaceX for rural & remote homes",
          "30-day in-home trial with full hardware refund",
          "No contracts, cancellation fees, or data limits"
        ],
        bountyEstimate: 130,
        popular: true
      },
      {
        id: "starlink-priority",
        name: "Starlink Priority",
        downloadSpeed: "220 Mbps",
        uploadSpeed: "25-40 Mbps",
        price: 140,
        period: "mo.",
        contract: "No Long-Term Contracts",
        equipmentFee: "$349 One-Time Hardware Kit",
        dataCap: "Unlimited Priority Network Data",
        perks: [
          "Network priority during peak congestion hours",
          "Faster upload & download speeds for home businesses",
          "24/7 dedicated priority technical support",
          "Public IPv4 address included"
        ],
        bountyEstimate: 165,
        popular: false
      }
    ]
  },
  {
    id: "att",
    name: "AT&T",
    fullName: "AT&T Fiber & Internet",
    category: "Tier-1 Telco",
    type: "Fiber & 5G Home",
    color: "#00A8E0",
    badge: "100% Symmetrical Fiber",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Very High (Triple-Play: Fiber + Wireless + DIRECTV)",
    installationSla: "Next-Day / 48hr",
    complianceScore: "99.8%",
    plans: [
      {
        id: "att-300",
        name: "AT&T Fiber 300",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "300 Mbps",
        price: 55,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Included Wi-Fi 6 Gateway)",
        dataCap: "Unlimited Data",
        perks: ["No equipment fees", "No price hike at 12 mos", "$50 Reward Card with Token Buyflow"],
        bountyEstimate: 140,
        popular: false
      },
      {
        id: "att-500",
        name: "AT&T Fiber 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 65,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Included Wi-Fi 6 Gateway)",
        dataCap: "Unlimited Data",
        perks: ["Ultra-low latency (11ms)", "AT&T ActiveArmor Security", "$100 Reward Card"],
        bountyEstimate: 175,
        popular: true
      },
      {
        id: "att-1000",
        name: "AT&T Fiber 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 80,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Included Smart Wi-Fi 6E)",
        dataCap: "Unlimited Data",
        perks: ["Gigabit symmetrical", "Free professional install", "$150 Reward Card + 20% Mobile Bundle"],
        bountyEstimate: 210,
        popular: false
      }
    ]
  },
  {
    id: "spectrum",
    name: "Spectrum",
    fullName: "Spectrum (Charter, TWC & BrightHouse)",
    category: "Tier-1 MSO",
    type: "Cable & High-Split Fiber",
    color: "#0078D7",
    badge: "Largest National Footprint",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Internet + Spectrum Mobile + TV Stream)",
    installationSla: "Self-Install / 24-48hr Pro",
    complianceScore: "99.7%",
    plans: [
      {
        id: "spec-500",
        name: "Spectrum Internet Premier",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "20-50 Mbps",
        price: 50,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "$0 Modem ($7/mo Advanced WiFi router)",
        dataCap: "Unlimited Data",
        perks: ["Free modem", "No contracts", "1 Free Spectrum Mobile Unlimited line for 12 mos ($360 val)"],
        bountyEstimate: 155,
        popular: true
      },
      {
        id: "spec-gig",
        name: "Spectrum Internet Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "35-500 Mbps",
        price: 70,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "$0 Modem ($7/mo Advanced WiFi router)",
        dataCap: "Unlimited Data",
        perks: ["Gigabit download", "Xumo Stream Box eligibility", "Free Mobile line for 12 mos"],
        bountyEstimate: 195,
        popular: false
      }
    ]
  },
  {
    id: "comcast",
    name: "Comcast (Xfinity)",
    fullName: "Comcast (Xfinity Broadband & Mobile)",
    category: "Tier-1 MSO",
    type: "DOCSIS 4.0 & Fiber",
    color: "#E60000",
    badge: "Next-Gen Multi-Gig DOCSIS",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Internet + Xfinity Mobile + NOW TV)",
    installationSla: "Self-Install Kit / Pro Install",
    complianceScore: "99.5%",
    plans: [
      {
        id: "xf-connect",
        name: "Xfinity Connect More",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "20 Mbps",
        price: 45,
        period: "mo.",
        contract: "1-Yr Agreement or No-Term Option",
        equipmentFee: "$15/mo xFi Gateway (or Own Modem)",
        dataCap: "1.2 TB / mo (Unlimited with xFi Complete)",
        perks: ["Peacock Premium offer", "Nationwide WiFi hotspots", "Autopay discount included"],
        bountyEstimate: 130,
        popular: false
      },
      {
        id: "xf-fast",
        name: "Xfinity Fast & Reliable",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "100 Mbps",
        price: 60,
        period: "mo.",
        contract: "1-Yr Agreement or No-Term Option",
        equipmentFee: "$15/mo xFi Gateway",
        dataCap: "1.2 TB / mo (Unlimited eligible)",
        perks: ["2-year rate guarantee", "xFi Advanced Security", "Xfinity Mobile bundle savings"],
        bountyEstimate: 165,
        popular: true
      },
      {
        id: "xf-gig",
        name: "Xfinity Gigabit Extra",
        downloadSpeed: "1200 Mbps",
        uploadSpeed: "200 Mbps",
        price: 80,
        period: "mo.",
        contract: "1-Yr Agreement or No-Term Option",
        equipmentFee: "$15/mo xFi Gateway",
        dataCap: "Unlimited with xFi Complete",
        perks: ["Multi-gig speed", "Pro install waived with bundle", "$100 Prepaid Card"],
        bountyEstimate: 200,
        popular: false
      }
    ]
  },
  {
    id: "frontier",
    name: "Frontier",
    fullName: "Frontier Fiber Optic",
    category: "Tier-1 Fiber Telco",
    type: "100% Pure Fiber",
    color: "#FF0037",
    badge: "Top Rated Fiber Value",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Fiber 500M - 5 Gig + YouTube TV discount)",
    installationSla: "24-48hr Dedicated Tech",
    complianceScore: "99.9%",
    plans: [
      {
        id: "front-500",
        name: "Frontier Fiber 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 44.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Amazon eero Pro 6 Included)",
        dataCap: "Unlimited Data",
        perks: ["Free eero 6 mesh router", "Free activation & installation ($85 val)", "No data caps"],
        bountyEstimate: 160,
        popular: true
      },
      {
        id: "front-1000",
        name: "Frontier Fiber 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 64.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 / mo (Amazon eero Pro 6E Included)",
        dataCap: "Unlimited Data",
        perks: ["Ultra-fast Wi-Fi 6E router included", "$100 Visa Reward Card", "Expert install included"],
        bountyEstimate: 190,
        popular: false
      }
    ]
  },
  {
    id: "cox",
    name: "Cox",
    fullName: "Cox Communications",
    category: "Tier-1 MSO",
    type: "Cable & Fiber",
    color: "#0068B3",
    badge: "Leading Southwest & South MSO",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Cox Panoramic Wifi + Mobile + Homelife)",
    installationSla: "Self-Install / Pro",
    complianceScore: "99.4%",
    plans: [
      {
        id: "cox-500",
        name: "Cox GoBeyond (500 Mbps)",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "50 Mbps",
        price: 65,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Panoramic WiFi included for 12 mos",
        dataCap: "1.25 TB",
        perks: ["Wall-to-wall WiFi guarantee", "Cox Mobile bundle discount", "24/7 Premium support"],
        bountyEstimate: 150,
        popular: true
      },
      {
        id: "cox-gig",
        name: "Cox GoSuperFast (1 Gig)",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "100 Mbps",
        price: 85,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Panoramic WiFi included for 24 mos",
        dataCap: "1.25 TB",
        perks: ["Gigabit download", "Free self-install kit", "Security suite"],
        bountyEstimate: 185,
        popular: false
      }
    ]
  },
  {
    id: "optimum",
    name: "Altice (Optimum)",
    fullName: "Altice (Optimum Fiber & Cable)",
    category: "Tier-1 MSO / Fiber",
    type: "100% Fiber & Coaxial",
    color: "#002B49",
    badge: "NY Metro & Tri-State Leader",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Optimum Complete: Internet + Mobile savings)",
    installationSla: "24-48hr Pro Install",
    complianceScore: "99.6%",
    plans: [
      {
        id: "opt-500",
        name: "Optimum Fiber 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 55,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 Smart WiFi 6 Gateway",
        dataCap: "Unlimited Data",
        perks: ["Symmetrical fiber speeds", "$100 Visa Reward Card", "Free standard install"],
        bountyEstimate: 160,
        popular: true
      },
      {
        id: "opt-1000",
        name: "Optimum Fiber 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 70,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "$0 Smart WiFi 6 Gateway",
        dataCap: "Unlimited Data",
        perks: ["Gigabit speed", "$200 Visa Reward Card", "2-year price lock"],
        bountyEstimate: 195,
        popular: false
      }
    ]
  },
  {
    id: "ziply",
    name: "Ziply Fiber",
    fullName: "Ziply Fiber (Pacific Northwest)",
    category: "Regional Fiber",
    type: "100% Fiber",
    color: "#008853",
    badge: "PNW Symmetrical Fiber Champion",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Fiber Internet + Home Phone + Whole-Home Mesh)",
    installationSla: "48hr Pro Install",
    complianceScore: "99.8%",
    plans: [
      {
        id: "ziply-500",
        name: "Ziply Fiber 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 50,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "WiFi 6 router optional / No gateway fee",
        dataCap: "Unlimited Data",
        perks: ["Zero data caps", "No contracts or hidden fees", "Free standard installation"],
        bountyEstimate: 145,
        popular: true
      },
      {
        id: "ziply-gig",
        name: "Ziply Fiber Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 60,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "WiFi 6 router included 12 mos",
        dataCap: "Unlimited Data",
        perks: ["Multi-gig upgrade ready", "No credit check options", "Local customer service"],
        bountyEstimate: 180,
        popular: false
      }
    ]
  },
  {
    id: "directv",
    name: "DIRECTV",
    fullName: "DIRECTV & DIRECTV Stream",
    category: "Premium Video / Satellite",
    type: "Satellite & Cloud Stream",
    color: "#002F6C",
    badge: "Industry Standard Sports & Video RGU",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Very High (High Commission Video Attach with any ISP)",
    installationSla: "Next-Day Pro / Instant Stream",
    complianceScore: "99.9%",
    plans: [
      {
        id: "dtv-choice",
        name: "DIRECTV Choice Package",
        downloadSpeed: "Streaming / Satellite",
        uploadSpeed: "N/A",
        price: 84.99,
        period: "mo.",
        contract: "2-Yr Agreement or No-Term Stream",
        equipmentFee: "Gemini device included",
        dataCap: "Unlimited Cloud DVR",
        perks: ["Regional Sports Networks included", "NFL Sunday Ticket / sports perks", "Stream on unlimited screens"],
        bountyEstimate: 220,
        popular: true
      },
      {
        id: "dtv-ent",
        name: "DIRECTV Entertainment",
        downloadSpeed: "Streaming / Satellite",
        uploadSpeed: "N/A",
        price: 69.99,
        period: "mo.",
        contract: "2-Yr Agreement or No-Term Stream",
        equipmentFee: "Gemini device included",
        dataCap: "Unlimited Cloud DVR",
        perks: ["75+ top cable channels", "Free Max, Paramount+ for 3 mos", "Autopay & paperless discount"],
        bountyEstimate: 180,
        popular: false
      }
    ]
  },
  {
    id: "astound",
    name: "Astound",
    fullName: "Astound Broadband (formerly RCN, Grande & Wave)",
    category: "Regional MSO",
    type: "Fiber & Cable",
    color: "#E20074",
    badge: "Metro Boston, Chicago, Texas & PNW",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium-High (Internet + TV + Mobile)",
    installationSla: "24-48hr Pro / Quick Connect",
    complianceScore: "99.5%",
    plans: [
      {
        id: "ast-300",
        name: "Astound 300 Mbps Internet",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "20 Mbps",
        price: 35,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "Modem/Router available",
        dataCap: "Unlimited Data",
        perks: ["2-year price lock", "No contracts", "$50 bill credit"],
        bountyEstimate: 125,
        popular: false
      },
      {
        id: "ast-gig",
        name: "Astound 1000 Mbps Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "50-100 Mbps",
        price: 55,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "WiFi Pro included",
        dataCap: "Unlimited Data",
        perks: ["Gigabit speeds", "12-month free streaming bundle", "$100 Prepaid Card"],
        bountyEstimate: 165,
        popular: true
      }
    ]
  },
  {
    id: "windstream",
    name: "Windstream (Kinetic)",
    fullName: "Windstream Kinetic Fiber",
    category: "Mid-Major Telco",
    type: "100% Fiber",
    color: "#00833E",
    badge: "Expanding 18-State Rural & Metro Footprint",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium-High",
    installationSla: "48hr Pro",
    complianceScore: "99.7%",
    plans: [
      {
        id: "kin-500",
        name: "Kinetic Fiber 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "Kinetic Wi-Fi Gateway included",
        dataCap: "Unlimited Data",
        perks: ["Symmetrical upload/download", "No contracts", "$100 Kinetic Reward Card"],
        bountyEstimate: 155,
        popular: true
      },
      {
        id: "kin-gig",
        name: "Kinetic Fiber 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 69.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "Wi-Fi 6 Gateway included",
        dataCap: "Unlimited Data",
        perks: ["Multi-device streaming ready", "$150 Reward Card", "Free standard install"],
        bountyEstimate: 190,
        popular: false
      }
    ]
  },
  {
    id: "mediacom",
    name: "Mediacom (Xtream)",
    fullName: "Mediacom Xtream Internet",
    category: "Mid-Major MSO",
    type: "DOCSIS 3.1 & Fiber",
    color: "#003A70",
    badge: "Midwest & Southeast Dominant",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium (Internet + Xtream TV + Mobile)",
    installationSla: "Self-Install / Pro",
    complianceScore: "99.3%",
    plans: [
      {
        id: "med-500",
        name: "Xtream Internet 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "30 Mbps",
        price: 54.99,
        period: "mo.",
        contract: "1-Yr Agreement",
        equipmentFee: "Xtream WiFi 360 Pro available",
        dataCap: "1500 GB",
        perks: ["Total Defense security included", "Free modem lease promo", "24/7 Support"],
        bountyEstimate: 140,
        popular: true
      }
    ]
  },
  {
    id: "metronet",
    name: "Metronet",
    fullName: "Metronet Pure Fiber",
    category: "Fast-Growing Fiber Overbuilder",
    type: "100% Fiber",
    color: "#F47920",
    badge: "16-State Midwest & South Fiber Network",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (High CSAT, Pure Fiber)",
    installationSla: "24-48hr Pro",
    complianceScore: "99.8%",
    plans: [
      {
        id: "metro-500",
        name: "Metronet 500 Mb Fiber",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 49.95,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "$0 / mo (WholeHome WiFi included)",
        dataCap: "Unlimited Data",
        perks: ["Symmetrical speeds", "No data caps", "Free installation with promo code"],
        bountyEstimate: 160,
        popular: true
      },
      {
        id: "metro-gig",
        name: "Metronet 1 Gb Fiber",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 69.95,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "$0 / mo (WholeHome WiFi included)",
        dataCap: "Unlimited Data",
        perks: ["Multi-gigabit network", "$100 Gift Card", "No contract lock"],
        bountyEstimate: 195,
        popular: false
      }
    ]
  },
  {
    id: "breezeline",
    name: "Breezeline",
    fullName: "Breezeline (formerly Atlantic Broadband)",
    category: "Regional MSO / Fiber",
    type: "Fiber & Cable",
    color: "#00B2E2",
    badge: "East Coast & Ohio Footprint",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48hr Pro",
    complianceScore: "99.5%",
    plans: [
      {
        id: "breeze-500",
        name: "Breezeline Base 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "50 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "WiFi Your Way powered by Plume",
        dataCap: "Unlimited Data",
        perks: ["Plume HomePass app", "No contract required", "Free self-install kit"],
        bountyEstimate: 145,
        popular: true
      }
    ]
  },
  {
    id: "tds",
    name: "TDS",
    fullName: "TDS Telecom",
    category: "Regional Telco / Fiber",
    type: "Fiber & High-Speed Internet",
    color: "#27348B",
    badge: "Upper Midwest & Pacific Northwest",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48-72hr Pro",
    complianceScore: "99.6%",
    plans: [
      {
        id: "tds-300",
        name: "TDS Fiber 300M",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "300 Mbps",
        price: 45,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Wi-Fi included 12 mos",
        dataCap: "Unlimited Data",
        perks: ["Symmetrical speed", "Price for Life offers available", "Local field support"],
        bountyEstimate: 135,
        popular: true
      }
    ]
  },
  {
    id: "wow",
    name: "WOW",
    fullName: "WOW! Internet, TV & Phone",
    category: "Regional MSO",
    type: "Cable & All-Fiber Expansion",
    color: "#FF4500",
    badge: "Central & Southeast Footprint",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "24-48hr Pro",
    complianceScore: "99.4%",
    plans: [
      {
        id: "wow-500",
        name: "WOW! Internet 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "50 Mbps",
        price: 45,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Modem rental or bring your own",
        dataCap: "Unlimited Data",
        perks: ["Award-winning customer service", "No contracts", "$50 Visa Reward Card"],
        bountyEstimate: 140,
        popular: true
      }
    ]
  },
  {
    id: "clearwave",
    name: "Clearwave Fiber",
    fullName: "Clearwave Fiber",
    category: "Regional Fiber Overbuilder",
    type: "100% Fiber",
    color: "#009688",
    badge: "High-Growth Midwest & Southeast Fiber",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48hr Pro",
    complianceScore: "99.7%",
    plans: [
      {
        id: "clear-500",
        name: "Clearwave GigSpeed 500",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Free Smart Wi-Fi 6 Router",
        dataCap: "Unlimited Data",
        perks: ["Gigabit symmetrical network", "No data throttling", "Free installation"],
        bountyEstimate: 150,
        popular: true
      }
    ]
  },
  {
    id: "altafiber",
    name: "Altafiber",
    fullName: "Altafiber (formerly Cincinnati Bell)",
    category: "Regional Fiber Pioneer",
    type: "100% Fioptics Fiber",
    color: "#004B87",
    badge: "Greater Cincinnati, Dayton & Hawaii",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High",
    installationSla: "24-48hr Pro",
    complianceScore: "99.8%",
    plans: [
      {
        id: "alta-500",
        name: "Fioptics 500 Mbps",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Premier Wi-Fi included",
        dataCap: "Unlimited Data",
        perks: ["Fiber to the home", "$100 Mastercard with token buyflow", "Free standard install"],
        bountyEstimate: 155,
        popular: true
      }
    ]
  },
  {
    id: "buckeye",
    name: "Buckeye Broadband",
    fullName: "Buckeye Broadband",
    category: "Regional MSO / Fiber",
    type: "Cable & Fiber",
    color: "#B30838",
    badge: "Northwest Ohio & Southeast Michigan",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48hr Pro",
    complianceScore: "99.5%",
    plans: [
      {
        id: "buck-400",
        name: "Buckeye Fiber-Fast 400",
        downloadSpeed: "400 Mbps",
        uploadSpeed: "25 Mbps",
        price: 49.99,
        period: "mo.",
        contract: "No Annual Contract",
        equipmentFee: "Smart WiFi modem",
        dataCap: "Unlimited Data available",
        perks: ["Brainiacs tech support", "Stream TV app", "No contract option"],
        bountyEstimate: 130,
        popular: true
      }
    ]
  },
  {
    id: "bend",
    name: "Bend Broadband",
    fullName: "Bend Broadband (TDS Family)",
    category: "Regional MSO",
    type: "Cable & Fiber",
    color: "#1E3D59",
    badge: "Central Oregon Leader",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48-72hr Pro",
    complianceScore: "99.6%",
    plans: [
      {
        id: "bend-300",
        name: "BendBroadband Ultra 300",
        downloadSpeed: "300 Mbps",
        uploadSpeed: "20 Mbps",
        price: 44.95,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "WiFi Gateway available",
        dataCap: "Unlimited Data",
        perks: ["Local Bend customer center", "Fast streaming", "Bundle discounts"],
        bountyEstimate: 135,
        popular: true
      }
    ]
  },
  {
    id: "hawaiian",
    name: "Hawaiian Telcom",
    fullName: "Hawaiian Telcom (Altafiber Family)",
    category: "Regional Telco / Fiber",
    type: "Fioptics Pure Fiber",
    color: "#007A87",
    badge: "State of Hawaii Statewide Fiber",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium-High",
    installationSla: "48hr Pro",
    complianceScore: "99.7%",
    plans: [
      {
        id: "hi-500",
        name: "Fioptics Hawaii 500M",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "300 Mbps",
        price: 54.99,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "WiFi Gateway included",
        dataCap: "Unlimited Data",
        perks: ["Island-wide fiber coverage", "$50 Bill credit", "Free standard install"],
        bountyEstimate: 150,
        popular: true
      }
    ]
  },
  {
    id: "consolidated",
    name: "Consolidated Communications",
    fullName: "Consolidated Communications (Fidium Fiber)",
    category: "Mid-Major Telco / Fiber",
    type: "100% Fidium Fiber",
    color: "#2B547E",
    badge: "Northern New England, Texas & California",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High (Fidium Brand Growth)",
    installationSla: "24-48hr Pro",
    complianceScore: "99.8%",
    plans: [
      {
        id: "fidium-1000",
        name: "Fidium Fiber 1 Gig",
        downloadSpeed: "1000 Mbps",
        uploadSpeed: "1000 Mbps",
        price: 65,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "$0 / mo (WiFi 6 Gateway & Attune App Included)",
        dataCap: "Unlimited Data",
        perks: ["Symmetrical 1000 Mbps", "Attune smart home security app", "Free professional install"],
        bountyEstimate: 185,
        popular: true
      }
    ]
  },
  {
    id: "smithville",
    name: "SmithVille",
    fullName: "SmithVille Fiber",
    category: "Independent Regional Fiber",
    type: "100% GigaCity Fiber",
    color: "#336699",
    badge: "Indiana Premium Fiber Network",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "Medium",
    installationSla: "48hr Pro",
    complianceScore: "99.9%",
    plans: [
      {
        id: "smith-500",
        name: "SmithVille GigaCity 500M",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "500 Mbps",
        price: 59.99,
        period: "mo.",
        contract: "No Contract",
        equipmentFee: "Optical Network Terminal included",
        dataCap: "Unlimited Data",
        perks: ["True fiber direct to home", "Zero throttling", "Dedicated Indiana support"],
        bountyEstimate: 145,
        popular: true
      }
    ]
  },
  {
    id: "viasat",
    name: "ViaSat",
    fullName: "ViaSat Satellite Internet",
    category: "National Satellite",
    type: "High-Capacity Satellite",
    color: "#2C3E50",
    badge: "100% Nationwide Rural Coverage",
    tokenStatus: "Direct Token API Active",
    rguAttachPotential: "High Bounty (Critical for Off-Grid Addresses)",
    installationSla: "3-5 Business Days Pro",
    complianceScore: "99.4%",
    plans: [
      {
        id: "viasat-100",
        name: "ViaSat Choice 100",
        downloadSpeed: "100 Mbps",
        uploadSpeed: "10 Mbps",
        price: 99.99,
        period: "mo.",
        contract: "2-Yr Agreement",
        equipmentFee: "$15/mo equipment lease",
        dataCap: "Unlimited Data with Priority Allocation",
        perks: ["Available where cable/fiber cannot reach", "Built-in Wi-Fi gateway", "Nationwide coverage"],
        bountyEstimate: 210,
        popular: true
      }
    ]
  }
];

// Helper to calculate total roster count
export const TOTAL_PROVIDERS_COUNT = PROVIDERS_CATALOG.length;
