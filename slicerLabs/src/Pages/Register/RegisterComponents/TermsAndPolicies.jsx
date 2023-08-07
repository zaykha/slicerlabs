import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Import your Firebase configuration

import styled from "styled-components";

const TermsContainer = styled.div`
  max-width: 100%;
  height:100%;
  margin: 0 auto;
  padding: 20px;
  color:white;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Content = styled.div`

  font-size: 16px;
  line-height: 1.6;

  h3 {
    font-size: 20px;
    margin-top: 20px;
  }

  p {
    margin-top: 10px;
  }
`;

const TermsAndPolicies = () => {
//   const [termsContent, setTermsContent] = useState("");
const termsContent = `
<h3>Welcome to SlicerLabs 3D Printing Services</h3>
<p>By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.</p>

<h3>Service Overview</h3>
<p>SlicerLabs 3D Printing Services offers a platform for users to upload, customize, and order 3D printed products. We provide a range of materials and printing options to suit your needs.</p>

<h3>Ordering Process</h3>
<p>When placing an order, please ensure that your 3D model meets our guidelines for printability. We reserve the right to reject models that do not meet our requirements. Once an order is placed, you will receive a confirmation and estimated delivery date.</p>

<h3>Payment and Pricing</h3>
<p>Prices for our 3D printing services are listed on our website and may vary based on factors such as material choice, print complexity, and shipping location. Payment is required before we begin processing your order.</p>

<h3>Shipping and Delivery</h3>
<p>We aim to fulfill orders in a timely manner, but please note that delivery times may vary based on your location. We are not responsible for any delays or issues caused by third-party shipping carriers.</p>

<h3>Returns and Refunds</h3>
<p>If you receive a defective or incorrect item, please contact us within 7 days of receiving your order. We may offer refunds or replacements on a case-by-case basis.</p>

<h3>Intellectual Property</h3>
<p>All 3D models and designs uploaded to our platform remain the intellectual property of their respective creators. SlicerLabs may use uploaded models for printing purposes only and will not distribute or sell these models without the creator's consent.</p>

<h3>Privacy and Data Security</h3>
<p>Your privacy is important to us. We collect and process personal data in accordance with our Privacy Policy. We use industry-standard security measures to protect your information, but please be aware that no method of transmission over the internet is entirely secure.</p>

<p>&copy; ${new Date().getFullYear()} SlicerLabs. All rights reserved.</p>
`;
//   useEffect(() => {
//     // Fetch terms and policies content from Firestore
//     async function fetchTermsContent() {
//       try {
//         const querySnapshot = await getDocs(collection(db, "terms")); // "terms" is the collection name in Firestore
//         if (!querySnapshot.empty) {
//           const termsDoc = querySnapshot.docs[0];
//           const termsData = termsDoc.data();
//           setTermsContent(termsData.content);
//         }
//       } catch (error) {
//         console.error("Error fetching terms content:", error);
//       }
//     }

//     fetchTermsContent();
//   }, []);

  return (
    <TermsContainer>
      <Title>Terms and Policies</Title>
      <Content dangerouslySetInnerHTML={{ __html: termsContent }} />
    </TermsContainer>
  );
};

export default TermsAndPolicies;
