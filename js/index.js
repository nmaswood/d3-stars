class SVG {
    constructor(data, maxHeight, maxWidth, padding){
        this.data = data;
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
        this.padding = padding;
    }

    createSVG(){
        const svgContainer = d3.select('#entry')
            .append('div')
            .attr('id', 'svg-container')
            .style('width', (this.maxWidth + this.padding) + 'px')
            .style('height', (this.maxHeight + this.padding) + 'px');

        const svg = d3.select('#svg-container')
            .append('svg')
            .attr('class', 'main-svg')
            .attr('width', this.maxWidth)
            .attr('height', this.maxHeight);
        return svg;
    }

    createGradient(svg){
        // taken from https://bl.ocks.org/mbostock/1086421
        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#3f165c")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#13071c")
            .attr("stop-opacity", 1);

        return gradient;
    }

    createBackground(svg){
        const gradient = this.createGradient(svg);
        const rect = svg.append('rect')
            .attr('width', this.maxWidth)
            .attr('height', this.maxHeight)
            .attr('fill', 'url(#gradient)');

        return rect;
    }

    createStars(svg,data){
        const stars = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function(d,i) {return d.x;})
            .attr('cy', function(d,i) {return d.y;})
            .attr('r', function(d,i){return d.size})
            .attr('stroke', 'black')
            .attr('stroke-width', '3')
            .attr('fill', 'white');

    }
}

class Enter {
    constructor(constants){
        this.c = constants;
    }

    main(){
        const data = GenerateData.generate(this.c.dataPoints, this.c.maxWidth, this.c.maxHeight, this.c.maxStarSize);
        const SVGClass = new SVG(data, this.c.maxHeight, this.c.maxWidth, this.c.padding);
        const svg = SVGClass.createSVG();
        const background = SVGClass.createBackground(svg);
        const stars = SVGClass.createStars(svg, data);

    }
}

enter = new Enter(constants);
enter.main();
