"use client";
import useStore from "@/hooks/useStore";
import { Checkbox, Select, DatePicker, InputNumber, Input } from "antd";

type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>["onChange"]>
>[0];
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
dayjs().format();

import { useRouter } from "next/navigation";
import type { CheckboxProps } from "antd";
import { runes } from "runes2";
import { useMediaQuery } from "react-responsive";
export default function Filter({ t }: { t: any }) {
  const { RangePicker } = DatePicker;
  const CheckboxGroup = Checkbox.Group;

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { bookingDetail, setBookingDetail, currency, exchangeRate } =
    useStore();

  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 431px)" });

  const handlePriceSelectChange = (data: string) => {
    // console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    console.log(data);
    // let info = data.value;
    switch (data) {
      case "Not exceeding THB 1,500": {
        setBookingDetail({
          ...bookingDetail,
          showBelowOption1: true,
          showBelowOption2: false,
          showBelowOption3: false,
        });
        console.log("test1");
        break;
      }
      case "Not exceeding THB 2,000": {
        setBookingDetail({
          ...bookingDetail,
          showBelowOption1: false,
          showBelowOption2: true,
          showBelowOption3: false,
        });
        console.log("test2");
        break;
      }
      case "Not exceeding THB 2,500": {
        setBookingDetail({
          ...bookingDetail,
          showBelowOption1: false,
          showBelowOption2: false,
          showBelowOption3: true,
        });
        console.log("test3");
        break;
      }
      default: {
        setBookingDetail({
          ...bookingDetail,
          showBelowOption1: false,
          showBelowOption2: false,
          showBelowOption3: false,
        });
        console.log("default");
        break;

        // console.log(bookingDetail);
      }
    }
  };

  return (
    <div className="w-full flex-row bg-secondary pt-3 pb-3 [4.16vw]">
      <div className="my-[20px] mx-10">
        <p className="text-white text-h3 font-bold mobile:text-h3-mobile">
          {t("booking_detail")}
        </p>
        <div className="flex gap-x-5 justify-between mobile:flex-wrap mobile:space-y-3 mobile:space-x-0 mobile:justify-start">
          <div className="flex-1">
          <RangePicker
            showTime={isMobile}
            value={[
              dayjs(bookingDetail.startDate, "DD-MM-YYYY"),
              dayjs(bookingDetail.endDate, "DD-MM-YYYY"),
            ]}
            format={["DD-MM-YYYY"]}
            style={{ width: "300px", height: "30px" }}
            onChange={(RangePicker, dateStrings: [string, string]) => {
              const [startDate, endDate] = dateStrings;

              if (startDate === "" && endDate === "") {
                console.log("clear value");
              } else {
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
          />
          </div>
          <div className="flex flex-1 gap-x-10">
            <div className="flex mobile:items-center">
              <div className="mr-2 mobile:w-14 text-white text-h4 mobile:text-h4-mobile">
                {t("adults")}
              </div>
              <InputNumber
                style={{ width: "50px", height: "30px" }}
                value={bookingDetail.adultNumber}
                onChange={(e: number | null) => {
                  if (e != null) {
                    let updatedAdultNumber = e;
                    if (updatedAdultNumber < 1) {
                      updatedAdultNumber = 1;
                    }
                    const updatedBookingDetail = {
                      ...bookingDetail,
                      adultNumber: updatedAdultNumber,
                    };
                    setBookingDetail(updatedBookingDetail);
                    router.replace(
                      `/search-result/startDate=${bookingDetail.startDate}&endDate=${bookingDetail.endDate}&adults=${updatedAdultNumber}&childrens=${bookingDetail.childrenNumber}`
                    );
                  }
                }}
              />
            </div>
            <div className="flex mobile:items-center">
              <p className=" mr-2 mobile:w-10 text-white text-h4 mobile:text-h4-mobile">
                {t("children")}
              </p>
              <InputNumber
                style={{ width: "50px", height: "30px" }}
                value={bookingDetail.childrenNumber}
                onChange={(e: number | null) => {
                  if (e != null) {
                    let updatedChildrenNumber = e;

                    if (updatedChildrenNumber < 0) {
                      updatedChildrenNumber = 0;
                    }

                    const updatedBookingDetail = {
                      ...bookingDetail,
                      childrenNumber: updatedChildrenNumber,
                    };

                    setBookingDetail(updatedBookingDetail);

                    router.replace(
                      `/search-result/startDate=${bookingDetail.startDate}&endDate=${bookingDetail.endDate}&adults=${bookingDetail.adultNumber}&childrens=${updatedChildrenNumber}`
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-1 mobile:flex-0 flex-col">
            <div className="flex mobile:items-center">
              <p className=" mr-2 mobile:w-14 text-white text-h4 mobile:text-h4-mobile">
                {t("code")}
              </p>
              <Input
                placeholder={t("promo_placeholder")}
                className="w-[250px] mobile:h-[42px]"
                count={{
                  show: true,
                  max: 8,
                  strategy: (txt) => runes(txt).length,
                  exceedFormatter: (txt, { max }) =>
                    runes(txt).slice(0, max).join(""),
                }}
                value={bookingDetail.codePromotion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updatedCodePromotion = e.target.value;
                  console.log(updatedCodePromotion.length);
                  if (updatedCodePromotion.length <= 8) {
                    const updatedBookingDetail = {
                      ...bookingDetail,
                      codePromotion: updatedCodePromotion,
                    };
                    setBookingDetail(updatedBookingDetail);
                    // router.replace(
                    //   `/search-result/startDate=${bookingDetail.startDate}&endDate=${bookingDetail.endDate}&adults=${bookingDetail.adultNumber}&childrens=${bookingDetail.childrenNumber}&codePromo=${updatedCodePromotion}`
                    // );
                  } else {
                    // Prevent the default behavior when character count exceeds
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {bookingDetail.codePromotion === "valid001" ? (
              <div className="flex justify-end">
                <i className="pi pi-check-circle text-white text-xl mobile:text-h4-mobile mt-1 ml-1"></i>
                <p className="ml-2 mr-2 text-white text-body mobile:text-h5-mobile mt-1">
                  {t("discount")} 20%
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex justify-between ml-10 mr-10 my-2 gap-x-5 mobile:gap-y-6 mobile:flex-col">
        <div>
          <p className="text-white text-h3 font-bold mobile:text-h3-mobile">
            {t("room_type")}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              defaultChecked={bookingDetail.showStandard}
              onChange={(e) => {
                setBookingDetail({
                  ...bookingDetail,
                  showStandard: e.target.checked,
                });

                console.log(bookingDetail.showStandard);
                // setShowStandard(e.target.checked);
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("std_title")}
              </p>
            </Checkbox>
            <Checkbox
              defaultChecked={bookingDetail.showDeluxe}
              onChange={(e) => {
                setBookingDetail({
                  ...bookingDetail,
                  showDeluxe: e.target.checked,
                });
                // setShowDeluxe(e.target.checked)
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("dlx_title")}
              </p>
            </Checkbox>
            <Checkbox
              defaultChecked={bookingDetail.showFamily}
              onChange={(e) => {
                // setShowFamily(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showFamily: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("fml_title")}
              </p>
            </Checkbox>
            <Checkbox
              defaultChecked={bookingDetail.showSuite}
              onChange={(e) => {
                // setShowSuite(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showSuite: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("s_title")}
              </p>
            </Checkbox>
            <Checkbox
              defaultChecked={bookingDetail.showExecutive}
              onChange={(e) => {
                // setShowExectutive(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showExecutive: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("ex_title")}
              </p>
            </Checkbox>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-white text-h3 font-bold mobile:text-h3-mobile">
            {t("room_feature")}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-row items-center">
            <Checkbox
              defaultChecked={bookingDetail.showOnlyBalcony}
              onChange={(e) => {
                // setShowOnlyBalcony(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showOnlyBalcony: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                <div>{t("city_view")}</div>
                <div>{t("balcony_included")}</div>
              </p>
            </Checkbox>
            </div>
            <div className="flex flex-row items-center">
            <Checkbox
              defaultChecked={bookingDetail.showOnlyDinnerPlan}
              onChange={(e) => {
                // setShowOnlyDinnerPlan(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showOnlyDinnerPlan: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("dinner")}
              </p>
            </Checkbox>
            </div>
            <div className="flex flex-row items-center">
            <Checkbox
              defaultChecked={bookingDetail.showOnlyJacuzzi}
              onChange={(e) => {
                // setShowOnlyJacuzzi(e.target.checked)
                setBookingDetail({
                  ...bookingDetail,
                  showOnlyJacuzzi: e.target.checked,
                });
              }}
            >
              <p className="text-white text-h5 mobile:text-h5-mobile">
                {t("jacuzzi")}
              </p>
            </Checkbox>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-white text-h3 font-bold mobile:text-h3-mobile">
            {t("price")}
          </p>
          <div className="">
          <Select
            defaultValue={t("price_default")}
            className="w-[220px] price-select mobile:flex-1"
            onChange={handlePriceSelectChange}
            options={[
              {
                value: "Any price is acceptable",
                label: t("price_default"),
              },
              {
                value: "Not exceeding THB 1,500",
                label:
                  t("price_not_exceeding") +
                  " " +
                  currency +
                  " " +
                  (1500 * exchangeRate).toPrecision(4).toString(),
              },
              {
                value: "Not exceeding THB 2,000",
                label:
                  t("price_not_exceeding") +
                  " " +
                  currency +
                  " " +
                  (2000 * exchangeRate).toPrecision(4).toString(),
              },
              {
                value: "Not exceeding THB 2,500",
                label:
                  t("price_not_exceeding") +
                  " " +
                  currency +
                  " " +
                  (2500 * exchangeRate).toPrecision(4).toString(),
              },
            ]}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
