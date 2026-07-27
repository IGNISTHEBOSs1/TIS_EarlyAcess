import { useId } from "react";

interface GlassNumberProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * True glass effect on the glyph itself, not a box around it.
 *
 * How it works: an SVG <mask> is built from the number's own text shape.
 * A <foreignObject> containing a blurred, translucent div is masked by
 * that shape — so only the pixels inside the glyph strokes render the
 * frosted layer, letting whatever sits behind (page background, grain
 * texture, a future image) show through and blur exactly within the
 * numeral's outline. A faint stroke on top keeps the letterform legible
 * against any background rather than dissolving into it.
 *
 * A plain background-clip:text gradient can't do this — that only fades
 * the text's own color, it doesn't reveal or blur what's behind it.
 */
export function GlassNumber({ value, size = 88, className = "" }: GlassNumberProps) {
  const maskId = useId();

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <text
            x="2"
            y={size * 0.78}
            fontFamily="'Bricolage Grotesque', sans-serif"
            fontWeight={700}
            fontSize={size * 0.82}
            fill="white"
          >
            {value}
          </text>
        </mask>
      </defs>

      <foreignObject width={size} height={size} mask={`url(#${maskId})`}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
          }}
        />
      </foreignObject>

      {/* thin edge so the glyph stays legible over any backdrop */}
      <text
        x="2"
        y={size * 0.78}
        fontFamily="'Bricolage Grotesque', sans-serif"
        fontWeight={700}
        fontSize={size * 0.82}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1}
      >
        {value}
      </text>
    </svg>
  );
}
