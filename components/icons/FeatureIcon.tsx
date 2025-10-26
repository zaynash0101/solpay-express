"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

interface FeatureIconProps {
  icon: 'speed' | 'security' | 'low-fee'
  size?: number
  className?: string
}

export const FeatureIcon = ({ icon, size = 64, className = '' }: FeatureIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={`/icons/${icon}.png`}
        alt={icon.replace('-', ' ')}
        width={size}
        height={size}
        className="drop-shadow-[0_0_20px_rgba(153,69,255,0.6)] hover:drop-shadow-[0_0_30px_rgba(20,241,149,0.6)] transition-all duration-300"
      />
    </motion.div>
  )
}
