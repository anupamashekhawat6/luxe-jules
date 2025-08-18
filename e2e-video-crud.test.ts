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
  createVideo,
  getVideoById,
  updateVideoFunc,
  deleteVideoFunc,
  getVideos,
  initializeLocalStorage,
  clearLocalStorage,
  setUsers,
  getUsers,
} from './src/lib/localStorage';
import type { Video } from './src/lib/types';
import assert from 'assert';

function runVideoCrudTest() {
  console.log('Running Video CRUD Test...');

  // Initialize with seed data
  clearLocalStorage();
  initializeLocalStorage();

  // Verify initial state
  const initialVideos = getVideos();
  const initialUsers = getUsers();

  assert(initialVideos.length > 0, 'Initial videos should be seeded.');
  assert(initialUsers.length > 0, 'Initial users should be seeded.');
  console.log('✅ Initial data seeded correctly.');

  // 1. CREATE
  const newVideoData: Omit<Video, 'id'> = {
    title: 'Test Video',
    description: 'A video for testing purposes.',
    image: 'test.jpg',
    videoUrl: 'test.mp4',
    models: ['Test Model'],
    tags: ['test'],
    keywords: ['test'],
    date: new Date().toISOString(),
    status: 'Published',
    isFeatured: false,
  };
  const createdVideo = createVideo(newVideoData);
  assert(createdVideo, 'createVideo should return the created video.');
  assert.strictEqual(createdVideo.title, newVideoData.title, 'Created video title is incorrect.');
  console.log('✅ CREATE: Video created successfully.');

  // 2. READ
  const readVideo = getVideoById(createdVideo.id);
  assert(readVideo, 'getVideoById should return the video.');
  assert.strictEqual(readVideo.id, createdVideo.id, 'Read video ID is incorrect.');
  console.log('✅ READ: Video read successfully.');

  // 3. UPDATE
  const updates: Partial<Video> = { title: 'Updated Test Video' };
  const updatedVideo = updateVideoFunc(createdVideo.id, updates);
  assert(updatedVideo, 'updateVideoFunc should return the updated video.');
  assert.strictEqual(updatedVideo.title, 'Updated Test Video', 'Updated video title is incorrect.');
  console.log('✅ UPDATE: Video updated successfully.');

  // 4. READ (Verify Update)
  const readUpdatedVideo = getVideoById(createdVideo.id);
  assert.strictEqual(readUpdatedVideo.title, 'Updated Test Video', 'Video title was not updated correctly.');
  console.log('✅ READ (Verify Update): Video update verified.');

  // 5. DELETE
  const deleteResult = deleteVideoFunc(createdVideo.id);
  assert.strictEqual(deleteResult, true, 'deleteVideoFunc should return true on success.');
  console.log('✅ DELETE: Video deleted successfully.');

  // 6. READ (Verify Deletion)
  const deletedVideo = getVideoById(createdVideo.id);
  assert.strictEqual(deletedVideo, undefined, 'Video should be deleted.');
  console.log('✅ READ (Verify Deletion): Video deletion verified.');

  console.log('Video CRUD Test completed successfully!');
}

try {
  runVideoCrudTest();
} catch (error) {
  console.error('Video CRUD Test failed:', error);
  process.exit(1);
}
