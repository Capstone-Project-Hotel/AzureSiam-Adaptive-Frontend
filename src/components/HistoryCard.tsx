import { Card } from "antd";
import styled from "styled-components";

import { useTranslation } from "@/app/i18n/client";

const { Meta } = Card;

const HistoryCard = ({ t }: { t: any }) => {
  return (
    <StyledCard
      cover={
        <img
          width={1280}
          height={512}
          alt="example"
          src="https://cdn.discordapp.com/attachments/457166097230069773/1182354485096497322/image.png?ex=6584646c&is=6571ef6c&hm=be00f7c469d5c40d961f5bdaa7023c525bd0efabfc3c94551b8ce9ccb9cac4c7&"
        />
      }
    >
      <Meta title={t("history_title")} description={t("history_description")} />
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  max-width: 1280px;
  height: 650px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    border-radius: 2px !important;
  }
  .ant-card-meta-title {
    font-weight: bold;
    font-size: 30px;
  }
  .ant-card-meta-description {
    font-size: 14px;
  }

  @media screen and (max-width: 431px) {
    max-width: 431px;
    height: 313px;
    padding-bottom: 10px;

    img {
      width: 330px;
      height: 204px;
    }
    .ant-card-meta-title {
      font-weight: bold;
      font-size: 12px;
    }
    .ant-card-meta-description {
      font-size: 8px;
    }
  }
`;

export default HistoryCard;
