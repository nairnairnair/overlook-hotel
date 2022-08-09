//~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/h.png'
import Customer from '../src/Customer.js';
import Booking from '../src/Booking.js';
import Room from '../src/Room.js';

//~~~~~~~~~~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~~~~

const homepageButton = document.getElementById('homePageButton');
const dashboardButton = document.getElementById('dashboardButton');
const aboutUsButton = document.getElementById('aboutUsButton');
const loginView = document.querySelector('.login-view');
const homepageView = document.querySelector('.homepage-view');
const dashboardView = document.querySelector('.dashboard-view');
const aboutUsView = document.querySelector('.about-us-view');
const datePicker = document.getElementById("datePicker");
const typePicker = document.getElementById('typePicker')
const calendarButton = document.querySelector(".calendar-button")
const searchResultsContainer = document.querySelector(".search-results-container")
const roomPickerErrorMessage = document.querySelector(".room-picker-error-message")


//~~~~~~~~~~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', getPromiseData);
homepageButton.addEventListener('click', displayHomepageView);
dashboardButton.addEventListener('click', displayDashboardView);
aboutUsButton.addEventListener('click', displayAboutUsView);
calendarButton.addEventListener('click', getAvailableRoomsByDateAndType);
searchResultsContainer.addEventListener('click', selectRoomToBook)

//~~~~~~~~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~~~~

let customerData;
let bookingData;
let roomData;
let customer;
let booking;
let room;
let existingBookings;
let totalMoneySpent;

//~~~~~~~~~~~~~~~~~~~~~~~ API Calls ~~~~~~~~~~~~~~~~~~~~~~~

let fetchData = (data) =>  {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(rsp => rsp.json() )
    .catch(error => console.log(error));
}

function getPromiseData() {
  Promise.all( [fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customerData = data[0].customers;
    // console.log('a', data[0].customers)
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
    customer = new Customer(customerData[randomIndex(customerData)]);
    // console.log('custy', customer)
    booking = new Booking(bookingData);
    // console.log('book em', booking)
    room = new Room(roomData)
    // console.log('roomba', room)
    existingBookings = customer.checkExistingBookings(bookingData)
    totalMoneySpent = customer.checkTotalMoneySpent(roomData)
  })
}

function postBooking(targetRoomNumber){
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({ userID: customer.id, date: datePicker.value.split('-').join('/'), roomNumber: parseInt(targetRoomNumber) })
  })
  .then(response => response.json())
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

  ])
  show([
      homepageButton,
      dashboardButton,
      aboutUsButton,
      loginView,

  ])
}

function displayHomepageView(){
  hide([
      homepageButton,
      loginView,
      dashboardView,
      aboutUsView,

      
  ])
  show([
      dashboardButton,
      aboutUsButton,
      homepageView, 
  ])
}

function displayDashboardView(){
  hide([
      dashboardButton,
      loginView,
      homepageView,
      aboutUsView, 
  ])
  show([
      homepageButton,
      aboutUsButton,
      dashboardView,
  ])

  dashboardView.innerHTML = 
  `<p class='dashboard-welcome-message'>Hi ${customer.name}, welcome to your dashboard!</p>
  <p class='dashboard-room-bookings-text'>Your bookings:</p>    
  <p class='dashboard-room-bookings-info'>${mapBookings()}</p>
  <p class='dashboard-room-cost-total-text'>Your total amount spent on rooms:</p>
  <p class='dashboard-room-cost-total-info'>${totalMoneySpent}</p>`
}

function displayAboutUsView(){
  hide([
      aboutUsButton,
      loginView,
      homepageView,
      dashboardView,
  ])
  show([
      homepageButton,
      dashboardButton,
      aboutUsView,
  ])
}

 //~~~~~~~~~~~~~~~~~~~~~~~ Randomizers ~~~~~~~~~~~~~~~~~~~~~~~

 function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

  //~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~

  function mapBookings(){
    let mappedBookings = existingBookings.map((booking)=>{
      return `Date: ${booking.date} <br />
      Room Number: ${booking.roomNumber} <br />`
    }).join('')
    return mappedBookings
  }

  function getAvailableRoomsByDateAndType (){
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
    console.log('booked rooms:', bookedRooms)
    roomData.filter((room)=>{
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
    }) 
    if (availableRooms.length === 0) {roomPickerErrorMessage.innerText = 'There are no rooms available on that date. Please try another day.'}
    console.log('date filtered Rooms:', availableRooms)
    let typeFilteredRooms = availableRooms.filter((room)=>{
      if (typePicker.value === 'any') { 
        return room
      } else if (typePicker.value === room.roomType){
        return room
      } 
    })
    if (typeFilteredRooms.length === 0) {roomPickerErrorMessage.innerText = `There are no ${typePicker.value}s available on this selected date. Please try another kind of room.`}
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
    console.log('type filtered Rooms:', typeFilteredRooms)
    return typeFilteredRooms
  }

function selectRoomToBook(event) {
  event.preventDefault()
  if (event.target.classList.contains("book-button")) {
    console.log('event target')
    postBooking(event.target.id)
    console.log("is it broken yet", bookingData)
  }
}

