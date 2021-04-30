//this make sure the functions are called after de document is loaded
document.addEventListener('DOMContentLoaded', () => {

        updatePosts();

})

//local ip goes here
let ip = 'http://192.168.0.18:3000'

//function used to update visible posts
const updatePosts = () => {

    fetch(ip+"/api/all")
        .then(handleErrors)
            .then((res) =>{return res.json()})
                .then( (jsonPosts) => {

                    let postElements = '';

                    let posts = JSON.parse(jsonPosts) //parse stringfied posts, now its an object

                    posts.forEach((post) => {

                        let postElement =  `<div class="card mb-4 myshadow" id=${post.id}>
                                                <div class="card-header mybgtitle ">
                                                    <h5 class="card-title d-inline">${post.title}</h5>
                                                    <div class="float-right btn btn-sm rounded-circle"  onclick="deletePost(this)">X</div>
                                                </div> 
                                                <div class="card-body mybg">
                                                    <div class="card-text">${post.description}</div>
                                                </div>
                                            </div>`;

                        postElements = postElements + postElement
                    });
                    $('#posts').html(postElements)

            }).catch((error) => {console.log(error);errorMessage();})
}

//function used to create new posts
const newPost = () => {

    let title = $('#title').val()
    let description = $('#desc').val()

    if (title.length > 0){

        let post = {title, description}

        let stringfiedPost = JSON.stringify(post)

        const options = {method:"POST", 
                        headers: new Headers({'content-type': 'application/json'}),
                        body: stringfiedPost                
                        }
        fetch(ip+"/api/new", options)
            .then(handleErrors)
                .then((res)=>{
                    updatePosts()
                    $('#title').val('')
                    $('#desc').val('')
                }).catch((error) => {console.log(error);errorMessage();})
        }
}

//function used to delete posts
function deletePost (x) {
    let id = x.parentElement.parentElement.id

    let post = {id}

    let stringfiedPost = JSON.stringify(post)

    const options = {method:"DELETE", 
                     headers: new Headers({'content-type': 'application/json'}),
                     body: stringfiedPost             
                    }
    fetch(ip+"/api/erase", options)
      .then(handleErrors)
        .then((res)=>{
             updatePosts()
        }).catch((error) => {console.log(error);errorMessage();})

}

//function used to set up error message
const errorMessage = () => {
    let errorbox = `<div class="p-3 bg-danger text-white" id="errorBox">
                        <span class="d-inline">An error has ocurred</span>
                        <div class="float-right btn btn-sm pt-0 btn-danger rounded-circle"onclick="hideErrorMessage()">X</div>
                    </div>`
    $('#error').html(errorbox)
}

function hideErrorMessage () {$('#errorBox').toggle()}

//function used to handle errors (used in all fetchs)
function handleErrors(res) {
    if (!res.ok) {throw Error(res.statusText);}
    return res;
}
