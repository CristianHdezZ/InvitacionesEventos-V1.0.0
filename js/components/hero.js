/* ==========================================================
   INVITATION ENGINE V2
   FILE        : hero.js
   VERSION     : 2.0.2
   MODULE      : HERO
========================================================== */

"use strict";

/* ==========================================================
   COMPONENT
========================================================== */

const Hero={

    initialized:false,

    elements:{},

    config:AppConfig.hero,

    observer:null

};


/* ==========================================================
   INIT
========================================================== */

Hero.init=function(){

    if(this.initialized){

        return;

    }

    this.cache();

    if(!this.elements.hero){

        return;

    }

    this.bindEvents();

    this.createObserver();

    this.prepare();

    this.initialized=true;

};


/* ==========================================================
   CACHE
========================================================== */

Hero.cache=function(){

    this.elements.hero=

        document.querySelector(".hero");

    this.elements.title=

        document.querySelector(".hero__title");

    this.elements.subtitle=

        document.querySelector(".hero__subtitle");

    this.elements.photo=

        document.querySelector(".hero__photo");

    this.elements.crown=

        document.querySelector(".hero__crown");

    this.elements.scroll=

        document.querySelector(".hero__scroll");

};


/* ==========================================================
   PREPARE
========================================================== */

Hero.prepare=function(){

    this.elements.hero.classList.add(

        "is-ready"

    );

};


/* ==========================================================
   EVENTS
========================================================== */

Hero.bindEvents=function(){

    window.addEventListener(

        "mousemove",

        this.onMouseMove.bind(this),

        {

            passive:true

        }

    );

};

/* ==========================================================
   CREATE OBSERVER
========================================================== */

Hero.createObserver=function(){

    this.observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add(

                            "is-visible"

                        );

                    }

                });

            },

            {

                threshold:.25

            }

        );

    this.observer.observe(

        this.elements.hero

    );

};


/* ==========================================================
   MOUSE MOVE
========================================================== */

Hero.onMouseMove=function(event){

    if(

        !this.config.floatingPhoto ||

        !this.elements.photo

    ){

        return;

    }

    const x=

        (event.clientX/window.innerWidth-.5)*10;

    const y=

        (event.clientY/window.innerHeight-.5)*10;

    this.elements.photo.style.transform=

        `translate(${x}px,${y}px)`;

};


/* ==========================================================
   SHOW
========================================================== */

Hero.show=function(){

    this.elements.hero.classList.add(

        "is-visible"

    );

};


/* ==========================================================
   HIDE
========================================================== */

Hero.hide=function(){

    this.elements.hero.classList.remove(

        "is-visible"

    );

};


/* ==========================================================
   START ANIMATION
========================================================== */

Hero.startAnimation=function(){

    this.elements.hero.classList.add(

        "animate-fade-up"

    );

};


/* ==========================================================
   STOP ANIMATION
========================================================== */

Hero.stopAnimation=function(){

    this.elements.hero.classList.remove(

        "animate-fade-up"

    );

};


/* ==========================================================
   UPDATE THEME
========================================================== */

Hero.updateTheme=function(theme){

    this.elements.hero.dataset.theme=

        theme;

};


/* ==========================================================
   UPDATE TITLE
========================================================== */

Hero.setTitle=function(text){

    if(this.elements.title){

        this.elements.title.textContent=text;

    }

};


/* ==========================================================
   UPDATE SUBTITLE
========================================================== */

Hero.setSubtitle=function(text){

    if(this.elements.subtitle){

        this.elements.subtitle.textContent=text;

    }

};

/* ==========================================================
   UPDATE PHOTO
========================================================== */

Hero.setPhoto=function(src){

    if(

        !this.elements.photo

    ){

        return;

    }

    this.elements.photo.src=src;

};


/* ==========================================================
   UPDATE CROWN
========================================================== */

Hero.setCrown=function(src){

    if(

        !this.elements.crown

    ){

        return;

    }

    this.elements.crown.src=src;

};


/* ==========================================================
   PARALLAX
========================================================== */

Hero.parallax=function(scrollY){

    if(

        !this.elements.photo

    ){

        return;

    }

    const offset=

        scrollY*0.08;

    this.elements.photo.style.transform=

        `translateY(${offset}px)`;

};


/* ==========================================================
   SCROLL
========================================================== */

Hero.onScroll=function(){

    const scroll=

        window.scrollY;

    this.parallax(scroll);

};


/* ==========================================================
   RESIZE
========================================================== */

Hero.onResize=function(){

    if(

        !this.elements.hero

    ){

        return;

    }

};


/* ==========================================================
   PAUSE
========================================================== */

Hero.pause=function(){

    this.elements.hero.classList.add(

        "is-paused"

    );

};


/* ==========================================================
   RESUME
========================================================== */

Hero.resume=function(){

    this.elements.hero.classList.remove(

        "is-paused"

    );

};


/* ==========================================================
   REFRESH
========================================================== */

Hero.refresh=function(){

    this.cache();

};


/* ==========================================================
   DESTROY OBSERVER
========================================================== */

Hero.destroyObserver=function(){

    if(this.observer){

        this.observer.disconnect();

        this.observer=null;

    }

};

/* ==========================================================
   DESTROY
========================================================== */

Hero.destroy=function(){

    this.destroyObserver();

    this.initialized=false;

    this.elements={};

};


/* ==========================================================
   GET STATE
========================================================== */

Hero.getState=function(){

    return{

        initialized:this.initialized,

        theme:

            this.elements.hero

                ? this.elements.hero.dataset.theme

                : null

    };

};


/* ==========================================================
   SET STATE
========================================================== */

Hero.setState=function(state={}){

    Object.assign(

        this,

        state

    );

};


/* ==========================================================
   RESET
========================================================== */

Hero.reset=function(){

    if(!this.elements.hero){

        return;

    }

    this.elements.hero.classList.remove(

        "is-visible",

        "is-paused",

        "animate-fade-up"

    );

};


/* ==========================================================
   ENABLE
========================================================== */

Hero.enable=function(){

    if(this.elements.hero){

        this.elements.hero.style.display="";

    }

};


/* ==========================================================
   DISABLE
========================================================== */

Hero.disable=function(){

    if(this.elements.hero){

        this.elements.hero.style.display="none";

    }

};


/* ==========================================================
   SHOW SCROLL INDICATOR
========================================================== */

Hero.showScrollIndicator=function(){

    if(this.elements.scroll){

        this.elements.scroll.classList.remove(

            "hidden"

        );

    }

};


/* ==========================================================
   HIDE SCROLL INDICATOR
========================================================== */

Hero.hideScrollIndicator=function(){

    if(this.elements.scroll){

        this.elements.scroll.classList.add(

            "hidden"

        );

    }

};


/* ==========================================================
   EXPORT
========================================================== */

window.Hero=Hero;


/* ==========================================================
   END OF FILE
========================================================== */