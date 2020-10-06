<template>
   <header class="tw-header mb-small">
     <div class="tw-header-inner">
       <h1 class="tw-header-left">
         <a>
           <img src="@images/logo.png">
           <span class="tw-header-title dt-6 dl-n5" style="position:rel">前端项目管理</span>
         </a>
       </h1>
       <div class="tw-header-body">
         <ul class="tw-nav xheader xhorizontal">
           <li>
             <router-link
              to="/home"
              :class="{xcurrent:$route.meta.isNavProject}">
               <span>项目</span>
             </router-link>
           </li>
           <!-- <li>
             <a>
               <i class="tw-ico xname"></i>
               <span>带图标导航</span>
             </a>
           </li>
           <li>
             <a>
               <i class="tw-ico xname"></i>
               <span>带图标导航</span>
             </a>
           </li>
           <li>
             <a class="tw-popswitch xheader js-navmenu1">
               <i class="tw-ico xname"></i>
               <span>带下拉菜单</span>
             </a>
             <tw-poppane switch=".js-navmenu1">
               <ul class="tw-header-menu">
                 <li><a>菜单项1菜单项1</a></li>
                 <li><a>菜单项2</a></li>
                 <li><a>菜单项3</a></li>
               </ul>
             </tw-poppane>
           </li> -->
         </ul>
       </div>
       <div class="tw-header-right">
         <a class="tw-popswitch xheader xcenter js-rightmenu">{{$app.user.username}}</a>
         <tw-poppane switch=".js-rightmenu">
           <ul class="tw-header-menu">
             <li><a @click="$app.delAuth">退出</a></li>
           </ul>
         </tw-poppane>
       </div>
     </div>
   </header>
</template>

<script>
export default {
  name: 'tw-header'
}
</script>
