const Logo = () => {
  return (
    <a
      href="#home"
      className="
        flex
        items-center
        gap-2.5
        select-none
        group
      "
    >
      <span
        className="
          font-mono
          font-bold
          text-accent
          text-base
          tracking-tighter
        "
      >
        {"<AK/>"}
      </span>

      <span
        className="
          clash
          font-semibold
          tracking-wide
          text-white
          group-hover:text-accent
          transition-colors
          duration-300
          text-lg
        "
      >
        Abhishek<span className="text-accent">.dev</span>
      </span>
    </a>
  );
};

export default Logo;