"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    katex?: any;
    renderMathInElement?: any;
  }
}

export default function KaTeXLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already loaded
    if (window.katex && window.renderMathInElement) {
      window.dispatchEvent(new Event('katex-loaded'));
      return;
    }

    // Load KaTeX CSS
    if (!document.getElementById('katex-css')) {
      const katexCSS = document.createElement("link");
      katexCSS.rel = "stylesheet";
      katexCSS.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
      katexCSS.id = "katex-css";
      katexCSS.integrity = "sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV";
      katexCSS.crossOrigin = "anonymous";
      document.head.appendChild(katexCSS);
    }

    // Load KaTeX JavaScript
    if (!document.getElementById('katex-script')) {
      const katexScript = document.createElement("script");
      katexScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
      katexScript.id = "katex-script";
      katexScript.integrity = "sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8";
      katexScript.crossOrigin = "anonymous";
      katexScript.onload = () => {
        console.log('KaTeX script loaded');
        
        // Load auto-render extension
        const autoRenderScript = document.createElement("script");
        autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js";
        autoRenderScript.id = "katex-auto-render";
        autoRenderScript.integrity = "sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05";
        autoRenderScript.crossOrigin = "anonymous";
        autoRenderScript.onload = () => {
          console.log('KaTeX auto-render loaded');
          window.dispatchEvent(new Event('katex-loaded'));
        };
        document.head.appendChild(autoRenderScript);
      };
      document.head.appendChild(katexScript);
    }

    return () => {
      // Don't remove on cleanup to avoid flickering
    };
  }, []);

  return null;
}

