(this["webpackJsonpamplify-app"]=this["webpackJsonpamplify-app"]||[]).push([[28],{227:function(t,n,e){"use strict";e.r(n),e.d(n,"amplify_nav",(function(){return p})),e.d(n,"amplify_sign_out",(function(){return h}));var r=e(8),i=e(3),a=e(27),o=e(51),u=e(4),c=e(17),s=e(84),l=function(t,n,e,r){return new(e||(e=Promise))((function(i,a){function o(t){try{c(r.next(t))}catch(n){a(n)}}function u(t){try{c(r.throw(t))}catch(n){a(n)}}function c(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(o,u)}c((r=r.apply(t,n||[])).next())}))},f=function(t,n){var e,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=n.call(t,o)}catch(u){a=[6,u],r=0}finally{e=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},p=function(){function t(t){Object(r.k)(this,t)}return t.prototype.render=function(){return Object(r.i)("nav",{class:"nav"},Object(r.i)("slot",null))},t}();p.style=".nav{display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center}.nav>*{margin:0 0.5em}";var h=function(){function t(t){Object(r.k)(this,t),this.handleAuthStateChange=s.d,this.buttonText=u.a.SIGN_OUT}return t.prototype.signOut=function(t){return l(this,void 0,void 0,(function(){var n;return f(this,(function(e){switch(e.label){case 0:if(t&&t.preventDefault(),!o.a||"function"!==typeof o.a.signOut)throw new Error(c.d);e.label=1;case 1:return e.trys.push([1,3,,4]),[4,o.a.signOut()];case 2:return e.sent(),this.handleAuthStateChange(a.a.SignedOut),[3,4];case 3:return n=e.sent(),Object(s.a)(n),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var t=this;return Object(r.i)("amplify-button",{slot:"sign-out",onClick:function(n){return t.signOut(n)},"data-test":"sign-out-button"},i.a.get(this.buttonText))},t}()}}]);
//# sourceMappingURL=28.422ac4d5.chunk.js.map