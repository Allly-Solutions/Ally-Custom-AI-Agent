// SplashScreen.tsx
import { motion } from "framer-motion";
import Ally from "../../../public/Allylogo4.png";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <motion.img
        src={Ally}
        alt="Ally Logo"
        className="w-20 h-20 object-contain"
        animate={{
          scale: [1, 1.2, 1],      // zoom in -> zoom out
          opacity: [1, 0.6, 1],    // fade a bit at the peak of zoom
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,        // keeps looping
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
