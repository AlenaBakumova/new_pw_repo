class GaragePage {
    constructor(page) {
      this.page = page;
    }
  
    async goto() {
      await this.page.goto('https://qauto2.forstudy.space/garage');
    }
  }
  
  module.exports = { GaragePage };
  