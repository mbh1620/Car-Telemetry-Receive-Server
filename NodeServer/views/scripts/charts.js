//These are the initial setups for the Graphs

/*

This might be changed into a dynamically initialising function to allow user to create as
many graphs as they need or delete them if needed. These graphs will then by allocated to an 
array so that they can be accessed through that. This should mean that graphs are only created 
as they are needed.

*/

//--------------------------------------------
//                  Chart 1
//--------------------------------------------

var ctx = document.getElementById('myChart1').getContext('2d');
    var myLineChart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , ,],
            datasets: [{
                label: 'Speed m/s',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 0.8,
                data: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , ,]
            }]
        },

        // Configuration options go here
        options: {
            responsive: false,
            elements: {
                line: {
                    tension: 0
                },
                point: {
                    radius: 0
                }
            },
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display:false,
                    },
                    
                    
                }],
                yAxes: [{
                    gridLines: { 
                        display: true,
                        color: "white",
                        borderDash: [2,5]
                    },
                    scaleLabel: {
                        display: true, 
                        labelString: 'Acceleration m/s^2'
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });

//--------------------------------------------
//                  Chart 2
//--------------------------------------------

var ctx = document.getElementById('myChart2').getContext('2d');
var myLineChart2 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
            , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
            , , , ,],
        
        datasets: [{
            label: 'Acceleration m/s^2',
            borderColor: 'rgb(20, 255, 132)',
            borderWidth: 0.8,
            data: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , ,],
                
            linetension: 1
        }]
    },

    // Configuration options go here
    options: {
        responsive: false,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        animation: {
            duration: 0
        },
        scales: {
            xAxes: [{
                ticks: {
                    display:false,
                },
                
                
            }],
            yAxes: [{
                gridLines: { 
                    display: true,
                    color: "white",
                    borderDash: [2,5]
                },
                scaleLabel: {
                    display: true, 
                    labelString: 'Speed m/s'
                }
            }]
        },
        legend: {
            display: false
        }
    }
});

//--------------------------------------------
//                  Chart 3
//--------------------------------------------

var ctx = document.getElementById('myChart3').getContext('2d');
    var myLineChart3 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , ,
            ],
                
            datasets: [{
                label: 'Battery V',
                borderColor: 'rgb(20, 135, 255)',
                data: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , ,],
                linetension: 1
            }]
        },

        // Configuration options go here
        options: {
            responsive: false,
            elements: {
                line: {
                    tension: 0
                },
                point: {
                    radius: 0
                },

            },
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    gridLines: { 
                        display: true,
                        color: "white",
                        borderDash: [2,5],
                    },
                    scaleLabel: {
                        display: true, 
                        labelString: 'Battery V'
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });


//--------------------------------------------
//                  Chart 4
//--------------------------------------------

var ctx = document.getElementById('myChart4').getContext('2d');
    var myLineChart4 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                , , , ,],
            datasets: [{
                label: 'Acceleration M/s^2',
                borderColor: 'rgb(255, 255, 132)',
                data: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
                    , , , ,],
                linetension: 1
            }]
        },

        // Configuration options go here
        options: {
            responsive: false,
            elements: {
                line: {
                    tension: 0
                },
                point: {
                    radius: 0
                }
            },
            animation: {
                duration: 0
            }
        }
    });
