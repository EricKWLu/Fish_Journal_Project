export interface Blog {
    blogId: number;
    title: string;
    content: string;
    species: string;
    date: string;
    location: string;
}

export interface BlogData {
    blogs: Blog[]
}