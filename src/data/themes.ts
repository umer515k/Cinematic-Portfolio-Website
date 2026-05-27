export interface Theme {
  id: string;
  name: string;
  background: string;
  foreground: string;
  accent: string;
  gradient: string;
}

export const themes: Theme[] = [
  {
    id: "candlelight",
    name: "Candlelight",
    background: "#0D0B08",
    foreground: "#E8E0D0",
    accent: "#63583e",
    gradient: "radial-gradient(circle at center, #1a1208 0%, #0d0b08 100%)",
  },
  {
    id: "novigrad",
    name: "Novigrad",
    background: "#0C0A06",
    foreground: "#D4C5A0",
    accent: "#8B1A1A",
    gradient: "radial-gradient(circle at center, #1a0a06 0%, #0c0a06 100%)",
  },
  {
    id: "skellige",
    name: "Skellige",
    background: "#060C12",
    foreground: "#C8D8E4",
    accent: "#052940",
    gradient: "radial-gradient(circle at center, #081420 0%, #060c12 100%)",
  },
  {
    id: "frontier",
    name: "Frontier",
    background: "#0A0806",
    foreground: "#D8C8A8",
    accent: "#7A4A1A",
    gradient: "radial-gradient(circle at center, #1a1008 0%, #0a0806 100%)",
  },
  {
    id: "neonnoir",
    name: "Neon Noir",
    background: "#05050A",
    foreground: "#E0D8F0",
    accent: "#FF2D6B",
    gradient: "radial-gradient(circle at center, #0d0514 0%, #05050a 100%)",
  },
  {
    id: "tyrell",
    name: "Tyrell",
    background: "#080608",
    foreground: "#F0E8D0",
    accent: "#C8A020",
    gradient: "radial-gradient(circle at center, #140e04 0%, #080608 100%)",
  },
  {
    id: "hal",
    name: "HAL",
    background: "#000008",
    foreground: "#D0E8FF",
    accent: "#FF3020",
    gradient: "radial-gradient(circle at center, #000014 0%, #000008 100%)",
  },
  {
    id: "chromatic",
    name: "Chromatic",
    background: "#04080C",
    foreground: "#C8E0F0",
    accent: "#00F0C0",
    gradient: "radial-gradient(circle at center, #041420 0%, #04080c 100%)",
  },
  {
    id: "slate",
    name: "Slate",
    background: "#080B0D",
    foreground: "#C8D8E8",
    accent: "#A8C8E8",
    gradient: "radial-gradient(circle at center, #08121a 0%, #080b0d 100%)",
  },
  {
    id: "ivory",
    name: "Ivory",
    background: "#F2EDE4",
    foreground: "#1A1814",
    accent: "#8B4513",
    gradient: "radial-gradient(circle at center, #ede4d4 0%, #f2ede4 100%)",
  },
];

export const DEFAULT_THEME = themes[0];
