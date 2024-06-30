# hillel-dz
.# Playwright Test Project

The following instructions will guide you on how to install and run these tests.

## Prerequisites
Ensure you have Node.js installed.
Ensure you have Git installed.

- Node.js (>= 14.x)
- npm (>= 6.x)

## Setup Instructions

1. **Clone the repository:**
   ```sh
git clone https://github.com/AlenaBakumova/new_pw_repo.git
cd new_pw_repo
**Ensure you are on the correct branch (usually main or master):**
git checkout default 
2. **Install dependencies:**
npm install 
3. **Install Playwright browsers:**
npx playwright install
4. **Create a .env file and fill it with the necessary environment variables:**
4.1 **Create a .env file**
touch .env 
4.2 **fill environment variables**
echo "BASE_URL=https://qauto2.forstudy.space/" >> .env
echo "HTTP_USERNAME=guest" >> .env
echo "HTTP_PASSWORD=welcome2qauto" >> .env

5. **Run the tests:**
npx playwright test

6. **Project Structure**
pages/: Contains the Page Object Models (POM) for the application **will be after homework is checked and I'll upload the thread**
tests/: Contains the test files
testData/: Contains test data. **will be after homework is checked and I'll upload the thread**