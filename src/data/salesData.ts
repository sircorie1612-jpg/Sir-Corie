export interface SaleRecord {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  productName: string;
  size: string;
  quantity: number;
  liters: number;
  totalAmountNgn: number;
  paymentMethod: 'Bank Transfer' | 'Card' | 'WhatsApp / Cash';
  status: 'Completed' | 'Dispatched' | 'Processing';
}

export interface ChartDataPoint {
  label: string; // e.g., 'Mon', 'Jan', '2024'
  subLabel?: string; // e.g., 'Oct 05' or 'Q1'
  revenueNgn: number;
  liters: number;
  ordersCount: number;
  growthPercent?: number;
}

export interface PeriodSalesData {
  title: string;
  subtitle: string;
  totalRevenueNgn: number;
  totalLiters: number;
  totalOrders: number;
  averageOrderValueNgn: number;
  growthRatePercent: number;
  dataPoints: ChartDataPoint[];
}

export const INITIAL_WEEKLY_SALES: PeriodSalesData = {
  title: 'Current Week Performance',
  subtitle: 'Monday through Sunday daily sales breakdown',
  totalRevenueNgn: 3485000,
  totalLiters: 775,
  totalOrders: 64,
  averageOrderValueNgn: 54453,
  growthRatePercent: 14.8,
  dataPoints: [
    { label: 'Mon', subLabel: 'Oct 05', revenueNgn: 385000, liters: 85, ordersCount: 8, growthPercent: 6.2 },
    { label: 'Tue', subLabel: 'Oct 06', revenueNgn: 450000, liters: 100, ordersCount: 9, growthPercent: 12.5 },
    { label: 'Wed', subLabel: 'Oct 07', revenueNgn: 315000, liters: 70, ordersCount: 6, growthPercent: -8.0 },
    { label: 'Thu', subLabel: 'Oct 08', revenueNgn: 520000, liters: 115, ordersCount: 11, growthPercent: 18.2 },
    { label: 'Fri', subLabel: 'Oct 09', revenueNgn: 675000, liters: 150, ordersCount: 13, growthPercent: 24.1 },
    { label: 'Sat', subLabel: 'Oct 10', revenueNgn: 790000, liters: 175, ordersCount: 12, growthPercent: 16.5 },
    { label: 'Sun', subLabel: 'Oct 11', revenueNgn: 350000, liters: 80, ordersCount: 5, growthPercent: 5.0 },
  ],
};

export const INITIAL_MONTHLY_SALES: PeriodSalesData = {
  title: 'Monthly Performance (2026)',
  subtitle: 'Full 12-month annual sales distribution and harvest cycles',
  totalRevenueNgn: 42950000,
  totalLiters: 9550,
  totalOrders: 785,
  averageOrderValueNgn: 54713,
  growthRatePercent: 22.4,
  dataPoints: [
    { label: 'Jan', subLabel: 'New Year', revenueNgn: 2450000, liters: 545, ordersCount: 45, growthPercent: 8.5 },
    { label: 'Feb', subLabel: 'Dry Season', revenueNgn: 2800000, liters: 620, ordersCount: 52, growthPercent: 14.3 },
    { label: 'Mar', subLabel: 'Peak Harvest', revenueNgn: 3650000, liters: 810, ordersCount: 68, growthPercent: 30.4 },
    { label: 'Apr', subLabel: 'Easter Festive', revenueNgn: 3900000, liters: 865, ordersCount: 71, growthPercent: 6.8 },
    { label: 'May', subLabel: 'Bulk Supply', revenueNgn: 3400000, liters: 755, ordersCount: 62, growthPercent: -12.8 },
    { label: 'Jun', subLabel: 'Mid-Year', revenueNgn: 3550000, liters: 790, ordersCount: 65, growthPercent: 4.4 },
    { label: 'Jul', subLabel: 'Harvest Flow', revenueNgn: 3750000, liters: 835, ordersCount: 69, growthPercent: 5.6 },
    { label: 'Aug', subLabel: 'New Yam Fest', revenueNgn: 4850000, liters: 1080, ordersCount: 88, growthPercent: 29.3 },
    { label: 'Sep', subLabel: 'School Resumption', revenueNgn: 3950000, liters: 875, ordersCount: 72, growthPercent: -18.6 },
    { label: 'Oct', subLabel: 'Current Month', revenueNgn: 4200000, liters: 935, ordersCount: 77, growthPercent: 6.3 },
    { label: 'Nov', subLabel: 'Pre-Holiday Stock', revenueNgn: 4600000, liters: 1020, ordersCount: 84, growthPercent: 9.5 },
    { label: 'Dec', subLabel: 'Festive Peak', revenueNgn: 5850000, liters: 1300, ordersCount: 105, growthPercent: 27.2 },
  ],
};

export const INITIAL_YEARLY_SALES: PeriodSalesData = {
  title: 'Year-over-Year Trajectory',
  subtitle: 'Annual revenue expansion, wholesale scaling, and 3-year record',
  totalRevenueNgn: 98600000,
  totalLiters: 21900,
  totalOrders: 1820,
  averageOrderValueNgn: 54175,
  growthRatePercent: 46.8,
  dataPoints: [
    { label: '2024', subLabel: 'Launch Year', revenueNgn: 21400000, liters: 4750, ordersCount: 390, growthPercent: 100.0 },
    { label: '2025', subLabel: 'Wholesale Scale', revenueNgn: 34250000, liters: 7600, ordersCount: 645, growthPercent: 60.0 },
    { label: '2026', subLabel: 'Current + Projected', revenueNgn: 42950000, liters: 9550, ordersCount: 785, growthPercent: 25.4 },
  ],
};

export const INITIAL_RECENT_ORDERS: SaleRecord[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-7821',
    date: '2026-10-09 14:32',
    customerName: 'Chief Emeka Okafor',
    customerPhone: '08034567891',
    customerLocation: 'Ifite Awka, Anambra State',
    productName: 'Drop Palm Oil — 25L Drum',
    size: '25 Litres',
    quantity: 2,
    liters: 50,
    totalAmountNgn: 225000,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-7820',
    date: '2026-10-09 11:15',
    customerName: 'Mama Nkechi Kitchen',
    customerPhone: '08127826671',
    customerLocation: 'Puco Complex, Ifite, Anambra',
    productName: 'Drop Palm Oil — 5L Jerrycan',
    size: '5 Litres',
    quantity: 4,
    liters: 20,
    totalAmountNgn: 90000,
    paymentMethod: 'WhatsApp / Cash',
    status: 'Completed',
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-7819',
    date: '2026-10-08 16:40',
    customerName: 'Chef Ngozi Adeyemi',
    customerPhone: '08021113344',
    customerLocation: 'Victoria Island, Lagos',
    productName: 'Drop Palm Oil — 2L Bottle',
    size: '2 Litres',
    quantity: 6,
    liters: 12,
    totalAmountNgn: 54000,
    paymentMethod: 'Card',
    status: 'Dispatched',
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-7818',
    date: '2026-10-08 09:20',
    customerName: 'Awka Golden Pot Buka',
    customerPhone: '07038899221',
    customerLocation: 'Arthur Eze Avenue, Awka',
    productName: 'Drop Palm Oil — 25L Drum',
    size: '25 Litres',
    quantity: 1,
    liters: 25,
    totalAmountNgn: 112500,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'ord-105',
    orderNumber: 'ORD-7817',
    date: '2026-10-07 17:55',
    customerName: 'Dr. Chinedu Umeh',
    customerPhone: '08156677889',
    customerLocation: 'Garki 2, Abuja FCT',
    productName: 'Drop Culinary Heritage Duo Pack',
    size: '2 x 1L Bottles',
    quantity: 3,
    liters: 6,
    totalAmountNgn: 34500,
    paymentMethod: 'Card',
    status: 'Dispatched',
  },
  {
    id: 'ord-106',
    orderNumber: 'ORD-7816',
    date: '2026-10-07 13:10',
    customerName: 'Mrs. Folake Balogun',
    customerPhone: '09087766554',
    customerLocation: 'Ikeja GRA, Lagos State',
    productName: 'Drop Palm Oil — 1L Bottle',
    size: '1 Litre',
    quantity: 5,
    liters: 5,
    totalAmountNgn: 22500,
    paymentMethod: 'Card',
    status: 'Completed',
  },
  {
    id: 'ord-107',
    orderNumber: 'ORD-7815',
    date: '2026-10-06 15:45',
    customerName: 'Onitsha Main Market Food Hub',
    customerPhone: '08065544332',
    customerLocation: 'Bright Street, Onitsha, Anambra',
    productName: 'Drop Palm Oil — 25L Drum',
    size: '25 Litres',
    quantity: 3,
    liters: 75,
    totalAmountNgn: 337500,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'ord-108',
    orderNumber: 'ORD-7814',
    date: '2026-10-05 10:30',
    customerName: 'Blessing Okoro',
    customerPhone: '08092233445',
    customerLocation: 'Trans-Ekulu, Enugu State',
    productName: 'Drop Palm Oil — 5L Jerrycan',
    size: '5 Litres',
    quantity: 2,
    liters: 10,
    totalAmountNgn: 45000,
    paymentMethod: 'WhatsApp / Cash',
    status: 'Completed',
  },
];
