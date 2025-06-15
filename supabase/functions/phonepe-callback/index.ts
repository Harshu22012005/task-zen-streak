
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const { response } = body

    console.log('PhonePe callback received:', response)

    // Verify the payment status from PhonePe
    if (response && response.code === 'PAYMENT_SUCCESS') {
      const merchantTransactionId = response.data.merchantTransactionId
      const amount = response.data.amount
      
      // Update user premium status
      const { error: updateError } = await supabaseClient
        .from('user_stats')
        .update({
          is_premium: true,
          premium_activated_at: new Date().toISOString(),
          payment_transaction_id: merchantTransactionId
        })
        .eq('payment_transaction_id', merchantTransactionId)

      if (updateError) {
        console.error('Error updating user premium status:', updateError)
        return new Response(
          JSON.stringify({ error: 'Failed to update premium status' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      console.log('Premium status updated successfully for transaction:', merchantTransactionId)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('PhonePe callback error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
