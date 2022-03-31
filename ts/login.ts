import * as Lib from "./lib/main.js";

Lib.getElementById("login").addEventListener("click", async () => {
  const Elems: any[] = [
    Lib.getElementById("name"),
    Lib.getElementById("password"),
  ];
  if (!Lib.textBoxNotNullCheck(Elems)) {
    alert("すべての項目に入力してください");
    return;
  }
  const api = new Lib.API();
  const req = {
    name: Elems[0].value,
    password: Elems[1].value,
  };
  const token = await api.post("/login", req);
  if (!token.token) {
    console.error("tokenがありません");
    return;
  } else {
    localStorage.setItem("token", token.token);
  }
  // 成功したらリダイレクト入れる <- どこに飛ばすの？
  document.location.href = "mypage.html";
});
