"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This must be at the very top, before any imports that might use localStorage.
const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
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
const localStorage_1 = require("./src/lib/localStorage");
const assert_1 = __importDefault(require("assert"));
function runVideoCrudTest() {
    console.log('Running Video CRUD Test...');
    // Initialize with seed data
    (0, localStorage_1.clearLocalStorage)();
    (0, localStorage_1.initializeLocalStorage)();
    // Verify initial state
    const initialVideos = (0, localStorage_1.getVideos)();
    const initialUsers = (0, localStorage_1.getUsers)();
    (0, assert_1.default)(initialVideos.length > 0, 'Initial videos should be seeded.');
    (0, assert_1.default)(initialUsers.length > 0, 'Initial users should be seeded.');
    console.log('✅ Initial data seeded correctly.');
    // 1. CREATE
    const newVideoData = {
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
    const createdVideo = (0, localStorage_1.createVideo)(newVideoData);
    (0, assert_1.default)(createdVideo, 'createVideo should return the created video.');
    assert_1.default.strictEqual(createdVideo.title, newVideoData.title, 'Created video title is incorrect.');
    console.log('✅ CREATE: Video created successfully.');
    // 2. READ
    const readVideo = (0, localStorage_1.getVideoById)(createdVideo.id);
    (0, assert_1.default)(readVideo, 'getVideoById should return the video.');
    assert_1.default.strictEqual(readVideo.id, createdVideo.id, 'Read video ID is incorrect.');
    console.log('✅ READ: Video read successfully.');
    // 3. UPDATE
    const updates = { title: 'Updated Test Video' };
    const updatedVideo = (0, localStorage_1.updateVideoFunc)(createdVideo.id, updates);
    (0, assert_1.default)(updatedVideo, 'updateVideoFunc should return the updated video.');
    assert_1.default.strictEqual(updatedVideo.title, 'Updated Test Video', 'Updated video title is incorrect.');
    console.log('✅ UPDATE: Video updated successfully.');
    // 4. READ (Verify Update)
    const readUpdatedVideo = (0, localStorage_1.getVideoById)(createdVideo.id);
    assert_1.default.strictEqual(readUpdatedVideo.title, 'Updated Test Video', 'Video title was not updated correctly.');
    console.log('✅ READ (Verify Update): Video update verified.');
    // 5. DELETE
    const deleteResult = (0, localStorage_1.deleteVideoFunc)(createdVideo.id);
    assert_1.default.strictEqual(deleteResult, true, 'deleteVideoFunc should return true on success.');
    console.log('✅ DELETE: Video deleted successfully.');
    // 6. READ (Verify Deletion)
    const deletedVideo = (0, localStorage_1.getVideoById)(createdVideo.id);
    assert_1.default.strictEqual(deletedVideo, undefined, 'Video should be deleted.');
    console.log('✅ READ (Verify Deletion): Video deletion verified.');
    console.log('Video CRUD Test completed successfully!');
}
try {
    runVideoCrudTest();
}
catch (error) {
    console.error('Video CRUD Test failed:', error);
    process.exit(1);
}
