
const express = require('express');
const posts = require('../model/posts')
const router = express.Router();
const cors = require('cors');

const corsOptions = {
    origin:'http://localhost:3000'
}
router.use(cors());


router.get('/all', getAllPosts)

const getAllPosts = (req, res) =>{

    let postsArray = posts.getPosts() //calls a imported function, get ALL POSTS

    let ALLPostsStringfied = JSON.stringify(postsArray) //stringfy the array

    res.json(ALLPostsStringfied) //sends a response type json
}



router.post('/new', express.json(), addNewPost)

const addNewPost = (req, res) =>{

    //gets title and descriptions from body
    let title = req.body.title
    let description = req.body.description

    //calls a function that uses title and description as arguments
    posts.newPost(title, description);

    res.send('post added succesfuly')
}



router.delete('/erase', express.json(), deleteFunction)

const deleteFunction = (req, res) =>{

    let id = req.body.id

    //calls a function that uses Id as arguments
    posts.deletePost(id);

    res.send('post deleted succesfuly')
}

module.exports = router