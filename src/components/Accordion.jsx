import { Stack } from "react-bootstrap";
import CheckMarkIcon from "../icons/CheckMark";
import { themeColors } from "../theme";
import ArrowIcon from "../icons/Arrow";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import lodash from "lodash";
import { useState } from "react";
import {
  correctMistake,
  correctMistakes,
} from "../redux/features/api/apiSlice";
const CustomAccordion = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div>
      {accordionData.map(({ title, color, value }, index) => {
        return (
          <AccordionItem
            key={index}
            title={title}
            color={color}
            isSelected={selectedIndex === index}
            setSelectedIndex={setSelectedIndex}
            index={index}
            value={value}
          />
        );
      })}
    </div>
  );
};

export default CustomAccordion;

const AccordionItem = ({
  title,
  color,
  isSelected,
  setSelectedIndex,
  index,
  value,
}) => {
  const state = useAppSelector((state) => state);
  const objectErrors = state.checker.mistakes[value];
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="accordion-item p-3">
        <Stack
          direction="horizontal"
          className="justify-content-between z-3"
          role="button"
          onClick={() => {
            setSelectedIndex((prev) => (prev === index ? null : index));
          }}
        >
          <Stack direction="horizontal" gap={2}>
            <span>
              <CheckMarkIcon color={color} />
            </span>
            <span>{title}</span>
          </Stack>
          <ArrowIcon
            width={10}
            height={10}
            rotate={isSelected ? 270 : 90}
            color={themeColors.colors.primary}
          />
        </Stack>
      </div>
      {isSelected && (
        <div
          style={{
            background: "rgba(0,0,0,0.1)",
          }}
          className="p-2 accordion-content"
        >
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between"
          >
            <span className="label">
              {Object.keys(objectErrors || {}).length} خطأ
            </span>

            <span
              className="btn btn-primary label"
              onClick={() => dispatch(correctMistakes(objectErrors || {}))}
            >
              {title}
            </span>
          </Stack>

          {!!Object.keys(objectErrors || {}).length && (
            <div className="bg-light rounded shadow p-2 mt-2">
              {Object.keys(objectErrors || {}).map((key, index) => {
                const error = objectErrors ? objectErrors[key] : null;
                if (!error) return null;
                return (
                  <span key={index}>
                    <span className="btn btn-outline-danger label  m-1">
                      {key}
                    </span>
                    {" -> "}
                    <span>
                      {lodash.isArray(error) ? (
                        error.map((errorText, index) => (
                          <span
                            className="btn btn-outline-primary label m-1"
                            role="button"
                            key={index}
                            onClick={() => {
                              dispatch(
                                correctMistake({ mistake: key, correct: error })
                              );
                            }}
                          >
                            {errorText}
                          </span>
                        ))
                      ) : (
                        <span
                          className="btn btn-outline-primary label m-1"
                          role="button"
                          key={index}
                          onClick={() => {
                            dispatch(
                              correctMistake({ mistake: key, correct: error })
                            );
                          }}
                        >
                          {error}
                        </span>
                      )}
                    </span>

                    <br></br>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const accordionData = [
  {
    title: "الأخطاء الاملائية",
    color: themeColors.colors.secondary,
    value: "Spelling Mistakes",
  },
  {
    title: "التدقيق النحوي",
    color: themeColors.colors.primary,
    value: "Grammar Check",
  },
  {
    title: "الصياغة",
    color: themeColors.colors.warning,
    value: "Lexicon",
  },
  {
    title: "المعجم",
    color: themeColors.colors.success,
    value: "Drafting",
  },
  {
    title: "تصحيحات اخرى",
    color: themeColors.colors.dark,
    value: "Other Corrections",
  },
];
