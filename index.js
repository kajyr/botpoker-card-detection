'use strict';

const _ = require("lodash")

const SORTING_RANK = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const sortbyRank = (array) => array.slice().sort((a, b) => SORTING_RANK.indexOf(a.rank) - SORTING_RANK.indexOf(b.rank))

const groupByRank = (cards) => _.values(_.groupBy(cards, 'rank'))
const groupsOf = (grouped, qty) => grouped.filter((rank) => rank.length === qty)
const coppie = (grouped) => groupsOf(grouped, 2)
const tris = (grouped) => groupsOf(grouped, 3)

const slanskyTable = {
	'AA': 1,
	'KK': 1,
	'QQ': 1,
	'JJ': 1,
	'AKs': 1,
	'1010': 2,
	'AQs': 2,
	'AJs': 2,
	'KQs': 2,
	'AK': 2,
	'99': 3,
	'A10s': 3,
	'KJs': 3,
	'QJs': 3,
	'J10s': 3,
	'AQ': 3,
	'88': 4,
	'K10s': 4,
	'Q10s': 4,
	'J9s': 4,
	'109s': 4,
	'98s': 4,
	'AJ': 4,
	'KQ': 4,
	'77': 5,
	'A9s': 5,
	'A8s': 5,
	'A7s': 5,
	'A6s': 5,
	'A5s': 5,
	'A4s': 5,
	'A3s': 5,
	'A2s': 5,
	'Q9s': 5,
	'108s': 5,
	'97s': 5,
	'87s': 5,
	'76s': 5,
	'KJ': 5,
	'QJ': 5,
	'J10': 5,
	'66': 6,
	'55': 6,
	'K9s': 6,
	'J8s': 6,
	'86s': 6,
	'75s': 6,
	'54s': 6,
	'A10': 6,
	'K10': 6,
	'Q10': 6,
	'44': 7,
	'33': 7,
	'22': 7,
	'k8s': 7,
	'k7s': 7,
	'k6s': 7,
	'k5s': 7,
	'k4s': 7,
	'k3s': 7,
	'k2s': 7,
	'Q8s': 7,
	'107s': 7,
	'64s': 7,
	'53s': 7,
	'43s': 7,
	'J9': 7,
	'109': 7,
	'98': 7,
	'J7s': 8,
	'96s': 8,
	'85s': 8,
	'74s': 8,
	'42s': 8,
	'32s': 8,
	'A9': 8,
	'K9': 8,
	'Q9': 8,
	'J8': 8,
	'108': 8,
	'87': 8,
	'76': 8,
	'65': 8,
	'54': 8
}

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

	slanskyCluster: (hand) => {
		hand = sortbyRank(hand)
		let s = hand[0].type === hand[1].type ? 's' : ''
		let slanskyIndex = hand[0].rank + hand[1].rank
		let slanskyIndexSuited = slanskyIndex + s
		return slanskyTable[slanskyIndexSuited] || slanskyTable[slanskyIndex] || -1
	}
}