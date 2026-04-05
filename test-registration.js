const axios = require('axios');

async function testRegistration() {
  try {
    console.log('🧪 Testing user registration...\n');

    // Test 1: Register a new user
    const testUser = {
      name: 'John Doe',
      phone: '8888888888',
      email: 'john@example.com',
      password: 'password123'
    };

    console.log('📝 Registering user:', testUser.name);
    const registerRes = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ Registration successful:', registerRes.data);
    console.log();

    // Test 2: Login with the same credentials
    const loginData = {
      identifier: testUser.phone,
      password: testUser.password
    };

    console.log('🔐 Logging in with phone:', loginData.identifier);
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', loginData);
    console.log('✅ Login successful:', loginRes.data);
    console.log();

    // Test 3: Try to register duplicate phone (should fail)
    console.log('🚫 Testing duplicate phone registration...');
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: 'Another User',
        phone: '8888888888',
        password: 'password456'
      });
    } catch (err) {
      console.log('✅ Correctly rejected duplicate:', err.response.data.error);
    }
    console.log();

    console.log('🎉 All tests passed!');
  } catch (err) {
    console.error('❌ Test failed:', err.response?.data || err.message);
  }
}

testRegistration();
