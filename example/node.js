import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
import bookmark from '../src/node.js';

const getPath = url => fileURLToPath(new URL(url, import.meta.url));

const text = readFileSync(getPath('bookmarks_2023_5_9.html'), 'utf-8');

const tree = bookmark.parse(text);

console.log(JSON.stringify(tree, undefined, ' '));