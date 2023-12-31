function placeOrder() {
    if (shoppingCartData.length > 0) {
        const orderConfirmationDiv = document.createElement('div');
        orderConfirmationDiv.classList.add('order-confirmation');

        orderConfirmationDiv.innerHTML = '<h2>Order Confirmation</h2>';
        orderConfirmationDiv.innerHTML += '<p>We have received your order:</p>';

        const itemList = document.createElement('ul');
        shoppingCartData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          
            itemList.appendChild(listItem);
        });
        orderConfirmationDiv.appendChild(itemList);

        orderConfirmationDiv.innerHTML += '<p>Thank you for shopping with us!</p>';
        document.body.appendChild(orderConfirmationDiv);
        shoppingCartData = [];
        updateShoppingCartDisplay();
		setTimeout(() => {
            document.body.removeChild(orderConfirmationDiv);
        }, 6000);
    } else {
        alert('Your shopping cart is empty. Add items before placing an order.');
    }
}

function removeOrder() {
	shoppingCartData = [];
	updateShoppingCartDisplay();
}

let shoppingCartData = [];
const cartCountContainer = document.getElementById('cart-count');
const shoppingCartDropdown = document.getElementById('shopping-cart-dropdown');

window.addToCart = function (itemId) {
    const selectedItem = bbqs.find(bbq => bbq.id === itemId);
    shoppingCartData.push(selectedItem);
    updateShoppingCartDisplay();

};
function updateShoppingCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const orderCountElement = document.getElementById('order-count');
    const orderTotalElement = document.getElementById('order-total');
	
    cartItemsContainer.innerHTML = ''; // Clear previous content

    // Loop through shoppingCartData and append each item to the list
    shoppingCartData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);
    });
	cartCountContainer.textContent = shoppingCartData.length;
	orderCountElement.textContent = shoppingCartData.length;

	const totalCost = shoppingCartData.reduce((total, item) => total + item.price, 0);
    orderTotalElement.textContent = totalCost.toFixed(2);

    // Update cart count
    cartCountContainer.textContent = shoppingCartData.length;
}

function toggleCart() {
    shoppingCartDropdown.classList.toggle('show');
}


document.addEventListener("DOMContentLoaded", function () {
	
    const menuIcon = document.getElementById("menu-icon");
    const navigation = document.querySelector(".navigation");

    menuIcon.addEventListener("click", function () {
        navigation.classList.toggle("show");
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});






const bbqs = [
    {
        "id": "ribs-brisket-and-burnt-ends",
        "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/79619/joes-kc-ribs-brisket-and-burnt-ends.6710e994980e485e6441b794717ad6fb.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
        "name": "Joe's KC BBQ",
        "dsc": "Joe's KC Ribs, Brisket & Burnt Ends",
        "price": 110.99,
        "rate": 4,
        "country": "Kansas City, KS"
    },
    {
        "id": "005-kings-carolina-oink-sampler",
        "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/66752/carolina-bbq-oink-sampler.1340b5a10cedc238cb2280306dd1d5a5.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
        "name": "Kings BBQ",
        "dsc": "Carolina BBQ Oink Sampler",
        "price": 89,
        "rate": 4,
        "country": "Kinston, NC"
    },
    {
        "id": "texas-monthlys-1-bbq-brisket",
        "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/131249/texas-monthlys-1-bbq-brisket.1006a061be7acae03992e420fbca995a.png?ixlib=react-9.0.2&auto=format&ar=1%3A1",
        "name": "Snow's BBQ",
        "dsc": "Texas Monthly's #1 BBQ Brisket",
        "price": 199,
        "rate": 4,
        "country": "Lexington, TX"
    },
    {
        "id": "17352-ribs-and-pulled-pork-small-combo-pack",
        "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137366/Central-BBQ-Ribs-Pulled-Pork-Dinner-1.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
        "name": "Central BBQ",
        "dsc": "Ribs & Pulled Pork Dinner for 4",
        "price": 79,
        "rate": 4,
        "country": "Memphis, TN"
    }
];

function toggleDropdown(dropdownId, event) {
    const dropdown = document.getElementById(dropdownId);
    const target = event.currentTarget;
	

    // Toggle visibility
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

    if (dropdown.style.display === 'block') {
        dropdown.innerHTML = '';//tar bort ifall det är något
		
        bbqs.forEach(bbq => {
            const bbqLink = document.createElement('a');
            bbqLink.href = '#'; // Add actual link if needed
            bbqLink.innerHTML = `
                <div>
                    <div><img src="${bbq.img}" alt="${bbq.name}">
                    <div><strong>${bbq.name}</strong></div>
                    <div>${bbq.dsc}</div>
                    <div>Price: $${bbq.price.toFixed(2)}</div>
                    <div>Country: ${bbq.country}</div>
					<button onclick="addToCart('${bbq.id}')">Add to Cart</button>
                </div>
            `;
            dropdown.appendChild(bbqLink);
        });
    }

}


document.addEventListener("DOMContentLoaded", function () {

    // Random BBQ
    const randomIndex = Math.floor(Math.random() * bbqs.length);
    const randomBBQ = bbqs[randomIndex];

    // Display random BBQ
    const recommendationContainer = document.getElementById("recommendation-container");
    recommendationContainer.innerHTML = `
        <div class="recommended-js">
            <div><img src="${randomBBQ.img}" alt="${randomBBQ.name}" class="small-img">
            <div><strong>${randomBBQ.name}</strong></div>
            </div>
            <div class="recommended-info" ><div>${randomBBQ.dsc}</div>
            <div>Price: $${randomBBQ.price.toFixed(2)}</div>
            <div>Rate: ${randomBBQ.rate} </div>
            <div>Country: ${randomBBQ.country}</div>
            <button onclick="addToCart('${randomBBQ.id}')">Add to Cart</button>
            </div>
        </div>
    `;
});


