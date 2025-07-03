import { type JSX } from 'react';

export function Card({
  children,
  className,
  href,
  title
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  title: string;
}): JSX.Element {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
