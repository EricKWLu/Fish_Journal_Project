import { createBlogWrapper, clearWrapper, listBlogWrapper } from "../serverWrappers";

beforeEach(() => {
    clearWrapper();
})

test('Test correct return type', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );

    expect(listBlogWrapper()).toStrictEqual({ size: 1, blogs: expect.any(Array) })
})

test('Test multiple blogs listed', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );

    const result = listBlogWrapper();
    expect(result.size).toStrictEqual(1);
    expect(result.blogs.length).toStrictEqual(1);

    createBlogWrapper('New Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')

    const result_2 = listBlogWrapper();
    expect(result_2.size).toStrictEqual(2);
    expect(result_2.blogs.length).toStrictEqual(2);
})