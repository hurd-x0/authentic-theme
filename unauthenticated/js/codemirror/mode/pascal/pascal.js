(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("pascal",function(){function j(c){var e={},d=c.split(" ");for(var f=0;f<d.length;++f){e[d[f]]=true}return e}var n=j("and array begin case const div do downto else end file for forward integer boolean char function goto if in label mod nil not of or packed procedure program record repeat set string then to type until var while with");var a={"null":true};var l=/[+\-*&%=<>!?|\/]/;function i(c,e){var f=c.next();if(f=="#"&&e.startOfLine){c.skipToEnd();return"meta"}if(f=='"'||f=="'"){e.tokenize=k(f);return e.tokenize(c,e)}if(f=="("&&c.eat("*")){e.tokenize=m;return m(c,e)}if(/[\[\]{}\(\),;\:\.]/.test(f)){return null}if(/\d/.test(f)){c.eatWhile(/[\w\.]/);return"number"}if(f=="/"){if(c.eat("/")){c.skipToEnd();return"comment"}}if(l.test(f)){c.eatWhile(l);return"operator"}c.eatWhile(/[\w\$_]/);var d=c.current();if(n.propertyIsEnumerable(d)){return"keyword"}if(a.propertyIsEnumerable(d)){return"atom"}return"variable"}function k(c){return function(h,e){var d=false,f,g=false;while((f=h.next())!=null){if(f==c&&!d){g=true;break}d=!d&&f=="\\"}if(g||!d){e.tokenize=null}return"string"}}function m(c,d){var f=false,e;while(e=c.next()){if(e==")"&&f){d.tokenize=null;break}f=(e=="*")}return"comment"}return{startState:function(){return{tokenize:null}},token:function(c,d){if(c.eatSpace()){return null}var e=(d.tokenize||i)(c,d);if(e=="comment"||e=="meta"){return e}return e},electricChars:"{}"}});b.defineMIME("text/x-pascal","pascal")});