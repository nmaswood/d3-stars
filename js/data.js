'use strict';
const constants = {
    maxWidth: Math.max(window.innerWidth, 1200),
    maxHeight: Math.max(window.innerHeight, 1200),
    dataPoints: 250,
    padding: 50
};

class Point {
    constructor(x,y, size, shine, rotationAngle){
        this.x = x;
        this.y = y;
        this.size = size;
        this.shine = shine;
        this.rotationAngle = rotationAngle;
    }
}

class GenerateData {

    static randomNumber(range){
        return Math.random() * range;
    }

    static generatePoint(xRange, yRange){
        return new Point(
            GenerateData.randomNumber(xRange), 
            GenerateData.randomNumber(yRange),
            GenerateData.randomNumber(.15),
            GenerateData.randomNumber(1),
            GenerateData.randomNumber(90),
        );
    }

    static generate(dataPoints, xRange, yRange){
        const data = [];
        for(let i = 0; i < dataPoints; i++){
            data.push(GenerateData.generatePoint(xRange, yRange));
        }
        return data;
    }
}
