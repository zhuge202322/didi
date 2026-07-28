import Image from "next/image";

export function Brand() {
  return (
    <span className="renewal-brand" aria-label="YnJoy Energy">
      <Image src="/new-site/logo-mark.png" alt="YnJoy Energy" width={172} height={64} priority />
    </span>
  );
}
