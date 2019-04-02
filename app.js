'use strict'

const express = require('express')
const app = express()
const port = 3000

// Serve static files
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => res.send('index.html'))

// Start server
app.listen(port, () => console.log('Server running at http://localhost:3000/'))
