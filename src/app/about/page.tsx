import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Sign & Smile Notary",
  description:
    "A friendly, local notary public and wedding officiant serving Fort Bend County and the Greater Houston area.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Real Local Person, Not a Big Company"
        lede="Sign & Smile was created around a simple idea: important paperwork and important life moments don't need to feel intimidating."
      />

      <section className="section sectionSurface">
        <Container>
          <div className={styles.wrap}>
            <div className={styles.photoFrame}>
              <Image
                src="/owner-headshot.jpg"
                alt="Portrait of the Sign & Smile Notary owner"
                width={900}
                height={1200}
                priority
                className={styles.photo}
              />
            </div>
            <div className={styles.text}>
              <p>
                Whether you&apos;re signing a document or saying &ldquo;I do,&rdquo; you&apos;ll get
                friendly, straightforward service from a real local person — not a giant company or a
                complicated platform.
              </p>
              <p>
                Sign &amp; Smile serves Fort Bend County and the Greater Houston area for both notary
                work and wedding officiant services, with the same goal every time: make the important
                part simple.
              </p>
              <div className={`ctaRow ${styles.ctaLeft}`}>
                <Button href="/contact" variant="primary">
                  Request Service
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
