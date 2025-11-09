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

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

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

  // Track mouse position for horizontal carousel control (throttled for performance)
  useEffect(() => {
    let rafId: number | null = null;
    let lastMouseX = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && rafId === null) {
        rafId = requestAnimationFrame(() => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            // Normalize mouse X position relative to container (0 to 1)
            const normalizedX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            // Only update if changed significantly (reduce re-renders)
            if (Math.abs(normalizedX - lastMouseX) > 0.01) {
              lastMouseX = normalizedX;
              setMouseX(normalizedX);
            }
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Duplicate images to get ~10 per column for seamless loop
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

  // Store single set height for seamless looping
  const singleSetHeightRef = useRef<number>(0);

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

  // Auto-scroll vertically with seamless infinite loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Wait for content to render and measure height
    const initScroll = () => {
      // Use ResizeObserver to get accurate height
      const resizeObserver = new ResizeObserver(() => {
        if (container.scrollHeight > 0) {
          // Height of a single set (first set of columns)
          const firstSet = container.querySelector('.column-set-1');
          if (firstSet) {
            singleSetHeightRef.current = (firstSet as HTMLElement).offsetHeight;
          } else {
            // Fallback: use half of total height (since we have 2 sets)
            singleSetHeightRef.current = container.scrollHeight / 2;
          }
          // Start at top for seamless loop
          container.scrollTop = 0;
        }
      });
      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    };

    const cleanupResize = initScroll();

    // Auto-scroll animation with seamless loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let scrollPosition = 0;

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (container && singleSetHeightRef.current > 0) {
        // Increment scroll position
        scrollPosition += (autoScrollSpeed * delta) / 16;

        // Seamless loop: when we reach the end of first set, reset to 0
        // This creates the illusion that items from top appear at bottom
        if (scrollPosition >= singleSetHeightRef.current) {
          scrollPosition = scrollPosition - singleSetHeightRef.current;
        }

        // Apply scroll position
        container.scrollTop = scrollPosition;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure content is rendered
    const startTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (cleanupResize) cleanupResize();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [columns, autoScrollSpeed]);

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
        
        {/* First set of columns */}
        <div 
          className="column-set-1 flex gap-4"
          style={{ 
            flexShrink: 0,
            transform: `translateX(${horizontalOffset}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {columns.map((column, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              className="flex flex-col gap-4"
              style={{
                width: columnWidth,
                flexShrink: 0,
                pointerEvents: 'none',
              }}
            >
              {column.map((image, imgIndex) => (
                <ImageCard
                  key={`${image.id}-${colIndex}-${imgIndex}`}
                  image={image}
                  cardRadius={cardRadius}
                />
              ))}
            </motion.div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop - items that scroll up appear here */}
        <div 
          className="column-set-2 flex gap-4"
          style={{ 
            flexShrink: 0,
            transform: `translateX(${horizontalOffset}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {columns.map((column, colIndex) => (
            <motion.div
              key={`col-dup-${colIndex}`}
              className="flex flex-col gap-4"
              style={{
                width: columnWidth,
                flexShrink: 0,
                pointerEvents: 'none',
              }}
            >
              {column.map((image, imgIndex) => (
                <ImageCard
                  key={`${image.id}-dup-${colIndex}-${imgIndex}`}
                  image={image}
                  cardRadius={cardRadius}
                />
              ))}
            </motion.div>
          ))}
        </div>
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

// Image Card Component - Memoized for performance
const ImageCard = memo(function ImageCard({
  image,
  cardRadius,
}: {
  image: ImageItem;
  cardRadius: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);
  
  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

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
            onLoad={handleLoad}
            onError={handleError}
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
});

