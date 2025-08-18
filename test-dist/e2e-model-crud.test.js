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
function runModelCrudTest() {
    console.log('Running Model CRUD Test...');
    (0, localStorage_1.clearLocalStorage)();
    (0, localStorage_1.initializeLocalStorage)();
    const initialModels = (0, localStorage_1.getModels)();
    (0, assert_1.default)(initialModels.length > 0, 'Initial models should be seeded.');
    console.log('✅ Initial data seeded correctly.');
    // 1. CREATE
    const newModelData = {
        name: 'Test Model',
        description: 'A model for testing purposes.',
        image: 'test.jpg',
        status: 'Active',
    };
    const createdModel = (0, localStorage_1.createModel)(newModelData);
    (0, assert_1.default)(createdModel, 'createModel should return the created model.');
    assert_1.default.strictEqual(createdModel.name, newModelData.name, 'Created model name is incorrect.');
    console.log('✅ CREATE: Model created successfully.');
    // 2. READ
    const readModel = (0, localStorage_1.getModelById)(createdModel.id);
    (0, assert_1.default)(readModel, 'getModelById should return the model.');
    assert_1.default.strictEqual(readModel.id, createdModel.id, 'Read model ID is incorrect.');
    console.log('✅ READ: Model read successfully.');
    // 3. UPDATE
    const updates = { name: 'Updated Test Model' };
    const updatedModel = (0, localStorage_1.updateModelFunc)(createdModel.id, updates);
    (0, assert_1.default)(updatedModel, 'updateModelFunc should return the updated model.');
    assert_1.default.strictEqual(updatedModel.name, 'Updated Test Model', 'Updated model name is incorrect.');
    console.log('✅ UPDATE: Model updated successfully.');
    // 4. READ (Verify Update)
    const readUpdatedModel = (0, localStorage_1.getModelById)(createdModel.id);
    assert_1.default.strictEqual(readUpdatedModel.name, 'Updated Test Model', 'Model name was not updated correctly.');
    console.log('✅ READ (Verify Update): Model update verified.');
    // 5. DELETE
    const deleteResult = (0, localStorage_1.deleteModelFunc)(createdModel.id);
    assert_1.default.strictEqual(deleteResult, true, 'deleteModelFunc should return true on success.');
    console.log('✅ DELETE: Model deleted successfully.');
    // 6. READ (Verify Deletion)
    const deletedModel = (0, localStorage_1.getModelById)(createdModel.id);
    assert_1.default.strictEqual(deletedModel, undefined, 'Model should be deleted.');
    console.log('✅ READ (Verify Deletion): Model deletion verified.');
    console.log('Model CRUD Test completed successfully!');
}
try {
    runModelCrudTest();
}
catch (error) {
    console.error('Model CRUD Test failed:', error);
    process.exit(1);
}
