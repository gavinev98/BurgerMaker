import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
         wrapper = shallow(<NavigationItems />);
    });


    it('should render two navigation items if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);

    });


    it('should render three navigation items if authenticated', () => {
        wrapper = shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);

    });

});