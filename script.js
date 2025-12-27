// Elements
const helpBtn = document.getElementById('help-btn');
const chatbotPopup = document.getElementById('chatbot-popup');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 🔹 API key included (class testing use)
const API_KEY = "AIzaSyBhJWBuw69PD5I2Hs2wJ2xZjO1h-XdGp0A"; // তোমার API key

// Show/Hide chatbot
helpBtn.addEventListener('click', () => {
    chatbotPopup.style.display = chatbotPopup.style.display === 'flex' ? 'none' : 'flex';
});

// Chatbot functions
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });

function appendMessage(sender, text){
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;
    appendMessage('user', message);
    userInput.value = '';

    try{
        const res = await fetch('https://api.ai.google/v1/generateMessage', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: message,
                model: "gemini-2.5",
                max_output_tokens: 200
            })
        });
        const data = await res.json();
        appendMessage('bot', data?.output_text || "Sorry, I couldn't understand.");
    } catch(err){
        console.error(err);
        appendMessage('bot', "API Error!");
    }
}
