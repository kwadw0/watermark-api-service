import * as sharp from 'sharp';

export async function addTextWatermark(
  imageBuffer: Buffer,
  text: string,
): Promise<Buffer> {
  // Create an SVG overlay with the watermark text
  const svg = `
    <svg width="800" height="200">
      <text x="50%" y="50%" font-size="48" fill="white" opacity="0.5" text-anchor="middle" alignment-baseline="middle" font-family="Arial, Helvetica, sans-serif">${text}</text>
    </svg>
  `;

  // Composite the SVG over the image
  return sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg), gravity: 'southeast' }])
    .toBuffer();
}
