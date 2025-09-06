import { apiFetch } from "../helper/api";

export const getChatData = async (id) => {
    const resp = await apiFetch(`/api/chats/${id}`)
      const data = await resp.json();
      const paired = [];
      for (let i = 0; i < data.history.length; i += 2) {
        paired.push({
          prompt: data.history[i]?.parts[0]?.text || "",
          content: data.history[i+1]?.parts[0]?.text || ""
        });
      }
      return paired;
}

export const newChat = async (prompt, response) => {
    const response1 = await fetch("/api/chats/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, response}),
      });
      const data = await response1.json();
      const reply = data.result;
      return reply;

}

export const updateChat = async (url, prompt, response) => {
    const response2 = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify({ prompt, response }),
    })
      const data = await response2.json(); 
      return data;
}