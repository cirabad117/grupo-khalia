/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
	<template>
		<style>
			.carta {
				margin: 8px;
				padding: 16px;
				color: #757575;
				border-radius: 5px;
				background-color: #fff;
			}
			
			.circle {
				display: inline-block;
				width: 64px;
				height: 64px;
				text-align: center;
				color: #555;
				border-radius: 50%;
				background: #ddd;
				font-size: 30px;
				line-height: 64px;
			}
			
			h1 {
				margin: 16px 0;
				color: #212121;
				font-size: 22px;
			}
			
			.separador{
				border:2px solid var(--paper-blue-300);
				border-radius:5px;
				margin: 5px;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
