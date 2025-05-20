// useRecaptcha.js

import { useRef, useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer un reCAPTCHA avec gestion de timeout automatique.
 * Fournit les références, token, et fonctions pour interaction manuelle.
 *
 * @returns {{
 *   recaptchaRef: React.MutableRefObject,
 *   capchaToken: string,
 *   handleRecaptcha: function(string): void,
 *   resetCaptcha: function(): void
 * }}
 */
export default function useRecaptcha() {
  const recaptchaRef = useRef(null);               // Référence vers l'élément reCAPTCHA
  const [capchaToken, setCapchaToken] = useState(""); // Stocke le token généré

  useEffect(() => {
    let isMounted = true;
    let tokenRefreshTimeout = null;

    /**
     * Réinitialise le reCAPTCHA et vide le token.
     */
    const refreshCaptcha = () => {
      if (isMounted && recaptchaRef.current?.reset) {
        recaptchaRef.current.reset();
        setCapchaToken('');
      }
    };

    // Si un token existe, programme une réinitialisation après 110 secondes
    if (capchaToken && recaptchaRef.current) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110_000); // 110 sec = 1min50
    }

    // Nettoyage lors du démontage du composant ou du changement de token
    return () => {
      isMounted = false;
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [capchaToken]);

  /**
   * Gère le callback de reCAPTCHA pour enregistrer le token.
   * @param {string} token
   */
  const handleRecaptcha = (token) => {
    setCapchaToken(token);
  };

  /**
   * Réinitialisation manuelle du reCAPTCHA et vidage du token.
   */
  const resetCaptcha = () => {
    if (recaptchaRef.current?.reset) {
      recaptchaRef.current.reset();
    }
    setCapchaToken('');
  };

  return {
    recaptchaRef,
    capchaToken,
    handleRecaptcha,
    resetCaptcha,
  };
}
