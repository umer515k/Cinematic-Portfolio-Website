const fs = require("fs");
const path = require("path");

// Simple Icons stores icons as named exports: siIconname
const si = require("simple-icons");

// Map: [display name used in skills/tech] -> Simple Icons slug
const icons = [
  ["python",          "siPython"],
  ["pytorch",         "siPytorch"],
  ["fastapi",         "siFastapi"],
  ["docker",          "siDocker"],
  ["kubernetes",      "siKubernetes"],
  ["react",           "siReact"],           // react.js / react-fast-marquee
  ["typescript",      "siTypescript"],
  ["nextjs",          "siNextdotjs"],
  ["nodejs",          "siNodedotjs"],
  ["postgresql",      "siPostgresql"],
  ["mongodb",         "siMongodb"],
  ["terraform",       "siTerraform"],
  ["grafana",         "siGrafana"],
  ["prometheus",      "siPrometheus"],
  ["git",             "siGit"],
  ["linux",           "siLinux"],
  ["pandas",          "siPandas"],
  ["scikitlearn",     "siScikitlearn"],
  ["apacheairflow",   "siApacheairflow"],
  ["githubactions",   "siGithubactions"],
  ["aws",             "siAmazonwebservices"],
  ["awsec2",          "siAmazonec2"],
  ["awss3",           "siAmazons3"],
  ["mlflow",          "siMlflow"],
  ["zapier",          "siZapier"],
  ["stripe",          "siStripe"],
  ["twilio",          "siTwilio"],
  ["express",         "siExpress"],
  ["vercel",          "siVercel"],
  ["dvc",             "siDvc"],
  ["n8n",             "siN8n"],
  ["github",          "siGithub"],
  ["k3s",             "siK3s"],
];

const outDir = path.join(__dirname, "../public/images/logos");
fs.mkdirSync(outDir, { recursive: true });

let found = 0, missing = [];

icons.forEach(([filename, siKey]) => {
  const icon = si[siKey];
  if (!icon) {
    missing.push(`${filename} (tried: ${siKey})`);
    return;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${icon.path}"/></svg>`;
  fs.writeFileSync(path.join(outDir, `${filename}.svg`), svg);
  console.log(`✓  ${filename}.svg`);
  found++;
});

console.log(`\n${found} icons saved to public/images/logos/`);
if (missing.length) {
  console.log(`\nNot found in Simple Icons (use initials fallback or add manually):`);
  missing.forEach(m => console.log(`  ✗  ${m}`));
}
