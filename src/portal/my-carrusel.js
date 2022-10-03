import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


class MyCarrusel extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host{
                    display:block;
                }

                .slider-wrapper {
                    position: relative;
                    overflow: hidden;
                }
                
                .slides-container {
                    height: 350px;
                    width: 100%;
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    overflow: scroll;
                    scroll-behavior: smooth;
                    scrollbar-width: none; 
                    -ms-overflow-style: none;  
                }
               
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
                
                .dot {
                    cursor: pointer;
                    height: 15px;
                    width: 15px;
                    margin: 0 2px;
                    background-color: #bbb;
                    border-radius: 50%;
                    display: inline-block;
                    transition: background-color 0.6s ease;
                }
                .active, .dot:hover {
                    background-color: #717171;
                }
             
            </style>
            
            <section class="slider-wrapper">
                <button class="slide-arrow" id="slide-arrow-prev" on-click="movePrev">
                    &#8249;
                </button>
                <button class="slide-arrow" id="slide-arrow-next" on-click="moveNext">
                    &#8250;
                </button>
                <ul class="slides-container" id="slides-container">
                    <li class="slide" style="background-color:var(--paper-blue-500);"></li>
                    <li class="slide" style="background-color:var(--paper-green-500);"></li>
                    <li class="slide" style="background-color:var(--paper-red-500);"></li>
                    <li class="slide" style="background-color:var(--paper-purple-500);"></li>
                </ul>
                <div style="text-align:center">
                    <span class="dot" onclick="currentSlide(1)"></span>
                    <span class="dot" onclick="currentSlide(2)"></span>
                    <span class="dot" onclick="currentSlide(3)"></span>
                </div>
            </section>

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

customElements.define('my-carrusel', MyCarrusel);