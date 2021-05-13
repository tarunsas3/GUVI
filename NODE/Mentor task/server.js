const mongodb = require("mongodb")
const cors = require("cors")
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const mongoClient = mongodb.MongoClient;
const ObjectId = require('mongodb').ObjectId; 



app.use(express.json());
app.use(cors());



var mongourl = "mongodb+srv://tarunsas3:9884009008@cluster0.n9qea.mongodb.net/<dbName>?retryWrites=true&w=majority"

app.get("/",(req,res)=>{
    res.json({
        "Title": "Student-Mentor api endpoints reference",
        });
    res.end();
});


app.post("/add-a-student", async(req, res)=>{
    try{
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db")
        let result = await db.collection("students").insertOne(req.body)
        res.status(200).json({
            message :"Student record inserted"
        })
        client.close()
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error while adding the student"
        })
    }
});

app.post("/add-a-mentor", async(req, res)=>{
    try{
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db")
        let result = await db.collection("mentors").insertOne(req.body)
        res.status(200).json({
            message :"mentor record inserted"
        })
        client.close()
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error while adding the mentor"
        })
    }
});

app.put("/assign-students-for-a-mentor/", async(req, res)=>{
    let mentorId = req.body.mentorId;
    let id = req.body.studentId;
    let studentId = id.map(val => ObjectId(val));
    try{
        
        console.log(mentorId);
        console.log(studentId);
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db");
        let query = await db.collection("students").updateMany({_id :{ $in: studentId }}, {$set: {mentor_id: mentorId}}) ;
        res.status(200).json({
            message : "updated the records !!",
            data : query
        })
        client.close()
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "error updating the records",
            data: error.message
        })
    }
});



app.put("/change-mentor-for-a-student", async(req, res)=>{
    
    let studentId = req.body.studentId;
    let mentorId = req.body.mentorId
    
    try{
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db");
        
        let query = await db.collection("students").findOneAndUpdate({_id :mongodb.ObjectID(studentId)}, {$set: {mentor_id: mentorId}}) ;
        
        if(query['lastErrorObject']['updatedExisting'] === false){
            res.status(404).json({
                message : "id not found, error updating the records",
                data : false
            }) 
        }

        res.status(200).json({
            message : "updated the records !!",
            data : true
        })
        client.close()
    }
    catch(error)
    {
        res.status(404).json({
            message: "id not found, error updating the records",
            data: false
        })
    }
});

app.get("/list-of-students-for-a-mentor/:mentorId", async(req, res)=>{
    let mentorId = req.params.mentorId
    console.log(mentorId)
    try{
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db");
        let query = await db.collection("students").find({"mentor_id": mentorId}).toArray();
        console.log(query.length)
        res.status(200).json({
            "data" : query
        })
        client.close()
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Could not find any students for the mentor id: "+ mentorId,
            data: error.message
        })
    }
});

app.get("/all-students-mentors/:condition", async(req, res)=>{
   let mentorId = +req.body.mentorId
    try{
        let studentQuery;
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db");
        if(req.params.condition == 'unassigned'){
        studentQuery  = await pendingStudents();
        }else{
        studentQuery = await db.collection("students").find().toArray();
        }
        let mentorQuery = await db.collection("mentors").find().toArray();
        res.status(200).json({
            students : studentQuery,
            mentors: mentorQuery
        })
        client.close()
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Could not find any students for the mentor id: "+ mentorId,
            data: error.message
        })
    }
});


async function pendingStudents(){
        let client = await mongoClient.connect(mongourl)
        let db = client.db("institute_db")
        let result = await db.collection("students").find({"mentor_id": null}).toArray();
        client.close();
        console.log(result);
        return result;
};


app.listen(PORT,()=>console.log(`Student-Mentor Api server is running at port ${PORT}`))
