import Link from "next/link";

interface CustomLinkProps {
  href: string;
  title: string;
  onClick?: () => void; // Add this line
}

export default function CustomLinkVertical({ href, title, onClick }: CustomLinkProps) {
  return (
    <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400"  onClick={onClick}>
      {title}
    </Link>
  );
}
