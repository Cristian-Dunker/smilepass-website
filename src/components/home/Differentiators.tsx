import Image from "next/image";

/**
 * "Why SmilePass?" — three differentiator cards with illustrative images.
 *
 * Images downloaded from prod (`/uploads/2024/04/16-18.png`, 1080×1080 each)
 * and renamed semantically under `public/images/differentiators/`.
 *
 * Layout: 3-column grid (stacks on mobile). Each card is image-led — square
 * illustration on top, copy below — to match the visual weight of the rest
 * of the home (vs the previous text-only card design).
 */

interface Differentiator {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

const items: Differentiator[] = [
  {
    title: "Be found by new patients through our search directory",
    body: "Increase your online visibility and list your practice with us. Our search directory is designed to help patients effortlessly discover nearby dental practices that offer flexible and convenient payment options.",
    imageSrc: "/images/differentiators/search-directory.png",
    imageAlt: "Search directory illustration",
  },
  {
    title: "24/7 support for growth with performance monitoring",
    body: "We offer personalised 1:1 onboarding by a dedicated customer success consultant. Our experienced growth specialists continually monitor performance metrics and conduct regular health checks. We also offer 24-hour chat support for both your patients and your team, guaranteeing the best possible experience for all.",
    imageSrc: "/images/differentiators/support-monitoring.png",
    imageAlt: "24/7 support and performance monitoring illustration",
  },
  {
    title: "Data Protection with the most stringent level of certification",
    body: "Our commitment to data protection is underscored by the implementation of rigorous measures and the attainment of the most stringent levels of certification available. Our holistic approach guarantees that your valuable data is shielded by cutting-edge security technologies.",
    imageSrc: "/images/differentiators/data-protection.png",
    imageAlt: "Data protection and certification illustration",
  },
];

export default function Differentiators() {
  return (
    <section className="bg-mist py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 lg:mb-16 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
            Why SmilePass?
          </p>
          <h2 className="text-purple-deep" style={{ fontWeight: 500 }}>
            Three reasons practices <em className="display-accent text-brand-purple">choose us.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
          {items.map((item, i) => (
            <article
              key={i}
              className={`flex flex-col reveal reveal-delay-${i + 1}`}
            >
              {/* Image */}
              <div className="relative aspect-square w-full mb-6 rounded-2xl overflow-hidden bg-paper">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover"
                />
              </div>

              <h3
                className="text-purple-deep text-[1.15rem] lg:text-[1.2rem] mb-3 leading-snug"
                style={{ fontWeight: 600 }}
              >
                {item.title}
              </h3>
              <p className="text-purple-deep/70 text-[0.92rem] leading-relaxed">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
