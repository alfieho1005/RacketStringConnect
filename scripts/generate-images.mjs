import fs from "fs";
import path from "path";

const TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL = "black-forest-labs/flux-1.1-pro";

const IMAGES = [
  {
    name: "hero-stringing.webp",
    prompt: "Close-up of hands stringing a badminton racket, Hong Kong sports shop background, fluorescent workshop lighting, rackets hanging on wall, photorealistic, shallow depth of field, no text",
    aspect_ratio: "16:9",
  },
  {
    name: "sport-badminton.webp",
    prompt: "Badminton racket and shuttlecock on wooden floor, top-down view, natural light, minimalist, photorealistic",
    aspect_ratio: "1:1",
  },
  {
    name: "sport-tennis.webp",
    prompt: "Tennis racket strings close-up with ball, green court surface, natural light, photorealistic",
    aspect_ratio: "1:1",
  },
  {
    name: "sport-squash.webp",
    prompt: "Squash racket and ball against white court wall, dramatic side lighting, photorealistic",
    aspect_ratio: "1:1",
  },
  {
    name: "sport-pickleball.webp",
    prompt: "Pickleball paddle and ball on outdoor blue court, bright daylight, overhead angle, photorealistic",
    aspect_ratio: "1:1",
  },
  {
    name: "about-stringer.webp",
    prompt: "Racket stringer focused on work, sitting at stringing machine, Hong Kong sports shop interior, candid, warm lighting, photorealistic",
    aspect_ratio: "16:9",
  },
  {
    name: "default-avatar.webp",
    prompt: "Minimalist flat illustration of a badminton racket with string detail, clean white background, soft grey tones, icon style, no text",
    aspect_ratio: "1:1",
  },
];

async function createPrediction(image) {
  console.log(`Starting: ${image.name} ...`);
  const res = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      input: {
        prompt: image.prompt,
        aspect_ratio: image.aspect_ratio,
        output_format: "webp",
        output_quality: 90,
        safety_tolerance: 5,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create prediction for ${image.name}: ${res.status} ${err}`);
  }

  return res.json();
}

async function pollPrediction(id) {
  while (true) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await res.json();

    if (data.status === "succeeded") return data.output;
    if (data.status === "failed" || data.status === "canceled") {
      throw new Error(`Prediction ${id} ${data.status}: ${data.error}`);
    }

    // Wait 2 seconds before polling again
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`  Saved: ${dest} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const outDir = path.join(process.cwd(), "public", "images", "generated");
  fs.mkdirSync(outDir, { recursive: true });

  // Start all predictions in parallel
  const predictions = await Promise.all(
    IMAGES.map(async (img) => {
      const pred = await createPrediction(img);
      return { ...img, predictionId: pred.id };
    })
  );

  // Poll and download each
  for (const pred of predictions) {
    console.log(`Waiting: ${pred.name} (${pred.predictionId}) ...`);
    const output = await pollPrediction(pred.predictionId);
    const url = typeof output === "string" ? output : output[0];
    await downloadImage(url, path.join(outDir, pred.name));
  }

  console.log("\nAll images generated!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
