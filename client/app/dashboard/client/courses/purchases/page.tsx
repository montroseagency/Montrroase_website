'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Loader2, ShoppingBag, Calendar, CreditCard, ArrowRight, AlertCircle } from 'lucide-react';

interface Purchase {
  id: string;
  course: string;
  course_title: string;
  course_thumbnail: string | null;
  amount_paid: string;
  payment_method: string;
  access_expires_at: string | null;
  is_refunded: boolean;
  purchased_at: string;
  has_access: boolean;
}

export default function MyPurchasesPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMyCoursePurchases() as Purchase[];
      setPurchases(data);
    } catch (err: any) {
      console.error('Error fetching purchases:', err);
      setError(err.message || 'Failed to load purchases');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Purchases</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Course Purchases</h1>
              <p className="text-gray-600 mt-1">View and manage your individually purchased courses</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {purchases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Purchases Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't purchased any individual courses yet. Browse our course catalog to find courses that interest you.
            </p>
            <Link
              href="/dashboard/client/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Course Thumbnail */}
                      {purchase.course_thumbnail ? (
                        <img
                          src={purchase.course_thumbnail}
                          alt={purchase.course_title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-white" />
                        </div>
                      )}

                      {/* Course Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {purchase.course_title}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Purchased: {formatDate(purchase.purchased_at)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="capitalize">{purchase.payment_method}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${purchase.amount_paid}</span>
                          </div>
                        </div>

                        {/* Access Status */}
                        <div className="mt-3">
                          {purchase.has_access ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              ✓ Active Access
                              {purchase.access_expires_at && (
                                <span className="ml-1 text-xs">
                                  (Expires {formatDate(purchase.access_expires_at)})
                                </span>
                              )}
                            </span>
                          ) : purchase.is_refunded ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                              Refunded
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                              Access Expired
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {purchase.has_access && (
                      <Link
                        href={`/dashboard/client/courses/${purchase.course}`}
                        className="ml-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Course
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {purchases.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Purchase Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-purple-100 text-sm">Total Courses</p>
                <p className="text-2xl font-bold">{purchases.length}</p>
              </div>
              <div>
                <p className="text-purple-100 text-sm">Active Access</p>
                <p className="text-2xl font-bold">
                  {purchases.filter(p => p.has_access).length}
                </p>
              </div>
              <div>
                <p className="text-purple-100 text-sm">Total Spent</p>
                <p className="text-2xl font-bold">
                  ${purchases.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
