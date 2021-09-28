import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/iron-collapse/iron-collapse.js';


import './checkbox-tree';
import { DialogLayoutMixin } from '../mixins/dialog-layout-mixin';

class CheckboxTree extends DialogLayoutMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }
            </style>
            
            <template is="dom-if" if="[[parentPath]]">
                <div style="margin: 8px; position: relative;">
                    <paper-checkbox name="[[parentPath.path]]" checked="{{parentChecked}}">[[parentPath.name]]</paper-checkbox>
                    <paper-tooltip animation-delay="0">[[parentPath.description]]</paper-tooltip>
                </div>
            </template>
            
            <div id="domTree" style$="[[getHiddenStyle(parentChecked)]]">
                <template is="dom-repeat" items="[[tree]]" as="tree">
                    <checkbox-tree object-tree="[[tree]]" style$="[[getMargin(parentPath)]]"></checkbox-tree>
                </template>
            </div>
       

        `;
    }
    
    static get properties() {
        return {
            tree:{type:Array,notify:true},
            mapList:{type:Object,notify:true,observer: "_mapListChanged"},
            parentChecked:{type:Boolean,notify:true,reflectToAttribute: true},
            parentPath:{type:Object,notify:true,value: null,reflectToAttribute:true},
            objectTree:{type:Object,notify:true,observer: "_objectTreeChanged" }
        };
    }
    
    getHiddenStyle(checked){
        if(checked){
            this.DialogLayout_notifyResize();

            return "";
        }
        else return "display: none !important;";
    }
    
    selectTree(accessList){
        var domTree=this.$.domTree;
        var map={};

        if(accessList.allAccess && accessList.allAccess==true){
            for(var i=0;i<domTree.children.length;i++){
                var child=domTree.children[i];
                if(child.tagName.toLowerCase()=="checkbox-tree"){
                    child.set("parentChecked",true);
                    child.selectTree(accessList);
                }
            }
        }else{
            for(var i=0;i<domTree.children.length;i++){
                var child=domTree.children[i];
                if(child.tagName.toLowerCase()=="checkbox-tree"){
                    child.set("parentChecked",(accessList[child.parentPath.path] && accessList[child.parentPath.path]==true));
                    child.selectTree(accessList);
                }
            }
        }
       
    }
    
    clearTree(){
        var domTree=this.$.domTree;
        var map={};
        for(var i=0;i<domTree.children.length;i++){
            var child=domTree.children[i];
            if(child.tagName.toLowerCase()=="checkbox-tree"){
                child.set("parentChecked",false);
                child.clearTree();
            }
        }
    }
    
    getSelectedList(){
        var domTree=this.$.domTree;
        var map={};
        for(var i=0;i<domTree.children.length;i++){
            var child=domTree.children[i];
            if(child.tagName.toLowerCase()=="checkbox-tree"){
                //console.log(child,child.parentPath.path,child.parentChecked);
                if(child.parentChecked){
                    map[child.parentPath.path]=child.parentChecked;
                    var childMap=child.getSelectedList();
                    var childKeys=Object.keys(childMap);
                    PolymerUtils.iterateArray(childKeys,function(key){
                        map[key]=childMap[key];
                    });
                }
            } 
        }
        return map;
    }
    
    _objectTreeChanged(origin){
        var arr=[];
        if(origin){
            if(origin.path){
                this.set("parentPath",{"path":origin.path,"name":origin.name,"description":origin.description});
            }
            
            if(!origin._main){
                if(origin.children){
                    var keys=Object.keys(origin.children);
                    for(var i=0;i<keys.length;i++){
                        var child=origin.children[keys[i]];
                        if(this.parentPath){
                            child.path=this.parentPath.path+"/"+keys[i];
                        }else{
                            child.path=keys[i];
                        }
                        child.parent=this.parentPath;
                        arr.push(child);
                    }
                }
            }else{
                var keys=Object.keys(origin);
                for(var i=0;i<keys.length;i++){
                    if(keys[i]=="_main"){
                        continue;
                    }
                    var child=origin[keys[i]];
                    if(this.parentPath){
                        child.path=this.parentPath.path+"/"+keys[i];
                    }else{
                        child.path=keys[i];
                    }
                    arr.push(child);
                }
                this.set("parentChecked",true);
            }
        }
        this.set("tree",arr);
    }
    
    getMargin(parentPath){
        if(parentPath){
            return "margin-left: 32px;";
        }
        else return "";
    }
    _mapListChanged(mapList){
        console.log("Map list",mapList);
    }
}

customElements.define('checkbox-tree', CheckboxTree);