from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class Chat(BaseModel):
    content:str

chat = []
@app.post("/chat")
def create_chat(new_chat:Chat):
    chat.append(new_chat)
    return "채팅 성공"

@app.get("/chat")
def read_chat():
    return chat
    

app.mount("/", StaticFiles(directory="static", html=True), name="static")