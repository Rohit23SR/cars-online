import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CheckoutFormData {
  // Step 1: Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 2: Delivery Details
  address: string
  city: string
  state: string
  postcode: string
  deliveryDate: string
  deliveryNotes?: string

  // Step 3: Payment (Mock)
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

interface CheckoutState {
  currentStep: number
  formData: Partial<CheckoutFormData>
  carId: string | null

  setCurrentStep: (step: number) => void
  setFormData: (data: Partial<CheckoutFormData>) => void
  setCarId: (carId: string) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void
}

const initialFormData: Partial<CheckoutFormData> = {}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormData,
      carId: null,

      setCurrentStep: (step) => set({ currentStep: step }),

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setCarId: (carId) => set({ carId }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 3),
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      reset: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          carId: null,
        }),
    }),
    {
      name: 'checkout-storage',
    }
  )
)
