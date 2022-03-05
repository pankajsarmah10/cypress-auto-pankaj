import home from '../../pages/home/home.page';
import utilityFunctions from '../../utils/functions';
import { CHECKOUT } from '../../utils/constants';

context('Home Page Tests', () => {

    beforeEach(() => {
        home.navigate()
        .assertHomePageIsLoaded()
        .goToShop()
        .assertUserIsAtShopPage()
        home.clickOnLogo();
    })

    afterEach(() => {
        home.clickOnLogo();
    })

    it('[TC1]Home Page with three Sliders only', () => {
       home.assert3SlidersVisible();
    })

    it('[TC2]Home page with three Arrivals only', () => {
        home.assertNumberOfNewArrivalsVisible(3);
    })

    it('[TC3]Home page - Images in Arrivals should navigate', () => {
        
        home.goToProductDetailsPage()
        .assertUserIsAtTheProductDetailsPage();
    })

    it('[TC4]Home page - Arrivals Images Description', () => {
        home
        .goToProductDetailsPage()
        .assertUserIsAtTheProductDetailsPage()
        .openDescriptionTab()
        .assertDescriptionTextIsPresent();
    })

    it('[TC5]Home page - Arrivals Images Reviews', () => {
        home
        .goToProductDetailsPage()
        .assertUserIsAtTheProductDetailsPage()
        .openReviewsTab()
        .assertReviewSectionIsDisplayed();
    })

    it('[TC6]Home page - Arrivals Images Add To Basket', () => {
        const inStockNewArrival = utilityFunctions.getFirstInStockNewArrival();
        home
        .goToProductDetailsPageWithProductTitle(inStockNewArrival.NAME)
        .addItemToBasket();
        
        home.assertCartContentInMenu(inStockNewArrival.PRICE)
        .goToCart()
        .assertProductExistsInCartTable(inStockNewArrival.NAME);
    })

    it('[TC7]Home page - Arrivals Add To Basket with more books', () => {
        const inStockNewArrival = utilityFunctions.getFirstInStockNewArrival();
        home
        .goToProductDetailsPageWithProductTitle(inStockNewArrival.NAME)
        .inputQuantity(0, false)
        .addItemToBasket()
        .assertAddToBasketSuccessMessageNotDisplayed();
        
        cy.wait(2000);
        cy.document().toMatchImageSnapshot();
    })

    it('[TC8]Home page - Arrivals Add To Basket items', () => {
        const inStockNewArrival = utilityFunctions.getFirstInStockNewArrival();
        home
        .goToProductDetailsPageWithProductTitle(inStockNewArrival.NAME)
        .addItemToBasket()
        .assertAddToBasketSuccessMessageDisplayed()
        
        home.assertCartContentInMenu(inStockNewArrival.PRICE)
        .goToCart()
        .assertProductExistsInCartTable(inStockNewArrival.NAME)
        .proceedToCheckout()
        .assertUserIsAtTheCheckoutPage()
    })

    it('[TC9]Home page - Arrivals Add To Basket items-Coupon', () => {
        const inStockNewArrival = utilityFunctions.getFirstInStockNewArrival();
        home
        .goToProductDetailsPageWithProductTitle(inStockNewArrival.NAME)
        .addItemToBasket()
        .assertAddToBasketSuccessMessageDisplayed()
        
        home.assertCartContentInMenu((inStockNewArrival.PRICE))
        .goToCart()
        .assertProductExistsInCartTable(inStockNewArrival.NAME)
        .proceedToCheckout()
        .assertUserIsAtTheCheckoutPage()
        .applyCoupon(CHECKOUT.COUPON_CODE)
        .assertApplyCouponErrorMessageIsDisplayed();
    })

    
})