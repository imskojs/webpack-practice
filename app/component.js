import './main2.scss';
export default function(){
  const element = document.createElement('h1');
  element.innerHTML = 'Hello world2';
  element.className = 'pink'
  return element;
}