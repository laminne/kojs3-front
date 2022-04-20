export function getElementById(arg) {
    const e = document.getElementById(arg);
    if (!e) {
        throw new Error("HTMLElementNotFoundError");
    }
    return e;
}
// true = Not Null どれか一つでもnullがあればfalse
export function textBoxNotNullCheck(E) {
    for (let i = 0; i < E.length; i++) {
        if (E[i].value == "") {
            return false;
        }
    }
    return true;
}
export function getParam(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
