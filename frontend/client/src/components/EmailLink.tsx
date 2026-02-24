import React from 'react';
import { CONTACT_CONFIG } from '@/lib/contact';

interface EmailLinkProps {
  email?: string;
  subject?: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A reusable Email link component that opens Gmail compose in a new tab 
 * for web users, with a standard mailto: fallback.
 */
export const EmailLink: React.FC<EmailLinkProps> = ({
  email = CONTACT_CONFIG.email,
  subject = "AquaShield website enquiry",
  body = "Hello, I would like to enquire about ... (provide details)",
  className = "text-primary hover:underline font-medium",
  children
}) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  // Gmail Compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
  
  // Standard Mailto URL
  const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const method = e.ctrlKey || e.metaKey || !navigator.maxTouchPoints ? 'gmail' : 'mailto';
    
    // Analytics tracking
    if (typeof window !== 'undefined') {
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag('event', 'contact_email_click', { method });
      }
      
      window.dispatchEvent(new CustomEvent('contact_email_click', { 
        detail: { method, email } 
      }));
    }
  };

  return (
    <a
      href={gmailUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={`Email AquaShield — opens Gmail compose`}
      data-testid="link-email-contact"
    >
      {children || email}
    </a>
  );
};
