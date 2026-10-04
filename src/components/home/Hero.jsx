import HeroImageCard from "./HeroImageCard";
import HeroContent from "./HeroContent";
import Container from "../common/Container";

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-[calc(100vh-76px)]
        lg:min-h-[85vh]
        items-center
        justify-center
        overflow-hidden
        py-4
        lg:py-16
      "
    >
      {/* Dynamic top gradient spot background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-rgb),0.07),transparent_50%)]
          transition-colors
          duration-1000
        "
      />

      <Container>
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-16
            items-center
          "
        >
          {/* Mobile: Image first, Content second. Desktop: Content first, Image second */}
          <div className="order-1 lg:order-2">
            <HeroImageCard />
          </div>
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;