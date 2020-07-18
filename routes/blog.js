const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

/** BOG ROUTES */

/** POSTS */
// GET: /blogs - list of blog posts
router.get('/', blogController.get_blog_posts);

// POST - CREATE: /blogs - handles new post data
router.post('/', blogController.post_blog);

// GET - EDIT: /blogs/:id/edit - Edit post
router.get('/:id/edit', blogController.get_blog_post_edit);

// GET - SHOW: /blogs/:id - Show single post
router.get('/:id', blogController.get_blog_post);

// PUT - UPDATE: /blogs/:id - Update post
router.put('/:id', blogController.put_blog_post);

// DELETE - DESTROY: /blogs/:id - Delete post
router.delete('/:id', blogController.delete_blog_post);


/** COMMENTS */
// POST - CREATE: /blogs/:id/comment - create new post comment
router.post('/:id/comment', blogController.post_blog_comment);

// DELETE: /blogs/:id/comment/:id - delete comment
router.delete('/:id/comment/:commentId', blogController.post_blog_comment_delete);

module.exports = router;