const User = require("../models/userModel")
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
describe('User Schema test anything', () => {
    // this code is to test user post
    it('Add user testing anything', () => {
        const test_user = {
        'username': 'anuska',
        'password': 'anuska11'
    };
 
    return User.create(test_user)
    .then((userdata) => {
        expect(userdata.username).toEqual('anuska');
    });
    });


    // this code is to test update user
    it('to test the update', async () => {
        return User.findOneAndUpdate({_id :Object('620cf0caec9d765239840bc9')}, 
            {$set : {username:'userss'}})
        .then(()=>{
            return User.findOne({_id : Object('620cf0caec9d765239840bc9')})
            .then((un)=>{
                 expect(un.username).toEqual('userss')
            })
        })
    
    });
 
})