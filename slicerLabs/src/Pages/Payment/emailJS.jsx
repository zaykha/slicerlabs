import emailjs from "emailjs-com";

// Function to send purchase confirmation email
export const sendPurchaseConfirmationEmail = (userEmail, purchasedItems) => {
  // Your EmailJS configuration
  const emailjsConfig = {
    serviceId: "your_emailjs_service_id",
    templateId: "your_emailjs_template_id",
    userId: "your_emailjs_user_id",
  };

  // Prepare the email parameters
  const emailParams = {
    to_email: userEmail,
    subject: "Purchase Confirmation",
    // You can customize the HTML content here or load it from a file
    html: `
      <h1>Purchase Confirmation</h1>
      <!-- ... Other email content ... -->
    `,
  };

  // Send the email using EmailJS
  emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.templateId,
    emailParams,
    emailjsConfig.userId
  )
  .then((response) => {
    console.log("Purchase confirmation email sent:", response);
  })
  .catch((error) => {
    console.error("Error sending purchase confirmation email:", error);
  });
};
