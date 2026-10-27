/**
 * API Service for Mughal Art Authentication Portal
 */

// If VITE_API_URL is configured (e.g. on Vercel), use it. Otherwise default to relative path (local Vite proxy or vercel.json rewrites)
const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';

export async function uploadAndAnalyzeImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || 'Failed to analyze painting image');
  }

  return response.json();
}

export async function analyzeSamplePainting(sampleFilename) {
  const response = await fetch(`${API_BASE}/api/predict-sample`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sampleFilename }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze sample painting');
  }

  return response.json();
}

export async function fetchSamplePaintings() {
  const response = await fetch(`${API_BASE}/api/samples`);
  if (!response.ok) {
    throw new Error('Failed to fetch sample paintings');
  }
  return response.json();
}

export async function submitExpertFeedback(feedbackData) {
  const response = await fetch(`${API_BASE}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit feedback');
  }

  return response.json();
}

export async function fetchAnalysisHistory() {
  const response = await fetch(`${API_BASE}/api/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
}

export async function fetchPipelineStats() {
  const response = await fetch(`${API_BASE}/api/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch pipeline stats');
  }
  return response.json();
}
