from fastapi import APIRouter, HTTPException
from typing import List, Dict
# from app.services.generator import MockDataGenerator # Deprecated
from app.services.lead_scout import LeadScout
from app.services.inference import InferenceEngine
from app.services.notifier import WhatsAppService
from app.models.signal import LeadDossier

router = APIRouter()
# generator = MockDataGenerator()
scout = LeadScout()
inference_engine = InferenceEngine()
notifier = WhatsAppService()

# In-memory storage for demo purposes
LEADS_DB: List[LeadDossier] = []

@router.get("/leads", response_model=List[LeadDossier])
async def get_leads(refresh: bool = False):
    """
    Get list of leads. If refresh=True or DB is empty, generates new batch.
    """
    global LEADS_DB
    if refresh or not LEADS_DB:
        # User Real World Intelligence
        signals = scout.scan_web(10)
        LEADS_DB = [inference_engine.process_signal(s) for s in signals]
        # Sort by urgency and confidence
        LEADS_DB.sort(key=lambda x: (x.urgency == "High", x.confidence_score), reverse=True)
    return LEADS_DB

@router.get("/leads/{lead_id}", response_model=LeadDossier)
async def get_lead_detail(lead_id: str):
    lead = next((l for l in LEADS_DB if l.lead_id == lead_id), None)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("/leads/{lead_id}/feedback")
async def update_lead_status(lead_id: str, status: str):
    lead = next((l for l in LEADS_DB if l.lead_id == lead_id), None)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if status not in ["Accepted", "Rejected", "Converted"]:
         raise HTTPException(status_code=400, detail="Invalid status")
         
    lead.status = status
    # In a real app, we would log this feedback for model retraining
    return {"message": "Status updated", "lead_id": lead_id, "new_status": status}

@router.post("/leads/{lead_id}/notify")
async def send_lead_notification(lead_id: str):
    lead = next((l for l in LEADS_DB if l.lead_id == lead_id), None)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    # Trigger WhatsApp Alert
    result = notifier.generate_lead_alert(
        officer_name="Sales Officer",
        lead_company=lead.company_name,
        lead_product=lead.inferred_products[0] if lead.inferred_products else "General",
        urgency=lead.urgency
    )
    
    return {"message": "Notification Sent", "details": result}

@router.get("/dashboard/stats")
async def get_dashboard_stats():
    """ Aggregate stats for executive dashboard """
    if not LEADS_DB:
        await get_leads(refresh=True)
        
    total_leads = len(LEADS_DB)
    high_value = sum(1 for l in LEADS_DB if l.confidence_score > 0.8)
    
    products = {}
    for lead in LEADS_DB:
        for p in lead.inferred_products:
            products[p] = products.get(p, 0) + 1
            
    return {
        "total_leads": total_leads,
        "high_intent_leads": high_value,
        "conversion_rate": "12%", # Mock
        "top_products": sorted(products.items(), key=lambda x: x[1], reverse=True)[:5]
    }
