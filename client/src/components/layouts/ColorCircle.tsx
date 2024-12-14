import { motion } from "framer-motion"

interface ColorCircleProps {
  color: string
  onClick: () => void
}

export default function ColorCircle({ color, onClick }: ColorCircleProps) {
  return (
    <motion.div
      className="h-6 w-6 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Copy color: ${color}`}
    />
  )
}  