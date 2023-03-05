import React from 'react'
import { SCheader1, SSpan } from '../../Serviceselement'
import { 
    SMCard, 
    SMCardContainer, 
    SMContainer, 
    SMcontent, 
    SMheader
} from './SMaterialselements'

const SMaterials = () => {
  return (
    <SMContainer>
        <SCheader1>Our <SSpan> Materials </SSpan> Includes</SCheader1>
        <SMCardContainer>
            <SMCard>
                <SMheader>Plastic</SMheader>
                <SMcontent>Thermoplastic can be used to create a wide range of products. 
                    Some popular plastics used in 3D printing include ABS, PLA, PETG, Nylon and TPU.</SMcontent>
            </SMCard>
            <SMCard>
                <SMheader>Ceramics</SMheader>
                <SMcontent>3D printing technology can also be used to print ceramic materials, such as porcelain and clay.</SMcontent>
            </SMCard>
            <SMCard>
                <SMheader>Bio-materials</SMheader>
                <SMcontent>3D printing technology can be used to print with bio-materials, 
                    such as cells, hydrogels and other biological materials, 
                    which are used in the medical field for tissue engineering, 
                    drug development and regenerative medicine.</SMcontent>
            </SMCard>
            <SMCard>
                <SMheader>Composites</SMheader>
                <SMcontent>3D printing technology can also 
                    be used to print parts using composites materials such as carbon fiber, glass fiber, 
                    and other materials which are reinforced with fibers.</SMcontent>
            </SMCard>
        </SMCardContainer>

    </SMContainer>
  )
}

export default SMaterials