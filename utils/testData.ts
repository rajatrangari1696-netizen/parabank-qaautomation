export function generateUserData() {
  const timestamp = Date.now();

  return {
    firstName: 'Rajat',
    lastName: 'TestUser',
    username: `rajat_${timestamp}`,
    password: 'Test@12345'
  };
}

export function getTodayDate(): string {
  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();

  return `${month}-${day}-${year}`;
}