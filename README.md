<div align="center">

# 📅 Aesthetic Liquid Glass Calendar

<p align="center">
  A highly polished, production-ready React Calendar built with a <b>"Liquid Glass"</b> (glassmorphism) design aesthetic. 
  <br />
  It mimics a premium physical wall calendar, pairing monthly curated photography with advanced interactions and a sleek minimalist user interface.
</p>

<br />

<p align="center">
  <a href="https://calender.abhishekverma.me/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Preview-Click_Here-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

</div>

<br />
<br />

## ✨ Core Features

<br />

🔸 **🌊 Liquid Glassmorphism**  
> Utilizes complex `backdrop-blur` and dynamic blob lighting to create a deeply immersive animated background.

<br />

🔸 **🖼️ Monthly Dynamic Imagery**  
> Automatically cycles through gorgeous, curated Unsplash imagery that accurately denotes the season/weather of each given month.

<br />

🔸 **🎞️ Advanced Animations**  
> Liquid-like month transitions with 3D perspective swinging, powered by **Framer Motion** and **GSAP**.

<br />

🔸 **📝 Integrated Notes Modal**  
> Replacing clunky sidebars, clicking a date or the "Write Note" button summons a premium frosted-glass modal to save daily notes.

<br />

🔸 **📅 Smart Range Selection**  
> Interactive calendar grid that supports both single-day highlighting and date-range selection with glowing path indicators.

<br />

🔸 **📱 Fully Responsive**  
> Built to scale beautifully from ultra-wide desktops down to mobile screens.

<br />
<hr />
<br />

## 🛠️ Tech Stack

This project leverages modern frontend architecture:

*   **Framework:** React 19 (via Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v4)
*   **Animations:** Framer Motion & GSAP
*   **Date Parsing:** `date-fns`
*   **Icons:** Native SVG Integration

<br />
<hr />
<br />

## 🚀 Getting Started

Follow these steps to get a local development server running on your machine:

<br />

**1. Clone the repository**
```bash
git clone https://github.com/abbu1809/Calendar-tuf.git
cd Calendar-tuf
```

<br />

**2. Install dependencies**
```bash
npm install
```

<br />

**3. Start the development server**
```bash
npm run dev
```

Visit `http://localhost:5173/` (or the port specified in your terminal) to view the application in action.

<br />
<hr />
<br />

## 📁 Project Structure

The project has been heavily modularized for production environments:

```text
src/
├── components/          # Top level UI components
│   ├── Calendar.tsx     # The main orchestrator component
│   └── calendar/        # Modular calendar segments
│       ├── CalendarGrid.tsx # The interactive dates grid
│       ├── HeroGallery.tsx  # The left-side image presentation
│       └── NoteModal.tsx    # The glassmorphism notes popup
├── types/               # Global TypeScript definitions
├── utils/
│   ├── cn.ts            # Tailwind class merging utility
│   └── monthImages.ts   # Configuration for monthly weather imagery
├── App.tsx              # Application Root & animated background
└── index.css            # Base Tailwind imports & CSS reset
```

<br />
<hr />
<br />

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a Pull Request.

<br />

## 📜 License & Accreditation

This project is free to use. Crafted with care by [Abhishek Verma](https://linkedin.com/in/abhishekverma1809).