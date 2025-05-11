const API_URL = 'http://localhost:3000';

export async function clearWrapperF() {
    const res = await fetch(`${API_URL}/v1/clear`, {
        method: 'DELETE',
    });

    const body = await res.json();
    return body;
}

export async function createBlogWrapperF(
    title: string,
    date: string,
    species: string,
    location: string,
    content: string
  ) {
    const res = await fetch(`${API_URL}/v1/blog/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, species, location, content }),
    });
  
    const body = await res.json();
  
    if (res.status === 400) {
      console.error(body.error);
      return res.status;
    }
  
    return body;
}
  