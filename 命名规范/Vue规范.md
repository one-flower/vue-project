# Vue编码规范

> 本文主要是根据Vue官方文档编写的规范


## 命名约定

*   **组件名为多个单词**

    *   组件名应该始终是多个单词的，根组件 App 以及 transition、component 之类的 Vue 内置组件除外。
    *   这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

    ```
    // bad

    Vue.component('todo', {
      // ...
    })

    export default {
      name: 'Todo',
      // ...
    }

    ```

    ```
    // good

    Vue.component('todo-item', {
      // ...
    })

    export default {
      name: 'TodoItem',
      // ...
    }

    ```

*   **单文件组件文件**

    *   单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)
    *   单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

    ```
    // bad

    components/
    |- mycomponent.vue

    components/
    |- myComponent.vue

    ```

    ```
    // good

    components/
    |- MyComponent.vue

    ```

*   **基础组件名**

    *   应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。

    ```
    // bad

    components/
    |- MyButton.vue
    |- VueTable.vue
    |- Icon.vue

    ```

    ```
    // good

    components/
    |- BaseButton.vue
    |- BaseTable.vue
    |- BaseIcon.vue

    components/
    |- AppButton.vue
    |- AppTable.vue
    |- AppIcon.vue

    components/
    |- VButton.vue
    |- VTable.vue
    |- VIcon.vue

    ```

*   **单例组件名**

    *   只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
    *   这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

    ```
    // bad

    components/
    |- Heading.vue
    |- MySidebar.vue

    ```

    ```
    // good

    components/
    |- TheHeading.vue
    |- TheSidebar.vue

    ```

*   **紧密耦合的组件名**

    *   和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
    *   如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

    ```
    // bad

    components/
    |- TodoList.vue
    |- TodoItem.vue
    |- TodoButton.vue

    components/
    |- SearchSidebar.vue
    |- NavigationForSearchSidebar.vue

    ```

    ```
    // good

    components/
    |- TodoList.vue
    |- TodoListItem.vue
    |- TodoListItemButton.vue

    components/
    |- SearchSidebar.vue
    |- SearchSidebarNavigation.vue

    ```

*   **组件名中的单词顺序**

    *   组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

    ```
    // bad

    components/
    |- ClearSearchButton.vue
    |- ExcludeFromSearchInput.vue
    |- LaunchOnStartupCheckbox.vue
    |- RunSearchButton.vue
    |- SearchInput.vue
    |- TermsCheckbox.vue

    ```

    ```
    // good

    components/
    |- SearchButtonClear.vue
    |- SearchButtonRun.vue
    |- SearchInputQuery.vue
    |- SearchInputExcludeGlob.vue
    |- SettingsCheckboxTerms.vue
    |- SettingsCheckboxLaunchOnStartup.vue

    ```

*   **自闭合组件**

    *   在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。
    *   自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。
    *   不幸的是，HTML 并不支持自闭合的自定义元素——只有官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

    ```
    // bad

    <!-- 在单文件组件、字符串模板和 JSX 中 -->
    <MyComponent></MyComponent>

    <!-- 在 DOM 模板中 -->
    <my-component/>

    ```

    ```
    // good

    <!-- 在单文件组件、字符串模板和 JSX 中 -->
    <MyComponent/>

    <!-- 在 DOM 模板中 -->
    <my-component></my-component>

    ```

*   **模板中的组件名大小写**

    *   对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该总是 PascalCase 的——但是在 DOM 模板中总是 kebab-case 的。
    *   由于 HTML 是大小写不敏感的，在 DOM 模板中必须仍使用 kebab-case。
    *   还请注意，如果你已经是 kebab-case 的重度用户，那么与 HTML 保持一致的命名约定且在多个项目中保持相同的大小写规则就可能比上述优势更为重要了。在这些情况下，在所有的地方都使用 kebab-case 同样是可以接受的。

    ```
    // bad

    <!-- 在单文件组件和字符串模板中 -->
    <mycomponent/>

    <!-- 在单文件组件和字符串模板中 -->
    <myComponent/>

    <!-- 在 DOM 模板中 -->
    <MyComponent></MyComponent>

    ```

    ```
    // good

    <!-- 在单文件组件和字符串模板中 -->
    <MyComponent/>

    <!-- 在 DOM 模板中 -->
    <my-component></my-component>

    或者

    <!-- 在所有地方 -->
    <my-component></my-component>

    ```

*   **完整单词的组件名**

    *   组件名应该倾向于完整单词而不是缩写。
    *   编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

    ```
    // bad

    components/
    |- SdSettings.vue
    |- UProfOpts.vue

    ```

    ```
    // good

    components/
    |- StudentDashboardSettings.vue
    |- UserProfileOptions.vue

    ```

*   **Prop名命名**

    *   在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。
    *   我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

    ```
    // bad
    
    props: {
      'greeting-text': String
    }
    
    <WelcomeMessage greetingText="hi"/>
    
    ```

    ```
    // good
    
    props: {
      greetingText: String
    }
    
    <WelcomeMessage greeting-text="hi"/>
    
    ```

## 通用规范

*   **组件的 data 必须是一个函数**

    *   当 data 的值是一个对象时，它会在这个组件的所有实例之间共享

    ```
    // bad

    Vue.component('some-comp', {
      data: {
        foo: 'bar'
      }
    })

    export default {
      data: {
        foo: 'bar'
      }
    }

    ```

    ```
    // good

    Vue.component('some-comp', {
      data: function () {
        return {
          foo: 'bar'
        }
      }
    })

    // In a .vue file
    export default {
      data () {
        return {
          foo: 'bar'
        }
      }
    }

    ```

*   **Prop定义应该尽量详细**

    *   在你提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。
    *   它们写明了组件的 API，所以很容易看懂组件的用法；
    *   在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。

    ```
    // bad

    // 这样做只有开发原型系统时可以接受
    props: ['status']

    ```

    ```
    // good

    props: {
      status: String
    }

    ```

    ```
    // best

    props: {
      status: {
        type: String,
        required: true,
        validator: function (value) {
          return [
            'syncing',
            'synced',
            'version-conflict',
            'error'
          ].indexOf(value) !== -1
        }
      }
    }

    ```

*   **为 v-for 设置键值**

    > 总是用 key 配合 v-for。

    > 在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态

    ```
    // bad

    <ul>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ul>

    ```

    ```
    // good

    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
      >
        {{ todo.text }}
      </li>
    </ul>

    ```

*   **避免把 v-if 和 v-for 同时用在同一个元素上**

    *   为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。
    *   为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)。

    ```
    // bad

    <ul>
      <li
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>

    ```

    ```
    // good

    <ul>
      <li
        v-for="user in activeUsers"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>

    ```

*   **对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

    *   这条规则只和单文件组件有关。你不一定要使用 scoped 特性。设置作用域也可以通过 CSS Modules，那是一个基于 class 的类似 BEM 的策略，当然你也可以使用其它的库或约定。
    *   这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。
    *   不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 scoped 特性。

    ```
    // bad
    <template>
      <button class="btn btn-close">X</button>
    </template>

    <style>
    .btn-close {
      background-color: red;
    }
    </style>

    ```

    ```
    // good

    <template>
      <button class="button button-close">X</button>
    </template>

    <!-- 使用 `scoped` 特性 -->
    <style scoped>
    .button {
      border: none;
      border-radius: 2px;
    }

    .button-close {
      background-color: red;
    }
    </style>

    ```

    ```
    // good

    <template>
      <button class="c-Button c-Button--close">X</button>
    </template>

    <!-- 使用 BEM 约定 -->
    <style>
    .c-Button {
      border: none;
      border-radius: 2px;
    }

    .c-Button--close {
      background-color: red;
    }
    </style>

    ```

*   **私有属性**

    *   使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，就始终为插件、混入等不考虑作为对外公共 API 的自定义私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 $*yourPluginName*)。

    ```
    // bad
    
    var myGreatMixin = {
      // ...
      methods: {
        update: function () {
          // ...
        }
      }
    }
    
    var myGreatMixin = {
      // ...
      methods: {
        _update: function () {
          // ...
        }
      }
    }
    
    var myGreatMixin = {
      // ...
      methods: {
        $_update: function () {
          // ...
        }
      }
    }
    
    ```

    ```
    // good
    
    var myGreatMixin = {
      // ...
      methods: {
        $_myGreatMixin_update: function () {
          // ...
        }
      }
    }
    
    ```

    ```
    // best
    
    var myGreatMixin = {
      // ...
      methods: {
        publicMethod() {
          // ...
          myPrivateFunction()
        }
      }
    }
    
    function myPrivateFunction() {
      // ...
    }
    
    export default myGreatMixin
    ```