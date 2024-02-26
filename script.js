// Define months and weekdays arrays
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Select elements
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// Get current date
const currentDate = new Date();
const futureDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 10,
  11,
  30,
  0
);

// Extract date components
const year = futureDate.getFullYear();
const monthIndex = futureDate.getMonth();
const day = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const weekdayIndex = futureDate.getDay();

// Format date and time
const month = months[monthIndex];
const weekday = weekdays[weekdayIndex];

// Update giveaway text content
giveaway.textContent = `giveaway ends on ${weekday}, ${day} ${month} ${year} at ${hours}:${minutes}am`;

// Calculate remaining time and update countdown
function getCountdownTimer() {
  const currentTime = new Date().getTime();
  const timeDifference = futureDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired expired-message">Sorry, this giveaway has expired! <br/> Please check back soon.</h4>`;
    const expiredMessage = document.querySelector(".expired-message");
    expiredMessage.style.color = "red";
    expiredMessage.style.fontWeight = "bold";
    expiredMessage.textContent = expiredMessage.textContent.toUpperCase();
    return;
  }

  let remainingSeconds = Math.floor(timeDifference / 1000);
  let days = Math.floor(remainingSeconds / (3600 * 24));
  remainingSeconds %= 3600 * 24;
  let hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  let minutes = Math.floor(remainingSeconds / 60);
  let seconds = remainingSeconds % 60;

  // Update countdown values
  items[0].textContent = days < 10 ? `0${days}` : days;
  items[1].textContent = hours < 10 ? `0${hours}` : hours;
  items[2].textContent = minutes < 10 ? `0${minutes}` : minutes;
  items[3].textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// Call getCountdownTimer every second
let countdown = setInterval(getCountdownTimer, 1000);

// Set initial values
getCountdownTimer();
