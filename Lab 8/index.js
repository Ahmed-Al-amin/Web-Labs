const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const posts = [];

// get all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// get specific post by id
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    // Find the post with the matching ID
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.json(post);
});

// create a new post
app.post("/posts", (req, res) => {
    const post = {
        id: Date.now().toString(), // Generates a unique ID based on current time
        title: req.body.title,
        content: req.body.content,
        comments: [] // Initialize an empty array for future comments
    };
    
    posts.push(post);
    console.log(`New post added: ${post.title}`);
    res.status(201).json(post);
});


//create a new comment on specific post
app.post("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    const comment = {
        commentId: Date.now().toString(), // Unique ID for the comment
        text: req.body.text
    };

    post.comments.push(comment);
    res.status(201).json(post);
});

// get all comments for a specific post
app.get("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.json(post.comments);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});