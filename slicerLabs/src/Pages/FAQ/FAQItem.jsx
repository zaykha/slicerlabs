import React, { useState } from 'react';
import styled from 'styled-components';

const Question = styled.div`
  cursor: pointer;
//   font-weight: bold;
  padding: 10px 20px;
  background: linear-gradient(157.38deg, #083347 14.7%, #005076 85.3%);
  border-radius: 5px;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-top: 10px;
  color: white;
  &:hover {
    background-color: #e7e7e7;
  }

  transition: background-color 0.5s ease;
`;

const Answer = styled.div`
  padding: 15px 20px;
  border-left: 3px solid #083347;
//   background-color: #f9f9f9;
  margin-bottom: 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  line-height: 1.5;
  display: none;
  color: white;
  &.open {
    display: block;
    animation: fadeIn 0.8s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const FAQItemContainer = styled.div`
  &:first-child ${Question} {
    margin-top: 0;
  }
`;

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FAQItemContainer>
    <Question onClick={toggle}>{question}</Question>
    <Answer className={isOpen ? 'open' : ''}>{answer}</Answer>
  </FAQItemContainer>
  );
};

export default FAQItem;
