import { expect } from 'chai';
import Customer from '../src/Customer.js';

let customerData1;
let customer1;
let customerData2;
let customer2;

describe('Customer', () => {

    beforeEach(() => {
        customerData1 = { "id": 9, "name": "Faustino Quitzon" }
        customer1 = new Customer(customerData1)
        customerData2 = { "id": 51, "name": "Puguberto Schmitz" }
        customer2 = new Customer(customerData2)
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
})