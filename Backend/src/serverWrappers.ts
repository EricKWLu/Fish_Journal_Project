import request from 'sync-request-curl';
import config from './config.json';
import { clear } from './clear';
import { createBlog } from './blogs';
const port = config.port;
const url = `http://${config.ip}:${config.port}`;

export function clearWrapper() {
  const res = request('DELETE', `${url}/v1/clear`);
  const body = JSON.parse(res.body.toString());
  
  return body;
}

export function createBlogWrapper(title: string, date: string, species: string, location: string, content: string) {
  const res = request('POST', `${url}/v1/blog/create`, {
    json: {title, date, species, location, content},
  });

  const body = JSON.parse(res.body.toString());
  if ([400].includes(res.statusCode)) {
    expect(body).toStrictEqual({ error: expect.any(String) });
    return res.statusCode;
  }

  return body;
}

export function listBlogWrapper() {
  const res = request('GET', `${url}/v1/blog/list`);

  const body = JSON.parse(res.body.toString());
  if ([400].includes(res.statusCode)) {
    expect(body).toStrictEqual({ error: expect.any(String) });
    return res.statusCode;
  }

  return body;
}