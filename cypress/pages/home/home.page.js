import base from '../base';
import shop from '../shop/shop.page';
import productDetails from '../product/productDetails.page';
import cart from '../cart/cart.page';

const home = {
    ...base,
    cartAmount: '.wpmenucart-contents .amount',
    cartContents: '.cartcontents',
    logo: '#site-logo',
    navBar: '.main-nav',
    products: '.products',
    pullDown: '.pull-down',
    searchIcon: '.icon-search',
    searchInput: '.icon-search + #s',
    slider: '.row_inner_wrapper',

    assert3SlidersVisible() {
        cy.get(this.slider)
        .should('have.length', 3);

        return this;
    },

    assertCartContentInMenu(cartAmount, cartCount=1) {
        cy.get(this.cartContents)
        .invoke('text')
        .then((textVal) => {
            expect(textVal.replace(/\,/g,'')).to.contain(cartCount);
        })

        cy.get(this.cartAmount)
        .invoke('text')
        .then((textVal) => {
            expect(textVal.replace(/\,/g,'')).to.contain(cartAmount);
        })
        return this;
    },

    assertHomePageIsLoaded() {
        cy.get(this.navBar)
        .should('be.visible');

        return this;
    },

    assertNumberOfNewArrivalsVisible(noOfSliders) {
        cy.get(this.products)
        .should('have.length', noOfSliders);

        return this;
    },

    clickOnLogo() {
        cy.get(this.logo)
        .click();

        return this;
    },

    goToCart() {
        cy.get(this.navBar)
        .find('.wpmenucart-contents')
        .click({force: true});

        return cart;
    },

    goToProductDetailsPage() {
        cy.get(this.products)
        .eq(0)
        .find('img')
        .click();
        return productDetails;
    },

    goToProductDetailsPageWithProductTitle(productTitle) {
        cy.log(productTitle);
        cy.get(this.products)
        .find('h3')
        .contains(productTitle)
        .click();

        return productDetails;
    },

    goToShop() {
        cy.get(this.navBar)
        .find('a')
        .contains('Shop')
        .click();
        return shop;
    },
    
    navigate() {
        this.gotTo();
        return this;
    },

    search(input) {
        cy.get(this.searchIcon)
        .should('be.visible')
        .click()
        .then( () => {
            cy.get(this.searchInput)
            .should('be.visible')
            .type(input);
        })
        return this;
    },
}

export default {...home};