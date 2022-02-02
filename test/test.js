var expect = require("chai").expect;

const industrialProtocol = require('./../industrialProtocol');

describe("Test protocol", function () {
    describe("Module industrialProtocol", function () {
        it("getDelay", function () {
            expect(industrialProtocol.getDelay()).to.be.a('number');
        })
        it("getStartEnd", function () {
            let inputList = [{ start: 3, end: 5 }, { start: 5, end: 7 }];
            expect(industrialProtocol.getStartEnd(inputList)).to.deep.equal({ start: 3, end: 9 });
        })
        it("fillDataMemory", function () {
            expect(industrialProtocol.fillDataMemory()).to.be.an.instanceof(Array);
        })
        it("getPartArray", function () {
            let dataFromMemory = [
                'Data 3', 'Data 4',
                'Data 5', 'Data 6',
                'Data 7', 'Data 8',
                'Data 9', 'Data 10',
                'Data 11', 'Data 12'
            ];
            let input = { start: 3, end: 5 };
            let start = 3;
            let newArray = industrialProtocol.getPartArray(dataFromMemory, input.start - start, input.end)
            let response = ['Data 3', 'Data 4', 'Data 5', 'Data 6', 'Data 7', 'Data 8'];
            expect(newArray).to.deep.equal(response);

        })
        it("getResponseForEachInput", function () {
            let input = { start: 3, end: 5 }
            let newArray = [
                'Data 3', 'Data 4',
                'Data 5', 'Data 6',
                'Data 7', 'Data 8',
                'Data 9', 'Data 10',
                'Data 11', 'Data 12'
            ]
            let responseExpect = ['Data 3', 'Data 4', 'Data 5', 'Data 6', 'Data 7', 'Data 8'];
            let start = 3

            industrialProtocol.getResponseForEachInput(input, newArray, start, function (response) {
                expect(responseExpect).to.deep.equal(response);
            })


        })
    })
})