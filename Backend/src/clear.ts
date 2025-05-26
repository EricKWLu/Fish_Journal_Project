import { getBlogs } from "../dataStore";
import { BlogData } from "../types";

/**
 * Clears all data in datastore
 * 
 * @returns 
 */
export function clear() {
    const blogData: BlogData = getBlogs();

    blogData.blogs = [];

    return {};
}