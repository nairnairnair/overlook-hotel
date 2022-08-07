// import Booking from './Booking';
// import Room from './Room';

class Customer {
    constructor(customerData){
        this.id = customerData.id;
        this.name = customerData.name;
        this.bookings = [];
        this.bookedRooms = [];
        this.totalMoneySpent = 0;
    }

    checkExistingBookings(bookinz){
        console.log('b', bookinz)
      let filteredBookings = bookinz.filter((booking)=>{
          return this.id === booking.userID
        })
        filteredBookings.forEach((booking) => {
            this.bookings.push(booking)
        })
        return this.bookings
    }

    checkTotalMoneySpent(rooms){
        let roomNumbers = this.bookings.map((booking)=> booking.roomNumber)
        rooms.forEach((room)=>{
            if (roomNumbers.includes(room.number)){
                this.bookedRooms.push(room)
            }
        })
        let totalCost = this.bookedRooms.reduce((acc, room) => {
            return acc += room.costPerNight
        }, 0)
            this.totalMoneySpent = totalCost
          return totalCost
    }

        // getNewCustomerBooking(room){
    //     let newRoom = new Room(room)
    //     this.bookings.push(newRoom)
    //     this.totalMoneySpent += room.costPerNight
    // }
}

module.exports = Customer