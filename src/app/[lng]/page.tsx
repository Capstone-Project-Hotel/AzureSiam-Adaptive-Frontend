"use client";

import HistoryCard from "@/components/HistoryCard";
import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import OtherCard from "@/components/OtherCard";
import dynamic from "next/dynamic";
import { Card, Carousel, Input } from "antd";
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

const { Meta } = Card;

const CustomDateRange = dynamic(() => import("@/components/CustomDateRange"), {
  ssr: false,
});

const ContentStyle = styled.div<{ src: string }>`
  height: 543px;
  width: 100%;
  background-image: ${(p) => `url(${p.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 431px) {
    height: 150px;
  }
`;

import { useTranslation } from "../i18n/client";

const Home = ({ params: { lng } }: { params: { lng: any } }) => {
  const { t } = useTranslation(lng);

  const disabledDates = [
    new Date("2024-01-25"),
    new Date("2024-01-26"),
    new Date("2024-01-28"),
  ];

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
  const [open, setOpen] = useState<boolean>(false);
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

      <div className="flex justify-center mt-[110px]">
        {/* Main Container */}
        <div className="w-[1440px] mobile:w-full flex flex-col gap-10 mobile:gap-8 items-center pb-20">
          {/* Hotel Name Container */}
          <div
            style={{
              backgroundImage:
                'url("https://cdn.discordapp.com/attachments/457166097230069773/1186379702336753684/coverImage.jpg?ex=65930932&is=65809432&hm=efec0670074a80e0fc1ce6438a2272023f4fcf5fd383d4dfeb9813a8d25c2427&")',
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

            <Slider {...settings}>
              {/* Standard Room */}
              <OtherCard
                t={t}
                onButtonClick={showDrawer}
                hoverable={true}
                title={t("std_title")}
                description={t("std_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186386766119305258/cover.jpg?ex=65930fc7&is=65809ac7&hm=81597f4a64012d760e9c97c217db3cae2617d4f37183b609a89429cc3562fd42&"
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
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1186386766119305258/cover.jpg?ex=65930fc7&is=65809ac7&hm=81597f4a64012d760e9c97c217db3cae2617d4f37183b609a89429cc3562fd42&"
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
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186387436901781634/cover_1.jpg?ex=65931066&is=65809b66&hm=f75c101fa0d7768bac471cc46a3c94a94b5a1737567af3c91951c95abfc4ec9b&"
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
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1186387436901781634/cover_1.jpg?ex=65931066&is=65809b66&hm=f75c101fa0d7768bac471cc46a3c94a94b5a1737567af3c91951c95abfc4ec9b&"
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
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186387586516791326/cover_2.jpg?ex=6593108a&is=65809b8a&hm=44468b0913ab9e438ce166d2c49366e3833e42e84669ffff7b38eb770aac7c1c&"
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
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1186387586516791326/cover_2.jpg?ex=6593108a&is=65809b8a&hm=44468b0913ab9e438ce166d2c49366e3833e42e84669ffff7b38eb770aac7c1c&"
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
                src="https://cdn.discordapp.com/attachments/457166097230069773/1188826464708218920/image_41.jpg?ex=659befec&is=65897aec&hm=5a3d092015cc24fcd079f85b33341c508f33152ec6ea2e2c7b2c5796e4839e6a&"
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
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1188826464708218920/image_41.jpg?ex=659befec&is=65897aec&hm=5a3d092015cc24fcd079f85b33341c508f33152ec6ea2e2c7b2c5796e4839e6a&"
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
                src="https://cdn.discordapp.com/attachments/457166097230069773/1188826023228354650/image_40_1_1.jpg?ex=659bef83&is=65897a83&hm=6582bd0a8cc86db4a4146b452e6d4b139146174c8c42818f174afa5fbd7e6bc0&"
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
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1188826023228354650/image_40_1_1.jpg?ex=659bef83&is=65897a83&hm=6582bd0a8cc86db4a4146b452e6d4b139146174c8c42818f174afa5fbd7e6bc0&"
                    alt=""
                    className="w-[150px] aspect-[3/2] mobile:w-[80px]"
                  />
                  <img
                    src="https://cdn.discordapp.com/attachments/457166097230069773/1188856157427732520/image.png?ex=659c0b93&is=65899693&hm=290cf980bb47675679c8531bcec71e3925e2462e8057f3fd744fb8eb1ed403bf&"
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
            </Slider>
          </div>

          {/* Spa Container */}
          <div ref={facilitiesRef} />
          <div className="w-full">
            <StyledCard
              className="border-r-0"
              cover={
                <img
                  className="w-full h-[611px]"
                  alt="example"
                  src="https://cdn.discordapp.com/attachments/457166097230069773/1186388457875050618/image_22.jpg?ex=6593115a&is=65809c5a&hm=cf867db65fccb6562c196f0bea586dc9020607a9cd118e60f915961630861461&"
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
                  alt="example"
                  src="https://cdn.discordapp.com/attachments/457166097230069773/1186536405954998322/image_22_1.jpg?ex=65939b23&is=65812623&hm=51c97a045a70919c4ca3cbd6b1f023311523f8a0c7399532f14f427478e44b06&"
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

            <Slider {...settings}>
              <OtherCard
                t={t}
                title={t("fifty_title")}
                description={t("fifty_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562459033686056/image_14.jpg?ex=6593b367&is=65813e67&hm=7c031f253b7dfe592350d4690bb6d92951b739eb2871256db8fc2479304db7a0&"
              />
              <OtherCard
                t={t}
                title={t("monday_title")}
                description={t("monday_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562459331477626/cover_3.jpg?ex=6593b367&is=65813e67&hm=4585291084bf482c14175380a43ab8d406802a060167473d38bab221b79a71e0&"
              />
              <OtherCard
                t={t}
                title={t("friday_title")}
                description={t("friday_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562459604090920/cover_4.jpg?ex=6593b367&is=65813e67&hm=069041e55fe6d46f3a85f69c7600a40a3334b8feac9e86b19cd7068bb9a0e284&"
              />
            </Slider>
          </div>

          {/* Activity Schedule   Container */}
          <div ref={activityRef} />
          <div id="con" className="w-full px-[80px] mobile:px-[25px]">
            <div className="text-h1 mobile:text-h2-mobile font-bold">
              {t("activity_schedule")}
            </div>

            <Slider {...settings}>
              <OtherCard
                t={t}
                title={t("swim_title")}
                description={t("swim_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562753062785054/cover_5.jpg?ex=6593b3ad&is=65813ead&hm=5c9c2e3e9039f4b15c27f8ddd0f5fb7b5f45a8cc3b2f0c81cfc52c6cd0490c7a&"
              />
              <OtherCard
                t={t}
                title={t("medi_title")}
                description={t("medi_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562753389936750/cover_6.jpg?ex=6593b3ad&is=65813ead&hm=a9c5cb9631e12ed98d51d1f96c0bcfc87c18ea3642d48c742b35fe2ef32d94d4&"
              />
              <OtherCard
                t={t}
                title={t("rock_title")}
                description={t("rock_description")}
                src="https://cdn.discordapp.com/attachments/457166097230069773/1186562753759039508/cover_7.jpg?ex=6593b3ad&is=65813ead&hm=5633be70c54972883cda392c9079e407c231622e3d304fc2f56c15bc3cf8dcaf&"
              />
            </Slider>
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
                  <ContentStyle src="https://cdn.discordapp.com/attachments/457166097230069773/1186565137671409726/image_28.jpg?ex=6593b5e6&is=658140e6&hm=c439cc34a78e17e8d3f1c886941ad3dd92f40b5e1a9df0f87aef5dc8b6d49517&" />
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

            <Slider {...settings}>
              <Link
                href={
                  "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99/@13.7463371,100.5322779,17z/data=!4m10!1m2!2m1!1ssiam+paragon!3m6!1s0x30e29ecde3aee521:0x9f43939a2caf2963!8m2!3d13.7462411!4d100.5347402!15sCgxzaWFtIHBhcmFnb25aDiIMc2lhbSBwYXJhZ29ukgEPc2hvcHBpbmdfY2VudGVy4AEA!16zL20vMDltbWho?entry=ttu"
                }
              >
                <OtherCard
                  t={t}
                  title={t("siam_title")}
                  description={t("siam_description")}
                  src="https://cdn.discordapp.com/attachments/457166097230069773/1186563062191357963/cover_8.jpg?ex=6593b3f7&is=65813ef7&hm=e26fe4168c65d44ce4ba29ab2c2e1711997210e092255fa87d811a2a819743bf&"
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
                  src="https://cdn.discordapp.com/attachments/457166097230069773/1186563062510137374/cover_9.jpg?ex=6593b3f7&is=65813ef7&hm=37e1d1821914e1abaeb65fff72f7ee8777f76d4849725bc19bcd1c35d1c499e8&"
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
                  src="https://cdn.discordapp.com/attachments/457166097230069773/1186563062765994074/cover_10.jpg?ex=6593b3f7&is=65813ef7&hm=f5f92e930efdb887607c71c735b500194e2c94122db327962c261c387538292b&"
                />
              </Link>
            </Slider>
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

export default Home;
