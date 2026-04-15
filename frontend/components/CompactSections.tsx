'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Section {
  id: number
  title: string
  subtitle: string
  description: string
  color: string
  textColor: string
  borderColor: string
}

interface CompactSectionsProps {
  sections: Section[]
}

export default function CompactSections({ sections }: CompactSectionsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout - All sections visible at once */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              isExpanded={expandedId === section.id}
              onToggle={() => setExpandedId(expandedId === section.id ? null : section.id)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      {expandedId && (
        <ExpandedModal
          section={sections.find(s => s.id === expandedId)!}
          onClose={() => setExpandedId(null)}
        />
      )}
    </div>
  )
}

function SectionCard({
  section,
  index,
  isExpanded,
  onToggle
}: {
  section: Section
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onToggle}
      className="cursor-pointer"
    >
      <div
        className="rounded-[20px] p-8 border-2 shadow-lg hover:shadow-2xl transition-all duration-300 h-full min-h-[320px] flex flex-col relative overflow-hidden"
        style={{
          backgroundColor: section.color,
          borderColor: section.borderColor,
        }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle, ${section.borderColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Number Badge */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-[28px] font-bold shadow-lg mb-4"
            style={{ backgroundColor: section.borderColor }}
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.6 }}
          >
            {section.id}
          </motion.div>

          {/* Title */}
          <h3
            className="text-[28px] font-bold mb-2 leading-tight"
            style={{ color: section.textColor }}
          >
            {section.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-[16px] font-semibold mb-3 opacity-80"
            style={{ color: section.textColor }}
          >
            {section.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-[14px] leading-relaxed opacity-70 flex-grow"
            style={{ color: section.textColor }}
          >
            {section.description}
          </p>

          {/* Click to expand hint */}
          <motion.div
            className="mt-4 text-[12px] font-semibold opacity-60 flex items-center gap-2"
            style={{ color: section.textColor }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Click to learn more →
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function ExpandedModal({
  section,
  onClose
}: {
  section: Section
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full rounded-[32px] p-12 border-2 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: section.color,
          borderColor: section.borderColor,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-[24px] font-bold transition-all"
          style={{ color: section.textColor }}
        >
          ×
        </button>

        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle, ${section.borderColor} 2px, transparent 2px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Number Badge */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-[40px] font-bold shadow-xl mb-6"
            style={{ backgroundColor: section.borderColor }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {section.id}
          </motion.div>

          {/* Title */}
          <h3
            className="text-[48px] font-bold mb-4 leading-tight"
            style={{ color: section.textColor }}
          >
            {section.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-[24px] font-semibold mb-6 opacity-80"
            style={{ color: section.textColor }}
          >
            {section.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-[18px] leading-relaxed opacity-70 mb-8"
            style={{ color: section.textColor }}
          >
            {section.description}
          </p>

          {/* Additional Details */}
          <div
            className="text-[16px] leading-relaxed opacity-60 border-t-2 pt-6"
            style={{ 
              color: section.textColor,
              borderColor: section.borderColor 
            }}
          >
            <p className="mb-4">
              This is Act {section.id} of the Five-Act Journey. Each act builds upon the previous one to create a comprehensive analytical narrative.
            </p>
            <p>
              Click outside or press the × button to close this detailed view.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
