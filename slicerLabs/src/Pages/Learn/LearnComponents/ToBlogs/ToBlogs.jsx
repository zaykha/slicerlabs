import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { MUHeader, MUp } from '../../../Materials/MaterialsComponents/MaterialUsage/MaterialUsagecomponent'
import { TBcontainer, TBcontent, TBFlex, TBIMG } from './ToBlogselement'
import blog3 from '../../../../assets/Blog-3.jpg'

export const ToBlogs = () => {
  return (
    <TBcontainer>
        <TBFlex>
            <TBcontent>
                <MUHeader data-aos="fade-right">Why 3D Print?</MUHeader>
                <MUp data-aos="fade-right" data-aos-delay="300">
                3D printing has revolutionized the way we create and produce objects.
                 With this technology, we can turn digital 
                 designs into physical objects with precision and accuracy. 
                 From prototyping to end-use parts, 3D printing offers 
                 endless possibilities for creating, testing and producing. 
                 With the advancement of materials and technologies, 
                 3D printing is becoming more accessible 
                and affordable for both individuals and businesses.
                </MUp>
            </TBcontent>
            <TBIMG src={blog3} data-aos="fade-left"  data-aos-delay="200"></TBIMG>
        </TBFlex>
        {/* <CTABtn>Full Article {">"}</CTABtn> */}
    </TBcontainer>
  )
}
