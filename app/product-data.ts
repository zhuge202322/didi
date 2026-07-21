export type ProductSpec = {
  label: string;
  value: string;
  note?: string;
};

export type SypModel = {
  id: string;
  label: string;
  name: string;
  image: string;
  output: string;
  surge: string;
  pvInput: string;
  mppt: string;
  battery: string;
  charge: string;
  efficiency: string;
  parallel: string;
  dimensions: string;
  weight: string;
  interface: string;
};

export const sypModels: SypModel[] = [
  {
    id: "syp-1-5kw",
    label: "1.5kW / 12V",
    name: "SYP1.5KW-12V",
    image: "/products/syp-1-5kw.webp",
    output: "1.5kW",
    surge: "2.4kVA",
    pvInput: "800W / 18A",
    mppt: "17-115VDC",
    battery: "12VDC",
    charge: "100A PV + AC",
    efficiency: "90%",
    parallel: "Not supported",
    dimensions: "320 x 227 x 100mm",
    weight: "3.5kg",
    interface: "LCD",
  },
  {
    id: "syp-2-5kw",
    label: "2.5kW / 12V",
    name: "SYP2.5KW-12V",
    image: "/products/syp-2-5kw.webp",
    output: "2.5kW",
    surge: "4kVA",
    pvInput: "3,000W / 18A",
    mppt: "30-400VDC",
    battery: "12VDC",
    charge: "100A PV + AC",
    efficiency: "91%",
    parallel: "Not supported",
    dimensions: "375 x 290 x 100mm",
    weight: "4.0kg",
    interface: "LCD / optional WiFi",
  },
  {
    id: "syp-4kw",
    label: "4.0kW / 24V",
    name: "SYP4.0KW-24V",
    image: "/products/syp-4kw.webp",
    output: "4.0kW",
    surge: "7.2kVA",
    pvInput: "5,000W / 18A",
    mppt: "40-450VDC",
    battery: "24VDC",
    charge: "100A PV + AC",
    efficiency: "92.7%",
    parallel: "Not supported",
    dimensions: "435 x 285 x 98mm",
    weight: "5.7kg",
    interface: "RS485 / RS232 / USB",
  },
  {
    id: "syp-5-5kw",
    label: "5.5kW / 24V",
    name: "SYP5.5KW-24V",
    image: "/products/syp-5-5kw.webp",
    output: "5.5kW",
    surge: "10kVA",
    pvInput: "9,000W / 27A",
    mppt: "60-450VDC",
    battery: "24VDC",
    charge: "160A PV + AC",
    efficiency: "93.5%",
    parallel: "Not supported",
    dimensions: "410 x 336 x 115mm",
    weight: "7.8kg",
    interface: "RS232 / RS485 / USB",
  },
  {
    id: "syp-6-5kw",
    label: "6.5kW / 48V",
    name: "SYP6.5KW-48V",
    image: "/products/syp-6-5kw.webp",
    output: "6.5kW",
    surge: "12kVA",
    pvInput: "9,000W / 27A",
    mppt: "60-450VDC",
    battery: "48VDC",
    charge: "120A PV + AC",
    efficiency: "94%",
    parallel: "Not supported",
    dimensions: "410 x 336 x 115mm",
    weight: "8.0kg",
    interface: "RS232 / RS485 / USB",
  },
  {
    id: "syp-12kw",
    label: "12kW / 48V",
    name: "SYP12KW-48V",
    image: "/products/syp-12kw.webp",
    output: "12kW",
    surge: "24kVA",
    pvInput: "9kW single / 15kW dual MPPT",
    mppt: "60-450VDC",
    battery: "48VDC",
    charge: "160A PV + AC",
    efficiency: "94%",
    parallel: "Not supported",
    dimensions: "525 x 435 x 138mm",
    weight: "14.7kg",
    interface: "RS232 / RS485 / CAN",
  },
  {
    id: "syp-5kw-p",
    label: "5.0kW / 48V-P",
    name: "SYP5.0KW-48V/P",
    image: "/products/syp-5kw-p.webp",
    output: "5.0kW",
    surge: "10kVA",
    pvInput: "6,000W / 18A",
    mppt: "120-450VDC",
    battery: "48VDC",
    charge: "80A PV + AC",
    efficiency: "93%",
    parallel: "Up to 9 units",
    dimensions: "510 x 306 x 140mm",
    weight: "9.7kg",
    interface: "RS485 / RS232 / USB / dry contact",
  },
  {
    id: "syp-6-5kw-p",
    label: "6.5kW / 48V-P",
    name: "SYP6.5KW-48V/P",
    image: "/products/syp-6-5kw-p.webp",
    output: "6.5kW",
    surge: "12kVA",
    pvInput: "9,000W / 27A",
    mppt: "60-450VDC",
    battery: "48VDC",
    charge: "120A PV + AC",
    efficiency: "94%",
    parallel: "Up to 9 units",
    dimensions: "440 x 335 x 117mm",
    weight: "8.8kg",
    interface: "RS232 / RS485 / USB",
  },
  {
    id: "syp-12kw-p",
    label: "12kW / 48V-P",
    name: "SYP12KW-48V/P",
    image: "/products/syp-12kw-p.webp",
    output: "12kW",
    surge: "24kVA",
    pvInput: "9kW single / 15kW dual MPPT",
    mppt: "60-450VDC",
    battery: "48VDC",
    charge: "160A PV + AC",
    efficiency: "94%",
    parallel: "Up to 6 units",
    dimensions: "525 x 435 x 138mm",
    weight: "14.7kg",
    interface: "RS232 / RS485 / CAN",
  },
];

export const megaModels = [
  {
    name: "MEGA-6KW",
    output: "6,000W",
    pvInput: "9,000W",
    mppt: "2 trackers / 18A",
    charge: "135A",
    current: "26.1A",
    dimensions: "521 x 470 x 236mm",
    weight: "15kg",
  },
  {
    name: "MEGA-16KW",
    output: "16,000W",
    pvInput: "21,800W",
    mppt: "3 trackers / 18A + 18A + 36A",
    charge: "250A",
    current: "69.6A",
    dimensions: "637.5 x 491 x 300.5mm",
    weight: "50kg",
  },
];

export const lx100Models = [
  ["2.2kW", "LX100-2R2G-SS2-PV"],
  ["3kW", "LX100-003G-SS2-PV"],
  ["4kW", "LX100-004G-SS2-PV"],
  ["5.5kW", "LX100-5R5G-SS2-PV"],
  ["7.5kW", "LX100-7R5G-SS2-PV"],
  ["11kW", "LX100-011G-SS2-PV"],
  ["5.5kW", "LX100-5R5G-4-PV"],
  ["7.5kW", "LX100-7R5G-4-PV"],
  ["11kW", "LX100-011G-4-PV"],
  ["15kW", "LX100-015G-4-PV"],
  ["18kW", "LX100-018G-4-PV"],
  ["22kW", "LX100-022G-4-PV"],
  ["30kW", "LX100-030G-4-PV"],
  ["37kW", "LX100-037G-4-PV"],
  ["45kW", "LX100-045G-4-PV"],
  ["55kW", "LX100-055G-4-PV"],
  ["75kW", "LX100-075G-4-PV"],
  ["90kW", "LX100-090G-4-PV"],
  ["110kW", "LX100-110G-4-PV"],
  ["132kW", "LX100-132G-4-PV"],
  ["160kW", "LX100-160G-4-PV"],
  ["185kW", "LX100-185G-4-PV"],
  ["200kW", "LX100-200G-4-PV"],
] as const;

export type BatteryModel = {
  name: string;
  energy: string;
  discharge: string;
  grossWeight: string;
  image: string;
};

export const batteryModels: BatteryModel[] = [
  { name: "51.2V 280Ah", energy: "14.34kWh", discharge: "150A", grossWeight: "130kg", image: "/products/battery-280ah.png" },
  { name: "51.2V 300Ah", energy: "15.36kWh", discharge: "150A", grossWeight: "135kg", image: "/products/battery-300ah.png" },
  { name: "51.2V 400Ah", energy: "20.48kWh", discharge: "150A", grossWeight: "180kg", image: "/products/battery-400ah.png" },
  { name: "51.2V 460Ah", energy: "23.55kWh", discharge: "150A", grossWeight: "185kg", image: "/products/battery-460ah.png" },
  { name: "51.2V 600Ah", energy: "30.72kWh", discharge: "200A", grossWeight: "265kg", image: "/products/battery-600ah.png" },
];

export const productFamilies = [
  { href: "#syp-series", number: "01", title: "SYP hybrid inverters", detail: "9 models / 1.5-12kW" },
  { href: "#mega-series", number: "02", title: "MEGA IP65 hybrid", detail: "6 / 8 / 10 / 12 / 16kW" },
  { href: "#pump-series", number: "03", title: "Solar pump drives", detail: "LX100 / 33PV / LX200" },
  { href: "#battery-series", number: "04", title: "LiFePO4 batteries", detail: "100-600Ah" },
  { href: "#systems", number: "05", title: "Solar & ESS systems", detail: "Modules / storage / BOS" },
];
