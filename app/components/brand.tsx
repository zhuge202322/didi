import Image from "next/image";

export function Brand({ logoPath = "/new-site/logo-mark.png", siteName = "YnJoy Energy" }: { logoPath?: string; siteName?: string }) {
  return (
    <span className="renewal-brand" aria-label={siteName}>
      <Image src={logoPath} alt={siteName} width={172} height={64} priority />
    </span>
  );
}
