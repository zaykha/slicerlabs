import styled from "styled-components";


export const CUFContainer = styled.div`
    width:1200px;
    margin:auto;
    display:flex;
    flex-wrap:wrap;
    padding: 20px;
    @media screen and (max-width: 1200px){
        width:100%;
    }
`;
export const CUFstats = styled.div`
    width: 55%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    gap:10px;

    @media screen and (max-width: 780px){
        width:100%;
    }

`;
export const CUFstatscontainer = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
`;
export const CUFstatsimg = styled.img`
    width: 50px;
    height:50px;
    margin:10px 20px 10px 10px;
    // background:white;
    border-radius:10px;
`;
export const CUFstatswraper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    gap:10px;
`;
export const CUFstatshead = styled.div`
    color:#48B2E5;
    font-size:1.4rem;
`;
export const CUFstatscontent = styled.div`
    color:white;
`;
export const CUFCTAcard = styled.div`
    width: 600px;
    color:white;
    flex-direction: column;
    justify-content: flex-start;
    gap:10px;
`;
export const CUFCTAcardheader= styled.div`
    font-weight:bold;
    font-size:1.4rem;
    margin: 10px auto;
`;
export const CUFCTAcardcontent = styled.div`
    text-align:left;
    margin-bottom: 20px;
`;
export const CUFCTABTN= styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 10px auto 10px 0;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    color:black;
    cursor:pointer;

    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;
export const CUFForm = styled.div`
    width: 40%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px;
    background:white;
    margin-left:20px;
    @media screen and (max-width: 780px){
        width:100%;
}
`;
export const CUFFormHeader = styled.div`
    font-size:1.4rem;
    margin-bottom: 20px;
`;
export const NameInp = styled.input`
    outline:none;
    border:none;
    border-bottom: 1px solid #838383;
    width:100%;
    height: 32px;
    margin: 10px auto;
`;
export const CUFTextarea = styled.textarea`
    width: 100%;
    outline:none;
    border:none;
    border-bottom: 1px solid #838383;

`;
export const CUFFormBTN = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 20px 0;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    cursor:pointer;
    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;

{/* <CUFContainer>
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
                    <CUFFormHeader><SSpan>Send</SSpan>Message</CUFFormHeader>
                    <NameInp name="CTForm" type='text' placeholder='Full Name'></NameInp>
                    <NameInp name="CTForm" type='email' placeholder='Email'></NameInp>
                    <NameInp name="CTForm" type='text' placeholder='Full Name'></NameInp>
                    <Textarea name="CTForm" rows="10" cols="30"></Textarea>
                    <CUFFormBTN>Send Message</CUFFormBTN>
            </CUFForm>
        </CUFContainer> */}