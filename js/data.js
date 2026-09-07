// Edit this file to update your site — no HTML changes needed.
// Every field mirrors the original JSON structure.

var SITE_DATA = {
  "meta": {
    "name": "Gabriele Rosi",
    "tagline": "PhD Candidate, Politecnico di Torino & FocoosAI",
    // the header date is auto-generated at runtime in the user's locale/timezone
    "topline": {
      "location": "Politecnico di Torino · Turin, Italy"
    },
    // optional closing line under the columns (only rendered when non-empty)
    "foot": ""
  },
  // Controls column order (array order) and relative width ("width", in fr units; default 1)
  // "section" must be one of: "news", "publications", "about"
  "columns": [
    { "section": "about",        "heading": "About me",     "width": 1 },
    { "section": "news",         "heading": "Latest news",  "width": 1 },
    { "section": "publications", "heading": "Publications", "width": 1 }
  ],
  "bio": "I am a PhD candidate in the Italian National PhD Program in Artificial Intelligence at Politecnico di Torino, in the <a href=\"https://vandal.polito.it/\">VANDAL lab</a>, in collaboration with the startup <a href=\"https://www.focoos.ai/\">FocoosAI</a>, supervised by Prof. Giuseppe Averta, Prof. Carlo Masone and Dr. Fabio Cermelli. I am part of the ELLIS PhD Program. My research focuses on visual understanding: image segmentation, efficient deep learning, and adapting models to new visual concepts with limited supervision. Since April 2026 I am visiting the <a href=\"https://fundamentalailab.github.io/\">Fundamental AI Lab (FunAI Lab)</a> at the University of Technology Nuremberg (UTN), working with Prof. Yuki M. Asano on spatial understanding in streaming videos. Before starting my PhD, I earned an MSc in Data Science & Engineering from Politecnico di Torino and a BSc in Computer Engineering from the University of Pisa.",
  "portrait": "images/profile_image.png",
  // "icon" must be one of: "scholar", "github", "linkedin"
  "contact": [
    { "icon": "scholar",  "url": "https://scholar.google.com/citations?user=8AfX1GcAAAAJ", "text": "Google Scholar" },
    { "icon": "github",   "url": "https://github.com/Gabrysse", "text": "GitHub" },
    { "icon": "linkedin", "url": "https://linkedin.com/in/gabrielerosi", "text": "LinkedIn" }
  ],
  "news": [
    {
      "date": "April 2026",
      "type": "Update",
      "body": "Started my visiting at the University of Technology Nuremberg (UTN) under the supervision of Prof. Yuki Asano."
    },
    {
      "date": "March 2026",
      "type": "Attended",
      "body": "Attended the FOMO 2026 Winter School."
    },
    {
      "date": "March 2026",
      "type": "Conference",
      "body": "<em>“PrAda: Few-Shot Visual Adaptation for Text-Prompted Segmentation”</em> accepted to CVPR 2026 (Findings)."
    },
    {
      "date": "July 2025",
      "type": "Attended",
      "body": "Attended the ICVSS 2025 Summer School."
    },
    {
      "date": "March 2025",
      "type": "Conference",
      "body": "<em>“SAMWISE: Infusing Wisdom in SAM2 for Text-Driven Video Segmentation”</em> and <em>“Show or Tell? A Benchmark to Evaluate Visual and Textual Prompts in Semantic Segmentation”</em> accepted to CVPR 2025 (main conference and Workshops)."
    },
    {
      "date": "March 2024",
      "type": "Conference",
      "body": "<em>“PEM: Prototype-based Efficient MaskFormer for Image Segmentation”</em>, <em>“The Revenge of BiSeNet: Efficient Multi-Task Image Segmentation”</em> and <em>“What Does CLIP Know About Peeling a Banana?”</em> accepted to CVPR 2024 (main and workshops)."
    },
    {
      "date": "November 2023",
      "type": "Update",
      "body": "Started the PhD at Politecnico di Torino and FocoosAI, supervised by Prof. Giuseppe Averta, Prof. Carlo Masone and Fabio Cermelli."
    }
  ],
  "publications": [
    {
      "title": "PrAda: Few-Shot Visual Adaptation for Text-Prompted Segmentation",
      "authors": "<u>G. Rosi</u>, F. Cermelli, C. Masone, B. Caputo",
      "venue": "CVPR 2026 · Findings",
      "links": [
        { "url": "https://arxiv.org/abs/2605.19623", "text": "Paper", "icon": "paper" },
        { "url": "https://github.com/FocoosAI/PrAda", "text": "Code", "icon": "code" }
      ]
    },
    {
      "title": "Show or Tell? A Benchmark to Evaluate Visual and Textual Prompts in Semantic Segmentation",
      "authors": "<u>G. Rosi</u>, F. Cermelli",
      "venue": "CVPR 2025 · Workshops",
      "links": [
        { "url": "https://arxiv.org/abs/2505.06280", "text": "Paper", "icon": "paper" },
        { "url": "https://github.com/FocoosAI/ShowOrTell", "text": "Code", "icon": "code" }
      ]
    },
    {
      "title": "SAMWISE: Infusing Wisdom in SAM2 for Text-Driven Video Segmentation",
      "authors": "C. Cuttano, G. Trivigno, <u>G. Rosi</u>, C. Masone, G. Averta",
      "venue": "CVPR 2025",
      "links": [
        { "url": "https://arxiv.org/abs/2411.17646", "text": "Paper", "icon": "paper" },
        { "url": "https://claudiacuttano.github.io/SAMWISE/", "text": "Code", "icon": "code" }
      ]
    },
    {
      "title": "PEM: Prototype-based Efficient MaskFormer for Image Segmentation",
      "authors": "N. Cavagnero*, <u>G. Rosi</u>*, C. Cuttano, et al.",
      "venue": "CVPR 2024",
      "links": [
        { "url": "https://arxiv.org/abs/2402.19422", "text": "Paper", "icon": "paper" },
        { "url": "https://niccolocavagnero.github.io/PEM/", "text": "Code", "icon": "code" }
      ]
    },
    {
      "title": "The Revenge of BiSeNet: Efficient Multi-Task Image Segmentation",
      "authors": "<u>G. Rosi</u>, C. Cuttano, N. Cavagnero, G. Averta, F. Cermelli",
      "venue": "CVPR 2024 · Workshops",
      "links": [
        { "url": "https://arxiv.org/abs/2404.09570", "text": "Paper", "icon": "paper" },
        { "url": "https://focoosai.github.io/focoos/models/bisenetformer/", "text": "Code", "icon": "code" }
      ]
    },
    {
      "title": "What Does CLIP Know About Peeling a Banana?",
      "authors": "C. Cuttano, <u>G. Rosi</u>, G. Trivigno, G. Averta",
      "venue": "CVPR 2024 · Workshops",
      "links": [
        { "url": "https://arxiv.org/abs/2404.12015", "text": "Paper", "icon": "paper" }
      ]
    }
  ]
};
