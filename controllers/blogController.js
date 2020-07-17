

// GET - home page for the blog, list all posts
exports.get_blog_posts = (req, res) => {
    res.send('NYI: Will list blog posts');
}

// SHOW - show a single post
exports.get_blog_post = (req, res) => {
    res.send('NYI: Show single post');
}

// CREATE - new blog post
exports.post_blog = (req, res) => {
    res.send('NYI: Will handle a new post form');
}

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

