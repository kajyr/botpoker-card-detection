'use strict';

const test = require('tape')
const detector = require('../index')

const table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];


test('Test coppia', function (t) {

	let hand = [ {rank: 'J', type: 'C'}, {rank: 'K', type: 'C'}]

	let cards = table.concat(hand)
	let cardsWithoutPair = table.concat([ {rank: 'J', type: 'C'}, {rank: '7', type: 'C'}])

	t.ok(detector.hasCoppia(cards), 'Viene trovata la coppia')
	t.notOk(detector.hasCoppia(cardsWithoutPair), 'Non viene trovata la coppia quando non c\'è')

	t.end()
})

test('Test tris', function (t) {

	let hand = [ {rank: 'K', type: 'C'}, {rank: 'K', type: 'C'}]

	let cards = table.concat(hand)

	let cardsWithoutTris = table.concat([ {rank: 'J', type: 'C'}, {rank: '7', type: 'C'}])

	t.ok(detector.hasTris(cards), 'Viene trovato il tris')
	t.notOk(detector.hasTris(cardsWithoutTris), 'Non viene trovato il tris quando non c\'è')
	t.end()
})

test('Test poker', function (t) {
	const table2 = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'F'}, {rank: '5', type: 'F'} ]
	const hand = [ {rank: '5', type: 'C'}, {rank: '5', type: 'C'}]

	let cards = table2.concat(hand)
	let cardsWithoutPoker = table.concat([ {rank: 'J', type: 'C'}, {rank: '7', type: 'C'}])

	t.ok(detector.hasPoker(cards), 'Viene trovato il poker')
	t.notOk(detector.hasPoker(cardsWithoutPoker), 'Non viene trovato il poker quando non c\'è')
	t.end()
})

test('Test doppia coppia', function (t) {
	const table = [
		{rank: '2', type: 'C'},
		{rank: '3', type: 'D'},
		{rank: '2', type: 'P'},
		]
	let hand = [ {rank: '3', type: 'C'}, {rank: 'Q', type: 'Q'}]

	let cards = table2.concat(hand)
	let cardsWithouDoppiaCoppia = table.concat([ {rank: 'J', type: 'C'}, {rank: '7', type: 'C'}])

	t.ok(detector.hasFull(cards), 'Viene trovato il doppia coppia')
	t.notOk(detector.hasFull(cardsWithouDoppiaCoppia), 'Non viene trovato il doppia coppia quando non c\'è')
	
	t.end()
})

test('Test full', function (t) {
	const table = [
		{rank: '2', type: 'C'},
		{rank: '3', type: 'D'},
		{rank: '2', type: 'P'},
		]
	let hand = [ {rank: '3', type: 'C'}, {rank: '2', type: 'Q'}]

	let cards = table2.concat(hand)
	let cardsWithoutFull = table.concat([ {rank: 'J', type: 'C'}, {rank: '7', type: 'C'}])

	t.ok(detector.hasFull(cards), 'Viene trovato il full')
	t.notOk(detector.hasFull(cardsWithoutFull), 'Non viene trovato il full quando non c\'è')

	t.end()
})