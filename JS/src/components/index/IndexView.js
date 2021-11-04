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
import { QuestionView } from './QuestionView';

@customElement('index-view')

export class IndexView extends AbstractView{
    constructor(){
        super();
    }

    uiEvents = {
        "click: .section": this.onClickSection
    }

    onClickSection(){
        console.log('Click');
        const questionView = new QuestionView(event.target.id);
        $("#app").innerHTML = '';
        $("#app").appendChild(questionView);
    }
    onRender(){
        const parent = $("#btns");
        questions.forEach(section => {
            var btn = document.createElement("button")
            btn.innerHTML = section.name
            btn.id = section.id;
            btn.className = "section";
            parent.appendChild(btn);
        });
        this.bindEvents();
    }


    template(){
        return `
        <h1>Bienvenido al examen de practica para el EXANI-II</h1>
        <h1>Porfavor elige una de las siguientes opciones</h1>
        <div id = "btns">
        <button class = "section" id = "all"> Todo </button>
        </div>
        `
    }
}