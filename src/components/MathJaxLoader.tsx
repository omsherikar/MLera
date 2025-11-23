"use client";

import { useEffect } from "react";

export default function MathJaxLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if MathJax is already loaded
    if (window.MathJax) {
      const event = new Event('mathjax-loaded');
      window.dispatchEvent(event);
      return;
    }

    // Check if script is already being loaded
    if (document.getElementById('mathjax-config') || document.getElementById('mathjax-script')) {
      return;
    }

    const configScript = document.createElement("script");
    configScript.type = "text/x-mathjax-config";
    configScript.id = "mathjax-config";
    configScript.text = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
          displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
          processEscapes: true,
          processEnvironments: true
        },
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
        },
        startup: {
          ready: () => {
            MathJax.startup.defaultReady();
            MathJax.startup.promise.then(() => {
              console.log('MathJax is ready');
              const event = new Event('mathjax-loaded');
              window.dispatchEvent(event);
            });
          }
        }
      };
    `;
    document.head.appendChild(configScript);

    const mathJaxScript = document.createElement("script");
    mathJaxScript.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    mathJaxScript.async = true;
    mathJaxScript.id = "mathjax-script";
    mathJaxScript.onload = () => {
      console.log('MathJax script loaded');
    };
    document.head.appendChild(mathJaxScript);

    return () => {
      // Don't remove scripts on cleanup to avoid reloading
    };
  }, []);

  return null;
}

