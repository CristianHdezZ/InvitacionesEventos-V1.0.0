/* ==========================================================
   INVITATION ENGINE V2
   FILE        : gallery.js
   VERSION     : 2.0.2
   MODULE      : GALLERY
========================================================== */

"use strict";

/* ==========================================================
   COMPONENT
========================================================== */

const Gallery={

    initialized:false,

    swiper:null,

    current:0,

    elements:{},

    config:AppConfig.gallery

};


/* ==========================================================
   INIT
========================================================== */

Gallery.init=function(){

    if(this.initialized){

        return;

    }

    this.cache();

    if(!this.elements.container){

        return;

    }

    this.createSwiper();

    this.bindEvents();

    this.lazyLoad();

    this.initialized=true;

};


/* ==========================================================
   CACHE
========================================================== */

Gallery.cache=function(){

    this.elements.container=

        document.querySelector(".gallery");

    this.elements.swiper=

        document.querySelector(".gallery__swiper");

    this.elements.wrapper=

        document.querySelector(".gallery__wrapper");

    this.elements.slides=

        document.querySelectorAll(".gallery__slide");

    this.elements.next=

        document.querySelector("[data-gallery-next]");

    this.elements.prev=

        document.querySelector("[data-gallery-prev]");

    this.elements.pagination=

        document.querySelector(".gallery__pagination");

    this.elements.lightbox=

        document.querySelector(".gallery__lightbox");

    this.elements.image=

        document.querySelector(".gallery__lightbox-image");

    this.elements.close=

        document.querySelector("[data-gallery-close]");

};


/* ==========================================================
   CREATE SWIPER
========================================================== */

Gallery.createSwiper=function(){

    if(

        typeof Swiper==="undefined"

    ){

        return;

    }

    this.swiper=new Swiper(

        this.elements.swiper,

        {

            loop:this.config.loop,

            speed:this.config.speed,

            spaceBetween:this.config.spaceBetween,

            slidesPerView:this.config.slidesPerView,

            autoplay:this.config.autoplay

                ?{

                    delay:this.config.delay,

                    disableOnInteraction:false

                }

                :false,

            navigation:{

                nextEl:this.elements.next,

                prevEl:this.elements.prev

            },

            pagination:{

                el:this.elements.pagination,

                clickable:true

            }

        }

    );

};

/* ==========================================================
   EVENTS
========================================================== */

Gallery.bindEvents=function(){

    if(this.elements.next){

        this.elements.next

            .addEventListener(

                "click",

                ()=>{

                    this.next();

                }

            );

    }

    if(this.elements.prev){

        this.elements.prev

            .addEventListener(

                "click",

                ()=>{

                    this.previous();

                }

            );

    }

    this.elements.slides.forEach(

        (slide,index)=>{

            slide.addEventListener(

                "click",

                ()=>{

                    this.open(index);

                }

            );

        }

    );

    if(this.elements.close){

        this.elements.close

            .addEventListener(

                "click",

                ()=>{

                    this.close();

                }

            );

    }

    if(this.elements.lightbox){

        this.elements.lightbox

            .addEventListener(

                "click",

                (event)=>{

                    if(

                        event.target===

                        this.elements.lightbox

                    ){

                        this.close();

                    }

                }

            );

    }

    document.addEventListener(

        "keydown",

        (event)=>{

            if(event.key==="Escape"){

                this.close();

            }

        }

    );

};


/* ==========================================================
   NEXT
========================================================== */

Gallery.next=function(){

    if(this.swiper){

        this.swiper.slideNext();

    }

};


/* ==========================================================
   PREVIOUS
========================================================== */

Gallery.previous=function(){

    if(this.swiper){

        this.swiper.slidePrev();

    }

};


/* ==========================================================
   OPEN LIGHTBOX
========================================================== */

Gallery.open=function(index){

    this.current=index;

    const image=

        this.elements.slides[index]

            ?.querySelector("img");

    if(

        !image ||

        !this.elements.image

    ){

        return;

    }

    this.elements.image.src=image.src;

    this.elements.image.alt=image.alt;

    this.elements.lightbox.classList.add(

        "is-open"

    );

    document.body.classList.add(

        "overflow-hidden"

    );

};


/* ==========================================================
   CLOSE LIGHTBOX
========================================================== */

Gallery.close=function(){

    if(!this.elements.lightbox){

        return;

    }

    this.elements.lightbox.classList.remove(

        "is-open"

    );

    document.body.classList.remove(

        "overflow-hidden"

    );

};

/* ==========================================================
   LAZY LOAD
========================================================== */

Gallery.lazyLoad=function(){

    if(

        !("IntersectionObserver" in window)

    ){

        return;

    }

    const observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(!entry.isIntersecting){

                        return;

                    }

                    const image=

                        entry.target.querySelector("img");

                    if(

                        image &&

                        image.dataset.src

                    ){

                        image.src=

                            image.dataset.src;

                        image.removeAttribute(

                            "data-src"

                        );

                    }

                    observer.unobserve(

                        entry.target

                    );

                });

            },

            {

                rootMargin:"100px"

            }

        );

    this.elements.slides.forEach(slide=>{

        observer.observe(slide);

    });

};


/* ==========================================================
   LOAD JSON
========================================================== */

Gallery.load=function(images=[]){

    if(

        !this.elements.wrapper ||

        !Array.isArray(images)

    ){

        return;

    }

    this.elements.wrapper.innerHTML="";

    images.forEach(item=>{

        this.add(item);

    });

};


/* ==========================================================
   ADD IMAGE
========================================================== */

Gallery.add=function(item){

    const slide=

        document.createElement("div");

    slide.className=

        "gallery__slide";

    slide.innerHTML=`

        <div class="gallery__item">

            <img
                class="gallery__image"
                src="${item.src}"
                alt="${item.alt || ""}">

        </div>

    `;

    this.elements.wrapper.appendChild(

        slide

    );

};


/* ==========================================================
   REMOVE IMAGE
========================================================== */

Gallery.remove=function(index){

    const slide=

        this.elements.wrapper.children[index];

    if(slide){

        slide.remove();

    }

};


/* ==========================================================
   CLEAR
========================================================== */

Gallery.clear=function(){

    if(this.elements.wrapper){

        this.elements.wrapper.innerHTML="";

    }

};


/* ==========================================================
   REFRESH
========================================================== */

Gallery.refresh=function(){

    this.cache();

    if(

        this.swiper &&

        typeof this.swiper.update==="function"

    ){

        this.swiper.update();

    }

};


/* ==========================================================
   RESIZE
========================================================== */

Gallery.onResize=function(){

    if(

        this.swiper &&

        typeof this.swiper.update==="function"

    ){

        this.swiper.update();

    }

};


/* ==========================================================
   SCROLL
========================================================== */

Gallery.onScroll=function(){

};


/* ==========================================================
   PAUSE
========================================================== */

Gallery.pause=function(){

    if(

        this.swiper &&

        this.swiper.autoplay

    ){

        this.swiper.autoplay.stop();

    }

};


/* ==========================================================
   RESUME
========================================================== */

Gallery.resume=function(){

    if(

        this.swiper &&

        this.swiper.autoplay

    ){

        this.swiper.autoplay.start();

    }

};


/* ==========================================================
   GET STATE
========================================================== */

Gallery.getState=function(){

    return{

        initialized:this.initialized,

        current:this.current,

        total:this.elements.wrapper

            ? this.elements.wrapper.children.length

            :0

    };

};


/* ==========================================================
   SET STATE
========================================================== */

Gallery.setState=function(state={}){

    Object.assign(

        this,

        state

    );

};


/* ==========================================================
   DESTROY
========================================================== */

Gallery.destroy=function(){

    if(

        this.swiper &&

        typeof this.swiper.destroy==="function"

    ){

        this.swiper.destroy(

            true,

            true

        );

    }

    this.swiper=null;

    this.initialized=false;

    this.current=0;

    this.elements={};

};


/* ==========================================================
   EXPORT
========================================================== */

window.Gallery=Gallery;


/* ==========================================================
   END OF FILE
========================================================== */