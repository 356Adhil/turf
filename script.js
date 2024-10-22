document.addEventListener("DOMContentLoaded", () => {
  const turfForm = document.getElementById("turfForm");
  const bookedSlots = document.getElementById("bookedSlots");

  // Array to store bookings
  const bookings = [];

  // Handle form submission
  turfForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Check if the time slot for the selected date is already booked
    const isSlotBooked = bookings.some(
      (booking) => booking.date === date && booking.time === time
    );

    if (isSlotBooked) {
      alert(
        "This time slot is already booked. Please choose a different time."
      );
      return; // Prevent further execution
    }

    // Add the booking
    const booking = {
      name: name,
      phone: phone,
      date: date,
      time: time,
    };

    bookings.push(booking);

    // Clear form fields
    turfForm.reset();

    // Update booked slots UI
    updateBookedSlots();
  });

  // Function to update booked slots
  function updateBookedSlots() {
    bookedSlots.innerHTML = "";

    bookings.forEach((booking, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${booking.name} - ${booking.phone} - ${booking.date} (${booking.time})</span>
                            <button onclick="removeBooking(${index})">Cancel</button>`;
      bookedSlots.appendChild(li);
    });
  }

  // Remove booking
  window.removeBooking = function (index) {
    bookings.splice(index, 1);
    updateBookedSlots();
  };
});
