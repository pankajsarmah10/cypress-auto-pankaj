import base from '../base';

const productDetails = {
    ...base,
    addToBasket: '.single_add_to_cart_button',
    addToBasketSuccessMessage: '.woocommerce-message',
    descriptionTab: '.description_tab',
    descriptionText: '.woocommerce-Tabs-panel--description',
    inStockQuantity: '.in-stock',
    productSummaryAmount: '.entry-summary .woocommerce-Price-amount',
    productUrl: 'product',
    quantity: '.quantity input',
    reviewsTab: '.reviews_tab',
    reviewSection: '#reviews',
    
    assertAddToBasketSuccessMessageDisplayed() {
        cy.get(this.addToBasketSuccessMessage)
        .should('exist');

        return this;
    },

    assertAddToBasketSuccessMessageNotDisplayed() {
        cy.get(this.addToBasketSuccessMessage)
        .should('not.exist');

        return this;
    },

    assertDescriptionTextIsPresent() {
        cy.get(this.descriptionText)
        .find('h2')
        .contains('Product Description');
        
        cy.get(this.descriptionText)
        .find('p')
        .should('not.to.match',':empty');

        return this;
    },

    assertReviewSectionIsDisplayed() {
        cy.get(this.reviewSection)
        .should('be.visible');

        return this;
    },

    assertUserIsAtTheProductDetailsPage() {
        cy.url()
        .should('contain', this.productUrl);

        return this;
    },

    addItemToBasket() {
        cy.get(this.addToBasket)
        .click()

        return this;
    },

    getInStockQuantity() {
        cy.get(this.inStockQuantity)
        .invoke('text').as('quantityText');
        return this;
    },

    inputQuantity(desiredQuantity = 0, isDesiredQuantityLessThanInStock = true) {
        if(isDesiredQuantityLessThanInStock) {
            cy.get(this.quantity)
            .clear()
            .type(desiredQuantity);
        } else {
            this.getInStockQuantity();
            cy.get('@quantityText')
            .then((quantityTextVal) => {
                cy.get(this.quantity)
                .clear()
                .type(parseInt(quantityTextVal) + 1)
            })            
        }
        return this;
    },

    openDescriptionTab() {
        cy.get(this.descriptionTab)
        .click();

        return this;
    },

    openReviewsTab() {
        cy.get(this.reviewsTab)
        .click();

        return this;
    },
}

export default {...productDetails}