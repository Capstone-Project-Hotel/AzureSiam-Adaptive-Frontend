import { Card } from "antd";
import styled from "styled-components";
import Image from "next/image";
import histioryCard from "../../public/historycard.png";

const { Meta } = Card;

const HistoryCard = ({ t }: { t: any }) => {
  return (
    <StyledCard
      cover={
        <Image
          width={1280}
          height={512}
          alt="histioryCard"
          src={histioryCard}
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
