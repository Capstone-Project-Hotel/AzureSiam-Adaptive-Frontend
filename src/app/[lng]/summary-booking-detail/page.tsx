"use client";

import React from "react";
import useStore from "@/hooks/useStore";
import { gu } from "date-fns/locale";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/SummaryCard";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
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

const cardTypeToCardImg = {
  amex: "https://venturebeat.com/wp-content/uploads/2023/05/blue.jpg?fit=750%2C422&strip=all",
  visa: "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-visa.png",
  mastercard:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-mastercard.png",
  discover:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-discover.png",
};

const additionalServiceCardExample = {
  one: "https://cdn.discordapp.com/attachments/1145653185059495958/1186614046435319858/image.png?ex=6593e372&is=65816e72&hm=18040f1611713df909861ded1d940efea35e3feb84d9db970596ef45c91344ed&",
  two: "https://cdn.discordapp.com/attachments/1145653185059495958/1186614215696470036/image.png?ex=6593e39b&is=65816e9b&hm=e1fb456b3182b9f712fa3c75d390b632e784a389159deae8bc1da9cf78781755&",
};

interface ReservationAndGuestDetailProps {
  params: { lng: any };
}

const BookingConfirmation: React.FC<ReservationAndGuestDetailProps> = ({
  params: { lng },
}) => {
  const { t } = useTranslation(lng);
  const { guests, paymentDetail, specialReq, cardType } = useStore();

  if (guests[0].firstName === "") {
    redirect("/");
  }

  return (
    // Page Container
    <div>
      <div className="z-50 w-[100vw] fixed top-0">
        <Topbar lng={lng} />
      </div>
      <div className="flex justify-center mt-[100px]">
        {/* Main Container */}
        <div className="w-[1440px] mobile:w-[330px] flex items-start flex-wrap py-10 mobile:py-1 px-10 mobile:px-0">
          {/* Left Container */}
          <div className="w-[70%] mobile:w-[330px] flex flex-col gap-10 pr-10 mobile:pr-0 mt-10 mobile:mt-0 mobile:pb-10">
            <div className="flex items-center gap-5">
              <Link href={`/${lng}/reservation-and-guest-detail`}>
                <LeftOutlined className="text-[36px] mobile:text-[25px]" />
              </Link>
              <div className="text-h4 mobile:text-h4-mobile">{t("modify")}</div>
            </div>
            {/* Guest Detail Container */}
            <div>
              {/* Guest Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary mb-2">
                {t("guest_detail_label")}
              </div>

              {/* Guest Detail - Input Container */}
              <div className="flex gap-8 mobile:gap-5 flex-col">
                {guests.map((guest, index) => {
                  return (
                    <GuestDetailInputContainer
                      key={index}
                      guest={guest}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>

            {/* Payment Detail Container */}
            <div>
              {/* Payment Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary mb-2">
                {t("payment_label")}
              </div>

              {/* Payment Detail - Input Container */}
              <div className="flex flex-col">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-between">
                  {/* Card Holder Name */}
                  <Field
                    fieldName={t("card_holder")}
                    value={paymentDetail.cardHolderName}
                  />

                  {/* Card Number */}
                  <Field
                    fieldName={t("card_number")}
                    value={paymentDetail.cardNumber}
                  >
                    <div>
                      {cardType &&
                      Object.keys(cardTypeToCardImg).includes(cardType) ? (
                        <img
                          src={(cardTypeToCardImg as any)[cardType]}
                          alt="cardType"
                          style={{ height: "17px" }}
                        />
                      ) : null}
                    </div>
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap justify-between">
                  {/* Exp Date */}
                  <Field
                    fieldName={t("expiration_date")}
                    value={paymentDetail.expDate}
                  />

                  {/* CVV */}
                  <Field fieldName={t("cvv")} value={"•••"} />
                </div>
              </div>
            </div>

            {/* HR Line */}
            {/* <hr className="my-2 mobile:w-[60vw]" /> */}

            {/* Special Request Container */}
            <div>
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary mb-2">
                {t("special_request")}
              </div>
              <div className="w-full text-h5 mobile:text-h4-mobile">
                {specialReq === "" ? "-" : specialReq}
              </div>
            </div>
          </div>
          {/* Right Container */}
          <div className="flex flex-col w-[30%] mobile:w-[330px] sticky mobile:right-0 top-[20vh] mobile:static items-center">
            <SummaryCard
              page="summary-booking-detail"
              isDisabledConfirm={true}
              t={t}
              lng={lng}
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

export default BookingConfirmation;

interface GuestDetailInputContainerProps {
  guest: Guest;
  t: any;
}

const GuestDetailInputContainer: React.FC<GuestDetailInputContainerProps> = ({
  guest,
  t,
}) => {
  const idTypeToid = {
    id: t("national_id"),
    passportNumber: t("passport_number"),
    drivingLicence: t("driving_licence"),
  };
  return (
    <div className="flex flex-col">
      {/* Row 1 */}
      <div className="flex flex-wrap">
        {/* First Name */}
        <Field fieldName={t("first_name")} value={guest.firstName} />

        {/* Middle Name */}
        <Field
          fieldName={t("middle_name")}
          value={guest.middleName === "" ? "-" : guest.middleName}
        />

        {/* Last Name */}
        <Field fieldName={t("last_name")} value={guest.lastName} />
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap">
        {/* Gender */}
        <Field fieldName={t("gender")} value={t(guest.gender)} />

        {/* Birth Date */}
        <Field fieldName={t("birthdate")} value={guest.birthDate} />
      </div>

      {/* Row 3 */}
      <div className="flex flex-wrap">
        {/* Email */}
        <Field fieldName={t("email")} value={guest.email} />

        {/* Phone Number */}
        <Field fieldName={t("phone_number")} value={guest.phoneNumber} />
      </div>

      {/* Row 4 */}
      <div className="flex flex-wrap">
        {/* Country */}
        <Field fieldName={t("country")} value={guest.country} />

        {/* City */}
        <Field fieldName={t("city_state")} value={guest.city} />

        {/* Zip code */}
        <Field fieldName={t("zip_code")} value={guest.zipCode} />
      </div>

      {/* Row 5 */}
      <div className="flex flex-wrap justify-between">
        {/* Address  */}
        <Field fieldName={t("address")} value={guest.address} />
      </div>

      {/* Row 6 */}
      <div className="flex flex-wrap justify-between">
        {/* ID , Passport Number , Driving Licence */}
        <Field
          fieldName={(idTypeToid as any)[guest["idType"]] || t("national_id")}
          value={guest.id}
        />
      </div>

      {/* HR Line */}
      {/* <hr className="my-2 mobile:w-[60vw]" /> */}
    </div>
  );
};

const Field = ({
  fieldName,
  value,
  children,
}: {
  fieldName: string;
  value: string;
  children?: any;
}) => {
  return (
    <div className="w-[243px] flex-1 border-solid border-1 border-black-400 border p-3.5">
      <div className="text-body mobile:text-h4-mobile opacity-[60%]">
        {fieldName}
      </div>
      <div className="text-h5 mobile:text-h4-mobile break-all flex items-center">
        {value}
        {children}
      </div>
    </div>
  );
};
