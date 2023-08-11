import React, { useState } from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(8, 51, 71, 0.93) 0%,
    rgba(0, 80, 118, 0.93) 100%
  );

  color: #ffffff;
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  height: 45px;
  &:hover {
    background-color: #3284b5;
  }
`;

const DropdownIcon = styled(RiArrowDropDownLine)`
  position: absolute;
  right: 0;
  font-size: 20px;
`;

const DropdownList = styled.ul`
  position: absolute;
  left: 0;
  background-color: #265d78;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 4;
  top: ${(props) =>
    props.isLastItemTrue
      ? "-460%"
      : "100%"};
`;

const DropdownListItem = styled.li`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: white;
  &:hover {
    background-color: #3284b5;
  }
`;

const StatusDropdown = ({
  options,
  selectedOption,
  onSelect,
  isOpen,
  onClick,
  isLastItemTrue,
  itemCount,
}) => {
  // console.log(selectedOption)
  return (
    <DropdownContainer>
      <DropdownButton onClick={onClick}>
        {selectedOption || "Select Status"}
      </DropdownButton>
      <DropdownList
        isOpen={isOpen}
        isLastItemTrue={isLastItemTrue}
        itemCount={itemCount}
      >
        {options.map((option, index) => (
          <DropdownListItem key={index} onClick={() => onSelect(option)}>
            {option}
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default StatusDropdown;
