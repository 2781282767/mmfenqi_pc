'usr strict';


let obj1: any = 'This is a string.';


let str = 'Hello world';

let content = `${str} too`;


console.log(content)


let list: Array<number> = [1, 2, 3];


let x: [string, number];

// x = [10, 'hello'];


x = ['hello', 10]; // OK


x[3] = 'world';

console.log(x[3]);


enum Color {Red = 1, Green = 5, Blue}
;
let c: Color = Color.Green;
let colorName: string = Color[5];

alert(colorName);

alert(c);


let list2: any[] = [1, true, "free"];


list2[1] = 100;


console.log(list2)


interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "李建彬"};
printLabel(myObj);


interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};//设置默认
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black", width: 1000});//config


console.log(mySquare)


//
// let someValue: any = "this is a string";
//
// let strLength: number = (<string>someValue).length;

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (src, sub) {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}


/**
 * 索引的类型
 */
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


console.log(myStr)


export interface ClockInterface {

}

class Clock {

    greeting: number;
    constructor(h: number, m: number) {

        this.greeting=h;
        // this.h = h;
        // this.m = m;

    }

    tes() {
        console.log(this.greeting)
        // console.log(this.h)
    }
}

new Clock(12, 32).tes();


/**
 * 两种方法 private 仅在构造函数里使用private name: string参数来创建和初始化name成员。 我们把声明和赋值合并至一处。
 */

class Animal {
    constructor(private name: string) {}
    move(distanceInMeters: number = 1000000) {//可以传一个默认值
        console.log(`${this.name} moved ${distanceInMeters}  M.`);
    }
}


// class Animal {
//     name:string;
//     constructor(theName: string) { this.name = theName; }
//     move(distanceInMeters: number = 1000000) {//可以传一个默认值
//         console.log(`${this.name} moved ${distanceInMeters}  M.`);
//     }
// }





//
// class Horse extends Animal {
//     constructor() { super('wwwww'); }//访问其属性和方法。
//     move(distanceInMeters = 45) {
//         console.log("Galloping...");
//         super.move(distanceInMeters);
//     }
// }





new Animal('ljb').move(2000000);
//
// let tom = new Horse();
//
// tom.move(34);



// let digital = createClock(DigitalClock, 12, 17);



let passcode = "111";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "111") {
            this._fullName = newName;

            console.log(this._fullName)
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}


console.log(Employee)

let employee = new Employee();

console.log(employee)
employee.fullName = "Bob Smith";
if (employee.fullName) {
    employee.fullName
}

// let myAdd: (x:number, y:number)=>number =
//     function(x: number, y: number): number { return x+y; };


// var myAdd = function (x, y) { return x + y; };
//
// let myADD:(x:number,y:number)=>number=
//     function (x:number,y:number):number {
//         return x+y;
//     };



let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);


// interface StringValidator {
//     isAcceptable(s: string): boolean;
// }
//
//
// class LettersOnlyValidator implements StringValidator {
//     // isAcceptable(s: string) {
//     //     return lettersRegexp.test(s);
//     // }
// }


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

console.log(new Greeter('abc').greet())