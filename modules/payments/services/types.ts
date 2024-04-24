export interface IsAccountValidResponse {
  isValid: boolean
}

export interface CreateCheckoutOptions {
  username: string
  gistId: string
}

export interface CreateCheckoutResponse {
  id: string
  checkoutUrl: string
}

export interface CreatePayoutAccounResponse {
  accountId: string
  onboardingUrl: string
}