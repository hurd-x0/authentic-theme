(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(e){function f(c,a){for(var b=0;b<c.length;b++){a(c[b],b)}}function d(c,a){for(var b=0;b<c.length;b++){if(a(c[b],b)){return true}}return false}e.defineMode("dylan",function(r){var s={unnamedDefinition:["interface"],namedDefinition:["module","library","macro","C-struct","C-union","C-function","C-callable-wrapper"],typeParameterizedDefinition:["class","C-subtype","C-mapped-subtype"],otherParameterizedDefinition:["method","function","C-variable","C-address"],constantSimpleDefinition:["constant"],variableSimpleDefinition:["variable"],otherSimpleDefinition:["generic","domain","C-pointer-type","table"],statement:["if","block","begin","method","case","for","select","when","unless","until","while","iterate","profiling","dynamic-bind"],separator:["finally","exception","cleanup","else","elseif","afterwards"],other:["above","below","by","from","handler","in","instance","let","local","otherwise","slot","subclass","then","to","keyed-by","virtual"],signalingCalls:["signal","error","cerror","break","check-type","abort"]};s.otherDefinition=s.unnamedDefinition.concat(s.namedDefinition).concat(s.otherParameterizedDefinition);s.definition=s.typeParameterizedDefinition.concat(s.otherDefinition);s.parameterizedDefinition=s.typeParameterizedDefinition.concat(s.otherParameterizedDefinition);s.simpleDefinition=s.constantSimpleDefinition.concat(s.variableSimpleDefinition).concat(s.otherSimpleDefinition);s.keyword=s.statement.concat(s.separator).concat(s.other);var b="[-_a-zA-Z?!*@<>$%]+";var x=new RegExp("^"+b);var z={symbolKeyword:b+":",symbolClass:"<"+b+">",symbolGlobal:"\\*"+b+"\\*",symbolConstant:"\\$"+b};var t={symbolKeyword:"atom",symbolClass:"tag",symbolGlobal:"variable-2",symbolConstant:"variable-3"};for(var u in z){if(z.hasOwnProperty(u)){z[u]=new RegExp("^"+z[u])}}z.keyword=[/^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/];var a={};a.keyword="keyword";a.definition="def";a.simpleDefinition="def";a.signalingCalls="builtin";var A={};var v={};f(["keyword","definition","simpleDefinition","signalingCalls"],function(g){f(s[g],function(h){A[h]=g;v[h]=a[g]})});function B(g,h,i){h.tokenize=i;return i(g,h)}function y(g,h){var j=g.peek();if(j=="'"||j=='"'){g.next();return B(g,h,c(j,"string"))}else{if(j=="/"){g.next();if(g.eat("*")){return B(g,h,w)}else{if(g.eat("/")){g.skipToEnd();return"comment"}}g.backUp(1)}else{if(/[+\-\d\.]/.test(j)){if(g.match(/^[+-]?[0-9]*\.[0-9]*([esdx][+-]?[0-9]+)?/i)||g.match(/^[+-]?[0-9]+([esdx][+-]?[0-9]+)/i)||g.match(/^[+-]?\d+/)){return"number"}}else{if(j=="#"){g.next();j=g.peek();if(j=='"'){g.next();return B(g,h,c('"',"string"))}else{if(j=="b"){g.next();g.eatWhile(/[01]/);return"number"}else{if(j=="x"){g.next();g.eatWhile(/[\da-f]/i);return"number"}else{if(j=="o"){g.next();g.eatWhile(/[0-7]/);return"number"}else{if(j=="#"){g.next();return"punctuation"}else{if((j=="[")||(j=="(")){g.next();return"bracket"}else{if(g.match(/f|t|all-keys|include|key|next|rest/i)){return"atom"}else{g.eatWhile(/[-a-zA-Z]/);return"error"}}}}}}}}else{if(j=="~"){g.next();j=g.peek();if(j=="="){g.next();j=g.peek();if(j=="="){g.next();return"operator"}return"operator"}return"operator"}else{if(j==":"){g.next();j=g.peek();if(j=="="){g.next();return"operator"}else{if(j==":"){g.next();return"punctuation"}}}else{if("[](){}".indexOf(j)!=-1){g.next();return"bracket"}else{if(".,".indexOf(j)!=-1){g.next();return"punctuation"}else{if(g.match("end")){return"keyword"}}}}}}}}}for(var k in z){if(z.hasOwnProperty(k)){var i=z[k];if((i instanceof Array&&d(i,function(l){return g.match(l)}))||g.match(i)){return t[k]}}}if(/[+\-*\/^=<>&|]/.test(j)){g.next();return"operator"}if(g.match("define")){return"def"}else{g.eatWhile(/[\w\-]/);if(A.hasOwnProperty(g.current())){return v[g.current()]}else{if(g.current().match(x)){return"variable"}else{g.next();return"variable-2"}}}}function w(g,i){var k=false,l=false,h=0,j;while((j=g.next())){if(j=="/"&&k){if(h>0){h--}else{i.tokenize=y;break}}else{if(j=="*"&&l){h++}}k=(j=="*");l=(j=="/")}return"comment"}function c(h,g){return function(i,k){var j=false,l,m=false;while((l=i.next())!=null){if(l==h&&!j){m=true;break}j=!j&&l=="\\"}if(m||!j){k.tokenize=y}return g}}return{startState:function(){return{tokenize:y,currentIndent:0}},token:function(g,h){if(g.eatSpace()){return null}var i=h.tokenize(g,h);return i},blockCommentStart:"/*",blockCommentEnd:"*/"}});e.defineMIME("text/x-dylan","dylan")});