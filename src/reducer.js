import {setEntries, next, vote, INITIAL_STATE} from './core';

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	  case 'setEntries':
	    return setEntries(state, action.entries);
	  case 'NEXT':
	    return next(state);
	  case 'VOTE':
	    return state.update('vote',
                        voteState => vote(voteState, action.entry));
	  }
    return state;
};

export default reducer;