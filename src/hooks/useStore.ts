import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const emptyGuest: Guest = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  zipCode: "",
  address: "",
  id: "",
  idType: "",
};

const emptyPaymentDetail: PaymentDetail = {
  cardHolderName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
};

const emptyBookingDetail: BookingDetail = {
  startDate: "",
  endDate: "",
  adultNumber: 0,
  childrenNumber: 0,
  codePromotion: "",
  standardRoomNumber: 0,
  deluxeRoomNumber: 0,
  familyRoomNumber: 0,
  suiteRoomNumber: 0,
  executiveRoomNumber: 0,
  packageOne: false,
  packageTwo: false,
  isCheckedPDPA: false,
  bookingId: "",
  showStandard: true,
  showDeluxe: true,
  showFamily: true,
  showSuite: true,
  showExecutive: true,
  showOnlyBalcony: false,
  showOnlyDinnerPlan: false,
  showOnlyJacuzzi: false,
  showBelowOption1: false,
  showBelowOption2: false,
  showBelowOption3: false,
};

const emptyGuestError: GuestError = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  phoneNumber: "",
  country: "",
  zipCode: "",
  address: "",
  idType: "",
  id: "",
};

const emptyPaymentError: PaymentError = {
  cardHolderName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
};

interface Store {
  bookingDetail: BookingDetail;
  guests: Guest[];
  paymentDetail: PaymentDetail;
  specialReq: string;
  cardType: string;
  exchangeRate: number;
  currency: string;
  guestsError: GuestError[];
  paymentError: PaymentError;
  checkboxError: string;
  setBookingDetail: (bookingDetail: BookingDetail) => void;
  setGuests: (guests: Guest[]) => void;
  setPaymentDetail: (paymentDetail: PaymentDetail) => void;
  setSpecialReq: (specialReq: string) => void;
  setCardType: (cardType: string) => void;
  setExchangeRate: (exchangeRate: number) => void;
  setCurrency: (currency: string) => void;
  setGuestsError: (guestsError: GuestError[]) => void;
  setPaymentError: (paymentError: PaymentError) => void;
  setPaymentError2: (name: string, value: string) => void;
  setCheckboxError: (checkboxError: string) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      bookingDetail: emptyBookingDetail,
      guests: [emptyGuest],
      paymentDetail: emptyPaymentDetail,
      specialReq: "",
      cardType: "",
      exchangeRate: 1,
      currency: "THB",
      bookingId: "",
      guestsError: [emptyGuestError],
      paymentError: emptyPaymentError,
      checkboxError: "",
      setBookingDetail: (bookingDetail: BookingDetail) =>
        set({ bookingDetail }),
      setGuests: (guests: Guest[]) => set({ guests }),
      setPaymentDetail: (paymentDetail: PaymentDetail) =>
        set({ paymentDetail }),
      setSpecialReq: (specialReq: string) => set({ specialReq }),
      setCardType: (cardType: string) => set({ cardType }),
      setExchangeRate: (exchangeRate: number) => set({ exchangeRate }),
      setCurrency: (currency: string) => set({ currency }),
      setGuestsError: (guestsError: GuestError[]) => set({ guestsError }),
      setPaymentError: (paymentError: PaymentError) => set({ paymentError }),
      setPaymentError2: (name: string, value: string) =>
        set((state) => ({
          paymentError: { ...state.paymentError, [name]: value },
        })),
      setCheckboxError: (checkboxError: string) => set({ checkboxError }),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useStore;
