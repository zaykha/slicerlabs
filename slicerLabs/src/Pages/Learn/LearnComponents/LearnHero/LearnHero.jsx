import React, { useEffect, useRef } from 'react';
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { 
    LHcontainer, 
    LHcontents, 
    LHheader,
    LHp,
    LHsubHeader,
    ScrollLinks,
    SLCard
} from './LearnHeroelement'

const LearnHero = () => {
  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const aboveHeight = aboveDivRef.current.getBoundingClientRect().height;
      belowDivRef.current.style.top = `${aboveHeight+50}px`;
    };
    
    updatePosition(); // Set initial position on page load
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);
  return (
    <LHcontainer ref={aboveDivRef}>
        <LHcontents>
            <LHheader>Learn more about 3D printing!</LHheader>
            <LHsubHeader>-SLA & FDM</LHsubHeader>
            <LHp>Each technology has its own set of advantages 
                and limitations, and the choice of technology will depend on the specific
                 requirements of the project, such as resolution, 
                 strength, flexibility, and cost.</LHp>
                 <CTABtn>Know More</CTABtn>
        </LHcontents>
        

        <ScrollLinks ref={belowDivRef}>
            <SLCard>OUR TECHNOLOGIES</SLCard>
            <SLCard>OUR MATERIALS</SLCard>
            <SLCard>OUR SERVICES</SLCard>
        </ScrollLinks>
    </LHcontainer>
  )
}

export default LearnHero