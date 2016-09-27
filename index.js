'use strict';

const _ = require("lodash")

const groupByRank = (cards) => _.values(_.groupBy(cards, 'rank'))

module.exports = {

	hasCoppia: (cards) => {
		let grouped = groupByRank(cards)
		let coppie = grouped.filter((rank) => rank.length === 2)
		return coppie.length > 0
	},
	
	hasTris: (cards) => {
		let grouped = groupByRank(cards)
		let tris = grouped.filter((rank) => rank.length === 3)
		return tris.length > 0
	},

	hasPoker: (cards) => {
		let grouped = groupByRank(cards)
		let tris = grouped.filter((rank) => rank.length === 4)
		return tris.length > 0
	},

	hasDoppiaCoppia: (cards) => {
		let grouped = groupByRank(cards)
		console.log(grouped)
		let tris = grouped.filter((rank) => rank.length === 4)
		return tris.length > 0
	},

	hasFull: (cards) => {
		let grouped = groupByRank(cards)
		let tris = grouped.filter((rank) => rank.length === 4)
		return tris.length > 0
	}
}