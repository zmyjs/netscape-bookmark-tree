import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { identity } from '../src/utils.js';
import * as bookmark from '../src/node.js';
import main from './main.js';

const text = readFileSync('test/bookmarks_2023_5_9.html', 'utf-8');

main(bookmark, assert, text, identity, function (tree, info) {
    writeFileSync('test/temp.stringify.html', info.text2);
});