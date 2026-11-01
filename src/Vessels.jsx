import React from "react";

// Three glazed pots drawn in SVG.
export default function Vessels() {
  return (
    <svg className="vessels" viewBox="0 0 420 300" role="img" aria-label="Three glazed pots: a bowl, a tall vase and a mug">
      <ellipse cx="210" cy="282" rx="200" ry="10" fill="#E2D6C6" />
      <path d="M150 90 C150 60 190 60 190 90 C190 110 205 120 205 160 C205 230 195 280 170 280 C145 280 135 230 135 160 C135 120 150 110 150 90 Z" fill="#5E8C7A" />
      <path d="M135 160 C135 230 145 280 170 280 C195 280 205 230 205 160 C190 175 150 175 135 160 Z" fill="#C9B79C" />
      <ellipse cx="170" cy="88" rx="20" ry="5" fill="#3F6658" />
      <path d="M20 200 C20 255 60 280 105 280 C150 280 190 255 190 200 Z" fill="#9C4A2F" transform="translate(-5 0)" />
      <ellipse cx="100" cy="200" rx="85" ry="12" fill="#7A3824" />
      <path d="M40 240 C60 265 140 265 165 240" stroke="#C9B79C" strokeWidth="3" fill="none" />
      <rect x="250" y="170" width="95" height="110" rx="14" fill="#2F4858" />
      <path d="M345 195 C385 195 385 255 345 255" stroke="#2F4858" strokeWidth="14" fill="none" strokeLinecap="round" />
      <ellipse cx="297" cy="172" rx="47" ry="8" fill="#22363F" />
      <path d="M250 235 C270 228 325 245 345 235 L345 266 C345 274 339 280 331 280 L264 280 C256 280 250 274 250 266 Z" fill="#EFE6DA" opacity=".9" />
    </svg>
  );
}
