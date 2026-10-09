import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  SaleRecord,
  PeriodSalesData,
  INITIAL_WEEKLY_SALES,
  INITIAL_MONTHLY_SALES,
  INITIAL_YEARLY_SALES,
  INITIAL_RECENT_ORDERS,
} from '../data/salesData';
import { AdminLogin } from '../components/admin/AdminLogin';
import { SalesChart } from '../components/admin/SalesChart';
import { ProductUploadForm } from '../components/admin/ProductUploadForm';
import { ProductManagementTable } from '../components/admin/ProductManagementTable';
import { OrderRecordModal } from '../components/admin/OrderRecordModal';
import {
  BarChart3,
  Upload,
  Package,
  ShoppingBag,
  LogOut,
  ArrowLeft,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUploadProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleStock: (productId: string) => void;
  onResetDefaultProducts: () => void;
  onViewProductDetails: (product: Product) => void;
  onBackToStore: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onUploadProduct,
  onDeleteProduct,
  onToggleStock,
  onResetDefaultProducts,
  onViewProductDetails,
  onBackToStore,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('drop_admin_auth') === 'true';
  });

  // Active Admin Tab: 'analytics' | 'upload' | 'manage' | 'orders'
  const [adminTab, setAdminTab] = useState<'analytics' | 'upload' | 'manage' | 'orders'>('analytics');

  // Chart Period: 'weekly' | 'monthly' | 'yearly'
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  // Sales Records & Orders State
  const [orders, setOrders] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('drop_sales_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_RECENT_ORDERS;
  });

  const [weeklyData, setWeeklyData] = useState<PeriodSalesData>(() => {
    const saved = localStorage.getItem('drop_weekly_sales');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_WEEKLY_SALES;
  });

  const [monthlyData, setMonthlyData] = useState<PeriodSalesData>(() => {
    const saved = localStorage.getItem('drop_monthly_sales');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_MONTHLY_SALES;
  });

  const [yearlyData, setYearlyData] = useState<PeriodSalesData>(() => {
    const saved = localStorage.getItem('drop_yearly_sales');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_YEARLY_SALES;
  });

  // Modal to record new sale
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('drop_sales_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('drop_weekly_sales', JSON.stringify(weeklyData));
  }, [weeklyData]);

  useEffect(() => {
    localStorage.setItem('drop_monthly_sales', JSON.stringify(monthlyData));
  }, [monthlyData]);

  useEffect(() => {
    localStorage.setItem('drop_yearly_sales', JSON.stringify(yearlyData));
  }, [yearlyData]);

  // Load verified sales records from Cloud SQL PostgreSQL database
  useEffect(() => {
    fetch('/api/sales')
      .then((res) => (res.ok ? res.json() : null))
      .then((records) => {
        if (Array.isArray(records) && records.length > 0) {
          const weeklyRecords = records.filter((r: any) => r.periodType === 'weekly');
          const monthlyRecords = records.filter((r: any) => r.periodType === 'monthly');
          const yearlyRecords = records.filter((r: any) => r.periodType === 'yearly');

          if (weeklyRecords.length > 0) {
            const totalLitres = weeklyRecords.reduce((acc: number, r: any) => acc + (r.litresSold || 0), 0);
            const totalRev = weeklyRecords.reduce((acc: number, r: any) => acc + (r.revenue || 0), 0);
            const totalOrders = weeklyRecords.reduce((acc: number, r: any) => acc + (r.ordersCount || 0), 0);
            setWeeklyData((prev) => ({
              ...prev,
              totalLiters: totalLitres,
              totalRevenueNgn: totalRev,
              totalOrders,
              averageOrderValueNgn: totalOrders > 0 ? Math.round(totalRev / totalOrders) : prev.averageOrderValueNgn,
              dataPoints: weeklyRecords.map((r: any) => ({
                label: r.periodLabel,
                liters: r.litresSold,
                revenueNgn: r.revenue,
                ordersCount: r.ordersCount,
              })),
            }));
          }

          if (monthlyRecords.length > 0) {
            const totalLitres = monthlyRecords.reduce((acc: number, r: any) => acc + (r.litresSold || 0), 0);
            const totalRev = monthlyRecords.reduce((acc: number, r: any) => acc + (r.revenue || 0), 0);
            const totalOrders = monthlyRecords.reduce((acc: number, r: any) => acc + (r.ordersCount || 0), 0);
            setMonthlyData((prev) => ({
              ...prev,
              totalLiters: totalLitres,
              totalRevenueNgn: totalRev,
              totalOrders,
              averageOrderValueNgn: totalOrders > 0 ? Math.round(totalRev / totalOrders) : prev.averageOrderValueNgn,
              dataPoints: monthlyRecords.map((r: any) => ({
                label: r.periodLabel,
                liters: r.litresSold,
                revenueNgn: r.revenue,
                ordersCount: r.ordersCount,
              })),
            }));
          }

          if (yearlyRecords.length > 0) {
            const totalLitres = yearlyRecords.reduce((acc: number, r: any) => acc + (r.litresSold || 0), 0);
            const totalRev = yearlyRecords.reduce((acc: number, r: any) => acc + (r.revenue || 0), 0);
            const totalOrders = yearlyRecords.reduce((acc: number, r: any) => acc + (r.ordersCount || 0), 0);
            setYearlyData((prev) => ({
              ...prev,
              totalLiters: totalLitres,
              totalRevenueNgn: totalRev,
              totalOrders,
              averageOrderValueNgn: totalOrders > 0 ? Math.round(totalRev / totalOrders) : prev.averageOrderValueNgn,
              dataPoints: yearlyRecords.map((r: any) => ({
                label: r.periodLabel,
                liters: r.litresSold,
                revenueNgn: r.revenue,
                ordersCount: r.ordersCount,
              })),
            }));
          }
        }
      })
      .catch((e) => {
        console.warn('Using local sales cache:', e);
      });
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('drop_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('drop_admin_auth');
  };

  // Record a new order and update weekly/monthly/yearly numbers
  const handleRecordSale = (newSale: SaleRecord) => {
    setOrders((prev) => [newSale, ...prev]);

    // Update weekly data (add to Friday/today's point)
    setWeeklyData((prev) => {
      const updatedPoints = [...prev.dataPoints];
      const todayIdx = 4; // Friday
      if (updatedPoints[todayIdx]) {
        updatedPoints[todayIdx] = {
          ...updatedPoints[todayIdx],
          revenueNgn: updatedPoints[todayIdx].revenueNgn + newSale.totalAmountNgn,
          liters: updatedPoints[todayIdx].liters + newSale.liters,
          ordersCount: updatedPoints[todayIdx].ordersCount + 1,
        };
      }
      const totalRev = prev.totalRevenueNgn + newSale.totalAmountNgn;
      const totalOrders = prev.totalOrders + 1;
      return {
        ...prev,
        totalRevenueNgn: totalRev,
        totalLiters: prev.totalLiters + newSale.liters,
        totalOrders,
        averageOrderValueNgn: Math.round(totalRev / totalOrders),
        dataPoints: updatedPoints,
      };
    });

    // Update monthly data (add to Oct)
    setMonthlyData((prev) => {
      const updatedPoints = [...prev.dataPoints];
      const octIdx = 9; // Oct
      if (updatedPoints[octIdx]) {
        updatedPoints[octIdx] = {
          ...updatedPoints[octIdx],
          revenueNgn: updatedPoints[octIdx].revenueNgn + newSale.totalAmountNgn,
          liters: updatedPoints[octIdx].liters + newSale.liters,
          ordersCount: updatedPoints[octIdx].ordersCount + 1,
        };
      }
      const totalRev = prev.totalRevenueNgn + newSale.totalAmountNgn;
      const totalOrders = prev.totalOrders + 1;
      return {
        ...prev,
        totalRevenueNgn: totalRev,
        totalLiters: prev.totalLiters + newSale.liters,
        totalOrders,
        averageOrderValueNgn: Math.round(totalRev / totalOrders),
        dataPoints: updatedPoints,
      };
    });

    // Update yearly data (add to 2026)
    setYearlyData((prev) => {
      const updatedPoints = [...prev.dataPoints];
      const y2026Idx = 2; // 2026
      if (updatedPoints[y2026Idx]) {
        updatedPoints[y2026Idx] = {
          ...updatedPoints[y2026Idx],
          revenueNgn: updatedPoints[y2026Idx].revenueNgn + newSale.totalAmountNgn,
          liters: updatedPoints[y2026Idx].liters + newSale.liters,
          ordersCount: updatedPoints[y2026Idx].ordersCount + 1,
        };
      }
      const totalRev = prev.totalRevenueNgn + newSale.totalAmountNgn;
      const totalOrders = prev.totalOrders + 1;
      return {
        ...prev,
        totalRevenueNgn: totalRev,
        totalLiters: prev.totalLiters + newSale.liters,
        totalOrders,
        averageOrderValueNgn: Math.round(totalRev / totalOrders),
        dataPoints: updatedPoints,
      };
    });

    // Persist to Cloud SQL PostgreSQL database
    fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        periodType: 'weekly',
        periodLabel: newSale.customerName ? `${newSale.customerName.slice(0, 15)}...` : 'Sale',
        litresSold: newSale.liters,
        revenue: newSale.totalAmountNgn,
        ordersCount: 1,
      }),
    }).catch(() => {});
  };

  // If not logged in, render the secure Admin Passcode screen
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} onBackToStore={onBackToStore} />;
  }

  return (
    <div className="py-8 md:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Admin Action Bar */}
        <div className="bg-white rounded-3xl border border-[#E8DFD5] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#153823] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#E07A1E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#153823]">
                  Admin Dashboard
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Authenticated
                </span>
              </div>
              <p className="text-xs text-[#6B6154]">
                HQ: Puco & Partners complex, Ifite, Anambra state · Drop Palm Oil
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsRecordSaleOpen(true)}
              className="px-3.5 py-2 bg-[#E07A1E] hover:bg-[#B85D0D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Sale Order</span>
            </button>

            <button
              onClick={onBackToStore}
              className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#153823] text-xs font-bold rounded-xl border border-[#E0D7CC] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
          {[
            {
              id: 'analytics',
              label: 'Sales Records & Charts',
              icon: BarChart3,
              badge: `${selectedPeriod.toUpperCase()} view`,
            },
            {
              id: 'upload',
              label: 'Upload New Product',
              icon: Upload,
              badge: 'Add to catalog',
            },
            {
              id: 'manage',
              label: 'Manage & Delete Products',
              icon: Package,
              badge: `${products.length} live`,
            },
            {
              id: 'orders',
              label: 'Order Transactions Log',
              icon: ShoppingBag,
              badge: `${orders.length} orders`,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`py-3 px-4 sm:px-5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#153823] text-white border-[#153823] shadow-sm'
                    : 'bg-white text-[#5C554B] border-[#E8DFD5] hover:bg-[#FAF7F2] hover:text-[#153823]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E07A1E]' : 'text-[#8C8274]'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#8C8274]'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Sales Records & Charts (Weekly, Monthly, Yearly) */}
        {adminTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <SalesChart
              weeklyData={weeklyData}
              monthlyData={monthlyData}
              yearlyData={yearlyData}
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
            />
          </div>
        )}

        {/* Tab 2: Upload New Product Form */}
        {adminTab === 'upload' && (
          <div className="animate-in fade-in duration-200">
            <ProductUploadForm
              onUploadProduct={(newProd) => {
                onUploadProduct(newProd);
                // optionally switch to manage view
                setAdminTab('manage');
              }}
              onCancel={() => setAdminTab('manage')}
            />
          </div>
        )}

        {/* Tab 3: Manage & Delete Products */}
        {adminTab === 'manage' && (
          <div className="animate-in fade-in duration-200">
            <ProductManagementTable
              products={products}
              onDeleteProduct={onDeleteProduct}
              onToggleStock={onToggleStock}
              onResetDefaultProducts={onResetDefaultProducts}
              onViewProduct={onViewProductDetails}
            />
          </div>
        )}

        {/* Tab 4: Orders Transaction Log */}
        {adminTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EBE1]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D0D] mb-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customer Orders & Direct Sales</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823]">
                  Sales Order Transactions ({orders.length})
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6154] mt-1">
                  Verified orders from Anambra, Lagos, Abuja, and nationwide dispatch.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsRecordSaleOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E07A1E]" />
                <span>Record New Order</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E8DFD5]">
              <table className="w-full text-left text-xs text-[#241F17]">
                <thead className="bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#6B6154] border-b border-[#E8DFD5]">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer & Location</th>
                    <th className="py-3 px-4">Item & Size</th>
                    <th className="py-3 px-4">Qty / Volume</th>
                    <th className="py-3 px-4">Amount (₦)</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1] bg-white">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#153823]">
                        <span>{ord.orderNumber}</span>
                        <span className="block text-[10px] font-sans font-normal text-[#8C8274]">{ord.date}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#153823] block">{ord.customerName}</span>
                        <span className="text-[10px] text-[#6B6154]">{ord.customerLocation} · {ord.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#153823]">
                        <span>{ord.productName}</span>
                        <span className="block text-[10px] text-[#8C8274]">{ord.size}</span>
                      </td>
                      <td className="py-3.5 px-4 tabular-nums">
                        <span className="font-bold text-[#153823]">{ord.quantity} unit(s)</span>
                        <span className="block text-[10px] text-[#8C8274]">({ord.liters} Litres)</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#153823] tabular-nums">
                        ₦{ord.totalAmountNgn.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-[#5C554B]">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : ord.status === 'Dispatched'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Modal to Record Sale */}
      <OrderRecordModal
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        products={products}
        onRecordSale={handleRecordSale}
      />

    </div>
  );
};
