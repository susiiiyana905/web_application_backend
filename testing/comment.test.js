const Comment = require("../models/commentModel")
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
describe('Comment Schema test anything', () => {
    // this code is to test comment insert
    it('Add comment testing anything', () => {
        const test_comment = {
        'user_id': '620cf1b5b7108861fb9370eb',
        'post_id': '620cfc02154bdd2449761f84',
        'comment':"added new"
    };
 
    return Comment.create(test_comment)
    .then((commentData) => {
        expect(commentData.comment).toEqual('added new');
    });
    });


    //this code is to update previous comment
    it('to test the update', async () => {
        return Comment.findOneAndUpdate({_id :Object('620cfca429373d56b6d083a2')}, 
            {$set : {comment:'next comment'}})
        .then(()=>{
            return Comment.findOne({_id : Object('620cfca429373d56b6d083a2')})
            .then((cn)=>{
                 expect(cn.comment).toEqual('next comment')
            })
        })
    
    });
 
})