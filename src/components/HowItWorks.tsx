import Container from "./Container";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    title: "Tell Me What You Need",
    body: "Choose notary service or wedding officiant service and send the basic details.",
  },
  {
    title: "Confirm the Details",
    body: "We'll confirm availability, location, requirements, and pricing.",
  },
  {
    title: "Sign & Smile",
    body: "Meet up, take care of the important part, and get on with your day — or your marriage.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section sectionSurface">
      <Container>
        <span className="eyebrow">How It Works</span>
        <h2>Three Simple Steps</h2>
        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div className={styles.step} key={step.title}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
