import React from "react";
import { CTAh1, InfoCTAContainer, Sheader } from "../InfoCTA/InfoCTAelement";
import { HSFlex } from "../Stats/HomeStatselement";
import { ToServicesContainer } from "../ToServices/ToServiceselement";
import {
  Avatar,
  Avatarname,
  CTAh2,
  Testcontainer,
  Testimonialp,
} from "./Testimonialselement";
import customer1 from "../../../../assets/cusomer1.jpg";
import customer2 from "../../../../assets/cusomer2.jpg";
import customer3 from "../../../../assets/cusomer3.jpg";
import customer4 from "../../../../assets/cusomer4.png";
import customer5 from "../../../../assets/cusomer5.png";

const Testimonials = () => {
  const testimonials = [
    {
      avatar: customer1,
      name: "Bec Brodie",
      comment: "Excellent quality and service...",
    },
    {
      avatar: customer2,
      name: "Ng Luo Wei",
      comment: "Affordable pricing with great printing quality...",
    },
    {
      avatar: customer3,
      name: "Mark Smith",
      comment: "Really great team to deal with. I’ll be back soon!",
    },
    {
      avatar: customer4,
      name: "Mark Smith",
      comment: "Really great team to deal with. I’ll be back soon!",
    },
    {
      avatar: customer5,
      name: "Mark Smith",
      comment: "Really great team to deal with. I’ll be back soon!",
    },
    // Add more testimonial objects as needed
  ];

  return (
    <ToServicesContainer>
      <InfoCTAContainer>
        <CTAh1>
          Trusted By Our Customers
        </CTAh1><Sheader>-working with True wonder</Sheader>
        <Testcontainer>
          {testimonials.map((testimonial, index) => (
            <Avatar key={index} src={testimonial.avatar}></Avatar>
          ))}
        </Testcontainer>
      </InfoCTAContainer>
    </ToServicesContainer>
  );
};

export default Testimonials;
