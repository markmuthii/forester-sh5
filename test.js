let str = "This is a string. {this content will be replaced}";

console.log(str);

str = str.replace("{this content will be replaced}", "This is the replacement");

console.log(str);
