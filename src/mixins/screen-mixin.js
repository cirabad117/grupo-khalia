import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

import '@polymer/iron-media-query/iron-media-query.js';

let internalMixinScreen = function(superClass) {
	return class extends superClass {
		constructor(){
			super();
		}
		
		ready(){
			super.ready();
			var queryContainer=document.createElement("iron-media-query");
			var context=this;
			queryContainer.query="(max-width: 640px)";
			queryContainer.addEventListener("query-matches-changed",function(e){
				context.set("_smallScreen",e.detail.value);
			});
			this.shadowRoot.appendChild(queryContainer);
		}
		
		static get properties(){
			return{
				_smallScreen:{
					type:Boolean,
					notify:true,
					reflectToAttribute: true,
					observer: "_smallScreenChanged"
				}
			};
		}
	}
}
export const ScreenMixin = dedupingMixin(internalMixinScreen);