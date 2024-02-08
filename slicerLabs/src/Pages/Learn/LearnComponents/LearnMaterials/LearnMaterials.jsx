import React, { useState } from "react";
import { SCheader1, SSpan } from "../../../Services/Serviceselement";
import { LTsubHeader } from "../LearnTech/LearnTechelement";
import { TBcontainer } from "../ToBlogs/ToBlogselement";
import {
  LMContainer,
  LMContent,
  LMcontentContainer,
  LMheaderbtn,
  LMlist,
  LMNAV,
} from "./LearnMaterialelements";

const LearnMaterials = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const materialsData = [
    {
      id: 1,
      name: "Acrylonitrile Butadiene Styrene (ABS)",
      header: "ABS Material",
      description:
        "ABS (Acrylonitrile Butadiene Styrene) is a common thermoplastic polymer known for its durability and impact resistance. It is widely used in applications such as automotive parts, toys, consumer goods, and various industrial applications. ABS is known for its excellent strength and toughness, making it a preferred choice for applications that require structural integrity and resistance to impact. It can be easily machined, sanded, and glued, making it versatile for both prototyping and production purposes."
    },
    {
      id: 2,
      name: "Polylactic Acid (PLA)",
      header: "PLA Material",
      description:
        "PLA (Polylactic Acid) is a biodegradable thermoplastic derived from renewable resources such as corn starch or sugarcane. It is popular for its ease of printing and eco-friendly characteristics. PLA is known for its versatility and can be used in a wide range of applications, including product prototyping, educational projects, medical models, and decorative items. It offers a smooth and glossy surface finish and can be easily painted or post-processed. PLA is an excellent choice for beginners in 3D printing due to its low printing temperatures and minimal warping."
    },
    {
      id: 3,
      name: "Thermoplastic Polyurethane (TPU)",
      header: "TPU Material",
      description:
        "TPU (Thermoplastic Polyurethane) is a flexible and elastic material with excellent wear and tear resistance. It is commonly used in applications that require flexibility, such as phone cases, footwear, and flexible hinges. TPU is known for its durability and resistance to abrasion, making it suitable for producing functional prototypes and parts subjected to repeated bending or stretching. It can be printed with ease on most Fused Deposition Modeling (FDM) 3D printers and retains its flexibility even at low temperatures. TPU is also available in various hardness levels, allowing for customization based on the desired level of flexibility and stiffness."
    },
    {
      id: 4,
      name: "Nylon",
      header: "Nylon Material",
      description:
        "Nylon is a strong and versatile thermoplastic known for its high tensile strength and durability. It is used in a wide range of applications, including automotive components, sports equipment, mechanical gears, and industrial prototypes. Nylon is favored for its excellent impact resistance and chemical stability. It is also known for its ability to maintain its structural integrity under stress, making it suitable for load-bearing parts. Nylon 3D prints typically exhibit a combination of strength, flexibility, and resilience. It is often used in applications where high-performance materials are required."
    },
    {
      id: 5,
      name: "Polyethylene Terephthalate Glycol (PETG)",
      header: "PETG Material",
      description:
        "PETG (Polyethylene Terephthalate Glycol) is a thermoplastic material that is commonly used in Fused Deposition Modeling (FDM) 3D printing technology. It is a copolyester, a combination of PET (Polyethylene Terephthalate) and Glycol. PETG is known for its strong and durable properties, making it a popular choice for a wide range of applications such as end-use parts, food packaging, and household items. One of the main advantages of using PETG in 3D printing is its ease of use. It is a filament that can be printed at relatively low temperatures, and it does not require a heated build chamber. It also has a low shrinkage rate, which means it can maintain good dimensional accuracy. PETG is also known for its high impact resistance and chemical resistance, making it a great material for functional parts. Its transparency allows it to be used in applications such as light covers and lenses. Its high strength and flexibility make it ideal for printing gears, hinges, and other mechanical parts."
    },
    {
      id: 6,
      name: "Resins",
      header: "Resin Material",
      description:
        "Resins are a category of materials used in stereolithography (SLA) and digital light processing (DLP) 3D printing technologies. They are known for producing high-quality, detailed prints and are used in various industries. Resins offer a wide range of properties, including exceptional surface finish, precision, and material transparency. They are commonly used in applications such as jewelry production, dental models, intricate prototypes, and medical devices. Resins can be formulated to achieve specific characteristics, such as high temperature resistance, biocompatibility, or rubber-like flexibility. These materials are favored for their ability to replicate intricate details and produce smooth, dimensionally accurate parts."
    },
    // Add more materials as needed
  ];
  

  // Function to handle item click
  const handleItemClick = (id) => {
    setSelectedItem(id);
  };

  // Get the selected material data
  const selectedMaterial = materialsData.find(
    (material) => material.id === selectedItem
  );
  return (
    <TBcontainer>
      <LTsubHeader>OUR MATERIALS</LTsubHeader>
      <SCheader1>
        Made In <SSpan>SlicerLabs</SSpan>{" "}
      </SCheader1>

      <LMContainer>
        <LMNAV>
          {materialsData.map((material) => (
            <LMlist
              // data-aos="fade-right"
              // data-aos-delay={material.id*100}
              key={material.id}
              onClick={() => handleItemClick(material.id)}
              className={selectedItem === material.id ? "selected" : ""}
            >
              {material.name}
            </LMlist>
          ))}
        </LMNAV>

        <LMcontentContainer data-aos="fade-up">
          {selectedMaterial && (
            <div>
              <LMheaderbtn>{selectedMaterial.header}</LMheaderbtn>
              <LMContent>{selectedMaterial.description}</LMContent>
            </div>
          )}
        </LMcontentContainer>
      </LMContainer>
    </TBcontainer>
  );
};

export default LearnMaterials;
