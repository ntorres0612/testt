var memoryData = []

const init = () => {
    memoryData = fillDataMemory();
    console.log(memoryData);
}

// Metodo para leer de la memoria[memoryData]
const read = (start, end, callback) => {
    let delay = getDelay(1, 5);
    setTimeout(() => {
        let newArray = []
        for (let i = 0; i <= end; i++) {
            newArray.push(memoryData[start]);
            start++;
        }
        callback(newArray);

    }, delay * 1000);
}
// Metodo para extraer una parte del array de acuerdo al indice y las posiciones que tiene que recorrer
const getPartArray = (array, start, end) => {
    let newArray = []
    for (let i = 0; i <= end; i++) {
        newArray.push(array[start]);
        start++;
    }
    return newArray;
}
// Metodo que obtiene las respuesta por cada elemento del input
const getResponseForEachInput = (input, dataFromMemory, start, callback) => {
    let newArray = getPartArray(dataFromMemory, input.start - start, input.end)
    callback(newArray)
}
// Método que llena con datos dummy el array que representa la memoria
const fillDataMemory = () => {
    let memoryData = [];
    for (let i = 0; i < 4096; i++) {
        memoryData[i] = `Data ${i}`
    }
    return memoryData;
}
// Método que calcula la posicion de inicio y final de acuerdo al dato de entrada
const getStartEnd = inputList => {
    let startPosition, endPosition;
    inputList.forEach((input, index) => {
        if (index == 0) {
            startPosition = input.start;
            endPosition = input.start + input.end;
        } else {
            if (input.start < startPosition) {
                startPosition = input.start;
            }
            if (input.start + input.end > endPosition) {
                endPosition = input.start + input.end;
            }
        }
    });
    //Calculate distance 
    // end = end - start;
    return {
        start: startPosition,
        end: endPosition - startPosition
    }
}
// Método que generar un valor de 1 a 5 para simular un retardo en la lectura (para representar la lectura lenta) 
const getDelay = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    init,
    getStartEnd,
    fillDataMemory,
    read,
    getResponseForEachInput,
    getDelay,
    getPartArray
}