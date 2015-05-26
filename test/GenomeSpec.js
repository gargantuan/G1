'use strict';
import {Genome, GENOME_GENE_MAX_VALUE_ERROR} from '../lib/Genome.js';
import chai from 'chai';
chai.should();

describe('Genome', () => {

	var genome = new Genome();

	describe('#compileGenes', ()=>{
		it('Should take an array values between 0 and 15 with a length of n and return a binary string with a length of n*4', ()=>{

			var traits = [0,1,3,15];
			genome.compileGenes(traits).should.match(/^([01]{4})+$/);

		});

		it('Should take a value greater than 15 and throw an error', () => {
			var traits = [16];
			genome.compileGenes(traits).should.throw(GENOME_GENE_MAX_VALUE_ERROR);
		});
	});

});