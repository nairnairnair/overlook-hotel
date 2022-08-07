// import Customer from './Customer.js';
// import Room from './Room.js';

class Booking {
    constructor(bookingData){
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    }
}

module.exports = Booking