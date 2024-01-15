import Image from 'next/image'
import Link from 'next/link'
import LogoImg from "@/public/images/logo-img.png"

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Skill Sync Logo">
      <Image src={LogoImg} width={128} height={24} alt="Skill Sync Logo" />
    </Link>
  )
}
