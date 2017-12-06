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
            .style('width', '100%')//(this.maxWidth + this.padding) + 'px')
            .style('height', '100%')//(this.maxHeight + this.padding) + 'px');

        const svg = d3.select('#svg-container')
            .append('svg')
            .attr('class', 'main-svg')
            .attr('width', '100%')//this.maxWidth)
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
            .attr('width', '100%')//this.maxWidth)
            .attr('height', this.maxHeight)
            .attr('fill', 'url(#gradient)');

        return rect;
    }

    createStarAttr(){
        return `M 180.000 200.000
                L 208.284 208.284
                L 200.000 180.000
                L 208.284 151.716
                L 180.000 160.000
                L 151.716 151.716
                L 160.000 180.000
                L 151.716 208.284
                L 180.000 200.000
                z`
    }

    createTransform(point){
        return `translate(${point.x} ${point.y}) rotate(${point.rotationAngle}) scale(${point.size})`
    }



    createStars(svg,data){
        const that = this;

        function noop(){};

        function dragged(d) {
            const cloned = d.clone();
            cloned.x = d3.event.x;
            cloned.y = d3.event.y;
            const newString = that.createTransform(cloned);
            d3.select(this).attr("transform", newString); 
        }

        const strokeWidth = 3;
        const transitionDuration = 1000;
        const stars = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .call(d3.drag().on("drag", dragged))
           .attr('transform', function(d) { return that.createTransform(d)})
            .append('path')
            .attr('d', this.createStarAttr())
            .attr('stroke', 'yellow')
            .attr('fill', 'white')
            .attr('stroke-width', strokeWidth)
            .transition()
            .duration(function(d) {return d.transitionDuration})
            .delay(40)
            .on("start", function repeat() {
                d3.active(this)
                    .attr('stroke-width', strokeWidth * 3)
                    .transition()
                    .duration(function(d) {return d.transitionDuration})
                    .attr('stroke-width', strokeWidth)
                    .transition()
                    .on("start", repeat);
            })
            



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
