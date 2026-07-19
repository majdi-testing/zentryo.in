import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZENTRYO - Industrial Engineering & Automation Solutions',
    short_name: 'ZENTRYO',
    description: 'Premier global supplier of industrial engineering components, automation systems, and OEM parts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a142b',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
