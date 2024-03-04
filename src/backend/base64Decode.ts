const base64Map = new Map<string, number>([
    ["A", 0],
    ["B", 1],
    ["C", 2],
    ["D", 3],
    ["E", 4],
    ["F", 5],
    ["G", 6],
    ["H", 7],
    ["I", 8],
    ["J", 9],
    ["K", 10],
    ["L", 11],
    ["M", 12],
    ["N", 13],
    ["O", 14],
    ["P", 15],
    ["Q", 16],
    ["R", 17],
    ["S", 18],
    ["T", 19],
    ["U", 20],
    ["V", 21],
    ["W", 22],
    ["X", 23],
    ["Y", 24],
    ["Z", 25],
    ["a", 26],
    ["b", 27],
    ["c", 28],
    ["d", 29],
    ["e", 30],
    ["f", 31],
    ["g", 32],
    ["h", 33],
    ["i", 34],
    ["j", 35],
    ["k", 36],
    ["l", 37],
    ["m", 38],
    ["n", 39],
    ["o", 40],
    ["p", 41],
    ["q", 42],
    ["r", 43],
    ["s", 44],
    ["t", 45],
    ["u", 46],
    ["v", 47],
    ["w", 48],
    ["x", 49],
    ["y", 50],
    ["z", 51],
    ["0", 52],
    ["1", 53],
    ["2", 54],
    ["3", 55],
    ["4", 56],
    ["5", 57],
    ["6", 58],
    ["7", 59],
    ["8", 60],
    ["9", 61],
    ["+", 62],
    ["/", 63],
]);

function base64Decode(base64: string): number {
    //Convert base64 to binary
    let binary = base64.slice(0, -2).split("").map((char) => {
        return base64Map.get(char)?.toString(2).padStart(6, "0");
    }).reduce((acc, val) => {
        if (acc && val) {
            return acc + val;
        }
        return "";
    });

    if (binary) {
        //Convert binary to float
        binary = binary.slice(0, 32);
        let sign = binary[0] === "1" ? -1 : 1;
        let exponent = parseInt(binary.slice(1, 9), 2) - 127;

        let n = 1;
        if (exponent < -126) {
            exponent = -126;
            n = 0;
        }
        let mantissaBinary = binary.slice(9);
        let mantissa = n + parseInt(mantissaBinary, 2) / Math.pow(2, 23);
        let result = sign * mantissa * Math.pow(2, exponent);
        console.log(result)
        return result;
    }


    return 0;
}

export default base64Decode;