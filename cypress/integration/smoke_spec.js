describe('The user list table is shown and buttons', function () {
  it('successfully loads table', function () {
    cy.visit('/')

    cy
      .get('.users-area-table')
      .find('tbody tr')
      .first()
      .screenshot()
  })
})
