const axios = require('axios');

async function testSignup() {
    try {
        const res = await axios.post('http://localhost:5002/api/auth/signup', {
            name: 'Test User',
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log('Signup successful:', res.data);
    } catch (error) {
        if (error.response) {
            console.error('Signup failed (Response):', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Signup failed (No Response):', error.request);
        } else {
            console.error('Signup failed (Error):', error.message);
        }
    }
}

testSignup();
