// testJest/__mocks__/next/navigation.js
export const useRouter = () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
});