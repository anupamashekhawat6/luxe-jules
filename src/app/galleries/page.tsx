'use client';

import React, { Suspense, useState, useEffect } from 'react';
import type { Gallery } from '@/lib/types';
import { GalleriesList } from './GalleriesList';
import { Skeleton } from '@/components/ui/skeleton';
import { getGalleries } from '@/lib/localStorage';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

const GALLERIES_PER_PAGE = 18;

function GalleriesPageSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12 min-h-[600px]">
            {Array.from({ length: 18 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full h-full rounded-lg" />
            ))}
        </div>
    );
}

export default function GalleriesPage() {
  return (
    <div className="w-full-safe max-w-screen-safe">
      <div className="container mx-auto responsive-padding py-16">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-luxury-gradient text-black font-semibold text-sm px-4 py-2">
            <ImageIcon className="w-4 h-4 mr-2" />
            VISUAL EXCELLENCE
          </Badge>
          <h1 className="mb-6">Premium Galleries</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our meticulously curated collection of stunning photography
          </p>
        </div>
        <Suspense fallback={<GalleriesPageSkeleton />}>
          <GalleriesList />
        </Suspense>
      </div>
    </div>
  );
}