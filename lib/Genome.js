'use strict';

export const genomeErrors  = {
	FLOAT_VALUE: 'Float value encountered'
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

}