
import express from "express";
import { Book } from "../models/bookModel.js";
const router =express.Router();




// Route to Save a new Book
router.post('/',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send all the required fields"
            })
        }
        const newBook ={
            title : req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        };
        const book = await Book.create(newBook) 
        return res.status(200).send({
            message:"Entry added"
        })

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});

    }
    
})
//Get all the books from the database
router.get('/',async (req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
          });

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});

    }
    
})
//Get  a single book by id from database
router.get('/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});

    }
    
})
//Route to update a book by id
router.put('/:id', async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send all the required fields"
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).send({
                message:"Book not found"
            })
        }
        return res.status(200).send({
            message:"Entry updated"
        })

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});

    }
})
//Route to delete a book
router.delete('/:id', async (req,res)=>{
    try{
        
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id,req.body);

        if(!result){
            return res.status(404).send({
                message:"Book not found"
            })
        }
        return res.status(200).send({
            message:"Book Deleted"
        })

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});

    }
})

export default router;