// Scroll Sectuon Effect
document.querySelectorAll("header ul li a").forEach(ele => {
		ele.addEventListener("click" , (e) => {
			e.preventDefault()
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: "smooth"
			});
		});
	});

let imgRimov = document.querySelector(".about .img-remov img");
let images = document.querySelectorAll(".about .imges img");
// Chanige Img On Click
images.forEach((img) => {
	img.addEventListener("click", function () {
		remove(images);
		img.classList.add("active");
		imgRimov.setAttribute("src", img.getAttribute("src"));
	});
});

let liActive = document.querySelectorAll("header li a");
// Active And Scroll Page
liActive.forEach((e) => {
	e.addEventListener("click", function () {
		remove(liActive);
		e.classList.add("active");
	});
});

// Remove Function
function remove(element) {
	element.forEach((e) => {
			e.classList.remove("active");
	});
};

// Add Numbers Of LIke To Hearts
var heartLike = document.querySelector("header .fa-heart");
var liLike = document.querySelectorAll(".content-shoiz .box .icon i:first-child ");
let arrHeart = [];
let myLikeNumber = sessionStorage.getItem("myHeart");
if (josnToArr(myLikeNumber) != undefined && josnToArr(myLikeNumber).length > 0) {
	arrHeart = josnToArr(myLikeNumber);
  IdAddClassToElement(arrHeart,false)
	numbersOfCart(heartLike,"heart",document.querySelectorAll(".content-shoiz .heart").length)
}
liLike.forEach((e) => {
	e.addEventListener("click", function () {
		let parintOfElement =  e.parentElement.parentElement;
		parintOfElement.classList.toggle("heart");
		var likeShoiz = document.querySelectorAll(".content-shoiz .heart");
		if(parintOfElement.classList.contains("heart")) {
    arrHeart.push(parintOfElement.id);
		} else {
			arrHeart = arrHeart.filter(num => num !== parintOfElement.id);
		}
		numbersOfCart(heartLike,"heart",likeShoiz.length)
		addHeartToseSsionStorage(arrHeart);
	});
});

function addHeartToseSsionStorage(arr) {
  sessionStorage.setItem("myHeart" , JSON.stringify(arr));
}

// My Cart List

var addToCart = document.querySelector("header .fa-cart-shopping"); 
addToCart.innerHTML = `
<div class="cartsBox">
<div class="myCart"></div>
<div class="slectAll"><span class="slectAll"></span> Slect All</div>
<div class="control">
<i class="fa-sharp fa-solid fa-money-bill-wave pay"></i>
<i class="fa-solid fa-trash remove" ></i>
</div>
</div>
`
var elementClick = document.querySelectorAll(".content-shoiz .box a");
let myCartArr = [];
var myListCart = document.querySelector("header .fa-cart-shopping .myCart");
let mylogalCart = sessionStorage.getItem("myCart");
if(josnToArr(mylogalCart) != undefined && josnToArr(mylogalCart).length > 0) {
	myCartArr = josnToArr(mylogalCart);
	IdAddClassToElement(myCartArr,true)
	numbersOfCart(addToCart,"cart",document.querySelectorAll(".content-shoiz .cart").length)
	addCartToListCart(myCartArr);
};

elementClick.forEach((ele) => {
	ele.addEventListener("click", function (a) {
		a.preventDefault();
		ele.parentElement.parentElement.classList.toggle("cart");
	  var buyShoes = document.querySelectorAll(".content-shoiz .cart");
		myCartArr = [];
		buyShoes.forEach(element => {
			let elementObject = {
				id: element.id , 
				element: cartToTheHtml(element.cloneNode(true)),
			};
			myCartArr.push(elementObject);
			});
			addToseSsionStorage(myCartArr)
		  addCartToListCart(myCartArr);
			numbersOfCart(addToCart,"cart",buyShoes.length)
	});
});

function numbersOfCart(element,text,numbers) {
	if (numbers > 0) {
		element.setAttribute(`data-number-${text}`,numbers);
		element.classList.add(text);
	}else {	
		element.setAttribute(`data-number-${text}`,numbers);
		element.classList.remove("cart")
	};
};

function cartToTheHtml(elment) {
	elment.children[0].remove();
	elment.children[1].children[1].remove();
	elment.children[1].children[3].remove();
	return elment;
};

function addCartToListCart(elements) {
	myListCart.innerHTML = ""; 
  elements.forEach(obg => {
		myListCart.appendChild(obg.element)
	});
};

addToCart.parentElement.addEventListener("click", function(element) {
	if(document.querySelectorAll(".content-shoiz .cart").length === 0) {
		return document.querySelector(".cartsBox").classList.remove("active") ;
	}
		if(element.target.classList.contains("fa-cart-shopping")) {
		document.querySelector(".cartsBox").classList.toggle("active");
	} else if (element.target.classList.contains("pay")) {	
		let boxActive = document.querySelectorAll('.cartsBox .box.active');
		if(boxActive.length > 0) {
			payBoxTotel(boxActive)
			boxActive.forEach(ele => {
				removeElementFromSessionStorage(ele)
				document.querySelectorAll(".content-shoiz .cart").forEach(cart => {
					if(cart.id == ele.id) {
						cart.classList.remove("cart")
					}
			})
			})
				numbersOfCart(addToCart,"cart",document.querySelectorAll(".content-shoiz .cart").length)
		}
  }else if (element.target.classList.contains("remove")) {
		let boxActive = document.querySelectorAll('.cartsBox .box.active');
		if(boxActive.length > 0 ) {
			boxActive.forEach((ele) => {
			ele.remove();
			removeElementFromSessionStorage(ele)
			document.querySelectorAll(".content-shoiz .cart").forEach(cart => {
      if(cart.id == ele.id) {
				cart.classList.remove("cart")
			}
			})
		});
		numbersOfCart(addToCart,"cart",document.querySelectorAll(".content-shoiz .cart").length)
		}
		
	} else if(element.target.classList.contains("box")) {
		element.target.classList.toggle("active")
	} else if(element.target.classList.contains("slectAll")) {
		let elementSlect = document.querySelector("div.slectAll");
		elementSlect.classList.toggle("active");
	 if(elementSlect.classList.contains("active")) {
		document.querySelectorAll(".myCart .cart").forEach((ele) => {
			ele.classList.add("active");
		})
	 } else {
		document.querySelectorAll(".myCart .cart").forEach((ele) => {
			ele.classList.remove("active");
		})
	 }
	};
});

function payBoxTotel(element) {
	let divShow = document.createElement("div");
	divShow.className = "show";
	let totelElement = document.createElement("div");
	totelElement.className = "totel";
	let divbag = document.createElement("div");
	divbag.className = "bag"
	let divTotel = document.createElement("div");
	divTotel.className = "pill";
	let bill = [], someNumbers = 0;
  element.forEach(element => {
		let numbers = element.children[1].children[1].innerHTML.split("");
    bill.push(numbers.slice(1,numbers.indexOf(".")).join(""))
		someNumbers += +numbers.slice(numbers.indexOf(".") + 1).join("")
		divbag.appendChild(element);
	});
	let billTotel = bill.reduce((start,add) => +start + +add);
	while(someNumbers >= 100) {
		billTotel++;
		someNumbers -= 100;
	};
	divTotel.innerHTML = `
	<span>${bill.length}</span>
	<span>${billTotel + "." + someNumbers}</span>
	<button onclick="thinksPoupap()">Pay</button>
	<button onclick="removeShow()">Cancel</button>
	`;
	totelElement.appendChild(divbag);
	totelElement.appendChild(divTotel);
	divShow.appendChild(totelElement);
	document.body.prepend(divShow);
}

function removeShow() {
  document.querySelector(".show").remove()
}

function thinksPoupap() {
  let thinkDiv = document.createElement("div");
  thinkDiv.className = "think";
	thinkDiv.innerHTML = `
	<h3>Think Four You</h3>
	<p>You Try To Pay In My sotry For That I give You All The Shes For Free The Shoes well Be in Your Plase Soon </p>
	<button onclick="removeShow()">Bay bay</button>
	`;
	document.querySelector(".show").prepend(thinkDiv);
}

function IdAddClassToElement(arr,wthe) {
	arr.forEach(box => {
		document.querySelectorAll(".content-shoiz .box").forEach(element => {
		if(wthe) {
			if(element.id == box.id) {
				element.classList.add("cart");
				box.element = cartToTheHtml(element.cloneNode(true));
			};
		} else {
      if(element.id == box) {
				element.classList.add("heart");
			  };
			};
		});
	});
};

function addToseSsionStorage(arr) {
	sessionStorage.setItem("myCart" , JSON.stringify(arr));
};

function josnToArr(GetLogal) {
	if(GetLogal) {
  return JSON.parse(GetLogal);
	};
};

function removeElementFromSessionStorage(ele) {
  myCartArr = myCartArr.filter(obj => obj.id !== ele.id);
	addToseSsionStorage(myCartArr);
}
console.log(josnToArr(sessionStorage.getItem("myCart")));

// Active Review Effict

let reviewBox = document.querySelectorAll(".review .box");
let i = 0;
let reviewTime = setInterval(reviewShow,3000);

function reviewShow() {
	remove(reviewBox);
	reviewBox[i++].classList.add("active");
	if(i == reviewBox.length) {
		i = 0;
	};
};