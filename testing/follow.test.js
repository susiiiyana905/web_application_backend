const Follow = require("../models/followModel")
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
describe('Follow Schema test anything', () => {
    // this code is for testing folllow post
    it('Add follow testing anything', () => {
        const test_follow = {
        'following': '620cf1b5b7108861fb9370eb',
        'follower': '620cf8c410bdb2ac9b9f8aac'
    };
 
    return Follow.create(test_follow)
    .then((followData) => {
        expect(followData.follower.toString()).toEqual('620cf8c410bdb2ac9b9f8aac');
    });
    });

    //this code is for testing follow delete
    it('to test the delete post is working or not', async () => {
        const status = await Follow.deleteMany();
        expect(status.ok);
    });
 
})