const Like = require("../models/likeModel")
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
describe('Like Schema test anything', () => {
    // this code is to test like post
    it('Add follow testing anything', () => {
        const test_like = {
        'user_id': '620cf1b5b7108861fb9370eb',
        'post_id': '620cfc02154bdd2449761f84'
    };
 
    return Like.create(test_like)
    .then((likeData) => {
        expect(likeData.post_id.toString()).toEqual('620cfc02154bdd2449761f84');
    });
    });
 
})