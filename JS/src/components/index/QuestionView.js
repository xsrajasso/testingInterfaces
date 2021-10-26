import {AbstractView} from '@universidad-carolina/abstractview';
import {boundMethod, customElement } from '@universidad-carolina/decorators';
import translate from "@universidad-carolina/translate";
import { $ } from "@universidad-carolina/helpers";
import Eventing from "@universidad-carolina/eventing"

import logo from "../../img/logo.png";
import css from  "!style-loader!css-loader!postcss-loader!./index.css"

import { questions } from '../../data/questions';
import { SingleQuestion } from './SingleQuestion';
import { ResultsView } from './ResultsView';

@customElement('index-view')

export class QuestionView extends AbstractView{
    constructor(model){
        super();
        this.model = {};
        this.model.questions = questions;
        this.current = 0;
        this.radio = Eventing
    }

    uiEvents = {
        "click: #next": this.onClickNext,
        "click: #restart": this.restart,
        "click: #return": this.return,

    }

    onRender(){
        this.area = $("#pregunta");
        console.log(this.area);
        this.view = new SingleQuestion(this.model.questions[this.current]);
        this.area.appendChild(this.view)

    }

    @boundMethod
    onClickNext(){
        this.radio.trigger("save:answer");
        this.model.questions[this.current].selected = this.view.modelo.selected;
        this.view.radio.off("save:answer");
        this.current++;
        if (this.current >= this.model.questions.length) {
            console.log("ya Acabo");
            this.current--;
            this.view = new ResultsView(this.model);
            $("#next").hidden = true;
            $("#return").hidden = true;
            $("#restart").hidden = false;
        }else{
            this.view = new SingleQuestion(this.model.questions[this.current]);
            $("#return").hidden = false
        }
        
        this.area.innerHTML = "";
        this.area.appendChild(this.view);
    }

    @boundMethod
    return(){
        this.current--;
        this.view = new QuestionView(this.model.questions[this.current]);
        this.area.innerHTML = "";
        this.area.appendChild(this.view);
        if(this.current == 0) $("#return").hidden = true
    }
    @boundMethod
    restart(){
        this.current = 0;
        this.render();
    }



    template(){
        return `
        <div class = "container">
            <br><br><br>
            <div class = "row justify-content-center">
                <h4> Examen de práctica </h4>
            </div>
            <br><br><br>
            <div class = "row" id = "pregunta">

            </div>

            <div>
                <button id = "return" class="secondary" hidden> Anterior </button>
                <button id = "next"> Siguiente </button>
                <button id = "restart" hidden> Reiniciar </button>
            </div>

        </div>
        `
    }
}