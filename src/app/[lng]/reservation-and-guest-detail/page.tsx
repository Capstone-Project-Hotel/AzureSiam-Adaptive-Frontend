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
  amex: "https://cdn.discordapp.com/attachments/457166097230069773/1186233714523512852/vinnytsia-ukraine-september-6-2023-600nw-2358048941.webp?ex=6592813c&is=65800c3c&hm=b37ff0d726d6a4b7c5994550407f23d9a6401cfb3fa44696c5425531b322b02d&",
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
  } = useStore();
  const [isCheckedPDPA, setIsCheckedPDPA] = useState<boolean>(false);
  const [isDisabledConfirm, setIsDisabledConfirm] = useState<boolean>(false);

  const router = useRouter();

  const handleReselect = () => {
    router.back();
  };

  const handleInputChange = (index: number, value: string, name: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [name]: value };
    setGuests(updatedGuests);
    isDisabledConfirmF(updatedGuests, paymentDetail);
  };

  const handlePaymentInputChange = (e: any) => {
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
      "city",
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

              <div className="text-h2 mobile:text-h2-mobile">
                {/* Re-select your room for booking */}
                {t("reselect_label")}
              </div>
            </div>

            {/* Additional Services Container */}
            <div>
              <div className="text-h2 mobile:text-h2-mobile font-bold">
                {/* Additional Services */}
                {t("additional_label")}
              </div>
              <div className="flex gap-5">
                <AdditionalServiceCard
                  serviceName={t("service_name1")}
                  // serviceName={t("service_name1")}
                  unit=""
                  // unit={t("service_unit1")}
                  price={299}
                  serviceImage="https://cdn.discordapp.com/attachments/863762167340990494/1199360857935720530/image_32.png?ex=65c242d7&is=65afcdd7&hm=5fa7797322db7c00c453a1a1c6693ee3c5435fc146a53c4714ad50af0ca89006&"
                  t={t}
                />
                <AdditionalServiceCard
                  serviceName={t("service_name2")}
                  // serviceName={t("service_name2")}
                  unit=""
                  // unit={t("service_unit2")}
                  price={499}
                  serviceImage="https://cdn.discordapp.com/attachments/863762167340990494/1199360857692446740/cover.png?ex=65c242d7&is=65afcdd7&hm=b785dd4d923b8f7552f094c8abf6df8bb5f59e891d2b69d4afd479b2289a74be&"
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
                onClick={() => setGuests([...guests, emptyGuest])}
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
                    />
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
                    />
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
                          ? dayjs(paymentDetail.expDate)
                          : undefined
                      }
                    />
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
                    />
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
              </div>
            </div>

            {/* PDPA */}
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
            {/* Modal PDPA */}
            <Modal
              title={t("terms_condition_2")}
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
            </Modal>
          </div>
          {/* Right Container */}
          <div className="flex flex-col w-[509px] mobile:w-[330px] sticky mobile:right-0 top-[190px] mobile:static items-center">
            <SummaryCard
              page="reservation-and-guest-detail"
              isDisabledConfirm={isDisabledConfirm}
              t={t}
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

  const idTypeToid = {
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
      if (fieldNames.group === "country") {
        setCountryCode(fieldNames.countryCode);
      }
    } else {
      handleInputChange(index, e.target.value, e.target.name);
    }
  };

  const handleBirthDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
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
          />
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
          />
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
          />
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
            defaultValue={guest.birthDate ? dayjs(guest.birthDate) : undefined}
          />
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
          />
        </div>

        {/* Phone Number */}
        <div className="w-[343px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("phone_number")} <span className="text-red-600">*</span>
          </div>
          <div className="flex">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              name="phoneNumber"
              value={guest.phoneNumber}
              onChange={(value) => {
                if (value) handleInputChange(index, value, "phoneNumber");
              }}
              className="input-n"
              placeholder={t("phone_number")}
            />
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
          />
        </div>

        {/* City */}
        <div className="w-[212px]">
          <div className="text-description mobile:text-h3-mobile">
            {t("city")} <span className="text-red-600">*</span>
          </div>
          <Select
            className="w-full"
            placeholder={t("city_default")}
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
          />
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
          />
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
              />
            </div>
            <div className="w-[470px]">
              <Input
                className="w-full"
                placeholder={
                  guest["idType"]
                    ? (idTypeToid as any)[guest["idType"]]
                    : t("id_card_number")
                }
                name="id"
                value={guest.id}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Remove Guest */}
      {index > 0 && (
        <div
          className="text-red-700 text-description mobile:text-h3-mobile cursor-pointer"
          onClick={() =>
            setGuests([...guests.slice(0, index), ...guests.slice(index + 1)])
          }
        >
          - <span className="underline">Remove Guest</span>
        </div>
      )}

      {/* HR Line */}
      <hr className="my-2" />
    </div>
  );
};
