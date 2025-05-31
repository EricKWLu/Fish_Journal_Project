/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import express, { json } from 'express';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import process from 'process';
// import { handleError } from './errors';s
import { loadBlogs, saveBlogs, getBlogs } from '../dataStore';
import { createBlog, listBlogs, deleteBlog } from './blogs';
import { clear } from './clear';
import multer from 'multer';
import fs from 'fs';

const path = require('path');
const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const app = express();
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const IP: string = process.env.IP || config.ip;

/**
 * Adds the error handler to the given route.
 *
 * This attempts to call `callback`. If any error is thrown, it is passed to `handleError` to send
 * the correct response code.
 */
/* function withErrorHandler<T>(res: Response, callback: () => T): T | undefined {
  try {
    return callback();
  } catch (err) {
    handleError(res, err);
  }
} */

// ==================================================

app.use((req, res, next) => {
  // Skip body parser if Content-Type is multipart
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    return next();
  }
  json()(req, res, next);
});

// Clear data
app.delete('/v1/clear', (req, res) => {
  const result = clear();
  saveBlogs();
  return res.status(200).json(result);
});

// Create a new blog
app.post('/v1/blog/create', upload.single('image'), (req, res) => {
  const { title, content, species, date, location } = req.body;
  const image = req.file;

  loadBlogs();

  let result;

  try {
    result = createBlog(title, date, species, location, content, image);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  saveBlogs();
  return res.status(200).json(result);
});

app.delete('/v1/blog/delete', (req, res) => {
  const blogId = parseInt(req.body.blogId);
  loadBlogs();

  let result;

  try {
    result = deleteBlog(blogId);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  saveBlogs();
  return res.status(200).json(result);
});

// Return a list of created blogs
app.get('/v1/blog/list', (req, res) => {
  loadBlogs();
  let result;

  try {
    result = listBlogs();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(result);
});

// Get image corresponding to blog id
app.get('/v1/blog/:id/image', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = getBlogs().blogs.find(b => b.blogId === blogId);

  if (!blog || !blog.imagePath) {
    return res.status(404).send('Image not found');
  }

  const imagePath = path.resolve(__dirname, 'uploads', path.basename(blog.imagePath));

  // Ensure the file exists before sending it
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Image file not found on disk');
  }

  res.sendFile(imagePath);
});

// Start server
const server = app.listen(PORT, IP, () => {
  console.log(`🐝 Your server is up and running! http://${IP}:${PORT}/`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🌱 Shutting down server gracefully...');
  server.close(() => {
    console.log('🍂 Goodbye!');
    process.exit();
  });
});
