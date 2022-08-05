import { expect } from 'chai';
import Room from '../src/Room.js';

let roomData1;
let room1;
let roomdata2;
let room2;

describe('Room', () => {

    beforeEach(() => {
        roomData1 = {
            "number": 1,
            "roomType": "residential suite",
            "bidet": true,
            "bedSize": "queen",
            "numBeds": 1,
            "costPerNight": 358.4
            }
        room1 = new Room(roomData1)
        roomdata2 = {
            "number": 2,
            "roomType": "suite",
            "bidet": false,
            "bedSize": "full",
            "numBeds": 2,
            "costPerNight": 477.38
            }
        room2 = new Room(roomdata2)
    })

    it('should be a function', () => {
        expect(Room).to.be.a('function');
      })

    it('should be an instance of Booking', () => {
        expect(room1).to.be.an.instanceOf(Room);
    })

    it('should have a number', () => {
        expect(room1.number).to.equal(1)
        expect(room2.number).to.equal(2)
    })

    it('should have a type', () => {
        expect(room1.roomType).to.equal('residential suite')
        expect(room2.roomType).to.equal('suite')
    })

    it('should come with or without a bidet', () => {
        expect(room1.bidet).to.equal(true)
        expect(room2.bidet).to.equal(false)
    })

    it('should have a bed size', () => {
        expect(room1.bedSize).to.equal('queen')
        expect(room2.bedSize).to.equal('full')
    })

    it('should have a number of beds', () => {
        expect(room1.numBeds).to.equal(1)
        expect(room2.numBeds).to.equal(2)
    })

    it('should have a cost per night', () => {
        expect(room1.costPerNight).to.equal(358.4)
        expect(room2.costPerNight).to.equal(477.38)
    })
})