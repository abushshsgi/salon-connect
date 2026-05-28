// Typed mock data for mysaloon.uz UI. Backend wires in second pass.

export type Category = "barber" | "beauty" | "nails" | "spa";

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number; // UZS
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatarSeed: string;
  serviceIds: string[];
  independent?: boolean;
  salonId?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Salon {
  id: string;
  name: string;
  category: Category;
  rating: number;
  reviewCount: number;
  address: string;
  distanceKm: number;
  priceFrom: number;
  priceTo: number;
  coverSeed: string;
  about: string;
  services: Service[];
  staff: Barber[];
  reviews: Review[];
  portfolio: string[]; // image seeds
  lat: number;
  lng: number;
}

export interface BookingItem {
  id: string;
  salonId: string;
  salonName: string;
  barberName: string;
  serviceName: string;
  date: string; // ISO
  duration: number;
  price: number;
  status: "pending" | "accepted" | "done" | "cancelled";
  coverSeed: string;
}

export interface ChatThread {
  id: string;
  salonName: string;
  barberName: string;
  avatarSeed: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export interface Notification {
  id: string;
  type: "booking" | "chat_message" | "review";
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
}

const services: Service[] = [
  { id: "s1", name: "Klassik soch turmagi", duration: 45, price: 120000 },
  { id: "s2", name: "Soqol dizayni", duration: 30, price: 80000 },
  { id: "s3", name: "Soch yuvish + styling", duration: 25, price: 65000 },
  { id: "s4", name: "Bolalar sochi", duration: 30, price: 70000 },
  { id: "s5", name: "Manikyur", duration: 60, price: 150000 },
  { id: "s6", name: "Yuz tozalash", duration: 50, price: 200000 },
];

const reviews: Review[] = [
  { id: "r1", author: "Sardor", rating: 5, text: "Juda yaxshi xizmat, rahmat!", date: "2 kun" },
  { id: "r2", author: "Dilshod", rating: 5, text: "Doim shu yerga keyaman.", date: "1 hafta" },
  { id: "r3", author: "Mirzo", rating: 4, text: "Yaxshi, lekin biroz kutdim.", date: "2 hafta" },
];

const barbers = (salonId: string): Barber[] => [
  { id: `${salonId}-b1`, name: "Jasur K.", role: "Senior Barber", rating: 4.9, avatarSeed: "jasur", serviceIds: ["s1", "s2", "s3"], salonId },
  { id: `${salonId}-b2`, name: "Malika A.", role: "Stylist", rating: 4.8, avatarSeed: "malika", serviceIds: ["s1", "s3", "s5"], salonId },
  { id: `${salonId}-b3`, name: "Timur V.", role: "Barber", rating: 4.7, avatarSeed: "timur", serviceIds: ["s1", "s2", "s4"], salonId },
];

export const salons: Salon[] = [
  {
    id: "1",
    name: "Legacy Barbershop",
    category: "barber",
    rating: 4.9,
    reviewCount: 248,
    address: "Amir Temur ko'chasi, 22",
    distanceKm: 1.2,
    priceFrom: 70000,
    priceTo: 250000,
    coverSeed: "legacy",
    about: "Klassik barber uslubidagi premium salon. Yetuk ustalar, qulay muhit.",
    services,
    staff: barbers("1"),
    reviews,
    portfolio: ["p1", "p2", "p3", "p4", "p5", "p6"],
    lat: 41.3111,
    lng: 69.2797,
  },
  {
    id: "2",
    name: "Atelier Beauty",
    category: "beauty",
    rating: 4.8,
    reviewCount: 187,
    address: "Mustaqillik ko'chasi, 15",
    distanceKm: 2.4,
    priceFrom: 90000,
    priceTo: 400000,
    coverSeed: "atelier",
    about: "Zamonaviy go'zallik saloni. Soch, yuz va parvarish xizmatlari.",
    services,
    staff: barbers("2"),
    reviews,
    portfolio: ["p1", "p2", "p3"],
    lat: 41.3201,
    lng: 69.2401,
  },
  {
    id: "3",
    name: "Studio M",
    category: "barber",
    rating: 4.7,
    reviewCount: 132,
    address: "Shahriston, 8",
    distanceKm: 3.1,
    priceFrom: 60000,
    priceTo: 180000,
    coverSeed: "studiom",
    about: "Mahallaga yaqin barbershop. Tezkor va sifatli.",
    services,
    staff: barbers("3"),
    reviews,
    portfolio: ["p1", "p2"],
    lat: 41.2995,
    lng: 69.2885,
  },
  {
    id: "4",
    name: "Nail House",
    category: "nails",
    rating: 4.9,
    reviewCount: 94,
    address: "Yunusobod, 4",
    distanceKm: 4.0,
    priceFrom: 80000,
    priceTo: 350000,
    coverSeed: "nailhouse",
    about: "Manikyur va pedikyur uchun mutaxassis salon.",
    services,
    staff: barbers("4"),
    reviews,
    portfolio: ["p1", "p2", "p3", "p4"],
    lat: 41.3477,
    lng: 69.2879,
  },
];

export const bookings: BookingItem[] = [
  {
    id: "bk1",
    salonId: "1",
    salonName: "Legacy Barbershop",
    barberName: "Jasur K.",
    serviceName: "Klassik soch turmagi",
    date: new Date(Date.now() + 86400000).toISOString(),
    duration: 45,
    price: 120000,
    status: "accepted",
    coverSeed: "legacy",
  },
  {
    id: "bk2",
    salonId: "2",
    salonName: "Atelier Beauty",
    barberName: "Malika A.",
    serviceName: "Manikyur",
    date: new Date(Date.now() + 86400000 * 3).toISOString(),
    duration: 60,
    price: 150000,
    status: "pending",
    coverSeed: "atelier",
  },
  {
    id: "bk3",
    salonId: "1",
    salonName: "Legacy Barbershop",
    barberName: "Timur V.",
    serviceName: "Soqol dizayni",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    duration: 30,
    price: 80000,
    status: "done",
    coverSeed: "legacy",
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: "c1",
    salonName: "Legacy Barbershop",
    barberName: "Jasur K.",
    avatarSeed: "jasur",
    lastMessage: "Albatta, ertaga kutamiz!",
    lastTime: "12:34",
    unread: 2,
  },
  {
    id: "c2",
    salonName: "Atelier Beauty",
    barberName: "Malika A.",
    avatarSeed: "malika",
    lastMessage: "Vaqt sizga qulay bo'ladimi?",
    lastTime: "yest.",
    unread: 0,
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", fromMe: false, text: "Salom! Buyurtmangizni qabul qildim.", time: "12:30" },
    { id: "m2", fromMe: true, text: "Rahmat! Ertaga 10:00 ga to'g'rimi?", time: "12:32" },
    { id: "m3", fromMe: false, text: "Albatta, ertaga kutamiz!", time: "12:34" },
  ],
  c2: [
    { id: "m1", fromMe: false, text: "Vaqt sizga qulay bo'ladimi?", time: "yest." },
  ],
};

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "booking",
    title: "Buyurtma tasdiqlandi",
    body: "Legacy Barbershop sizning buyurtmangizni qabul qildi.",
    time: "5 daq",
    read: false,
    link: "/bookings",
  },
  {
    id: "n2",
    type: "chat_message",
    title: "Yangi xabar — Jasur K.",
    body: "Albatta, ertaga kutamiz!",
    time: "1 soat",
    read: false,
    link: "/chat/c1",
  },
  {
    id: "n3",
    type: "review",
    title: "Sharhga javob",
    body: "Atelier Beauty sizning sharhingizga javob berdi.",
    time: "2 kun",
    read: true,
  },
];

export const userProfile = {
  name: "Azizbek Karimov",
  phone: "+998 90 123 45 67",
  email: "aziz@example.com",
  avatarSeed: "azizbek",
};

export const formatPrice = (uzs: number): string =>
  new Intl.NumberFormat("uz-UZ").format(uzs) + " UZS";

export const shortPrice = (uzs: number): string => {
  if (uzs >= 1000) return `${Math.round(uzs / 1000)}k`;
  return String(uzs);
};
