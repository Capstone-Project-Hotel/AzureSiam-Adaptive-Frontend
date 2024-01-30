import { BlockOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Footer({ t }: { t: any }) {
  return (
    <div
      className="flex flex-row w-full h-[170px] px-[4.16vw] items-center justify-between"
      style={{ backgroundColor: "#2A4D69", color: "white", overflow: "hidden" }}
    >
      <div className="flex flex-row items-center">
        <BlockOutlined style={{ fontSize: "8vh", color: "white" }} />
        <div className="flex flex-col px-[2.08vw] gap-y-1">
          <p className="text-h3 font-regular mobile:text-h3-mobile">
            {" "}
            {t("hotel")}{" "}
          </p>
          <p className="text-h5 font-regular mobile:text-h5-mobile">
            {" "}
            {t("hotel_phone")}
          </p>
          <p className="text-h5 font-regular mobile:text-h5-mobile">
            azuresiam@hotelservice.com
          </p>
          <p className="text-h5 font-regular mobile:text-h5-mobile">
            {" "}
            {t("hotel_address")}
          </p>
        </div>
      </div>
      <Link href="/contact-us">
        <p className="text-h5  font-regular ml-[2.08vw] mobile:text-h3-mobile">
          <br />
          <br />
          <br />
          {t("contact_us_label")}
        </p>
      </Link>
    </div>
  );
}
