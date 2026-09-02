import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="section sectionCream">
      <Container>
        <div className="centerBlock">
          <span className="eyebrow">Page Not Found</span>
          <h1>We Couldn&apos;t Find That Page</h1>
          <p className="lede">
            The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
          </p>
          <div className="ctaRow">
            <Button href="/" variant="primary">
              Back to Home
            </Button>
            <Button href="/contact" variant="secondary">
              Request Service
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
