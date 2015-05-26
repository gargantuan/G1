'use strict';

import Genome from './lib/Genome';

var genome = new Genome();

console.log('gene length', genome.calculateGeneSize([80,10,30,22]));
var carAGenome = genome.encode([80,10,30,22]);
var carBGenome = genome.encode([50,12,40,67]);
var progeny = genome.transfer(carAGenome, carBGenome);

console.log('carAGenome',carAGenome);
console.log('carBGenome',carBGenome);
console.log('progeny',progeny);