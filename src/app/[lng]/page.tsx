"use client";

import HistoryCard from "@/components/HistoryCard";
import { addDays, format, set } from "date-fns";
import { useEffect, useRef, useState } from "react";
import OtherCard from "@/components/OtherCard";
import dynamic from "next/dynamic";
import { Card, Carousel, Input, MenuProps } from "antd";
import styled from "styled-components";
import { CalendarOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import LandingTopbar from "@/components/LandingTopbar";
import { Button, Drawer } from "antd";
import { InputNumber } from "antd";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Menu, Modal } from "antd";

import TvIcon from "@mui/icons-material/Tv";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AirIcon from "@mui/icons-material/Air";
import WifiIcon from "@mui/icons-material/Wifi";
import DeskIcon from "@mui/icons-material/Desk";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import BalconyIcon from "@mui/icons-material/Balcony";
import ChairIcon from "@mui/icons-material/Chair";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import useStore from "@/hooks/useStore";

import landing from "../../../public/landing.png";

import stdroom from "../../../public/stdroom.jpg";
import dlxroom from "../../../public/dlxroom.jpg";
import famroom from "../../../public/famroom.jpg";
import suiteroom from "../../../public/suiteroom.jpg";
import exroom from "../../../public/exroom.jpg";
import exroom2 from "../../../public/exroom2.png";

import spa from "../../../public/spa.jpg";
import gym from "../../../public/gym.jpg";

import fifty from "../../../public/50.jpg";
import monday from "../../../public/monday.jpg";
import friday from "../../../public/friday.jpg";

import swim from "../../../public/swim.jpg";
import medi from "../../../public/medi.jpg";
import rock from "../../../public/rock.jpg";

import checkin from "../../../public/checkin.jpg";

import siam from "../../../public/siam.jpg";
import samyan from "../../../public/samyan.jpg";
import central from "../../../public/central.jpg";

const { Meta } = Card;

const CustomDateRange = dynamic(() => import("@/components/CustomDateRange"), {
  ssr: false,
});

const ContentStyle = styled.div<{ src: string }>`
  height: 543px;
  width: 100%;
  background-image: ${(p: any) => `url(${p.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 431px) {
    height: 150px;
  }
`;

import { useTranslation } from "../i18n/client";
import { languages } from "@/app/i18n/settings";
import { useRouter } from "next/navigation";
import axios from "axios";

const Home = ({ params: { lng } }: { params: { lng: any } }) => {
  const { t } = useTranslation(lng);

  const disabledDates = [
    new Date("2024-01-25"),
    new Date("2024-01-26"),
    new Date("2024-01-28"),
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [menu, setShowMenu] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [adults, setAdults] = useState<number | null>(1);
  const [childrens, setChildrens] = useState<number | null>(0);
  const [codePromo, setCodePromo] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 431px)" });

  const {
    bookingDetail,
    setBookingDetail,
    exchangeRate,
    setExchangeRate,
    currency,
    setCurrency,
    setCardType,
    setGuests,
    setPaymentDetail,
    setSpecialReq,
  } = useStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // fix this to menu bar
  const showMenu = () => {
    setShowMenu(true);
    console.log("show menu");
  };

  const onCloseMenu = () => {
    setShowMenu(false);
  };

  const roomRef = useRef<null | HTMLDivElement>(null);
  const scrollToRoom = () => {
    const barHeight = "91px";
    if (roomRef.current) roomRef.current.style.scrollMargin = barHeight;
    roomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const facilitiesRef = useRef<null | HTMLDivElement>(null);
  const scrollToFacilities = () => {
    const barHeight = "91px";
    if (facilitiesRef.current)
      facilitiesRef.current.style.scrollMargin = barHeight;
    facilitiesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const promotionsRef = useRef<null | HTMLDivElement>(null);
  const scrollToPromotions = () => {
    const barHeight = "91px";
    if (promotionsRef.current)
      promotionsRef.current.style.scrollMargin = barHeight;
    promotionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const activityRef = useRef<null | HTMLDivElement>(null);
  const scrollToActivity = () => {
    const barHeight = "91px";
    if (activityRef.current) activityRef.current.style.scrollMargin = barHeight;
    activityRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const galleryRef = useRef<null | HTMLDivElement>(null);
  const scrollToGallery = () => {
    const barHeight = "91px";
    if (galleryRef.current) galleryRef.current.style.scrollMargin = barHeight;
    galleryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const nearbyRef = useRef<null | HTMLDivElement>(null);
  const scrollToNearby = () => {
    const barHeight = "91px";
    if (nearbyRef.current) nearbyRef.current.style.scrollMargin = barHeight;
    nearbyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    const handleNewBooking = () => {
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

      setGuests([emptyGuest]);

      const emptyPaymentDetail: PaymentDetail = {
        cardHolderName: "",
        cardNumber: "",
        expDate: "",
        cvv: "",
      };

      setPaymentDetail(emptyPaymentDetail);

      const emptyBookingDetail: BookingDetail = {
        startDate: "",
        endDate: "",
        adultNumber: 0,
        childrenNumber: 0,
        codePromotion: "",
        standardRoomNumber: 0,
        deluxeRoomNumber: 0,
        familyRoomNumber: 0,
        suiteRoomNumber: 0,
        executiveRoomNumber: 0,
        packageOne: false,
        packageTwo: false,
        isCheckedPDPA: false,
        bookingId: "",
        showStandard: true,
        showDeluxe: true,
        showFamily: true,
        showSuite: true,
        showExecutive: true,
        showOnlyBalcony: false,
        showOnlyDinnerPlan: false,
        showOnlyJacuzzi: false,
        showBelowOption1: false,
        showBelowOption2: false,
        showBelowOption3: false,
      };

      setBookingDetail(emptyBookingDetail);
      setCardType("");
      setSpecialReq("");
      console.log("new store");
    };
    handleNewBooking();
  }, []);

  const router = useRouter();
  const options = languages
    .filter((l: any) => lng !== l)
    .map((l: any) => {
      return { label: l == "th" ? "ไทย" : "English", key: l };
    });
  const handleIntlChange = (e: any) => {
    const currentPath = window.location.pathname;
    router.push(`/${e.key}/${currentPath.slice(4)}`);
  };

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
    return { label: l, key: l };
  });
  const handleExChange = async (e: any) => {
    onCloseMenu();
    const value = e.key;
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

  return (
    // Page Container
    <div>
      <div className="z-50 fixed top-0 w-full">
        <LandingTopbar
          lng={lng}
          scrollToRoom={scrollToRoom}
          scrollToFacilities={scrollToFacilities}
          scrollToPromotions={scrollToPromotions}
          scrollToActivity={scrollToActivity}
          scrollToGallery={scrollToGallery}
          scrollToNearby={scrollToNearby}
          onBookNow={showDrawer}
          showMenu={showMenu}
          t={t}
        />
      </div>
      {/* Drawer */}
      <Drawer
        title={t("booking_detail")}
        placement="right"
        onClose={onClose}
        open={open}
        width={!isMobile ? "1150px" : "100%"}
      >
        <div className="flex flex-col gap-5 mobile:text-h3-mobile px-14 mobile:px-0 font-bold">
          {/* Custom Date Range */}
          <div className="flex justify-center">
            <CustomDateRange
              size="small"
              onDatesChange={(dates: any) => {
                setStartDate(dates.startDate);
                setEndDate(dates.endDate);
              }}
              // disabledDates={[
              //   addDays(new Date(), 3),
              //   addDays(new Date(), 7),
              //   addDays(new Date(), 15),
              // ]}
              disabledDates={disabledDates}
            />
          </div>

          {/* Select Date */}
          <div className="flex justify-center gap-4">
            <CalendarOutlined />
            <div>{startDate ? format(startDate, "dd/MM/yyyy") : "-"}</div>
            <div>-</div>
            <div>{endDate ? format(endDate, "dd/MM/yyyy") : "-"}</div>
          </div>

          {/* Guest */}
          <div>
            <div className="mb-2 text-primary">{t("guest")}</div>
            <hr />
            <div className="flex">
              <div className="flex w-1/2 justify-between items-center p-4 gap-2">
                <div>{t("adults")}</div>
                <InputNumber
                  min={1}
                  max={99}
                  defaultValue={1}
                  onChange={(value: number | null) => setAdults(value)}
                />
              </div>
              <div className="flex w-1/2 justify-between items-center p-4 gap-2">
                <div>{t("children")}</div>
                <InputNumber
                  min={0}
                  max={99}
                  defaultValue={0}
                  onChange={(value: number | null) => setChildrens(value)}
                />
              </div>
            </div>
            <hr />
          </div>

          {/* Promo Code */}
          <div className="flex flex-col gap-2">
            <div className="text-primary">{t("have_code")}</div>
            <div className="flex">
              <div className="w-[150px]">{t("code")}</div>
              <div>
                <Input
                  placeholder="eg. promo001"
                  size="small"
                  style={{ width: "150px" }}
                  onChange={(e: any) => {
                    const updatedBookingDetail = {
                      ...bookingDetail,
                      codePromotion: e.target.value,
                    };

                    setBookingDetail(updatedBookingDetail);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="flex justify-center">
            <Link
              href={`/search-result/startDate=${format(
                startDate,
                "dd-MM-yyyy"
              )}&endDate=${format(
                endDate,
                "dd-MM-yyyy"
              )}&adults=${adults}&childrens=${childrens}`}
            >
              <Button type="primary">{t("book_now")}</Button>
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Hamburger menu */}
      <Drawer onClose={onCloseMenu} open={menu} placement="left" width={250}>
        <Menu style={{ display: "flex", flexDirection: "column", width: 200 }}>
          <Menu.Item
            key="1"
            onClick={() => {
              scrollToRoom();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("room_type")}</p>
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              scrollToFacilities();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("facilities")}</p>
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              scrollToPromotions();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("promotions")}</p>
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              scrollToActivity();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("activity_schedule")}</p>
          </Menu.Item>
          <Menu.Item
            key="5"
            onClick={() => {
              scrollToGallery();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("gallery")}</p>
          </Menu.Item>
          <Menu.Item
            key="6"
            onClick={() => {
              scrollToNearby();
              onCloseMenu();
            }}
          >
            <p className="mobile:text-h3-mobile">{t("nearby_attraction")}</p>
          </Menu.Item>

          {/* Language */}
          <Menu.SubMenu
            key="7"
            title={t("language")}
            className="mobile:text-h3-mobile h-auto"
          >
            {options.map((op: any) => {
              return (
                <Menu.Item
                  key={op.key}
                  onClick={handleIntlChange}
                  className="mobile:text-h3-mobile"
                >
                  {op.label}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>

          {/* Currency */}
          <Menu.SubMenu
            key="8"
            title={t("currency")}
            className="mobile:text-h3-mobile"
          >
            {listquotes.map((op: any) => {
              return (
                <Menu.Item
                  key={op.key}
                  className="mobile:text-h3-mobile"
                  onClick={handleExChange}
                >
                  {op.label}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        </Menu>
      </Drawer>

      <div className="flex justify-center mt-[110px] mobile:mt-[50px]">
        {/* Main Container */}
        <div className="max-w-[1440px] w-full mobile:w-full flex flex-col gap-10 mobile:gap-8 items-center pb-20">
          {/* Hotel Name Container */}
          <div
            style={{
              backgroundImage: `url(${landing.src})`,
              backgroundPosition: "center",
            }}
            className="p-20 flex items-end h-[822px] w-full mobile:h-[331px] mobile:p-5"
          >
            <div className="text-white">
              <div className="text-h1 mobile:text-h1-mobile font-bold">
                {t("hotel")}
              </div>
              <div className="text-h2 mobile:text-h2-mobile">
                {t("hotel_description")}
              </div>
            </div>
          </div>

          {/* History Container */}
          <div className="w-full flex justify-center">
            <HistoryCard t={t} />
          </div>

          {/* Room Type Container */}
          <span ref={roomRef} />
          <div className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold">
              {t("room_type")}
            </div>

            <CardContainer>
              {/* Standard Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("std_title")}
                description={t("std_description")}
                src={stdroom.src}
              >
                <div>{t("std_description")}</div>
                <div>
                  <div className="font-bold mb-1">{t("amenities")}</div>
                  <div>
                    <ul className="leading-8 mobile:leading-6">
                      <li>
                        <SmokeFreeIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("non_smoking")}
                      </li>
                      <li>
                        <KitchenIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("mini_fridge")}
                      </li>
                      <li className="flex gap-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
                            />
                          </svg>
                        </div>
                        {t("hairdryer")}
                      </li>
                      <li>
                        <TvIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("television")}
                      </li>
                      <li>
                        <AirIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("air_conditioner")}
                      </li>
                      <li>
                        <WifiIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("wireless_internet")}
                      </li>
                      <li>
                        <DeskIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("desk")}
                      </li>
                      <li>
                        <BathtubIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("bath")}
                      </li>
                      <li>
                        <SatelliteAltIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("cable")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={stdroom.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTrmFKkPaYE9q1hzcjDppcp_QYSJlZG8JnSF0_FUOtTT2loh4kA"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://image-tc.galaxy.tf/wijpeg-4xrh8wkeksa0lb2jjhjyb6bxk/sandman-signature-saskatoon-south-hotel-corp-king-sofa-bed-w-euro-shower-bath-2_wide.jpg?crop=0%2C84%2C1600%2C900&width=1140"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                </div>
              </OtherCard>

              {/* Deluxe Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("dlx_title")}
                description={t("dlx_description")}
                src={dlxroom.src}
              >
                <div>{t("dlx_description")}</div>
                <div>
                  <div className="font-bold mb-1">{t("amenities")}</div>
                  <div>
                    <ul className="leading-8 mobile:leading-6">
                      <li>
                        <SmokeFreeIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("non_smoking")}
                      </li>
                      <li>
                        <KitchenIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("mini_fridge")}
                      </li>
                      <li className="flex gap-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
                          />
                        </svg>
                        {t("hairdryer")}
                      </li>
                      <li>
                        <TvIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("television")}
                      </li>
                      <li>
                        <AirIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("air_conditioner")}
                      </li>
                      <li>
                        <WifiIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("wireless_internet")}
                      </li>
                      <li>
                        <DeskIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("desk")}
                      </li>
                      <li>
                        <BathtubIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("private_bath")}
                      </li>
                      <li>
                        <SatelliteAltIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("cable")}
                      </li>
                      <li>
                        <BalconyIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("balcony")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={dlxroom.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://www.botanicserviceroom.com/uploads/images/rooms/1580916590qf79ctC5yT.jpeg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://lebua.com/wp-content/uploads/2019/07/02.-LST_-Suites-City-View.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                </div>
              </OtherCard>

              {/* Family Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("fml_title")}
                description={t("fml_description")}
                src={famroom.src}
              >
                <div>{t("fml_description")}</div>
                <div>
                  <div className="font-bold mb-1">{t("amenities")}</div>
                  <div>
                    <ul className="leading-8 mobile:leading-6">
                      <li>
                        <SmokeFreeIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("non_smoking")}
                      </li>
                      <li>
                        <KitchenIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("compact_fridge")}
                      </li>
                      <li className="flex gap-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
                            />
                          </svg>
                        </div>
                        {t("hairdryer")}
                      </li>
                      <li>
                        <TvIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("television")}
                      </li>
                      <li>
                        <AirIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("air_conditioner")}
                      </li>
                      <li>
                        <WifiIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("wireless_internet")}
                      </li>
                      <li>
                        <DeskIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("desk")}
                      </li>
                      <li>
                        <BathtubIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("bath")}
                      </li>
                      <li>
                        <SatelliteAltIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("cable")}
                      </li>
                      <li>
                        <BalconyIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("balcony")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={famroom.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://media-cdn.tripadvisor.com/media/photo-s/0b/16/99/02/bathroom-of-the-family.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://1.bp.blogspot.com/-QC4aWXP3BJw/VNnTWYJ9LgI/AAAAAAAAg9A/9S6vPwcsaOQ/s1600/1.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                </div>
              </OtherCard>

              {/* Suite Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("s_title")}
                description={t("s_description")}
                src={suiteroom.src}
              >
                <div>{t("s_description")}</div>
                <div>
                  <div className="font-bold mb-1">{t("amenities")}</div>
                  <div>
                    <ul className="leading-8 mobile:leading-6">
                      <li>
                        <SmokeFreeIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("non_smoking")}
                      </li>
                      <li>
                        <KitchenIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("mini_fridge")}
                      </li>
                      <li className="flex gap-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
                            />
                          </svg>
                        </div>
                        {t("hairdryer")}
                      </li>
                      <li>
                        <TvIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("television")}
                      </li>
                      <li>
                        <AirIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("air_conditioner")}
                      </li>
                      <li>
                        <WifiIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("wireless_internet")}
                      </li>
                      <li>
                        <DeskIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("desk")}
                      </li>
                      <li>
                        <BathtubIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("jacuzzi")}
                      </li>
                      <li>
                        <SatelliteAltIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("cable")}
                      </li>
                      <li>
                        <BalconyIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("balcony")}
                      </li>
                      <li>
                        <ChairIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("parlor")}
                      </li>
                      <li>
                        <DinnerDiningIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("dinner")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={suiteroom.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/02/11095044/3.-Rooms-Suites-details-1.-Superior-Room.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/03/31105553/26.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                </div>
              </OtherCard>

              {/* Executive Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("ex_title")}
                description={t("ex_description")}
                src={exroom.src}
              >
                <div>{t("ex_description")}</div>
                <div>
                  <div className="font-bold mb-1">{t("amenities")}</div>
                  <div>
                    <ul className="leading-8 mobile:leading-6">
                      <li>
                        <SmokeFreeIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("non_smoking")}
                      </li>
                      <li>
                        <KitchenIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("mini_fridge")}
                      </li>
                      <li className="flex gap-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
                            />
                          </svg>
                        </div>
                        {t("hairdryer")}
                      </li>
                      <li>
                        <TvIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("television")}
                      </li>
                      <li>
                        <AirIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("air_conditioner")}
                      </li>
                      <li>
                        <WifiIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("wireless_internet")}
                      </li>
                      <li>
                        <DeskIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("desk")}
                      </li>
                      <li>
                        <BathtubIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("jacuzzi")}
                      </li>
                      <li>
                        <SatelliteAltIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("cable")}
                      </li>
                      <li>
                        <BalconyIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("balcony")}
                      </li>
                      <li>
                        <ChairIcon fontSize={isMobile ? "small" : "medium"} />
                        {t("parlor")}
                      </li>
                      <li>
                        <DinnerDiningIcon
                          fontSize={isMobile ? "small" : "medium"}
                        />
                        {t("dinner")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={exroom.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src={exroom2.src}
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://discoveryprimeademo.hotelpropeller.com/files/2017/02/Executive_Suite_2.jpg"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                </div>
              </OtherCard>
            </CardContainer>
          </div>

          {/* Spa Container */}
          <div ref={facilitiesRef} />
          <div className="w-full">
            <StyledCard
              className="border-r-0"
              cover={
                <img
                  className="w-full h-[611px] object-cover"
                  alt="example"
                  src={spa.src}
                />
              }
            >
              <Meta title={t("spa_title")} description={t("spa_description")} />
            </StyledCard>
          </div>

          {/* Fitness Container */}
          <div className="w-full">
            <StyledCard
              cover={
                <img
                  className="w-full h-[611px] object-cover"
                  alt="example"
                  src={gym.src}
                />
              }
            >
              <Meta title={t("gym_title")} description={t("gym_description")} />
            </StyledCard>
          </div>

          {/* Promotions Container */}
          <div ref={promotionsRef} />
          <div id="con" className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold">
              {t("promotions")}
            </div>

            <CardContainer>
              <OtherCard
                t={t}
                title={t("fifty_title")}
                description={t("fifty_description")}
                src={fifty.src}
              />
              <OtherCard
                t={t}
                title={t("monday_title")}
                description={t("monday_description")}
                src={monday.src}
              />
              <OtherCard
                t={t}
                title={t("friday_title")}
                description={t("friday_description")}
                src={friday.src}
              />
            </CardContainer>
          </div>

          {/* Activity Schedule   Container */}
          <div ref={activityRef} />
          <div id="con" className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold">
              {t("activity_schedule")}
            </div>

            <CardContainer>
              <OtherCard
                t={t}
                title={t("swim_title")}
                description={t("swim_description")}
                src={swim.src}
              />
              <OtherCard
                t={t}
                title={t("medi_title")}
                description={t("medi_description")}
                src={medi.src}
              />
              <OtherCard
                t={t}
                title={t("rock_title")}
                description={t("rock_description")}
                src={rock.src}
              />
            </CardContainer>
          </div>

          {/* Gallery Container */}
          <div ref={galleryRef} />
          <div className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold mb-5">
              {t("gallery")}
            </div>
            <div className="w-[100%]">
              <Carousel dotPosition="right" autoplay>
                <div>
                  <ContentStyle src={checkin.src} />
                </div>
                <div>
                  <ContentStyle src="https://www.botanicserviceroom.com/uploads/images/rooms/1580917027SYoMNr02iB.jpeg" />
                </div>
                <div>
                  <ContentStyle src="https://www.botanicserviceroom.com/uploads/images/rooms/1580916883LfnEwUK4s4.jpeg" />
                </div>
                <div>
                  <ContentStyle src="https://www.botanicserviceroom.com/uploads/images/rooms/1580918079W9DIBxRYeD.jpeg" />
                </div>
              </Carousel>
            </div>
          </div>

          {/* Nearby Attraction Container */}
          <div ref={nearbyRef} />
          <div id="con" className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold">
              {t("nearby_attraction")}
            </div>

            <CardContainer>
              <Link
                href={
                  "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99/@13.7463371,100.5322779,17z/data=!4m10!1m2!2m1!1ssiam+paragon!3m6!1s0x30e29ecde3aee521:0x9f43939a2caf2963!8m2!3d13.7462411!4d100.5347402!15sCgxzaWFtIHBhcmFnb25aDiIMc2lhbSBwYXJhZ29ukgEPc2hvcHBpbmdfY2VudGVy4AEA!16zL20vMDltbWho?entry=ttu"
                }
              >
                <OtherCard
                  t={t}
                  title={t("siam_title")}
                  description={t("siam_description")}
                  src={siam.src}
                />
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%99+%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%A3%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/@13.7336159,100.525937,17z/data=!3m1!4b1!4m6!3m5!1s0x30e298d55b6099b5:0xe4f4cc8ef569d83f!8m2!3d13.7336159!4d100.5285119!16s%2Fg%2F11cs1tf084?entry=ttu"
                }
              >
                <OtherCard
                  t={t}
                  title={t("samyan_title")}
                  description={t("samyan_description")}
                  src={samyan.src}
                />
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/place/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%94%E0%B9%8C/@13.7465337,100.5365739,17z/data=!3m1!4b1!4m6!3m5!1s0x30e29ecfc2f455e1:0xc4ad0280d8906604!8m2!3d13.7465337!4d100.5391488!16zL20vMGZuNTdn?entry=ttu"
                }
              >
                <OtherCard
                  t={t}
                  title={t("central_title")}
                  description={t("central_description")}
                  src={central.src}
                />
              </Link>
            </CardContainer>
          </div>
        </div>
      </div>
      <div>
        <Footer t={t} />
      </div>
    </div>
  );
};

const StyledCard = styled(Card)`
  margin: 1px;
  padding: 0;
  max-width: 100%;
  height: 760px;
  border: 0px;
  border-radius: 0px !important;
  img {
    border-radius: 0px !important;
    height: 611px;
  }
  .ant-card-meta-title {
    font-size: 30px;
    font-weight: bold;
  }
  .ant-card-meta-description {
    font-size: 14px;
  }

  @media screen and (max-width: 431px) {
    max-width: 430px;
    height: 280px;

    img {
      width: 393px;
      height: 193px;
    }
    .ant-card-meta-title {
      font-size: 12px;
    }
    .ant-card-meta-description {
      font-size: 8px;
    }
  }
`;

const CardContainer = ({ children }: any) => {
  const isMobile = useMediaQuery({ query: "(max-width: 431px)" });

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    swipe: false,
    responsive: [
      {
        breakpoint: 431,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  if (isMobile) {
    return <div className="flex flex-col gap-y-2 py-2">{children}</div>;
  }

  return <Slider {...settings}>{children}</Slider>;
};

export default Home;
