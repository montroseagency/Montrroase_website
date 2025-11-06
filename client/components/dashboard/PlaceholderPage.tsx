import Link from 'next/link';

export function PlaceholderPage({
  title,
  description,
  backLink,
  backLinkText = 'Go Back',
}: {
  title: string;
  description: string;
  backLink?: string;
  backLinkText?: string;
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚀</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">{description}</p>
        {backLink && (
          <Link
            href={backLink}
            className="inline-block text-purple-600 hover:text-purple-700 font-medium"
          >
            ← {backLinkText}
          </Link>
        )}
      </div>
    </div>
  );
}
