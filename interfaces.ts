interface Guest {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    id: string;
    idType: string;
  }
  
  interface PaymentDetail {
    cardHolderName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
  }
  
  interface BookingDetail {
    startDate: string;
    endDate:string;
    adultNumber: number;
    childrenNumber: number;
    codePromotion: string;
    standardRoomNumber: number;
    deluxeRoomNumber: number;
    familyRoomNumber: number;
    executiveRoomNumber: number;
    suiteRoomNumber: number;
    packageOne: boolean;
    packageTwo: boolean;
    isCheckedPDPA: boolean;
    bookingId: string,
    showStandard: boolean;
    showDeluxe: boolean;
    showFamily: boolean;
    showSuite: boolean;
    showExecutive: boolean;
    showOnlyBalcony: boolean;
    showOnlyDinnerPlan: boolean;
    showOnlyJacuzzi: boolean;
    showBelowOption1: boolean;
    showBelowOption2: boolean;
    showBelowOption3: boolean;
  }