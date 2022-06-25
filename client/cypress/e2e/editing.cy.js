/// <reference types="cypress" />
/**
 * can admin add new tasks of each type
 * can admin save lesson
 * can admin then test that lesson
 * can admin edit that lesson
*/

let lessonData;

describe('test lesson editing', () => {
    before(() => {
        // get mock lesson data
        cy.fixture('admin').then((admin) => {
            // setup get request intercept
            cy.intercept(
                'GET', 
                '**/api/v1/users/', 
                admin
            ).as('getUserData');
            cy.intercept(
                'POST',
                '**/api/v1/users/login',
                { message: `login for user successful!` }
            ).as('getLogin');
            cy.intercept(
                'POST', 
                '**/api/v1/users/refreshToken', 
                { userID: "user._id" }
            ).as('useRefreshToken');
        })
        // open site
        cy.visit('/');
        // accept cookies 
        cy.get('#rcc-confirm-button').should('be.visible');
        cy.get('#rcc-confirm-button').click();
    })

    it('shows overview on clicking button', () => {
        cy.get('.account-button').first().click();
        cy.get('.edit-wrap').should('be.visible');
    })
    it('can create new task', () => {
        cy.get('.add-button').click();
        cy.get('.edit-lesson-form').should('be.visible');
    })
    it('update lesson info', () => {
        cy.get('#name').type("TestingLesson")
            .should('have.value', "TestingLesson");
        cy.get('#requiredCompletions').type("5")
            .should('have.value', 15);
        cy.get('#shuffle').check()
            .should('be.checked');
        cy.get('#showInterstitials').uncheck()
            .should('not.be.checked');
        cy.get('#showPercentCorrect').uncheck()
            .should('not.be.checked');
    })
    it('add TextOnly', () => {
        cy.get('.add-button').scrollIntoView().click();
        cy.get('textarea#text')
            .scrollIntoView()
            .type("TestingLesson")
            .should('have.value', "TestingLesson");
    })
    // it('saves lesson', () => {
    //     cy.intercept(
    //         'POST', 
    //         '**/api/v1/lessons/lesson-TestingLesson', 
    //         // { userID: "user._id" }
    //         (req) => {
    //             let newLesson = req.body;
    //             newLesson = `{${newLesson}}`;
    //             newLesson = newLesson.replaceAll(/&/g, ';');
    //             newLesson = newLesson.replaceAll(/=/g, ':');
    //             console.log(newLesson);
    //             console.log(JSON.parse(newLesson));
    //             newLesson.name = req.body.name;
    //             newLesson.id = req.body.id;
    //             newLesson.requiredCompletions = req.body.requiredCompletions;
    //             newLesson.shuffle = req.body.shuffle;
    //             newLesson.noToSample = req.body.noToSample;
    //             newLesson.showInterstitials = req.body.showInterstitials;
    //             newLesson.showPercentCorrect = req.body.showPercentCorrect;
    //             newLesson.tasks = req.body.tasks;
    //             lessonData = JSON.stringify(newLesson);
    //             req.reply({ message: "successful save", newLesson: lessonData });
    //         }
    //     ).as('saveLesson');
    //     cy.get('.button-wrap-edit-lesson button')
    //         .scrollIntoView()
    //         .click();
    //     cy.get('#confirm-yes').click();
    //     cy.get('.form-error').each(elem => {
    //         cy.wrap(elem).should("have.text", "");
    //     })
    //     cy.get('#modal').should('contain.text', "successful");
    // })
    // it('can test saved lesson', () => {
    //     // get mock lesson data
    //     cy.fixture('admin').then((admin) => {
    //         // setup get request intercept
    //         cy.intercept(
    //             'GET', 
    //             '**/api/v1/users/', 
    //             admin
    //         ).as('getUserData');
    //         cy.intercept(
    //             'POST',
    //             '**/api/v1/users/login',
    //             { message: `login for user successful!` }
    //         ).as('getLogin');
    //         cy.intercept(
    //             'POST', 
    //             '**/api/v1/users/refreshToken', 
    //             { userID: "user._id" }
    //         ).as('useRefreshToken');
    //     })
    //     // open site
    //     cy.visit('/');
    //     // accept cookies 
    //     cy.get('#rcc-confirm-button').should('be.visible');
    //     cy.get('#rcc-confirm-button').click();
    //     cy.intercept(
    //         'GET', 
    //         '**/api/v1/lessons/lesson-TestingLesson', 
    //         JSON.parse(lessonData)
    //     ).as('getLesson');
    //     cy.visit('/lesson/lesson-TestingLesson');
    // })
})