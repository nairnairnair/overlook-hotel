// import Booking from './Booking';
// import Room from './Room';

class Customer {
    constructor(customerData){
        this.id = customerData.id;
        this.name = customerData.name;
        this.pastBookings = [];
        this.futureBookings = []
        this.bookedRooms = [];
        this.totalMoneySpent = 0;
    }

    checkAllBookings(bookinz){
        let filteredBookings = bookinz.filter((booking)=>{
            return this.id === booking.userID
          })
        this.pastBookings = []
        this.futureBookings = []

        let dayToday = new Date().toJSON().slice(0, 10)
        let comparisonDay;

        filteredBookings.forEach((booking) => {
            
            let bookingDate = booking.date
            let splitDates = bookingDate.split('/').join('-')

            comparisonDay = new Date(splitDates).toJSON().slice(0, 10)
                if (dayToday >= comparisonDay) {this.pastBookings.push(booking)} else if (dayToday < comparisonDay) {this.futureBookings.push(booking)}
        })
        console.log('upcoming', this.futureBookings)
        console.log('past', this.pastBookings)
    }

    checkTotalMoneySpent(rooms){

        let pastRoomNumbers = this.pastBookings.map((booking)=> booking.roomNumber)
        rooms.forEach((room)=>{
            if (pastRoomNumbers.includes(room.number)){
                this.bookedRooms.push(room)
            }
        })
        let futureRoomNumbers = this.futureBookings.map((booking)=> booking.roomNumber)
        rooms.forEach((room)=>{
            if (futureRoomNumbers.includes(room.number)){
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
    //     this.pastBookings.push(newRoom)
    //     this.totalMoneySpent += room.costPerNight
    // }

    // let allBookings = []
    // allBookings.push()
    // this.pastBookings.forEach
    // this.futureBookings
    // console.log ('allBoox:', allBookings)

}

module.exports = Customer

        // let convYear = dayToday.getFullYear()
        // console.log('year', convYear)
        // let convMonth = String(dayToday.getMonth()).padStart(2, "0")
        // console.log('month', convMonth)
        // let convDay = String(dayToday.getDate()).padStart(2, "0")
        // console.log('day', convDay)
        // console.log('dtd', dayToday)
        // let convertedDay = `${convYear} / ${convMonth} / ${convDay}`
        // console.log('dei', convertedDay)