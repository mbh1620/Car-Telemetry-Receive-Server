/* 

These are the functions used to change the graphs and to update the graphs

*/

function updateTimeBase(graph, slider_id){
    //Get slider value
    var val = $(slider_id).val();

    //max amount of elements in is 500
    //min amount of elements in is 50
    var proper_val = (val/100)*500
    if (proper_val < graph.data.datasets[0].data.length){
        var difference = graph.data.datasets[0].data.length - proper_val;
        //pop elements until they are equal
        for(var i = 0; i < difference; i++){
            graph.data.datasets[0].data.shift();
            graph.data.labels.shift();
        }

    } else if(proper_val > graph.data.datasets[0].data.length){
        var difference = proper_val - graph.data.datasets[0].data.length;
        console.log(difference);
        //push elements until they are equal
        for(var i = 0; i < difference; i++){
            graph.data.datasets[0].data.unshift(" ,");
            graph.data.labels.unshift(" ,");
        }
    }

}