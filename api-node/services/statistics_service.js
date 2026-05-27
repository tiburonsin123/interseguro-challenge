exports.compute = (Q, R) => {
    const allValues = [...Q.flat(), ...R.flat()];

    if (allValues.length === 0) throw new Error('Las matrices no pueden estar vacías');

    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const sum = allValues.reduce((acc, val) => acc + val, 0);
    const average = sum / allValues.length;

    return {
        max: round(max),
        min: round(min),
        average: round(average),
        sum: round(sum),
        diagonal: {
            Q: isDiagonal(Q),
            R: isDiagonal(R),
        },
    };
};

// Una matriz es diagonal si todos sus elementos fuera de la diagonal son ~0
function isDiagonal(matrix) {
    if (!matrix || matrix.length === 0) return false;
    const n = matrix.length;
    if (matrix[0].length !== n) return false;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && Math.abs(matrix[i][j]) > 1e-10) return false;
        }
    }
    return true;
}

function round(value, decimals = 6) {
    return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
