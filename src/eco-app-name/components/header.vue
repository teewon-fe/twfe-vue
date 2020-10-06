<template>
   <header class="tw-header xfull xfix mb-0">
     <div class="tw-header-inner">
       <h1 class="tw-header-left">
         <a>
           <img src="@images/eco-logo.png">
           <span class="tw-header-title">应用标题</span>
         </a>
       </h1>

       <div class="tw-header-body">
         <ul class="tw-nav xheader xhorizontal">
           <li>
             <a class="xactive">
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
             <tw-poppane
              class="xheader"
              switch=".js-navmenu1">
               <ul class="tw-header-menu">
                 <li><a>菜单项1菜单项1</a></li>
                 <li><a>菜单项2</a></li>
                 <li><a>菜单项3</a></li>
               </ul>
             </tw-poppane>
           </li>
         </ul>
       </div>

      <!-- 头部: 用户信息区 -->
      <div class="tw-header-right">
        <a>English</a>
        <template>
          <a class="tw-popswitch xheader xavatar js-rightmenu">
            <img class="tw-avatar xsmall" src="@images/avatar-default.png" alt="avatar" />
          </a>
          <tw-poppane
            class="xheader"
            switch=".js-rightmenu"
            :noArrow="true">
            <ul class="tw-header-menu xuser">
              <li>
                <div class="tw-piclr xuser">
                  <div class="tw-piclr-imgbox">
                    <img class="tw-avatar xsmall" src="@images/avatar-default.png">
                  </div>
                  <div class="tw-piclr-text">
                    <h4 class="tw-piclr-title xellipsis">用户名称</h4>
                    <div class="tw-piclr-des">机构名称</div>
                  </div>
                </div>
              </li>
              <li><a><i class="tw-ico xoff"></i>退出</a></li>
            </ul>
          </tw-poppane>
        </template>
      </div>
     </div>
   </header>
</template>

<script>
export default {
  name: 'tw-header'
}
</script>
