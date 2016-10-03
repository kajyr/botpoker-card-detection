'use strict';

/**
* Card detection library
* @module card-detector
*/

const _ = require("lodash")

const sklanskyTable = require('./lib/sklanskyTable')

const SORTING_RANK = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const sortbyRank = (array) => array.slice().sort((a, b) => SORTING_RANK.indexOf(a.rank) - SORTING_RANK.indexOf(b.rank))

const groupByRank = (cards) => _.values(_.groupBy(cards, 'rank'))
const groupByType = (cards) => _.values(_.groupBy(cards, 'type'))
const groupsOf = (grouped, qty) => grouped.filter((rank) => rank.length === qty)
const coppie = (grouped) => groupsOf(grouped, 2)
const tris = (grouped) => groupsOf(grouped, 3)



module.exports = {

	/**
	* sorts your cards by rank, from A to 2
	* @param cards {array} the cards array
	*/
	sortbyRank: sortbyRank,

	/**
	* detect if there is a Coppia inside your cards
	* @param cards {array} the cards array
	*/
	hasCoppia: (cards) => {
		let grouped = groupByRank(cards)
		return coppie(grouped).length > 0
	},
	
	/**
	* detect if there is a Tris inside your cards
	* @param cards {array} the cards array
	*/
	hasTris: (cards) => {
		let grouped = groupByRank(cards)
		return tris(grouped).length > 0
	},

	/**
	* detect if there is a Poker inside your cards
	* @param cards {array} the cards array
	*/
	hasPoker: (cards) => {
		let grouped = groupByRank(cards)
		return groupsOf(grouped, 4).length > 0
	},

	/**
	* detect if there is a Doppia Coppia inside your cards
	* @param cards {array} the cards array
	*/
	hasDoppiaCoppia: (cards) => {
		let grouped = groupByRank(cards)
		return coppie(grouped).length === 2
	},

	/**
	* detect if there is a Full inside your cards
	* @param cards {array} the cards array
	*/
	hasFull: (cards) => {
		let grouped = groupByRank(cards)
		return tris(grouped).length === 1 && coppie(grouped).length === 1
	},

	/**
	* detect if there is a Flush inside your cards
	* @param cards {array} the cards array
	*/
	hasColore: (cards) => {
		let grouped = groupByType(cards)
		// tutte le carte devono essere nello stesso gruppo
		return groupsOf(grouped, cards.length).length === 1
	},

	/**
	* Gives you the sklansky cluster for your hand.
	* @param hand {array} your 2 card hand
	*/
	sklanskyCluster: (hand) => {
		hand = sortbyRank(hand)
		let s = hand[0].type === hand[1].type ? 's' : ''
		let sklanskyIndex = hand[0].rank + hand[1].rank
		let sklanskyIndexSuited = sklanskyIndex + s
		return sklanskyTable[sklanskyIndexSuited] || sklanskyTable[sklanskyIndex] || -1
	}
}