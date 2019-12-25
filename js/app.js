// Author TARUN BISHT
var best_word_holder,stat_holder,word_history,stat_generation,stat_population_size,stat_mutation_rate;
var stop=false;
window.onload=function(){
    setup();
}
function setup()
{
    document.getElementById("scroll-pane").scrollIntoView(false);
    let data=get_data();
    display_setter(data);
    genetic_algorithm(data.population_size,data.mutation_rate,data.target_word);
}
function get_data()
{
    let target_word=document.getElementById("target-word").value;
    let mutation_rate=document.getElementById("mutation-rate").value;
    let population_size=document.getElementById("population-size").value;
    return {"target_word":target_word,"mutation_rate":parseFloat(mutation_rate),"population_size":parseInt(population_size)};
}
function display_setter(data)
{
    best_word_holder=document.getElementById("best-word");
    stat_holder=document.getElementById("stats");
    word_history=document.getElementById("scroll-pane");
    stat_generation=createParagraph(stat_holder,"Generation: 0");
    stat_population_size=createParagraph(stat_holder,"Population Size: "+data.population_size);
    stat_mutation_rate=createParagraph(stat_holder,"Mutation Rate: "+data.mutation_rate);
    let genetic_algorithm_btn=document.getElementById("generate-word");
    genetic_algorithm_btn.addEventListener("click",function()
    {
        stop=false;
        clear_all_child(word_history);
        let data=get_data();
        genetic_algorithm(data.population_size,data.mutation_rate,data.target_word);
    });
    let stop_btn=document.getElementById("stop");
    stop_btn.addEventListener("click",function()
    {
        stop=true;
    });
}
function createParagraph(parent,text)
{
    let p=document.createElement("p");
    parent.appendChild(p);
    p.innerHTML=text;
    return p;
}
function clear_all_child(parent)
{
    for (let i = parent.childElementCount; i >0; i--) 
    {
        parent.removeChild(parent.childNodes[i]);
    }
}
async function genetic_algorithm(population_size,mutation_rate,target_word)
{
    entities=new Population(population_size,target_word);
    for (const stat of entities.evolution(mutation_rate)) 
    {
        if(stop)
        {
            break;
        }
        display(stat);
        await sleep(2);
    }
}
function display(stat)
{
    best_word_holder.innerHTML=stat.best_word;
    stat_generation.innerHTML="Generation: "+stat.generation;
    stat_mutation_rate.innerHTML="Mutation Rate: "+get_data().mutation_rate;
    stat_population_size.innerHTML="Population Size: "+get_data().population_size;
    createParagraph(word_history,stat.best_word+"  ::  "+stat.fitness.toPrecision(2).toString());
}

//Credits:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// This Function is needed to update text. Because JS is single threaded language so it is not letting
// me to compute as well as show text simultaneously. 
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}