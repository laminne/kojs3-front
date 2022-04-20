export function getElementById(arg: string) {
  const e = document.getElementById(arg);
  if (!e) {
    throw new Error("HTMLElementNotFoundError");
  }
  return e;
}

// true = Not Null どれか一つでもnullがあればfalse
export function textBoxNotNullCheck(E: any[]): boolean {
  for (let i = 0; i < E.length; i++) {
    if (E[i].value == "") {
      return false;
    }
  }
  return true;
}

export function getParam(name: string, url?: string) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
