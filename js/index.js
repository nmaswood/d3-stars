class SVG {
    constructor(data, maxHeight, maxWidth, padding){
        this.data = data;
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
        this.padding = padding;
    }

    createSVGContainer(){
        const svgContainer = d3.select('#entry')
            .append('div')
            .attr('id', 'svg-container')
            .style('width', '100%')//(this.maxWidth + this.padding) + 'px')
            .style('height', '100%')//(this.maxHeight + this.padding) + 'px');
        return svgContainer;
    }

    createSVG(svgContainer){

        const svg = svgContainer 
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

        function dragged(d, x, y) {
            const cloned = d.clone();
            cloned.x = x + Math.random(100);
            cloned.y = y + Math.random(100);
            const newString = that.createTransform(cloned);
            d3.select(this).attr("transform", newString); 
        }

        const strokeWidth = 3;
        const transitionDuration = 1000;
        const g = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function(d) { return that.createTransform(d)});

        const stars = g.append('path')
            .attr('d', this.createStarAttr())
            .attr('stroke', 'yellow')
            .attr('fill', 'white')
            .attr('stroke-width', strokeWidth)
            .transition()
            .duration(function(d) {return d.transitionDuration})
            .delay(500)
            .on("start", function repeat() {
                d3.active(this)
                    .attr('stroke-width', function (d) { return strokeWidth * d.shine;})
                    .transition()
                    .duration(function(d) {return d.transitionDuration})
                    .attr('stroke-width', strokeWidth)
                    .transition()
                    .on("start", repeat);
            });

        return stars;
    }

    createText(svg) {
        const textBox = svg.append('g')
            .append('text')
            .attr('x', this.maxWidth / 2.15)
            .attr('y', this.maxHeight / 4)
            .attr('font-family', 'Verdana')
            .attr('font-size', '30px')
            .style("text-anchor", "middle")
            .attr('fill', 'white');

        textBox.append("tspan")
            .text("Hi. My name is Nasr Maswood.")
            .style("text-anchor", "middle")

        textBox.append("tspan")
            .text("I am a 22 year old Software Engineer based in Chicago.")
            .attr('dx', -650)
            .attr('dy', 50);

        textBox.append("tspan")
            .text("I enjoy Sufi Poetry, freestyle rapping and most recently ballroom dance.")
            .attr('dx', -650 - 290)
            .attr('dy', 50);

        textBox.append("tspan")
            .text("Feel free to reach out at nasrmaswood@gmail.com")
            .attr('dx', -650 - 150)
            .attr('dy', 50)
            .attr('font-size', '15px');

        textBox.append('tspan')
            .text("To see my old website click here!")
            .attr('dx', -320)
            .attr('dy', 50)
            .attr('font-size', '15px')
            .style('cursor', 'pointer')
            .on('click',
                function(){
                    window.open("http://google.com")

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
        const svgContainer = SVGClass.createSVGContainer();
        const svg = SVGClass.createSVG(svgContainer);
        const background = SVGClass.createBackground(svg);
        const stars = SVGClass.createStars(svg, data);
        const textBox = SVGClass.createText(svg);

    }
}

enter = new Enter(constants);
enter.main();
