import { createBlogWrapper, clearWrapper } from "../serverWrappers";

beforeEach(() => {
    clearWrapper();
})

test('Test correct return type', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );
})

test('Test multiple of same title', () => {
    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual({ blogId: expect.any(Number)} );

    expect(createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!')).toStrictEqual(400);
})

test('Test that blogId returned is unique', () => {
    const result = createBlogWrapper('Title', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!');

    const secondResult = createBlogWrapper('Title2', '12/10/25', 'Bream','Wentworth Point', 'Caught a bream oh my god!!!');

    expect(result.blogId).not.toEqual(secondResult.blogId);
})