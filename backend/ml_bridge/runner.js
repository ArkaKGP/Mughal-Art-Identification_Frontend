
import { Client } from "@gradio/client";
import fs from "fs";

const SPACE_ID = "ArkaKGP/mughal-art-classifier";

/**
 * Sends the uploaded painting to your cloud Hugging Face Space
 * and receives the calibrated prediction & art-historical analysis.
 *
 * @param {string} imagePath - Absolute path to the locally uploaded image.
 * @returns {Promise<object>} - Structured prediction JSON from Hugging Face.
 */
export async function runInference(imagePath) {
  try {
    console.log(`[Hugging Face Cloud] Connecting to Space: ${SPACE_ID}...`);
    const client = await Client.connect(SPACE_ID);

    // Read the uploaded file into a Blob
    const fileBuffer = fs.readFileSync(imagePath);
    const imageBlob = new Blob([fileBuffer]);

    console.log(`[Hugging Face Cloud] Running GPU inference for image...`);
    const result = await client.predict("/predict", {
      pil_img: imageBlob
    });

    console.log(`[Hugging Face Cloud] Inference complete! Received result.`);
    // result.data[0] contains your exact prediction JSON from app.py
    return result.data[0];
  } catch (err) {
    console.error("[Hugging Face API Error]:", err.message);
    throw new Error(`Cloud model prediction failed: ${err.message}`);
  }
}
