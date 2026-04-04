'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  tag?: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionTitle({
  tag,
  title,
  highlight,
  subtitle,
  center = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(center ? 'text-center' : '', className)}
    >
      {tag && (
        <span className="tag mb-4 inline-block">{tag}</span>
      )}
      <h2 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-wider leading-none mb-4">
        {title}{' '}
        {highlight && (
          <span className="text-brand-orange">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className={cn('text-brand-gray-light text-lg leading-relaxed max-w-2xl', center && 'mx-auto')}>
          {subtitle}
        </p>
      )}
      <div className={cn('divider-orange mt-6', center && 'mx-auto')} />
    </motion.div>
  )
}
