//HEART GAME

document.getElementById('startButton').addEventListener('click',startGame);
document.getElementById('resetButton').addEventListener('click',resetGame);
document.getElementById('filterButton').addEventListener('click', filterHearts);

const numRows = 5;
const numCols = 6;

const svg = d3.select('#game')


for (let i = 0; i < numRows; i++) { // Create 5 rows
    for (let j = 0; j < numCols; j++) { // Create 5 hearts in each row
      const heart = svg.append('heart')
        .classed('heart', true)
        .attr('transform', `translate(${70 + j * 110},${70 + i * 110})`) // Adjust spacing between hearts
        .style('animation', 'none')
      //  d3.selectAll('.fadehert')
    }
  }



function startGame() {
    const svg = d3.select('#game');
    //const gameDiv = d3.select('#game');
    svg.selectAll('.fadeheart').remove(); // Clear hearts
    svg.selectAll('.heart').remove();



    for (let i = 1; i <= numRows; i++) { // Create 5 rows
        for (let j = 1; j <= numCols; j++) { // Create 5 hearts in each row

            if((i==1 && j==4)|(i==2&& j==2)|(i==2&& j==6)|(i==3&& j==4)|(i==3&& j==5)|(i==4&& j==2)|(i==4&& j==5)|(i==4&& j==6)|(i==5&& j==1)|(i==5&& j==3)){
                const heart = svg.append('fadeheart')
                .classed('fadeheart', true)
                .attr('transform', `translate(${70 + j * 110},${70 + i * 120})`) // Adjust spacing between hearts
                .style('animation', 'fades 1s linear')
               // .classed("notClicked", true)
                .on('click', function() {
                    d3.select(this)
                      .style('opacity', 1)
                      .style('animation', 'none')
                      .classed('heart', true)
    
                  });
            } else{    
                const heart = svg.append('heart')
                .classed('heart', true)
                .attr('transform', `translate(${70 + j * 110},${70 + i * 120})`) // Adjust spacing between hearts
              //  .style('animation', 'fades 1s linear')
            // .classed("notClicked", true)
                // .on('click', function() {
                //     d3.select(this)
                //     .style('opacity', 1)
                //     .style('animation', 'none')
                //     .classed('heart', true)

                // });
            }
        }
       }


  }



  function resetGame() {
    svg.selectAll('.fadeheart').remove();
    svg.selectAll('.heart').remove();
    for (let i = 0; i < numRows; i++) { // Create 5 rows
        for (let j = 0; j < numCols; j++) { // Create 5 hearts in each row
          const heart = svg.append('heart')
            .classed('heart', true)
            .attr('transform', `translate(${70 + j * 100},${70 + i * 110})`) // Adjust spacing between hearts
            .style('opacity', 1)
            .style('animation', 'none')
            .classed('filtered', false);
        }
      }
      
  }

  function filterHearts() {
    svg.selectAll('.fadeheart').remove();
    svg.selectAll('.heart').remove();
    for (let i = 1; i <= numRows; i++) { // Create 5 rows
        for (let j = 1; j <= numCols; j++) { // Create 5 hearts in each row

            if((i==1 && j==4)|(i==2&& j==2)|(i==2&& j==6)|(i==3&& j==4)|(i==3&& j==5)|(i==4&& j==2)|(i==4&& j==5)|(i==4&& j==6)|(i==5&& j==1)|(i==5&& j==3)){
                const heart = svg.append('fadeheart')
                .classed('fadeheart', true)
                .attr('transform', `translate(${70 + j * 110},${70 + i * 120})`) // Adjust spacing between hearts
                .style('animation', 'fades 1s linear')
               // .classed("notClicked", true)
                .on('click', function() {
                    d3.select(this)
                      .style('opacity', 1)
                      .style('animation', 'none')
                      .classed('heart', true)
    
                  });
            } else{    
                const heart = svg.append('heart')
                .classed('heart', true)
                .attr('transform', `translate(${70 + j * 110},${70 + i * 120})`) // Adjust spacing between hearts
              //  .style('animation', 'fades 1s linear')
            // .classed("notClicked", true)
                // .on('click', function() {
                //     d3.select(this)
                //     .style('opacity', 1)
                //     .style('animation', 'none')
                //     .classed('heart', true)

                // });
            }
        }
       }

    d3.selectAll('.fadeheart')
      //.filter(function() { return +d3.select(this).style('opacity') === 0; })
      .classed('filtered', true)
      .style('animation', 'fademore 7s linear')
      .on('click', function() {
        d3.select(this)
          .style('opacity', 1)
          .style('animation', 'none')
        //  .classed("notClicked", false);
      });

  }
