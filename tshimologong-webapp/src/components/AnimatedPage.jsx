import { motion, AnimatePresence } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={window.location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animation}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;
