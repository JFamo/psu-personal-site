// Skills definiton
var skills={
    'HTML': {
        'src': 'img/skills/html.png',
        'scale': '1',
        'desc': 'Highly proficient with a vast array of web application development and freelance web design projects'
    },
    'C':{
        'src': 'img/skills/c.png',
        'scale': '0.25',
        'desc': 'Have completed a variety of C projects through Penn State including file system and OS design'
    },
    'CSS':{
        'src': 'img/skills/css.png',
        'scale': '0.5',
        'desc': 'Very experienced with responsive CSS techniques and UX design'
    },
    'JavaScript':{
        'src': 'img/skills/js.png',
        'scale': '0.75',
        'desc': 'JavaScript is one of my languages of choice for flexible full-stack solutions'
    },
    'Docker':{
        'src': 'img/skills/docker.png',
        'scale': '0.25',
        'desc': 'Limited experience using automatic dockerization and setting up local dev environments'
    },
    'Express':{
        'src': 'img/skills/express.png',
        'scale': '0.50',
        'desc': 'Express is my go-to option for quickly exposing a microservice API'
    },
    'Helm':{
        'src': 'img/skills/helm.png',
        'scale': '0.25',
        'desc': 'Limited experience configuring Helm charts including building a Helm-Gitlab bridge'
    },
    'Java':{
        'src': 'img/skills/java.png',
        'scale': '0.50',
        'desc': 'Java is my first language and my most proficient for extensive object-oriented services'
    },
    'Kubernetes':{
        'src': 'img/skills/kubernetes.png',
        'scale': '0.25',
        'desc': "I've used kubernetes for microservice deployments on a variety of platforms"
    },
    'MySQL':{
        'src': 'img/skills/mysql.png',
        'scale': '0.50',
        'desc': 'MySQL is my go-to for database solutions in which I am highly proficient'
    },
    'Node':{
        'src': 'img/skills/node.png',
        'scale': '0.75',
        'desc': 'Most of my projects are built on a MEAN stack involving node and npm to provide server-side processing'
    },
    'PgAdmin':{
        'src': 'img/skills/pgadmin.png',
        'scale': '0.25',
        'desc': 'Limited experience using PgAdmin4 for database configuration and administration'
    },
    'Socket.IO':{
        'src': 'img/skills/socketio.png',
        'scale': '0.25',
        'desc': 'Used socket.io to implement websockets for real-time whiteboarding solutions and interactive browser-based games'
    },
    'VSCode':{
        'src': 'img/skills/vscode.png',
        'scale': '0.50',
        'desc': "A go-to IDE whose plugins and interface I'm very comfortable using for efficient development"
    }
}

let baseScale = 100;
let textSkill = '';

// Load canvas
var c = document.getElementById("skillsCanvas");
if(c.getContext){
    var ctx = c.getContext("2d");
}

// Reload and scale canvas
function reloadCanvas(){
    c.style.width='100%';
    c.style.height='800px';
    c.width  = c.offsetWidth;
    c.height = c.offsetHeight;
}

// Load images initially
function loadImages(){

    // Instantiate HTML images
    for(let [skillName, skill] of Object.entries(skills)){
        skill['img'] = new Image();
    }

    // Instantiate skill positions
    let wvar = 1300;
    let hvar = 600;
    for(let [skillName, skill] of Object.entries(skills)){
        skill['x'] = Math.random() * wvar;
        skill['y'] = Math.random() * hvar;
        skill['deg'] = Math.random() * 360;
        skill['speed'] = (Math.random() - 0.5) * 1.5;
        skill['rad'] = Math.random() * 100;
    }
    
    // Create listeners
    for(let [skillName, skill] of Object.entries(skills)){
        skill['img'].addEventListener('load', function() {
            ctx.drawImage(skill['img'],skill['x'],skill['y'], skill['scale'] * baseScale, skill['scale'] * baseScale);
          }, false);
    }
    
    // Register sources
    for(let [skillName, skill] of Object.entries(skills)){
        skill['img'].src = skill['src'];
    }
}

function drawImages(){
    for(let [skillName, skill] of Object.entries(skills)){
        skill['deg'] = skill['deg'] + skill['speed'];
        let thisScale = baseScale;
        if(textSkill == skillName){
            thisScale += 25;
        }
        ctx.drawImage(
            skill['img'],
            calculateImageX(skill),
            calculateImageY(skill),
            skill['scale'] * thisScale, 
            skill['scale'] * thisScale
        );
    }
}

function drawConnections(){
    for(let [n1, s1] of Object.entries(skills)){
        let s2 = getClosestSkill(getRealImagePosition(s1))['skill'];
        ctx.moveTo(calculateImageCenter(s1)[0], calculateImageCenter(s1)[1]);
        ctx.lineTo(calculateImageCenter(s2)[0], calculateImageCenter(s2)[1]);
    }
}

function renderText(){
    ctx.font = "24px Open Sans";
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.fillText(textSkill, c.width/2, 20);
    ctx.fillText(skills[textSkill]['desc'], c.width/2, 40);
}

function calculateImageCenter(skill){
    return [calculateImageX(skill) + (skill['scale'] * baseScale / 2), calculateImageY(skill) + (skill['scale'] * baseScale / 2)];
}

function calculateImageX(skill){
    return skill['x'] + skill['rad']*Math.cos(skill['deg'] * Math.PI / 180);
}

function calculateImageY(skill){
    return skill['y'] + skill['rad']*Math.cos(skill['deg'] * Math.PI / 180);
}

function getMousePos(evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * c.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * c.height
    };
}

function getDistance(x1, y1, x2, y2){
    return Math.sqrt((((x1 - x2)^2) + ((y1 - y2)^2)))
}

function getClosestSkill(pos){
    closeDist = 99999;
    closeName = "";
    closeSkill = {};
    for(let [name, skill] of Object.entries(skills)){
        let targetPos = getRealImagePosition(skill);
        let dist = getDistance(pos.x,pos.y,targetPos.x,targetPos.y)
        if(dist < closeDist){
            closeDist = dist;
            closeName = name;
            closeSkill = skill;
        }
    }
    return {'name':closeName, 'skill':closeSkill};
}

function getRealImagePosition(skill){
    let cent = calculateImageCenter(skill);
    return {'x': cent[0], 'y': cent[1]};
}

/**function drawBorder(){
    ctx.moveTo(0, 0);
    ctx.lineTo(c.width, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    ctx.lineTo(0, 0);
}**/

function lifecycle(){
    ctx.beginPath();
    ctx.clearRect(0, 0, c.width, c.height);
    drawConnections();
    var gradient = ctx.createLinearGradient(0,0,c.width,c.height);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.2", "green");
    gradient.addColorStop("0.4", "blue");
    gradient.addColorStop("0.6", "red");
    gradient.addColorStop("0.8", "green");
    gradient.addColorStop("1", "blue");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    
    drawImages();
    renderText();
}

loadImages();

c.onmousemove = function (e) {
    textSkill = getClosestSkill(getMousePos(e))['name'];
}

window.setInterval(lifecycle, 100);
