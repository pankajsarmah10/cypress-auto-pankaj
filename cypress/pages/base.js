const base = {

    baseUrl: 'http://practice.automationtesting.in/',

    gotTo(page = '', clear = true) {
        if(clear) {
            cy
            .clearCookies()
            .clearLocalStorage();
        }
        cy.visit(`${this.baseUrl}${page}`);

        return this;
    },

    refresh() {
        cy.reload();
    },

    wait(seconds) {
        cy.wait(seconds*1000);
    }

}

export default base;