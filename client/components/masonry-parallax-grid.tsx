/**
 * MasonryParallaxGrid - Mouse-following vertical scrolling masonry grid
 * 
 * Features:
 * - 5 columns total, 3 visible at a time on desktop
 * - Mouse position controls horizontal carousel position
 * - Vertical infinite scrolling
 * - Natural aspect ratios (object-contain, no cropping)
 * - ~10 images per column, ~2 visible in 800px limit
 * - Max height 800px for container
 * - Black cards with subtle glowing borders
 * - Static images (no API calls)
 * 
 * Usage:
 * ```tsx
 * // With default static images
 * <MasonryParallaxGrid />
 * 
 * // With custom images
 * <MasonryParallaxGrid 
 *   images={myImages}
 * />
 * ```
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ImageItem {
  id: string;
  url: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface MasonryParallaxGridProps {
  images?: ImageItem[];
  parallaxSpeeds?: [number, number, number];
  autoScroll?: boolean;
  autoScrollSpeed?: number;
  gap?: string;
  cardRadius?: number;
  className?: string;
}

// Static images from public folder (slim.png removed)
const STATIC_IMAGES: ImageItem[] = [
  { id: '1', url: '/images/hero/app.png', alt: 'App Design', title: 'App Design' },
  { id: '2', url: '/images/hero/car.png', alt: 'Car Showcase', title: 'Car Showcase' },
  { id: '3', url: '/images/hero/dashboard.png', alt: 'Dashboard', title: 'Dashboard' },
  { id: '4', url: '/images/hero/furniture.png', alt: 'Furniture', title: 'Furniture' },
  { id: '5', url: '/images/hero/jewllery.png', alt: 'Jewellery', title: 'Jewellery' },
  { id: '6', url: '/images/hero/modernhouse.png', alt: 'Modern House', title: 'Modern House' },
  { id: '8', url: '/images/hero/travel.png', alt: 'Travel', title: 'Travel' },
  { id: '9', url: '/images/hero/watches.png', alt: 'Watches', title: 'Watches' },
  { id: '10', url: '/images/hero/yacht.png', alt: 'Yacht', title: 'Yacht' },
];

export default function MasonryParallaxGrid({
  images: propImages,
  parallaxSpeeds = [0.3, 0.5, 0.7],
  autoScroll = false,
  autoScrollSpeed = 0.5,
  gap = '1rem',
  cardRadius = 10,
  className = '',
}: MasonryParallaxGridProps) {
  // Use provided images or default static images
  const images = propImages || STATIC_IMAGES;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0.5); // Start at center (shows columns 1-3)

  // Track mouse position for horizontal carousel control
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize mouse X position relative to container (0 to 1)
        const normalizedX = (e.clientX - rect.left) / rect.width;
        setMouseX(normalizedX);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Duplicate images to get ~10 per column
  const duplicatedImages = useMemo(() => {
    // Repeat images to get approximately 10 per column (5 columns * 10 = 50 images needed)
    const targetTotal = 50;
    const repeats = Math.ceil(targetTotal / images.length);
    return Array.from({ length: repeats }, () => images).flat().slice(0, targetTotal);
  }, [images]);

  // Distribute images across 5 columns (masonry style)
  const columns = useMemo(() => {
    const cols: ImageItem[][] = [[], [], [], [], []];
    const columnHeights = [0, 0, 0, 0, 0];

    duplicatedImages.forEach((image) => {
      // Find column with minimum height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      cols[minHeightIndex].push(image);
      // Estimate height (will be actual after image loads)
      columnHeights[minHeightIndex] += 400; // Rough estimate
    });

    return cols;
  }, [duplicatedImages]);

  // Duplicate columns for infinite vertical scroll
  const duplicatedColumns = useMemo(() => {
    return [columns, columns]; // Double for seamless infinite scroll
  }, [columns]);

  // Calculate horizontal offset based on mouse position
  // Mouse at left (0) shows columns 0-2, mouse at right (1) shows columns 2-4
  const horizontalOffset = useMemo(() => {
    // Map mouse position (0-1) to column offset
    // Mouse at 0: show columns 0-2 (offset = 0)
    // Mouse at 0.5: show columns 1-3 (offset = -1 column width)
    // Mouse at 1: show columns 2-4 (offset = -2 column widths)
    // Column width is approximately 33vw + gap, so we calculate based on that
    const columnWidthPx = typeof window !== 'undefined' 
      ? Math.min(window.innerWidth * 0.33, 400) 
      : 400;
    const gapPx = 16; // 1rem = 16px
    const totalColumnWidth = columnWidthPx + gapPx;
    
    // Map mouseX (0-1) to offset in pixels
    // At mouseX=0: offset=0 (columns 0-2 visible)
    // At mouseX=1: offset=-2*columnWidth (columns 2-4 visible)
    const offset = -mouseX * 2 * totalColumnWidth;
    return offset;
  }, [mouseX]);

  // Auto-scroll vertically and infinite scroll loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initialize scroll position to middle
    const initScroll = () => {
      const singleSetHeight = container.scrollHeight / 2;
      if (singleSetHeight > 0) {
        container.scrollTop = singleSetHeight;
      }
    };
    const timeoutId = setTimeout(initScroll, 100);

    // Auto-scroll animation
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const singleSetHeight = scrollHeight / 2;

        if (singleSetHeight <= 0) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }

        // Auto-scroll down
        const newScrollTop = scrollTop + (autoScrollSpeed * delta) / 16;

        // Handle infinite scroll loop
        if (newScrollTop >= singleSetHeight * 2) {
          // Loop back to start of second set
          container.scrollTop = newScrollTop - singleSetHeight;
        } else {
          container.scrollTop = newScrollTop;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duplicatedColumns, autoScrollSpeed]);

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  // Calculate column width (desktop: show 3 columns, each ~33vw)
  const columnWidth = useMemo(() => {
    return 'clamp(300px, 33vw, 400px)';
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ maxHeight: '800px' }}
    >
      {/* Fade mask at top */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />

      {/* Vertical scrolling container with mouse-controlled horizontal position */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
          maxHeight: '800px',
          height: '800px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          pointerEvents: 'none', // Disable all mouse interactions on container
        }}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} // Prevent manual scrolling and stop propagation
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} // Prevent touch scrolling
        onScroll={(e) => {
          e.stopPropagation();
        }} // Stop scroll events from bubbling
      >
        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Prevent scroll chaining - don't let scroll events bubble to parent */
          .hide-scrollbar {
            overscroll-behavior: contain;
          }
        `}</style>
        
        {duplicatedColumns.map((columnSet, setIndex) => (
          <div 
            key={`set-${setIndex}`} 
            className="flex gap-4"
            style={{ 
              flexShrink: 0,
              transform: `translateX(${horizontalOffset}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {columnSet.map((column, colIndex) => (
              <motion.div
                key={`col-${setIndex}-${colIndex}`}
                className="flex flex-col gap-4"
                style={{
                  width: columnWidth,
                  flexShrink: 0,
                  pointerEvents: 'none', // Disable mouse interactions on columns
                }}
              >
                {column.map((image, imgIndex) => (
                  <div key={`${image.id}-${setIndex}-${colIndex}-${imgIndex}`} style={{ pointerEvents: 'none' }}>
                    <ImageCard
                      image={image}
                      cardRadius={cardRadius}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Fade mask at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
}

// Image Card Component
function ImageCard({
  image,
  cardRadius,
}: {
  image: ImageItem;
  cardRadius: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className="group relative overflow-visible bg-black rounded-lg"
      style={{
        borderRadius: `${cardRadius}px`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.05)',
        width: '100%',
        pointerEvents: 'none', // Disable all mouse interactions
      }}
    >
      <div className="relative w-full">
        {!error ? (
          <img
            src={image.url}
            alt={image.alt}
            className={`w-full h-auto object-contain transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
            style={{ 
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-800 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Failed to load image</p>
          </div>
        )}

        {/* Loading placeholder */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" style={{ minHeight: '200px' }} />
        )}

        {/* Overlay on hover */}
        {(image.title || image.caption) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {image.title && (
              <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
            )}
            {image.caption && (
              <p className="text-white/80 text-xs">{image.caption}</p>
            )}
          </div>
        )}
      </div>

      {/* Subtle glow border on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
        }}
      />
    </motion.div>
  );
}

