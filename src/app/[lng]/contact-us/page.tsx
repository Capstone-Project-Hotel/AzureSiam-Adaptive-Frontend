"use client";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import LandingTopbar from "@/components/LandingTopbar";
import { useTranslation } from "@/app/i18n/client";

export default function ContactUs({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const { t } = useTranslation(lng);

  const iconStyle = { color: "#2A4D69" };

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <div className="sticky top-0 w-[100vw]">
        <Topbar lng={lng} />
      </div>
      <div className="flex flex-col bg-white flex-1 text-center">
        <p
          className="text-h1 mt-[1vw] mb-[1vw] w-[100vw] mobile:text-h1-mobile"
          style={{ color: "#2A4D69" }}
        >
          {t("contact_us_label")}
        </p>
        <p className="text-h3 mb-[1vw] w-[100vw] mobile:text-h3-mobile">
          {t("hotel")}
        </p>
        <p className="text-h4 w-[100vw] mobile:text-h4-mobile">
          {t("hotel_address")}
        </p>
        <div className="flex flex-row items-center justify-center w-[100vw] mt-[1vw]">
          <div className="flex flex-row items-center mr-[2vw]">
            <PhoneOutlined style={iconStyle} />
            <div className="ml-[1vw]">
              <p className="text-h4 mobile:text-h4-mobile">
                {t("hotel_phone")}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <MailOutlined style={iconStyle} />
            <div className="ml-[1vw]">
              <p className="text-h4 mobile:text-h4-mobile">
                azuresiam@hotelservice.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-[1.5vw] items-center justify-center px-5">
          {lng == "th" ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6625687957862!2d100.52583277589487!3d13.738867597591229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2aae33623f%3A0x421e0643a63c2093!2z4LiI4Li44Lis4Liy4Lil4LiH4LiB4Lij4LiT4LmM4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii!5e0!3m2!1sth!2sth!4v1709033731764!5m2!1sth!2sth"
              width="800"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6625687957862!2d100.52583277589487!3d13.738867597591229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2aae33623f%3A0x421e0643a63c2093!2sChulalongkorn%20University!5e0!3m2!1sen!2sth!4v1709033933904!5m2!1sen!2sth"
              width="800"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 w-[100vw]">
        <Footer t={t} />
      </div>
    </div>
  );
}
