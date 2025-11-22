"use client";

import { useMemo, useState } from "react";
import styles from "./photo-simulator.module.css";

const HEAD_REQUIREMENT = {
  min: 0.5,
  max: 0.69,
};

const backgrounds = [
  { label: "Studio White", value: "#f8fafc" },
  { label: "Soft Gray", value: "#e2e8f0" },
  { label: "Sky Cool", value: "#e0f2fe" },
];

const skinTones = [
  { label: "Porcelain", value: "#f7d6c1" },
  { label: "Warm Beige", value: "#f0b996" },
  { label: "Golden", value: "#d89167" },
  { label: "Copper", value: "#b1663c" },
  { label: "Mahogany", value: "#80412b" },
];

export default function PhotoSimulator() {
  const [headRatio, setHeadRatio] = useState(0.62);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [skinToneIndex, setSkinToneIndex] = useState(2);
  const [showGuides, setShowGuides] = useState(true);

  const headMetrics = useMemo(() => {
    const headHeightPx = Math.round(headRatio * 600);
    const chinHeight = 600 - (120 + headHeightPx);
    return {
      percentage: Math.round(headRatio * 100),
      pixels: headHeightPx,
      compliant:
        headRatio >= HEAD_REQUIREMENT.min && headRatio <= HEAD_REQUIREMENT.max,
      eyeLevelPx: Math.round(120 + headHeightPx * 0.62),
      chinHeightPx: Math.max(40, chinHeight),
    };
  }, [headRatio]);

  const headDiameter = headRatio * 600;
  const headRadius = headDiameter / 2;
  const headCenterY = 120 + headRadius;
  const shoulderY = Math.min(headCenterY + headRadius + 48, 560);
  const torsoHeight = Math.max(80, 580 - shoulderY);
  const eyeLevelY = headCenterY - headRadius * 0.36;

  return (
    <section className={styles.wrapper} aria-labelledby="dv-simulator" role="region">
      <div className={styles.canvasCard}>
        <header className={styles.canvasHeader}>
          <h2 id="dv-simulator">Interactive Model</h2>
          <p>
            Adjust the composition and review live feedback. Target head height
            between 50% and 69% of the frame.
          </p>
        </header>
        <div className={styles.canvasShell}>
          <svg
            className={styles.canvas}
            viewBox="0 0 600 600"
            role="img"
            aria-label="DV lottery compliant portrait illustration"
          >
            <defs>
              <linearGradient id="shadow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <rect
              x={0}
              y={0}
              width={600}
              height={600}
              rx={28}
              fill={backgrounds[backgroundIndex].value}
            />
            {showGuides && (
              <g className={styles.guides}>
                <rect
                  x={60}
                  y={60}
                  width={480}
                  height={480}
                  fill="none"
                  stroke="#38bdf8"
                  strokeDasharray="12 12"
                  strokeWidth={2.5}
                  opacity={0.65}
                />
                <line
                  x1={60}
                  x2={540}
                  y1={eyeLevelY}
                  y2={eyeLevelY}
                  stroke="#0284c7"
                  strokeDasharray="4 10"
                  strokeWidth={2.2}
                  opacity={0.55}
                />
                <text
                  x={70}
                  y={eyeLevelY - 6}
                  className={styles.guideLabel}
                >
                  Eye line
                </text>
                <line
                  x1={60}
                  x2={540}
                  y1={120}
                  y2={120}
                  stroke="#22c55e"
                  strokeDasharray="4 8"
                  strokeWidth={2}
                  opacity={0.55}
                />
                <text x={70} y={136} className={styles.guideLabel}>
                  Ideal crown
                </text>
                <line
                  x1={60}
                  x2={540}
                  y1={600 - headMetrics.chinHeightPx}
                  y2={600 - headMetrics.chinHeightPx}
                  stroke="#22c55e"
                  strokeDasharray="4 8"
                  strokeWidth={2}
                  opacity={0.5}
                />
                <text
                  x={70}
                  y={600 - headMetrics.chinHeightPx - 10}
                  className={styles.guideLabel}
                >
                  Chin level
                </text>
              </g>
            )}
            <g className={styles.subject}>
              <path
                d={`M${300 - 160} ${shoulderY} Q300 ${shoulderY - 40} ${300 + 160} ${shoulderY} V${shoulderY + torsoHeight} H${300 - 160} Z`}
                fill={`url(#shadow)`}
                opacity={0.18}
              />
              <path
                d={`M${300 - 150} ${shoulderY} Q300 ${shoulderY - 32} ${300 + 150} ${shoulderY} V${shoulderY + torsoHeight} H${300 - 150} Z`}
                fill="#1f2937"
                opacity={0.9}
              />
              <circle
                cx={300}
                cy={headCenterY}
                r={headRadius}
                fill={skinTones[skinToneIndex].value}
              />
              <path
                d={`M${300 - headRadius * 1.15} ${headCenterY - headRadius * 0.4} Q${300} ${headCenterY - headRadius * 1.2} ${300 + headRadius * 1.15} ${headCenterY - headRadius * 0.4} L${300 + headRadius * 1.1} ${headCenterY + headRadius * 0.45} Q${300} ${headCenterY + headRadius * 0.2} ${300 - headRadius * 1.1} ${headCenterY + headRadius * 0.45} Z`}
                fill="#111827"
                opacity={0.75}
              />
              <ellipse
                cx={300}
                cy={headCenterY + headRadius * 0.55}
                rx={headRadius * 0.9}
                ry={headRadius * 1.05}
                fill={skinTones[skinToneIndex].value}
              />
              <rect
                x={300 - headRadius * 0.95}
                y={headCenterY + headRadius * 0.4}
                width={headRadius * 1.9}
                height={torsoHeight * 0.75}
                fill={skinTones[skinToneIndex].value}
                opacity={0.8}
                rx={headRadius * 0.45}
              />
            </g>
          </svg>
        </div>
      </div>

      <div className={styles.controlPanel}>
        <div className={styles.metricRow}>
          <div>
            <span className={styles.metricLabel}>Head height</span>
            <p className={styles.metricHint}>DV requirement: 50% - 69%</p>
          </div>
          <span
            className={`${styles.metricValue} ${headMetrics.compliant ? styles.pass : styles.fail}`}
          >
            {headMetrics.percentage}%
          </span>
        </div>
        <input
          type="range"
          min={45}
          max={75}
          value={headMetrics.percentage}
          onChange={(event) => setHeadRatio(Number(event.target.value) / 100)}
          className={styles.slider}
          aria-label="Head height"
        />
        <dl className={styles.metricsList}>
          <div>
            <dt>Head height</dt>
            <dd>{headMetrics.pixels} px</dd>
          </div>
          <div>
            <dt>Eye level</dt>
            <dd>{headMetrics.eyeLevelPx} px</dd>
          </div>
          <div>
            <dt>Background</dt>
            <dd>{backgrounds[backgroundIndex].label}</dd>
          </div>
        </dl>
        {!headMetrics.compliant && (
          <p className={styles.warning}>
            Adjust the slider until the head height reads between 50% and 69%.
            The DV portal will reject images outside this band.
          </p>
        )}
      </div>

      <div className={styles.quickControls}>
        <div className={styles.swatchGroup}>
          <span>Background tone</span>
          <div className={styles.swatches}>
            {backgrounds.map((option, index) => (
              <button
                key={option.label}
                type="button"
                className={`${styles.swatch} ${
                  backgroundIndex === index ? styles.selected : ""
                }`}
                style={{ background: option.value }}
                onClick={() => setBackgroundIndex(index)}
                aria-pressed={backgroundIndex === index}
                aria-label={option.label}
              >
              </button>
            ))}
          </div>
        </div>

        <div className={styles.swatchGroup}>
          <span>Skin tone</span>
          <div className={styles.swatches}>
            {skinTones.map((option, index) => (
              <button
                key={option.label}
                type="button"
                className={`${styles.swatch} ${
                  skinToneIndex === index ? styles.selected : ""
                }`}
                style={{ background: option.value }}
                onClick={() => setSkinToneIndex(index)}
                aria-pressed={skinToneIndex === index}
                aria-label={option.label}
              >
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.toggleGuides}
          onClick={() => setShowGuides((prev) => !prev)}
          aria-pressed={showGuides}
        >
          {showGuides ? "Hide" : "Show"} guidelines
        </button>
      </div>
    </section>
  );
}
