import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { AuthMixin } from './mixins/auth-mixin.js';

import './auth/my-inicio-sesion.js';

import './bootstrap.js';

class MyInicio extends AuthMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="bootstrap">
                :host{
                    display:block;
                }
                .slider-wrapper {
                    margin: 5px;
                    position: relative;
                    overflow: hidden;
                }
                
                .slides-container {
                    height: 250px;
                    width: 100%;
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    overflow: scroll;
                    scroll-behavior: smooth;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                }
                /* WebKit */
                .slides-container::-webkit-scrollbar { 
                    width: 0;
                    height: 0;
                }
                
                .slide {
                    width: 100%;
                    height: 100%;
                    flex: 1 0 100%;
                }
                
                .slide-arrow {
                    position: absolute;
                    display: flex;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    height: 60px;
                    background-color: white;
                    border: none;
                    width: 35px;
                    font-size: 40px;
                    padding: 0;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: opacity 100ms;
                }
                
                .slide-arrow:hover,
                .slide-arrow:focus {
                    opacity: 1;
                }
                
                #slide-arrow-prev {
                    left: 0;
                    padding-left: 0.25rem;
                    border-radius: 0 2rem 2rem 0;
                }
                
                #slide-arrow-next {
                    right: 0;
                    padding-left: 0.75rem;
                    border-radius: 2rem 0 0 2rem;
                }
                
                /*.big-container{
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction:column;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                }

                .background-container{
                    background-size: cover;
                    background-position: center;
                }
               
                .title-container{
                    background: #E1F5FE;
                    background-size: 100% 100%;
                    border-radius: 8px 8px 0px 0px;
                } */
            </style>
            
            <template is="dom-if" if="[[_loggedUser]]"> 
            <img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">

                <!-- <div class="container">
                    <div class="row">

                        <div class="col-sm-8">
                            <section class="slider-wrapper">
                                <button class="slide-arrow" id="slide-arrow-prev" on-click="movePrev">
                                    &#8249;
                                </button>
                                <button class="slide-arrow" id="slide-arrow-next" on-click="moveNext">
                                    &#8250;
                                </button>
                                <ul class="slides-container" id="slides-container">
                                    <li class="slide bg-success"></li>
                                    <li class="slide bg-primary"></li>
                                    <li class="slide bg-warning"></li>
                                    <li class="slide bg-danger"></li>
                                </ul>
                            </section>
                        </div>
                        
                        <div class="col-sm-4">
                            <div class="card card-body bg-light">
                                <p>Some text..</p>
                            </div>
                            <div class="card card-body bg-light">
                                <p>Upcoming Events..</p>
                            </div>
                            <div class="card card-body bg-light">
                                <p>Visit Our Blog</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                
                <div class="container text-center">
                    <h3>What We Do</h3>
                    <br>
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Current Project</p>
                        </div>
                        <div class="col-sm-3">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Project 2</p>
                        </div>
                        <div class="col-sm-3">
                            <div class="card card-body bg-light">
                                <p>Some text..</p>
                            </div>
                            <div class="card card-body bg-light">
                                <p>Some text..</p>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card card-body bg-light">
                                <p>Some text..</p>
                            </div>
                            <div class="card card-body bg-light">
                                <p>Some text..</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                
                <div class="container text-center">
                    <h3>Our Partners</h3>
                    <br>
                    <div class="row">
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 1</p>
                        </div>
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 2</p>
                        </div>
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 3</p>
                        </div>
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 4</p>
                        </div>
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 5</p>
                        </div>
                        <div class="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" class="img-fluid" style="width:100%" alt="Image">
                            <p>Partner 6</p>
                        </div>
                    </div>
                </div>
                <br> -->
           </template> 

            <template is="dom-if" if="[[!_loggedUser]]">
                <div class="background-container" style="display: flex; align-items: center; justify-content: center; flex-direction: column; height: 100vh;">
                    <div style="width: 450px; max-width: 95%; height: auto; max-width: 95%; background-color: white; border-radius: 10px; border: 1px solid var(--paper-grey-100);">
                        <img class="img img-fluid mx-auto d-block" src="../images/logo-khalia10.jpeg">
                        <div class="title-container"  style="position: relative;">
                        </div>
                        <div class="big-container" style="padding: 24px 0px;">
                            <my-inicio-sesion></my-inicio-sesion>
                        </div>
                    </div>
                </div>
            </template>
            
        `;
    }

    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        var t=this;

        // setInterval(() => {
        //     const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        // const slide = this.shadowRoot.querySelector(".slide");
        // const slideWidth = slide.clientWidth;
        // slidesContainer.scrollLeft += slideWidth;
        // }, 2000);

      
    }

    moveNext(){
        const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        const slide = this.shadowRoot.querySelector(".slide");
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;

    }
    movePrev(){
        const slidesContainer = this.shadowRoot.querySelector("#slides-container");
        const slide = this.shadowRoot.querySelector(".slide");
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
        
    }
}

customElements.define('my-inicio', MyInicio);