import http from 'http';

const req = http.request({
  hostname: 'localhost',
  port: 3005,
  path: '/api/auth/login',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const data = JSON.parse(body);
    console.log("Login:", data);
    const cookie = res.headers['set-cookie']?.find(c => c.startsWith('bm_token='));
    const req2 = http.request({
      hostname: 'localhost',
      port: 3005,
      path: '/api/admin/overview',
      method: 'GET',
      headers: { 'Cookie': cookie }
    }, (res2) => {
      let body2 = '';
      res2.on('data', c => body2 += c);
      res2.on('end', () => {
        console.log("Overview status:", res2.statusCode);
        console.log("Overview body:", body2);
      });
    });
    req2.end();
  });
});
req.write(JSON.stringify({ identifier: 'admin', password: 'Yassaei@1404' }));
req.end();
