/* ==========================================================
   INVITATION ENGINE V2
   FILE        : timeline.js
   VERSION     : 2.0.2
   MODULE      : TIMELINE
========================================================== */

"use strict";

/* ==========================================================
   COMPONENT
========================================================== */

const Timeline={

    initialized:false,

    observer:null,

    items:[],

    elements:{},

    config:AppConfig.timeline

};


/* ==========================================================
   INIT
========================================================== */

Timeline.init=function(){

    if(this.initialized){

        return;

    }

    if(!this.config.enabled){

        return;

    }

    this.cache();

    if(!this.elements.container){

        return;

    }

    this.createObserver();

    this.bindEvents();

    this.initialized=true;

};


/* ==========================================================
   CACHE
========================================================== */

Timeline.cache=function(){

    this.elements.container=

        document.querySelector(".timeline");

    this.elements.wrapper=

        document.querySelector(".timeline__wrapper");

    this.elements.items=[

        ...document.querySelectorAll(

            ".timeline__item"

        )

    ];

};


/* ==========================================================
   EVENTS
========================================================== */

Timeline.bindEvents=function(){

    window.addEventListener(

        "resize",

        this.onResize.bind(this)

    );

};


/* ==========================================================
   OBSERVER
========================================================== */

Timeline.createObserver=function(){

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

    this.elements.items.forEach(item=>{

        this.observer.observe(item);

    });

};

/* ==========================================================
   LOAD JSON
========================================================== */

Timeline.load=function(items=[]){

    if(

        !this.elements.wrapper ||

        !Array.isArray(items)

    ){

        return;

    }

    this.clear();

    items.forEach(item=>{

        this.add(item);

    });

    this.cache();

    this.createObserver();

};


/* ==========================================================
   ADD ITEM
========================================================== */

Timeline.add=function(item){

    const element=

        document.createElement("article");

    element.className=

        "timeline__item";

    element.innerHTML=`

        <div class="timeline__dot"></div>

        <div class="timeline__card">

            <div class="timeline__icon">

                <img src="${item.icon || ""}" alt="">

            </div>

            <div class="timeline__header">

                <span class="timeline__time">

                    ${item.time || ""}

                </span>

                <h3 class="timeline__title">

                    ${item.title || ""}

                </h3>

                <p class="timeline__subtitle">

                    ${item.subtitle || ""}

                </p>

            </div>

            <p class="timeline__description">

                ${item.description || ""}

            </p>

        </div>

    `;

    this.elements.wrapper.appendChild(

        element

    );

};


/* ==========================================================
   REMOVE ITEM
========================================================== */

Timeline.remove=function(index){

    const item=

        this.elements.wrapper

            .children[index];

    if(item){

        item.remove();

    }

};


/* ==========================================================
   CLEAR
========================================================== */

Timeline.clear=function(){

    if(

        this.elements.wrapper

    ){

        this.elements.wrapper.innerHTML="";

    }

};


/* ==========================================================
   SHOW
========================================================== */

Timeline.show=function(){

    this.elements.container.classList.remove(

        "hidden"

    );

};


/* ==========================================================
   HIDE
========================================================== */

Timeline.hide=function(){

    this.elements.container.classList.add(

        "hidden"

    );

};

/* ==========================================================
   REFRESH
========================================================== */

Timeline.refresh=function(){

    this.cache();

    if(

        this.observer

    ){

        this.observer.disconnect();

    }

    this.createObserver();

};


/* ==========================================================
   RESIZE
========================================================== */

Timeline.onResize=function(){

};


/* ==========================================================
   SCROLL
========================================================== */

Timeline.onScroll=function(){

};


/* ==========================================================
   PAUSE
========================================================== */

Timeline.pause=function(){

    this.elements.items.forEach(item=>{

        item.classList.add(

            "is-paused"

        );

    });

};


/* ==========================================================
   RESUME
========================================================== */

Timeline.resume=function(){

    this.elements.items.forEach(item=>{

        item.classList.remove(

            "is-paused"

        );

    });

};


/* ==========================================================
   GET STATE
========================================================== */

Timeline.getState=function(){

    return{

        initialized:this.initialized,

        total:this.elements.items.length

    };

};


/* ==========================================================
   SET STATE
========================================================== */

Timeline.setState=function(state={}){

    Object.assign(

        this,

        state

    );

};


/* ==========================================================
   DESTROY
========================================================== */

Timeline.destroy=function(){

    if(this.observer){

        this.observer.disconnect();

    }

    this.observer=null;

    this.initialized=false;

    this.elements={};

};


/* ==========================================================
   EXPORT
========================================================== */

window.Timeline=Timeline;


/* ==========================================================
   END OF FILE
========================================================== */