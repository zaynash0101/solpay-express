"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

export const AnimatedCoin = ({ size = 128 }: { size?: number }) => {
  return (
    <motion.div
      animate={{
        rotateY: [0, 360],
        y: [0, -20, 0],
      }}
      transition={{
        rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <Image
        src="/solana-coin.png"
        alt="Solana Coin"
        width={size}
        height={size}
        className="drop-shadow-[0_0_40px_rgba(153,69,255,0.6)]"
        priority
      />
    </motion.div>
  )
}
