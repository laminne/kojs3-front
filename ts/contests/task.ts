import * as Lib from "../lib/main.js";

window.onload = async () => {
  const api = new Lib.API();
  const token = localStorage.getItem("token");
  if (!token) {
    // ログインしていないのならloginに飛ばす
    document.location.href = "/login.html";
    return;
  }
  const id = Lib.getParam("id"); // contestId
  const tid = Lib.getParam("tid"); //taskId
  try {
    const res = await api.get("/contests/" + id + "/tasks/" + tid, token); // 問題情報
    const contest = await api.get("/contests/" + id); // コンテスト情報
    // 情報をパースして表示
    // ToDo: 鯖から帰ってくるjsonと型を合わせる
    Lib.getElementById(
      "contest-title"
    ).innerHTML = `<a href="show.html?id=${contest.id}">${contest.title}</a>`;
    Lib.getElementById("task-name").innerText = res.title;
    Lib.getElementById(
      "task-constrains"
    ).innerText = `実行時間制限: ${res.time_limit}sec / メモリ制限: ${res.memory_limit}`;
  } catch (e) {
    console.error(e);
    alert("サーバーとの通信に失敗しました");
  }
};
