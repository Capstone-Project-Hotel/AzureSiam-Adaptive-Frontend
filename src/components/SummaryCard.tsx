"use client";
import {
  CalendarOutlined,
  UserOutlined,
  PlusCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

import "primeicons/primeicons.css";
import useStore from "@/hooks/useStore";
import { InputNumber, Button } from "antd";
import Link from "next/link";

const RoomNumberInput = ({
  roomType,
  value,
  onChange,
}: {
  roomType: string;
  value: number;
  onChange: Function;
}) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex gap-x-[0.5vw]">
      <MinusCircleFilled
        className="text-h4 mobile:text-h3-mobile"
        onClick={handleDecrease}
      />

      <InputNumber
        value={value}
        min={1}
        onChange={(newValue) => {
          const updatedValue = typeof newValue === "number" ? newValue : 1;
          onChange(updatedValue);
        }}
        className="w-[4vw] h-[4vh] mobile:w-[12vw]"
      />

      <PlusCircleFilled
        className="text-h4 mobile:text-h3-mobile"
        onClick={handleIncrease}
      />
    </div>
  );
};

export default function SummaryCard({
  page,
  isDisabledConfirm,
  t,
}: {
  page: string;
  isDisabledConfirm: boolean;
  t: any;
}) {
  const { bookingDetail, setBookingDetail, exchangeRate, currency } =
    useStore();

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

  // Calculate the difference in milliseconds
  const timeDifference = endDateFormat.getTime() - startDateFormat.getTime();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Short day name (e.g., Sun)
    month: "short", // Short month name (e.g., Nov)
    day: "numeric", // Day of the month (e.g., 19)
    year: "2-digit", // Last two digits of the year (e.g., 23)
  };

  const formattedStartDateString = startDateFormat.toLocaleDateString(
    "en-US",
    options
  );

  const formattedEndDateString = endDateFormat.toLocaleDateString(
    "en-US",
    options
  );

  // Convert the difference to days
  const dayDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // calculate price here

  let reducedRate = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }

  let subTotal =
    (1200 * bookingDetail.standardRoomNumber +
      1800 * bookingDetail.deluxeRoomNumber +
      2200 * bookingDetail.familyRoomNumber +
      2500 * bookingDetail.suiteRoomNumber +
      3000 * bookingDetail.executiveRoomNumber) *
    reducedRate *
    exchangeRate;
  if (bookingDetail.packageOne === true)
    subTotal += 299 * reducedRate * exchangeRate;
  if (bookingDetail.packageTwo === true)
    subTotal += 499 * reducedRate * exchangeRate;

  const serviceCharge = subTotal / 10;
  const taxesAndFees = (subTotal / 100) * 7;

  return (
    <div className="[box-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md w-[400px] h-auto p-5 bg-background mobile:w-[80vw]">
      <div className="border-b-2">
        <div className="flex mt-[10px] m-2">
          <CalendarOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
          <div>
            <div className="text-h5 font-medium mobile:text-h3-mobile">
              {/* Sun, 19 Nov 23 – Tue, 21 Nov 23 */}
              {formattedStartDateString} - {formattedEndDateString}
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {/* 2 nights */}
              {dayDuration} {t("night")}
            </div>
          </div>
        </div>
        <div className="flex m-2">
          <UserOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
          <div className="text-h5 font-medium mobile:text-h3-mobile">
            {bookingDetail.adultNumber} {t("adults")}{" "}
            {bookingDetail.childrenNumber} {t("children")}
          </div>
        </div>
      </div>
      {/* <div className="border-b-2"> */}
      {/* edit room */}
      {page === "search-result" ? (
        <div className="border-b-2 flex flex-col gap-y-[2vh]">
          <div className="text-body text-slate-400 mobile:text-h3-mobile mt-2">
            {t("edit_room")}
          </div>

          {bookingDetail.standardRoomNumber !== 0 ? (
            <div>
              <div className="flex justify-between">
                <div className="text-h5 font-bold mobile:text-h4-mobile">
                  {t("std_title")}
                </div>
                <RoomNumberInput
                  roomType="Standard"
                  value={bookingDetail.standardRoomNumber}
                  onChange={(newValue: number) =>
                    setBookingDetail({
                      ...bookingDetail,
                      standardRoomNumber: newValue,
                    })
                  }
                />
              </div>
              <button
                className="flex"
                onClick={() => {
                  const updatedBookingDetail = {
                    ...bookingDetail,
                    standardRoomNumber: 0,
                  };
                  setBookingDetail(updatedBookingDetail);
                }}
              >
                <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                  {t("remove")}
                </div>
              </button>
              <div className="flex justify-between mt-[0.5vh]">
                <div className="text-body mobile:text-h4-mobile">
                  {t("std_title")} {bookingDetail.standardRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.standardRoomNumber *
                      1200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {bookingDetail.deluxeRoomNumber !== 0 ? (
            <div>
              <div className="flex justify-between">
                <div className="text-h5 font-bold mobile:text-h4-mobile">
                  {t("dlx_title")}
                </div>
                <RoomNumberInput
                  roomType="Deluxe"
                  value={bookingDetail.deluxeRoomNumber}
                  onChange={(newValue: number) =>
                    setBookingDetail({
                      ...bookingDetail,
                      deluxeRoomNumber: newValue,
                    })
                  }
                />
              </div>
              <button
                className="flex"
                onClick={() => {
                  const updatedBookingDetail = {
                    ...bookingDetail,
                    deluxeRoomNumber: 0,
                  };
                  setBookingDetail(updatedBookingDetail);
                }}
              >
                <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                  {t("remove")}
                </div>
              </button>
              <div className="flex justify-between mt-[0.5vh]">
                <div className="text-body mobile:text-h4-mobile">
                  {t("dlx_title")} {bookingDetail.deluxeRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.deluxeRoomNumber *
                      1800 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {bookingDetail.familyRoomNumber !== 0 ? (
            <div>
              <div className="flex justify-between">
                <div className="text-h5 font-bold mobile:text-h4-mobile">
                  {t("fml_title")}
                </div>
                <RoomNumberInput
                  roomType="Family"
                  value={bookingDetail.familyRoomNumber}
                  onChange={(newValue: number) =>
                    setBookingDetail({
                      ...bookingDetail,
                      familyRoomNumber: newValue,
                    })
                  }
                />
              </div>
              <button
                className="flex"
                onClick={() => {
                  const updatedBookingDetail = {
                    ...bookingDetail,
                    familyRoomNumber: 0,
                  };
                  setBookingDetail(updatedBookingDetail);
                }}
              >
                <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                  {t("remove")}
                </div>
              </button>
              <div className="flex justify-between mt-[0.5vh]">
                <div className="text-body mobile:text-h4-mobile">
                  {t("fml_title")} {bookingDetail.familyRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.familyRoomNumber *
                      2200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {bookingDetail.suiteRoomNumber !== 0 ? (
            <div>
              <div className="flex justify-between">
                <div className="text-h5 font-bold mobile:text-h4-mobile">
                  {t("s_title")}
                </div>
                <RoomNumberInput
                  roomType="Suite"
                  value={bookingDetail.suiteRoomNumber}
                  onChange={(newValue: number) =>
                    setBookingDetail({
                      ...bookingDetail,
                      suiteRoomNumber: newValue,
                    })
                  }
                />
              </div>
              <button
                className="flex"
                onClick={() => {
                  const updatedBookingDetail = {
                    ...bookingDetail,
                    suiteRoomNumber: 0,
                  };
                  setBookingDetail(updatedBookingDetail);
                }}
              >
                <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                  {t("remove")}
                </div>
              </button>
              <div className="flex justify-between mt-[0.5vh]">
                <div className="text-body mobile:text-h4-mobile">
                  {t("s_title")} {bookingDetail.suiteRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.suiteRoomNumber *
                      2500 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {bookingDetail.executiveRoomNumber !== 0 ? (
            <div>
              <div className="flex justify-between">
                <div className="text-h5 font-bold mobile:text-h4-mobile">
                  {t("ex_title")}
                </div>
                <RoomNumberInput
                  roomType="Executive"
                  value={bookingDetail.executiveRoomNumber}
                  onChange={(newValue: number) =>
                    setBookingDetail({
                      ...bookingDetail,
                      executiveRoomNumber: newValue,
                    })
                  }
                />
              </div>
              <button
                className="flex"
                onClick={() => {
                  const updatedBookingDetail = {
                    ...bookingDetail,
                    executiveRoomNumber: 0,
                  };
                  setBookingDetail(updatedBookingDetail);
                }}
              >
                <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                  {t("remove")}
                </div>
              </button>
              <div className="flex justify-between mt-[0.5vh]">
                <div className="text-body mobile:text-h4-mobile">
                  {t("ex_title")} {bookingDetail.executiveRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.executiveRoomNumber *
                      3000 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : page === "reservation-and-guest-detail" ? (
        <div>
          <div className="border-t-2">
            {bookingDetail.standardRoomNumber !== 0 ? (
              <div className="flex justify-between ml-2 mt-1">
                <div className="text-body mobile:text-h4-mobile">
                  {t("std_title")} {bookingDetail.standardRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.standardRoomNumber *
                      1200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.deluxeRoomNumber !== 0 ? (
              <div className="flex justify-between ml-2 mt-1">
                <div className="text-body mobile:text-h4-mobile">
                  {t("dlx_title")} {bookingDetail.deluxeRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.deluxeRoomNumber *
                      1800 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.familyRoomNumber !== 0 ? (
              <div className="flex justify-between ml-2 mt-1">
                <div className="text-body mobile:text-h4-mobile">
                  {t("fml_title")} {bookingDetail.familyRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.familyRoomNumber *
                      2200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.suiteRoomNumber !== 0 ? (
              <div className="flex justify-between ml-2 mt-1">
                <div className="text-body mobile:text-h4-mobile">
                  {t("s_title")} {bookingDetail.suiteRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.suiteRoomNumber *
                      2500 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.executiveRoomNumber !== 0 ? (
              <div className="flex justify-between ml-2 mt-1">
                <div className="text-body mobile:text-h4-mobile">
                  {t("ex_title")} {bookingDetail.executiveRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.executiveRoomNumber *
                      3000 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-b-2 border-t-2">
            <div className="m-1">
              <div className="text-body text-slate-400 mobile:text-h3-mobile">
                {t("edit_service")}
              </div>
              {bookingDetail.packageOne ? (
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="text-h5 mobile:text-h4-mobile">
                        {t("service_name1")}
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex"
                    onClick={() => {
                      const updatedBookingDetail = {
                        ...bookingDetail,
                        packageOne: false,
                      };
                      setBookingDetail(updatedBookingDetail);
                    }}
                  >
                    <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                    <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                      {t("remove_service")}
                    </div>
                  </button>
                  <div className="flex justify-between">
                    <div className="text-body mobile:text-h4-mobile">
                      {t("service_name1")}
                    </div>
                    <div className="text-body text-gray-400 mobile:text-h4-mobile">
                      {currency}{" "}
                      {new Intl.NumberFormat("th-TH", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(299)}
                    </div>
                  </div>
                </div>
              ) : null}
              {bookingDetail.packageTwo ? (
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="text-h5 mobile:text-h4-mobile">
                        {t("service_name2")}
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex"
                    onClick={() => {
                      const updatedBookingDetail = {
                        ...bookingDetail,
                        packageTwo: false,
                      };
                      setBookingDetail(updatedBookingDetail);
                    }}
                  >
                    <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                    <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                      {t("remove_service")}
                    </div>
                  </button>
                  <div className="flex justify-between">
                    <div className="text-body mobile:text-h4-mobile">
                      {t("service_name2")}
                    </div>
                    <div className="text-body text-gray-400 mobile:text-h4-mobile">
                      {currency}{" "}
                      {new Intl.NumberFormat("th-TH", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(499)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <div className="border-t-2"> */}
          <div className="my-1">
            {bookingDetail.standardRoomNumber !== 0 ? (
              <div className="flex justify-between">
                <div className="text-body mobile:text-h4-mobile">
                  {t("std_title")} {bookingDetail.standardRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.standardRoomNumber *
                      1200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.deluxeRoomNumber !== 0 ? (
              <div className="flex justify-between">
                <div className="text-body mobile:text-h4-mobile">
                  {t("dlx_title")} {bookingDetail.deluxeRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.deluxeRoomNumber *
                      1800 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.familyRoomNumber !== 0 ? (
              <div className="flex justify-between">
                <div className="text-body mobile:text-h4-mobile">
                  {t("fml_title")} {bookingDetail.familyRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.familyRoomNumber *
                      2200 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.suiteRoomNumber !== 0 ? (
              <div className="flex justify-between">
                <div className="text-body  mobile:text-h4-mobile">
                  {t("s_title")} {bookingDetail.suiteRoomNumber} {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.suiteRoomNumber *
                      2500 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
            {bookingDetail.executiveRoomNumber !== 0 ? (
              <div className="flex justify-between">
                <div className="text-body mobile:text-h4-mobile">
                  {t("ex_title")} {bookingDetail.executiveRoomNumber}{" "}
                  {t("room")}
                </div>
                <div className="text-body text-slate-400 mobile:text-h4-mobile">
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    bookingDetail.executiveRoomNumber *
                      3000 *
                      reducedRate *
                      exchangeRate
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-y-2 my-1">
            {bookingDetail.packageOne ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("service_name1")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(299)}
                  </div>
                </div>
              </div>
            ) : null}
            {bookingDetail.packageTwo ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("service_name2")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(499)}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* </div> */}
        </div>
      )}
      <div className="flex flex-col gap-y-[1vh] mt-[1vh]">
        <div className="flex justify-between">
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {t("sub_total")}
          </div>
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(subTotal)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {t("service_charge")} (10%)
          </div>
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(serviceCharge)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {t("taxes_and_fees")} (7%)
          </div>
          <div className="text-body text-slate-400 mobile:text-h4-mobile">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(taxesAndFees)}
          </div>
        </div>
      </div>
      <div className="text-center text-h2 font-bold mt-1 mobile:text-h2-mobile mobile:mt-[10px]">
        {currency}{" "}
        {new Intl.NumberFormat("th-TH", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(subTotal + serviceCharge + taxesAndFees)}{" "}
        {t("total")}
      </div>
      <div className="flex justify-center items-center">
        {page === "search-result" ? (
          <Link href={"/reservation-and-guest-detail"}>
            <Button
              className={` ${
                bookingDetail.standardRoomNumber +
                  bookingDetail.deluxeRoomNumber * 2 +
                  bookingDetail.familyRoomNumber * 4 +
                  bookingDetail.suiteRoomNumber * 2 +
                  bookingDetail.executiveRoomNumber * 4 <
                bookingDetail.adultNumber + bookingDetail.childrenNumber
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              style={{ background: "#2A4D69", color: "white" }}
              disabled={
                bookingDetail.standardRoomNumber +
                  bookingDetail.deluxeRoomNumber * 2 +
                  bookingDetail.familyRoomNumber * 4 +
                  bookingDetail.suiteRoomNumber * 2 +
                  bookingDetail.executiveRoomNumber * 4 <
                bookingDetail.adultNumber + bookingDetail.childrenNumber
              }
            >
              <div>{t("confirm")}</div>
            </Button>
          </Link>
        ) : page === "reservation-and-guest-detail" ? (
          <Link href={"/summary-booking-detail"}>
            <Button
              className={` ${
                isDisabledConfirm || !bookingDetail.isCheckedPDPA
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              style={{ background: "#2A4D69", color: "white" }}
              disabled={isDisabledConfirm || !bookingDetail.isCheckedPDPA}
            >
              <div>{t("confirm")}</div>
            </Button>
          </Link>
        ) : page === "summary-booking-detail" ? (
          <Link href={"/booking-confirmation"}>
            <Button style={{ background: "#2A4D69", color: "white" }}>
              <div>{t("check_out")}</div>
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
