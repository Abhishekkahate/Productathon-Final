from datetime import datetime

class WhatsAppService:
    """
    Sandbox Service for WhatsApp Notifications.
    In a live environment, this would call the Meta Graph API (Cloud API).
    Here, it simulates the delivery and logs the message structure.
    """
    
    def __init__(self):
        self.sandbox_mode = True
        
    def send_template_message(self, phone: str, template_name: str, parameters: list):
        """
        Simulates sending a structured template message.
        """
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        # Construct the simulated message payload
        payload = {
            "messaging_product": "whatsapp",
            "to": phone,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {"code": "en_US"},
                "components": [
                    {
                        "type": "body",
                        "parameters": [{"type": "text", "text": p} for p in parameters]
                    }
                ]
            }
        }
        
        # Log the "Sent" message (Simulating Network Request)
        print(f"[{timestamp}] [WhatsApp Sandbox] SENDING TO {phone}: {payload}")
        
        return {
            "status": "success", 
            "message_id": f"wamid.HBgL{int(datetime.now().timestamp())}", 
            "recipient_id": phone,
            "sandbox": True
        }

    def generate_lead_alert(self, officer_name, lead_company, lead_product, urgency):
        """
        Helper to format the specific 'new_lead_alert' template.
        """
        return self.send_template_message(
            phone="919876543210", # Mock Officer Phone
            template_name="hpcl_lead_alert_v1",
            parameters=[officer_name, lead_company, lead_product, urgency]
        )
