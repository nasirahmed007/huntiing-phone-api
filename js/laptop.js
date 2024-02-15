const loadLaptops = async (searchText = '', isShowAll) => {
    const res = await fetch(`https://freetestapi.com/api/v1/laptops?search=${searchText}`);
    const data = await res.json();
    const laptops = data; // Assuming data is directly the array of laptops
    displayLaptops(laptops, isShowAll);
}

const displayLaptops = (laptops, isShowAll) => {
    const laptopContainer = document.getElementById('phone-container');
    laptopContainer.textContent = ''; // Clear previous content

    // Display only first 12 laptops if not show All
    if (!isShowAll) {
        laptops = laptops.slice(0, 12);
    }

    laptops.forEach(laptop => {
        const laptopCard = document.createElement('div');
        laptopCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        laptopCard.innerHTML = `
            <figure><img src="${laptop.image}" alt="Laptop" /></figure>
            <div class="card-body">
                <h2 class="card-title">${laptop.brand} ${laptop.model}</h2>
                <p>${laptop.description}</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetail(${laptop.id})" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        laptopContainer.appendChild(laptopCard);
    });

    // Hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://freetestapi.com/api/v1/laptops/${id}`);
    const laptop = await res.json();
    showLaptopDetails(laptop);
}

const showLaptopDetails = (laptop) => {
    const laptopName = document.getElementById('show-detail-phone-name');
    laptopName.innerText = `${laptop.brand} ${laptop.model}`;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img src="${laptop.image}" alt="" />
        <p><span>Display Size:</span>${laptop.display_size}</p>
        <p><span>Resolution:</span>${laptop.resolution}</p>
        <p><span>Processor:</span>${laptop.processor}</p>
        <p><span>RAM:</span>${laptop.ram}</p>
        <p><span>Storage:</span>${laptop.storage}</p>
        <p><span>Battery Capacity:</span>${laptop.battery_capacity}</p>
        <p><span>Price:</span>${laptop.price}</p>
        <p><span>Description:</span>${laptop.description}</p>
    `

    // Show the modal
    show_details_modal.showModal();
}

// Handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadLaptops(searchText, isShowAll);
}

// Handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// Initial load
loadLaptops();
