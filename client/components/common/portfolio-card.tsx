import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  tags?: string[];
  link?: string;
  videoUrl?: string;
}

export default function PortfolioCard({
  title,
  category,
  description,
  image,
  price,
  tags = [],
  link,
  videoUrl
}: PortfolioCardProps) {
  const CardWrapper = link
    ? ({ children }: { children: React.ReactNode }) => <Link href={link}>{children}</Link>
    : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  return (
    <CardWrapper>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {price && (
              <span className="text-lg font-bold text-blue-600">
                {price}
              </span>
            )}
            <span className="text-blue-600 font-semibold inline-flex items-center group-hover:gap-2 transition-all ml-auto">
              View Project
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}