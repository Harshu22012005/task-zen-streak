
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TaskNotificationRequest {
  userEmail: string;
  taskTitle: string;
  action: 'created' | 'completed';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, taskTitle, action }: TaskNotificationRequest = await req.json();

    const subject = action === 'created' 
      ? `New Task Created: ${taskTitle}` 
      : `Task Completed: ${taskTitle}`;
    
    const actionText = action === 'created' ? 'created' : 'completed';
    const emoji = action === 'created' ? '📝' : '✅';

    const emailResponse = await resend.emails.send({
      from: "DailyTasker <onboarding@resend.dev>",
      to: [userEmail],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0;">DailyTasker ${emoji}</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: #334155; margin-top: 0;">Task ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}!</h2>
            <p style="color: #64748b; font-size: 16px; margin: 10px 0;">
              You have ${actionText} the following task:
            </p>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
              <p style="font-weight: bold; color: #1e293b; margin: 0;">${taskTitle}</p>
            </div>
          </div>

          ${action === 'completed' ? `
            <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #166534; margin: 0; font-weight: bold;">🎉 Great job! You earned 10 points!</p>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px;">
              Keep up the great work with your daily tasks!
            </p>
          </div>
        </div>
      `,
    });

    console.log("Task notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-task-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
