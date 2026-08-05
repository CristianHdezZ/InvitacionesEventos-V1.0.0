/* ==========================================================
   INVITATION ENGINE V2
   FILE        : storage.js
   VERSION     : 2.0.2
   MODULE      : STORAGE
========================================================== */

"use strict";

/* ==========================================================
   STORAGE
========================================================== */

const Storage={

    prefix:AppConfig.storage.prefix

};


/* ==========================================================
   KEY
========================================================== */

Storage.key=function(key){

    return `${this.prefix}:${key}`;

};


/* ==========================================================
   SET
========================================================== */

Storage.set=function(

    key,

    value

){

    localStorage.setItem(

        this.key(key),

        JSON.stringify(value)

    );

};


/* ==========================================================
   GET
========================================================== */

Storage.get=function(

    key,

    defaultValue=null

){

    const value=

        localStorage.getItem(

            this.key(key)

        );

    if(value===null){

        return defaultValue;

    }

    try{

        return JSON.parse(value);

    }

    catch{

        return defaultValue;

    }

};


/* ==========================================================
   REMOVE
========================================================== */

Storage.remove=function(key){

    localStorage.removeItem(

        this.key(key)

    );

};


/* ==========================================================
   CLEAR
========================================================== */

Storage.clear=function(){

    Object.keys(localStorage)

        .forEach(key=>{

            if(

                key.startsWith(

                    this.prefix+":"

                )

            ){

                localStorage.removeItem(key);

            }

        });

};


/* ==========================================================
   EXISTS
========================================================== */

Storage.exists=function(key){

    return localStorage.getItem(

        this.key(key)

    )!==null;

};


/* ==========================================================
   SIZE
========================================================== */

Storage.size=function(){

    return Object.keys(localStorage)

        .filter(key=>

            key.startsWith(

                this.prefix+":"

            )

        ).length;

};

/* ==========================================================
   SESSION SET
========================================================== */

Storage.sessionSet=function(

    key,

    value

){

    sessionStorage.setItem(

        this.key(key),

        JSON.stringify(value)

    );

};


/* ==========================================================
   SESSION GET
========================================================== */

Storage.sessionGet=function(

    key,

    defaultValue=null

){

    const value=

        sessionStorage.getItem(

            this.key(key)

        );

    if(value===null){

        return defaultValue;

    }

    try{

        return JSON.parse(value);

    }

    catch{

        return defaultValue;

    }

};


/* ==========================================================
   SESSION REMOVE
========================================================== */

Storage.sessionRemove=function(key){

    sessionStorage.removeItem(

        this.key(key)

    );

};


/* ==========================================================
   SESSION CLEAR
========================================================== */

Storage.sessionClear=function(){

    Object.keys(sessionStorage)

        .forEach(key=>{

            if(

                key.startsWith(

                    this.prefix+":"

                )

            ){

                sessionStorage.removeItem(key);

            }

        });

};


/* ==========================================================
   SET WITH EXPIRATION
========================================================== */

Storage.setExpire=function(

    key,

    value,

    minutes

){

    const payload={

        value,

        expires:

            Date.now()+

            (minutes*60000)

    };

    this.set(

        key,

        payload

    );

};


/* ==========================================================
   GET WITH EXPIRATION
========================================================== */

Storage.getExpire=function(

    key,

    defaultValue=null

){

    const payload=

        this.get(key);

    if(!payload){

        return defaultValue;

    }

    if(

        Date.now()>

        payload.expires

    ){

        this.remove(key);

        return defaultValue;

    }

    return payload.value;

};


/* ==========================================================
   TOUCH
========================================================== */

Storage.touch=function(key){

    return this.exists(key);

};


/* ==========================================================
   KEYS
========================================================== */

Storage.keys=function(){

    return Object.keys(localStorage)

        .filter(key=>

            key.startsWith(

                this.prefix+":"

            )

        );

};

/* ==========================================================
   VALUES
========================================================== */

Storage.values=function(){

    return this.keys().map(key=>{

        const value=

            localStorage.getItem(key);

        try{

            return JSON.parse(value);

        }

        catch{

            return value;

        }

    });

};


/* ==========================================================
   ENTRIES
========================================================== */

Storage.entries=function(){

    return this.keys().map(key=>{

        const value=

            localStorage.getItem(key);

        try{

            return [

                key.replace(

                    this.prefix+":",

                    ""

                ),

                JSON.parse(value)

            ];

        }

        catch{

            return [

                key.replace(

                    this.prefix+":",

                    ""

                ),

                value

            ];

        }

    });

};


/* ==========================================================
   EXPORT JSON
========================================================== */

Storage.export=function(){

    const data={};

    this.entries().forEach(

        ([key,value])=>{

            data[key]=value;

        }

    );

    return JSON.stringify(

        data,

        null,

        4

    );

};


/* ==========================================================
   IMPORT JSON
========================================================== */

Storage.import=function(json){

    try{

        const data=

            JSON.parse(json);

        Object.keys(data)

            .forEach(key=>{

                this.set(

                    key,

                    data[key]

                );

            });

        return true;

    }

    catch{

        return false;

    }

};


/* ==========================================================
   CLONE
========================================================== */

Storage.clone=function(

    from,

    to

){

    const value=

        this.get(from);

    if(value!==null){

        this.set(

            to,

            value

        );

    }

};


/* ==========================================================
   RENAME
========================================================== */

Storage.rename=function(

    oldKey,

    newKey

){

    const value=

        this.get(oldKey);

    if(value!==null){

        this.set(

            newKey,

            value

        );

        this.remove(

            oldKey

        );

    }

};


/* ==========================================================
   MERGE
========================================================== */

Storage.merge=function(

    key,

    object

){

    const current=

        this.get(

            key,

            {}

        );

    this.set(

        key,

        {

            ...current,

            ...object

        }

    );

};

/* ==========================================================
   HAS
========================================================== */

Storage.has=function(key){

    return this.exists(key);

};


/* ==========================================================
   COUNT
========================================================== */

Storage.count=function(){

    return this.keys().length;

};


/* ==========================================================
   MEMORY USAGE
========================================================== */

Storage.memory=function(){

    let total=0;

    this.keys().forEach(key=>{

        const value=

            localStorage.getItem(key);

        total+=

            key.length+

            (value?value.length:0);

    });

    return total;

};


/* ==========================================================
   SAVE SETTINGS
========================================================== */

Storage.saveSettings=function(settings){

    this.set(

        AppConfig.storage.settingsKey,

        settings

    );

};


/* ==========================================================
   LOAD SETTINGS
========================================================== */

Storage.loadSettings=function(){

    return this.get(

        AppConfig.storage.settingsKey,

        {}

    );

};


/* ==========================================================
   SAVE THEME
========================================================== */

Storage.saveTheme=function(theme){

    this.set(

        AppConfig.storage.themeKey,

        theme

    );

};


/* ==========================================================
   LOAD THEME
========================================================== */

Storage.loadTheme=function(){

    return this.get(

        AppConfig.storage.themeKey,

        AppConfig.theme.name

    );

};


/* ==========================================================
   SAVE GALLERY
========================================================== */

Storage.saveGallery=function(images){

    this.set(

        AppConfig.storage.galleryKey,

        images

    );

};


/* ==========================================================
   LOAD GALLERY
========================================================== */

Storage.loadGallery=function(){

    return this.get(

        AppConfig.storage.galleryKey,

        []

    );

};


/* ==========================================================
   RESET
========================================================== */

Storage.reset=function(){

    this.clear();

    this.sessionClear();

};

/* ==========================================================
   BACKUP
========================================================== */

Storage.backup=function(){

    return{

        created:new Date().toISOString(),

        version:AppConfig.version,

        data:JSON.parse(

            this.export()

        )

    };

};


/* ==========================================================
   RESTORE
========================================================== */

Storage.restore=function(backup){

    if(

        !backup ||

        !backup.data

    ){

        return false;

    }

    this.clear();

    Object.entries(

        backup.data

    ).forEach(

        ([key,value])=>{

            this.set(

                key,

                value

            );

        }

    );

    return true;

};


/* ==========================================================
   EXPORT
========================================================== */

window.Storage=Storage;


/* ==========================================================
   END OF FILE
========================================================== */