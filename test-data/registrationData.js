module.exports = {
    nameTests: [
      { name: '', error: 'Name is required' },
      { name: 'J', error: 'Name has to be from 2 to 20 characters long' },
      { name: 'JohndoeJohnsmithson', error: 'Name has to be from 2 to 20 characters long' },
      { name: ' John', error: 'Name is invalid' },
      { name: 'John ', error: 'Name is invalid' },
      { name: 'John@Doe', error: 'Name is invalid' },
      { name: 'John123', error: 'Name is invalid' },
      { name: 'John Doe', error: 'Name is invalid' },
      { name: '   ', error: 'Name is required' },
      { name: ' JohnDoe ', error: 'Name is invalid' }
    ],
    lastNameTests: [
      { lastName: '', error: 'Last Name is required' },
      { lastName: 'J', error: 'Last Name has to be from 2 to 20 characters long' },
      { lastName: 'JohndoeJohnsmithson', error: 'Last Name has to be from 2 to 20 characters long' },
      { lastName: ' John', error: 'Last Name is invalid' },
      { lastName: 'John ', error: 'Last Name is invalid' },
      { lastName: 'John@Doe', error: 'Last Name is invalid' },
      { lastName: 'John123', error: 'Last Name is invalid' },
      { lastName: 'John Doe', error: 'Last Name is invalid' },
      { lastName: '   ', error: 'Last Name is required' },
      { lastName: ' JohnDoe ', error: 'Last Name is invalid' }
    ],
    emailTests: [
      { email: '', error: 'Email required' },
      { email: 'invalidemail', error: 'Email is incorrect' },
      { email: 'invalid.email@test', error: 'Email is incorrect' },
      { email: 'invalid@test.', error: 'Email is incorrect' }
    ],
    passwordTests: [
      { password: '', error: 'Password required' },
      { password: 'pass', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'Password', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'password123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'PASSWORD123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'Pass123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, і one small letter' },
      { password: 'Pass!@#', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: '12345678', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' }
    ],
    reEnterPasswordTests: [
      { password: 'Password123', reEnterPassword: '', error: 'Re-enter password required' },
      { password: 'Password123', reEnterPassword: 'password', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Password', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Password1234', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'PASSWORD123', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Pass123', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Pass!@#', error: 'Password do not match' }
    ]
  };
  