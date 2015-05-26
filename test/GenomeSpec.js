'use strict';
import Genome, {genomeErrors} from '../lib/Genome.js';
import chai, {expect} from 'chai';
chai.should();

describe('Genome', () => {

	let genome = new Genome();

	describe('#encode', ()=>{

		it('Should vary genome length accorging to values', ()=>{

			genome.encode([0]).should.have.length(1);
			genome.encode([1]).should.have.length(1);
			genome.encode([2]).should.have.length(2);
			genome.encode([4]).should.have.length(3);
			genome.encode([8]).should.have.length(4);
			genome.encode([15]).should.have.length(5);
			genome.encode([16]).should.have.length(5);
			genome.encode([17]).should.have.length(6);
			genome.encode([32]).should.have.length(6);
			genome.encode([8,32]).should.have.length(6*2);
			genome.encode([0,1,7,8,32]).should.have.length(6*5);

		});

		it('Should take an array values between 0 and 15 with a length of n and return a binary string with a length of n*4', ()=>{
			
			var traits = [0,1,3,15];
			genome.encode(traits).should.match(/^([01]{4})+$/);
		
		});

		it('Should check for float errors', ()=>{
		
			var traits = [0,5.5,10];
			var fn = function(){ genome.encode(traits); };
			expect(fn).to.throw(genomeErrors.FLOAT_VALUE);
		
		});

	});

	describe('#calculateGeneSize', ()=>{

		it('Should take a single value and return a single value', () => {

			genome.calculateGeneSize(0).should.be.a('number');

		});

		it('Should take an array and return a single value', () => {
		
			genome.calculateGeneSize([0,10,100]).should.be.a('number');
		
		});

	});

});