//~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
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

//~~~~~~~~~~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', getPromiseData);
homepageButton.addEventListener('click', displayHomepageView);
dashboardButton.addEventListener('click', displayDashboardView);
aboutUsButton.addEventListener('click', displayAboutUsView);

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
    <p class='dashboard-room-bookings-info'></p>
    <p class='dashboard-room-cost-total-text'>Your total amount spent on rooms:</p>
    <p class='dashboard-room-cost-total-info'></p>`
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

  function getPromiseData() {
    Promise.all( [fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
      customerData = data[0].customers;
      console.log('a', data[0].customers)
      bookingData = data[1].bookings;
      roomData = data[2].rooms;
      customer = new Customer(customerData[randomIndex(customerData)]);
      console.log('custy', customer)
      booking = new Booking(bookingData[0]);
      console.log('book em', booking)
      room = new Room(roomData[0])
      console.log('roomba', room)
    })
  }

  //~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~