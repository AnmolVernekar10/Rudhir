document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("acceptButton");
    const BloodGrpInput = document.getElementById("Bloodgrp");
    const QuantityInput = document.getElementById("Quantity");

    addButton.addEventListener("click", function () {
        const Bldgrp = BloodGrpInput.value; // Get data from the input field
        const qty = QuantityInput.value; // Get data from the input field

        // Send the data to the server
        fetch("/addData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Bldgrp, qty }), // Send the data to the server
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the server here
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});