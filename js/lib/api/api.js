export class API {
    constructor() {
        this.APIAddr = "https://kojs.laminne33569.net:3080";
    }
    async post(url, data, token) {
        try {
            const res = await fetch(this.APIAddr + url, {
                method: "POST",
                headers: API.lib("application/json", token),
                body: JSON.stringify(data),
            });
            return res.json();
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    // url: APIのURLは定義済み
    async get(url, token) {
        let res;
        try {
            res = await fetch(this.APIAddr + url, {
                method: "GET",
                headers: API.lib("application/json", token),
            });
            if (res.status === 400) {
                throw new ContestNotStartedError();
            }
            return res.json();
        }
        catch (e) {
            if (!res) {
                throw e;
            }
            throw e;
        }
    }
    async put(url, body, token) {
        try {
            const res = await fetch(this.APIAddr + url, {
                method: "PUT",
                headers: API.lib("application/json", token),
                body: JSON.stringify(body),
            });
            return res.json();
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    static lib(type, token) {
        if (!token) {
            return {
                "Content-Type": type,
            };
        }
        return {
            authorization: "Bearer " + token,
            "Content-Type": type,
        };
    }
}
export class ContestNotStartedError extends Error {
}
