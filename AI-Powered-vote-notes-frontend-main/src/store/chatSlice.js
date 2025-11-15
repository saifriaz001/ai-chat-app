import { createSlice, nanoid } from "@reduxjs/toolkit";

const SESSIONS_KEY = "chat_sessions";
const ACTIVE_KEY = "active_chat_id";


const loadSessions = () => JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
const loadActiveId = () => localStorage.getItem(ACTIVE_KEY);


const initialState = {
  sessions: loadSessions(),
  activeSessionId: loadActiveId(),
  isTyping: false,
};


if (initialState.sessions.length === 0) {
  const id = nanoid();
  const now = new Date().toISOString();
  initialState.sessions = [{ id, title: "New Chat", messages: [], updatedAt: now }];
  initialState.activeSessionId = id;
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
  createNewChat: (state) => {
  const id = nanoid();
  const now = new Date()
  const nowISO = now.toISOString();


  const dateString = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const title = `Chat—${dateString},${timeString}`;

  const newChat = {
    id,
    title,
    messages: [],
    updatedAt: nowISO,
  };


  state.sessions = [newChat, ...state.sessions];


  state.activeSessionId = id;


  localStorage.setItem(SESSIONS_KEY, JSON.stringify(state.sessions));
  localStorage.setItem(ACTIVE_KEY, state.activeSessionId);
},

    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload;
      localStorage.setItem(ACTIVE_KEY, state.activeSessionId);
    },

    renameSession: (state, action) => {
      const { id, newTitle } = action.payload;
      const chat = state.sessions.find((c) => c.id === id);
      if (chat) chat.title = newTitle;
      save(state);
    },

    deleteSession: (state, action) => {
      const id = action.payload;
      state.sessions = state.sessions.filter((c) => c.id !== id);

      if (state.activeSessionId === id) {
        state.activeSessionId = state.sessions[0]?.id || null;
      }
      save(state);
    },

    sendMessage: (state, action) => {
      const text = action.payload;
      const now = new Date().toISOString();

      const chat = state.sessions.find((c) => c.id === state.activeSessionId);
      if (!chat) return;

      chat.messages.push({
        role: "user",
        content: text,
        timestamp: now,
      });

      chat.updatedAt = now;
      state.isTyping = true;

      save(state);
    },

    sendAIMessage: (state, action) => {
      const text = action.payload;
      const now = new Date().toISOString();

      const chat = state.sessions.find((c) => c.id === state.activeSessionId);
      if (!chat) return;

      chat.messages.push({
        role: "assistant",
        content: text,
        timestamp: now,
      });

      chat.updatedAt = now;
      state.isTyping = false;

      save(state);
    },
  },
});

function save(state) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(state.sessions));
  localStorage.setItem(ACTIVE_KEY, state.activeSessionId);
}

export const {
  createNewChat,
  renameSession,
  deleteSession,
  setActiveSession,
  sendMessage,
  sendAIMessage,

} = chatSlice.actions;

export default chatSlice.reducer;



export const exportSession = (id) => (dispatch, getState) => {
  const { sessions } = getState().chat;

  const session = sessions.find((s) => s.id === id);
  if (!session) return;

  const exportData = {
    sessionId: session.id,
    title: session.title,
    createdAt: session.messages?.[0]?.timestamp || null,
    updatedAt: session.messages?.at(-1)?.timestamp || null,
    messages: session.messages.map((m) => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    })),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${session.title || "chat"}.json`;
  link.click();

  URL.revokeObjectURL(url);
};


export const sendGeminiReply = (userText) => async (dispatch, getState) => {
  const state = getState().chat;
  const active = state.sessions.find(s => s.id === state.activeSessionId);

  if (!active) return;

  const { messages } = active;
  const { callGemini } = await import("@/lib/GeminiService");


  dispatch(sendMessage(userText));


  const aiReply = await callGemini(messages, userText);


  dispatch(sendAIMessage(aiReply));
};