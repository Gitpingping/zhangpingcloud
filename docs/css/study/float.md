# 关于浮动的一点学习

结合了几篇关于浮动的文章，加上[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)的一些文档，终于对浮动的来龙去脉有了些了解。以下内容仅供参考。

本文从以下几个方面对浮动做出一个详细的说明：

1. 什么是浮动？
2. 浮动的发展历程？
3. 浮动的目的？
4. 浮动造成哪些方面的影响？
5. 如何清除浮动造成的影响？


# 什么是浮动？

首先看一下浮动在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)上的定义说明：

> `float`CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动(文档流)中移除，尽管仍然保持部分的流动性（与[绝对定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#absolute_positioning)相反）。

这句话其实说明了浮动的两个功能： 

1. 指定元素沿其容器的左侧或右侧放置
2. 允许文本和内联元素环绕它

其中第一个功能也是我们最常用到的功能：使元素（这里特指块级元素）能够左右水平排列。

而第二个功能可能很少遇到，这里暂且不谈功能。

## 关于浮动的计算值

> **浮动元素**是`float`的计算值非 `none` 的元素。 

这句话很有意思，一开始我也没看懂到底啥意思。其实在后面还有一句：

> 由于float意味着使用块布局，它在某些情况下修改[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值的计算值。

需要结合两句话来看，意思是：使用`float`之后，`float`会修改元素`display`属性的值，但并不是所有的值都会被修改，而**浮动元素**指的就是，使用`float`之后，元素的`display`值被修改之后的元素，这个元素的`display`值不是`none`。

看起来像一句废话，总之就是`float`能作用在所有`display`不为`none`的元素上，至于能否生效另说。

## 浮动的计算值

MDN列出了`display`的计算值：

| 指定值             | 计算值                                     |
| :----------------- | ------------------------------------------ |
| inline             | block                                      |
| inline-block       | block                                      |
| inline-table       | block                                      |
| table-row          | block                                      |
| table-row-group    | block                                      |
| table-column       | block                                      |
| table-column-group | block                                      |
| table-cell         | block                                      |
| table-caption      | block                                      |
| table-header-group | block                                      |
| table-footer-group | block                                      |
| flex               | flex, 但是float对这样的元素不起作用        |
| inline-flex        | inline-flex, 但是float对这样的元素不起作用 |
| other              | unchanged                                  |

这是个很有意思的表格，大部分`match(/table/g)`的属性值平时别说用了，就是见都没见过。但这不影响下面的内容。

另外从实际使用中来说，计算值更像是`inline-block`的特征。

还有就是在flex布局里面使用浮动不会生效。

## 浮动的属性值

***注意刚刚说的是`display`在浮动的影响下属性值的变化。***

下面具体看一下`float`的属性值：

1. left 表明元素必须浮动在其所在的块容器左侧的关键字。
2. right 表明元素必须浮动在其所在的块容器右侧的关键字。
3. none 表明元素不进行浮动的关键字。
4. inline-start 关键字，表明元素必须浮动在其所在块容器的开始一侧，在ltr脚本中是左侧，在rtl脚本中是右侧。
5. inline-end 关键字，表明元素必须浮动在其所在块容器的结束一侧，在ltr脚本中是右侧，在rtl脚本中是左侧。

left和right是最常用的两个属性值，`inline-start`和`inline-end`可能很多人压根就没见过，但觉得熟悉。

没错，他们和`flex-start`、`flex-end`比较类似，甚至排列方式都比较相似。

## 例子

![举个栗子](https://blog.zhangpingcloud.tech/upload/2021/08/%E4%B8%BE%E4%B8%AA%E6%A0%97%E5%AD%90-10fd120c6b824277b84478951800cf95.jpg)

> 正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到**另外一个浮动的元素**。

```html
<section>
  <div class="left">1</div>
  <div class="left">2</div>
  <div class="right">3</div>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Morbi tristique sapien ac erat tincidunt, sit amet dignissim
     lectus vulputate. Donec id iaculis velit. Aliquam vel
     malesuada erat. Praesent non magna ac massa aliquet tincidunt
     vel in massa. Phasellus feugiat est vel leo finibus congue.</p>
</section>
```

```css
section {
  border: 1px solid blue;
}

div {
  margin: 5px;
  width: 50px;
  height: 50px;
}

.left {
  float: left;
  background: pink;
}

.right {
  float: right;
  background: cyan;
}
```

直接看结果：

![浮动](https://blog.zhangpingcloud.tech/upload/2021/08/%E6%B5%AE%E5%8A%A8%E6%A1%88%E4%BE%8B-18a41b636f6e45b18ca785e14fe021e5.png)

如你所见：1和2在左侧，3在右侧，符合我们上面所说第一个功能。然后文字环绕在了图片的周围，符合第二个功能。

![word环绕](https://blog.zhangpingcloud.tech/upload/2021/08/%E7%8E%AF%E7%BB%95-55e66c840a04461cafd7685981ba1589.jpg)

没想到吧~和word里面的文字环绕还是有点类似的。

# 浮动的发展历程？

## 你不知道的浮动初衷

> 最初，引入 [float](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 属性是为了能让 web 开发人员实现简单的布局，包括在一列文本中浮动的图像，文字环绕在它的左边或右边。

很多人在刚开始学浮动的时候会遇到这么一个问题，上方的元素浮动了，导致下方元素上移，从而被上方元素覆盖，然而下方元素的文字却没有被覆盖：

![浮动环绕.png](https://i.loli.net/2021/08/04/152lzHbG8Vr79YB.png)

大多数人都觉得这是浮动产生的不良后果，其实这就是浮动的初衷，让文本环绕图像（其他元素也可以）。

## 不仅仅是图像浮动

> Web 开发人员很快意识到，任何东西都可以浮动，而不仅仅是图像，所以浮动的使用范围扩大了。

如果浮动仅用在文字环绕图片上，那真的是屈才了。看一个栗子：

![首沉字.png](https://i.loli.net/2021/08/04/OEMXYIBUrosl5dL.png)

首字下沉功能，使用浮动真的是太方便了：

```css
.box3::first-letter{
	font-size: 2rem;
	float: left;
}
```

## 最终发展

如上一个栗子图片内容所说：浮动曾被用来实现网站页面布局，使得信息能够横向排列，但是随着css的发展出现了诸如`flex`等更加优秀的布局方式，很多人都不再使用浮动布局，但我认为，大部分情况下其实没有必要使用`flex`，浮动布局仍是一个好的解决方案。

# 浮动的目的是什么？

上面的发展历程已经对浮动的目的做了详细的说明，总结如下：

1. 最初为了文字环绕图片而设计
2. 为了能够使网页元素水平排列

至于上面说到的首字下沉的案例，属于一些取巧的用法，不在实际目的内。

# 浮动造成的影响 

## 浮动和定位的区别 

我们通常都会说，`浮动`脱离了文档流，`定位`也脱离了文档流。

但是，浮动真的完全脱离文档流了吗？

看完上面的内容其实可以发现，浮动并没有脱离文档流，或者说没有完全脱离。

为什么会出现这种情况？

还是因为浮动的初衷：**实现文字环绕**。

实际浮动是为了让文字环绕图像，从而产生的一个效果，可能开发者最初也没有想到浮动会用到布局上。

于是由于文字环绕产生的塌陷，让人觉得浮动脱离了文档流。

## 不妨看看绝对定位

```css
.box1{
	width: 900px;
	height: 200px;
	background-color: red;
}
.box2{
	height: 500px;
	width: 800px;
	background-color: blue;
	color: white;
	position: absolute;
	top: 0;
}
```

![绝对定位.png](https://i.loli.net/2021/08/04/q4HESyPwNIo57Rr.png)

这时候你会发现，原来定位才是真正脱离了文档流，蓝色的块覆盖了下方所有的内容，包括文字。

## 内忧外患的浮动元素

既然浮动并不是完全脱离文档流，半脱离半正常的状态肯定会有重大的影响。

看个栗子：

![浮动影响1.png](https://i.loli.net/2021/08/04/VoB7Z19HfgN8SOX.png)

这是一个最初的没有浮动的布局。

紫色和橙色是同级的两个父元素，红色和蓝色是紫色的两个同级子元素：

```html
<div class="box1">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>
<div class="box2"></div>
```

当我们给红色加上左浮动之后：

![浮动影响2.png](https://i.loli.net/2021/08/04/QeVB1X3ZnRmxtjf.png)

这时候会发现，红色和蓝色重叠了，紫色高度变小。

这是第一个影响：由于浮动使得同级元素位置变化，使得父元素高度塌陷

这时候再给蓝色设置浮动：

![浮动影响3.png](https://i.loli.net/2021/08/04/26CR9HzAYDN5LhJ.png)

这下出问题了，紫色的父元素直接消失了，红色和蓝色塌陷到了橙色的区域。

这是第二个影响：使得父元素的后代同级元素塌陷，并且影响了橙色区域的文字。

总结就是：

1. 影响同级元素
2. 影响父元素
3. 影响父元素的同级元素

***真可谓是内忧外患~~***

# 如何解决浮动产生的影响？

## 我不信你没用过这个方法

如果说单纯为了解决浮动造成的影响，那么可以这样写。

```html
<div class="box1" style="height: 100px;">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>
```

假设`box1-1`和`box1-2`的高度确定了（通常情况下元素的高度都会是固定值），那么，给父元素设置一个更大的值是可以解决这个问题~

![你好骚啊.jpg](https://i.loli.net/2021/08/04/8w769MEZ1APqIGy.jpg)

当然，这个就是写着玩，千万别应用到实际。

## 真正清除浮动的方法

>  `clear`属性指定一个元素是否必须移动(清除浮动后)到在它之前的浮动元素下面。`clear`属性适用于浮动和非浮动元素。

`clear`属性详见[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)，不多说。

关于具体清除浮动的方法，详见[清除浮动的四种方式及其原理理解](https://juejin.cn/post/6844903504545316877#heading-2)。

首先说明我们需要的最终结果：

![清除浮动2.png](https://i.loli.net/2021/08/04/jCUoTxaEOdJ7zXg.png)

***红色和蓝色同行显示，并且紫色的父元素要有高度撑起，下方橙色不受任何影响。***

这里主要说一下关于清除浮动`clear`属性的位置。

### 1. overflow清除浮动

这个比较特殊，如果想了解的话得先知道BFC，就像上面博客所说：如果要清楚地把这个概念讲出来，恐怕需要非常大的篇幅，所以需要了解的看上面的。

### 2. 利用clear样式

这个方法用的很少，其实就是给收到影响的元素添加`clear`属性。

比如上述案例中，`div1-2`收到了影响，那么给他添加`clear`属性：

```html
<div class="box1">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>
<div class="box2">qwertyuiop qwertyuiop qwertyuiop</div>
```

```css
.box1{
	background-color: violet;
}
.box1-1{
	width: 200px;
	height: 100px;
	background-color: red;
	float: left;
}
.box1-2{
	width: 300px;
	height: 100px;
	background-color: blue;
	float: left;
	clear: both;
}
.box2{
	width: 600px;
	height: 500px;
	background-color: orange;
}
```

![清除浮动1.png](https://i.loli.net/2021/08/04/UbuZQNSwgrBt1Gy.png)

这时候你会发现，布局更加错乱了，但是效果是显而易见的：

蓝色的`div1-2`左侧的浮动被清除了，导致他换了一行，而其他内容没有变化。

当然这显然不符合我们的预期。不过这时候其实可以猜想到了，是不是可以给橙色添加`clear`属性实现？

试一下：

```html
<div class="box1">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>
<div class="box2" style="clear:both">qwertyuiop qwertyuiop qwertyuiop</div>
```



![清除浮动3.png](https://i.loli.net/2021/08/04/uon6yw4CHGLRXrQ.png)

乍一看功能实现了，但是仔细看，橙色没有收到影响，但是紫色的父元素缺出现了问题，没有高度。

这其实是因为`box2`的清除浮动，仅仅是清除了自身受到的影响，而`box1`受到的影响还在，所以这种方法可能会造成一些问题。

### 3. 父元素结束标签之前插入清除浮动的块级元素

这个方法叫做额外标签法，也是容易造成误区的方法，关键点在于，***额外标签放在哪里？***

经常有人会这样写：

```html
<div class="box1">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>
<div style="clear:both"></div>
<div class="box2" style="clear:both">qwertyuiop qwertyuiop qwertyuiop</div>
```

大多数情况下，这是没问题的，但是，看实际效果：

![清除浮动3.png](https://i.loli.net/2021/08/04/uon6yw4CHGLRXrQ.png)

他和上述案例一样，效果实现了，但是父元素的高度并没有被撑起来，所以依然会有问题。

那么正确的方法应该怎么写？

像这样：

```html
<div class="box1">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
    <div style="clear:both"></div>
</div>

<div class="box2" style="clear:both">qwertyuiop qwertyuiop qwertyuiop</div>
```

写在浮动元素父元素里面，定位在最后一个浮动元素的后面。

![清除浮动2.png](https://i.loli.net/2021/08/04/jCUoTxaEOdJ7zXg.png)

这是我们所需要的功能，没毛病~

### 4. 利用伪元素（clearfix）

即使是上面的栗子实现了功能，这仍然不是我们所期望的，因为需要增加标签，造成页面负担，以及代码可读性变差。

利用伪元素来实现：

```css
.clearfix:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
}
```

伪元素加载浮动元素的父元素上：

```html
<div class="box1 clearfix">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
</div>

<div class="box2" style="clear:both">qwertyuiop qwertyuiop qwertyuiop</div>
```

这样也实现了我们需要的功能。我们到浏览器看一下伪元素：

![清除浮动4.png](https://i.loli.net/2021/08/04/srXzBSGV93N8ut7.png)

可以看到，伪元素的位置是在浮动元素的父元素结尾。

### 小结

综上来说，针对浮动对不同元素产生的影响，需要用不同的方式去解决，而不是一昧的使用一种方法。最后还有个栗子：

```html
<div class="box1 clearfix">
	<div class="box1-1"></div>
	<div class="box1-2"></div>
    <div class="box1-3"></div>
</div>

<div class="box2" style="clear:both">qwertyuiop qwertyuiop qwertyuiop</div>
```

```css
.box1-3{
	width: 300px;
	height: 100px;
	background-color: yellow;
}
```

新增一个没有浮动的`box1-3`，有兴趣可以试一下，这里不放图了，这个情况下`box1-3`是被前面两个浮动元素所覆盖了，怎么办？使用第二种方法，给`box1-3`添加一个`clear:both`或者`clear:left`就可以了。

关于清除浮动对应的方法：

1. 如果是子元素浮动，对父元素的同级元素产生的影响，给父元素添加伪元素清除浮动
2. 如果是浮动元素给同级的兄弟元素造成的影响，给兄弟元素添加clear属性即可。

文末：如果转发或者引用，请贴上原链接，感谢大佬。文章可能有一些错误，欢迎评论指出，也欢迎一起讨论。文章可能写的不够好，还请多多包涵。为了教学，我也是操碎了心，人生苦短，我学前端，多一点贡献，多一分开心~

# 参考文档

1. [清除浮动的四种方式及其原理理解](https://juejin.cn/post/6844903504545316877)
2. [可能是最全面最易懂的解析前端浮动的文章](https://juejin.cn/post/6844903689094692871)
3. [clear](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)
4. [浮动](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)
5. [float](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)

