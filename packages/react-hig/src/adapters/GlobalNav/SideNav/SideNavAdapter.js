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
import * as PropTypes from 'prop-types';

import HIGElement from '../../../elements/HIGElement';
import HIGChildValidator from '../../../elements/HIGChildValidator';
import createComponent from '../../createComponent';

import SectionListComponent, {
  SectionList
} from '../../../elements/components/GlobalNav/SectionList';
import LinkListComponent, {
  LinkList
} from '../../../elements/components/GlobalNav/LinkList';
import SearchComponent, { SearchAdapter } from './SearchAdapter';

export class SideNavAdapter extends HIGElement {
  componentDidMount() {
    if (this.sections) {
      this.sections.mount();
    }

    if (this.links) {
      this.links.mount();
    }

    if (this.search) {
      this.hig.addSearch(this.search.hig);
      this.search.mount();
    }
  }

  createElement(ElementConstructor, props) {
    switch (ElementConstructor) {
      case SectionList:
        return new SectionList(this.hig); // special case hand over the hig instance
      case LinkList:
        return new LinkList(this.hig); // special case hand over the hig instance
      case SearchAdapter:
        return new SearchAdapter(this.hig.partials.Search, props);
      default:
        throw new Error(`Unknown type ${ElementConstructor.name}`);
    }
  }

  appendChild(instance) {
    if (instance instanceof SectionList) {
      if (this.sections) {
        throw new Error('only one SectionList is allowed');
      } else {
        this.sections = instance;

        if (this.mounted) {
          instance.componentDidMount();
        }
      }
    } else if (instance instanceof LinkList) {
      if (this.links) {
        throw new Error('only one LinkList is allowed');
      } else {
        this.links = instance;

        if (this.mounted) {
          instance.componentDidMount();
        }
      }
    } else if (instance instanceof SearchAdapter) {
      if (this.search) {
        throw new Error('only one Search is allowed');
      } else {
        this.search = instance;

        if (this.mounted) {
          instance.componentDidMount();
        }
      }
    } else {
      throw new Error('unknown type');
    }
  }

  insertBefore(instance, insertBeforeIndex) {
    this.appendChild(instance);
  }

  removeChild(instance) {
    if (instance instanceof SectionList) {
      this.sections = null;
    }

    if (instance instanceof LinkList) {
      this.links = null;
    }

    if (instance instanceof SearchAdapter) {
      this.search = null;
    }

    instance.unmount();
  }
}

const SideNavComponent = createComponent(SideNavAdapter);

SideNavComponent.propTypes = {
  addSection: PropTypes.func,
  addLink: PropTypes.func,
  addSearch: PropTypes.func,
  setCopyright: PropTypes.func,
  children: HIGChildValidator([
    SectionListComponent,
    LinkListComponent,
    SearchComponent
  ])
};

SideNavComponent.__docgenInfo = {
  props: {
    children: {
      description: 'support adding SectionList, and LinkList'
    }
  }
};

SideNavComponent.SectionList = SectionListComponent;
SideNavComponent.LinkList = LinkListComponent;
SideNavComponent.Search = SearchComponent;

export default SideNavComponent;