import { createBlogWrapper, clearWrapper } from "../serverWrappers";

beforeEach(() => {
    clearWrapper();
})

test('Test correct return type', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );

    expect(listBlogs()).toStrictEqual({ size: 1, blogs: expect.any(Array) })
})

test('Test multiple blogs listed', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );

    const result = listBlogs();
    expect(result.blogs.size).toStrictEqual(1);
    expect(result.blogs.length).toStrictEqual(1);

    createBlogWrapper('New Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')

    const result_2 = listBlogs();
    expect(result_2.blogs.size).toStrictEqual(2);
    expect(result_2.blogs.length).toStrictEqual(2);
})