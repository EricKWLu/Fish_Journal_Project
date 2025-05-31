export interface Blog {
    blogId: number;
    title: string;
    content: string;
    species: string;
    date: string;
    location: string;
    imagePath: string | null;
}

export interface BlogData {
    blogs: Blog[]
}