import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-primary-100">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-sm font-medium text-neutral-700">
                Real-Time Social Media Analytics
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent">
                Grow Your Social Media
              </span>
              <br />
              <span className="text-neutral-900">Like Never Before</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your social media presence with professional content
              management, real-time analytics, and proven growth strategies.
              Join businesses growing 10x faster.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">150+</div>
                <div className="text-sm text-neutral-600 mt-1">Active Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">2M+</div>
                <div className="text-sm text-neutral-600 mt-1">Followers Grown</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">98%</div>
                <div className="text-sm text-neutral-600 mt-1">Satisfaction</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/auth/register"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all duration-200 text-center"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Growing Today</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-primary-100 hover:border-primary-300 transform hover:-translate-y-1 transition-all duration-200 text-center"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:block animate-slide-up">
            {/* Dashboard Mockup */}
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800">Analytics Dashboard</h3>
                      <p className="text-xs text-neutral-500">Real-time insights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 rounded-xl">
                    <p className="text-sm text-primary-700 font-medium mb-1">Followers</p>
                    <p className="text-2xl font-bold text-primary-900">24.5K</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      +12.5%
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 p-4 rounded-xl">
                    <p className="text-sm text-accent-700 font-medium mb-1">Engagement</p>
                    <p className="text-2xl font-bold text-accent-900">8.4%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      +3.2%
                    </p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 bg-gradient-to-r from-primary-100 via-primary-50 to-accent-100 rounded-xl flex items-end justify-around p-4">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 w-48 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Content Posted</p>
                    <p className="font-bold text-neutral-800">Instagram</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 w-56 animate-pulse delay-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Growth Rate</p>
                    <p className="font-bold text-green-600">+15.3% this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}