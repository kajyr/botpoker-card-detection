'use strict';

const _ = require("lodash")

const sklanskyTable = require('./lib/sklanskyTable')

const SORTING_RANK = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const sortbyRank = (array) => array.slice().sort((a, b) => SORTING_RANK.indexOf(a.rank) - SORTING_RANK.indexOf(b.rank))

const groupByRank = (cards) => _.values(_.groupBy(cards, 'rank'))
const groupsOf = (grouped, qty) => grouped.filter((rank) => rank.length === qty)
const coppie = (grouped) => groupsOf(grouped, 2)
const tris = (grouped) => groupsOf(grouped, 3)


module.exports = {
	sortbyRank: sortbyRank,
	hasCoppia: (cards) => {
		let grouped = groupByRank(cards)
		return coppie(grouped).length > 0
	},
	
	hasTris: (cards) => {
		let grouped = groupByRank(cards)
		return tris(grouped).length > 0
	},

	hasPoker: (cards) => {
		let grouped = groupByRank(cards)
		return groupsOf(grouped, 4).length > 0
	},

	hasDoppiaCoppia: (cards) => {
		let grouped = groupByRank(cards)
		return coppie(grouped).length === 2
	},

	hasFull: (cards) => {
		let grouped = groupByRank(cards)
		return tris(grouped).length === 1 && coppie(grouped).length === 1
	},

	sklanskyCluster: (hand) => {
		hand = sortbyRank(hand)
		let s = hand[0].type === hand[1].type ? 's' : ''
		let sklanskyIndex = hand[0].rank + hand[1].rank
		let sklanskyIndexSuited = sklanskyIndex + s
		return sklanskyTable[sklanskyIndexSuited] || sklanskyTable[sklanskyIndex] || -1
	}
}