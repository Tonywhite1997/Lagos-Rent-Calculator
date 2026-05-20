export type Neighbourhood = {
  name: string;
  area: "Island Premium" | "Island Mid" | "Mainland Mid" | "Mainland Affordable";
  rents: [number, number][]; // [min, max] monthly in NGN, index = apt type
  // index 0 = studio, 1 = 1BR, 2 = 2BR, 3 = 3BR
};

const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    name: "Banana Island / Ikoyi",
    area: "Island Premium",
    rents: [
      [300000, 500000],
      [400000, 700000],
      [600000, 1200000],
      [900000, 2000000],
    ],
  },
  {
    name: "Victoria Island",
    area: "Island Premium",
    rents: [
      [200000, 400000],
      [300000, 600000],
      [500000, 900000],
      [700000, 1500000],
    ],
  },
  {
    name: "Lekki Phase 1",
    area: "Island Mid",
    rents: [
      [150000, 280000],
      [200000, 400000],
      [350000, 650000],
      [500000, 950000],
    ],
  },
  {
    name: "Ajah / Sangotedo",
    area: "Island Mid",
    rents: [
      [80000, 150000],
      [120000, 220000],
      [180000, 350000],
      [280000, 520000],
    ],
  },
  {
    name: "Ikeja GRA",
    area: "Mainland Mid",
    rents: [
      [120000, 200000],
      [150000, 300000],
      [220000, 450000],
      [350000, 650000],
    ],
  },
  {
    name: "Yaba / Surulere",
    area: "Mainland Mid",
    rents: [
      [70000, 130000],
      [100000, 200000],
      [150000, 300000],
      [220000, 450000],
    ],
  },
  {
    name: "Festac / Isolo",
    area: "Mainland Affordable",
    rents: [
      [50000, 100000],
      [70000, 150000],
      [100000, 200000],
      [150000, 300000],
    ],
  },
  {
    name: "Ikorodu / Ojodu",
    area: "Mainland Affordable",
    rents: [
      [30000, 70000],
      [50000, 100000],
      [70000, 150000],
      [100000, 200000],
    ],
  },
];

export default NEIGHBOURHOODS;
