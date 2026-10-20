export interface Offer {
  id: string
  title: string
  description: string
  periodLabel: string
  isDefault?: boolean
  currency: string
  ctaLabel: string
  footnote: string
  badge?: string
  price: number
}
