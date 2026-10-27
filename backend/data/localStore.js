import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = __dirname;
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure files exist
function initStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([]), 'utf-8');
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([]), 'utf-8');
  }
}

initStore();

export function getHistory(limit = 20) {
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    const items = JSON.parse(raw);
    return items.slice(-limit).reverse();
  } catch (err) {
    console.error('Error reading history:', err);
    return [];
  }
}

export function saveHistoryItem(item) {
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    const items = JSON.parse(raw);
    const entry = {
      id: item.id || `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...item
    };
    items.push(entry);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return entry;
  } catch (err) {
    console.error('Error saving history item:', err);
    return item;
  }
}

export function getFeedbackList() {
  try {
    const raw = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading feedback:', err);
    return [];
  }
}

export function saveFeedbackItem(feedback) {
  try {
    const raw = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
    const items = JSON.parse(raw);
    const entry = {
      id: `fb_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...feedback
    };
    items.push(entry);
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return entry;
  } catch (err) {
    console.error('Error saving feedback item:', err);
    return feedback;
  }
}
