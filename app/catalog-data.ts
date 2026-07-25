export type ProductCategory = "hybrid" | "pump" | "battery";

export type Product = {
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  name: string;
  shortName: string;
  range: string;
  summary: string;
  description: string;
  image: string;
  specs: Array<[string, string]>;
  features: string[];
  modelTable?: {
    columns: string[];
    rows: string[][];
  };
};

export const productCategories = [
  {
    id: "hybrid" as const,
    title: "Hybrid Solar Inverter",
    subtitle: "Home and small-commercial energy conversion",
    description: "48V hybrid inverter platforms with MPPT charging, lithium battery support and dual-output capability.",
  },
  {
    id: "pump" as const,
    title: "Solar Pump Inverter",
    subtitle: "Solar water pumping and motor control",
    description: "MPPT pump drives for irrigation, water transfer and remote pumping across single- and three-phase systems.",
  },
  {
    id: "battery" as const,
    title: "LiFePO4 Battery",
    subtitle: "High-capacity wheeled energy storage",
    description: "51.2V storage systems with Grade A cells, integrated BMS, LCD and RS485, RS232 and CAN communication.",
  },
];

export const products: Product[] = [
  {
    slug: "yj-6-5kw-48v-inverter",
    category: "hybrid",
    categoryLabel: "Hybrid Solar Inverter",
    name: "YJ-6.5KW/48V Inverter",
    shortName: "YJ 6.5kW",
    range: "6.5kW / 48V",
    summary: "Dual-output hybrid inverter with 9kW PV input and 120A charging.",
    description: "A 48V hybrid inverter for residential and small-commercial solar systems, supporting gel, lead-acid and lithium batteries.",
    image: "/new-site/hybrid-6-5kw.png",
    specs: [
      ["Inverter output power", "6.5kW"],
      ["Battery voltage", "48V"],
      ["MPPT input current / power", "27A / 9,000W"],
      ["MPPT input voltage range", "60-450V"],
      ["Maximum PV open-circuit voltage", "500V"],
      ["PV / AC / maximum charge current", "120A / 120A / 120A"],
      ["Communication", "USB + BMS (RS485); Wi-Fi optional"],
      ["Output channels", "Dual output"],
      ["Working temperature", "-10°C to 60°C"],
      ["Dimensions / net weight", "410 x 336 x 115mm / 8kg"],
      ["Carton / gross weight", "445 x 385 x 165mm / 9kg"],
      ["Warranty", "2 years"],
    ],
    features: ["Gel, lead-acid and lithium battery support", "AC and PV lithium battery activation", "Dual output channels", "Optional Wi-Fi monitoring"],
  },
  {
    slug: "yj-12kw-48v-inverter",
    category: "hybrid",
    categoryLabel: "Hybrid Solar Inverter",
    name: "YJ-12.0KW/48V Inverter",
    shortName: "YJ 12.0kW",
    range: "12.0kW / 48V",
    summary: "High-capacity dual-MPPT inverter with up to 15kW total PV input.",
    description: "A high-output 48V platform for larger home energy and light-commercial projects requiring dual MPPT tracking and 160A charging.",
    image: "/new-site/hybrid-12kw.png",
    specs: [
      ["Inverter output power", "12.0kW"],
      ["Battery voltage", "48V"],
      ["PV input", "9kW single MPPT / 15kW total dual MPPT"],
      ["Dual-MPPT input current", "22.5A per MPPT"],
      ["MPPT input voltage range", "60-450V"],
      ["Maximum PV open-circuit voltage", "500V"],
      ["PV / AC / maximum charge current", "160A / 160A / 160A"],
      ["Communication", "USB + BMS (RS485); Wi-Fi optional"],
      ["Output channels", "Dual output"],
      ["Working temperature", "-10°C to 60°C"],
      ["Dimensions / net weight", "527 x 435 x 138mm / 14.5kg"],
      ["Carton / gross weight", "580 x 500 x 205mm / 16.5kg"],
    ],
    features: ["Dual-MPPT architecture", "Gel, lead-acid and lithium battery support", "AC and PV lithium battery activation", "2-year warranty"],
  },
  {
    slug: "yj-5kw-48v-parallel-inverter",
    category: "hybrid",
    categoryLabel: "Hybrid Solar Inverter",
    name: "YJ-5.0KW/48V Parallel Inverter",
    shortName: "YJ 5.0kW Parallel",
    range: "5.0kW / 48V / Parallel",
    summary: "Parallel-ready hybrid inverter supporting systems of up to nine units.",
    description: "A flexible 48V inverter for scalable installations that require parallel expansion, 6kW PV input and dual outputs.",
    image: "/new-site/hybrid-5kw-parallel.png",
    specs: [
      ["Inverter output power", "5.0kW"],
      ["Battery voltage", "48V"],
      ["MPPT input current / power", "18A / 6,000W"],
      ["MPPT input voltage range", "120-450V"],
      ["Maximum PV open-circuit voltage", "500V"],
      ["PV / AC / maximum charge current", "80A / 80A / 80A"],
      ["Maximum parallel capacity", "9 units"],
      ["Communication", "USB + BMS (RS485); Wi-Fi optional"],
      ["Output channels", "Dual output"],
      ["Working temperature", "-10°C to 60°C"],
      ["Carton / net weight", "510 x 306 x 140mm / 9.5kg"],
      ["Warranty", "2 years"],
    ],
    features: ["Up to nine units in parallel", "Lithium battery activation by AC and PV", "Dual output channels", "Optional Wi-Fi monitoring"],
  },
  {
    slug: "yj100-pv-pump-inverter",
    category: "pump",
    categoryLabel: "Solar Pump Inverter",
    name: "YJ100-PV Solar Pump Inverter",
    shortName: "YJ100-PV",
    range: "0.4-200kW",
    summary: "Wide-range solar pump drive with automatic MPPT and flexible motor support.",
    description: "The YJ100-PV family supports solar pumping across compact single-phase installations and large three-phase water systems.",
    image: "/new-site/pump-yj100.png",
    specs: [
      ["Rated power range", "0.4-200kW"],
      ["Output options", "Single-phase and three-phase"],
      ["Voltage platforms", "110V / 220V / 380V"],
      ["MPPT efficiency", "Up to 99%"],
      ["Motor support", "Asynchronous pumps; synchronous pumps by configuration"],
      ["Control", "Automatic start, sleep and MPPT tracking"],
      ["Protection", "PV over-voltage, over-current and over-temperature derating"],
      ["Monitoring", "Optional GPRS remote monitoring"],
      ["Enclosure", "Optional IP54 cabinet"],
    ],
    features: ["Automatic operation after PV connection", "Optional boost module up to 2.2kW", "Single- and three-phase configurations", "Water-level control wiring support"],
  },
  {
    slug: "yj200-pump-inverter",
    category: "pump",
    categoryLabel: "Solar Pump Inverter",
    name: "YJ200 Solar Pump Inverter",
    shortName: "YJ200",
    range: "0.4-500kW",
    summary: "High-range pump inverter with hybrid AC/PV input and remote monitoring options.",
    description: "The YJ200 platform covers agricultural, municipal and industrial water systems with broad voltage support and flexible installation methods.",
    image: "/new-site/pump-yj200.png",
    specs: [
      ["Rated power range", "0.4-500kW"],
      ["Rated output", "220V single/three-phase; 380V three-phase"],
      ["Output frequency", "0-400Hz"],
      ["MPPT efficiency", "99%"],
      ["Maximum DC input", "Up to 900V by model"],
      ["AC input", "220-240V or 380-440V by model"],
      ["Ambient temperature", "-10°C to 50°C; derating above 40°C"],
      ["Protection level", "IP20"],
      ["Installation", "Wall, rail or flange mounting"],
    ],
    features: ["Hybrid AC and PV operation", "Dry-run and overload protection", "Optional 4G / Wi-Fi remote control", "Water-level and radiation sensor support"],
  },
  {
    slug: "yj33pv-pump-inverter",
    category: "pump",
    categoryLabel: "Solar Pump Inverter",
    name: "YJ33PV Solar Pump Inverter",
    shortName: "YJ33PV",
    range: "0.75-400kW",
    summary: "Two voltage families covering compact 220V and high-capacity 380V pumps.",
    description: "YJ33PV models are selected by pump power, output voltage and the available PV operating window.",
    image: "/new-site/pump-yj33.png",
    specs: [
      ["Rated power range", "0.75-400kW"],
      ["220V family", "0.75-4.0kW; 260-375VDC MPPT window"],
      ["380V family", "0.75-400kW; 486-750VDC MPPT window"],
      ["Output voltage", "0-220VAC or 0-380VAC by model"],
      ["220V input platform", "90/150-450VDC or 220VAC"],
      ["380V input platform", "250/350-800VDC or 380VAC"],
    ],
    features: ["Mini 220V models from 0.75-2.2kW", "General 380V models through 400kW", "IP55 options available on selected power classes", "OEM steel housing available on selected models"],
    modelTable: {
      columns: ["Model", "Rated current", "Output", "Pump power", "MPPT window"],
      rows: [
        ["YJ33PV-0K7GB-2S-M", "3.8A", "0-220VAC", "0.75kW", "260-375VDC"],
        ["YJ33PV-1K5GB-2S-M", "7A", "0-220VAC", "1.5kW", "260-375VDC"],
        ["YJ33PV-2K2GB-2S-M", "10A", "0-220VAC", "2.2kW", "260-375VDC"],
        ["YJ33PV-4K0GB-2S", "17A", "0-220VAC", "4.0kW", "260-375VDC"],
        ["YJ33PV-5K5GB-4T", "13A", "0-380VAC", "5.5kW", "486-750VDC"],
        ["YJ33PV-7K5GB-4T", "17A", "0-380VAC", "7.5kW", "486-750VDC"],
        ["YJ33PV-011GB-4T", "25A", "0-380VAC", "11kW", "486-750VDC"],
        ["YJ33PV-022GB-4T", "45A", "0-380VAC", "22kW", "486-750VDC"],
      ],
    },
  },
  {
    slug: "yj-51-2v-300ah-battery",
    category: "battery",
    categoryLabel: "LiFePO4 Battery",
    name: "YJ 51.2V 300Ah LiFePO4 Battery",
    shortName: "51.2V 300Ah",
    range: "15.36kWh",
    summary: "Wheeled 15.36kWh battery with integrated BMS, LCD and inverter communication.",
    description: "A high-capacity residential and commercial storage pack built with Grade A LiFePO4 cells and a galvanized steel enclosure.",
    image: "/new-site/battery-style-1.png",
    specs: [
      ["Nominal voltage / capacity", "51.2V / 300Ah"],
      ["Energy", "15,360Wh"],
      ["BMS maximum continuous discharge", "150A"],
      ["Battery size", "850 x 440 x 270mm"],
      ["Gross weight with wooden case", "135kg"],
      ["Charging mode / voltage", "CC/CV, 58.4V"],
      ["Recommended charging rate", "0.2-0.3C"],
      ["Communication", "RS485, RS232, CAN"],
      ["Cycle life / warranty", "Over 6,000 cycles / 10 years"],
    ],
    features: ["Brand-new Grade A LiFePO4 cells", "Built-in BMS protection", "LCD screen", "100% inspection before shipment"],
  },
  {
    slug: "yj-51-2v-400ah-battery",
    category: "battery",
    categoryLabel: "LiFePO4 Battery",
    name: "YJ 51.2V 400Ah LiFePO4 Battery",
    shortName: "51.2V 400Ah",
    range: "20.48kWh",
    summary: "20.48kWh wheeled storage pack for long-duration backup and solar self-use.",
    description: "A scalable high-capacity battery platform with integrated communication, LCD monitoring and robust BMS protection.",
    image: "/new-site/battery-style-2.png",
    specs: [
      ["Nominal voltage / capacity", "51.2V / 400Ah"],
      ["Energy", "20,480Wh"],
      ["BMS maximum continuous discharge", "150A"],
      ["Gross weight with wooden case", "180kg"],
      ["Case material", "Thickened galvanized steel sheet"],
      ["Charging mode / voltage", "CC/CV, 58.4V"],
      ["Recommended charging rate", "0.2-0.3C"],
      ["Communication", "RS485, RS232, CAN"],
      ["Cycle life / warranty", "Over 6,000 cycles / 10 years"],
    ],
    features: ["Brand-new Grade A LiFePO4 cells", "Built-in BMS protection", "LCD screen", "OEM and ODM support"],
  },
  {
    slug: "yj-51-2v-600ah-battery",
    category: "battery",
    categoryLabel: "LiFePO4 Battery",
    name: "YJ 51.2V 600Ah LiFePO4 Battery",
    shortName: "51.2V 600Ah",
    range: "30.72kWh",
    summary: "The largest supplied battery configuration, with 200A continuous discharge.",
    description: "A 30.72kWh storage pack for demanding backup and solar energy applications requiring higher continuous discharge capacity.",
    image: "/new-site/battery-style-2.png",
    specs: [
      ["Nominal voltage / capacity", "51.2V / 600Ah"],
      ["Energy", "30,720Wh"],
      ["BMS maximum continuous discharge", "200A"],
      ["Gross weight with wooden case", "265kg"],
      ["Case material", "Thickened galvanized steel sheet"],
      ["Charging mode / voltage", "CC/CV, 58.4V"],
      ["Recommended charging rate", "0.2-0.3C"],
      ["Communication", "RS485, RS232, CAN"],
      ["Cycle life / warranty", "Over 6,000 cycles / 10 years"],
    ],
    features: ["200A continuous discharge", "Brand-new Grade A LiFePO4 cells", "Built-in BMS protection", "100% inspection before shipment"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}
