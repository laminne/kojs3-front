import * as Lib from "./lib/main.js";

Lib.getElementById("registerbutton").addEventListener("click", async () => {
  const Elems:any[] = [
    Lib.getElementById("email"),
    Lib.getElementById("name"),
    Lib.getElementById("password"),
  ];
  if (!Lib.textBoxNotNullCheck(Elems)) {
    alert("すべての項目に入力してください");
    return;
  }
  const api = new Lib.API();
  const req = {
    name: Elems[1].value,
    password: Elems[2].value
  }
  const token = await api.post("/register", req)
  if (!token.token){
    console.error("tokenがありません");
    return;
  }else{
    localStorage.setItem("token", token.token)
  }
});
