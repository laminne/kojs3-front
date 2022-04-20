import * as Lib from "../lib/main.js";
window.onload = async () => {
    const api = new Lib.API();
    // contest一覧を取得
    const token = localStorage.getItem("token");
    if (!token) {
        // ログインしていないのならloginに飛ばす
        document.location.href = "/login.html";
        return;
    }
    const res = await api.get("/contests/", token);
    // 情報をパースして表示
    // ToDo: 鯖から帰ってくるjsonと型を合わせる
    console.log(res);
    const contests = Lib.getElementById("contests");
    for (let i = 0; i < res.length; i++) {
        contests.innerHTML += `
       <tr>
        <td class="border px-4 py-2">${new Date(res[i].starting_time).toLocaleString("ja-JP")}</td>
        <td class="border px-4 py-2"><a href="show.html?id=${res[i].id}">${res[i].title}</a></td>
        <td class="border px-4 py-2">${new Date(res[i].end_time).toLocaleString("ja-JP")}</td>
        <td class="border px-4 py-2"></td>
      </tr>
    `;
    }
};
