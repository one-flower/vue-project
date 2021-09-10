# JS编码规范

**目录**



### 类型

*   基本类型

    *   字符串
    *   数值
    *   布尔类型
    *   null
    *   undefined

    ```
    const foo = 1
    let bar = foo

    bar = 9

    console.log(foo, bar) // 1, 9

    ```

*   复杂类型

    *   object
    *   array
    *   function

    ```
    const foo = [1, 2, 3]
    const bar = foo
    
    bar[0] = 9
    
    console.log(foo[0], bar[0]) // 9, 9
    
    ```

### 1\. 引用

*   1.1 常量使用const，避免使用var

    ```
    // bad 

    var a =  1 ;
    var b =  2 ;

    // good

    const  a  =  1 ;
    const  b  =  2 ;

    ```

*   1.2 非常量定义，使用let，避免使用var

    ```
    // bad

    var count = 1;
    if (true) {
      count += 1;
    }

    // good

    let count = 1;
    if (true) {
      count += 1;
    }

    ```

*   1.3 let const是块级作用域，所以使用的时候请注意！

    ```
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    
    ```

### 2\. 对象

*   2.1 使用字面量语法定义对象

    ```
    // bad

    const item = new Object();

    // good

    const item = {};

    ```

*   2.2 动态创建对象属性名时，使用计算属性

    ```
    function getKey(k) {
      return `a key named ${k}`;
    }

    // bad

    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good

    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };

    ```

*   2.3 使用简写的对象方法

    ```
    // bad

    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good

    const atom = {
      value: 1,

      addValue(value) {
        return atom.value + value;
      },
    };

    ```

*   2.4 使用简写的对象属性

    ```
    const lukeSkywalker = 'Luke Skywalker';

    // bad

    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good

    const obj = {
      lukeSkywalker,
    };

    ```

*   2.5 在对象声明的开头，对简写属性进行分组

    ```
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad

    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good

    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };

    ```

*   2.6 仅针对无效标识符的属性使用引号

    ```
    // bad

    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };

    // good

    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };

    ```

*   2.7 不直接调用Object.prototype的方法，比如hasOwnProperty, propertyIsEnumerable, and isPrototypeOf

    ```
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    console.log(has.call(object, key));
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    console.log(has(object, key));

    ```

*   2.8 使用扩展运算符，尽量避免使用Object.assign合并，使用扩展运算符还可以按需获取属性

    ```
    // very bad
    
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this
    
    // bad
    
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
    
    // good
    
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
    
    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    
    ```

### 3\. 数组

*   3.1 使用字面量语法创建数组

    ```
    // bad

    const items = new Array();

    // good

    const items = [];

    ```

*   3.2 使用push添加数组，而不是直接分配项目

    ```
    const someStack = [];

    // bad

    someStack[someStack.length] = 'abracadabra';

    // good

    someStack.push('abracadabra');

    ```

*   3.3 使用扩展运算符复制数组

    ```
    // bad

    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }

    // good

    const itemsCopy = [...items];

    ```

*   3.4 使用扩展运算符将可迭代对象转换成数组

    ```
    const foo = document.querySelectorAll('.foo');

    // good

    const nodes = Array.from(foo);

    // best

    const nodes = [...foo];

    ```

*   3.5 使用Array.from将类数组对象转换成数组

    ```
    const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

    // bad

    const arr = Array.prototype.slice.call(arrLike);

    // good

    const arr = Array.from(arrLike);

    ```

*   3.6 使用Array.from而不是扩展...来映射可迭代对象，因为它避免了创建中间数组。

    ```
    // bad

    const baz = [...foo].map(bar);

    // good

    const baz = Array.from(foo, bar);

    ```

*   3.7 如果数组有多行，则在打开和关闭数组括号之前使用换行符

    ```
    // bad
    
    const arr = [
      [0, 1], [2, 3], [4, 5],
    ];
    
    const objectInArray = [{
      id: 1,
    }, {
      id: 2,
    }];
    
    const numberInArray = [
      1, 2,
    ];
    
    // good
    
    const arr = [[0, 1], [2, 3], [4, 5]];
    
    const objectInArray = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    
    const numberInArray = [
      1,
      2,
    ];
    
    ```

### 4\. 解构

*   4.1 在访问和使用多个对象属性时，使用对象结构

    ```
    // bad

    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good

    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best

    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }

    ```

*   4.2 使用数组结构

    ```
    const arr = [1, 2, 3, 4];

    // bad

    const first = arr[0];
    const second = arr[1];

    // good

    const [first, second] = arr;

    ```

*   4.3 对于多个返回值的情况，使用对象解构，而不是数组解构

    ```
    // bad
    
    function processInput(input) {
      // then a miracle occurs
      return [left, right, top, bottom];
    }
    
    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);
    
    // good
    
    function processInput(input) {
      // then a miracle occurs
      return { left, right, top, bottom };
    }
    
    // the caller selects only the data they need
    const { left, top } = processInput(input);
    
    ```

### 5\. 字符串

*   5.1 字符串统一使用单引号的形式 ''

    ```
    // bad

    const name = "Capt. Janeway";

    // bad

    const name = `Capt. Janeway`;

    // good

    const name = 'Capt. Janeway';

    ```

*   5.2 字符串太长的时候，请不要使用换行 \ 和 + 符号

    ```
    // bad

    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad

    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good

    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    ```

*   5.3 不要做无意义转义

    ```
    // bad

    const foo = '\'this\' \i\s \"quoted\"';

    // good

    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;

    ```

*   5.4 程序化生成字符串时，请使用模板字符串

    ```
    const test = 'test'
    
    // bad
    const str = ['a', 'b', test].join()
    
    // bad
    const str = 'a' + 'b' + test
    
    // good
    const str = `ab${test}`
    
    ```

###6\. 数字

*   7.1 使用Number.isNaN代替global isNaN

    > 为什么？全局将isNaN非数字强制转换为数字，对于任何强制转换为NaN的值均返回true。如果需要此行为，请使其明确。

    ```
    // bad

    isNaN('1.2'); // false
    isNaN('1.2.3'); // true

    // good

    Number.isNaN('1.2.3'); // false
    Number.isNaN(Number('1.2.3')); // true

    ```

*   7.2 使用Number.isFinite而不是global isFinite

    > 为什么？全局将isFinite非数字强制为数字，对于任何强制为有限数字的值，都返回true。如果需要此行为，请使其明确。

    ```
    // bad
    
    isFinite('2e3'); // true
    
    // good
    
    Number.isFinite('2e3'); // false
    Number.isFinite(parseInt('2e3', 10)); // true
    
    ```

###7\. 函数

*   7.1 将立即调用的函数表达式包装在括号中

    ```
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());

    ```

*   7.2 不在块级语句里面使用全局函数声明

    ```
    // bad

    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good

    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }

    ```

*   7.3 不在函数参数里面使用关键词arguments，请使用 ...

    > arguments 只是一个类数组，而 ... 是一个真正的数组

    ```
    // bad

    function foo(name, options, arguments) {
      // ...
    }

    // good

    function foo(name, options, args) {
      // ...
    }

    ```

*   7.4 使用扩展运算符 ... 代替arguments

    ```
    // bad

    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // good

    function concatenateAll(...args) {
      return args.join('');
    }

    ```

*   7.5 使用默认参数语法代替函数内部赋值默认值给参数变量

    ```
    // really bad

    function handleThings(opts) {
      // No! We shouldn’t mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }

    // still bad

    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // good

    function handleThings(opts = {}) {
      // ...
    }

    ```

*   7.6 默认参数总是放在最后一位参数

    ```
    // bad

    function handleThings(opts = {}, name) {
      // ...
    }

    // good

    function handleThings(name, opts = {}) {
      // ...
    }

    ```

*   7.7 不使用函数构造器构建函数

    ```
    // bad

    var add = new Function('a', 'b', 'return a + b');

    // still bad

    var subtract = Function('a', 'b', 'return a - b');

    ```

*   7.8 函数签名之间空一格

    ```
    // bad

    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good

    const x = function () {};
    const y = function a() {};

    ```

*   7.9 不修改参数源

    ```
    // bad

    function f1(obj) {
      obj.key = 1;
    }

    // good

    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    }

    ```

*   7.10 不重新分配参数

    ```
    // bad

    function f1(a) {
      a = 1;
      // ...
    }

    function f2(a) {
      if (!a) { a = 1; }
      // ...
    }

    // good

    function f3(a) {
      const b = a || 1;
      // ...
    }

    function f4(a = 1) {
      // ...
    }

    ```

*   7.11 使用扩展运算符 ... 调用可变参数

    ```
    // bad

    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good

    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad

    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // good

    new Date(...[2016, 8, 5]);

    ```

*   7.12 具有多行签名或调用的函数应像本指南中的其他所有多行列表一样缩进：每个项目单独一行，最后一个项目后面带有逗号

    ```
    // bad
    
    function foo(bar,
                baz,
                quux) {
      // ...
    }
    
    // good
    
    function foo(
      bar,
      baz,
      quux,
    ) {
      // ...
    }
    
    // bad
    
    console.log(foo,
      bar,
      baz);
    
    // good
    
    console.log(
      foo,
      bar,
      baz,
    );
    
    ```

### 8\. 箭头函数

*   8.1 当您必须使用匿名函数时（如传递内联回调时），请使用箭头函数符号。

    ```
    // bad

    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });

    // good

    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    ```

*   8.2 如果函数主体由返回无副作用的表达式的单个语句组成，请省略花括号并使用隐式返回。否则，请保留括号并使用return语句

    ```
    // bad
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number) => `A string containing the ${number + 1}.`);

    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number,
    }));

    // No implicit return with side effects
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }

    let bool = false;

    // bad
    foo(() => bool = true);

    // good
    foo(() => {
      bool = true;
    });

    ```

*   8.3 如果表达式跨越多行，请将其括在括号中以提高可读性。

    ```
    // bad
    ['get', 'post', 'put'].map((httpMethod) => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );

    // good
    ['get', 'post', 'put'].map((httpMethod) => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));

    ```

*   8.4 为了清楚和一致起见，请始终在参数周围加上括号

    ```
    // bad
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map((x) => x * x);

    // bad
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // good
    [1, 2, 3].map((number) => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // bad
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    ```

*   8.5 避免将箭头函数语法（=>）与比较运算符（<=，>=）混淆

    ```
    // bad
    const itemHeight = (item) => item.height <= 256 ? item.largeSize : item.smallSize;

    // bad
    const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = (item) => (item.height <= 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height <= 256 ? largeSize : smallSize;
    };

    ```

*   8.6 使用隐式返回值强制箭头函数体的位置

    ```
    // bad
    (foo) =>
      bar;
    
    (foo) =>
      (bar);
    
    // good
    (foo) => bar;
    (foo) => (bar);
    (foo) => (
      bar
    )
    
    ```

### 9\. 类和构造器

*   9.1 总是使用 class，避免直接使用 prototype

    ```
    // bad
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };

    // good
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }

    ```

*   9.2 使用extends继承

    ```
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this.queue[0];
    };

    // good
    class PeekableQueue extends Queue {
      peek() {
        return this.queue[0];
      }
    }

    ```

*   9.3 方法中通过return this来实现链式操作

    ```
    // bad
    Jedi.prototype.jump = function () {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function (height) {
      this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }

      setHeight(height) {
        this.height = height;
        return this;
      }
    }

    const luke = new Jedi();

    luke.jump()
      .setHeight(20);

    ```

*   9.4 如果未指定类，则类有默认的构造函数，不需要空的构造函数或仅委托给父类的构造函数

    ```
    // bad
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // bad
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }

    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }

    ```

*   9.5 避免定义重复属性

    ```
    // bad
    class Foo {
      bar() { return 1; }
      bar() { return 2; }
    }
    
    // good
    class Foo {
      bar() { return 1; }
    }
    
    // good
    class Foo {
      bar() { return 2; }
    }
    
    ```

### 10\. 模块

*   10.1 使用标准的 ES6 模块语法 import/export，优先按需导入

    ```
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;

    ```

*   10.2 仅从一个路径导入文件

    ```
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';

    // good
    import foo, { named1, named2 } from 'foo';

    // good
    import foo, {
      named1,
      named2,
    } from 'foo';

    ```

*   10.3 不要导出可变变量

    ```
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };

    ```

*   10.4 在具有单个导出的模块中，首选默认导出而不是命名导出

    ```
    // bad
    export function foo() {}

    // good
    export default function foo() {}

    ```

*   10.5 所有import语句都写在非导入语句上面

    ```
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();

    ```

*   10.6 多行导入应该像多行数组和对象文字一样缩进。

    ```
    // bad
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

    // good
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';

    ```

*   10.7 在模块import语句中禁止Webpack加载器语法

    ```
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';
    
    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    
    ```

### 11\. 生成器与迭代器

*   11.1 不要使用迭代器。更喜欢JavaScript的高阶函数，而不是像for-in或那样的循环for-of

    > 为什么？这执行了我们不变的规则。处理返回值的纯函数比副作用更容易推论。

    > 使用map()/ every()/ filter()/ find()/ findIndex()/ reduce()/ some()/ ... ...遍历数组，和Object.keys()/ Object.values()/ Object.entries()产生数组，以便可以遍历对象。

    ```
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => {
      sum += num;
    });
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
      increasedByOne.push(numbers[i] + 1);
    }

    // good
    const increasedByOne = [];
    numbers.forEach((num) => {
      increasedByOne.push(num + 1);
    });

    // best (keeping it functional)
    const increasedByOne = numbers.map((num) => num + 1);

    ```

*   11.2 如果必须使用生成器，或者不考虑我们的建议，请确保它们的功能签名间距正确

    ```
    // bad
    function * foo() {
      // ...
    }
    
    // bad
    const bar = function * () {
      // ...
    };
    
    // bad
    const baz = function *() {
      // ...
    };
    
    // bad
    const quux = function*() {
      // ...
    };
    
    // bad
    function*foo() {
      // ...
    }
    
    // bad
    function *foo() {
      // ...
    }
    
    // very bad
    function
    *
    foo() {
      // ...
    }
    
    // very bad
    const wat = function
    *
    () {
      // ...
    };
    
    // good
    function* foo() {
      // ...
    }
    
    // good
    const foo = function* () {
      // ...
    };
    
    ```

### 12\. 点属性

*   12.1 访问属性的时候使用点符号

    ```
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;

    ```

*   12.2 访问变量属性时使用方括号表示法 []

    ```
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');

    ```

*   12.3 使用指数运算符 ** 计算指数

    ```
    // bad
    const binary = Math.pow(2, 10);
    
    // good
    const binary = 2 ** 10;
    
    ```

### 13\. 变量

*   13.1 始终使用const或let声明变量。不这样做将导致全局变量。我们要避免污染全局名称空间

    ```
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();

    ```

*   13.2 每个变量或赋值使用一个const或let声明

    > 为什么？这样添加新的变量声明会更容易，而且您不必担心将a换成;a ,或引入仅标点符号的diff。您也可以使用调试器逐步执行每个声明，而不是一次跳过所有声明。

    ```
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';

    ```

*   13.3 将所有的const let进行分组

    > 为什么？以后您可能需要根据先前分配的变量之一分配变量时，这很有用。

    ```
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;

    ```

*   13.4 在需要的地方分配变量，但将其放置在合理的位置。

    > 为什么？let并且const是块作用域而不是函数作用域。

    ```
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    ```

*   13.5 不使用链式变量赋值

    > 为什么？链接变量分配会创建隐式全局变量。

    ```
    // bad
    (function example() {
      // JavaScript interprets this as
      // let a = ( b = ( c = 1 ) );
      // The let keyword only applies to variable a; variables b and c become
      // global variables.
      let a = b = c = 1;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError

    // the same applies for `const`

    ```

*   13.6 避免使用一元增减（++，--）

    > 为什么？根据eslint文档，一元增量和减量语句会自动插入分号，并且会因应用程序中的值增减而导致静默错误。使用诸如num += 1而不是num++或的语句来改变您的值也更具表现力num ++。禁止一元递增和递减语句还可以防止无意中对值进行预递增/预递减，这也可能导致程序出现意外行为。

    ```
    // bad

    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;

    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      sum += value;
      if (value) {
        truthyCount++;
      }
    }

    // good

    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;

    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;

    ```

*   13.7 =在作业之前或之后避免换行。如果您的分配违反max-len，则将值括在括号中

    > 为什么？周围的换行符=可能会使分配的值不是期望值。

    ```
    // bad
    const foo =
      superLongLongLongLongLongLongLongLongFunctionName();

    // bad
    const foo
      = 'superLongLongLongLongLongLongLongLongString';

    // good
    const foo = (
      superLongLongLongLongLongLongLongLongFunctionName()
    );

    // good
    const foo = 'superLongLongLongLongLongLongLongLongString';

    ```

*   13.8 禁止定义不使用的变量或参数

    ```
    // bad
    
    var some_unused_var = 42;
    
    // Write-only variables are not considered as used.
    var y = 10;
    y = 5;
    
    // A read for a modification of itself is not considered as used.
    var z = 0;
    z = z + 1;
    
    // Unused function arguments.
    function getX(x, y) {
        return x;
    }
    
    // good
    
    function getXPlusY(x, y) {
      return x + y;
    }
    
    var x = 1;
    var y = a + 2;
    
    alert(getXPlusY(x, y));
    
    // 'type' is ignored even if unused because it has a rest property sibling.
    // This is a form of extracting an object that omits the specified keys.
    var { type, ...coords } = data;
    // 'coords' is now the 'data' object without its 'type' property.
    
    ```

### 14\. 比较运算符与等号运算符

*   14.1 使用 === !==，不使用 == !=

    > == != 会隐式转换类型比较

    ```
    // bad

    if (isActive == 1) {
      // ... 
    }

    if (isActive != 1) {
      // ... 
    }

    // good

    if (isActive === 1) {
      // ... 
    }

    if (isActive !== 1) {
      // ... 
    }

    ```

*   14.2 布尔值使用简写，但是对于字符串和数字要做显示比较

    ```
    // bad
    if (isValid === true) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }

    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }

    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }

    ```

*   14.3 使用大括号来创建块case和default包含词汇声明（例如let，const，function，和class

    ```
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {
          // ...
        }
        break;
      default:
        class C {}
    }

    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {
          // ...
        }
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }

    ```

*   14.4 三元数不应嵌套，并且通常是单行表达式

    ```
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // split into 2 separated ternary expressions
    const maybeNull = value1 > value2 ? 'baz' : null;

    // better
    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;

    ```

*   14.5 避免不必要的三元语句

    ```
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;

    ```

*   14.6 混合运算符时，请将其括在括号中。唯一的例外是标准的算术运算符：+，-，和**因为它们的优先级被广义地理解。我们建议将括起来/并*放在括号中，因为当它们混合使用时，它们的优先级可能会模棱两可

    > 为什么？这提高了可读性并阐明了开发人员的意图。

    ```
    // bad
    const foo = a && b < 0 || c > 0 || d + 1 === 0;
    
    // bad
    const bar = a ** b - 5 % d;
    
    // bad
    // one may be confused into thinking (a || b) && c
    if (a || b && c) {
      return d;
    }
    
    // bad
    const bar = a + b / c * d;
    
    // good
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
    
    // good
    const bar = a ** b - (5 % d);
    
    // good
    if (a || (b && c)) {
      return d;
    }
    
    // good
    const bar = a + (b / c) * d;
    
    ```

### 15\. 块

*   15.1 将括号与所有多行块一起使用

    ```
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
      return false;
    }

    ```

*   15.2 使用if else做多行块时，请保证else放在if语句块关闭的同一行

    ```
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }

    ```

*   15.3 如果一个if块始终执行一条return语句，else则不需要随后的块。甲return在else if一个下面的块if包含块return可以被分成多个if块

    ```
    // bad
    function foo() {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    
    // bad
    function cats() {
      if (x) {
        return x;
      } else if (y) {
        return y;
      }
    }
    
    // bad
    function dogs() {
      if (x) {
        return x;
      } else {
        if (y) {
          return y;
        }
      }
    }
    
    // good
    function foo() {
      if (x) {
        return x;
      }
    
      return y;
    }
    
    // good
    function cats() {
      if (x) {
        return x;
      }
    
      if (y) {
        return y;
      }
    }
    
    // good
    function dogs(x) {
      if (x) {
        if (z) {
          return y;
        }
      } else {
        return z;
      }
    }
    
    ```

### 16\. 条件声明

*   16.1 如果您的控制语句（if，while等）过长或超过最大行长，则每个（分组的）条件都可以放在新的行中。逻辑运算符应从此行开始。

    > 为什么？在行的开头要求运算符使运算符保持对齐并遵循类似于方法链接的模式。通过更轻松地从视觉上遵循复杂的逻辑，这也提高了可读性。

    ```
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }
    
    // bad
    if (foo === 123 &&
      bar === 'abc') {
      thing1();
    }
    
    // bad
    if (foo === 123
      && bar === 'abc') {
      thing1();
    }
    
    // bad
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }
    
    // good
    if (
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }
    
    // good
    if (
      (foo === 123 || bar === 'abc')
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      thing1();
    }
    
    // good
    if (foo === 123 && bar === 'abc') {
      thing1();
    }
    
    ```

### 17\. 注释

*   17.1 多行注释使用/** ... */

    ```
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
    * make() returns a new element
    * based on the passed-in tag name
    */
    function make(tag) {

      // ...

      return element;
    }

    ```

*   17.2 使用//的单行注释。将单行注释放在注释主题上方的换行符上。除非注释位于块的第一行，否则在注释之前放置一个空行。

    ```
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }

    ```

*   17.3 在所有注释的开头加一个空格，以使其易于阅读

    ```
    // bad
    //is current tab
    const active = true;
    
    // good
    // is current tab
    const active = true;
    
    // bad
    /**
    *make() returns a new element
    *based on the passed-in tag name
    */
    function make(tag) {
    
      // ...
    
      return element;
    }
    
    // good
    /**
    * make() returns a new element
    * based on the passed-in tag name
    */
    function make(tag) {
    
      // ...
    
      return element;
    }
    
    ```

### 18\. 空格

*   18.1 使用设置为2个空格的软标签（空格字符）

    ```
    // bad
    function foo() {
    ∙∙∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙let name;
    }

    ```

*   18.2 大括号前面放置一个空格

    ```
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    ```

*   18.3 在控制语句（if，while等）中，在圆括号前放置1个空格。在函数调用和声明中，参数列表和函数名称之间不能留空格

    ```
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }

    ```

*   18.4 用空格隔开运算符

    ```
    // bad
    const x=y+5;

    // good
    const x = y + 5;

    ```

*   18.5 使用单个换行符结束文件

    ```
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;

    ```

    ```
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵

    ```

    ```
    // good
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵

    ```

*   18.6 使用多个链式操作方法时（大于2个以上），使用缩进。使用前导点来强调这是调用而不是新语句

    ```
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);

    ```

*   18.7 在块之后和下一条语句之前保留空白行。

    ```
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;

    ```

*   18.8 不要用空行填充块

    ```
    // bad
    function bar() {

      console.log(foo);

    }

    // bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // bad
    class Foo {

      constructor(bar) {
        this.bar = bar;
      }
    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }

    ```

*   18.9 请勿使用多个空行来填充代码

    ```
    // bad
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;

        this.email = email;

        this.setAge(birthday);
      }

      setAge(birthday) {
        const today = new Date();

        const age = this.getAge(today, birthday);

        this.age = age;
      }

      getAge(today, birthday) {
        // ..
      }
    }

    // good
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;
        this.email = email;
        this.setAge(birthday);
      }

      setAge(birthday) {
        const today = new Date();
        const age = getAge(today, birthday);
        this.age = age;
      }

      getAge(today, birthday) {
        // ..
      }
    }

    ```

*   18.10 不要圆括号内添加空格

    ```
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }

    ```

*   18.11 不要再方括号内 [] 添加空格

    ```
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);

    ```

*   18.12 在花括号 {} 内添加空格

    ```
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };

    ```

*   18.13 避免使用超过100个字符（包括空格）的代码行。注意：按照上述，长字符串不受此规则约束，不应分解

    ```
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));

    ```

*   18.14 在计算的属性括号内强制使用间距

    ```
    // bad
    obj[foo ]
    obj[ 'foo']
    var x = {[ b ]: a}
    obj[foo[ bar ]]

    // good
    obj[foo]
    obj['foo']
    var x = { [b]: a }
    obj[foo[bar]]

    ```

*   18.15 避免在函数及其调用之间留空格

    ```
    // bad
    func ();

    func
    ();

    // good
    func();

    ```

*   18.16 在对象文字属性中的键和值之间强制间隔

    ```
    // bad
    var obj = { "foo" : 42 };
    var obj2 = { "foo":42 };

    // good
    var obj = { "foo": 42 };

    ```

*   18.17 避免在行尾使用空格

*   18.18 避免出现多个空行，仅在文件末尾允许一个换行符，并在文件开始时避免换行符

    ```
    // bad - multiple empty lines
    var x = 1;
    
    var y = 2;
    
    // bad - 2+ newlines at end of file
    var x = 1;
    var y = 2;
    
    // bad - 1+ newline(s) at beginning of file
    
    var x = 1;
    var y = 2;
    
    // good
    var x = 1;
    var y = 2;
    
    ```

### 19\. 逗号

*   19.1 使用尾随逗号

    > 为什么？这将导致更干净的git diff。同样，像Babel这样的编译器也将删除已编译代码中的其他尾部逗号，这意味着您不必担心传统浏览器中的尾部逗号问题。

    ```
    // bad - git diff without trailing comma
    const hero = {
        firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };

    ```

    ```
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    );

    ```

*   19.2 使用Number用于类型转换，并且parseInt始终使用基数来解析字符串

    ```
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);

    ```

*   19.3 如果出于某种原因您正在做一些疯狂的事情，并且parseInt是瓶颈，并且出于性能原因而需要使用Bitshift ，请在注释中说明原因和原因。

    ```
    // good
    /**
    * parseInt was the reason my code was slow.
    * Bitshifting the String to coerce it to a
    * Number made it a lot faster.
    */
    const val = inputValue >> 0;

    ```

*   19.4 布尔值使用

    ```
    const age = 0;
    
    // bad
    const hasAge = new Boolean(age);
    
    // good
    const hasAge = Boolean(age);
    
    // best
    const hasAge = !!age;
    
    ```

### 20\. 命名约定

*   20.1 避免使用单个字母名称。用您的命名来描述

    ```
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }

    ```

*   20.2 在命名对象，函数和实例时，请使用camelCase

    ```
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}

    ```

*   20.3 仅在命名构造函数或类时使用PascalCase

    ```
    // bad
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: 'nope',
    });

    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: 'yup',
    });

    ```

*   20.4 请勿使用下划线或前划线

    > 为什么？JavaScript在属性或方法方面没有隐私的概念。尽管下划线是表示“私有”的通用约定，但实际上，这些属性是完全公开的，因此是您的公共API合同的一部分。这个约定可能导致开发人员错误地认为更改不会被视为破坏或不需要测试。tl; dr：如果您希望某些东西是“私有的”，则一定不能将其明显地存在。

    ```
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';

    // good, in environments where WeakMaps are available
    // see https://kangax.github.io/compat-table/es6/#test-WeakMap
    const firstNames = new WeakMap();
    firstNames.set(this, 'Panda');

    ```

*   20.5 不要保存对的引用this。使用箭头函数或Function＃bind

    ```
    // bad
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }

    // bad
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }

    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }

    ```

*   20.6 基本文件名应与默认导出文件名完全匹配

    ```
    // file 1 contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() { return 42; }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
    import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
    import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
    import forty_two from './forty_two'; // snake_case import/filename, camelCase export
    import inside_directory from './inside_directory'; // snake_case import, camelCase export
    import index from './inside_directory/index'; // requiring the index file explicitly
    import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

    // good
    import CheckBox from './CheckBox'; // PascalCase export/import/filename
    import fortyTwo from './fortyTwo'; // camelCase export/import/filename
    import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js

    ```

*   20.7 导出默认功能时，请使用camelCase。文件名应与函数名称相同。

    ```
    function makeStyleGuide() {
      // ...
    }

    export default makeStyleGuide;

    ```

*   20.8 在导出构造函数/类/单例/函数库/裸对象时使用PascalCase。

    ```
    const AirbnbStyleGuide = {
      es6: {
      },
    };

    export default AirbnbStyleGuide;

    ```

*   20.9 首字母缩写词和首字母缩写应始终全部大写或全部小写。

    ```
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
      // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
      // ...
    ];

    // also good
    const httpRequests = [
      // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const requests = [
      // ...
    ];

    ```

*   20.10 您可以选择仅在以下情况下将常量大写：已导出是一个const（不能重新分配），并且程序员可以相信它（及其嵌套属性）永不更改

    *   那所有const变量呢？-这是不必要的，因此大写不应用于文件中的常量。但是，应将其用于导出的常量。
    *   导出的对象呢？-在导出的顶层使用大写字母（例如EXPORTED_OBJECT.key），并保持所有嵌套属性不变。

    ```
    // bad
    const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

    // bad
    export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

    // bad
    export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

    // ---

    // allowed but does not supply semantic value
    export const apiKey = 'SOMEKEY';

    // better in most cases
    export const API_KEY = 'SOMEKEY';

    // ---

    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
      KEY: 'value'
    };

    // good
    export const MAPPING = {
      key: 'value'
    };

    ```

*   20.11 如果属性/方法是a boolean，请使用isVal()或hasVal()

    ```
    // bad
    if (!dragon.age()) {
      return false;
    }
    
    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```