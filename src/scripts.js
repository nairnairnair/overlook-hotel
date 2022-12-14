//~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~
import './css/styles.css';
import './images/h.png'
import Customer from '../src/Customer.js';
import Booking from '../src/Booking.js';
import Room from '../src/Room.js';

//~~~~~~~~~~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~~~~
const welcomeMessage = document.querySelector('.welcome-message');
const homepageButton = document.getElementById('homePageButton');
const dashboardButton = document.getElementById('dashboardButton');
const aboutUsButton = document.getElementById('aboutUsButton');
const loginView = document.querySelector('.login-view');
const homepageView = document.querySelector('.homepage-view');
const dashboardView = document.querySelector('.dashboard-view');
const aboutUsView = document.querySelector('.about-us-view');
const datePicker = document.getElementById("datePicker");
const typePicker = document.getElementById('typePicker');
const calendarButton = document.querySelector(".calendar-button");
const searchResultsContainer = document.querySelector(".search-results-container");
const roomPickerErrorMessage = document.querySelector(".room-picker-error-message");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.querySelector(".login-message");
const aboutUs = document.querySelector(".about-us")


//~~~~~~~~~~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', getPromiseData);
window.addEventListener('load', displayLoginView);
homepageButton.addEventListener('click', displayHomepageView);
dashboardButton.addEventListener('click', displayDashboardView);
aboutUsButton.addEventListener('click', displayAboutUsView);
calendarButton.addEventListener('click', getAvailableRoomsByDateAndType);
searchResultsContainer.addEventListener('click', selectRoomToBook);
loginButton.addEventListener('click', logIn);

//~~~~~~~~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~~~~

let customerData;
let bookingData;
let roomData;
let customer;
let pastBookings;
let totalMoneySpent;
let upcomingBookings;
let logInCounter = 5;

//~~~~~~~~~~~~~~~~~~~~~~~ API Calls ~~~~~~~~~~~~~~~~~~~~~~~

let fetchData = (data) =>  {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(rsp => rsp.json() )
    .catch(error => console.log(error));
}

function getPromiseData() {
  Promise.all( [fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customerData = data[0].customers;
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
  })
}

function getUpdatedPromiseData() {
  Promise.all( [fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customerData = data[0].customers;
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
    customer.totalMoneySpent = 0;
    customer.pastBookings = [];
    customer.upcomingBookings = [];
    customer.bookedRooms = [];
    customer.checkAllBookings(bookingData);
    pastBookings = customer.pastBookings;
    upcomingBookings = customer.futureBookings;
    totalMoneySpent = customer.checkTotalMoneySpent(roomData);
      totalMoneySpent
    getAvailableRoomsByDateAndType()
    populateDashboardView()
  })
}

function postBooking(targetRoomNumber){
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({ userID: customer.id, date: datePicker.value.split('-').join('/'), roomNumber: parseInt(targetRoomNumber) })
  })
  .then(response => response.json())
  .then(response => getUpdatedPromiseData())
  .catch(error => console.log(error))
}

  //~~~~~~~~~~~~~~~~~~~~~~~ View Functions ~~~~~~~~~~~~~~~~~~~~~~~
  

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add('hidden');
  })
}

function show(elements) {
  elements.forEach((element) => {
    element.classList.remove('hidden');
  })
}

function displayLoginView(){
  hide([
      homepageView,
      dashboardView,
      aboutUsView,
      searchResultsContainer,
      homepageButton,
      dashboardButton,
      aboutUsButton, 

  ]);
  show([
      loginView,
  ]);
}

function displayHomepageView(){
  hide([
      homepageButton,
      loginView,
      dashboardView,
      aboutUsView,
  ]);
  show([
      dashboardButton,
      aboutUsButton,
      homepageView,
      searchResultsContainer 
  ]);
}

function displayDashboardView(){
  hide([
      dashboardButton,
      loginView,
      homepageView,
      aboutUsView,
      searchResultsContainer 
  ]);
  show([
      homepageButton,
      aboutUsButton,
      dashboardView,
  ]);
  populateDashboardView()
}

function displayAboutUsView(){
  hide([
      aboutUsButton,
      loginView,
      homepageView,
      dashboardView,
      searchResultsContainer
  ]);
  show([
      homepageButton,
      dashboardButton,
      aboutUsView,
  ]);
  aboutUs.innerText = `Don't ask questions. Especially not about this hotel. The 
  origins and history of this establishment are none of your concern. Its future is 
  assured. None still living can affect that. Not you. Especially not you. There are
  no inert questions. No harmless questions. None will be answered. If you wish to have
  an ongoing life, one that lasts, ask nothing. See nothing. Be nothing. There are ways
  to watch without watching. The text reads also into you. The surrounding blankness
  teems with life. Bright still, black and white, but all light. Glowing darkness, 
  glowing, glowing... all that you have ever known is darkest light. Step between the voids. 
  Checkout is at 11.`
}

  //~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~

  function mapBookings(bookingsToMap){
    let mappedBookings = '' 
      mappedBookings = bookingsToMap.map((booking)=>{
        return `Date: ${booking.date} <br />
        Room Number: ${booking.roomNumber} <br />`
    }).join('')
    return mappedBookings
  }
function populateDashboardView(){
  dashboardView.innerHTML = ''
  dashboardView.innerHTML = 
    `<p class='dashboard-welcome-message'>Hi ${customer.name}, your dashboard awaits. Make new bookings on the homepage.</p>
    <p class='dashboard-upcoming-bookings-text'>Your upcoming bookings:</p>    
    <p class='dashboard-upcoming-bookings-info'>${mapBookings(customer.futureBookings)}</p>
    <p class='dashboard-past-bookings-text'>Your past bookings:</p>    
    <p class='dashboard-past-bookings-info'>${mapBookings(customer.pastBookings)}</p>
    <p class='dashboard-room-cost-total-text'>Your total amount spent on rooms:</p>
    <p class='dashboard-room-cost-total-info'>${totalMoneySpent}</p>`
}

  function getAvailableRoomsByDateAndType (){
    searchResultsContainer.innerHTML = ''
    roomPickerErrorMessage.innerText = ''
    let convertedDate = datePicker.value.split('-').join('/')
    let availableRooms = []
    if (datePicker.value === '') {roomPickerErrorMessage.innerText = 'Please select a date'}
    let bookedRooms = bookingData.filter((booking)=>{
      if (booking.date.includes(convertedDate)){
        return booking
      }
    }).map((booking)=>{
      return booking.roomNumber
    })
    roomData.filter((room)=>{
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
    }) 
    if (availableRooms.length === 0) {roomPickerErrorMessage.innerText = 'There are no rooms available on that date. Please try another day.'}
    let typeFilteredRooms = availableRooms.filter((room)=>{
      if (typePicker.value === 'any') { 
        return room
      } else if (typePicker.value === room.roomType){
        return room
      } 
    })
    if (typeFilteredRooms.length === 0) {roomPickerErrorMessage.innerText = `There are no ${typePicker.value}s available on this selected date. Please try another kind of room.`};
    typeFilteredRooms.forEach((room)=>{
      searchResultsContainer.innerHTML += `
      <section class="room-to-select">
        <div class="room-info-container">
          <p class="room-number">Room Number: ${room.number}</p>
          <p class="room-type">Room Type: ${room.roomType}</p>
          <p class="room-bidet">Bidet in Room: ${room.bidet}</p>
          <p class="room-bed-size">Bed Size: ${room.bedSize}</p>
          <p class="room-number-of-beds">Number of Beds: ${room.numBeds}</p>
          <p class="room-cost-per-night">Cost Per Night: $${room.costPerNight}</p>
        </div>
        <div>
          <h3 class="book-this-room">Book this room for the selected date?</h3>
          <button tabindex="0" class='book-button' id='${room.number}'>Book Room</button>
        </div>
      </section>`
    })
    populateDashboardView()
    return typeFilteredRooms
  }

function selectRoomToBook(event) {
  event.preventDefault()
  if (event.target.classList.contains("book-button")) {
    postBooking(event.target.id)
    getAvailableRoomsByDateAndType()
  }
}

function logIn(){
  loginMessage.innerText = '';
  let failureDate = new Date();
  let usernameInput = usernameField.value;
  let first8 = usernameInput.slice(0, 8);
  let last2 = usernameInput.slice(-2);
  let filteredCusty = customerData.filter(customer=> parseInt(last2) === customer.id);
  if (first8 === 'customer' && 
    parseInt(last2) < 51 &&
    parseInt(last2) != 0 && 
    passwordField.value === 'overlook2021' &&
    usernameInput.length === 10){
    customer = new Customer(filteredCusty[0]);
    customer.checkAllBookings(bookingData);
    pastBookings = customer.pastBookings;
    upcomingBookings = customer.futureBookings;
    totalMoneySpent = customer.checkTotalMoneySpent(roomData);
      totalMoneySpent
    welcomeMessage.innerText = `Welcome, ${customer.name}, to` 
    displayDashboardView()
  } else if (logInCounter === 1){
    loginMessage.innerText = 
      `"Where's the Reset Your Password button?" You customers are all the same. It's enough to make a man sick. 
      Hotel HTML has leaned on our single stalwart password for years, dating back as early as ${failureDate}... or perhaps longer.
      You have been deemed unworthy. Come back when you can remember that the password is overlook2021.`
  } else {
    logInCounter--
    loginMessage.innerText = `Incorrect username or password. You have ${logInCounter} remaining attempt(s).`
  }
}
