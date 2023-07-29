import emailjs from "@emailjs/browser";

export function sendEmail(e: any , form: any) {
    e.preventDefault();

    if (form.current) {
      // Generate a unique reference number
      let referenceNumber = Date.now().toString();

      let hiddenInput = document.createElement("input");
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", "reference_number");
      hiddenInput.setAttribute("value", referenceNumber);
      form.current.appendChild(hiddenInput);

      emailjs
        .sendForm(
          "service_0uxrxuf",
          "template_41a8tfh",
          form.current,
          "ICVhNG2gPY2OLlrnk"
        )
        .then(
          () => {
            if (form.current) {
              form.current.removeChild(hiddenInput);
            }
            e.target.reset();
            alert("Email sent successfully!");
          },
          (error) => {
            alert("Failed to send email: " + error.text);
          }
        );
    }
  };