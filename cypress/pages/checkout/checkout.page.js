import base from "../base";
import { CHECKOUT } from '../../utils/constants';
const checkout = {

    ...base,
    applyCouponButton: '[name=apply_coupon]',
    applyCouponError: '.woocommerce-error li',
    checkoutUrl: 'checkout',
    clickToEnterCoupon: '.showcoupon',
    couponCodeInput: '#coupon_code',
    
    applyCoupon(couponCode) {
        cy.get(this.clickToEnterCoupon)
        .click();

        cy.get(this.couponCodeInput)
        .should('be.visible')
        .type(couponCode);

        cy.get(this.applyCouponButton)
        .click();

        return this;
    },

    assertApplyCouponErrorMessageIsDisplayed() {
        cy.get(this.applyCouponError)
        .should('contain', CHECKOUT.COUPON_LIMIT_REACHED_ERROR)
        return this;
    },

    assertUserIsAtTheCheckoutPage() {
        cy.url()
        .should('contain', this.checkoutUrl);

        return this;
    }
}
export default {...checkout}