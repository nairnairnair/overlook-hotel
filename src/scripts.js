// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//~~~~~~~~~~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~~~~

const homepageButton = document.getElementById('homePageButton');
const dashboardButton = document.getElementById('dashboardButton');
const aboutUsButton = document.getElementById('aboutUsButton');
const loginView = document.querySelector('.login-view');
const homepageView = document.querySelector('.homepage-view');
const dashboardView = document.querySelector('.dashboard-view');
const aboutUsView = document.querySelector('.about-us-view');

//~~~~~~~~~~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~

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

  //~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~