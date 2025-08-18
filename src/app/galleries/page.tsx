'use client';

import React from 'react';
import { GalleriesList } from './GalleriesList';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

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

        <GalleriesList />
      </div>
    </div>
  );
}