 <p align="center">
  <a href="https://github.com/codedia/bootstrap-elements">
    <img src="https://raw.githubusercontent.com/codedia/bootstrap-elements/master/example/image/logo_p.png" alt="Bootstrap Elements logo" width="72" height="72">
  </a>
</p>
<h3 align="center">Bootstrap Elements</h3>
<p align="center">
Custom Element wrappers for Bootstrap 4 components
</p> 
<p align="center">  
documentation available at<br>
<a href="https://bootstrap-elements.netlify.com">bootstrap-elements site</a>
</p>  

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/bootstrap-elements)

<!--
```
<custom-element-demo>
  <template>
    <script src="https://bootstrap-elements.netlify.com/jquery.min.js"></script>
    <script src="https://bootstrap-elements.netlify.com/bootstrap-elements.js"></script>
    <be-button type="primary">primary</be-button>
    <be-button type="secondary">secondary</be-button>
    <be-button type="success">success</be-button>
    <be-button type="danger">danger</be-button>
    <be-button type="warning">warning</be-button>
  </template>
</custom-element-demo>
```
-->

## Install

```
npm i bootstrap-elements
```

## Include Files
 Bootstrap Elements is a single js file which bundles Bootstrap js, css and Bootstrap Elements code

You might be wondering why the css is bundled? This is so that the css can be available within the shadow DOM. The CSS is converted to JS and then a style tag is adopted by the custom elements.

You can provide your own css. Please see the guide below.

```html
<script src="jquery.min.js"></script>
<script src="bootstrap-elements.js"></script>
```
### Custom Bootstrap CSS
If you want to provide your own css you can pass it via a variable on the window.  
```html
<script>
    window.CustomBootstrapCSS = "body { background-color:red }";
</script>
<script src="bootstrap-elements.js"></script>
```  

Full documentation can be found on the site: [https://bootstrap-elements.netlify.com/components.html](https://bootstrap-elements.netlify.com/components.html)    

## Button Example   

```html
<be-button type="primary">primary</be-button>
<be-button type="secondary">secondary</be-button>
<be-button type="success">success</be-button>
<be-button type="danger">danger</be-button>
<be-button type="warning">warning</be-button>`
```

## Nav Example

```html
<be-nav>
    <be-navitem>item 1</be-navitem>
    <be-navitem>item 2</be-navitem>
    <be-navitem>item 3</be-navitem>
    <be-navitem disabled="true">item 4</be-navitem>
</be-nav>
```

