import Image from "next/image";

export function Brand() {
  return (
    <span className="renewal-brand" aria-label="YnJoy Energy">
      <Image src="/new-site/logo.png" alt="YnJoy Energy" width={172} height={72} priority />
    </span>
  );
}
