exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { email, token } = JSON.parse(event.body || '{}');

    if (!email || !token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email or token' })
      };
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = Number(process.env.BREVO_LIST_ID);

    if (!turnstileSecret || !brevoApiKey || !Number.isFinite(brevoListId)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing server environment variables' })
      };
    }

    const verificationBody = new URLSearchParams({
      secret: turnstileSecret,
      response: token
    });

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verificationBody
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Turnstile verification failed' })
      };
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [brevoListId],
        updateEnabled: true
      })
    });

    if (!brevoResponse.ok) {
      const errorBody = await brevoResponse.text();
      return {
        statusCode: brevoResponse.status,
        body: JSON.stringify({ error: 'Brevo subscription failed', details: errorBody })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed successfully' })
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
