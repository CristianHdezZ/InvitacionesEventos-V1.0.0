/* ==========================================================
   INVITATION ENGINE V2
   FILE        : gate.js
   VERSION     : 2.0.2
   MODULE      : GATE
========================================================== */

"use strict";

/* ==========================================================
   COMPONENT
========================================================== */

const Gate={

    initialized:false,

    opened:false,

    elements:{},

    config:AppConfig.gate

};


/* ==========================================================
   INIT
========================================================== */

Gate.init=function(){

    if(this.initialized){

        return;

    }

    if(!this.config.enabled){

        return;

    }

    this.cache();

    this.bindEvents();

    this.prepare();

    this.initialized=true;

};


/* ==========================================================
   CACHE
========================================================== */

Gate.cache=function(){

    this.elements.gate=

        document.querySelector(".gate");

    this.elements.button=

        document.querySelector("[data-open-gate]");

    this.elements.envelope=

        document.querySelector(".gate__envelope");

    this.elements.dress=

        document.querySelector(".gate__dress");

    this.elements.musicButton=

        document.querySelector("[data-music]");

};


/* ==========================================================
   PREPARE
========================================================== */

Gate.prepare=function(){

    document.body.classList.add(

        "gate-active"

    );

};


/* ==========================================================
   EVENTS
========================================================== */

Gate.bindEvents=function(){

    if(this.elements.button){

        this.elements.button

            .addEventListener(

                "click",

                ()=>{

                    this.open();

                }

            );

    }

    if(this.elements.envelope){

        this.elements.envelope

            .addEventListener(

                "click",

                ()=>{

                    this.open();

                }

            );

    }

};


/* ==========================================================
   OPEN
========================================================== */

Gate.open=function(){

    if(this.opened){

        return;

    }

    this.opened=true;

    this.animate();

};

/* ==========================================================
   ANIMATION
========================================================== */

Gate.animate=function(){

    if(!this.elements.gate){

        return;

    }

    this.elements.gate.classList.add(

        "is-opening"

    );

    setTimeout(

        ()=>{

            this.finish();

        },

        AppConfig.animation.duration

    );

};


/* ==========================================================
   FINISH
========================================================== */

Gate.finish=function(){

    if(this.elements.gate){

        this.elements.gate.classList.add(

            "is-closed"

        );

    }

    document.body.classList.remove(

        "gate-active"

    );

    InvitationApp.openGate();

    this.playMusic();

    this.scrollTop();

};


/* ==========================================================
   PLAY MUSIC
========================================================== */

Gate.playMusic=function(){

    const music=

        InvitationApp.getComponent(

            "music"

        );

    if(

        music &&

        typeof music.play==="function"

    ){

        music.play();

    }

};


/* ==========================================================
   SCROLL TOP
========================================================== */

Gate.scrollTop=function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/* ==========================================================
   CLOSE
========================================================== */

Gate.close=function(){

    if(

        this.elements.gate

    ){

        this.elements.gate.classList.add(

            "is-closed"

        );

    }

};


/* ==========================================================
   REOPEN
========================================================== */

Gate.reopen=function(){

    this.opened=false;

    if(

        this.elements.gate

    ){

        this.elements.gate.classList.remove(

            "is-closed",

            "is-opening"

        );

    }

    document.body.classList.add(

        "gate-active"

    );

};

/* ==========================================================
   PAUSE
========================================================== */

Gate.pause=function(){

    if(

        this.elements.envelope

    ){

        this.elements.envelope

            .classList.add(

                "is-paused"

            );

    }

};


/* ==========================================================
   RESUME
========================================================== */

Gate.resume=function(){

    if(

        this.elements.envelope

    ){

        this.elements.envelope

            .classList.remove(

                "is-paused"

            );

    }

};


/* ==========================================================
   REFRESH
========================================================== */

Gate.refresh=function(){

    this.cache();

};


/* ==========================================================
   RESIZE
========================================================== */

Gate.onResize=function(){

    if(

        !this.elements.gate

    ){

        return;

    }

};


/* ==========================================================
   SCROLL
========================================================== */

Gate.onScroll=function(){

    if(

        !this.opened

    ){

        return;

    }

};


/* ==========================================================
   DESTROY
========================================================== */

Gate.destroy=function(){

    this.initialized=false;

    this.opened=false;

    this.elements={};

};


/* ==========================================================
   GET STATE
========================================================== */

Gate.getState=function(){

    return{

        initialized:this.initialized,

        opened:this.opened

    };

};


/* ==========================================================
   SET STATE
========================================================== */

Gate.setState=function(state={}){

    Object.assign(

        this,

        state

    );

};


/* ==========================================================
   EXPORT
========================================================== */

window.Gate=Gate;


/* ==========================================================
   END OF FILE
========================================================== */