export interface PurchaseRequest {
  userId: number
  offerId: string
}

export interface PurchaseResponse {
  userId: number
  offerId: string
  purchaseId: number
  createdAt: string
}
