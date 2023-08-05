describe('Issue creating and time tracking', () => {
    
    const description = 'Add and delete value in Time tracking'
    const title = 'Time tracking issue'
    

beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');

        
        // Create new issue 
        cy.get('.ql-editor').type(description);
        cy.get('input[name="title"]').type(title).should('exist');
        cy.get('[data-testid="select:reporterId"]').should('contain', 'Lord Gaben');
        

        cy.get('button[type="submit"]').click();
        cy.get('button[type="submit"]').should('not.exist');

        cy.get('[data-testid="modal:issue-create"]').should('not.exist');

        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        
        //Assert, that new issue is created 
        cy.get('[data-testid="board-list:backlog"]').should('be.visible');
        cy.get('[data-testid="list-issue"]').first().contains(title).click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });

  it('Should add, update and remove estimation successfully', () => {
    cy.get('[data-testid="modal:issue-details"]').should('contain','No time logged');
    
    //Add estimation
    cy.get('input[placeholder="Number"]').type('10{enter}'); 
    cy.contains('10h estimated').should('be.visible');
    cy.get('[data-testid="icon:close"]').first().click();
    
    cy.get('[data-testid="board-list:backlog"]').should('be.visible');
    cy.contains(title).click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
     
    //Update estimation
    cy.get('input[placeholder="Number"]').should('have.value', '10' ).clear().type('20');
    cy.contains('20h estimated').should('be.visible');
    cy.get('[data-testid="icon:close"]').first().click();

    cy.get('[data-testid="board-list:backlog"]').should('be.visible');
    cy.contains(title).click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('input[placeholder="Number"]').should('have.value', '20' );
    
    //Remove estimation
    cy.get('input[placeholder="Number"]').clear().type('{enter}');
    cy.contains('20h estimated').should('not.exist');
    cy.get('[data-testid="icon:close"]').first().click();

    cy.get('[data-testid="board-list:backlog"]').should('be.visible');
    cy.contains(title).click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('input[placeholder="Number"]').should('have.value', "").and('be.visible');

   }); 

   it('Should log time and remove logged time successfully', () => {
    cy.get('input[placeholder="Number"]').type('10');

    //Open pop-up dialogue 
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible');
    
    //Enter value in Time tracking: time spent and time remaining
    cy.get('input[placeholder="Number"]').eq(1).type('2');
    cy.get('input[placeholder="Number"]').eq(2).type('5');
    cy.contains('button', 'Done').click().should('not.exist');

    cy.get('[data-testid="modal:issue-details"]').should('be.visible'); 
    
    //Assert, that spent and remaining time is visible
    cy.get('[data-testid="icon:stopwatch"]').next().should('contain', '2h logged')
           .and('contain', '5h remaining');
    cy.get('[data-testid="icon:stopwatch"]'). next().should('not.contain','No time logged');
    cy.contains('10h estimated').should('not.exist');


    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible');
    
    // Remove value from Time tracking
    cy.get('input[placeholder="Number"]').eq(1).clear();
    cy.get('input[placeholder="Number"]').eq(2).clear();
    cy.contains('button', 'Done').click().should('not.exist');

    cy.get('[data-testid="modal:issue-details"]').should('be.visible'); 
    cy.get('[data-testid="icon:stopwatch"]'). next().should('have.value',"");
    cy.get('[data-testid="icon:stopwatch"]'). next().should('contain','No time logged');
    cy.contains('10h estimated').should('be.visible');


   });
});


