'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, StoreSection } from '@/types/store';
import { ProductCard } from '@/components/ProductCard';

interface CategoryCarouselProps {
  products: Product[];
  section: StoreSection;
}

export function CategoryCarousel({ products, section }: CategoryCarouselProps) {
  const total = products.length;
  const isMeat = section === 'meat';

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isTransitioning = useRef(false);

  // Ensure enough cloned items for seamless rotation across 4 visible desktop columns
  const trackItems =
    total <= 1
      ? products
      : total < 4
      ? [...products, ...products, ...products, ...products]
      : [...products, ...products];

  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  const handleNext = () => {
    if (total <= 1 || isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (total <= 1 || isTransitioning.current) return;
    isTransitioning.current = true;
    if (index === 0) {
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
        });
      });
    } else {
      setAnimate(true);
      setIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (index >= total) {
      setAnimate(false);
      setIndex(index % total);
    }
  };

  if (total === 0) return null;

  return (
    <div className="relative [--cols:1] sm:[--cols:2] lg:[--cols:4]">
      {/* Back Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label={`Previous ${section} items`}
        className={`absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#EBE7E0] bg-white/95 text-[#1C1917] shadow-md backdrop-blur-sm transition cursor-pointer ${
          isMeat
            ? 'hover:border-[#881337] hover:bg-[#881337] hover:text-white'
            : 'hover:border-[#1E5631] hover:bg-[#1E5631] hover:text-white'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Viewport */}
      <div className="overflow-x-hidden py-1">
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex gap-5 ${
            animate ? 'transition-transform duration-500 ease-out' : ''
          }`}
          style={{
            transform: `translateX(calc(-1 * ${index} * ((100% + 20px) / var(--cols))))`,
          }}
        >
          {trackItems.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="w-full shrink-0 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label={`Next ${section} items`}
        className={`absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#EBE7E0] bg-white/95 text-[#1C1917] shadow-md backdrop-blur-sm transition cursor-pointer ${
          isMeat
            ? 'hover:border-[#881337] hover:bg-[#881337] hover:text-white'
            : 'hover:border-[#1E5631] hover:bg-[#1E5631] hover:text-white'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
