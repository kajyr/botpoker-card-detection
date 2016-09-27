'use strict';

const _ = require("lodash")

const groupByRank = (cards) => _.values(_.groupBy(cards, 'rank'))
const groupsOf = (grouped, qty) => grouped.filter((rank) => rank.length === qty)
const coppie = (grouped) => groupsOf(grouped, 2)
const tris = (grouped) => groupsOf(grouped, 3)

module.exports = {

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
	}
}