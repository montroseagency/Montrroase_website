'use client';

import { useState, useEffect, useRef } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  image_url: string | null;
  grid_column: number;
  grid_row: number;
  flex_width: string;
  display_order: number;
  alt_text: string;
  caption: string;
  is_active: boolean;
}

export default function ImageCarousel() {
  const [mouseX, setMouseX] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor-following glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching gallery from http://localhost:8000/api/gallery/');

        const response = await fetch('http://localhost:8000/api/gallery/');
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Handle paginated response
        let items: GalleryItem[] = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data.results && Array.isArray(data.results)) {
          items = data.results;
        }

        console.log('Parsed items:', items);

        // Filter for items with images and sort by display_order
        const validItems = items
          .filter((item: GalleryItem) => item.image_url)
          .sort((a: GalleryItem, b: GalleryItem) => a.display_order - b.display_order);

        console.log('Valid items with images:', validItems);

        setGalleryItems(validItems);

        if (validItems.length === 0) {
          setError('No gallery items with images found');
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching gallery:', error);
        setError(errorMsg);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Split items: first 5 in row 1, next 5 in row 2
  const row1 = galleryItems.slice(0, 5);
  const row2 = galleryItems.slice(5, 10);

  // Image row component
  const Row = ({ items, rowHeight }: { items: GalleryItem[]; rowHeight: number }) => (
    <div
      className="flex w-full gap-0"
      style={{
        height: `${rowHeight}px`,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden cursor-pointer bg-slate-900"
          style={{
            flex: item.flex_width || '1',
            height: '100%',
          }}
        >
          {/* Image */}
          <img
            src={item.image_url || ''}
            alt={item.alt_text || item.title}
            className="w-full h-full object-cover group-hover:brightness-125 transition-all duration-300"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

          {/* Glowing border on hover */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 transition-all duration-300 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 pointer-events-none z-10" />

          {/* Corner glow effect */}
          <div
            className="absolute top-0 left-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(circle at top-left, rgba(255,255,255,0.2), transparent)',
            }}
          />

          {/* Title and caption on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <p className="text-white font-bold text-xs md:text-sm drop-shadow-lg text-center px-4">
              {item.title}
            </p>
            {item.caption && (
              <p className="text-white/70 text-xs mt-2 drop-shadow-lg px-4 text-center max-w-xs">
                {item.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <section
        ref={containerRef}
        className="relative w-screen -ml-[50vw] left-[50%] bg-black"
      >
        <div
          className="relative w-full bg-black flex items-center justify-center"
          style={{
            height: '400px',
          }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        ref={containerRef}
        className="relative w-screen -ml-[50vw] left-[50%] bg-black"
      >
        <div
          className="relative w-full bg-black flex items-center justify-center"
          style={{
            height: '400px',
          }}
        >
          <div className="text-center">
            <p className="text-red-400 text-sm">Error: {error}</p>
            <p className="text-gray-400 text-xs mt-2">Check browser console for details</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (galleryItems.length === 0) {
    return (
      <section
        ref={containerRef}
        className="relative w-screen -ml-[50vw] left-[50%] bg-black"
      >
        <div
          className="relative w-full bg-black flex items-center justify-center"
          style={{
            height: '400px',
          }}
        >
          <div className="text-center">
            <p className="text-gray-400">No gallery items available</p>
            <p className="text-gray-500 text-xs mt-2">Add images from the admin gallery</p>
          </div>
        </div>
      </section>
    );
  }

  // Main gallery display
  return (
    <section
      ref={containerRef}
      className="relative w-screen -ml-[50vw] left-[50%] bg-black overflow-visible"
    >
      {/* Cursor-following glow */}
      <div
        className="fixed top-0 h-full w-96 pointer-events-none z-20 opacity-40"
        style={{
          left: `${mouseX - 192}px`,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          filter: 'blur(50px)',
          transition: 'left 0.1s ease-out',
        }}
      />

      {/* Gallery container - 800px total height */}
      <div
        className="relative w-full bg-black"
        style={{
          height: '800px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Row 1: Images 1-5 (400px) */}
        {row1.length > 0 && <Row items={row1} rowHeight={400} />}

        {/* Row 2: Images 6-10 (400px) */}
        {row2.length > 0 && <Row items={row2} rowHeight={400} />}
      </div>

      {/* Fade-out gradient at bottom */}
      <div
        className="relative left-[50%] -ml-[50vw] w-screen pointer-events-none"
        style={{
          height: '30vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 1) 100%)',
        }}
      />

      {/* Ambient glow at bottom */}
      <div
        className="relative left-[50%] -ml-[50vw] w-screen pointer-events-none"
        style={{
          height: '40vh',
          background: 'radial-gradient(ellipse at center bottom, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </section>
  );
}
