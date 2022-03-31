import * as Lib from "../lib/main.js";
/*

KOJSでは参加登録ではなく制限時間終了後に1つでも提出した人を参加者とみなす

*/

window.onload = async () => {
  const api = new Lib.API();
  const token = localStorage.getItem("token");
  const id = Lib.getParam("id");
  if (!token) {
    document.location.href = "/login.html";
    return;
  } else if (!id) {
    document.location.href = "index.html";
  }
  // 開催情報を読み込む
  let res: {
    title: string;
    id: string;
    descriptions: string;
    starting_time: string;
    end_time: string;
    state: number;
  };
  try {
    res = await api.get("/contests/" + Lib.getParam("id"));
    // 終了していたら終了していることを表示
    // 参加ボタンが押されたら問題一覧が取得できるか調べる
    Lib.getElementById("contest-title").innerText = res.title;
    Lib.getElementById("registration").addEventListener("click", async () => {
      try {
        const tasks = await api.get("/contests/" + res.id + "/tasks", token);
        console.log(tasks);
        document.location.href = "tasks.html?id=" + res.id;
      } catch (e) {
        alert("サーバーとの接続に失敗しました");
        return;
      }
    });
  } catch (e) {
    alert("サーバーとの接続に失敗しました");
    return;
  }
};
