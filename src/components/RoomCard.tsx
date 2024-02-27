"use client";
import React from "react";
import { Divider, Button, DatePicker, DatePickerProps } from "antd";
import useStore from "@/hooks/useStore";

// import React from 'react';
type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>["onChange"]>
>[0];

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
dayjs().format();

import { useRouter } from "next/navigation";

export default function RoomCard({
  roomName,
  maxGuest,
  bedType,
  roomSize,
  roomPrice,
  roomImage,
  roomAmenities,
  roomDetail,
  roomType,
  reducedRate,
  isAvailable,
  disabledDate,
  t,
}: {
  roomName: string;
  maxGuest: number;
  bedType: string;
  roomSize: number;
  roomPrice: number;
  roomImage: string;
  roomAmenities: string[];
  roomDetail: string;
  roomType: string;
  reducedRate: number;
  isAvailable: boolean;
  disabledDate: DatePickerProps["disabledDate"];
  t: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const { RangePicker } = DatePicker;
  const router = useRouter();

  const { bookingDetail, setBookingDetail, exchangeRate, currency } =
    useStore();
  const [startDate, setStartDate] = useState(bookingDetail.startDate);
  const [endDate, setEndDate] = useState(bookingDetail.endDate);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookNowClick = (roomType: string) => {
    // Create the updatedBookingDetail object with the new room number
    const updatedBookingDetail = {
      ...bookingDetail,
      [`${roomType}RoomNumber`]: 1,
    };
    // disable
    // console.log(updatedBookingDetail);

    // Set the updated bookingDetail
    setBookingDetail(updatedBookingDetail);
  };

  const handleFindAvailableDate = (roomType: string) => {
    throw new Error("Function not implemented.");
  };

  return (
    <div
      className={`flex flex-col w-[58vw] rounded-lg [box-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] mobile:w-[80vw]
      `}
      style={{ backgroundColor: "#E7EFF6", color: "black" }}
    >
      <p className="text-h4 font-bold m-[2vw] mobile:text-h4-mobile">
        {roomName}
      </p>
      <div className="flex flex-row ml-[2vw] mb-[2vw]">
        {/* mock image */}
        <img src={roomImage} alt="room" className="h-[15vw]" />
        {/* room description */}
        <text className="text-h5 ml-[2vw] mr-[2vw]  mobile:text-h5-mobile">
          {t("maximum_guest")}: {maxGuest} <br />
          {t("size")}: {roomSize} m&sup2; <br />
          {t("bed_type")}: {bedType} <br />
          <div className="text-body mt-[1vh] mobile:text-h5-mobile">
            {t("amenities")}: {roomAmenities.map((n) => " • " + n)}
          </div>{" "}
          <br />
          {isExpanded && (
            <div className="mt-[1vh]">
              {/* More detailed information */}
              <text className="text-body ml-[2vw] mr-[2vw]  mobile:text-h5-mobile">
                {roomDetail}
              </text>
            </div>
          )}
          {/* Toggle button */}
          <button
            onClick={toggleExpansion}
            className="mt-[1vw] float-right"
            style={{ color: "#4B86B4" }}
          >
            {isExpanded ? t("show_less") : t("show_more")}
          </button>
        </text>
      </div>
      <Divider className="my-[2vh]" />

      {isAvailable ? (
        <div className="flex justify-end mr-[2vw] mb-[2vh] items-center">
          {bookingDetail.codePromotion == "valid001" ? (
            <text className="text-h5 mr-[2vw] font-bold mobile:text-h5-mobile line-through">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(roomPrice * exchangeRate)}
            </text>
          ) : null}
          <text className="text-h5 mr-[2vw] font-bold mobile:text-h5-mobile">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(roomPrice * exchangeRate * reducedRate)}
          </text>
          <Button type="primary" onClick={() => handleBookNowClick(roomType)}>
            {t("book_now")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-[1vh] mb-[2vh]">
          <div className="text-body mobile:text-h5-mobile">
            <b>
              {bookingDetail.startDate} - {bookingDetail.endDate}
            </b>{" "}
            {t("are_unavailable")}
          </div>
          {openCalendar ? (
            <div>
              <div className="w-[50vw] flex flex-col items-center">
                <RangePicker
                  value={[
                    dayjs(startDate, "DD-MM-YYYY"),
                    dayjs(endDate, "DD-MM-YYYY"),
                  ]}
                  format={["DD-MM-YYYY"]}
                  disabledDate={disabledDate}
                  style={{ width: "300px", height: "30px" }}
                  onChange={(RangePicker, dateStrings: [string, string]) => {
                    const [startDate, endDate] = dateStrings;
                    if (startDate === "" && endDate === "") {
                      console.log("keep the same");
                    } else {
                      setStartDate(startDate);
                      setEndDate(endDate);
                    }
                  }}
                />
                <Divider className="my-[2vh]" />
              </div>
              <Button
                type="primary"
                style={{ width: "100px", height: "30px" }}
                onClick={() => {
                  if (!(startDate === "") || !(endDate === "")) {
                    const updatedBookingDetail = {
                      ...bookingDetail,
                      startDate,
                      endDate,
                    };
                    setBookingDetail(updatedBookingDetail);
                    router.replace(
                      `/search-result/startDate=${startDate}&endDate=${endDate}&adults=${bookingDetail.adultNumber}&childrens=${bookingDetail.childrenNumber}`
                    );
                  }
                }}
                className="float-right"
              >
                {t("modify2")}
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              style={{ width: "200px", height: "30px" }}
              onClick={() => setOpenCalendar(true)}
            >
              {t("find_available_date")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
