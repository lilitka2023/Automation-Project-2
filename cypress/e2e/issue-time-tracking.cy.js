describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should add, update and remove estimation successfully', () => {
        
        getIssueDetailsModal()
            .find('[data-testid="icon:stopwatch"]')
            .click();
        
        cy.get('[data-testid="modal:tracking"]')
            .find('input[placeholder="Number"]')
            .should('have.value',4)
            .clear();
        
        cy.get('[data-testid="modal:tracking"]')
            .contains('button', 'Done')
            .click()
            .should('not.exist');    
            

        
        getIssueDetailsModal().within(() => {
        
            //Add estimation    
        cy.get('input[placeholder="Number"]').should('have.value', 8 ).clear().type (10); 
        cy.get('[data-testid="icon:close"]').first().click();
        
        });
        cy.reload();
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .find('input[placeholder="Number"]')
            .should('be.visible');
        
           //Update estimation
        cy.get('input[placeholder="Number"]').should('have.value', 10 ).clear().type(20);
        cy.get('[data-testid="icon:close"]').first().click();
        cy.reload();
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .find('input[placeholder="Number"]')
            .should('be.visible');

            //Remove estimation
        cy.get('input[placeholder="Number"]').should('have.value', 20 ).clear();
        cy.get('[data-testid="icon:close"]').first().click();
        cy.reload();
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .find('input[placeholder="Number"]')
            .should('be.visible');
            
        //getIssueDetailsModal().contains('20h estimated').should('not.exist');

        

    });
});
