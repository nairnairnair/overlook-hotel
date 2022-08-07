//~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~
// An example of how you tell webpack to use a CSS (SCSS) file
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

//~~~~~~~~~~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', getPromiseData);
homepageButton.addEventListener('click', displayHomepageView);
dashboardButton.addEventListener('click', displayDashboardView);
aboutUsButton.addEventListener('click', displayAboutUsView);

  //~~~~~~~~~~~~~~~~~~~~~~~ API Calls ~~~~~~~~~~~~~~~~~~~~~~~
let fetchData = (data) =>  {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(rsp => rsp.json() )
    .catch(error => console.log(error));
}

let customerData;
let bookingData;
let roomData;
let customer;
let booking;
let room;
let existingBookings;
let totalMoneySpent;

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
    getAvailableRoomsByDate()
  })

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
  // console.log('x', customer.name)
  // console.log('y', customer.bookings)
  // console.log('z', customer.totalMoneySpent)
  
  // console.log('jk', bookingData)

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

  console.log(datePicker.value)

  function selectedDateConverter(){

  }

  function getAvailableRoomsByDate (){
    let availableRooms = []
    let bookedRooms = bookingData.filter((booking)=>{
      if (booking.date.includes('2022/01/30')){
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
    console.log('available Rooms:', availableRooms)
    return availableRooms
  }

  

  // +capture the date they input, 
  // +filter it against the entire array of bookings to make sure they don’t contain the `date` in question,
  // +take that array of bookings that meet that condition and map out the
  // `roomNumber`s with no duplicates, 
  // +take that new array of numbers and filter through every room, 
  // +gathering the rooms that have a matching `number` key