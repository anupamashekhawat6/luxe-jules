'use client';

import React from 'react';
import { VideosList } from './VideosList';
import { Badge } from '@/components/ui/badge';
import { Film } from 'lucide-react';

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

        <VideosList />
      </div>
    </div>
  );
}