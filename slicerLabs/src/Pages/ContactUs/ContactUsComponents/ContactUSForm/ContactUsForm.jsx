import React from 'react'

const ContactUsForm = () => {
  return (
    <>
        <CUheader>Contact <SSpan>Us</SSpan></CUheader>
        <CUsubheader>We will get back to you within 1 business day.</CUsubheader>

        <CUFContainer>
            <CUFstats>
                <CUFstatscontainer>
                    <CUFstatsimg></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>Address</CUFstatshead>
                        <CUFstatscontent>3A Toh Guan Rd E, Singapore 608834</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>
                
                <CUFstatscontainer>
                    <CUFstatsimg></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>Contact</CUFstatshead>
                        <CUFstatscontent>+65 6848 1548, +65 6784 1579</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                <CUFstatscontainer>
                    <CUFstatsimg></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>E-mail</CUFstatshead>
                        <CUFstatscontent>contact@slicerlabs.com</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                <CUFCTAcard>
                    <CUFCTAcardheader>Stay connected with Us</CUFCTAcardheader>
                    <CUFCTAcardcontent>Subscribe to our News letter to get updated on latest News and Promotions</CUFCTAcardcontent>
                    <CUFCTABTN>Subscribe</CUFCTABTN>
                </CUFCTAcard>

                <CUFCTAcard>
                    <CUFCTAcardheader>Already have a 3D file?</CUFCTAcardheader>
                    <CUFCTABTN>Upload File</CUFCTABTN>
                </CUFCTAcard>
            </CUFstats>
            <CUFForm>

            </CUFForm>
        </CUFContainer>

    </>
  )
}

export default ContactUsForm