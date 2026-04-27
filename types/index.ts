export type LaunchMode = 'preregistro' | 'venta' | 'cerrado'

export interface Testimonial {
  stars: number
  quote: string
  name: string
  city?: string
  is_placeholder: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Step {
  number: string
  title: string
  description: string
}
