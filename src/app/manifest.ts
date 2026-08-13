import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZENTRYO - Industrial Engineering & Automation Solutions',
    short_name: 'ZENTRYO',
    description: 'Premier global supplier of industrial engineering components, automation systems, and OEM parts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a1f42',
    icons: [
      { src: '/images/favicon-icon.png', sizes: '32x32', type: 'image/png' },
      { src: '/images/favicon-icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/favicon-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}