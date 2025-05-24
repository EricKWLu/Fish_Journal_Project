/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import express, { json, Response } from 'express';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import process from 'process';
import { handleError } from './errors';
import { loadBlogs, saveBlogs } from '../dataStore';
import { createBlog } from './blogs'
import { clear } from './clear';

const app = express();
app.use(json());
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
function withErrorHandler<T>(res: Response, callback: () => T): T | undefined {
  try {
    return callback();
  } catch (err) {
    handleError(res, err);
  }
}

// ==================================================

//Clear data
app.delete('/v1/clear', (req, res) => {
  const result = clear();
  saveBlogs();
  return res.status(200).json(result);
})

//Create a new blog
app.post('/v1/blog/create', (req, res) => {
  const { title, content, species, date, location } = req.body;
  loadBlogs();

  let result;

  try {
    result = createBlog(title, content, species, date, location);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }

  saveBlogs();
  return res.status(200).json(result);
})

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
