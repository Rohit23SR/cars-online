import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useCheckoutStore } from '@/store/checkout-store'

describe('Checkout Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCheckoutStore.getState().reset()
  })

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useCheckoutStore.getState()
      expect(state.currentStep).toBe(1)
      expect(state.formData).toEqual({})
      expect(state.carId).toBeNull()
    })
  })

  describe('setCurrentStep', () => {
    it('should set current step', () => {
      const { setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(2)
      expect(useCheckoutStore.getState().currentStep).toBe(2)
    })

    it('should allow setting step to 1', () => {
      const { setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(1)
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })

    it('should allow setting step to 3', () => {
      const { setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(3)
      expect(useCheckoutStore.getState().currentStep).toBe(3)
    })

    it('should allow setting any step number', () => {
      const { setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(5)
      expect(useCheckoutStore.getState().currentStep).toBe(5)
    })
  })

  describe('setFormData', () => {
    it('should set form data', () => {
      const { setFormData } = useCheckoutStore.getState()
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }
      setFormData(data)
      expect(useCheckoutStore.getState().formData).toEqual(data)
    })

    it('should merge form data with existing data', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ firstName: 'John', lastName: 'Doe' })
      setFormData({ email: 'john@example.com' })
      expect(useCheckoutStore.getState().formData).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      })
    })

    it('should update existing fields', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ firstName: 'John' })
      setFormData({ firstName: 'Jane' })
      expect(useCheckoutStore.getState().formData.firstName).toBe('Jane')
    })

    it('should handle empty object', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ firstName: 'John' })
      setFormData({})
      expect(useCheckoutStore.getState().formData).toEqual({ firstName: 'John' })
    })

    it('should handle contact information', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '0412345678',
      })
      const formData = useCheckoutStore.getState().formData
      expect(formData.firstName).toBe('John')
      expect(formData.lastName).toBe('Doe')
      expect(formData.email).toBe('john@example.com')
      expect(formData.phone).toBe('0412345678')
    })

    it('should handle delivery details', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({
        address: '123 Main St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        deliveryDate: '2024-12-25',
      })
      const formData = useCheckoutStore.getState().formData
      expect(formData.address).toBe('123 Main St')
      expect(formData.city).toBe('Sydney')
      expect(formData.state).toBe('NSW')
      expect(formData.postcode).toBe('2000')
      expect(formData.deliveryDate).toBe('2024-12-25')
    })

    it('should handle payment details', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({
        cardNumber: '4532015112830366',
        cardName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123',
      })
      const formData = useCheckoutStore.getState().formData
      expect(formData.cardNumber).toBe('4532015112830366')
      expect(formData.cardName).toBe('John Doe')
      expect(formData.expiryDate).toBe('12/25')
      expect(formData.cvv).toBe('123')
    })
  })

  describe('setCarId', () => {
    it('should set car ID', () => {
      const { setCarId } = useCheckoutStore.getState()
      setCarId('car-123')
      expect(useCheckoutStore.getState().carId).toBe('car-123')
    })

    it('should update existing car ID', () => {
      const { setCarId } = useCheckoutStore.getState()
      setCarId('car-123')
      setCarId('car-456')
      expect(useCheckoutStore.getState().carId).toBe('car-456')
    })

    it('should allow setting null', () => {
      const { setCarId } = useCheckoutStore.getState()
      setCarId('car-123')
      setCarId(null as any)
      expect(useCheckoutStore.getState().carId).toBeNull()
    })
  })

  describe('nextStep', () => {
    it('should increment current step by 1', () => {
      const { nextStep } = useCheckoutStore.getState()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(2)
    })

    it('should not exceed step 3', () => {
      const { nextStep, setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(3)
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(3)
    })

    it('should handle multiple next calls', () => {
      const { nextStep } = useCheckoutStore.getState()
      nextStep()
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(3)
    })

    it('should stay at 3 after multiple calls when at max', () => {
      const { nextStep, setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(3)
      nextStep()
      nextStep()
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(3)
    })
  })

  describe('previousStep', () => {
    it('should decrement current step by 1', () => {
      const { previousStep, setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(2)
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })

    it('should not go below step 1', () => {
      const { previousStep } = useCheckoutStore.getState()
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })

    it('should handle multiple previous calls', () => {
      const { previousStep, setCurrentStep } = useCheckoutStore.getState()
      setCurrentStep(3)
      previousStep()
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })

    it('should stay at 1 after multiple calls when at min', () => {
      const { previousStep } = useCheckoutStore.getState()
      previousStep()
      previousStep()
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })
  })

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      const { setCurrentStep, setFormData, setCarId, reset } = useCheckoutStore.getState()

      // Set some data
      setCurrentStep(3)
      setFormData({ firstName: 'John', email: 'john@example.com' })
      setCarId('car-123')

      // Reset
      reset()

      const state = useCheckoutStore.getState()
      expect(state.currentStep).toBe(1)
      expect(state.formData).toEqual({})
      expect(state.carId).toBeNull()
    })

    it('should clear all form data fields', () => {
      const { setFormData, reset } = useCheckoutStore.getState()

      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '0412345678',
        address: '123 Main St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
      })

      reset()
      expect(useCheckoutStore.getState().formData).toEqual({})
    })

    it('should be callable multiple times', () => {
      const { reset } = useCheckoutStore.getState()
      reset()
      reset()
      reset()

      const state = useCheckoutStore.getState()
      expect(state.currentStep).toBe(1)
      expect(state.formData).toEqual({})
      expect(state.carId).toBeNull()
    })
  })

  describe('Full Checkout Flow', () => {
    it('should handle complete checkout flow', () => {
      const store = useCheckoutStore.getState()

      // Step 1: Contact Information
      expect(store.currentStep).toBe(1)
      store.setCarId('car-123')
      store.setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '0412345678',
      })
      store.nextStep()

      // Step 2: Delivery Details
      expect(useCheckoutStore.getState().currentStep).toBe(2)
      store.setFormData({
        address: '123 Main St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        deliveryDate: '2024-12-25',
      })
      store.nextStep()

      // Step 3: Payment
      expect(useCheckoutStore.getState().currentStep).toBe(3)
      store.setFormData({
        cardNumber: '4532015112830366',
        cardName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123',
      })

      // Verify all data is preserved
      const finalState = useCheckoutStore.getState()
      expect(finalState.carId).toBe('car-123')
      expect(finalState.formData.firstName).toBe('John')
      expect(finalState.formData.address).toBe('123 Main St')
      expect(finalState.formData.cardNumber).toBe('4532015112830366')
    })

    it('should allow going back and forth between steps', () => {
      const { nextStep, previousStep, setCurrentStep } = useCheckoutStore.getState()

      expect(useCheckoutStore.getState().currentStep).toBe(1)
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(2)
      nextStep()
      expect(useCheckoutStore.getState().currentStep).toBe(3)
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(2)
      previousStep()
      expect(useCheckoutStore.getState().currentStep).toBe(1)
    })

    it('should preserve form data when navigating steps', () => {
      const { setFormData, nextStep, previousStep } = useCheckoutStore.getState()

      setFormData({ firstName: 'John' })
      nextStep()
      setFormData({ address: '123 Main St' })
      previousStep()

      const formData = useCheckoutStore.getState().formData
      expect(formData.firstName).toBe('John')
      expect(formData.address).toBe('123 Main St')
    })
  })

  describe('Edge Cases', () => {
    it('should handle optional delivery notes', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ deliveryNotes: 'Please call before delivery' })
      expect(useCheckoutStore.getState().formData.deliveryNotes).toBe('Please call before delivery')
    })

    it('should handle undefined values in form data', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ firstName: 'John', lastName: undefined })
      expect(useCheckoutStore.getState().formData.firstName).toBe('John')
      expect(useCheckoutStore.getState().formData.lastName).toBeUndefined()
    })

    it('should handle empty strings in form data', () => {
      const { setFormData } = useCheckoutStore.getState()
      setFormData({ firstName: '' })
      expect(useCheckoutStore.getState().formData.firstName).toBe('')
    })
  })
})
