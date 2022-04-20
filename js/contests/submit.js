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
    // 問題一覧を取得
    const tasklist = await api.get("/contests/" + id + "/tasks", token);
    const contestData = await api.get("/contests/" + id, token);
    // コンテスト名を更新
    Lib.getElementById("contest-name").innerHTML = `<a href="show.html?id=${contestData.id}">${contestData.title}</a>`;
    // タスクIDをメニューに追加
    const tasks = Lib.getElementById("task-id");
    for (let i = 0; i < tasklist.length; i++) {
        tasks.innerHTML += `
      <option value="${i}">${tasklist[i].title}</option>
    `;
    }
    // 提出ボタンが押されたら提出 + WS Streamに接続
    Lib.getElementById("submit").addEventListener("click", async () => {
        const selectedTask = Lib.getElementById("task-id");
        const selectedLanguageType = Lib.getElementById("lang-type");
        const code = Lib.getElementById("code-area");
        const reqBody = {
            taskId: tasklist[selectedTask.selectedIndex].id,
            compiler_type: selectedLanguageType.value,
            code: btoa(unescape(encodeURIComponent(code.value))),
        };
        const r = await api.post(`/contests/${id}/submit`, reqBody, token);
        Lib.getElementById("submission-status").style.display = "block";
        updateJudgementState(r, tasklist);
        // WS Streamに接続
        const WSConnection = new WebSocket("ws://localhost:8080");
        WSConnection.onmessage = async (e) => {
            const message = JSON.parse(JSON.parse(e.data));
            if (message.type === "JudgementStateUpdated" &&
                message.uid === Lib.parseJWTToken(token)) {
                const judgement = await api.get(`/contests/${id}/submissions/${message.sid}`, token);
                updateJudgementState(judgement, tasklist);
            }
        };
    });
};
// d -> サーバーからのレスポンスres -> TaskList
function updateJudgementState(d, res) {
    const submissionsContainer = Lib.getElementById("submissions");
    const submitted_at = new Date(d.submited_at).toLocaleString("ja-JP");
    submissionsContainer.innerHTML = `
    <td class="border px-4 py-2">${submitted_at}</td>
    <td class="border px-4 py-2">${res[Lib.getElementById("task-id").value].title}</td>
    <td class="border px-4 py-2">${Lib.getElementById("lang-type").value}</td>
    <td class="border px-4 py-2"><span class="${applyStateColor(d.state)}  text-white rounded px-4 py-2">${d.state}</span></td>
    <td class="border px-4 py-2">終了</td>
    <td class="border px-4 py-2">終了</td>
  `;
}
function applyStateColor(state) {
    switch (state) {
        case "AC":
            return "bg-emerald-500";
        case "WJ":
            return "bg-gray-600";
        default:
            return "bg-amber-500";
    }
}
