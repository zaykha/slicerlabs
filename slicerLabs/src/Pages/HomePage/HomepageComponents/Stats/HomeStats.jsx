import React from 'react'
import { 
    HomeStatsContainer, 
    HSFlex, 
    HSHeader, 
    HSp, 
    ResponsiveContainer, 
    Sfoot, 
    Shead, 
    SIMG, 
    Stats
} from './HomeStatselement';

import Statsimg1 from '../../../../assets/Statsimg1-removebg-preview.png';
import Statsimg2 from '../../../../assets/Statsimg2-removebg-preview.png';
import Statsimg3 from '../../../../assets/Statsimg3-removebg-preview.png';
import Statsimg4 from '../../../../assets/Statsimg4-removebg-preview.png';

const HomeStats = () => {
  return (
    <HomeStatsContainer>
        <ResponsiveContainer>
            <HSHeader>
                Experience the power of 3D printing
            </HSHeader>
            <HSp>from design to delivery</HSp>

            <HSFlex>
                <Stats>
                    <Shead>
                        1-1000 parts
                    </Shead>
                    <SIMG src={Statsimg1}></SIMG>
                    <Sfoot>
                        Advance tech production
                    </Sfoot>
                </Stats>

                <Stats>
                    <Shead>
                        38% savings
                    </Shead>
                    <SIMG src={Statsimg2}></SIMG>
                    <Sfoot>
                        Competitive Pricing
                    </Sfoot>
                </Stats>

                <Stats>
                    <Shead>
                        3s Quote
                    </Shead>
                    <SIMG src={Statsimg3}></SIMG>
                    <Sfoot>
                        Instant Quotations
                    </Sfoot>
                </Stats>

                <Stats>
                    <Shead>
                        1-4 days
                    </Shead>
                    <SIMG src={Statsimg4}></SIMG>
                    <Sfoot>
                        Lightning fast
                    </Sfoot>
                </Stats>
            </HSFlex>
        </ResponsiveContainer>
    </HomeStatsContainer>
  )
}

export default HomeStats