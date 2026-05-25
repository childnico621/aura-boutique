(function() {
  // 1. Determinar el origen del backend de forma totalmente robusta (Forzado a producción de Inventa)
  let backendOrigin = 'https://inventa-ai.westus2.cloudapp.azure.com';

  // Intentamos detectar el tenantId basándonos en la etiqueta script
  let tenantId = '00000000-0000-0000-0000-000000000001';

  if (document.currentScript) {
    tenantId = document.currentScript.getAttribute('data-tenant') || tenantId;
  } else {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const t = scripts[i].getAttribute('data-tenant');
      if (t) {
        tenantId = t;
      }
    }
  }

  const TENANT_ID = tenantId;
  let conversationId = null;

  // Injection of UI
  const container = document.createElement('div');
  container.id = 'inventa-widget-container';
  container.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 999999;
    font-family: system-ui, -apple-system, sans-serif;
  `;

  // Botón flotante
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = `
    <div style="background: linear-gradient(135deg, #6366f1, #0ea5e9); color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; border: none; box-shadow: 0 10px 25px rgba(99,102,241,0.4); transition: transform 0.2s;">
      ✨
    </div>
  `;
  toggleBtn.style.cssText = 'background: none; border: none; padding: 0; outline: none; margin-left: auto; display: block;';
  
  // Ventana de chat
  const chatWindow = document.createElement('div');
  chatWindow.style.cssText = `
    display: none; width: 350px; height: 500px; max-height: 80vh; background: #ffffff;
    border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.15); border: 1px solid #e5e7eb;
    margin-bottom: 20px; flex-direction: column; overflow: hidden; transform-origin: bottom right;
    transition: all 0.3s ease; opacity: 0; transform: scale(0.95);
  `;
  
  chatWindow.innerHTML = `
    <div style="background: linear-gradient(135deg, #6366f1, #0ea5e9); padding: 20px; color: white; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <h3 style="margin: 0; font-size: 16px; font-weight: 600;">InventaAI Demo</h3>
        <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Respondemos al instante ⚡</p>
      </div>
      <button id="inventa-close" style="background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; opacity: 0.8; hover: opacity: 1;">&times;</button>
    </div>
    <div id="inventa-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: #f9fafb; display: flex; flex-direction: column; gap: 12px;">
      <div style="background: #e0e7ff; color: #3730a3; padding: 12px 16px; border-radius: 16px 16px 16px 0; align-self: flex-start; max-width: 85%; font-size: 14px; line-height: 1.4;">
        ¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?
      </div>
    </div>
    <div style="padding: 15px; background: white; border-top: 1px solid #e5e7eb; display: flex; align-items: flex-end; gap: 8px;">
      <textarea id="inventa-input" placeholder="Escribe un mensaje..." rows="1" style="flex: 1; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 18px; outline: none; font-size: 14px; color: #1f2937; background: #ffffff; transition: border-color 0.2s; resize: none; max-height: 120px; overflow-y: auto; line-height: 1.4;"></textarea>
      <button id="inventa-send" style="background: #6366f1; color: white; border: none; border-radius: 50%; width: 42px; height: 42px; min-width: 42px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; margin-bottom: 2px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  `;

  container.appendChild(chatWindow);
  container.appendChild(toggleBtn);
  document.body.appendChild(container);

  // Lógica de interacción
  let isOpen = false;
  
  const toggleChat = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.style.display = 'flex';
      setTimeout(() => {
        chatWindow.style.opacity = '1';
        chatWindow.style.transform = 'scale(1)';
      }, 10);
      toggleBtn.querySelector('div').innerHTML = '×';
      toggleBtn.querySelector('div').style.fontSize = '40px';
    } else {
      chatWindow.style.opacity = '0';
      chatWindow.style.transform = 'scale(0.95)';
      toggleBtn.querySelector('div').innerHTML = '✨';
      toggleBtn.querySelector('div').style.fontSize = '28px';
      setTimeout(() => chatWindow.style.display = 'none', 300);
    }
  };

  toggleBtn.onclick = toggleChat;
  document.getElementById('inventa-close').onclick = toggleChat;

  const messagesDiv = document.getElementById('inventa-messages');
  const inputEl = document.getElementById('inventa-input');
  const sendBtn = document.getElementById('inventa-send');

  const addMessage = (text, isUser) => {
    const msg = document.createElement('div');
    msg.style.cssText = isUser 
      ? 'background: #6366f1; color: white; padding: 12px 16px; border-radius: 16px 16px 0 16px; align-self: flex-end; max-width: 85%; font-size: 14px; line-height: 1.4; box-shadow: 0 4px 10px rgba(99,102,241,0.2);'
      : 'background: #e0e7ff; color: #3730a3; padding: 12px 16px; border-radius: 16px 16px 16px 0; align-self: flex-start; max-width: 85%; font-size: 14px; line-height: 1.4;';
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  const addTyping = () => {
    const msg = document.createElement('div');
    msg.id = 'inventa-typing';
    msg.style.cssText = 'background: #f3f4f6; color: #6b7280; padding: 8px 16px; border-radius: 16px 16px 16px 0; align-self: flex-start; font-size: 14px; animation: pulse 1.5s infinite;';
    msg.textContent = 'Escribiendo...';
    
    if(!document.getElementById('pulse-style')) {
      const style = document.createElement('style');
      style.id = 'pulse-style';
      style.innerHTML = '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }';
      document.head.appendChild(style);
    }

    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  const removeTyping = () => {
    const el = document.getElementById('inventa-typing');
    if (el) el.remove();
  };

  const sendMessage = async () => {
    const text = inputEl.value.trim();
    if (!text) return;
    
    inputEl.value = '';
    inputEl.style.height = 'auto'; // Reset height
    addMessage(text, true);
    addTyping();

    try {
      const res = await fetch(`${backendOrigin}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: TENANT_ID,
          conversationId: conversationId,
          message: text
        })
      });
      
      const data = await res.json();
      removeTyping();
      
      if (data.ConversationId || data.conversationId) {
        conversationId = data.ConversationId || data.conversationId;
      }
      
      addMessage(data.Message || data.message || "Lo siento, hubo un error procesando tu solicitud.", false);
    } catch (err) {
      removeTyping();
      addMessage("Error de conexión. Intenta nuevamente.", false);
      console.error("Widget Error:", err);
    }
  };

  inputEl.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  sendBtn.onclick = sendMessage;
  inputEl.onkeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
})();
