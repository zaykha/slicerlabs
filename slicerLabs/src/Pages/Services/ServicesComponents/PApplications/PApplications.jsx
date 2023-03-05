import React from 'react'
import { SCheader1 } from '../../Serviceselement'
import { 
    PAppBackground, 
    PAppcard, 
    PAppcardContainer,
    PAppcontainer
} from './PApplicationselements'

const PApplications = () => {
  return (
<PAppBackground>
    <PAppcontainer>
        <SCheader1>Products Applications</SCheader1>
        <PAppcardContainer>
            <PAppcard>
                Prototyping
            </PAppcard>
            <PAppcard>
                End-use parts
            </PAppcard>
            <PAppcard>
                Custom designs
            </PAppcard>
        </PAppcardContainer>
    </PAppcontainer>
</PAppBackground>
  )
}

export default PApplications