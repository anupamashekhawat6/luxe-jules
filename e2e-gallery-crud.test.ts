// This must be at the very top, before any imports that might use localStorage.
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'window', {
  value: {
    localStorage: localStorageMock,
    isBrowser: true,
  },
});

import {
  createGallery,
  getGalleryById,
  updateGalleryFunc,
  deleteGalleryFunc,
  getGalleries,
  initializeLocalStorage,
  clearLocalStorage,
} from './src/lib/localStorage';
import type { Gallery } from './src/lib/types';
import assert from 'assert';

function runGalleryCrudTest() {
  console.log('Running Gallery CRUD Test...');

  clearLocalStorage();
  initializeLocalStorage();

  const initialGalleries = getGalleries();
  assert(initialGalleries.length > 0, 'Initial galleries should be seeded.');
  console.log('✅ Initial data seeded correctly.');

  // 1. CREATE
  const newGalleryData: Omit<Gallery, 'id'> = {
    title: 'Test Gallery',
    description: 'A gallery for testing purposes.',
    images: [{ url: 'test.jpg', alt: 'Test Image' }],
    models: ['Test Model'],
    tags: ['test'],
    keywords: ['test'],
    date: new Date().toISOString(),
    status: 'Published',
  };
  const createdGallery = createGallery(newGalleryData);
  assert(createdGallery, 'createGallery should return the created gallery.');
  assert.strictEqual(createdGallery.title, newGalleryData.title, 'Created gallery title is incorrect.');
  console.log('✅ CREATE: Gallery created successfully.');

  // 2. READ
  const readGallery = getGalleryById(createdGallery.id);
  assert(readGallery, 'getGalleryById should return the gallery.');
  assert.strictEqual(readGallery.id, createdGallery.id, 'Read gallery ID is incorrect.');
  console.log('✅ READ: Gallery read successfully.');

  // 3. UPDATE
  const updates: Partial<Gallery> = { title: 'Updated Test Gallery' };
  const updatedGallery = updateGalleryFunc(createdGallery.id, updates);
  assert(updatedGallery, 'updateGalleryFunc should return the updated gallery.');
  assert.strictEqual(updatedGallery.title, 'Updated Test Gallery', 'Updated gallery title is incorrect.');
  console.log('✅ UPDATE: Gallery updated successfully.');

  // 4. READ (Verify Update)
  const readUpdatedGallery = getGalleryById(createdGallery.id);
  assert.strictEqual(readUpdatedGallery.title, 'Updated Test Gallery', 'Gallery title was not updated correctly.');
  console.log('✅ READ (Verify Update): Gallery update verified.');

  // 5. DELETE
  const deleteResult = deleteGalleryFunc(createdGallery.id);
  assert.strictEqual(deleteResult, true, 'deleteGalleryFunc should return true on success.');
  console.log('✅ DELETE: Gallery deleted successfully.');

  // 6. READ (Verify Deletion)
  const deletedGallery = getGalleryById(createdGallery.id);
  assert.strictEqual(deletedGallery, undefined, 'Gallery should be deleted.');
  console.log('✅ READ (Verify Deletion): Gallery deletion verified.');

  console.log('Gallery CRUD Test completed successfully!');
}

try {
  runGalleryCrudTest();
} catch (error) {
  console.error('Gallery CRUD Test failed:', error);
  process.exit(1);
}
