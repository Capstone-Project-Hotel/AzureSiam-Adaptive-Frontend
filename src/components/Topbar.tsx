"use client";
import React, { useState } from "react";
import { BlockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Select } from "antd";
import DownOutlined from "@ant-design/icons/DownOutlined";
import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import { redirect, useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import axios from "axios";

interface TopbarProps {
  lng: string;
  options: any[];
  handleIntlChange: (value: string) => void;
  currency: string;
  listquotes: any[];
  handleExChange: (value: string) => void;
}

export default function Topbar({ lng }: { lng: any }) {
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
  const [selectedCurrency, setSelectedCurrency] = useState("THB");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Implement language change logic
    console.log("Language changed to", language);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    // Implement currency change logic
    console.log("Currency changed to", currency);
  };

  return (
    <div
      className="sticky top-0 flex flex-row h-[110px] w-full px-[4.16vw] items-center justify-between mobile:h-[50px]"
      style={{ backgroundColor: "#2A4D69", color: "white" }}
    >
      <div className="flex flex-row items-center">
        <Link
          href={"/"}
          className="text-h2 mobile:text-h2-mobile cursor-pointer flex items-center"
        >
          <BlockOutlined style={{ fontSize: "5vw", color: "white" }} />
          AzureSiam
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row gap-4">
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
      </div>
    </div>
  );
}
