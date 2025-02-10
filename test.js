// console.log("First");
// console.log("Second");
// console.log("Third");
// console.log("Fourth");

// setTimeout(() => {
//   console.log("Fifth");
// }, 2000);

// console.log("Sixth");

const promiseA = async (condition) => {
  return new Promise((resolve, reject) => {
    if (condition) {
      resolve("Brad has kept his promise");
    } else {
      reject("Brad did not keep his promise");
    }
  });
};

try {
  const res = await promiseA(false);

  console.log("We are here in the try");

  console.log(res);
} catch (error) {
  console.log("We are in the catch");

  console.log({ error });
}

console.log("This will run");
