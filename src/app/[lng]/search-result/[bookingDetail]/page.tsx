"use client";

import Filter from "@/components/Filter";
import SummaryCard from "@/components/SummaryCard";
import { useParams } from "next/navigation";

import dayjs from "dayjs";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
dayjs().format();

import useStore from "@/hooks/useStore";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

import type { DatePicker, DatePickerProps } from "antd";
import { useMediaQuery } from "react-responsive";
import SummaryBar from "@/components/SummaryBar";
// type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

import stdroom from "../../../../../public/stdroom.jpg";
import dlxroom from "../../../../../public/dlxroom.jpg";
import famroom from "../../../../../public/famroom.jpg";
import suiteroom from "../../../../../public/suiteroom.jpg";
import exroom from "../../../../../public/exroom.jpg";

export default function SearchResultPage({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const { t } = useTranslation(lng);

  const { bookingDetail, setBookingDetail } = useStore();

  const params = useParams();

  const decodedParams = decodeURIComponent(params.bookingDetail as string);
  const isMobile = useMediaQuery({ query: "(max-width: 431px)" });

  // Splitting the string into key-value pairs
  const keyValuePairs = decodedParams.split("&");

  // Creating an object with key-value pairs
  const paramsObject: Record<string, string> = {};
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    paramsObject[key] = value;
  });

  const { startDate, endDate, adults, childrens } = paramsObject;

  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    const updatedBookingDetail: BookingDetail = {
      ...bookingDetail,
      startDate: startDate,
      endDate: endDate,
      adultNumber: parseInt(adults),
      childrenNumber: parseInt(childrens),
      codePromotion: bookingDetail.codePromotion,
    };
    setBookingDetail(updatedBookingDetail);
    return () => {};
  }, []);

  let reducedRate = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }
  // Assuming startDate and endDate are in the format dd-mm-yyyy
  const startDateParts = bookingDetail.startDate.split("-");
  const endDateParts = bookingDetail.endDate.split("-");

  // Creating Date objects with the specified format
  const startDateFormat = new Date(
    Date.UTC(
      parseInt(startDateParts[2]),
      parseInt(startDateParts[1]) - 1,
      parseInt(startDateParts[0]),
      0,
      0,
      0
    )
  );
  const endDateFormat = new Date(
    Date.UTC(
      parseInt(endDateParts[2]),
      parseInt(endDateParts[1]) - 1,
      parseInt(endDateParts[0]),
      0,
      0,
      0
    )
  );

  const generateDateList = (start: Date, end: Date): string[] => {
    let dateList: string[] = [];
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      let dateVar = date.toLocaleDateString("en-GB");
      dateList.push(dateVar);
    }
    return dateList;
  };

  const generatedDates = generateDateList(startDateFormat, endDateFormat);

  // eslint-disable-next-line arrow-body-style
  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    const disabledDate = dayjs("25/01/2024", "DD/MM/YYYY");
    return (
      current &&
      (current < dayjs().endOf("day") || current.isSame(disabledDate, "day"))
    );
  };

  const standardUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
    "04/03/2024",
    "07/03/2024",
    "08/03/2024",
  ];

  const deluxeUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
    "29/01/2024",
    "14/02/2024",
    "15/02/2024",
  ];
  const familyUnavailableDateList = ["25/01/2024", "26/01/2024", "28/01/2024"];
  const suiteUnavailableDateList = ["25/01/2024", "26/01/2024", "28/01/2024"];
  const executiveUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
  ];

  const mockStandardRoomInformation = {
    roomName: t("std_title"),
    maxGuest: 1,
    bedType: t("single_bed"),
    roomSize: 16,
    roomPrice: 1200,
    roomImage: stdroom.src,
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("non_smoking"),
    ],
    roomDetail: t("standard_room_desc"),
    roomType: "standard",
    show:
      bookingDetail.showStandard &&
      !bookingDetail.showOnlyBalcony &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi,
    isAvailable: generatedDates.every(
      (date) => !standardUnavailableDateList.includes(date)
    ),
    disabledDate: disabledDate,
  };

  const mockDeluxeRoomInformation = {
    roomName: t("dlx_title"),
    maxGuest: 2,
    bedType: t("twin_bed"),
    roomSize: 20,
    roomPrice: 1800,
    roomImage: dlxroom.src,
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("balcony"),
      t("non_smoking"),
    ],
    roomDetail: t("deluxe_room_desc"),
    roomType: "deluxe",
    show:
      bookingDetail.showDeluxe &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi &&
      !bookingDetail.showBelowOption1,
    isAvailable: generatedDates.every(
      (date) => !deluxeUnavailableDateList.includes(date)
    ),
    disabledDate: disabledDate,
  };

  const mockFamilyRoomInformation = {
    roomName: t("fml_title"),
    maxGuest: 4,
    bedType: t("double_bed"),
    roomSize: 28,
    roomPrice: 2200,
    roomImage: famroom.src,
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("compact_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("balcony"),
      t("non_smoking"),
    ],
    roomDetail: t("family_room_desc"),
    roomType: "family",
    show:
      bookingDetail.showFamily &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2,
    isAvailable: generatedDates.every(
      (date) => !familyUnavailableDateList.includes(date)
    ),
    disabledDate: disabledDate,
  };

  const mockSuiteRoomInformation = {
    roomName: t("s_title"),
    maxGuest: 2,
    bedType: t("queen_bed"),
    roomSize: 30,
    roomPrice: 2500,
    roomImage: suiteroom.src,
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("non_smoking"),
      t("desk"),
      t("jacuzzi"),
      t("cable"),
      t("balcony"),
      t("parlor"),
      t("dinner"),
    ],
    roomDetail: t("suite_room_desc"),
    roomType: "suite",
    show:
      bookingDetail.showSuite &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2,
    isAvailable: generatedDates.every(
      (date) => !suiteUnavailableDateList.includes(date)
    ),
    disabledDate: disabledDate,
  };

  const mockExecutiveRoomInformation = {
    roomName: t("ex_title"),
    maxGuest: 4,
    bedType: t("king_bed"),
    roomSize: 40,
    roomPrice: 3000,
    roomImage: exroom.src,
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("non_smoking"),
      t("desk"),
      t("jacuzzi"),
      t("cable"),
      t("balcony"),
      t("parlor"),
      t("dinner"),
    ],
    roomDetail: t("executive_room_desc"),
    roomType: "executive",
    show:
      bookingDetail.showExecutive &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2 &&
      !bookingDetail.showBelowOption3,
    isAvailable: generatedDates.every(
      (date) => !executiveUnavailableDateList.includes(date)
    ),
    disabledDate: disabledDate,
  };

  const mockRoomInformation = [
    mockStandardRoomInformation,
    mockDeluxeRoomInformation,
    mockFamilyRoomInformation,
    mockSuiteRoomInformation,
    mockExecutiveRoomInformation,
  ];

  return (
    <div className="sr">
      <div className="z-50 sticky top-0">
        <Topbar lng={lng} />
      </div>
      <div>
        <Filter t={t} />
      </div>

      <div className="flex items-start mobile:flex-col">
        <div className="flex flex-col space-y-10 pt-[5vh] w-[65vw] mobile:w-[100vw] px-[4vw] items-center">
          {mockRoomInformation.map((room, index) =>
            room.show === true ? (
              <RoomCard
                key={index}
                roomName={room.roomName}
                maxGuest={room.maxGuest}
                bedType={room.bedType}
                roomSize={room.roomSize}
                roomPrice={room.roomPrice}
                roomImage={room.roomImage}
                roomAmenities={room.roomAmenities}
                roomDetail={room.roomDetail}
                roomType={room.roomType}
                t={t}
                isAvailable={room.isAvailable}
                disabledDate={room.disabledDate}
                reducedRate={reducedRate}
              />
            ) : null
          )}
        </div>
        <div className="flex justify-center sticky top-[15vh] mobile:static pt-[5vh] w-[35vw] mobile:w-[100vw]">
          {isMobile ? (
            <div className="fixed bottom-0 w-full">
              <SummaryBar
                page="search-result"
                isDisabledConfirm={false}
                t={t}
                lng={lng}
              />
            </div>
          ) : (
            <div>
              <SummaryCard
                page="search-result"
                isDisabledConfirm={false}
                t={t}
                lng={lng}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-[10px] mobile:mb-[51px]">
        <Footer t={t} />
      </div>
    </div>
    // <div>
    //   <div className="z-50 sticky top-0">
    //     <Topbar lng={lng} />
    //   </div>
    //   <div>
    //     <Filter t={t} />
    //   </div>

    //   <div className="flex items-start mobile:flex-col">
    //     <div className="flex flex-col space-y-10 mt-[5vh] w-[100vw] px-[4vw] items-center">
    //       {mockRoomInformation.map((room, index) =>
    //         room.show === true ? (
    //           <RoomCard
    //             key={index}
    //             roomName={room.roomName}
    //             maxGuest={room.maxGuest}
    //             bedType={room.bedType}
    //             roomSize={room.roomSize}
    //             roomPrice={room.roomPrice * reducedRate}
    //             roomImage={room.roomImage}
    //             roomAmenities={room.roomAmenities}
    //             roomDetail={room.roomDetail}
    //             roomType={room.roomType}
    //             t={t}
    //             isAvailable={room.isAvailable}
    //             disabledDate={room.disabledDate}
    //           />
    //         ) : null
    //       )}
    //     </div>
    //     <div className="flex sticky mt-[5vh] w-[100vw] justify-center mobile:fixed mobile:bottom-0">
    //       {isMobile ? (
    //         <SummaryBar
    //           page="search-result"
    //           isDisabledConfirm={false}
    //           t={t}
    //           lng={lng}
    //         />
    //       ) : (
    //         <SummaryCard
    //           page="search-result"
    //           isDisabledConfirm={false}
    //           t={t}
    //           lng={lng}
    //         />
    //       )}
    //     </div>
    //   </div>

    //   <div className="mt-[10vh]">
    //     <Footer t={t} />
    //   </div>
    // </div>
  );
}
