import { Button, Card, Modal } from "antd";
import React, { Children, useState } from "react";
import styled from "styled-components";

const { Meta } = Card;

interface OthercardProps {
  src: string;
  title: string;
  description: string;
  hoverable?: boolean;
  t: any;
  onButtonClick?: () => void;
}

const Othercard: React.FC<React.PropsWithChildren<OthercardProps>> = ({
  src,
  title,
  description,
  hoverable = false,
  children,
  t,
  onButtonClick = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (hoverable) setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onButtonClick();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledCard
        style={hoverable ? { cursor: "pointer" } : {}}
        hoverable={hoverable ? true : false}
        onClick={showModal}
        cover={<img width={400} height={300} alt="example" src={src} />}
      >
        <Meta title={title} description={description} />
      </StyledCard>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            {t("book_now")}
          </Button>,
        ]}
      >
        <div className="text-body mobile:text-h5-mobile flex flex-col gap-4">
          {children}
        </div>
      </Modal>
    </>
  );
};

const StyledCard = styled(Card)`
  max-width: 400px;
  height: 460px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    border-radius: 2px !important;
  }
  .ant-card-meta-title {
    font-size: 30px;
  }
  .ant-card-meta-description {
    font-size: 14px;
  }

  @media screen and (max-width: 431px) {
    max-width: 150px;
    height: 250px;

    img {
      width: 150px;
      height: 112.5px;
    }
    .ant-card-meta-title {
      font-size: 12px;
    }
    .ant-card-meta-description {
      font-size: 8px;
    }
  }
`;

export default Othercard;
