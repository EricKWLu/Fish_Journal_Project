import fs from 'fs';
import path from 'path';
import { Blog, BlogData } from './types';

const BLOGS_FILE = path.resolve(__dirname, 'blogs.json');

const blogData: BlogData = {
    blogs: []
}

export { blogData };

export function getBlogs() {
    return blogData;
}

export function loadBlogs() {
    if (fs.existsSync(BLOGS_FILE)) {
        const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
        Object.assign(blogData, JSON.parse(raw));
    }
}

export function saveBlogs() {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogData, null, 2));
  }
  