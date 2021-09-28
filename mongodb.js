// const { ObjectID } = require("bson");
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// Setting mongodb to mongoClient and ObjectId
const {MongoClient, ObjectId} = require('mongodb');


// ObjectID Details 
// const id = new ObjectID();
// console.log(id)
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length)
// console.log(id.getTimestamp());

const ConnectionURL = "mongodb://127.0.0.1:27017";
const DatabaseName = "mongoCurd";

MongoClient.connect(ConnectionURL ,{useNewUrlParser:true}, (error , client) =>{
    if(error){
        return (error);
    }
   const db = client.db(DatabaseName);


   /// Insert Operations ////

           db.collection('user').insertOne({
               name : "nandini",
               age : 24
           }, (error, result) =>{
               if(error){
                   return console.log("unable to insert the document")
               }
               console.log(result.ops)
           })
        db.collection('user').insertMany([
            {
                name : 'brama',
                age :23
            },
            {
                name : "revanth",
                age : 27
            }
        ], (error, result)=>{
            if(error){
                return console.log("Unable to insert the data");
            }
            console.log(result.ops);
        })

    ////// INSERT MANY METHOD //////////

        db.collection('tasks').insertMany([
            {
                tastName : "cleaning",
                status : false
            },{
                tastName : "reading",
                status : false
            },{
                tastName : "watching",
                status : true
            }
        ], (error, result) =>{
            if(error){
                return console.log("unable to insert the data");
            }

            console.log(result.ops)
        })



    ////Find Objects Method ////

    // Find One Method //

        db.collection("user").findOne({_id :new ObjectId("6152d58dc2506cc160a22620")}, (error, foundUser) =>{
            if(error){
                return console.log("Unable to find the user");
            }
            console.log(foundUser);
        })

        db.collection("user").findOne({age :24}, (error, foundUser) =>{
            if(error){
                return console.log("Unable to find the user");
            }
            console.log(foundUser);
        })
        db.collection("tasks").findOne({_id : ObjectId("6152d9ec72da52ebc69e9396")}, (error, work) =>{
            if(error){
                return console.log("Unable to find the work");
            }
            console.log(work)
        })

    // Find many method //
       
       db.collection("user").find({age :24}).toArray((error , users) =>{
           if(error){
               return console.log("unable to find the requested users");
           }
           console.log(users)
       })

       db.collection("user").find({age :24}).count((error , count) =>{
        if(error){
            return console.log("unable to find the requested users");
        }
        console.log("No. of  search results are " + count)
        })

        db.collection("tasks").find({status : false}).toArray((error, incompleteWork) =>{
            if(error){
                return console.log("Unable to fetch incomplete works")
            }
            console.log(incompleteWork)
        })



   //// UPDATE METHOD ////
    
        db.collection("user").updateOne(
            {
                _id : new ObjectId("61528ec179c44b85fe1d47e9")
            },
            {
                ////////// Updating the name and age of the person we have _ID above menstioned ID//////
                // $set :{
                //     name : "Anirudh",
                //     age :22
                // }

                //Using Increment Operator 
                $inc :{
                    age : 2
                }
            }
        ).then((result) =>{
            console.log("success" , result);
        }).catch((error)=>{
            console.log("error", error)
        })


    // Update Many Method //

        db.collection("user").updateMany(
            {
                name: "prithvi"
            },{
            $set:{
                    age : 88
            } 
            }
        ).then((result) =>{
                console.log("success" , result);
            }).catch((error) =>{
                console.log("error" , error);
            })
       
        db.collection("tasks").updateMany(
            {
                status : false
            },{
            $set:{
                    status : true
            } 
            }
        ).then((result) =>{
                console.log("success" , result);
            }).catch((error) =>{
                console.log("error" , error);
            })



    /// Delete One Method ///

        db.collection("user").deleteOne({
            age : 88
        }).then((result) =>{
            console.log("successFully Deleted" , result.matchedCount);
        }).catch((error) =>{
            console.log("Error" , error)
        })
        
    ///// Delete Many //////

        db.collection("user").deleteMany(
            {
                name : "prithvi"
            }
        ).then((result) =>{
            console.log("Deleted Data ", result);
        }).catch((error) =>{
            console.log("Error" , error)
        })
})