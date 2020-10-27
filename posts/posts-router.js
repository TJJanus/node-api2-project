 // [POST Request Done]
 const express = require('express')
 const Posts = require('./db');

 const router = express.Router();
 
 
 router.post('/api/posts', (req, res) => {
    if(!req.body.title || !req.body.contents){
          return res.status(404).json({
              errorMessage: "Please provide title and contents for the post."
          })
      } 
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            })
        })
  })

  // [POST Request Done] - 2
  router.post('/api/posts/:id/comments', (req, res) => {
    if(!req.body.comments){
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    }
    if(!req.body.text){
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }
      const newComment = {post_id: req.params.id, ...req.body}
      Posts.insertComment(newComment)
        .then(comment => {
            console.log(comment)
            res.status(201).json(comment)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
  })

    // [GET] request done - 3
  router.get('/api/posts', (req, res) => {
      console.log(req.query)
      Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The posts information could not be retrieved." 
            })
        })
  })

  // [GET] request by ID done - 4
  router.get('/api/posts/:id', (req, res) => {
      Posts.findById(req.params.id)
        .then(posts => {
            if(posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
  })

    // [GET] request for comment by ID - 5
  router.get('/api/posts/:id/comments', (req, res) => {
      Posts.findPostComments(req.params.id)
      .then(data => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The post with the specified ID does not exist."  
        })
      })
  })

  // [DELETE] - a whole post - 6
  router.delete('/api/posts/:id', (req, res) => {
      
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: 'The post has been deleted'
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
  })

  // [PUT] request to update a value that is already stored
  router.put('/api/posts/:id', (req, res) => {

    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
      const changes = req.body;
      Posts.update(req.params.id, changes)
        .then(data => {
            console.log(data)
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The post information could not be modified." 
            })
        })
  })

  module.exports = router