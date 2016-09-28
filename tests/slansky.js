'use strict';

const test = require('tape')
const detector = require('../index')

test('Test cluster 1', function (t) {
 
	t.equal(1, detector.slanskyCluster([
		{rank: 'A', type: 'C'},
		{rank: 'A', type: 'Q'}
		]), 'Trovato il cluster 1')

	t.end()
})

test('Test suited', function (t) {
 
	t.equal(1, detector.slanskyCluster([
		{rank: 'A', type: 'C'},
		{rank: 'K', type: 'C'}
		]), 'Trovato il cluster 1 con AKs')

	t.equal(2, detector.slanskyCluster([
		{rank: 'A', type: 'C'},
		{rank: 'K', type: 'Q'}
		]), 'Trovato il cluster 2 con AK')

	t.equal(3, detector.slanskyCluster([
		{rank: '9', type: 'C'},
		{rank: '9', type: 'C'}
		]), 'Trovato il cluster 3 con 99s')

	t.equal(3, detector.slanskyCluster([
		{rank: '9', type: 'C'},
		{rank: '9', type: 'Q'}
		]), 'Trovato il cluster 3 con 99')

	t.end()
})