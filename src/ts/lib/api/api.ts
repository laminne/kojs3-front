export class API {
  public APIAddr = "http://localhost:3080";
  async post(url: string, data: any, token?: string) {
    try {
      const res = await fetch(this.APIAddr + url, {
        method: "POST",
        headers: API.lib("application/json", token),
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  // url: APIのURLは定義済み
  async get(url: string, token?: string) {
    try {
      const res = await fetch(this.APIAddr + url, {
        method: "GET",
        headers: API.lib("application/json", token),
      });
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async put(url: string, body: string, token?: string) {
    try {
      const res = await fetch(this.APIAddr + url, {
        method: "PUT",
        headers: API.lib("application/json", token),
        body: JSON.stringify(body),
      });
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private static lib(type: string, token?: string): HeadersInit {
    if (!token) {
      return {
        "Content-Type": type,
      };
    }
    return {
      authorization: token,
      "Content-Type": type,
    };
  }
}
