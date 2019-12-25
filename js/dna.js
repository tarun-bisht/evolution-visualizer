// Author TARUN BISHT
function DNA(length)
{
    this.fitness=0;
    this.length=length;
    this.genes=new Array(this.length);
    for (let i = 0; i < this.genes.length; i++) {
        this.genes[i] = get_random_char();
    }
}
DNA.prototype.calculate_fitness=function(target_word)
{
    let score=0
    for (let i = 0; i < this.length; i++) 
    {
        if (this.genes[i]==target_word[i])
        {
            score+=1;
        }
    }
    this.fitness=score/target_word.length;
    return this.fitness;
}
DNA.prototype.crossover=function(parent)
{
    let rnd_index=randint(0,this.length);
    let child=new DNA(this.length);
    for (let i = 0; i < child.length; i++)
    {
        if (i<rnd_index)
            child.genes[i]=this.genes[i];
        else
            child.genes[i]=parent.genes[i];
    }
    return child;
}
DNA.prototype.mutation=function(mutation_per=0.01)
{
    for (let i = 0; i < this.length; i++) 
    {
        let rnd_num=Math.random();
        if (rnd_num<mutation_per)
            this.genes[i]=get_random_char();
    }
    return this.genes;
}
function get_random_char()
{
    let start=32;
    let end=126;
    let rnd_num=randint(start,end+1);
    return String.fromCharCode(rnd_num);
}
function randint(min,max)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}     
