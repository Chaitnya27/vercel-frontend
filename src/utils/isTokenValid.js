// // utils/isTokenValid.js
// export function isTokenValid(token) {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expiry = payload.exp * 1000; // convert to ms
//     return Date.now() < expiry;
//   } catch {
//     return false;
//   }
// }
