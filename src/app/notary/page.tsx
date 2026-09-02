import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ServiceGrid from "@/components/ServiceGrid";
import Callout from "@/components/Callout";
import CrossSell from "@/components/CrossSell";
import { DocumentIcon } from "@/components/icons";
import { PRIMARY_SERVICE_AREA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Notary Services in Fort Bend County & Houston, TX",
  description:
    "Mobile-friendly notary public services in Richmond, Rosenberg, Sugar Land, and the Greater Houston area. Affidavits, acknowledgments, jurats, power of attorney & more.",
};

const documentCategories = [
  {
    title: "General Notarizations",
    description: "Common everyday documents that require a notary's signature and seal.",
  },
  {
    title: "Affidavits",
    description: "Sworn written statements confirmed in your presence.",
  },
  {
    title: "Acknowledgments",
    description: "Confirming you signed a document willingly and knowingly.",
  },
  {
    title: "Jurats",
    description: "Documents requiring an oath or affirmation at the time of signing.",
  },
  {
    title: "Power of Attorney Documents",
    description: "Notarization for documents granting authority to another person.",
  },
  {
    title: "Vehicle & Title-Related Documents",
    description: "Common notarizations tied to vehicle titles and transfers.",
  },
  {
    title: "School & Parental Documents",
    description: "Consent forms and similar documents requiring notarization.",
  },
  {
    title: "Business Documents",
    description: "Routine notarizations for small business paperwork.",
  },
  {
    title: "Other Documents",
    description: "Not sure if your document qualifies? Just ask — we're happy to check.",
  },
];

export default function NotaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Notary Services"
        title="Notary Services Without the Fuss"
        lede={`Need a document notarized in ${PRIMARY_SERVICE_AREA} or the Greater Houston area? Sign & Smile makes the process simple, friendly, and quick.`}
        actions={
          <Button href="/contact?service=notary" variant="primary">
            Request Notary Service
          </Button>
        }
      />

      <section className="section sectionSurface">
        <Container>
          <h2>Common Documents We Notarize</h2>
          <p className="lede">
            Every notarization is a little different, so this list is a starting point rather than a
            guarantee. Not every document can legally be notarized — if you&apos;re unsure, reach out
            and we&apos;ll help you figure it out.
          </p>
          <ServiceGrid items={documentCategories} />

          <Callout icon={<DocumentIcon />}>
            <strong>Before your appointment:</strong> please have a valid, unexpired form of
            government-issued photo identification ready, and bring any documents unsigned unless
            told otherwise. Contact us if you&apos;re unsure whether your document can be notarized.
          </Callout>
        </Container>
      </section>

      <section className="section sectionCream">
        <Container>
          <Callout variant="legal">
            <strong>A Texas Notary Public is not an attorney</strong> and cannot provide legal advice
            or prepare legal documents.
          </Callout>

          <div className="mtLg">
            <CrossSell href="/weddings" label="Getting married instead? See Wedding Officiant Services" />
          </div>
        </Container>
      </section>
    </>
  );
}
