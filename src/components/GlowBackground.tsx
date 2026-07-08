import { motion } from 'motion/react';

export default function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
      {/* Absolute Glow Red Spheres */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#df2531] opacity-15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#df2531] opacity-10 blur-[130px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-[#9e141d] opacity-5 blur-[100px]"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
      />
      
      {/* Ambient gradient top and bottom shadow */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}
