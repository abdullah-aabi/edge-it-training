/// <reference types="cypress" />

describe("Mock site different scenarios", () => {

    it("Add product to cart and verify it's detail", () => {
        cy.loginWithUI("standard_user", "secret_sauce")

        // cy.get("div.inventory_item_name")
        //     .contains("Sauce Labs Bolt T-Shirt")
        //     .parents("div.inventory_item")
        //     .within(() => {
        //         cy.get("div.inventory_item_price")
        //             .invoke("text")
        //             .then(productAmount => {
        //                 cy.get("button.btn_inventory").should("contain", "Add to cart").click()
        //                 cy.get("button.btn_inventory").should("have.text", "Remove")

        //             })
        //     })

        cy.get("div.inventory_item_name")
            .contains("Sauce Labs Bolt T-Shirt")
            .parents("div.inventory_item")
            .find("div.inventory_item_price")
            .invoke("text")
            .then(productAmount => {
                cy.get("div.inventory_item_name")
                    .contains("Sauce Labs Bolt T-Shirt")
                    .parents("div.inventory_item")
                    .find("button.btn_inventory").should("contain", "Add to cart").click()

                cy.get("div.inventory_item_name")
                    .contains("Sauce Labs Bolt T-Shirt")
                    .parents("div.inventory_item")
                    .find("button.btn_inventory").should("have.text", "Remove")

                cy.get("span.shopping_cart_badge").should("have.text", 1) // outside the above withing block.

                // Go to cart and checkout
                cy.get("a.shopping_cart_link").click()
                cy.get("span.title").should("have.text", "Your Cart")

                // Verify the price
                cy.get("div.inventory_item_name")
                    .parents("div.cart_item")
                    .find("div.inventory_item_price")
                    .should("have.text", productAmount)

                // Verify the quantity
                cy.get("div.inventory_item_name")
                    .parents("div.cart_item")
                    .find("div.cart_quantity")
                    .should("have.text", 1)

                // Checkout. 
                cy.get("button#checkout")
                    .click()
                cy.get("span.title").should("have.text", "Checkout: Your Information")

                cy.get("input#first-name").type("John")
                cy.get("input#last-name").type("Doe")
                cy.get("input#postal-code").type("78301")
                cy.get("input#continue").click()

                cy.get("span.title").should("have.text", "Checkout: Overview")

                cy.get("div.summary_subtotal_label").should("contain", productAmount)
                cy.get("div.summary_tax_label").invoke("text").then(tax => {
                    productAmount = parseFloat(productAmount.split("$")[1])
                    tax = parseFloat(tax.split("$")[1])

                    cy.get("div.summary_total_label").should("contain", productAmount + tax)

                    cy.get("button#finish").click()
                    cy.get("span.title").should("have.text", "Checkout: Complete!")
                    cy.get("h2.complete-header").should("have.text", "Thank you for your order!")

                    cy.get("button#back-to-products").click()
                    cy.get("span.title").should("have.text", "Products")


                })
            })


    })



})