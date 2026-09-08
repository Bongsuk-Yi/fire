// src/config/auth.js
// 비밀번호 검증 및 해시 관리 모듈 (Web Crypto API 기반)

// 허용된 비밀번호들의 SHA-256 해시 목록입니다.
// 기본 허용 비밀번호:
// 1. 'fire'
// 3. 'fire2026'
// 4. 'trend-signal'
export const ALLOWED_HASHES = [
  'dc9f28b12dd1818ee42ffc92ecb940386214598837348d30d3c6c0b7b57e34c9', // fire
  '4e431d1b479ecf7de3a27aa5a2515bc47a9bad73ca34a5fcdce083dbbcdd3c4e', // fire2026
  '8bff198e3a3228b89c69b583b5724c5eb8dc1280bc6464336f59914e1ea4cd56', // trend-signal
];

export const AUTH_STORAGE_KEY = 'fire.pw_auth';

// SHA-256 해시 계산 함수
export async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// 비밀번호 검증 함수
export async function verifyPassword(password) {
  if (!password) return false;
  const hash = await sha256(password.trim());
  return ALLOWED_HASHES.includes(hash);
}

// 저장된 인증 토큰 검증 함수
export function verifyStoredHash(hash) {
  if (!hash) return false;
  return ALLOWED_HASHES.includes(hash);
}
