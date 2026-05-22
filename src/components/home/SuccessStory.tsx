import YouTubeFacade from "@/components/common/YouTubeFacade";

/**
 * Success Story video — featured customer story. Embed via YouTubeFacade so
 * we don't pull the full YouTube iframe into LCP.
 */
export default function SuccessStory() {
  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10 lg:mb-12 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
            Success Story
          </p>
          <h2 className="text-purple-deep" style={{ fontWeight: 500 }}>
            Hear it from a <em className="display-accent text-brand-purple">SmilePass practice.</em>
          </h2>
        </div>

        <div className="reveal reveal-delay-1">
          <YouTubeFacade
            src="https://www.youtube.com/watch?v=OxBj6aW4NOc"
            title="SmilePass — Customer Success Story"
          />
        </div>

        <p className="text-center text-purple-deep/55 text-[0.85rem] mt-5 reveal reveal-delay-2">
          Watch how SmilePass helps real dental practices grow recurring revenue and improve case
          acceptance.
        </p>
      </div>
    </section>
  );
}
