import { useState } from 'react';

export function useContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submitMessage = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return { submitted, submitMessage };
}
