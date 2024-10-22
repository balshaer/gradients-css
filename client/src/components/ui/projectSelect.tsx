/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CustomStyles {
  control: (provided: React.CSSProperties) => React.CSSProperties;
  option: (provided: React.CSSProperties, state: any) => React.CSSProperties;
  singleValue: (provided: React.CSSProperties) => React.CSSProperties;
}

interface ProjectSelectProps {
  options: Option[];
  defaultValue: Option;
  onSelect: (value: Option) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultValue);

  const handleSelect = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    if (actionMeta.action === "select-option") {
      const option = newValue as Option;
      setSelectedOption(option);
      onSelect(option);
    }
  };

  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid var(--selectBox-border)",
      width: "150px",
      cursor: "pointer",
      borderRadius: "8px",
      backgroundColor: "var(--button)",
      boxShadow: "none",
      color: "var(--button-text)",
      "&:hover": {
        borderColor: "var(--button-hover)",
        color: "var(--button-text)",
      },
      "&:active": {
        color: "var(--button-text)",
      },
      "&:focus": {
        color: "var(--button-text)",
        border: "none",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--card-background)",
      color: state.isFocused ? "var(--card-headline)" : "var(--card-paragraph)",
      cursor: "pointer",
      transition: "all 0.1s ease 0s",
      "&:active": {
        backgroundColor: "var(--card-background)",
      },
      "&:focus": {
        backgroundColor: "var(--card-background)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--button-text)",
    }),
  };

  useEffect(() => {
    onSelect(selectedOption);
  }, [selectedOption, onSelect]);

  return (
    <div className="custom-select">
      <Select
        defaultValue={defaultValue}
        onChange={handleSelect}
        options={options}
        styles={customStyles as unknown as StylesConfig}
        isSearchable={false}
      />
    </div>
  );
};

export default ProjectSelect;
