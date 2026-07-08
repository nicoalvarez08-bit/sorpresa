/* =====================================================
                NOVAOS FINAL - SCRIPT.JS
===================================================== */

const screens = {
    logo: document.getElementById("logo-screen"),
    boot: document.getElementById("boot-screen"),
    login: document.getElementById("login-screen"),
    terminal: document.getElementById("terminal-screen"),
    glitch: document.getElementById("glitch-screen"),
    bsod: document.getElementById("bsod-screen"),
    restart: document.getElementById("restart-screen"),
    message: document.getElementById("message-screen"),
    birthday: document.getElementById("birthday-screen")
};

const progressBar = document.getElementById("progress-bar");
const bootPercent = document.getElementById("boot-percent");
const bootText = document.getElementById("boot-text");

const clock = document.getElementById("clock");
const date = document.getElementById("date");

const username = document.getElementById("username");
const loginButton = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");
const macBox = document.getElementById("mac-box");
const toggleEye = document.getElementById("toggle-eye");

const terminalOutput = document.getElementById("terminal-output");
const matrixBox = document.getElementById("matrix-box");
const tableDumpBody = document.getElementById("table-dump-body");
const alertBanner = document.getElementById("alert-banner");
const glitchText = document.getElementById("glitch-text");
const bsodProgress = document.getElementById("bsod-progress");

const messageText = document.getElementById("message-text");
const actionTrigger = document.getElementById("action-trigger");

/* =====================================================
                CONFIGURACIÓN
===================================================== */
const USER_NAME = "Salomé";

/* =====================================================
                UTILIDADES
===================================================== */
function hideAllScreens(){
    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
    });
}

function showScreen(screen){
    hideAllScreens();
    screen.classList.add("active");
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* =====================================================
            RELOJ E INTERACTIVIDAD PASSWORD EYE
===================================================== */
function updateClock(){
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    date.innerHTML = now.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
setInterval(updateClock, 1000);
updateClock();

toggleEye.addEventListener("click", () => {
    if (username.type === "password") {
        username.type = "text";
        toggleEye.innerHTML = "🙈";
    } else {
        username.type = "password";
        toggleEye.innerHTML = "👁️";
    }
});

/* =====================================================
                    LOGO & BOOT
===================================================== */
async function startLogo(){
    showScreen(screens.logo);
    await wait(2500);
    startBoot();
}

async function startBoot(){
    showScreen(screens.boot);
    progressBar.style.width = "0%";
    let progress = 0;

    while(progress <= 100){
        progressBar.style.width = progress + "%";
        bootPercent.innerHTML = progress + "%";

        if(progress === 20) bootText.innerHTML = "Verificando hardware...";
        if(progress === 45) bootText.innerHTML = "Inicializando Kernel...";
        if(progress === 70) bootText.innerHTML = "Cargando módulos...";
        if(progress === 90) bootText.innerHTML = "Preparando usuario...";

        progress++;
        await wait(35); 
    }
    await wait(600);
    showScreen(screens.login);
}

/* =====================================================
                    LOGIN (SACUDIDA MAC)
===================================================== */
loginButton.addEventListener("click", checkLogin);
username.addEventListener("keypress", (e) => { if(e.key === "Enter") checkLogin(); });

function checkLogin(){
    const value = username.value.trim().toLowerCase();
    if(value === USER_NAME.toLowerCase()){
        loginMessage.style.color = "#a5b4fc";
        loginMessage.innerHTML = "Cargando componentes de sesión...";
        setTimeout(() => { startTerminal(); }, 1200);
    } else {
        loginMessage.style.color = "#ff6b6b";
        loginMessage.innerHTML = "Contraseña incorrecta.";
        
        macBox.classList.add("shake-error");
        setTimeout(() => { macBox.classList.remove("shake-error"); }, 400);
    }
}

/* =====================================================
            CINEMATIC CYBER DASHBOARD LOGIC
===================================================== */
const terminalLines = [
    ">> boot_sequence_init ... OK",
    ">> establishing tunneling sockets to central_hub...",
    ">> connection locked on 192.168.88.254:8080",
    ">> launching payload bypass_v3.sh...",
    ">> extraction protocols: ENGAGED.",
    ">> dumping directory files..."
];

async function typeLine(text){
    for(let i = 0; i < text.length; i++){
        terminalOutput.innerHTML += text[i];
        await wait(15);
    }
    terminalOutput.innerHTML += "<br>";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function updateMatrixPanel() {
    let text = "";
    for(let i=0; i<6; i++) {
        text += Math.random().toString(16).substring(2, 14).toUpperCase() + " " + Math.random().toString(2).substring(2, 8) + "\n";
    }
    matrixBox.innerHTML = text;
}

function addTableLine() {
    const sectors = ["SYS_KERNEL", "USER_DATA", "CACHE_MEM", "NET_BUFFER"];
    const status = ["ENCRYPTED", "EXTRACTING...", "COMPROMISED", "OVERFLOW"];
    
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    const randomHex = "0x" + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    const randomBps = Math.floor(Math.random() * 900 + 100) + " MB/s";

    const row = `<tr><td>${randomSector}</td><td>${randomHex}</td><td style="color:${randomStatus==='OVERFLOW'?'#ef4444':'#39ff14'}">${randomStatus}</td><td>${randomBps}</td></tr>`;
    tableDumpBody.innerHTML += row;
    
    if(tableDumpBody.rows.length > 6) {
        tableDumpBody.deleteRow(0);
    }
}

function spawnPopUp(index) {
    const titles = ["CRITICAL_WARNING", "ALERTA_DE_FUGA", "SECURITY_BREACH", "OVERFLOW_DETECTED"];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    const popup = document.createElement("div");
    popup.className = "crypto-popup";
    
    const top = Math.floor(Math.random() * 55) + 15;
    const left = Math.floor(Math.random() * 60) + 10;
    popup.style.top = `${top}%`;
    popup.style.left = `${left}%`;
    
    popup.innerHTML = `
        <div class="popup-hdr">⚠️ ${randomTitle} #${index}</div>
        <div class="popup-body">
            <div class="popup-txt">CORRUPTING_SECTOR_${index * 4}...</div>
            <div class="popup-bar-container"><div class="popup-bar"></div></div>
        </div>
    `;
    screens.terminal.appendChild(popup);
}

async function startTerminal(){
    showScreen(screens.terminal);
    terminalOutput.innerHTML = "";
    tableDumpBody.innerHTML = "";
    
    const matrixInterval = setInterval(updateMatrixPanel, 150);
    const tableInterval = setInterval(() => addTableLine(), 250);

    for(let i = 0; i < terminalLines.length; i++){
        await typeLine(terminalLines[i]);
        await wait(250);
    }
    
    await wait(400);
    alertBanner.classList.add("active");
    await typeLine(">> ERROR EN EL FLUJO: MEMORY STACK DEVASTATED.");

    for(let i = 1; i <= 15; i++) {
        spawnPopUp(i);
        await typeLine(`>> THREAD_OVERLOAD: Daño de bloque de memoria #${i*12}`);
        await wait(180);
    }
    
    await wait(1200);
    
    clearInterval(matrixInterval);
    clearInterval(tableInterval);
    document.querySelectorAll(".crypto-popup").forEach(el => el.remove());
    alertBanner.classList.remove("active");

    startGlitch();
}

/* =====================================================
                    GLITCH & BSOD
===================================================== */
async function startGlitch(){
    showScreen(screens.glitch);
    const messages = [
        "FATAL ERROR: Memory corruption...",
        "Kernel Panic: Dump Failed...",
        "HARDWARE ERROR: 0x00014B",
        "SYSTEM CRITICAL INSTABILITY...",
        "Forcing system safety shutdown..."
    ];

    for(let i = 0; i < messages.length; i++){
        glitchText.innerHTML = messages[i];
        document.body.style.filter = "brightness(1) invert(0)";
        await wait(120);
        document.body.style.filter = "brightness(0.2) invert(0.1)";
        await wait(700);
    }
    document.body.style.filter = "none";
    startBSOD();
}

async function startBSOD(){
    showScreen(screens.bsod);
    let value = 0;
    
    while(value < 100){
        value += Math.floor(Math.random() * 4) + 1;
        if (value > 100) value = 100;
        bsodProgress.innerHTML = value + "% completado";
        await wait(120);
    }
    
    await wait(2000); 
    startRestart();
}

/* =====================================================
            REINICIO Y PANTALLA INTERACTIVA
===================================================== */
async function startRestart(){
    showScreen(screens.restart);
    await wait(4000);
    startMessage();
}

async function startMessage(){
    showScreen(screens.message);
    messageText.innerHTML = "";
    actionTrigger.classList.remove("reveal");
    
    actionTrigger.innerHTML = "VER MI SORPRESA REAL 🎁";
    await wait(800); 
    
    const finalMessage = "¡Sistemas restaurados con éxito! ... ¿o no? 😂\n\n¡Mentira, era una broma de cumpleaños! 🎂\n\nTu computadora está perfectamente bien. Presiona el botón de abajo para desplegar tu verdadera sorpresa.";
    
    for(let i = 0; i < finalMessage.length; i++){
        if(finalMessage[i] === "\n") {
            messageText.innerHTML += "<br>";
        } else {
            messageText.innerHTML += finalMessage[i];
        }
        await wait(30);
    }

    await wait(500);
    actionTrigger.classList.add("reveal");
}

actionTrigger.addEventListener("click", async () => {
    actionTrigger.innerHTML = "DESPLEGANDO...";
    actionTrigger.style.background = "#0d9488"; /* Azul esmeralda sutil para la carga */
    await wait(1500);
    startBirthday();
});

/* =====================================================
                    PANTALLA FINAL
==================================================== */
async function startBirthday(){
    showScreen(screens.birthday);
}

window.addEventListener("load", () => {
    startLogo();
});
