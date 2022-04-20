"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textBoxNotNullCheck = exports.getElementById = void 0;
function getElementById(arg) {
    const e = document.getElementById(arg);
    if (!e) {
        throw new Error("HTMLElementNotFoundError");
    }
    return e;
}
exports.getElementById = getElementById;
// true = Not Null
function textBoxNotNullCheck(E) {
    if (!E.innerText) {
        return false;
    }
    return true;
}
exports.textBoxNotNullCheck = textBoxNotNullCheck;
