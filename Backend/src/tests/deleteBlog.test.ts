import { createBlogWrapper, clearWrapper, listBlogWrapper, deleteBlogWrapper } from '../serverWrappers';

let id: number;

beforeEach(() => {
  clearWrapper();
  id = createBlogWrapper('Title', '12/10/25', 'Bream', 'Wentworth Point', 'Caught a bream oh my god!!!').blogId;
});

test('Test correct return type', () => {
  expect(deleteBlogWrapper(id)).toStrictEqual({});
});

test('Test multiple deletions', () => {
  const id2 = createBlogWrapper('Title 2', '12/10/25', 'Bream', 'Wentworth Point', 'Caught a bream oh my god!!!').blogId;

  let result = listBlogWrapper();
  expect(result.size).toStrictEqual(2);
  expect(result.blogs.length).toStrictEqual(2);

  expect(deleteBlogWrapper(id)).toStrictEqual({});

  result = listBlogWrapper();
  expect(result.size).toStrictEqual(1);
  expect(result.blogs.length).toStrictEqual(1);

  expect(deleteBlogWrapper(id2)).toStrictEqual({});

  result = listBlogWrapper();
  expect(result.size).toStrictEqual(0);
  expect(result.blogs.length).toStrictEqual(0);
});

test('Test incorrect blog Id given', () => {
  expect(deleteBlogWrapper(id - 1)).toStrictEqual(400);
});
