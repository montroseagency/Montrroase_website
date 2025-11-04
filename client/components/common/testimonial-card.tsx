import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-card border border-neutral-100 hover:shadow-card-hover transition-shadow duration-300">
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-neutral-700 leading-relaxed mb-6">
        "{quote}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
          {avatar ? (
            <Image 
              src={avatar} 
              alt={author} 
              width={48} 
              height={48} 
              className="rounded-full"
            />
          ) : (
            author.charAt(0)
          )}
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{author}</p>
          <p className="text-sm text-neutral-600">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
}