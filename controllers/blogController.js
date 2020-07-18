const { body, validationResult } = require('express-validator');
const Post = require('../models/postModel');
const e = require('express');
const { nextTick } = require('async');

// GET - home page for the blog, list all posts
exports.get_blog_posts = (req, res) => {
    res.send('NYI: Will list blog posts');
}

// SHOW - show a single post
exports.get_blog_post = (req, res) => {
    res.send('NYI: Show single post');
}

// CREATE - new blog post
exports.post_blog = [
    body('title', 'Title empty').trim().isLength({ min: 1 }),
    body('body', 'Post body empty').trim().isLength({ min: 1 }),
    body('author', 'Author not included').trim().isLength({ min: 1 }),

    body('*').escape(),

    (req, res, next) => {
        const validationResults = validationResult(req);

        const post = new Post({
            title: req.body.title,
            body: req.body.body,
            published: req.body.published ? true : false,
            author: req.body.author
        })

        // check for validation errors
        if (validationResults.errors.length) {
            res.status(400).json({ errors: validationResults.errors });
        }

        post.save(err => {
            if (err) return next(err);
            res.status(200).json({ message: 'Blog post save.' });
        })
    }
]

// EDIT - fetch post data and send it to client for editing
exports.get_blog_post_edit = (req, res) => {
    res.send('NYI: edit single post');
}

// UPDATE - update blog post - receives edited information - send to data base
exports.put_blog_post = (req, res) => {
    res.send('NYI: update blog post');
}

// DELETE - delete blog post
exports.delete_blog_post = (req, res) => {
    res.send('NYI: delete blog post');
}

/** COMMENTS CONTROLLERS */
// POST CREATE: Create new comment for a post
exports.post_blog_comment = (req, res) => {
    res.send('NYI: Create new comment for post ' + req.params.id);
}

// DELETE: Delete comment
exports.post_blog_comment_delete = (req, res) => {
    res.send(`NYI: Delete comment ${req.params.commentId} for post ${req.params.id}`);
}

