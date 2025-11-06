import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string | number;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function PricingCard({
  name,
  price,
  period = 'month',
  description,
  features,
  highlighted = false,
  badge,
  ctaText = 'Get Started',
  ctaLink = '/auth/register'
}: PricingCardProps) {
  return (
    <div className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 ${
      highlighted
        ? 'border-blue-500 shadow-2xl'
        : 'border-gray-200 shadow-md hover:shadow-xl'
    }`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md">
            {badge}
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {name}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <div className="flex items-baseline justify-center">
          {typeof price === 'number' && (
            <span className="text-5xl font-bold text-gray-900">
              ${price}
            </span>
          )}
          {typeof price === 'string' && (
            <span className="text-5xl font-bold text-gray-900">
              {price}
            </span>
          )}
          {period && (
            <span className="text-gray-600 ml-2">
              /{period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={ctaLink} className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all ${
        highlighted
          ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl'
          : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
      }`}>
        {ctaText}
      </Link>
    </div>
  );
}