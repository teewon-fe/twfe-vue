(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f507f92"],{"4ec0":function(e,t,s){"use strict";var n=s("ec9e"),r=s.n(n);r.a},ec9e:function(e,t,s){},eefd:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"bottom",rawName:"v-bottom",value:0,expression:"0"}],staticClass:"tw-loginbox",on:{click:e.focusInput}},[s("div",[e._v("登录或注册(请用真实姓名)")]),e._l(e.cmdContent,(function(t,n){return s("div",{key:n},[e._v(e._s(t))])})),s("div",[s("span",[e._v("$:")]),"checkbox"===("enter-password"===e.step?"password":"text")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],ref:"input",staticClass:"tw-loginbox-input",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleCmd(t)},change:function(t){var s=e.value,n=t.target,r=!!n.checked;if(Array.isArray(s)){var o=null,i=e._i(s,o);n.checked?i<0&&(e.value=s.concat([o])):i>-1&&(e.value=s.slice(0,i).concat(s.slice(i+1)))}else e.value=r}}}):"radio"===("enter-password"===e.step?"password":"text")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],ref:"input",staticClass:"tw-loginbox-input",attrs:{type:"radio"},domProps:{checked:e._q(e.value,null)},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleCmd(t)},change:function(t){e.value=null}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],ref:"input",staticClass:"tw-loginbox-input",attrs:{type:"enter-password"===e.step?"password":"text"},domProps:{value:e.value},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleCmd(t)},input:function(t){t.target.composing||(e.value=t.target.value)}}})])],2)},r=[],o=(s("6d57"),s("f548"),s("ce3c"));function i(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function a(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?i(Object(s),!0).forEach((function(t){Object(o["a"])(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):i(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var u={name:"page-login",data(){return{cmdContent:["请输入用户名"],step:"enter-user",value:"",params:{username:"",password:"",mob:""}}},methods:{focusInput(){this.$refs.input.focus()},nextCmd(e,t){t?this.cmdContent.push("$:"+"*".repeat(this.value.length)):this.cmdContent.push("$:"+this.value),this.cmdContent.push(e),this.value=""},handleLoginSuccess(e){const t=e.role&&e.role!==this.$cnt.ROLE_TEAM_LEADER?"":e.userGroup;window.$ui.setDefaultHeaders({token:e.token,"user-id":e.userId,"global-dev-group":t}),window.$app.setAuth(a({username:this.$api.user.getSession.params.username,globalDevGroup:t},e),null,720),this.$router.push("/home")},login(e){this.$api.user.getSession.send(e||this.params).then(e=>{this.handleLoginSuccess(e)}).catch(e=>{"3001"===e.resultCode?(this.nextCmd("密码错误，请重新输入用户名",!0),this.step="enter-user"):"3002"===e.resultCode&&(this.nextCmd("请输入手机号码",!0),this.step="enter-mob")})},handleCmd(){let e=this;"enter-user"===this.step?this.value.trim()?(this.params.username=this.value,this.nextCmd("请输入密码"),this.step="enter-password"):this.cmdContent.push("请输入用户名"):"enter-password"===this.step?this.value.trim()?(this.params.password=btoa(this.value).replace(/=+$/g,""),this.login()):this.cmdContent.push("请输入用户密码"):"enter-mob"===this.step&&(this.value.trim()?this.$ui.pattern.phone.test(this.value)?(this.params.mob=this.value,this.$api.user.addUser.send(this.params).then(t=>{e.handleLoginSuccess(t)})):this.cmdContent.push("请输入正确的手机号码"):this.cmdContent.push("第一次登录需输入手机号码")),this.$nextTick(()=>{window.scrollTo(0,document.documentElement.offsetHeight+10)})}},mounted(){this.focusInput()},created(){"twfe"===this.$route.query.from&&this.login(this.$route.query)}},l=u,c=(s("4ec0"),s("9ca4")),p=Object(c["a"])(l,n,r,!1,null,null,null);t["default"]=p.exports}}]);