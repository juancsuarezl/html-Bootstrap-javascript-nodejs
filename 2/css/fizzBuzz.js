let number=parseInt(prompt("Por favor introduzca un número entre 1 y 200.000"));

/********** FizzBuzz Function ***********/

Function fizzBuzz(n){

	for (let i=1; i<n; i++){

		document.write("i\n");

	}

	if(n%3==0 && n%5 ==0){

		document.write("FizzBuzz");
	}

	if(n%3 ==0){

		document.write("Fizz");
	}

	if (n%5==0){

		document.write("Buzz");
	}
}