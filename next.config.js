/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
}

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     return [
//       {
        
//         source: '/api/:path*',
//         destination: 'http://localhost:3000/:path*'
//       }
//     ]
//   }
// }