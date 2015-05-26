'use strict';


export default class Genome {

	constructor(options = {mutationRate: 0.001, crossRate: 0.7}) {

		this.mutationRate = options.mutationRate;
		this.crossRate = options.crossRate;

	}

	compileGenes(values) {
		return values.map(value => this._valueToBinary(value)).join('');
	}

	_valueToBinary(value){
		if(parseInt(value, 10) > 15){
			throw new Error('GENOME_GENE_MAX_VALUE_ERROR');
		}
		var binary = (Math.round(value) >>> 0).toString(2);
		var pad = '0000';
		return pad.substring(0, pad.length - binary.length) + binary;
	}

}