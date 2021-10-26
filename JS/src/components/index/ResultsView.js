import {AbstractView} from '@universidad-carolina/abstractview';
import {boundMethod, customElement } from '@universidad-carolina/decorators';
import translate from "@universidad-carolina/translate";
import { $ } from "@universidad-carolina/helpers";
import { AbstractModel } from "@universidad-carolina/abstractmodel/src"
import { questions } from '../../data/questions';
import Eventing from "@universidad-carolina/eventing"

@customElement('results-view')
export class ResultsView extends AbstractView{
    constructor(modelo){
        super();
        this.model = new AbstractModel();
        this.modelo = modelo;
        this.correct = 0;
        console.log(this.modelo)
        this.modelo.questions.forEach(question => {
            console.log(question.correct, question.selected);
            if (question.correct == question.selected) {
                this.correct++;
            }
        })
    }
    


    template(){
        return `
        <h1> Sacaste ${this.correct} de ${this.modelo.questions.length} </h1>
        <br>
        <h1> Sacaste ${(this.correct/this.modelo.questions.length)*100} </h1>
        `
    }
}