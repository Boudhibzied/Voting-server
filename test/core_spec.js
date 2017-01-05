import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('Testing application logic', () =>{
	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('cloud atlas', 'star wars');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('cloud atlas', 'star wars')
			}));
		});
	});
});