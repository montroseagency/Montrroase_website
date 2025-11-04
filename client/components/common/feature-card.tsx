import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  iconColor?: string;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  link,
  linkText = 'Learn more',
  iconColor = 'from-primary-500 to-primary-700'
}: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-100 transition-all duration-300 hover:-translate-y-2">
      <div className={`w-14 h-14 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">
        {title}
      </h3>
      <p className="text-neutral-600 mb-4 leading-relaxed">
        {description}
      </p>
      {link && (
        <Link 
          href={link} 
          className="text-primary-600 font-semibold inline-flex items-center group-hover:gap-2 transition-all"
        >
          {linkText}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}