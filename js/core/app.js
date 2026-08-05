/* ==========================================================
   INVITATION ENGINE V2
   FILE        : app.js
   VERSION     : 2.0.2
   MODULE      : CORE
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION
========================================================== */

const InvitationApp = {

    version: AppConfig.version,

    initialized:false,

    components:{},

    state:{},

    dom:{}

};


/* ==========================================================
   INITIAL STATE
========================================================== */

InvitationApp.state={

    loading:true,

    gateOpened:false,

    musicPlaying:false,

    modalOpened:false,

    theme:AppConfig.theme.name,

    language:AppConfig.language,

    initialized:false

};


/* ==========================================================
   DOM CACHE
========================================================== */

InvitationApp.dom={

    body:null,

    html:null,

    gate:null,

    hero:null,

    countdown:null,

    gallery:null,

    modal:null,

    music:null

};


/* ==========================================================
   INIT
========================================================== */

InvitationApp.init=function(){

    if(this.initialized){

        return;

    }

    this.cacheDOM();

    this.loadTheme();

    this.registerComponents();

    this.bindEvents();

    this.initializeComponents();

    this.finish();

};


/* ==========================================================
   CACHE DOM
========================================================== */

InvitationApp.cacheDOM=function(){

    this.dom.body=document.body;

    this.dom.html=document.documentElement;

    this.dom.gate=document.querySelector(".gate");

    this.dom.hero=document.querySelector(".hero");

    this.dom.countdown=document.querySelector(".countdown");

    this.dom.gallery=document.querySelector(".gallery");

    this.dom.modal=document.querySelector(".modal");

    this.dom.music=document.querySelector("audio");

};


/* ==========================================================
   LOAD THEME
========================================================== */

InvitationApp.loadTheme=function(){

    this.dom.body.classList.add(

        "theme-"+

        this.state.theme

    );

};

/* ==========================================================
   REGISTER COMPONENTS
========================================================== */

InvitationApp.registerComponents=function(){

    this.components={

        gate:

            window.Gate || null,

        hero:

            window.Hero || null,

        music:

            window.Music || null,

        countdown:

            window.Countdown || null,

        gallery:

            window.Gallery || null,

        timeline:

            window.Timeline || null,

        modal:

            window.Modal || null

    };

};


/* ==========================================================
   INITIALIZE COMPONENTS
========================================================== */

InvitationApp.initializeComponents=function(){

    Object.keys(this.components)

        .forEach(component=>{

            const instance=

                this.components[component];

            if(

                instance &&

                typeof instance.init==="function"

            ){

                instance.init();

            }

        });

};


/* ==========================================================
   EVENTS
========================================================== */

InvitationApp.bindEvents=function(){

    window.addEventListener(

        "resize",

        this.onResize.bind(this)

    );

    window.addEventListener(

        "scroll",

        this.onScroll.bind(this),

        {

            passive:true

        }

    );

    window.addEventListener(

        "load",

        this.onLoad.bind(this)

    );

    document.addEventListener(

        "visibilitychange",

        this.onVisibilityChange.bind(this)

    );

};


/* ==========================================================
   WINDOW LOAD
========================================================== */

InvitationApp.onLoad=function(){

    this.state.loading=false;

};


/* ==========================================================
   RESIZE
========================================================== */

InvitationApp.onResize=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.onResize==="function"

            ){

                component.onResize();

            }

        });

};


/* ==========================================================
   SCROLL
========================================================== */

InvitationApp.onScroll=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.onScroll==="function"

            ){

                component.onScroll();

            }

        });

};


/* ==========================================================
   VISIBILITY
========================================================== */

InvitationApp.onVisibilityChange=function(){

    if(document.hidden){

        this.pause();

    }else{

        this.resume();

    }

};

/* ==========================================================
   PAUSE
========================================================== */

InvitationApp.pause=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.pause==="function"

            ){

                component.pause();

            }

        });

};


/* ==========================================================
   RESUME
========================================================== */

InvitationApp.resume=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.resume==="function"

            ){

                component.resume();

            }

        });

};


/* ==========================================================
   OPEN GATE
========================================================== */

InvitationApp.openGate=function(){

    this.state.gateOpened=true;

};


/* ==========================================================
   PLAY MUSIC
========================================================== */

InvitationApp.playMusic=function(){

    this.state.musicPlaying=true;

};


/* ==========================================================
   STOP MUSIC
========================================================== */

InvitationApp.stopMusic=function(){

    this.state.musicPlaying=false;

};


/* ==========================================================
   OPEN MODAL
========================================================== */

InvitationApp.openModal=function(){

    this.state.modalOpened=true;

};


/* ==========================================================
   CLOSE MODAL
========================================================== */

InvitationApp.closeModal=function(){

    this.state.modalOpened=false;

};


/* ==========================================================
   CHANGE THEME
========================================================== */

InvitationApp.changeTheme=function(theme){

    this.dom.body.className=

        this.dom.body.className

        .replace(

            /theme-[^\s]+/g,

            ""

        );

    this.dom.body.classList.add(

        "theme-"+theme

    );

    this.state.theme=theme;

};


/* ==========================================================
   REFRESH
========================================================== */

InvitationApp.refresh=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.refresh==="function"

            ){

                component.refresh();

            }

        });

};


/* ==========================================================
   DESTROY
========================================================== */

InvitationApp.destroy=function(){

    Object.values(this.components)

        .forEach(component=>{

            if(

                component &&

                typeof component.destroy==="function"

            ){

                component.destroy();

            }

        });

};
/* ==========================================================
   LOG
========================================================== */

InvitationApp.log=function(){

    if(!AppConfig.debug){

        return;

    }

    console.log.apply(

        console,

        arguments

    );

};


/* ==========================================================
   ERROR
========================================================== */

InvitationApp.error=function(){

    console.error.apply(

        console,

        arguments

    );

};


/* ==========================================================
   WARNING
========================================================== */

InvitationApp.warn=function(){

    console.warn.apply(

        console,

        arguments

    );

};


/* ==========================================================
   SET STATE
========================================================== */

InvitationApp.setState=function(key,value){

    this.state[key]=value;

};


/* ==========================================================
   GET STATE
========================================================== */

InvitationApp.getState=function(key){

    return this.state[key];

};


/* ==========================================================
   GET COMPONENT
========================================================== */

InvitationApp.getComponent=function(name){

    return this.components[name] || null;

};


/* ==========================================================
   REGISTER COMPONENT
========================================================== */

InvitationApp.register=function(name,instance){

    this.components[name]=instance;

};


/* ==========================================================
   FINISH INIT
========================================================== */

InvitationApp.finish=function(){

    this.initialized=true;

    this.state.initialized=true;

    this.log(

        "Invitation Engine",

        this.version,

        "initialized."

    );

};


/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        InvitationApp.init();

    }

);


/* ==========================================================
   GLOBAL EXPORT
========================================================== */

window.InvitationApp=InvitationApp;


/* ==========================================================
   END OF FILE
========================================================== */