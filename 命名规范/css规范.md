# CSS编码规范（Vue）



### 命名约定

*   文件名

    > 文件名必须使用小写字母

*   ID命名

    *   采用小驼峰式命名

    ```
    // bad

    <template>
      <div id="box-id"></div>
    </template>

    <template>
      <div id="BoxId"></div>
    </template>

    // good

    <template>
      <div id="boxId"></div>
    </template>

    ```

*   class命名

    *   采用BEM命名方式(block-element--modifier)

    > block代表更高级别的抽象或者组件，一般为组件名

    > block__element 代表 block 的后代，用于形成一个完整的 block 的整体

    > block--modifier代表 block 的不同状态或不同版本

    *   区分css和javascript类命名

    > css类使用上述BEM方式

    > js类命名（用于绑定元素添加事件等），使用js-开头

    ```
    // bad
    
    <template>
      <div id="box-id" class="box-container request-list"></div>
    </template>
    
    <template>
      <div id="BoxId" class="box-container request-list"></div>
    </template>
    
    // good
    
    <template>
      <div id="boxId" class="box-container js-request-list"></div>
    </template>
    
    ```

### 通用规范

*   @charset 规则

    *   样式文件必须写上 @charset 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”
    *   字符 @charset “”; 都用小写字母，不能出现转义符，编码名允许大小混写
    *   考虑到在使用“UTF-8”编码情况下 BOM 对代码的污染和编码显示的问题，在可控范围下，坚决不使用 BOM

    ```
    // bad 

    /**
     * @desc File Info
     * @author Author Name
     * @date 2015-10-10
     */

    /* @charset规则不在文件首行首个字符开始 */
    @charset "UTF-8";

    .jdc{}

    ```

    ```
    // bad 

    @CHARSET "UTF-8";
    /* @charset规则没有用小写 */

    .jdc{}

    ```

    ```
    // bad 

    /* 无@charset规则 */
    .jdc{}

    ```

    ```
    // good

    @charset "UTF-8";

    .jdc{}

    ```

*   代码大小写

    > 样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

    ```
    // bad

    .jdc{
      display:block;
    }

    // good

    .JDC{
      DISPLAY:BLOCK;
    }

    ```

*   尽量使用样式的简写

    ```
    // bad

    .btn {
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 10px;
      padding-bottom: 30px;
    }

    // good

    .btn {
      padding: 10px 20px 30px;
    }

    ```

*   代码缩进：使用软制表符（2个空格）进行缩进。

    ```
    // bad

    .avatar {
        border-radius: 50%;
        border: 2px solid white;
    }

    // good

    .avatar {
      border-radius: 50%;
      border: 2px solid white;
    }

    ```

*   使用BEM方式，避免使用驼峰式class名

    ```
    // good

    // 地址组件
    // ui统一前缀： yl（云路）
    // 组件名: address
    // component: YlAddress
    <template>
      <div class="yl-address">
        <el-input class="yl-addresss__input"></el-input>
        <yl-address-modal class="yl-address__modal"></yl-address-modal>
      </div>
    </template>

    // component: YlAddressModal
    <template>
      <div class="yl-address-modal">
        <i class="yl-icon-close"></i>
        <header class="yl-address-modal__header yl-address-modal__header--hide">标题</header>
        <div class="yl-address-modal__body">
          <el-select class="yl-select yl-address-modal__province"></el-select>
          <el-select class="yl-select yl-address-modal__city"></el-select>
          <el-select class="yl-select yl-address-modal__county"></el-select>
        </div>
        <footer class="yl-address-modal__footer is-show">底部</footer>
      </div>
    </template>

    ```

*   BEM方式的修饰符modifier

    *   modifier看情况可以抽成一个独立复用的类

    ```
    // good
    <footer class="yl-address-modal__footer yl-address-modal__footer--show"></footer>

    // best
    <footer class="yl-address-modal__footer is-show"></footer>

    ```

*   不要使用ID选择器

    ```
    // bad

    <template>
      <footer id="footer"></footer>
    </template>
    <style>
      #footer {
        // ...
      }
    </style>

    // good

    <template>
      <footer class="footer"></footer>
    </template>
    <style>
      .footer {
        // ...
      }
    </style>

    ```

*   分号

    > 每个属性声明末尾都要加分号；

    ```
    // bad

    .jdc {
      width: 100%
      height: 100%
    }

    // bad

    .jdc {
      width: 100%;
      height: 100%;
    }

    ```

*   属性值引号

    > css属性值需要用到引号时，统一使用单引号

    ```
    // bad

    .jdc { 
      font-family: "Hiragino Sans GB";
    }

    // good

    .jdc { 
      font-family: 'Hiragino Sans GB';
    }

    ```

*   在规则声明的左大括号之前放置一个空格。

    ```
    // bad

    <style>
      .footer{
        // ...
      }
    </style>

    // good

    <style>
      .footer {
        // ...
      }
    </style>

    ```

*   在属性中，在:字符之后（但不能在字符之前）放置一个空格。

    ```
    // bad

    <style>
      .footer{
        font-size:12px;
      }
    </style>

    // good

    <style>
      .footer {
        font-size: 12px;
      }
    </style>

    ```

*   将规则声明的右花括号放在新行上。

    ```
    // bad

    <style>
      .footer{
        font-size: 12px;
      }
    </style>

    // good

    <style>
      .footer {
        font-size: 12px;
      }
    </style>

    ```

*   在规则声明之间放置空白行。

    ```
    // bad

    <style>
      .header{
        // ...
      }
      .footer{
        // ...
      }
    </style>

    // good

    <style>
      .header{
        // ...
      }

      .footer {
        // ...
      }
    </style>

    ```

*   在规则声明中使用多个选择器时，请为每个选择器分配自己的行。

    ```
    // bad

    <style>
      .header, .nav, .footer {
        font-size: 12px;
      }
    </style>

    // good

    <style>
      .header,
      .nav,
      .footer {
        font-size: 12px;
      }
    </style>

    ```

*   使用0代替border的none属性

    ```
    // bad

    .foo {
      border: none;
    }

    // good

    .foo {
      border: 0;
    }

    ```

*   0后面不写单位

    ```
    // bad

    .foo {
      width: 0px;
    }

    // good

    .foo {
      width: 0;
    }

    ```

*   属性书写顺序

    *   布局定位属性：display / position / float / clear / visibility / overflow
    *   自身属性：width / height / margin / padding / border / background
    *   文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
    *   其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

    ```
    .jdc {
      display: block;
      position: relative;
      float: left;
      width: 100px;
      height: 100px;
      margin: 0 10px;
      padding: 20px 0;
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      color: #333;
      background: rgba(0,0,0,.5);
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -o-border-radius: 10px;
      -ms-border-radius: 10px;
      border-radius: 10px;
    }
    
    ```

### SCSS规范

*   @include放在所有选择器的最后

    ```
    // bad

    .btn-green {
      background: green;
      @include transition(background 0.5s ease);
      font-weight: bold;
      // ...
    }

    // good

    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }

    ```

*   规则声明和嵌套选择器之间以及相邻的嵌套选择器之间添加空格

    ```
    // bad

    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      .icon {
        margin-right: 10px;
      }
    }
    // good

    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }

    ```

*   变量命名

    *   优先使用破折号 - 命名，$my-variable
    *   仅在当前文件使用，可以考虑加上 _ 作为前缀

    ```
    // bad

    $myVariable: 12px

    // good

    // 公共scss变量
    $my-variable: 12px

    // 同一个文件
    $_my-variable: 12px

    ```

*   选择器的嵌套深度不能超过三个级别！

    ```
    .page-container {
      .page-content {
        .page-profile {
          // STOP!
        }
      }
    }
    ```