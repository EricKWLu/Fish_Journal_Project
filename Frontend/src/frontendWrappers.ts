const API_URL = 'http://localhost:3000';

export async function clearWrapperF() {
    const res = await fetch(`${API_URL}/v1/clear`, {
        method: 'DELETE',
    });

    const body = await res.json();
    return body;
}

export async function blogListF() {
  const res = await fetch(`${API_URL}/v1/blog/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await res.json();

    if (res.status === 400) {
      console.error(body.error);
      return null;
    }
  
    return body;
}

export async function deleteBlogF(blogId: number) {
  const res = await fetch(`${API_URL}/v1/blog/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId }),
    });

    const body = await res.json();

    if (res.status === 400) {
      console.error(body.error);
      return null;
    }
  
    return body;
}

export async function createBlogWrapperF(formData: FormData) {
    const res = await fetch(`${API_URL}/v1/blog/create`, {
      method: 'POST',
      body: formData,
    });
  
    const body = await res.json();
  
    if (res.status === 400) {
      console.error(body.error);
      return null;
    }
  
    return body;
}

export async function getBlogImageF(blogId: number) {
    const res = await fetch(`${API_URL}/v1/blog/${blogId}/image`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const body = await res.json();
  
    if (res.status === 404) {
      console.error(body.error);
      throw new Error(body.error || 'Image not found');
    }
  
    return body;
}
  