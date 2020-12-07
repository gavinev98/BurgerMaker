import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';

import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { intersects } from 'semver';


configure({adapter: new Adapter()})


describe('<BurgerBuilder />', () => {
    let wrapper;
    //setting up the beforeEach function for the wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
    });

    it('should render <BuildControls> when recieving ingredients', () => {
            wrapper.setProps({ing : {salad: 0, bacon: 0}});
            expect(wrapper.find(BuildControls)).toHaveLength(1);

    } )
});
