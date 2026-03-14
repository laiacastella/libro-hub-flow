import { minify } from "html-minifier-terser";

const defaultOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
};

export async function minifyHtml(html, options = {}) {
    if (typeof html !== "string") {
        throw new TypeError("minifyHtml espera un string HTML.");
    }

    return minify(html, {
        ...defaultOptions,
        ...options,
    });
}
