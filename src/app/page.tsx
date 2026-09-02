import Hero from "@/components/Hero";
import PathCards from "@/components/PathCards";
import JustMakeItLegal from "@/components/JustMakeItLegal";
import HowItWorks from "@/components/HowItWorks";
import ServiceArea from "@/components/ServiceArea";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PathCards />

      <section className="section sectionRose">
        <Container>
          <JustMakeItLegal />
        </Container>
      </section>

      <HowItWorks />
      <ServiceArea />

      <section className="section sectionPlum">
        <Container>
          <div className="centerBlock">
            <span className="eyebrow">Ready When You Are</span>
            <h2>Let&apos;s Get Your Important Moment Handled</h2>
            <p className="lede">
              Send a few details and we&apos;ll follow up to confirm availability, location, and
              pricing.
            </p>
            <div className="ctaRow">
              <Button href="/contact" variant="onDark">
                Request Service
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
