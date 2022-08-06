// import Booking from './Booking';
// import Room from './Room';

class Customer {
    constructor(customerData){
        this.id = customerData.id;
        this.name = customerData.name;
        this.bookings = [];
        this.bookedRooms = [];
        // this.totalMoneySpent
    }

    // getNewCustomerBooking(room){
    //     let newRoom = new Room(room)
    //     this.bookings.push(newRoom)
    //     this.totalMoneySpent += room.costPerNight
    // }

    checkExistingBookings(bookings){
      let filteredBookings = bookings.bookings.filter((booking)=>{
          return this.id === booking.userID
        })
        filteredBookings.forEach((booking) => {
            this.bookings.push(booking)
        })
        return this.bookings
    }

    checkTotalMoneySpent(rooms){
        let roomNumbers = this.bookings.map((booking)=> booking.roomNumber)
        rooms.rooms.forEach((room)=>{
            if (roomNumbers.includes(room.number)){
                this.bookedRooms.push(room)
            }
        })
        let totalCost = this.bookedRooms.reduce((acc, room) => {
            return acc += room.costPerNight
        }, 0)
          return totalCost
    }
}

module.exports = Customer