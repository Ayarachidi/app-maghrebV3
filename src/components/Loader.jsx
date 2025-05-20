import { motion } from "framer-motion";

/**
 * Composant Loader affichant une animation de chargement circulaire.
 * Utilise framer-motion pour l’animation de rotation infinie.
 */
export default function Loader() {
  return (
    // Conteneur centré horizontalement et verticalement avec padding vertical
    <div
      className="flex justify-center items-center py-8"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <motion.div
        className="w-12 h-12 border-4 border-[#d41a48] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );
}
