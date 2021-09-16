import { ReactNode } from 'react';

export interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
  [rest: string]: any;
}

const ExternalLink: any = ({ href, children, ...rest }: ExternalLinkProps) => (
    <a href={href} {...rest}>
    {children ?? href}
  </a>
);

export default ExternalLink;