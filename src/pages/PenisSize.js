/**
 * Page about penis sizes.
 *
 * The purpose of this page is to give statistics about penis size from
 * reputable sources, and overall dispel the notion that people should be
 * unsatisfied with their penis size.
 */

import React from 'react';
import * as DATA from '../data/DATA';
import * as d3 from 'd3';

class PenisSize extends React.Component {
  componentDidMount () {
    let PENIS_DATA = [];

    let x_axis = DATA.PENIS_SIZE_PREF[0].slice(1, DATA.PENIS_SIZE_PREF[0].length);
    let y_axis = DATA.PENIS_SIZE_PREF.slice(1, DATA.PENIS_SIZE_PREF.length).map(row => row[0]);

    // Build our data set for our map
    for (let x = 1; x < DATA.PENIS_SIZE_PREF[0].length; x++) {
      for (let y = 1; y < DATA.PENIS_SIZE_PREF.length; y++) {
        PENIS_DATA.push({
          length: x_axis[x-1],
          girth: y_axis[y-1],
          value: DATA.PENIS_SIZE_PREF[y][x]
        });
      }
    }

    // Makes the chart more readable
    y_axis.sort();

    let margin = {top: 80, right: 25, bottom: 60, left: 60},
      width = 700 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    let svg = d3.select('#penis-preference-map')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    // Build X scales and axis:
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(x_axis)
      .padding(0.05);
    svg.append('g')
      .style('font-size', 15)
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d, i){ return !(i%2);})).tickSize(5))
      .select('.domain').remove();

    // Build Y scales and axis:
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(y_axis)
      .padding(0.05);
    svg.append('g')
      .style('font-size', 15)
      .call(d3.axisLeft(y).tickValues(y.domain().filter(function(d, i){ return !(i%2);})).tickSize(5))
      .select('.domain').remove();

    // Add X axis label:
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + 40)
      .text('Length (in)');

    // Y axis label:
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left+20)
      .attr('x', 0)
      .text('Girth (in)');

    // Build color scale
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateGreens)
      .domain([0, 4]);

    let mouseover = function (d) {
      d3.select(this)
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style('opacity', 1);
    } ;

    let mouseleave = function (d) {
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.8);
    };

    // add the squares
    svg.selectAll()
      .data(PENIS_DATA, function(d) {return d.length+':'+d.girth;})
      .enter()
      .append('rect')
      .attr('x', function(d) { return x(d.length); })
      .attr('y', function(d) { return y(d.girth); })
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth() )
      .attr('height', y.bandwidth() )
      .style('fill', function(d) { return myColor(d.value);} )
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mouseleave', mouseleave);
  }


  render () {
    return (
      <div id='page-penis-size'>
        <div id='penis-preference'>
          {'Women\'s Preferences for Penis Size'}
          <div id='penis-preference-map' />
        </div>
      </div>
    );
  }
}

export default PenisSize;