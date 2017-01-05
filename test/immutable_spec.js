import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('testing immutability', () =>{

	describe('A state trees', () =>{

		function addMovie(currentState, movie) {
			return currentState.update(
				'movies', 
				movies.push(movie)
				);
		}

		it('is immutable', () => {
			let state = Map({
				movies : List.of('cloud atlas', 'star wars')
			});
			let nextState= addMovie(state, 'Jason Bourne');

			expect(nextState)to.equal(Map({
				movies: List.of(
				'cloud atlas', 
				'star wars',
				'Jason Bourne'
				)
			}));
				expect(state).to.equal(Map({
				movies: List.of(
					'cloud atlas', 
					'star wars',
					)
				}));
		});
	});
});