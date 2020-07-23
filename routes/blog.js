const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })

/** BOG ROUTES */

/** POSTS */
// GET: /blogs - list of blog posts
router.get('/', blogController.get_blog_posts);

// GET: /blogs - list for a specif user
router.get('/user/:id', auth, blogController.get_blog_post_for_user);

// POST - CREATE: /blogs - handles new post data
router.post('/', auth, blogController.post_blog);

// GET - EDIT: /blogs/:id/edit - Edit post
router.get('/:id/edit', auth, blogController.get_blog_post_edit);

// GET - SHOW: /blogs/:id - Show single post
router.get('/:id', blogController.get_blog_post);

// PUT - UPDATE: /blogs/:id - Update post
router.put('/:id', auth, blogController.put_blog_post);

// DELETE - DESTROY: /blogs/:id - Delete post
router.delete('/:id', auth, blogController.delete_blog_post);


/** COMMENTS */
// POST - CREATE: /blogs/:id/comment - create new post comment
router.post('/:id/comment', auth, blogController.post_blog_comment);

// DELETE: /blogs/:id/comment/:id - delete comment
router.delete('/:id/comment/:commentId', auth, blogController.post_blog_comment_delete);

module.exports = router;