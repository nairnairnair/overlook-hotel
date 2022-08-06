import { expect } from 'chai';
import Customer from '../src/Customer.js';

let customerData1;
let customer1;
let customerData2;
let customer2;
let bookings;
let rooms;

describe('Customer', () => {

    beforeEach(() => {
        customerData1 = { "id": 9, "name": "Faustino Quitzon" }
        customer1 = new Customer(customerData1)
        customerData2 = { "id": 51, "name": "Puguberto Schmitz" }
        customer2 = new Customer(customerData2)
        bookings = {
            "bookings": [
                {
                "id": "5fwrgu4i7k55hl6sz",
                "userID": 9,
                "date": "2022/04/22",
                "roomNumber": 15
                },
                {
                "id": "5fwrgu4i7k55hl6t5",
                "userID": 43,
                "date": "2022/01/24",
                "roomNumber": 24
                },
                {
                "id": "5fwrgu4i7k55hl6t6",
                "userID": 13,
                "date": "2022/01/10",
                "roomNumber": 12
            }
        ]
    }
        rooms = {
            "rooms": [
                {
                "number": 1,
                "roomType": "residential suite",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 358.4
                },
                {
                "number": 2,
                "roomType": "suite",
                "bidet": false,
                "bedSize": "full",
                "numBeds": 2,
                "costPerNight": 477.38
                },
                {
                "number": 15,
                "roomType": "residential suite",
                "bidet": false,
                "bedSize": "full",
                "numBeds": 1,
                "costPerNight": 294.56
                }
            ]
        }
    })

    it('should be a function', () => {
        expect(Customer).to.be.a('function');
      })

    it('should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
    })

    it('should have a name', () => {
        expect(customer1.name).to.equal('Faustino Quitzon')
        expect(customer2.name).to.equal('Puguberto Schmitz')
    })

    it('should have an id', () => {
        expect(customer1.id).to.equal(9)
        expect(customer2.id).to.equal(51)
    })

    it('should be able to check existing bookings', () => {
        customer1.checkExistingBookings(bookings)
        expect(customer1.bookings).to.deep.equal([
            {
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15
            }
        ])
    })

    it('should be able to check total money spent', () => {
        customer1.checkExistingBookings(bookings)
        expect(customer1.checkTotalMoneySpent(rooms)).to.equal(294.56)
    })
})