/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
class Button {
  constructor(mountNode, anchorNode) {
    this._mountNode = mountNode;
    this._el = document.createElement('button');
    this._el.classList.add('hig-button');
    this._mountNode.insertBefore(this._el, anchorNode);
  }
  setLabel(label) {
    this._el.textContent = label;
  }

  setOnClick(listener) {
    this._el.addEventListener('click', listener);

    return {
      dispose: () => this._el.removeEventListener('click', listener)
    };
  }
}

class Menu {
  constructor(mountNode, anchorNode) {
    this._mountNode = mountNode;
    this._el = document.createElement('button');
    this._el.classList.add('hig-menu');
    this._mountNode.insertBefore(this._el, anchorNode);
  }
}

export default class HIG {
  constructor(mountNode) {
    this._mountNode = mountNode;
  }

  addMenu(props) {
    return new Menu(this._mountNode, null);
  }

  addButton() {
    return new Button(this._mountNode, null);
  }

  // teardown() {
  //   this._el.parentNode.removeChild(this._el);
  // }
}