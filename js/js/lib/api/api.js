"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
class API {
    async post(url, data, token) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: API.lib("application/json", token),
                body: JSON.stringify(data)
            });
            return res.body;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async get(url, token) {
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: API.lib("application/json", token)
            });
            return res.body;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async put(url, body, token) {
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: API.lib("application/json", token),
                body: JSON.stringify(body)
            });
            return res.body;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    static lib(type, token) {
        if (!token) {
            return {
                "Content-Type": type
            };
        }
        return {
            "authorization": token,
            "Content-Type": type
        };
    }
}
exports.API = API;
