/* eslint-disable react/prop-types */
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
import React from 'react';
import { boolean } from '@kadira/storybook-addon-knobs';

import { Select } from '../../../react/lib/2016-12-01';
import { WithSource } from '../../addons/source-addon';

export default function focus() {
  const props = {
    focus: boolean('Has focus', true),
  };
  const options = [
    { value: 'one', label: 'One', key: 1 },
    { value: 'two', label: 'Two', key: 2 },
  ];

  const react = `
import React from 'react';
import ReactDOM from 'react-dom';
import {Select} from '@orion-ui/react/lib/2016-12-01';

class App extends React.Component {
render() {
  const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
  ];

  return (
    <Select options={options} hasFocus={${props.focus}} />
  )
}
}

ReactDOM.render(React.createElement(App), document.body);`;

  const angular = `
// app controller
import 'angular';

angular.module('app', [])
.controller('AppController', function() {
  var app = this;
  app.options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
  ];

  app.focus = ${props.focus};
}]);

// app.html

<!doctype html>
<html lang="en" ng-app="app">
<body ng-controller="AppController as app">
  <orion-select options="{{app.options}}" hasFocus="{{app.focus}}" />
</body>
</html>`;

  return (
    <WithSource react={react} angular={angular}>
      <Select options={options} hasFocus={props.focus} open={props.open} />
    </WithSource>
  );
}
