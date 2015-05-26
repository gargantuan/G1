#G1
A tiny Genetic Programming library written in ES6 for poops and giggles. 



###Requirements
- Node.js
- Babel `npm install -g babel`

### Using G1

- Install dependencies with `npm install`
- Run index.js with `npm start`
- Run tests with `npm test`

### What does it do

G1 simulates [Genetic Variation](http://en.wikipedia.org/wiki/Genetic_variation). It allows you to combine two sets of values to derive a new set of values that are inherited from either of the parents, along with a little bit of mutation. 

Let's you you have a model of a car with the following properties

- topSpeed
- acceleration
- grip
- weight

Each of the properties affects our fictional car's ability to move around a race track. Now lets say we have two instances of our car model (carA and carB) with the following properties

|                | Car A | Car B    |
|----------------|-------|----------|
| `topSpeed`     | 80    | 50       |
| `acceleration` | 10    | 12       |
| `grip`         | 30    | 40       |
| `weight`       | 22    | 67       |


Now we want to "selectivly breed" our cars to generate 10 offspring who each inhert a little bit from each parent so we can test their performance on the track. From the 10 offspring, we will select another 2, breed them again and so on until we arrive at a car who's properties are attuned to give the best perfomrance around our fictional track.

First of all, we need to convert our properties into something we can work with that will represent the genome for each car. Binary fits our needs. Converting the properties for each car to binary gives us the following

	import Genome from './lib/Genome';
	var genome = new Genome();
	
	var carAGenome = genome.encode([80,10,30,22]);
	var carBGenome = genome.encode([50,12,40,67]);
	
	//carAGenome: 01010000 00001010 00011110 00010110
	//carBGenome: 00110010 00001100 00101000 01000011
	
These binary strings represent our genomes. G1 can combines these two geneome strings, transfer bits (genes) from one genome to another, randomly mutate the result and give us a new genome we can then use in a new car instance.

	import Genome from './lib/Genome';
	var genome = new Genome();
	
	var carAGenome = genome.encode([80,10,30,22]);
	var carBGenome = genome.encode([50,12,40,67]);
	var progeny = genome.combine(carAGenome, carBGenome);
	
	//carAGenome: 01010000 00001010 00011110 00010110
	//carBGenome: 00110010 00001100 00101000 01000011
	//progeny:    01010010 00001100 00101000 01000011
	
|                | Car A | Car B    | Progeny |
|----------------|-------|----------|---------|
| `topSpeed`     | 80    | 50       | 82      |
| `acceleration` | 10    | 12       | 12      |
| `grip`         | 30    | 40       | 40      |
| `weight`       | 22    | 67       | 67      |

These new properties can be used to create a new instance of `car`. 
