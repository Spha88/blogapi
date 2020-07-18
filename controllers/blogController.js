const { body, validationResult } = require('express-validator');
const async = require('async');
const Post = require('../models/postModel');
const Comment = require('../models/commentsModel');

// GET - home page for the blog, list all posts
exports.get_blog_posts = (req, res) => {
    Post.find((err, posts) => {
        if (err) return res.status(500).json({ message: 'Error fetching posts.' });
        res.status(200).json({ posts });
    })
}

// SHOW - show a single post
exports.get_blog_post = (req, res) => {
    async.parallel({
        post: callback => Post.findById(req.params.id, callback),
        comments: callback => Comment.find({ post: req.params.id }, callback)

    }, (err, results) => {
        if (err) return res.status(400).json({ message: 'Error fetching post' })
        res.status(200).json({ post: results.post, comments: results.comments });
    })
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
    Post.findById(req.params.id).populate('author', 'first_name last_name').exec((err, post) => {
        if (err) return res.status(400).json({ message: 'Error fetching post' });
        if (!post) {
            res.status(400).json({ message: 'Post not found' })
        } else {
            res.status(200).json({ post });
        }
    })
}

// UPDATE - update blog post - receives edited information - send to data base
exports.put_blog_post = [
    body('title', 'Title empty').trim().isLength({ min: 1 }),
    body('body', 'Post body empty').trim().isLength({ min: 1 }),
    body('author', 'Author not included').trim().isLength({ min: 1 }),

    body('*').escape(),

    // Process request
    (req, res, next) => {
        // create user
        const post = new Post({
            _id: req.params.id,
            title: req.body.title,
            body: req.body.body,
            published: req.body.published ? true : false,
            author: req.body.author
        })

        const results = validationResult(req);

        // check validation errors
        if (!results.isEmpty()) return res.json({ error: results.errors });


        // find user and update
        Post.findByIdAndUpdate(req.params.id, post, {}, (err, user) => {
            if (err) return next(err);
            if (user) {
                res.status(200).json({ message: 'Blog post updated.', user: user })
            } else {
                res.status(400).json({ message: 'User not saved' });
            }
        })

    }
]

// DELETE - delete blog post
exports.delete_blog_post = (req, res) => {
    async.parallel({
        post: callback => Post.findOneAndDelete({ _id: req.params.id }, callback),
        comments: callback => Comment.deleteMany({ post: req.params.id }, callback)
    }, (err, results) => {
        if (err) return res.status(400).json({ message: 'could not delete post', errors: err });

        if (results.post == null) {
            return res.status(400).json({ message: 'Post does not exist' });
        }

        res.status(200).json({ message: 'Post and comments deleted', post: results.post, comments: results.comments })
    })
}

/**============================================================== */

/** COMMENTS CONTROLLERS */
// POST CREATE: Create new comment for a post
exports.post_blog_comment = [
    body('author', 'Author empty.').trim().isLength({ min: 1 }),
    body('body', 'Comment body empty.').trim().isLength({ min: 1 }),
    body('*').escape(),
    (req, res, next) => {
        const validationResults = validationResult(req);
        const comment = new Comment({
            author: req.body.author,
            post: req.body.post,
            body: req.body.body
        })

        if (validationResults.errors.length) {
            return res.status(400).json({ message: 'Validation errors', errors: validationResults.errors });
        }

        comment.save(err => {
            if (err) return res.status(500).json({ message: 'Comment Not Added' });

            return res.status(200).json({ message: 'Comment Saved.', comment: comment });
        })
    }
]

// DELETE: Delete comment
exports.post_blog_comment_delete = (req, res) => {
    res.send(`NYI: Delete comment ${req.params.commentId} for post ${req.params.id}`);
}

