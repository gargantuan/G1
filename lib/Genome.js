'use strict';

export const genomeErrors  = {
	FLOAT_VALUE: 'Float value encountered',
	INCOMPATIBLE_GENOMES: 'Genomes are incompatible'
};

export default class Genome {

	constructor(options = {mutationRate: 0.001, crossRate: 0.7}) {

		this.mutationRate = options.mutationRate;
		this.crossRate = options.crossRate;

	}

	encode(values) {
		
		var geneSize = this.calculateGeneSize(values);
		return values.map(value => this._encodeValue(value, geneSize)).join('');
	
	}

	_encodeValue(value, geneSize){

		if( Number.isInteger(value) ){

			var pad = new Array(geneSize + 1).join( 0 );
			var binary = (Math.round(value) >>> 0).toString(2);
			return pad.substring(0, pad.length - binary.length) + binary;
		
		} else{
		
			throw new Error(genomeErrors.FLOAT_VALUE);
		
		}
	}

	calculateGeneSize(values){

		if(values.constructor !== Array){
			values = [values];
		}

		return values.reduce( reduceFunction, 1);

		function reduceFunction(prevValue, currValue){
			var size = Math.ceil( Math.log2(currValue)+1 );
			return size >= prevValue ? size : prevValue;
		}
	
	}

	transfer(a, b){

		this._checkCompatibility(a,b);
		var crossed = this._crossOver(a,b);
		var mutated = this._mutate(crossed);
		return mutated;

	}

	_checkCompatibility(a,b){
	
		if(a.length === b.length){
			return true;
		}else{
			throw new Error(genomeErrors.INCOMPATIBLE_GENOMES);
		}
	
	}

	_crossOver(a,b){
		
		// slice strings at random point
		var slicePoint = Math.round(Math.random() * a.length);
		var aSplit = a.slice(slicePoint).split('');
		var bSplit = b.slice(slicePoint).split('');
		var newGenome = a.slice(0, slicePoint);

		return newGenome + aSplit.map((gene, index) => {
			var shouldCrossGene = Math.random() < this.crossRate;
			return shouldCrossGene ? bSplit[index] : gene;
		}).join('');

	}

	_mutate(genome){
		return genome.split('').map(gene => {
			var shouldMutate = Math.random() < this.mutationRate;
			return shouldMutate ? (gene === '0' ? '1':'0') : gene;
		}).join('');
	}	


}