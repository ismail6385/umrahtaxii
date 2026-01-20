export function verifyAdmin(cookies: any): { valid: boolean; admin?: any } {
    try {
        const token = cookies.get('admin_token')?.value;

        if (!token) {
            return { valid: false };
        }

        // Simple check - if cookie exists, user is logged in
        return {
            valid: true,
            admin: { email: 'umrahtaxi22@gmail.com', role: 'admin' }
        };
    } catch (error) {
        return { valid: false };
    }
}
