'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '@/lib/api';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  project_name: string;
  industry: string;
  business_goals: string;
  target_audience: string;
  desired_features: string[];
  content_requirements: string;
  design_preferences: string;
  timeline_expectations: string;
  budget_range: string;
  additional_notes: string;
}

const STEP_TITLES = [
  'Project Basics',
  'Business Goals',
  'Features & Design',
  'Timeline & Budget',
  'Review & Submit'
];

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    project_name: '',
    industry: '',
    business_goals: '',
    target_audience: '',
    desired_features: [],
    content_requirements: '',
    design_preferences: '',
    timeline_expectations: '',
    budget_range: '',
    additional_notes: ''
  });

  const featureOptions = [
    'E-commerce',
    'Blog',
    'Contact Form',
    'Newsletter',
    'User Authentication',
    'Payment Integration',
    'Search Functionality',
    'Multi-language',
    'Analytics Dashboard',
    'Social Media Integration',
    'Live Chat',
    'Booking System',
    'API Integration',
    'Custom CMS'
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      desired_features: prev.desired_features.includes(feature)
        ? prev.desired_features.filter(f => f !== feature)
        : [...prev.desired_features, feature]
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.post('/website-projects/', formData);
      router.push(`/dashboard/client/website-builder/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.project_name && formData.industry;
      case 1:
        return formData.business_goals && formData.target_audience;
      case 2:
        return formData.desired_features.length > 0 && formData.design_preferences;
      case 3:
        return formData.timeline_expectations && formData.budget_range;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/client/website-builder"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">New Website Project</h1>
              <p className="text-gray-600 mt-1">Let's bring your vision to life</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {STEP_TITLES.map((title, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    index < currentStep ? 'bg-green-500 text-white' :
                    index === currentStep ? 'bg-purple-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < STEP_TITLES.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <p className={`text-xs mt-2 ${index === currentStep ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Step 0: Project Basics */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  placeholder="e.g., My Business Website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="finance">Finance</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="nonprofit">Non-profit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Business Goals */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Goals *
                </label>
                <textarea
                  value={formData.business_goals}
                  onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                  placeholder="What do you want to achieve with this website?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <textarea
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  placeholder="Describe your ideal customers or users"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Features & Design */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Desired Features * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featureOptions.map((feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleFeatureToggle(feature)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        formData.desired_features.includes(feature)
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Preferences *
                </label>
                <textarea
                  value={formData.design_preferences}
                  onChange={(e) => setFormData({ ...formData, design_preferences: e.target.value })}
                  placeholder="Describe your desired look and feel (colors, style, examples)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Requirements
                </label>
                <textarea
                  value={formData.content_requirements}
                  onChange={(e) => setFormData({ ...formData, content_requirements: e.target.value })}
                  placeholder="What content will you provide? What do you need help with?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 3: Timeline & Budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline Expectations *
                </label>
                <select
                  value={formData.timeline_expectations}
                  onChange={(e) => setFormData({ ...formData, timeline_expectations: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select expected timeline</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="3-4 weeks">3-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="3+ months">3+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range *
                </label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.additional_notes}
                  onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                  placeholder="Any other information we should know?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-4">Review Your Project</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Project Name</p>
                    <p className="text-purple-900">{formData.project_name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-700 font-medium">Industry</p>
                    <p className="text-purple-900 capitalize">{formData.industry}</p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-700 font-medium">Business Goals</p>
                    <p className="text-purple-900">{formData.business_goals}</p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-700 font-medium">Features ({formData.desired_features.length})</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.desired_features.map((feature) => (
                        <span key={feature} className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-purple-700 font-medium">Timeline</p>
                    <p className="text-purple-900">{formData.timeline_expectations}</p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-700 font-medium">Budget Range</p>
                    <p className="text-purple-900">{formData.budget_range}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>What happens next?</strong> Our AI will analyze your requirements and generate a detailed
                  valuation with cost estimates and timeline. You'll then be able to view a demo of your website before
                  proceeding with payment.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {loading ? 'Creating...' : 'Submit Project'}
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
