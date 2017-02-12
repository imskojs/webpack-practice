import component from "./component";
let currentComponent = component();

document.body.appendChild(currentComponent);

// HMR interface
if(module.hot) {
  // `.component.js`의 hot update시
  module.hot.accept('./component', () => {
    const nextComponent = component();

    // 기존의 content를 새로 hot load된 component로 바꿈.
    document.body.replaceChild(nextComponent, currentComponent);

    currentComponent = nextComponent;
  });
}

