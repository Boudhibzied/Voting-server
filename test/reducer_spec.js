import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {


 it('handles setEntries', () => {
    const initialState = Map();
    const action = {type: 'setEntries', entries: ['Interstellar']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Interstellar']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Interstellar', 'Cloud Atlas']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'Cloud Atlas']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Interstellar', 'Cloud Atlas']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Interstellar'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'Cloud Atlas'],
        tally: {Interstellar: 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'setEntries', entries: ['Interstellar']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Interstellar']
    }));
  });

  it('can be used with reduce', () => {
	  const actions = [
	    {type: 'setEntries', entries: ['Interstellar', 'Cloud Atlas']},
	    {type: 'NEXT'},
	    {type: 'VOTE', entry: 'Interstellar'},
	    {type: 'VOTE', entry: 'Cloud Atlas'},
	    {type: 'VOTE', entry: 'Interstellar'},
	    {type: 'NEXT'}
	  ];
	  const finalState = actions.reduce(reducer, Map());

	  expect(finalState).to.equal(fromJS({
	    winner: 'Interstellar'
	  }));
	});

});