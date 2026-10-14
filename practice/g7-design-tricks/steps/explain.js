import { explanationStep } from '../step-patterns.js?v=1.0.0';
export const explain = explanationStep({
 id:'explain-one-choice',title:'Explain one choice',short:'Explain your choice',
 table:{caption:'Choose one fictional example',columns:['Choices'],rows:[['Mia and autoplay · Leo and scrolling · Ana and alerts']]},
 question:'How does one change help the person control their attention?',fieldId:'attention-explanation-v1',
 plainLanguage:'Choose Mia, Leo, or Ana. Explain how their setting or plan helps.',
 starter:'___ can ___. This helps because ___.',help:'Write one or two sentences.'
});
