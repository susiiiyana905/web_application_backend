const Admin = require("../models/adminModel")
const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/crime_assignment_test"

beforeAll(async ()=> {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})
describe('Admin Schema test anything', () => {
    // this code is to test admin insert 
    it('Add admin testing anything', () => {
        const test_admin = {
        'username': 'admin',
        'password': 'admin'
    };
 
    return Admin.create(test_admin)
    .then((adminData) => {
        expect(adminData.username).toEqual('admin');
    });
    });
 
})