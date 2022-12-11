const Report = require("../models/reportModel")
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
describe('Report Schema test anything', () => {
    //this code is to test report post
    it('Add report testing anything', () => {
        const test_report = {
        'user_id': '620cf1b5b7108861fb9370eb',
        'post_id': '620cfc1467f87654957020f1'
    };
 
    return Report.create(test_report)
    .then((reportData) => {
        expect(reportData.post_id.toString()).toEqual('620cfc1467f87654957020f1');
    });
    });
 
})