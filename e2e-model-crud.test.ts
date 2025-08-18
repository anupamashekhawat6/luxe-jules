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
  createModel,
  getModelById,
  updateModelFunc,
  deleteModelFunc,
  getModels,
  initializeLocalStorage,
  clearLocalStorage,
} from './src/lib/localStorage';
import type { Model } from './src/lib/types';
import assert from 'assert';

function runModelCrudTest() {
  console.log('Running Model CRUD Test...');

  clearLocalStorage();
  initializeLocalStorage();

  const initialModels = getModels();
  assert(initialModels.length > 0, 'Initial models should be seeded.');
  console.log('✅ Initial data seeded correctly.');

  // 1. CREATE
  const newModelData: Omit<Model, 'id'> = {
    name: 'Test Model',
    description: 'A model for testing purposes.',
    image: 'test.jpg',
    status: 'Active',
  };
  const createdModel = createModel(newModelData);
  assert(createdModel, 'createModel should return the created model.');
  assert.strictEqual(createdModel.name, newModelData.name, 'Created model name is incorrect.');
  console.log('✅ CREATE: Model created successfully.');

  // 2. READ
  const readModel = getModelById(createdModel.id);
  assert(readModel, 'getModelById should return the model.');
  assert.strictEqual(readModel.id, createdModel.id, 'Read model ID is incorrect.');
  console.log('✅ READ: Model read successfully.');

  // 3. UPDATE
  const updates: Partial<Model> = { name: 'Updated Test Model' };
  const updatedModel = updateModelFunc(createdModel.id, updates);
  assert(updatedModel, 'updateModelFunc should return the updated model.');
  assert.strictEqual(updatedModel.name, 'Updated Test Model', 'Updated model name is incorrect.');
  console.log('✅ UPDATE: Model updated successfully.');

  // 4. READ (Verify Update)
  const readUpdatedModel = getModelById(createdModel.id);
  assert.strictEqual(readUpdatedModel.name, 'Updated Test Model', 'Model name was not updated correctly.');
  console.log('✅ READ (Verify Update): Model update verified.');

  // 5. DELETE
  const deleteResult = deleteModelFunc(createdModel.id);
  assert.strictEqual(deleteResult, true, 'deleteModelFunc should return true on success.');
  console.log('✅ DELETE: Model deleted successfully.');

  // 6. READ (Verify Deletion)
  const deletedModel = getModelById(createdModel.id);
  assert.strictEqual(deletedModel, undefined, 'Model should be deleted.');
  console.log('✅ READ (Verify Deletion): Model deletion verified.');

  console.log('Model CRUD Test completed successfully!');
}

try {
  runModelCrudTest();
} catch (error) {
  console.error('Model CRUD Test failed:', error);
  process.exit(1);
}
