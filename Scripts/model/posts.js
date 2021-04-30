module.exports =     { //using "{}" means it is an object

    //posts is a property of this said object (and is actually an array)
    posts : [ 
/*         {id:'hardcodedPost',
        title: 'hardcodedTitle',
        description: 'hardcodedDesc'
        } */
    ],

    // getAll is a property of this object (and is actually an function)
    getPosts(){return this.posts},

    // newPost is a property of this object (and is actually an function)
    newPost(title, description){
        // creates element that is an object with the id, title and description
      let newPost = { id:generateId(), title, description} 

      this.posts.push(newPost)
    },

    //delete Post
    deletePost(ID){
        let n = 0
        this.posts.forEach((post) => {
            if(post.id == ID){this.posts.splice(n, 1);}
            n++
        })
    }
}


const generateId = () => {
    let randomId = Math.random().toString(36).substr(2,9); //generates a random ID with letters and numbers
    return randomId
}