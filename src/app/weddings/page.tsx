import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import JustMakeItLegal from "@/components/JustMakeItLegal";
import TierCard from "@/components/TierCard";
import CrossSell from "@/components/CrossSell";
import styles from "./weddings.module.css";
import { HeartLineIcon, SignatureIcon } from "@/components/icons";
import { PRIMARY_SERVICE_AREA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Wedding Officiant in Fort Bend County & Houston, TX",
  description:
    "Wedding officiant services in Richmond, Rosenberg, and the Greater Houston area — from simple legal ceremonies and elopements to fully personalized weddings.",
};

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        background="sectionRose"
        eyebrow="Wedding Officiant"
        title="Your Wedding Doesn't Have to Be Complicated to Be Meaningful."
        lede={`From a simple legal ceremony to a personalized one, Sign & Smile officiates weddings across ${PRIMARY_SERVICE_AREA} and the Greater Houston area.`}
      />

      <section className="section sectionCream">
        <Container>
          <JustMakeItLegal />
        </Container>
      </section>

      <section className="section sectionSurface">
        <Container>
          <span className="eyebrow">More Ceremony Options</span>
          <h2>Simple or Personalized — Your Call</h2>
          <p className="lede">
            Prefer a bit more ceremony than &ldquo;just make it legal&rdquo;? These two options add as
            much — or as little — as you&apos;d like.
          </p>

          <div className={styles.tierGrid}>
            <TierCard
              icon={<HeartLineIcon />}
              title="Simple Ceremony"
              description="A warm, straightforward ceremony with vows, a ring exchange if desired, and the official pronouncement."
              ctaHref="/contact?service=simple-ceremony"
              ctaLabel="Plan My Ceremony"
            />
            <TierCard
              icon={<SignatureIcon />}
              title="Personalized Ceremony"
              description="A ceremony that incorporates details about you as a couple — personalized wording, vows, readings, or other elements we agree on together."
              ctaHref="/contact?service=personalized-ceremony"
              ctaLabel="Let's Talk About Your Wedding"
            />
          </div>
        </Container>
      </section>

      <section className="section sectionCream">
        <Container>
          <div className="centerBlock">
            <h2>Ready to Set a Date?</h2>
            <p className="lede">
              Tell us a bit about your ceremony and we&apos;ll follow up to confirm availability,
              location, and pricing.
            </p>
            <div className="ctaRow">
              <Button href="/contact" variant="primary">
                Request Service
              </Button>
            </div>
          </div>
          <div className="mtLg">
            <CrossSell href="/notary" label="Need something notarized? See Notary Services" />
          </div>
        </Container>
      </section>
    </>
  );
}
