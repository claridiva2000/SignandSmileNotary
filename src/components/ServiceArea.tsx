import Container from "./Container";
import styles from "./ServiceArea.module.css";
import { MapPinIcon } from "./icons";
import { PRIMARY_SERVICE_AREA, SERVICE_AREA_TOWNS } from "@/lib/constants";

export default function ServiceArea() {
  return (
    <section className="section sectionCream">
      <Container>
        <div className={styles.wrap}>
          <div>
            <span className="eyebrow">Service Area</span>
            <h2>Proudly Local to {PRIMARY_SERVICE_AREA}</h2>
            <p className="lede">
              Sign &amp; Smile is based in Fort Bend County and regularly serves the communities
              below. Service may also be available elsewhere in the Greater Houston area depending
              on location and availability.
            </p>
            <div className={styles.towns}>
              {SERVICE_AREA_TOWNS.map((town) => (
                <span className={styles.town} key={town}>
                  <MapPinIcon />
                  {town}
                </span>
              ))}
            </div>
            <p className={styles.note}>
              Not sure if you&apos;re in the service area? Reach out and we&apos;ll let you know.
            </p>
          </div>
          <div className={styles.mapCard} aria-hidden="true">
            <MapPinIcon />
            <strong>Fort Bend County, TX</strong>
            <span>&amp; the Greater Houston Area</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
