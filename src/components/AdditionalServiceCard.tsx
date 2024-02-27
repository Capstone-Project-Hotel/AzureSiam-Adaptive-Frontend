"use client";
import React, { useState } from "react";
import { Button } from "antd";
import useStore from "@/hooks/useStore";

export default function AdditionalServiceCard(information: {
  serviceName: string;
  unit: string;
  price: number;
  serviceImage: string;
  t: any;
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleBookNowClick = () => {
    setIsAdded(!isAdded);
    if (isAdded) console.log("Removed");
    else console.log("Added");

    if (information.price === 299) {
      const updatedPackageOne = !bookingDetail.packageOne;
      const updatedBookingDetail = {
        ...bookingDetail,
        packageOne: updatedPackageOne,
      };
      setBookingDetail(updatedBookingDetail);
    } else {
      const updatedPackageTwo = !bookingDetail.packageTwo;
      const updatedBookingDetail = {
        ...bookingDetail,
        packageTwo: updatedPackageTwo,
      };
      setBookingDetail(updatedBookingDetail);
    }
    // console.log(bookingDetail.packageOne);
  };

  const { bookingDetail, setBookingDetail, currency, exchangeRate } =
    useStore();

  let reducedRate = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }

  return (
    <div className="flex flex-col w-[16vw] h-auto [box-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] mobile:w-[110px]">
      <img src={information.serviceImage} className="w-full" />
      <div className="flex flex-col w-full h-auto p-[1vw]">
        <p className="text-h5 mobile:text-h4-mobile">
          {information.serviceName}
          {/* Transportation [ Package ] */}
        </p>
        <ul className="text-description">
          <li className="mobile:text-h5-mobile">
            {" "}
            {"• "} {information.unit}{" "}
          </li>
        </ul>
        <div className="flex flex-row w-full items-end justify-between mt-[1vw]">
          <p className="text-body mobile:text-h4-mobile">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(information.price * reducedRate * exchangeRate)}
            {/* THB 200 */}
          </p>
          <Button type="primary" size="small" onClick={handleBookNowClick}>
            {information.price === 299
              ? bookingDetail.packageOne
                ? information.t("remove_service")
                : information.t("add_service")
              : bookingDetail.packageTwo
              ? information.t("remove_service")
              : information.t("add_service")}
          </Button>
        </div>
      </div>
    </div>
  );
}
