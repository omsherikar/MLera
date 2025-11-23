# MLera - Machine Learning Learning Platform

A modern, interactive learning platform for machine learning concepts built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Dark/Light Theme Toggle** - Smooth theme switching with localStorage persistence
- 📚 **Interactive Content Modules** - 7 comprehensive modules on Linear Regression
- 📊 **Data Visualizations** - Interactive graphs using Recharts
- 🔢 **Math Equation Rendering** - Beautiful math equations with MathJax
- ✨ **Smooth Animations** - Scroll-triggered animations with Framer Motion
- 🎯 **Responsive Design** - Works seamlessly on all device sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Math Rendering**: MathJax 3
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main content page
├── components/
│   ├── Navbar.tsx           # Top navigation bar
│   ├── Breadcrumb.tsx       # Breadcrumb navigation
│   ├── ContentHeader.tsx    # Page header with progress
│   ├── SectionCard.tsx      # Reusable content card
│   ├── MathBox.tsx          # Math equation renderer
│   ├── GraphCard.tsx        # Chart visualization component
│   └── MathJaxLoader.tsx    # MathJax script loader
├── contexts/
│   └── ThemeContext.tsx     # Theme management context
└── tailwind.config.ts       # Tailwind configuration
```

## Design System

### Colors

**Dark Theme:**
- Background: `#16002C` → `#30004A`
- Card: `#2B0B4B`
- Text: `#E9C3FF`

**Light Theme:**
- Background: `#E8FFEF` (Pale Mint)
- Card: `#FFFFFF`
- Text: `#4A3566`

**Accent Gradient:**
- Pink: `#FF8FB0` → Purple: `#A66BFF`

### Typography

- **Headings**: Poppins / Montserrat (Bold)
- **Body**: Inter (Regular)

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

