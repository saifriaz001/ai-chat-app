# Responsive AI Chat Application

A responsive multi-session AI chat app built with **React**, **Redux Toolkit**, **Tailwind + shadcn/ui**, and **Google Gemini (gemini-2.5-flash)**.

## Features

- Multiple chat sessions (New Chat 1, New Chat 2, ...)
- Sidebar with:
  - List of all chats
  - Create new chat
  - Rename chat (inline, like Notion)
  - Delete chat
  - Export chat as JSON (session + messages + timestamps)
- Chat window:
  - User & AI messages with different styling
  - Markdown rendering for AI responses (lists, code blocks, etc.)
  - Timestamps for messages
  - Typing indicator while AI responds
- Input:
  - **Enter** → send message
  - **Shift + Enter** → new line

## Persistence

- All chat sessions + messages stored in `localStorage`
- Active chat session is remembered
- On reload, the app restores previous state

## Tech Stack

- React + Vite
- Redux Toolkit for state management
- Tailwind CSS + shadcn/ui for UI components
- Google Gemini API (`gemini-2.5-flash` model)
- react-markdown + remark-gfm for Markdown support

## Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:saifriaz001/ai-chat-app.git
cd ai-chat-app/AI-Powered-Chat-Assistant-main
```
### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

- Create a .env file in the project root:

```bash
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
### 4. Run the app

```bash
npm run dev
```
- Then open: http://localhost:5173/


---

## Design Decisions & Assumptions

- Used Redux Toolkit instead of Context API for better scalability.
- Used localStorage for persistence since assignment scope is client-only.
- Chat sessions are sorted by updatedAt (most recent at top).
- AI messages support Markdown for better readability (lists, code, etc.).

## Screenshots

### Home 
![Home Page](./AI-Powered-Chat-Assistant-main/assets/screenshots/Chat-Assistant-Home.png)


### Home for Medium Screen
![Home Page](./AI-Powered-Chat-Assistant-main/assets/screenshots/Chat-Assistant-Home-md.png)

### Home & SideBar for mobile Screen
![Home Page](./AI-Powered-Chat-Assistant-main/assets/screenshots/Chat-Assistant-mobile-sidebar.png)
![Side Page](./AI-Powered-Chat-Assistant-main/assets/screenshots/Chat-Assistant-mobile.png)



---

