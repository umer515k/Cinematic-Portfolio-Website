# umer khalil — portfolio

> A cinematic, experimental portfolio built in Next.js 14. Not a resume website. An experience.

[![Live Site](https://img.shields.io/badge/live-umerkhalil.dev-C8963E?style=flat-square&logoColor=white)](https://umerkhalil.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-black?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## The Concept

Most portfolios are documents. This one is a place.

The site is built around a single idea — that I exist in two worlds simultaneously. I can architect and ship production software. I can also build and run the business systems that make companies operate. Rather than flattening that into a one-line bio, the site makes it the central experience.

Every visual decision was pulled from a specific set of references: the candlelight cinematography of **Barry Lyndon**, the cold cosmic weight of **2001: A Space Odyssey**, the twilight melancholy of **Red Dead Redemption 2**, the atmospheric dread of **The Witcher**, and the surface-warmth-hiding-something-strange duality of **Twin Peaks**. The result is a site that feels handcrafted, atmospheric, and genuinely unlike anything else.

---

## The Experience

**The Path Choice**

On arrival the hero loads — a slow Kubrick zoom on a textured background, film grain overlay, name entrance with a letter-scramble animation. After a beat, two words appear:

```
Architect          Operator
```

Hovering either side breathes the background temperature toward that world — cooler and more restrained for the engineering path, warmer and more candlelit for the automation path. Clicking triggers a lens blur transition — the entire viewport goes soft, the site reorganizes itself, sharpens back into focus. The choice is saved to localStorage so returning visitors land directly in their version.

**The Sections**

| Section | What It Does |
|---|---|
| Hero | Kubrick zoom, letter scramble, path choice, lens blur transition |
| About | Split layout, typewriter cycling identities, camera cursor |
| Experience | Horizontal film strip scroll, five career chapters as film frames |
| Projects | Full-width cinematic cards, expand-in-place case studies, Projector Room for DeepTrust |
| Skills | Interactive SVG constellation — nodes, glowing connections, parallax |
| Philosophy | Scroll-tied title cards, one belief at a time |
| Reviews | Film critic pull quotes, sprocket navigation, auto-cycle with pause |
| Contact | Cinematic closing line, form via EmailJS, LinkedIn and email links |

---

## Technical Decisions Worth Noting

**Why SVG for the Skills Constellation**

The skills section renders an interactive SVG constellation rather than a grid or tag cloud. Nodes represent skills, lines represent connections between related technologies. On hover a node glows and its connections illuminate. The active path dims unrelated nodes rather than hiding them — the two worlds stay visible, suggesting they share a foundation. Mouse parallax runs across three depth layers. Every node pulses independently on a different timing so the constellation never looks static.

**Why layoutId for Project Expansion**

Project case studies use Framer Motion's `layoutId` to animate cards expanding to fill the viewport. The card physically becomes the full-screen view — no modal appearing from nowhere, no page navigation. Closing contracts it back to the exact position it came from, even accounting for scroll position. DeepTrust specifically uses a separate iris-in effect (SVG circle radius animation) as the flagship project deserves its own cinematic entry.

**Why CSS Custom Properties for Temperature Shifting**

The warm/cool color temperature shift that responds to path choice, section hover, and skill hover is driven by a single CSS custom property. A global Framer Motion value drives this property and everything reading from it updates smoothly. This means the temperature effect is consistent and composable — any element anywhere in the site can participate without bespoke animation code.

**Why Lenis for Scroll**

Lenis wraps the entire application and provides smooth, physics-based scrolling. The difference between native browser scroll and Lenis scroll is subtle but meaningful — scroll-tied animations in Framer Motion feel more like film than a website with Lenis underneath them.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Fonts | Cormorant Garamond, JetBrains Mono (via next/font) |
| Marquee | react-fast-marquee |
| Typewriter | react-simple-typewriter |
| Form | react-hook-form + EmailJS |
| State | React Context API |
| Persistence | localStorage |
| Deployment | Vercel |

---

## Project Structure

```
/app
  layout.tsx          — Lenis wrapper, grain overlay, global cursor, font loading
  page.tsx            — Section composition

/components
  /cursor             — CursorManager.tsx
  /grain              — GrainOverlay.tsx
  /lightswitch        — PullString.tsx
  /nav                — SideNav.tsx
  /hero               — Hero.tsx
  /about              — About.tsx
  /experience         — Experience.tsx
  /projects           — Projects.tsx, ProjectCard.tsx, CaseStudy.tsx, ProjectorRoom.tsx
  /skills             — Skills.tsx, Constellation.tsx
  /philosophy         — Philosophy.tsx
  /reviews            — Reviews.tsx
  /contact            — Contact.tsx

/context
  PathContext.tsx     — Global path state (architect | operator)
  ThemeContext.tsx    — Light / dark mode state

/data
  projects.ts         — All project content, tagged by path
  skills.ts           — All skills with positions, connections, and logo paths
  experience.ts       — Career chapters
  reviews.ts          — Pull quotes and full review text
  philosophy.ts       — Belief statements

/public
  /logos              — SVG skill logos (Devicon + custom)
  /images             — Project images, photo, textures
```

---

## Running Locally

```bash
# Clone
git clone https://github.com/umer515k/portfolio.git
cd portfolio

# Install
npm install

# Run dev server
npm run dev

# Open
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file for EmailJS:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Easter Eggs

There are hidden details throughout the site. Some are obvious once you know where to look. Some are only visible if you inspect the source. Some require a specific input sequence.

That's all I'm saying.

---

## Design References

| Reference | What It Contributed |
|---|---|
| Barry Lyndon (1975) | Warm amber palette, candlelight color temperature, slow deliberate zoom |
| 2001: A Space Odyssey (1968) | Cold precision, negative space, the tension between human and system |
| Red Dead Redemption 2 | Twilight warmth, melancholic atmosphere, painterly stillness |
| The Witcher (series) | Muted greens, moral ambiguity, fog and atmosphere |
| Twin Peaks | Surface charm hiding strangeness, duality as a structural idea |

---

## License

This project is open source for reference and inspiration. Please don't deploy it as your own portfolio. The content — writing, projects, reviews, philosophy — belongs to Umer Khalil.

The code structure and technical approaches are fair game to learn from.

---

<div align="center">

**[umerkhalil.dev](https://umerkhalil.dev)** · [LinkedIn](https://linkedin.com/in/umerkhalil) · [GitHub](https://github.com/umer515k)

*"I can build the software and I can run the business."*

</div>
