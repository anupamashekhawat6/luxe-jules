'use client';

import React, { Suspense, useState, useEffect } from 'react';
import type { Video } from '@/lib/types';
import { VideosList } from './VideosList';
import { Skeleton } from '@/components/ui/skeleton';
import { getVideos } from '@/lib/localStorage';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Film } from 'lucide-react';

const VIDEOS_PER_PAGE = 12;

function VideosPageSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[800px]">
            {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-video w-full h-full rounded-lg" />
            ))}
        </div>
    );
}

export default function VideosPage() {
  return (
    <div className="w-full-safe max-w-screen-safe">
      <div className="container mx-auto responsive-padding py-16">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-luxury-gradient text-black font-semibold text-sm px-4 py-2">
            <Film className="w-4 h-4 mr-2" />
            PREMIUM COLLECTION
          </Badge>
          <h1 className="mb-6">Exclusive Videos</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in our curated selection of premium video content
          </p>
        </div>
        <Suspense fallback={<VideosPageSkeleton />}>
          <VideosList />
        </Suspense>
      </div>
    </div>
  );
}