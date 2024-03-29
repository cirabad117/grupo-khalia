import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="kothing">
	<template>
		<style>.kothing-editor {
            width: auto;
            height: auto;
            box-sizing: border-box;
            font-family: Helvetica Neue, sans-serif;
            border: 1px solid #dadada;
            border-radius: 6px;
            -moz-border-radius: 6px;
            -webkit-border-radius: 6px;
            text-align: left;
            background-color: #fff;
            color: #000;
        }
        .kothing-editor * {
            box-sizing: border-box;
            -webkit-user-drag: none;
            overflow: visible;
        }
        .kothing-editor .ke-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .kothing-editor-common button,
        .kothing-editor-common input,
        .kothing-editor-common select,
        .kothing-editor-common textarea {
            font-size: 14px;
            line-height: 1.5;
        }
        .kothing-editor-common blockquote,
        .kothing-editor-common body,
        .kothing-editor-common button,
        .kothing-editor-common code,
        .kothing-editor-common dd,
        .kothing-editor-common div,
        .kothing-editor-common dl,
        .kothing-editor-common dt,
        .kothing-editor-common fieldset,
        .kothing-editor-common form,
        .kothing-editor-common h1,
        .kothing-editor-common h2,
        .kothing-editor-common h3,
        .kothing-editor-common h4,
        .kothing-editor-common h5,
        .kothing-editor-common h6,
        .kothing-editor-common input,
        .kothing-editor-common legend,
        .kothing-editor-common li,
        .kothing-editor-common ol,
        .kothing-editor-common p,
        .kothing-editor-common pre,
        .kothing-editor-common select,
        .kothing-editor-common td,
        .kothing-editor-common textarea,
        .kothing-editor-common th,
        .kothing-editor-common ul {
            margin: 0;
            border: 0;
        }
        .kothing-editor-common dl,
        .kothing-editor-common li,
        .kothing-editor-common menu,
        .kothing-editor-common ol,
        .kothing-editor-common ul {
            list-style: none !important;
        }
        .kothing-editor-common hr {
            margin: 6px 0 !important;
        }
        .kothing-editor textarea {
            resize: none;
            border: 0;
            padding: 0;
        }
        .kothing-editor button {
            background-color: transparent;
            touch-action: manipulation;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 0;
        }
        .kothing-editor button,
        .kothing-editor input,
        .kothing-editor select,
        .kothing-editor textarea {
            vertical-align: middle;
            border-radius: 0;
        }
        .kothing-editor .ke-btn {
            display: inline-block;
            min-width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 3px;
        }
        .kothing-editor .ke-btn:enabled:focus,
        .kothing-editor .ke-btn:enabled:hover {
            background-color: #ebebeb;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn:enabled:active {
            background-color: #ebebeb;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-btn-primary {
            display: inline-block;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            height: 30px;
            line-height: 30px;
            border-radius: 3px;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
            padding: 0 6px;
            color: #fafafa;
            background-color: #3f9dff;
            border: 1px solid #3f9dff;
            border-radius: 2px;
        }
        .kothing-editor .ke-btn-primary:focus,
        .kothing-editor .ke-btn-primary:hover {
            color: #fff;
            background-color: #3295fd;
            border-color: #3295fd;
            outline: 0 none;
        }
        .kothing-editor .ke-btn-primary:active {
            color: #fff;
            background-color: #3295fd;
            border-color: #3295fd;
            -webkit-box-shadow: inset 0 3px 5px #4592ff;
            box-shadow: inset 0 3px 5px #4592ff;
        }
        .kothing-editor input,
        .kothing-editor select,
        .kothing-editor textarea {
            color: #000;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .kothing-editor input:not([type="checkbox"]):focus,
        .kothing-editor select:focus,
        .kothing-editor textarea:focus {
            border: 1px solid #80bdff;
            outline: 0;
            -webkit-box-shadow: 0 0 0 0.2rem #c7deff;
            box-shadow: 0 0 0 0.05rem #c7deff;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .kothing-editor .ke-btn:enabled.active {
            color: #4592ff;
            outline: 0 none;
        }
        .kothing-editor .ke-btn:enabled.active:focus,
        .kothing-editor .ke-btn:enabled.active:hover {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn:enabled.active:active {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-btn:enabled.on {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn:enabled.on:focus,
        .kothing-editor .ke-btn:enabled.on:hover {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn:enabled.on:active {
            background-color: #c1c1c1;
            border-color: #b1b1b1;
            -webkit-box-shadow: inset 0 3px 5px #b1b1b1;
            box-shadow: inset 0 3px 5px #b1b1b1;
        }
        .kothing-editor .ke-btn-list:disabled,
        .kothing-editor .ke-btn:disabled,
        .kothing-editor button:disabled {
            cursor: not-allowed;
            background-color: inherit;
            color: #bdbdbd;
        }
        .kothing-editor button * {
            pointer-events: none;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
        }
        .kothing-editor .ke-svg,
        .kothing-editor button.ke-btn-select .arrow-icon,
        .kothing-editor button > svg {
            margin: auto;
            fill: currentColor;
            display: block;
            text-align: center;
            float: none;
        }
        .kothing-editor .ke-btn-select .arrow-icon > svg {
            float: right;
            width: 10px;
            height: 10px;
            -webkit-transition: 0.3s ease-out;
            -moz-transition: 0.3s ease-out;
            -ms-transition: 0.3s ease-out;
            -o-transition: 0.3s ease-out;
            transition: 0.3s ease-out;
        }
        .kothing-editor .ke-btn-select.on .arrow-icon > svg {
            transform: rotate(180deg);
        }
        .kothing-editor .close > svg,
        .kothing-editor .ke-dialog-close > svg {
            width: 10px;
            height: 10px;
        }
        .kothing-editor .ke-btn-list > .ke-list-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: -1px 10px 0 0;
            vertical-align: middle;
        }
        .kothing-editor .ke-line-breaker > button > svg {
            width: 24px;
            height: 24px;
        }
        .kothing-editor button > i:before {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            display: inline-block;
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            font-size: 15px;
            line-height: 2;
        }
        .kothing-editor button > [class="ke-icon-text"] {
            font-size: 20px;
            line-height: 1;
        }
        .kothing-editor .ke-arrow,
        .kothing-editor .ke-arrow:after {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border: 11px solid transparent;
        }
        .kothing-editor .ke-arrow.ke-arrow-up {
            top: -11px;
            left: 20px;
            margin-left: -11px;
            border-top-width: 0;
            border-bottom-color: rgba(0, 0, 0, 0.25);
        }
        .kothing-editor .ke-arrow.ke-arrow-up:after {
            top: 1px;
            margin-left: -11px;
            content: " ";
            border-top-width: 0;
            border-bottom-color: #fff;
        }
        .kothing-editor .ke-toolbar .ke-arrow.ke-arrow-up:after {
            border-bottom-color: #fafafa;
        }
        .kothing-editor .ke-arrow.ke-arrow-down {
            top: 0;
            left: 0;
            margin-left: -11px;
            border-bottom-width: 0;
            border-top-color: rgba(0, 0, 0, 0.25);
        }
        .kothing-editor .ke-arrow.ke-arrow-down:after {
            top: -12px;
            margin-left: -11px;
            content: " ";
            border-bottom-width: 0;
            border-top-color: #fff;
        }
        .kothing-editor .ke-toolbar .ke-arrow.ke-arrow-down:after {
            border-top-color: #fafafa;
        }
        .kothing-editor .ke-loading-box {
            position: absolute;
            display: none;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #fff;
            opacity: 0.7;
            filter: alpha(opacity=70);
            z-index: 9990;
        }
        .kothing-editor .ke-loading-box .ke-loading-effect {
            position: absolute;
            display: block;
            top: 50%;
            left: 50%;
            height: 25px;
            width: 25px;
            border-top: 2px solid #07d;
            border-right: 2px solid transparent;
            border-radius: 50%;
            animation: spinner 0.8s linear infinite;
            margin: -25px 0 0 -25px;
        }
        .kothing-editor .ke-line-breaker {
            position: absolute;
            display: none;
            width: 100%;
            height: 1px;
            cursor: text;
            border-top: 1px solid #3288ff;
            z-index: 7;
        }
        .kothing-editor .ke-line-breaker > button.ke-btn {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            top: -15px;
            float: none;
            left: -50%;
            background-color: #fff;
            border: 1px solid #0c2240;
            opacity: 0.6;
            cursor: pointer;
        }
        .kothing-editor .ke-line-breaker > button.ke-btn:hover {
            opacity: 0.9;
            background-color: #fff;
            border-color: #041b39;
        }
        .kothing-editor .ke-line-breaker-component {
            position: absolute;
            display: none;
            width: 24px;
            height: 24px;
            background-color: #fff;
            border: 1px solid #0c2240;
            opacity: 0.6;
            border-radius: 4px;
            cursor: pointer;
            z-index: 7;
        }
        .kothing-editor .ke-line-breaker-component:hover {
            opacity: 0.9;
        }
        .kothing-editor .ke-toolbar {
            display: block;
            position: relative;
            height: auto;
            width: 100%;
            overflow: visible;
            padding: 6px 6px 2px;
            background-color: #fbfbfb;
            border-bottom: 1px solid #dadada;
            border-radius: 6px 6px 0 0;
            z-index: 5;
        }
        .kothing-editor .ke-toolbar-cover {
            position: absolute;
            display: none;
            font-size: 36px;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #fefefe;
            opacity: 0.5;
            filter: alpha(opacity=50);
            cursor: not-allowed;
            z-index: 4;
        }
        .kothing-editor .ke-toolbar-separator-vertical {
            display: inline-block;
            height: 1.5rem;
            line-height: 1.5rem;
            width: 1px;
            margin: 0 4px 6px;
            background-color: #f0f0f0;
        }
        .kothing-editor .ke-toolbar.ke-toolbar-balloon,
        .kothing-editor .ke-toolbar.ke-toolbar-inline {
            display: none;
            position: absolute;
            z-index: 9990;
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        }
        .kothing-editor .ke-toolbar.ke-toolbar-balloon {
            width: auto;
        }
        .kothing-editor .ke-toolbar.ke-toolbar-sticky {
            position: fixed;
            top: 0;
        }
        .kothing-editor .ke-toolbar-sticky-dummy {
            display: none;
            position: static;
            z-index: -1;
        }
        .kothing-editor .ke-btn-module {
            display: inline-block;
        }
        .kothing-editor .ke-btn-module-border {
            border: 1px solid #dadada;
            border-radius: 4px;
        }
        .kothing-editor .ke-btn-module-enter {
            display: block;
            width: 100%;
            height: 1px;
            margin-bottom: 5px;
            background-color: transparent;
        }
        .kothing-editor .ke-toolbar-more-layer {
            margin: 0 -3px;
            background-color: #f3f3f3;
        }
        .kothing-editor .ke-toolbar-more-layer .ke-more-layer {
            display: none;
            border-top: 1px solid #dadada;
        }
        .kothing-editor .ke-toolbar-more-layer .ke-more-layer .ke-more-form {
            display: inline-block;
            width: 100%;
            height: auto;
            padding: 4px 3px 0;
        }
        .kothing-editor .ke-btn-module .ke-btn > .txt {
            display: flex;
            align-items: center;
            flex: auto;
            text-align: left;
            height: 30px;
            line-height: 30px;
        }
        .kothing-editor .ke-btn-module .ke-btn > .txt,
        .kothing-editor .ke-btn-module .ke-btn > .txt span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .kothing-editor .ke-btn-module .ke-btn-more.ke-btn-more-text {
            width: auto;
            padding: 0 4px;
        }
        .kothing-editor .ke-btn-module .ke-btn-more:focus,
        .kothing-editor .ke-btn-module .ke-btn-more:hover {
            color: #000;
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn-module .ke-btn-more.on {
            color: #333;
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn-module .ke-btn-more.on:hover {
            color: #000;
            background-color: #c1c1c1;
            border-color: #b1b1b1;
            outline: 0 none;
        }
        .kothing-editor .ke-menu-list {
            padding: 0;
            margin: 0;
           
        }
        .kothing-editor .ke-menu-list li {
            position: relative;
            float: left;
            padding: 0;
            margin: 0;
        }
        .kothing-editor .ke-menu-list li .ke-btn,
        .kothing-editor .ke-menu-list li .ke-btn-select {
            min-width: 30px;
            height: 28px;
            line-height: 28px;
            margin: 2px;
            font-size: 16px;
        }
        .kothing-editor .ke-btn-select {
            width: auto;
            display: flex;
            text-align: left;
            padding: 0 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .kothing-editor .ke-btn-select.ke-btn-tool-font,
        .kothing-editor .ke-btn-select.ke-btn-tool-format,
        .kothing-editor .ke-btn-select.ke-btn-tool-size {
            width: 75px;
        }
        .kothing-editor .ke-btn-tray {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        .kothing-editor .ke-menu-tray {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0;
        }
        .kothing-editor .ke-submenu {
            overflow-x: hidden;
            overflow-y: auto;
        }
        .kothing-editor .ke-list-layer {
            display: none;
            position: absolute;
            top: 33px;
            z-index: 100;
            left: 1px;
            padding: 6px 0;
            border-radius: 6px;
            background-color: #fff;
            -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
            -moz-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
        }
        .kothing-editor .ke-list-layer .ke-list-inner {
            padding: 0;
            margin: 0;
            overflow-x: initial;
            overflow-y: initial;
            overflow: visible;
        }
        .kothing-editor .ke-list-layer button {
            margin: 0;
            width: 100%;
        }
        .kothing-editor .ke-list-inner .ke-list-basic {
            width: 100%;
            padding: 0;
        }
        .kothing-editor .ke-list-inner .ke-list-basic li {
            width: 100%;
        }
        .kothing-editor .ke-list-inner .ke-list-basic li > button {
            min-width: 100%;
            width: max-content;
        }
        .kothing-editor .ke-list-inner .ke-list-basic li button.active {
            background-color: #80bdff;
            border: 1px solid #3f9dff;
            border-left: 0;
            border-right: 0;
        }
        .kothing-editor .ke-list-inner .ke-list-basic li button.active:hover {
            background-color: #3f9dff;
            border: 1px solid #4592ff;
            border-left: 0;
            border-right: 0;
        }
        .kothing-editor .ke-list-inner .ke-list-basic li button.active:active {
            background-color: #4592ff;
            border: 1px solid #407dd1;
            border-left: 0;
            border-right: 0;
            -webkit-box-shadow: inset 0 3px 5px #407dd1;
            box-shadow: inset 0 3px 5px #407dd1;
        }
        .kothing-editor .ke-btn-list {
            width: 100%;
            height: auto;
            min-height: 32px;
            padding: 0 14px;
            cursor: pointer;
            font-size: 12px;
            line-height: normal;
            text-indent: 0;
            text-decoration: none;
            text-align: left;
        }
        .kothing-editor .ke-btn-list.default_value {
            background-color: #f3f3f3;
            border-top: 1px dotted #b1b1b1;
            border-bottom: 1px dotted #b1b1b1;
        }
        .kothing-editor .ke-btn-list:focus,
        .kothing-editor .ke-btn-list:hover {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-btn-list:active {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-list-layer.ke-list-font-size {
            min-width: 140px;
            max-height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .kothing-editor .ke-list-layer.ke-list-font-family {
            min-width: 156px;
        }
        .kothing-editor .ke-list-layer.ke-list-font-family .default {
            border-bottom: 1px solid #ccc;
        }
        .kothing-editor .ke-list-layer.ke-list-line {
            width: 125px;
        }
        .kothing-editor .ke-list-layer.ke-list-align .ke-list-inner {
            left: 9px;
            width: 125px;
        }
        .kothing-editor .ke-list-layer.ke-list-format {
            min-width: 156px;
        }
        .kothing-editor .ke-list-layer.ke-list-format li {
            padding: 0;
            width: 100%;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul .ke-btn-list {
            line-height: 100%;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul .ke-btn-list[data-value="h1"] {
            height: 40px;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul .ke-btn-list[data-value="h2"] {
            height: 36px;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul p {
            font-size: 13px;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul div {
            font-size: 13px;
            padding: 4px 2px;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h1 {
            font-size: 2em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h2 {
            font-size: 1.5em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h3 {
            font-size: 1.17em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h4 {
            font-size: 1em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h5 {
            font-size: 0.83em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul h6 {
            font-size: 0.67em;
            font-weight: 700;
            color: #333;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul blockquote {
            font-size: 13px;
            color: #999;
            height: 22px;
            margin: 0;
            background-color: transparent;
            line-height: 1.5;
            border-color: #b1b1b1;
            padding: 0 0 0 7px;
            border-left: 5px #b1b1b1;
            border-style: solid;
        }
        .kothing-editor .ke-list-layer.ke-list-format ul pre {
            font-size: 13px;
            color: #666;
            padding: 4px 11px;
            margin: 0;
            background-color: #f9f9f9;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
        }
        .kothing-editor .ke-selector-table {
            display: none;
            position: absolute;
            top: 30px;
            left: 1px;
            z-index: 5;
            padding: 5px 0;
            float: left;
            margin: 2px 0 0;
            font-size: 14px;
            text-align: left;
            list-style: none;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        }
        .kothing-editor .ke-selector-table .ke-table-size {
            font-size: 18px;
            padding: 0 5px;
        }
        .kothing-editor .ke-selector-table .ke-table-size-picker {
            position: absolute !important;
            z-index: 3;
            font-size: 18px;
            width: 10em;
            height: 10em;
            cursor: pointer;
        }
        .kothing-editor .ke-selector-table .ke-table-size-highlighted {
            position: absolute !important;
            z-index: 2;
            font-size: 18px;
            width: 1em;
            height: 1em;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QTZCNzMzN0I3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QTZCNzMzNkI3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MzYyNEUxRUI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MzYyNEUxRkI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl0yAuwAAABBSURBVDhPY/wPBAxUAGCDGvdBeWSAeicIDTfIXREiQArYeR9hEBOEohyMGkQYjBpEGAxjg6ib+yFMygCVvMbAAABj0hwMTNeKJwAAAABJRU5ErkJggg==")
                repeat;
        }
        .kothing-editor .ke-selector-table .ke-table-size-unhighlighted {
            position: relative !important;
            z-index: 1;
            font-size: 18px;
            width: 10em;
            height: 10em;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC")
                repeat;
        }
        .kothing-editor .ke-selector-table .ke-table-size-display {
            padding-left: 5px;
        }
        .kothing-editor .ke-list-layer .ke-selector-color {
            display: flex;
            width: max-content;
            max-width: 282px;
            height: auto;
            padding: 0 6px;
            margin: auto;
        }
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet {
            width: 100%;
            height: 100%;
            padding: 0;
        }
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet li {
            display: flex;
            float: left;
            position: relative;
            margin: 0;
        }
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet button {
            display: block;
            width: 30px;
            height: 30px;
            text-indent: -9999px;
        }
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet button.active,
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet button:focus,
        .kothing-editor .ke-list-layer .ke-selector-color .ke-color-pallet button:hover {
            border: 3px solid #fff;
        }
        .kothing-editor .ke-submenu-form-group {
            display: flex;
            width: 100%;
            height: auto;
            padding: 4px;
        }
        .kothing-editor .ke-submenu-form-group input {
            flex: auto;
            display: inline-block;
            width: auto;
            height: 33px;
            color: #555;
            font-size: 12px;
            padding: 0 4px;
            border-radius: 3px;
            border: 1px solid #ccc;
        }
        .kothing-editor .ke-submenu-form-group button {
            float: right;
            width: 30px;
            height: 30px;
            margin: 0 0 0 4px !important;
        }
        .kothing-editor .ke-submenu-form-group button.ke-btn {
            border: 1px solid #ccc;
        }
        .kothing-editor .ke-submenu-form-group > div {
            position: relative;
        }
        .kothing-editor .ke-submenu-form-group .ke-color-input {
            width: 72px;
            border: none;
            outline: none;
        }
        .kothing-editor .ke-wrapper {
            position: relative !important;
            width: 100%;
            height: auto;
            overflow: hidden;
            z-index: 1;
        }
        .kothing-editor .ke-wrapper .ke-wrapper-inner {
            width: 100%;
            height: 100%;
            min-height: 65px;
            overflow-y: auto;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            user-select: text;
            -o-user-select: text;
            -moz-user-select: text;
            -khtml-user-select: text;
            -webkit-user-select: text;
            -ms-user-select: text;
        }
        .kothing-editor .ke-wrapper .ke-wrapper-inner:focus {
            outline: none;
        }
        .kothing-editor .ke-wrapper .ke-wrapper-code {
            font-size: 13px;
            word-break: break-all;
            padding: 4px;
            margin: 0;
            border: none;
            outline: none;
            box-shadow: none;
            resize: none !important;
        }
        .kothing-editor .ke-wrapper .ke-wrapper-wysiwyg {
            background-color: #fff;
            display: block;
        }
        .kothing-editor .ke-wrapper .ke-wrapper-code-mirror {
            font-size: 13px;
        }
        .kothing-editor .ke-wrapper .ke-placeholder {
            position: absolute;
            display: none;
            white-space: nowrap;
            text-overflow: ellipsis;
            z-index: 1;
            color: #b1b1b1;
            font-size: 13px;
            line-height: 1.5;
            top: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            margin-top: 0;
            padding-top: 16px;
            padding-left: 16px;
            margin-left: 0;
            padding-right: 16px;
            margin-right: 0;
            pointer-events: none;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
        }
        .kothing-editor .ke-resizing-bar {
            position: relative;
            display: flex;
            width: auto;
            height: auto;
            line-height: 24px;
            border-top: 1px solid #dadada;
            padding: 0 12px;
            border-radius: 0 0 6px 6px;
            background-color: #fafafa;
            cursor: ns-resize;
            align-items: center;
        }
        .kothing-editor .ke-resizing-bar .ke-navigation {
            flex: auto;
            position: relative;
            width: auto;
            height: auto;
            min-height: 18px;
            color: #666;
            margin: 0;
            padding: 0;
            font-size: 10px;
            line-height: 1.5;
            background: transparent;
        }
        .kothing-editor .ke-resizing-bar .ke-resizing-icon {
            height: 4px;
            width: 20px;
            top: calc(50% - 2px);
            left: calc(50% - 10px);
            position: absolute;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            cursor: row-resize;
            z-index: 2;
        }
        .kothing-editor .ke-resizing-bar .ke-powered-by {
            color: #999;
            font-size: 12px;
            margin-left: 16px;
            font-family: Helvetica Neue, sans-serif;
        }
        .kothing-editor .ke-resizing-bar .ke-powered-by a {
            color: #999;
            text-decoration: none;
        }
        .kothing-editor .ke-resizing-bar.ke-resizing-none {
            cursor: default;
        }
        .kothing-editor .ke-resizing-back {
            position: absolute;
            display: none;
            cursor: default;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9990;
        }
        .kothing-editor .ke-resizing-bar .ke-char-counter-wrapper {
            flex: none;
            position: relative;
            display: block;
            width: auto;
            height: auto;
            margin: 0;
            padding: 0;
            color: #999;
            font-size: 13px;
            background: transparent;
        }
        .kothing-editor .ke-resizing-bar .ke-char-counter-wrapper.ke-blink {
            color: #b94a48;
            animation: blinker 0.2s linear infinite;
        }
        .kothing-editor .ke-resizing-bar .ke-char-counter-wrapper .ke-char-label {
            margin-right: 4px;
        }
        .kothing-editor .ke-dialog {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9990;
        }
        .kothing-editor .ke-dialog button,
        .kothing-editor .ke-dialog input,
        .kothing-editor .ke-dialog label {
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
        }
        .kothing-editor .ke-dialog .ke-dialog-back {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(55, 58, 71, 0.9);
            opacity: 0;
            transition: opacity 0.3s;
            transition-duration: 0.3s;
            -webkit-transition: opacity 0.3s;
            -webkit-transition-duration: 0.3s;
        }
        .kothing-editor .ke-dialog.dialog--open .ke-dialog-back {
            opacity: 0.5;
            pointer-events: auto;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1000;
        }
        .kothing-editor .ke-dialog.dialog--close .ke-dialog-inner,
        .kothing-editor .ke-dialog.dialog--open .ke-dialog-inner {
            opacity: 1;
            -webkit-animation-duration: 0.2s;
            animation-duration: 0.2s;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
            -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
            -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out;
        }
        .kothing-editor .ke-dialog.dialog--open .ke-dialog-inner {
            display: block;
            -webkit-animation-name: anim-open;
            animation-name: anim-open;
        }
        .kothing-editor .ke-dialog.dialog--close .ke-dialog-inner {
            display: none;
            -webkit-animation-name: anim-close;
            animation-name: anim-close;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-content {
            position: relative;
            width: auto;
            max-width: 500px;
            margin: 20px auto;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border-radius: 6px;
            outline: 0;
            -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
            -moz-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
        }
        @media screen and (max-width: 509px) {
            .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-content {
                width: 100%;
            }
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-content label {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-content .ke-btn-primary {
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            border-radius: 4px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-header {
            height: 50px;
            padding: 6px 15px;
            border-bottom: 1px solid #e5e5e5;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-header .ke-dialog-close {
            float: right;
            font-weight: 700;
            padding: 6px 0;
            text-shadow: 0 1px 0 #fff;
            -webkit-appearance: none;
            filter: alpha(opacity=100);
            opacity: 1;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-header .ke-modal-title {
            font-size: 14px;
            font-weight: 700;
            margin: 0;
            padding: 0;
            line-height: 2.5;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-body {
            position: relative;
            padding: 15px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form {
            margin-bottom: 10px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form:last-child {
            margin-bottom: 0;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner input:disabled {
            background-color: #f3f3f3;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-size-text {
            width: 100%;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-size-text .size-h,
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-size-text .size-w {
            width: 70px;
            text-align: center;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-size-x {
            margin: 0 8px;
            width: 25px;
            text-align: center;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-footer {
            padding: 10px 15px 15px;
            text-align: right;
            border-top: 1px solid #e5e5e5;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-footer > div {
            float: left;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-footer > div > label {
            margin-top: 5px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-btn-radio {
            margin-left: 12px;
            margin-right: 6px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-btn-check {
            width: 1rem;
            height: 1rem;
            margin-left: 12px;
            margin-right: 4px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-btn-check {
            margin-left: 0;
            margin-right: 4px;
            cursor: pointer;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files {
            position: relative;
            display: flex;
            align-items: center;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files > input {
            flex: auto;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files .ke-dialog-files-edge-button {
            flex: auto;
            opacity: 0.8;
            border: 1px solid #ccc;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files .ke-dialog-files-edge-button.ke-file-remove > svg {
            width: 8px;
            height: 8px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files .ke-dialog-files-edge-button:hover {
            background-color: #f0f0f0;
            outline: 0 none;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-dialog-form-files .ke-dialog-files-edge-button:active {
            background-color: #e9e9e9;
            -webkit-box-shadow: inset 0 3px 5px #d6d6d6;
            box-shadow: inset 0 3px 5px #d6d6d6;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-select {
            display: inline-block;
            width: auto;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height: 1.42857143;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-control {
            display: inline-block;
            width: 70px;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height: 1.42857143;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-form {
            display: block;
            width: 100%;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            padding: 0 4px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-form.ke-input-url:disabled {
            text-decoration: line-through;
            color: #999;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-video-ratio {
            width: 70px;
            margin-left: 4px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form a {
            color: #004cff;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-btn-revert {
            border: 1px solid #ccc;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-btn-revert:hover {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-btn-revert:active {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-dialog-tabs {
            width: 100%;
            border-bottom: 1px solid #e5e5e5;
        }
        .kothing-editor .ke-dialog-tabs ._ke_tab_link {
            background-color: #e5e5e5;
            outline: none;
            border-color: transparent;
            border-right: 1px solid #e5e5e5;
            border-radius: 0;
            padding: 4px 12px;
            transition: 0.3s;
        }
        .kothing-editor .ke-dialog-tabs ._ke_tab_link:hover {
            background-color: #f0f0f0;
        }
        .kothing-editor .ke-dialog-tabs ._ke_tab_link.active {
            background-color: #fff;
            border-bottom: 1px solid #fff;
            margin-bottom: -1px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-form.ke-math-exp {
            resize: vertical;
            height: 4rem;
            border: 1px solid #ccc;
            font-size: 13px;
            padding: 4px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-input-select.ke-math-size {
            width: 6em;
            height: 28px;
            margin-left: 1em;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-math-preview {
            font-size: 13px;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-math-preview > span {
            display: inline-block;
            padding: 0 4px;
            -webkit-box-shadow: 0 0 0 0.1rem #c7deff;
            box-shadow: 0 0 0 0.1rem #c7deff;
        }
        .kothing-editor .ke-dialog .ke-dialog-inner .ke-dialog-form .ke-link-preview {
            display: block;
            height: auto;
            max-height: 18px;
            margin: 4px 0 0 4px;
            font-size: 13px;
            font-weight: 400;
            font-family: inherit;
            color: #666;
            background-color: transparent;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: pre;
        }
        .kothing-editor .ke-controller .ke-arrow.ke-arrow-up {
            border-bottom-color: rgba(0, 0, 0, 0.4);
        }
        .kothing-editor .ke-controller {
            position: absolute;
            display: none;
            overflow: visible;
            z-index: 6;
            border: 1px solid rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            text-align: start;
            text-decoration: none;
            text-shadow: none;
            text-transform: none;
            letter-spacing: normal;
            word-break: normal;
            word-spacing: normal;
            word-wrap: normal;
            white-space: normal;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            line-break: auto;
        }
        .kothing-editor .ke-controller .ke-btn-group {
            position: relative;
            display: flex;
            vertical-align: middle;
            padding: 2px;
            top: 0;
            left: 0;
        }
        .kothing-editor .ke-controller .ke-btn-group .ke-btn-group-sub {
            left: 50%;
            min-width: auto;
            width: max-content;
            display: none;
        }
        .kothing-editor .ke-controller .ke-btn-group .ke-btn-group-sub button {
            margin: 0;
            min-width: 72px;
        }
        .kothing-editor .ke-controller .ke-btn-group button {
            position: relative;
            min-height: 30px;
            height: auto;
            border: none;
            border-radius: 4px;
            margin: 1px;
            padding: 5px 10px;
            font-size: 12px;
            line-height: 1.5;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
        }
        .kothing-editor .ke-controller .ke-btn-group button:focus:enabled,
        .kothing-editor .ke-controller .ke-btn-group button:hover:enabled {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-controller .ke-btn-group button:active:enabled {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-controller .ke-btn-group button span {
            display: block;
            padding: 0;
            margin: 0;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.active {
            color: #4592ff;
            outline: 0 none;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.active:focus,
        .kothing-editor .ke-controller .ke-btn-group button:enabled.active:hover {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.active:active {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            -webkit-box-shadow: inset 0 3px 5px #c1c1c1;
            box-shadow: inset 0 3px 5px #c1c1c1;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.on {
            background-color: #e5e5e5;
            border-color: #d1d1d1;
            outline: 0 none;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.on:focus,
        .kothing-editor .ke-controller .ke-btn-group button:enabled.on:hover {
            background-color: #d1d1d1;
            border-color: #c1c1c1;
            outline: 0 none;
        }
        .kothing-editor .ke-controller .ke-btn-group button:enabled.on:active {
            background-color: #c1c1c1;
            border-color: #b1b1b1;
            -webkit-box-shadow: inset 0 3px 5px #b1b1b1;
            box-shadow: inset 0 3px 5px #b1b1b1;
        }
        .kothing-editor .ke-controller-resizing {
            margin-top: -50px !important;
            padding: 0;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.42857143;
        }
        .kothing-editor .ke-controller-resizing .ke-btn-group .ke-btn-group-sub.ke-resizing-align-list {
            left: 57px;
            width: 74px;
        }
        .kothing-editor .ke-resizing-container {
            position: absolute;
            display: none;
            outline: 1px solid #3f9dff;
            background-color: transparent;
        }
        .kothing-editor .ke-resizing-container .ke-modal-resize {
            position: absolute;
            display: inline-block;
            background-color: #3f9dff;
            opacity: 0.3;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span {
            position: absolute;
            width: 7px;
            height: 7px;
            background-color: #3f9dff;
            border: 1px solid #4592ff;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.tl {
            top: -5px;
            left: -5px;
            cursor: nw-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.tr {
            top: -5px;
            right: -5px;
            cursor: ne-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.bl {
            bottom: -5px;
            left: -5px;
            cursor: sw-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.br {
            right: -5px;
            bottom: -5px;
            cursor: se-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.lw {
            left: -7px;
            bottom: 50%;
            cursor: w-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.th {
            left: 50%;
            top: -7px;
            cursor: n-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.rw {
            right: -7px;
            bottom: 50%;
            cursor: e-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-dot > span.bh {
            right: 50%;
            bottom: -7px;
            cursor: s-resize;
        }
        .kothing-editor .ke-resizing-container .ke-resize-display {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 5px;
            margin: 5px;
            font-size: 12px;
            color: #fff;
            background-color: #333;
            border-radius: 4px;
        }
        .kothing-editor .ke-controller-table,
        .kothing-editor .ke-controller-table-cell {
            width: auto;
        }
        .kothing-editor .ke-controller-link,
        .kothing-editor .ke-controller-table,
        .kothing-editor .ke-controller-table-cell {
            padding: 0;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.42857143;
        }
        .kothing-editor .ke-controller-link:after,
        .kothing-editor .ke-controller-link:before {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .kothing-editor .ke-controller-link .link-content {
            padding: 0;
            margin: 0;
        }
        .kothing-editor .ke-controller-link .link-content a {
            display: inline-block;
            color: #4592ff;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            margin-left: 5px;
        }
        .kothing-editor .ke-file-browser {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9990;
        }
        .kothing-editor .ke-file-browser button,
        .kothing-editor .ke-file-browser input,
        .kothing-editor .ke-file-browser label {
            font-size: 14px;
            line-height: 1.5;
            color: #111;
            margin: 0;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-back {
            background-color: #222;
            opacity: 0.5;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-back,
        .kothing-editor .ke-file-browser .ke-file-browser-inner {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-inner .ke-file-browser-content {
            position: relative;
            width: 960px;
            max-width: 100%;
            margin: 20px auto;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            outline: 0;
            -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        }
        .kothing-editor .ke-file-browser .ke-file-browser-header {
            height: auto;
            min-height: 50px;
            padding: 6px 15px;
            border-bottom: 1px solid #e5e5e5;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-header .ke-file-browser-close {
            float: right;
            font-weight: 700;
            text-shadow: 0 1px 0 #fff;
            -webkit-appearance: none;
            filter: alpha(opacity=100);
            opacity: 1;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-header .ke-file-browser-close > svg {
            width: 12px;
            height: 12px;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-header .ke-file-browser-title {
            font-size: 16px;
            font-weight: 700;
            margin: 0;
            padding: 0;
            line-height: 2.2;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags {
            display: block;
            width: 100%;
            padding: 0;
            text-align: left;
            margin: 0 -15px;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a {
            display: inline-block;
            background-color: #f5f5f5;
            padding: 6px 12px;
            margin: 8px 0 8px 8px;
            color: #333;
            text-decoration: none;
            border-radius: 32px;
            -moz-border-radius: 32px;
            -webkit-border-radius: 32px;
            -moz-background-clip: padding;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            cursor: pointer;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a:hover {
            background-color: #e5e5e5;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a:active {
            background-color: #d1d1d1;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a.on {
            background-color: #ebf3fe;
            color: #4592ff;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a.on:hover {
            background-color: #d8e8fe;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-tags a.on:active {
            background-color: #c7deff;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-body {
            position: relative;
            height: auto;
            min-height: 350px;
            padding: 20px;
            overflow-y: auto;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-body .ke-file-browser-list {
            position: relative;
            width: 100%;
        }
        @media screen and (max-width: 992px) {
            .kothing-editor .ke-file-browser .ke-file-browser-inner .ke-file-browser-content {
                width: 748px;
            }
        }
        @media screen and (max-width: 768px) {
            .kothing-editor .ke-file-browser .ke-file-browser-inner .ke-file-browser-content {
                width: 600px;
            }
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list .ke-file-item-column {
            position: relative;
            display: block;
            height: auto;
            float: left;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-column {
            width: calc(25% - 20px);
            margin: 0 10px;
        }
        @media screen and (max-width: 992px) {
            .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-column {
                width: calc(33% - 20px);
            }
        }
        @media screen and (max-width: 768px) {
            .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-column {
                width: calc(50% - 20px);
            }
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-img {
            position: relative;
            display: block;
            cursor: pointer;
            width: 100%;
            height: auto;
            border-radius: 4px;
            outline: 0;
            margin: 10px 0;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-img:hover {
            opacity: 0.8;
            -webkit-box-shadow: 0 0 0 0.2rem #3288ff;
            box-shadow: 0 0 0 0.2rem #3288ff;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-img > img {
            position: relative;
            display: block;
            width: 100%;
            border-radius: 4px;
            outline: 0;
            height: auto;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-img > .ke-file-img-name {
            position: absolute;
            z-index: 1;
            font-size: 13px;
            color: #fff;
            left: 0;
            bottom: 0;
            padding: 5px 10px;
            background-color: transparent;
            width: 100%;
            height: 30px;
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        .kothing-editor .ke-file-browser .ke-file-browser-list.ke-image-list .ke-file-item-img > .ke-file-img-name.ke-file-name-back {
            background-color: #333;
            opacity: 0.6;
        }
        .kothing-editor .ke-notice {
            position: absolute;
            top: 0;
            display: none;
            z-index: 7;
            width: 100%;
            height: auto;
            word-break: break-all;
            font-size: 13px;
            color: #b94a48;
            background-color: #f2dede;
            padding: 15px;
            margin: 0;
            border: 1px solid #eed3d7;
            user-select: text;
            -o-user-select: text;
            -moz-user-select: text;
            -khtml-user-select: text;
            -webkit-user-select: text;
            -ms-user-select: text;
        }
        .kothing-editor .ke-notice button {
            float: right;
            padding: 7px;
        }
        .kothing-editor .ke-tooltip {
            position: relative;
            overflow: visible;
        }
        .kothing-editor .ke-tooltip .ke-tooltip-inner {
            visibility: hidden;
            position: absolute;
            display: block;
            width: auto;
            top: 120%;
            left: 50%;
            background: transparent;
            opacity: 0;
            z-index: 1;
            line-height: 1.5;
            transition: opacity 0.5s;
            margin: 0;
            padding: 0;
            bottom: auto;
            float: none;
            pointer-events: none;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
        }
        .kothing-editor .ke-tooltip .ke-tooltip-inner .ke-tooltip-text {
            position: relative;
            display: inline-block;
            width: auto;
            left: -50%;
            font-size: 0.9em;
            margin: 0;
            padding: 4px 6px;
            border-radius: 3px;
            background-color: #333;
            color: #fff;
            text-align: center;
            line-height: unset;
            white-space: nowrap;
            cursor: auto;
        }
        .kothing-editor .ke-tooltip .ke-tooltip-inner .ke-tooltip-text:after {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border: 5px solid transparent;
            border-bottom-color: #333;
        }
        .kothing-editor .ke-tooltip:hover .ke-tooltip-inner {
            visibility: visible;
            opacity: 1;
        }
        .ke_tooltip {
            background-color: #222;
            padding: 4px 10px;
            font-size: 0.815em;
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 3px;
            opacity: 0;
            pointer-events: none;
            z-index: 19999;
            -webkit-font-smoothing: antialiased;
            transition-duration: 0.3s;
            transition-property: opacity;
        }
        .ke_tooltip.tooltip__visible {
            opacity: 0.8;
        }
        .ke_tooltip.trans__toTop {
            transform: translateY(10px);
            transition-property: opacity, transform;
        }
        .ke_tooltip.trans__toTop.tooltip__visible {
            transform: translateY(0);
        }
        .ke_tooltip.trans__toBottom {
            transform: translateY(0);
            transition-property: opacity, transform;
        }
        .ke_tooltip.trans__toBottom.tooltip__visible {
            transform: translateY(6px);
        }
        .ke_tooltip.trans__rotate {
            transform: rotateX(90deg);
            border-radius: 100px 100px 3px 3px;
            transition-property: opacity, transform, border-radius;
        }
        .ke_tooltip.trans__rotate.tooltip__visible {
            border-radius: 3px;
            transform: rotateX(0deg);
        }
        .ke_tooltip.trans__scale {
            transform: skew(50deg) scale(0);
            transition-property: opacity, transform;
        }
        .ke_tooltip.trans__scale.tooltip__visible {
            transform: skew(0deg) scale(1);
        }
        .ke_tooltip.trans__skew {
            transform: skewX(50deg);
            transition-property: opacity, transform;
        }
        .ke_tooltip.trans__skew.tooltip__visible {
            transform: skewX(0deg);
        }
        .ke_tooltip:after {
            content: "";
            position: absolute;
        }
        .ke_tooltip.tooltip__bottom:after {
            top: auto !important;
            bottom: 100% !important;
            border-top-color: transparent;
            border-bottom-color: #222;
        }
        .ke_tooltip.direction__top:after {
            left: calc(50% - 6px);
            top: 100%;
            border: 6px solid transparent;
            border-top-color: #222;
        }
        .ke_tooltip.direction__bottom:after {
            left: calc(50% - 6px);
            top: -12px;
            border: 6px solid transparent;
            border-bottom-color: #222;
        }
        .ke_tooltip.direction__left:after {
            top: calc(50% - 6px);
            right: -12px;
            border: 6px solid transparent;
            border-left-color: #222;
        }
        .ke_tooltip.direction__right:after {
            top: calc(50% - 6px);
            left: -12px;
            border: 6px solid transparent;
            border-right-color: #222;
        }
        @keyframes blinker {
            50% {
                opacity: 0;
            }
        }
        @keyframes spinner {
            to {
                transform: rotate(361deg);
            }
        }
        @-webkit-keyframes anim-open {
            0% {
                opacity: 0;
                -webkit-transform: translate3d(0, 50px, 0);
            }
            to {
                opacity: 1;
                -webkit-transform: translateZ(0);
            }
        }
        @keyframes anim-open {
            0% {
                opacity: 0;
                -webkit-transform: translate3d(0, 50px, 0);
                transform: translate3d(0, 50px, 0);
            }
            to {
                opacity: 1;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        }
        @-webkit-keyframes anim-close {
            0% {
                opacity: 1;
                -webkit-transform: translateZ(0);
            }
            to {
                opacity: 0;
                -webkit-transform: translate3d(0, 50px, 0);
            }
        }
        @keyframes anim-close {
            0% {
                opacity: 1;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
            to {
                opacity: 0;
                -webkit-transform: translate3d(0, 50px, 0);
                transform: translate3d(0, 50px, 0);
            }
        }
        @-webkit-keyframes anim-elem {
            0% {
                opacity: 0;
                -webkit-transform: translate3d(0, 25px, 0);
            }
            to {
                opacity: 1;
                -webkit-transform: translateZ(0);
            }
        }
        @keyframes anim-elem {
            0% {
                opacity: 0;
                -webkit-transform: translate3d(0, 25px, 0);
                transform: translate3d(0, 25px, 0);
            }
            to {
                opacity: 1;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        }
        .kothing-editor-editable {
            font-family: Helvetica Neue, sans-serif;
            font-size: 13px;
            color: #333;
            line-height: 1.5;
            text-align: left;
            background-color: #fff;
            word-break: normal;
            word-wrap: break-word;
            padding: 16px;
            margin: 0;
        }
        .kothing-editor-editable * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-family: inherit;
            font-size: inherit;
            color: inherit;
        }
        .kothing-editor-editable audio,
        .kothing-editor-editable figcaption,
        .kothing-editor-editable figure,
        .kothing-editor-editable iframe,
        .kothing-editor-editable img,
        .kothing-editor-editable td,
        .kothing-editor-editable th,
        .kothing-editor-editable video {
            position: relative;
        }
        .kothing-editor-editable .__ke__float-left {
            float: left;
        }
        .kothing-editor-editable .__ke__float-right {
            float: right;
        }
        .kothing-editor-editable .__ke__float-center {
            float: center;
        }
        .kothing-editor-editable .__ke__float-none {
            float: none;
        }
        .kothing-editor-editable :not(.ke-code-language .katex) span {
            display: inline;
            vertical-align: baseline;
            margin: 0;
            padding: 0;
        }
        .kothing-editor-editable span.katex {
            display: inline-block;
        }
        .kothing-editor-editable a {
            color: #004cff;
            text-decoration: none;
        }
        .kothing-editor-editable span[style~="color:"] a {
            color: inherit;
        }
        .kothing-editor-editable a:focus,
        .kothing-editor-editable a:hover {
            cursor: pointer;
            color: #0093ff;
            text-decoration: underline;
        }
        .kothing-editor-editable pre {
            display: block;
            padding: 8px;
            margin: 0 0 10px;
            font-family: monospace;
            color: #666;
            line-height: 1.45;
            background-color: #f9f9f9;
            border: 1px solid #e1e1e1;
            border-radius: 2px;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: visible;
        }
        .kothing-editor-editable ol {
            list-style-type: decimal;
        }
        .kothing-editor-editable ol,
        .kothing-editor-editable ul {
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding-inline-start: 40px;
        }
        .kothing-editor-editable ul {
            list-style-type: disc;
        }
        .kothing-editor-editable li {
            display: list-item;
            text-align: -webkit-match-parent;
            margin-bottom: 5px;
        }
        .kothing-editor-editable ol ol,
        .kothing-editor-editable ol ul,
        .kothing-editor-editable ul ol,
        .kothing-editor-editable ul ul {
            margin: 0;
        }
        .kothing-editor-editable ol ol,
        .kothing-editor-editable ul ol {
            list-style-type: lower-alpha;
        }
        .kothing-editor-editable ol ol ol,
        .kothing-editor-editable ul ol ol,
        .kothing-editor-editable ul ul ol {
            list-style-type: upper-roman;
        }
        .kothing-editor-editable ol ul,
        .kothing-editor-editable ul ul {
            list-style-type: circle;
        }
        .kothing-editor-editable ol ol ul,
        .kothing-editor-editable ol ul ul,
        .kothing-editor-editable ul ul ul {
            list-style-type: square;
        }
        .kothing-editor-editable sub,
        .kothing-editor-editable sup {
            font-size: 75%;
            line-height: 0;
        }
        .kothing-editor-editable sub {
            vertical-align: sub;
        }
        .kothing-editor-editable sup {
            vertical-align: super;
        }
        .kothing-editor-editable p {
            display: block;
            margin: 0 0 10px;
        }
        .kothing-editor-editable div {
            display: block;
            margin: 0;
            padding: 0;
        }
        .kothing-editor-editable blockquote {
            display: block;
            font-family: inherit;
            font-size: inherit;
            color: #999;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding: 0 5px 0 20px;
            border: solid #b1b1b1;
            border-width: 0 0 0 5px;
        }
        .kothing-editor-editable blockquote blockquote {
            border-color: #c1c1c1;
        }
        .kothing-editor-editable blockquote blockquote blockquote {
            border-color: #d1d1d1;
        }
        .kothing-editor-editable blockquote blockquote blockquote blockquote {
            border-color: #e1e1e1;
        }
        .kothing-editor-editable h1 {
            font-size: 2em;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
        }
        .kothing-editor-editable h1,
        .kothing-editor-editable h2 {
            display: block;
            margin-inline-start: 0;
            margin-inline-end: 0;
            font-weight: 700;
        }
        .kothing-editor-editable h2 {
            font-size: 1.5em;
            margin-block-start: 0.83em;
            margin-block-end: 0.83em;
        }
        .kothing-editor-editable h3 {
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
        }
        .kothing-editor-editable h3,
        .kothing-editor-editable h4 {
            display: block;
            margin-inline-start: 0;
            margin-inline-end: 0;
            font-weight: 700;
        }
        .kothing-editor-editable h4 {
            font-size: 1em;
            margin-block-start: 1.33em;
            margin-block-end: 1.33em;
        }
        .kothing-editor-editable h5 {
            font-size: 0.83em;
            margin-block-start: 1.67em;
            margin-block-end: 1.67em;
        }
        .kothing-editor-editable h5,
        .kothing-editor-editable h6 {
            display: block;
            margin-inline-start: 0;
            margin-inline-end: 0;
            font-weight: 700;
        }
        .kothing-editor-editable h6 {
            font-size: 0.67em;
            margin-block-start: 2.33em;
            margin-block-end: 2.33em;
        }
        .kothing-editor-editable hr {
            display: flex;
            border-width: 1px 0 0;
            border-color: #000;
            border-image: initial;
            height: 1px;
        }
        .kothing-editor-editable hr.__ke__solid {
            border-style: solid none none;
        }
        .kothing-editor-editable hr.__ke__dotted {
            border-style: dotted none none;
        }
        .kothing-editor-editable hr.__ke__dashed {
            border-style: dashed none none;
        }
        .kothing-editor-editable table {
            display: table;
            table-layout: auto;
            border: 1px solid #ccc;
            width: 100%;
            max-width: 100%;
            margin: 0 0 10px;
            background-color: transparent;
            border-spacing: 0;
            border-collapse: collapse;
        }
        .kothing-editor-editable table thead {
            border-bottom: 2px solid #333;
        }
        .kothing-editor-editable table tr {
            border: 1px solid #efefef;
        }
        .kothing-editor-editable table th {
            background-color: #f3f3f3;
        }
        .kothing-editor-editable table td,
        .kothing-editor-editable table th {
            border: 1px solid #e1e1e1;
            padding: 0.4em;
            background-clip: padding-box;
        }
        .kothing-editor-editable table.ke-table-size-auto {
            width: auto !important;
        }
        .kothing-editor-editable table.ke-table-size-100 {
            width: 100% !important;
        }
        .kothing-editor-editable table.ke-table-layout-auto {
            table-layout: auto !important;
        }
        .kothing-editor-editable table.ke-table-layout-fixed {
            table-layout: fixed !important;
        }
        .kothing-editor-editable table td.ke-table-selected-cell,
        .kothing-editor-editable table th.ke-table-selected-cell {
            border: 1px double #4592ff;
            background-color: #f1f7ff;
        }
        .kothing-editor-editable.ke-disabled * {
            user-select: none;
            -o-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
        .kothing-editor-editable .ke-component {
            display: flex;
            padding: 1px;
            margin: 0 0 10px;
        }
        .kothing-editor-editable .ke-component.__ke__float-left {
            margin: 0 20px 10px 0;
        }
        .kothing-editor-editable .ke-component.__ke__float-right {
            margin: 0 0 10px 20px;
        }
        .kothing-editor-editable[contenteditable="true"] .ke-component {
            outline: 1px dashed #e1e1e1;
        }
        .kothing-editor-editable[contenteditable="true"] .ke-component.ke-component-copy {
            -webkit-box-shadow: 0 0 0 0.2rem #80bdff;
            box-shadow: 0 0 0 0.2rem #3f9dff;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .kothing-editor-editable audio,
        .kothing-editor-editable iframe,
        .kothing-editor-editable img,
        .kothing-editor-editable video {
            display: block;
            margin: 0;
            padding: 0;
            width: auto;
            height: auto;
            max-width: 100%;
        }
        .kothing-editor-editable[contenteditable="true"] figure:after {
            position: absolute;
            content: "";
            z-index: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: default;
            display: block;
            background: transparent;
        }
        .kothing-editor-editable[contenteditable="true"] figure a,
        .kothing-editor-editable[contenteditable="true"] figure iframe,
        .kothing-editor-editable[contenteditable="true"] figure img,
        .kothing-editor-editable[contenteditable="true"] figure video {
            z-index: 0;
        }
        .kothing-editor-editable[contenteditable="true"] figure figcaption {
            display: block;
            z-index: 2;
        }
        .kothing-editor-editable[contenteditable="true"] figure figcaption:focus {
            border-color: #80bdff;
            outline: 0;
            -webkit-box-shadow: 0 0 0 0.2rem #c7deff;
            box-shadow: 0 0 0 0.2rem #c7deff;
        }
        .kothing-editor-editable .ke-image-container,
        .kothing-editor-editable .ke-video-container {
            width: auto;
            height: auto;
            max-width: 100%;
        }
        .kothing-editor-editable figure {
            display: block;
            outline: none;
            margin: 0;
            padding: 0;
        }
        .kothing-editor-editable figure figcaption {
            padding: 1em 0.5em;
            margin: 0;
            background-color: #f9f9f9;
            outline: none;
        }
        .kothing-editor-editable figure figcaption p {
            line-height: 2;
            margin: 0;
        }
        .kothing-editor-editable .ke-image-container a img {
            padding: 1px;
            margin: 1px;
            outline: 1px solid #4592ff;
        }
        .kothing-editor-editable .ke-video-container iframe,
        .kothing-editor-editable .ke-video-container video {
            outline: 1px solid #9e9e9e;
            position: absolute;
            top: 0;
            left: 0;
            border: 0;
            width: 100%;
            height: 100%;
        }
        .kothing-editor-editable .ke-video-container figure {
            left: 0;
            width: 100%;
            max-width: 100%;
        }
        .kothing-editor-editable audio {
            width: 300px;
            height: 54px;
        }
        .kothing-editor-editable audio.active {
            outline: 2px solid #80bdff;
        }
        .kothing-editor-editable.ke-show-block div,
        .kothing-editor-editable.ke-show-block h1,
        .kothing-editor-editable.ke-show-block h2,
        .kothing-editor-editable.ke-show-block h3,
        .kothing-editor-editable.ke-show-block h4,
        .kothing-editor-editable.ke-show-block h5,
        .kothing-editor-editable.ke-show-block h6,
        .kothing-editor-editable.ke-show-block li,
        .kothing-editor-editable.ke-show-block ol,
        .kothing-editor-editable.ke-show-block p,
        .kothing-editor-editable.ke-show-block pre,
        .kothing-editor-editable.ke-show-block ul {
            border: 1px dashed #3f9dff !important;
            padding: 14px 8px 8px !important;
        }
        .kothing-editor-editable.ke-show-block ol,
        .kothing-editor-editable.ke-show-block ul {
            border: 1px dashed #d539ff !important;
        }
        .kothing-editor-editable.ke-show-block pre {
            border: 1px dashed #27c022 !important;
        }
        .ke-show-block p {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPAQMAAAAF7dc0AAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAaSURBVAjXY/j/gwGCPvxg+F4BQiAGDP1HQQByxxw0gqOzIwAAAABJRU5ErkJggg==") no-repeat;
        }
        .ke-show-block div {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPAQMAAAAxlBYoAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j//wcDDH+8XsHwDYi/hwNx1A8w/nYLKH4XoQYJAwCXnSgcl2MOPgAAAABJRU5ErkJggg==") no-repeat;
        }
        .ke-show-block h1 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAfSURBVAjXY/j/v4EBhr+9B+LzEPrDeygfhI8j1CBhAEhmJGY4Rf6uAAAAAElFTkSuQmCC") no-repeat;
        }
        .ke-show-block h2 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j/v4EBhr+dB+LtQPy9geEDEH97D8T3gbgdoQYJAwA51iPuD2haEAAAAABJRU5ErkJggg==") no-repeat;
        }
        .ke-show-block h3 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQPy9geHDeQgN5p9HqEHCADeWI+69VG2MAAAAAElFTkSuQmCC") no-repeat;
        }
        .ke-show-block h4 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPAQMAAADTSA1RAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j//wADDH97DsTXIfjDdiDdDMTfIRhZHRQDAKJOJ6L+K3y7AAAAAElFTkSuQmCC") no-repeat;
        }
        .ke-show-block h5 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAlSURBVAjXY/j/v4EBhr+1A/F+IO5vYPiwHUh/B2IQfR6hBgkDABlWIy5uM+9GAAAAAElFTkSuQmCC") no-repeat;
        }
        .ke-show-block h6 {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQLy/geFDP5S9HSKOrA6KAR9GIza1ptJnAAAAAElFTkSuQmCC") no-repeat;
        }
        .ke-show-block li {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPYxgFcNDQ0PAfykQBIHEYhgoRB/BpwCfHBKWpBkaggYxQGgOgBzyQD1aLLA4TGwWDGjAwAACR3RcEU9Ui+wAAAABJRU5ErkJggg==")
                no-repeat;
        }
        .ke-show-block ol {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABHSURBVDhPYxgFcNDQ0PAfhKFcFIBLHCdA1oBNM0kGEmMAPgOZoDTVANUNxAqQvURMECADRiiNAWCagDSGGhyW4DRrMAEGBgAu0SX6WpGgjAAAAABJRU5ErkJggg==")
                no-repeat;
        }
        .ke-show-block ul {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA1SURBVDhPYxgFDA0NDf+hTBSALI5LDQgwQWmqgVEDKQcsUBoF4ItFGEBXA+QzQpmDGjAwAAA8DQ4Lni6gdAAAAABJRU5ErkJggg==")
                no-repeat;
        }
        .kothing-editor-editable .__ke__p-bordered,
        .kothing-editor .__ke__p-bordered {
            border-top: 1px solid #b1b1b1;
            border-bottom: 1px solid #b1b1b1;
            padding: 4px 0;
        }
        .kothing-editor-editable .__ke__p-spaced,
        .kothing-editor .__ke__p-spaced {
            letter-spacing: 1px;
        }
        .kothing-editor-editable .__ke__p-neon,
        .kothing-editor .__ke__p-neon {
            font-weight: 200;
            font-style: italic;
            background: #000;
            color: #fff;
            padding: 6px 4px;
            border: 2px solid #fff;
            border-radius: 6px;
            text-transform: uppercase;
            animation: neonFlicker 1.5s infinite alternate;
        }
        @keyframes neonFlicker {
            0%,
            19%,
            21%,
            23%,
            25%,
            54%,
            56%,
            to {
                text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff, 0 0 2px #f40, 0 0 4px #f40, 0 0 6px #f40, 0 0 8px #f40, 0 0 10px #f40;
                box-shadow: 0 0 0.5px #fff, inset 0 0 0.5px #fff, 0 0 2px #08f, inset 0 0 2px #08f, 0 0 4px #08f, inset 0 0 4px #08f;
            }
            20%,
            24%,
            55% {
                text-shadow: none;
                box-shadow: none;
            }
        }
        .kothing-editor-editable .__ke__t-shadow,
        .kothing-editor .__ke__t-shadow {
            text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff, 0 0 0.2rem #999, 0 0 0.4rem #888, 0 0 0.6rem #777, 0 0 0.8rem #666, 0 0 1rem #555;
        }
        .kothing-editor-editable .__ke__t-code,
        .kothing-editor .__ke__t-code {
            font-family: monospace;
            color: #666;
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 6px;
            padding: 0.2em 0.4em;
        }
        
        
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);