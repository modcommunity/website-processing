/** Section heading -> stable anchor id (also what the table of contents links to). */
export function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[‘’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}
