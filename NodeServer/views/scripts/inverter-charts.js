//--------------------------------------------
//          max available torque graph
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
                label: '',
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
            showTooltips: true,
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
                        labelString: 'Torque Nm'
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });