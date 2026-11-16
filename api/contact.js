const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing');
    return res.status(500).json({ ok: false, error: 'Server is not configured' });
  }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot
  const name = String(b.name || '').trim(), email = String(b.email || '').trim(), message = String(b.message || '').trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message || message.length > 4000) {
    return res.status(400).json({ ok: false, error: 'Invalid input' });
  }
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'marooflone74@gmail.com'],
      replyTo: email,
      subject: ('Portfolio message from ' + name).slice(0, 120),
      text: name + ' (' + email + ')\n\n' + message,
      html: '<p><b>' + esc(name) + '</b> (' + esc(email) + ')</p><p>' + esc(message).replace(/\n/g, '<br>') + '</p>'
    });
    if (error) { console.error('Resend error:', error); return res.status(500).json({ ok: false, error: error.message }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Send failed:', e);
    return res.status(500).json({ ok: false, error: 'Send failed' });
  }
};
