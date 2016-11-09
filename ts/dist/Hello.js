'usr strict';
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var obj1 = 'This is a string.';
var str = 'Hello world';
var content = str + " too";
console.log(content);
var list = [1, 2, 3];
var x;
// x = [10, 'hello'];
x = ['hello', 10]; // OK
x[3] = 'world';
console.log(x[3]);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color[Color["Blue"] = 6] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
var colorName = Color[5];
alert(colorName);
alert(c);
var list2 = [1, true, "free"];
list2[1] = 100;
console.log(list2);
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "李建彬" };
printLabel(myObj);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 }; //设置默认
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black", width: 1000 }); //config
console.log(mySquare);
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
console.log(myStr);
var Clock = (function () {
    function Clock(h, m) {
        this.greeting = h;
        // this.h = h;
        // this.m = m;
    }
    Clock.prototype.tes = function () {
        console.log(this.greeting);
        // console.log(this.h)
    };
    return Clock;
}());
new Clock(12, 32).tes();
/**
 * 两种方法 private 仅在构造函数里使用private name: string参数来创建和初始化name成员。 我们把声明和赋值合并至一处。
 */
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 1000000; }
        console.log(this.name + " moved " + distanceInMeters + "  M.");
    };
    return Animal;
}());
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
var passcode = "111";
var Employee = (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "111") {
                this._fullName = newName;
                console.log(this._fullName);
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
console.log(Employee);
var employee = new Employee();
console.log(employee);
employee.fullName = "Bob Smith";
if (employee.fullName) {
    employee.fullName;
}
// let myAdd: (x:number, y:number)=>number =
//     function(x: number, y: number): number { return x+y; };
// var myAdd = function (x, y) { return x + y; };
//
// let myADD:(x:number,y:number)=>number=
//     function (x:number,y:number):number {
//         return x+y;
//     };
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
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
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    __decorate([
        enumerable(false)
    ], Greeter.prototype, "greet", null);
    return Greeter;
}());
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
console.log(new Greeter('abc').greet());
//# sourceMappingURL=Hello.js.map