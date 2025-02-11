// Get the contact form element by its ID
const contactForm = document.getElementById("contactForm");
// Get the message response element by its ID
const messageResponse = document.getElementById("message");

// Add an event listener to the contact form for the submit event
contactForm.addEventListener("submit", async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the form inputs and textarea elements
  const name = e.target["0"];
  const email = e.target["1"];
  const message = e.target["2"];

  // Create an object with the form data (the values of the elements)
  const data = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  try {
    // Send a POST request to the server with the form data
    const response = await fetch("/send-message", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON data from the response
      const data = await response.json();

      // Display the response message to the user
      messageResponse.innerHTML = data.message;

      // If the message was sent successfully
      if (data.success) {
        // Change the message text color to green
        messageResponse.classList.remove("text-red-500");
        messageResponse.classList.add("text-green-500");
        // Clear the form input values
        name.value = "";
        email.value = "";
        message.value = "";
      } else {
        // Change the message text color to red
        messageResponse.classList.remove("text-green-500");
        messageResponse.classList.add("text-red-500");
      }
    } else {
      // Handle the error response
      // Display an error message to the user
      messageResponse.innerHTML = "An error occurred. Please try again.";
      messageResponse.classList.remove("text-green-500");
      messageResponse.classList.add("text-red-500");
    }
  } catch (error) {
    // Log any errors to the console
    console.log(error);
    // Display an error message to the user
    messageResponse.innerHTML = "An error occurred. Please try again.";
    messageResponse.classList.remove("text-green-500");
    messageResponse.classList.add("text-red-500");
  }
});
