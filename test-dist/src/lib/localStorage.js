'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModelFunc = exports.deleteGalleryFunc = exports.deleteVideoFunc = exports.updateModelFunc = exports.updateGalleryFunc = exports.updateVideoFunc = exports.createModel = exports.createGallery = exports.createVideo = exports.getFavoritesLegacy = exports.deleteModel = exports.updateModel = exports.addModel = exports.deleteVideo = exports.updateVideo = exports.addVideo = exports.deleteGallery = exports.updateGallery = exports.addGallery = exports.clearFavorites = exports.getFavoritesCount = exports.getFavoritesByType = exports.isFavorite = exports.removeFromFavorites = exports.addToFavorites = exports.getFavorites = exports.setTags = exports.getTags = exports.getUserByEmail = exports.getUserById = exports.setUsers = exports.getUsers = exports.getGalleryById = exports.setGalleries = exports.getGalleries = exports.getVideoById = exports.setVideos = exports.getVideos = exports.getModelById = exports.setModels = exports.getModels = void 0;
exports.initializeLocalStorage = initializeLocalStorage;
exports.clearLocalStorage = clearLocalStorage;
const seed_data_1 = require("./seed-data");
const isBrowser = typeof window !== 'undefined';
function getItem(key, defaultValue) {
    if (!isBrowser)
        return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }
    catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
}
function setItem(key, value) {
    if (!isBrowser)
        return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
}
// Ensure initial data is seeded
function initializeLocalStorage() {
    if (!isBrowser)
        return;
    const isSeeded = getItem('db_seeded', false);
    if (!isSeeded) {
        console.log("Seeding local storage with initial data...");
        setItem('models', seed_data_1.seedData.models);
        setItem('videos', seed_data_1.seedData.videos);
        setItem('galleries', seed_data_1.seedData.galleries);
        setItem('users', seed_data_1.seedData.users);
        setItem('tags', seed_data_1.seedData.tags);
        setItem('db_seeded', true);
    }
}
// Data Access Functions
const getModels = () => getItem('models', seed_data_1.seedData.models);
exports.getModels = getModels;
const setModels = (data) => setItem('models', data);
exports.setModels = setModels;
const getModelById = (id) => (0, exports.getModels)().find(m => m.id === id);
exports.getModelById = getModelById;
const getVideos = () => getItem('videos', seed_data_1.seedData.videos);
exports.getVideos = getVideos;
const setVideos = (data) => setItem('videos', data);
exports.setVideos = setVideos;
const getVideoById = (id) => (0, exports.getVideos)().find(v => v.id === id);
exports.getVideoById = getVideoById;
const getGalleries = () => getItem('galleries', seed_data_1.seedData.galleries);
exports.getGalleries = getGalleries;
const setGalleries = (data) => setItem('galleries', data);
exports.setGalleries = setGalleries;
const getGalleryById = (id) => (0, exports.getGalleries)().find(g => g.id === id);
exports.getGalleryById = getGalleryById;
const getUsers = () => getItem('users', seed_data_1.seedData.users);
exports.getUsers = getUsers;
const setUsers = (users) => setItem('users', users);
exports.setUsers = setUsers;
const getUserById = (id) => (0, exports.getUsers)().find(u => u.id === id);
exports.getUserById = getUserById;
const getUserByEmail = (email) => (0, exports.getUsers)().find(u => u.email === email);
exports.getUserByEmail = getUserByEmail;
const getTags = () => getItem('tags', {});
exports.getTags = getTags;
const setTags = (data) => setItem('tags', data);
exports.setTags = setTags;
function clearLocalStorage() {
    if (!isBrowser)
        return;
    setItem('models', []);
    setItem('videos', []);
    setItem('galleries', []);
    setItem('users', []);
    setItem('tags', {});
    setItem('db_seeded', false);
}
const getFavorites = () => getItem('luxury_favorites', []);
exports.getFavorites = getFavorites;
const addToFavorites = (item) => {
    if (!isBrowser)
        return false;
    const favorites = (0, exports.getFavorites)();
    const existingIndex = favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);
    if (existingIndex === -1) {
        const favoriteItem = {
            id: item.id,
            type: item.type,
            title: item.title || item.name || 'Untitled',
            image: item.image,
            addedAt: new Date().toISOString(),
            category: item.category,
            tags: item.keywords || []
        };
        const updatedFavorites = [favoriteItem, ...favorites].slice(0, 1000); // Limit to 1000 items
        setItem('luxury_favorites', updatedFavorites);
        // Save favorites summary for quick access
        const summary = updatedFavorites.map(f => ({ id: f.id, type: f.type }));
        setItem('luxury_favorites_summary', summary);
        return true;
    }
    return false;
};
exports.addToFavorites = addToFavorites;
const removeFromFavorites = (contentId, type) => {
    if (!isBrowser)
        return false;
    const favorites = (0, exports.getFavorites)();
    const updatedFavorites = favorites.filter(fav => !(fav.id === contentId && (!type || fav.type === type)));
    if (updatedFavorites.length !== favorites.length) {
        setItem('luxury_favorites', updatedFavorites);
        const summary = updatedFavorites.map(f => ({ id: f.id, type: f.type }));
        setItem('luxury_favorites_summary', summary);
        return true;
    }
    return false;
};
exports.removeFromFavorites = removeFromFavorites;
const isFavorite = (contentId, type) => {
    if (!isBrowser)
        return false;
    const summary = getItem('luxury_favorites_summary', null);
    if (summary) {
        return summary.some((fav) => fav.id === contentId && (!type || fav.type === type));
    }
    const favorites = (0, exports.getFavorites)();
    return favorites.some(fav => fav.id === contentId && (!type || fav.type === type));
};
exports.isFavorite = isFavorite;
const getFavoritesByType = (type) => {
    return (0, exports.getFavorites)().filter(fav => fav.type === type);
};
exports.getFavoritesByType = getFavoritesByType;
const getFavoritesCount = () => {
    if (!isBrowser)
        return 0;
    const summary = getItem('luxury_favorites_summary', null);
    if (summary) {
        return summary.length;
    }
    return (0, exports.getFavorites)().length;
};
exports.getFavoritesCount = getFavoritesCount;
const clearFavorites = () => {
    if (!isBrowser)
        return;
    setItem('luxury_favorites', []);
    setItem('luxury_favorites_summary', []);
};
exports.clearFavorites = clearFavorites;
// CRUD Functions for Galleries
const addGallery = (gallery) => {
    const galleries = (0, exports.getGalleries)();
    const updatedGalleries = [...galleries, Object.assign(Object.assign({}, gallery), { id: gallery.id || Date.now().toString() })];
    (0, exports.setGalleries)(updatedGalleries);
};
exports.addGallery = addGallery;
const updateGallery = (id, updates) => {
    const galleries = (0, exports.getGalleries)();
    const updatedGalleries = galleries.map(gallery => gallery.id === id ? Object.assign(Object.assign({}, gallery), updates) : gallery);
    (0, exports.setGalleries)(updatedGalleries);
};
exports.updateGallery = updateGallery;
const deleteGallery = (id) => {
    const galleries = (0, exports.getGalleries)();
    const updatedGalleries = galleries.filter(gallery => gallery.id !== id);
    (0, exports.setGalleries)(updatedGalleries);
};
exports.deleteGallery = deleteGallery;
// CRUD Functions for Videos
const addVideo = (video) => {
    const videos = (0, exports.getVideos)();
    const updatedVideos = [...videos, Object.assign(Object.assign({}, video), { id: video.id || Date.now().toString() })];
    (0, exports.setVideos)(updatedVideos);
};
exports.addVideo = addVideo;
const updateVideo = (id, updates) => {
    const videos = (0, exports.getVideos)();
    const updatedVideos = videos.map(video => video.id === id ? Object.assign(Object.assign({}, video), updates) : video);
    (0, exports.setVideos)(updatedVideos);
};
exports.updateVideo = updateVideo;
const deleteVideo = (id) => {
    const videos = (0, exports.getVideos)();
    const updatedVideos = videos.filter(video => video.id !== id);
    (0, exports.setVideos)(updatedVideos);
};
exports.deleteVideo = deleteVideo;
// CRUD Functions for Models
const addModel = (model) => {
    const models = (0, exports.getModels)();
    const updatedModels = [...models, Object.assign(Object.assign({}, model), { id: model.id || Date.now().toString() })];
    (0, exports.setModels)(updatedModels);
};
exports.addModel = addModel;
const updateModel = (id, updates) => {
    const models = (0, exports.getModels)();
    const updatedModels = models.map(model => model.id === id ? Object.assign(Object.assign({}, model), updates) : model);
    (0, exports.setModels)(updatedModels);
};
exports.updateModel = updateModel;
const deleteModel = (id) => {
    const models = (0, exports.getModels)();
    const updatedModels = models.filter(model => model.id !== id);
    (0, exports.setModels)(updatedModels);
};
exports.deleteModel = deleteModel;
// Legacy function for backward compatibility
const getFavoritesLegacy = () => {
    const favorites = (0, exports.getFavorites)();
    return favorites.map(fav => fav.id);
};
exports.getFavoritesLegacy = getFavoritesLegacy;
// CRUD Functions with proper return types for testing
const createVideo = (videoData) => {
    const newVideo = Object.assign(Object.assign({}, videoData), { id: Date.now().toString() });
    (0, exports.addVideo)(newVideo);
    return newVideo;
};
exports.createVideo = createVideo;
const createGallery = (galleryData) => {
    const newGallery = Object.assign(Object.assign({}, galleryData), { id: Date.now().toString() });
    (0, exports.addGallery)(newGallery);
    return newGallery;
};
exports.createGallery = createGallery;
const createModel = (modelData) => {
    const newModel = Object.assign(Object.assign({}, modelData), { id: Date.now().toString() });
    (0, exports.addModel)(newModel);
    return newModel;
};
exports.createModel = createModel;
const updateVideoFunc = (id, updates) => {
    const videos = (0, exports.getVideos)();
    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex === -1)
        return null;
    const updatedVideo = Object.assign(Object.assign({}, videos[videoIndex]), updates);
    videos[videoIndex] = updatedVideo;
    (0, exports.setVideos)(videos);
    return updatedVideo;
};
exports.updateVideoFunc = updateVideoFunc;
const updateGalleryFunc = (id, updates) => {
    const galleries = (0, exports.getGalleries)();
    const galleryIndex = galleries.findIndex(g => g.id === id);
    if (galleryIndex === -1)
        return null;
    const updatedGallery = Object.assign(Object.assign({}, galleries[galleryIndex]), updates);
    galleries[galleryIndex] = updatedGallery;
    (0, exports.setGalleries)(galleries);
    return updatedGallery;
};
exports.updateGalleryFunc = updateGalleryFunc;
const updateModelFunc = (id, updates) => {
    const models = (0, exports.getModels)();
    const modelIndex = models.findIndex(m => m.id === id);
    if (modelIndex === -1)
        return null;
    const updatedModel = Object.assign(Object.assign({}, models[modelIndex]), updates);
    models[modelIndex] = updatedModel;
    (0, exports.setModels)(models);
    return updatedModel;
};
exports.updateModelFunc = updateModelFunc;
const deleteVideoFunc = (id) => {
    const videos = (0, exports.getVideos)();
    const filteredVideos = videos.filter(v => v.id !== id);
    if (filteredVideos.length === videos.length)
        return false;
    (0, exports.setVideos)(filteredVideos);
    return true;
};
exports.deleteVideoFunc = deleteVideoFunc;
const deleteGalleryFunc = (id) => {
    const galleries = (0, exports.getGalleries)();
    const filteredGalleries = galleries.filter(g => g.id !== id);
    if (filteredGalleries.length === galleries.length)
        return false;
    (0, exports.setGalleries)(filteredGalleries);
    return true;
};
exports.deleteGalleryFunc = deleteGalleryFunc;
const deleteModelFunc = (id) => {
    const models = (0, exports.getModels)();
    const filteredModels = models.filter(m => m.id !== id);
    if (filteredModels.length === models.length)
        return false;
    (0, exports.setModels)(filteredModels);
    return true;
};
exports.deleteModelFunc = deleteModelFunc;
// Initialize on first load
initializeLocalStorage();
