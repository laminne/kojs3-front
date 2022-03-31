import * as Lib from "../lib/main.js";

window.onload = async () => {
  const api = new Lib.API();
  const token = localStorage.getItem("token");
  if (!token) {
    // ログインしていないのならloginに飛ばす
    document.location.href = "/login.html";
    return;
  }
  const id = Lib.getParam("id");
  try {
    const res = await api.get("/contests/" + id + "/tasks", token);
    const contest = await api.get("/contests/" + id);
    // 情報をパースして表示
    // ToDo: 鯖から帰ってくるjsonと型を合わせる
    const contests = Lib.getElementById("task-list");
    contests.innerHTML = "";
    console.log(contest);
    Lib.getElementById(
      "contest-name"
    ).innerHTML = `<a href="show.html?id=${contest.id}">${contest.title}</a>`;
    for (let i = 0; i < res.length; i++) {
      contests.innerHTML += `
       <tr>
          <td class="border px-4 py-2">A</td>
          <td class="border px-4 py-2"><a href="task.html?id=${contest.id}&tid=${res[i].id}">${res[i].title}</a></td>
          <td class="border px-4 py-2">${res[i].time_limit}sec</td>
          <td class="border px-4 py-2">${res[i].memory_limit}</td>
          <td class="border px-4 py-2">提出</td>
      </tr>
    `;
    }
  } catch (e) {
    console.error(e);
    alert("サーバーとの通信に失敗しました");
  }
};
