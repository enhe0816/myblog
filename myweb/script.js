// 等待页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Swiper
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
    particlesJS('particles-js',
        {
            "particles": {
                "number": {
                    "value": 80,  // 稍微减少粒子数量以提高性能
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
                    "out_mode": "bounce",  // 改为 bounce 让粒子在边界反弹
                    "attract": {           // 添加吸引效果
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "window",  // 改为 window 以提高检测范围
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"  // 改为 repulse 使粒子远离鼠标
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 100,  // 排斥距离
                        "duration": 0.4   // 效果持续时间
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    }
                }
            },
            "retina_detect": true
        }
    );

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
    window.addEventListener('load', () => {
        addMessage('欢迎来到我的个人网站！我是您的AI助手，有什么可以帮您的吗？');
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

    // 获取轮播图区域的位置
    const heroSection = document.querySelector('.hero-section');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

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

            // 只保留视口边界限制
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

    // 添加事件监听器
    chatHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    chatHeader.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    // 窗口大小改变时重新计算限制
    window.addEventListener('resize', () => {
        const heroSection = document.querySelector('.hero-section');
        heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    });
}); 