import base from '../base';

const shop = {
    ...base,
    breadcrumb: '.woocommerce-breadcrumb',
    filterButton: 'button[type=submit]',
    priceLabelFrom: '.price_label .from',
    priceLabelTo: '.price_label .to',
    products: '.products',
    productCategoriesSection: '.product-categories',
    shopUrl: 'shop',
    slider: '.ui-slider-range',
    sliderHandles: '.ui-slider-handle',

    assertUserIsAtShopPage() {
        cy.url()
        .should('contain', this.shopUrl);

        return this;
    }
    
}

export default {...shop};