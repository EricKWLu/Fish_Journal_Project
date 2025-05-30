import { getBlogs } from '../dataStore';
import { Blog, BlogData } from '../types';

/**
 * Creates a blog and returns the generated blogId
 *
 * @param {string} title
 * @param {string}date
 * @param {string} species
 * @param {string} location
 * @param {string}content
 * @returns {obj<blogId: number>}
 */
export function createBlog(title: string, date: string, species: string, location: string, content: string) {
  const blogData: BlogData = getBlogs();

  if (blogData.blogs.find(blog => blog.title === title)) {
    throw new Error('This title already exists');
  }

  const blogId = blogData.blogs.length + 1;
  const newBlog: Blog = {
    blogId: blogId,
    title: title,
    date: date,
    species: species,
    location: location,
    content: content,
  };

  blogData.blogs.push(newBlog);

  console.log('Created new blog with details ' + newBlog);
  return { blogId: blogId };
}

/**
 * Gets all current blogs and returns an object with the number of blogs and an array containing all blogs
 *
 * @returns {obj<size: number, blogs: array>}
 */
export function listBlogs() {
  const blogData: BlogData = getBlogs();

  const size: number = blogData.blogs.length;
  const array: Blog[] = blogData.blogs;

  return { size: size, blogs: array };
}

/**
 * Deletes a given blog according to its blogId
 *
 * @param blogId
 * @returns {}
 */
export function deleteBlog(blogId: number) {
  const blogData: BlogData = getBlogs();

  const index = blogData.blogs.findIndex((element) => element.blogId === blogId);

  if (index === -1) {
    throw new Error('Blog not found');
  }

  blogData.blogs.splice(index, 1);

  return {};
}
