// 变量声明
let a = 1;
function b(){
	let a = 3;
	console.log(a);
}
b();
// let a = 2;
// 同一作用域中不能重复声明同名变量
console.log(a);

const NAME = 666;
function c(){
	const NAME = 233;
	console.log(NAME);
}
c();
// 常量声明
// 常量名规范为全字大写
// const NAME = 233;
// 同一作用域中不能重复声明同名常量
// NAME = 233;
// 常量是不可改的，修改会导致报错
console.log(NAME);

// 解构赋值
let obj = {
	name : "名字",
	sex : "中",
	"weight" : 200
};
console.log(obj);
let {
	name, // 对象的属性名可解构为同名的变量名
	sex,
	weight, // 相当于是let weight = obj.weight
	height // 如果对象没有此属性，这个变量也会声明，不过值为undefined
} = obj;
console.log(name, sex, weight, height);

const OBJ1 = {
	name : "名字",
	NAME : "名字",
	SEX : "中",
	"WEIGHT" : 200
};
console.log(OBJ1);
try{
	let {
		name, // 同名的变常量都不能在同一作用域里重复声明
		NAME,
		SEX,
		WEIGHT, // 相当于是let weight = obj.weight
		HEIGHT
	} = OBJ1;
	console.log(name, NAME, SEX, WEIGHT, HEIGHT);
}catch(e){}

// 方法声明
// 一个参数可以不要参数左右的小括号
// 其他数量的参数个数都需要参数左右的小括号
const func0 = () => {
	console.log(233);
};
func0();
const func1 = name => {
	console.log(name);
};
func1("名字");
const func2 = (name, sex) => {
	console.log(name, sex);
};
func2("名字", "中");
const func3 = (name, sex, weight = 200, height = 400/*方法默认值设置，如果传了此参数则用传的参数值，如果没有传，则用默认值*/) => {
	console.log(name, sex, weight, height);
};
func3("名字", "中", 300);
//方法返回值
const add = (a, b) => a + b;
const multi = (a, b) => a * b;
const addMinusMulti = (a, b) => add(a, b) - multi(a, b);
console.log(add(5, 6), multi(3, 4), addMinusMulti(2, 9));

//对象声明
try{
	console.log(sex);
	let object = {
		name : "名字",
		sex, //如果属性没有赋值，则此属性值会查找上下文获取同名变常量的值
		school, //由于上下文中的此变量名未被声明就使用，所以会报错，而不是undefined
		speak(){
			console.log(this.name);
		}
	};
	console.log(object);
	object.speak();
}catch(e){}

//类声明
class People{
	constructor(option){
		console.log(this);
		this.name = option.name;
		this.play = option.play;
	}
	drink(){
		console.log("I can drink");
		return this;
	}
	walk(){
		console.log("I can walk");
		return this;
	}
}
// 第一种传方法作为参数
// let jack = new People({
// 	name : "Jack",
// 	play : () => { //箭头函数中的this会取到父级的非箭头函数作用域中的this
// 		console.log("I can play");
// 		console.log(this);
// 		return this;
// 	}
// });

// 第二种传方法作为参数
// 注意二者实例化中所传入对象的方法属性的区别
let jack = new People({
	name : "Jack",
	play(){
		console.log("I can play");
		return this;
	}
});
jack.walk().play().drink();

//字符串
//模板字符串
let person1 = "Tom",
	person2 = "Jerry";
console.log(`${person1} and ${person2}`);

let arrPerson = ["Tom", "Jerry", "Jack", "Mick", "Merry", "Tim"];
console.log(`${arrPerson.join(" and ")} are play happily`);

let arrFamily = [
	{
		father : "Tom",
		pet : ["cat", "dog"]
	},
	{
		father : "Jerry",
		pet : ["snake", "bird"]
	},
	{
		father : "Jack",
		mother : "Merry",
		pet : ["pig", "duck", "chick"]
	}
];
console.log(`${arrFamily.map(item => `${item.father}${item.mother ? ` and his wife ${item.mother}` : ""} and his pets ${item.pet.join(" and ")}`).join(" and ")} are play happily`);

//字符串新方法
//startsWith判断字符串是否以某字符串片段开始
console.log(person1.startsWith("To"), person1.startsWith("WTo"));
//endsWith判断字符串是否以某字符串片段结束
console.log(person1.endsWith("om"), person1.startsWith("WTom"));
//includes判断字符串中是否包含某字符串片段
console.log(person2.includes("r"), person2.includes("ery"));
//repeat重复字符串
console.log(person1.repeat(4));

//Promise对象
//resolve和reject参数会由promise对象自动传入，数据类型都是方法
//当需求任务处理成功时，需手动调用resolve，resolve方法传入的参数被then方法接受的参数得到
//当需求任务处理失败时，需手动调用reject，reject方法传入的参数被catch方法接受的参数得到
new Promise((resolve, reject) => {
	setTimeout(() => {
		if(Math.random() > .5){
			resolve(666);
		}else{
			reject(233);
		}
	}, 1000);
}).then(number => {
	console.log(number);
	//如果想要链式调用Promise对象实例的then方法，需要在前一个then方法中返回一个Promise对象实例
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(Math.random() > .5){
				resolve(6666);
			}else{
				reject(2333);
			}
		}, 1000);
	});
}).then(number => {
	console.log(number);
}).catch(number => {
	console.log(number);
});

//fetch获取数据，未来版的ajax
//如果想要json格式化，则调用响应对象的实例的json方法，如果想要返回字符串，则调用响应对象的实例的text方法
//由于被json方法和text方法处理的返回值为promise对象的实例
//所以需要通过下一次then获取到处理结果

//使用get请求获取数据
fetch("http://www.ikindness.cn/api/test/get").then(res => res.json()).then(str => console.log(str));

//使用post请求通过表单提交数据
fetch("http://www.ikindness.cn/api/test/post", {
	method : "post",
	headers : {
		"Content-Type" : "application/x-www-form-urlencoded"
	},
	body : "a=1&b=2"
}).then(res => res.json()).then(str => console.log(str));