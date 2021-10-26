import '!style-loader!css-loader!postcss-loader!./css/index.css';
import Scales from "@universidad-carolina/scales/electron";
import { QuestionView } from "./components/index/QuestionView";
import { $ } from "@universidad-carolina/helpers";

console.log('Bienvenido a Carolina!');
const app = $("#app");

const questionView = new QuestionView();
app.appendChild(questionView);