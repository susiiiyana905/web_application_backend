const Post = require("../models/postModel")
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
describe('Post Schema test anything', () => {
    //this code is to test post insert
    it('Add post testing anything', () => {
        const test_post = {
        'user_id': '620cf0caec9d765239840bc9',
        'caption': 'testing22'
    };
 
    return Post.create(test_post)
    .then((postData) => {
        expect(postData.caption).toEqual('testing22');
    });
    });


    //this code is to test update post
    it('to test the update', async () => {
        return Post.findOneAndUpdate({_id :Object('620cfb31f5b8b7479b3fa436')}, 
            {$set : {caption:'new caption'}})
        .then(()=>{
            return Post.findOne({_id : Object('620cfb31f5b8b7479b3fa436')})
            .then((pd)=>{
                 expect(pd.caption).toEqual('new caption')
            })
        })
    
    });
 
})