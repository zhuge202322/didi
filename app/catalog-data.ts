import { batteryModels, lx100Models, megaModels, sypModels } from "./product-data";

export type ProductDownload = {
  label: string;
  href: string;
  note: string;
};

export type ProductFamily = {
  slug: string;
  code: string;
  category: string;
  shortTitle: string;
  title: string;
  range: string;
  summary: string;
  description: string;
  image: string;
  imageClass: "cover" | "contain";
  applications: string[];
  highlights: string[];
  technicalRows: Array<[string, string]>;
  modelTable?: {
    columns: string[];
    rows: string[][];
  };
  downloads: ProductDownload[];
};

export const productCatalog: ProductFamily[] = [
  {
    slug: "syp-hybrid-inverters",
    code: "01 / HYBRID INVERTER",
    category: "Power conversion",
    shortTitle: "SYP Series",
    title: "SYP Series Hybrid Inverters",
    range: "9 models · 1.5-12kW",
    summary: "Pure sine wave hybrid inverters for compact off-grid systems through high-capacity parallel projects.",
    description: "The SYP family combines MPPT solar charging, AC charging and lithium communication across nine documented configurations. Model selection is based on load profile, battery voltage, PV array and required parallel capacity.",
    image: "/products/syp-6-5kw.webp",
    imageClass: "contain",
    applications: ["Residential off-grid power", "Backup power systems", "Small commercial solar", "Parallel hybrid installations"],
    highlights: ["Pure sine wave output", "Wide MPPT operating windows", "Lithium and lead-acid support", "Selected models support parallel operation"],
    technicalRows: [
      ["Output range", "1.5-12kW"],
      ["Battery platforms", "12 / 24 / 48VDC"],
      ["PV input", "800W to 15kW dual-MPPT"],
      ["Communication", "LCD, RS232, RS485, USB and CAN by model"],
      ["Parallel operation", "Up to 9 units on selected models"],
      ["Waveform", "Pure sine wave"],
    ],
    modelTable: {
      columns: ["Model", "Output", "Battery", "PV input", "MPPT range", "Parallel"],
      rows: sypModels.map((model) => [model.name, model.output, model.battery, model.pvInput, model.mppt, model.parallel]),
    },
    downloads: [{ label: "SYP product catalog", href: "/downloads/syp-hybrid-inverter-catalog.pdf", note: "9 model specification pages" }],
  },
  {
    slug: "mega-ip65-hybrid-inverters",
    code: "02 / IP65 HYBRID",
    category: "Power conversion",
    shortTitle: "MEGA Series",
    title: "MEGA IP65 Hybrid Inverters",
    range: "6 / 8 / 10 / 12 / 16kW",
    summary: "Single-phase hybrid architecture with wide MPPT range, high-current charging and parallel expansion.",
    description: "MEGA hybrid inverters are designed for higher-capacity residential and light-commercial systems requiring an IP65 enclosure, multiple MPPT inputs and flexible grid, generator and battery operation.",
    image: "/products/mega-installation.png",
    imageClass: "cover",
    applications: ["Premium residential hybrid systems", "Light-commercial backup", "Generator-integrated systems", "Multi-unit parallel projects"],
    highlights: ["IP65 enclosure", "50-450V MPPT range", "Parallel operation up to 6 units", "RS232 / RS485 / CAN / Wi-Fi support"],
    technicalRows: [
      ["Rated power classes", "6 / 8 / 10 / 12 / 16kW"],
      ["System architecture", "Single-phase hybrid"],
      ["Maximum efficiency", "Up to 97% DC/AC reference"],
      ["Battery voltage", "48VDC"],
      ["Operating temperature", "-10°C to 50°C"],
      ["Ingress protection", "IP65"],
    ],
    modelTable: {
      columns: ["Reference model", "Output", "PV input", "MPPT", "Charging", "Weight"],
      rows: megaModels.map((model) => [model.name, model.output, model.pvInput, model.mppt, model.charge, model.weight]),
    },
    downloads: [{ label: "MEGA 6-16kW datasheet", href: "/downloads/mega-6-16kw-ip65.pdf", note: "Feature overview and reference specifications" }],
  },
  {
    slug: "lx100-solar-pump-drives",
    code: "03 / SOLAR PUMP DRIVE",
    category: "Water and motor control",
    shortTitle: "LX100 Series",
    title: "LX100 Solar Pump Drives",
    range: "23 configurations · 2.2-200kW",
    summary: "IEC 62109 tested solar pump inverter platform for single-phase and three-phase motor applications.",
    description: "The LX100 family covers a wide listed power range for solar pumping projects. The supplied IEC 62109 report identifies 23 tested configurations for technical and compliance review.",
    image: "/products/lx100-lineup.jpg",
    imageClass: "cover",
    applications: ["Agricultural irrigation", "Borehole and well pumping", "Livestock water supply", "Remote municipal water"],
    highlights: ["2.2-200kW listed family", "Automatic solar MPPT control", "Single- and three-phase configurations", "IEC 62109 test documentation"],
    technicalRows: [
      ["Listed range", "2.2-200kW"],
      ["Documented configurations", "23"],
      ["Application", "Solar pump and motor control"],
      ["Input concept", "PV-driven platform with model-specific configuration"],
      ["Compliance reference", "IEC 62109 test report supplied"],
      ["Selection basis", "Motor rating, voltage, pump curve and site solar resource"],
    ],
    modelTable: {
      columns: ["Rated power", "Listed model"],
      rows: lx100Models.map(([power, model]) => [power, model]),
    },
    downloads: [{ label: "LX100 IEC 62109 report", href: "/downloads/lx100-iec62109-test-report.pdf", note: "65-page family test report" }],
  },
  {
    slug: "33pv-solar-pump-control",
    code: "04 / MPPT PUMP CONTROL",
    category: "Water and motor control",
    shortTitle: "33PV Series",
    title: "33PV Solar Pump Control",
    range: "Automatic solar drive control",
    summary: "Fast MPPT response, sleep-wake logic and flexible motor compatibility for water systems.",
    description: "The 33PV platform is positioned for solar water-pumping applications that need automatic start, stop and MPPT behavior. Final selection is confirmed against the motor, pump, array and local operating conditions.",
    image: "/products/pump-33pv.jpg",
    imageClass: "contain",
    applications: ["Irrigation pumping", "Water transfer", "Remote boreholes", "Solar retrofit projects"],
    highlights: ["Automatic MPPT tracking", "Sleep and wake control", "Solar pumping workflow", "Application-based configuration"],
    technicalRows: [
      ["Platform", "33PV solar pump control"],
      ["Control focus", "Automatic PV-driven motor operation"],
      ["Operating logic", "MPPT with sleep / wake behavior"],
      ["Required RFQ data", "Motor rating, voltage, pump type and head"],
      ["Document package", "Confirmed by selected model"],
      ["Supply scope", "Drive, protection and related accessories by project"],
    ],
    downloads: [],
  },
  {
    slug: "lx200-industrial-drives",
    code: "05 / INDUSTRIAL DRIVE",
    category: "Industrial motor control",
    shortTitle: "LX200 Series",
    title: "LX200 Industrial Motor Drives",
    range: "Compact through high-capacity frames",
    summary: "Scalable drive frames engineered for demanding motor-control environments and export projects.",
    description: "LX200 industrial drives extend the portfolio beyond solar pumping into general motor-control requirements. Frame and accessory selection is coordinated around motor data, control mode and installation conditions.",
    image: "/products/lx200-series.png",
    imageClass: "contain",
    applications: ["Industrial machinery", "Fans and pumps", "Process equipment", "OEM control panels"],
    highlights: ["Multiple frame sizes", "Industrial motor-control focus", "Project-based accessory selection", "Export inspection support"],
    technicalRows: [
      ["Platform", "LX200 industrial drive"],
      ["Selection basis", "Motor power, voltage, load and control mode"],
      ["Installation", "Panel or machine integration by frame"],
      ["Accessory scope", "Reactors, filters, braking and protection by RFQ"],
      ["Quality review", "Model and nameplate confirmation before shipment"],
      ["Documentation", "Model-specific package supplied with quotation"],
    ],
    downloads: [],
  },
  {
    slug: "lifepo4-battery-packs",
    code: "06 / LITHIUM STORAGE",
    category: "Energy storage",
    shortTitle: "LiFePO4 Packs",
    title: "Wheeled LiFePO4 Battery Packs",
    range: "100-600Ah · 5.12-30.72kWh",
    summary: "Grade A cells, integrated BMS, LCD interface and project-ready communication protocols.",
    description: "The documented 51.2V battery range covers five high-capacity wheeled packs plus a 100Ah transport reference. Each unit integrates BMS protection and communication for inverter and ESS coordination.",
    image: "/products/battery-460ah.png",
    imageClass: "contain",
    applications: ["Residential energy storage", "Commercial backup", "Solar self-consumption", "Hybrid inverter systems"],
    highlights: ["Brand-new Grade A LiFePO4 cells", "RS485 / RS232 / CAN", "Integrated LCD and BMS", "MSDS and transport references"],
    technicalRows: [
      ["Nominal platform", "51.2VDC"],
      ["Capacity range", "100-600Ah"],
      ["Energy range", "5.12-30.72kWh"],
      ["Charging mode", "CC/CV, 58.4V"],
      ["Communication", "RS485 / RS232 / CAN"],
      ["Working environment", "-10°C to 60°C, document reference"],
    ],
    modelTable: {
      columns: ["Battery", "Energy", "BMS discharge", "Gross packed weight"],
      rows: batteryModels.map((model) => [model.name, model.energy, model.discharge, model.grossWeight]),
    },
    downloads: [
      { label: "280 / 300Ah datasheet", href: "/downloads/fuyue-51-2v-280-300ah.pdf", note: "Two documented configurations" },
      { label: "400 / 460 / 600Ah datasheet", href: "/downloads/fuyue-51-2v-400-600ah.pdf", note: "Three documented configurations" },
      { label: "48V100Ah MSDS", href: "/downloads/fuyue-48v100ah-msds.pdf", note: "Material safety and transport reference" },
    ],
  },
  {
    slug: "solar-modules",
    code: "07 / SOLAR GENERATION",
    category: "Solar modules",
    shortTitle: "Solar Modules",
    title: "Solar PV Modules",
    range: "Residential and commercial project supply",
    summary: "Module sourcing coordinated around target power class, destination market and project documentation.",
    description: "Solar module supply is handled as a project-specific sourcing program. The team confirms target wattage, cell technology, dimensions, certification market, packing and container plan before final quotation.",
    image: "/assets/solar-array.jpg",
    imageClass: "cover",
    applications: ["Residential rooftops", "Commercial rooftops", "Ground-mount arrays", "Solar pumping systems"],
    highlights: ["Project-based model shortlist", "Destination-market document review", "Packing and container planning", "Matched inverter and storage supply"],
    technicalRows: [
      ["Module type", "Monocrystalline options by project brief"],
      ["Power class", "Confirmed against current sourcing program"],
      ["Electrical data", "Model datasheet supplied before order"],
      ["Certification", "Destination-market requirements reviewed per RFQ"],
      ["Packing", "Pallet and container plan confirmed with model"],
      ["System matching", "Inverter, structure and storage coordination available"],
    ],
    downloads: [],
  },
  {
    slug: "ess-and-accessories",
    code: "08 / COMPLETE SYSTEM",
    category: "Energy storage systems",
    shortTitle: "ESS & Accessories",
    title: "Integrated ESS and Balance of System",
    range: "PV + inverter + storage + BOS",
    summary: "Coordinated product selection for complete residential, commercial and project energy systems.",
    description: "Complete system RFQs are translated into a coordinated bill of materials covering PV generation, conversion, storage, monitoring, protection, cabling and export packing. Final architecture is based on the load and operating profile.",
    image: "/assets/system-diagram.png",
    imageClass: "contain",
    applications: ["Residential ESS", "Commercial backup", "Remote microgrids", "Solar pumping packages"],
    highlights: ["Single coordinated bill of materials", "Matched inverter and battery communication", "Monitoring and protection accessories", "Project-based export packing"],
    technicalRows: [
      ["Core scope", "PV, inverter, LiFePO4 storage and BOS"],
      ["System basis", "Load profile, autonomy, solar resource and grid condition"],
      ["Accessories", "Protection, monitoring, cable and mounting scope by RFQ"],
      ["Documentation", "Datasheets and available test evidence by selected model"],
      ["Inspection", "Pre-shipment model and packing review"],
      ["Export coordination", "Packing, logistics and document preparation"],
    ],
    downloads: [],
  },
];

export function getProduct(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}
