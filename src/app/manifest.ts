import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Accenture Quantum Algorithm Library",
    short_name: "Quantum Library",
    description:
      "Biblioteca interativa para explorar, comparar e entender algoritmos quânticos.",
    start_url: "/pt",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#a100ff",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/brand/accenture_acento.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand/accenture_acento.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}