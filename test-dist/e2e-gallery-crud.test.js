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
function runGalleryCrudTest() {
    console.log('Running Gallery CRUD Test...');
    (0, localStorage_1.clearLocalStorage)();
    (0, localStorage_1.initializeLocalStorage)();
    const initialGalleries = (0, localStorage_1.getGalleries)();
    (0, assert_1.default)(initialGalleries.length > 0, 'Initial galleries should be seeded.');
    console.log('✅ Initial data seeded correctly.');
    // 1. CREATE
    const newGalleryData = {
        title: 'Test Gallery',
        description: 'A gallery for testing purposes.',
        images: [{ url: 'test.jpg', alt: 'Test Image' }],
        models: ['Test Model'],
        tags: ['test'],
        keywords: ['test'],
        date: new Date().toISOString(),
        status: 'Published',
    };
    const createdGallery = (0, localStorage_1.createGallery)(newGalleryData);
    (0, assert_1.default)(createdGallery, 'createGallery should return the created gallery.');
    assert_1.default.strictEqual(createdGallery.title, newGalleryData.title, 'Created gallery title is incorrect.');
    console.log('✅ CREATE: Gallery created successfully.');
    // 2. READ
    const readGallery = (0, localStorage_1.getGalleryById)(createdGallery.id);
    (0, assert_1.default)(readGallery, 'getGalleryById should return the gallery.');
    assert_1.default.strictEqual(readGallery.id, createdGallery.id, 'Read gallery ID is incorrect.');
    console.log('✅ READ: Gallery read successfully.');
    // 3. UPDATE
    const updates = { title: 'Updated Test Gallery' };
    const updatedGallery = (0, localStorage_1.updateGalleryFunc)(createdGallery.id, updates);
    (0, assert_1.default)(updatedGallery, 'updateGalleryFunc should return the updated gallery.');
    assert_1.default.strictEqual(updatedGallery.title, 'Updated Test Gallery', 'Updated gallery title is incorrect.');
    console.log('✅ UPDATE: Gallery updated successfully.');
    // 4. READ (Verify Update)
    const readUpdatedGallery = (0, localStorage_1.getGalleryById)(createdGallery.id);
    assert_1.default.strictEqual(readUpdatedGallery.title, 'Updated Test Gallery', 'Gallery title was not updated correctly.');
    console.log('✅ READ (Verify Update): Gallery update verified.');
    // 5. DELETE
    const deleteResult = (0, localStorage_1.deleteGalleryFunc)(createdGallery.id);
    assert_1.default.strictEqual(deleteResult, true, 'deleteGalleryFunc should return true on success.');
    console.log('✅ DELETE: Gallery deleted successfully.');
    // 6. READ (Verify Deletion)
    const deletedGallery = (0, localStorage_1.getGalleryById)(createdGallery.id);
    assert_1.default.strictEqual(deletedGallery, undefined, 'Gallery should be deleted.');
    console.log('✅ READ (Verify Deletion): Gallery deletion verified.');
    console.log('Gallery CRUD Test completed successfully!');
}
try {
    runGalleryCrudTest();
}
catch (error) {
    console.error('Gallery CRUD Test failed:', error);
    process.exit(1);
}
