/// <reference types="cypress" />

describe("Test Suite", () => {
    it.skip("Visit the page and verify", () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("div.login_logo").should("have.text", "Swag Labs") // assertion of text
    })

    it("Text fields and button", () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("div.login_logo").should("have.text", "Swag Labs") // assertion of text

        cy.get("input#user-name").type("standard_user")
        cy.get("input#password").type("secret_sauce")
        cy.get("input#login-button").click()
        // Verify, the user is logged in or not.
        cy.get("span.title").should("have.text", "Products")
    })

    it.skip("Radio buttons", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        // click radio by value
        cy.get("input.radioButton") // will find 3 elements
            .check("radio2") // find value 'radio2'
            .should("be.checked") // verify it as well. 

        cy.wait(5000)

        // click element by index

        cy.get("input.radioButton") // will find 3 elements
            .eq(2) // find 3rd radio button
            .check()
            .should("be.checked") // verify it as well. 

        cy.wait(5000)
    })

    it.skip("Checkboxes", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        // Select two checkboxes
        cy.get("input#checkBoxOption1") // will find 3 elements
            .check()
            .should("be.checked") // verify it as well. 

        cy.get("input#checkBoxOption3") // will find 3 elements
            .check()
            .should("be.checked") // verify it as well. 

        cy.wait(2000)

        // Select element with value option1
        cy.get("input#checkBoxOption2") // will find 3 elements
            .check("option2") // check element with value 'option1'
            .should("be.checked") // verify it as well. 

        cy.wait(2000)

        //  unselect all elements
        cy.get("div#checkbox-example input[type='checkbox']")
            .each((el, index, list) => {
                cy.wrap(el).uncheck().should("not.be.checked")
            })

        cy.wait(2000)
    })

    it.skip("Dropdown", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        cy.get('select[name="dropdown-class-example"]')
            .select("option2")
        cy.get('select[name="dropdown-class-example"] [value="option2"]')
            .should("be.selected")

        cy.wait(5000)
    })

    it.skip("Suggestion input and dropdown elements", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        cy.get("input#autocomplete")
            .type("United")
        cy.get("li.ui-menu-item > div")
            .contains("United States (USA)")
            .click()

        cy.wait(5000)
    })

    it.skip("Dependent fields", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        cy.get("input#hide-textbox")
            .click()

        cy.get("input#displayed-text")
            .should("not.be.visible")

        cy.wait(5000)

        cy.get("input#show-textbox")
            .click()

        cy.get("input#displayed-text")
            .should("be.visible")

        cy.wait(5000)
    })

    it("Table scenarios", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("body > h1").should("have.text", "Practice Page")

        cy.get('table[name="courses"]').within(() => { // it will focus on the given part of screen only.
            // Validate the total rows
            cy.get("tbody > tr").should("have.length", 11)

            cy.get("tbody > tr").eq(4).within(() => { // 4th row subscreen
                cy.get("td").eq(0).should("have.text", "Rahul Shetty")
                cy.get("td").eq(1).should("have.text", "WebSecurity Testing for Beginners-QA knowledge to next level")
                cy.get("td").eq(2).should("have.text", 20)
            })

            cy.get("td").contains("WebServices / REST API Testing with SoapUI") // by sibiling
                .next()
                .should("contain", 35)

            cy.get("td").contains("WebServices / REST API Testing with SoapUI") // by parent
                .parent()
                .find("td")
                .eq(2)
                .should("contain", 35)
        })
    })
})