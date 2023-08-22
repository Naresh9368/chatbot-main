var data= {
    chatinit:{
        title: ["Hello <span class='emoji'> &#128075;</span><br>Welcome to our college website, where learning meets limitless possibilities!<br><br>How can I help you?"],
        options: ["Admission","News","Examinations","Result"]
    },
    admission: {
        title:["Please select category"],
        options:['Btech','Mtech','Diploma','MBA'],
        url : {
            
        }
    },
    
    news: {
        title:["Today's Top 5 Headlines"],
        options:["The rare green comet will make its closest pass of Earth between February 1 and February 2, according to NASA.","The rare green comet will make its closest pass of Earth between February 1 and February 2, according to NASA.","The rare green comet will make its closest pass of Earth between February 1 and February 2, according to NASA."],
        url : {
            more:"#",
            link:["#","#","#","#"]
        }
    },
    examinations: {
        title:["Thanks for your response....","Please select one of the below options to proceed further"],
        options:['Branch Code','Schedule','Centre'],
        url : {
            
        }
    },
    branch: {
        title:["Thanks for your response.....<br>Here are exam schedule according to branch","Click on it to know more"],
        options:["Computer Science & Engineering","Mechanical Engineering","Electrical Engineering","Civil Engineering","Electronics Engineering"],
        url : {
            more:"#",
            link:["#","#","#","#","#"]
        }
    },
    schedule: {
        title:["Thanks for your response.....<br>Here are exam schedule according to course","Click on it to know more"],
        options:['B.Tech','M.Tech','Diploma','MBA'],
        url : {
            more:"#",
            link:["#","#","#","#"]
        }
    },
    centre: {
        title:["Thanks for your response","These are some results based on your input","Click on it to know more"],
        options:['B.Tech','M.Tech','Diploma','MBA'],
        url : {
            more:"#",
            link:["#","#","#","#"]
        }
    },
    result: {
        title:["Thanks for your response....<br><br>Please select one of the below options to proceed further"],
        options: ["One View","More Details"],
        url : {
            more:"#",
            link:["#","#"]
        }
    },
    btech: {
        title: ["Thanks for your response....<br>There branches are available at our college."],
        options: ["Computer Science & Engineering","Mechanical Engineering","Electrical Engineering","Civil Engineering","Electronics Engineering"],
        url: {
            more:"#",
            link:["#","#","#","#","#"]
        }
    },
    mtech: {
        title: ["Thanks for your response....<br>There branches are available at our college."],
        options: ["Computer Science & Engineering","Mechanical Engineering","Electrical Engineering","Civil Engineering","Electronics Engineering"],
        url: {
            more:"#",
            link:["#","#","#","#","#"]
        }
    },
    diploma: {
        title: ["Thanks for your response....<br>There branches are available at our college."],
        options: ["Computer Science & Engineering","Mechanical Engineering"],
        url: {
            more:"#",
            link:["#","#"]
        }
    },
    mba: {
        title: ["Here are some more options for you"],
        options: ["Digital Marketing","Businessman"],
        url: {
            more:"#",
            link:["#","#"]
        }
    }
}


document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;
console.log('lenght: ',data.chatinit.title.length)

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    console.log('cbot.innerHTML: ',cbot.innerHTML)
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    console.log('data.chatinit.title[j]: ',data.chatinit.title[j])
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}