/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  env:{
    C_ID: process.env.C_ID,
    CP_ID: process.env.CP_ID,
    JAVA_ID: process.env.JAVA_ID,
    
  }
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