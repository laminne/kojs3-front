export function getElementById(arg: string): HTMLElement {
  const e = document.getElementById(arg);
  if (!e) {
    throw new Error("HTMLElementNotFoundError");
  }
  return e;
}

// true = Not Null どれか一つでもnullがあればfalse
export function textBoxNotNullCheck(E: any[]): boolean {
  for (let i=0;i<E.length;i++) {
    if (E[i].value == "") {
      return false;
    }
  }
  return true;
}
