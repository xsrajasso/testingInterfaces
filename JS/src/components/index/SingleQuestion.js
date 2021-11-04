import {AbstractView} from '@universidad-carolina/abstractview';
import {boundMethod, customElement } from '@universidad-carolina/decorators';
import translate from "@universidad-carolina/translate";
import { $ } from "@universidad-carolina/helpers";
import { AbstractModel } from "@universidad-carolina/abstractmodel/src"
import { questions } from '../../data/questions';
import Eventing from "@universidad-carolina/eventing"

@customElement('single-question')

export class SingleQuestion extends AbstractView{
    constructor(modelo){
        super();
        this.model = new AbstractModel();
        this.modelo = modelo;
        this.modelo.answers = this.shuffle(this.modelo.answers)
        this.radio = Eventing
        this.radio.on("save:answer", this.saveAnswer)
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      @boundMethod
      saveAnswer(){
          for (let i = 0; i < 4; i++) {
              if ($("#r" + i).checked) {
                  this.modelo.selected = $("#r" + i).value
                  console.log(this.modelo.selected);
                  this.radio.off("save:answer")
              }
              
          }        
      }

    template(){
        return `
        <div class = "container">
            ${this.modelo.question}
            <br>
            <input type = "radio" id = "r0" name = "boton" value = "${this.modelo.answers[0]}"><label for = "0"> ${this.modelo.answers[0]}</label>
            <br>
            <input type = "radio" id = "r1" name = "boton" value = "${this.modelo.answers[1]}"><label for = "1"> ${this.modelo.answers[1]}</label>
            <br>
            <input type = "radio" id = "r2" name = "boton" value = "${this.modelo.answers[2]}"><label for = "2"> ${this.modelo.answers[2]}</label>
            <br>
            <input type = "radio" id = "r3" name = "boton" value = "${this.modelo.answers[3]}"><label for = "3"> ${this.modelo.answers[3]}</label>
        </div>
        `
    }
}