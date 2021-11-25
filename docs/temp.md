> encodeURIComponent()函数通过将一个，两个，三个或四个表示字符的UTF-8编码的转义序列替换某些字符的每个实例来编码 URI （对于由两个“代理”字符组成的字符而言，将仅是四个转义序列）

> encodeURI()  函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

encodeURIComponent 转义除了如下所示外的所有字符：

```javascript
A-Z a-z 0-9 - _ . ! ~ * ' ( )
```

encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的UTF-8转义序列：
```javascript
; , / ? : @ & = + $
字母 数字 - _ . ! ~ * ' ( )
#
```

通常使用`encodeURIComponent`对URL进行编码

编码表：

|字符|编码|字符|编码|字符|编码|字符|编码|字符|编码|
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
|backspace|8%|A|41%|a|61%|§|%A7|Õ|%D5|
|tab|9%|B|42%|b|62%|«|%AB|Ö|%D6|
|linefeed|%0A|C|43%|c|63%|¬|%AC|Ø|%D8| 
|creturn|%0D|D|44%|d|64%|¯|%AD|Ù|%D9| 
|space|20%|E|45%|e|65%|º|%B0|Ú|%DA|
|!|21%|F|46%|f|66%|±|%B1|Û|%DB|	 
|"|22%|G|47%|g|67%|ª|%B2|Ü|%DC|	 
|#|23%|H|48%|h|68%|,|%B4|Ý|%DD|
|$|24%|I|49%|i|69%|µ|%B5|Þ|%DE|	 
|%|25%|J|%4A|j|%6A|»|%BB|ß|%DF| 
|&|26%|K|%4B|k|%6B|¼|%BC|à|%E0|
|'|27%|L|%4C|l|%6C|½|%BD|á|%E1|
|(|28%|M|%4D|m|%6D|¿|%BF|â|%E2|
|)|29%|N|%4E|n|%6E|À|%C0|ã|%E3|
|*|%2A|O|%4F|o|%6F|Á|%C1|ä|%E4|	 
|+|%2B|P|50%|p|70%|Â|%C2|å|%E5| 
|,|%2C|Q|51%|q|71%|Ã|%C3|æ|%E6|	 
|-|%2D|R|52%|r|72%|Ä|%C4|ç|%E7|	 
|.|%2E|S|53%|s|73%|Å|%C5|è|%E8|	 
|/|%2F|T|54%|t|74%|Æ|%C6|é|%E9|	 
|0|30%|U|55%|u|75%|Ç|%C7|ê|%EA|	 
|1|31%|V|56%|v|76%|È|%C8|ë|%EB|	 
|2|32%|W|57%|w|77%|É|%C9|ì|%EC|	 
|3|33%|X|58%|x|78%|Ê|%CA|í|%ED|	 
|4|34%|Y|59%|y|79%|Ë|%CB|î|%EE|	 
|5|35%|Z|%5A|z|%7A|Ì|%CC|ï|%EF|	 
|6|36%|||||||ð|%F0|
|7|37%|?|%3F|{|%7B|Í|%CD|ñ|%F1|
|8|38%|@|40%|\||%7C|Î|%CE|ò|%F2|
|9|39%|[|%5B|}|%7D|Ï|%CF|ó|%F3|	 
|:|%3A|\ |%5C|~|%7E|Ð|%D0|ô|%F4|	 
|;|%3B|]|%5D|¢|%A2|Ñ|%D1|õ|%F5|	 
|<|%3C|^|%5E|£|%A3|Ò|%D2|ö|%F6|	 
|=|%3D|_|%5F|¥|%A5|Ó|%D3|÷|%F7|	 
|>|%3E|`|60%|\||%A6|Ô|%D4|ø|%F8|
|||||||||ù|%F9|	 







# CSS选器分类

## 通配符选择器

```css
*{
    margin:0;
    padding:0;
}

```

## 元素（标签）选择器

```css
p{
    color:red;
}
```

## 类选择器

```css
.warning{
    color:red;
}
```

## ID选择器

```css
#warning{
    color:red;
}
```

***优先级***

!important>行内样式>ID选择器>类、伪类、属性>元素、伪元素>继承>通配符

## 属性选取器

```html
<ul>
    <li foo>1</li>
    <li foo="abc">2</li>
    <li foo="abc efj">3</li>
    <li foo="abcefj">4</li>
    <li foo="efjabc">5</li>
    <li foo="ab">6</li>
</ul>
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-e53cedd3b98444769f0b160592456a20.png)

### [attribute]

```css
[foo]{
    background-color:red;
}
```

> 选择所有带 `foo` 属性的元素

![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-ef76717c3f0f48afa87978797a06d6f6.png)

### [attribute=value]

> 选择 attribute=value 的所有元素。

```css
[foo=abc]{
    background-color:red;
}
```

![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-17579b77f2794cbf9e8f4a7c71867860.png)

### [attribute^=value]

> 选择其`attribute`属性值以`value`开头的所有元素。类似正则的`^`,以什么开始

```css
[foo^=abc]{
    background-color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-51c968c7ef9c459799bdbae42985f756.png)

### [attribute$=value]

> 选择其`attribute`属性值以`value`结束的所有元素。类似正则的`$`,以什么结束

```css
[foo$=abc]{
    background-color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-5368414f568d4ad3822bb1b58c7bc83d.png)

### [attribute*=value]

> 选择其`attribute`属性中包含`value`子串的每个元素。

```css
[foo*=abc]{
    background-color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-774df3153d1b4ef0a3bdfdb4f84c09c5.png)

### [attribute|=value]

> 选择`attribute`属性值以`value`开头的所有元素。

```css
[foo|=abc]{
    background-color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-eb175616840f445eab7903a4065f9b07.png)

## 文档结构选择器

```html
<ul>
    <li>
        <h1>h1</h1>
        <p>p1</p>
    </li>
    <li>
        <h1>h1</h1>
        <p>p1</p>
    </li>
</ul>
```

![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-c70d96ab96be44a69331e45e6e7ed567.png)

### 后代选择器 element element

> 选择`element`元素内部的所有`element`元素。

```css
ul li{
    border: 1px solid red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-0a92d8214beb4cb5b15c79e113fadf83.png)

### 子选择器 element>element

> 选择父元素为`element`元素的所有`element`子元素。

```css
ul>li>p{
   border: 1px solid red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-c93985e34a8e401aac2529170997b5fc.png)

### 相邻兄弟选择器 element+element

> 选择紧接在`element`元素之后的`element`元素。

```html
<div>
    <h1>h1</h1>
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
</div>
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-71ba73192aa543e68a4aa275a79bbd4a.png)

```css
h1+p{
    color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-e0a2cb4c51c1474fab9364ec105500de.png)

### 一般兄弟选择器 element1~element2

> 选择前面有 element1 元素的每个 elem 元素。

```html
<div>
    <h1>h1</h1>
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
</div>
```

![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-b818ba1698e54ec694d23dd801808501.png)

```css
 h1~p{
   border: 1px solid red;
}
```

![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-3ff4bcfa7c0e408e97727f2610baebef.png)

## 伪类选择器

### :root 文档根元素伪类

```css
:root{
    background-color:red;
}
```

### :nth-child(n) 孩子选择器

```html
<div>
    <h1>h1</h1>
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
</div>
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-3454eb0ff598423a9fcfa96812394657.png)

```css
div :nth-child(1){
    color:red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-ab78944e5c2f49f5a5e3a05a80d6f774.png)

***:nth-child的取值有多种，如：n、2n、2n+1等***

### :nth-of-type(n) 同类型的第n个元素

```css
div p:nth-of-type(2){
    color: red;
}
```
![image.png](https://blog.zhangpingcloud.tech/upload/2021/08/image-6f04f02ab2224d57adac4d3f54e7316e.png)

### element:first-child

> 选择属于父元素element的第一个子元素。 等同 :nth-child(1)

### element:last-child

> 选择属于父元素element的最后一个子元素。

### element:first-of-type

> 同类型的第一个子元素

### element:last-of-type

> 同类型的最后一个子元素

### element:only-child

```css
 div :only-child{
    color: red;
 }
```

***最终生效的元素的 div标签下面只有一个元素的 h1 ,即 内容 h2 变成红色，符合条件的都会改变***

### :empty 没有子元素

```html
<!DOCTYPE html>
<html>
<head>
<style> 
p:empty
{
width:100px;
height:20px;
background:#ff0000;
}
</style>
</head>
<body>

<h1>这是标题</h1>
<p>第一个段落。</p>
<p></p>
<p>第三个段落。</p>
<p>第四个段落。</p>
<p>第五个段落。</p>

</body>
</html>
```

***生效的是 `<p></p>`,没有子元素***

### :nth-last-child(n) 倒数第n个子元素

```html
<!DOCTYPE html>
<html>
<head>
<style> 
div :nth-last-child(1){
    color:red;
}
</style>
</head>
<body>
    <div>
        <p>第一个段落。</p>
        <p>第二个段落。</p>
        <p>第三个段落。</p>
        <p>第四个段落。</p>
        <p>第五个段落。</p>
    </div>	
</body>
</html>
```

***父元素div的倒数第一个元素 被选中***

### element:nth-last-of-type(n)

> 同类型的倒数第n个子元素

```html
<!DOCTYPE html>
<html>
<head>
<style> 
div p:nth-last-of-type(2){
	color:red;
}
</style>
</head>
<body>
  <div>
    <h1>h11</h1>
    <p>第一个段落。</p>
    <p>第二个段落。</p>
    <p>第三个段落。</p>
    <h1>h11</h1>
    <p>第四个段落。</p>
    <p>第五个段落。</p>
    <h1>h11</h1>
  </div>	
</body>
</html>
```

> `<p>第四个段落。</p>` 处于同类型 p标签 倒数第2个

```css
div p:nth-last-of-type(2n+1){
	color:red;
}
```

### element:last-of-type

> 同类型的倒数第一个子元素

### element:first-of-type

> 同类型的第一个子元素

### element:only-of-type

> 父元素里唯一同类型子元素

```html
<!DOCTYPE html>
<html>
<head>
<style> 

div h1:only-of-type{
    color: red;
}

</style>
</head>
<body>
<div>
    <h1>h1</h1>
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
    <h1>h1</h1>
</div>
<div>
    <h1>h2</h1>
</div>
</body>
</html>
```

***`<h1>h2</h1>`符合，被选中***

### a:link

> 没有访问过的状态

### a:visited

> 选择所有已被访问的链接。

### a:hover

> 选择鼠标指针位于其上的链接。

### a:active

> 链接正在被点击

### :focus

:focus 选择器用于选取获得焦点的元素。

***提示：接收键盘事件或其他用户输入的元素都允许 :focus 选择器。***

### :enabled / :disabled

> 选择每个启用的 input 元素 / 选择每个禁用的 input 元素

### :checked

> 选择每个被选中的 input 元素。自定义开关可以用这个实现

### :not(selector)

> 选择非 selector 元素的每个元素。（反向选择）

## 伪元素选择器

### element::first-line

```html
<!DOCTYPE html>
<html>
<head>
<style>

p:first-line{
	background-color:yellow;
}

</style>
</head>
<body>
<h1>WWF's Mission Statement</h1>
<p>To stop the degradation of the planet's natural environment and to build a future in which humans live in harmony with nature, by; conserving the world's biological diversity, ensuring that the use of renewable natural resources is sustainable, and promoting the reduction of pollution and wasteful consumption.</p>
</body>
</html>

```

***p 元素的第一行发生改变***

### element::first-letter

```html
<!DOCTYPE html>
<html>
<head>
<style>
h1:first-letter{
	color:yellow;
}
</style>
</head>

<body>
<h1>WWF's Mission Statement</h1>
</body>
</html>
```

***直接第一个字符变黄，如果JavaScript做的话，需要获取字符串，再获取第一个字符，再改变其颜色***

### element::before

> 在每个 element 元素的内容之前插入内容。我们更多的可能是当作一个div来用

### element::after

> 在每个element元素的内容之后插入内容。我们可能更多的是用来清除浮动或验证表单提示等其它

### ::selection

> 选择被用户选取的元素部分

# 如有错误，欢迎评论区指正~


最近在做教案，突然发现HTML中所谓head标签基本上很少去关注，使用最多的情况也就是加上title和link引入样式，对meta简直一无所知，遂了解一下head中各标签的使用。如有不对请指出，最后欢迎点赞 + 收藏。

## 1. head 标签
`head`标签作为HTML文档中第二层标签，从地位上来说是极其重要的，但是由于`head`标签中的内容并不会显示在页面上，所以又显得没什么用，所以很多人往往忽略了对`head`标签的关注和学习。

> `HTML` `head`元素 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。

<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head" target="_blank">来源MDN——head</a>
</p>

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

head标签包含以下标签：
1. base
2. link
3. meta
4. script
5. style
6. title

注意：允许内容至少包含一个`<title>`元素来指定文档的标题信息，除非标题已经从更高等级协议中指定（`<iframe>`）。

<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head" target="_blank">来源MDN——head</a>
</p>

建议：始终把`head`标签放在文档的开始处，紧跟在`html`后面，并处于`body`标签或`frameset`标签之前。

## 2. title标签

> `HTML` `<title>`元素 定义文档的标题，显示在浏览器的标题栏或标签页上。它只应该包含文本，若是包含有标签，则它包含的任何标签都将被忽略。

<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title" target="_blank">来源MDN——title</a>
</p>

*注意：千万不要忘记`title`标签的结束标签，否则后面所有内容都会被解析到`title`中。*

Tips：当把文档加入用户的链接列表或者收藏夹或书签列表时，标题将成为该文档链接的默认名称。

属性：
1. dir
   规定元素中内容的文本方向`rtl`（从右到左）、`ltr`（从左到右）、`auto`（用户代理指定）。

2. lang
   规定元素中内容的语言代码。

注意：以上两个属性基本不会生效，详见[MDN-dir](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-dir)、[MDN-lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-lang)。

## 3. meta 标签

meta``元素往往不会引起用户的注意，甚至很多人不想去了解，毕竟那么多属性值，属实难记。但是`meta`对整个网页有影响，会对网页能否被搜索引擎检索，和在搜索中的排名起着关键性的作用。

> `HTML` `<meta>` 元素表示那些不能由其它`HTML`元相关（meta-related）元素（(`<base>`、`<link>`, `<script>`、`<style>` 或 `<title>`）之一表示的任何元数据信息。
<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta" target="_blank">来源MDN——meta</a>
</p>

1. `meta`有两个属性`http-equiv`和`name`, 用于表示要设置的项。
2. `content`属性用来表示上面两个属性的属性值。
3. `charset`用来指定文档编码

### 1. http-equiv

> 如果设置了`http-equiv`属性，`meta` 元素则是编译指令，提供的信息与类似命名的`HTTP`头部相同。

#### 1. content-type

> 如果使用这个属性，其值必须是"text/html; charset=utf-8"。注意：该属性只能用于 MIME type 为 text/html 的文档，不能用于MIME类型为XML的文档。
```html
<meta http-equiv="content-type" content="text/html charset=utf8">
```

#### 2. refresh

> 如果`content`只包含一个正整数，则为重新载入页面的时间间隔(秒)；
> 如果`content`包含一个正整数，并且后面跟着字符串 ';url=' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)
```html
<meta http-equiv="refresh" content="5 url=https://www.baidu.com">
```
*注意：慎用！！！页面会不受用户控制。*

### 2. name

`name`属性主要用于描述网页，与对应的`content`中的内容主要是便于搜索引擎查找信息和分类信息用的, 用法与`http-equiv`相同，`name`设置属性名，`content`设置属性值。

`name`和`content`属性可以一起使用，以键-值对的方式给文档提供元数据，其中`name`作为元数据的名称，`content`作为元数据的值。

常用元数据：

1. author

标注文档作者的名字。

```html
<meta name="author" content="zhangpingcloud">
```

2. description

一段简短而精确的、对页面内容的描述。一些浏览器，比如 Firefox 和 Opera，将其用作书签的默认描述。

```html
<meta name="description" content="这是我的网页描述">
```

3. keywords

与页面内容相关的关键词，使用逗号分隔。

```html
<meta name="keywords" content="Hello world,Hello html">
```

4. generator

生成此页面的软件的标识符（identifier）。
表示当前`html`是用什么工具开发的，然并卵，一般是编辑器自动创建的。

```html
<meta name="generator" content="宇宙最强IDE">
```

5. robots

爬虫、协作搜寻器，或者“机器人”，对此页面的处理行为，或者说，应当遵守的规则。

其实就是告诉搜索引擎机器人抓取哪些页面，常用如：all / none / index / noindex / follow / nofollow等。

```html
<meta name="robots" content="all">
```
<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name" target="_blank">来源MDN——标准元数据名称</a>
</p>

## 4. base标签

> `HTML` `<base>` 元素 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <base> 元素。

在文档中所有的相对地址形式的url都是相对于这里定义的url而言的。为页面上的链接规定默认地址或目标。

```html
<base href="http://www.w3school.com.cn/i/" target="_blank" />
```

属性：
1. href
2. target
   以上用法同超链接。

## 5. link标签

> `HTML`外部资源链接元素 (`<link>`) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。

```html
<link href="/media/examples/link-element-example.css" rel="stylesheet">
```

常用属性：
1. type
   这个属性被用于定义链接的内容的类型。这个属性的值应该是像text/html，text/css等MIME类型

2. rel
   此属性命名链接文档与当前文档的关系。 该属性必须是链接类型值的用空格分隔的列表。

3. href
   此属性指定被链接资源的URL。 URL 可以是绝对的，也可以是相对的。

<p style="text-align:right">
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/link" target="_blank">来源MDN——外部资源链接元素</a>
</p>

## 6. style 标签

不说了，懂的都懂~

不懂的去看[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style)

## 7. script 标签

这个得说，大部分人不懂。

> `HTML` `<script>` 元素用于嵌入或引用可执行脚本。这通常用作嵌入或者指向 JavaScript 代码。

```javascript
<script src="index.js"></script>
```

常用属性：
1. type
   该属性定义script元素包含或src引用的脚本语言。属性的值为MIME类型; 支持的MIME类型包括text/javascript, text/ecmascript, application/javascript, 和application/ecmascript。如果没有定义这个属性，脚本会被视作JavaScript。

2. async
   对于普通脚本，如果存在 async 属性，那么普通脚本会被并行请求，并尽快解析和执行。

改属性仅适用于引入的外部脚本，设置之后不会影响HTML解析，加载是与文档解析同时发生的。加载完成后立即执行。执行过程会停止html文档解析。

```javascript
<script async src="index.js"></script>
```

3. charset
   规定在外部脚本文件中使用的字符编码。
```javascript
<script type="text/javascript" src="script.js" charset="UTF-8"></script>
```

用得少~

4. defer

这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded事件前执行。

有 defer 属性的脚本会阻止 DOMContentLoaded 事件，直到脚本被加载并且解析完成。

注意：与async有区别。

5. language
   规定脚本语言，与`type`功能类似，不建议使用该字段。

6. src
   不用我说了吧？

## 8. bgsound标签
网站背景音乐。
我相信现在基本上没有网站设置背景音乐~
```html
<bgsound src="好汉歌.mp3" autostart="true" loop="5">
```
属性：
1. src 音乐地址
2. autostart 自动播放
3. loop 循环次数 infinite表示不限次