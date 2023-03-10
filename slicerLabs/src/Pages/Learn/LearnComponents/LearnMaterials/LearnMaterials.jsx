import React from 'react'
import { SCheader1, SSpan } from '../../../Services/Serviceselement'
import { LTsubHeader } from '../LearnTech/LearnTechelement'
import { TBcontainer } from '../ToBlogs/ToBlogselement'
import { LMContainer, LMContent, LMcontentContainer, LMheaderbtn, LMlist, LMNAV } from './LearnMaterialelements'

const LearnMaterials = () => {
  return (
    <TBcontainer>
        <LTsubHeader>OUR MATERIALS</LTsubHeader>
        <SCheader1>Made In <SSpan>SlicerLabs</SSpan> </SCheader1>

        <LMContainer>
            <LMNAV>
                <LMlist><p>Acrylonitrile Butadiene Styrene (ABS)</p></LMlist>
                <LMlist><p>Polylactic Acid (PLA)</p></LMlist>
                <LMlist><p>Thermoplastic Polyurethane(TPU)</p></LMlist>
                <LMlist><p>Nylon</p></LMlist>
                <LMlist><p>Polyethylene Terephthalate Glycol (PETG)</p></LMlist>
                <LMlist><p>Resins</p></LMlist>
            </LMNAV>

            <LMcontentContainer>
                <LMheaderbtn>PETG</LMheaderbtn>
                <LMContent>
                PETG (Polyethylene Terephthalate Glycol) is a thermoplastic material that is commonly used in Fused Deposition Modeling (FDM) 3D printing technology. It is a copolyester, a combination of PET (Polyethylene Terephthalate) and Glycol. It is known for its strong and durable properties, making it a popular choice for a wide range of applications such as end-use parts, food packaging, and household items.
One of the main advantages of using PETG in 3D printing is its ease of use. It is a filament that can be printed at relatively low temperatures, and it does not require a heated build chamber. It also has a low shrinkage rate, which means it can maintain good dimensional accuracy.

PETG is also known for its high impact resistance and chemical resistance, making it a great material for functional parts. Its transparency allows it to be used in applications such as light covers and lenses. Its high strength and flexibility make it ideal for printing gears, hinges, and other mechanical parts.
                </LMContent>
            </LMcontentContainer>
    

        </LMContainer>

    </TBcontainer>
  )
}

export default LearnMaterials
