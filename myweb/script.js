// 等待页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Swiper 轮播图
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 初始化粒子效果
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c757d"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.6,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c757d",
                "opacity": 0.5,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "bounce",
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                }
            }
        }
    });

    // AI对话框拖动功能
    const aiChat = document.getElementById('aiChat');
    const chatHeader = document.getElementById('chatHeader');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === chatHeader || e.target.closest('.chat-header')) {
            isDragging = true;
            aiChat.classList.add('dragging');
        }
    }

    function dragEnd() {
        isDragging = false;
        aiChat.classList.remove('dragging');
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            // 防止完全拖出视口
            const maxX = window.innerWidth - aiChat.offsetWidth;
            const maxY = window.innerHeight - aiChat.offsetHeight;
            
            xOffset = Math.min(Math.max(0, xOffset), maxX);
            yOffset = Math.min(Math.max(0, yOffset), maxY);

            setTranslate(xOffset, yOffset, aiChat);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // 添加拖动事件监听器
    chatHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    chatHeader.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    // AI聊天功能
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.querySelector('.send-btn');

    // 添加消息到聊天框
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 发送消息
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            // 这里可以添加与AI交互的逻辑
            setTimeout(() => {
                addMessage('这是AI的回复示例');
            }, 1000);
        }
    }

    // 事件监听
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 首次访问显示欢迎消息
    addMessage('欢迎来到我的个人网站！我是您的AI助手，有什么可以帮您的吗？');

    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    // 切换主题
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // 保存主题设置
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}); 