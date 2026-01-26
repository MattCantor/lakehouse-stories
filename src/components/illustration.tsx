interface IllustrationProps {
  src: string;
  alt: string;
  float?: "left" | "right";
}

export default function Illustration({
  src,
  alt,
  float = "left",
}: IllustrationProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={140}
      height={140}
      className={`${float === "left" ? "float-left mr-4" : "float-right ml-4"} mb-2 rounded border border-stone-300 shadow-md transform rotate-[-0.5deg]`}
    />
  );
}
