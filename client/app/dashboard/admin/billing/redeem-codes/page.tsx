'use client';

import { useEffect, useState } from 'react';
import { Plus, Copy, CheckCircle, XCircle, Calendar, Users, DollarSign } from 'lucide-react';
import ApiService from '@/lib/api';

interface RedeemCode {
  id: string;
  code: string;
  value: number;
  description: string;
  is_active: boolean;
  usage_limit: number;
  times_used: number;
  expires_at: string | null;
  created_by_name: string;
  created_at: string;
  is_valid: boolean;
}

export default function RedeemCodesPage() {
  const [codes, setCodes] = useState<RedeemCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    value: '',
    description: '',
    is_active: true,
    usage_limit: 1,
    expires_at: '',
    auto_generate: false,
    quantity: 1,
  });

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response: any = await ApiService.get('/redeem-codes/');
      const codesData = response.results || response;
      setCodes(Array.isArray(codesData) ? codesData : []);
    } catch (error) {
      console.error('Error fetching codes:', error);
      setCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: any = {
        value: parseFloat(formData.value),
        description: formData.description,
        is_active: formData.is_active,
        usage_limit: parseInt(formData.usage_limit.toString()),
        auto_generate: formData.auto_generate,
      };

      if (formData.auto_generate) {
        payload.quantity = parseInt(formData.quantity.toString());
      } else {
        payload.code = formData.code.toUpperCase();
      }

      if (formData.expires_at) {
        payload.expires_at = formData.expires_at;
      }

      await ApiService.post('/redeem-codes/', payload);
      setShowModal(false);
      resetForm();
      fetchCodes();
    } catch (error: any) {
      console.error('Error creating code:', error);
      const errorMessage = error.response?.data?.error
        || JSON.stringify(error.response?.data)
        || 'Failed to create redeem code';
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      value: '',
      description: '',
      is_active: true,
      usage_limit: 1,
      expires_at: '',
      auto_generate: false,
      quantity: 1,
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleActive = async (codeId: string, currentStatus: boolean) => {
    try {
      await ApiService.patch(`/redeem-codes/${codeId}/`, {
        is_active: !currentStatus,
      });
      fetchCodes();
    } catch (error) {
      console.error('Error toggling code status:', error);
      alert('Failed to update code status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redeem Codes</h1>
          <p className="text-gray-600 mt-1">Create and manage wallet credit codes</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Code</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Codes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{codes.length}</p>
            </div>
            <DollarSign className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Codes</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {codes.filter((c) => c.is_valid).length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Used Codes</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {codes.filter((c) => c.times_used > 0).length}
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Value</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                ${codes.reduce((sum, c) => sum + parseFloat(c.value.toString()), 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Codes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {codes.map((code) => (
                <tr key={code.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono font-bold text-purple-600">
                        {code.code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(code.code)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copiedCode === code.code ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {code.description && (
                      <p className="text-xs text-gray-500 mt-1">{code.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ${parseFloat(code.value.toString()).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`font-medium ${code.times_used >= code.usage_limit ? 'text-red-600' : 'text-gray-900'}`}>
                        {code.times_used}
                      </span>
                      <span className="text-gray-500"> / {code.usage_limit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {code.expires_at ? (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(code.expires_at).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Never</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {code.is_valid ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Valid
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Invalid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleActive(code.id, code.is_active)}
                      className={`${code.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {code.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}

              {codes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No redeem codes found. Create your first code to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Code Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Redeem Code</h2>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Auto Generate Toggle */}
              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="auto_generate"
                  checked={formData.auto_generate}
                  onChange={(e) => setFormData({ ...formData, auto_generate: e.target.checked })}
                  className="h-5 w-5 text-purple-600 focus:ring-2 focus:ring-purple-500 border-gray-300 rounded transition-all"
                />
                <label htmlFor="auto_generate" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Auto-generate codes
                </label>
              </div>

              {/* Quantity (only if auto-generating) */}
              {formData.auto_generate && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                    min={1}
                    max={100}
                  />
                </div>
              )}

              {/* Manual Code (only if not auto-generating) */}
              {!formData.auto_generate && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono"
                    required={!formData.auto_generate}
                    placeholder="SUMMER2024"
                  />
                </div>
              )}

              {/* Value */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Value ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  min={0.01}
                  placeholder="50.00"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  rows={2}
                  placeholder="Summer promotion code"
                />
              </div>

              {/* Usage Limit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usage Limit
                </label>
                <input
                  type="number"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({ ...formData, usage_limit: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  min={1}
                />
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiration Date (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-5 w-5 text-purple-600 focus:ring-2 focus:ring-purple-500 border-gray-300 rounded transition-all"
                />
                <label htmlFor="is_active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Active
                </label>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg shadow-purple-500/30"
                >
                  Create Code{formData.auto_generate && formData.quantity > 1 ? 's' : ''}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
