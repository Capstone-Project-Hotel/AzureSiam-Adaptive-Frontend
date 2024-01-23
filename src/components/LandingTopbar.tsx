"use client";
import React, { useState } from "react";
import { BlockOutlined } from "@ant-design/icons";
import { Anchor, Menu, Dropdown, Button, Select } from "antd";
import DownOutlined from "@ant-design/icons/DownOutlined";
import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import { redirect, useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import axios from "axios";

// const { Link } = Anchor;

interface LandingTopbarProps {
  lng: any;
  scrollToRoom: () => void;
  scrollToFacilities: () => void;
  scrollToPromotions: () => void;
  scrollToActivity: () => void;
  scrollToGallery: () => void;
  scrollToNearby: () => void;
  onBookNow: () => void;
  t: any;
}

export default function LandingTopbar({
  lng,
  scrollToRoom,
  scrollToFacilities,
  scrollToPromotions,
  scrollToActivity,
  scrollToGallery,
  scrollToNearby,
  onBookNow,
  t,
}: LandingTopbarProps) {
  // i18n
  const router = useRouter();
  const options = languages
    .filter((l: any) => lng !== l)
    .map((l: any) => {
      return { value: l, label: l == "th" ? "ไทย" : "English" };
    });
  const handleIntlChange = (value: string) => {
    const currentPath = window.location.pathname;
    router.push(`/${value}/${currentPath.slice(4)}`);
  };

  // Exchange Rate
  const {
    exchangeRate,
    setExchangeRate,
    currency,
    setCurrency,
    setBookingDetail,
    setCardType,
    setGuests,
    setPaymentDetail,
    setSpecialReq,
  } = useStore();
  const listquotes = [
    "SGD",
    "MYR",
    "EUR",
    "USD",
    "AUD",
    "JPY",
    "CNH",
    "HKD",
    "CAD",
    "INR",
    "DKK",
    "GBP",
    "RUB",
    "NZD",
    "MXN",
    "IDR",
    "TWD",
    "THB",
    "VND",
  ].map((l: any) => {
    return { value: l, label: l };
  });
  const handleExChange = async (value: string) => {
    try {
      if (value && value !== "THB") {
        const response = await axios.get(
          "https://currency-exchange.p.rapidapi.com/exchange",
          {
            params: {
              from: "THB",
              to: value,
            },
            headers: {
              "X-RapidAPI-Key":
                "32978adf6emsh766e865f3b81f21p11aafajsnb354410acc8c",
              "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
            },
          }
        );
        setCurrency(value);
        setExchangeRate(response.data);
      } else {
        setCurrency("THB");
        setExchangeRate(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Implement language change logic
    console.log("Language changed to", language);
  };

  const languageMenu = (
    <Menu style={{ backgroundColor: "white" }}>
      <Menu.Item key="EN" onClick={() => handleLanguageChange("EN")}>
        <span style={{ fontSize: "14px" }}>English</span>
      </Menu.Item>
      <Menu.Item key="TH" onClick={() => handleLanguageChange("TH")}>
        <span style={{ fontSize: "14px" }}>ไทย (Thai)</span>
      </Menu.Item>
    </Menu>
  );

  const handleBookNowClick = () => {
    // console.log("Book Now clicked");
    // Implement Book Now logic
    onBookNow();
  };

  return (
    <div
      className="sticky top-0 flex flex-row h-[110px] w-full px-[4.16vw] items-center justify-between"
      style={{ backgroundColor: "#2A4D69", color: "white" }}
    >
      <div className="flex flex-row items-center mobile:flex-col">
        <Link
          href={"/"}
          className="text-h2 mobile:text-h2-mobile cursor-pointer flex items-center"
        >
          <BlockOutlined style={{ fontSize: "5vw", color: "white" }} />
          AzureSiam
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-start gap-x-8 gap-y-1 mobile:flex-col ml-[2vw]">
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToRoom}
        >
          {t("room_type")}
        </div>
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToFacilities}
        >
          {t("facilities")}
        </div>
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToPromotions}
        >
          {t("promotions")}
        </div>
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToActivity}
        >
          {t("activity_schedule")}
        </div>
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToGallery}
        >
          {t("gallery")}
        </div>
        <div
          className="text-h5 mobile:text-h5-mobile cursor-pointer"
          onClick={scrollToNearby}
        >
          {t("nearby_attraction")}
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-4 gap-y-2 flex-wrap mobile:flex-col">
        <Select
          defaultValue={lng == "th" ? "ไทย" : "English"}
          options={options}
          onChange={handleIntlChange}
          style={{ width: "100px" }}
        />
        <Select
          defaultValue={currency}
          options={listquotes}
          onChange={handleExChange}
          style={{ width: "100px" }}
        />
      </div>
      <div>
        <Button
          style={{
            color: "#2A4D69",
            marginLeft: "0.75vw",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
          onClick={handleBookNowClick}
        >
          {t("book_now")}
        </Button>
      </div>
    </div>
  );
}
