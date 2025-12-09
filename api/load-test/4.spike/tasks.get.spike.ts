import http from 'k6/http';
import { check, sleep } from 'k6';

//spike test 
export const options = {
    stages: [
        { duration: '2m', target: 50 }, // start with 50 users
        { duration: '2m', target: 2000 }, // spike to 2000 users
        { duration: '10s', target: 0 },   // drop back to 0 users
    ]
};

export default () => {
    const res = http.get('http://localhost:3000/tasks');
    // console.log(`Status: ${res.status}`)
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}