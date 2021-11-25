# 如何使用正确使用HTML的tabindex属性

[:houses:返回首页](/) 	[:house_with_garden:返回上级](/html/study.md)

`tabindex`是HTML中的一个全局属性，它几乎可以用在所有的HTML元素中，该属性有两个功能：

1. 不管是通过键盘等输入设备，还是通过`focus()`等编程（HTML只能是js了）方式是否能让元素聚焦。
2. 当用户通过键盘与页面进行交互时，哪些元素能够被聚焦。

## 默认的聚焦元素

如果你对电脑操作比较熟练，或者使用过一些表单比较多的网站时，你应该使用过`tab`键进行表单焦点的切换。

这就是说，其实有些元素默认就是可聚焦的，有六个元素，分别是：

- 有`href`属性的`a`标签。
- 有`href`属性的`link`标签
- `button`按钮标签
- 除去`type`属性为`hidden`的所有`input`标签
- `select`标签
- `textarea`标签

默认情况下，不管用户使用`tab`键还是通过js的`focus()`方法只有这些元素能被聚焦。

```javascript
// focusable
document.querySelector("a").focus();
// div元素不会获取到焦点
document.querySelector("div").focus();
```

在聚焦元素时，聚焦顺序等于元素在源码文件中的出现顺序。

尽管这些默认聚焦行为覆盖了我们大部分的交互需求，我们仍然会希望在某些情况下移除、或者重新排列聚焦顺序。

这就是`tabindex`便利的地方了。

## 如何使用tabindex

`tabindex`几乎可以用在任何元素上，不管元素是否默认可聚焦。

`tabindex`属性值必须是一个有效的整数，可以是负值、正值或者是0。

### 当属性值为负值时

当`tabindex`的值为负数时，比如-1，元素将从聚焦队列中移除，用户完全无法通过键盘获取元素焦点。

```html
<button type="button">点击我获取焦点，然后通过tab键获取下一个焦点</button>
<button type="button">我第一个获取到焦点</button>
<button type="button" tabindex="-1">我不会获取到焦点 :(</button>
<button type="button">我最后一个获取到焦点</button>
```

负值是多少不重要，既然任何负值都可以将元素焦点移除，-1和-99999也就没有任何区别。因此，为了可读性，最好始终使用-1。

### 当属性值为0时

当`tabindex`属性值为0时会将元素加入默认的聚焦顺序中，顺序由元素在HTML源码中的位置决定。

它可以被用在默认不可聚焦的元素上，加上之后，元素会变得和可聚焦元素一样。

```html
<button type="button">点击我获取焦点，然后通过tab键获取下一个焦点</button>
<button type="button">我第一个获取到焦点</button>
<div tabindex="0">我是一个div元素，我第二个获取焦点</div>
<button type="button">我最后一个获取到焦点</button>
```

### 当属性值为正值时

最后，当`tabindex`为正值时也会被放入聚焦队列，但是聚焦顺序将由从1开始递增的特定数值决定。`tabindex`值为正值的元素也会被放到没有`tabindex`属性的前面。

```html
<button type="button" tabindex="1">我是第一个可聚焦的元素</button>
<button type="button" tabindex="500">我是第二个</button>
```

测试上面的代码，点击浏览器的URL栏，然后按下tab键，你会发现最先聚焦的两个元素是上面的两个按钮，即使它们的位置在HTML的中间部分。

:::tip 提示
tabindex 的最大值不应超过 32767。如果没有指定，它的默认值为 0。
:::

## tabindex与编程式聚焦

除了通过键盘和聚焦顺序控制元素焦点外，我们还可以通过JavaScript控制元素是否可聚焦。

通过JavaScript给元素添加`tabindex`属性，先不管属性值是多少。这意味着我们可以通过Javascript使以前不可聚焦的元素成为可聚焦的元素，而不必通过用户使用键盘四处切换来聚焦它们。

```html
<div tabindex="-1">我是一个div</div>
```

上面的元素，通过键盘是无法获取焦点的。

但我们可以通过JavaScript的`focus()`方法。

```html
<div id="demo" tabindex="-1">我是一个div</div>
```
```javascript
document.getElementById('demo').focus()
```

:::tip 提示
很遗憾，该方法在我的浏览器并不能成功运行。
:::

## 什么时候使用tabindex

`tabindex`属性是非常有用的，但如果使用不当可能造成严重的问题。

每个类别的`tabindex`值都应该在不同的情况下使用。

### 当使用负tabindex值

负值tabindex将从选项卡焦点中删除元素。

:::warning
如你所见，可能存在兼容性问题，慎用负值
:::

### 何时使用tabindex零值

通常用来为不可聚焦元素添加可聚焦属性。

比如，你使用一些图片作为按钮的时候，这时候也是需要聚焦的，那你就可以给图片添加`tabindex`实现该功能。

如果你有需要给不同元素添加聚焦，建议始终使用0。

### 何时使用正值

几乎没有理由使用正值，它实际上被认为是一种反模式。

如果你发现需要使用此值来更改元素变得可聚焦的顺序，那么实际上需要做的很可能是更改`HTML`元素的源顺序。

## 参考

[How and when to use the tabindex attribute](https://bitsofco.de/how-and-when-to-use-the-tabindex-attribute/)

[Don’t Use Tabindex Greater than 0](https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html)