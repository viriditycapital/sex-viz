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

// Colors for the penis size preference map legend
const LEGEND_COLORS = [
  {
    color: '#f9fdf7',
    label: 'Bad'
  },
  {
    color: '#d1edcc',
    label: 'Passing'
  },
  {
    color: '#8fcf93',
    label: 'Satisfied'
  },
  {
    color: '#4ea26a',
    label: 'Almost ideal'
  },
  {
    color: '#336949',
    label: 'Ideal'
  }
];

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
      height = 450 - margin.bottom;
    /*
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    */
    let width_real = width + margin.left + margin.right;
    let height_real = height + margin.bottom;

    let svg = d3.select('#penis-preference-map')
      .append('svg')
      .attr('viewBox', `0 0 ${width_real} ${height_real}`)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + 0 + ')');

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
        <div className='page-title-text'>
          Your dick is probably not small
        </div>
        <div id='penis-intro'>
          <p>
            The cliche is that mainstream media and porn have grossly
            exaggerated penis expectations, and while this is true, men will
            still be very insecure about their penis size, because there is a
            desire to have the security and bragging rights about having a big
            dick.
          </p>
          <p>
            This data visualization set should help give you a more grounded
            perspective on how you should look at your penis size. Perhaps
            you are on the smaller end, and you will continue to feel bad,
            but at least you have some security in knowing where you stand,
            instead of just constantly thinking pornstar dicks are the only
            ideal. We also include a section where you can look at ways to
            improve your sex life using whatever penis you were endowed with.
          </p>
        </div>
        <div id='penis-preference' className='page-section'>
          <div className='section-title-text'>
            {'Preferences for Penis Size'}
          </div>
          <div id='penis-preference-map' />
          <div id='penis-preference-analysis'>
            <div id='penis-preference-legend'>
              {
                LEGEND_COLORS.map(e => {
                  return (<div className='legend-entry' key={e.label}>
                    <div className='legend-color' style={{backgroundColor: e.color}}>
                    </div>
                    <div className='legend-label'>
                      {e.label}
                    </div>
                  </div>);})
              }
            </div>
            <div id='penis-preference-explanation'>
              <p>
                {'While the saying "4 inches is good enough" is true according\
                to this chart, it\'s hard not to look at the ideal and realize\
                it sits between 6-7 inches. The average penis length is 5.1\
                inches, so while many women might be okay with their partner\'s\
                size, they might be missing out on maximum sexual satisfaction.'}
              </p>
              <p>
                {'Another interesting point is that men often think that\
                "bigger is better," which is true for most men according to\
                this map, but also is a bit of a misconception, since having\
                too big of a penis can actually cause discomfort. Also,\
                depending on the girl, different sizes can be more compatible\
                or preferred.'}
              </p>
            </div>
          </div>
        </div>
        <div id='penis-tips' className='page-section'>
          <div className='section-title-text'>
            {'How to Improve Your Sex Life'}
          </div>
          <p>
            {'So you\'re upset that you don\'t have the penis of a Greek God,\
            but hey, you can still accommodate. Below are some tips on\
            getting the most out of your dick, no matter the size.'}
          </p>
          <ul>
            <li><b>Buy condoms that fit. </b>
              {'Most condoms are pretty large, around 7-8 inches, and while you\
            don\'t have to unroll the entire condom, you can get a better fit\
            by purchasing condoms that are your size. '}
              <a href='https://www.myonecondoms.com/'>
                ONE Condoms
              </a> has a fantastic custom condom ordering.
            </li>
            <li>
              <b>Get good at other aspects of sex. </b>
              {'Probably cliche, but dicking someone down isn\'t the only\
              component of sex. It\'s the most portrayed in porn, because it\
              attracts more attention and has more going on, but there are\
              tons of other ways to please your partner, from kissing,\
              foreplay, fingering, oral, etc. Master those, and you can\
              diversify your sexual experiences.'}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PenisSize;