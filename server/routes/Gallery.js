const express=require('express');
const router=express.Router();
const connection=require('../dbconnection');

router.get('/',(req,res)=>{
    const sqlQuery='select * from gallery';
    connection.query(sqlQuery,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send('Error retrieving data');
             return;
        }
        res.status(200).json(result);
    })
})



router.post('/',(req,res)=>{
    console.log("ello")
    const {image_url,description}=req.body;
    const query='insert into gallery(image_url,description) values (?,?) ';
    connection.query(query,[image_url,description],(err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error inserting data' });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      }
    );
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    const query='delete from gallery where id=?'
    connection.query(query,id,(error,result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.status(200).json({ message: 'Course deleted successfully' });
        }
    })
})


module.exports=router;