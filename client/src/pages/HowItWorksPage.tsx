// pages/HowItWorksPage.tsx - Web Development Agency Version
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Palette, 
  Code, 
  Rocket, 
  CheckCircle, 
  Clock, 
  Shield,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  Heart,
  Globe,
  Database,
  Smartphone,
  Server,
  Monitor,
  Target,
  Settings
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              How We <span className="text-yellow-300">Build</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Our proven 4-step development process delivers exceptional web solutions that scale with your business
            </p>
            <div className="flex justify-center">
              <Link 
                to="/auth"
                className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors"
              >
                Start Your Project Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Development Process</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              From initial consultation to launch and beyond, we handle every aspect of your web development project
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="bg-blue-100 p-3 sm:p-4 rounded-full mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Search className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-blue-600 font-semibold text-base sm:text-lg">Step 1</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Discovery & Planning</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  We dive deep into understanding your business goals, target audience, and technical requirements. 
                  This foundation ensures we build exactly what you need.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Requirements gathering and analysis</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Technical architecture planning</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Project timeline and milestone definition</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <Target className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4" />
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">Strategic Foundation</h4>
                  <p className="text-sm sm:text-base">We analyze your business needs and create a detailed roadmap for success before writing a single line of code.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <Palette className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4" />
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">Design Excellence</h4>
                  <p className="text-sm sm:text-base">Beautiful, user-centered designs that not only look amazing but convert visitors into customers.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="bg-green-100 p-3 sm:p-4 rounded-full mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <div>
                    <span className="text-green-600 font-semibold text-base sm:text-lg">Step 2</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Design & Prototyping</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Our design team creates stunning visual concepts and interactive prototypes that bring your 
                  vision to life before development begins.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Wireframing and user flow mapping</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Visual design and branding integration</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Interactive prototypes for testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="bg-purple-100 p-3 sm:p-4 rounded-full mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-purple-600 font-semibold text-base sm:text-lg">Step 3</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Development & Testing</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Our expert developers bring the designs to life using modern technologies and best practices, 
                  with rigorous testing at every stage.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Frontend and backend development</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Comprehensive testing and quality assurance</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Performance optimization and security</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <Code className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4" />
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">Clean Code</h4>
                  <p className="text-sm sm:text-base">We write maintainable, scalable code using industry best practices and modern frameworks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <Rocket className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4" />
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">Launch & Scale</h4>
                  <p className="text-sm sm:text-base">Seamless deployment with ongoing support to ensure your website performs flawlessly at scale.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="bg-orange-100 p-3 sm:p-4 rounded-full mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-orange-600 font-semibold text-base sm:text-lg">Step 4</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Launch & Support</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  We handle the technical deployment and provide comprehensive support to ensure your website 
                  runs smoothly and continues to evolve with your business.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Production deployment and DNS setup</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Performance monitoring and analytics</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Ongoing maintenance and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Our Method?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Our approach combines proven development methodologies with cutting-edge technology to deliver results that last
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard 
              icon={Shield}
              title="Secure & Scalable"
              description="We build with security-first principles and ensure your website can handle growth and traffic spikes."
              color="text-green-600"
              bgColor="bg-green-100"
            />
            <FeatureCard 
              icon={Clock}
              title="On-Time Delivery"
              description="Agile development process with clear milestones ensures we deliver your project on schedule."
              color="text-blue-600"
              bgColor="bg-blue-100"
            />
            <FeatureCard 
              icon={Users}
              title="Expert Team"
              description="Experienced developers, designers, and project managers dedicated to your project's success."
              color="text-purple-600"
              bgColor="bg-purple-100"
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Clear Communication"
              description="Regular updates, transparent reporting, and direct access to your development team."
              color="text-orange-600"
              bgColor="bg-orange-100"
            />
            <FeatureCard 
              icon={Zap}
              title="High Performance"
              description="Optimized code and modern hosting ensure lightning-fast load times and excellent user experience."
              color="text-red-600"
              bgColor="bg-red-100"
            />
            <FeatureCard 
              icon={Settings}
              title="Modern Technology"
              description="We use the latest frameworks and tools to build future-proof solutions that evolve with technology."
              color="text-indigo-600"
              bgColor="bg-indigo-100"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Technology Stack</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">Modern tools and frameworks for exceptional results</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <TechCard 
              icon={Monitor}
              title="Frontend"
              technologies={["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"]}
              color="bg-blue-500"
            />
            <TechCard 
              icon={Server}
              title="Backend"
              technologies={["Node.js", "Python", "PHP", "Java", "Express.js"]}
              color="bg-green-500"
            />
            <TechCard 
              icon={Database}
              title="Database"
              technologies={["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"]}
              color="bg-purple-500"
            />
            <TechCard 
              icon={Globe}
              title="Cloud & DevOps"
              technologies={["AWS", "Azure", "Docker", "CI/CD", "Kubernetes"]}
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Project Timeline</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">See what to expect during your development journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <TimelineCard 
              period="Week 1-2"
              title="Discovery & Planning"
              description="Requirements gathering, technical planning, and project roadmap creation."
              percentage="Foundation"
              color="bg-blue-500"
            />
            <TimelineCard 
              period="Week 3-4"
              title="Design & Prototyping"
              description="Visual design creation, user experience optimization, and prototype development."
              percentage="Design Phase"
              color="bg-green-500"
            />
            <TimelineCard 
              period="Week 5-8"
              title="Development & Testing"
              description="Code development, feature implementation, and comprehensive testing."
              percentage="Build Phase"
              color="bg-purple-500"
            />
            <TimelineCard 
              period="Week 9+"
              title="Launch & Support"
              description="Deployment, launch preparation, and ongoing maintenance support."
              percentage="Go Live"
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Join hundreds of satisfied clients who have transformed their business with our proven development process
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              to="/auth"
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = ({ icon: Icon, title, description, color, bgColor }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
    <div className={`${bgColor} w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${color}`} />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
  </div>
);

// Technology Card Component
const TechCard: React.FC<{
  icon: React.ElementType;
  title: string;
  technologies: string[];
  color: string;
}> = ({ icon: Icon, title, technologies, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-1">
      {technologies.map((tech, index) => (
        <li key={index} className="text-sm text-gray-600">• {tech}</li>
      ))}
    </ul>
  </div>
);

// Timeline Card Component
const TimelineCard: React.FC<{
  period: string;
  title: string;
  description: string;
  percentage: string;
  color: string;
}> = ({ period, title, description, percentage, color }) => (
  <div className="text-center">
    <div className={`${color} text-white rounded-lg p-4 sm:p-6 mb-3 sm:mb-4`}>
      <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">{period}</div>
      <div className="text-lg sm:text-xl font-bold">{percentage}</div>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</h3>
    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
  </div>
);

export default HowItWorksPage;