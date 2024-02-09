"use client";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import LandingTopbar from "@/components/LandingTopbar";
import { useTranslation } from "@/app/i18n/client";

export default function Home({ params: { lng } }: { params: { lng: any } }) {
  const { t } = useTranslation(lng);

  const iconStyle = { color: "#2A4D69" };

  return (
    <main>
      <Topbar lng={lng} />
      <div className="flex flex-col bg-white h-[72vh] p-5 text-center mobile:text-left">
        <p
          className="text-h1 mt-[1vw] mb-[1vw] w-[100vw] mobile:text-h1-mobile"
          style={{ color: "#2A4D69" }}
        >
          {t("contact_us_label")}
        </p>
        <div className="mobile:bg-[#E7EFF6] mobile:p-3">
          <p className="text-h3 mb-[1vw] w-[100vw] mobile:text-h3-mobile">
            {t("hotel")}
          </p>
          <p className="text-h4 w-[100vw] mobile:text-h4-mobile">
            {t("hotel_address")}
          </p>
        </div>
        <div className="flex flex-col mobile:flex-row mobile:gap-2">
          <div className="flex flex-row items-center justify-center w-[100vw] mt-[1vw] mobile:gap-2 mobile:flex-col mobile:w-[40vw] mobile:p-3 mobile:bg-[#E7EFF6]">
            <div className="flex flex-row items-center mr-[2vw] mobile:flex-col mobile:gap-2">
              <PhoneOutlined style={iconStyle} />
              <div className="ml-[1vw]">
                <p className="text-h4 mobile:text-h4-mobile">
                  {t("hotel_phone")}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mobile:flex-col mobile:gap-2">
              <MailOutlined style={iconStyle} />
              <div className="ml-[1vw]">
                <p className="text-h4 mobile:text-h4-mobile">
                  azuresiam@hotelservice.com
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-[1.5vw] items-center justify-center">
            <img
              src={"https://via.placeholder.com/800x300"}
              alt="Google Map Mock"
              className="w-[55vw] h-[19vw]"
            />
          </div>
        </div>
      </div>
      <Footer t={t} />
    </main>
  );
}
