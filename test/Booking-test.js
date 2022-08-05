import { expect } from 'chai';
import Booking from '../src/Booking.js';

let bookingData1;
let booking1;
let bookingData2;
let booking2;

describe('Booking', () => {

    beforeEach(() => {
        bookingData1 = {
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15
            };
        booking1 = new Booking(bookingData1);
        bookingData2 = {
            "id": "5fwrgu4i7k55hl6t5",
            "userID": 43,
            "date": "2022/01/24",
            "roomNumber": 24
            };
        booking2 = new Booking(bookingData2);
    })

    it('should be a function', () => {
        expect(Booking).to.be.a('function');
      })

    it('should be an instance of Booking', () => {
        expect(booking1).to.be.an.instanceOf(Booking);
    })

    it('should have an id', () => {
        expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
        expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
    })

    it('should have a user ID', () => {
        expect(booking1.userID).to.equal(9);
        expect(booking2.userID).to.equal(43);
    })

    it('should have a date', () => {
        expect(booking1.date).to.equal("2022/04/22");
        expect(booking2.date).to.equal("2022/01/24");
    })

    it('should have a room number', () => {
        expect(booking1.roomNumber).to.equal(15);
        expect(booking2.roomNumber).to.equal(24);
    })

})