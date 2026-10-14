export var table2x2 = Array.from({ length: 2 }, () =>
    Array.from({ length: 2 }, () => 0)
);

export var result = 0

export function receber_result(item){
    result = item
    console.log(result)
}
