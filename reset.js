import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Initialize Supabase
const supabase = createClient(
  'https://fcznoqjzuqefjgzcoonc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjem5vcWp6dXFlZmpnemNvb25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzAzNzEsImV4cCI6MjA2NDYwNjM3MX0.FTafZFteAHvBKp0C2mw-QI4Xq-X5cu88c6r4kpHBf1c'
)

window.resetPassword = async function () {
  const password = document.getElementById('new-password').value
  const status = document.getElementById('status')

  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const access_token = hashParams.get('access_token')

  if (!access_token) {
    status.innerText = 'Access token not found. Please use the password reset link from your email.'
    return
  }

  const { error } = await supabase.auth.updateUser(
    { password },
    { accessToken: access_token }
  )

  if (error) {
    status.innerText = `${error.message}`
  } else {
    status.innerText = 'Password reset successfully. You can now close this tab and log in.'
  }
}
