"use client";

import React, { useEffect, useState } from "react";
import { DatePicker, DatePickerProps, Input, Modal, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useStore from "@/hooks/useStore";
import { Country, State, City } from "country-state-city";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Cleave from "cleave.js/react";

import dynamic from "next/dynamic";
import Topbar from "@/components/Topbar";
import SummaryCard from "@/components/SummaryCard";
import Footer from "@/components/Footer";
import AdditionalServiceCard from "@/components/AdditionalServiceCard";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { t } from "i18next";
import { useMediaQuery } from "react-responsive";

import amex from "../../../../public/amex.jpg";
import add1 from "../../../../public/add1.png";
import add2 from "../../../../public/add2.png";

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

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

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

const cardTypeToCardImg = {
  amex: amex.src,
  visa: "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-visa.png",
  mastercard:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-mastercard.png",
  discover:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-discover.png",
};

interface ReservationAndGuestDetailProps {
  params: { lng: any };
}

const ReservationAndGuestDetail: React.FC<ReservationAndGuestDetailProps> = ({
  params: { lng },
}) => {
  const { t } = useTranslation(lng);
  const {
    bookingDetail,
    setBookingDetail,
    guests,
    setGuests,
    paymentDetail,
    setPaymentDetail,
    specialReq,
    setSpecialReq,
    cardType,
    setCardType,
    guestsError,
    setGuestsError,
    paymentError,
    setPaymentError,
    checkboxError,
    setCheckboxError,
  } = useStore();
  const [isCheckedPDPA, setIsCheckedPDPA] = useState<boolean>(false);
  const [isDisabledConfirm, setIsDisabledConfirm] = useState<boolean>(false);

  const router = useRouter();

  const handleReselect = () => {
    router.replace(
      `/${lng}/search-result/startDate=${bookingDetail.startDate}&endDate=${bookingDetail.endDate}&adults=${bookingDetail.adultNumber}&childrens=${bookingDetail.childrenNumber}`
    );
  };

  const handleInputChange = (index: number, value: string, name: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [name]: value };
    setGuests(updatedGuests);
    isDisabledConfirmF(updatedGuests, paymentDetail);
  };

  const formatPaymentDetail: any = {
    cardHolderName: t("card_holder"),
    cardNumber: t("card_number"),
    expDate: t("expiration_date"),
    cvv: t("cvv"),
  };
  const handlePaymentInputChange = (e: any) => {
    let ud = paymentError;
    if (e.target.value === "") {
      ud = {
        ...ud,
        [e.target.name]: formatPaymentDetail[e.target.name] + t("isRequired"),
      };
      setPaymentError(ud);
    } else {
      ud = {
        ...ud,
        [e.target.name]: "",
      };
      setPaymentError(ud);
    }

    setPaymentDetail({ ...paymentDetail, [e.target.name]: e.target.value });
    isDisabledConfirmF(guests, {
      ...paymentDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleExpDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    let ud = paymentError;
    if (dateString === "") {
      ud = {
        ...ud,
        ["expDate"]: formatPaymentDetail["expDate"] + t("isRequired"),
      };
      setPaymentError(ud);
    } else {
      ud = {
        ...ud,
        ["expDate"]: "",
      };
      setPaymentError(ud);
    }

    setPaymentDetail({ ...paymentDetail, expDate: dateString });
    isDisabledConfirmF(guests, { ...paymentDetail, expDate: dateString });
  };

  useEffect(() => {
    isDisabledConfirmF(guests, paymentDetail);
  }, [isCheckedPDPA, guests.length]);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsCheckedPDPA(e.target.checked);
    setBookingDetail({ ...bookingDetail, isCheckedPDPA: e.target.checked });

    const updatedBookingDetail = {
      ...bookingDetail,
      isCheckedPDPA: e.target.checked,
    };

    setBookingDetail(updatedBookingDetail);
  };

  const isDisabledConfirmF = (aguests: Guest[], payment: PaymentDetail) => {
    const fieldsToCheck = [
      "firstName",
      "lastName",
      "gender",
      "birthDate",
      "email",
      "phoneNumber",
      "country",
      "zipCode",
      "address",
      "id",
      "idType",
      "cardHolderName",
      "cardNumber",
      "expDate",
      "cvv",
    ];
    const fieldsToCheckPayment = [
      "cardHolderName",
      "cardNumber",
      "expDate",
      "cvv",
    ];
    for (let i = 0; i < aguests.length; i++) {
      for (const field of fieldsToCheck) {
        if ((aguests[i] as any)[field] == "") {
          setIsDisabledConfirm(true);
          return;
        }
      }
    }

    for (const field of fieldsToCheckPayment) {
      if ((payment as any)[field] == "") {
        setIsDisabledConfirm(true);
        return;
      }
    }

    setIsDisabledConfirm(false);
  };

  const onCreditCardTypeChanged = (type: string) => {
    setCardType(type);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 393px)" });

  useEffect(() => {
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
    const guestsErrorNew = guestsError.map(() => emptyGuestError);
    setGuestsError(guestsErrorNew);

    const emptyPaymentError: PaymentError = {
      cardHolderName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    };
    setPaymentError(emptyPaymentError);

    setCheckboxError("");
  }, []);

  return (
    // Page Container
    <div>
      <div className="z-30 fixed w-[100vw] top-0">
        <Topbar lng={lng} />
      </div>
      <div className="flex justify-center mt-[100px]">
        {/* Main Container */}
        <div className="w-[1440px] mobile:w-[330px] flex items-start flex-wrap gap-10 py-10 mobile:py-1 px-10 mobile:px-0">
          {/* Left Container */}
          <div className="w-[55%] mobile:w-[80vw] flex flex-col gap-10 mt-10 mobile:mt-0">
            {/* Back to search result Container */}
            <div className="flex items-center gap-5">
              <button onClick={handleReselect}>
                <LeftOutlined className="text-[36px] mobile:text-[25px]" />
              </button>

              <div className="text-h4 mobile:text-h4-mobile">
                {/* Re-select your room for booking */}
                {t("reselect_label")}
              </div>
            </div>

            {/* Additional Services Container */}
            <div>
              {/* <div className="text-h1 mobile:text-h1-mobile font-bold">
                Fill Your Reservation Detail
              </div> */}
              <div className="text-h2 mobile:text-h2-mobile font-bold">
                {/* Additional Services */}
                {t("additional_label")}
              </div>
              <div className="flex gap-5">
                <AdditionalServiceCard
                  serviceName={t("service_name1")}
                  unit={t("service_unit1")}
                  price={299}
                  serviceImage={add1.src}
                  t={t}
                />
                <AdditionalServiceCard
                  serviceName={t("service_name2")}
                  unit={t("service_unit2")}
                  price={499}
                  serviceImage={add2.src}
                  t={t}
                />
              </div>
            </div>

            {/* Guest Detail Container */}
            <div>
              {/* Guest Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold">
                {t("guest_detail_label")}
              </div>

              {/* Guest Detail - Input Container */}
              {guests.map((guest, index) => {
                return (
                  <GuestDetailInputContainer
                    key={index}
                    handleInputChange={handleInputChange}
                    index={index}
                    guest={guest}
                    guests={guests}
                    setGuests={setGuests}
                  />
                );
              })}

              {/* Add Guest */}
              <div
                className="text-primary text-description mobile:text-h3-mobile cursor-pointer"
                onClick={() => {
                  setGuests([...guests, emptyGuest]);
                  setGuestsError([...guestsError, emptyGuestError]);
                }}
              >
                + <span className="underline">{t("add_guest")}</span>
              </div>
            </div>

            {/* Payment Detail Container */}
            <div>
              {/* Payment Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold mb-2">
                {t("payment_label")}
              </div>

              {/* Payment Detail - Input Container */}
              <div className="flex flex-col gap-2">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-between gap-2">
                  {/* Card Holder Name */}
                  <div className="w-[343px]">
                    <div className="text-description mobile:text-h3-mobile">
                      {t("card_holder")} <span className="text-red-600">*</span>
                    </div>
                    <Input
                      className="w-full"
                      placeholder={t("card_holder")}
                      name="cardHolderName"
                      value={paymentDetail.cardHolderName}
                      onChange={handlePaymentInputChange}
                      status={paymentError.cardHolderName ? "error" : undefined}
                    />
                    {paymentError.cardHolderName && (
                      <div className="error">{paymentError.cardHolderName}</div>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="w-[343px]">
                    <div className="text-description mobile:text-h3-mobile flex justify-between items-center">
                      <div>
                        {t("card_number")}
                        <span className="text-red-600">*</span>
                      </div>
                      <div className="flex">
                        <img
                          src={cardTypeToCardImg.visa}
                          alt="cardType"
                          style={{
                            height: "17px",
                            width: "40px",
                            objectFit: "cover",
                            filter:
                              cardType === "visa" ? "none" : "grayscale(100%)",
                          }}
                        />
                        <img
                          src={cardTypeToCardImg.mastercard}
                          alt="cardType"
                          style={{
                            height: "17px",
                            width: "40px",
                            objectFit: "cover",
                            filter:
                              cardType === "mastercard"
                                ? "none"
                                : "grayscale(100%)",
                          }}
                        />
                        <img
                          src={cardTypeToCardImg.amex}
                          alt="cardType"
                          style={{
                            height: "17px",
                            width: "40px",
                            objectFit: "cover",
                            filter:
                              cardType === "amex" ? "none" : "grayscale(100%)",
                          }}
                        />
                        <img
                          src={cardTypeToCardImg.discover}
                          alt="cardType"
                          style={{
                            height: "17px",
                            width: "40px",
                            objectFit: "cover",
                            filter:
                              cardType === "discover"
                                ? "none"
                                : "grayscale(100%)",
                          }}
                        />
                      </div>
                    </div>
                    <Cleave
                      placeholder={t("card_number")}
                      options={{
                        creditCard: true,
                        onCreditCardTypeChanged,
                      }}
                      name="cardNumber"
                      value={paymentDetail.cardNumber}
                      onChange={handlePaymentInputChange}
                      className="input-n"
                      style={{
                        border: paymentError.cardNumber ? "1px solid red" : "",
                      }}
                    />
                    {paymentError.cardNumber && (
                      <div className="error">{paymentError.cardNumber}</div>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap justify-between gap-2">
                  {/* Exp Date */}
                  <div className="w-[343px]">
                    <div className="text-description mobile:text-h3-mobile">
                      {t("expiration_date")}{" "}
                      <span className="text-red-600">*</span>
                    </div>
                    <DatePicker
                      className="w-full"
                      placeholder={t("expiration_date_default")}
                      onChange={handleExpDateChange}
                      format={"MM/YYYY"}
                      picker="month"
                      defaultValue={
                        paymentDetail.expDate
                          ? dayjs(paymentDetail.expDate, "MM-YYYY")
                          : undefined
                      }
                      status={paymentError.expDate ? "error" : undefined}
                    />
                    {paymentError.expDate && (
                      <div className="error">{paymentError.expDate}</div>
                    )}
                  </div>

                  {/* CVV */}
                  <div className="w-[343px]">
                    <div className="text-description mobile:text-h3-mobile">
                      {t("CVV")} <span className="text-red-600">*</span>
                    </div>
                    <Input.Password
                      className="w-full"
                      placeholder="CVV"
                      name="cvv"
                      value={paymentDetail.cvv}
                      onChange={handlePaymentInputChange}
                      maxLength={3}
                      status={paymentError.cvv ? "error" : undefined}
                    />
                    {paymentError.cvv && (
                      <div className="error">{paymentError.cvv}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Special Request Container */}
            <div>
              <div className="text-h2 mobile:text-h2-mobile font-bold">
                {t("special_request")}
              </div>
              <div className="w-full">
                <TextArea
                  className="w-full"
                  rows={2}
                  placeholder={t("special_request")}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  value={specialReq}
                />
              </div>
            </div>

            {/* Cancellation Policy Container */}
            <div className="flex flex-col gap-2">
              <div className="text-h2 mobile:text-h2-mobile font-bold">
                {t("cancel_policy")}
              </div>
              <div className="w-full text-description mobile:text-h3-mobile">
                <div>{t("cancel_policy_description_header")}</div>
                <br />
                <div>{t("cancel_policy_description")}</div>
                <div>{t("cancel_policy_description2")} </div>
                <div>{t("cancel_policy_description3")}</div>
                <br />
                <div>{t("cancel_policy_description_header2")}</div>
                <br />
                <div>{t("cancel_policy_description4")}</div>
                <div>{t("cancel_policy_description5")} </div>
                <div>{t("cancel_policy_description6")}</div>
                <div>{t("cancel_policy_description7")}</div>
              </div>
            </div>

            {/* PDPA */}
            <div>
              <div className="flex text-description mobile:text-h3-mobile items-center gap-x-2">
                <Checkbox
                  onChange={onCheckboxChange}
                  checked={bookingDetail.isCheckedPDPA}
                />
                <div>
                  {t("terms_condition")}
                  <span
                    className="text-primary cursor-pointer underline"
                    onClick={showModal}
                  >
                    {t("terms_condition_2")}
                  </span>
                </div>
              </div>
              {checkboxError && (
                <div className="error-cb pt-[2px] text-[12px] text-[#FF0000]">
                  {checkboxError}
                </div>
              )}
            </div>
            {/* Modal PDPA */}
            <Modal
              title={t("terms_condition_label")}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              width={isMobile ? 350 : 800}
              centered={isMobile ? false : true}
            >
              <div className="flex flex-col gap-y-4 py-2 text-h5 mobile:text-h3-mobile mobile:gap-y-2">
                <div>1) {t("terms_condition_d1")}</div>
                <div>2) {t("terms_condition_d2")}</div>
                <div>3) {t("terms_condition_d3")}</div>
                <div>4) {t("terms_condition_d4")}</div>
                <div>5) {t("terms_condition_d5")}</div>
                <div>6) {t("terms_condition_d6")}</div>
                <div>7) {t("terms_condition_d7")}</div>
              </div>
              <div className="text-h3 mobile:text-h2-mobile font-bold pt-6 pb-2">
                {t("privacy_policy_label")}
              </div>
              <div className="flex flex-col gap-y-4 py-2 text-h5 mobile:text-h3-mobile mobile:gap-y-2">
                <div>1) {t("terms_condition_d8")}</div>
                <div>2) {t("terms_condition_d9")}</div>
                <div>3) {t("terms_condition_d10")}</div>
                <div>4) {t("terms_condition_d11")}</div>
                <div>5) {t("terms_condition_d12")}</div>
              </div>
            </Modal>
          </div>
          {/* Right Container */}
          <div className="flex flex-col w-[509px] mobile:w-[330px] sticky mobile:right-0 top-[20vh] mobile:static items-center">
            <SummaryCard
              page="reservation-and-guest-detail"
              isDisabledConfirm={isDisabledConfirm}
              t={t}
              lng={lng}
              router={router}
            />
          </div>
        </div>
      </div>
      <div className="mt-[50px] mobile:mt-[20px]">
        <Footer t={t} />
      </div>
    </div>
  );
};

export default ReservationAndGuestDetail;

interface GuestDetailInputContainerProps {
  handleInputChange: (index: number, value: string, name: string) => void;
  index: number;
  guest: Guest;
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
}

const GuestDetailInputContainer: React.FC<GuestDetailInputContainerProps> = ({
  handleInputChange,
  index,
  guest,
  guests,
  setGuests,
}) => {
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState<any[]>([]);
  const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const { guestsError, setGuestsError } = useStore();
  const formatGuestDetail: any = {
    firstName: t("first_name"),
    lastName: t("last_name"),
    gender: t("gender"),
    birthDate: t("birthdate"),
    email: t("email"),
    phoneNumber: t("phone_number"),
    country: t("country"),
    zipCode: t("zip_code"),
    address: t("address"),
    id: t("id"),
  };

  const idTypeToid: any = {
    id: t("national_id"),
    passportNumber: t("passport_number"),
    drivingLicence: t("driving_licence"),
  };

  useEffect(() => {
    const s: any[] = State.getStatesOfCountry(countryCode).map(
      (country: any) => {
        return {
          value: country.name,
          label: country.name,
          group: "city",
        };
      }
    );
    setCity(s);
  }, [countryCode]);

  const handleChange = (e: any, fieldNames?: any) => {
    if (fieldNames) {
      handleInputChange(index, fieldNames.value, fieldNames.group);
      let ud = guestsError;
      if (fieldNames.value === "") {
        ud[index] = {
          ...ud[index],
          [fieldNames.group]:
            fieldNames.group === "id"
              ? idTypeToid[guest.idType] + t("isRequired")
              : formatGuestDetail[fieldNames.group] + t("isRequired"),
        };
        setGuestsError(ud);
      } else {
        ud[index] = {
          ...ud[index],
          [fieldNames.group]: "",
        };
        setGuestsError(ud);
      }
      if (fieldNames.group === "country") {
        setCountryCode(fieldNames.countryCode);
      }
    } else {
      handleInputChange(index, e.target.value, e.target.name);
      let ud = guestsError;
      if (e.target.value === "") {
        ud[index] = {
          ...ud[index],
          [e.target.name]:
            e.target.name === "id"
              ? idTypeToid[guest.idType] + t("isRequired")
              : formatGuestDetail[e.target.name] + t("isRequired"),
        };
        setGuestsError(ud);
      } else if (e.target.name === "zipCode") {
        const zipCode = e.target.value;
        const isValid = zipCodeRegex.test(zipCode);
        if (!isValid) {
          ud[index] = { ...ud[index], zipCode: t("zipCodeFormat") };
          setGuestsError(ud);
        } else {
          ud[index] = { ...ud[index], zipCode: "" };
          setGuestsError(ud);
        }
      } else if (e.target.name === "email") {
        const email = e.target.value;
        const isValid = emailRegex.test(email);
        if (!isValid) {
          ud[index] = { ...ud[index], email: t("emailFormat") };
          setGuestsError(ud);
        } else {
          ud[index] = { ...ud[index], email: "" };
          setGuestsError(ud);
        }
      } else {
        ud[index] = {
          ...ud[index],
          [e.target.name]: "",
        };
        setGuestsError(ud);
      }
    }
  };

  const handleBirthDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    let ud = guestsError;
    if (dateString === "") {
      ud[index] = {
        ...ud[index],
        ["birthDate"]: formatGuestDetail["birthDate"] + t("isRequired"),
      };
      setGuestsError(ud);
    } else {
      ud[index] = {
        ...ud[index],
        ["birthDate"]: "",
      };
      setGuestsError(ud);
    }
    handleInputChange(index, dateString, "birthDate");
  };

  return (
    <div className="flex flex-col gap-2 my-2">
      {/* Row 1 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* First Name */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("first_name")} <span className="text-red-600">*</span>
          </div>
          <Input
            className="w-full"
            placeholder={t("first_name")}
            name="firstName"
            value={guest.firstName}
            onChange={handleChange}
            status={guestsError[index].firstName ? "error" : undefined}
          />
          {guestsError[index].firstName && (
            <div className="error">{guestsError[index].firstName}</div>
          )}
        </div>

        {/* Middle Name */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("middle_name")}
          </div>
          <Input
            className="w-full"
            placeholder={t("middle_name")}
            name="middleName"
            value={guest.middleName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("last_name")} <span className="text-red-600">*</span>
          </div>
          <Input
            className="w-full"
            placeholder={t("last_name")}
            name="lastName"
            value={guest.lastName}
            onChange={handleChange}
            status={guestsError[index].lastName ? "error" : undefined}
          />
          {guestsError[index].lastName && (
            <div className="error">{guestsError[index].lastName}</div>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* Gender */}
        <div className="w-[343px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("gender")} <span className="text-red-600">*</span>
          </div>
          <Select
            className="w-full"
            placeholder={t("gender_default")}
            options={[
              { value: "male", label: t("male"), group: "gender" },
              { value: "female", label: t("female"), group: "gender" },
              { value: "other", label: t("other"), group: "gender" },
            ]}
            onChange={handleChange}
            defaultValue={guest.gender ? guest.gender : undefined}
            status={guestsError[index].gender ? "error" : undefined}
          />
          {guestsError[index].gender && (
            <div className="error">{guestsError[index].gender}</div>
          )}
        </div>

        {/* Birth Date */}
        <div className="w-[343px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("birthdate")} <span className="text-red-600">*</span>
          </div>
          <DatePicker
            className="w-full"
            format={"DD-MM-YYYY"}
            placeholder={t("birthdate_default")}
            onChange={handleBirthDateChange}
            defaultValue={
              guest.birthDate ? dayjs(guest.birthDate, "DD-MM-YYYY") : undefined
            }
            status={guestsError[index].birthDate ? "error" : undefined}
          />
          {guestsError[index].birthDate && (
            <div className="error">{guestsError[index].birthDate}</div>
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* Email */}
        <div className="w-[343px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("email")} <span className="text-red-600">*</span>
          </div>
          <Input
            className="w-full"
            placeholder={t("email")}
            name="email"
            value={guest.email}
            onChange={handleChange}
            status={guestsError[index].email ? "error" : undefined}
          />
          {guestsError[index].email && (
            <div className="error">{guestsError[index].email}</div>
          )}
        </div>

        {/* Phone Number */}
        <div className="w-[343px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("phone_number")} <span className="text-red-600">*</span>
          </div>
          <div className="flex flex-col">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              name="phoneNumber"
              value={guest.phoneNumber}
              onChange={(value) => {
                if (value) {
                  let ud = guestsError;
                  if (value === "") {
                    ud[index] = {
                      ...ud[index],
                      ["phoneNumber"]:
                        formatGuestDetail["phoneNumber"] + t("isRequired"),
                    };
                    setGuestsError(ud);
                  } else {
                    ud[index] = {
                      ...ud[index],
                      ["phoneNumber"]: "",
                    };
                    setGuestsError(ud);
                  }
                  handleInputChange(index, value, "phoneNumber");
                }
              }}
              className="input-n"
              placeholder={t("phone_number")}
              style={{
                border: guestsError[index].phoneNumber ? "1px solid red" : "",
              }}
            />
            {guestsError[index].phoneNumber && (
              <div className="error">{guestsError[index].phoneNumber}</div>
            )}
          </div>
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* Country */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("country")} <span className="text-red-600">*</span>
          </div>
          <Select
            className="w-full"
            placeholder={t("country_default")}
            options={Country.getAllCountries().map((country: any) => {
              return {
                value: country.name,
                countryCode: country.isoCode,
                label: country.name,
                group: "country",
              };
            })}
            onChange={handleChange}
            defaultValue={guest.country ? guest.country : undefined}
            status={guestsError[index].country ? "error" : undefined}
          />
          {guestsError[index].country && (
            <div className="error">{guestsError[index].country}</div>
          )}
        </div>

        {/* City */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("city_state")}
          </div>
          <Select
            className="w-full"
            placeholder={t("city_state_default")}
            options={city}
            onChange={handleChange}
            defaultValue={guest.city ? guest.city : undefined}
          />
        </div>

        {/* Zip code */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("zip_code")} <span className="text-red-600">*</span>
          </div>
          <Input
            className="w-full"
            placeholder={t("zip_code")}
            name="zipCode"
            value={guest.zipCode}
            onChange={handleChange}
            status={guestsError[index].zipCode ? "error" : undefined}
          />
          {guestsError[index].zipCode && (
            <div className="error">{guestsError[index].zipCode}</div>
          )}
        </div>
      </div>

      {/* Row 5 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* Address  */}
        <div className="w-full">
          <div className="text-description mobile:text-h3-mobile">
            {t("address")} <span className="text-red-600">*</span>
          </div>
          <TextArea
            className="w-full"
            rows={2}
            placeholder={t("address")}
            name="address"
            value={guest.address}
            onChange={handleChange}
            status={guestsError[index].address ? "error" : undefined}
          />
          {guestsError[index].address && (
            <div className="error">{guestsError[index].address}</div>
          )}
        </div>
      </div>

      {/* Row 6 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* ID , Passport Number , Driving Licence */}
        <div className="w-full">
          <div className="text-description mobile:text-h3-mobile">
            {t("id_card")} <span className="text-red-600">*</span>
          </div>
          <div className="flex justify-between flex-wrap gap-1">
            <div className="w-[212px]">
              <Select
                className="w-full"
                placeholder={t("select")}
                options={[
                  { value: "id", label: t("national_id"), group: "idType" },
                  {
                    value: "passportNumber",
                    label: t("passport_number"),
                    group: "idType",
                  },
                  {
                    value: "drivingLicence",
                    label: t("driving_licence"),
                    group: "idType",
                  },
                ]}
                onChange={handleChange}
                defaultValue={guest.idType ? guest.idType : undefined}
                status={guestsError[index].idType ? "error" : undefined}
              />
              {guestsError[index].idType && (
                <div className="error">{guestsError[index].idType}</div>
              )}
            </div>
            <div className="w-[470px]">
              <Input
                disabled={!guest.idType}
                className="w-full"
                placeholder={
                  guest["idType"]
                    ? (idTypeToid as any)[guest["idType"]]
                    : t("id_card_number")
                }
                name="id"
                value={guest.id}
                onChange={handleChange}
                status={guestsError[index].id ? "error" : undefined}
              />
              {guestsError[index].id && (
                <div className="error">{guestsError[index].id}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Remove Guest */}
      {index > 0 && (
        <div
          className="text-red-700 text-description mobile:text-h3-mobile cursor-pointer"
          onClick={() => {
            setGuests([...guests.slice(0, index), ...guests.slice(index + 1)]);
            setGuestsError([
              ...guestsError.slice(0, index),
              ...guestsError.slice(index + 1),
            ]);
          }}
        >
          - <span className="underline">{t("remove_guest")}</span>
        </div>
      )}

      {/* HR Line */}
      <hr className="my-2" />
    </div>
  );
};
