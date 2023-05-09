import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import * as bookmark from '../src/node.js';
import main from './main.js';

const getPath = url => fileURLToPath(new URL(url, import.meta.url));

const text = readFileSync(getPath('bookmarks_2023_5_9.html'), 'utf-8');

main(bookmark, assert, text);