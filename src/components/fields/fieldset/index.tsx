'use client';

import { ReactNode } from 'react';

interface FieldsetHeading {
  text: string;
  type: 'legend' | 'h4';
  className?: string;
}

interface FieldsetProps {
  children: ReactNode;
  heading?: FieldsetHeading;
  className?: string;
  description?: string;
}

const Fieldset = ({ children, heading, className = 'space-y-6 py-8', description }: FieldsetProps) => {
  return (
    <fieldset className={className}>
      {heading && (
        <>
          {heading.type === 'legend' ? (
            <legend className={heading.className || 'sr-only'}>{heading.text}</legend>
          ) : (
            <h4 className={heading.className}>{heading.text}</h4>
          )}
        </>
      )}
      {description && <p className="text-sm text-gray-700 md:text-base">{description}</p>}
      {children}
    </fieldset>
  );
};

Fieldset.displayName = 'Fieldset';
export default Fieldset;
