'use strict';
const constants = {
    maxWidth: 1200,
    maxHeight: 1200,
    maxStarSize: 50,
    dataPoints: 100,
    padding: 50
};

class Point {
    constructor(x,y, size, shine){
        this.x = x;
        this.y = y;
        this.size = size;
        this.shine = shine;
    }
}

class GenerateData {

    static randomNumber(range){
        return Math.random() * range;
    }

    static generatePoint(xRange, yRange, maxStarSize){
        return new Point(
            GenerateData.randomNumber(xRange), 
            GenerateData.randomNumber(yRange),
            GenerateData.randomNumber(maxStarSize),
            GenerateData.randomNumber(1)
        );
    }

    static generate(dataPoints, xRange, yRange, maxStarSize){
        const data = [];
        for(let i = 0; i < dataPoints; i++){
            data.push(GenerateData.generatePoint(xRange, yRange, maxStarSize));
        }
        return data;
    }
}
