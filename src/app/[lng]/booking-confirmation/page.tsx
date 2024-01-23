"use client";

import React from "react";
import useStore from "@/hooks/useStore";
import { gu } from "date-fns/locale";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/SummaryCard";
import Topbar from "@/components/Topbar";
import { useTranslation } from "@/app/i18n/client";
import { CheckCircleFilled, CiCircleFilled } from "@ant-design/icons";
import { green } from "@mui/material/colors";
import Footer from "@/components/Footer";
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

// const idTypeToid = {
//   id: "National ID",
//   passportNumber: "Passport Number",
//   drivingLicence: "Driving Licence",
// };

const cardTypeToCardImg = {
  amex: "https://venturebeat.com/wp-content/uploads/2023/05/blue.jpg?fit=750%2C422&strip=all",
  visa: "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-visa.png",
  mastercard:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-mastercard.png",
  discover:
    "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-discover.png",
};

interface ReservationAndGuestDetailProps {
  params: { lng: any };
}

const BookingConfirmation: React.FC<ReservationAndGuestDetailProps> = ({
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

  if (guests[0].firstName === "") {
    redirect("/");
  }

  if (bookingDetail.bookingId === "") {
    const bookingId = Math.floor(100000 + Math.random() * 900000).toString();
    const updatedBookingDetail = {
      ...bookingDetail,
      bookingId: bookingId,
    };
    console.log(bookingId);

    setBookingDetail(updatedBookingDetail);
  }

  return (
    // Page Container
    <div>
      <div className="z-30 w-[100vw] fixed top-0">
        <Topbar lng={lng} />
      </div>
      <div className="mt-[150px] mobile:mt-[80px] text-center">
        <div className="text-h1 flex flex-row gap-2 justify-center mobile:text-h1-mobile">
          <CheckCircleFilled
            style={{ color: "green" }}
            className="mobile:text-lg"
          />
          <div className="font-bold text-primary">
            {t("successful_booking")}
          </div>
        </div>
        <div className="text-h2 font-bold text-primary mobile:text-h2-mobile">
          {t("booking_id")}: {bookingDetail.bookingId}
        </div>
      </div>
      <div className="flex justify-center mt-[15px] mobile:flex-col mobile:items-center overflow-hidden">
        {/* Main Container */}
        <div className="w-[1440px] mobile:w-[330px] flex items-start flex-wrap gap-10 py-10 mobile:py-1 px-10 mobile:px-0">
          {/* Left Container */}
          <div className="w-[729px] mobile:w-[330px] flex flex-col gap-10 mobile:gap-1">
            {/* Guest Detail Container */}
            <div>
              {/* Guest Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary">
                {t("guest_detail_label")}
              </div>
              {/* Guest Detail - Input Container */}
              {guests.map((guest, index) => {
                return (
                  <GuestDetailInputContainer key={index} guest={guest} t={t} />
                );
              })}
            </div>
            {/* Payment Detail Container */}
            <div>
              {/* Payment Detail */}
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary mb-2">
                {t("payment_label")}
              </div>
              {/* Payment Detail - Input Container */}
              <div className="flex flex-col gap-2">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-between gap-2">
                  {/* Card Holder Name */}
                  <div className="w-full">
                    <div className="text-h5 mobile:text-h4-mobile">
                      {t("card_holder")} : {paymentDetail.cardHolderName}
                    </div>
                  </div>
                  {/* Card Number */}
                  <div className="w-full">
                    <div className="text-description mobile:text-h3-mobile flex gap-2 items-center">
                      <div className="text-h5 mobile:text-h4-mobile">
                        {t("card_number")} : {paymentDetail.cardNumber}
                      </div>
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
                    </div>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="flex flex-wrap justify-between gap-2">
                  {/* Exp Date */}
                  <div className="w-[343px]">
                    <div className="text-h5 mobile:text-h4-mobile">
                      {t("expiration_date")} : {paymentDetail.expDate}
                    </div>
                  </div>
                  {/* CVV */}
                  <div className="w-[343px]">
                    <div className="text-h5 mobile:text-h4-mobile">
                      {t("cvv")} : {paymentDetail.cvv}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* HR Line */}
            <hr className="my-2 mobile:w-[65vw]" />
            {/* Special Request Container */}
            <div>
              <div className="text-h2 mobile:text-h2-mobile font-bold text-primary">
                {t("special_request")}
              </div>
              <div className="w-full text-h5 mobile:text-h4-mobile">
                {specialReq === "" ? "-" : specialReq}
              </div>
            </div>
          </div>
          {/* Right Container */}
          <div className="flex flex-col w-[509px] mobile:w-[330px] sticky mobile:right-0 top-[40px] mobile:static items-center">
            <SummaryCard
              page="booking-confirmation"
              isDisabledConfirm={true}
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
    <div className="flex flex-col gap-2 my-2">
      {/* Row 1 */}
      <div className="flex flex-wrap mobile:gap-2">
        {/* First Name */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("first_name")} : {guest.firstName}
          </div>
        </div>

        {/* Middle Name */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("middle_name")} :{" "}
            {guest.middleName === "" ? "-" : guest.middleName}
          </div>
        </div>

        {/* Last Name */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("last_name")} : {guest.lastName}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap mobile:gap-2">
        {/* Gender */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("gender")} : {t(guest.gender)}
          </div>
        </div>

        {/* Birth Date */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("birthdate")} : {guest.birthDate}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-wrap mobile:gap-2">
        {/* Email */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("email")} : {guest.email}
          </div>
        </div>

        {/* Phone Number */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("phone_number")} : {guest.phoneNumber}
          </div>
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex flex-wrap mobile:gap-2">
        {/* Country */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("country")} : {guest.country}
          </div>
        </div>

        {/* City */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("city")} : {guest.city}
          </div>
        </div>

        {/* Zip code */}
        <div className="w-[243px]">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("zip_code")} : {guest.zipCode}
          </div>
        </div>
      </div>

      {/* Row 5 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* Address  */}
        <div className="w-full">
          <div className="text-h5 mobile:text-h4-mobile">
            {t("address")} : {guest.address}
          </div>
        </div>
      </div>

      {/* Row 6 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* ID , Passport Number , Driving Licence */}
        <div className="w-full">
          <div className="text-h5 mobile:text-h4-mobile">
            {(idTypeToid as any)[guest["idType"]] || "National ID"} : {guest.id}
          </div>
        </div>
      </div>

      {/* HR Line */}
      <hr className="my-2  mobile:w-[65vw]" />
    </div>
  );
};
