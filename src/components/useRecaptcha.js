import { useRef, useState, useEffect } from 'react';

export default function useRecaptcha() {
  const recaptchaRef = useRef(null);
  const [capchaToken, setCapchaToken] = useState("");

  useEffect(() => {
    let isMounted = true;
    let tokenRefreshTimeout = null;

    const refreshCaptcha = () => {
      if (isMounted && recaptchaRef.current?.reset) {
        recaptchaRef.current.reset();
        setCapchaToken('');
      }
    };

    if (capchaToken && recaptchaRef.current) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000); // 110 sec
    }

    return () => {
      isMounted = false;
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [capchaToken]);

  const handleRecaptcha = (token) => {
    setCapchaToken(token);
  };

  // Nouvelle fonction à exposer pour reset manuel
  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setCapchaToken('');
  };

  return { recaptchaRef, capchaToken, handleRecaptcha, resetCaptcha };
}

