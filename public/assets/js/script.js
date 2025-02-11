const contactForm = document.getElementById("contactForm");
const messageResponse = document.getElementById("message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target["0"];
  const email = e.target["1"];
  const message = e.target["2"];

  const data = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  try {
    const response = await fetch("/send-message", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // the response is fine, carry on
      // Get the JSON data from the response
      const data = await response.json();

      // Give some feedback to the user
      messageResponse.innerHTML = data.message;

      if (data.success) {
        messageResponse.classList.remove("text-red-500");
        messageResponse.classList.add("text-green-500");
        name.value = "";
        email.value = "";
        message.value = "";
      } else {
        messageResponse.classList.remove("text-green-500");
        messageResponse.classList.add("text-red-500");
      }
    } else {
      // There was an error
      // Give some error feedback to the user
    }
  } catch (error) {
    console.log(error);
  }
});
