// this is an example of object
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//     this.greet = function() {
//         console.log('Hello, my name is ' + this.name);
//     }
// }
// let person1 = new Person('John', 30);
// console.log(person1)
// let person = {
//     name: 'John',
//     age: 3,
//     greet: function() {
//         console.log('Hello, my name is ' + this.name);
//     }
// }; 
// console.log(person)
// person.greet()
// ECMASCRIPT6 METHOD
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     greet() {
//         console.log('Hello, my name is ' + this.name);
//     }
// }
// let person1 = new Person('John', 30);
//polymorphism
// class Animal {
//     makeSound() {
//         console.log('Some generic sound');
//     }
// }

// class Dog extends Animal {
//     makeSound() {
//         console.log('Woof woof!');
//     }
// }

// class Cat extends Animal {
//     makeSound() {
//         console.log('Meow meow!');
//     }
// }
//encapsulation
{/* <html>
<body>
  <div id = "output1">The car mileage is:  </div>
  <div id = "output2">After updating the car mileage is:  </div>
  <script>
    class Car {
      #brand = "TATA"; // Private field
      #name = "Nexon"; // Private field
      #milage = 16;    // Private field

      getMilage() {
        return this.#milage; // Accessing private field
      }

    setMilage(milage) {
      this.#milage = milage; // Modifying private field
    }
    }

    let carobj = new Car();
    document.getElementById("output1").innerHTML += carobj.getMilage();
    carobj.setMilage(20);
    document.getElementById("output2").innerHTML += carobj.getMilage();
    // carobj.#milage);  will throw an error.
  </script>
</body>
</html> */}
//bank
// class BankAccount {
// 	constructor(accountNumber, accountHolderName, balance) {
// 		this._accountNumber = accountNumber;
// 		this._accountHolderName = accountHolderName;
// 		this._balance = balance;
// 	}

// 	showAccountDetails() {
// 		console.log(`Account Number: ${this._accountNumber}`);
// 		console.log(`Account Holder Name: ${this._accountHolderName}`);
// 		console.log(`Balance: ${this._balance}`);
// 	}

// 	deposit(amount) {
// 		this._balance += amount;
// 		this.showAccountDetails();
// 	}

// 	withdraw(amount) {
// 		if (this._balance >= amount) {
// 			this._balance -= amount;
// 			this.showAccountDetails();
// 		} else {
// 			console.log("Insufficient Balance");
// 		}
// 	}
// }

// let myBankAccount = new BankAccount("123456", "John Doe", 1000);
// myBankAccount.deposit(500); 
// Output: Account Number: 123456 Account Holder Name: 
//John Doe Balance: 150
