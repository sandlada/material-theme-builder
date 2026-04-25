type _ToKebabCase<S extends string, IsFirst extends boolean = true> =
    S extends `${infer First}${infer Rest}`
    ? First extends "_" | "-"
    ? `-${_ToKebabCase<Rest, false>}`
    : First extends Uppercase<First>
    ? IsFirst extends true
    ? `${Lowercase<First>}${_ToKebabCase<Rest, false>}`
    : `-${Lowercase<First>}${_ToKebabCase<Rest, false>}`
    : `${First}${_ToKebabCase<Rest, false>}`
    : ""

export type ToKebabCase<S extends string> = _ToKebabCase<S>

export function toKebabCase<S extends string>(str: S): ToKebabCase<S> {
    if (!str) return '' as ToKebabCase<S>;
    return str
        // 處理 camelCase / PascalCase：在小寫或數字後接大寫字母時插入 -
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // 將空格、下劃線、點等分隔符替換為 -
        .replace(/[\s_.]+/g, '-')
        // 全部轉小寫
        .toLowerCase()
        // 合併連續的 -
        .replace(/-+/g, '-')
        // 去除開頭和結尾的 -
        .replace(/^-|-$/g, '') as ToKebabCase<S>;
}
