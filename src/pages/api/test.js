export const POST = async ({ request }) => {
    return new Response(JSON.stringify({
        success: true,
        message: 'Test API working',
        timestamp: new Date().toISOString()
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const GET = async () => {
    return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' }
    });
};
