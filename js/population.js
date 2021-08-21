// Author TARUN BISHT
function Population(population_size,target_word)
{
    this.population=Array(population_size);
    for (let i = 0; i < population_size; i++) 
    {
        this.population[i]=new DNA(target_word.length);
    }
    this.generation=0;
    this.population_size=population_size;
    this.target_word=Array(target_word.length);
    for (let i = 0; i < target_word.length; i++) 
    {
        this.target_word[i]=target_word[i];
    }
    this.target=target_word
    this.perfect=false
}
Population.prototype.natural_selection=function()
{
    let fitness=Array(this.population_size);
    for (let i = 0; i < this.population_size; i++) 
    {
        fitness[i]=this.population[i].calculate_fitness(this.target_word);
    }
    return fitness;
}
Population.prototype.reproduction=function*(mutation_per=0.01)
{
    let weights=this.natural_selection();
    let best=undefined;
    let best_fitness=0;
    for (let i = 0; i < this.population_size; i++) 
    {
        let parent_1=random_element_with_weights(this.population,weights);
        let parent_2=random_element_with_weights(this.population,weights);
        let child=parent_1.crossover(parent_2);
        child.mutation(mutation_per);
        this.population[i]=child
        let fitness=child.calculate_fitness(this.target_word);
        if (fitness>best_fitness)
        {
            best=child;
            best_fitness=fitness;
        }
        if (best ==undefined)
        {
            best=child;
            best_fitness=fitness;
        }
        if (this.check_perfect(child.genes))
        {
            this.perfect=true;
            break;
        }
    }
    yield best;
}
Population.prototype.check_perfect=function(word)
{
    for (let i = 0; i < word.length; i++) 
    {
        if(word[i]!=this.target_word[i])
        {
            return false;
        }
    }
    return true;
}
Population.prototype.evolution=function*(mutation_per=0.01)
{
    while(!this.perfect)
    {
        this.generation+=1;
        for(let best_child of this.reproduction(mutation_per))
        {
            let word="";
            for(let i=0;i<best_child.genes.length;i++)
            {
                word+=best_child.genes[i];
            }
            yield {"fitness":best_child.fitness,
                    "best_word":word,"generation":this.generation};
        }
    }
}
function random_element_with_weights(iterable,weights)
{
    if (iterable.length==weights.length)
    {
        let weight_sum=sum(weights);
        let rand_weight=weight_sum*Math.random()
        for (let i = 0; i< weights.length;i++) 
        {
            rand_weight=rand_weight-weights[i]
            if (rand_weight <= 0)
                return iterable[i]
        }     
    }      
    else
        throw "Passed Iterable and Weights should be of same size";
}
function sum(iterable)
{
    let sum=0;
    for (let i = 0; i < iterable.length; i++) 
    {
        sum+=iterable[i];
    }
    return sum;
}
        
