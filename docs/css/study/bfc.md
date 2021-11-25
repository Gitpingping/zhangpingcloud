# BFC

## BFC是什么？

> 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

上文来自MDN，原文[点这里查看](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)。

这看起来很抽象，百分之百的人看了都是一脸懵。

W3C的解释是：`BFC`决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`BFC`提供了一个环境，HTML在这个环境中按照一定的规则进行布局。

这句仍然不太好理解，但我们依稀能看出`BFC`的两个作用。

1. 决定内部元素的定位以及与外部元素的作用关系
2. 提供HTML布局的规则环境。

你可以将`BFC`看成是一个伪类，只有特定条件下才会触发，触发之后元素会产生一些特征，至于特征是什么，我们后面会说到。

## 如何触发BFC？

触发`BFC`的方式有很多，但是大部分方式都会产生新的问题，以下触发方式来自MDN：

- 根元素（`<html>`）
- 浮动元素（元素的`float`不是`none`）
- 绝对定位元素（元素的`position`为`absolute`或`fixed`）
- 行内块元素（元素的`display`为`inline-block`）
- 表格单元格（元素的`display`为`table-cell`，`HTML`表格单元格默认为该值）
- 表格标题（元素的`display`为`table-caption``HTML`表格标题默认为该值）
- 匿名表格单元格元素
- `overflow`计算值(Computed)不为`visible`的块元素
- `display`值为`flow-root`的元素
- `contain`值为`layout`、`content`或`paint`的元素
- 弹性元素（`display`为`flex`或`inline-flex`元素的直接子元素)
- 网格元素（`display`为`grid`或`inline-grid`元素的直接子元素）
- 多列容器（元素的`column-count`或`column-width (en-US)`不为`auto`，包括`column-count`为 1）
- `column-span`为`all`的元素始终会创建一个新的`BFC`，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

这么一大串内容，光是看完就费劲了，其实实际能用到的也就那几种，大部分都会有副作用。

## BFC的特性

1. 属于同一个BFC的两个相邻容器的上下margin会重叠（重点）
2. 计算BFC高度时浮动元素也参于计算（重点）
3. BFC的区域不会与浮动容器发生重叠（重点）
4. BFC内的容器在垂直方向依次排列
5. 元素的margin-left与其包含块的border-left相接触
6. BFC是独立容器，容器内部元素不会影响容器外部元素

我们要理清的关系是，元素首先触发BFC才会有对应的特性，而不是给元素加上特性之后叫BFC。

## BFC解决了哪些问题？

首先要知道，`BFC`只是一个特殊状态的元素，我们通过BFC的特性去解决问题，那么其实学习BFC就是学习BFC能解决哪些问题。

### 解决相邻元素上下margin重叠

这个在学盒子模型的时候经常遇到，但是说实话，这个重叠问题并不是bug，而是写法的问题，相邻的盒子就应该只设置上面元素的`margin-bottom`或者下面元素的`margin-top`，两个都设置很显然多此一举。

话题偏了。

我们说，同一个BFC下的两个相邻容器上下margin重叠，并且BFC是独立容器，内部元素不会影响外部元素（上述第一条和第六条）。

那么，只需要把相邻的两个容器放入不同的BFC或者其中一个放入BFC即可。
```css
.box{
    width: 200px;
    height: 200px;
}
.box1{
    background-color: rgb(16, 224, 85);
    margin-bottom: 45px;
}
.box2{
    background-color: rgb(194, 21, 21);
    margin-top: 60px;
}
```

```html
<div class="box box1"></div>
<div class="box box2"></div>
```

上述代码很显然会产生外边距重叠，`box2`的上外边距大于`box1`的下外边距，因此实际距离是60px。

![BFC1](https://public-1304187462.cos.ap-nanjing.myqcloud.com/blog/bfc/1637137132370.png)

那么，现在使用BFC的特性解决这个问题，首先需要触发BFC。

比如：
```css
.box2{
    /* 给box2添加浮动，使其成为浮动元素 */
    float: left;
    /* 设置绝对定位 */
    position: absolute;
}
```

上述两种方式直接使box2触发BFC，解决了重叠的问题，但随之而来更多问题，比如浮动和定位产生的后果需要去处理。

还可以这样：

```html
<div class="box box1"></div>
<div class="bfc">
    <div class="box box2"></div>
</div>
```

```css
.bfc{
    display: flow-root;
}
```

关于`flow-root`的解释：

> 一个新的`display`属性的值，它可以创建无副作用的`BFC`。在父级块中使用`display: flow-root`可以创建新的`BFC`。

这个案例其实并不好，因为本来的HTML结构被破坏，使代码难以阅读。


### 解决浮动元素的父元素高度塌陷问题

浮动是个让人又爱又恨的属性。

这里直接上浮动效果。

```css
.bfc{
    border: 10px solid blue;
}
/* 改写box2 */
.box2{
    background-color: rgb(194, 21, 21);
    float: left;
}
```

```html
<div class="bfc">
    <div class="box box2"></div>
</div>
```

![BFC2](https://public-1304187462.cos.ap-nanjing.myqcloud.com/blog%2Fbfc%2F1637139413837.png)

这个最常见的问题。

我们利用上述第二条特性，计算BFC高度时浮动元素也计算在内。

```css
.bfc{
    border: 10px solid blue;
    display: flow-root
}
```

![BFC3](https://public-1304187462.cos.ap-nanjing.myqcloud.com/blog%2Fbfc%2F1637139584867.png)

成功解决浮动导致的塌陷问题。

:::tip 个人看法
关于清除浮动这点，我觉得既然是浮动产生的问题，还是把浮动清除掉比较好。

当然这个属于一千个哈姆雷特的问题。
:::

### 利用BFC实现自适应的两栏布局

这个用法属实有点高级，甚至有点玄幻。网上看了不少教程的理解仅仅是实现两栏布局，并没有提到自适应，如果单纯的两栏布局，直接使用两个浮动元素就好了，又何必费那精力。

```html
<aside class="aside"></aside>
<main class="main"></main>
```

```css
.aside{
    float: left;
    width: 220px;
    height: 320px;
    background-color: rgb(177, 10, 10);
}
.main{
    height: 500px;
    background-color: rgb(31, 240, 125);
}
```

![BFC4](https://public-1304187462.cos.ap-nanjing.myqcloud.com/blog%2Fbfc%2F1637140217040.png)

这也是浮动产生的后果，main元素被aside所覆盖。

我们利用上述特性3，BFC的区域不会与浮动容器发生重叠。那么只需要对main元素触发BFC即可。

```css
.main{
    height: 500px;
    background-color: rgb(31, 240, 125);
    display: flow-root;
}
```

![BFC5](https://public-1304187462.cos.ap-nanjing.myqcloud.com/blog%2Fbfc%2F1637140381709.png)

那么成功解决了覆盖问题，并且，此时拖动控制台大小，右侧的main元素也会出现自适应的宽度。

这个用法其实我还是有点不懂为什么触发BFC之后会出现这种情况，单纯靠特性来解释也有点“结果是这样，所以就是这样的意思”。

## 总结

BFC的概念比较抽象，单纯从特性角度来说可能觉得没什么意义，重点其实在于记住BFC的特性以及利用BFC的特性去解决问题。


