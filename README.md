# ReImagine AI 🏠

ReImagine AI is an AI-first interior design and space reimagining platform. By pairing advanced artificial intelligence pipelines with a fluid, hardware-accelerated user interface, ReImagine AI allows users to transform, visualize, and optimize residential and enterprise spaces seamlessly.

---

## 🚀 Features

* **AI-First Spatial Reimagining:** Deep integration with AI pipelines to process user uploads and generate high-fidelity spatial transformations.
* **Hardware-Accelerated UI Motion:** Core interfaces built using the GreenSock Animation Platform (GSAP) engine to stagger element nodes on mount hooks and execute high-performance spring physics transformations.
* **Modern Routing Architectures:** Multi-page structural directory paths (`/pricing`, `/community`, `/enterprise`) driven via React Router 7 layouts without flashing hard-refresh white screens.
* **Robust Worker & API Pipeline Routing:** Pulls system-level path keys from secure local environments to safely forward user payloads outward into verified automated inbox forwarding engines.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 (TypeScript)
* **Build Tool & Bundler:** Vite
* **Routing & Layouts:** React Router 7
* **Animation Engine:** GSAP (GreenSock Animation Platform)
* **Styles & UI Components:** Tailwind CSS, Radix UI Primitives
* **Serverless/Cloud Integration:** Puter Worker API (`puter.action.ts`, `puter.worker.js`, `puter.hosting.ts`)

---

## 📁 Repository Structure

```text
├── components/          # Reusable UI primitives (Navbar, Upload, Toast, etc.)
├── lib/                 # Core engine architecture
│   ├── ai.action.ts     # Internal AI pipeline handlers
│   ├── puter.action.ts  # Puter cloud execution layers
│   ├── puter.worker.js  # Edge compute and background worker processing
│   └── utils.ts         # Global layout and style helpers
├── public/              # Core static assets & vector graphics
├── app.css              # Global design tokens and tailwind base
├── routes.ts            # Declaration map for React Router 7 layouts
└── vite.config.ts       # Optimized bundler configuration
```

## ⚙️ Getting Started

### Prerequisites
Ensure you have Node.js (v18 or higher) and npm installed.

### Installation

1.Clone the repository to your local environment:
```

   git clone https://github.com/visheshsriv23/Reimagine-AI.git
   cd reimagine-ai
```
   
2. Install dependencies:

```

   npm install
```

3. Configure your environment variables. Create a .env.local file in the root directory and add your required system keys:

```

   VITE_PUTER_API_KEY=your_key_here
```

### 💻 Running Locally
* To launch the local Vite development server (typically hosted at localhost:5173):

```

npm run dev
```
* To build the application for optimal production deployment:

```

npm run build
```
