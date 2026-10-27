import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Pre-curated representative samples for 1-click museum demo
const CURATED_SAMPLES = [
  {
    id: "sample-1",
    title: "Emperor Akbar in Royal Audience",
    filename: "akbar.jpg",
    trueSchool: "Mughal",
    expectedVerdict: "Mughal",
    period: "Akbar Period (c. 1556-1605)",
    genre: "Court Chronicle / Akbarnama",
    description: "Classic imperial Akbarnama depiction showing naturalistic drapery, court hierarchy, and delicate stippled portraiture.",
    goldRich: true
  },
  {
    id: "sample-2",
    title: "Portrait of Emperor Shah Jahan",
    filename: "shah_jahan_c_1630.jpg",
    trueSchool: "Mughal",
    expectedVerdict: "Mughal",
    period: "Shah Jahan Period (c. 1628-1658)",
    genre: "Imperial Formal Portrait",
    description: "High imperial dignity, halo illumination, powdered gold leaf embellishment, and exquisite jewelry rendering.",
    goldRich: true
  },
  {
    id: "sample-3",
    title: "Tuti-Nama: Forest Encounter",
    filename: "a_woman_with_two_children_having_abandoned_her_home_goes_into_the_forest_where_she_encounters_a_leopard_from_a_tuti-nama_c_1560.jpg",
    trueSchool: "Mughal",
    expectedVerdict: "Mughal",
    period: "Akbar Period (c. 1556-1605)",
    genre: "Narrative Illustration / Tuti-Nama",
    description: "Early Mughal synthesis showing Persian landscape crags fused with vibrant Indian storytelling.",
    goldRich: false
  },
  {
    id: "sample-4",
    title: "Kakubha Ragini (Musical Mode)",
    filename: "kakubha_ragini_c_1610.jpg",
    trueSchool: "Rajasthani",
    expectedVerdict: "Rajasthani",
    period: "Early 17th Century",
    genre: "Ragamala (Musical Series)",
    description: "Distinctive Ragamala iconography with maiden holding garlands for peacocks, intense emotional saturation, and stylized lotus eyes.",
    goldRich: false
  },
  {
    id: "sample-5",
    title: "Saindhavi Ragini of Sri Raga Family",
    filename: "saindhavi_ragini_of_the_sri_raga_family_page_from_a_ragamala_series_16001610.jpg",
    trueSchool: "Rajasthani",
    expectedVerdict: "Rajasthani",
    period: "c. 1600-1610",
    genre: "Ragamala (Sri Raga Family)",
    description: "Bold lacquer mineral red background, strong architectural registers, and stylized profile portraiture.",
    goldRich: false
  },
  {
    id: "sample-6",
    title: "Portrait of Emperor Jahangir",
    filename: "jahangir.jpg",
    trueSchool: "Mughal",
    expectedVerdict: "Mughal",
    period: "Jahangir Period (c. 1605-1627)",
    genre: "Imperial Naturalist Portrait",
    description: "Quiet contemplative realism, pale background, and psychological depth championed during Jahangir's reign.",
    goldRich: true
  }
];

// GET /api/samples
router.get('/', (req, res) => {
  const btpImagesDir = path.resolve(__dirname, '../../BTP/data/raw/images');

  // Verify file existence and append preview URL
  const availableSamples = CURATED_SAMPLES.map(sample => {
    const filePath = path.join(btpImagesDir, sample.filename);
    const exists = fs.existsSync(filePath);
    return {
      ...sample,
      exists,
      imageUrl: `/samples/${sample.filename}`
    };
  });

  res.json({
    success: true,
    samples: availableSamples
  });
});

export default router;
