(function() {
    var width = 200;
    var height = 200;
    var maxLabelLength = 125;
    var textOffset = 5;
    var lineHeight = 8;
    
    var projects = { 
        'name' : 'Science Fair BnB',
        'children': [
          { 'name' : 'Front-end',
            'children' : [
               { 'name' : 'JavaScript' },
               { 'name' : 'jQuery' }, 
               { 'name' : 'Backbone.js' }
               ]
          },
          { 'name' : 'Back-end',
            'children' : [
               { 'name' : 'Rails' },
               { 'name' : 'Postgres' },
               { 'name' : 'Ruby' }
               ]
          }
          ]
    };

    var canvas = d3.select('.data-canvas')
                   .append('svg')
                   .attr('width', width + 2 * maxLabelLength)
                   .attr('height', height)
                   .append('g')
                       .attr('transform', 'translate(' + maxLabelLength + ', 0)')
                       .attr('class', 'node-group')
    
    var sciFairTree = d3.layout.tree()
                        .size([width, height]);
    
    var sciNodes = sciFairTree.nodes(projects);
    
    var sciLinks = sciFairTree.links(sciNodes);
    
    var sciNode = canvas.selectAll('.sci-tree-node')
                     .data(sciNodes)
                     .enter()
                         .append('g')
                         .attr('class', 'sci-tree-node')
    
    sciNode.append('circle')
        .attr('r', 3)
        .attr( 'class', 'node-circle')
        .attr('transform', function(d) {
            return 'translate(' + d.y + ", " + d.x + ")";
        });
    
    sciNode.append('text')
        .text(function(d) { return d.name } )
        .attr('class', 'node-label')
        .attr('transform', function(d) {
            if ( d.children ) {
                return 'translate(' + (d.y - textOffset) + ", " + 
                    (d.x + lineHeight / 2)  + ")";
            }
            return 'translate(' + (d.y + textOffset) + ", " + 
                (d.x + lineHeight / 2)  + ")";    })
        .attr('text-anchor', function(d) {
            return d.children ? 'end' : 'start';
        });
    
    var sciDiagonal = d3.svg.diagonal()
                        .projection( function(d) {
                            return [d.y, d.x];
                        });
    
    canvas.selectAll('.sci-fair-links')
          .data(sciLinks)
          .enter()
              .append('path')
              .attr('class', 'sci-fair-links')
              .attr('fill', 'none')
              .attr('stroke', '#ADADAD')
              .attr('d', sciDiagonal)
})();



