const OpenToWork = () => {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2

        rounded-full

        border
        border-green-500/30

        bg-green-500/10

        px-4
        py-2

        backdrop-blur-sm

        shadow-[0_0_20px_rgba(34,197,94,0.08)]
      "
    >
      <span
        className="
          h-2.5
          w-2.5

          rounded-full

          bg-green-500

          animate-pulse
        "
      />

      <span
        className="
          text-sm
          font-medium
          text-green-400
        "
      >
        Open To Work
      </span>
    </div>
  );
};

export default OpenToWork;