import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

	describe('next', () =>{

		it('takes the next two entries under vote', () =>{
			const state = Map({
				entries: List.of('cloud atlas', 'star wars', 'Luck-key')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('cloud atlas', 'star wars')
				}),
				entries: List.of('Luck-key')
			}));
		});

		it('puts winner of current vote back to entries', () => {
		    const state = Map({
		      vote: Map({
		        pair: List.of('cloud atlas', 'star wars'),
		        tally: Map({
		          'cloud atlas': 4,
		          'star wars': 2
		        })
		      }),
		      entries: List.of('Jason Bourne', 'Interstellar', 'Luck-key')
		    });
		    const nextState = next(state);
		    expect(nextState).to.equal(Map({
		      vote: Map({
		        pair: List.of('Jason Bourne', 'Interstellar')
		      }),
		      entries: List.of('Luck-key', 'cloud atlas')
		    }));
  		});

  		it('puts both from tied vote back to entries', () => {
		    const state = Map({
		      vote: Map({
		        pair: List.of('cloud atlas', 'star wars'),
		        tally: Map({
		          'cloud atlas': 3,
		          'star wars': 3
		        })
		      }),
		      entries: List.of('Jason Bourne', 'Interstellar', 'Luck-key')
		    });
		    const nextState = next(state);
		    expect(nextState).to.equal(Map({
		      vote: Map({
		        pair: List.of('Jason Bourne', 'Interstellar')
		      }),
		      entries: List.of('Luck-key', 'cloud atlas', 'star wars')
		    }));
		  });

  		it('marks winner when just one entry left', () => {
		    const state = Map({
		      vote: Map({
		        pair: List.of('cloud atlas', 'star wars'),
		        tally: Map({
		          'cloud atlas': 4,
		          'star wars': 2
		        })
		      }),
		      entries: List()
		    });
		    const nextState = next(state);
		    expect(nextState).to.equal(Map({
		      winner: 'cloud atlas'
		    }));
  		});
	});

	describe('vote', () => {

	    it('creates a tally for the voted entry', () => {
	      const state = Map({
	          pair: List.of('cloud atlas', 'star wars')
	      });
	      const nextState = vote(state, 'cloud atlas');
	      expect(nextState).to.equal(Map({
	          pair: List.of('cloud atlas', 'star wars'),
	          tally: Map({
	            'cloud atlas': 1
	          })
	      }));
    	});

	    it('adds to existing tally for the voted entry', () => {
	      const state = Map({
	          pair: List.of('cloud atlas', 'star wars'),
	          tally: Map({
	            'cloud atlas': 3,
	            'star wars': 2
	          })
	       });
	      const nextState = vote(state, 'cloud atlas');
	      expect(nextState).to.equal(Map({
	          pair: List.of('cloud atlas', 'star wars'),
	          tally: Map({
	            'cloud atlas': 4,
	            'star wars': 2
	          })
	      }));
	    });
    });
    
});