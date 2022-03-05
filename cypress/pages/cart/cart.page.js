import base from "../base";
import checkout from "../checkout/checkout.page";

const cart = {
    ...base,
    cartTable: '.cart_item',
    proceedToCheckoutButton: '.checkout-button',

    assertProductExistsInCartTable(productName) {
        cy.get(this.cartTable)
        .find('.product-name a')
        .should('contain', productName);

        return this;
    },
    proceedToCheckout() {
        cy.get(this.proceedToCheckoutButton)
        .should('be.visible')
        .click();

        return checkout;
    },
}

export default {...cart}