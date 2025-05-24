import { getBlogs } from "../dataStore";
import { Blog, BlogData } from "../types";

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
    }

    blogData.blogs.push(newBlog);

    return { blogId: blogId };
}