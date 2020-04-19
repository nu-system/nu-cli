<% var componentNameC=componentName.charAt(0).toUpperCase() + componentName.slice(1);  %>
# @\_nu/react-<%= componentName %>

[![npm package][npm-badge]][npm-url]
[![npm downloads][npm-downloads]][npm-url]
[![jsdelivr][jsdelivr-badge]][jsdelivr-url]
[![github][git-badge]][git-url]

[npm-badge]: https://img.shields.io/npm/v/@_nu/react-<%= componentName %>.svg
[npm-url]: https://www.npmjs.org/package/@_nu/react-<%= componentName %>
[npm-downloads]: https://img.shields.io/npm/dw/@_nu/react-<%= componentName %>
[git-url]: https://github.com/nu-system/react-<%= componentName %>
[git-badge]: https://img.shields.io/github/stars/nu-system/react-<%= componentName %>.svg?style=social
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/@_nu/react-<%= componentName %>/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@_nu/react-<%= componentName %>

[English]((../README.md)) | 简体中文

## 安装

```
yarn add @_nu/react-<%= componentName %> @_nu/css-<%= componentName %>
```

### 二次封装

```JSX
/* @components/<%= componentNameC %>/index.js */
import <%= componentNameC %> from "@_nu/react-<%= componentName %>";
// core style
import "@_nu/css-<%= componentName %>";
// skin of default
import "@_nu/css-<%= componentName %>/css/skins/default.css";
// custome style
// import './style.css';

// base className of <%= componentNameC %>
<%= componentNameC %>.defaultProps.classNameBase = "";

export default <%= componentNameC %>;
```

### 使用

```JSX
import <%= componentNameC %> from "./components/<%= componentNameC %>";

const Page=()=>{
    return (
     <div>
        <<%= componentNameC %>>Hello world!</<%= componentNameC %>>
     </div>
    );
};

export default Page;
```

## 接口

| Prop             |               type               | Default  |         Function          |
| :--------------- | :------------------------------: | :------: | :-----------------------: |
| children         |       string &#124; Array        | '&nbsp;' |         children          |
| className        |       string &#124; Array        | '&nbsp;' |         className         |
| classNameDefault |       string &#124; Array        | '&nbsp;' |     default className     |

## 更多

- [nu-system](https://nu-system.github.io/)
- [@\_nu/css-<%= componentName %>](https://nu-system.github.io/css/<%= componentName %>/)
- [@\_nu/react-<%= componentName %>](https://nu-system.github.io/react/<%= componentName %>/)