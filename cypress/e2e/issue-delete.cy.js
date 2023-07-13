describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
    
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    
    /*
   Test 1
   */

    it('Delete issue and assert that issue is not on Jira Board', () => {
        getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:trash"]').click();
    });
        cy.get('[data-testid="modal:confirm"]').should('be.visible')
        
        //Confirm delition
        cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click();
        
        // Assert, the delition confirmation dialogue is not visible.
        cy.contains('Are you sure you want to delete this issue?').should('not.exist');
        
        // Assert, that issue type Task is deleted and not displayed on the Jira Board
        cy.contains('This is an issue of type: Task.').should('not.exist');
        
        //Assert, that only 3 issues left in Backlog
        cy.get('[data-testid="board-list:backlog').should('be.visible').within(() => {
        cy.get('[data-testid="list-issue"]')
            .should('have.length', '3')
            .first()
            .find('p')
            .contains('Click on an issue to see what\'s behind it.');
        
    });

});
    
/*
Test 2
*/
    
    it('Start deleting an issue and then cancel this action', () => {
        getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:trash"]').click();
        
    }); 
         
        cy.get('[data-testid="modal:confirm"]').contains('Cancel').click();
        //Assert, that modal window is closed
        cy.get('[data-testid="modal:confirm"]').should('not.exist');

        cy.reload();
        
        //Close issue 
        cy.get('[data-testid="icon:close"]').first().click();
        
        //Assert that issue is not deleted and displayed on the Jira Board
        cy.get('[data-testid="board-list:backlog').should('be.visible').within(() => {
        cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
              .first()
              .find('p')
              .contains('This is an issue of type: Task.');
          
         //Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
        cy.get('[data-testid="icon:task"]').should('be.visible');
        });

    });
});

