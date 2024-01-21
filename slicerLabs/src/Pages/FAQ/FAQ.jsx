import React from "react";
import styled from "styled-components";
import FAQItem from "./FAQItem";
import {
  CUheader,
  CUsubheader,
} from "../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements";
import { SSpan } from "../Services/Serviceselement";

const FAQContainer = styled.div`
  // Add your styles here
  width: 1200px;
  margin: auto;
  padding: 0 40px;
  @media screen and (max-width: 1200px) {
    width: 80%;
    padding: 0;
  }
`;

const FAQ = () => {
  const faqs = [
    {
      question: "What materials can be used for 3D printing?",
      answer:
        "Various materials such as PLA, ABS, resin, PETG, TPU, and nylon can be used, depending on the printer.",
    },
    {
      question: "How long does it take to print an object?",
      answer:
        "Printing time varies based on the size and complexity of the object, ranging from 30 minutes for small, simple objects to over 24 hours for large, detailed items.",
    },
    {
      question: "What is the maximum size for a 3D print?",
      answer:
        "The maximum size is determined by the printer's build volume. For most consumer printers, this is around 25x25x30 cm.",
    },
    {
      question: "Can I print in multiple colors?",
      answer:
        "Yes, printers with multiple extruders can print in different colors or materials in a single print.",
    },
    {
      question: "How do I prepare a design for 3D printing?",
      answer:
        "Designs need to be created or modified using CAD software and exported as STL or OBJ files for 3D printing.",
    },
    {
      question: "What maintenance is required for a 3D printer?",
      answer:
        "Regular maintenance includes lubricating the moving parts, cleaning the build plate, and occasionally calibrating the printer.",
    },
    {
      question: "Is 3D printing environmentally friendly?",
      answer:
        "3D printing can be more sustainable than traditional manufacturing methods, especially when using biodegradable materials like PLA.",
    },
    {
      question: "Can I print with metal at home?",
      answer:
        "Metal printing is generally not feasible for typical home printers, but metal-filled filaments offer a metal-like finish.",
    },
    {
      question: "How accurate are 3D printers?",
      answer:
        "Most consumer-grade printers have an accuracy of around 0.1 mm, but this can vary based on the printer and settings used.",
    },
    {
      question: "Can I stop and resume a print?",
      answer:
        "Some printers have the capability to pause and resume prints, but it's best to avoid doing so unless necessary, as it can affect print quality.",
    },
    {
      question: "What software do I need to start 3D printing?",
      answer:
        "You'll need 3D modeling software to create designs, and slicing software to prepare these designs for printing.",
    },
    {
      question: "Are 3D printed objects strong?",
      answer:
        "Strength depends on the material used, print settings, and the design of the object. Some prints can be very strong and functional.",
    },
    {
      question: "How can I improve print quality?",
      answer:
        "Improving print quality can involve adjusting layer height, print speed, and temperature settings, as well as ensuring proper printer calibration.",
    },
    {
      question: "Can I 3D print a full-sized furniture?",
      answer:
        "While it's possible with industrial printers, most home printers are too small for full-sized furniture. However, you can print parts and assemble them.",
    },
    {
      question: "Is 3D printing safe?",
      answer:
        "When done properly, it's safe, but it's important to use it in a well-ventilated area and to be cautious of hot surfaces and moving parts.",
    },
    // {
    //   question: "How do I prevent my prints from warping?",
    //   answer:
    //     "Warping can be minimized by ensuring a heated bed, proper bed adhesion, and controlled ambient temperature.",
    // },
    // {
    //   question: "What is the difference between FDM and SLA printers?",
    //   answer:
    //     "FDM printers use filament and an extrusion process, while SLA printers use a resin and UV light for a more detailed but generally slower print.",
    // },
    // {
    //   question: "Can I use 3D printing for prototyping?",
    //   answer:
    //     "3D printing is excellent for prototyping due to its speed and flexibility in design changes.",
    // },
    // {
    //   question: "How to choose the right filament type?",
    //   answer:
    //     "The choice depends on the desired strength, flexibility, transparency, and the print temperature your printer can handle.",
    // },
    // {
    //   question: "What are the limitations of 3D printing?",
    //   answer:
    //     "Limitations include printer size, print material properties, and the level of detail achievable, particularly for lower-end printers.",
    // },
  ];

  return (
    <FAQContainer>
      <CUheader>
        Got <SSpan>Questions?</SSpan>
      </CUheader>
      <CUsubheader>we got you covered with a list of FAQs below</CUsubheader>
      <div style={{ marginBottom: "40px" }}></div>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </FAQContainer>
  );
};

export default FAQ;
