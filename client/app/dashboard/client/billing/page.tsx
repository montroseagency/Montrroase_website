'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { Invoice } from '@/lib/types';
import Link from 'next/link';
import { CreditCard, Download, AlertCircle } from 'lucide-react';

export default function ClientBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await ApiService.getInvoices() as Invoice[];
        setInvoices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading invoices:', err);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  const stats = {
    total: invoices.reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your account billing and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Total Spent</p>
          <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Paid Invoices</p>
          <p className="text-2xl font-bold">${stats.paid.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Pending Payment</p>
          <p className="text-2xl font-bold">${stats.pending.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Overdue Invoices</p>
          <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
        </div>
      </div>

      {stats.overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">You have {stats.overdue} overdue invoice{stats.overdue > 1 ? 's' : ''}</p>
            <p className="text-sm text-red-700">Please settle your payment to avoid service interruption</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
        </div>
        <div className="divide-y">
          {invoices.length > 0 ? invoices.map(invoice => (
            <div key={invoice.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Invoice #{invoice.invoice_number}</p>
                <p className="text-sm text-gray-600">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
              </div>
              <div className="text-right mr-6">
                <p className="font-semibold text-gray-900">${invoice.amount.toFixed(2)}</p>
                <span className={`text-xs px-2 py-1 rounded-full inline-block font-medium ${
                  invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>{invoice.status}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download className="w-5 h-5" />
              </button>
            </div>
          )) : (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No invoices yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/client/billing/plans" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">View Plans</h3>
          <p className="text-sm text-gray-600 mb-4">Upgrade or downgrade your subscription</p>
          <span className="text-purple-600 font-medium text-sm">View Plans →</span>
        </Link>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your payment information</p>
          <button className="text-purple-600 font-medium text-sm">Manage Methods →</button>
        </div>
      </div>
    </div>
  );
}
