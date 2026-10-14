import {videoStep} from '../step-patterns.js?v=3.1.1';
const credit='Common Sense Education, Hoaxes and Fakes. Video: CrashCourse, Check Yourself with Lateral Reading.';
const field=(name,label)=>({name,label,stepTitle:'Question '+name.match(/q(\d)/)[1],type:'textarea',help:'Write a short answer in your own words.'});
export const creators={id:'video-creators-v2',title:'Part 1: Questions 1 and 2',short:'Questions 1–2',kind:'form',stage:'model',intro:'',fields:[field('video-q1-v2','What does Green mean when he says “information does not just appear” on the Internet?'),field('video-q2-v2','What is the first question John says we must ask ourselves about things we see online?')],pdf:{prompt:'Watch the creator-and-purpose chunk, 1:15–3:01, and answer the original video questions.'}};
export const reading={id:'video-reading-v2',title:'Part 1: Questions 3 and 4',short:'Questions 3–4',kind:'form',stage:'guided',intro:'',fields:[field('video-q3-v2','Why is reading a website vertically not a great way to determine reliable information?'),field('video-q4-v2','What is lateral reading, and why is it more effective than vertical reading to determine reliable information?')],pdf:{prompt:'Watch the vertical-and-lateral-reading chunk, 4:27–5:29, and answer the original video questions.'}};
export const sources={id:'video-sources-v2',title:'Question 5',short:'Question 5',kind:'form',stage:'guided',intro:'',fields:[field('video-q5-v2','Where should you go when you read laterally?')],pdf:{prompt:'Watch the sources chunk, 7:31–9:14, and answer the original video question.'}};

const watch=(id,title,start,end,time,stopAt,stage)=>videoStep({id,title,short:title,stage,credit,
 embedUrl:`https://www.youtube-nocookie.com/embed/GoQG6Tin-1E?start=${start}&end=${end}&rel=0`,
 openUrl:`https://www.youtube.com/watch?v=GoQG6Tin-1E&t=${start}s`,
 instruction:`Watch ${time}. Then choose Next step to answer.`,stopAt});
export const watchCreators=watch('watch-creators-v1','Watch: Who made this?',75,181,'1:15–3:01','3:01','model');
export const watchReading=watch('watch-reading-v1','Watch: Lateral reading',267,329,'4:27–5:29','5:29','guided');
export const watchSources=watch('watch-sources-v1','Watch: Where to look',451,554,'7:31–9:14','9:14','guided');
