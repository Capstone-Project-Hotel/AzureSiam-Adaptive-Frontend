"use client";

import { addDays, format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import useStore from "@/hooks/useStore";

interface CustomDateRangeProps {
  disabledDates?: Date[];
  size?: string;
  onDatesChange: (dates: any) => void;
}

const CustomDateRange: React.FC<CustomDateRangeProps> = ({
  disabledDates = [],
  size = "large",
  onDatesChange,
}) => {
  const [state, setState] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const [maxDate, setMaxDate] = useState<Date>(addDays(new Date(), 999999));
  const [myDisabledDates, setMyDisabledDates] = useState<Date[]>(disabledDates);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 431px)" });
  const { currency, exchangeRate } = useStore();

  const lowestPrice = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(1200 * exchangeRate);

  const customDayContent = (day: any) => {
    const disabledDatesFormat = disabledDates.map((d) => {
      return format(d, "dd/MM/yyyy");
    });

    if (day.getDay() == 1 || day.getDay() == 5) {
      const lowestPrice = new Intl.NumberFormat("th-TH", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(1000 * exchangeRate);
      return (
        <div>
          <span
            className="cell-day"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!disabledDatesFormat.includes(format(day, "dd/MM/yyyy")) &&
              (day.getTime() >= new Date().getTime() ||
                format(day, "dd/MM/yyyy") ==
                  format(new Date(), "dd/MM/yyyy")) &&
              `${currency}${lowestPrice}`}
          </span>
          <span>{format(day, "d")}</span>
        </div>
      );
    }

    if (day.getDay() == 6) {
      const lowestPrice = new Intl.NumberFormat("th-TH", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(1400 * exchangeRate);
      return (
        <div>
          <span
            className="cell-day"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!disabledDatesFormat.includes(format(day, "dd/MM/yyyy")) &&
              (day.getTime() >= new Date().getTime() ||
                format(day, "dd/MM/yyyy") ==
                  format(new Date(), "dd/MM/yyyy")) &&
              `${currency}${lowestPrice}`}
          </span>
          <span>{format(day, "d")}</span>
        </div>
      );
    }

    return (
      <div>
        <span
          className="cell-day"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {!disabledDatesFormat.includes(format(day, "dd/MM/yyyy")) &&
            (day.getTime() >= new Date().getTime() ||
              format(day, "dd/MM/yyyy") == format(new Date(), "dd/MM/yyyy")) &&
            `${currency}${lowestPrice}`}
        </span>
        <span>{format(day, "d")}</span>
      </div>
    );
  };

  const handleDateChange = (ranges: any) => {
    setIsEnd(!isEnd);
    const { selection } = ranges;
    for (var i = 0; i < disabledDates.length; i++) {
      if (selection.startDate < disabledDates[i]) {
        setMyDisabledDates([...disabledDates.slice(0, i)]);
        setMaxDate(disabledDates[i]);
        break;
      }
    }
    if (
      isEnd &&
      selection.startDate.toISOString().substring(0, 10) ==
        selection.endDate.toISOString().substring(0, 10)
    ) {
      selection.endDate = addDays(selection.startDate, 1);
    }
    if (selection.startDate < selection.endDate) {
      setMaxDate(addDays(new Date(), 999999));
      setMyDisabledDates(disabledDates);
    }
    setState([selection]);
    onDatesChange(selection);
  };

  if (size == "small") {
    if (isMobile) {
      return (
        <StyledDateRangeSmall
          onChange={handleDateChange}
          ranges={state}
          minDate={new Date()}
          maxDate={maxDate}
          months={2}
          direction="vertical"
          dayContentRenderer={customDayContent}
          disabledDates={myDisabledDates}
          moveRangeOnFirstSelection={false}
          rangeColors={["#2A4D69"]}
          showDateDisplay={false}
          fixedHeight={true}
        />
      );
    }
    return (
      <StyledDateRangeSmall
        onChange={handleDateChange}
        ranges={state}
        minDate={new Date()}
        maxDate={maxDate}
        months={2}
        direction="horizontal"
        dayContentRenderer={customDayContent}
        disabledDates={myDisabledDates}
        moveRangeOnFirstSelection={false}
        rangeColors={["#2A4D69"]}
        showDateDisplay={false}
        fixedHeight={true}
      />
    );
  } else if (size == "large") {
    return (
      <StyledDateRangeLarge
        onChange={handleDateChange}
        ranges={state}
        minDate={new Date()}
        maxDate={maxDate}
        months={1}
        direction="horizontal"
        dayContentRenderer={customDayContent}
        disabledDates={myDisabledDates}
        moveRangeOnFirstSelection={false}
        rangeColors={["#2A4D69"]}
        showDateDisplay={false}
        fixedHeight={true}
      />
    );
  }
};

const StyledDateRangeLarge = styled(DateRange)`
  .rdrStartEdge,
  .rdrDayStartPreview {
    border-top-left-radius: 0.88em !important;
    border-bottom-left-radius: 0.88em !important;
  }

  .rdrEndEdge,
  .rdrDayEndPreview {
    border-top-right-radius: 0.88em !important;
    border-bottom-right-radius: 0.88em !important;
  }

  .rdrDayToday .rdrDayNumber span {
    &:after {
      display: none;
    }
  }

  .rdrMonth {
    padding: 0 1rem !important;
    height: fit-content !important;
  }

  /* Change Height of Day Box */
  .rdrDay {
    height: 80px !important;
  }

  /* Change Font Size of DateRange */
  .rdrDateRangeWrapper {
    font-size: 20px !important;
  }
  .rdrMonthAndYearPickers select {
    font-size: 16px !important;
  }
  .cell-day {
    font-size: 10px !important;
    top: 70%;
  }

  /* Change Width of DateRange */
  .rdrDateRangeWrapper,
  .rdrMonth {
    width: 700px !important;
  }

  @media screen and (max-width: 431px) {
    /* Change Height of Day Box */
    .rdrDay {
      height: 55px !important;
    }

    /* Change Font Size of DateRange */
    .rdrDateRangeWrapper {
      font-size: 16px !important;
    }
    .rdrMonthAndYearPickers select {
      font-size: 14px !important;
    }
    .cell-day {
      font-size: 5px !important;
      top: 75%;
    }

    /* Change Width of DateRange */
    .rdrDateRangeWrapper,
    .rdrMonth {
      width: 350px !important;
    }
  }
`;

const StyledDateRangeSmall = styled(DateRange)`
  .rdrStartEdge,
  .rdrDayStartPreview {
    border-top-left-radius: 0.88em !important;
    border-bottom-left-radius: 0.88em !important;
  }

  .rdrEndEdge,
  .rdrDayEndPreview {
    border-top-right-radius: 0.88em !important;
    border-bottom-right-radius: 0.88em !important;
  }

  .rdrDayToday .rdrDayNumber span {
    &:after {
      display: none;
    }
  }

  .rdrMonth {
    padding: 0 1rem !important;
    height: fit-content !important;
  }

  /* Change Height of Day Box */
  .rdrDay {
    height: 65px !important;
  }

  /* Change Font Size of DateRange */
  .rdrDateRangeWrapper {
    font-size: 10px !important;
  }
  .rdrMonthAndYearPickers select {
    font-size: 14px !important;
  }
  .cell-day {
    font-size: 8px !important;
    top: 75%;
  }

  /* Change Width of DateRange */
  .rdrDateRangeWrapper,
  .rdrMonth {
    width: 540px !important;
  }

  @media screen and (max-width: 431px) {
    /* Change Height of Day Box */
    .rdrDay {
      height: 55px !important;
    }

    /* Change Font Size of DateRange */
    .rdrDateRangeWrapper {
      font-size: 16px !important;
    }
    .rdrMonthAndYearPickers select {
      font-size: 14px !important;
    }
    .cell-day {
      font-size: 5px !important;
      top: 75%;
    }

    /* Change Width of DateRange */
    .rdrDateRangeWrapper,
    .rdrMonth {
      width: 350px !important;
    }
  }
`;

export default CustomDateRange;
