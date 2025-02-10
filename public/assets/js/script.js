const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/send-message", {
      method: "POST",
    });

    if (response.ok) {
      // the response is fine, carry on
    } else {
      // There was an error
      // Give some error feedback to the user
    }
  } catch (error) {
    console.log(error);
  }
});
