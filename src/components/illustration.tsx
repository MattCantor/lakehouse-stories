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
      width={130}
      height={130}
      className={`${float === "left" ? "float-left" : "float-right"} mx-2 rounded-md border border-gray-300 shadow-md opacity-80 transform rotate-[-0.5deg]`}
    />
  );
}
