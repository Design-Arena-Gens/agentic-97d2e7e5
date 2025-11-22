import PhotoSimulator from "@/components/photo-simulator";
import styles from "./page.module.css";

const requirementCards = [
  {
    title: "Neutral Lighting",
    description:
      "Use soft, even lighting. Avoid shadows under the chin or on the background by facing a window or diffusing the light.",
  },
  {
    title: "Square 600 × 600px",
    description:
      "The exported JPEG must be exactly 600 pixels on each side and between 54 KB and 240 KB in size.",
  },
  {
    title: "No Accessories",
    description:
      "Head coverings only for religious reasons. Glasses are not permitted unless medically necessary with a signed statement.",
  },
  {
    title: "True-to-life Color",
    description:
      "Capture in color with accurate skin tones. Desaturation or dramatic filters can trigger auto rejection by the State Department.",
  },
];

const checklistItems = [
  {
    title: "600 × 600 pixels",
    detail: "Export with 300 dpi to maintain clarity if printing is required.",
  },
  {
    title: "Head height 50% - 69%",
    detail: "Use the simulator to confirm the head fits inside the required range.",
  },
  {
    title: "Eye level 56% - 69%",
    detail: "Eyes should sit between 336px and 414px from the bottom edge of a 600px frame.",
  },
  {
    title: "Plain light background",
    detail: "White, off-white, or light gray – avoid patterns, shadows, or gradients.",
  },
  {
    title: "Look straight",
    detail: "Neutral expression, both eyes open, shoulders square to the camera.",
  },
];

const resourceCards = [
  {
    title: "Capture Session Blueprint",
    detail:
      "Stand 1.2m from the background and 1.5m from the camera. Shooting at 50mm on a full-frame body yields minimal distortion.",
    link: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
  },
  {
    title: "Color Reference Sheet",
    detail:
      "Use neutral gray cards or an 18% gray wall to lock white balance around 5200K.",
    link: "https://www.xrite.com/learning/photography",
  },
  {
    title: "Compression & Export",
    detail:
      "Resize to 600px and export at JPEG quality 80. Confirm the final file is under 240 KB before submission.",
    link: "https://squoosh.app/",
  },
];

const quickTips = [
  "Align the crown just below the safe zone while keeping the chin visible.",
  "Relax the jaw and look directly into the lens to avoid asymmetry.",
  "Keep shoulders low and natural – rolling them forward thins the profile.",
  "Use a remote trigger or timer to eliminate camera shake.",
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.badge}>DV Lottery Ready</span>
            <h1>Model your perfect DV Lottery photo</h1>
            <p>
              Walk through the official framing guidelines with our interactive
              model. Adjust the head size, background, and skin tone to see how
              a compliant submission should look before you take the shot.
            </p>
            <ul className={styles.heroPoints}>
              <li>Live head size compliance meter</li>
              <li>Toggle-able guidelines and backgrounds</li>
              <li>Checklist covering every submission requirement</li>
            </ul>
          </div>
          <PhotoSimulator />
        </section>

        <section className={styles.requirements}>
          <h2>Core Requirements</h2>
          <p>
            Master the technical rules before you press the shutter. These are
            the most common rejection points collected from recent DV Lottery
            applicants.
          </p>
          <div className={styles.cardGrid}>
            {requirementCards.map((card) => (
              <article key={card.title} className={styles.card}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.checklistSection}>
          <div className={styles.checklistWrapper}>
            <h2>Session Checklist</h2>
            <p>
              Confirm each item below while shooting or editing. A complete list
              drastically reduces the chances of an instant rejection.
            </p>
            <ul className={styles.checklist}>
              {checklistItems.map((item) => (
                <li key={item.title}>
                  <span aria-hidden="true" className={styles.checkIcon}>
                    ✓
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.tipsBox}>
            <h3>Posing & Lighting Tips</h3>
            <ul>
              {quickTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.resources}>
          <h2>Export & Resources</h2>
          <p>
            Finish strong with calibrated color, correct compression, and
            verified sizing before you submit through the DV Lottery portal.
          </p>
          <div className={styles.resourceGrid}>
            {resourceCards.map((resource) => (
              <article key={resource.title} className={styles.resourceCard}>
                <h3>{resource.title}</h3>
                <p>{resource.detail}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  Open resource
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          Created as a visual aid for DV Lottery applicants. Always cross-check
          with the latest official instructions from the U.S. Department of
          State before submitting.
        </p>
      </footer>
    </div>
  );
}
